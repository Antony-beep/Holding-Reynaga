This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Guía de Despliegue Next.js en VPS (Ubuntu + Nginx + PM2 + SSL)

## Fase 1: Preparación y Seguridad del Servidor

Al entrar por primera vez vía SSH (usualmente como `root`):

### Actualizar el sistema operativo

```bash
apt update && apt upgrade -y
```

### Configurar el Firewall (UFW)

Permitir SSH, HTTP y HTTPS antes de activar el firewall para evitar quedar fuera del servidor.

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

---

# Fase 2: Instalación del Entorno

## Instalar Node.js usando NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
```

## Instalar PNPM y PM2

```bash
npm install -g pnpm pm2
```

## Instalar Nginx y Certbot

```bash
apt install nginx certbot python3-certbot-nginx -y
```

---

# Fase 3: Preparación del Proyecto (Next.js)

Asumiendo que el proyecto ya fue clonado con Git y estás dentro de la carpeta del proyecto.

## Autorizar dependencias críticas como sharp

Editar el archivo `package.json` y agregar:

```json
"pnpm": {
  "onlyBuiltDependencies": [
    "sharp",
    "unrs-resolver"
  ]
}
```

## Instalar dependencias y compilar el proyecto

```bash
pnpm install
pnpm build
```

## Variables de entorno (formulario de leads)

El endpoint `POST /api/leads` guarda cada lead en SQLite (`data/leads.db` en el servidor) y luego lo replica a Google Sheets. Configurar estas variables antes de levantar la app (archivo `.env.local` en la raíz del proyecto, nunca subirlo a Git):

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=<email>@<proyecto>.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=<id de la hoja, entre /d/ y /edit en la URL>
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...
TURNSTILE_SECRET_KEY=0x4AAAA...
ADMIN_PASSWORD=<contraseña fuerte del panel /admin>
```

## Panel de administración de leads (/admin)

Acceso: `https://inmobiliariaholdingreynaga.com/admin` con la contraseña de `ADMIN_PASSWORD`.

- Ver leads de la última semana, último mes o todos.
- Seleccionar y eliminar leads individuales o por lotes.
- Limpieza por antigüedad (más de 1 mes / 3 meses / 6 meses / 1 año) para liberar espacio del VPS. Los leads ya sincronizados permanecen en Google Sheets.
- Seguridad: sesión con cookie HttpOnly firmada (8 horas), rate limit de 5 intentos de login por 15 minutos por IP, noindex y bloqueado en robots.txt.
- Pestaña "Redes Sociales": gestiona los posts de la sección "Síguenos" de la home y muestra la salud de cada conector del scraper.

Si olvidas la contraseña: cámbiala en el `.env.local` del VPS y reinicia con `pm2 restart holding-reynaga`.

## Libro de Reclamaciones Virtual (Ley N° 29571 / D.S. N° 011-2011-PCM)

Página pública: `/libro-de-reclamaciones` (enlazada en el Footer y en la sección de contacto).

### Checklist de cumplimiento

| Requisito legal | Implementación |
|---|---|
| Formato Anexo I (D.S. 011-2011-PCM) | Formulario con todos los campos: numeración correlativa, proveedor (razón social, RUC, dirección), fecha, datos del consumidor, bien/servicio y monto, tipo (reclamo/queja), detalle, pedido concreto, acciones del proveedor |
| Accesible en el mismo medio virtual | Página propia dentro del sitio web |
| Aviso visible en el portal | Link en el Footer + en la sección de contacto |
| Copia al consumidor (imprimir/enviar) | PDF generado al instante (descarga + adjunto por email) |
| Código de registro | Correlativo: LR-<año>-NNNNNN |
| Plazo de 15 días hábiles | Contador con feriados peruanos (tabla editable en /admin, 2026 precargado), semáforo rojo/ámbar |
| Conservación de registros | Reclamos inmutables en SQLite: sin borrado, solo atendido/anulado con motivo. Cubiertos por el respaldo de `data/leads.db` |
| Fiscalización INDECOPI | Export CSV desde /admin con todos los registros |
| Aviso Anexo II (sala de ventas) | Generable desde /admin → Reclamos → Configuración → "Descargar aviso PDF" |
| Respuesta escrita fundamentada | Flujo en /admin: registrar respuesta → enviar desde el correo de la empresa → marcar enviada (fecha de evidencia) → marcar atendido |

### Variables de entorno

```bash
RESEND_API_KEY=            # crear en resend.com (gratis, 100 correos/día)
RESEND_FROM_EMAIL=libro@inmobiliariaholdingreynaga.com
RECLAMOS_NOTIFY_EMAIL=holdingreynagaventas@gmail.com   # editable también en /admin
```

**Sin RESEND_API_KEY el sistema degrada con elegancia**: el reclamo se registra y el PDF se descarga, pero no salen correos (queda logueado en el servidor; la copia se puede reenviar desde /admin una vez configurado el envío).

### Configurar Resend (una sola vez)

1. Crear cuenta en [resend.com](https://resend.com) → **API Keys** → crear y poner el valor en `RESEND_API_KEY` (PC y VPS)
2. En Resend → **Domains** → agregar `inmobiliariaholdingreynaga.com`
3. Agregar los registros DNS que muestra Resend (SPF: TXT en la raíz; DKIM: CNAME) en el panel del dominio
4. En `/admin` → Reclamos → Configuración → **"Enviar email de prueba"** para verificar el circuito completo

### Gestión de reclamos (equipo de ventas)

1. Llega un reclamo → notificación al correo configurado (editable en /admin)
2. `/admin` → pestaña **Reclamos** → abrir el reclamo (ver semáforo de días hábiles)
3. Redactar la **respuesta formal** → guardar
4. **Enviar** la respuesta desde el correo de la empresa (Gmail) al email del consumidor
5. Marcar **"Respuesta enviada"** (queda la fecha como evidencia) → marcar **"ATENDIDO"**
6. Si el pedido es improcedente: fundamentar la negativa en la respuesta (obligación legal)
7. Los reclamos **no se pueden borrar** — solo anular con motivo (queda en el historial)

## Scraper de redes sociales (sección de video "Desde nuestras redes")

Extrae los últimos 3 posts de TikTok, Facebook e Instagram una vez al día (03:00), los guarda en SQLite, descarga los thumbnails y regenera la home automáticamente. En TikTok se saltan los 2 videos anclados de la cuenta para traer solo contenido reciente. La sección de video (`SocialVideos`) va después del formulario de contacto; el CTA de botones (`FollowUs`) cierra la página.

Instalación en el VPS (una sola vez):

```bash
cd ~/Holding-Reynaga
apt install python3-venv -y
python3 -m venv venv
./venv/bin/pip install -r scripts/requirements.txt
./venv/bin/python -m scrapling install   # descarga los browsers stealth (~600MB)
```

Cron diario (03:00) + token de regeneración:

```bash
# crontab -e
0 3 * * * cd /root/Holding-Reynaga && ./venv/bin/python scripts/scrap_social.py >> /var/log/scrap-social.log 2>&1
```

Notas:

- `REVALIDATE_SECRET` debe estar en el `.env.local` del VPS (igual que en local) para que la home se regenere tras el scraping.
- Prueba manual: `./venv/bin/python scripts/scrap_social.py`
- Si un conector falla (p. ej. Facebook con login-wall), lo anterior queda intacto y el panel /admin lo refleja. Los posts también se pueden agregar a mano desde el panel.
- Health check en `/admin` → pestaña "Redes Sociales".

Notas:

- La carpeta `data/` se crea sola; hacer backup copiando `data/leads.db`.
- Si un lead no logra llegar a Google Sheets, queda marcado con `sheets_synced = 0` y el siguiente cron lo reintenta:
- **IMPORTANTE**: no pegues el `GOOGLE_PRIVATE_KEY` a mano en `nano`/`vim` del VPS — los editores suelen deformar la clave y falla con `error:1E08010C:DECODER routines::unsupported`. Transfiere el archivo `.env.local` directamente desde tu PC con `scp` (ver pasos de despliegue en el historial del proyecto).
- Después de cambiar `.env.local`, siempre haz `pm2 restart <nombre-app>` porque Next.js lee las variables solo al arrancar.
- Para diagnosticar sync: `node --env-file=.env.local scripts/sync-sheets.js` imprime el error exacto de Google.

```bash
# crontab: reintentar cada 15 minutos los leads no sincronizados
*/15 * * * * cd /ruta/al/proyecto && node --env-file=.env.local scripts/sync-sheets.js >> /var/log/sync-sheets.log 2>&1
```

---

# Fase 4: Despliegue Permanente

## Levantar la aplicación con PM2

```bash
pm2 start pnpm --name "mi-proyecto" -- start
```

## Hacer que PM2 inicie automáticamente al reiniciar el servidor

```bash
pm2 save
pm2 startup
```

---

# Fase 5: Configuración de Nginx y SSL

## Crear el archivo de configuración de Nginx

```bash
nano /etc/nginx/sites-available/mi-dominio.com
```

## Pegar esta configuración base

```nginx
server {
    listen 80;
    server_name mi-dominio.com www.mi-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Guardar y salir:

```bash
Ctrl + O
Enter
Ctrl + X
```

## Activar el sitio y deshabilitar el default

```bash
rm /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/mi-dominio.com /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

# Fase 6: Generar SSL (HTTPS)

## Generar el certificado SSL con Certbot

```bash
certbot --nginx -d mi-dominio.com -d www.mi-dominio.com
```

### Importante

Cuando Certbot pregunte:

```text
1: No redirect
2: Redirect
```

Elegir la opción:

```text
2
```

Para forzar automáticamente todo el tráfico hacia HTTPS.

---

# Comandos Útiles

## Ver logs de PM2

```bash
pm2 logs
```

## Reiniciar la aplicación

```bash
pm2 restart mi-proyecto
```

## Ver procesos activos

```bash
pm2 list
```

## Reiniciar Nginx

```bash
systemctl restart nginx
```

## Verificar estado de Nginx

```bash
systemctl status nginx
```
