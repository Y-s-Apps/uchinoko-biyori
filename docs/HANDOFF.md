# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-15（14回目：**Fable 5.2 の さいごのチェック**。42こは ぜんぶ 片づいていた。新しく 17こ〈中1・低5・情報11、必ず0〉。オーナー決定：見つけた ぜんぶを 直してから リリース。つぎは Opus 5.5 の チャットで 直す）
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 **`uchinoko-f52547f23b`**（`1c07a70`。公開中の `index.html`・`sw.js` の md5 が 手元と同じ＝`b6613434…`・`6836e2d6…`）。おせわの 動きは 前と同じ（`compare_home.py`：おなじ）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン25**（`1c07a70` の中身）。公開するときは `src/out/uchinoko-claude.html` の前に いまの版と同じ1行目（`<!doctype html><html><head><meta charset=utf8><meta name=viewport …><style>…</style></head><body>` ＋改行）を、うしろに `</body></html>` ＋改行 を つけて `publish_files`（`capabilities` は はぶいて 引きつぐ。前の版を この形で 作りなおすと `list_files` の sha256 と 同じになるのを 確かめてから 出した）
- LINE版の画面：Cloudflare Pages（main の push で自動ビルド。`34ed2cd` で 手元の `src/out/line/index.html` と同じ＝`4b84cc5d…`。`LINE_CFG.oaId` に `@370iymyw`）
  - 本番用 https://uchinoko-biyori.pages.dev/ 、審査用 https://uchinoko-biyori.pages.dev/review/ 、開発用 https://uchinoko-biyori.pages.dev/dev/ （同じページ。ひらいた場所で LIFF ID をえらぶ）
  - ヘッダー（`_headers`）：ぜんぶ（`/*`）に `Referrer-Policy: no-referrer`・`X-Content-Type-Options: nosniff`・`Content-Security-Policy: frame-ancestors 'none'`・`X-Frame-Options: DENY`
  - LIFF URL：開発用 https://miniapp.line.me/2012410263-cuCI7vQS ／審査用 https://miniapp.line.me/2012410264-JD4WhzAb （審査担当者だけ）／本番用 https://miniapp.line.me/2012410265-PutgsCLS （未認証なので URL を知っている人は開ける）
  - チャネルID：開発用 `2012410263`・審査用 `2012410264`・本番用 `2012410265`
  - プライバシーポリシー https://uchinoko-biyori.pages.dev/privacy.html ・利用規約 https://uchinoko-biyori.pages.dev/terms.html （どちらも 2026-11-14 改定。通知で ポリシー 1.(8)・規約 第5条の2 を足した。改定日は 11-14 のまま）、お問い合わせフォーム https://forms.gle/aywxktpPZettxFSS7
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は **MCP の version 23**（`index.ts` は `34ed2cd`＝LINE の 文から スペースを とった版。`get_edge_function` で 手元と同じ）。`deno.json` は `game.js` を コミット **`3933abe`** に固定のまま（`game.js` は かわらない。`--check` 同じ）
- 表：`app` スキーマに members（**notify・notify_at・notified_on を足した**）・line_accounts・sessions・saves・cards・save_backups・day_quota・error_counts・chores・**notify_runs（足した）**
- **cron（足した）：** pg_cron 1.6.4、ジョブ `uchinoko-notify`（`0 12 * * *`＝日本時間 21:00、`select app.notify_kick()`）。`app.notify_kick()` が 1回きりの 合いことばを作って pg_net で `POST /notify/run`
- 役：`uchinoko_api`（`app` の表だけ。サーバーは この役で つないでいる。`notify_runs` にも 権限と ポリシー）
- Storage：バケット `cards`（公開・PNG だけ・1MB まで、ポリシーなし）
- サーバーを起こす：GitHub Actions（`.github/workflows/keepalive.yml`、cron `23 18 */3 * *`＝日本時間 3:23 ごろ、数時間 おくれることがある）。いちばん新しい 予定の回は 2026-11-14 8:43 成功。**つぎは 11-17 3:23 ごろ**（このチャットの 時点では まだ 来ていない）
- Secrets：`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET`（開発用）・`LINE_CHANNEL_SECRET_2012410264`・`LINE_CHANNEL_SECRET_2012410265`・`APP_DB_PASSWORD`・**`LINE_MESSAGING_TOKEN`（2026-11-14 オーナーが 入れた。`/health` の `notify` が true）**
- 本物の DB：**会員 1人＝オーナーの ためしの子「こむぎ」**（2026-11-14 23:43 に 開発用で 作った。よるの おしらせ オン。**公開の前に「LINEの データを けす」で 消す**）。カード・ひかえ・エラーの数・Storage の `cards` は 0件。`app.notify_runs`：2026-11-14 は 21:00 の cron が `notoken`、23:45 に SQL で もどして 送りなおし `sent 1`
- LINE公式アカウント「うちのこ日和」（ベーシックID `@370iymyw`、Messaging API の プロバイダー「Y's Apps」、ビジネスマネージャーの 組織「Y's Apps」、アイコンは アプリと同じ、応答メッセージ・Webhook オフ、あいさつは オーナーの文）。ミニアプリの 友だち追加オプション・デフォルトの公式アカウントも 設定ずみ（オーナー）
- LINE Developers：Scope は `openid` だけ（通知でも 足さない）。「シェアターゲットピッカー」は 有効。認証審査は まだ申請しない（未認証でリリース → 個人事業主 → 申請）
- 診断レポート（約束①）：https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 （42こ ぜんぶ 片づいた。さいごのチェックで「さいごのチェック」の 章を 書きたす）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK
- オーナーの事情（約束②で使う）：claude.ai の このプロジェクトの資料 `claude/owner-notes.md`（非公開）

## 直近のチャットでやったこと（2026-11-15、14回目：Fable 5.2 の さいごのチェック）

読んで しらべただけ（コード・本物の DB・cron は 変えていない。この `docs/` と `CLAUDE.md` だけ push）。レポート https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 の いちばん うしろの 章「さいごのチェック（2026-11-15）」に、チェック0〜6 を 書いた。

- **42こ：ぜんぶ 片づいていた**（片づいていない もの 0）。
- **新しく 見つけたのは 17こ**（中1・低5・情報11。「必ず」0。セキュリティで 直す ものは なし）。
- 本物（読むだけ）：`get_advisors` security 0件、`app` の表 10こ RLS 有効・権限は 持ち主と `uchinoko_api` だけ、`app.notify_kick()` を よべるのは 持ち主だけ、サーバーは `uchinoko_api` で つながる、Edge Function の 記録に `x-notify`・`x-session` は のこらない、会員 1（ためしの こむぎ）・エラーの数 0。
- 動かした：`line_e2e.py` all passed、`smoke.py` 5とおり エラー0、`compare_home.py` おなじ、`linebreak.py` ホーム画面版 0件、`--line` は F5-1 で 止まる（まち時間を のばすと 0件）。ビルド結果は リポジトリと 同じ。
- **オーナー決定（2026-11-15）：チェックで 見つけた ぜんぶを 直してから リリース。** F3-3（おしらせ）と 直す チャットは 答えが なかったので、おすすめ（おしらせは はずす・いつもの Opus 5.5 の 新しい チャット）で すすめる。つぎの チャットの はじめに 一言 たしかめる。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **さいごのチェックの 直し（つぎの作業）。** くわしい 場所・なにが 起きるか・直し方は レポートの「さいごのチェック」の 各表。直し おわったら、`CLAUDE.md` の 約束①と `docs/PROJECT.md` 10章「決めたこと（2026-11-13、リリースと認証の順番）」に「さいごのチェック 済み（2026-11-15・レポートの URL）＝約束① 済み」と書き、レポートの 表にも「→ 済み（コミット）」を 書きたす。

   | 順 | 番号 | 直すこと | さわる所 |
   | --- | --- | --- | --- |
   | 1 | **F3-1（中）** | `Nudge.busy` が `Act.waiting()` を よぶので、LINE版で 21〜0時に LINEの子が つながれない（LINEの外も）と「サーバーに つながっていません」が 押さずに 出て、とじても くりかえす（動かして 確かめた）。知らせを 出さない `Act.blocked()` で 見る。つながれない あいだは 4秒ごとに ためさず、30秒ごとの 時計に まかせる。`line_e2e.py` に「よる・つながれない・ポップアップが 出ない」場面 | `src/js_features.js`（3つの版。ホーム画面版の 動きは 同じ＝`compare_home.py`。だいずの アプリは 更新される） |
   | 2 | F5-1（低） | `linebreak.py --line` が おそい 環境で `line_bring_failed` で 止まる（おしらせが 1.5秒あと、道具の 片づけが 1.4秒）。ひらく前に `uchinoko-biyori:line-notice` に 見た id を 入れるか、まち時間を のばす | `tools/linebreak.py` |
   | 3 | F3-3（情報） | おしらせ `2026-11-notify` を `LineNotice.list` から はずす（リリース前の 変更で、前の ポリシーを 読んだ人は オーナーだけ。**はずすで よいか 一言 たしかめる**）。`line_e2e.py` 20 の 場面は ためし用の おしらせで つづける | `src/js_line.js`・`tools/line_e2e.py`・`docs/PROJECT.md` 10章 |
   | 4 | F2-1（低） | cron が 1日 1回きり。とどかない・サーバーの 時計が 少し おくれて 409 `early` だと、その日は だれにも 出ず、エラーの数にも 出ない。cron を `0,5 12 * * *`（21:00 と 21:05。`notify_kick` は つかった日は なにも しない）に。`early` に 1〜2分の ゆとり | 新しい マイグレーション（`cron.schedule` を 同じ名前で）→ `apply_migration`、`index.ts` `notifyRun` → デプロイ |
   | 5 | F2-2（低） | `notifyText` の `Rules.reqLeft`・`streakInfo` が `try` の外。1人の 例外で その回の うしろ ぜんぶが 止まる。1人ずつ `try` で かこみ、`failed` と エラーの数 `notify_one` に（`oops` の 種類の 正規表現は そのまま 通る）。`api_test.ts` に 場面 | `index.ts`（4 と 同じ デプロイ） |
   | 6 | F2-3（低） | 通知が 止まっても 気づきにくい（`notoken` は `note` だけ、`notify_auth`・`notify_limit` は 1日1つ）。`/health` に きのうの 回（おわったか・`note`）を 出し、「サーバーを起こす」で 見る（だれかは 出さない。月の 上限 `limit` は 失敗に しない） | `index.ts`・`.github/workflows/keepalive.yml`・`docs/PROJECT.md` |
   | 7 | F3-2（低） | 「新しい子」が とどいたのに 返事が 2回とも なくなると、つなぎなおしで 新しい `rid` の `adopt` → サーバーの ひかえが 上書き。とじて ひらくと 同じ名前で「とどいていませんでした」。新しい子の `rid` を とどくまで 同じに（`fresh` と `line-unsent` の しるしに 入れる。前の形の しるしも 読める ように） | `src/js_line.js`・`tools/line_e2e.py` |
   | 8 | F4-1（情報） | `linePush` は 429（月の上限で ないもの）でも 同じ キーで おくりなおす。LINE の 資料では おくりなおすのは 500 と 時間切れ だけ → 429 は おくりなおさず しっぱいに | `index.ts` |
   | 9 | F3-4（情報） | オフの スイッチの 地（`#9AA6A2`、ダーク `#5E5770`）と まわりの 色の差が 2.3・2.4（目安 3）。**見本を 見せてから**（例 `#7F8B87`） | `src/line_head.html` |
   | 10 | F1-1（情報） | `CARD_ALL_MAX` 3000×上限 600KB＝1.8GB。気になれば 1500 に（**オーナーに 聞く**。Secrets でも 変えられる） | `index.ts`・ポリシーは 数を 書いていないので そのまま |
   | 11 | F4-2（情報） | LINE で 知らせるときの 同意の 取り方・未成年は 専門家へ：プロジェクトの資料 `claude/owner-notes.md` に 1行 足す（公開リポジトリには 書かない） | プロジェクトの資料 |
   | — | F2-4（情報） | 同じ日の 送りなおしは とどかない → この HANDOFF の 2. に 書いた（済み） | — |
   | — | 直さない | F1-2・F1-3・F2-5・F2-6・F3-5（このままでよい。レポートに 理由） | — |

   - 1〜3・7・9 は 画面（`sh src/build.sh` → `smoke.py`・`--dark`・`--line --android-inset 48` → `linebreak.py`・`--line` → `line_e2e.py` → `compare_home.py`）。4〜6・8・10 は サーバー（`build_server.py --check` → `line_e2e.py` → push → デプロイ〈`verify_jwt: false`・`import_map_path: deno.json`〉→ pg_net で `/health`・`/notify/run` 403 → `get_advisors`）。`game.js` は 変わらない はずなので `deno.json` の 固定は そのまま。
   - ポリシー・規約は 動きと あっていた。4〜6・8 では 取る情報・保存期間は 変わらない（変わるなら 同じ コミットで 直す）。
   - 直したら Claude版も 同じ URL に 出しなおす（1 が 入るので）。
2. **よるの おしらせ：** 2026-11-15 21時の cron で、スペースを とった 新しい 文が こむぎに 届いたかを オーナーに 聞く。`select day, made_at, used_at, done_at, sent, skipped, failed, note from app.notify_runs order by day desc limit 3;`。ためしの こむぎは 公開の前に 消す。
   - もう一度 その日に 送りたいときは（21時から 0時）：`update app.notify_runs set used_at = null, done_at = null where day = (now() at time zone 'Asia/Tokyo')::date;`、送った人にも もう一度なら `update app.members set notified_on = null where notify;`、そのあと `select app.notify_kick();`。**ただし、その日に もう とどいた人には とどかない**（リトライキーが 会員と 日付で 決まり、LINE は 同じ キーを 24時間 うけつけない＝409。`sent` には 数える。F2-4）。
3. **直し おわったら リリース**（未認証のまま。下の「公開の日」）。公開の日に 足すこと：Supabase の Settings → Data API の「Exposed schemas」に `app`・`net` が ないのを オーナーが 見る（F2-5。今回は 確かめられなかった）。
4. **リリースしたら：約束②（個人事業主の申請のための別プロジェクトのプロンプト）を ソーイから伝える。** 中身は プロジェクトの資料 `claude/owner-notes.md`。
- おたすけ：ホーム画面版は1日おき（2026-11-12）。Claude版・LINE版は「前回から7日」のまま。

## 次にやること

- 上の保留（さいごのチェックの 直し → リリース → 約束② → 個人事業主 → 認証審査の申請）。
- 認証審査を申請したら：審査は1〜2週間、「審査中」は取り消しも変更も できない（画面とサーバーも変えない）。認証されたら：「検索可能にする」は 承認から30日以内に押す。リンクする公式アカウント・友だち追加オプションは 認証の前に すませておく（あとで変えると 再審査）。
- **公開の前に：** ためしで作った 会員（通知の ためしなど）は「LINEの データを けす」で 消す（`app.members` が 0件か 確かめる）。消さないと 公開の日に だいずを 引っこしコードで 取りこめない（1人1回）。
- **公開の日：** オーナーの iPhone の LINE に ためしの子が ゲストとして のこっていれば、本番用の LIFF URL を LINE で ひらいて「◯◯を LINEに つれてくる？」が出たら**「やめておく」**→ はじめての画面の「引っこしコード」で だいずを取りこむ（取りこみは1人1回）。ホーム画面版で「引っこし・バックアップ」→「ファイルで保存」の控えも とっておく。開発用・審査用・本番用は 同じサーバーと DB。ためしで作った カードの画像は 公開の前に けす（`app.cards`・`app.save_backups` と Storage の `cards` が0件か確かめる。`app.day_quota`・`app.error_counts`・`app.notify_runs` は 2日・60日・60日で 消えるので のこっていてよい）。公開の日に、本番用で「うちのこカードを おくる」と よるの おしらせの スイッチが 出るかも だいずで見る。
  - だいずは LINE版へ引っこすと、おたすけが 1日おき → 7日に1回 になる（オーナー了承）。
  - リリースから1週間は、チャットの はじめに サーバーのログ（無料プランは1日分）と `app.error_counts`（`/health` の `errors`）、`app.notify_runs`（送った数・`note`）を見る。
  - **実機で見る：** LINE での見え方・動き、ひらいたまま つぎの日に もどったとき、カードの PNG の大きさ、こい みどりの ボタンの文字・バッジの色、「この端末に とっておいた子」、トークの カードの ボタン、**よるの ひとこと（21時すぎに ひらく）・よるの おしらせの メッセージの 見え方（Flex・ロック画面の 文）**。
  - できれば、テスターでない人（家族など）の LINE で 本番用の LIFF URL が ひらけるか 見てもらう。

## 気をつけること

- **よるの ひとこと（`Nudge`）：** 1日1回は 端末の `uchinoko-biyori:nudge-day`（消してよい キー）。時刻は `Clock.hour()`（LINE版で つながっているときは `lineServerClock` が 日本時間に する）か 端末の時計。セーブは かえない。`smoke.py` が 21時の まねで 確かめる（`Clock.hour = () => 21`）。ふきだしは `white-space:nowrap` なので、ひとことは 14文字くらいまで（はしでは `--bx` で 内がわへ）。
- **よるの おしらせ（`LineNotify`・`/notify`・`/notify/run`）：** スイッチは つながっていて サーバーに トークンが あるときだけ（`LineServer.notify.ready`）。友だちかどうかは 見ない（profile の スコープを 足さない）。メッセージに 入れるのは 名前・のこりの数・れんぞくだけ。送る回は `app.notify_runs`（だれかは 入れない）。cron を 変えるときは `supabase/migrations/*_notify_cron.sql` に 足して `apply_migration`（ためしの PGlite は 名前に `cron` の ある ファイルを 読まない）。合いことばの しくみ（10分・1回・ハッシュ）を くずさない。月200通（無料）を こえた月は とまる（`notify_limit`）。
- **`line_e2e.py` の `notice_seen`：** ふつうの 場面では アプリの中の おしらせ（`NOTICE_IDS`）を もう見たことにしている。`LineNotice.list` に 足したら `NOTICE_IDS` にも 足す。
- **`linebreak.py --only`：** 名前に その文字が ある 場面だけ（なんども 書ける）。新しい 場面だけ はやく 確かめるのに 使う（push の 前の さいごは ぜんぶ）。
- **色：** 文字と地の色の差は ふつう 4.5・大きい 3 より大きく。`tools/smoke.py` と `--dark` が 数える。小さい ピンクの文字は `--berry-ink`、ミントの ボタンの文字は `--on-mint`、バッジは `--badge`。文字は 11px 以上。新しい ポップアップや シートを 足したら、smoke.py・linebreak.py の場面にも 入るか 見る。
- **改行と見た目：** 画面ぜんたいが `keep-all＋anywhere`。新しい文にも 文節の スペースを入れ、`tools/linebreak.py`（`--line`）で 0件か、スマホ幅のスクリーンショットで 目で確かめてから push。トーストで 切れ目を決めたいときは `\n`。せまいところの名前は `softName()`。`linebreak.py` の フォントは `cd tools/fonts && npm install`。`linebreak.py --line` は 1回 10分ほど。
- **おしらせ（`LineNotice`）：** ポリシー・規約の 大事な変更や 本サービスを終えるとき（30日以上前）は、同じコミットで `js_line.js` の `LineNotice.list` に `{ id, from, until, title, when, text, link }` を1つ足す（id は つかいまわさない）。足したら `linebreak.py --line --only notice` で 改行を確かめ、PROJECT.md 10章に「出した おしらせ」を書き、`line_e2e.py` の `NOTICE_IDS` にも 足す。
- **カードの ボタンと 通知の ボタンは `#2A7F6D`**（LINE が 白い字で かく）。
- **名前などの短い文字は `cleanText(v, max)`**、**表の ID を見るときは `hasId(表, id)`**。
- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる（`md5sum`。いまは `b6613434…`・`6836e2d6…`）。
- 正規表現に 日本語の文字を そのまま書かない。正規表現の うしろ読み（`(?<!…)`）・`Object.hasOwn` も 古い iPhone で 止まるので 使わない。
- `js_line.js` は `js_onboard.js` の boot の**あと**に読まれる。`renderHeader`・`allDoneModal` などを包むときは、包んだあとに いまの画面にも1回あてる（必要なら）。
- **`line-guest` は `{ v:2, kids:[…] }`（5ひき）。** キーごと 消す処理は 書かない。`line-unsent` は `markUnsent()` で 書く・空にする。
- **おせわ・取りこみを サーバーへ おくるのは `LineSync.send`**（`rid` を つけ、とどかなければ 900ms あとに 同じ `rid` で 1回）。`LineServer.call` を じかに よぶもの（カード・AI・やめる・通知の オン・オフ）には `rid` は つかない。
- **ためしの DB（PGlite）は、同時の問い合わせが まざる・トランザクションの あいだに べつの つなぎで 書くと 止まる。** サーバーでは DB の問い合わせは 1つずつ順に。日付の 引き算に パラメータを つかうときは `${n}::int`。
- **サーバーの 回数の制限は ためしでは ゆるめている**（`api_test.ts` は `LOGIN_PER_MIN=1000`・`ACT_PER_WINDOW=100000`・`NOTIFY_HOUR=0`）。
- **うちのこカードのメッセージは LINE の「カスタムシェアメッセージ」の決まり**（標準タイプ）。よるの おしらせの Flex は シェアでは ないので この決まりの 外（ふつうの Flex Message）。
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
- Edge Function のデプロイは `index.ts` を丸ごと送るので、送ったあと `get_edge_function` の 結果（ファイルに 保存される）を python で 手元と くらべる。
- ブラウザ：LINE Developers・Supabase・LINE Official Account Manager の設定を変えるのは オーナーの許可をもらってから。**シークレットや チャネルアクセストークンが出るページは本文ごと読まない・画面全体を写さない**。
- 本物の DB に ためしの会員やセッションを `execute_sql` で書きこまない。実機の確認はオーナーにお願いする。
- Supabase の無料プランは、DB の動きが1週間ほど少ないと止まる（「サーバーを起こす」で3日ごと。毎日 21時の cron も DB を 動かす）。止まっていたら `restore_project`。Storage の無料の枠は 1GB。Edge Function は 月50万回。
- Cloudflare のビルド結果は `gh api repos/Y-s-Apps/uchinoko-biyori/commits/<SHA>/check-runs`。「サーバーを起こす」を 手で動かすのは `gh workflow run keepalive.yml --ref main`、ログは `gh run view <id> --log`。
