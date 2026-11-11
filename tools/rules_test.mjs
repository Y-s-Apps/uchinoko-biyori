/* おせわのルール（src/js_rules.js。サーバー用の game.js に入っているもの）を、時計を動かして確かめる。
 *   node tools/rules_test.mjs   （python3 tools/line_e2e.py からも動く）
 * 日をまたぐもの：れんぞく記録、おたすけ（1日だけ空いたとき、7日に1回。ホーム画面版は1日おき）、2日あいたとき、季節のイベント、記念日、
 * おみやげの1日3回、げいのなかよしの1日10、なでなでのなかよしの回復。日付は日本時間。 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const g = await import(pathToFileURL(path.join(here, '..', 'supabase', 'functions', 'api', 'game.js')).href);
let { Rules, Clock, ensureState, newState } = g;   /* さいごに ホーム画面版のルールに入れかえて確かめる */

let T = Date.UTC(2026, 10, 2, 3, 0);   /* 2026-11-02 12:00 日本時間 */
let seed = 7;
Clock.now = () => T;
Clock.rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
const H = 3600e3, D = 24 * H;
const jst = ms => new Date(ms + 9 * H).toISOString().slice(0, 10);

let fails = 0;
const ok = (c, label, info) => { if (c) console.log('  ok   ' + label); else { fails++; console.log('  FAIL ' + label, info === undefined ? '' : JSON.stringify(info).slice(0, 300)); } };

function child(love = 600){
  const st = ensureState(newState({ name:'ルール', species:'dog', breedId:'pomeranian', look:{ species:'dog', breedId:'pomeranian' }, photo:null, colorName:'', wear:{ head:null, face:null, neck:null } }, T - 40 * D));
  st.stats.love = love;
  st.tricks = { sit:{ p:3, ok:true } };
  return st;
}
const budget = { left:12, t:T };
const act = (st, type, p = {}) => Rules.act(st, type, p, { budget, away:0 });
/* きょうのおねがいを ぜんぶ（おたすけがあれば それも）かなえる */
function completeAll(st, withRescue = true){
  const ev = [];
  Rules.ensureDaily(st);
  const reqs = st.daily.list.concat(withRescue && st.daily.rescue ? [st.daily.rescue] : []);
  for (const r of reqs){
    let guard = 0;
    while (!r.done && guard++ < 40){
      st.stats.full = 50; st.last = T; st.recentTreats = [];
      let res;
      if (r.type === 'meal') res = act(st, 'feed');
      else if (r.type === 'treat') res = act(st, 'treat', { id:'bolo' });
      else if (r.type === 'treatId') res = act(st, 'treat', { id:r.id });
      else if (r.type === 'play') res = act(st, 'play');
      else if (r.type === 'pet') res = act(st, 'pet', { n:5 });
      else if (r.type === 'trick') res = act(st, 'trick', { id:'sit' });
      else if (r.type === 'dress') res = act(st, 'dress', { slot:'neck', id:st.pet.wear.neck === 'bandana_red' ? 'bell_blue' : 'bandana_red' });
      else if (r.type === 'room') res = act(st, 'room', { cat:'rug', id:st.room.rug === 'none' ? 'blue' : 'none' });
      ev.push(...(res.ev || []), ...(res.after || []));
    }
  }
  return ev;
}
const nextDay = (k = 1) => { T += k * D; };

console.log('れんぞく記録');
let st = child();
let ev = completeAll(st);
ok(st.daily.all && st.streak.n === 1 && st.stamps.includes(jst(T)) && ev.some(e => e.k === 'all'), '1日め：ぜんぶかなえるとスタンプ、れんぞく1', st.streak);
nextDay(); completeAll(st);
ok(st.streak.n === 2 && st.streak.best === 2, '2日め：れんぞく2', st.streak);

console.log('おたすけ（1日だけ空いたとき）');
nextDay(2);   /* 1日おやすみ */
ev = []; Rules.open(st, 0, ev);
ok(st.daily.rescue && ev.some(e => e.k === 'pinch' && e.n === 2), 'ピンチのお知らせと、おたすけのおねがい', ev);
ok(Rules.streakInfo(st).pinch, 'れんぞくは ピンチ表示');
ev = completeAll(st, false);
ok(st.streak.saved && st.streak.saved.n === 2 && ev.some(e => e.k === 'all' && e.waiting), 'いつもの3つだけ：記録をとっておいて、おたすけを まつ', st.streak);
ev = completeAll(st, true);
ok(st.streak.n === 3 && !st.streak.saved && st.rescued.includes(jst(T - D)) && ev.some(e => e.k === 'rescue' && e.bridged), 'おたすけもかなえると つながる（れんぞく3、空いた日に おたすけスタンプ）', { streak:st.streak, rescued:st.rescued });

console.log('おたすけは7日に1回');
nextDay(); completeAll(st);
nextDay(2);   /* また1日おやすみ（前のおたすけから3日） */
ev = []; Rules.open(st, 0, ev);
ok(!st.daily.rescue && ev.some(e => e.k === 'broke' && e.next), '7日たっていない：とぎれたお知らせ（つぎに使える日つき）', ev);
completeAll(st);
ok(st.streak.n === 1, 'れんぞくは1から', st.streak);
nextDay(); completeAll(st); nextDay(); completeAll(st); nextDay(); completeAll(st);
nextDay(2);
ev = []; Rules.open(st, 0, ev);
ok(st.daily.rescue && ev.some(e => e.k === 'pinch'), '前のおたすけから7日たつと、また使える', { last:Rules.lastRescueDay(st), today:jst(T) });

console.log('2日いじょう あいたとき');
st = child(); completeAll(st); nextDay(); completeAll(st);
nextDay(3);
ev = []; Rules.open(st, 0, ev);
ok(!st.daily.rescue && !ev.some(e => e.k === 'pinch' || e.k === 'broke') && Rules.streakInfo(st).n === 0, 'おたすけは出ない、れんぞくは0', Rules.streakInfo(st));

console.log('日付は日本時間');
st = child();
T = Date.UTC(2026, 10, 10, 14, 59);   /* 23:59 日本時間 */
Rules.ensureDaily(st);
const d1 = st.daily.day;
T = Date.UTC(2026, 10, 10, 15, 1);    /* 0:01 日本時間（UTC ではまだ同じ日） */
Rules.ensureDaily(st);
ok(d1 === '2026-11-10' && st.daily.day === '2026-11-11', '0時（日本時間）で つぎの日のおねがい', [d1, st.daily.day]);

console.log('おみやげ・げい・なでなで');
st = child();
let n = 0;
for (let i = 0; i < 5; i++){ ev = []; Rules.open(st, 4 * H, ev); n += ev.filter(e => e.k === 'souv').length; }
ok(n === 3 && st.souv.n === 3, 'おみやげは1日3回まで', st.souv);
nextDay(); ev = []; Rules.open(st, 13 * H, ev);
ok(ev.some(e => e.k === 'souv' && e.bonus === 4), 'つぎの日は また もらえる（12時間いじょうで♥+4）', ev);
st = child();
const love0 = st.stats.love;
for (let i = 0; i < 15; i++){ st.stats.full = 50; act(st, 'trick', { id:'sit' }); }
ok(st.trickDay.love === 10 && st.stats.love >= love0 + 10, 'げいのなかよしは1日10まで', st.trickDay);
nextDay(); st.stats.full = 50; st.last = T; act(st, 'trick', { id:'sit' });
ok(st.trickDay.love === 1 && st.trickDay.day === jst(T), 'つぎの日は また0から', st.trickDay);
st = child();
const b = { left:12, t:T };
const l0 = st.stats.love;
Rules.act(st, 'pet', { n:20 }, { budget:b });
const l1 = st.stats.love;
T += 9 * 60e3;
Rules.act(st, 'pet', { n:20 }, { budget:b });
ok(Math.abs((l1 - l0) - 7.2) < .01 || l1 - l0 > 7.2, 'なでなで：12回分まで', l1 - l0);
ok(st.stats.love - l1 >= 1.8 - 1e-9, '9分で3回分たまる', st.stats.love - l1);

console.log('季節のイベント・記念日');
st = child();
T = Date.UTC(2026, 11, 1, 3, 0);    /* 12/1 クリスマス */
ev = []; Rules.open(st, 0, ev);
ok(ev.some(e => e.k === 'event' && e.id === 'christmas' && !e.had) && st.events.got.includes('ev_santa'), 'クリスマスのプレゼント', ev);
ev = []; Rules.open(st, 0, ev);
ok(!ev.some(e => e.k === 'event'), '同じ年は1回だけ');
ok(Rules.act(st, 'dress', { slot:'head', id:'ev_santa' }).ok, 'もらったきせかえは つけられる');
ok(Rules.treatList(st)[0].id === 'ev_xmascake', '限定のおやつが先頭');
T = Date.UTC(2027, 11, 3, 3, 0);
ev = []; Rules.open(st, 0, ev);
ok(ev.some(e => e.k === 'event' && e.had), 'つぎの年も お知らせ（プレゼントは もっている）', ev);
T = Date.UTC(2027, 11, 26, 3, 0);
ok(!Rules.treatList(st).some(t => t.ev), 'イベントが おわると限定のおやつは出ない');
st = child();
st.created = T - 365 * D;   /* 1年まえの きょう（日本時間） */
st.milestones = {};
ev = []; Rules.open(st, 0, ev);
ok(ev.some(e => e.k === 'anniv' && e.years === 1) && st.milestones.days300 && st.milestones.anniv1, 'うちのこ記念日と、日数のアルバム', ev);

console.log('ホーム画面版：おたすけは1日おき（src/build.sh の HOME_RESCUE_EVERY で RESCUE_EVERY を置きかえる）');
{
  const fs = await import('node:fs');
  const every = Number((fs.readFileSync(path.join(here, '..', 'src', 'build.sh'), 'utf8').match(/^HOME_RESCUE_EVERY=(\d+)$/m) || [])[1]);
  const src = fs.readFileSync(path.join(here, '..', 'supabase', 'functions', 'api', 'game.js'), 'utf8');
  const homeSrc = src.replace(/^const RESCUE_EVERY = 7;$/m, `const RESCUE_EVERY = ${every};`);
  ok(every === 2 && homeSrc !== src, 'ホーム画面版は2日に1回（ほかの版とサーバーは7日に1回）', every);
  ({ Rules, Clock, ensureState, newState } = await import('data:text/javascript;base64,' + Buffer.from(homeSrc).toString('base64')));
  Clock.now = () => T;
  Clock.rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  T = Date.UTC(2026, 10, 2, 3, 0);
  st = child(); completeAll(st); nextDay(); completeAll(st);
  for (let i = 0; i < 3; i++){
    nextDay(2);   /* 前のおたすけの つぎの日は おやすみ */
    ev = []; Rules.open(st, 0, ev);
    const pinch = !!st.daily.rescue && ev.some(e => e.k === 'pinch') && !ev.some(e => e.k === 'broke');
    completeAll(st, true);
    ok(pinch && st.streak.n === 3 + i && st.rescued.includes(jst(T - D)), `${i + 1}回め：1日おやすみ → つぎの日の おたすけで つながる（れんぞく${3 + i}）`, { pinch, streak:st.streak, rescued:st.rescued });
  }
  ok(Rules.nextRescueDay(st) === jst(T + 2 * D), 'つぎに使えるのは あさって', { next:Rules.nextRescueDay(st), today:jst(T) });
}

console.log(fails ? `\n${fails} FAILED` : '\nall passed');
process.exit(fails ? 1 : 0);
