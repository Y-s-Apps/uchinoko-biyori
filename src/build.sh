#!/bin/sh
# うちのこ日和: src/ から公開用ファイルを組み立てる
#   ../index.html, ../sw.js        … ホーム画面版（GitHub Pages）
#   out/uchinoko-claude.html       … Claude アーティファクト版
#   out/line/                      … LINE版（LINEミニアプリ。Cloudflare Pages がこのフォルダを公開する。本番用＝いちばん上、審査用＝review/、開発用＝dev/。
#                                    Cloudflare の ヘッダー _headers も）
set -e
cd "$(dirname "$0")"
JS="js_data.js js_data2.js js_data3.js js_pet.js js_wear.js js_rules.js js_app.js js_features.js js_onboard.js"
# スクリプトの SHA-256（base64）。openssl がない環境（Cloudflare のビルドなど）では python3 で同じ値を出す
sha256b64(){
  if command -v openssl >/dev/null 2>&1; then openssl dgst -sha256 -binary "$1" | base64 | tr -d '\n'
  else python3 -c 'import base64,hashlib,sys;print(base64.b64encode(hashlib.sha256(open(sys.argv[1],"rb").read()).digest()).decode(),end="")' "$1"; fi
}
mkdir -p out
{ cat head.html; cat body.html; echo '<script>'; echo 'const HOME = false;'; cat $JS; echo '</script>'; } > out/uchinoko-claude.html

# ホーム画面版の <script> の中身。CSP はこの中身のハッシュだけを実行してよいものにする
# おたすけのおねがいの間隔（日）は、ホーム画面版だけ js_rules.js の 7 を HOME_RESCUE_EVERY に置きかえる
# （2 ＝ 1日おき。2026-11-12 オーナー決定）。Claude版・LINE版とサーバー（game.js）は js_rules.js の 7 のまま
HOME_RESCUE_EVERY=2
# ホーム画面版だけのJS（js_home.js）は js_rules.js のすぐあとに入れる
HOME_JS=$(echo "$JS" | sed 's/js_rules\.js/js_rules.js js_home.js/')
{ echo; echo 'const HOME = true;'; cat $HOME_JS | sed "s/^const RESCUE_EVERY = 7;\$/const RESCUE_EVERY = $HOME_RESCUE_EVERY;/";
  echo "if ('serviceWorker' in navigator && location.protocol === 'https:') addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));"; } > out/home-script.js
grep -q "^const RESCUE_EVERY = $HOME_RESCUE_EVERY;\$" out/home-script.js && grep -q '^const HomeRescue = ' out/home-script.js || { echo 'ホーム画面版の RESCUE_EVERY の置きかえか js_home.js が入っていません（js_rules.js の行の形を確かめて）' >&2; exit 1; }
HASH="sha256-$(sha256b64 out/home-script.js)"
# キャッシュ名の版番号（sw.js の __VER__）は、ホーム画面版に入る中身から作る（LINE版だけの変更では変わらない）
VER=$(cat out/home-script.js head.html body.html home_head.html sw.js manifest.webmanifest | sha1sum | cut -c1-10)
{ sed "s|__SCRIPT_HASH__|$HASH|" home_head.html; cat head.html; echo '</head>'; echo '<body>'; cat body.html;
  printf '<script>'; cat out/home-script.js; echo '</script>'; echo '</body>'; echo '</html>'; } > ../index.html
grep -q "'$HASH'" ../index.html

sed "s/__VER__/$VER/" sw.js > ../sw.js
cp manifest.webmanifest ../

# LINE版：ホーム画面版と同じJS（端末保存・写真は端末の中だけ）に js_line.js を足す。
# Service Worker・manifest・apple-touch-icon は使わない。CSP は LIFF SDK（static.line-scdn.net）も読みこめる
# プライバシーポリシーと利用規約（LINEの審査で URL を出す：…/privacy.html と …/terms.html。もとは legal/）。
# お問い合わせ先（Googleフォームの URL：https://forms.gle/… か https://docs.google.com/forms/d/e/…/viewform）は ここ1か所。
# 空のあいだは ページを出さず、アプリにもリンクを出さない（ためしでは CONTACT=… sh src/build.sh で入れられる）
CONTACT="${CONTACT-https://forms.gle/aywxktpPZettxFSS7}"
CONTACT="${CONTACT%%\?*}"   # ?usp=… などは はずす
if [ -n "$CONTACT" ] && ! printf '%s' "$CONTACT" | grep -Eq '^https://(forms\.gle/[A-Za-z0-9]+|docs\.google\.com/forms/d/e/[A-Za-z0-9_-]+/viewform)$'; then
  echo "CONTACT は Googleフォームの URL にしてください" >&2; exit 1
fi
if [ -n "$CONTACT" ]; then DOCS=true; else DOCS=false; fi
rm -rf out/line; mkdir -p out/line
{ echo; echo 'const HOME = true;'; echo "const LINE_DOCS = $DOCS;"; echo "const LINE_CONTACT = '$CONTACT';"; cat $JS js_line.js; } > out/line-script.js
LHASH="sha256-$(sha256b64 out/line-script.js)"
{ sed "s|__SCRIPT_HASH__|$LHASH|" line_head.html; cat head.html; echo '</head>'; echo '<body>'; cat body.html;
  printf '<script>'; cat out/line-script.js; echo '</script>'; echo '</body>'; echo '</html>'; } > out/line/index.html
grep -q "'$LHASH'" out/line/index.html
cp ../favicon-32.png ../favicon-64.png out/line/
# うちのこカード（トークに送る メッセージ）の 下の行に出す LINEミニアプリの アイコン（https://uchinoko-biyori.pages.dev/line-icon.png）
cp icons/line-icon-130.png out/line/line-icon.png
# 審査用・開発用の内部チャネルの画面（LINE Developers の エンドポイントURL：…/review/・…/dev/。本番用は いちばん上の …/）。
# 中身は同じで、js_line.js が ひらいた場所で LIFF ID をえらぶ。ポリシー・規約・favicon は いちばん上のものを使う
for d in review dev; do mkdir -p out/line/$d; cp out/line/index.html out/line/$d/index.html; done
# Cloudflare Pages の HTTP ヘッダー（診断 2-2）。nosniff は Cloudflare も はじめから つける。リファラーは ページの meta と そろえて 送らない。
# ほかのサイトの枠（iframe）に 入れさせない（meta の CSP では 書けない）。2026-11-14 に 開発用だけで 入れて、iPhone の LINE で ひらけるのを
# オーナーが 確かめてから ぜんぶに 広げた（LINE は ミニアプリを 枠に 入れない）
cat > out/line/_headers <<'HEADERS'
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Content-Security-Policy: frame-ancestors 'none'
  X-Frame-Options: DENY
HEADERS
if [ "$DOCS" = true ]; then
  for f in privacy terms; do sed "s|__CONTACT__|$CONTACT|g" legal/$f.html > out/line/$f.html; done
  if grep -q '__CONTACT__' out/line/privacy.html out/line/terms.html; then echo 'お問い合わせ先が入っていません' >&2; exit 1; fi
fi
echo "built ($VER)"
