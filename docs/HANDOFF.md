# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-06
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 `uchinoko-df2f01ac7a`（コミット `047f1e0`。ルールを `js_rules.js` にまとめたので中身は変わったが、動きは前と同じ。`tools/compare_home.py` で確認ずみ）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs は**まだバージョン20**（`ba98c72` と同じ中身）。`047f1e0` の `src/out/uchinoko-claude.html` で公開し直すのは、つぎのチャットのはじめにやる（動きは同じ。公開し直しには、いまのページを Artifact の read で読み、保存されたファイルを最後の行まで Read する必要がある）
- LINE版：画面は https://uchinoko-biyori.pages.dev/ （Cloudflare Pages、main の push で自動ビルド）。開発用の LIFF URL は https://miniapp.line.me/2012410263-cuCI7vQS
- LINE版のサーバー：Supabase のプロジェクト「uchinoko-biyori」（`ftakgswltcavwixqxpzi`、東京、組織 `Yuthy's` の無料プラン）。Edge Function `api` は**バージョン3**（`deno.json` が `game.js` をコミット `047f1e0` に固定）
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK

## 直近のチャットでやったこと（LINE版のタスク3：完了）

- はじめに実機の確認：iPhone の LINE（Tester）で開くと、プロフィールのいちばん下が「LINEと つながっています」。サーバーに会員1人・セーブ1つ（「テスト」・ポメラニアン、写真なし、rev 2）ができていた。タスク2は実機でもOK。
- オーナーと決めたこと：LINEの中でサーバーに つながらないとき、LINEに ほぞんしている子は **つながるまで おせわを まってもらう**。そのうえで **抜け道をつぶす**（`docs/PROJECT.md` 10章「決めたこと（2026-11-06、タスク3）」）。
- ルール：`src/js_rules.js` に `Rules`（おせわ・おねがい・おたすけ・おみやげ・イベント・記念日・げい・なでなで）と `Clock`（`now()`・`dayKey()`・`rand()`）。画面は `Act.run` で判定をたのみ、`playEvents` で今までと同じ順・間でポップアップを出す。ホーム画面版・Claude版の動きは同じ（`tools/compare_home.py`：同じ時計・同じ乱数で前の版とくらべて「おなじ」）。
- サーバー：`POST /act`（open・feed・treat・play・pet・trick・dress・room・season をサーバーの時刻・日本時間・crypto の乱数で判定。おせわは 2.5 秒あける。`adopt` は まっさらの新しい子）、`POST /save` は名前・みためだけ。季節イベント・記念日・げいの上限も、第2弾を待たずに入れた。
- LINE版の画面：つながったら `S` はサーバーのセーブの写しで、時計もサーバーに合わせる。LINEの子は つながらないと おせわ・きせかえ・もようがえ・名前の変更・新しい子・コードの受け取りができない（「サーバーに つながっていません」と「もういちど つなぐ」。LINEの外では「LINEの中で ひらくと おせわできます」）。LINEに まだ子がいないとき、この端末で遊んだ子は「つれてくる？（1回だけ）」、やめておくと はじめての画面。
- 確認：`tools/rules_test.mjs`（日をまたぐルール）、`tools/server/api_test.ts`（/act・/save・adopt・取りこみ・セッション）、`tools/line_e2e.py`（画面とサーバーの通し 13場面）、`tools/smoke.py`（ホーム・`--fresh`・`--line --android-inset 48`・`--line --fresh`）すべてOK、ページエラー0件。本物の Supabase でも pg_net で `/health`・ためしの会員（セッションを直接作って）で adopt → open → feed → 古い形のセーブは 400、を確かめ、ためしの会員は消した（いまは会員1人＝オーナーの「テスト」だけ）。

## 保留・オーナーの判断待ち

- **実機での確認（つぎのチャットのはじめにお願いする）：** iPhone の LINE で開発用の LIFF URL を開き、「テスト」に ごはん・なでなでをして、メーターが動くか。そのあと Supabase で `counts.meals` などが増えているかを `execute_sql` で確かめる（sub や中身は表示しない）。機内モードにして ごはんを押すと「サーバーに つながっていません」が出るかも見てもらう。
- Claude版の公開し直し（上のとおり。動きは同じ）。
- Android は未確認（端末で見られる機会があれば）。
- おたすけの「週に1回」の数え方は、いまは「前回から7日」。月曜〜日曜の区切りにする案は、オーナーが希望したら変える。
- 第2弾の残り：季節イベント・記念日・げいの上限はタスク3で済んだので、時計まわりで残るのは見た目だけ（おへやの朝・昼・夕方・夜、とけい、アルバムの日付の表示は端末の時計のまま。ずらしても得をしない）。

## 次にやること

- **Claude版の公開し直し**（`sh src/build.sh` → `src/out/uchinoko-claude.html` を同じURLへ。`capabilities` ははぶく）。
- **AIの読みとり：** Edge Function から Claude（写真から種類・毛色・耳やしっぽの形）。1日の上限と予算をオーナーと決める。APIの鍵はオーナーに Supabase の画面で入れてもらう（`create_edge_function_secret`。チャットに貼ってもらわない）。写真は端末で小さくしてから送り、保存もログもしない（10章のサーバーのきまり）。
- そのあと：やめる人への対応（退会・データを消す・LINE の deauthorize）、認証審査の準備（プライバシーポリシー、利用規約、アイコン130×130）、うちのこカード、公式アカウント、ほかの端末の写真立て（写真がないときにイラストを出す）。
- **公開の前に：** 試しの会員とセーブ（「テスト」も）を消してから、だいずを引っこしコードで取りこむ（取りこみは1人1回）。

## 気をつけること

- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない（`CLAUDE.md` の「守ること」）。おせわのルールや画面を、動きを変えるつもりなく直したときは `python3 tools/compare_home.py` で前の版とくらべる。
- ルールの時刻・日付・偶然は `Clock`（`now()`・`dayKey()`・`Clock.rand()`）だけを使う。ルールに画面の処理を入れない（サーバーで動かない）。ルールを変えたらサーバーも作り直す（`build_server.py` → push → `--pin` → デプロイ）。
- LINE版のサーバーは、おせわの数字を画面から受けとらない。新しい項目をセーブに足すときは、`ensureState()` と、必要なら `Rules` に書けば、サーバーにも同じものが入る。`/save` に数字を足さない。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- iPhoneのSafariでは、SVGが枠の外へ動くと残像が出る。体ごと大きく動くアニメは `#petArt` に付ける。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ。`*.pages.dev`・`*.github.io`・`supabase.co`・LINE には直接届かない。本物のサーバーや公開ページは `execute_sql` から pg_net（`net.http_get` / `net.http_post`、返事は `net._http_response`）で確かめる。セッションが要る API は、ためしの会員に `app.sessions` を直接作って（トークンの `sha256`）呼び、あとで会員ごと消す。
- Supabase の無料プランは、使われない日が1週間ほど続くとプロジェクトが止まる。止まっていたら MCP の `restore_project` で戻す（そのあいだ、LINEの子は「つながるまで まってね」になる）。
- Cloudflare のビルド結果は、GitHub のコミットのチェック（「Cloudflare Pages」）で確かめられる。
