#!/usr/bin/env bash
# Actualiza la rama 'deploy' con el sitio compilado (out/) y hace push.
# Uso: npm run publish   (ejecuta build + este script)
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

if [ ! -d "out" ]; then
  echo "No existe out/. Ejecuta 'npm run build' primero."
  exit 1
fi

TMP="$(mktemp -d)"
cleanup() { git worktree remove "$TMP" --force >/dev/null 2>&1 || true; }
trap cleanup EXIT

# Engancha la rama deploy (existente o nueva) en un worktree temporal
if git show-ref --verify --quiet refs/heads/deploy; then
  git worktree add "$TMP" deploy >/dev/null
else
  git worktree add -B deploy "$TMP" >/dev/null
fi

# Reemplaza el contenido por el build fresco
find "$TMP" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -r out/. "$TMP"/

cd "$TMP"
git add -A
if git diff --cached --quiet; then
  echo "Sin cambios en el sitio compilado."
else
  git commit -m "deploy: $(date +%Y-%m-%d\ %H:%M)"
  git push origin deploy
  echo "Rama deploy publicada."
fi
