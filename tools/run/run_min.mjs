/* うちのこラン：コースごとの「いちばん はやい タイム」を ルールで ほんとうに はしらせて はかり、js_rules.js の RUN.courses[*].min が それより おそく ないかを 確かめる。
 *   node tools/run/run_min.mjs        （ちがえば 終了コード 1）
 * RUN.min は 画面から くる タイムの 下の かぎり（これより はやい タイムは ありえないので、さいこう記録は これに 切る。P6 の サーバーでは
 * 「はしりだしてから これより はやく ゴールした」ら ほうびなし）。
 * - レース（P3）：ずっと ダッシュ・まがりかどは すぐ まがる・障害物は ジャンプ・砂は さける（src/run/wanrun/race-sim.js）。
 * - アジリティ（P4）：ミスなしで いちばん はやい 走り（ふつうの はやさ 11.25・スラロームは 8・シーソーは 4.2 で のって、とまって 1.2秒 まって すぐ タップ。
 *   src/run/wanrun/agility-sim.js）。タイムは 合計（走った タイム＋ミス×5秒）なので、わざと ミスして はやく 走っても（シーソーを よける など）
 *   合計は min より おそい ことも 確かめる。 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const here = path.dirname(new URL(import.meta.url).pathname), root = path.join(here, '..', '..');
const mod = f => import(pathToFileURL(path.join(root, 'src', 'run', 'wanrun', f)).href);
const { RaceSimulation, RACE } = await mod('race-sim.js');
const { AgilitySimulation, AGILITY } = await mod('agility-sim.js');
const { SEESAW, seesawHalfSpan } = await mod('seesaw.js');
const { SLALOM, slalomSide, slalomStart, slalomEnd } = await mod('slalom.js');

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

/* アジリティ：skip に 入れた しゅるいの 障害物は わざと はずす（よこの レーンを とおる）。lazy は なにも しない（ぜんぶ ミス） */
function agility(course, { skip = [], lazy = false } = {}){
  const sim = new AgilitySimulation(course);
  sim.start();
  const dt = 1 / 240;
  for (let i = 0; i < 1000 && sim.status === 'countdown'; i++) sim.step(dt);
  let guard = 0;
  while (sim.status === 'running' && guard++ < 240 * 300){
    const p = sim.player, o = sim.nextObstacle, board = sim.activeSeesaw, slalom = sim.activeSlalom;
    if (lazy){ if (sim.stopped) sim.input('dash'); }
    else if (board){
      const ph = board.state.phase;
      if (ph === 'approach' && !sim.stopped && p.s - board.obstacle.s >= SEESAW.stopFrom) sim.input('brake');
      else if (ph === 'ready' || (sim.stopped && ph === 'approach')) sim.input('dash');
    } else if (slalom){
      const i = slalom.state.index;
      if (i < SLALOM.count && !skip.includes('slalom')){ const want = slalomSide(slalom.obstacle, i); if (slalom.state.side !== want) sim.input(want < 0 ? 'left' : 'right'); }
    } else if (o){
      const lane = skip.includes(o.type) ? (o.lane === 0 ? 1 : 0) : o.lane;
      if (p.lane !== lane && !sim.rampPass && !sim.inTunnel()) sim.input(lane < p.lane ? 'left' : 'right');
      /* ハードル・わっか：まんなか（いちばん 高い ところ）で とおる ように */
      if ((o.type === 'hurdle' || o.type === 'hoop') && !skip.includes(o.type) && p.jumpElapsed === null && o.s - p.s > 0 && o.s - p.s <= RACE.jumpDuration / 2 * AGILITY.speed) sim.input('jump');
    }
    sim.step(dt);
    sim.drainEvents();
  }
  if (sim.status !== 'finished') throw new Error(course + ': ゴールしなかった');
  return sim.result;
}
/* ミスなしの 下の かぎり（式で）：ふつうの はやさで 走り、スラロームの はんい（4＋ポールの あいだ×5＋1.6）は 8、シーソー（いたの 長さ）は 4.2 と とまって まつ 1.2秒 */
function agilityBound(course){
  const lay = new AgilitySimulation(course).layout;
  let slow = 0, t = 0;
  for (const o of lay.obstacles){
    if (o.type === 'slalom'){ const z = slalomEnd(o) - slalomStart(o); slow += z; t += z / SLALOM.speed; }
    if (o.type === 'seesaw'){ const z = 2 * seesawHalfSpan(); slow += z; t += z / SEESAW.speed + SEESAW.hold + SEESAW.tipDuration; }
  }
  return t + (lay.length - slow) / AGILITY.speed;
}

const src = fs.readFileSync(path.join(root, 'src', 'js_rules.js'), 'utf8');
const minOf = course => { const m = src.match(new RegExp(`(?:'${course}'|${course}):\\{[^}]*min:(\\d+)`)); return m ? Number(m[1]) : NaN; };
let fails = 0;
for (const course of ['park', 'beach', 'forest']){
  const r = fastest(course), min = minOf(course);
  const okay = Number.isFinite(min) && min <= Math.floor(r.time * 1000) && min <= Math.floor(r.bound * 1000);
  if (!okay) fails++;
  console.log(`${okay ? '  ok  ' : '  FAIL'} ${course}: ずっと ダッシュ ${r.time.toFixed(3)}秒（ごつん ${r.hits}）・長さ÷ダッシュの はやさ ${r.bound.toFixed(3)}秒 → RUN.min ${min}`);
}
for (const course of ['first-field', 'zigzag', 'balance', 'hill-field']){
  const r = agility(course), bound = agilityBound(course), min = minOf(course);
  /* わざと ミス：はずせる しゅるいを 1つずつ・ぜんぶ・なにも しない */
  const types = [...new Set(new AgilitySimulation(course).layout.obstacles.map(o => o.type))];
  const tries = [...types.map(t => ({ skip:[t] })), { skip:types }, { lazy:true }].map(o => ({ o, r:agility(course, o) }));
  const worst = tries.reduce((a, b) => b.r.total < a.r.total ? b : a);
  const okay = Number.isFinite(min) && r.faults === 0 && min <= Math.floor(r.total * 1000) && min <= Math.floor(bound * 1000)
    && tries.every(x => x.r.faults > 0 && Math.floor(x.r.total * 1000) >= min);
  if (!okay) fails++;
  console.log(`${okay ? '  ok  ' : '  FAIL'} ${course}: ミスなしで いちばん はやい ${r.total.toFixed(3)}秒（ミス ${r.faults}）・式 ${bound.toFixed(3)}秒`
    + `・わざと ミス いちばん はやい 合計 ${worst.r.total.toFixed(3)}秒（${JSON.stringify(worst.o)}・ミス ${worst.r.faults}）→ RUN.min ${min}`);
}
process.exit(fails ? 1 : 0);
