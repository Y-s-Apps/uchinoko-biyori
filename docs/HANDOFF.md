# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」し、作業ごとに新しいチャットへ移ります（`CLAUDE.md` の作業の流れ 7）。

- 最終更新：2026-11-06
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。ホーム画面版：https://y-s-apps.github.io/uchinoko-biyori/
- ホーム画面版の公開中の版：`sw.js` のキャッシュ名 `uchinoko-3b339fd590`（アプリの中身は `ba98c72` から変わっていない）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs はバージョン20（`ba98c72` と同じ中身）。今回は変更なし
- LINE版：画面は https://uchinoko-biyori.pages.dev/ （Cloudflare Pages、main の push で自動ビルド）。開発用の LIFF URL は https://miniapp.line.me/2012410263-cuCI7vQS
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK

## 直近のチャットでやったこと（LINE版のタスク1：完了）

- LINEミニアプリ化の計画書を作り、方針を決めた（`docs/PROJECT.md` の10章）：個人で提供、課金・広告は順番に、サーバーは Supabase（無料）、画面は Cloudflare Pages（Supabase は HTML を配れないため）、ホーム画面版は残す、だいずは LINE版の公開日にコピー、AIで写真を読みとるしくみは LINE版でも残す（サーバー経由、写真は保存しない、AIの利用料だけは有料）。
- `build.sh` が LINE版（`src/out/line/`）を作るように。`src/line_head.html`（CSP、Android版LINEの下のすき間）と `src/js_line.js`（LIFF SDK の読みこみと `liff.init()`、ゲストへの切りかえ、プロフィールの1行）。ホーム画面版の `index.html`・`sw.js` と Claude版は、ビルド前と同じ。
- オーナーが Cloudflare Pages と LINE Developers（プロバイダー、LINEミニアプリチャネル、開発用エンドポイントURL）を設定。開発用の LIFF ID `2012410263-cuCI7vQS` をアプリに入れた。
- 確認ずみ：`tools/smoke.py`（ホーム画面版、`--line --android-inset 48`、`--line --fresh`）でエラー0件。LIFF のまねで「LINEの中」「外部ブラウザ」「初期化の失敗」の3つの表示を確認。

## 保留・オーナーの判断待ち

- **実機での確認（オーナー）**：iPhone（と、あれば Android）の LINE で開発用の LIFF URL を開き、①画面が出る、②下の5つのボタンとシートがナビゲーションバーに隠れない、③上の LINE のバーとヘッダーが重ならない、④メニュー（プロフィール）のいちばん下に「LINEと つながっています」と出る、を見てもらう。結果を次のチャットで聞く。開けないときは、権限設定（いまは Admin がオーナー1人、Tester なし）を確かめる。
- おたすけの「週に1回」の数え方は、いまは「前回から7日」。月曜〜日曜の区切りにする案は、オーナーが希望したら変える。

## 次にやること

- **タスク2：Supabase で本人確認とセーブ。**
  - Supabase の組織 `Yuthy's`（無料プラン）には、いま「Yuthy's Project」（東京、`wfihqgtadnnweyediufv`）が1つある。中身を確かめ、うちのこ日和用のプロジェクトを分けるかオーナーと決める（無料プランは2つまで、1週間ほど使われないと止まる）。
  - Edge Function で `liff.getIDToken()` のトークンを `https://api.line.me/oauth2/v2.1/verify`（client_id は LINEミニアプリチャネルのチャネルID）で検証 → 自前の会員ID → 自前のセッション。LINE の `sub` は別の表。チャネルシークレットなどはチャットに貼ってもらわず、Supabase の画面で直接入れてもらう。
  - セーブの保存・読みこみ（はじめは今と同じ JSON を丸ごと。サーバーでも `ensureState()` と同じ確かめ。写真の控えは保存しない）。引っこしコードとゲストのデータの取りこみ口（1回だけ）。
  - LINE版の CSP の `connect-src` に Supabase の URL を足す。
- タスク3：時計に頼る処理をサーバーへ（第1弾：おなか・ごきげん、おやつ30分5回、おみやげ、きょうのおねがい、連続記録とおたすけ）。日付の区切りは日本時間。
- そのあと：AIの読みとり（Edge Function から Claude、1日の上限、予算をオーナーと決める）、認証審査の準備（プライバシーポリシー、利用規約、アイコン130×130）、うちのこカード、公式アカウント。

## 気をつけること

- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない（`CLAUDE.md` の「守ること」）。LINE版の変更でホーム画面版の `index.html` が変わっていないか、ビルドの前後で比べる。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- iPhoneのSafariでは、SVGが枠の外へ動くと残像が出る。体ごと大きく動くアニメは `#petArt` に付ける。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う（いまの最新は v2.31.2）。
- このセッションの外への通信は、パッケージの置き場と GitHub だけ。`*.pages.dev` や LINE の画面は直接見られないので、実機の確認はオーナーにお願いする。Cloudflare のビルド結果は、GitHub のコミットのチェック（「Cloudflare Pages」）で確かめられる。
