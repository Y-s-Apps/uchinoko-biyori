#!/bin/sh
# うちのこ日和: src/ から公開用ファイルを組み立てる
#   ../index.html, ../sw.js        … ホーム画面版（GitHub Pages）
#   out/uchinoko-claude.html       … Claude アーティファクト版
set -e
cd "$(dirname "$0")"
JS="js_data.js js_data2.js js_pet.js js_wear.js js_app.js js_onboard.js"
VER=$(cat $JS head.html body.html home_head.html | sha1sum | cut -c1-10)
mkdir -p out
{ cat head.html; cat body.html; echo '<script>'; echo 'const HOME = false;'; cat $JS; echo '</script>'; } > out/uchinoko-claude.html
{ cat home_head.html; cat head.html; echo '</head>'; echo '<body>'; cat body.html; echo '<script>'; echo 'const HOME = true;'; cat $JS;
  echo "if ('serviceWorker' in navigator && location.protocol === 'https:') addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));";
  echo '</script>'; echo '</body>'; echo '</html>'; } > ../index.html
sed "s/__VER__/$VER/" sw.js > ../sw.js
cp manifest.webmanifest ../
echo "built ($VER)"
