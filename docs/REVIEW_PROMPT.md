# うちのこラン（P1〜P6）の レビュー（LINE版に 出す 前）：Opus 5.5 の あたらしい チャットに貼るプロンプト

2026-11-22 にソーイが作りなおした（前の版は git の履歴に のこっている）。モデルを **Opus 5.5** にした **あたらしい チャット**（プロジェクト「uchinoko-biyori」の中。うちのこランを 作った チャットとは べつ＝作った 目で 見ない ため）に、下の「ここから」〜「ここまで」をそのまま貼ります。

- うちのこラン（3D の レースと アジリティ）は P1〜P5 で ホーム画面版と Claude版に 出した（オーナー OK）。P6 で LINE版の ぶん（サーバーの `runStart`・`run`、画面の `LineRun`、ビルドの `RUN_LINE=1`、ポリシー）を 作り、**ブランチ `p6-run-line`** に push した（main・LINE版の 画面・サーバーは まだ かえていない）。
- **オーナー決定（2026-11-22）：** LINE版に 出す 前の レビューは **Opus 5.5** で（`docs/RUN_DESIGN.md` 9章の「Fable 5.2」から かえた）。見る 範囲は **うちのこランを 入れた ことで 影響する 範囲 ぜんぶ**（P1〜P6。3つの 版・サーバー・セーブ・書類）。見つかった ことを 直してから 出す。
- レビューは 読んで しらべるだけ（コードは かえない）。直すのと 出すのは そのあとの チャットで。
- 範囲が ひろいので、エフォートは **高** が めやす。段階ごとに レポートへ 書きたして、止まっても つづきから できる ように する。
- この 範囲の 外（まだ だれも レビューしていない もの）：11-16 の なでなでの 下スワイプ と 小さい Android の 下の ボタン（`de696b7`）、11-19 の ひらいたときの メーター と 21:05 の やりなおし（`b34a30d`）。認証審査の 申請の 前の 包括的な 診断で 見る（`docs/HANDOFF.md`）。

---ここから---

うちのこ日和に 入れた 3D の ミニゲーム「うちのこラン」の **レビュー**を お願いします。うちのこランは ホーム画面版と Claude版には もう 出ていて（P1〜P5）、LINE版の ぶん（P6）を ブランチ `p6-run-line` に 作りました（main・LINE版の 画面・サーバーは まだ かえていません）。LINE版に 出す 前に、**うちのこランを 入れた ことで 影響する 範囲 ぜんぶ**を 見てください：3つの 版の 画面（ホーム画面版・Claude版・LINE版）、ゲームの コード、ルールと セーブ、サーバー、ビルド・CSP・Service Worker、書類。**コードは かえずに**、見つけた ことを レポートに まとめてください（直すのは あとで べつの チャットで）。UI と セキュリティを 徹底的に 見てください。わたし（オーナー）は iPhone の ホーム画面版と LINE版を 毎日 つかっています。

## はじめに
1. GitHub の `Y-s-Apps/uchinoko-biyori` を つなぎ（読むだけで よい）、ブランチを ひらいてください：`git fetch --depth=200 origin p6-run-line` → `git checkout -b p6-run-line FETCH_HEAD`。`CLAUDE.md`・`docs/HANDOFF.md`・`docs/RUN_DESIGN.md`（ぜんぶ。とくに 1章 決めたこと・5章 技術・6章 ルール・セーブ・サーバー・9章・11〜16章 P1〜P6 で 作ったもの）・`docs/PROJECT.md`（2章・5章「うちのこラン」・6章 セーブ〈`run`・`srv`〉・「安全のための決まり」・8章の 2026-11-21〜22・10章「しくみ（うちのこラン：LINE版）」「しくみ（おせわの判定）」「しくみ（パズル）」「しくみ（約束①の直し かたまり C）」の rid と 回数の制限・補足資料の 4）を 読んでください。`docs/PROJECT.md` は 大きいので `grep` で 要るところだけ。ナレッジと GitHub が ちがうときは GitHub（この ブランチ）を 優先します。
2. 診断レポート（https://claude.ai/artifact/8kuQtwwyAD9RJ42PPy7GU6 、Claude Docs）の **いちばん うしろに「うちのこランの レビュー（2026-11-22・P1〜P6）」の 章を 作り**、段階ごとに 書きたしてください（前の 章は 変えない）。
3. ちがいの 一覧：うちのこランを 入れる 前は `8a9b646`。`git log --oneline 8a9b646..p6-run-line` と、生成物を のぞいた ちがい `git diff --stat 8a9b646 p6-run-line -- . ':(exclude)src/run_bundle.js' ':(exclude)_ref' ':(exclude)src/run/wanrun' ':(exclude)run-*.js' ':(exclude)index.html' ':(exclude)sw.js' ':(exclude)supabase/functions/api/game.js' ':(exclude)tools/run/package-lock.json'`（38 ファイル・約 4900行）。
   - 生成物は 読まずに 同じか だけ：`src/run_bundle.js` は `node tools/run/build_run.mjs --check`（はじめに `cd tools/run && npm install`）、`game.js` は `python3 tools/build_server.py --check`、ルートの `index.html`・`sw.js`・`run-*.js` は `sh src/build.sh` で 作りなおして かわらないか。
   - `src/run/wanrun/`（22 ファイル）は ChatGPT が 作った「わんラン v33」から 持ってきた もの（README に「かえたのは `three` の import だけ」）。`_ref/wanrun-v33/wanrun-v33.zip` を べつの フォルダに ひらいて `diff` で ほんとうに import だけか 確かめ、そのうえで あぶない 書き方（`fetch`・`XMLHttpRequest`・`WebSocket`・`eval`・`new Function`・`import()`・`localStorage`・`sessionStorage`・`document.cookie`・`innerHTML`・`postMessage`・`window.open`・`location`・`Math.random` の つかいかた）が ないかを ぜんぶ さがしてください。Three.js は `tools/run/package-lock.json` の r170（`integrity`）。
4. Supabase の `get_project` で サーバーが 止まっていないか、`get_edge_function` の `api` の version（27 の はず＝P6 は まだ デプロイしていない）と、`deno.json` が 指す コミット（`824da76`）を 一言ください。本物の DB と サーバーには 書きこまない（`execute_sql` は 読むだけ）。Claude版（https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs 、バージョン30）は `list_files` で 2つの ファイルの sha256 を 見るだけ（出しなおさない）。

## 徹底的に（オーナーから）
- **ぬき取りで すませない。** 下の「見てほしいこと」の ファイルは さいごまで 読む。`8a9b646` からの ちがい（生成物の ほか）は 1行も のこさず 見る。
- 見つけた ものは コードで 確かめ、できれば ためしの 場面（`tools/rules_test.mjs`・`tools/server/api_test.ts`・`tools/line_e2e.py`・ブラウザ）で 起きるか 再現する（ためしの ファイルに 足して 手元で 動かすのは よいが、コミット・push は しない）。推測だけの ものは「推測」と 書く。
- 道具は ぜんぶ 動かす（下の 段階8）。スクリーンショットは 1まいずつ 目で 見る（390×844・375×667・ダーク・LINE版・`--android-inset 48`・Claude版）。
- 1段階 終わるたびに **レポートに 書きたしてから** わたしに 一言（見つけた数と つぎの段階）。時間の かかる 道具（`line_e2e.py` 20分ほど・`linebreak.py` は 1回 15分ほど・`run_shots.py` 10分ほど）は うしろで 動かして、まつ あいだに 読む。

## 段階と、見てほしいこと
0. **準備**：上の「はじめに」。
1. **ルールと セーブ**（`src/js_rules.js` の `RUN`・`runSec`・`Rules.run`・`Rules.runLeft`・`Rules.act`、`src/js_features.js` の `ensureState`・`carryExtras`・`MINI.run`、`tools/run/run_min.mjs`）
   - ほうびは ゴールしたか だけ（順位・タイム・ミスで かわらない）・1日3回（レースと アジリティ あわせて・パズルとは べつ・日付は `dayKey()`）・タイムの 切りかた（`min`〜1時間）・ベスト・`clears`・アルバム（1日 1コース 1つ・300件の 上限）・`firsts.run`。`min`（いちばん はやい タイム）の 決め方が ほんとうに こえられないか（`run_min.mjs` を 動かす）。
   - セーブの 移行（前の セーブに `run` を 足す・こわれた 値・知らない コースの ベストを すてる・`hasId`）、引っこしコードと 取りこみで 運ぶもの（きょうの 回数も）。だいずの セーブ（ホーム画面版の 控えと LINE版の 本番）が こわれないか。
   - なかよしの すすみ（半年ほどで Lv100）を こわさないか（パズル＋ランで 1日 最大 +12。`docs/RUN_DESIGN.md` 6章）。
   - ランを つかわない ときの おせわの 動きが 前と 同じか（`python3 tools/compare_home.py 8a9b646`）。
2. **サーバー**（`supabase/functions/api/index.ts` の `act`・`srvOf`・`runCourse`。P6 で 足した もの。いまの 本物の サーバーは まだ `run`・`runStart` を うけつけない）
   - `runStart`：`srv.run = { c, t }` を 書く 条件、知らない コース（`constructor`・`__proto__` など）、前の 走りだしの 置きかえ、`rid` と `overRate`、`CARE`（2.5秒）に 数えない 判断。
   - `run`：`srv.run` を つかいおわる タイミング、`noreward`（`start`・`fast`）の 決め方、**ほうびを とめる しかけ**（ルールに きょうの 回数を `perDay` に みせて わたし、あとで もどす。`js_rules.js` を かえない ため）が どんな セーブ（`run` が ない・日付が ちがう・こわれた 値）でも 正しいか、返事の `left`・`noreward`。
   - **ずる**：画面を 使わずに `/act` を じかに よんで ほうびを とる（走りだし → まつ → ゴール の くりかえし・同じ `rid`・ちがう `rid`・2つの 端末・`ms`・`misses`・`rank` に へんな 値）。設計（6章）は「ほうびは ゴールしたか だけ・1日3回・ランキングなし」なので、のこる ずるが その 範囲に おさまるか、のこるなら 重さを 書く。
   - `min` と 3・2・1 の 3秒・通信の おくれ（走りだしの 返事が おくれる・`LineSync.queue` が つまる・おくりなおし）で、ふつうに 走った 人が「はやすぎる」に ならないか。
   - ログに 出るもの、`BODY_MAX.act`、`answerOf`、セーブの 大きさ。`game.js`（P3・P4 で `RUN` が 入った）が デプロイずみの 本物と 同じか。
3. **ゲームの コード**（`src/run/main.js`・`race.js`・`agility.js`・`pet3d.js`・`run.css`、`src/run/wanrun/`）
   - ホストから もらう HTML（`name`・`rivals[].label`・`art`・`onFinish` が かえす きろくの HTML）を そのまま 入れる ところ、ほかの `innerHTML`。`esc`・`softName` が 足りているか。
   - 片づけ（`dispose`：描く ループ・タイマー・リスナー・`ResizeObserver`・ジオメトリ・マテリアル・テクスチャ・`InstancedMesh`・レンダラー）、WebGL が とちゅうで なくなった とき、アプリを はなれた とき（`visibilitychange`・`blur`・`pagehide`）。なんども ひらいて とじても メモリ・WebGL の コンテキストが のこらないか（ためしで 数える）。
   - 重さ（約 630KB の ファイル・三角形・描く 回数・こまかさの 上限・止まっている あいだの 描きかた）。古い iPhone（Safari 14）で うごかない 書き方（esbuild の `target`・`Object.hasOwn`・正規表現の うしろ読み）。
   - さわりかた（指・キーボード・Esc）、ひとやすみ・さいしょから・つぎの コースへ・コースを えらぶ の 道すじで 状態が くずれないか。わんランの ルール（`race-sim.js`・`agility-sim.js`）の 乱数と、`Math.random` を つかう ところ（見た目だけか）。
   - Three.js（MIT）と わんランの 表示（ライセンス）が のこっているか。
4. **アプリの 側**（`src/js_run.js` の `RunUI`、`openPlay`・`Nudge.busy`・`Game.start` を 包む ところ、`src/js_features.js` の `PuzzleUI` との かかわり、`src/head.html`・`body.html` の まわり）
   - 「あそぶ」の シート（3れつ・WebGL 2 が ない 端末・きょうの のこり）、ページ `#runPage`（重なり 45・`#app` の `inert`・ポップアップと シートとの 重なり・パズルと 同時に ひらかない）、ゲームの ファイルの 読みこみ（`integrity`・しっぱい・おそい・とちゅうで とじた）、コースを えらぶ 画面、ゴールの カードの きろく、とじたあとの ひとこと。
   - ホーム画面版と Claude版で の ちがい（`HOME`・Service Worker・クラウドの 保存）、LINE版の ゲスト（LINE の 外）。
   - 文言（やさしい ひらがな・文節の スペース・「げい」「◯日」と そろえる）・色（ライト・ダーク・文字と 地の 差・11px 以上）・さわれる 大きさ（44px）・`aria`・フォーカス。
5. **LINE版**（`src/js_line.js` の `LineRun` と その まわり〈`LineSync.act`・`send`・`queue`・`fail`・`lockReason`・`Act`〉、`src/line_head.html`）
   - `RunUI.start`・`finish`・`open`・`close` を 包む 順番と、`sim.start` を インスタンスで 包む しかけ（「はしる」「もういちど」「さいしょから」「つぎの コースへ」「コースを えらぶ」→ べつの コース）。走りだしが 1回の はしりに 1回だけ おくられるか。
   - ゴールの 番号（`goal`）・おくりなおし・あそびかたから もどった ときの 入れなおし（`MutationObserver`）、とじた あとに とどいた 返事、つながりが 切れた・つなぎなおした・ほかの 端末で 子が かわった（`Game.start` で とじる）とき、`Act.blocked()`（つながっていない ときに 端末の ルールで 数えない）、ゲスト・LINE の 外。`record` の 正規表現の おきかえ。
   - LINE の 下スワイプ（ミニアプリの 最小化）：3D・ボタン・コースの 一覧・メニュー・あそびかた・じゅんいを ひらいた とき。タップ・スクロールが こわれないか。Android版LINEの 下の すき間、LINE の 上の バーで せまい 高さ（375×603 くらい）。
6. **ビルド・CSP・Service Worker・公開**（`src/build.sh`・`src/home_head.html`・`src/line_head.html`・`src/claude_head.html`・`src/sw.js`）
   - スイッチ（`RUN_HOME`・`RUN_CLAUDE`・`RUN_LINE`）。どれを 0 に しても ランの ない 版が こわれずに 作れるか。
   - CSP（ホーム画面版 `https://y-s-apps.github.io/uchinoko-biyori/run-….js`・LINE版 `https://uchinoko-biyori.pages.dev/run-….js`＝パスまで・`'self'` に しない）・`integrity`・Claude版は アーティファクトの 2つめの ファイル（相対の パス）。組織の ほかの Pages から あぶない ものが 入らないか。
   - Service Worker（ホーム画面版）：ランの ファイルを とっておく・キャッシュ名の 版番号・古い `run-*.js` の あつかい・オフライン。
   - LINE版：ファイルは いちばん上に 1つ（`/review/`・`/dev/` も 同じ）・Cloudflare Pages の `_headers`（`nosniff` と `.js` の `Content-Type`・キャッシュ）・プレビュー（`<hash>.uchinoko-biyori.pages.dev`）。ホーム画面版と Claude版が P6 で かわらないこと（`index.html`・`sw.js`・`src/out/claude/index.html` の md5）。
7. **書類と 外の 決まり**
   - `src/legal/privacy.html` の 改定（「おせわの記録」に うちのこランの記録・改定日 2026-11-22）と、アプリの中の おしらせ（`LineNotice`）を 出さない 判断。`terms.html` は かえていない 判断。`docs/PROJECT.md` 10章の 補足資料の 4。
   - LINEミニアプリの 決まり（ポリシー・審査ガイドライン・パフォーマンスの ガイドライン）で、3D の ミニゲーム（課金・広告・ガチャなし）と 約 630KB の 読みこみに 申告や 注意が 要るか（公式の 資料で 確かめ、確かめた日を 書く）。わんラン（ChatGPT が 作った ゲーム）を つかう ことの 決まり（オーナーが 作らせた もの）。法律の 判断が 要るところは「専門家に 確かめる」と 書く。
   - `docs/PROJECT.md`・`docs/RUN_DESIGN.md`・`CLAUDE.md` の 説明が コードと あっているか。
8. **動かして 確かめる**（どれも この ブランチで。はじめに `cd tools/server && npm install`・`cd tools/fonts && npm install`・`cd tools/run && npm install`）
   - `sh src/build.sh` → `node tools/rules_test.mjs` → `node tools/run/run_min.mjs` → `node tools/run/pet3d_test.mjs` → `python3 tools/line_e2e.py`（23・23b・23c が うちのこラン）、`python3 tools/smoke.py`（ホーム画面版。`--dark`・`--size 375x667` も）・`--claude`・`--line --android-inset 48`（`--size 375x667` も）、`python3 tools/linebreak.py`（`--line`・`--claude` も。`--only` なし。`--height 603` も）、`python3 tools/run/run_shots.py`（`--line --android-inset 48`・`--claude`・`--dark`・`--cat` も）、`python3 tools/compare_home.py 8a9b646`。
   - ためしで 見つからない ことも 考える（iPhone の LINE・Android の LINE・古い iPhone の 実機で しか わからない ことは「実機で 確かめる」として 一覧に）。
9. **まとめ**：レポートの 章に 一覧と、直す 順番の案（LINE版に 出す 前に 必ず・できれば・あとで）。ホーム画面版・Claude版に もう 出ている ものの 直しは、LINE版と いっしょに 出すか べつに 出すかも。

## 一覧の形
- 分けて書く：セキュリティ／不具合・データ／UI・使いやすさ・遊びごこち／速さ・運用／決まり・書類／保守。
- 1つずつ：番号（R-1 など）／重さ（高・中・低・情報）／どの 版か（ホーム画面版・Claude版・LINE版・サーバー）／場所（ファイルと行）／なにが起きうるか／直し方の案／出す 前に 直すか（必ず・できれば・あとで）。
- よいところ（守れていること）も 短く。

## まもること
- **コードは かえない・push しない**（ためしの 場面を 手元で 足して 動かすのは よい）。ブランチ `p6-run-line` も main も そのまま。Claude版も 出しなおさない。
- 本物の DB・サーバーには 書きこまない（`execute_sql` は 読むだけ。ためしの会員・セッションを 作らない。Edge Function を デプロイしない）。シークレットが 見える ページや 値は 読まない・写さない。

## おわったら
- 一覧を 見せて、**どれを 直してから 出すか**を わたしに 聞いてください。
- つぎの チャット（直して 出す チャット）に 貼る 短い プロンプトを ください：レポートの 章の 場所・直すもの・「ブランチ `p6-run-line` で 直してから main に 入れて、`CLAUDE.md` の 作業の流れ 3 で サーバーも デプロイ、`docs/RUN_DESIGN.md` 16章の『出し方』。ホーム画面版・Claude版も かわる 直しなら Claude版も 出しなおす」。`docs/HANDOFF.md` は かえなくて よい（つぎの チャットで 書きなおす）。

---ここまで---
