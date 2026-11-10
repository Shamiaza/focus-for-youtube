#!/usr/bin/env bash
# Crea lo zip da caricare sullo store: solo i file che servono all'estensione.
set -euo pipefail
cd "$(dirname "$0")"

version=$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' manifest.json)
out="dist/focus-for-youtube-$version.zip"

mkdir -p dist
rm -f "$out"
zip -q -r -X "$out" \
  manifest.json background.js content.js settings.js \
  popup.html popup.js \
  hide-shorts.css hide-distractions.css \
  rules-home.json rules-shorts.json \
  _locales icons \
  -x 'icons/*.svg'

echo "$out"
unzip -l "$out"
