# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-06
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 `uchinoko-df2f01ac7a`（`047f1e0` から中身は変わっていない。AIの読みとりは LINE版だけの変更）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**バージョン21**（`047f1e0` の中身＝ルールを js_rules.js にまとめた版。動きは前と同じ）。いまの main で作っても中身は同じ
- LINE版：画面は https://uchinoko-biyori.pages.dev/ （Cloudflare Pages、main の push で自動ビルド）。開発用の LIFF URL は https://miniapp.line.me/2012410263-cuCI7vQS
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は**バージョン4**（AIの読みとり入り。`deno.json` が `game.js` をコミット `2dca6cf` に固定）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK

## 直近のチャットでやったこと

- **実機の確認（タスク3）：** サーバーの「テスト」は ごはん・おやつ・なでなで・あそび が 0回のまま（rev 2、最後の更新 11/6 4:23）。バージョン3にしてから iPhone からの呼び出しは届いていなかった（オーナーの「開いた結果」の欄も空だった）。**まだ ためしていない。**
- **Claude版をバージョン21に公開し直した**（`047f1e0` の中身。前のページを最後の行まで読み、新しく入る行も読んでから公開）。
- **AIの読みとり（LINE版）を作った：** オーナーと決めたこと＝Claude Haiku 5.5、1人1日3回、全員で1日300回、月の予算5ドル（Anthropic Console の利用上限にオーナーが入れる）。くわしくは `docs/PROJECT.md` 10章「決めたこと（AIの読みとり）」「しくみ（AIの読みとり）」。
  - 画面（`js_line.js` の `LineAI`）：LINEの中でサーバーにつながり、サーバーが「使える」ときだけ、写真をえらんだあとに「AIで 読みとる？」（のこり回数・AIを使わない えらび方・どこへ送るか）。768px の JPEG にして `POST /read`。ホーム画面版の `index.html` は変わらない。
  - サーバー：`GET /ai`・`POST /read`。回数は表 `app.ai_usage`（日付・会員・回数だけ）。写真と返事は保存もログもしない。鍵 `ANTHROPIC_API_KEY` がない・回数の表がないときは「休み」（ログインやおせわは止まらない）。
  - 確認：`tools/line_e2e.py`（ルール・サーバー単体・画面の通し。AIは まねて、10〜10c を追加）、`tools/smoke.py`（ホーム・`--line --android-inset 48`・`--line --fresh`）すべてOK、ページエラー0件。本物のサーバーは pg_net で `/health`（200）・`/ai`（401 nosession＝道はある）を確かめた。

## 保留・オーナーの判断待ち（つぎのチャットのはじめに）

1. **表 `app.ai_usage` を本物の Supabase に入れる：** `supabase/migrations/20261106000003_ai_usage.sql`。このチャットでは `apply_migration` が作業環境の確認（自動の判定）で止められた。オーナーに「入れてよい」と言ってもらってから `apply_migration`（名前 `ai_usage`）→ `get_advisors`。または、オーナーが Supabase の SQL Editor でこのファイルの中身を実行してもよい。表がないあいだは、鍵を入れても読みとりは「休み」のまま（こわれはしない）。
2. **AIの鍵と予算（オーナーの作業）：** Anthropic Console（https://platform.claude.com/ ）で APIキーを作り、月の利用上限を5ドルにする → Supabase の画面で プロジェクト uchinoko-biyori → Edge Functions → Secrets に `ANTHROPIC_API_KEY` を入れる（チャットには貼らない）。
3. 1と2が済んだら、本物で ためす：iPhone の LINE で開発用の LIFF URL → メニュー →「新しい子をむかえる」は「テスト」が消えるので、ためすなら いまの「テスト」のまま（新しい子にしてもよいかオーナーに聞く）。サーバー側だけなら、ためしの会員とセッションを作って pg_net で `/ai`（on:true, left:3）と、小さい JPEG で `/read` を1回 → `app.ai_usage` が1になるか → ためしの会員は消す。
4. **タスク3の実機確認（まだ）：** iPhone の LINE で「テスト」に ごはん・なでなで → `execute_sql` で `counts.meals` などが増えたか（sub や中身は出さない）。機内モードで ごはん →「サーバーに つながっていません」。
- Android は未確認。
- おたすけの「週に1回」は「前回から7日」のまま（曜日区切りは希望があれば）。

## 次にやること

- 上の保留（表・鍵・実機）。
- そのあと：やめる人への対応（退会・データを消す・LINE の deauthorize）、認証審査の準備（プライバシーポリシー〈AIに送る写真の扱い：Anthropic はふだん学習に使わず30日以内に消す、を確かめて書く〉、利用規約、アイコン130×130）、うちのこカード、公式アカウント、ほかの端末の写真立て（写真がないときにイラストを出す）。
- **公開の前に：** 試しの会員とセーブ（「テスト」も）を消してから、だいずを引っこしコードで取りこむ（取りこみは1人1回）。

## 気をつけること

- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない（`CLAUDE.md` の「守ること」）。LINE版だけの変更では、ビルドの前後でホーム画面版の `index.html`・`sw.js` が同じか確かめる。
- ルールの時刻・日付・偶然は `Clock` だけ。ルールや `js_onboard.js` の `buildPrompt`/`parseAI` を変えたらサーバーも作り直す（`build_server.py` → push → `--pin` → デプロイ）。
- LINE版のサーバーは、おせわの数字を画面から受けとらない。AIの返事は `parseAI()` を通した形だけを画面にわたす。写真・AIの返事はログに出さない。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ。`*.pages.dev`・`*.github.io`・`supabase.co`・LINE・Anthropic には直接届かない。本物のサーバーは `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`）で確かめる。
- Edge Function のデプロイは `index.ts` を丸ごと送るので、送ったあと `get_edge_function` で中身を見て、手元と同じか確かめる。
- 表を変える `apply_migration` は、作業環境の確認で止められることがある。止められたら、オーナーに理由を伝えて判断してもらう（回り道で DDL を流さない）。
- Supabase の無料プランは、使われない日が1週間ほど続くとプロジェクトが止まる。止まっていたら MCP の `restore_project` で戻す。
- Cloudflare のビルド結果は、GitHub のコミットのチェック（「Cloudflare Pages」）で確かめられる。
