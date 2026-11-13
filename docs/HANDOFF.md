# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-13（8回目）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 **`uchinoko-e98616883d`**（2026-11-13、改行の きまり。`a7c7824`。pg_net で 公開中の `index.html`・`sw.js` の md5 が 手元と同じことを確かめた）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン22**（`a7c7824` の中身。`capabilities` は 引きついだ）。公開するときは `src/out/uchinoko-claude.html` の前に いまの版と同じ1行目（`<!doctype html><html><head><meta charset=utf8>…<body>`）を、うしろに `</body></html>` を つけて `publish_files`（このチャットでは `/home/claude/work/claude-page/index.html` に作った）
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。`a7c7824` で pg_net で `/`・`/dev/`・`/review/` の md5 が 手元の `src/out/line/index.html` と同じ＝`8bd5ccd9…`）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html 、利用規約 https://uchinoko-biyori.pages.dev/terms.html （どちらも 2026-11-13 改定）、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は **MCP の version 16**（`30b3c99` の `index.ts`。このチャットでも変えていない）。`deno.json` は `game.js` をコミット `2dca6cf` に固定したまま（`--check` で同じ。改行の直しは `game.js` に入らない画面の文だけ）
- Storage：バケット `cards`（公開・PNG だけ・2MB まで、ポリシーなし）
- サーバーを起こす：GitHub Actions「サーバーを起こす」（`.github/workflows/keepalive.yml`、active）。cron `23 18 */3 * *`＝日本時間 3:23 ごろ。手で動かした回（2026-11-13 11:06）は成功。**予定の実行は まだ来ていない**（このチャットの はじめ 11/13 13:48 に確かめた。はじめては 2026-11-14 3:23 ごろ）
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`（審査用）・`LINE_CHANNEL_SECRET_2012410265`（本番用）
- 本物の DB：会員・カードなどは 2026-11-13 13:30ごろ **0件**（このチャットでは 本物の DB に書いていない。pg_net で 公開中のページを読んだだけ）
- LINE Developers：Scope は `openid` だけ。「シェアターゲットピッカー」は 有効（2026-11-13）。認証審査は まだ申請しない（未認証でリリース → 個人事業主 → 申請）
- **診断レポート（約束①）：https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 （Claude Docs。段階0〜6、42こ。番号 1-1〜5-11 で よぶ）**
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK （Claude Docs。2026-11-13 に 3章「推奨」・4章「進める順番」・9章を いまの決めごとに あわせた）

## 直近のチャットでやったこと（2026-11-13、8回目：約束①の診断）

- Claude Fable 5.2 で、段階0〜6 の診断を ぜんぶ終えた（読んで しらべただけ。**コード・サーバー・本物の DB は 変えていない**。変えたのは `CLAUDE.md`・`docs/PROJECT.md`・このファイルだけ）。
- 見つけたのは **42こ（高0・中6・低20・情報16）。「必ず」は 0、「できれば リリースの前に」が 8**。くわしくは 診断レポート（上の URL）の 段階1〜5 の表と、段階6「直す順番の案」。
- 動かしたもの：`sh src/build.sh`（リポジトリと同じ＝`e98616883d`）、`line_e2e.py`（ルール・サーバー・画面86項目 ぜんぶ通った）、`smoke.py`・`smoke.py --line --android-inset 48`（エラー0）、`linebreak.py --line`（375・390px の 214場面、0件）。本物は `get_advisors`（security：RLS 有効でポリシーなし の情報だけ）、権限の SQL（読むだけ）、ログの項目（`x-session` は入らない）、git の履歴ぜんぶ（鍵なし）、Claude版の宣言（4つ、PROJECT.md と同じ）。
- 「サーバーを起こす」の予定の実行：**まだ来ていない**（11/13 17:35 に確かめた。はじめては 11/14 3:23 ごろ）。
- **オーナー決定（2026-11-13）：リリースの前に「直す順番の案 A」を ぜんぶ直す。直すのは いつもの Opus 5.5 のチャット。**（オーナーの答えは「全部。」。A の7項目と読んだ。42こ ぜんぶの意味だったら、つぎのチャットの はじめに オーナーに確かめる）

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **「サーバーを起こす」の予定の実行が動いたか**（2026-11-14 3:23 ごろ より あと）：`gh api 'repos/Y-s-Apps/uchinoko-biyori/actions/runs?per_page=10'` で `event` が `schedule` の回を見る。成功なら ログに `health: 200` と `db: 401 {"error":"nosession"}`。失敗なら `get_project`（止まっていたら `restore_project`）。
2. **約束①の直し（リリースの前。診断レポートの「直す順番の案 A」）：**
   1. **3-1（＋4-3）** `js_line.js`：`/login` が `expired`・`badtoken` で ことわられたら、1回だけ ページを読みなおす（くりかえし防止つき）。プロフィールの1行の 英語の合図（sdk・unavailable・expired）を やさしい ことばに（文言は 見本を見せてから）。
   2. **1-4** 名前を 文字（コードポイント）で切り、半分の絵文字（サロゲートの かたわれ）と 制御文字を取りのぞく：`js_onboard.js` 426行、`js_app.js` 814行（`decodeMovePayload`）、`index.ts` の `cleanPet`、毛色の名前・アルバムの文も。Postgres の jsonb は かたわれ（22P02）と `\u0000`（22P05）を ことわる（本物の DB で確かめた）。
   3. **3-2** `js_line.js` `offerLocal`：「つれてくる」が 通信で失敗したら「もういちど ためす／あとで」にして、新しい子を むりに むかえさせない（文言は 見本を見せてから）。「とっておいた子」を取り出す画面は あとで。
   4. **1-2** `index.ts`：カードの画像に、1人が持てる枚数の上限（例：新しい30まい。こえたら古いものから消す）と 全員の1日の上限。`CARD_MAX` を ほんとうの PNG の大きさ（はかる）の2〜3倍に。ポリシー・規約に1行。
   5. **1-3（＋5-1）** 上書き（`adopt`・`/import`）の前のセーブを 1人1つ とっておく表（マイグレーション。30日で消すなど）。ポリシーの「保存する期間」に1行。
   6. **1-1（＋5-4）** 通報が来たら カードを消す手順を `docs/PROJECT.md` 10章に。`terms.html` 第5条に「カードとして置けるのは 本サービスが作った子のイラストだけ。ほかの画像は 削除することがある」。改定日も。
   7. **5-5** 公開リポジトリの `CLAUDE.md`・`docs/` にある オーナーの事情（ふだん会社員・副業・個人事業主の予定）の行を やわらげるか、**オーナーに聞いてから**。
   - 2・4・5 は サーバーを変えるので 1回に まとめてデプロイ（`build_server.py` → `line_e2e.py` → push → `--pin` → デプロイ → `--check` → pg_net）。2 は ホーム画面版も変わる（だいずのアプリが更新される。`compare_home.py`）。直すときに 確かめの場面も足す（5-10）。ポリシー・規約を変えたら 改定日。
   - ぜんぶ直したら、`CLAUDE.md` の約束① と PROJECT.md 10章に「済み」。
3. **直したら リリース**（未認証のまま。下の「公開の日」）。
4. **リリースしたら：約束②（個人事業主の申請のための別プロジェクトのプロンプト）を ソーイから伝える。** そのプロジェクトで相談することに、診断の 5-7（AI への写真の送信の 同意の取り方、氏名・住所の書き方、未成年、責任の条項、有料化のときの表示）も入れる。
- おたすけ：ホーム画面版は1日おき（2026-11-12）。Claude版・LINE版は「前回から7日」のまま。

## 次にやること

- 上の保留（予定の実行の確認 → 約束①の直し → リリース → 約束② → 個人事業主 → 認証審査の申請）。
- リリースのあと（診断レポートの「直す順番の案 C」）：認証審査の前までに 5-7・5-8（カードの ボタンの色の決まり）・5-6・1-12／5-11（PROJECT.md 10章の `/save {data, baseRev}` の古い説明）・2-2（`_headers`）。だいずのアプリも変わるものは まとめて1回（2-1＋1-7、3-4、3-5、3-6、4-1・4-2・4-4）。人数が ふえたら 1-5・1-6・3-3・5-3 など。
- 認証審査を申請したら：審査は1〜2週間、「審査中」は取り消しも変更も できない（画面とサーバーも変えない）。認証されたら：「検索可能にする」は 承認から30日以内に押す。
- 認証のあと：公式アカウント（友だち追加）、ほかのアイデア。
- **公開の日：** オーナーの iPhone の LINE には ためしの子「こむぎ」が ゲストとして のこっているので、本番用の LIFF URL を LINE で ひらいて「こむぎを LINEに つれてくる？」が出たら**「やめておく」**→ はじめての画面の「引っこしコード」で だいずを取りこむ（取りこみは1人1回）。ホーム画面版で「引っこし・バックアップ」→「ファイルで保存」の控えも とっておく。開発用・審査用・本番用は 同じサーバーと DB。ためしで作った会員・カードの画像は、公開の前に けす（`app.cards` と Storage の `cards` が0件か確かめる）。公開の日に、本番用で「うちのこカードを おくる」が出るかも だいずで見る。
  - **だいずが ピンチ（おたすけ まち）の日には 引っこさない**（まっている れんぞくが運ばれず 1 になる＝診断 3-6）。ピンチなら おたすけを かなえてから。
  - だいずは LINE版へ引っこすと、おたすけが 1日おき → 7日に1回 になる（オーナー了承）。
  - リリースから1週間は、チャットの はじめに サーバーのログ（無料プランは1日分）を見る（診断 5-2）。
  - 実機で見る：LINE での見え方・動き、ひらいたまま つぎの日に もどったとき（3-1 を直したあと）。
  - できれば、テスターでない人（家族など）の LINE で 本番用の LIFF URL が ひらけるか 見てもらう。

## 気をつけること

- **改行と見た目：** 画面ぜんたいが `keep-all＋anywhere`。新しい文にも 文節の スペースを入れ、`tools/linebreak.py`（`--line`）で 0件か、スマホ幅のスクリーンショットで 目で確かめてから push。せまいところの名前は `softName()`、カタカナの長い名前を足したら `SOFT_WORDS`。`linebreak.py` の フォントは `cd tools/fonts && npm install`。
- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる（`md5sum`。いまは `e73a5d48…`・`8b807216…`）。
- 正規表現に 日本語の文字を そのまま書かない（`ぁ` のように）。Claude版を 文字コードなしで ひらくと、正規表現が こわれて スクリプトが まるごと止まる。
- `js_line.js` は `js_onboard.js` の boot の**あと**に読まれる。`renderHeader` などを包むときは、包んだあとに いまの画面にも1回あてる。
- **うちのこカードのメッセージは LINE の「カスタムシェアメッセージ」の決まり**（標準タイプ。バブル1つ、アクションは ボタンと下の行だけ、決まりに書いていない プロパティは 変えない、下の行の矢印の画像は 変えない）。本文を変えるときは https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/ を見なおす。ボタンと矢印は 本番用の LIFF URL。
- カードの絵の中では ページの CSS が効かない（表情は SVG の中の `<style>`）。サーバーの画像は 画面に出していない（CSP の `img-src` に supabase.co は ない。出すなら足す）。
- 補足資料の文（PROJECT.md 10章）に出てくる 画面の文言（「写真からむかえる」…「うちのこカードを おくる」「おくる」「LINEの データを けす」）を変えたら、補足資料も直す。
- **（あとで）認証審査を申請したら、審査中は LINE版の画面とサーバーを変えない**。
- LINE版の画面は3か所（`/`・`/review/`・`/dev/`）とも同じファイル。ページの中から ほかのファイルを読むときは、いちばん上からのパスにする。
- Scope は `openid` だけ。`shareTargetPicker` は Scope が いらない。
- 認証されたあとに 本番用の エンドポイントURL・ポリシーと規約の URL・アイコン・チャネル名・説明・多言語対応・Scope・友だち追加オプション・シェアターゲットピッカーを変えると再審査。
- ポリシーに書いたこと（取る情報・送り先・保存期間・外部サービス・回数の上限）を変えたら、`src/legal/` も同じコミットで直す。
- ルールの時刻・日付・偶然は `Clock` だけ。ルールや `buildPrompt`/`parseAI` を変えたらサーバーも作り直す（`build_server.py` → push → `--pin` → デプロイ）。`game.js` が変わらないときは、`deno.json` の固定はそのままでよい（`--check`）。
- LINE版のサーバーは、おせわの数字を画面から受けとらない。写真・AIの返事・トークン・カードの画像の中身はログに出さない。
- LINE版の画面で、サーバーへ送るものは `LineSync.queue` で1つずつ（queue の中から queue を使う処理を またない）。カードの `POST /card` は queue に入れない（`LineServer.call` を直接）。
- 端末のキー `line-owner`・`line-guest`・`line-left` は消さない。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ（Playwright の WebKit も 入れられない）。本物のサーバーと画面は `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`。PNG を読むときは `content` を文字にしない）で確かめる。
- **Supabase の `apply_migration` と `deploy_edge_function` は、作業環境の確認で止められることがある**。止められたら、オーナーに理由と中身を伝えて「もう一度ためしてよいか」を聞く。
- Edge Function のデプロイは `index.ts` を丸ごと送るので、送ったあと `get_edge_function` で中身を見て、手元と同じか確かめる。
- ブラウザ：アプリ内ブラウザは LINE Developers に ログインしていない。LINE Developers・Supabase の設定を変えるのは オーナーの許可をもらってから。**シークレットが出るページ（「チャネル基本設定」）は本文ごと読まない・画面全体を写さない**。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。実機の確認はオーナーにお願いする。
- Supabase の無料プランは、DB の動きが1週間ほど少ないと止まる（「サーバーを起こす」で3日ごと）。止まっていたら `restore_project`。Storage の無料の枠は 1GB。
- Cloudflare のビルド結果は `gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`。
