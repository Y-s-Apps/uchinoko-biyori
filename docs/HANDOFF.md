# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-22（30回目：**うちのこランの P6＋レビューの 直しを 出した。** 29回目の パッチ `review-fixes-2026-11-22.patch` を ブランチ `p6-run-line` に あてて（`967d7ca`）、生成物を 作りなおし（`d1211e1`。ゲームの ファイルは `run-c705e8edb040.js`）、ためしを ぜんぶ とおして main に 入れた → サーバー api **version 28** を デプロイ（`deno.json` は `d1211e1` の `game.js` に 固定＝`812e644`）→ Claude版を **バージョン31** に 出しなおした。ホーム画面版・LINE版（3か所）・サーバー・Claude版 ぜんぶ 本番で 確かめた。**オーナーが iPhone の LINE で 走って OK（1〜5 ぜんぶ。4 は 本番用で 機内モード）**。そのあと **esbuild を 0.28.1 に 上げた**（Dependabot の 注意。`target` は safari14.1。ゲームの ファイルは `run-5d3805aee4a4.js`＝ちがいは ちぢめかた だけ）→ ためしを ぜんぶ とおして main に、Claude版は **バージョン32**）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 **`uchinoko-1bd630c7fe`**（30回目の esbuild 0.28.1。`index.html`・`sw.js`・`run-5d3805aee4a4.js` の md5 は `6bcba824…`・`5c3ba6f7…`・`283ca8f2…`）。ランを つかわなければ おせわの 動きは 前と同じ（`compare_home.py`：おなじ）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン32**（30回目の esbuild 0.28.1。version `1795354979-d5dd`、contract `0.2.73` の まま、capabilities は 引きついだ〈db の ルール 2つ・downloads・sample〈images〉・user〉）。**ファイルは 2つ：`index.html`（sha256 `10f972fa…`、370,295 バイト）と うちのこランの `run-5d3805aee4a4.js`（`5d3805ae…`）**。前の `run-c705e8edb040.js` は `remove` した（`list_files` で 2つだけ。sha256 は 手元と 同じ）。**出し方：** `sh src/build.sh` が `src/out/claude/` に そのまま 出せる 形（`index.html`＝いまの 版と 同じ 1行目 `src/claude_head.html`＋中身＋`</body></html>`、`run-<ハッシュ>.js`）を 作る → `publish_files`（slug は UUID `507aa3eb-87ee-4ddc-80e3-61638a697f56`。短い id は ことわられる。files は その 2つ、`capabilities`・`contract`・`title` は はぶく。ゲームが かわって 名前が かわったら 前の `run-*.js` を `remove`）。出す 前に 前の 版を 作りなおして `list_files` の sha256 と 同じか 確かめる（その コミットで `sh src/build.sh` → `src/out/claude/index.html`。P5 より 前の コミットは `out/uchinoko-claude.html` を `claude_head.html` と `</body></html>` で 包む）
- ためしの アーティファクト「うちのこ日和 P5 ためし」：https://claude.ai/artifact/G6JjwCoMcYMZ96pctVrYQF （slug `7a36bb48-06ef-452f-8c27-c7e849d00828`。ほんものとは べつ。セーブの キーは `uchinoko-p5test:`、ためしの 子「ためし」、db だけ 宣言。ひらくと 読みこみ・integrity・WebGL 2 を しらべて db の `probe/env`、ランを ひらく・走ると `probe/open` に 書く＝`db_list`（collection `probe`）で 読む）。2026-11-22 に オーナーが iPhone で ひらいて 結果を 読んだ（15章）。いらなく なったら オーナーに きいて 消す（`delete_artifact` は オーナーが たのんだ ときだけ）
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。**30回目に うちのこランが 入った〈`RUN_LINE=1`〉。esbuild 0.28.1 の あとの md5 は 本番用・審査用・開発用 `17810c79…`（491,478 バイト）、ゲームの ファイル `/run-5d3805aee4a4.js` は `283ca8f2…`**（`application/javascript`・`Cache-Control: public, max-age=31536000, immutable`。`d1211e1` の ときに pg_net で 確かめた しくみ）。`LINE_CFG.oaId` に `@370iymyw`）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - ヘッダー（`_headers`）：ぜんぶ（`/*`）に `Referrer-Policy: no-referrer`・`X-Content-Type-Options: nosniff`・`Content-Security-Policy: frame-ancestors 'none'`・`X-Frame-Options: DENY`
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html ・利用規約 https://uchinoko-biyori.pages.dev/terms.html （ポリシーは **2026-11-22 改定〈うちのこランの 記録〉**＝本番の ページで 改定日と「うちのこラン」の 文を 確かめた）、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は **MCP の version 28**（2026-11-22 30回目。`index.ts` は `d1211e1`〈sha256 `b2fafd73…`。`/act` に `runStart`・`run`、`RUN_SLACK_MS`・`srv.rg`〉・`deno.json` は `game.js` を `d1211e1` に固定〈`812e644`〉。`get_edge_function` の 結果を python で 手元と くらべて 2つとも 同じ・`/health` は 200・errors 0・セッションなしの `/act` は 401 `nosession`）
- **cron の 関数 `app.notify_kick()`：2026-11-19 に `notify_cron_retry` で 置きかえた**（21:05 は とちゅうで 止まった回も。`pg_get_functiondef` の md5 `4fd92ef1…`）
- 表：`app` スキーマに members・line_accounts・sessions・saves・cards・save_backups・day_quota・error_counts・chores・notify_runs
- **cron：** pg_cron 1.6.4、ジョブ `uchinoko-notify`（**`0,5 12 * * *`＝日本時間 21:00 と 21:05**。`select app.notify_kick()`。21:05 は 21:00 の回が とどかなかった・ことわられた日だけ 動く）。**2026-11-15 21:00 に はじめて 予定どおり 自分で 動いて 1通 とどいた**（`made 12:00:00 UTC`・`done 12:00:21`・`sent 1`・`failed 0`。21:05 は 送らない。オーナーが LINE で 見た）
- 役：`uchinoko_api`（`app` の表だけ。サーバーは この役で つないでいる）
- Storage：バケット `cards`（公開・PNG だけ・1MB まで、ポリシーなし）。カードは 全員で 1500まい まで
- サーバーを起こす：GitHub Actions（`.github/workflows/keepalive.yml`、cron `23 18 */3 * *`＝日本時間 3:23 ごろ、数時間 おくれることがある）。`/health` の `errors`（10以上で 失敗）と `notifyDays`（止まった日が あれば 失敗）を 見る。11-17 の回は 失敗（11-16 の 回を 見つけた）→ **11-20 の回（9:43）は 成功に もどった**（24回目に `gh api …/actions/workflows/keepalive.yml/runs` で 見た）。つぎの 予定は 11-23 3:23 ごろ
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`・`LINE_CHANNEL_SECRET_2012410265`・`APP_DB_PASSWORD`・`LINE_MESSAGING_TOKEN`
- 本物の DB（2026-11-22 21時45分・デプロイの あと）：`/health` の errors 0。よるの おしらせ 11-19〜21 は 3日とも おわった。
- 本物の DB（2026-11-22 8時・9時）：エラーの 数 0・会員 1人。よるの おしらせ 11-19〜21 は 3日とも おわった（`/health` の `notifyDays`）。
- 本物の DB（2026-11-22 2時・4時）：エラーの 数 0（`app.error_counts` 0行）・会員 1人。よるの おしらせ 11-19〜21 は 3日とも 21:00 の 回で おわった（11-19・20 は 1通、11-21 は とばした）。関数の ログ（24時間）は 200×37・204×4。「サーバーを起こす」11-20 は 成功。
- 本物の DB（2026-11-16 5時半）：**会員 1人＝だいず（本番用。11-16 5:10 に 取りこみ。よるの おしらせ オン・れんぞく 36日・スタンプ 36）**。カード・ひかえ・Storage の `cards` は 0件。`app` の 表に anon・authenticated の 権限は 0。エラーの 数 0。**だいずは 本物の 会員なので、ためしで セーブを さわらない**（`execute_sql` で 書きこまない。読むときも 名前・数だけ）
- LINE公式アカウント「うちのこ日和」（ベーシックID `@370iymyw`、Messaging API の プロバイダー「Y's Apps」、応答メッセージ・Webhook オフ）。ミニアプリの 友だち追加オプション・デフォルトの公式アカウントも 設定ずみ
- LINE Developers：Scope は `openid` だけ。「シェアターゲットピッカー」は 有効。認証審査は まだ申請しない（未認証でリリース → 個人事業主 → 申請）
- 診断レポート（約束①）：https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 （42こ・さいごのチェックの 17こ ぜんぶ 片づいた。**いちばん うしろの 章「パズルの レビュー（2026-11-16）」に 18回目の 結果**）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK
- オーナーの事情（約束②で使う）：claude.ai の このプロジェクトの資料 `claude/owner-notes.md`（非公開）

## 直近のチャットでやったこと（2026-11-22、30回目：P6＋レビューの 直しを 出す。Opus 5.5）

- 28回目の P6 の チャットの つづき（29回目の レビューの チャットの あとに もどってきた）。オーナーが 添付した パッチを `git fetch --depth=200 origin p6-run-line` の ブランチに `git am`（`967d7ca`）→ `build_run.mjs`・`build.sh`・`build_server.py` で 生成物を 作りなおして コミット（`d1211e1`）。
- ためし（ぜんぶ `d1211e1` で）：`line_e2e.py`（163 ok・FAIL 0）・`smoke.py`（ホーム画面版・`--claude`・`--line --android-inset 48`、エラー 0）・`compare_home.py`（おなじ）・`linebreak.py --line --height 603`（ランと アジリティの 場面、375・390 とも 0）・R5-2 の まだ つながっていない ときの ことば（ゲストには 出ない）。
- main に fast-forward で 入れて push → `build_server.py --pin d1211e1…` → MCP で `api` を デプロイ（version 28）→ `get_edge_function` の 結果と 手元が 同じ → `--check` → pg_net で `/health`・LINE版 3か所・`/run-c705e8edb040.js`・ホーム画面版・ポリシーの ページ → `deno.json` を push（`812e644`）→ Claude版を `publish_files`（バージョン31・前の ゲームの ファイルは `remove`）。
- **オーナーが iPhone の LINE で 走って OK**（1 ほうび・2 ノーミスの アジリティでも ほうび・3 下に 引いても 小さく ならない・4 機内モードで スタートの カードに ことば〈本番用で〉・5 はやさ）。4 の「つなぎなおして おくると この回は ほうび なし」は、その日の ほうびを もう 3回 もらっていたので 実機では 見ていない（ためしの `line_e2e.py` 23b・`api_test.ts` が 見ている）。
- **esbuild を 0.28.1 に（保留 5e。push の ときの「Dependabot の 注意 1こ（moderate）」＝esbuild の 開発用 サーバー。うちのこは `build` だけ）：** `npm install --save-exact esbuild@0.28.1`。0.28 は `target` safari14 で 分割代入を 書きかえられないと 止まるので safari14.1 に（`build_run.mjs`・`pet3d_test.mjs`。ランは WebGL 2＝iOS 15 から）。ちぢめない 形で くらべると 0.24.2／safari14 と 1文字も ちがわない＝ちがいは 名前の つけかたと Three.js の 定数の うめこみ だけ。ゲームの ファイルは `run-5d3805aee4a4.js`。ためし：`smoke.py`（ホーム画面版・`--claude`・`--line --android-inset 48`、エラー 0）・`compare_home.py`（おなじ）・`line_e2e.py`（163 ok）・`pet3d_test.mjs`（ok）。Claude版 バージョン32。PR #1 は とじた。

## その前のチャット（2026-11-22、29回目：うちのこランの レビューと 直し。Opus 5.5）

- `docs/REVIEW_PROMPT.md` の とおりに レビュー（段階0〜9）。診断レポートの いちばん うしろに 章「うちのこランの レビュー（2026-11-22・P1〜P6）」。29こ（中1・低6・情報22）、「必ず」は 0。手元で 再現した もの：R3-1（コースを かえるたびに メモリ 約3MB）・R2-1（ゴールの おくりなおしが 2回めに）・R2-2（アジリティの ゆとり 3秒）・R8-1（375×603 で カードが はみだす）。
- **直し（オーナー決定：「そのまま」いがい ぜんぶ。`docs/RUN_DESIGN.md` 17章・`docs/PROJECT.md` 8章「つづき 5」）：** R3-1・R1-1・R1-3・R2-1・R2-2・R4-1・R4-2・R4-3・R5-2・R6-2・R8-1、書類 R6-1・R6-3・R7-2・R7-4。ゲームの ファイルは `run-c705e8edb040.js`。ホーム画面版・Claude版・LINE版・サーバー（`index.ts` と `game.js`）が かわる。
- ためし（ぜんぶ この ブランチの 直しの あと）：`rules_test.mjs`・`api_test.ts`・`line_e2e.py`（163 ok・FAIL 0）・`compare_home.py`（おなじ）・`smoke.py`（7とおり）・`linebreak.py`（`--line --height 603` も 0）・`run_shots.py`（5とおり）。
- **push・デプロイは できなかった**（はじめに 読むだけで つないだ チャットなので、push の つなぎ方が ことわられた）。直しは パッチ `review-fixes-2026-11-22.patch` に して オーナーに わたした（つぎの チャットに 添付してもらう。生成物 `src/run_bundle.js`・ルートの `index.html`・`sw.js`・`run-*.js`・`game.js` は のぞいた＝あてたあとに 作りなおす）。

## その前のチャット（2026-11-22、28回目：うちのこランの P6。Opus 5.5）

LINE の 認証審査は まだ 申請していない（オーナー）。P6（`docs/RUN_DESIGN.md` 16章）を ブランチ `p6-run-line` に 作った：サーバーの `/act` に `runStart`・`run`（走りだしが ない・ちがう コース・はやすぎる ゴールは ほうびなし）、`RUN_LINE=1`・`LineRun`・`line_head.html`、ポリシーの 改定（ランの 記録）。レビューは オーナー決定で Opus 5.5 の べつの チャット・うちのこラン（P1〜P6）が 影響する 範囲 ぜんぶ。27回目は P5（Claude版）、26回目は P4、25回目は P3、24回目は P2、23回目は P1、22回目は 設計。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

0. **ためしの アーティファクト「うちのこ日和 P5 ためし」**（slug `7a36bb48-06ef-452f-8c27-c7e849d00828`）は もう いらない（結果は `docs/RUN_DESIGN.md` 15章）。消すかは オーナーに きく（`delete_artifact` は オーナーが たのんだ ときだけ。のこしても こまらない）。
1. **リリースから 1週間（11-23 まで）の さいご：** つぎの チャットの はじめに「サーバーを起こす」の **11-23 3:23 ごろの 回が 成功か** だけ 見る（`gh api "repos/Y-s-Apps/uchinoko-biyori/actions/workflows/keepalive.yml/runs?per_page=3"`。`gh run list` は GraphQL で とめられる）。11-22 4時 までは ぜんぶ ぶじ（25回目）。そのあとは ふだんの 見まもり（気に なる ときに `/health`・`app.error_counts`・`app.notify_runs`）。
2. **（オーナーが 決める・いそがない）** Supabase の Data API の「Automatically expose new tables」を オフに するか（Supabase も オフを すすめている。いまは `public` に 表が ないので 害は ない。変えるのは オーナーの 許可を もらってから）。
3. **公開の日の 手順 5（実機で 見る）の こまかい ところ：** よるの ひとこと（21時すぎ）・ひらいたまま つぎの日・トークの カードの ボタン など、気に なる ところが あったか オーナーに きく（きくだけ）。なでなで（P5-1）の はじめの 下スワイプも。
4. **手順 6：** テスターでない人（家族など）の LINE で 本番用の LIFF URL（https://miniapp.line.me/2012410265-PutgsCLS ）が ひらけるか。Android の 人が いれば 下の 5つの ボタンと パズルの 下の すき間（P6-1）。
5. **うちのこラン P6＋レビューの 直し（LINE版。`docs/RUN_DESIGN.md` 16章・17章）：済み＝オーナー OK（30回目）。** main `d1211e1`・`812e644`、api version 28、そのあと esbuild 0.28.1 で Claude版 バージョン32。ポリシーの 改定日 2026-11-22 は 出した 日と 同じ＝R7-1 そのまま。（のこしていた メモ：**のこり：オーナーが iPhone の LINE（開発用の LIFF URL https://miniapp.line.me/2012410263-cuCI7vQS ）で 走って：ほうびが 出る・アジリティを じょうずに（ミスなしで）走っても ほうびが 出る・一覧や ゴールの カードで 下に 引いても LINE が 小さく ならない・つながっていない ときは スタートの カードに ことば・古い 端末の はやさ（R3-2）。** ホーム画面版（だいずの 控え）も ひらきなおすと ゲームの ファイルが かわる。）**OK を もらったので、認証審査の 申請は 個人事業主の あとに いつでも**（申請の 前の 診断は 下の「次にやること」）。
5b. **うちのこの 体勢と 動き（`docs/MOTION_DESIGN.md`）：** 実装は Opus 5.5 の 新しい チャットで（プロンプトは 設計の 8章）。**認証審査の「審査中」は LINE版を かえられないので、申請の 前か 認証の あとに 出す。**
5e. **Dependabot（esbuild）：30回目に 0.28.1 に 上げて 済み**（PR #1 は とじた）。つぎに Dependabot が `tools/run/` の PR を 出しても 手で マージしない（lockfile と `src/run_bundle.js` が ずれる）。上げるなら `npm install` → `build_run.mjs` → ためしを ぜんぶ とおして いっしょに コミット。
5d. **（オーナーが 決める・いそがない）** 2D の 絵の ヨークシャーテリアも 全身タイツの ように 見えるので、3D と 同じく「せなかだけ ブルー」に するか（`renderPet`。3つの 版が かわる）。
6. **（あとで・情報）** P5-3 シートを いちばん上で 下に 引くと LINE の 最小化、P5-4 ダークで ブルーベリーが 見わけにくい、P5-5 高さ 500px より ひくい 画面は パズルが たてに スクロール、P5-6 `smoke.py --claude` は パズルを とおらない。
- おたすけ：ホーム画面版は1日おき。LINE版は「前回から7日」（だいずは LINE版に うつったので 7日に 1回。前回は 11-11 → つぎは 11-18 から）。
- ホーム画面版の だいずは 控えとして のこっている（引っこしは コピー。LINE版と べつべつに すすむ。正本は LINE版）。

## 次にやること

- オーナー：別プロジェクトで 個人事業主の 申請（開業届など）→ 認証審査の 申請（補足資料の文は `docs/PROJECT.md` 10章。申請の 前に 画面の 文言と あっているか 見なおす）。
- 認証審査を申請したら：審査は1〜2週間、「審査中」は取り消しも変更も できない（画面とサーバーも変えない）。認証されたら：「検索可能にする」は 承認から30日以内に押す。リンクする公式アカウント・友だち追加オプションは 認証の前に すませておく（あとで変えると 再審査）。
- うちのこランの P6：済み（30回目。レビューの 直しまで 出して オーナー OK）。
- **認証審査の 申請の 前に、包括的な 診断（約束①の ような ぜんぶ）を もう一度 すすめる**：11-16 の パズルの レビューの あとの、ラン いがいの 直し（`de696b7` なでなでの 下スワイプ と 小さい Android の 下の ボタン、`b34a30d` ひらいたときの メーター と 21:05 の やりなおし）は まだ だれも レビューしていない。
- うちのこの 体勢と 動き（Opus 5.5）は 審査中を さけて。

## 気をつけること

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
