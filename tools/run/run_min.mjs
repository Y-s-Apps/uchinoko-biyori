/* うちのこラン：コースごとの「いちばん はやい タイム」（ずっと ダッシュ・まがりかどは すぐ まがる・障害物は ジャンプ・砂は さける）を
 * レースの ルール（src/run/wanrun/race-sim.js）で はしらせて はかり、js_rules.js の RUN.courses[*].min が それより おそく ないかを 確かめる。
 *   node tools/run/run_min.mjs        （ちがえば 終了コード 1）
 * RUN.min は 画面から くる タイムの 下の かぎり（これより はやい タイムは ありえないので、さいこう記録は これに 切る。P6 の サーバーでは
 * 「はしりだしてから これより はやく ゴールした」ら ほうびなし）。 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const here = path.dirname(new URL(import.meta.url).pathname), root = path.join(here, '..', '..');
const { RaceSimulation, RACE } = await import(pathToFileURL(path.join(root, 'src', 'run', 'wanrun', 'race-sim.js')).href);

function fastest(course){
  const sim = new RaceSimulation(course);
  sim.start();
  const dt = 1 / 120;
  for (let i = 0; i < 400; i++) sim.step(dt);            /* 3・2・1 */
  let guard = 0;
  while (sim.status === 'running' && guard++ < 120 * 120){
    const p = sim.player;
    p.boost = RACE.boostDuration;                          /* ずっと ダッシュ */
    const cue = sim.turnCue;
    if (cue && cue.active && !cue.armed) sim.input(cue.direction);
    if (!(cue && cue.active) && p.lane !== 0) sim.input(p.lane > 0 ? 'left' : 'right');
    const next = sim.layout.obstacles.find(o => o.s > p.s && o.s - p.s < 2.6 && Math.abs(p.x - o.lane * RACE.lanewidth) < 1.2);
    if (next && next.type !== 'tunnel' && p.jumpElapsed === null) sim.input('jump');
    sim.step(dt);
    sim.drainEvents();
  }
  if (sim.status !== 'finished') throw new Error(course + ': ゴールしなかった');
  return { time:sim.result.time, hits:sim.result.hits, bound:sim.layout.length / RACE.boostSpeed };
}

const src = fs.readFileSync(path.join(root, 'src', 'js_rules.js'), 'utf8');
let fails = 0;
for (const course of ['park', 'beach', 'forest']){
  const r = fastest(course);
  const m = src.match(new RegExp(course + ':\\{[^}]*min:(\\d+)'));
  const min = m ? Number(m[1]) : NaN;
  const okay = Number.isFinite(min) && min <= Math.floor(r.time * 1000) && min <= Math.floor(r.bound * 1000);
  if (!okay) fails++;
  console.log(`${okay ? '  ok  ' : '  FAIL'} ${course}: ずっと ダッシュ ${r.time.toFixed(3)}秒（ごつん ${r.hits}）・長さ÷ダッシュの はやさ ${r.bound.toFixed(3)}秒 → RUN.min ${min}`);
}
process.exit(fails ? 1 : 0);
