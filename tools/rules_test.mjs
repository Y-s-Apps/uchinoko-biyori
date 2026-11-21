/* おせわのルール（src/js_rules.js。サーバー用の game.js に入っているもの）を、時計を動かして確かめる。
 *   node tools/rules_test.mjs   （python3 tools/line_e2e.py からも動く）
 * 日をまたぐもの：れんぞく記録、おたすけ（1日だけ空いたとき、7日に1回。ホーム画面版は1日おき）、2日あいたとき、季節のイベント、記念日、
 * おみやげの1日3回、げいのなかよしの1日10、なでなでのなかよしの回復、パズルの ほうびの1日3回。日付は日本時間。 */
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

console.log('パズル（2026-11-15）：ほうびは クリアしたかだけ・1日3回・日本時間の0時で もどる・さいこう点は のこる');
{
  const { Puzzle, PUZZLE } = g;
  /* 手が なくなるまで いちばん 多く けせる手を えらぶ（クリアしたい）／いちばん 少ない手（クリアしにくい） */
  const solve = (seed, most = true) => {
    const pz = Puzzle.start(seed), moves = [];
    while (!pz.end){
      let pickC = -1, pickN = most ? -1 : 99;
      for (let c = 0; c < 2 * PUZZLE.w * PUZZLE.w; c++){
        const pr = Puzzle.pair(c); if (!pr) continue;
        const n = Puzzle.lines(Puzzle.swapped(pz.b, pr[0], pr[1])).length;
        if (n && (most ? n > pickN : n < pickN)){ pickN = n; pickC = c; }
      }
      Puzzle.move(pz, pickC); moves.push(pickC);
    }
    return { moves, clear:pz.clear, score:pz.score };
  };
  /* つぎの 1回を クリアする（しない）手順。たねは セーブから */
  const game = (s, clear = true) => {
    const seed = Puzzle.seed(s);
    const r = solve(seed, clear);
    if (r.clear !== clear) return null;
    return { seed, moves:r.moves, score:r.score };
  };
  /* クリアできる・できない たねに なるまで 回数を すすめる（ためしの ため） */
  const findGame = (s, clear) => { for (let i = 0; i < 400; i++){ const x = game(s, clear); if (x) return x; s.puzzle.games++; } return null; };
  T = Date.UTC(2026, 10, 3, 3, 0);
  st = child(600);
  ok(st.puzzle && st.puzzle.games === 0 && st.puzzle.best === 0 && Rules.puzzleLeft(st) === 3, 'はじめは 0回・さいこう点 0・ほうび のこり3', st.puzzle);
  const love0 = st.stats.love;
  let got = [];
  for (let i = 0; i < 4; i++){
    const x = findGame(st, true);
    const games0 = st.puzzle.games;
    st.stats.mood = 50; st.stats.full = 80; st.last = T;   /* おなか・ごきげんの へりを とめて くらべる */
    const r = act(st, 'puzzle', x);
    got.push(r);
    ok(r.ok && r.clear && r.score === x.score && st.puzzle.games === games0 + 1, `${i + 1}回め：クリア（点数は ルールが 再生して 決める）`, r);
    ok(r.reward === (i < 3) && st.stats.mood === (i < 3 ? 55 : 50) && r.left === Math.max(0, 2 - i), i < 3 ? `${i + 1}回め：ほうび（ごきげん+5）` : '4回め：ほうびなし（あそべる）', { r, mood:st.stats.mood });
  }
  ok(Math.abs(st.stats.love - love0 - 3 * PUZZLE.love) < 1e-9 && st.puzzle.n === 3 && st.puzzle.clears === 4 && Rules.puzzleLeft(st) === 0, `なかよしは 3回分（+${3 * PUZZLE.love}）だけ`, { love:st.stats.love - love0, z:st.puzzle });
  const best = st.puzzle.best;
  ok(best === Math.max(...got.map(r => r.score)) && st.album.filter(a => a.k === 'puzzle').length === 1 && st.firsts.puzzle, 'さいこう点は いちばん高い点・アルバムの さいこう点は 1日1つ・はじめての パズル', { best, album:st.album.filter(a => a.k === 'puzzle' || a.ic === 'puzzle').map(a => a.ti) });
  /* クリアできなかった回：ほうびなし（回数は すすむ） */
  T += H;
  let x = findGame(st, false);
  ok(!!x, 'クリアできない 手順を 用意できた');
  if (x){
    const n0 = st.puzzle.n, love1 = st.stats.love, g0 = st.puzzle.games;
    const r = act(st, 'puzzle', x);
    ok(r.ok && !r.clear && !r.reward && st.puzzle.n === n0 && st.stats.love === love1 && st.puzzle.games === g0 + 1, 'クリアできなかった回は ほうびなし（ペットは かなしまない）', r);
  }
  /* 画面から 数字は うけとらない：古い たね・そろわない手・多すぎる手・点数を つけても かわらない */
  const g1 = st.puzzle.games;
  x = findGame(st, true);
  ok(act(st, 'puzzle', { seed:x.seed + 1, moves:x.moves }).why === 'stale', 'ちがう たねは ことわる（stale）');
  ok(act(st, 'puzzle', { seed:x.seed, moves:x.moves.concat([0]) }).why === 'bad', '手が 多すぎる・おわったあとの手は ことわる（bad）');
  ok(act(st, 'puzzle', { seed:x.seed, moves:x.moves.slice(0, 2) }).why === 'bad', 'とちゅうで おわった 手順は ことわる（bad）');
  ok(act(st, 'puzzle', { seed:x.seed, moves:[71].concat(x.moves) }).why === 'bad', 'そろわない手が まじると ことわる（bad）');
  ok(act(st, 'puzzle', { seed:x.seed, moves:'12' }).why === 'bad' && act(st, 'puzzle', { seed:x.seed, moves:[1.5] }).why === 'bad', '手順が 配列・整数で ないと ことわる');
  const r5 = act(st, 'puzzle', Object.assign({ score:999999, clear:true, reward:true, n:0 }, x));
  ok(r5.ok && r5.score === x.score && !r5.reward && st.puzzle.games === g1 + 1 && st.puzzle.best === Math.max(best, x.score), '点数・回数を つけて おくっても つかわない（4回め以降なので ほうびなし）', { r5, z:st.puzzle });
  /* 日本時間の 0時で ほうびの回数が もどる（23:59 → 0:00） */
  T = Date.UTC(2026, 10, 3, 14, 59);   /* 11-03 23:59 日本時間 */
  ok(Rules.puzzleLeft(st) === 0, '23:59：のこり 0');
  T = Date.UTC(2026, 10, 3, 15, 0);    /* 11-04 0:00 日本時間 */
  ok(Rules.puzzleLeft(st) === 3, '0:00：のこり 3 に もどる');
  x = findGame(st, true);
  const r6 = act(st, 'puzzle', x);
  ok(r6.reward && st.puzzle.day === jst(T) && st.puzzle.n === 1, 'つぎの日の 1回めは ほうびあり', { r6, z:st.puzzle });
  /* 引っこしコード・取りこみ（carryExtras）で さいこう点・回数・きょうの回数が のこる */
  const code = s => { const b = Buffer.from(JSON.stringify(s)).toString('base64'); return 'UCHINOKO2:' + b.length + ':' + b; };
  const moved = g.readMoveCode(code(st)).st;
  ok(moved && moved.puzzle.best === st.puzzle.best && moved.puzzle.games === st.puzzle.games && moved.puzzle.clears === st.puzzle.clears && moved.puzzle.n === 1 && moved.puzzle.day === jst(T) && moved.firsts.puzzle,
     '引っこしコードで さいこう点・回数・きょうの ほうびの回数が のこる', moved && moved.puzzle);
  const target = child(10);
  g.carryExtras(JSON.parse(JSON.stringify(st)), target);
  ok(target.puzzle.best === st.puzzle.best && target.puzzle.n === 1 && Puzzle.seed(target) !== 0, '取りこみ（carryExtras）でも のこる', target.puzzle);
  /* こわれた パズルの きろくは ensureState が なおす */
  const broken = ensureState(Object.assign(child(), { puzzle:{ games:-5, clears:'x', best:1e12, n:99, day:'きのう' } }));
  ok(broken.puzzle.games === 0 && broken.puzzle.clears === 0 && broken.puzzle.best === PUZZLE.bestMax && broken.puzzle.n === 3 && broken.puzzle.day === null, 'こわれた きろくは ensureState が なおす', broken.puzzle);
  const old = child(); delete old.puzzle; ensureState(old);
  ok(old.puzzle && old.puzzle.games === 0 && old.puzzle.n === 0, '前の セーブ（puzzle なし）にも 既定値を 足す', old.puzzle);
  /* 再生は いつも 同じ（サーバーと 画面で 同じ 盤） */
  const sd = Puzzle.seed(st), a = Puzzle.start(sd).b.join(''), b = Puzzle.start(sd).b.join('');
  ok(a === b && a.length === 36 && !Puzzle.lines(Puzzle.start(sd).b).length && Puzzle.hasMove(Puzzle.start(sd).b), '同じ たねは 同じ盤・はじめは そろっていない・うごかせる手が ある');
}

console.log('うちのこラン（2026-11-22 P3）：ほうびは ゴールしたかだけ・1日3回・パズルとは べつ・日本時間の0時で もどる・コースごとの さいこう記録・はやすぎる タイムは 切る');
{
  const { RUN, PUZZLE } = g;
  T = Date.UTC(2026, 10, 5, 3, 0);   /* 11-05 12:00 日本時間 */
  const st = child(300);
  ok(st.run && st.run.games === 0 && st.run.clears === 0 && JSON.stringify(st.run.best) === '{}' && Rules.runLeft(st) === 3, 'はじめは 0回・記録なし・ほうび のこり3', st.run);
  ok(Object.keys(RUN.courses).join() === 'park,beach,forest' && RUN.perDay === 3 && RUN.love === 2 && RUN.mood === 5, 'コースは こうえん・うみべ・もり、ほうびは 1日3回・♥+2・ごきげん+5', RUN);
  const love0 = st.stats.love;
  st.stats.mood = 50; st.last = T;
  const r1 = act(st, 'run', { course:'park', ms:36580, misses:2, rank:3 });
  ok(r1.ok && r1.reward && r1.best && r1.prev === null && r1.ms === 36580 && r1.left === 2 && st.run.best.park === 36580 && st.run.games === 1 && st.run.clears === 0,
     '1回め：ほうび・はじめての 記録（ミスが あれば ノーミスに 数えない）', { r1, run:st.run });
  ok(Math.abs(st.stats.love - love0 - RUN.love) < 1e-9 && st.stats.mood === 55, `なかよし+${RUN.love}・ごきげん+${RUN.mood}`, st.stats);
  ok(st.firsts.run && st.album.some(a => a.k === 'first' && a.ti === 'はじめての ラン' && a.ic === 'run')
     && st.album.some(a => a.k === 'run:park' && a.ti === 'こうえんで さいこう きろく 36.58秒！' && a.su === 'ランで 3位で ゴールしたね'), 'アルバム：はじめての ラン・さいこう記録', st.album.slice(0, 3));
  /* 順位・タイムでは ほうびは かわらない（5位でも・おそくても） */
  const love1 = st.stats.love;
  const r2 = act(st, 'run', { course:'park', ms:61200, misses:0, rank:5 });
  ok(r2.ok && r2.reward && !r2.best && r2.prev === 36580 && st.run.best.park === 36580 && st.run.clears === 1 && Math.abs(st.stats.love - love1 - RUN.love) < 1e-9, '5位・おそい タイムでも ほうびは 同じ・記録は かわらない', { r2, run:st.run });
  /* べつの コースは べつの 記録・同じ日の 同じ コースの 記録は アルバムに 1つ */
  const r3 = act(st, 'run', { course:'beach', ms:40125, misses:0, rank:1 });
  ok(r3.ok && r3.reward && r3.best && r3.left === 0 && st.run.best.beach === 40125 && st.run.best.park === 36580, '3回め：うみべは べつの 記録', { r3, run:st.run });
  const love2 = st.stats.love;
  const r4 = act(st, 'run', { course:'park', ms:35010, misses:0, rank:1 });
  ok(r4.ok && !r4.reward && r4.best && r4.prev === 36580 && r4.left === 0 && st.run.best.park === 35010 && st.stats.love === love2 && st.run.n === 3 && st.run.games === 4,
     '4回めは ほうびなし（あそべる）・記録は のびる', { r4, run:st.run });
  ok(st.album.filter(a => a.k === 'run:park').length === 1 && st.album.find(a => a.k === 'run:park').ti === 'こうえんで さいこう きろく 35.01秒！' && st.album.find(a => a.k === 'run:park').su === 'ランで いちばんに ゴールしたね',
     '同じ日の さいこう記録は コースごとに 1つ（新しい ほう）', st.album.filter(a => (a.k || '').indexOf('run') === 0).map(a => a.ti));
  /* パズルとは べつに 数える */
  ok(Rules.puzzleLeft(st) === PUZZLE.perDay && st.puzzle.n === 0, 'パズルの ほうびは のこり3の まま（べつべつ）', st.puzzle);
  /* はやすぎる タイムは いちばん はやい タイムに 切る・こわれた 値は ことわる */
  const r5 = act(st, 'run', { course:'forest', ms:1200, misses:0, rank:1 });
  ok(r5.ok && r5.ms === RUN.courses.forest.min && st.run.best.forest === RUN.courses.forest.min, `はやすぎる タイム（1.2秒）は もりの いちばん はやい タイム（${RUN.courses.forest.min}ms）に 切る`, { r5, best:st.run.best });
  const r6 = act(st, 'run', { course:'beach', ms:9e9 });
  ok(r6.ok && r6.ms === RUN.maxMs && st.run.best.beach === 40125, 'とても おそい タイムは 1時間で 切る（記録は かわらない）', r6);
  const g0 = st.run.games, s0 = JSON.stringify(st.run);
  ok(act(st, 'run', { course:'moon', ms:40000 }).why === 'course' && act(st, 'run', { course:'constructor', ms:40000 }).why === 'course' && act(st, 'run', { ms:40000 }).why === 'course', '知らない コースは ことわる');
  ok(act(st, 'run', { course:'park', ms:'abc' }).why === 'bad' && act(st, 'run', { course:'park', ms:-5 }).why === 'bad' && act(st, 'run', { course:'park' }).why === 'bad', 'タイムが 数で ない・0 より 小さいと ことわる');
  ok(st.run.games === g0 && JSON.stringify(st.run) === s0, 'ことわった ときは なにも 書かない', st.run);
  const r7 = act(st, 'run', { course:'park', ms:50000, reward:true, n:0, love:999, left:3 });
  ok(r7.ok && !r7.reward && st.run.n === 3, '回数・ほうびを つけて おくっても つかわない', { r7, run:st.run });
  /* 日本時間の 0時で ほうびの回数が もどる */
  T = Date.UTC(2026, 10, 5, 14, 59);   /* 11-05 23:59 日本時間 */
  ok(Rules.runLeft(st) === 0, '23:59：のこり 0');
  T = Date.UTC(2026, 10, 5, 15, 0);    /* 11-06 0:00 日本時間 */
  ok(Rules.runLeft(st) === 3, '0:00：のこり 3 に もどる');
  const r8 = act(st, 'run', { course:'park', ms:36000, rank:2 });
  ok(r8.ok && r8.reward && st.run.day === jst(T) && st.run.n === 1, 'つぎの日の 1回めは ほうびあり', { r8, run:st.run });
  /* 引っこしコード・取りこみ（carryExtras）で 回数・記録・きょうの回数が のこる */
  const code = s => { const b = Buffer.from(JSON.stringify(s)).toString('base64'); return 'UCHINOKO2:' + b.length + ':' + b; };
  const moved = g.readMoveCode(code(st)).st;
  ok(moved && JSON.stringify(moved.run) === JSON.stringify(st.run) && moved.firsts.run && moved.album.some(a => a.k === 'run:park'), '引っこしコードで 回数・コースごとの 記録・きょうの ほうびの回数が のこる', moved && moved.run);
  const target = child(10);
  g.carryExtras(JSON.parse(JSON.stringify(st)), target);
  ok(JSON.stringify(target.run) === JSON.stringify(st.run) && target.firsts.run, '取りこみ（carryExtras）でも のこる', target.run);
  /* こわれた きろく・前の セーブ */
  const broken = ensureState(Object.assign(child(), { run:{ games:-5, clears:'x', n:99, day:'きのう', best:{ park:5, beach:'40000', forest:-1, moon:30000, constructor:1, __proto__:{ park:1 } } } }));
  ok(broken.run.games === 0 && broken.run.clears === 0 && broken.run.n === 3 && broken.run.day === null && broken.run.best.park === RUN.courses.park.min && broken.run.best.beach === 40000
     && !('forest' in broken.run.best) && !('moon' in broken.run.best) && Object.keys(broken.run.best).length === 2, 'こわれた きろくは ensureState が なおす（知らない コースは すてる）', broken.run);
  const arr = ensureState(Object.assign(child(), { run:{ best:['park'] } }));
  ok(JSON.stringify(arr.run.best) === '{}', '記録が 配列なら 空に', arr.run);
  const old = child(); delete old.run; ensureState(old);
  ok(old.run && old.run.games === 0 && old.run.n === 0 && JSON.stringify(old.run.best) === '{}', '前の セーブ（run なし）にも 既定値を 足す', old.run);
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
