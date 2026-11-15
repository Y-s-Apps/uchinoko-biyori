# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-15（16回目：**パズル「おやつならべ」を リリースの前に 足した**（オーナー決定で ③ の 前倒し）。とちゅう：push → サーバーの デプロイ → Claude版 → オーナーの 実機 → Fable 5.2 の レビュー（`docs/REVIEW_PROMPT.md`）→ 直し → リリース）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 **`uchinoko-deffdbacd6`**（`bcbd414`。公開中の `index.html`・`sw.js` の md5 が 手元と同じ＝`e0821d0f…`・`65669db0…`）。おせわの 動きは 前と同じ（`compare_home.py`：おなじ）。よるの ひとことの 直し（F3-1）が 入ったので、だいずの アプリは 更新される（動きは 同じ）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン26**（`bcbd414` の中身）。公開するときは `src/out/uchinoko-claude.html` の前に いまの版と同じ1行目（`<!doctype html><html><head><meta charset=utf8><meta name=viewport …><style>…</style></head><body>` ＋改行）を、うしろに `</body></html>` ＋改行 を つけて `publish_files`（slug は UUID `507aa3eb-87ee-4ddc-80e3-61638a697f56`。短い id は ことわられる。`capabilities` は はぶいて 引きつぐ。前の版を この形で 作りなおすと `list_files` の sha256 と 同じになるのを 確かめてから 出す）
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。`bcbd414` で 3か所とも 手元の `src/out/line/index.html` と同じ＝`bcc62c0f…`。`LINE_CFG.oaId` に `@370iymyw`）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - ヘッダー（`_headers`）：ぜんぶ（`/*`）に `Referrer-Policy: no-referrer`・`X-Content-Type-Options: nosniff`・`Content-Security-Policy: frame-ancestors 'none'`・`X-Frame-Options: DENY`
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html ・利用規約 https://uchinoko-biyori.pages.dev/terms.html （どちらも 2026-11-14 改定。今回の 直しでは 取る情報・送り先・保存期間は かわらないので そのまま）、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は **MCP の version 24**（`index.ts` は `919a322`。`get_edge_function` で 手元と同じ）。`deno.json` は `game.js` を コミット **`3933abe`** に固定のまま（`game.js` は かわらない。`--check` 同じ）
- 表：`app` スキーマに members・line_accounts・sessions・saves・cards・save_backups・day_quota・error_counts・chores・notify_runs
- **cron：** pg_cron 1.6.4、ジョブ `uchinoko-notify`（**`0,5 12 * * *`＝日本時間 21:00 と 21:05**。2026-11-15 から。`select app.notify_kick()`。21:05 は 21:00 の回が とどかなかった・ことわられた日だけ 動く）。`/notify/run` は 21時の 2分前から うけつける
- 役：`uchinoko_api`（`app` の表だけ。サーバーは この役で つないでいる）
- Storage：バケット `cards`（公開・PNG だけ・1MB まで、ポリシーなし）。カードは 全員で **1500まい**まで（2026-11-15 から。前は 3000）
- サーバーを起こす：GitHub Actions（`.github/workflows/keepalive.yml`、cron `23 18 */3 * *`＝日本時間 3:23 ごろ、数時間 おくれることがある）。**2026-11-15 から `/health` の `notifyDays`（この3日の よるの おしらせの 回）も 見て、止まった日が あれば 失敗**（月の 上限 `limit` は 失敗に しない）。2026-11-15 7:54 に 手で 動かして 成功。**つぎの 予定は 11-17 3:23 ごろ**（11-14・15・16 の 回を 見る）
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`・`LINE_CHANNEL_SECRET_2012410265`・`APP_DB_PASSWORD`・`LINE_MESSAGING_TOKEN`
- 本物の DB（2026-11-15 7:55）：**会員 1人＝オーナーの ためしの子「こむぎ」**（開発用で 作った。よるの おしらせ オン。**公開の前に「LINEの データを けす」で 消す**）。カード・ひかえ・エラーの数・Storage の `cards` は 0件。`app.notify_runs`：11-14 は `done`・`sent 1`・`note` なし（21:00 は `notoken`、23:45 に 送りなおして 届いた＝オーナーが 確かめた）。11-15 の回は 今夜（21:00 と 21:05）
- LINE公式アカウント「うちのこ日和」（ベーシックID `@370iymyw`、Messaging API の プロバイダー「Y's Apps」、応答メッセージ・Webhook オフ）。ミニアプリの 友だち追加オプション・デフォルトの公式アカウントも 設定ずみ
- LINE Developers：Scope は `openid` だけ。「シェアターゲットピッカー」は 有効。認証審査は まだ申請しない（未認証でリリース → 個人事業主 → 申請）
- 診断レポート（約束①）：https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 （42こ・さいごのチェックの 17こ ぜんぶ 片づいた。いちばん うしろに「直し（2026-11-15、済み）＝約束① 済み」）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK
- オーナーの事情（約束②で使う）：claude.ai の このプロジェクトの資料 `claude/owner-notes.md`（非公開。2026-11-15 に F4-2〈よるの おしらせの 同意の 取り方・未成年〉を 1行 足した）

## 直近のチャットでやったこと（2026-11-15、16回目：パズル「おやつならべ」）

オーナー決定（2026-11-15）：課金と広告の順番の ③ のうち パズルだけを リリースの前に（リワード広告・課金は 入れない）。はじめに きいたこと：入口＝**「あそぶ」で ボール／パズルを えらぶ**、版＝**3つ ぜんぶ**、ほうび＝**最小（ごきげん+5・なかよし+2、1日3回）**、形＝**6×6・5しゅるい・12手で 54こ けす**（54は 2000回の ためしで「ふつうに 8割」に あわせた）。

- **できたこと（どこまで）：** ① ルール（`Puzzle`・`Rules.puzzle`・`ensureState`・`carryExtras`）と サーバー（`/act` が `seed`・`moves` を わたす）→ ② 画面（`openPlay`・`PuzzleUI`・`.pz-*`）→ ③ 書類（PROJECT.md 5章・6章・8章・10章〈決めたこと・しくみ・補足資料の 4〉、プライバシーポリシーの「おせわの記録」と 改定日 11-15、CLAUDE.md の 表、`docs/REVIEW_PROMPT.md` を パズル用に 作りなおし）。
- **確かめ：** `rules_test.mjs`（パズル 26こ）・`api_test.ts`（puzzle 9こ）all passed、`smoke.py`（ふつう・`--dark`）エラー0、`linebreak.py --only puzzle --only play` 0件、`compare_home.py` おなじ。のこり：`line_e2e.py`（22 を 足した）・`smoke.py --line --android-inset 48`・`--claude`・`linebreak.py --line`。
- **このあと：** main に push → `build_server.py --pin` → Edge Function を デプロイ → `/health` → deno.json を push → Claude版を 同じ URL に → オーナーに iPhone で さわってもらう → Fable 5.2 の レビュー（貼る文は `docs/REVIEW_PROMPT.md`）。

## その前のチャット（2026-11-15、15回目：さいごのチェックの 直し → 約束① 済み）

はじめに オーナーに 3つ きいた：① おしらせ `2026-11-notify` は **はずす** ② カードの 全体の 上限は **1500** ③ 11-14 21時の おしらせは **23:45 の 送りなおしだけ 届いた**（21:00 は トークンの前で `notoken`）。F3-4 は 見本を見て **案（ライト `#7F8B87`・ダーク `#756D8C`）**。

- **画面のかたまり（`bcbd414`）：** F3-1（よるの ひとことは 知らせを 出さない `Act.blocked()` で 見る。LINE版で よるに つながれないと「サーバーに つながっていません」が かってに くりかえし 出ていた）・F5-1（`linebreak.py --line` は ひらく前に いまの おしらせを「見た」に）・F3-3（おしらせを はずした）・F3-2（新しい子の 番号を とどくまで 同じに。つなぎなおし・ひらきなおしで サーバーの `srv.rq.id` を 見て「とどいていた」と わかる）・F3-4（オフの スイッチの 色）。Claude版も バージョン26 に。
- **サーバーのかたまり（`919a322`）：** F2-1（cron 2回・2分の ゆとり）・F2-2（1人ずつ `try`）・F2-3（`/health` の `notifyDays`・「サーバーを起こす」が 見る）・F4-1（429 は おくりなおさない）・F1-1（1500）。マイグレーション `20261115000001_notify_cron_twice.sql`、Edge Function version 24。
- F4-2 は プロジェクトの資料へ（専門家に 確かめるのは 約束②の 別プロジェクト）。
- 確かめ：`line_e2e.py` all passed（新しく 8c・18b、`api_test.ts` に 6場面。前の コードでは 新しい 場面が 失敗するのも 確かめた）、`smoke.py`（ふつう・`--dark`・`--claude`・`--line --android-inset 48`・`--fresh`）エラー0、`linebreak.py`・`--line` 0件、`compare_home.py` おなじ、公開の 3か所・Claude版・Edge Function が 手元と同じ、`get_advisors` security 0件。
- レポートの 各表に「→ 済み（コミット）」、`CLAUDE.md` の 約束①と `docs/PROJECT.md` 10章に「さいごのチェック 済み＝約束① 済み」。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **つぎは リリース（公開の日）。** 下の「公開の日」の 手順で すすめる。はじめに オーナーに 一言 たしかめる：今夜（11-15）21時の よるの おしらせが こむぎに 届いたか（1通だけか＝21:05 に 2通めが 来ていないか）。`select day, made_at, used_at, done_at, sent, skipped, failed, note from app.notify_runs order by day desc limit 3;`
2. **公開の日に オーナーが 見ること：** Supabase の Settings → Data API の「Exposed schemas」に `app`・`net` が ないこと（F2-5。ソーイは 確かめられない）。
3. **リリースしたら：約束②（個人事業主の申請のための別プロジェクトのプロンプト）を ソーイから伝える。** 中身は プロジェクトの資料 `claude/owner-notes.md`（診断 5-7・さいごのチェック F4-2 も ふくむ）。
- おたすけ：ホーム画面版は1日おき（2026-11-12）。Claude版・LINE版は「前回から7日」のまま。

## 次にやること

- リリース（未認証のまま）→ 約束② → 個人事業主 → 認証審査の申請。
- 認証審査を申請したら：審査は1〜2週間、「審査中」は取り消しも変更も できない（画面とサーバーも変えない）。認証されたら：「検索可能にする」は 承認から30日以内に押す。リンクする公式アカウント・友だち追加オプションは 認証の前に すませておく（あとで変えると 再審査）。

## 公開の日（リリース）の 手順

1. **ためしの 会員を けす：** オーナーの iPhone の LINE で 開発用の LIFF URL（https://miniapp.line.me/2012410263-cuCI7vQS ）を ひらき、プロフィールの いちばん下「LINEの データを けす」で こむぎを 消す。ソーイは `app.members`・`app.cards`・`app.save_backups` と Storage の `cards` が 0件か 確かめる（`app.day_quota`・`app.error_counts`・`app.notify_runs` は 2日・60日・60日で 消えるので のこっていてよい）。消さないと 公開の日に だいずを 引っこしコードで 取りこめない（1人1回）。
2. **だいずの 控え：** ホーム画面版で「引っこし・バックアップ」→「ファイルで保存」の控えも とっておく。引っこしコードを コピー。
3. **だいずを LINE版へ：** 本番用の LIFF URL（https://miniapp.line.me/2012410265-PutgsCLS ）を LINE で ひらく。「◯◯を LINEに つれてくる？」が出たら**「やめておく」**→ はじめての画面の「引っこしコード」で だいずを取りこむ（取りこみは1人1回）。だいずは LINE版へ引っこすと、おたすけが 1日おき → 7日に1回 になる（オーナー了承）。
4. **本番用で 見る：** 「うちのこカードを おくる」と よるの おしらせの スイッチが 出るか（だいずで）。スイッチを オンに すると 友だち追加の 画面。
5. **実機で見る：** **パズル（「あそぶ」→ ボール／パズル、盤の さわりごこち＝タップと スワイプ、ペットの 応援、おわりの画面、1日3回の のこり、アルバムの さいこう点）**、LINE での見え方・動き、ひらいたまま つぎの日に もどったとき、カードの PNG の大きさ、こい みどりの ボタンの文字・バッジの色、オフの スイッチの 色（新しい 色）、「この端末に とっておいた子」、トークの カードの ボタン、よるの ひとこと（21時すぎに ひらく）・よるの おしらせの メッセージの 見え方（Flex・ロック画面の 文）。
6. できれば、テスターでない人（家族など）の LINE で 本番用の LIFF URL が ひらけるか 見てもらう。
7. `docs/PROJECT.md`（10章「決めたこと（2026-11-13、リリースと認証の順番）」の ① に「リリース 済み（日付）」・更新履歴）と この HANDOFF を 書きなおす → 約束②を 伝える。
- **リリースから1週間は、** チャットの はじめに サーバーのログ（無料プランは1日分）と `app.error_counts`（`/health` の `errors`）、`app.notify_runs`（`/health` の `notifyDays`・送った数・`note`）を見る。

## 気をつけること

- **よるの ひとこと（`Nudge`）：** 1日1回は 端末の `uchinoko-biyori:nudge-day`（消してよい キー）。時刻は `Clock.hour()`（LINE版で つながっているときは `lineServerClock` が 日本時間に する）か 端末の時計。セーブは かえない。LINE版で サーバーを まつ あいだは **`Act.blocked()`（知らせを 出さない）で 見る**。`Act.waiting()` は ポップアップ・トーストも 出すので、だまって 見たい ところで つかわない（F3-1）。`smoke.py` が 21時の まねで 確かめる（`Clock.hour = () => 21`）。ふきだしは `white-space:nowrap` なので、ひとことは 14文字くらいまで。
- **新しい子・取りこみの 番号（F3-2）：** `LineSync.freshRid`（新しい子を むかえると 空。はじめて おくるときに 作り、とどくまで 同じ）・`pendingCode.rid`・`line-unsent` の `r`。サーバーは 同じ番号の `adopt` を 作りなおさない。とどいたかは サーバーの セーブの `srv.rq.id` で 見る（`LineSync.arrivedRid`）。
- **よるの おしらせ（`LineNotify`・`/notify`・`/notify/run`）：** スイッチは つながっていて サーバーに トークンが あるときだけ（`LineServer.notify.ready`）。友だちかどうかは 見ない。メッセージに 入れるのは 名前・のこりの数・れんぞくだけ。送る回は `app.notify_runs`（だれかは 入れない）。cron を 変えるときは `supabase/migrations/` に 名前に `cron` の ある ファイルを 足して `apply_migration`（ためしの PGlite は 読まない）。合いことばの しくみ（10分・1回・ハッシュ）を くずさない。月200通（無料）を こえた月は とまる（`notify_limit`）。1人の 例外は `notify_one`、回数の 制限の 429 は `notify_push`（おくりなおさない）。
- **`/health` の `notifyDays`：** この3日（きのうから）の 回の `kicked`・`ran`・`done`・`note`。はじめた日 `NOTIFY_SINCE`（2026-11-14）より 前は 出さない。「サーバーを起こす」は `jq` で 見る。
- **同じ日の 送りなおし：** もう一度 その日に 送りたいときは（21時から 0時）：`update app.notify_runs set used_at = null, done_at = null where day = (now() at time zone 'Asia/Tokyo')::date;`、送った人にも もう一度なら `update app.members set notified_on = null where notify;`、そのあと `select app.notify_kick();`。**ただし、その日に もう とどいた人には とどかない**（リトライキーが 会員と 日付で 決まり、LINE は 同じ キーを 24時間 うけつけない＝409。`sent` には 数える。F2-4）。
- **`line_e2e.py` の `notice_seen`：** ふつうの 場面では アプリの中の おしらせ（`NOTICE_IDS`。いまは 空）を もう見たことにしている。`LineNotice.list` に 足したら `NOTICE_IDS` にも 足す。`linebreak.py --line` は `LineNotice.list` から id を 読んで「見た」に する。
- **`linebreak.py --only`：** 名前に その文字が ある 場面だけ（なんども 書ける）。新しい 場面だけ はやく 確かめるのに 使う（push の 前の さいごは ぜんぶ）。`linebreak.py --line` は 1回 10分ほど（Bash の 既定の 時間切れを こえるので、うしろで 動かす）。
- **色：** 文字と地の色の差は ふつう 4.5・大きい 3 より大きく。文字でない 部品（スイッチなど）は 3 より大きく。`tools/smoke.py` と `--dark` が 数える。小さい ピンクの文字は `--berry-ink`、ミントの ボタンの文字は `--on-mint`、バッジは `--badge`。文字は 11px 以上。
- **改行と見た目：** 画面ぜんたいが `keep-all＋anywhere`。新しい文にも 文節の スペースを入れ、`tools/linebreak.py`（`--line`）で 0件か、スマホ幅のスクリーンショットで 目で確かめてから push。せまいところの名前は `softName()`。`linebreak.py` の フォントは `cd tools/fonts && npm install`。
- **おしらせ（`LineNotice`）：** ポリシー・規約の 大事な変更や 本サービスを終えるとき（30日以上前）は、同じコミットで `js_line.js` の `LineNotice.list` に `{ id, from, until, title, when, text, link }` を1つ足す（id は つかいまわさない。`2026-11-notify` は もう つかった）。足したら `linebreak.py --line --only notice` で 改行を確かめ、PROJECT.md 10章に「出した おしらせ」を書き、`line_e2e.py` の `NOTICE_IDS` にも 足す。
- **カードの ボタンと 通知の ボタンは `#2A7F6D`**（LINE が 白い字で かく）。
- **名前などの短い文字は `cleanText(v, max)`**、**表の ID を見るときは `hasId(表, id)`**。
- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる（`md5sum`。いまは `e0821d0f…`・`65669db0…`）。
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
- Edge Function のデプロイは `index.ts` を丸ごと送る（JSON の 文字列なので バックスラッシュ 28こ・ダブルクォート 2こ だけ エスケープ）。送ったあと `get_edge_function` の 結果（ファイルに 保存される）を python で 手元と くらべる。
- ブラウザ：LINE Developers・Supabase・LINE Official Account Manager の設定を変えるのは オーナーの許可をもらってから。**シークレットや チャネルアクセストークンが出るページは本文ごと読まない・画面全体を写さない**。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。実機の確認はオーナーにお願いする。
- Supabase の無料プランは、DB の動きが1週間ほど少ないと止まる（「サーバーを起こす」で3日ごと。毎日 21時の cron も DB を 動かす）。止まっていたら `restore_project`。Storage の無料の枠は 1GB。Edge Function は 月50万回。
- Cloudflare のビルド結果は `gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`。「サーバーを起こす」を 手で動かすのは `gh workflow run keepalive.yml --ref main`、ログは `gh run view <id> --log`。
