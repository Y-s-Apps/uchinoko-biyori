# うちのこラン（仮）：わんランを うちのこ日和の ミニゲームに する 設計

- 作った日：2026-11-21（22回目の チャット、Claude Opus 5.5）。**P1（3D の うちのこ）は 2026-11-21（23回目）に できて オーナー OK。つぎは P2**（10章の プロンプト）。P1 で 作ったものと P2 で 使う ときの 約束は 11章。
- きっかけ（オーナーから、2026-11-21）：ChatGPT で 作った 3Dゲーム「わんラン v33」（レース＆アジリティ）を、そのまま 入れるのでは なく、うちのこ日和 用に 置きかえて 新しい 機能に したい。
- もとの 資料：`_ref/wanrun-v33/`（`wanrun-v33.zip`＝ChatGPT が 出した 原本 一式〈`source/dist/` が 動く ソース 91ファイル・`source/tests/` 77件・分冊の 仕様書 `chap10/`〉、`spec.md`＝機能仕様書〈1〜9章〉）。`_` で はじまる フォルダなので GitHub Pages には 出ない（`.nojekyll` を 足さない）。
- 読む人：これを 実装する Claude Opus 5.5 の チャット。作業の 前に `CLAUDE.md`・`docs/PROJECT.md`・`docs/HANDOFF.md` を 読み、そのあとに ここを 読む。わんランの くわしい 動きは `_ref/wanrun-v33/spec.md`（とくに 4章 データ・5章 ロジック・8章 組み込み・9章 受入試験）。

## 1. オーナーが 決めたこと（2026-11-21）

| こと | 決めたこと |
| --- | --- |
| 見た目 | **3D（わんラン風）**。Three.js で、うちのこを 3D で 作りなおして 走らせる |
| 中身 | **レースと アジリティの 両方**（レース3コース・アジリティ4コース） |
| ねこ | **ねこの子も 走れる**（うちのこが ねこなら ねこで 走る。ライバルも ねこに あわせる） |
| ほうび | **パズルと 同じ**：完走で ごきげん+5・なかよし+2。**1日3回まで、パズルとは べつべつに 数える** |
| きせかえ | **くびだけ** 3Dで つける（マフラー・バンダナ・すず・リボン）。あたま・かおは つけない |
| 置きかえ方 | わんランの「相棒を えらぶ」は 使わない。走るのは いつも うちのこ |

まだ 決めていないこと（実装の とちゅうで オーナーに きく）：名前（「うちのこラン」は 仮）・ライバルの 名前の 出し方・おやつの 3Dの 形（7章）。

## 2. ゲームの 形（うちのこ日和で どう 見えるか）

1. 下の「あそぶ」→「なにで あそぶ？」の シートに 3つめ「ラン」を 足す（ボール／パズル／ラン）。シートの 下に 1行の 説明と、きょうの のこり回数。
2. 「ラン」を えらぶと、パズルと 同じく **ページごと ランの 画面 `#runPage` に うつる**（`z-index` 45、うしろの `#app` は `inert`）。
3. ランの 画面の 中：**モード（レース／アジリティ）→ コース → スタート待ち → 3・2・1 → 走る → 結果**。左上「×」、右上「？」（あそびかた）。わんランの 流れ（spec 3章）を、うちのこ日和の 見た目（`head.html` の トークン・Zen Maru Gothic／Mochiy Pop One・ダーク）で 作りなおす。
4. 走るのは うちのこ（3D）。後ろから 追う カメラ。操作は わんランと 同じ（左右スワイプ・上で ジャンプ・下で ブレーキ／止まる・タップで ダッシュ／再開）。
5. 結果：レースは 順位と タイム、アジリティは 合計秒（ミス1回 +5秒）。**ほうびは 完走したか だけ**（順位・タイムでは かわらない）。5位でも うちのこは かなしまない（「さいごまで はしったね！」）。
6. とじると おへやの子が「ラン たのしかった！」。さいこう記録は アルバムの にっきに（パズルと 同じ 形）。

## 3. わんランから 持ってくるもの・かえるもの

| わんラン（`source/dist/`） | うちのこラン |
| --- | --- |
| 相棒を えらぶ（8犬種×3色・スカーフ6色）`app.js` `breeds.js` `scarf-colors.js` `partner-stage.js` | **使わない**。うちのこの `S.pet.look` と `S.pet.wear.neck` から 3D を 作る（4章） |
| 犬の 3Dモデル `dog-model.js` `companions.js` `shiba.js` `poodle-fleece.js` `neck-scarf.js` `dog-gait.js` | **作りなおす**。わんランは 犬種ごとの `if` で かいていて、41種・ねこには 広げられない。形の 作り方（丸い からだ・足の 接地・しっぽの ゆれ・首の 布）は 参考に して、`look` の 値（耳7・毛4・マズル3・しっぽ6・顔の もよう5・あし2・色）から 組み立てる 新しい 関数に する |
| モード・コース選択 `modes.js` `courses.js` `course-scene.js` | 持ってくる（中身の データと 立体プレビュー）。画面は 作りなおす |
| レースの ルール `race-sim.js` `race-route.js` `beach-layout.js` `forest-layout.js` | **ほぼ そのまま**（DOM・Three.js を 使わない。`Math.random` も 0件）。CPU 4匹は「おともだち」に（7章） |
| アジリティの ルール `agility-sim.js` `agility-route.js` `seesaw.js` `slalom.js` `a-frame.js` | **ほぼ そのまま** |
| 景色 `race-track.js` `agility-field.js` `forest-scene.js` `beach-scene.js` `park-art.js` など | 持ってくる（色だけ うちのこ日和に 寄せても よい） |
| 走る 画面 `race-game.js`（`mountRace`） | 持ってきて 直す：入れものを `#runPage` に、相棒を 3Dの うちのこに、結果と 記録を `Rules` に、文言を うちのこ日和の 書き方に |
| 記録 `course-records.js`（localStorage `wan-run-*`） | **セーブ `S.run` に 入れる**（6章）。`wan-run-*` の キーは 使わない（`*.github.io` は 組織で 共有） |
| あそびかた `help-content.js` | 持ってきて 書きなおす（やさしい ひらがな・文節の スペース） |
| おやつ（骨型ビスケット）`park-biscuit.js` | うちのこ日和の おやつに 置きかえ（7章） |
| URL（`#mode` `?play=` `?trial=`）・`history` | **使わない**（うちのこ日和の 画面の 中だけで 切りかえる） |
| 比べる 画面 `review/`・`PROJECT_NOTES.md` | 使わない（読むだけ） |
| テスト `tests/*.test.mjs`（77件） | ルールの テストを `tools/` に 移して 残す（8章） |

## 4. 3Dの うちのこ（いちばん 大きい 作業）

- 新しい 関数 `makePet3D(look, neckWear)`（と 走る ポーズ `posePet3D(pet, t, running)`）。`normalizeLook()` を 通した 値だけを 使う。
- **2Dの 絵と 同じ子に 見えること**が いちばん 大事。部品と `look` の 対応：

| `look` | 3Dで |
| --- | --- |
| `species` | 犬／ねこで 頭の 形（ねこは 丸く・マズル短め・三角の 耳）と しっぽの 長さを かえる |
| `ear`（pointy・big・small・floppy・long・semi・fold） | 立ち耳・大きい 立ち耳・小さい耳・たれ耳・長い たれ耳・半分 たれ・折れ耳 |
| `coat`（smooth・fluffy・curly・long） | ふつう／首まわりの 毛（ポメ風）／丸い 巻き毛の かたまり（プードル風）／長い 毛の すそ |
| `muzzle`（short・medium・long） | 鼻先の 長さ |
| `tail`（curl・plume・straight・stub・long・fluffy） | 巻き尾・ふさ尾・まっすぐ・短い・長い・ふわふわ |
| `face`（muzzle・lower・mask・hachiware・blaze） | 顔の 色わけ（後ろ姿では 少しだけ 見える。走る 前の プレビューで 見える） |
| `legs`（normal・short） | 足の 長さ（ダックス・コーギーは short） |
| `colors`（main・body・ear・tail・belly など）・`marks`（しま・ぶち など） | 部品ごとの 色。しま・ぶちは Canvas で 作る 小さな 模様の テクスチャ（画像の ファイルは 使わない） |
| `wear.neck` | マフラー（トリコロール ふくむ）・バンダナ・すずの 首輪（6色）・リボン。わんランの 首の 布（`neck-scarf.js`）の 作り方を 参考に |

- 見くらべの ツールを 作る：41種と いくつかの 毛色で「2Dの 絵（`renderPet`）」と「3Dの 正面・ななめ・後ろ」を 1まいに ならべた スクリーンショット。**オーナーが 見て OK を 出してから** 走る ところへ すすむ。
- ライバル（おともだち）も 同じ 関数で 作る（ランダムな 品種と 毛色。うちのこと 同じ 種類）。

## 5. 技術の 決めごと（おすすめ。実装の はじめに 確かめる）

- **Three.js は いっしょに 1つの ファイルに まとめて、ランを ひらいた ときだけ 読みこむ。** いまの アプリ（`index.html` 約330KB）に 1.3MB を 足すと、毎回 ひらくのが おそく なるため。
  - `tools/run/`（esbuild。`package.json` と lockfile）で、`src/run/` の ゲームの コードと Three.js を 1つに まとめて 小さく する（使う 部分だけ・`target` は 古い iPhone の Safari に あわせる）。できた ファイルは `src/run_bundle.js` に 置いて コミットする（`game.js` と 同じ 考え方＝手で 直さない・`--check` で 確かめる）。Cloudflare の ビルドで npm を 動かさない ため。
  - `build.sh` が それを `run-<ハッシュ>.js` として ホーム画面版（ルート）と LINE版（`out/line/`）に 出す。読みこむ ときは `<script src>` に `integrity` を つける。
  - **CSP：** ホーム画面版は `script-src` に その ファイルの URL（パスまで。`https://y-s-apps.github.io/uchinoko-biyori/run-<ハッシュ>.js`）だけを 足す（`'self'` に しない＝組織の ほかの Pages の スクリプトを 通さない）。LINE版も 同じく `https://uchinoko-biyori.pages.dev/run-<ハッシュ>.js`。`build.sh` が 入れる。
  - Service Worker：ホーム画面版は `run-<ハッシュ>.js` も とっておく（オフラインでも あそべる。キャッシュ名の 版番号にも 入れる）。
  - Claude版：アーティファクトに 2つめの ファイルとして のせるか、そこだけ 中に 入れるか を、はじめに `publish_files` で ためして 決める。
  - Three.js の 著作権と ライセンス（MIT）の 表示を のこす。
- **WebGL 2 が 使えない 端末：** シートの「ラン」に「この端末では あそべません」と 出して ひらかない。ほうびも ない。
- **こわさない・のこさない：** とじる ときに わんランの `dispose()` と 同じく、描く ループ・タイマー・リスナー・WebGL を ぜんぶ 片づける。アプリを はなれた（`visibilitychange`）ら 一時停止。
- **LINE の 下スワイプ（ミニアプリの 最小化）：** パズルと 同じ 対策（`touch-action:none`・`overscroll-behavior:none`・`touchstart`／`touchmove` の `preventDefault`）。Android の 下の すき間は `line_head.html` に `html .run-page`。
- **重さ：** 描く 細かさの 上限（わんランは 走る ときに 1.6）。古い iPhone で 30fps を 下回らないか 見る。
- **古い iPhone：** `Object.hasOwn`・正規表現の うしろ読みを 使わない（esbuild の `target` でも 防ぐ）。

## 6. ルール・セーブ・サーバー

- **ルールは `js_rules.js`**：`RUN`（数字：ほうび・1日3回・コースの 一覧）と `Rules.act(st, 'run', { course, ms, misses })`。知っている コースか・モードと あっているかを 見て、完走の ほうび（その日 3回まで。日付は `dayKey()`）・さいこう記録・アルバムを 書く。**パズルの 回数とは べつ**（オーナー決定）。
- **セーブ `S.run`**：`{ games, clears, n, day, best:{ <コースID>: ミリ秒 } }`。`ensureState` に 既定値と 範囲（知らない コースIDは 捨てる・`hasId`）、`carryExtras` に 運ぶもの。`firsts.run` も。
- **ほうびが「完走したか だけ」なので、パズルのような 再生（リプレイ）は いらない。** レースも アジリティも 自動で 前に すすむので、さいごまで 走れば かならず 完走する。
  - LINE版の サーバーは「はじめた 時刻」を 自分で 持つ：走りだす ときに `/act 'runStart' { course }`（`srv.run = { c, t }`）、ゴールで `/act 'run'`。**サーバーの 時計で そのコースの いちばん はやい タイムより 早かったら ほうびなし。** いちばん はやい タイムは シミュレーションで 全部 ダッシュした ときから 決めて `RUN` に 書く。
  - さいこう記録の タイムは 画面が 出す 値（自分の 記録に だけ 使う。ランキングは 作らないので ほかの人に 影響しない）。ありえない 値は `RUN` の いちばん はやい タイムで 切る。
  - `rid` の しくみに のせる（同じ 番号は 前の 答え）。おせわの 2.5秒（`CARE`）には 数えない。LINE に ほぞんしている子が つながっていない ときは、パズルと 同じく `Act.blocked()` を 先に 見る（端末だけで「完走！ほうび」を 出さない）。
- きょうの おねがいの「あそぶ」には 数えない（パズルと 同じ）。
- **なかよしの すすみ：** パズル＋ランで 1日 最大 なかよし+12。Lv100 まで 半年ほどの ところが、あわせて 2週間ほど はやまる 程度（オーナー了承）。
- 1日の かぎりの あとも あそべる（ほうびなし。「きょうの ほうびは おしまい」）。
- **ガチャ・ゲーム内通貨・課金や 広告の 入口は 作らない**（10章「決めたこと（2026-11-15、パズル）」と 同じ）。

## 7. うちのこ日和 らしく する ところ

- **おやつ：** 骨型ビスケットの かわりに、犬は「たまごボーロ」、ねこは「カリカリおやつ」を 3D に（パズルの おやつと そろえる）。20こ あつめて ダッシュ、は そのまま。（形は 見本を 見て オーナーが 決める）
- **おともだち（レースの ライバル4匹）：** うちのこと 同じ 種類の、ランダムな 品種・毛色。順位表には「おともだち（柴犬）」のように 品種で 出す（名前を つけるかは オーナーに きく）。
- **ことば：** 「ぶつかった！」→「ごつん！」など、やわらかく。文節の スペース・`linebreak.py`。数字は「◯びょう」より わんランの 時計（`00:33.5`）で よいか 見本で きく。
- **色：** HUD・ボタンは `head.html` の トークン（ライト・ダーク）。文字は 11px 以上、文字と 地の 差 4.5（大きい 文字 3）。3Dの 景色の 上に 出す 文字は 地を しく。
- 実在の チーム・ブランドの デザインは 作らない（トリコロールの 色づかいは OK）。

## 8. 確かめ方（実装で 足す もの）

- `tools/run_test.mjs`：わんランの `tests/` から ルールの テスト（race-sim・race-turns・course-progression・zigzag・balance・hill-field・beach・forest・course-records など）を 移す。足すもの：`Rules.act('run')` の ほうび（3回・べつべつ・日付）、`ensureState` の `S.run`、`carryExtras`、いちばん はやい タイムの 切りすて。
- `tools/rules_test.mjs`・`api_test.ts`・`line_e2e.py`：`run`・`runStart`（はやすぎる・とどかない・同じ `rid`）。
- `tools/smoke.py`：シートの「ラン」・ページが 入るか・WebGL が ない ときの 表示・とじた あとに Canvas が のこらないか。ヘッドレスの Chromium で WebGL が 動かない ときは SwiftShader（`--use-angle=swiftshader`）。
- `tools/linebreak.py`：ランの 画面の 文。
- `tools/compare_home.py`：ランを 使わなければ セーブは 前と 同じ。
- **実機（オーナー）：** iPhone の ホーム画面版と LINE で、7コースを 1回ずつ。わんランの 受入試験（spec 9.3）を 目安に。

## 9. すすめ方（1つの チャットで 1つ）

| だんかい | 中身 | 出す 先 |
| --- | --- | --- |
| P0 | この 設計と 資料（`_ref/`）（22回目。済み） | ― |
| P1 | **3Dの うちのこ**（`makePet3D`・走る ポーズ・くびの きせかえ）と 見くらべの スクリーンショット → オーナーの OK（**23回目。済み**） | どこにも 出さない |
| P2 | まとめる しくみ（`tools/run/`・`src/run_bundle.js`・`build.sh`・CSP・SW）と、レースの「公園」1コースを ホーム画面版で 走れる（ほうび なし） | ホーム画面版だけ。**ビルドの スイッチ**（下）で LINE版・Claude版は かわらない |
| P3 | レース3コース・結果・記録・ほうび（`Rules`・`S.run`）・アルバム | ホーム画面版 |
| P4 | アジリティ4コース | ホーム画面版 |
| P5 | Claude版 | Claude版 |
| P6 | LINE版（サーバーの `runStart`・`run`・デプロイ・`line_e2e.py`）。出す 前に Fable 5.2 の レビュー（パズルと 同じ。プロンプトは `docs/REVIEW_PROMPT.md` に） | LINE版 |

- **ビルドの スイッチ：** `build.sh` に `RUN_HOME=1`・`RUN_LINE=0`・`RUN_CLAUDE=0` の ような 切りかえを 置き、出して よい 版だけに ランの 入口と ファイルを 入れる。LINE版を かえない あいだは、ビルドの 前後で `out/line/index.html` の md5 が 同じか 確かめる。
- **LINE の 認証審査と かさねない：** 審査中（1〜2週間）は LINE版を かえられない。main に push すると Cloudflare が LINE版を 作りなおすので、審査中も `RUN_LINE=0` の まま（md5 同じ）なら ホーム画面版だけ すすめて よい。P6 は 審査の 前か 認証の あと。
- **体勢と 動き（`docs/MOTION_DESIGN.md`）とは べつ**（あちらは 2Dの おへやの 絵。こちらは 3D）。どちらを 先に しても よい。
- だいずの ホーム画面の アプリは P2 から 更新される（ランを 使わなければ 動きは 同じ＝`compare_home.py`）。

## 10. 実装の チャットに 貼る プロンプト（P2）

（P1 の プロンプトは git の 履歴に）

```
うちのこ日和の「うちのこラン（仮）」の P2 を おねがい。
CLAUDE.md・docs/PROJECT.md・docs/HANDOFF.md を 読んでから、docs/RUN_DESIGN.md（設計。11章に P1 で 作った 3D の うちのこ）を 読んで。
わんラン v33 は _ref/wanrun-v33/（zip と spec.md。とくに 5.3 レース・8.2 ホストの 画面に マウント・9.3 受入試験）。
3D の うちのこは src/run/pet3d.js（P1 で OK 済み）。

P2 で やること：
- まとめる しくみ：tools/run/（esbuild）で src/run/ の ゲームと Three.js を 1つに まとめて src/run_bundle.js に（手で 直さない・--check で 確かめる）。build.sh が run-<ハッシュ>.js として ホーム画面版に 出す（integrity・CSP は その ファイルの URL だけ・SW で とっておく）。ビルドの スイッチ RUN_HOME=1・RUN_LINE=0・RUN_CLAUDE=0
- 「あそぶ」の シートに「ラン」、ページ #runPage。レースの「公園」1コースを ホーム画面版で 走れる（ほうび なし）。わんランの race-sim.js・race-route.js・race-track.js・race-game.js などを 持ってきて、相棒を makePet3D の うちのこに（おともだちは detail 0.6）
- WebGL が ない 端末の 表示、とじたら ぜんぶ 片づける、アプリを はなれたら 一時停止
- LINE版・Claude版は かえない（out/line/index.html と Claude版の md5 が 同じ）。smoke.py・linebreak.py・compare_home.py、iPhone の 幅の スクリーンショットで 見た目を 確かめて
- 走れたら スクリーンショット（と 走る ところ）を 見せて、OK を もらったら P3 の 準備（HANDOFF と つぎの プロンプト）まで
```

## 11. P1 で 作ったもの（2026-11-21、23回目）

- **`src/run/pet3d.js`**（ES モジュール。`three` と `three/addons/utils/BufferGeometryUtils.js` を import。`build.sh` には まだ 入っていない）
  - `makePet3D(look, neckWear, { detail })` → `THREE.Group`。`look` は かならず `normalizeLook()` を とおした もの、`neckWear` は `WEAR_BY_ID[S.pet.wear.neck]`（`hasId` で 確かめて）か `null`。`detail`（0.4〜1。既定 1）は 球の 細かさ＝おともだちは 0.6。
  - 向きと 単位：y が 上・あたまは +z・足の うらが y = 0、わんラン（`companions.js`）と 同じ 単位。高さは 耳まで 約1.3（わんランの 犬は レースで `scale` 0.62〜0.76。P2 で ためして 決める）。
  - `userData`：`legs`（4本。`hip`・`phase`・`paw`）・`tail`・`height`（こしの 高さ）＝わんランと 同じ なので `dog-gait.js` の `poseLegs(dog, phase, running, airborne, heightAt)` が そのまま つかえる。ほかに `rig`（頭・耳・目・べろ・しっぽの ふりかた）と `size`（`H`・`BW`・`BH`・`BL`・`HR`・`headY`・`headZ`・`top`）。
  - `posePet3D(pet, t, running, { phase, airborne, reduced, legs })`：まばたき・しっぽ・耳（たれ耳は 走ると ゆれる）・あたまの ゆれ・走ると べろ。`legs` を `false` に すると 足は さわらない（レースでは `poseLegs` で 坂・器具に 足を つけてから `posePet3D(..., { legs: false, phase })`）。`strideLegs` は 平らな 地面だけの `poseLegs`。
  - `disposePet3D(pet)`：ジオメトリと マテリアルを 片づけて はずす（とじる とき・おともだちを 作りなおす とき）。
  - 動かない 部品は、動く 入れもの（からだ・頭・目・耳・足・しっぽ）ごとに マテリアルで 1つに まとめている（`bake`）。足の うら（`paw`）と べろは のこす。
- **2D と 同じ子に 見せる しかけ：** 頭の 正面に 2D の 絵の 座標を そのまま はる（2D の (x, y) → u = (x − 120)/60・v = (100 − y)/51 が 単位球の 正面の (x, y)）。色の 決め方（むね・口もと・耳の 内がわ・目の まわり・口の 色 など）は `renderPet` と 同じ。もようは 頂点の 色。2D は すわった 絵、3D は 走るので 立った すがた。
- **色を 2D に そろえる 描き方（見くらべで 決めた）：** `NeutralToneMapping`・`toneMappingExposure` 1・`HemisphereLight('#fffaf0', '#c9c2b0', 1.9)`・`DirectionalLight('#fff7ea', 1.9)`。わんランの レースの 光（ACES・1.15、2.5 と 2.7）だと うちのこの 色が うすく 白っぽく なる。P2 では レースの 景色も この 光に するか、景色の 色を あわせて 確かめる。
- **重さ：** 1ぴき 平均 約2.7万 三角形・描く 回数 26（`detail: .6` は 約1.3万）。いちばん 重いのは 長い毛＋花の くびかざり（約4.6万・36）。pet3d.js と Three.js の 使う ところを まとめて 小さく すると 約314KB（ゲームを 足すと ふえる）。
- **オーナーの 見くらべで 決めた こと（2026-11-21）：** ①立ち耳は つけねを 頭の 中まで のばす（浮いて 見えた）。②からだの 色が 頭（`main`）と ちがう 子（いまは ヨークシャーテリア）は、からだの 色を せなかと わきの 上だけ（上着の ように）にして、おなか・足は 頭の 色（全身タイツに 見えた）。**2D の 絵の ヨーキーは そのまま**（2D を かえると 3つの 版が ぜんぶ かわる。かえるなら べつの 作業で）。③だいずの 色は クリームの ポメラニアン（からだ `#F3DDB3`）で 見た（ほんとうの みための 値は 見ていない）。
- **道具：** `tools/run/`（`package.json`・lockfile。Three.js 0.170.0・esbuild 0.24.2。`cd tools/run && npm install`）、`python3 tools/run/pet3d_compare.py`（`smoke-out/pet3d/` に 8まい。`--only 品種id,daizu:くびのid --size 600` で 大きく、`--gif daizu:scarf_tri` で 走る アニメ）、`node tools/run/pet3d_test.mjs`（esbuild で まとめて よみこみ、41種 × くびの きせかえ ＋ こわれた みためで 作る・NaN・足 4本・立つ／走ると 足の うらが 地面・片づく。17,248 こ）。
- **P2 で 気をつける こと：** アプリの スクリプトには 大きな 名前 `T`（`js_data2.js` の おやつの 表の 関数）や `clamp`・`mix` が ある。まとめる ファイルは モジュールの 中で 名前を とじる（esbuild の `iife`／`esm`）、`window.THREE` に たよらない。esbuild は `nodePaths: ['tools/run/node_modules']` で `three` を さがす（`pet3d_test.mjs` と 同じ）。`target` は `safari14` で とおった。
- **まだの こと：** マフラーの はしは ゆれない、おともだちの 名前、おやつの 3D の 形（7章）。
