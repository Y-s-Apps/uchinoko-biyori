/* ===== rules: what happens to the save, without the screen =====
   The same file runs on the LINE server (tools/build_server.py puts it into game.js), so nothing here may touch the page.
   - Every function takes the save (`st`) it changes, and returns what happened as a list of events (`ev`)
     that the screen turns into popups, toasts and words (js_app.js / js_features.js: playEvents).
   - Time, the calendar day and chance all come from Clock. The home-screen and Claude versions use this device's clock;
     the LINE server uses its own clock (Japan time) and random numbers, and the LINE screen follows the server's clock. */
const Clock = {
  now(){ return Date.now(); },
  /* the calendar day of a time, YYYY-MM-DD (here: this device's local date) */
  dayKey(t){
    const d = t == null ? new Date(this.now()) : (t instanceof Date ? t : new Date(t));
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },
  rand(){ return Math.random(); },
};
const now = () => Clock.now();
function dayKey(t){ return Clock.dayKey(t); }
/* a Date at local midnight of a YYYY-MM-DD day: its getMonth()/getDate() are that day's, in any time zone */
function dateOfDay(key){ const [Y, M, D] = String(key).split('-').map(Number); return new Date(Y, M - 1, D); }
/* "today" on the rules' clock, as a Date for month/day checks (seasons, events) */
const clockDate = () => dateOfDay(dayKey());
/* shift a YYYY-MM-DD key by whole calendar days (pure date arithmetic, no time zone) */
function keyShift(key, k){
  const [Y, M, D] = key.split('-').map(Number), d = new Date(Date.UTC(Y, M - 1, D + k));
  return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
}
const keyDiff = (a, b) => { const p = k => { const [Y, M, D] = k.split('-').map(Number); return Date.UTC(Y, M - 1, D); }; return Math.round((p(b) - p(a)) / 864e5); };
const daysBetween = (a, b) => Math.floor((new Date(dayKey(b)) - new Date(dayKey(a))) / 864e5);
const mdOfKey = k => { const [, M, D] = k.split('-').map(Number); return `${M}/${D}`; };
function hashStr(s){ let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed){
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function levelInfo(love){
  let lv = 1, acc = 0, need = 20;
  while (lv < MAX_LV && love >= acc + need){ acc += need; lv++; need = 20 + (lv - 1) * 5; }
  const max = lv >= MAX_LV;
  return { lv, into:max ? need : love - acc, need, max };
}
function newState(pet, t = now()){
  return { v:1, pet, stats:{ full:72, mood:78, love:0 }, counts:{ meals:0, treats:0, pets:0, plays:0 }, recentTreats:[], last:t, created:t, updated:t };
}
function breedLabel(p){
  const b = BREED_BY_ID[p.breedId];
  const bn = b ? b.ja : '';
  if (!p.colorName) return bn;
  return p.colorName.includes(bn) ? p.colorName : p.colorName + 'の' + bn;
}
function eventTreat(e){ return Object.assign({ line:e.hello, ev:e.id, evJa:e.ja }, EVENT_TREAT_STATS, e.treat); }

const RESCUE_EVERY = 7;
const TRICK_LOVE_A_DAY = 10;
const STROKE_MAX = 12;       /* なでなでのなかよし：たまる上限（回分）と、1回分がたまる分数 */
const STROKE_MINUTES = 3;

const Rules = {
  /* おなか・ごきげんは、前に計算した時刻（last）からの時間で減る */
  decay(st, t = now()){
    if (!st) return;
    const hrs = Math.max(0, (t - (st.last || t)) / 3.6e6);
    const s = st.stats;
    s.full = clamp(s.full - hrs * 8, 0, 100);
    s.mood = clamp(s.mood - hrs * 5 - (s.full < 25 ? hrs * 4 : 0), 0, 100);
    st.last = t;
  },
  lv(st){ return levelInfo(st.stats.love).lv; },
  isCat(st){ return !!st && st.pet.species === 'cat'; },
  wear(st){
    if (!st.pet.wear){ st.pet.wear = wearFrom(st.pet); delete st.pet.acc; }
    for (const k of ['head','face','neck']){
      const v = st.pet.wear[k];
      if (v && WEAR_RENAMED[v]) st.pet.wear[k] = WEAR_RENAMED[v];
      else if (v && !WEAR_BY_ID[v]) st.pet.wear[k] = null;
    }
    return st.pet.wear;
  },
  wearOwned(st, w, lv = this.lv(st)){ return w.ev ? st.events.got.includes(w.id) : lv >= w.lv; },
  /* the treats that can be given today: this pet's, plus the season's own treat during an event */
  treatList(st){
    const base = TREATS[st.pet.species] || TREATS.dog;
    const ev = activeEvent();
    return ev ? [eventTreat(ev)].concat(base) : base;
  },

  /* ----- album ----- */
  addAlbum(st, k, ti, su, ic, t){
    st.album.unshift({ t:t || now(), k, ti, su:su || '', ic:ic || k });
    st.album.sort((a, b) => b.t - a.t);
    if (st.album.length > 300) st.album.length = 300;
  },
  first(st, key, ti, su, ic){
    if (st.firsts[key]) return false;
    st.firsts[key] = true;
    this.addAlbum(st, 'first', ti, su, ic);
    return true;
  },
  gainLove(st, n, ev){
    const before = levelInfo(st.stats.love).lv;
    st.stats.love = Math.round((st.stats.love + n) * 10) / 10;
    const after = levelInfo(st.stats.love).lv;
    if (after > before){
      for (let lv = before + 1; lv <= after; lv++){
        const t = TITLES.find(([l]) => l === lv);
        if (lv <= 5 || lv % 5 === 0 || t) this.addAlbum(st, 'lv', `なかよしLv ${lv}`, t ? `あたらしい関係「${t[1]}」` : `${st.pet.name}と さらになかよくなった`, 'lv');
      }
      ev.push({ k:'lv', lv:after, before });
    }
  },

  /* ----- きょうのおねがい ----- */
  genDaily(st, day){
    const r = rng(hashStr(day + ':' + (st.created || 0)));
    const lv = this.lv(st);
    const unlocked = (TREATS[st.pet.species] || []).filter(t => t.lv <= lv);
    const pool = [
      () => ({ type:'meal', n:2 }),
      () => r() < .5 ? { type:'treat', n:1 + (r() < .4 ? 1 : 0) } : { type:'treatId', n:1, id:unlocked[Math.floor(r() * unlocked.length)].id },
      () => ({ type:'play', n:2 + (r() < .4 ? 1 : 0) }),
      () => ({ type:'pet', n:[10, 12, 15, 20][Math.floor(r() * 4)] }),
      () => ({ type:'trick', n:2 + (r() < .3 ? 1 : 0) }),
    ];
    if (lv >= 2) pool.push(() => ({ type:'dress', n:1 }));
    if (lv >= 4) pool.push(() => ({ type:'room', n:1 }));
    const list = [], used = new Set();
    let guard = 0;
    while (list.length < 3 && guard++ < 50){
      const i = Math.floor(r() * pool.length);
      if (used.has(i)) continue;
      used.add(i);
      list.push(Object.assign({ got:0, done:false }, pool[i]()));
    }
    return { day, list, all:false };
  },
  /* おたすけのおねがい: exactly one missed calendar day can be bridged, once every RESCUE_EVERY days */
  lastRescueDay(st){ const m = st.rescued.slice().sort().pop(); return m ? keyShift(m, 1) : null; },
  rescueReady(st, d = dayKey()){ const l = this.lastRescueDay(st); return !l || keyDiff(l, d) >= RESCUE_EVERY; },
  nextRescueDay(st){ const l = this.lastRescueDay(st); return l ? keyShift(l, RESCUE_EVERY) : null; },
  gapOfOne(st, d = dayKey()){ return st.streak.n > 0 && st.streak.last === keyShift(d, -2); },
  rescueOpen(st, d = dayKey()){
    if (st.streak.saved && st.streak.saved.day === d) return true;
    return this.gapOfOne(st, d) && this.rescueReady(st, d);
  },
  genRescue(st, d){
    const r = rng(hashStr('rescue:' + d + ':' + (st.created || 0)));
    const used = new Set(st.daily.list.map(x => x.type === 'treatId' ? 'treat' : x.type));
    const pool = [{ type:'pet', n:25 }, { type:'play', n:3 }, { type:'trick', n:3 }, { type:'meal', n:2 }, { type:'treat', n:2 }].filter(x => !used.has(x.type));
    const c = pool.length ? pool[Math.floor(r() * pool.length)] : { type:'pet', n:30 };
    return Object.assign({ got:0, done:false, rescue:true }, c);
  },
  streakInfo(st){
    const t = dayKey(), L = st.streak.last;
    if (st.streak.saved && st.streak.saved.day === t && !(st.daily && st.daily.rescue && st.daily.rescue.done)) return { n:st.streak.saved.n, pinch:true };
    if (L === t || L === keyShift(t, -1)) return { n:st.streak.n, pinch:false };
    if (this.rescueOpen(st, t)) return { n:st.streak.n, pinch:true };
    return { n:0, pinch:false };
  },
  ensureDaily(st){
    const d = dayKey();
    if (!st.daily || st.daily.day !== d) st.daily = this.genDaily(st, d);
    if (!st.daily.rescue && this.rescueOpen(st, d)) st.daily.rescue = this.genRescue(st, d);
    return st.daily;
  },
  reqLeft(st){
    this.ensureDaily(st);
    const open = st.daily.list.filter(r => !r.done).length;
    return open + (st.daily.rescue && !st.daily.rescue.done && this.streakInfo(st).pinch ? 1 : 0);
  },
  bridgeStreak(st, prevN, d){
    const y = keyShift(d, -1);
    st.streak.n = prevN + 1;
    st.streak.last = d;
    st.streak.best = Math.max(st.streak.best || 0, st.streak.n);
    delete st.streak.saved;
    if (!st.rescued.includes(y)) st.rescued.push(y);
    this.addAlbum(st, 'stamp', `れんぞく記録を つないだ！（${st.streak.n}日）`, 'おたすけのおねがいで、おやすみの日を つないだよ', 'rescue');
  },
  rescueComplete(st, r, ev){
    st.stats.mood = clamp(st.stats.mood + 5, 0, 100);
    this.gainLove(st, 5, ev);
    const d = st.daily.day;
    if (st.daily.all && st.streak.saved && st.streak.saved.day === d){
      this.bridgeStreak(st, st.streak.saved.n, d);
      ev.push({ k:'rescue', bridged:true });
    } else ev.push({ k:'rescue', bridged:false });
  },
  reqComplete(st, r, ev){
    st.stats.mood = clamp(st.stats.mood + 5, 0, 100);
    this.gainLove(st, 4, ev);
    ev.push({ k:'req' });
    if (st.daily.list.every(x => x.done) && !st.daily.all){
      st.daily.all = true;
      const d = st.daily.day;
      if (!st.stamps.includes(d)) st.stamps.push(d);
      const y = keyShift(d, -1), prevN = st.streak.n, last = st.streak.last;
      let bridged = false, waiting = false;
      if (last === y) st.streak.n = prevN + 1;
      else if (last === d) st.streak.n = prevN;
      else if (last === keyShift(d, -2) && prevN > 0 && this.rescueReady(st, d)){
        if (st.daily.rescue && st.daily.rescue.done){ this.bridgeStreak(st, prevN, d); bridged = true; }
        else { st.streak.saved = { n:prevN, day:d }; st.streak.n = 1; waiting = true; }
      } else st.streak.n = 1;
      st.streak.last = d;
      st.streak.best = Math.max(st.streak.best || 0, st.streak.n);
      this.gainLove(st, 10, ev);
      if (!this.first(st, 'daily', 'はじめて おねがいを ぜんぶかなえた', 'スタンプカードに 1こめのスタンプ', 'stamp')){
        const total = st.stamps.length;
        if ([3, 7, 14, 30, 50, 100, 200, 365].includes(st.streak.n)) this.addAlbum(st, 'stamp', `おねがい${st.streak.n}日れんぞく！`, 'まいにち ありがとう', 'stamp');
        else if (total % 10 === 0) this.addAlbum(st, 'stamp', `スタンプが${total}こに！`, 'たくさん かなえてくれたね', 'stamp');
      }
      ev.push({ k:'all', bridged, waiting });
    }
  },
  /* a care action counts toward today's requests and the album's firsts */
  track(st, type, data, ev){
    data = data || {};
    this.ensureDaily(st);
    const reqs = st.daily.list.concat(st.daily.rescue ? [st.daily.rescue] : []);
    for (const r of reqs){
      if (r.done) continue;
      const hit = r.type === 'treatId' ? (type === 'treat' && data.id === r.id) : r.type === type;
      if (!hit) continue;
      r.got = Math.min(r.n, r.got + 1);
      if (r.got >= r.n){ r.done = true; if (r.rescue) this.rescueComplete(st, r, ev); else this.reqComplete(st, r, ev); }
    }
    if (type === 'meal') this.first(st, 'meal', 'はじめてのごはん', 'おいしそうに たべたね', 'meal');
    if (type === 'treat') this.first(st, 'treat', 'はじめてのおやつ', `「${data.ja}」をあげた`, 'treat:' + data.id);
    if (type === 'play') this.first(st, 'play', 'はじめてのあそび', this.isCat(st) ? '毛糸玉で じゃれたね' : 'ボールを おいかけたね', 'play');
    if (type === 'pet') this.first(st, 'pet', 'はじめてのなでなで', 'うれしそうだったね', 'pet');
    if (type === 'dress' && data.id && !st.firsts.wear[data.id]){
      st.firsts.wear[data.id] = true;
      const w = WEAR_BY_ID[data.id];
      if (w) this.addAlbum(st, 'wear', `はじめての${w.ja.replace(/（.*?）/, '')}`, `${w.ja}、にあってるね`, 'dress');
    }
    if (type === 'room') this.first(st, 'room', 'はじめてのもようがえ', data.ja ? `${data.ja}にしたよ` : '', 'room');
  },

  /* ----- opening the app: milestones, the season's event, a souvenir, the streak notices ----- */
  checkMilestones(st, ev){
    if (!st.created) return;
    const days = daysBetween(st.created, now());
    for (const n of [7, 30, 100, 200, 300, 500, 1000]){
      const k = 'days' + n;
      if (days >= n && !st.milestones[k]){
        st.milestones[k] = true;
        this.addAlbum(st, 'days', `うちにきて${n}日`, n >= 100 ? 'これからも ずっといっしょだよ' : 'まいにち ありがとう', 'days', st.created + n * 864e5);
        if (days - n < 3) ev.push({ k:'days', n });
      }
    }
    const c = dateOfDay(dayKey(st.created)), d = clockDate();
    const years = d.getFullYear() - c.getFullYear();
    if (years >= 1 && d.getMonth() === c.getMonth() && d.getDate() === c.getDate() && !st.milestones['anniv' + years]){
      st.milestones['anniv' + years] = true;
      this.addAlbum(st, 'days', `うちのこ記念日（${years}年）`, `${st.pet.name}がうちにきて ${years}年！`, 'days');
      ev.push({ k:'anniv', years });
    }
  },
  checkEvent(st, ev){
    const e = activeEvent();
    if (!e) return;
    const key = e.id + ':' + clockDate().getFullYear();
    if (st.events.seen[key]) return;
    st.events.seen[key] = now();
    const had = st.events.got.includes(e.gift);
    if (!had) st.events.got.push(e.gift);
    const w = WEAR_BY_ID[e.gift];
    this.addAlbum(st, 'event', `${e.ja}`, had ? 'ことしも いっしょに すごせたね' : `プレゼント「${w.ja}」をもらった`, 'gift');
    ev.push({ k:'event', id:e.id, had });
  },
  /* おるすばんのおみやげ: 3 hours away, up to 3 a day; the love is given now and shown when the popup closes */
  souvenir(st, away, ev){
    if (!(away >= 3 * 3600e3)) return;
    const day = dayKey();
    if (st.souv.day !== day){ st.souv.day = day; st.souv.n = 0; }
    if (st.souv.n >= 3) return;
    st.souv.n++;
    const season = seasonOf();
    const pool = SOUVENIRS.filter(s => s.seasons === 'all' || s.seasons.split(' ').includes(season));
    const wt = s => ({ 1:10, 2:5, 3:2.2, 4:1, 5:.45 }[s.rare] || 1) * (st.souv.have[s.id] ? 1 : 1.6);
    let x = Clock.rand() * pool.reduce((a, s) => a + wt(s), 0), pickS = pool[0];
    for (const s of pool){ x -= wt(s); if (x <= 0){ pickS = s; break; } }
    const isNew = !st.souv.have[pickS.id];
    st.souv.have[pickS.id] = (st.souv.have[pickS.id] || 0) + 1;
    const bonus = away >= 12 * 3600e3 ? 4 : 2;
    if (isNew) this.addAlbum(st, 'souv', `おみやげ「${pickS.ja}」`, pickS.line, 'souv:' + pickS.id);
    const after = [];
    this.gainLove(st, bonus, after);
    ev.push({ k:'souv', id:pickS.id, isNew, bonus, after });
  },
  rescueNotice(st, ev){
    if (!st.daily || st.daily.rescueNoticed) return;
    if (!st.daily.rescue && this.gapOfOne(st, st.daily.day) && !this.rescueReady(st, st.daily.day) && !st.daily.all){
      st.daily.rescueNoticed = true;
      ev.push({ k:'broke', next:this.nextRescueDay(st) });
      return;
    }
    if (!st.daily.rescue || st.daily.rescue.done) return;
    const si = this.streakInfo(st);
    if (!si.pinch) return;
    st.daily.rescueNoticed = true;
    ev.push({ k:'pinch', n:si.n });
  },
  /* opening (or coming back to) the app. `away` is how long nobody looked, measured before the stats decay */
  open(st, away, ev){
    this.decay(st);
    if (!st.album.length) this.addAlbum(st, 'home', `${st.pet.name}が うちのこになった日`, breedLabel(st.pet), 'home', st.created || now());
    this.ensureDaily(st);
    this.checkMilestones(st, ev);
    this.checkEvent(st, ev);
    this.souvenir(st, away, ev);
    this.rescueNotice(st, ev);
    return { ok:true };
  },

  /* ----- care ----- */
  feed(st, p, ev){
    this.decay(st);
    if (st.stats.full >= 92) return { ok:false, why:'full' };
    st.stats.full = clamp(st.stats.full + 45, 0, 100);
    st.stats.mood = clamp(st.stats.mood + 6, 0, 100);
    st.counts.meals++;
    this.gainLove(st, 3, ev);
    this.track(st, 'meal', {}, ev);
    return { ok:true };
  },
  treatCheck(st, id){
    st.recentTreats = (st.recentTreats || []).filter(ts => now() - ts < 30 * 60e3);
    if (st.recentTreats.length >= 5) return 'limit';
    this.decay(st);
    if (st.stats.full >= 99) return 'full';
    const t = this.treatList(st).find(x => x.id === id);
    if (!t || this.lv(st) < t.lv) return 'locked';
    return null;
  },
  treat(st, p, ev){
    const why = this.treatCheck(st, p.id);
    if (why) return { ok:false, why };
    const t = this.treatList(st).find(x => x.id === p.id);
    st.stats.full = clamp(st.stats.full + t.full, 0, 100);
    st.stats.mood = clamp(st.stats.mood + t.mood, 0, 100);
    st.recentTreats.push(now());
    st.counts.treats++;
    this.gainLove(st, t.love, ev);
    this.track(st, 'treat', t, ev);
    return { ok:true, id:t.id };
  },
  play(st, p, ev){
    this.decay(st);
    if (st.stats.full < 12) return { ok:false, why:'hungry' };
    st.stats.mood = clamp(st.stats.mood + 12, 0, 100);
    st.stats.full = clamp(st.stats.full - 4, 0, 100);
    st.counts.plays++;
    this.gainLove(st, 3, ev);
    this.track(st, 'play', {}, ev);
    return { ok:true };
  },
  /* なでなで: one stroke. `budget` ({left, t}) refills one stroke's love every 3 minutes, up to 12 */
  stroke(st, budget, ev){
    this.decay(st);
    st.stats.mood = clamp(st.stats.mood + 1.5, 0, 100);
    const mins = (now() - budget.t) / 60000;
    budget.left = Math.min(STROKE_MAX, budget.left + mins / STROKE_MINUTES);
    budget.t = now();
    if (budget.left >= 1){ budget.left -= 1; this.gainLove(st, .6, ev); }
    this.track(st, 'pet', {}, ev);
  },
  /* the end of a stroking session counts once */
  strokeEnd(st){ st.counts.pets++; },
  trickCheck(st, id){
    const tk = (TRICKS[st.pet.species] || TRICKS.dog).find(t => t.id === id);
    if (!tk || this.lv(st) < tk.lv) return 'locked';
    this.decay(st);
    if (st.stats.full < 10) return 'hungry';
    return null;
  },
  trick(st, p, ev){
    const why = this.trickCheck(st, p.id);
    if (why) return { ok:false, why };
    const tk = (TRICKS[st.pet.species] || TRICKS.dog).find(t => t.id === p.id);
    const ts = st.tricks[tk.id] || (st.tricks[tk.id] = { p:0, ok:false });
    const pOk = Math.min(.93, .55 + ts.p * .07 + (st.stats.mood >= 60 ? .1 : 0));
    const known = ts.ok;
    const success = known || Clock.rand() < pOk;
    const day = dayKey();
    if (st.trickDay.day !== day){ st.trickDay.day = day; st.trickDay.love = 0; }
    let learned = false;
    if (success){
      st.stats.mood = clamp(st.stats.mood + 3, 0, 100);
      if (st.trickDay.love < TRICK_LOVE_A_DAY){ st.trickDay.love += 1; this.gainLove(st, 1, ev); }
      if (!ts.ok){
        ts.p++;
        if (ts.p >= tk.need){
          ts.ok = true;
          learned = true;
          this.addAlbum(st, 'trick', `げい「${tk.ja}」をおぼえた！`, `${tk.need}回のれんしゅうで できるようになったね`, 'trick');
          this.gainLove(st, 5, ev);
        }
      }
    }
    const tev = [];
    this.track(st, 'trick', { id:tk.id }, tev);
    return { ok:true, id:tk.id, success, known, learned, p:ts.p, need:tk.need, after:tev };
  },
  dress(st, p, ev){
    const slot = SLOTS.some(([k]) => k === p.slot) ? p.slot : null;
    const w = p.id == null ? null : WEAR_BY_ID[p.id];
    if (!slot || (p.id != null && (!w || w.slot !== slot || !this.wearOwned(st, w)))) return { ok:false, why:'locked' };
    const W = Object.assign({}, this.wear(st));
    W[slot] = w ? w.id : null;
    st.pet.wear = W;
    if (w) this.track(st, 'dress', { slot, id:w.id }, ev);
    return { ok:true };
  },
  room(st, p, ev){
    const cat = DECOR_CATS.some(([k]) => k === p.cat) ? p.cat : null;
    const d = cat && DECOR[cat].find(x => x.id === p.id);
    if (!d || this.lv(st) < d.lv) return { ok:false, why:'locked' };
    if (st.room[cat] === d.id) return { ok:false, why:'same' };
    st.room[cat] = d.id;
    this.track(st, 'room', { ja:d.ja }, ev);
    return { ok:true };
  },
  season(st, p){ st.room.season = !!p.on; return { ok:true }; },

  /* one entry for every action, here and on the server. `ctx.budget` is the stroke budget, `ctx.away` the time away */
  act(st, type, p, ctx){
    p = p || {}; ctx = ctx || {};
    const ev = [];
    let r;
    switch (type){
      case 'open': r = this.open(st, ctx.away || 0, ev); break;
      case 'feed': r = this.feed(st, p, ev); break;
      case 'treat': r = this.treat(st, p, ev); break;
      case 'play': r = this.play(st, p, ev); break;
      case 'pet': {
        const n = Math.max(0, Math.min(60, Math.floor(Number(p.n) || 0)));
        for (let i = 0; i < n; i++) this.stroke(st, ctx.budget, ev);
        if (p.end !== false && n) this.strokeEnd(st);
        r = { ok:true, n };
        break;
      }
      case 'trick': r = this.trick(st, p, ev); break;
      case 'dress': r = this.dress(st, p, ev); break;
      case 'room': r = this.room(st, p, ev); break;
      case 'season': r = this.season(st, p, ev); break;
      default: r = { ok:false, why:'unknown' };
    }
    r.ev = ev;
    return r;
  },
};
