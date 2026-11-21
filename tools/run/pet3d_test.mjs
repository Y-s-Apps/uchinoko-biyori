/* うちのこラン（仮）P1：3D の うちのこ（src/run/pet3d.js）を ぜんぶの 子で 作って 確かめる。
 *   node tools/run/pet3d_test.mjs     （はじめに cd tools/run && npm install）
 * - esbuild で pet3d.js と Three.js を 1つに まとめて よみこむ（P2 の まとめる しくみと 同じ 道。古い iPhone の Safari に あわせる）
 * - 41しゅるい × くびの きせかえ（なし＋くびの 全しゅるい）で 作れる・位置に NaN が ない・足 4本（hip・phase・paw）・しっぽ
 * - 立っている ときと 走っている ときに、地面に ついている 足の うらが y = 0（わんランの poseLegs と 同じ 計算）
 * - こわれた みため（normalizeLook を とおした もの）でも 作れる・disposePet3D で ぜんぶ 片づく
 * - 三角形の 数（重さの めやす） */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { pathToFileURL } from 'node:url';

const here = path.dirname(new URL(import.meta.url).pathname), root = path.join(here, '..', '..');
const esbuild = await import(pathToFileURL(path.join(here, 'node_modules', 'esbuild', 'lib', 'main.js')).href).then(m => m.default || m);

/* アプリの データと normalizeLook（ふつうの スクリプトなので vm で） */
const ctx = vm.createContext({ console });
const app = ['js_data.js', 'js_data2.js', 'js_data3.js', 'js_pet.js', 'js_wear.js'].map(f => fs.readFileSync(path.join(root, 'src', f), 'utf8')).join('\n');
vm.runInContext(app + '\n;globalThis.__app = { BREEDS, BREED_BY_ID, WEAR, WEAR_BY_ID, normalizeLook };', ctx);
const { BREEDS, WEAR, WEAR_BY_ID, normalizeLook } = ctx.__app;

/* pet3d.js ＋ three を まとめる */
const out = await esbuild.build({
  entryPoints: [path.join(root, 'src', 'run', 'pet3d.js')], bundle: true, format: 'esm', write: false, minify: true,
  target: ['safari14'], nodePaths: [path.join(here, 'node_modules')], logLevel: 'silent',
});
const code = out.outputFiles[0].text;
const tmp = path.join(os.tmpdir(), 'uchinoko-pet3d-test.mjs');
fs.writeFileSync(tmp, code);
const P3 = await import(pathToFileURL(tmp).href);
const T = await import(pathToFileURL(path.join(here, 'node_modules', 'three', 'build', 'three.module.js')).href);

let fails = 0, checks = 0;
const ok = (c, label, info) => { checks++; if (!c){ fails++; console.log('  FAIL ' + label, info === undefined ? '' : JSON.stringify(info).slice(0, 300)); } };
console.log(`まとめた ファイル（pet3d.js＋Three.js の 使う ところ、minify）：${(code.length / 1024).toFixed(0)} KB`);

const neckKinds = [];
for (const w of WEAR) if (w.slot === 'neck' && !neckKinds.some(x => x.kind === w.kind && JSON.stringify(x.p) === JSON.stringify(w.p) && x.kind !== 'scarf' && x.kind !== 'bell')) neckKinds.push(w);
const box = new T.Box3(), v = new T.Vector3();
let maxTris = 0, maxDraws = 0, maxName = '';
function stats(pet){
  let tris = 0, draws = 0, nan = false;
  pet.traverse(o => {
    if (!o.isMesh) return;
    draws++;
    const g = o.geometry, p = g.attributes.position;
    tris += (g.index ? g.index.count : p.count) / 3;
    for (let i = 0; i < p.count; i++) if (!Number.isFinite(p.getX(i) + p.getY(i) + p.getZ(i))){ nan = true; break; }
  });
  return { tris, draws, nan };
}
// 足の うらの いちばん 低い ところ（ワールド）
function soles(pet){
  pet.updateMatrixWorld(true);
  return pet.userData.legs.map(leg => { box.setFromObject(leg.userData.paw); return box.min.y; });
}
function check(name, look, wear){
  let pet;
  try { pet = P3.makePet3D(look, wear); } catch (e){ ok(false, `${name}：作れる`, String(e && e.stack || e)); return; }
  const s = stats(pet);
  ok(!s.nan, `${name}：位置に NaN が ない`);
  const legs = pet.userData.legs;
  ok(Array.isArray(legs) && legs.length === 4 && legs.every(l => l.userData.hip && typeof l.userData.phase === 'number' && l.userData.paw), `${name}：足 4本`);
  ok(pet.userData.tail && pet.userData.height > 0, `${name}：しっぽ・こしの 高さ`);
  P3.posePet3D(pet, 0, false, { reduced: true });
  const stand = soles(pet);
  ok(stand.every(y => Math.abs(y) < .012), `${name}：立つと 足の うらが 地面`, stand);
  for (let k = 0; k < 8; k++){
    P3.posePet3D(pet, k * .1, true, { phase: k * .42 });
    const run = soles(pet), low = Math.min(...run);
    ok(low > -.02 && low < .02, `${name}：走ると 足の どれかが 地面（${k}）`, run);
    ok(run.every(y => y > -.03), `${name}：走っても 地面に もぐらない（${k}）`, run);
  }
  pet.updateMatrixWorld(true); box.setFromObject(pet);
  ok(box.max.y < 1.9 && box.min.y > -.05 && box.max.x - box.min.x < 1.6, `${name}：大きさが ふつう`, [box.min.toArray(), box.max.toArray()]);
  if (s.tris > maxTris){ maxTris = s.tris; maxName = name; }
  maxDraws = Math.max(maxDraws, s.draws);
  P3.disposePet3D(pet);
  ok(!pet.parent, `${name}：片づく`);
}

for (const b of BREEDS){
  const look = normalizeLook(Object.assign({ species: b.sp, breedId: b.id }, b.look));
  check(b.ja, look, null);
  for (const w of neckKinds) check(`${b.ja}＋${w.ja}`, look, w);
}
// こわれた みため・知らない 品種・ねこで 犬の 形など（normalizeLook が そろえる）
for (const raw of [{}, { species: 'cat' }, { species: 'cat', breedId: 'shiba', ear: 'long', coat: 'curly', tail: 'curl' }, { species: 'dog', ear: 'fold', coat: 'long', legs: 'short', tail: 'fluffy', face: 'hachiware', colors: { main: '#000', eye: 'red' }, marks: { stripes: '#fff', spots: '#123456', bodyPatch: true, patchL: '#f00' } }, { breedId: '__proto__', colors: { main: 'x' } }]){
  check('こわれた みため ' + JSON.stringify(raw).slice(0, 40), normalizeLook(raw), WEAR_BY_ID.scarf_tri);
}
// ふつうの 重さ（くびの きせかえ なし）と、おともだち用の かるい 形（detail 0.6）
for (const d of [1, .6]){
  let sum = 0, draws = 0;
  for (const b of BREEDS){ const pet = P3.makePet3D(normalizeLook(Object.assign({ species: b.sp, breedId: b.id }, b.look)), null, { detail: d }); const s = stats(pet); sum += s.tris; draws += s.draws; P3.disposePet3D(pet); }
  console.log(`detail ${d}：1ぴき 平均 三角形 ${Math.round(sum / BREEDS.length)}・描く 回数 ${(draws / BREEDS.length).toFixed(1)}`);
}
console.log(`いちばん 重い 子：${maxName}（三角形 ${Math.round(maxTris)}・描く 回数 ${maxDraws}）`);
console.log(fails ? `FAIL ${fails} / ${checks}` : `ok ${checks} こ`);
process.exit(fails ? 1 : 0);
