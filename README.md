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

Si olvidas la contraseña: cámbiala en el `.env.local` del VPS y reinicia con `pm2 restart holding-reynaga`.

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
