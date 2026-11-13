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

console.log('こわれたセーブ（診断 2-1・1-7）');
{
  const bad = { v:1, pet:{ name:'', species:'xyz', breedId:'constructor', look:'?', photo:'javascript:x', colorName:7,
    wear:{ head:'constructor', face:['glasses_red'], neck:'__proto__' } }, stats:{}, counts:{}, events:{ got:['constructor', 'ev_santa', ['ev_santa']] },
    souv:{ have:{ constructor:3, __proto__:1 } }, last:T, created:T - 3 * D, updated:T };
  const fixed = ensureState(JSON.parse(JSON.stringify(bad)));
  ok(fixed.pet.species === 'dog' && fixed.pet.look.species === 'dog' && fixed.pet.breedId === 'mix_dog' && fixed.pet.name === 'うちのこ' && fixed.pet.photo === null && fixed.pet.colorName === '',
     '種類・品種・みため・名前を そろえる（犬・猫で ないと 犬に）', fixed.pet);
  ok(fixed.pet.wear.head === null && fixed.pet.wear.face === null && fixed.pet.wear.neck === null, 'きせかえは 知っている ID だけ（constructor・配列・__proto__ は はずす）', fixed.pet.wear);
  ok(JSON.stringify(fixed.events.got) === '["ev_santa"]', 'もらった きせかえも 知っている ID だけ', fixed.events.got);
  let threw = null;
  try { ev = []; Rules.act(fixed, 'open', {}, { away:0 }); Rules.act(fixed, 'feed', {}, {}); Rules.act(fixed, 'treat', { id:'bolo' }, {}); Rules.ensureDaily(fixed); } catch(e){ threw = String(e); }
  ok(!threw, 'こわれていた セーブでも ルールが 止まらない', threw);
  const cat = ensureState({ v:1, pet:{ name:'ねこ', species:'?', breedId:'?', look:{ species:'cat', breedId:'mix_cat' } }, stats:{}, counts:{} });
  ok(cat.pet.species === 'cat' && cat.pet.look.species === 'cat', '種類が こわれても みための 種類（ねこ）を つかう', cat.pet);
  const old = ensureState({ v:1, pet:{ name:'むかし', species:'dog', breedId:'shiba', acc:'bandana' }, stats:{}, counts:{} });
  ok(old.pet.look.breedId === 'shiba' && old.pet.wear.neck === 'bandana_red' && !('acc' in old.pet), 'look の ない 前の形の セーブも そろえる（前の アクセサリーも）', old.pet);
  const ren = ensureState({ v:1, pet:{ name:'り', species:'dog', breedId:'shiba', look:{ species:'dog', breedId:'shiba' }, wear:{ head:'bandana_red', face:null, neck:'scarf_stripe' } }, stats:{}, counts:{} });
  ok(ren.pet.wear.neck === 'scarf_brown' && ren.pet.wear.head === null, '名前の かわった きせかえは つなぐ・ちがう場所の きせかえは はずす', ren.pet.wear);
  const good = child();
  const before = JSON.stringify(good.pet);
  ensureState(good);
  ok(JSON.stringify(good.pet) === before, 'ふつうの セーブの ペットは かわらない', { before, after:good.pet });
  ok(!Rules.act(child(), 'dress', { slot:'head', id:'constructor' }).ok && !Rules.act(child(), 'dress', { slot:'head', id:['tiara'] }).ok, 'きせかえ：constructor や 配列の ID は ことわる');
}

console.log('時計が もどった日（診断 3-4）');
{
  T = Date.UTC(2026, 10, 20, 3, 0);
  st = child(); completeAll(st); nextDay(); completeAll(st); nextDay(); completeAll(st);
  const day3 = jst(T);
  ok(st.streak.n === 3 && st.streak.last === day3, 'れんぞく3', st.streak);
  T -= D;   /* 西への旅行・時計を手で 前の日に */
  ok(Rules.streakInfo(st).n === 3, 'もどった日も れんぞくの 表示は 3', Rules.streakInfo(st));
  completeAll(st);
  ok(st.streak.n === 3 && st.streak.last === day3, 'もどった日に ぜんぶ かなえても れんぞくは 3 のまま（前は 1 に もどった）', st.streak);
  T += D;   /* 時計が もとに もどる：同じ日を 2回 数えない */
  completeAll(st);
  ok(st.streak.n === 3, 'もとの日に もどって また かなえても 3（2回 数えない）', st.streak);
  nextDay(); completeAll(st);
  ok(st.streak.n === 4, 'つぎの日は 4', st.streak);
  st.streak.last = jst(T + 30 * D);   /* 前に 時計が ずっと先に なっていた */
  nextDay(); completeAll(st);
  ok(st.streak.n === 4 && st.streak.last === jst(T), 'ずっと先の 日付が のこっていても れんぞくは そのまま、きょうから つづける', st.streak);
  nextDay(); completeAll(st);
  ok(st.streak.n === 5, 'つぎの日は 5', st.streak);
}

console.log('2月29日に むかえた子の 記念日（診断 3-5）');
{
  const born = Date.UTC(2028, 1, 29, 3, 0);   /* 2028-02-29 12:00 日本時間（うるう年） */
  st = child(); st.created = born; st.milestones = {};
  T = Date.UTC(2029, 1, 27, 3, 0); ev = []; Rules.open(st, 0, ev);
  ok(!ev.some(e => e.k === 'anniv'), '2029-02-27 は まだ', ev.filter(e => e.k === 'anniv'));
  T = Date.UTC(2029, 1, 28, 3, 0); ev = []; Rules.open(st, 0, ev);
  ok(ev.some(e => e.k === 'anniv' && e.years === 1) && st.milestones.anniv1, 'うるう年でない年は 2/28 が 記念日（1年）', ev.filter(e => e.k === 'anniv'));
  T = Date.UTC(2032, 1, 28, 3, 0); ev = []; Rules.open(st, 0, ev);
  ok(!ev.some(e => e.k === 'anniv'), 'うるう年（2032）の 2/28 は まだ', ev.filter(e => e.k === 'anniv'));
  T = Date.UTC(2032, 1, 29, 3, 0); ev = []; Rules.open(st, 0, ev);
  ok(ev.some(e => e.k === 'anniv' && e.years === 4), 'うるう年は 2/29 が 記念日（4年）', ev.filter(e => e.k === 'anniv'));
  st = child(); st.created = Date.UTC(2027, 2, 1, 3, 0); st.milestones = {};
  T = Date.UTC(2028, 1, 29, 3, 0); ev = []; Rules.open(st, 0, ev);
  ok(!ev.some(e => e.k === 'anniv'), '3/1 に むかえた子は 2/29 では ない', ev.filter(e => e.k === 'anniv'));
}

console.log('ピンチの日の 引っこしコード（診断 3-6）');
{
  const pinchChild = () => {
    T = Date.UTC(2026, 10, 2, 3, 0);
    const s = child(); completeAll(s); nextDay(); completeAll(s); nextDay(); completeAll(s);
    nextDay(2);   /* 1日 おやすみ */
    const e = []; Rules.open(s, 0, e);
    completeAll(s, false);   /* いつもの3つだけ：れんぞく3 を まつ */
    return s;
  };
  const code = s => { const b = Buffer.from(JSON.stringify(s)).toString('base64'); return 'UCHINOKO2:' + b.length + ':' + b; };
  st = pinchChild();
  ok(st.streak.saved && st.streak.saved.n === 3, 'ピンチ：れんぞく3 を まっている', st.streak);
  let moved = g.readMoveCode(code(st)).st;
  ok(moved && moved.streak.saved && moved.streak.saved.n === 3 && moved.streak.saved.day === jst(T), 'まっている れんぞくも 運ぶ（前は 運ばれず 1 に）', moved && moved.streak);
  ev = completeAll(moved, true);
  ok(moved.streak.n === 4 && !moved.streak.saved && ev.some(e => (e.k === 'rescue' || e.k === 'all') && e.bridged), '運んだ先で おたすけを かなえると れんぞく4 に つながる', { streak:moved.streak, ev:ev.filter(e => e.k === 'all' || e.k === 'rescue') });
  /* おたすけを 先に かなえてから いつもの3つ */
  moved = g.readMoveCode(code(pinchChild())).st;
  Rules.ensureDaily(moved);
  const rq = moved.daily.rescue, list = moved.daily.list;
  moved.daily.list = [];   /* おたすけだけ 先に */
  completeAll(moved, true);
  moved.daily.list = list;
  ok(rq.done && !moved.daily.all && moved.streak.saved, 'おたすけを 先に かなえた（まだ つながらない）', moved.streak);
  ev = completeAll(moved, false);
  ok(moved.streak.n === 4 && !moved.streak.saved && ev.some(e => e.k === 'all' && e.bridged), 'あとから いつもの3つで れんぞく4 に つながる', { streak:moved.streak, ev:ev.filter(e => e.k === 'all') });
  /* つぎの日に 運ぶと、まっている れんぞくは もう ない（ensureState が きょうの分だけ のこす） */
  st = pinchChild(); const c2 = code(st); nextDay();
  moved = g.readMoveCode(c2).st;
  ok(moved && !moved.streak.saved, 'つぎの日に 読みこむと、まっている れんぞくは のこらない', moved && moved.streak);
}

console.log('ホーム画面版：おたすけは1日おき（src/build.sh の HOME_RESCUE_EVERY で RESCUE_EVERY を置きかえる）');
{
  const fs = await import('node:fs');
  const every = Number((fs.readFileSync(path.join(here, '..', 'src', 'build.sh'), 'utf8').match(/^HOME_RESCUE_EVERY=(\d+)$/m) || [])[1]);
  const src = fs.readFileSync(path.join(here, '..', 'supabase', 'functions', 'api', 'game.js'), 'utf8');
  /* build.sh と同じく、RESCUE_EVERY を置きかえて、ホーム画面版だけの js_home.js（HomeRescue）を足す */
  const homeJs = fs.readFileSync(path.join(here, '..', 'src', 'js_home.js'), 'utf8');
  const homeSrc = src.replace(/^const RESCUE_EVERY = 7;$/m, `const RESCUE_EVERY = ${every};`).replace(/^export \{ /m, homeJs + '\nexport { HomeRescue, ');
  ok(every === 2 && /^const RESCUE_EVERY = 2;$/m.test(homeSrc), 'ホーム画面版は2日に1回（ほかの版とサーバーは7日に1回）', every);
  const h = await import('data:text/javascript;base64,' + Buffer.from(homeSrc).toString('base64'));
  ({ Rules, Clock, ensureState, newState } = h);
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

  console.log('ホーム画面版：前のルール（7日に1回）で れんぞくが1にもどった日に、おたすけを出しなおす（HomeRescue）');
  const n0 = st.streak.n;               /* いま れんぞく5（おととい まで） */
  nextDay(); completeAll(st);           /* れんぞく6 */
  nextDay(2);                           /* きのう おやすみ。前のおたすけから3日 */
  /* 前の版で ひらいて3つを かなえた あとの形：おたすけは出ず、れんぞくは1、とぎれたお知らせは出した */
  st.daily = Rules.genDaily(st, jst(T));
  st.daily.list.forEach(r => { r.got = r.n; r.done = true; });
  st.daily.all = true; st.daily.rescueNoticed = true;
  st.stamps.push(jst(T)); st.streak.n = 1; st.streak.last = jst(T);
  ev = []; Rules.open(st, 0, ev);
  ok(st.streak.saved && st.streak.saved.n === n0 + 1 && st.daily.rescue && ev.some(e => e.k === 'pinch' && e.n === n0 + 1) && Rules.reqLeft(st) === 1,
     `ひらくと ピンチのお知らせと おたすけ（れんぞく${n0 + 1}日の記録を まつ）`, { streak:st.streak, ev });
  ev = []; Rules.open(st, 0, ev);
  ok(!ev.some(e => e.k === 'pinch') && st.streak.saved.n === n0 + 1, 'もう一度 ひらいても かわらない', { streak:st.streak, ev });
  ev = completeAll(st, true);
  ok(st.streak.n === n0 + 2 && !st.streak.saved && st.rescued.includes(jst(T - D)) && ev.some(e => e.k === 'rescue' && e.bridged), `おたすけを かなえると れんぞく${n0 + 2}日に つながる`, { streak:st.streak });
  ok(!h.HomeRescue.fix(st), 'つないだあとは 当てはまらない');
  /* 2日 おやすみしたときは 出さない */
  nextDay(3);
  st.daily = Rules.genDaily(st, jst(T));
  st.daily.list.forEach(r => { r.got = r.n; r.done = true; });
  st.daily.all = true; st.stamps.push(jst(T)); st.streak.n = 1; st.streak.last = jst(T);
  ok(!h.HomeRescue.fix(st) && !st.streak.saved, '2日 おやすみしたときは 出さない', st.streak);
}

console.log(fails ? `\n${fails} FAILED` : '\nall passed');
process.exit(fails ? 1 : 0);
