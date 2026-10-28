# うちのこ日和：開発メモ（Claude向け）

スマホ向けのペット育成Webアプリです。写真の犬・猫をそっくりなイラストのペットにして、ごはん・おやつ・なでなでで、のんびり育てます。年齢、寿命、死はありません。

- 公開URL：https://y-s-apps.github.io/uchinoko-biyori/（オーナーはiPhoneのホーム画面に追加して毎日使っています）
- リポジトリ：GitHub の `Y-s-Apps/uchinoko-biyori`（組織 Y-s-Apps）。
- `main` ブランチのルートが、そのまま GitHub Pages で公開されます。
- 仕様、数値、決めたこと、更新履歴は `docs/PROJECT.md` にあります。作業の前にかならず読んでください。

## ファイル構成

| 場所 | 中身 |
| --- | --- |
| `src/head.html` | `<title>`、フォント、すべてのCSS（色はトークン＋ダークモード） |
| `src/body.html` | 画面のHTML（ヘッダー、おへや、メーター、下の5ボタン、シート、オンボーディング） |
| `src/home_head.html` | ホーム画面版だけの `<head>`（manifest、apple-touch-icon、safe-area） |
| `src/js_data.js` | 犬種・猫種（41種）、毛色スウォッチ、名前候補 |
| `src/js_data2.js` | Lv上限・関係の呼び名、おやつ（犬猫各18）とアイコン、きせかえ（38＋イベント10） |
| `src/js_data3.js` | げい、季節イベント、おみやげ（22）、もようがえ（5カテゴリ） |
| `src/js_pet.js` | ペットのSVG描画 `renderPet(look, {wear})` と色ユーティリティ |
| `src/js_wear.js` | きせかえの描画 `wearSvg()` |
| `src/js_app.js` | 状態 `S`、保存、ペットの動き、おせわ、シート、引っこしコード、`Game.start` |
| `src/js_features.js` | `ensureState`（セーブの移行）、おねがい、おたすけ、おみやげ、イベント、もようがえ、げい、アルバム |
| `src/js_onboard.js` | 写真から迎える流れ、種類・色・名前の編集、起動処理（boot） |
| `src/sw.js` | オフライン用のService Worker（`__VER__` はビルド時に置きかわる） |
| `src/build.sh` | 組み立て。`../index.html` と `../sw.js`（ホーム画面版）、`out/uchinoko-claude.html`（Claude版）を出力 |
| `src/icons/` | アイコンの元データ（1024px）と描画スクリプト |
| `tools/smoke.py` | スマホ幅での動作確認とスクリーンショット |
| ルートの `index.html` `sw.js` `manifest.webmanifest` `*.png` | 公開ファイル（ビルド結果なので手で直さない） |

JSは1つの `<script>` に `build.sh` の順でつなげられます。`const HOME = true/false` で、ホーム画面版とClaude版の差を切り替えます。

## 作業の流れ

1. `src/` だけを編集します。ルートの `index.html` は手で直しません。
2. `sh src/build.sh` を実行します。`node --check` 相当の構文チェックは、ビルド結果を `node --check` に通して確認します。
3. `python3 tools/smoke.py` で、スマホ幅（390×844）の主要画面を確認します。スクリーンショットを見て、ページエラーが0件であることを確かめます。
4. 日本語のコミットメッセージで `main` に push します。1〜2分で GitHub Pages に反映されます（Actions の「pages build and deployment」で確認できます）。
5. 仕様や決めたことが変わったら、`docs/PROJECT.md` の該当箇所と「更新履歴」も同じコミットで更新します。`docs/PROJECT.md` の先頭の「最終更新」の日付も、push のたびに更新します。
6. 最後に、オーナーへ「プロジェクトのナレッジで『Sync now』（同期）を押してください」と一言添えます。ナレッジは自動では更新されず、同期した時点の GitHub の中身に置きかわります。新しいフォルダをルートに足したときは、ナレッジのファイル選択にも追加してもらいます。

## 守ること

- **セーブをこわさない。** 保存データ `S` にフィールドを足すときは、`ensureState()` に既定値と移行を書きます。引っこしコードで運ぶものは `carryExtras()` にも足します。保存キー `uchinoko-biyori:v1` と引っこしコードの形式 `UCHINOKO2:<長さ>:<base64>` は変えません（`UCHINOKO1` も読めるまま残します）。端末の中には、毎日のひかえ `uchinoko-biyori:backup`（と `:backup-day`）と、読めなかったセーブの `uchinoko-biyori:broken` もあります。これらを消す処理は書きません。配列に上限をつけるときは、毎日たまるもの（スタンプなど）が何年使っても切れない大きさにします。
- **ドメインは共有。** `*.github.io` は、同じアカウント（組織）のほかの Pages サイトと localStorage と Service Worker のキャッシュを共有します。保存キーとキャッシュ名はアプリ名ではじめ、`localStorage.clear()` や、ほかのアプリのキャッシュを消す処理は書きません。
- **CSP。** ホーム画面版は CSP で、`index.html` の中のスクリプト1つと Google Fonts だけを読みこめます（ハッシュは `build.sh` が入れるので、`index.html` を手で直すと動かなくなります）。`onclick="…"` や `javascript:` は使わず `addEventListener` で書きます。外から読みこむものを足すときは `src/home_head.html` の CSP と `src/sw.js` もそろえ、`tools/smoke.py` で CSP の違反が0件か確かめます。
- **IDは消さない。** きせかえなどを入れ替えるときは、`WEAR_RENAMED` で古いIDを新しいIDへつなぎます。
- **スマホ優先。** 390px幅で横スクロールが出ないこと。タップしやすい大きさにします。iPhoneのSafariで残像が出るので、体ごと大きく動くアニメは `#petArt` に付けます（SVG内のグループで枠の外まで動かさない）。
- **文言。** やさしいひらがな多めにし、メインメニューの言葉にそろえます（例：「げい」「◯日」）。
- **色。** `head.html` の `:root` トークンを使い、ライトとダークの両方で読めるようにします。
- **デザイン。** 実在のチームやブランドのデザイン（ユニフォームなど）は再現しません。トリコロールの色づかいはOKです。
- **ポップアップ。** 画面全体を暗くして中央に出します（`Modal.show`）。同時に複数あるときは順番に出ます。
