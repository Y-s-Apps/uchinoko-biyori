#!/bin/sh
# うちのこ日和: src/ から公開用ファイルを組み立てる
#   ../index.html, ../sw.js        … ホーム画面版（GitHub Pages）
#   out/uchinoko-claude.html       … Claude アーティファクト版
set -e
cd "$(dirname "$0")"
JS="js_data.js js_data2.js js_data3.js js_pet.js js_wear.js js_app.js js_features.js js_onboard.js"
VER=$(cat $JS head.html body.html home_head.html sw.js manifest.webmanifest | sha1sum | cut -c1-10)
mkdir -p out
{ cat head.html; cat body.html; echo '<script>'; echo 'const HOME = false;'; cat $JS; echo '</script>'; } > out/uchinoko-claude.html

# ホーム画面版の <script> の中身。CSP はこの中身のハッシュだけを実行してよいものにする
{ echo; echo 'const HOME = true;'; cat $JS;
  echo "if ('serviceWorker' in navigator && location.protocol === 'https:') addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));"; } > out/home-script.js
HASH="sha256-$(openssl dgst -sha256 -binary out/home-script.js | base64 | tr -d '\n')"
{ sed "s|__SCRIPT_HASH__|$HASH|" home_head.html; cat head.html; echo '</head>'; echo '<body>'; cat body.html;
  printf '<script>'; cat out/home-script.js; echo '</script>'; echo '</body>'; echo '</html>'; } > ../index.html
grep -q "'$HASH'" ../index.html

sed "s/__VER__/$VER/" sw.js > ../sw.js
cp manifest.webmanifest ../
echo "built ($VER)"
