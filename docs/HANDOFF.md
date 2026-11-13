# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-13（5回目）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 `uchinoko-29c51138fd`（2026-11-12 から変わっていない。このチャットの変更は LINE版とサーバーだけ）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン21**（`047f1e0` の中身）。いまの main で作っても中身は同じ
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。`0286097`・`30b3c99` とも「Cloudflare Pages」success）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html 、利用規約 https://uchinoko-biyori.pages.dev/terms.html 、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は **MCP の version 16**（`30b3c99` の `index.ts`、2026-11-13 12:30ごろ デプロイ。`get_edge_function` で手元と同じことを確かめた）。`deno.json` は `game.js` をコミット `2dca6cf` に固定したまま（`game.js` は変わっていない。`--check` で同じ）
- **Storage：** バケット `cards`（公開・PNG だけ・2MB まで、ポリシーなし）。鍵は Edge Function の `SUPABASE_SECRET_KEYS`（はじめから入っている）。pg_net で `/health` が `"cards":true`
- **サーバーを起こす：** GitHub Actions「サーバーを起こす」（`.github/workflows/keepalive.yml`、active）。cron `23 18 */3 * *`＝日本時間 3:23 ごろ、1・4・7…31日の あくる日。手で動かした回（2026-11-13 11:06）は成功。**予定の実行は まだ来ていない**（このチャットは 11/13 12時台。はじめては 2026-11-14 3:23 ごろ）
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`（審査用）・`LINE_CHANNEL_SECRET_2012410265`（本番用）。カードのために足すものは ない
- 本物の DB：会員・ひもづけ・セッション・セーブ・AIの回数・カードは **0件**（2026-11-13）。表のマイグレーションは `app_schema`・`pg_net_for_checks`・`ai_usage`・`ai_usage_member_idx`・**`cards`**（2026-11-13 に足した）
- LINE Developers：Scope は `openid` だけ。「シェアターゲットピッカー」は**まだ有効にしていない**（画面ができたら オーナーが 開発用・審査用・本番用で有効にする）。**認証審査は まだ申請しない**（未認証でリリース → 個人事業主 → 申請、の順。オーナー決定）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK （Claude Docs。読むときは Claude Docs の `read`。うちのこカードの順番〈4章「進める順番」・3章「推奨」〉は まだ古いまま＝認証のあと、と書いてある。完成の前に あわせる）

## 直近のチャットでやったこと（2026-11-13、5回目）

- **「サーバーを起こす」の確認：** 予定の実行は まだ来ていなかった（12時台に確かめた。はじめては 11/14 3:23 ごろ）。
- **① 写真立てのイラスト（済み）：** LINE版で、写真の控えがない子は 写真立てに うちのこのイラスト（きせかえなし、にっこり、動かない）。`js_line.js` の `LineFrame` と `line_head.html` だけ。ホーム画面版の `index.html`・`sw.js` と Claude版は ビルドの前後で同じ。`tools/line_e2e.py` に 14。コミット `0286097`。
- **② うちのこカード：サーバー（済み）：** `POST /card`（PNG を確かめて Storage の `cards` に置き URL を返す。1人1日3枚、同じ絵は数えない）、`GET /card`、`/login` に `card`。1年使わない・やめたとき（すぐ）・2年の会員の画像を消す。表 `app.cards`。`api_test.ts` に card。コミット `30b3c99`。くわしくは PROJECT.md 10章「② うちのこカード：サーバー」。
  - `apply_migration` と Edge Function のデプロイは、作業環境の確認で1回ずつ止められ、オーナーの許可（このチャットで「もう一度ためす」「入れかえてよい」）で入れた。

### その前のチャット（2026-11-13、1〜4回目）

- 認証は 法人と個人事業主だけと分かり「未認証でリリース → 個人事業主 → 認証審査」に決めた。約束①②を `CLAUDE.md` に記録。審査の補足資料の文、GitHub Actions「サーバーを起こす」、Secrets・「LINEの データを けす」の実機の確認、Scope・英語の説明・所在国。リリースまでの「完成の中身」（写真立てのイラスト・うちのこカード）を決めた。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **「サーバーを起こす」の予定の実行が動いたか**（2026-11-14 3:23 ごろ より あと）：`gh api 'repos/Y-s-Apps/uchinoko-biyori/actions/runs?per_page=10'` で `event` が `schedule` の回を見る。成功なら ログに `health: 200` と `db: 401 {"error":"nosession"}`。失敗なら Supabase が止まっていないか `get_project`（止まっていたら `restore_project`）。まだ来ていなければ、そう伝えて つぎへ。
2. **② うちのこカード：画面を作る**（LINE版だけ。`js_line.js` と `line_head.html`。ホーム画面版の `index.html`・`sw.js` が変わらないことを ビルドの前後で確かめる）。
   - **作業の前に オーナーに聞くこと**（体験が変わるので）：カードの絵の見た目（形＝正方形か たて長か、わくの中の背景＝季節の色か おへやか など。ソーイが2〜3案の見本を見せて えらんでもらう）、Flex Message の本文の並びと文言（名前・「なかよしLv12・ともだち」・「れんぞく 31日」・ボタン「うちのこ日和で あそぶ」、トークの一覧に出る文〈altText〉）、送る前に カードの見本を出すか（おすすめ：出す）。
   - ソーイが ふつうの形で決めてよいこと：画像の大きさ（1024px 以内の PNG）、季節のわく（イベント中は そのイベント、ほかは 春・夏・秋・冬）、ボタンの場所（プロフィールの「引っこし・バックアップ」の近く。サーバーに つながっていて `card.on` のときだけ）、のこり枚数の出し方、上限・届かないときの文言。
   - しくみ：端末で SVG（`renderPet(look, { wear })`＋わく）→ キャンバス → PNG（表情は SVG の中に `<style>` を入れる。CSS のクラスは画像に効かない）→ `POST /card` → `liff.isApiAvailable('shareTargetPicker')` を確かめて `liff.shareTargetPicker([flex])`。ボタンの URI は どこから送っても 本番用の LIFF URL。CSP：画面にサーバーの画像を出すなら `img-src` に `https://ftakgswltcavwixqxpzi.supabase.co`（見本を端末の blob で出すなら いらない）。
   - 確認：`tools/line_e2e.py` に カードの場面（e2e_server.ts に Storage と shareTargetPicker のまね）、`smoke.py --line`。
   - **ポリシーと規約**（`src/legal/`）を 画面と同じコミットで直し、改定日を入れる：カードの画像（イラスト・季節のわく。写真と文字は入れない）を Supabase Storage に置くこと、URL を知っている人は見られること、1人1日3枚、さいごに使ってから1年・けすと すぐ（配信の一時的な保存に1時間ほど のこることがある）。
   - そのあと：オーナーに「シェアターゲットピッカー」を 開発用・審査用・本番用で有効にしてもらう → iPhone の LINE（Tester、開発用）で 実機の確認（カードを作る → 送る → トークで絵とボタン → ボタンで本番用が ひらく → 「LINEの データを けす」で画像が消える）。本物の Storage へのアップロードは まだ ためしていない（ここで はじめて確かめる）。
3. **完成の前に：** 補足資料の文（PROJECT.md 10章）に カードを送る手順を足す。計画書（Claude Docs）の うちのこカードの順番を いまの決めごとに あわせる。
4. **完成したら：約束①（Claude Fable 5.2 の診断とレビュー）を ソーイから伝え、Fable 5.2 のチャットに貼るプロンプトを作る**（`CLAUDE.md` の「オーナーとの約束」。見てほしい範囲に `/card`・Storage も入れた）。直すことが見つかったら直してから リリース。
5. **リリースしたら：約束②（個人事業主の申請のための別プロジェクトのプロンプト）を ソーイから伝える。**
- おたすけ：ホーム画面版は1日おき（2026-11-12）。Claude版・LINE版は「前回から7日」のまま（2026-11-13 に LINE版は7日のままと決めた）。

## 次にやること

- 上の保留（予定の実行の確認 → うちのこカードの画面 → ポリシーと規約 → シェアターゲットピッカー → 実機 → 補足資料と計画書 → 完成 → 約束①の診断 → 直す → リリース → 約束② → 個人事業主 → 認証審査の申請）。
- 認証審査を申請したら：審査は1〜2週間、「審査中」は取り消しも変更も できない（画面とサーバーも変えない）。認証されたら：「検索可能にする」は 承認から30日以内に押す（押さないと31日目の9:00に自動で検索できるようになる）。
- 認証のあと：公式アカウント（友だち追加）、ほかのアイデア。
- **公開の日：** オーナーの iPhone の LINE には ためしの子「こむぎ」が ゲストとして のこっているので、本番用の LIFF URL を LINE で ひらいて「こむぎを LINEに つれてくる？」が出たら**「やめておく」**→ はじめての画面の「引っこしコード」で だいずを取りこむ（取りこみは1人1回）。ホーム画面版で「引っこし・バックアップ」→「ファイルで保存」の控えも とっておく。開発用・審査用・本番用は 同じサーバーと DB。うちのこカードの ためしで 開発用に作った会員・カードの画像は、公開の前に「LINEの データを けす」で消す（だいずの取りこみの前に。画像も いっしょに消える。`app.cards` と Storage の `cards` が0件か確かめる）。
  - だいずは LINE版へ引っこすと、おたすけが 1日おき → 7日に1回 になる（オーナー了承）。
  - できれば、テスターでない人（家族など）の LINE で 本番用の LIFF URL が ひらけるか 見てもらう（Android の人なら なおよい）。

## 気をつけること

- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない（`CLAUDE.md` の「守ること」）。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる（`md5sum` を とっておいて くらべる）。
- `js_line.js` は `js_onboard.js` の boot の**あと**に読まれる（boot は その前に おへやを出している）。`renderHeader` などを包むときは、包んだあとに いまの画面にも1回あてる（写真立てで そうした）。
- **（あとで）認証審査を申請したら、審査中は LINE版の画面とサーバーを変えない**。
- LINE版の画面は3か所（`/`・`/review/`・`/dev/`）とも同じファイル。ページの中から ほかのファイルを読むときは、いちばん上からのパス（`/privacy.html` など）にする。うちのこカードの「あそぶ」ボタンは、どこから送っても 本番用の LIFF URL。
- Scope は `openid` だけ。画面で `liff.getProfile()` など `openid` 以外の権限が要るものを呼ばない。`shareTargetPicker` は Scope が いらない。
- 認証されたあとに 本番用の エンドポイントURL・ポリシーと規約の URL・アイコン・チャネル名・説明・多言語対応・Scope・友だち追加オプション・**シェアターゲットピッカー**を変えると再審査。
- ポリシーに書いたこと（取る情報・送り先・保存期間・外部サービス・回数の上限）を変えたら、`src/legal/` も同じコミットで直す（`CLAUDE.md`）。カードの画面を出すコミットで、Storage・カードの画像・1年・1日3枚を足す。
- ルールの時刻・日付・偶然は `Clock` だけ。ルールや `js_onboard.js` の `buildPrompt`/`parseAI` を変えたらサーバーも作り直す（`build_server.py` → push → `--pin` → デプロイ）。`game.js` が変わらないときは、`deno.json` の固定はそのままでよい（`--check` で確かめる）。
- LINE版のサーバーは、おせわの数字を画面から受けとらない。AIの返事は `parseAI()` を通した形だけを画面にわたす。写真・AIの返事・トークン・カードの画像の中身はログに出さない。
- LINE版の画面で、サーバーへ送るものは `LineSync.queue` で1つずつ。queue の中から queue を使う処理（`reload` など）を まつと止まるので、またない。むかえた子は `pushPending` で おせわより先に。カードの `POST /card` は セーブを変えないので、queue に入れなくてよい（`LineServer.call` を直接）。
- 端末のキー `line-owner`・`line-guest`・`line-left` は消さない。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ。`*.pages.dev`・`*.github.io`・`supabase.co`・LINE・Anthropic には直接届かない。本物のサーバーと画面は `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`）で確かめる。サーバーのようすは `query_logs` でも見られる。ウェブのページは WebSearch のあとの WebFetch で読む。
- **Supabase の `apply_migration` と `deploy_edge_function` は、作業環境の確認で止められることがある**（このチャットでは両方 止められた）。止められたら、オーナーに理由と中身を伝えて「もう一度ためしてよいか」を聞く（回り道で DDL やデプロイをしない）。許可をもらったら 同じものを もう一度送る。
- Edge Function のデプロイは `index.ts` を丸ごと（JSON の文字列として）送るので、送ったあと `get_edge_function` で中身を見て、手元と同じか確かめる（とくに正規表現の `\`）。そのあと pg_net で `/health`・でたらめのセッションの 401・CORS（プレビューの origin）を見る。
- ブラウザ：アプリ内ブラウザは LINE Developers に ログインしていない（2026-11-13）。LINE Developers・Supabase の設定を変えるのは オーナーの許可をもらってから。**シークレットが出るページ（LINE Developers の「チャネル基本設定」）は本文ごと読まない・画面全体を写さない**。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。サーバー側の通しは `line_e2e.py`（PGlite）で確かめ、本物は 読むだけ＋セッションなしの呼び出しにする。実機の確認はオーナーにお願いする。
- Supabase の無料プランは、DB の動きが1週間ほど少ないと止まる。GitHub Actions「サーバーを起こす」で3日ごとに起こしている。止まっていたら MCP の `restore_project` で戻す。GitHub は 60日 リポジトリに動きがないと 予定の仕事を止める。Storage の無料の枠は 1GB（カードの画像は 1人1日3枚・1年で消す）。
- Cloudflare のビルド結果は、GitHub のコミットのチェック（「Cloudflare Pages」）で確かめられる（`gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`）。
