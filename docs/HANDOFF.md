# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-28 朝（38回目：**いそぎの 2つ＋認証審査の 前の 包括的な 診断＋オーナーの 確かめ。Opus 5.5。** ① お父さんが あそべない＝公式アカウントに 入口が なかった → オーナーが リッチメニュー「あそぶ」と あいさつの リンクを 設定（11-28 06:10）。② プロフィールで 名前・みためが もどる＝LINE版の 不具合 → 直して 出した（main `a652983`。サーバー・ホーム画面版・Claude版は かわらない）。③ 包括的な 診断 済み（25こ。**オーナー決定：直せる ものは ぜんぶ 直す**・認証審査の 申請は 時期 未定）。④ Data API の 自動公開を オーナーが オフ（11-28 06:18）。⑤ だいずの 動画で しっぽは OK、**あたらしく 2つ＝おちばの カクッ（N-1）・ポップアップの 耳（N-2）**。**つぎの チャット：診断の 直し（表と プロンプトは「次にやること」）**）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 **`uchinoko-8ba77db0b6`**（37回目の しっぽと「かなえた」。`index.html`・`sw.js` の md5 は `e68858e4…`・`50f52348…`＝本番を pg_net で 読んで 同じ。`run-5d3805aee4a4.js` は かわらない `283ca8f2…`）。おせわの 結果は 前と 同じ（`compare_home.py`：おなじ）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン40**（37回目。version `1795768662-443c`、contract `0.2.73` の まま、capabilities は 引きついだ〈db の ルール 2つ・downloads・sample〈images〉・user〉）。**ファイルは 2つ：`index.html`（sha256 `dce4fc65…`、497,820 バイト）と うちのこランの `run-5d3805aee4a4.js`（`5d3805ae…`。かわらない）**（出す 前に `list_files` で バージョン39 が 記録 どおり〈`5b29ac81…`〉なのを 確かめ、前の 版〈HEAD〉を べつの worktree で 作りなおして 同じ sha256 なのも 確かめてから `publish_files`〈patch・index.html だけ〉。ちがいが 小さい ときは `edit_version` で その 部分だけ 置きかえて よい）。**出し方：** `sh src/build.sh` が `src/out/claude/` に そのまま 出せる 形（`index.html`＝いまの 版と 同じ 1行目 `src/claude_head.html`＋中身＋`</body></html>`、`run-<ハッシュ>.js`）を 作る → `publish_files`（slug は UUID `507aa3eb-87ee-4ddc-80e3-61638a697f56`。短い id は ことわられる。files は その 2つ、`capabilities`・`contract`・`title` は はぶく。ゲームが かわって 名前が かわったら 前の `run-*.js` を `remove`）。出す 前に 前の 版を 作りなおして `list_files` の sha256 と 同じか 確かめる
- ためしの アーティファクト「うちのこ日和 P5 ためし」：https://claude.ai/artifact/G6JjwCoMcYMZ96pctVrYQF （slug `7a36bb48-06ef-452f-8c27-c7e849d00828`。ほんものとは べつ。セーブの キーは `uchinoko-p5test:`、ためしの 子「ためし」、db だけ 宣言。ひらくと 読みこみ・integrity・WebGL 2 を しらべて db の `probe/env`、ランを ひらく・走ると `probe/open` に 書く＝`db_list`（collection `probe`）で 読む）。2026-11-22 に オーナーが iPhone で ひらいて 結果を 読んだ（15章）。**2026-11-27 オーナー決定：のこす**（`delete_artifact` は オーナーが たのんだ ときだけ）
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。**38回目（`a652983`）の あとの md5 は 本番用・審査用・開発用 `de27677a…`（3か所とも pg_net で 読んで 同じ）、ゲームの ファイル `/run-5d3805aee4a4.js` は `283ca8f2…`（かわらない）**。`LINE_CFG.oaId` に `@370iymyw`）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - ヘッダー（`_headers`）：ぜんぶ（`/*`）に `Referrer-Policy: no-referrer`・`X-Content-Type-Options: nosniff`・`Content-Security-Policy: frame-ancestors 'none'`・`X-Frame-Options: DENY`
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html ・利用規約 https://uchinoko-biyori.pages.dev/terms.html （ポリシーは **2026-11-22 改定〈うちのこランの 記録〉**＝本番の ページで 改定日と「うちのこラン」の 文を 確かめた）、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は **MCP の version 31**（2026-11-27 夕方 36回目。37回目は 絵と CSS だけ＝`build_server.py --check` 同じ・デプロイ なし。`index.ts` は かわらない〈sha256 `b2fafd73…`〉・`deno.json` は `game.js` を `1567b54` に 固定〈季節イベント 4つの データ〉。`get_edge_function` の 結果を python で 手元と くらべて 2つとも 同じ・`/health` は 200・errors 0・セッションなしの `/save` は 401 `nosession`。**さいしょの デプロイは 作業環境の 確かめで 止められた → オーナーに 中身を つたえて「もう一度 ためして OK」で 出した**）。`js_pet.js` の 絵（`renderPet`・`renderPetSide`・`renderPetBack`）を かえても `game.js` は かわらない＝デプロイ いらない（`build_server.py --check` で 確かめる）。**イベント・きせかえ・おやつの データ（`js_data2.js`・`js_data3.js`）を かえたら `game.js` が かわる＝デプロイ**
- **cron の 関数 `app.notify_kick()`：2026-11-19 に `notify_cron_retry` で 置きかえた**（21:05 は とちゅうで 止まった回も。`pg_get_functiondef` の md5 `4fd92ef1…`）
- 表：`app` スキーマに members・line_accounts・sessions・saves・cards・save_backups・day_quota・error_counts・chores・notify_runs
- **cron：** pg_cron 1.6.4、ジョブ `uchinoko-notify`（**`0,5 12 * * *`＝日本時間 21:00 と 21:05**。`select app.notify_kick()`。21:05 は 21:00 の回が とどかなかった・ことわられた日だけ 動く）。**2026-11-15 21:00 に はじめて 予定どおり 自分で 動いて 1通 とどいた**（`made 12:00:00 UTC`・`done 12:00:21`・`sent 1`・`failed 0`。21:05 は 送らない。オーナーが LINE で 見た）
- 役：`uchinoko_api`（`app` の表だけ。サーバーは この役で つないでいる）
- Storage：バケット `cards`（公開・PNG だけ・1MB まで、ポリシーなし）。カードは 全員で 1500まい まで
- サーバーを起こす：GitHub Actions（`.github/workflows/keepalive.yml`、cron `23 18 */3 * *`＝日本時間 3:23 ごろ、数時間 おくれることがある）。`/health` の `errors`（10以上で 失敗）と `notifyDays`（止まった日が あれば 失敗）を 見る。11-17 の回は 失敗（11-16 の 回を 見つけた）→ **11-20 の回（9:43）は 成功に もどった**（24回目に `gh api …/actions/workflows/keepalive.yml/runs` で 見た）。つぎの 予定は 11-23 3:23 ごろ
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`・`LINE_CHANNEL_SECRET_2012410265`・`APP_DB_PASSWORD`・`LINE_MESSAGING_TOKEN`
- 本物の DB（2026-11-27 16時・デプロイの あと）：`/health` の errors 0。よるの おしらせ 11-24〜26 は 3日とも おわった。
- 本物の DB（2026-11-26 23時43分・デプロイの あと）：`/health` の errors 0。よるの おしらせ 11-23〜25 は 3日とも おわった。
- 本物の DB（2026-11-26 20時29分・デプロイの あと）：`/health` の errors 0。よるの おしらせ 11-23〜25 は 3日とも おわった。
- 本物の DB（2026-11-22 21時45分・デプロイの あと）：`/health` の errors 0。よるの おしらせ 11-19〜21 は 3日とも おわった。
- 本物の DB（2026-11-22 8時・9時）：エラーの 数 0・会員 1人。よるの おしらせ 11-19〜21 は 3日とも おわった（`/health` の `notifyDays`）。
- 本物の DB（2026-11-22 2時・4時）：エラーの 数 0（`app.error_counts` 0行）・会員 1人。よるの おしらせ 11-19〜21 は 3日とも 21:00 の 回で おわった（11-19・20 は 1通、11-21 は とばした）。関数の ログ（24時間）は 200×37・204×4。「サーバーを起こす」11-20 は 成功。
- 本物の DB（2026-11-16 5時半）：**会員 1人＝だいず（本番用。11-16 5:10 に 取りこみ。よるの おしらせ オン・れんぞく 36日・スタンプ 36）**。カード・ひかえ・Storage の `cards` は 0件。`app` の 表に anon・authenticated の 権限は 0。エラーの 数 0。**だいずは 本物の 会員なので、ためしで セーブを さわらない**（`execute_sql` で 書きこまない。読むときも 名前・数だけ）
- LINE公式アカウント「うちのこ日和」（ベーシックID `@370iymyw`、Messaging API の プロバイダー「Y's Apps」、応答メッセージ・Webhook オフ）。ミニアプリの 友だち追加オプション・デフォルトの公式アカウントも 設定ずみ
- LINE Developers：Scope は `openid` だけ。「シェアターゲットピッカー」は 有効。認証審査は まだ申請しない（未認証でリリース → 個人事業主 → 申請）
- 診断レポート（約束①）：https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 （42こ・さいごのチェックの 17こ ぜんぶ 片づいた。**いちばん うしろの 章「パズルの レビュー（2026-11-16）」に 18回目の 結果**）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK
- オーナーの事情（約束②で使う）：claude.ai の このプロジェクトの資料 `claude/owner-notes.md`（非公開）

## 直近のチャットでやったこと（2026-11-27 夜〜11-28 朝、38回目：いそぎの 2つ・包括的な 診断・オーナーの 確かめ。Opus 5.5）

- **いそぎ 1（お父さんが あそべない）：** アプリの 不具合では なく、公式アカウント（`@370iymyw`）に アプリへの 入口が なかった（保留0）。オーナーが 11-28 06:10 に リッチメニュー「あそぶ」（本番用の LIFF URL）と あいさつの リンクを 設定し、トークの「あそぶ」から ひらけた（ログの 06:12 の ログイン・おせわ）。
- **いそぎ 2（名前・みためが もどる）：** main `a652983`（`js_line.js` の `LineSync.editPending`・`pushEdit`。`/act` より 先に `/save`）。`line_e2e.py` に 24（169 ok）。LINE の 3か所の md5 `de27677a…`。ホーム画面版・Claude版（バージョン40）・サーバー（version 31）は かわらない。
- **包括的な 診断：** 診断レポートの いちばん うしろの 章（25こ＝中1・低3・情報21、「必ず」は 0）。オーナー決定（11-28）：直せる ものは ぜんぶ 直す・認証審査の 申請は 時期 未定（記録だけ）。表は「次にやること」。
- **オーナーの 確かめ（11-28 朝）：** Data API の「Automatically expose new tables」を オフ（`pg_default_acl`・`app` の 権限・RLS・advisors 0・`/health` で 確かめた）。だいずの 動画（07:00）で うしろすがたの しっぽ OK。名前の 直しは だいずでは ためさない（DB と ログで かわっていないのを 確かめた）。
- **あたらしく 見つけた 2つ（直すのは つぎの チャット）：** N-1 おちばが 8秒ごとに カクッと 上に 飛ぶ（雪・花びらも。`@keyframes fall` の ずれが もようの 高さの 倍数で ない。動画の 3.42秒で 8px）・N-2 ポップアップで 耳の 先が 切れる（`.mpet .pet-svg` に `overflow:visible` が ない。ブラウザで 出して 確かめた）。くわしくは「次にやること」の 表。
- **出したもの：** main `a652983`（直し）と 記録の コミット（`8b95b5f`・`f03efad`・`82fcd7d`・`c1ed577` と この 記録）。

## その前のチャット（2026-11-27 夕方、37回目：うしろすがたの しっぽ。Opus 5.5）

- **はじめに（オーナー）：** ① LINE の 認証審査は **審査中で ない**。② もみじがりは「このままで OK」。だんかい 4 は 👌 だが「後ろから見ると 尻尾が 先頭に なるはずが マフラーが 先頭に なっている。そういった 細かいところを 修正したい」（だいずの 写真：まどの 下で うしろを むいて、マフラーの 端が まいた しっぽの 上）。
- **うしろすがた（main `1db3a28`）：** `renderPetBack` の 重なり順＝からだ → えりまき → せなかに たれる 首の きせかえ（`pb-neck.pb-neck-b`：マフラーの 端・バンダナの 先と その 点）→ うきわ → しっぽ（`pb-tail-lo`）→ 頭 → うなじの 帯（`pb-neck`）→ しっぽの 2まい目（`pb-tail-hi`。ふだん `visibility="hidden"`）。`wearBack` は `neck`・`back`・`over`。ふせる・奥へ あるく は `head.html` で `pb-tail-lo` を かくして `pb-tail-hi` を 見せる（しっぽが 頭・帯より 前）。しっぽを いつも いちばん 上に する 案は 帯・むすび目・金具が かくれるので とらなかった。前と あとの 画像を 見せた（`docs/MOTION_DESIGN.md` 15章の おわり）。
- **ついでの 直し：** ① きょうのおねがいの「かなえた」（`.okpill`。げいの「できる！」も）の 色の 差（行ごと `opacity:.8` で ライト 2.5・ダーク 4.4）→ うすく するのは アイコンと 文だけ・文字は ミント 45%＋`--ink`（4.9・6.5）。かなえた おねがいが ある ときだけ 出るので `smoke.py --dark` が ときどき 見つけていた。② `tools/smoke.py`：イベントの お知らせで「つけてみる」を おした あとは「にあう？」が おわるのを まってから よるの ひとこと（もみじがりの あいだ `--line` が 前の 版でも 失敗していた）。
- **ためし：** `poses.py`（ライト・ダーク とも うしろの 場面 `b-*` だけ ちがう＝`--changed`、ほかは 前と おなじ）・`smoke.py` 4とおり エラー 0・`compare_home.py` おなじ・`line_e2e.py` all passed・`linebreak.py --only req`（`--line` も）0・`build_server.py --check` 同じ。
- **出したもの：** main `1db3a28`（GitHub Pages・Cloudflare とも 成功、本番の md5 は pg_net で 手元と 同じ）→ Claude版 バージョン40（サーバーは かわらない）。
- **つぎに する こと（オーナー決定）：** 「診断を し、わんランと それに 関連する 実装を 完了に すすめていく。ただし、Opus 5.5 で 実施する」→ 認証審査の 前の 包括的な 診断を いま・Opus 5.5 の あたらしい チャットで。プロンプトを `docs/REVIEW_PROMPT.md` に 作りなおした（範囲：ぜんぶ・セキュリティも、だれも 見ていない `de696b7`・`b34a30d`・`080eeb8`・`64af560..1db3a28` は 1行も のこさず、うちのこランの レビューの「そのまま」と R3-2 を どう するか・「完了に するまでの のこり」）。ためしの アーティファクト「P5 ためし」は **のこす**（オーナー）。

## その前のチャット（2026-11-27 夕方、36回目：季節イベントを 4つ。Opus 5.5）

- **はじめに（オーナー）：** だんかい 4 は「まだ ちゃんと 見てない」。つぎは「季節イベントを ふやす」。
- **見本 5：** https://claude.ai/artifact/H3pwLsRJwUQ8B7v1Kj5MRv （slug `81f73f8f-e3b8-478c-a4bb-2926dffdb975`。元は `tools/event_sample5/`。`7d8d7ad`）。オーナーの「えらんだ もの」＝**4つ とも いれる**。
- **季節イベント（main `1567b54`）：** `js_data3.js` の `EVENTS`（もみじがり・としこし・せつぶん・ひなまつり。期間は かさならない）・`EVENT_WEAR`（`ev_acorn`・`ev_mikanhat`・`ev_oni`・`ev_hishiribbon`）・`weatherOf`（もみじがり＝`leaves`、としこし＝`snow`）、`js_data2.js` の `treatIcon`（`momijicookie`・`mikanjelly`・`arare`）、`js_wear.js` の あたまの kind（`acorn`・`mikanhat`・`oni`・`hishi`）、`js_features.js` の `SEASON_DECOR` と `garland` の 'leaf'、`head.html` の `.weather.w-leaves`、`js_app.js` の ひまな ときの `catch` に おちば「はっぱだ！」。
- **ためし：** `smoke.py` 6とおり エラー 0・`compare_home.py` おなじ・`rules_test.mjs`（「イベントが おわると…」を 1/10 に、4つの プレゼント・おやつ・期間の はしを 足した）・`line_e2e.py` all passed（ためしの 日が もみじがりで お知らせが ボタンを ふさぐので、`close_popups` を 足した）・`poses.py --no-ref`・`linebreak.py` 0（ホーム画面版 333・LINE版 390 場面）・`build_server.py`。
- **出したもの：** main `1567b54`（GitHub Pages・Cloudflare とも 成功）→ サーバー api version 31（`b8f68ea`）→ Claude版 バージョン39。本番の md5 は pg_net で 手元と 同じ。

## その前のチャット（2026-11-27 昼、35回目：きせかえの 直し＋だんかい 4＝うしろすがた。Opus 5.5）

- **はじめに（オーナー）：** ① LINE の 認証審査は **審査中で ない**。② だんかい 3 の 感想＝きせかえの あと、おへやの まんなかへ 行ってから くるりん して ほしい（ほかは OK）。
- **きせかえ（main `dabb5d5`）：** `showOutfit`：まんなか（x 50・y 82）から はなれて いたら あるいて → 正面で すわる → ひと息 0.55秒 → くるりん「にあう？」。動画（GIF）を 見せた。Claude版 バージョン37（`edit_version`）。
- **つぎに する こと（オーナー決定）：** だんかい 4（うしろ向き）の 見本から。包括的な 診断は 開業届の めどが ついたら 申請の 直前に。
- **見本 4：** https://claude.ai/artifact/3AxWJAf7rHmjWDHdf4RetB （slug `11962d6f-a967-451a-b777-2a62a3e6b17c`。元は `tools/motion_sample4/`。`3fb1bc9`）。オーナーの「えらんだ もの」＝**ぜんぶ おすすめ**（絵 OK・マフラーの 端は せなかに たらす・まど・タップ・雨・雪・奥へ あるく）。
- **だんかい 4（main `970a187`）：** `renderPetBack`・`wearBack`（`js_pet.js` の 絵の 行より 下）・CSS（`head.html` の パズルの 上の 前）・`Pet.mount` の 3まい目 `.view-b`・`POSE` の `bsit`・`bup`・`bdown`・`bwalk`（`back:true`）・`moveTo` の 奥へ（`(this.y − y) × 1.6 > |dx|`）・`IDLE` の `win`（ふりかえり `lookBack`）・`catch`・`rainwin`・`onTap`（うしろの ときは ふりかえって 2.2秒で もどる）・`GESTURE` の 耳ぴく・きょろきょろ。
- **ためし：** `smoke.py` 6とおり（`stage4_checks` を 足した。`gesture_checks` の あいだは ひまな ときの 行動を とめる）エラー 0・`compare_home.py` おなじ・`line_e2e.py` all passed・`poses.py`（ライト・ダーク とも 前と おなじ 95、うしろの あたらしい 14）・`linebreak.py` 0（329場面）・`build_server.py --check` 同じ（デプロイ なし）。
- **出したもの：** main `dabb5d5` → `970a187`（GitHub Pages・Cloudflare とも 成功、本番の md5 は pg_net で 手元と 同じ）→ Claude版 バージョン38。

## その前のチャット（2026-11-27 朝、34回目：かげの 直し＋だんかい 3。Opus 5.5）

- **はじめに（オーナー）：** ① LINE の 認証審査は **審査中で ない**。② だんかい 2 の 感想＝げい「ごろん」で かげも いっしょに まわる（写真）→ ほかの げい・体勢も ふくめて 先に 直す。
- **かげ（main `8d35b88`）：** おへやの かげを 絵の 中から `#pet` の `.pet-floor`（`#petArt` の となり。`body.html`）へ。げい・くるっ・ぶるぶるで まわらない・とばない。はねると 小さく うすく、ごろんで よこへ、ばたんきゅーで たおれた 下へ。げい「ごろん」は さかさで 頭が ゆかに しずまない ように 15% 上げた。前と あとの 画像を 見せた。
- **見本 3：** https://claude.ai/artifact/YBLn3VexEM4qmZUyPEpHaU （slug `fc7cec86-5257-426b-bbc4-754aefba763d`、元は `tools/motion_sample3/`）。オーナー：ごはんの おねだりだけ もう少し 長く、ほかは おすすめ。
- **だんかい 3（main `82bda91`）：** 体勢 `cheer`（ばんざい）・`lean`（前のめり）・`bow`（あそぼ）・`look-up`、しぐさ `lookup`、`Pet.spin()`・`Pet.cls()`。ごはん＝お皿の 前で おねだり 1.2秒（ごはんは 1.2秒 ながく）、おやつ＝見あげて おねだり → ぴょん、ボール＝あそぼ！→ よこむきで とびつく → すわる（0.6秒 ながく）、げい「おすわり」「くるっとターン」「のびー」、パズル（ゆかの かげ・まつ あいだ・れんさ・のこり 3手・クリア・おしかった）、ポップアップ（`MPET`・ゆかの かげ）、きせかえ（タイルで ぴょん・とじたら くるっと「にあう？」）、季節（雪・花びらで 見あげて ぴょん・つゆで まどの 下で ふせる）。
- **ためし：** `smoke.py` 6とおり（`stage3_checks` を 足した）エラー 0・`compare_home.py` おなじ・`line_e2e.py` all passed・`poses.py`（ライト・ダーク とも 前と おなじ 86。`s-trstretch` だけ かえる つもりで ちがう・あたらしい 8）・`linebreak.py` 0・`build_server.py --check` 同じ。かげの 直しは べつの worktree で `line_e2e.py`・`poses.py` も とおしてから 先に 出した。
- **出したもの：** main `8d35b88` → `82bda91`（GitHub Pages・Cloudflare とも 成功、本番の md5 は pg_net で 手元と 同じ）→ Claude版 バージョン36。

## その前のチャット（2026-11-27 未明、33回目：だんかい 2＝よこむきの 絵・体勢。Opus 5.5）

- よこむきの 絵 `renderPetSide`・体勢（たつ・あるく・ふせる・ねる・ごろん A・おねだり）・くるっ・行き先・のび・くんくん・なでなで 8回・タップの おねだり。main `045ea6c`・Claude版 バージョン35。

## その前のチャット（2026-11-26 夜、32回目：だんかい 1＝しぐさ。Opus 5.5）

- しぐさ 10こ・体勢用の 部品（`renderPet`。ふだんは `display="none"`）・タップの へんじ・なでる ときの 目線・ひまな ときの 表 `IDLE`。`build_server.py` が `js_pet.js` を 絵の 行で 切る（`game.js` から 絵の 関数を はずした）→ api version 30。main `4f1c9c3`・Claude版 バージョン34。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

0. **いそぎ：ほかの 人が LINE版で あそべない → 原因は 公式アカウントに 入口が ない こと（アプリの 不具合では ない）。オーナーの 設定まち（2026-11-27 38回目で 確かめた）。** → **2026-11-28 06:10：オーナーが スマホで 設定した（済み）。** リッチメニュー「あそぶ」（現在の表示・期間 11/24〜2100/12/31・リンクは 本番用の LIFF URL）と、あいさつの 2つめの 吹き出しに リンク・あいさつは オン。オーナーが トークの「あそぶ」から ひらけた。**のこりは お父さんが「あそぶ」から ひらけるか**（お父さんは もう 友だちなので 新しい あいさつは とどかない。トークを ひらきなおすと メニューが 出る）。 お父さんは 11-27 20:57 に リンクから ミニアプリを ひらけて 会員に なった（本物の DB の 会員 2人・`/login` は ぜんぶ 200・`error_counts` 0。11-27 21:01 に よるの おしらせを オン）。のこりは 公式アカウント（`@370iymyw`）から あそべない こと＝**申請の 前に 必ず**（診断レポートの C8-1）。
  - **オーナーが する こと（LINE Official Account Manager）：** ①［トークルーム管理］→［リッチメニュー］→「作成」：テンプレートは「小」の 1つの エリア・画像は `src/icons/richmenu-2500x843.png`・アクションは「リンク」で `https://miniapp.line.me/2012410265-PutgsCLS`（本番用の LIFF URL）・メニューバーの テキスト「あそぶ」・デフォルト表示「表示する」・表示期間は ながく。②［あいさつメッセージ］の さいごに「あそぶときは、下のメニューの「あそぶ」か、こちらからひらいてね。」と 同じ URL（LINE の メッセージの 文には スペースを 入れない）。③ お父さんに トークを ひらきなおしてもらい「あそぶ」から ひらけるか 見る。
  - できたら `docs/PROJECT.md` 7章の 公式アカウントの ところと 10章「リリースと認証の順番」に「済み」。補足資料の 文の「そのほか」に 公式アカウントの リッチメニューからも ひらける ことを 足す（C8-2）。
0b. **いそぎ 2：プロフィールで 名前・みためを かえても もどる → 直して 出した（main `a652983`、2026-11-27 38回目）。** LINE版だけ（お父さんの 報告。名前・種類・毛の色。「これでOK」で おへやに もどると かわった 見た目が 出て すぐ もどる）。原因：「これでOK」の すぐあとの `/act open` が 名前・みための `/save`（`Persist.flush` で 1.2秒 あと）より 先に とどき、返事で 上がきされ、あとの `ServerRef.set` は「同じ」と 見て おくらなかった（ログに `POST /save` 0回）。`js_line.js` に `LineSync.editPending`・`pushEdit`（`act()` と `ServerRef.set` が `/act` より 先に `/save`）、`apply` は まだ とどいていない 名前・みためを もどさない、`attach` で つなぎなおしたら おくる、ことわられたら もどして ひとこと。ホーム画面版・Claude版・サーバーは かわらない（Claude版は バージョン40 の まま）。`line_e2e.py` に 24（169 ok）。本番・審査用・開発用の md5 `de27677a…` を pg_net で 確かめた。
  - **オーナーに たのむ こと：** だいず（と お父さんの 子）で 名前か 毛の色を かえて「これでOK」→ もどらないか・ひらきなおしても かわった ままか。→ **11-28：オーナーは だいずでは ためさない（もどしまちがいが こわい）。** だいずが かわっていないのを 本物の DB で 確かめた（名前「だいず」・ポメラニアン・毛の色 `#f2c99a`・rev 293。11-27 9時〜11-28 7時20分の ログに `POST /save` は 0回＝名前・みためは おくられていない）。**ためすのは お父さんの 子（くり）だけ**（③）。
  - **のこり（あとで・診断 C2-1）：** かえた すぐあと 電波が 切れて、つながる 前に アプリを とじると、つぎに ひらいた とき サーバーの 名前に もどる（まれ）。
1. **認証審査の 前の 包括的な 診断：済み（2026-11-27 38回目・Opus 5.5）。** レポートは 診断レポートの いちばん うしろの 章「認証審査の 前の 包括的な 診断（2026-11-27・Opus 5.5）」。**オーナー決定（11-28）：直せる ものは ぜんぶ 直す**（下の「次にやること」の 表と プロンプト）。うちのこランは 実機で 1回 走って 重さを 見たら「完了」と 書く（C4-1・R3-2）。
2. **だいずで しっぽの 直しを 見てもらう（オーナー）。** まどの 下で うしろを むいた とき しっぽが マフラーの 端より 前・ふせる／奥へ あるく ときは しっぽが 帯より 前。→ **11-28 07:00 の オーナーの 動画で 見た：まどの 下で すわって うしろを むくと、しっぽが マフラーの 端より 前（OK）。** ふせる・奥へ あるくは 動画に なかったので `poses.py`（`b-down`・`b-walk`）で 見て、しっぽが 帯より 前（OK）。この 動画で おちばの カクッ（表の N-1）、スクショで ポップアップの 耳（N-2）が 見つかった。**のこり：12/1 から クリスマスで 雪、12/26 から としこし**（オーナーは「その時に 見る」）（みかんのぼうし・みかんゼリー・こたつと みかん）。おかしければ `1db3a28`（しっぽ・「かなえた」）・`1567b54`（季節イベント。**サーバーも かわっている**ので もどすなら `deno.json` も 前の `4f1c9c3` に して デプロイ）を `git revert`。
3. ためしの アーティファクト「うちのこ日和 P5 ためし」（slug `7a36bb48-06ef-452f-8c27-c7e849d00828`）は **のこす（2026-11-27 オーナー決定）**。見本 5（slug `81f73f8f-…`）・見本 4（slug `11962d6f-…`）・見本 3（slug `fc7cec86-…`）・見本 2 も 記録として のこしている。
4. **済み（2026-11-28）：** Supabase の Data API の「Automatically expose new tables」を オーナーが オフに した（`pg_default_acl` で 確かめた。`app` の 表・`uchinoko_api` の 権限は かわらない）。
5. 公開の日の 手順 5・6 の こまかい ところ（よるの ひとこと・ひらいたまま つぎの日・トークの カードの ボタン・なでなでの 下スワイプ、家族の LINE で 本番用の LIFF URL が ひらけるか、Android の 下の すき間）は きくだけ。
5d. **（オーナーが 決める・いそがない）** 2D の 絵の ヨークシャーテリアも「せなかだけ ブルー」に するか（`renderPet`。3つの 版。**いまは サーバーの デプロイ いらない**）。
5e. Dependabot（`tools/run/`）の PR は 手で マージしない（lockfile と `src/run_bundle.js` が ずれる）。上げるなら `npm install` → `build_run.mjs` → ためしを ぜんぶ。
6. **（あとで・情報）** P5-3 シートを いちばん上で 下に 引くと LINE の 最小化、P5-4 ダークで ブルーベリーが 見わけにくい、P5-5 高さ 500px より ひくい 画面は パズルが たてに スクロール、P5-6 `smoke.py --claude` は パズルを とおらない（しぐさの ためしも とおらない＝ホーム画面版・LINE版で 見ている）。
- おたすけ：ホーム画面版は1日おき。LINE版は「前回から7日」。
- ホーム画面版の だいずは 控えとして のこっている（正本は LINE版）。

## 次にやること

- **オーナー決定（2026-11-28）：診断で 見つけた もののうち、直せる ものは ぜんぶ 直す**（「あらゆる 可能性を 極力 消しておきたい」）。認証審査の 申請は **時期 未定**（個人事業主に なってから。いまは 記録だけ）。
- **つぎの チャット：診断の 直し（下の プロンプト）。** 直す もの・オーナーが する もの・直さない もの（理由）は 下の 表。
- オーナー：① 公式アカウントの リッチメニュー「あそぶ」と あいさつの リンク（保留0。申請の 前に 必ず）、② ~~Supabase の Data API の 自動公開を オフ~~（済み 11-28）、③ お父さんの 端末で ためす（公式アカウントの「あそぶ」から ひらく・名前や 毛の色を かえても もどらない・ランを 1本・おへやの うごき・よるの おしらせ・Android なら 下の すき間）、④ だいずで しっぽ と 名前の 直しを 見る（保留0b・保留2）→ **11-28：しっぽは OK（動画）・名前は だいずでは ためさない（DB で かわっていないのを 確かめた）・のこりは 12/1 の 雪と 12/26 の としこし**。
- 認証審査を申請したら（時期 未定）：審査は1〜2週間、「審査中」は 画面とサーバーを 変えない。はじめての 審査は 承認で「反映済み」に なり、「検索可能にする」は 30日以内（31日目 9:00 に 自動）。

### 診断の 直し：だれが なにを するか（2026-11-28）

| 番号 | 中身 | どう する |
| --- | --- | --- |
| C6-1 | もようがえの 壁「ハートがら」「ほしぞらのかべ」の 見本が 白い | 直す（`svgUrl` を `url('…')` に） |
| C6-2 | フォントが よめない とき アルバムの 日付「11/27」が 2行 | 直す（`.d-date` に `white-space:nowrap`） |
| C5-1 | ひらきなおす とき すわった まま まんなかへ すべる | 直す（`Game.start` で `Pet.el.style.transition` を 空に） |
| C5-2 | うごきを へらす 設定でも ひまな ときに よく あるく | 直す（`calmMotion()` の ときは あるく・行き先の 重みを さげる） |
| C2-1 | 名前・みためを かえた すぐあと 電波が 切れて とじると、つぎに もどる | 直す（おくっていない しるしを のこして、ひらいた ときに おくる。サーバーの 決まりは かえない） |
| C2-3・C5-3 | おへやの 絵 3まいを いつも かく（古い 端末で おもい かも） | 直す（よこ・うしろは はじめて いる ときに かく。`poses.py`・`smoke.py` で 見た目が 同じか） |
| C2-4 | `inert` を しらない 古い Safari で パズルの うしろに キーボードで さわれる | 直す（ない ときは `#app` に `aria-hidden` と フォーカスの しめだし） |
| C1-3 | サーバーの ログに 例外の 文（200字）が のこる | 直す（種類 `e.name` だけ）→ サーバーの デプロイ |
| C7-1 | よるの おしらせの 月の 通数を 見ていない | 直す（`/health` に「月の 上限に ちかい」かの しるし だけ・「サーバーを起こす」が 知らせる）→ サーバーの デプロイ |
| C6-3 | `smoke.py` の よるの ひとことの ためしが よる 21時すぎに ときどき 失敗 | 直す（ためしの はじめに アプリじしんの ひとことを とめる） |
| R3-4・R3-2 | ランは とまっている ときも 3D を かく・古い 端末の おもさ | 直す（うごかない ときは かかない・こまが おそい 端末では こまかさを 自動で さげる）→ `run_bundle.js` 作りなおし |
| R1-2・R5-4 | ランの 日付は 形だけ 見る・はずれた `.run-over` を 見つづける | 直す |
| C8-3 | Lighthouse を はかりなおす | 手元で はかって 記録（おそければ 直す） |
| C8-2・C8-5・C4-1・C4-2・C7-2・C3-1 | 補足資料に 2行・`CLAUDE.md` に `pushEdit`・うちのこラン「完了」（`docs/RUN_DESIGN.md` 18章）・Dependabot の 決まり・イベントは はじまる 前に 出す 決まり | 書類を 直す |
| N-1 | **おちばが まどの 中で ときどき カクッと 上に もどる**（11-28 オーナーが 動画で 見つけた。雪〈12/1 から〉・花びらも 同じ） | 直す（**12/1 の 前に**）。原因：`head.html` の `@keyframes fall{to{background-position:0 120px,9px 131px}}` を 雪・花びら・おちばで いっしょに つかっていて、うごく 長さが もようの 高さ（雪 22・26、花びら 30・36、おちば 28・34）の 倍数で ない＝1周（雪 6秒・花びら 9秒・おちば 8秒）ごとに もようが 飛ぶ（花びら・おちばは 2まい目の よこも 12〜13px→9px で 飛ぶ）。動画の 3.42秒で 8px 上に 飛んだ。直し方：天気ごとに `@keyframes` を わけて、1まいずつ 高さの 倍数だけ うごかす（たとえば 雪 `0 132px,9px 141px`、花びら `0 120px,13px 123px`、おちば `0 140px,12px 116px`。よこに ながすなら はばの 倍数）。雨（40px）は いまも つなぎめ なし。ためしに「天気の ずれが もようの 大きさの 倍数か」を 数える ところを 足す |
| N-2 | **なかよしLvアップ・きょうのおねがいの ポップアップで うちのこの 耳の 先が 切れる**（11-28 オーナーの スクショ。どんぐりぼうしの 先も） | 直す。原因：ポップアップの 絵 `.mpet .pet-svg` に `overflow:visible` が ない（おへや `.pet .pet-svg`・パズル `.pz-art .pet-svg` には ある）。だんかい 3 の ばんざい（`pose-cheer`。頭が −17）で 絵が わく（viewBox 240）の 上へ 出る（`poses.py` の `p-cheer` で はみだし 23）が、`poses.py` の ためしの わくは `overflow:visible` なので 見つからなかった。ブラウザで 同じ 切れかたを 出して、`overflow:visible` で 耳が ぜんぶ 出るのを 確かめた。直し方：`.mpet .pet-svg{overflow:visible}`（おみやげ・イベント・LINE の カードの 見本も 同じ `.mpet`）。はねる（`mHop` −12%）と 高い きせかえ（うさぎのみみ など）で カードの 上（すき間 22px）から 出ないか 見て、要るなら `.levelup .mpet` の 上に すこし すき間。`smoke.py` か `poses.py` に ポップアップの 絵が 切れないか の ためしを 足す |
| C8-1 | 公式アカウントの 入口 | オーナー（申請の 前に 必ず）→ **設定は 済み（11-28）**。お父さんが ひらけるかを まつ |
| C1-4 | Data API の 自動公開 | オーナー（ダッシュボードで オフ）→ **済み（11-28 06:18）**。`public` の 新しい 表・関数の 既定の 権限から anon・authenticated の 読み書きと 実行が きえた（のこるのは Supabase の 説明どおり truncate・references・trigger・maintain と 並びの update だけ）。`app` の 権限・RLS・advisors 0件・`/health` は かわらない |
| C8-4 | 個人事業主に なった あとの ポリシーの 提供者の 書き方 | 個人事業主に なったら 専門家に（約束②の 別プロジェクト） |
| R3-2 の 実機 | ちがう 端末で ランの おもさ | オーナー（お父さんの 端末） |
| C1-1 | 同時の 書きこみは ためしの DB で ためせない | 直さない（本物の Postgres では 1つずつ。ためしの DB の しくみ） |
| C1-2 | 会員の 数に 上限が ない | 直さない（1人 1つ・無料の 枠に 十分。人が ふえたら 見る） |
| C1-5 | 「サーバーを起こす」が 数時間 おくれる・60日 うごかないと とまる | 直さない（GitHub の しくみ。push が あれば とまらない） |
| C2-2 | うちのこに さわって はじめた 指では ページが スクロールしない | 実機で こまったら（かえると LINE の 最小化が もどる） |
| R1-4・R2-3・R2-4・R2-5・R3-3・R5-3・R6-4 | ランの「そのまま」 | 直さない（設計どおり・害なし。ランキングを 足すなら 見なおす） |

### つぎの チャットに 貼る プロンプト

```
うちのこ日和の つづきです（モデルは Opus 5.5）。
GitHub の Y-s-Apps/uchinoko-biyori を push できる形で つないで、CLAUDE.md・docs/HANDOFF.md・docs/PROJECT.md を 読んでください。
診断レポート（https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6）の いちばん うしろの 章「認証審査の 前の 包括的な 診断（2026-11-27・Opus 5.5）」で 見つけた もののうち、直せる ものは ぜんぶ 直して 出してください。直す ものの 一覧は docs/HANDOFF.md の「診断の 直し：だれが なにを するか」の 表です。
CLAUDE.md の 作業の流れで 直して main に push、サーバーを かえたら 作業の流れ 3 で デプロイ、Claude版も 出しなおす。うちのこランが 完了に なったら docs/RUN_DESIGN.md と docs/PROJECT.md に 書く。
表の N-1（おちば・雪・花びらが カクッ）と N-2（ポップアップで 耳が 切れる）も いっしょに。N-1 は 12/1 の クリスマスの 雪の 前に 出す。
はじめに わたしに きいて：父が 公式アカウントの「あそぶ」から ひらけたか・父の 端末で ランを 走って おもくなかったか・父の 子で 名前や 毛の色を かえて もどらなかったか。
```

## 気をつけること

- **季節イベント（36回目）：** イベントは `js_data3.js` の `EV(id, ja, from, to, gift, treat, decor, hello)`（期間は かさならない＝`rules_test.mjs` が はしを 見る）。プレゼントの きせかえは `EVENT_WEAR`＋`js_wear.js` の kind（あたまは よこむき・うしろも 自動）、おやつの 絵は `js_data2.js` の `treatIcon`、おへやの かざりは `js_features.js` の `SEASON_DECOR`（`g:[形, 色]` と おきもの `item`）、天気は `weatherOf`。**データは サーバーとも 共通＝かえたら `build_server.py` → `line_e2e.py` → push → `--pin` → デプロイ**。`line_e2e.py` は ためしの 日が イベントの 期間だと はじまりの お知らせが 出るので、ボタンを おす 前に `close_popups`。
- **うちのこの 体勢と 動き（`docs/MOTION_DESIGN.md` 9章）：**
  - **だんかい 4＝うしろすがた（35回目。15章）：** おへやの 絵は 3まい（`.view-f`・`.view-s`・`.view-b`）。`Pet.view` は 'front'・'side'・'back'、`POSE[p].back` で うしろ。うしろの 体勢は `bsit`・`bup`・`bdown`・`bwalk`（CSS は `.pose-b*`・`.pet-back .pb-*`。しぐさの セレクタは `.g-ear .pb-earR` の ように `.pet` を つけない＝`poses.py` でも 効く）。**うしろで しぐさを ふやす ときは `GESTURE[id].poses` に うしろの 体勢を 足して `.g-<id> .pb-*` の CSS も**（いまは 耳ぴく・きょろきょろ だけ）。`renderPetBack` の 重なりは せなかに たれる 首の きせかえ（`pb-neck.pb-neck-b`）・うきわ → しっぽ（`pb-tail-lo`）→ 頭 → うなじの 帯（`pb-neck`）→ しっぽの 2まい目（`pb-tail-hi`。ふせる・奥へ あるく だけ 見せる。`visibility` で 切りかえ＝`display` に しない）。**うしろから 見ると しっぽが いちばん てまえ**（37回目 オーナーの 声）＝せなかに たらす きせかえを 足したら `wearBack` の `back` に。しっぽの CSS を 足す ときは `.pb-tail`（2まい とも）に。左右は 正面と 反対（`patchL`↔`patchR`）。まどの 下は `WIN`（x 22・y 70）。`moveTo` の 奥へ は 時間を かえない（`compare_home.py`）。ひまな ときの 行動は うしろの 体勢では 体勢を 見て やめる（`at()`・`ptok`）。`smoke.py` の `gesture_checks`・`pose_checks`・`stage4_checks` は ひまな ときの 行動を とめてから。
  - **かげ と だんかい 3（34回目。13章）：** おへやの かげは `#pet > .pet-floor`（`body.html`。外がわ＝げいの アニメ `fl*`、内がわ `i`＝体勢・むきの 形）。`.pet .pv-shadow,.pet .ps-shadow` は けしている＝**体ごと うごく げいを 足したら `.pet-floor` にも あわせた アニメを**（はねる＝小さく うすく、まわる＝よこへ・ひろく）。パズルは `#pzPet > .pet-floor`、ポップアップは `.mpet::before`（はねるのは svg だけ）。
  - おせわの とちゅうの 動きは `Pet.cls(クラス, ms)`（`Pet.gesture` は busy では しない）。くるっと 1回転は `Pet.spin()`（とちゅうで 体勢〈`ptok`〉が かわったら やめる）。ポップアップの 体勢は `MPET`（`petCard(wear, MPET.joy)` など）。パズルは `PuzzleUI.pose`・`hurray`・`basePose`・`idleArm`（乱数なし）。きせかえは `dressShow`（シートで 着がえた しるし）→ `closeSheet` が `showOutfit()`。`openSheet` が `dressShow` を 空に する。
  - **`compare_home.py` の ため、おせわの 道すじで `Math.random` を よぶ 数と 順を かえない**（ボールは 1つめの 行き先を 先に きめる だけ。ごはんの たべる 長さ 2.7秒＝かけらの 数も 同じ）。ごはんは 1.2秒、ボールは 0.6秒 ながく なった（`smoke.py` の ごはんの あとの まちは 7.5秒）。
  - `.pet-side .ps-all` の 軸は 76px 216px（のび・あそぼ）。げい「のびー」は `.view-side.tr-stretch`（正面の `trStretch`・かげの アニメは とめる）。うごきを へらす 設定の ばんざいは 止まった 形（`.pose-cheer .pvx-begL/R` の `transform`）。
  - 絵は 2重の グループ：外がわ（`pv-tail`・`pv-body`・`pv-legL/R`・`pv-head`・`pv-neck`）＝体勢（止まった `transform`＋`transition`）、内がわ（`*-g`）＝しぐさ・げい・ずっと つづく アニメ。**同じ グループに 体勢と アニメを 書かない**（アニメの あいだ 体勢が もどる）。首（`pv-neck`）には 頭と 同じ 体勢の 数字を かならず 書く。新しい グループにも `transform-box:view-box` と 軸（px）。
  - 体勢は `Pet.setPose(p)`（`POSE` に 足す。頭・口の 高さ・ふきだしの `--by`）、しぐさは `Pet.gesture(id)`（`GESTURE` に `{ ms, poses, sp, calm }`。CSS は `.pet.g-<id> …`）。`Pet.sleeping` の 名前と 意味は そのまま。
  - **`renderPet` を かえたら：** `python3 tools/poses.py`（前の 版と 1px。ふだんの 場面が「おなじ」で、あたらしい 体勢・しぐさの 場面は「あたらしい」＝一覧の PNG で 目で 見る）→ `python3 tools/build_server.py --check`（**32回目から 絵の 関数は `game.js` に 入らない＝「同じ」なら デプロイ いらない**。サーバーで つかう 関数〈`normalizeLook`・`hasId`・色〉を かえた ときだけ CLAUDE.md の サーバーの 流れ）。うちのこカード `CardArt` は `renderPet` の 先頭 `'<svg class="pet-svg"'` と `' aria-hidden="true"'` を 置きかえるので かえない。**ふだん 見えない 部品は `display="none"`**（`opacity="0"` は ほかの 線の ふちを かえる）。
  - **しぐさ（32回目）：** `GESTURE`（`js_app.js`）に `{ ms, poses, sp, calm }`、CSS は `head.html` の `.g-<id> …`（表情 `ex-*` より あと）。頭を うごかす ときは `pv-neck-g` にも 同じ アニメ。`Pet.gesture` は `Pet.canGesture` を とおる（パズル・ラン・うごきを へらす 設定 は しない）。ひまな ときは `IDLE`（`{ id, w(c), run }` か `{ g, w(c) }`）。`compare_home.py` は ひまな ときの 行動を とめて くらべる（`NO_IDLE`。`idleTick` を 関数の 宣言の まま に しておく）。`smoke.py` の `gesture_checks` は その 子の しゅるいで できる しぐさを ぜんぶ 1回。
  - `tools/poses.py` は 1回 3分ほど（よこむきの 一覧が ふえた）。体勢・しぐさを 足したら `STATES` に 足す（よこむきは 5つめに `'side'`。はみだし `--max-out` 30〈場面ごとの ゆるめは `OUT_OK`〉・体勢の 首の ずれ `--max-neck` 2。ねる の 首の ずれは 0 に なった）。見た目を かえる つもりの 場面は `--changed`（その コミットだけ）。体勢の 部品は 0.35秒で ふわっと 出るので 体勢の 場面は 400ms より あとで とめる。
  - **だんかい 2（33回目）：** おへやの 絵は `#petArt > .pet-turn > .view-f`（正面 `renderPet`）＋`.view-s`（よこむき `renderPetSide`）。`Pet.mount` が 2まい かく。見えるのは `.pet.view-side` で えらぶ 1まい（どちらも in flow。`position:absolute` に しない＝古い iPhone の `aspect-ratio` に たよらない）。`Pet.view`・`Pet.dir` が ほんとうの 状態で、`applyView` が クラスに する（くるっの まんなかで よぶ ので なんど よんでも よい）。体勢は `Pet.setPose(p, turn)`（`POSE[p].side` で 正面／よこ）、しばらくで すわる は `Pet.poseFor`、あるく は `Pet.moveTo(x, y, speed, end)`（**時間を かえない**・2.5 より ちかい ときは むきを かえない）。よこむきの CSS は `.pet-side .ps-*`・`.pose-walk .ps-*`・`.g-<id> .ps-*`。体勢の CSS は 表情・しぐさより あと。
  - **体勢の 部品（`pvx-down`・`pvx-beg`）：** 出す ときは `display:inline` ＋ `pvxIn`、けす ときは `Pet.leave(部品)`（`setPose` が `POSE_PART` を 見て よぶ。げい「ふせ」は `doTrick` が よぶ）。ふだんの 絵では `display="none"` の まま。
  - **`Math.random` を おせわの 道すじ（`moveTo`・`setPose`・`begin`・`rubbed`）で つかわない**（`compare_home.py` は ルールと 見た目が 同じ 乱数の 列を つかう）。ひまな ときの 表 `IDLE` の 中は よい。
  - `Pet.rub`（なでなで 8回の 体勢）の あいだは `idleStep` が なにも しない。`begin()`・タップ・`moveTo` が 消す。`line_e2e.py` などで `.pv-neck *` の ような「グループの 中に なにか あるか」を 見る ときは `:not(g)` で（内がわの 空の グループが ある）。
  - ランや パズルの ページの うしろでも `idleStep` は 動く。しぐさ・体勢は `PuzzleUI.page` か `html.run-open` の あいだ 出さない。ランの 画面の 2D の 絵は かえない。
- **うちのこラン（`src/run/`・`src/js_run.js`・`tools/run/`。くわしくは `docs/RUN_DESIGN.md` 11・12章）：**
  - はじめに `cd tools/run && npm install`。`src/run/` を かえたら `node tools/run/build_run.mjs` で `src/run_bundle.js` を 作りなおして いっしょに コミット（push の 前に `--check`）。そのあと `sh src/build.sh`（`run-<ハッシュ>.js` が かわり、前の `run-*.js` は 消える）。
  - 3つの 版（`RUN_HOME=1`・`RUN_CLAUDE=1`・`RUN_LINE=1`。30回目から main も LINE版に ラン）。`head.html`・`body.html`・共通の `js_*.js` を かえると LINE版も かわる＝ランの 画面の ものは `js_run.js`・`src/run/run.css`・`src/run/` に（ルールと セーブは 共通の ファイル）。**`js_run.js`・`run.css`・`src/run/` を かえると ホーム画面版と Claude版（P6 の あとは LINE版も）が かわる**（Claude版も 出しなおす）。LINE版だけの 直しは `js_line.js`・`line_head.html` に 書き、ビルドの 前後で `index.html`・`sw.js`・`src/out/claude/index.html` の md5 を くらべる。
  - **LINE版（P6。`docs/RUN_DESIGN.md` 16章）：** ランの 画面・ゲームは 3つの 版で 同じ。LINE版だけの ことは `js_line.js` の `LineRun`（`RunUI.start`・`finish`・`open`・`close` を 包む。走りだしは その回の `sim.start` を インスタンスで 包んで `runStart`）。ゲームの ファイルは LINE版の いちばん上に 1つ（`/run-….js`。審査用・開発用も 同じ）、CSP は `line_head.html` の `__RUN_CSP__`。サーバーの `run` は `js_rules.js` を かえずに ほうびを とめる（きょうの 回数を `perDay` に みせて あとで もどす）。手元の ためしは `smoke.Handler` が LINE版の CSP の URL も 手元に かえる。`line_e2e.py` の ブラウザは SwiftShader つき。`/__debug/run` で 走りだしから 時間が たった ことに できる。
  - **Claude版（P5。`docs/RUN_DESIGN.md` 15章）：** ゲームは アーティファクトの 2つめの ファイル（`src/out/claude/run-<ハッシュ>.js`）。ページから 相対の パスで `integrity` つき（CSP の URL は いらない）。Service Worker は ないので ランは ネットが いる。保存は クラウド（`S.run` も）。ためしは `smoke.py --claude`（F）・`linebreak.py --claude`（ランの 場面も）・`run_shots.py --claude`。どれも `src/out/claude/` を そのまま 配る（`sh src/build.sh` の あとに）。
  - CSP は ランの ファイルの URL を パスまで（`build.sh` の `HOME_ORIGIN`）。手元の ためしは `smoke.Handler` が その はじめの 部分を 手元の URL に かえて 配信する。ヘッドレスでも WebGL が 動く ように `smoke.CHROMIUM_ARGS`（SwiftShader）。`page.wait_for_function` は CSP で とめられるので `smoke.poll`。`RunUI` は `const`（`window.RunUI` では 見えない）。
  - ヘッドレスの 3D は おそい（こまの あいだに 指の イベントが おくれる）。`smoke.py` の 指の ためしは うちのこの 足を とめてから。ゴールまでの 通しは `tools/run/run_shots.py`（時計を とめて ページの 中で レースを すすめる）。
  - 3D の 色は `NeutralToneMapping`・露出 1（P1）。`makePet3D` に わたす みためは かならず `normalizeLook()` の あと。`mountRace` の `name`・`rivals[].label`・`art` は `esc`・`softName` 済みの HTML。
  - 決めたこと（2026-11-22）：題「うちのこラン」・タイル「ラン」・「おともだち（品種）」・おやつは 骨の ビスケット・時計 00:36.6／36.58秒・コースは ひらがな・**まんなかに ひとことを 出さない**（アジリティでも「ジャンプが届かず」などを まんなかに 出さない。わんランの 下の 1〜6 と「とまっているよ」は よい）。
  - **ルールと セーブ（P3。`docs/RUN_DESIGN.md` 13章）：** ほうび・回数・ベストは `js_rules.js` の `RUN`・`Rules.run`（3つの 版と サーバーで 同じ）。`RUN.courses` に コースを 足すと `ensureState` が その ベストを のこす（知らない コースは すてる）。`min` を 足したら `node tools/run/run_min.mjs`。サーバーの `/act` は `runStart`・`run` を うけつける（api version 28 から。「はやすぎる」は `min − RUN_SLACK_MS`〈2秒〉、ゴールの おくりなおしは `srv.rg`）。ランの ほうびは レースも アジリティも あわせて 1日3回（`S.run.n`）。
  - **画面（P3）：** `RunUI.select()`（コースを えらぶ）→ `start(id)`（`mountRace({ course, best, next, onSelect, onNext, onFinish })`）→ ゴールで `finish(info)`（`Act.blocked()` を 見てから `Act.run('run', …)`）→ `record(r)` の HTML を `race.js` が `.run-rec` に 入れる。`race.js` の `formatTime` は 100分の1秒に 丸めてから・記録は `timeMs`（画面と 記録の 数を そろえる）。すける おともだちは ふかさだけ 書く 子（`depthOnly`・`renderOrder` 1）を すける あいだだけ 見せる。
  - **ためし（P3）：** `smoke.py` の ランは えらぶ → こうえん → 指 → ひとやすみ → ゴール（ゴールの 前へ とばす＝`min` に 切られる）→ つぎの コース → えらぶ → こうえん → ×。`linebreak.py` の `run_open(c)`・`run_go(c)`・`run_finish(fast, c, pre)`（pre で ベスト・回数を かえる）。`run_shots.py` は 3コースを つづけて（`--gifs park,beach,forest`）。ヘッドレスの 3D は おそいので `run_shots.py` は 1回 10分ほど。
  - **アジリティ（P4。`docs/RUN_DESIGN.md` 14章）：** `src/run/agility.js`（`mountAgility`・`AGILITY_COURSES`・全体図 `agilityMap`・`agilityHelpHtml`）。`race.js` から `ICON_X`・`ICON_PAUSE`・`formatClock`・`formatTime`・`timeMs` を import。`RunUI.mode`（'race'／'agility'。セーブに 書かない）・`start(id)` は コースの しゅるいで `mountRace`／`mountAgility`。ゲームは `.run-root` に `data-course` を つけるので、えらぶ 画面・`wait()` で けしている（カードの `[data-course]` と まぎれる）。アジリティの タイムは ごうけい（`timeMs(total)`）・`rank` は おくらない。`RUN.courses` の ID は `'first-field'`・`zigzag`・`balance`・`'hill-field'`（`run_min.mjs` の 正規表現は クォートつきも 読む）。
  - **アジリティの ためし：** `smoke.py` の `agility_checks`（シーソーの 上へ とばして `sim.step` を とめてから 指で 下スワイプ。とばすと とちゅうの シーソーは「とまれなかった」ミスに なるので、ゴールの 前へ とばす ときは のこりを クリアに する）。`linebreak.py` の `agi_until(c, cond, then, lane/brake/tap)`・`agi_finish(miss, c, pre)`。`run_shots.py --mode agility`（1分ほど。`--no-gif`）、GIF は `--gifs balance` など。Mochiy の 数字は はばが ひろいので、大きい 数字の となりに 字を ならべない（ゴールの ごうけいは ラベルを 上に）。
- **なでなで（`#pet`）と LINE の 下スワイプ：** `petStill`（`touchstart`・`touchmove` の `preventDefault`）を はずさない。`#pet` の 中に ボタンや リンクを 足すと 指の `click` が 来ない（タッチを とめているので）。`smoke.py` の「なでる（指）」が 見る。
- **LINE版の 下の すき間：** おへやの 画面は `html .app`、シート・ポップアップ・はじめての画面・パズルは それぞれ（`line_head.html`）。`:root` には あけない（P6-1）。新しい 画面いっぱいの 入れものを 足したら、そこにも 書く。
- **パズルの 画面（`PuzzleUI`。2026-11-16）：**
  - 重なりの 順：はじめての画面 40 ＜ **`.pz-page` 45** ＜ シート 50 ＜ ポップアップ 70。ひらいている あいだ `#app` は `inert`（`#sheetWrap`・`#onboard` は `#app` の となりなので さわれる）。`Game.start` は ひらいていたら とじる。`Nudge.busy` は `PuzzleUI.page` も 見る。
  - **おくる 前に `Act.blocked()` を 見る。** `Act.run` は つながっていないと 端末の ルールで 数えてしまう（`Act.remote` が `null`）ので、LINE版で サーバーを とおさない 記録を 作らない（P4-1。`line_e2e.py` 22b・22d）。番号 `rid` は `start()` で 1つ 作り、おくりなおしも 同じ（22c）。
  - うごきの とちゅうの `await sleep` の あとは かならず `live()`（`tok` と `page`）を 見る。
  - 大きさは `fit()` が px で 入れる（`--pz-s`・`--pz-pet`。`aspect-ratio` に たよらない）。盤が 264px（1マス 44px）より 小さく なる 画面は `.tight`（たてに スクロール）。うちのこの ところが 150px より ひくいと `.low`（うちのこを 左、ふきだしを 右）。
  - ページの `touchstart`（ボタン いがい）・`touchmove` は `preventDefault`（`passive:false`）。盤は タッチの イベント、マウス・ペンは ポインターの イベント、キーボードは `click`（タッチの 700ms あとまでは 見ない）と やじるし。Esc は `document` の **キャプチャ**で 見る（シート・ポップアップが ひらいている あいだは なにも しない）。
  - `innerHTML` に 入れるのは 決まった 文・`renderPet`・`treatIcon`・数に した 値だけ（サーバーの 返事は `n()` で 数に）。ふきだしは `textContent`。文を 足したら `linebreak.py --only puzzle`（`--line --height 603` も）。Claude版には `[hidden]` の 決まりが ないので `.pz-end[hidden]{display:none}` を 消さない。
  - Claude版の パズルは `smoke.py --claude` が とおらないので `python3 tools/linebreak.py --claude --only puzzle --only play` で 確かめる。
- **ためしを うしろで 動かしている あいだは `sh src/build.sh` を しない**（`src/out/` を 作りなおすので、とちゅうの ためしが こける）。`linebreak.py --line` は 1回 10分ほど、ぜんぶ 順に 動かすと 40分ほど。
- **よるの ひとこと（`Nudge`）：** 1日1回は 端末の `uchinoko-biyori:nudge-day`（消してよい キー）。時刻は `Clock.hour()`（LINE版で つながっているときは `lineServerClock` が 日本時間に する）か 端末の時計。セーブは かえない。LINE版で サーバーを まつ あいだは **`Act.blocked()`（知らせを 出さない）で 見る**。`Act.waiting()` は ポップアップ・トーストも 出すので、だまって 見たい ところで つかわない（F3-1）。`smoke.py` が 21時の まねで 確かめる（`Clock.hour = () => 21`）。ふきだしは `white-space:nowrap` なので、ひとことは 14文字くらいまで。
- **新しい子・取りこみの 番号（F3-2）：** `LineSync.freshRid`（新しい子を むかえると 空。はじめて おくるときに 作り、とどくまで 同じ）・`pendingCode.rid`・`line-unsent` の `r`。サーバーは 同じ番号の `adopt` を 作りなおさない。とどいたかは サーバーの セーブの `srv.rq.id` で 見る（`LineSync.arrivedRid`）。
- **よるの おしらせ（`LineNotify`・`/notify`・`/notify/run`）：** スイッチは つながっていて サーバーに トークンが あるときだけ（`LineServer.notify.ready`）。友だちかどうかは 見ない。メッセージに 入れるのは 名前・のこりの数・れんぞくだけ。送る回は `app.notify_runs`（だれかは 入れない）。cron を 変えるときは `supabase/migrations/` に 名前に `cron` の ある ファイルを 足して `apply_migration`（ためしの PGlite は 読まない）。合いことばの しくみ（10分・1回・ハッシュ）を くずさない。月200通（無料）を こえた月は とまる（`notify_limit`）。1人の 例外は `notify_one`、回数の 制限の 429 は `notify_push`（おくりなおさない）。回を 見る：`select day, made_at, used_at, done_at, sent, skipped, failed, note from app.notify_runs order by day desc limit 3;`
- **`/health` の `notifyDays`：** この3日（きのうから）の 回の `kicked`・`ran`・`done`・`note`。はじめた日 `NOTIFY_SINCE`（2026-11-14）より 前は 出さない。「サーバーを起こす」は `jq` で 見る。止まった日は 3日 のこるので、その あいだに 手で 動かすと また 失敗に なる。
- **21:05 の やりなおし（2026-11-19）：** `app.notify_kick()` は `used_at` が 空、または `done_at` が 空で `used_at` から 3分 たった回だけ 合いことばを 作りなおす。関数を かえるときは 名前に `cron` の ある マイグレーションで（ためしの PGlite は 読まない）、手元の `tools/server/node_modules/.bin/pglite-server` と `psql` で upsert の 場面を 確かめてから。
- **LINE版の `LineSync.apply`：** サーバーの セーブを 入れたら `decay()` してから 出す（へらす前の 数字を 出さない。`line_e2e.py` 7c）。`decay()` は `S.last` を いまに する（端末の 写しだけ。サーバーへは おくらない）。
- **同じ日の 送りなおし：** もう一度 その日に 送りたいときは（21時から 0時）：`update app.notify_runs set used_at = null, done_at = null where day = (now() at time zone 'Asia/Tokyo')::date;`、送った人にも もう一度なら `update app.members set notified_on = null where notify;`、そのあと `select app.notify_kick();`。**ただし、その日に もう とどいた人には とどかない**（リトライキーが 会員と 日付で 決まり、LINE は 同じ キーを 24時間 うけつけない＝409。`sent` には 数える。F2-4）。
- **`line_e2e.py` の `notice_seen`：** ふつうの 場面では アプリの中の おしらせ（`NOTICE_IDS`。いまは 空）を もう見たことにしている。`LineNotice.list` に 足したら `NOTICE_IDS` にも 足す。`linebreak.py --line` は `LineNotice.list` から id を 読んで「見た」に する。
- **`linebreak.py --only`：** 名前に その文字が ある 場面だけ（なんども 書ける）。新しい 場面だけ はやく 確かめるのに 使う（push の 前の さいごは ぜんぶ）。Bash の 既定の 時間切れを こえるので、うしろで 動かす。
- **色：** 文字と地の色の差は ふつう 4.5・大きい 3 より大きく。文字でない 部品（スイッチなど）は 3 より大きく。`tools/smoke.py` と `--dark` が 数える。小さい ピンクの文字は `--berry-ink`、ミントの ボタンの文字は `--on-mint`、バッジは `--badge`。文字は 11px 以上。
- **改行と見た目：** 画面ぜんたいが `keep-all＋anywhere`。新しい文にも 文節の スペースを入れ、`tools/linebreak.py`（`--line`）で 0件か、スマホ幅のスクリーンショットで 目で確かめてから push。せまいところの名前は `softName()`。`linebreak.py` の フォントは `cd tools/fonts && npm install`。
- **おしらせ（`LineNotice`）：** ポリシー・規約の 大事な変更や 本サービスを終えるとき（30日以上前）は、同じコミットで `js_line.js` の `LineNotice.list` に `{ id, from, until, title, when, text, link }` を1つ足す（id は つかいまわさない。`2026-11-notify` は もう つかった）。足したら `linebreak.py --line --only notice` で 改行を確かめ、PROJECT.md 10章に「出した おしらせ」を書き、`line_e2e.py` の `NOTICE_IDS` にも 足す。
- **カードの ボタンと 通知の ボタンは `#2A7F6D`**（LINE が 白い字で かく）。
- **名前などの短い文字は `cleanText(v, max)`**、**表の ID を見るときは `hasId(表, id)`**。
- いま育てている子は「だいず」（クリームのポメラニアン。**2026-11-16 から LINE版の 本番用が 正本**、ホーム画面版は 控え）。セーブをこわす変更はしない。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる（`md5sum`。いまの 値は 上の「ホーム画面版の公開中の版」）。
- 正規表現に 日本語の文字を そのまま書かない。正規表現の うしろ読み（`(?<!…)`）・`Object.hasOwn` も 古い iPhone で 止まるので 使わない。
- `js_line.js` は `js_onboard.js` の boot の**あと**に読まれる。`renderHeader`・`allDoneModal` などを包むときは、包んだあとに いまの画面にも1回あてる（必要なら）。
- **`line-guest` は `{ v:2, kids:[…] }`（5ひき）。** キーごと 消す処理は 書かない。`line-unsent` は `markUnsent()` で 書く・空にする。
- **おせわ・取りこみを サーバーへ おくるのは `LineSync.send`**（`rid` を つけ、とどかなければ 900ms あとに 同じ `rid` で 1回）。`LineServer.call` を じかに よぶもの（カード・AI・やめる・通知の オン・オフ）には `rid` は つかない。
- **ためしの DB（PGlite）は、同時の問い合わせが まざる・トランザクションの あいだに べつの つなぎで 書くと 止まる。** サーバーでは DB の問い合わせは 1つずつ順に。日付の 引き算に パラメータを つかうときは `${n}::int`。
- **サーバーの 回数の制限は ためしでは ゆるめている**（`api_test.ts` は `LOGIN_PER_MIN=1000`・`ACT_PER_WINDOW=100000`・`NOTIFY_HOUR=0`）。`api_test.ts` は `import('uchinoko-game')` で サーバーと 同じ `Rules` を さわれる（例外の まね）。サーバーの 時計の まねは `Date.now` を いっとき 置きかえる（かならず もどす）。
- **うちのこカードのメッセージは LINE の「カスタムシェアメッセージ」の決まり**（標準タイプ）。よるの おしらせの Flex は シェアでは ないので この決まりの 外。
- カードの絵の中では ページの CSS が効かない。サーバーの画像は 画面に出していない（CSP の `img-src` に supabase.co は ない）。
- 補足資料の文（PROJECT.md 10章）に出てくる 画面の文言を変えたら、補足資料も直す。
- **（あとで）認証審査を申請したら、審査中は LINE版の画面とサーバーを変えない**。
- LINE版の画面は3か所（`/`・`/review/`・`/dev/`）とも同じファイル。Cloudflare の ヘッダーは `build.sh` が 出す `_headers`。
- Scope は `openid` だけ。`shareTargetPicker`・`requestFriendship` は Scope が いらない。
- 認証されたあとに 本番用の エンドポイントURL・ポリシーと規約の URL・アイコン・チャネル名・説明・多言語対応・Scope・友だち追加オプション・リンクされたLINE公式アカウント・シェアターゲットピッカーを変えると再審査。
- ポリシーに書いたこと（取る情報・送り先・保存期間・外部サービス・回数の上限）を変えたら、`src/legal/` も同じコミットで直す。
- ルールの時刻・日付・偶然は `Clock` だけ。ルールや `buildPrompt`/`parseAI`・`cleanText`・`ensureState`・`hasId` を変えたらサーバーも作り直す（`build_server.py` → push → `--pin` → デプロイ）。`game.js` が変わらないときは、`deno.json` の固定はそのままでよい（`--check`）。
- LINE版のサーバーは、おせわの数字を画面から受けとらない。写真・AIの返事・トークン・カードの画像の中身・LINE の ユーザーIDは ログに出さない（`oops()` の detail にも 入れない）。
- 端末のキー `line-owner`・`line-guest`・`line-left` は消さない。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う（`requestFriendship` は 2.28.0 から）。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ。本物のサーバーと画面は `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`。`md5(convert_to(content,'UTF8'))` で 手元と くらべる）で確かめる。`Accept-Encoding` は つけない。Cloudflare の ポリシー・規約の ページは 手元と md5 が ちがう（配信で 少し足される）ので、中身の文で確かめる。
- **Supabase の `apply_migration` と `deploy_edge_function` は、作業環境の確認で止められることがある**。止められたら、オーナーに理由と中身を伝えて「もう一度ためしてよいか」を聞く。
- Edge Function のデプロイは `index.ts` を丸ごと送る（約6万9千文字・85,552 バイト。JSON の 文字列なので 改行は `\n`、バックスラッシュ 28こは `\\`、ダブルクォート 2こは `\"`）。`project_id` `ftakgswltcavwixqxpzi`、`name` `api`、`verify_jwt: false`、`import_map_path: deno.json`、files は `deno.json` と `index.ts`。送ったあと `get_edge_function` の 結果（ファイルに 保存される）を python で 手元と くらべる。
- ブラウザ：LINE Developers・Supabase・LINE Official Account Manager の設定を変えるのは オーナーの許可をもらってから。**シークレットや チャネルアクセストークンが出るページは本文ごと読まない・画面全体を写さない**。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。実機の確認はオーナーにお願いする。
- Supabase の無料プランは、DB の動きが1週間ほど少ないと止まる（「サーバーを起こす」で3日ごと。毎日 21時の cron も DB を 動かす）。止まっていたら `restore_project`。Storage の無料の枠は 1GB。Edge Function は 月50万回。
- Cloudflare のビルド結果は `gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`。「サーバーを起こす」を 手で動かすのは `gh workflow run keepalive.yml --ref main`、ログは `gh run view <id> --log`。
