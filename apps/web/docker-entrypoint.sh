#!/bin/sh
# Attend que le CMS réponde, génère le site statique, le publie dans /out.
set -e
: "${CMS_INTERNAL_URL:=http://cms:3000}"
export CMS_INTERNAL_URL

echo "[web] Attente du CMS sur $CMS_INTERNAL_URL ..."
i=0
until wget -q -O /dev/null "$CMS_INTERNAL_URL/api/access" 2>/dev/null; do
  i=$((i + 1))
  if [ "$i" -gt 60 ]; then
    echo "[web] CMS toujours pas prêt après ~3 min — build quand même."
    break
  fi
  sleep 3
done

echo "[web] Build Astro ..."
pnpm run build

echo "[web] Publication dans /out ..."
mkdir -p /out
rm -rf /out/* /out/.[!.]* 2>/dev/null || true
cp -a dist/. /out/
echo "[web] Terminé."
