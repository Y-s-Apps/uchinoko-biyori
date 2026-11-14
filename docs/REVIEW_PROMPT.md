# リリース前の さいごのチェック（約束①の しめくくり）：Claude Fable 5.2 のチャットに貼るプロンプト

2026-11-14 にソーイが作りなおした（前の版は 2026-11-13 の 全体の診断用。git の履歴に のこっている）。モデルを **Claude Fable 5.2** にした新しいチャット（プロジェクト「uchinoko-biyori」の中）に、下の「ここから」〜「ここまで」をそのまま貼ります。

- 全体の診断は 2026-11-13 に 済み（レポート：https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 、42こ）。42こは 2026-11-14 に ぜんぶ 片づけた（かたまり A〜D）。そのあと 通知（よるの ひとこと・よるの おしらせ）を 足した。
- この さいごのチェックで 見るのは **診断のあとに 変えたところ ぜんぶ**（診断の プロンプトの コミット `f22d9a6` から いまの main まで）と **通知**。これが 終わると 約束①は「済み」になり、リリースへ すすむ。

## Pro プランの上限（2026-11-13 に support.claude.com で確かめた）

- ふだん Pro では Fable は プランの上限に ふくまれず、使うと「使用量クレジット」（従量の支払い）になる。
- **Fable 5.2 の発売記念：2026-11-16 23:59（米国太平洋時間）＝ 日本時間 11/17（火）16:59 まで、Pro でも Fable が 週の上限の 50% まで 追加の料金なしで 使える。**
- Fable は ほかのモデルより 上限を はやく使う。使った量は「設定 → 使用量（Settings > Usage）」で見る。
- → **チェック（読んで 一覧にする）は 11/17 16:59 までに Fable で。直すのは いつもの Opus 5.5 のチャット が おすすめ**。まにあわないときは、ふつうの上限の中で つづけるか オーナーに 聞く。

## エフォート（送信ボタンの横のモデル名 →「Effort」。チャットの途中でも変えられる）

| 段階 | おすすめ |
| --- | --- |
| 0 準備（読む・ちがいの 一覧・レポートの 章を作る） | Medium |
| 1 42こが 片づいたか | Medium |
| 2 サーバーと DB（かたまり C の しくみ・通知の サーバーと cron） | **High** |
| 3 画面（3つの版・LINE版） | **High** |
| 4 書類と 外の決まり（ポリシー・規約・LINE の 決まり） | Medium |
| 5 動かして 確かめる | Medium |
| 6 まとめ | Medium |

Extra high・Max は 使わない（1つの むずかしい点を 深く追うときだけ、そのあいだ Extra high に）。

---ここから---

うちのこ日和の LINE版を リリース（未認証のまま公開）する前の、**さいごのチェック**をお願いします（オーナーとの約束①の しめくくり。CLAUDE.md の「オーナーとの約束」）。全体の診断は 2026-11-13 に 済んでいて（42こ）、42こは ぜんぶ 片づけ、そのあと 通知を 足しました。今回 見るのは **診断のあとに 変えたところ ぜんぶ** と **通知** です。直すことが 見つかったら、直してから リリースします。

## はじめに
1. GitHub の `Y-s-Apps/uchinoko-biyori` を push できる形でつなぎ、`CLAUDE.md`・`docs/PROJECT.md`（6章「安全のための決まり」・7章・10章。とくに「しくみ（約束①の直し かたまり A〜D）」と「決めたこと（2026-11-14、通知）」「しくみ（よるの おしらせ・よるの ひとこと）」）・`docs/HANDOFF.md` を読んでください。ナレッジと GitHub が ちがうときは GitHub を 優先します。
2. 診断レポート（https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 、Claude Docs）を 読み、いちばん うしろに「さいごのチェック（2026-11-?）」の 章を 作って、段階ごとに 書きたしてください（前の 章は 変えない）。
3. ちがいの 一覧：`git fetch --depth=300 origin main` のあと `git log --oneline f22d9a6..origin/main` と `git diff --stat f22d9a6..origin/main`（`f22d9a6` は 診断の プロンプトの コミット）。ビルド結果（ルートの `index.html`・`sw.js`、`supabase/functions/api/game.js`）は 読まずに、もとの ファイル（`src/`・`supabase/`・`tools/`・`docs/`）を 読む。
4. Supabase の `get_project` で サーバーが 止まっていないかと、「サーバーを起こす」（`.github/workflows/keepalive.yml`）の いちばん新しい 予定の実行を 一言ください（`gh api 'repos/Y-s-Apps/uchinoko-biyori/actions/workflows/keepalive.yml/runs?per_page=3'`）。

## 上限に気をつけて（オーナーは Claude Pro）
- Fable の 発売記念で 使えるのは 日本時間 11/17（火）16:59 まで。それまでに チェック（読んで 一覧にする）を 終えたいです。
- 段階ごとに すすめ、**1段階 終わるたびに レポートに 書きたしてから** オーナーに 一言（見つけた数と つぎの段階）。上限で 止まっても、レポートと `docs/HANDOFF.md` から つづけられるように します。
- 段階の はじめに、おすすめの エフォート（下の かっこ）を オーナーに 伝えてください（オーナーが 切りかえます）。
- 大きな ファイルは 要るところだけ（`grep` などで さがしてから）。サブエージェントは 使わない。時間の かかる 道具（`line_e2e.py` 15分ほど・`linebreak.py --line` 10分ほど）は 段階5 で 1回ずつ（`linebreak.py` は `--only` で しぼれる）。

## 段階と、見てほしいこと
0. **準備**（Medium）：上の「はじめに」。
1. **42こが 片づいたか**（Medium）：レポートの 表の「→ 済み（コミット）」と「このままでよい」「専門家へ」を、コミットと コードで 確かめる（ぜんぶを 深くでなく、中・低の 直したものは 直し方が 意図どおりか、新しい 穴が ないか）。
2. **サーバーと DB**（High）
   - かたまり C の しくみ：`rid`（2回 数えない）、会員ごとの 回数の制限（`srv.rt`・`/login`）、その日の回数（`app.day_quota`。sub の ハッシュ）、`app.error_counts` と `/health`、1日1回の 掃除（`app.chores`・まいごの カードの画像）、`readBody` の 上限、`app` だけの役 `uchinoko_api`（`APP_DB_PASSWORD`、持ち主に もどる 条件、RLS の ポリシー `api_role_all`）。
   - **通知の サーバー**：`supabase/migrations/20261114000003_notify.sql`（`members.notify`・`notify_at`・`notified_on`、`app.notify_runs`）と `20261114000004_notify_cron.sql`（`pg_cron` の ジョブ `uchinoko-notify`＝12:00 UTC、`app.notify_kick()`：DB の中で 作る 1回きりの 合いことば → pg_net で `POST /notify/run`）。`index.ts` の `/notify`・`/notify/run`（21時より前は 409、ハッシュ・10分・1回、`EdgeRuntime.waitUntil`）、えらび方（オン・14日・きょう まだ・のこりが ある）、`notified_on` を つけてから 送る（2通 送らない）、LINE の プッシュ（`LINE_MESSAGING_TOKEN`・`X-Line-Retry-Key`・429 の 月の上限・401/403）、メッセージに 入るもの（名前・のこり・れんぞく だけ）、ログに 出すもの。
     - とくに：合いことばの しくみで 外から 送る回を 動かせないか（`/notify/run` は だれでも よべる URL）、pg_net の 待ち行列（`net.http_request_queue`）に 合いことばが のこる あいだの リスク、`app.notify_kick()` の 権限（`revoke`）、`notify_runs` に だれかが のこらないか、`members.notify` を 本人いがいが 変えられないか、プッシュの 失敗が エラーの数・「サーバーを起こす」に どう 出るか。
   - DB の 権限と RLS：`get_advisors`（security・performance）、`app` が Data API に 出ていないこと、anon・authenticated に 権限が ないこと。Secrets（`ANTHROPIC_API_KEY`・`LINE_CHANNEL_SECRET*`・`APP_DB_PASSWORD`・`LINE_MESSAGING_TOKEN`・`SUPABASE_SECRET_KEYS`）の 使い方（中身は 読まない・出さない）。
3. **画面**（High）
   - 3つの版：こわれた セーブ（`ensureState` が ペットも そろえる・`hasId`）、時計が もどった日、2月29日、ピンチの日の 引っこし、Service Worker（自分の キャッシュだけ）、Claude版の はじめての端末（クラウドの子が 先）、色と大きさ（`--berry-ink`・`--on-mint`・`--badge`、11px・44px）、右上の ボタンの名前。
   - **よるの ひとこと**（`js_features.js` の `Nudge`、`js_app.js` の 30秒ごと・`Pet.say` の ふきだしを 内がわへ ずらす `--bx`、`head.html` の `.badge.nudge`）：1日1回、まつ 条件、`Clock.hour`（LINE版は サーバーの 日本時間）、セーブを かえないこと。
   - LINE版（`js_line.js`）：`LineKeep`（この端末に とっておいた子）、`line-unsent`（とどかないまま とじた子）、`LineSync.send` の おくりなおし、`LineNotice`（いまは `2026-11-notify` が 1つ）、**`LineNotify`**（プロフィールの スイッチ、`allDoneModal` の あとの 1回だけの さそい、`liff.requestFriendship()`、`LINE_CFG.oaId` の 予備の リンク）、`line_head.html`（CSP は かわらない・`.nsw`）、Cloudflare の `_headers`。
   - 外から 来るもの（サーバーの 返事・セーブ・引っこしコード）が `esc()`・`cleanText()` を 通るか、`innerHTML` に 入るもの。
4. **書類と 外の決まり**（Medium）
   - `src/legal/privacy.html`・`terms.html` が いまの 動きと あっているか（とくに 通知：1.(2)・1.(8)・2.・5.・6.・7.・8.、規約 第5条の2。かたまり C・D の 改定も）。`LineNotice` の 文。
   - LINE の 決まり：Messaging API の プッシュ（友だちで ない・ブロックした人への 送信、通数の 数え方、retry key）、LINEミニアプリの 友だち追加の うながし方（`liff.requestFriendship()`・友だち追加オプション）の ガイドライン、LINE公式アカウントの 利用規約や ガイドラインに 通知の 送り方が あっているか（公式の 資料で 確かめ、確かめた日を 書く）。法律の 判断が 要るところは「専門家に 確かめる」と 書く。
   - `docs/PROJECT.md` の 説明（10章）が コードと あっているか。
5. **動かして 確かめる**（Medium）：`sh src/build.sh` → `python3 tools/line_e2e.py`（はじめに `cd tools/server && npm install`）、`python3 tools/smoke.py`（`--dark`・`--claude`・`--line --android-inset 48`）、`python3 tools/linebreak.py`（`--line --only notify --only notice` で しぼってよい。はじめに `cd tools/fonts && npm install`）、`python3 tools/compare_home.py 8d6139a`（通知の 前と おせわの 動きが 同じか）。本物の サーバーは `execute_sql` から pg_net（`net.http_get` / `net.http_post`）で `/health` などを 読むだけ。
6. **まとめ**（Medium）：レポートの 章に 一覧と、直す順番の案。

## 一覧の形
- 分けて書く：セキュリティ／不具合・データ／UI・使いやすさ／速さ・運用／決まり・書類／保守。
- 1つずつ：重さ（高・中・低・情報）／場所（ファイルと行）／なにが起きうるか／直し方の案／リリースの前に直すか（必ず・できれば・あとで）。
- 42こ の どれかが 片づいていなかったら、その番号も書く。よいところ（守れていること）も 短く。

## まもること
- まずは **読んで しらべるだけ**（コードを変えない・push しない）。本物の DB には 書きこまない（`execute_sql` は 読むだけ。ためしの会員・セッションを 作らない。`app.notify_kick()` を よばない・cron を 変えない）。
- シークレットが 見える ページや 値は 読まない・写さない。

## おわったら
- 一覧を 見せたら、**どれを 直すかと、どの チャットで 直すか**（おすすめ：いつもの Opus 5.5 の チャット）を オーナーに 聞いてください。直すときは CLAUDE.md の「作業の流れ」と「守ること」どおり。見た目や 文言が 変わるときは 見本を 見せてから。
- 直すことが なければ（または 直し おわったら）、CLAUDE.md の「オーナーとの約束」の ① と `docs/PROJECT.md` 10章「決めたこと（2026-11-13、リリースと認証の順番）」に「さいごのチェック 済み（日付・レポートの URL）＝約束① 済み」と書き、`docs/HANDOFF.md` を 書き直して、「完了」と つぎの チャット用の プロンプト（直す、または リリース＝`docs/HANDOFF.md` の「公開の日」）を ください。

---ここまで---
