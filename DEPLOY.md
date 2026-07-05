# Deploy de neona.tech (Vercel)

El sitio es una **app Next.js completa** (Node): la coming-soon en `/`, el rediseño en `/beta`
y una API route server-side `/api/improve` que llama a **OpenAI** con la key oculta en el servidor.

Se despliega en **Vercel** (la plataforma de los creadores de Next.js).

---

## 1. Importar el repo en Vercel (una sola vez)

1. Entra a **https://vercel.com/new** e inicia sesión con GitHub (cuenta `xentristech`).
2. Selecciona el repo **`neona.tech`** → **Import**.
3. En **Environment Variables**, agrega:
   - `OPENAI_API_KEY` = tu key de OpenAI (https://platform.openai.com/api-keys)
   - (opcional) `OPENAI_MODEL` = `gpt-4o-mini`
4. **Deploy**. En ~1 min tienes una URL `*.vercel.app`.

## 2. Auto-deploy

Cada `git push` a `main` dispara un deploy automático en Vercel. No hay que hacer nada más.

## 3. Dominio propio (neona.tech)

En Vercel → proyecto → **Settings → Domains** → agrega `neona.tech`.
Vercel te da los registros DNS. En Hostinger (donde vive el DNS) cambia SOLO los registros web:

- `@` (A) → la IP que indique Vercel (`76.76.21.21`)
- `www` (CNAME) → `cname.vercel-dns.com`

**No toques los registros de correo** (MX, SPF, DKIM): el email `@neona.tech` sigue en Hostinger, intacto.

---

## Local

```bash
cp .env.local.example .env.local   # y pon tu OPENAI_API_KEY
npm run dev                        # http://localhost:3000  (/ y /beta)
```

## Notas
- El mejorador de `/beta` usa `/api/improve` (server-side). La key nunca llega al navegador.
- La coming-soon estática que estuvo en el hosting compartido de Hostinger queda superseded por Vercel una vez se apunte el dominio.
