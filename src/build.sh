#!/bin/sh
# うちのこ日和: src/ から公開用ファイルを組み立てる
#   ../index.html, ../sw.js        … ホーム画面版（GitHub Pages）
#   out/uchinoko-claude.html       … Claude アーティファクト版
#   out/line/                      … LINE版（LINEミニアプリ。Cloudflare Pages がこのフォルダを公開する。本番用＝いちばん上、審査用＝review/、開発用＝dev/。
#                                    Cloudflare の ヘッダー _headers も。RUN_LINE=1 なら うちのこランの ゲーム run-<ハッシュ>.js も いちばん上に 1つ）
#   out/claude/                    … Claude版を そのまま 出せる 形（index.html＝claude_head.html＋uchinoko-claude.html＋</body></html>、
#                                    RUN_CLAUDE=1 なら うちのこランの ゲーム run-<ハッシュ>.js も。publish_files で この 2つを 出す）
#   ../run-<ハッシュ>.js            … うちのこランの ゲーム（RUN_HOME=1 のとき。中身は run_bundle.js）
set -e
cd "$(dirname "$0")"
JS="js_data.js js_data2.js js_data3.js js_pet.js js_wear.js js_rules.js js_app.js js_features.js js_onboard.js"
# スクリプトの SHA-256（base64）。openssl がない環境（Cloudflare のビルドなど）では python3 で同じ値を出す
sha256b64(){
  if command -v openssl >/dev/null 2>&1; then openssl dgst -sha256 -binary "$1" | base64 | tr -d '\n'
  else python3 -c 'import base64,hashlib,sys;print(base64.b64encode(hashlib.sha256(open(sys.argv[1],"rb").read()).digest()).decode(),end="")' "$1"; fi
}
sha256hex(){
  if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1" | cut -c1-64
  else python3 -c 'import hashlib,sys;print(hashlib.sha256(open(sys.argv[1],"rb").read()).hexdigest(),end="")' "$1"; fi
}
mkdir -p out

# うちのこランの ビルドの スイッチ（docs/RUN_DESIGN.md 9章）：出して よい 版だけに ランの 入口と ファイルを 入れる。
# ホーム画面版（P2〜P4）・Claude版（P5）・LINE版（P6。2026-11-22）。
# ためしに ランなしの 版を 作るときは RUN_HOME=0・RUN_CLAUDE=0・RUN_LINE=0 sh src/build.sh
RUN_HOME="${RUN_HOME-1}"; RUN_LINE="${RUN_LINE-1}"; RUN_CLAUDE="${RUN_CLAUDE-1}"
HOME_ORIGIN='https://y-s-apps.github.io/uchinoko-biyori/'   # ホーム画面版の 公開 URL（CSP に ファイルの URL を パスまで 書く）
LINE_ORIGIN='https://uchinoko-biyori.pages.dev/'             # LINE版の 公開 URL（同じく。審査用 /review/・開発用 /dev/ も いちばん上の 1つを 読む）
rm -f ../run-*.js
rm -rf out/claude; mkdir -p out/claude
# ゲームの ファイル（run_bundle.js。tools/run/build_run.mjs が 作る）の 名前と integrity（ホーム画面版・Claude版・LINE版で 同じ）
RUN_FILE=''; RUN_SRI=''
if [ "$RUN_HOME" = 1 ] || [ "$RUN_CLAUDE" = 1 ] || [ "$RUN_LINE" = 1 ]; then
  [ -s run_bundle.js ] || { echo 'run_bundle.js が ありません（node tools/run/build_run.mjs）' >&2; exit 1; }
  RUN_FILE="run-$(sha256hex run_bundle.js | cut -c1-12).js"
  RUN_SRI="sha256-$(sha256b64 run_bundle.js)"
fi

# Claude版（アーティファクト。HOME = false＝Service Worker なし・クラウドの 保存）。
# うちのこラン（RUN_CLAUDE=1。P5）：ゲームの ファイルは アーティファクトの 2つめの ファイル run-<ハッシュ>.js（index.html と 同じ 場所。
# ページから 相対の パスで 読む＝アーティファクトの CSP は 自分の ファイルを 通す。integrity も つける）。ランの 画面（js_run.js。js_features.js の すぐあと）・
# CSS（run/run.css。head.html の すぐあと）・RUN_SRC・RUN_SRI は ホーム画面版と 同じ もの。
# out/claude/index.html は いまの アーティファクトと 同じ 1行目（claude_head.html）と うしろの 行で 包んだ もの（publish_files で そのまま 出せる）
CLAUDE_JS="$JS"; CLAUDE_DEFS=''; CLAUDE_CSS=''
if [ "$RUN_CLAUDE" = 1 ]; then
  CLAUDE_JS=$(echo "$JS" | sed 's/js_features\.js/js_features.js js_run.js/')
  CLAUDE_DEFS="const RUN_SRC = '$RUN_FILE', RUN_SRI = '$RUN_SRI';"
  CLAUDE_CSS=run/run.css
  cp run_bundle.js "out/claude/$RUN_FILE"
fi
{ cat head.html; if [ -n "$CLAUDE_CSS" ]; then echo '<style>'; cat "$CLAUDE_CSS"; echo '</style>'; fi; cat body.html;
  echo '<script>'; echo 'const HOME = false;'; if [ -n "$CLAUDE_DEFS" ]; then echo "$CLAUDE_DEFS"; fi; cat $CLAUDE_JS; echo '</script>'; } > out/uchinoko-claude.html
if [ "$RUN_CLAUDE" = 1 ]; then grep -q '^const RunUI = ' out/uchinoko-claude.html || { echo 'Claude版に js_run.js が 入っていません' >&2; exit 1; }; fi
{ cat claude_head.html; cat out/uchinoko-claude.html; echo '</body></html>'; } > out/claude/index.html

# ホーム画面版の <script> の中身。CSP はこの中身のハッシュだけを実行してよいものにする
# おたすけのおねがいの間隔（日）は、ホーム画面版だけ js_rules.js の 7 を HOME_RESCUE_EVERY に置きかえる
# （2 ＝ 1日おき。2026-11-12 オーナー決定）。Claude版・LINE版とサーバー（game.js）は js_rules.js の 7 のまま
HOME_RESCUE_EVERY=2
# ホーム画面版だけのJS（js_home.js）は js_rules.js のすぐあとに入れる
HOME_JS=$(echo "$JS" | sed 's/js_rules\.js/js_rules.js js_home.js/')
# うちのこラン（仮）：ゲームの ファイル（run_bundle.js。tools/run/build_run.mjs が 作る）を run-<ハッシュ>.js として ルートに 置き、
# ランの 画面（js_run.js。js_features.js の すぐあと）・CSS（run/run.css）・ファイルの 名前と integrity（RUN_SRC・RUN_SRI）を ホーム画面版に 入れる。
# CSP の script-src には その ファイルの URL だけを 足す（'self' に しない＝組織の ほかの Pages の スクリプトを 通さない）。sw.js も とっておく
RUN_CSP=''; RUN_CORE=''; RUN_DEFS=''; RUN_CSS=''
if [ "$RUN_HOME" = 1 ]; then
  cp run_bundle.js "../$RUN_FILE"
  RUN_CSP=" $HOME_ORIGIN$RUN_FILE"
  RUN_CORE=", '$RUN_FILE'"
  RUN_DEFS="const RUN_SRC = '$RUN_FILE', RUN_SRI = '$RUN_SRI';"
  RUN_CSS=run/run.css
  HOME_JS=$(echo "$HOME_JS" | sed 's/js_features\.js/js_features.js js_run.js/')
fi
{ echo; echo 'const HOME = true;'; [ -n "$RUN_DEFS" ] && echo "$RUN_DEFS"; cat $HOME_JS | sed "s/^const RESCUE_EVERY = 7;\$/const RESCUE_EVERY = $HOME_RESCUE_EVERY;/";
  echo "if ('serviceWorker' in navigator && location.protocol === 'https:') addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));"; } > out/home-script.js
grep -q "^const RESCUE_EVERY = $HOME_RESCUE_EVERY;\$" out/home-script.js && grep -q '^const HomeRescue = ' out/home-script.js || { echo 'ホーム画面版の RESCUE_EVERY の置きかえか js_home.js が入っていません（js_rules.js の行の形を確かめて）' >&2; exit 1; }
if [ "$RUN_HOME" = 1 ]; then grep -q '^const RunUI = ' out/home-script.js || { echo 'js_run.js が 入っていません' >&2; exit 1; }; fi
HASH="sha256-$(sha256b64 out/home-script.js)"
# キャッシュ名の版番号（sw.js の __VER__）は、ホーム画面版に入る中身から作る（LINE版だけの変更では変わらない。ランの ファイルは RUN_SRC の ハッシュで 入る）
VER=$(cat out/home-script.js head.html body.html home_head.html $RUN_CSS sw.js manifest.webmanifest | sha1sum | cut -c1-10)
{ sed -e "s|__SCRIPT_HASH__|$HASH|" -e "s|__RUN_CSP__|$RUN_CSP|" home_head.html; cat head.html;
  if [ -n "$RUN_CSS" ]; then echo '<style>'; cat "$RUN_CSS"; echo '</style>'; fi
  echo '</head>'; echo '<body>'; cat body.html;
  printf '<script>'; cat out/home-script.js; echo '</script>'; echo '</body>'; echo '</html>'; } > ../index.html
grep -q "'$HASH'" ../index.html
if [ "$RUN_HOME" = 1 ]; then grep -q "script-src '$HASH' $HOME_ORIGIN$RUN_FILE;" ../index.html || { echo 'CSP に ランの ファイルが 入っていません' >&2; exit 1; }; fi

sed -e "s/__VER__/$VER/" -e "s|__RUN__|$RUN_CORE|" sw.js > ../sw.js
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
# うちのこラン（RUN_LINE=1。P6）：ゲームの ファイルは いちばん上に 1つ（out/line/run-<ハッシュ>.js）。ページは それを '/run-….js'（いちばん上からの パス）で
# integrity つきで 読むので、審査用 /review/・開発用 /dev/ の ページも 同じ ファイル。CSP の script-src には その URL だけ（パスまで。'self' に しない）。
# ランの 画面（js_run.js）・CSS（run/run.css）は ホーム画面版と 同じ もの。LINE版だけの こと（走りだし runStart・ゴールの 番号・下の すき間・下スワイプ）は
# js_line.js と line_head.html
rm -rf out/line; mkdir -p out/line
LINE_JS="$JS"; LINE_DEFS=''; LINE_CSS=''; LINE_RUN_CSP=''
if [ "$RUN_LINE" = 1 ]; then
  LINE_JS=$(echo "$JS" | sed 's/js_features\.js/js_features.js js_run.js/')
  LINE_DEFS="const RUN_SRC = '/$RUN_FILE', RUN_SRI = '$RUN_SRI';"
  LINE_CSS=run/run.css
  LINE_RUN_CSP=" $LINE_ORIGIN$RUN_FILE"
  cp run_bundle.js "out/line/$RUN_FILE"
fi
{ echo; echo 'const HOME = true;'; echo "const LINE_DOCS = $DOCS;"; echo "const LINE_CONTACT = '$CONTACT';"; if [ -n "$LINE_DEFS" ]; then echo "$LINE_DEFS"; fi; cat $LINE_JS js_line.js; } > out/line-script.js
LHASH="sha256-$(sha256b64 out/line-script.js)"
{ sed -e "s|__SCRIPT_HASH__|$LHASH|" -e "s|__RUN_CSP__|$LINE_RUN_CSP|" line_head.html; cat head.html;
  if [ -n "$LINE_CSS" ]; then echo '<style>'; cat "$LINE_CSS"; echo '</style>'; fi
  echo '</head>'; echo '<body>'; cat body.html;
  printf '<script>'; cat out/line-script.js; echo '</script>'; echo '</body>'; echo '</html>'; } > out/line/index.html
grep -q "'$LHASH'" out/line/index.html
if [ "$RUN_LINE" = 1 ]; then
  grep -q '^const RunUI = ' out/line-script.js || { echo 'LINE版に js_run.js が 入っていません' >&2; exit 1; }
  grep -q "script-src '$LHASH' $LINE_ORIGIN$RUN_FILE https://static.line-scdn.net;" out/line/index.html || { echo 'LINE版の CSP に ランの ファイルが 入っていません' >&2; exit 1; }
fi
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
# うちのこランの ゲームの ファイルは 名前に 中身の ハッシュが あるので ずっと とっておいてよい（ひらく たびに たしかめの やりとりを しない。レビュー R6-2）
if [ "$RUN_LINE" = 1 ]; then printf '/%s\n  Cache-Control: public, max-age=31536000, immutable\n' "$RUN_FILE" >> out/line/_headers; fi
if [ "$DOCS" = true ]; then
  for f in privacy terms; do sed "s|__CONTACT__|$CONTACT|g" legal/$f.html > out/line/$f.html; done
  if grep -q '__CONTACT__' out/line/privacy.html out/line/terms.html; then echo 'お問い合わせ先が入っていません' >&2; exit 1; fi
fi
echo "built ($VER)${RUN_FILE:+ $RUN_FILE}$( [ "$RUN_CLAUDE" = 1 ] && echo ' ＋Claude版にも' )$( [ "$RUN_LINE" = 1 ] && echo ' ＋LINE版にも' )"
