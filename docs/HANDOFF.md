# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-28 15時（**40回目：プロジェクトの ナレッジの 整理。アプリは かわらない**＝下の「直近のチャット」）。その前は 2026-11-28 昼（39回目：**包括的な 診断の 直し（直せる もの ぜんぶ）＋N-1 おちば・雪・花びらの カクッ＋N-2 ポップアップの 耳。うちのこラン「完了」。Opus 5.5。** お父さんの 確かめ：公式アカウントの トーク画面から アプリに いけた〈C8-1 済み〉・名前や 毛の色を かえても もどらない・ランを 1本 走って おもくない・おへやの うごき OK・**よるの おしらせだけ まだ**〈お父さんが これから 見る〉。main `4cb61a4` → サーバー api version 32 → Claude版 バージョン41）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 **`uchinoko-5169a74015`**（39回目。`index.html`・`sw.js` の md5 は `c409ed09…`・`e75d3190…`＝本番を pg_net で 読んで 同じ。うちのこランの ファイルは **`run-d92dc9775d54.js`**〈`518ccf75…`〉に かわった）。おせわの 結果は 前と 同じ（`compare_home.py`：おなじ）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン41**（39回目。version `1795826852-9eba`、contract `0.2.73` の まま、capabilities は 引きついだ〈db の ルール 2つ・downloads・sample〈images〉・user〉）。**ファイルは 2つ：`index.html`（sha256 `520c696e…`、501,049 バイト）と うちのこランの `run-d92dc9775d54.js`（`d92dc977…`）**（前の `run-5d3805aee4a4.js` は `remove`。出す 前に `list_files` で バージョン40 が 記録 どおり〈`dce4fc65…`〉なのと、前の 版〈`0282c5c`〉を べつの worktree で 作りなおして 同じ sha256 なのを 確かめてから `publish_files`）。**出し方：** `sh src/build.sh` が `src/out/claude/` に そのまま 出せる 形（`index.html`＝いまの 版と 同じ 1行目 `src/claude_head.html`＋中身＋`</body></html>`、`run-<ハッシュ>.js`）を 作る → `publish_files`（slug は UUID `507aa3eb-87ee-4ddc-80e3-61638a697f56`。短い id は ことわられる。files は その 2つ、`capabilities`・`contract`・`title` は はぶく。ゲームが かわって 名前が かわったら 前の `run-*.js` を `remove`）。出す 前に 前の 版を 作りなおして `list_files` の sha256 と 同じか 確かめる
- ためしの アーティファクト「うちのこ日和 P5 ためし」：https://claude.ai/artifact/G6JjwCoMcYMZ96pctVrYQF （slug `7a36bb48-06ef-452f-8c27-c7e849d00828`。ほんものとは べつ。セーブの キーは `uchinoko-p5test:`、ためしの 子「ためし」、db だけ 宣言）。**2026-11-27 オーナー決定：のこす**（`delete_artifact` は オーナーが たのんだ ときだけ）
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。**39回目（`4cb61a4`）の あとの md5 は 本番用・審査用・開発用 `8c8c88a7…`（3か所とも pg_net で 読んで 同じ）、ゲームの ファイル `/run-d92dc9775d54.js` は `518ccf75…`**。配信は brotli〈`Content-Encoding: br`〉。`LINE_CFG.oaId` に `@370iymyw`）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - ヘッダー（`_headers`）：ぜんぶ（`/*`）に `Referrer-Policy: no-referrer`・`X-Content-Type-Options: nosniff`・`Content-Security-Policy: frame-ancestors 'none'`・`X-Frame-Options: DENY`
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html ・利用規約 https://uchinoko-biyori.pages.dev/terms.html （ポリシーは **2026-11-22 改定〈うちのこランの 記録〉**＝本番の ページで 改定日と「うちのこラン」の 文を 確かめた）、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は **MCP の version 32**（2026-11-28 39回目。`index.ts` は sha256 `880fcc20…`〈87,211 バイト・70,322 文字〉、`deno.json` は `game.js` を `4cb61a4` に 固定〈`ensureState` の 日付の 確かめ〉。`get_edge_function` の 結果を python で 手元と くらべて 2つとも 同じ・`/health` は 200・errors 0・`notifyMonth` ok・セッションなしの `/save` は 401 `nosession`。デプロイは 1回で とおった）。`js_pet.js` の 絵（`renderPet`・`renderPetSide`・`renderPetBack`）を かえても `game.js` は かわらない＝デプロイ いらない（`build_server.py --check` で 確かめる）。**イベント・きせかえ・おやつの データ（`js_data2.js`・`js_data3.js`）や `ensureState` を かえたら `game.js` が かわる＝デプロイ**
- **cron の 関数 `app.notify_kick()`：2026-11-19 に `notify_cron_retry` で 置きかえた**（21:05 は とちゅうで 止まった回も。`pg_get_functiondef` の md5 `4fd92ef1…`）
- 表：`app` スキーマに members・line_accounts・sessions・saves・cards・save_backups・day_quota・error_counts・chores・notify_runs
- **cron：** pg_cron 1.6.4、ジョブ `uchinoko-notify`（**`0,5 12 * * *`＝日本時間 21:00 と 21:05**。`select app.notify_kick()`。21:05 は 21:00 の回が とどかなかった・ことわられた日だけ 動く）。**2026-11-15 21:00 に はじめて 予定どおり 自分で 動いて 1通 とどいた**（`made 12:00:00 UTC`・`done 12:00:21`・`sent 1`・`failed 0`。21:05 は 送らない。オーナーが LINE で 見た）
- 役：`uchinoko_api`（`app` の表だけ。サーバーは この役で つないでいる）
- Storage：バケット `cards`（公開・PNG だけ・1MB まで、ポリシーなし）。カードは 全員で 1500まい まで
- サーバーを起こす：GitHub Actions（`.github/workflows/keepalive.yml`、cron `23 18 */3 * *`＝日本時間 3:23 ごろ、数時間 おくれることがある）。`/health` の `errors`（10以上で 失敗）と `notifyDays`（止まった日が あれば 失敗）を 見る。11-17 の回は 失敗（11-16 の 回を 見つけた）→ **11-20 の回（9:43）は 成功に もどった**（24回目に `gh api …/actions/workflows/keepalive.yml/runs` で 見た）。つぎの 予定は 11-23 3:23 ごろ
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`・`LINE_CHANNEL_SECRET_2012410265`・`APP_DB_PASSWORD`・`LINE_MESSAGING_TOKEN`
- 本物の DB（2026-11-28 9時半・デプロイの あと）：`/health` の errors 0・よるの おしらせ 11-25〜27 は 3日とも おわった・`notifyMonth` ok。
- 本物の DB（2026-11-16 5時半）：**会員 1人＝だいず（本番用。11-16 5:10 に 取りこみ。よるの おしらせ オン・れんぞく 36日・スタンプ 36）**。カード・ひかえ・Storage の `cards` は 0件。`app` の 表に anon・authenticated の 権限は 0。エラーの 数 0。**だいずは 本物の 会員なので、ためしで セーブを さわらない**（`execute_sql` で 書きこまない。読むときも 名前・数だけ）
- LINE公式アカウント「うちのこ日和」（ベーシックID `@370iymyw`、Messaging API の プロバイダー「Y's Apps」、応答メッセージ・Webhook オフ）。ミニアプリの 友だち追加オプション・デフォルトの公式アカウントも 設定ずみ
- LINE Developers：Scope は `openid` だけ。「シェアターゲットピッカー」は 有効。認証審査は まだ申請しない（未認証でリリース → 個人事業主 → 申請）
- 診断レポート（約束①）：https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 （42こ・さいごのチェックの 17こ ぜんぶ 片づいた。**いちばん うしろの 章「認証審査の 前の 包括的な 診断（2026-11-27・Opus 5.5）」の さいごに 39回目の「直し（2026-11-28）」**）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK
- オーナーの事情（約束②で使う）：claude.ai の このプロジェクトの資料 `claude/owner-notes.md`（非公開）


## 直近のチャットでやったこと（2026-11-28 15時、40回目：プロジェクトの ナレッジの 整理。Opus 5.5）

- **きっかけ（オーナー）：** 「アップデートを かさねて プロジェクトの コンテキストの 容量が 50% を こえた。整理しよう」。うちわけ（見つもり）：生成物 2つ（`src/run_bundle.js`・`supabase/functions/api/game.js`）が 約3割、`docs/PROJECT.md` 約15%（更新履歴が その 1/4）、おわった 設計書 3つ 約8%。オーナーが「生成物を 外す＋書庫へ」（おすすめ）を えらんだ。
- **した こと（アプリの 中身・ビルド結果は かわらない＝だいずの アプリは 更新されない・デプロイ なし）：** `docs/RUN_DESIGN.md`・`docs/MOTION_DESIGN.md`・`docs/REVIEW_PROMPT.md` を `_archive/` へ（`git mv`。`_archive/README.md`）。まだ 守る 決まりは `docs/PROJECT.md` 5章「うちのこの しぐさと 体勢」「うちのこラン」の おわりに うつした。`PROJECT.md` 8章の 2026-11-23 までを `_archive/HISTORY.md` へ、9章から 済んだ アイデアを はずした。`CLAUDE.md` の ファイルの 表（`docs/`・`_archive/` の 行）と 作業の 流れ 5・6（更新履歴の うつし方・ナレッジに 入れる もの）。この ファイルの 古い「本物の DB」の 行を へらした。
- **コードの コメントの `docs/RUN_DESIGN.md`・`docs/MOTION_DESIGN.md` は そのまま**（かえると `index.html`・`run-*.js`・`game.js` が かわる）＝`_archive/` の 同じ 名前を 見る。
- **あとから（16時台）：** オーナーから 広告の 話＝記録だけ（下の 保留 7・`docs/PROJECT.md` 10章「メモ（2026-11-28、広告）」）。
- **オーナーに たのんだ こと：** ナレッジの ファイル選択で `src/run_bundle.js` と `supabase/functions/api/game.js` の チェックを はずして「Sync now」。

## その前のチャット（2026-11-28 朝〜昼、39回目：包括的な 診断の 直し・N-1・N-2。Opus 5.5）

- **はじめに（オーナー）：** お父さんは 公式アカウントの「あそぶ」から まだ・ランも まだ・名前や 毛の色の へんこうも まだ。→ **9時に お父さんから 返事：**「5. よるの おしらせ いがいは OK」「トーク画面から アプリに いけるように なっていた」。5つの 確かめ（下の 保留 ③）の 1〜4 と 6 は OK と 読んだ＝**C8-1 済み・名前の 直し OK・ランの 重さ OK〈R3-2 の 実機〉・おへやの うごき OK**。よるの おしらせは お父さんが また 見る。
- **直したもの（main `4cb61a4`。表は 下の「診断の 直し」）：**
  - **N-1：** `head.html` の `@keyframes fall` を `fallSnow`（0 132px, 9px 141px）・`fallPetals`（0 120px, 13px 123px）・`fallLeaves`（0 140px, 12px 116px）に わけた（1周で もようの 高さの 倍数・よこは うごかさない）。`smoke.py` の `WEATHER_JS` が 倍数かを 数える（前の 版で 5つ 見つかる ことも 確かめた）。
  - **N-2：** `.mpet .pet-svg{overflow:visible}`・`.levelup .mpet` の 上に 8px（チワワ・うさぎのみみ・ばんざいで はねた いちばん 上で カードの 上から 5px 出ていた）。`smoke.py` の `POPUP_PET_JS`。
  - **画面：** C6-1 `svgUrl` を `url('…')`（もようがえの かべ「ハートがら」「ほしぞらのかべ」の 見本）・C6-2 `.d-date{white-space:nowrap}`・C5-1 `Game.start` で `Pet.tok++; Pet.el.style.transition = ''`・C5-2 `IDLE_WALKS` は うごきを へらす 設定で 重み 1/4・C2-3/C5-3 `Pet.draw(v)`（よこむき・うしろは はじめて その むきに なる ときに かく。`setView`・`applyView` が よぶ）・C2-4 `appInert(on, page)`（`js_features.js`。パズル・ランが つかう。`inert` が ない ときは `focusin` を ページへ もどす。`HTMLElement.prototype.inert` を けした ブラウザで 確かめた）・C2-1 LINE版の しるし `uchinoko-biyori:line-edit`（`LineSync.markEdit`・`editUnsent`。`ServerRef.set` が queue の 前に 書く・`pushEdit` が とどいたら 空・`attach` の 同じ子で しるしが あえば `know(remote)` してから `apply` → `Persist.flush`）。
  - **ラン：** R3-4 とまっている あいだは かわった すぐあと（0.6秒・3こま）だけ 描く（`seen`・`settle`・`settleN`）・R3-2 `src/run/quality.js` の `makeQuality`（24こま より おそいと きめ 1.6 → 1.25 → 1 → かげ。ゲームの `quality`）・R1-2 `ensureState` の `realDayKey`（`run.day`・`puzzle.day`）・R5-4 `RunUI.drop` を 包んで `.run-over` の 見はりを はずす（`js_line.js`）。→ `run_bundle.js`・`run-d92dc9775d54.js`。
  - **サーバー：** C1-3 ログは `server: <e.name> <SQLSTATE>` だけ・C7-1 `/health` の `notifyMonth`（`NOTIFY_MONTH_LIMIT` 既定 200 の 8わり で `near`・上限で 止まった月は `limit`）・`keepalive.yml` が `near`・`limit` で 失敗。
  - **ためし：** `smoke.py`（天気・ポップアップの 耳・ランの スタート前の こま・ゴールの `quality`・C6-3 はじめに `Nudge.shown = dayKey()`）、`line_e2e.py` 24b（`/save` を 2回 とどかなく して ひらきなおす。LineSync.send は 900ms あとに 1回 おくりなおすので 1回では とどいて しまう）、`api_test.ts`（ログの 形・`notifyMonth`）。
  - **書類：** 補足資料の 文の「そのほか」に 2行（C8-2）・イベントは はじまる 前に 出す（C3-1）・`CLAUDE.md` に `pushEdit`・`line-edit`・`quality.js`（C8-5）・`_archive/RUN_DESIGN.md` 18章（完了・「そのまま」の 一覧・ランキング と Dependabot の 決まり＝C4-1・C4-2・C7-2）・Lighthouse（C8-3。圧縮なし 73点・gzip 96点＝直さない）。
- **ためし（ぜんぶ とおった）：** `smoke.py` 8とおり（ふつう・`--dark`・`--size 375x667`・`--claude`・`--line --android-inset 48`・`--line --size 375x667 --android-inset 48`・`--line --fresh`・`--fresh`）エラー 0・`compare_home.py` おなじ・`linebreak.py`（ホーム画面版 334・LINE版 391・Claude版 334 場面・`--line --height 603`）0・`poses.py` 109とおり おなじ・`run_shots.py` 3つの 版 エラー 0・`run_min.mjs` ok・`line_e2e.py` all passed（172 ok）・`build_run.mjs --check`・`build_server.py --check`。
- **出したもの：** main `4cb61a4`（GitHub Pages・Cloudflare とも 成功）→ `--pin 4cb61a4` → api version 32 → Claude版 バージョン41 → 記録の コミット（`deno.json`・書類）。本番の md5 は pg_net で 手元と 同じ。

## その前のチャット（2026-11-27 夜〜11-28 朝、38回目：いそぎの 2つ・包括的な 診断・オーナーの 確かめ。Opus 5.5）

- いそぎ 1（お父さんが あそべない）＝公式アカウントに 入口が なかった → オーナーが リッチメニュー「あそぶ」と あいさつの リンクを 設定（11-28 06:10）。いそぎ 2（名前・みためが もどる）＝main `a652983`（`LineSync.editPending`・`pushEdit`）。包括的な 診断 25こ（中1・低3・情報21）→ オーナー決定：直せる ものは ぜんぶ 直す。Data API の 自動公開を オーナーが オフ。だいずの 動画で しっぽ OK、N-1・N-2 を 見つけた。

## その前のチャット（2026-11-27、33〜37回目。Opus 5.5）

- 37回目：うしろすがたの しっぽ（`1db3a28`）・「かなえた」の 色。36回目：季節イベント 4つ（`1567b54`・api version 31）。35回目：きせかえの くるりん・だんかい 4＝うしろすがた（`dabb5d5`・`970a187`）。34回目：かげ（`8d35b88`）・だんかい 3（`82bda91`）。33回目：だんかい 2（`045ea6c`）。32回目（11-26 夜）：だんかい 1（`4f1c9c3`・api version 30）。くわしくは `docs/PROJECT.md` 8章・`_archive/MOTION_DESIGN.md`。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

0. **お父さんの よるの おしらせ（のこり 1つ）。** お父さんは 11-27 21:01 に オンに した。21時に きょうの おねがいが のこっている 日だけ とどく（ぜんぶ かなえた 日・14日 ひらいていない 日は とどかない）。とどかない ときは：お父さんが 公式アカウント（`@370iymyw`）を 友だちに しているか・ブロックしていないか・その日 おねがいが のこっていたか。サーバーは `select day, made_at, used_at, done_at, sent, skipped, failed, note from app.notify_runs order by day desc limit 3;`（だれかは 出ない。`sent` の 数だけ）。
1. **12/1 から クリスマスの 雪・12/26 から としこし（オーナーは「その時に 見る」）。** 雪が 6秒ごとに カクッと しないか（N-1 の 直し）・みかんのぼうし・みかんゼリー・こたつと みかん。おかしければ `4cb61a4`（直し）・`1567b54`（季節イベント。**サーバーも かわっている**ので もどすなら `deno.json` も 前に して デプロイ）を `git revert`。
2. **うちのこラン：完了（2026-11-28）。** 「そのまま」の 一覧と これから さわる ときの 決まり（ランキングを 足すなら R1-4・R2-3 を 見なおす・Dependabot の PR は 手で マージしない）は `docs/PROJECT.md` 5章「うちのこラン」の おわり（記録は `_archive/RUN_DESIGN.md` 18章）。
3. **お父さんの 確かめ（2026-11-28 9時の 返事）：** ① 公式アカウントの「あそぶ」から ひらく → OK（トーク画面から いけた）② 名前や 毛の色を かえても もどらない → OK ③ ランを 1本 → おもくない ④ おへやの うごき → OK ⑤ よるの おしらせ → これから ⑥ Android なら 下の すき間 → OK（または 関係ない）。
4. ためしの アーティファクト「うちのこ日和 P5 ためし」（slug `7a36bb48-06ef-452f-8c27-c7e849d00828`）は **のこす（2026-11-27 オーナー決定）**。見本 5（slug `81f73f8f-…`）・見本 4（slug `11962d6f-…`）・見本 3（slug `fc7cec86-…`）・見本 2 も 記録として のこしている。
5. **（オーナーが 決める・いそがない）** 2D の 絵の ヨークシャーテリアも「せなかだけ ブルー」に するか（`renderPet`。3つの 版。**いまは サーバーの デプロイ いらない**）。
6. **（あとで・情報）** P5-3 シートを いちばん上で 下に 引くと LINE の 最小化、P5-4 ダークで ブルーベリーが 見わけにくい、P5-5 高さ 500px より ひくい 画面は パズルが たてに スクロール、P5-6 `smoke.py --claude` は パズルを とおらない。包括的な 診断で「直さない」に した もの（C1-1・C1-2・C1-5・C2-2・ランの「そのまま」）は 下の 表。C8-4（個人事業主に なった あとの ポリシーの 提供者の 書き方）は 個人事業主に なったら 専門家に（約束②の 別プロジェクト）。
7. **（オーナーが 決める・いそがない）LINE版の 広告。** 2026-11-28 オーナーから「収益化の ひとつとして 広告も 考えている。申しこみが まだ なので 記録だけ」。しらべた ことと 入れる ときに かえる もの（ポリシー・規約・`LineNotice`・CSP、5章の「広告の 入口は ありません」）は `docs/PROJECT.md` 10章「メモ（2026-11-28、広告）」。はじめるのは オーナーが LINEヤフー広告の ネットワークパートナーに 申しこんで サイト審査に 通ってから（未認証でも 出せる）。
- おたすけ：ホーム画面版は1日おき。LINE版は「前回から7日」。
- ホーム画面版の だいずは 控えとして のこっている（正本は LINE版）。

## 次にやること

- **包括的な 診断の 直しは 済み**（直せる もの ぜんぶ。表は 下）。認証審査の 申請は **時期 未定**（個人事業主に なってから。申請の 日に 補足資料の 文を 画面と もういちど くらべる）。
- **つぎの チャット：** はじめに お父さんの よるの おしらせ と 12/1 の 雪を きいてから、つぎに なにを するか オーナーと 決める（下の プロンプト）。
- 認証審査を申請したら（時期 未定）：審査は1〜2週間、「審査中」は 画面とサーバーを 変えない。はじめての 審査は 承認で「反映済み」に なり、「検索可能にする」は 30日以内（31日目 9:00 に 自動）。

### 診断の 直し：だれが なにを したか（2026-11-28 済み）

| 番号 | 中身 | どう した |
| --- | --- | --- |
| N-1 | おちば（雪・花びらも）が 1周ごとに カクッ | 天気ごとの `@keyframes`（`4cb61a4`） |
| N-2 | ポップアップで 耳の 先が 切れる | `overflow:visible`・上に 8px（`4cb61a4`） |
| C6-1・C6-2・C5-1・C5-2・C2-1・C2-3・C5-3・C2-4・C6-3 | 画面・LINE版・ためし | 直した（`4cb61a4`） |
| R3-4・R3-2・R1-2・R5-4 | ラン | 直した（`4cb61a4`。R3-2 の 実機も お父さんで OK＝ラン 完了） |
| C1-3・C7-1 | サーバーの ログ・月の 通数 | 直した → api version 32 |
| C8-3 | Lighthouse | 圧縮なし 73点・gzip 96点（本番は brotli）＝直さない |
| C8-2・C8-5・C4-1・C4-2・C7-2・C3-1 | 書類 | 直した |
| C8-1 | 公式アカウントの 入口 | オーナーが 設定（11-28）→ お父さんも ひらけた（済み） |
| C1-4 | Data API の 自動公開 | オーナーが オフ（11-28 済み） |
| C8-4 | 個人事業主に なった あとの ポリシーの 提供者 | 個人事業主に なったら 専門家に |
| C1-1・C1-2・C1-5・C2-2・R1-4・R2-3・R2-4・R2-5・R3-3・R5-3・R6-4 | ― | 直さない（理由は 診断レポートと `docs/PROJECT.md` 5章「うちのこラン」） |

### つぎの チャットに 貼る プロンプト

```
うちのこ日和の つづきです（モデルは Opus 5.5）。
GitHub の Y-s-Apps/uchinoko-biyori を push できる形で つないで、CLAUDE.md・docs/HANDOFF.md・docs/PROJECT.md を 読んでください。
はじめに わたしに きいて：父に よるの おしらせが とどいたか・12/1 からの クリスマスの 雪が カクッと しないで ふっているか。
そのあと、つぎに なにを するか いっしょに 決めたいので、HANDOFF の 保留と これからの アイデア（PROJECT.md 9章）から 選択肢と おすすめを 出してください。
```

## 気をつけること

- **39回目の 直しで 足した しくみ：**
  - **天気の もよう（N-1）：** 天気ごとに `@keyframes`（`fallSnow`・`fallPetals`・`fallLeaves`）。もようの 大きさか うごく 長さを かえる ときは、1周で 1まいずつ 自分の 高さ（はばも、よこに うごかすなら）の 倍数に する（`smoke.py` の `WEATHER_JS` が 数える）。
  - **ポップアップの うちのこ（N-2）：** `.mpet .pet-svg{overflow:visible}`。高い きせかえや 上に はねる 体勢を 足したら `smoke.py` の `POPUP_PET_JS`（チワワ・うさぎのみみ・ばんざいの はねた いちばん 上）で カードから 出ないか。
  - **おへやの 絵（C2-3）：** `Pet.mount` は 正面だけ かき、よこむき・うしろは `Pet.draw(v)` が はじめて その むきに なる ときに かく（`setView`・`applyView` が よぶ）。`.view-s`・`.view-b` の 中を じかに さわる ときは 先に `Pet.draw`。
  - **`appInert(on, page)`（C2-4）：** ページごと うつる 画面を 足したら これで `#app` を とめる（`inert` の ない Safari の フォーカスの しめだし つき）。
  - **LINE版の `line-edit`（C2-1）：** 名前・みための へんこうを おくる 前に しるし、とどいたら 空。`attach` の 同じ子の ところで つかう。`line_e2e.py` 24b。
  - **うちのこランの こまかさ（R3-2）：** `src/run/quality.js`。ヘッドレスの SwiftShader では `level` 2 まで さがる（ためしで ゴールの `quality` に 出る）。とまっている あいだは 描かない（R3-4）ので、`frames` を まつ ためしは 「かわった すぐあとの 3こま」で 足りる ように（`frames > 1`）。
  - **`smoke.py` の よるの ひとこと（C6-3）：** ひらいた すぐあと `Nudge.shown = dayKey()` で アプリじしんの ひとことを とめている。ほかの ためしで よるの ひとことを 見る ときは `Nudge.shown = ''` に してから。
  - **`/health` の `notifyMonth`（C7-1）：** `ok`・`near`・`limit`。`near` に なったら「サーバーを起こす」が 赤く なる（その月の あいだ 3日ごと）。プランを かえたら Secrets の `NOTIFY_MONTH_LIMIT` を その 通数に。
  - **サーバーの ログ（C1-3）：** よそう していない 例外は `server: <name> <SQLSTATE>` だけ。こまったら SQLSTATE で しらべる（文は 出ない）。
- **季節イベント（36回目）：** イベントは `js_data3.js` の `EV(id, ja, from, to, gift, treat, decor, hello)`（期間は かさならない＝`rules_test.mjs` が はしを 見る）。プレゼントの きせかえは `EVENT_WEAR`＋`js_wear.js` の kind（あたまは よこむき・うしろも 自動）、おやつの 絵は `js_data2.js` の `treatIcon`、おへやの かざりは `js_features.js` の `SEASON_DECOR`（`g:[形, 色]` と おきもの `item`）、天気は `weatherOf`。**データは サーバーとも 共通＝かえたら `build_server.py` → `line_e2e.py` → push → `--pin` → デプロイ**。`line_e2e.py` は ためしの 日が イベントの 期間だと はじまりの お知らせが 出るので、ボタンを おす 前に `close_popups`。
- **うちのこの 体勢と 動き（`_archive/MOTION_DESIGN.md` 9章）：**
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
- **うちのこラン（`src/run/`・`src/js_run.js`・`tools/run/`。くわしくは `_archive/RUN_DESIGN.md` 11・12章）：**
  - はじめに `cd tools/run && npm install`。`src/run/` を かえたら `node tools/run/build_run.mjs` で `src/run_bundle.js` を 作りなおして いっしょに コミット（push の 前に `--check`）。そのあと `sh src/build.sh`（`run-<ハッシュ>.js` が かわり、前の `run-*.js` は 消える）。
  - 3つの 版（`RUN_HOME=1`・`RUN_CLAUDE=1`・`RUN_LINE=1`。30回目から main も LINE版に ラン）。`head.html`・`body.html`・共通の `js_*.js` を かえると LINE版も かわる＝ランの 画面の ものは `js_run.js`・`src/run/run.css`・`src/run/` に（ルールと セーブは 共通の ファイル）。**`js_run.js`・`run.css`・`src/run/` を かえると ホーム画面版と Claude版（P6 の あとは LINE版も）が かわる**（Claude版も 出しなおす）。LINE版だけの 直しは `js_line.js`・`line_head.html` に 書き、ビルドの 前後で `index.html`・`sw.js`・`src/out/claude/index.html` の md5 を くらべる。
  - **LINE版（P6。`_archive/RUN_DESIGN.md` 16章）：** ランの 画面・ゲームは 3つの 版で 同じ。LINE版だけの ことは `js_line.js` の `LineRun`（`RunUI.start`・`finish`・`open`・`close` を 包む。走りだしは その回の `sim.start` を インスタンスで 包んで `runStart`）。ゲームの ファイルは LINE版の いちばん上に 1つ（`/run-….js`。審査用・開発用も 同じ）、CSP は `line_head.html` の `__RUN_CSP__`。サーバーの `run` は `js_rules.js` を かえずに ほうびを とめる（きょうの 回数を `perDay` に みせて あとで もどす）。手元の ためしは `smoke.Handler` が LINE版の CSP の URL も 手元に かえる。`line_e2e.py` の ブラウザは SwiftShader つき。`/__debug/run` で 走りだしから 時間が たった ことに できる。
  - **Claude版（P5。`_archive/RUN_DESIGN.md` 15章）：** ゲームは アーティファクトの 2つめの ファイル（`src/out/claude/run-<ハッシュ>.js`）。ページから 相対の パスで `integrity` つき（CSP の URL は いらない）。Service Worker は ないので ランは ネットが いる。保存は クラウド（`S.run` も）。ためしは `smoke.py --claude`（F）・`linebreak.py --claude`（ランの 場面も）・`run_shots.py --claude`。どれも `src/out/claude/` を そのまま 配る（`sh src/build.sh` の あとに）。
  - CSP は ランの ファイルの URL を パスまで（`build.sh` の `HOME_ORIGIN`）。手元の ためしは `smoke.Handler` が その はじめの 部分を 手元の URL に かえて 配信する。ヘッドレスでも WebGL が 動く ように `smoke.CHROMIUM_ARGS`（SwiftShader）。`page.wait_for_function` は CSP で とめられるので `smoke.poll`。`RunUI` は `const`（`window.RunUI` では 見えない）。
  - ヘッドレスの 3D は おそい（こまの あいだに 指の イベントが おくれる）。`smoke.py` の 指の ためしは うちのこの 足を とめてから。ゴールまでの 通しは `tools/run/run_shots.py`（時計を とめて ページの 中で レースを すすめる）。
  - 3D の 色は `NeutralToneMapping`・露出 1（P1）。`makePet3D` に わたす みためは かならず `normalizeLook()` の あと。`mountRace` の `name`・`rivals[].label`・`art` は `esc`・`softName` 済みの HTML。
  - 決めたこと（2026-11-22）：題「うちのこラン」・タイル「ラン」・「おともだち（品種）」・おやつは 骨の ビスケット・時計 00:36.6／36.58秒・コースは ひらがな・**まんなかに ひとことを 出さない**（アジリティでも「ジャンプが届かず」などを まんなかに 出さない。わんランの 下の 1〜6 と「とまっているよ」は よい）。
  - **ルールと セーブ（P3。`_archive/RUN_DESIGN.md` 13章）：** ほうび・回数・ベストは `js_rules.js` の `RUN`・`Rules.run`（3つの 版と サーバーで 同じ）。`RUN.courses` に コースを 足すと `ensureState` が その ベストを のこす（知らない コースは すてる）。`min` を 足したら `node tools/run/run_min.mjs`。サーバーの `/act` は `runStart`・`run` を うけつける（api version 28 から。「はやすぎる」は `min − RUN_SLACK_MS`〈2秒〉、ゴールの おくりなおしは `srv.rg`）。ランの ほうびは レースも アジリティも あわせて 1日3回（`S.run.n`）。
  - **画面（P3）：** `RunUI.select()`（コースを えらぶ）→ `start(id)`（`mountRace({ course, best, next, onSelect, onNext, onFinish })`）→ ゴールで `finish(info)`（`Act.blocked()` を 見てから `Act.run('run', …)`）→ `record(r)` の HTML を `race.js` が `.run-rec` に 入れる。`race.js` の `formatTime` は 100分の1秒に 丸めてから・記録は `timeMs`（画面と 記録の 数を そろえる）。すける おともだちは ふかさだけ 書く 子（`depthOnly`・`renderOrder` 1）を すける あいだだけ 見せる。
  - **ためし（P3）：** `smoke.py` の ランは えらぶ → こうえん → 指 → ひとやすみ → ゴール（ゴールの 前へ とばす＝`min` に 切られる）→ つぎの コース → えらぶ → こうえん → ×。`linebreak.py` の `run_open(c)`・`run_go(c)`・`run_finish(fast, c, pre)`（pre で ベスト・回数を かえる）。`run_shots.py` は 3コースを つづけて（`--gifs park,beach,forest`）。ヘッドレスの 3D は おそいので `run_shots.py` は 1回 10分ほど。
  - **アジリティ（P4。`_archive/RUN_DESIGN.md` 14章）：** `src/run/agility.js`（`mountAgility`・`AGILITY_COURSES`・全体図 `agilityMap`・`agilityHelpHtml`）。`race.js` から `ICON_X`・`ICON_PAUSE`・`formatClock`・`formatTime`・`timeMs` を import。`RunUI.mode`（'race'／'agility'。セーブに 書かない）・`start(id)` は コースの しゅるいで `mountRace`／`mountAgility`。ゲームは `.run-root` に `data-course` を つけるので、えらぶ 画面・`wait()` で けしている（カードの `[data-course]` と まぎれる）。アジリティの タイムは ごうけい（`timeMs(total)`）・`rank` は おくらない。`RUN.courses` の ID は `'first-field'`・`zigzag`・`balance`・`'hill-field'`（`run_min.mjs` の 正規表現は クォートつきも 読む）。
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
- Edge Function のデプロイは `index.ts` を丸ごと送る（39回目で 約7万文字・87,211 バイト。JSON の 文字列なので 改行は `\n`、バックスラッシュ 28こは `\\`〈コメントの `\u0000` も＝そのままだと NUL に なる〉、ダブルクォート 2こは `\"`）。`project_id` `ftakgswltcavwixqxpzi`、`name` `api`、`verify_jwt: false`、`import_map_path: deno.json`、files は `deno.json` と `index.ts`。送ったあと `get_edge_function` の 結果（ファイルに 保存される）を python で 手元と くらべる。
- ブラウザ：LINE Developers・Supabase・LINE Official Account Manager の設定を変えるのは オーナーの許可をもらってから。**シークレットや チャネルアクセストークンが出るページは本文ごと読まない・画面全体を写さない**。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。実機の確認はオーナーにお願いする。
- Supabase の無料プランは、DB の動きが1週間ほど少ないと止まる（「サーバーを起こす」で3日ごと。毎日 21時の cron も DB を 動かす）。止まっていたら `restore_project`。Storage の無料の枠は 1GB。Edge Function は 月50万回。
- Cloudflare のビルド結果は `gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`。「サーバーを起こす」を 手で動かすのは `gh workflow run keepalive.yml --ref main`、ログは `gh run view <id> --log`。
