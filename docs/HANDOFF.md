# 引き継ぎメモ（いまの状況）

このファイルは、チャットのいちばん最後に毎回まるごと書き直します。次のチャットは、ここを読めば続きから始められます。オーナーは、更新のたびにプロジェクトナレッジのGitHubを「同期」します。

- 最終更新：2026-11-06
- リポジトリ：`Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。公開URL：https://y-s-apps.github.io/uchinoko-biyori/
- 公開中の版：`sw.js` のキャッシュ名 `uchinoko-3b339fd590`（アプリの中身は `ba98c72` から変わっていない）
- Claude版：https://claude.ai/artifact/AwQ68i8D2TL3L2vfC9Bnqs はバージョン20（`ba98c72` と同じ中身）。今回は変更なし
- LINE版の計画書：https://claude.ai/artifact/AgKkCkHCsWAywKGV6VFxwK

## 直近のチャットでやったこと

- LINEミニアプリ化の計画書を作った（現状の構成、端末の時計に頼る9つの処理、変更点の必須・推奨・後回し、収益化、法律の注意、審査のチェックリスト、最初のタスク3つ）。
- オーナーと方針を決めた（`docs/PROJECT.md` の10章）：個人で提供、課金・広告は順番に、サーバーは Supabase（無料）、画面は Cloudflare Pages（Supabase は HTML を配れないため）、ホーム画面版は残す、だいずは LINE版の公開日にコピー、AIで写真を読みとるしくみは LINE版でも残す（サーバー経由、写真は保存しない、AIの利用料だけは有料）。
- Cloudflare Pages はオーナーが設定ずみ：https://uchinoko-biyori.pages.dev/（main の push で自動ビルド。初回 `30d1bb1` は成功）。
- タスク1「LINE版の入れもの」：`build.sh` が `src/out/line/` を作るように。`src/line_head.html`（LIFF SDK のエッジパス、CSP、Android版LINEの下のすき間）と `src/js_line.js`（LIFF の準備、`LINE_CFG.liffId` は空）。ホーム画面版の `index.html`・`sw.js` と Claude版はビルド前と同じ。`tools/smoke.py --line --android-inset 48` で、エラー0件、下のボタン・シートのすき間を確認ずみ。

## 保留・オーナーの判断待ち

- オーナーの準備（`docs/PROJECT.md` 10章の「オーナーの準備」）：
  1. ~~Cloudflare Pages を `Y-s-Apps/uchinoko-biyori` につなぐ~~ 済み（https://uchinoko-biyori.pages.dev/）
  2. LINE Developers でプロバイダーと LINEミニアプリチャネルを作り、開発用のエンドポイントURLを設定 → 開発用の LIFF ID をもらう
- LIFF ID がとどいたら `js_line.js` の `LINE_CFG.liffId` に入れて push し、iPhone と Android の LINE で見え方（下のボタン、上のヘッダー）を確かめてもらう。
- おたすけの「週に1回」の数え方は、いまは「前回から7日」。月曜〜日曜の区切りにする案は、オーナーが希望したら変える。

## 次にやること

- タスク2：Supabase で本人確認とセーブ。Supabase の組織 `Yuthy's`（無料プラン）には、いま「Yuthy's Project」（東京）が1つある。中身を確かめ、うちのこ日和用のプロジェクトを分けるか決める。IDトークンの検証 → 自前の会員ID → セッション、`sub` は別の表、サーバーでも `ensureState()` と同じ確かめ、引っこしコードの取りこみ口（写真の控えは受け取らない）。LINE版の CSP の `connect-src` に Supabase の URL を足す。
- AIの読みとり：Edge Function からAI（Claude）を呼ぶ。APIの鍵と1日の上限、確認の画面、AIを使わない選び方を残す。AIの利用料について、オーナーと予算を決める。
- タスク3：時計に頼る処理をサーバーへ（第1弾：おなか・ごきげん、おやつ30分5回、おみやげ、きょうのおねがい、連続記録とおたすけ）。
- そのあと：認証審査の準備（プライバシーポリシー、利用規約、アイコン130×130）、うちのこカード、公式アカウント。

## 気をつけること

- いま育てている子は「だいず」（クリームのポメラニアン、ホーム画面版）。セーブをこわす変更はしない（`CLAUDE.md` の「守ること」）。LINE版の変更でホーム画面版の `index.html` が変わっていないか、ビルドの前後で比べる。
- `index.html` は CSP のハッシュつきなので、手で直さず `sh src/build.sh` で作る。
- 組織 Y-s-Apps のほかの Pages サイトとは、セーブとキャッシュを共有する。LINE版は `y-s-apps.github.io` に置かない。
- iPhoneのSafariでは、SVGが枠の外へ動くと残像が出る。体ごと大きく動くアニメは `#petArt` に付ける。
- LIFF SDK は v2.20.0〜v2.31.0 に脆弱性があり、2026-11-24ごろ利用制限の予定。エッジパスのまま使う。
