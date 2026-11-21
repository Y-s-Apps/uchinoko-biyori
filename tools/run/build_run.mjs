/* うちのこラン（仮）：src/run/ の ゲームと Three.js を 1つの ファイル src/run_bundle.js に まとめる（docs/RUN_DESIGN.md 5章）。
 *
 *   node tools/run/build_run.mjs           # src/run_bundle.js を 作りなおす
 *   node tools/run/build_run.mjs --check   # 作りなおして いまの src/run_bundle.js と 同じか（ちがえば 終了コード 1）
 *
 * はじめに cd tools/run && npm install（Three.js r170・esbuild 0.24.2。lockfile で 固定）。
 * src/run_bundle.js は コミットする（Cloudflare・GitHub Pages の ビルドで npm を 動かさない ため。game.js と 同じ 考え方）。手で 直さない。
 * build.sh が これを run-<ハッシュ>.js として ホーム画面版に 出す（RUN_HOME=1）。
 * - iife（名前は ぜんぶ 中に とじる。外に 出すのは window.UchinokoRun だけ）・minify・target safari14（古い iPhone。Object.hasOwn などは 書かない）
 * - Three.js の 著作権と ライセンス（MIT）の 表示は ファイルの さいごに のこす（legalComments: eof） */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const here = path.dirname(new URL(import.meta.url).pathname), root = path.join(here, '..', '..');
const out = path.join(root, 'src', 'run_bundle.js');
const mod = path.join(here, 'node_modules');
if (!fs.existsSync(path.join(mod, 'esbuild')) || !fs.existsSync(path.join(mod, 'three'))){
  console.error('esbuild・three が ありません：cd tools/run && npm install');
  process.exit(2);
}
const esbuild = await import(pathToFileURL(path.join(mod, 'esbuild', 'lib', 'main.js')).href).then(m => m.default || m);
const three = JSON.parse(fs.readFileSync(path.join(mod, 'three', 'package.json'), 'utf8')).version;
const banner = `/* うちのこ日和：うちのこラン（仮）の ゲーム（src/run/）と Three.js ${three}（MIT。ライセンスの 表示は さいご）を まとめた もの。
 * tools/run/build_run.mjs が 作る。手で 直さない（docs/RUN_DESIGN.md）。 */`;

const res = await esbuild.build({
  entryPoints:[path.join(root, 'src', 'run', 'main.js')],
  bundle:true, format:'iife', globalName:'UchinokoRun', minify:true, target:['safari14'],
  nodePaths:[mod], legalComments:'eof', banner:{ js:banner }, write:false, logLevel:'warning',
});
const code = res.outputFiles[0].text;
if (process.argv.includes('--check')){
  const now = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
  if (now !== code){
    console.error('src/run_bundle.js が src/run/ と あっていません：node tools/run/build_run.mjs で 作りなおして コミットしてね');
    process.exit(1);
  }
  console.log(`ok：src/run_bundle.js は src/run/ と 同じ（${(code.length / 1024).toFixed(0)} KB）`);
} else {
  fs.writeFileSync(out, code);
  console.log(`src/run_bundle.js（${(code.length / 1024).toFixed(0)} KB・Three.js ${three}）`);
}
