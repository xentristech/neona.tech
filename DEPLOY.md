# Deploy de neona.tech (Git nativo de Hostinger)

Estrategia: **dos ramas**.

- `main` → código fuente Next.js (se edita aquí).
- `deploy` → sitio ya compilado (contenido de `out/` en la raíz). **Esta es la rama que Hostinger clona.**

Hostinger no ejecuta `next build`, por eso servimos la rama con el HTML ya generado.

---

## 1. Crear el repositorio (una sola vez)

En tu terminal, con el prefijo `!`:

```bash
! gh repo create xentristech/neona.tech --private --source=. --remote=origin
! git push -u origin main
! git push -u origin deploy
```

> Si prefieres que Hostinger clone sin autenticación, crea el repo `--public` en vez de `--private`.
> Con repo privado, en hPanel deberás añadir la **deploy key SSH** que Hostinger te da, a GitHub (Settings → Deploy keys).

## 2. Conectar en Hostinger (una sola vez)

hPanel → dominio **neona.tech** → **Avanzado → GIT**:

- **Repositorio**: `git@github.com:xentristech/neona.tech.git` (SSH) o la URL HTTPS si es público.
- **Rama**: `deploy`
- **Directorio**: `public_html` (raíz del dominio)
- Guardar → **Deploy**. Hostinger clona la rama `deploy` en `public_html` y el sitio queda en vivo.
- Activa el **webhook de auto-deploy** para que cada push a `deploy` se publique solo.

## 3. Actualizar el sitio (cada cambio)

```bash
# 1) editar el código en main, luego:
npm run build              # genera out/
npm run publish            # actualiza la rama deploy y hace push
```

`npm run publish` recompila, vuelca `out/` en la rama `deploy` y hace push.
Si el webhook está activo, Hostinger publica automáticamente. Si no, pulsa **Deploy** en hPanel.

---

### Notas
- El dominio ya existe en Hostinger como addon: `public_html` en `/home/u848706566/domains/neona.tech/public_html`.
- `_next/` (con guion bajo) se sirve sin problema en Apache.
- Recuerda configurar el registro de correo `hola@neona.tech` si quieres recibir en esa dirección.
