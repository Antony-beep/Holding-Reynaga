#!/usr/bin/env python3
"""
Scraper diario de redes sociales — Torres Titanium / Holding Reynaga.

Extrae los últimos posts públicos de TikTok, Facebook (Página) e Instagram,
guarda hasta 3 por red en la misma SQLite de la app, descarga los thumbnails
a data/social-thumbs/ y pide a Next.js regenerar la home.

Principios:
  - NO destructivo: si una red falla, lo anterior queda intacto y se
    registra el error en social_sync (visible en el panel /admin).
  - Sin credenciales: solo contenido público, volumen mínimo (1 corrida/día).

Uso (VPS, desde la raíz del proyecto):
    ./venv/bin/python scripts/scrap_social.py

Cron sugerido (03:00 cada día):
    0 3 * * * cd /root/Holding-Reynaga && ./venv/bin/python scripts/scrap_social.py >> /var/log/scrap-social.log 2>&1
"""

import hashlib
import json
import re
import sqlite3
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

# Windows: consola cp1252 no soporta unicode; el VPS (UTF-8) no lo necesita.
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
DB_PATH = ROOT / "data" / "leads.db"
THUMB_DIR = ROOT / "data" / "social-thumbs"
ENV_PATH = ROOT / ".env.local"

MAX_PER_NETWORK = {"tiktok": 6, "instagram": 6, "facebook": 3}
# La cuenta tiene 2 videos ANCLADOS que siempre salen primeros en el grid;
# se saltan para traer las publicaciones realmente recientes.
TIKTOK_PINNED_VIDEOS = 2
TIKTOK_USER = "inmobiliariaholding"
INSTAGRAM_USER = "holdingreynaga"
FACEBOOK_PAGE_ID = "61588196065630"

# ---------------------------------------------------------------- env utils

def load_env(path: Path) -> dict:
    env = {}
    if not path.exists():
        return env
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        env[key.strip()] = value.strip().strip('"').strip("'")
    return env


ENV = load_env(ENV_PATH)
APP_URL = ENV.get("APP_URL", "http://localhost:3000").rstrip("/")
REVALIDATE_SECRET = ENV.get("REVALIDATE_SECRET", "")
INGEST_URL = ENV.get("SOCIAL_INGEST_URL", "")
INGEST_SECRET = ENV.get("SOCIAL_INGEST_SECRET", "")


def log(msg: str) -> None:
    print(f"[{datetime.now():%H:%M:%S}] {msg}", flush=True)


def first(selector_root, css_selector):
    """Primer resultado de un selector CSS o None (API Scrapling 0.4: css() devuelve lista)."""
    try:
        nodes = selector_root.css(css_selector)
    except Exception:
        return None
    return nodes[0] if nodes else None


# ---------------------------------------------------------------- db utils

def db_connect() -> sqlite3.Connection:
    THUMB_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH, timeout=15)
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def save_thumb(network: str, post_url: str, image_bytes: bytes, content_type: str) -> str:
    """Guarda el thumb con el MISMO naming que la API admin de Next (sha1 de la URL)."""
    ext = "png" if "png" in content_type else "webp" if "webp" in content_type else "jpg"
    digest = hashlib.sha1(post_url.encode()).hexdigest()[:12]
    name = f"{network}-{digest}.{ext}"
    (THUMB_DIR / name).write_bytes(image_bytes)
    return f"/social/{name}"


def upsert_posts(conn: sqlite3.Connection, network: str, posts: list) -> int:
    cur = conn.cursor()
    for p in posts:
        cur.execute(
            """
            INSERT INTO social_posts (network, post_url, caption, thumb_path, posted_at, source)
            VALUES (?, ?, ?, ?, ?, 'auto')
            ON CONFLICT(post_url) DO UPDATE SET
              caption=excluded.caption,
              thumb_path=excluded.thumb_path,
              posted_at=excluded.posted_at,
              source='auto'
            """,
            (network, p["url"], p["caption"][:300], p["thumb_path"], p["posted_at"]),
        )
    cur.execute(
        """
        DELETE FROM social_posts
        WHERE network=? AND source='auto' AND id NOT IN (
            SELECT id FROM social_posts WHERE network=? AND source='auto'
            ORDER BY COALESCE(posted_at, created_at) DESC, id DESC LIMIT ?
        )
        """,
        (network, network, MAX_PER_NETWORK[network]),
    )
    conn.commit()
    return len(posts)


def record_sync(conn: sqlite3.Connection, network: str, ok: bool, error: str, found: int) -> None:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    conn.execute(
        """
        INSERT INTO social_sync (network, last_run, last_ok, last_error, posts_found)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(network) DO UPDATE SET
          last_run=excluded.last_run,
          last_ok=CASE WHEN excluded.last_ok IS NOT NULL THEN excluded.last_ok ELSE social_sync.last_ok END,
          last_error=excluded.last_error,
          posts_found=excluded.posts_found
        """,
        (network, now, now if ok else None, error, found),
    )
    conn.commit()


def download_image(url: str):
    from curl_cffi import requests as creq

    r = creq.get(url, impersonate="chrome", timeout=30)
    if r.status_code != 200:
        raise RuntimeError(f"thumb HTTP {r.status_code}")
    ctype = r.headers.get("content-type", "image/jpeg")
    if not ctype.startswith("image/"):
        raise RuntimeError(f"no es imagen ({ctype})")
    if len(r.content) > 8 * 1024 * 1024:
        raise RuntimeError("thumb > 8MB")
    return r.content, ctype


# ---------------------------------------------------------------- TikTok

def scrape_tiktok() -> list:
    """
    Perfil de TikTok con sesión stealth y reintentos:
    la 1ª pasada resuelve el challenge WAF y deja cookies; las siguientes
    intentan hasta que el HTML del perfil realmente contenga videos
    (el WAF a veces repite el challenge — se reintenta hasta 3 veces).
    """
    import time as _time

    from scrapling.fetchers import StealthySession

    log("TikTok: navegador stealth (doble pasada WAF)...")
    url = f"https://www.tiktok.com/@{TIKTOK_USER}"
    with StealthySession(headless=True, google_search=False, block_images=True) as session:
        session.fetch(url, network_idle=True)  # 1ª: resuelve el challenge

        resp = None
        for attempt in range(3):
            r = session.fetch(url, network_idle=True)
            html = r.html_content if hasattr(r, "html_content") else str(r.body)
            if "/video/" in html or "__UNIVERSAL_DATA_FOR_REHYDRATION__" in html:
                resp = r
                break
            log(f"TikTok: intento {attempt + 1} devolvió el challenge WAF, reintentando...")
            _time.sleep(3)

        if resp is None:
            raise RuntimeError("el WAF de TikTok no dejó pasar tras 3 intentos")

    if resp.status != 200:
        raise RuntimeError(f"perfil HTTP {resp.status}")

    node = first(resp, "script#__UNIVERSAL_DATA_FOR_REHYDRATION__::text")
    data = {}
    if node is None:
        # TikTok alterna entre versión con SSR y shell anti-bot:
        # no es fatal — el fallback DOM + oEmbed lo cubre.
        log("TikTok: sin JSON SSR, probando DOM + oEmbed...")
    else:
        data = json.loads(str(node))

    # El itemList puede venir en distintas claves según la versión del perfil
    items = []
    for scope_value in (data.get("__DEFAULT_SCOPE__") or {}).values():
        if not isinstance(scope_value, dict):
            continue
        il = scope_value.get("itemList")
        if isinstance(il, list) and il:
            items = il
            break
        im = scope_value.get("itemModule")
        if isinstance(im, dict) and im:
            items = list(im.values())
            break
    posts = []
    for item in items[TIKTOK_PINNED_VIDEOS:TIKTOK_PINNED_VIDEOS + MAX_PER_NETWORK["tiktok"]]:
        video_id = str(item.get("id") or "")
        if not video_id:
            continue
        cover = (
            (item.get("video") or {}).get("originCover")
            or (item.get("video") or {}).get("cover")
            or ""
        )
        caption = (item.get("desc") or "")[:300]
        url = f"https://www.tiktok.com/@{TIKTOK_USER}/video/{video_id}"
        thumb_path = ""
        if cover:
            try:
                img, ctype = download_image(cover)
                thumb_path = save_thumb("tiktok", url, img, ctype)
            except Exception as e:
                log(f"  [warn] thumb TikTok {video_id}: {e}")
        created = item.get("createTime")
        posted_at = None
        if created:
            posted_at = datetime.fromtimestamp(int(created), tz=timezone.utc).strftime(
                "%Y-%m-%d %H:%M:%S"
            )
        posts.append({
            "url": url,
            "caption": caption,
            "thumb_path": thumb_path,
            "posted_at": posted_at,
        })

    if not posts:
        # Fallback (y camino principal actual): el grid del perfil carga async;
        # extraemos los links del DOM (nota: el href lleva '@usuario/video/')
        # y completamos cada video con el oEmbed público de TikTok.
        # Se saltan los primeros 2 links: son los videos anclados de la cuenta.
        log("TikTok: usando DOM + oEmbed...")
        from urllib.parse import quote

        from curl_cffi import requests as creq

        seen = set()
        video_ids = []
        for a in resp.css(f"a[href*='@{TIKTOK_USER}/video/']"):
            href = (a.attrib or {}).get("href", "")
            m = re.search(r"/video/(\d+)", href)
            if not m or m.group(1) in seen:
                continue
            seen.add(m.group(1))
            video_ids.append(m.group(1))

        for video_id in video_ids[TIKTOK_PINNED_VIDEOS:TIKTOK_PINNED_VIDEOS + MAX_PER_NETWORK["tiktok"]]:
            url = f"https://www.tiktok.com/@{TIKTOK_USER}/video/{video_id}"

            caption = ""
            thumb_path = ""
            try:
                r = creq.get(
                    f"https://www.tiktok.com/oembed?url={quote(url)}",
                    impersonate="chrome",
                    timeout=20,
                )
                if r.status_code == 200:
                    oe = r.json()
                    caption = (oe.get("title") or "")[:300]
                    thumb_url = oe.get("thumbnail_url") or ""
                    if thumb_url:
                        img, ctype = download_image(thumb_url)
                        thumb_path = save_thumb("tiktok", url, img, ctype)
            except Exception as e:
                log(f"  [warn] oEmbed TikTok {video_id}: {e}")

            posts.append({
                "url": url,
                "caption": caption,
                "thumb_path": thumb_path,
                "posted_at": None,
            })

    if not posts:
        raise RuntimeError("sin videos (ni SSR ni DOM)")
    log(f"TikTok: {len(posts)} videos")
    return posts


# ---------------------------------------------------------------- Facebook

def parse_relative_es(text: str):
    """'hace 3 h' / 'hace 2 dias' / 'hace 1 semana' -> fecha aprox (UTC)."""
    m = re.search(r"hace\s+(\d+)\s*(min|minuto|h|hora|d|d[ií]a|dias|sem|semana)", text.lower())
    if not m:
        return None
    n = int(m.group(1))
    unit = m.group(2)
    if "min" in unit:
        delta = timedelta(minutes=n)
    elif unit in ("h", "hora"):
        delta = timedelta(hours=n)
    elif unit.startswith("d"):
        delta = timedelta(days=n)
    else:
        delta = timedelta(weeks=n)
    return (datetime.now(timezone.utc) - delta).strftime("%Y-%m-%d %H:%M:%S")


def scrape_facebook() -> list:
    """Página pública con navegador stealth sobre www (mbasic está deprecado)."""
    from scrapling.fetchers import StealthyFetcher

    log("Facebook: lanzando navegador stealth sobre www...")
    resp = StealthyFetcher.fetch(
        f"https://www.facebook.com/profile.php?id={FACEBOOK_PAGE_ID}",
        headless=True,
        google_search=False,
        block_images=True,
        network_idle=True,
    )
    if resp.status != 200:
        raise RuntimeError(f"HTTP {resp.status}")

    # Detección de login-wall
    if first(resp, "form[action*='login']") is not None:
        raise RuntimeError("login-wall")

    # Los posts de una Página sin sesión viven en div[role='article']
    posts = []
    seen = set()
    for article in resp.css("div[role='article']"):
        link = None
        for a in article.css("a[href*='story_fbid'], a[href*='/posts/'], a[href*='/videos/']"):
            href = (a.attrib or {}).get("href", "")
            if href:
                link = href if href.startswith("http") else f"https://www.facebook.com{href}"
                break
        if not link or link in seen:
            continue

        # Texto del post
        paragraphs = []
        for t in article.css("div[data-ad-preview='message'] p::text, div[dir='auto'] > span::text"):
            t = str(t).strip()
            if t and len(t) > 15:  # ignorar botones/basura
                paragraphs.append(t)
        caption = " ".join(paragraphs)[:300]

        # Fecha: abbr con data-utime (epoch) en FB clásico
        posted_at = None
        for ab in article.css("abbr[data-utime]"):
            try:
                epoch = int((ab.attrib or {}).get("data-utime", "0"))
                if epoch > 0:
                    posted_at = datetime.fromtimestamp(epoch, tz=timezone.utc).strftime(
                        "%Y-%m-%d %H:%M:%S"
                    )
            except Exception:
                pass
        if posted_at is None:
            for ab in article.css("abbr::text"):
                posted_at = parse_relative_es(str(ab)) or posted_at

        # Imagen del post (mbasic-style img o img de www)
        thumb_path = ""
        img = first(article, "img[src^='http']")
        if img is not None:
            src = (img.attrib or {}).get("src", "")
            if src and "scontent" in src:
                try:
                    data, ctype = download_image(src)
                    thumb_path = save_thumb("facebook", link, data, ctype)
                except Exception as e:
                    log(f"  [warn] thumb FB: {e}")

        if not caption and not thumb_path:
            continue

        seen.add(link)
        posts.append({
            "url": link,
            "caption": caption,
            "thumb_path": thumb_path,
            "posted_at": posted_at,
        })
        if len(posts) >= MAX_PER_NETWORK["facebook"]:
            break

    if not posts:
        raise RuntimeError("sin posts visibles (login-wall o markup cambiado)")
    log(f"Facebook: {len(posts)} posts")
    return posts


# ---------------------------------------------------------------- Instagram

def scrape_instagram() -> list:
    """La mas dura: requiere navegador stealth (Camoufox). Best-effort."""
    from scrapling.fetchers import StealthyFetcher

    log("Instagram: lanzando navegador stealth...")
    resp = StealthyFetcher.fetch(
        f"https://www.instagram.com/{INSTAGRAM_USER}/",
        headless=True,
        google_search=False,
        block_images=False,
        network_idle=True,
    )

    if first(resp, "form[action*='login']") is not None:
        raise RuntimeError("login-wall")

    posts = []
    seen = set()
    for a in resp.css("a[href^='/p/'], a[href*='/reel/']"):
        href = (a.attrib or {}).get("href", "")
        code = re.search(r"/(?:p|reel)/([A-Za-z0-9_-]+)", href)
        if not code or code.group(1) in seen:
            continue
        seen.add(code.group(1))

        caption = ((a.attrib or {}).get("aria-label") or "")[:300]
        thumb_path = ""
        posted_at = None
        img = first(a, "img")
        if img is not None:
            src = (img.attrib or {}).get("src", "")
            alt = (img.attrib or {}).get("alt") or ""
            # Fecha real del post desde el alt autogenerado ("... on September 18, 2026.")
            m_date = re.search(r" on ([A-Z][a-z]+ \d{1,2}, \d{4})", alt)
            if m_date:
                try:
                    posted_at = datetime.strptime(
                        m_date.group(1), "%B %d, %Y"
                    ).strftime("%Y-%m-%d %H:%M:%S")
                except ValueError:
                    pass
            # Caption de respaldo: solo si el alt NO es descripción automática de Meta
            if not caption:
                autogenerated = alt.startswith(("Video by", "Photo by")) or "May be an image of" in alt
                if alt and not autogenerated:
                    caption = alt[:300]
            if src.startswith("http"):
                try:
                    data, ctype = download_image(src)
                    thumb_path = save_thumb(
                        "instagram",
                        f"https://www.instagram.com/p/{code.group(1)}/",
                        data,
                        ctype,
                    )
                except Exception as e:
                    log(f"  [warn] thumb IG {code.group(1)}: {e}")

        posts.append({
            "url": f"https://www.instagram.com/p/{code.group(1)}/",
            "caption": caption,
            "thumb_path": thumb_path,
            "posted_at": posted_at,
        })
        if len(posts) >= MAX_PER_NETWORK["instagram"]:
            break

    if not posts:
        raise RuntimeError("sin posts visibles (login-wall o grid no cargado)")
    log(f"Instagram: {len(posts)} posts")
    return posts


# ---------------------------------------------------------------- revalidate

def revalidate_home() -> None:
    if not REVALIDATE_SECRET:
        log("revalidate: sin REVALIDATE_SECRET - omitido")
        return
    from curl_cffi import requests as creq

    try:
        r = creq.post(
            f"{APP_URL}/api/revalidate",
            json={"secret": REVALIDATE_SECRET},
            timeout=15,
        )
        log(f"revalidate: HTTP {r.status_code}")
    except Exception as e:
        log(f"revalidate: fallo ({e})")


def cleanup_orphan_thumbs(conn: sqlite3.Connection) -> int:
    """Borra thumbs del disco que ya no referencie ninguna publicación
    (los PNG de TikTok pesan ~2MB; sin esto el disco crece sin control)."""
    referenced = {
        row[0]
        for row in conn.execute(
            "SELECT thumb_path FROM social_posts WHERE thumb_path != ''"
        )
    }
    removed = 0
    for f in THUMB_DIR.iterdir():
        if not f.is_file() or f.name.startswith("."):
            continue
        public_path = f"/social/{f.name}"
        if public_path not in referenced:
            try:
                f.unlink()
                removed += 1
            except Exception as e:
                log(f"  [warn] no se pudo borrar {f.name}: {e}")
    if removed:
        log(f"limpieza: {removed} thumbs huérfanos eliminados")
    return removed


# ---------------------------------------------------------------- push (PC → VPS)

def push_to_vps(posts_by_network: dict, sync_statuses: list, url_override: str = "") -> None:
    """
    Envía los posts scrapeados + thumbs (base64) + salud de conectores al VPS
    vía POST /api/social-ingest. El VPS es el dueño del dato: reemplaza los
    registros antiguos y regenera la home él solo.
    """
    import base64

    from curl_cffi import requests as creq

    target = url_override or INGEST_URL
    if not target or not INGEST_SECRET:
        log("push: falta SOCIAL_INGEST_URL o SOCIAL_INGEST_SECRET en .env.local")
        return

    payload_posts = []
    for network, posts in posts_by_network.items():
        for p in posts:
            item = {
                "network": network,
                "postUrl": p["url"],
                "caption": p["caption"],
                "postedAt": p.get("posted_at"),
            }
            if p.get("thumb_path"):
                fname = p["thumb_path"].lstrip("/").split("/")[-1]
                fpath = THUMB_DIR / fname
                if fpath.exists():
                    item["thumbName"] = fname
                    item["thumbB64"] = base64.b64encode(fpath.read_bytes()).decode()
            payload_posts.append(item)

    payload = {"posts": payload_posts, "sync": sync_statuses, "replace": True}
    log(f"push: enviando {len(payload_posts)} posts a {target} …")
    try:
        # Sin impersonación: es NUESTRO servidor (no tiene anti-bot), y
        # curl_cffi con impersonate + bodies grandes falla contra Node.
        r = creq.post(
            target,
            json=payload,
            headers={"x-ingest-secret": INGEST_SECRET},
            timeout=180,
        )
        if r.status_code == 200:
            data = r.json()
            log(
                f"push: OK — recibidos {data.get('ingested')}, reemplazados "
                f"{data.get('replaced')}, thumbs {data.get('thumbsOk')}, "
                f"huérfanos limpiados {data.get('pruned')}"
            )
            # Los thumbs ya viven en el VPS: limpiar los locales de esta corrida
            for f in THUMB_DIR.iterdir():
                if f.is_file() and not f.name.startswith("."):
                    try:
                        f.unlink()
                    except Exception:
                        pass
        else:
            log(f"push: FALLO HTTP {r.status_code} → {r.text[:200]}")
    except Exception as e:
        log(f"push: FALLO ({e})")


# ---------------------------------------------------------------- main

CONNECTORS = [
    ("tiktok", scrape_tiktok),
    ("facebook", scrape_facebook),
    ("instagram", scrape_instagram),
]


def main() -> int:
    push_mode = "--push" in sys.argv
    url_override = ""
    if "--url" in sys.argv:
        url_override = sys.argv[sys.argv.index("--url") + 1]

    if push_mode:
        # ===================== MODO PUSH (arquitectura PC → VPS) =====================
        # La PC scrapea con su IP residencial y envía el paquete al VPS por
        # HTTPS. La DB local NO se toca: el VPS es el dueño del dato.
        log("=== scraping en modo PUSH (PC → VPS) - inicio ===")

        if not url_override and (not INGEST_URL or not INGEST_SECRET):
            log("push: falta SOCIAL_INGEST_URL o SOCIAL_INGEST_SECRET en .env.local")
            return 1

        posts_by_network: dict = {}
        sync_statuses: list = []
        for network, fn in CONNECTORS:
            try:
                posts = fn()
                posts_by_network[network] = posts
                sync_statuses.append({
                    "network": network, "ok": True, "error": "", "found": len(posts),
                })
            except Exception as e:
                log(f"{network}: FALLO -> {e}")
                sync_statuses.append({
                    "network": network, "ok": False, "error": str(e)[:300], "found": 0,
                })

        if any(posts_by_network.values()):
            push_to_vps(posts_by_network, sync_statuses, url_override)
        else:
            log("push: ningún conector obtuvo posts — no se envía nada")
        log("=== fin (push) ===")
        return 0

    # ===================== MODO LOCAL (desarrollo: escribe la DB local) =====================
    log("=== scraping diario de redes - inicio ===")
    conn = db_connect()
    any_ok = False

    for network, fn in CONNECTORS:
        try:
            posts = fn()
            upsert_posts(conn, network, posts)
            record_sync(conn, network, ok=True, error="", found=len(posts))
            any_ok = True
        except Exception as e:
            log(f"{network}: FALLO -> {e}")
            try:
                record_sync(conn, network, ok=False, error=str(e)[:300], found=0)
            except Exception as e2:
                log(f"{network}: ademas, fallo al registrar sync ({e2})")

    # Limpieza de thumbnails que ya no se usan
    cleanup_orphan_thumbs(conn)
    conn.close()

    if any_ok:
        revalidate_home()
    log("=== fin ===")
    return 0


if __name__ == "__main__":
    sys.exit(main())
