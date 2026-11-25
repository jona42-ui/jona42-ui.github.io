#!/usr/bin/env bash
# Print resume.html and portfolio.html from the built site to PDF with headless Chrome.
# Usage: npm run build && npm run pdf            -> writes into dist/ (what gets deployed)
#        npm run build && npm run pdf -- public  -> also refreshes the committed copies in public/
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME=${CHROME:-$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser)}
PORT=${PORT:-4329}

npx astro preview --port "$PORT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
for _ in $(seq 1 60); do curl -sf "http://localhost:$PORT/" >/dev/null && break; sleep 0.5; done

for pair in Resume:resume Portfolio:portfolio; do
  name=${pair%%:*}; page=${pair##*:}
  out="dist/Thembo_Jonathan_${name}.pdf"
  "$CHROME" --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=15000 --print-to-pdf="$out" "http://localhost:$PORT/${page}.html" 2>/dev/null
  echo "wrote $out ($(du -h "$out" | cut -f1))"
  if [[ "${1:-}" == "public" ]]; then cp "$out" public/; fi
done
