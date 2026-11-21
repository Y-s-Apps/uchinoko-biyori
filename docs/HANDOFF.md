# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-22（24回目：**うちのこランの P2＝まとめる しくみと レースの「こうえん」（ホーム画面版だけ・ほうび なし）。オーナー OK。** 名前は「うちのこラン」に 決まった（ほか 4つも 決めた＝`docs/RUN_DESIGN.md` 1章）。つぎ：**P3 を 新しい チャットで**（プロンプトは `docs/RUN_DESIGN.md` 10章）。オーナーは 個人事業主の 申請 → 認証審査。**11-23 まで チャットの はじめに サーバーを 見る**）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 **`uchinoko-5f0b17e545`**（24回目の P2 の あと、まんなかの ひとことを けした 版。`index.html`・`sw.js`・`run-143eb664e57e.js` の md5 は `7576d47f…`・`259fe3c0…`・`f99da552…`）。ランが 入ったので だいずの アプリは 更新される（おせわの 動きは 前と同じ＝`compare_home.py`：おなじ）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン29**（`de696b7` の中身。version `1794772870-8994`、capabilities は 引きついだ）。公開するときは `src/out/uchinoko-claude.html` の前に いまの版と同じ1行目（`<!doctype html><html><head><meta charset=utf8><meta name=viewport …><style>…</style></head><body>` ＋改行）を、うしろに `</body></html>` ＋改行 を つけて `publish_files`（slug は UUID `507aa3eb-87ee-4ddc-80e3-61638a697f56`。短い id は ことわられる。`capabilities` は はぶいて 引きつぐ。前の版を この形で 作りなおすと `list_files` の sha256 と 同じになるのを 確かめてから 出す。1行目は `read_file` の `offset 1・limit 1` で 読める）
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。`b34a30d` の ビルドで 3か所とも md5 `c31654d2…` を 確かめた＝メーターの 直し。**24回目の `5e118ef` の ビルドも success**＝ランは 入らない〈`RUN_LINE=0`〉ので 手元の md5 は `c31654d2…` の まま。`LINE_CFG.oaId` に `@370iymyw`）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - ヘッダー（`_headers`）：ぜんぶ（`/*`）に `Referrer-Policy: no-referrer`・`X-Content-Type-Options: nosniff`・`Content-Security-Policy: frame-ancestors 'none'`・`X-Frame-Options: DENY`
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html ・利用規約 https://uchinoko-biyori.pages.dev/terms.html （ポリシーは 2026-11-15 改定〈パズルの 記録〉。今回の 作りなおしでは 取る情報・送り先・保存期間は かわらないので そのまま）、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は **MCP の version 25 のまま**（2026-11-15 17:46。`index.ts` は `6820b68`・`deno.json` は `game.js` を `6820b68` に固定。18・19回目は `game.js` が かわらない＝`build_server.py --check` OK なので デプロイなし）
- **cron の 関数 `app.notify_kick()`：2026-11-19 に `notify_cron_retry` で 置きかえた**（21:05 は とちゅうで 止まった回も。`pg_get_functiondef` の md5 `4fd92ef1…`）
- 表：`app` スキーマに members・line_accounts・sessions・saves・cards・save_backups・day_quota・error_counts・chores・notify_runs
- **cron：** pg_cron 1.6.4、ジョブ `uchinoko-notify`（**`0,5 12 * * *`＝日本時間 21:00 と 21:05**。`select app.notify_kick()`。21:05 は 21:00 の回が とどかなかった・ことわられた日だけ 動く）。**2026-11-15 21:00 に はじめて 予定どおり 自分で 動いて 1通 とどいた**（`made 12:00:00 UTC`・`done 12:00:21`・`sent 1`・`failed 0`。21:05 は 送らない。オーナーが LINE で 見た）
- 役：`uchinoko_api`（`app` の表だけ。サーバーは この役で つないでいる）
- Storage：バケット `cards`（公開・PNG だけ・1MB まで、ポリシーなし）。カードは 全員で 1500まい まで
- サーバーを起こす：GitHub Actions（`.github/workflows/keepalive.yml`、cron `23 18 */3 * *`＝日本時間 3:23 ごろ、数時間 おくれることがある）。`/health` の `errors`（10以上で 失敗）と `notifyDays`（止まった日が あれば 失敗）を 見る。11-17 の回は 失敗（11-16 の 回を 見つけた）→ **11-20 の回（9:43）は 成功に もどった**（24回目に `gh api …/actions/workflows/keepalive.yml/runs` で 見た）。つぎの 予定は 11-23 3:23 ごろ
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`・`LINE_CHANNEL_SECRET_2012410265`・`APP_DB_PASSWORD`・`LINE_MESSAGING_TOKEN`
- 本物の DB（2026-11-22 1時半）：エラーの 数 0（`app.error_counts` 0行）。よるの おしらせ 11-18〜21 は 4日とも 21:00 の 回で おわった（11-19・20 は 1通、11-18・21 は とばした）。さいきん 1日の 関数の ログは 200×20・204×2。（11-19 19時半：会員 1人＝だいず。れんぞく 38日・スタンプ 38・おしらせ オン）
- 本物の DB（2026-11-16 5時半）：**会員 1人＝だいず（本番用。11-16 5:10 に 取りこみ。よるの おしらせ オン・れんぞく 36日・スタンプ 36）**。カード・ひかえ・Storage の `cards` は 0件。`app` の 表に anon・authenticated の 権限は 0。エラーの 数 0。**だいずは 本物の 会員なので、ためしで セーブを さわらない**（`execute_sql` で 書きこまない。読むときも 名前・数だけ）
- LINE公式アカウント「うちのこ日和」（ベーシックID `@370iymyw`、Messaging API の プロバイダー「Y's Apps」、応答メッセージ・Webhook オフ）。ミニアプリの 友だち追加オプション・デフォルトの公式アカウントも 設定ずみ
- LINE Developers：Scope は `openid` だけ。「シェアターゲットピッカー」は 有効。認証審査は まだ申請しない（未認証でリリース → 個人事業主 → 申請）
- 診断レポート（約束①）：https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 （42こ・さいごのチェックの 17こ ぜんぶ 片づいた。**いちばん うしろの 章「パズルの レビュー（2026-11-16）」に 18回目の 結果**）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK
- オーナーの事情（約束②で使う）：claude.ai の このプロジェクトの資料 `claude/owner-notes.md`（非公開）

## 直近のチャットでやったこと（2026-11-22、24回目：うちのこランの P2。Opus 5.5）

- はじめに 23回目の P1 の パッチ（`uchinoko-run-p1.patch`）を `git am` で main に あてて push（`15f442e`。23回目は push できなかった）。
- **P2（`docs/RUN_DESIGN.md` 12章。`5e118ef`）：** `tools/run/build_run.mjs`（esbuild → `src/run_bundle.js`・`--check`）、`build.sh` の スイッチ（`RUN_HOME=1`・`RUN_LINE=0`・`RUN_CLAUDE=0`）で ホーム画面版だけに `run-<ハッシュ>.js`・`integrity`・CSP（その URL だけ）・SW、`src/js_run.js`（「あそぶ」の「ラン」・`#runPage`・WebGL なし・こわれた ファイル）、`src/run/race.js`（わんランの レース画面を 作りなおし・相棒は `makePet3D`・おともだちは `detail` 0.6 で カメラとの あいだに 入ると すける）、`src/run/wanrun/`（わんランの ルール・景色・カメラ。かえたのは import だけ）、`src/run/run.css`。LINE版・Claude版の md5 は 同じ。セーブ・ルール・サーバーは かわらない。
- 確かめ：`smoke.py`（ふつう・`--dark`・`--size 375x667`・`--fresh`・`--line --android-inset 48`・`--claude`）、`linebreak.py`（283場面 ×2・`--height 603`）、`compare_home.py`（おなじ）、`tools/run/run_shots.py`（ゴールまで 36.6秒・GIF。ねこ・ダークも）、`pet3d_test.mjs`（17,248 こ）。スクリーンショットと 走る GIF を オーナーに 見せた → **OK**。
- **オーナー決定（P3 の 前に）：** 画面の 題は「うちのこラン」・シートの タイルは「ラン」、「おともだち（品種）」、おやつは わんランの 骨の ビスケットの まま、時計は 00:36.6（走る あいだ）・36.58秒（ゴール）、コースは ひらがな（こうえん・うみべ・もり）。**GIF を 見て：走る あいだの まんなかの ひとこと（スタート！・ごつん！・ダッシュ！・おやつ 20こ！・みぎだよ・ストップ！）は 出さない**（`race.js`・`run.css` から けした。まんなかは 3・2・1 だけ）。`docs/RUN_DESIGN.md` 1章・7章、`docs/PROJECT.md` 7章。P3 の プロンプトを `docs/RUN_DESIGN.md` 10章に。
- **見まもり（11-22 1時半）：** エラーの 数 0、よるの おしらせ 11-18〜21 は ぶじ、関数の ログは 200・204 だけ、「サーバーを起こす」11-20 は 成功。
- 公開の サイト（`y-s-apps.github.io`）は この 作業環境から ひらけない（プロキシで ことわられる）ので、反映は Pages の deploy が success で 確かめた。

## その前のチャット（2026-11-21、23回目：うちのこラン（仮）の P1）

`src/run/pet3d.js`（`makePet3D` など。41種・ねこ・くびの きせかえ）と 見くらべの 道具 `tools/run/`（`pet3d_compare.py`・`pet3d_test.mjs`）。オーナー OK（立ち耳の つけね・ヨーキーの 色を 直して）。22回目は うちのこランの 設計（`docs/RUN_DESIGN.md`・`_ref/wanrun-v33/`）。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **リリースから 1週間（11-23 まで）：** チャットの はじめに サーバーのログ（無料プランは 1日分。`query_logs` で 24時間ずつ。`select log_attributes['response.status_code'] as status, count(*) from logs where source = 'function_edge_logs' group by status`）と `app.error_counts`（`/health` の `errors`）、`app.notify_runs`（`/health` の `notifyDays`・送った数・`note`）を 見る。11-22 1時半 までは ぜんぶ ぶじ（24回目）。「サーバーを起こす」は 11-20 が 成功、つぎの 予定が 11-23 3:23 ごろ → **11-23 の 回が 成功か**（`gh run list` は GraphQL で とめられるので REST：`gh api "repos/Y-s-Apps/uchinoko-biyori/actions/workflows/keepalive.yml/runs?per_page=3"`）。21:05 の やりなおしが 動いた日は `made_at` が 12:05 UTC に なる。11-24 からは ふだんの 見まもりに もどす。
2. **（オーナーが 決める・いそがない）** Supabase の Data API の「Automatically expose new tables」を オフに するか（Supabase も オフを すすめている。いまは `public` に 表が ないので 害は ない。変えるのは オーナーの 許可を もらってから）。
3. **公開の日の 手順 5（実機で 見る）の こまかい ところ：** よるの ひとこと（21時すぎ）・ひらいたまま つぎの日・トークの カードの ボタン など、気に なる ところが あったか オーナーに きく（きくだけ）。なでなで（P5-1）の はじめの 下スワイプも。
4. **手順 6：** テスターでない人（家族など）の LINE で 本番用の LIFF URL（https://miniapp.line.me/2012410265-PutgsCLS ）が ひらけるか。Android の 人が いれば 下の 5つの ボタンと パズルの 下の すき間（P6-1）。
5. **うちのこラン（`docs/RUN_DESIGN.md`）：** P1・P2 済み（オーナー OK）。**つぎは P3**（レース3コース・コースを えらぶ 画面〈題は「うちのこラン」〉・ほうび・記録・アルバム。プロンプトは 10章）。**P3 の ほうびは 3つの 版と サーバーで 同じ ファイル（`js_rules.js`・`js_features.js`）なので LINE版の md5 と `game.js` も かわる**＝P3 の はじめに オーナーに LINE の 認証審査中か きく（審査中なら ホーム画面版だけの ファイルに。9章）。LINE版（P6）は 認証審査中を さけて。
5b. **うちのこの 体勢と 動き（`docs/MOTION_DESIGN.md`）：** 実装は Opus 5.5 の 新しい チャットで（プロンプトは 設計の 8章）。**認証審査の「審査中」は LINE版を かえられないので、申請の 前か 認証の あとに 出す。**
5e. **Dependabot の PR #1**（esbuild 0.24.2 → 0.28.1、`tools/run/`。2026-11-21）：開発用 サーバー（`serve`）の 注意で、うちのこは `build` だけ。**手で マージしない**（lockfile と `src/run_bundle.js` が ずれる）。上げるなら P3 で `npm install` → `build_run.mjs` → ためしを ぜんぶ とおして いっしょに コミットし、PR は とじる（`docs/RUN_DESIGN.md` 12章）。
5d. **（オーナーが 決める・いそがない）** 2D の 絵の ヨークシャーテリアも 全身タイツの ように 見えるので、3D と 同じく「せなかだけ ブルー」に するか（`renderPet`。3つの 版が かわる）。
6. **（あとで・情報）** P5-3 シートを いちばん上で 下に 引くと LINE の 最小化、P5-4 ダークで ブルーベリーが 見わけにくい、P5-5 高さ 500px より ひくい 画面は パズルが たてに スクロール、P5-6 `smoke.py --claude` は パズルを とおらない。
- おたすけ：ホーム画面版は1日おき。LINE版は「前回から7日」（だいずは LINE版に うつったので 7日に 1回。前回は 11-11 → つぎは 11-18 から）。
- ホーム画面版の だいずは 控えとして のこっている（引っこしは コピー。LINE版と べつべつに すすむ。正本は LINE版）。

## 次にやること

- オーナー：別プロジェクトで 個人事業主の 申請（開業届など）→ 認証審査の 申請（補足資料の文は `docs/PROJECT.md` 10章。申請の 前に 画面の 文言と あっているか 見なおす）。
- 認証審査を申請したら：審査は1〜2週間、「審査中」は取り消しも変更も できない（画面とサーバーも変えない）。認証されたら：「検索可能にする」は 承認から30日以内に押す。リンクする公式アカウント・友だち追加オプションは 認証の前に すませておく（あとで変えると 再審査）。
- うちのこランの P3（Opus 5.5 の 新しい チャット。`docs/RUN_DESIGN.md` 10章の プロンプト）。
- うちのこの 体勢と 動き（Opus 5.5）は 審査中を さけて。

## 気をつけること

- **うちのこラン（`src/run/`・`src/js_run.js`・`tools/run/`。くわしくは `docs/RUN_DESIGN.md` 11・12章）：**
  - はじめに `cd tools/run && npm install`。`src/run/` を かえたら `node tools/run/build_run.mjs` で `src/run_bundle.js` を 作りなおして いっしょに コミット（push の 前に `--check`）。そのあと `sh src/build.sh`（`run-<ハッシュ>.js` が かわり、前の `run-*.js` は 消える）。
  - ホーム画面版だけ（`RUN_HOME=1`・`RUN_LINE=0`・`RUN_CLAUDE=0`）。`head.html`・`body.html`・共通の `js_*.js` を かえると LINE版・Claude版も かわる＝ランの ものは `js_run.js`・`src/run/run.css`・`src/run/` に。ビルドの 前後で `src/out/line/index.html`（`c31654d2…`）・`src/out/uchinoko-claude.html`（`1b6ecbe8…`）の md5 を くらべる。
  - CSP は ランの ファイルの URL を パスまで（`build.sh` の `HOME_ORIGIN`）。手元の ためしは `smoke.Handler` が その はじめの 部分を 手元の URL に かえて 配信する。ヘッドレスでも WebGL が 動く ように `smoke.CHROMIUM_ARGS`（SwiftShader）。`page.wait_for_function` は CSP で とめられるので `smoke.poll`。`RunUI` は `const`（`window.RunUI` では 見えない）。
  - ヘッドレスの 3D は おそい（こまの あいだに 指の イベントが おくれる）。`smoke.py` の 指の ためしは うちのこの 足を とめてから。ゴールまでの 通しは `tools/run/run_shots.py`（時計を とめて ページの 中で レースを すすめる）。
  - 3D の 色は `NeutralToneMapping`・露出 1（P1）。`makePet3D` に わたす みためは かならず `normalizeLook()` の あと。`mountRace` の `name`・`rivals[].label`・`art` は `esc`・`softName` 済みの HTML。
  - 決めたこと（2026-11-22）：題「うちのこラン」・タイル「ラン」・「おともだち（品種）」・おやつは 骨の ビスケット・時計 00:36.6／36.58秒・コースは ひらがな・**まんなかに ひとことを 出さない**（P3 で わんランの 海辺・森を 持ってきても「ぶつかった！」などを 足さない）。
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
- いま育てている子は「だいず」（クリームのポメラニアン。**2026-11-16 から LINE版の 本番用が 正本**、ホーム画面版は 控え）。セーブをこわす変更はしない。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる（`md5sum`。いまは `d8882038…`・`36368c0e…`）。
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
- Edge Function のデプロイは `index.ts` を丸ごと送る（6万5千文字。JSON の 文字列なので 改行は `\n`、バックスラッシュ 28こは `\\`、ダブルクォート 2こは `\"`）。`project_id` `ftakgswltcavwixqxpzi`、`name` `api`、`verify_jwt: false`、`import_map_path: deno.json`、files は `deno.json` と `index.ts`。送ったあと `get_edge_function` の 結果（ファイルに 保存される）を python で 手元と くらべる。
- ブラウザ：LINE Developers・Supabase・LINE Official Account Manager の設定を変えるのは オーナーの許可をもらってから。**シークレットや チャネルアクセストークンが出るページは本文ごと読まない・画面全体を写さない**。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。実機の確認はオーナーにお願いする。
- Supabase の無料プランは、DB の動きが1週間ほど少ないと止まる（「サーバーを起こす」で3日ごと。毎日 21時の cron も DB を 動かす）。止まっていたら `restore_project`。Storage の無料の枠は 1GB。Edge Function は 月50万回。
- Cloudflare のビルド結果は `gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`。「サーバーを起こす」を 手で動かすのは `gh workflow run keepalive.yml --ref main`、ログは `gh run view <id> --log`。
