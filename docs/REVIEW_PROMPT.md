# うちのこラン（LINE版＝P6）の レビュー（LINE版に 出す 前）：Claude Fable 5.2 のチャットに貼るプロンプト

2026-11-22 にソーイが作りなおした（前の版＝パズルの レビューは git の履歴に のこっている）。モデルを **Claude Fable 5.2** にした新しいチャット（プロジェクト「uchinoko-biyori」の中）に、下の「ここから」〜「ここまで」をそのまま貼ります。

- うちのこラン（3D の レースと アジリティ）は P1〜P5 で ホーム画面版と Claude版に 出した（オーナー OK）。P6 で LINE版の ぶん（サーバーの `runStart`・`run`、画面の `LineRun`、ビルドの `RUN_LINE=1`、ポリシー）を 作り、**ブランチ `p6-run-line`** に push した（main と LINE版・サーバーは まだ かえていない）。
- オーナー決定（`docs/RUN_DESIGN.md` 9章）：LINE版に 出す 前に Fable 5.2 の レビュー（パズルと 同じ）。見つかった ことを 直してから 出す。
- レビューは 読んで しらべるだけ（コードは かえない）。直すのと 出すのは いつもの Opus 5.5 の チャットで。
- エフォートは **高（High）** が めやす（Max は 上限に すぐ とどく）。Pro では Fable は プランの 上限の 外（使用量クレジット）に なることが あるので、段階ごとに レポートへ 書きたして、止まっても つづきから できる ように する。

---ここから---

うちのこ日和の「うちのこラン」を LINE版（https://uchinoko-biyori.pages.dev/ ）に 出す 前の **レビュー**を お願いします。うちのこランは ホーム画面版と Claude版には もう 出ていて、LINE版の ぶん（P6）を ブランチ `p6-run-line` に 作りました（main・LINE版の 画面・サーバーは まだ かえていません）。見るのは **`c84046c` から `origin/p6-run-line` までの ちがい ぜんぶ**と、LINE版で はじめて うごく **うちのこランの コード（P2〜P5 で 作った もの）の うち LINE版・サーバーに かかわる ところ**です。**コードは かえずに**、見つけた ことを レポートに まとめてください（直すのは あとで Opus 5.5 の チャットで）。UI と セキュリティを 徹底的に 見てください。

## はじめに
1. GitHub の `Y-s-Apps/uchinoko-biyori` を つなぎ（読むだけで よい）、ブランチ `p6-run-line` を ひらいて（`git fetch --depth=100 origin p6-run-line main` → `git checkout p6-run-line`）、`CLAUDE.md`・`docs/HANDOFF.md`・`docs/RUN_DESIGN.md`（6章 ルール・セーブ・サーバー、9章、13章 P3、15章 P5、**16章 P6**）・`docs/PROJECT.md`（5章「うちのこラン」・6章の `srv`・10章「しくみ（うちのこラン：LINE版）」「しくみ（おせわの判定）」「しくみ（約束①の直し かたまり C）」の rid と 回数の制限・補足資料の 4）を 読んでください。`docs/PROJECT.md` は 大きいので `grep` で 要るところだけ。ナレッジと GitHub が ちがうときは GitHub（この ブランチ）を 優先します。
2. 診断レポート（https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 、Claude Docs）の **いちばん うしろに「うちのこラン（LINE版）の レビュー（2026-11-22）」の 章を 作り**、段階ごとに 書きたしてください（前の 章は 変えない）。
3. ちがいの 一覧：`git log --oneline c84046c..origin/p6-run-line` と `git diff --stat c84046c..origin/p6-run-line`。ビルド結果（ルートの `index.html`・`sw.js`・`run-*.js`、`src/run_bundle.js`、`supabase/functions/api/game.js`）は 読まずに、もとの ファイル（`src/`・`supabase/`・`tools/`・`docs/`）を 読む。`game.js` は `python3 tools/build_server.py --check`、`run_bundle.js` は `node tools/run/build_run.mjs --check`（はじめに `cd tools/run && npm install`）で src と 同じか だけ 見る。
4. Supabase の `get_project` で サーバーが 止まっていないか、`get_edge_function` の `api` の version（27 の はず＝P6 は まだ デプロイしていない）と、`deno.json` が 指す コミット（`824da76`）を 一言ください。本物の DB と サーバーには 書きこまない（`execute_sql` は 読むだけ）。

## 徹底的に（オーナーから）
- **ぬき取りで すませない。** 下の「見てほしいこと」の ファイルは さいごまで 読む。`c84046c` からの ちがいは 1行も のこさず 見る。
- 見つけた ものは コードで 確かめ、できれば ためしの 場面（`tools/server/api_test.ts`・`tools/line_e2e.py`・ブラウザ）で 起きるか 再現する（ためしの ファイルに 足して 動かすのは よいが、コミット・push は しない）。推測だけの ものは「推測」と 書く。
- 道具は ぜんぶ 動かす（下の 段階5）。スクリーンショットは 1まいずつ 目で 見る（390×844・375×667・ダーク・LINE版・`--android-inset 48`）。
- 1段階 終わるたびに **レポートに 書きたしてから** オーナーに 一言（見つけた数と つぎの段階）。時間の かかる 道具（`line_e2e.py` 20分ほど・`linebreak.py --line` 15分ほど・`run_shots.py` 10分ほど）は うしろで 動かして、まつ あいだに 読む。

## 段階と、見てほしいこと
0. **準備**：上の「はじめに」。
1. **サーバーの レビュー**（`supabase/functions/api/index.ts` の `act`・`srvOf`・`runCourse`。ルールは `src/js_rules.js` の `RUN`・`Rules.run`・`Rules.runLeft`）
   - `runStart`：`srv.run = { c, t }` を 書く 条件、知らない コース（`constructor`・`__proto__` など）、前の 走りだしの 置きかえ、`rid` と `overRate`、`CARE`（2.5秒）に 数えない 判断。
   - `run`：`srv.run` を つかいおわる タイミング（ルールが ことわった ときは 書かないので のこる）、`noreward`（`start`・`fast`）の 決め方、**ほうびを とめる しかけ**（ルールに きょうの 回数を `perDay` に みせて わたし、あとで もどす。`js_rules.js` を かえない ため）が どんな セーブ（`run` が ない・日付が ちがう・こわれた 値）でも 正しいか、返事の `left`・`noreward`、アルバム・ベスト・`clears`・`firsts.run`。
   - **ずる**：画面を 使わずに `/act` を じかに よんで ほうびを とる（走りだし → まつ → ゴール の くりかえし・同じ `rid`・ちがう `rid`・2つの 端末・`ms` に へんな 値〈負・文字・とても 大きい・NaN〉・`misses`・`rank`）。設計（`docs/RUN_DESIGN.md` 6章）では「ほうびは ゴールしたか だけ・1日3回・ランキングなし」なので、のこる ずるが その 範囲に おさまるか 見て、のこるなら 重さを 書く。
   - `min`（いちばん はやい タイム）と 3・2・1 の 3秒・通信の おくれで、ふつうに 走った 人が「はやすぎる」に ならないか（`tools/run/run_min.mjs` も）。走りだしの 返事が おくれた とき・`LineSync.queue` に ほかの しごとが つまっている ときは どうか。
   - ログに 出るもの、`BODY_MAX.act`、`answerOf`（とっておく 答えの 大きさ）、セーブの 大きさ。
2. **画面の レビュー（LINE版）**（`src/js_line.js` の `LineRun` と その まわり〈`LineSync.act`・`send`・`queue`・`fail`・`lockReason`・`Act`〉、`src/js_run.js` の `RunUI`、`src/run/race.js`・`src/run/agility.js` の メニューと `onFinish` の あつかい）
   - `RunUI.start`・`finish`・`open`・`close` を 包む 順番と、`sim.start` を インスタンスで 包む しかけ（「はしる」「もういちど」「さいしょから」「つぎの コースへ」「コースを えらぶ」→ べつの コース）。走りだしが 1回の はしりに 1回だけ おくられるか。
   - ゴールの 番号（`goal`）の 作り方・おくりなおし・あそびかたから もどった ときの 入れなおし（`MutationObserver`）、とじた あとに とどいた 返事、つながりが 切れた・つなぎなおした・ほかの 端末で 子が かわった（`Game.start` で とじる）とき。
   - `Act.blocked()` を 見る ところ（LINE に ほぞんしている子は つながっていない とき 端末の ルールで 数えない。パズルの レビュー P4-1 と 同じ）、ゲスト・LINE の 外は 端末の ルールの まま。
   - `innerHTML` に 入る もの（`record` の 正規表現の おきかえ・サーバーの 返事の 数字・子の 名前・おともだちの 品種）、`esc`。
   - LINE の 下スワイプ（ミニアプリの 最小化）：3D・ボタン・コースの 一覧・メニュー・あそびかた・じゅんいを ひらいた とき。`touchstart`・`touchmove` の とめかたで タップ・スクロールが こわれないか。
   - Android版LINEの 下の すき間（`line_head.html` の `html .run-page …`）、LINE の 上の バーで せまい 高さ（375×603 くらい）で メニューの ボタンが 切れないか。
3. **ビルド・外から 読む もの・書類**
   - `src/build.sh` の `RUN_LINE=1`：`/run-<ハッシュ>.js`（いちばん上に 1つ。`/review/`・`/dev/` も 同じ ファイル）・`integrity`・CSP（`https://uchinoko-biyori.pages.dev/run-….js`＝パスまで）・`RUN_LINE=0` で 前と 同じ LINE版、ホーム画面版・Claude版が かわらない（`index.html`・`sw.js`・`src/out/claude/index.html` の md5）。Cloudflare Pages の `_headers`（`nosniff` と `.js` の `Content-Type`・キャッシュ）・プレビュー（`<hash>.uchinoko-biyori.pages.dev`）での ふるまい。
   - Three.js（MIT）の 表示が ゲームの ファイルに のこっているか、LINE版で ゲームの ファイル（約 630KB）を ひらく ときの 重さ（LINEミニアプリの パフォーマンスの ガイドライン。公式の 資料で 確かめ、確かめた日を 書く）。
   - `src/legal/privacy.html` の 改定（「おせわの記録」に うちのこランの記録・改定日 2026-11-22）と、アプリの中の おしらせ（`LineNotice`）を 出さない 判断が よいか。`terms.html` は かえていない 判断。`docs/PROJECT.md` 10章の 補足資料の 4（審査の 人が ためす 手順）に 足した 文。
   - LINEミニアプリの 決まり（ポリシー・審査ガイドライン）で、3D の ミニゲーム（課金・広告・ガチャなし）について 申告や 注意が 要るか（公式の 資料で 確かめ、確かめた日を 書く）。法律の 判断が 要るところは「専門家に 確かめる」と 書く。
   - `docs/PROJECT.md`・`docs/RUN_DESIGN.md` 16章・`CLAUDE.md` の 説明が コードと あっているか。
4. **セーブ・ほかの 版との かかわり**
   - `S.run` の 移行（`ensureState`）・引っこしコードと 取りこみ（`carryExtras`）・サーバーの セーブに `srv.run` が のこる こと（引っこしコードには 入らない＝`lineEncodeCode` が `srv` を けす）。
   - だいず（LINE版の 本番用の 会員）の セーブが、デプロイの あとに ひらいても こわれないか（`srvOf` が ふるい `srv` を そろえる）。
   - ホーム画面版・Claude版の 動きが かわらないか（`python3 tools/compare_home.py`）。
5. **動かして 確かめる**（どれも この ブランチで。はじめに `cd tools/server && npm install`・`cd tools/fonts && npm install`・`cd tools/run && npm install`）
   - `sh src/build.sh` → `node tools/rules_test.mjs` → `python3 tools/line_e2e.py`（23・23b・23c が うちのこラン）、`python3 tools/smoke.py --line --android-inset 48`（`--size 375x667` も）、`python3 tools/smoke.py`（ホーム画面版）・`--claude`、`python3 tools/linebreak.py --line`（`--only` なし。`--height 603` も）、`python3 tools/run/run_shots.py --line --android-inset 48`、`python3 tools/compare_home.py`、`node tools/run/run_min.mjs`。
   - ためしで 見つからない ことも 考える（iPhone の LINE・Android の LINE の 実機で しか わからない ことは「実機で 確かめる」として 一覧に）。
6. **まとめ**：レポートの 章に 一覧と、直す 順番の案（出す 前に 必ず・できれば・あとで）。

## 一覧の形
- 分けて書く：セキュリティ／不具合・データ／UI・使いやすさ・遊びごこち／速さ・運用／決まり・書類／保守。
- 1つずつ：番号（R6-1 など）／重さ（高・中・低・情報）／場所（ファイルと行）／なにが起きうるか／直し方の案／出す 前に 直すか（必ず・できれば・あとで）。
- よいところ（守れていること）も 短く。

## まもること
- **コードは かえない・push しない**（ためしの 場面を 手元で 足して 動かすのは よい）。ブランチ `p6-run-line` も main も そのまま。
- 本物の DB・サーバーには 書きこまない（`execute_sql` は 読むだけ。ためしの会員・セッションを 作らない。Edge Function を デプロイしない）。シークレットが 見える ページや 値は 読まない・写さない。

## おわったら
- 一覧を 見せて、**どれを 直してから 出すか**を オーナーに 聞いてください。
- いつもの Opus 5.5 の チャットに 貼る 短い プロンプト（レポートの 章の 場所・直すもの・「ブランチ `p6-run-line` で 直してから main に 入れて、`CLAUDE.md` の 作業の流れ 3 で サーバーも デプロイ、`docs/RUN_DESIGN.md` 16章の『出し方』」）を ください。`docs/HANDOFF.md` は かえなくて よい（Opus の チャットで 書きなおす）。

---ここまで---
