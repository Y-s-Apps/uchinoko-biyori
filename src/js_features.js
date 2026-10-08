/* ===== shared helpers ===== */
function dayKey(t){
  const d = t == null ? new Date() : (t instanceof Date ? t : new Date(t));
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function hashStr(s){ let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed){
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const fmtMD = t => { const d = new Date(t); return (d.getMonth() + 1) + '/' + d.getDate(); };
const daysBetween = (a, b) => Math.floor((new Date(dayKey(b)) - new Date(dayKey(a))) / 864e5);
const findDecor = (cat, id) => DECOR[cat].find(d => d.id === id) || DECOR[cat][0];
const lvNow = () => levelInfo(S.stats.love).lv;
const isCat = () => S && S.pet.species === 'cat';

/* ===== state upgrade (old saves gain the new fields) ===== */
function ensureState(st){
  if (!st) return st;
  const obj = v => v && typeof v === 'object' && !Array.isArray(v);
  st.room = Object.assign({}, ROOM_DEFAULT, obj(st.room) ? st.room : {});
  for (const [cat] of DECOR_CATS) if (!DECOR[cat].some(d => d.id === st.room[cat])) st.room[cat] = ROOM_DEFAULT[cat];
  st.room.season = st.room.season !== false;
  st.tricks = obj(st.tricks) ? st.tricks : {};
  st.daily = obj(st.daily) && Array.isArray(st.daily.list) ? st.daily : null;
  st.stamps = Array.isArray(st.stamps) ? st.stamps.filter(x => typeof x === 'string').slice(-1000) : [];
  st.streak = obj(st.streak) ? st.streak : { last:null, n:0, best:0 };
  st.souv = obj(st.souv) ? st.souv : {};
  st.souv.have = obj(st.souv.have) ? st.souv.have : {};
  st.events = obj(st.events) ? st.events : {};
  st.events.got = Array.isArray(st.events.got) ? st.events.got.filter(id => WEAR_BY_ID[id]) : [];
  st.events.seen = obj(st.events.seen) ? st.events.seen : {};
  st.album = Array.isArray(st.album) ? st.album.filter(a => a && typeof a.t === 'number' && typeof a.ti === 'string').slice(0, 300) : [];
  st.album.forEach(a => { if (a.k === 'trick' || /^芸/.test(a.ti)) a.ti = a.ti.replace(/芸/g, 'げい'); });
  st.milestones = obj(st.milestones) ? st.milestones : {};
  st.trickDay = obj(st.trickDay) ? st.trickDay : { day:null, love:0 };
  if (!obj(st.firsts) || !st.firsts._init){
    const c = st.counts || {};
    st.firsts = { _init:true, meal:c.meals > 0, treat:c.treats > 0, play:c.plays > 0, pet:c.pets > 0, room:false, wear:{} };
    const w = st.pet && st.pet.wear;
    if (w) for (const k of ['head','face','neck']) if (w[k]) st.firsts.wear[w[k]] = true;
  }
  st.firsts.wear = obj(st.firsts.wear) ? st.firsts.wear : {};
  return st;
}
/* the subset of a move code that is safe to carry over */
function carryExtras(o, st){
  const src = ensureState(JSON.parse(JSON.stringify({
    room:o.room, tricks:o.tricks, daily:null, stamps:o.stamps, streak:o.streak, souv:o.souv, events:o.events,
    album:o.album, milestones:o.milestones, firsts:o.firsts, counts:st.counts, pet:st.pet,
  })));
  const tricks = {};
  for (const [k, v] of Object.entries(src.tricks)) if (v && typeof v === 'object') tricks[k] = { p:clamp(Number(v.p) || 0, 0, 99), ok:!!v.ok };
  const have = {};
  for (const [k, v] of Object.entries(src.souv.have)) if (SOUV_BY_ID[k]) have[k] = clamp(Number(v) || 0, 0, 1e6);
  st.room = src.room;
  st.tricks = tricks;
  st.stamps = src.stamps.filter(x => /^\d{4}-\d{2}-\d{2}$/.test(x));
  st.streak = { last:typeof src.streak.last === 'string' ? src.streak.last : null, n:clamp(Number(src.streak.n) || 0, 0, 1e5), best:clamp(Number(src.streak.best) || 0, 0, 1e5) };
  st.souv = { have, day:null, n:0 };
  st.events = { got:src.events.got, seen:Object.fromEntries(Object.entries(src.events.seen).filter(([k]) => /^[a-z]+:\d{4}$/.test(k)).map(([k, v]) => [k, Number(v) || 1])) };
  st.album = src.album.map(a => ({ t:a.t, k:String(a.k || '').slice(0, 20), ti:a.ti.slice(0, 40), su:String(a.su || '').slice(0, 80), ic:String(a.ic || '').slice(0, 40) }));
  st.milestones = Object.fromEntries(Object.entries(src.milestones).filter(([k]) => /^[a-z0-9:_-]{1,30}$/.test(k)).map(([k, v]) => [k, !!v]));
  st.firsts = src.firsts;
  return ensureState(st);
}

/* ===== popups, one at a time ===== */
const Modal = {
  q:[], busy:false,
  show(spec){ return new Promise(res => { this.q.push({ spec, res }); this.next(); }); },
  next(){
    if (this.busy || !this.q.length) return;
    const { spec, res } = this.q.shift();
    this.busy = true;
    const back = document.activeElement;
    const box = document.createElement('div');
    box.className = 'levelup';
    box.innerHTML = `<div class="card ${spec.cls || ''}" role="dialog" aria-modal="true" aria-label="${esc(spec.label || 'おしらせ')}">${typeof spec.html === 'function' ? spec.html() : spec.html}</div>`;
    document.body.appendChild(box);
    let done = false;
    const onKey = e => { if (e.key === 'Escape'){ e.stopPropagation(); close(null); } };
    const close = val => {
      if (done) return; done = true;
      document.removeEventListener('keydown', onKey, true);
      box.classList.add('closing');
      setTimeout(() => { box.remove(); this.busy = false; res(val); this.next(); }, 200);
      if (back && back.focus) try { back.focus(); } catch(e){}
    };
    box.addEventListener('click', e => { if (e.target === box) close(null); });
    document.addEventListener('keydown', onKey, true);
    box.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => close(b.dataset.close || true)));
    if (spec.ready) spec.ready(box, close);
    if (spec.confetti) confettiIn(box);
    const f = box.querySelector('.btn.primary') || box.querySelector('button');
    if (f) f.focus();
  },
};
function confettiIn(box){
  const cols = ['#F0728E','#F5C562','#6FABE3','#7CC28F','#B8A6EC'];
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  for (let i = 0; i < 30; i++){
    const a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 140;
    const el = document.createElement('div');
    el.className = 'fx spark';
    el.style.left = cx + 'px'; el.style.top = cy + 'px'; el.style.background = cols[i % cols.length];
    el.style.setProperty('--dx', (Math.cos(a) * d).toFixed(0) + 'px');
    el.style.setProperty('--dy', (Math.sin(a) * d).toFixed(0) + 'px');
    box.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }
}
function petCard(wear, cls = 'ex-happy wag-fast'){
  return `<div class="mpet ${cls}">${renderPet(S.pet.look, { wear:wear || petWear() })}</div>`;
}

/* ===== small category icons (24 viewBox) ===== */
const MINI = {
  meal:'<path d="M3 12h18l-2 6a3 3 0 0 1-3 2H8a3 3 0 0 1-3-2z" fill="#EFB443"/><circle cx="9" cy="10" r="2.2" fill="#B97A3C"/><circle cx="13" cy="9" r="2.4" fill="#C98A48"/><circle cx="16.5" cy="10.5" r="2" fill="#B97A3C"/>',
  treat:'<path d="M12 20s-7-4.3-8.6-8.3C2.2 8.6 4 5.5 7 5.5c2 0 3.4 1 5 2.6 1.6-1.6 3-2.6 5-2.6 3 0 4.8 3.1 3.6 6.2C19 15.7 12 20 12 20z" fill="#E9B872"/><circle cx="9" cy="10" r="1.3" fill="#EC6C8A"/><circle cx="14.5" cy="9.5" r="1.3" fill="#EC6C8A"/><circle cx="12" cy="14" r="1.3" fill="#EC6C8A"/>',
  play:'<circle cx="12" cy="12" r="8.5" fill="#6FABE3"/><path d="M4.5 9.5c5 2.5 10 2.5 15 0M4.5 14.5c5-2.5 10-2.5 15 0" stroke="#FFFFFF" stroke-width="1.8" fill="none"/>',
  pet:'<path d="M12 20s-7.5-4.6-9.6-9.2C.9 7.4 3 3.6 6.6 3.6c2.2 0 3.6 1.2 4.4 2.5.8-1.3 2.2-2.5 4.4-2.5 3.6 0 5.7 3.8 4.2 7.2C19.5 15.4 12 20 12 20z" fill="#F0728E"/>',
  trick:'<path d="M12 2.5l2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 16.8 6.2 20l1.4-6.4L2.7 9.2l6.5-.7z" fill="#F5C843"/>',
  dress:'<path d="M12 12L4 7q-2 5 0 10zM12 12l8-5q2 5 0 10z" fill="#9F8BD6"/><circle cx="12" cy="12" r="2.6" fill="#FFFFFF" stroke="#9F8BD6" stroke-width="1.4"/>',
  room:'<path d="M3 11L12 4l9 7v9H3z" fill="#4FAE9A"/><rect x="9.5" y="14" width="5" height="6" rx="1" fill="#FFFFFF"/>',
  lv:'<path d="M4 18h16l-1.5-9-4.5 4-2-6-2 6-4.5-4z" fill="#F5C843"/><circle cx="12" cy="6" r="1.6" fill="#F5C843"/>',
  stamp:'<ellipse cx="12" cy="15" rx="5" ry="4.2" fill="#EC6C8A"/><circle cx="6" cy="9.5" r="2.2" fill="#EC6C8A"/><circle cx="10" cy="6" r="2.2" fill="#EC6C8A"/><circle cx="14" cy="6" r="2.2" fill="#EC6C8A"/><circle cx="18" cy="9.5" r="2.2" fill="#EC6C8A"/>',
  gift:'<rect x="4" y="9" width="16" height="11" rx="1.5" fill="#F27B7B"/><rect x="3" y="7" width="18" height="4" rx="1" fill="#F497B0"/><path d="M12 7v13" stroke="#FFFFFF" stroke-width="2"/><path d="M12 7c-2-4-6-3-5 0zM12 7c2-4 6-3 5 0z" fill="#F5C843"/>',
  home:'<path d="M3 11L12 4l9 7v9H3z" fill="#F0A04B"/><path d="M12 18s-3.5-2-4.3-4c-.5-1.4.3-2.8 1.8-2.8 1 0 1.8.5 2.5 1.3.7-.8 1.5-1.3 2.5-1.3 1.5 0 2.3 1.4 1.8 2.8-.8 2-4.3 4-4.3 4z" fill="#FFFFFF"/>',
  days:'<rect x="3.5" y="5" width="17" height="15" rx="2.5" fill="#FFFFFF" stroke="#6FABE3" stroke-width="1.8"/><path d="M3.5 9.5h17" stroke="#6FABE3" stroke-width="1.8"/><path d="M8 3.5v3M16 3.5v3" stroke="#6FABE3" stroke-width="1.8" stroke-linecap="round"/><path d="M12 17.5s-3-1.7-3.6-3.3c-.4-1.1.3-2.2 1.4-2.2.9 0 1.6.5 2.2 1.1.6-.6 1.3-1.1 2.2-1.1 1.1 0 1.8 1.1 1.4 2.2-.6 1.6-3.6 3.3-3.6 3.3z" fill="#F0728E"/>',
  souv:'<path d="M4 10h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" fill="#C9A97A"/><path d="M3 7h18v4H3z" fill="#B9824F"/><path d="M10 13h4" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>',
};
const mini = (k, cls = '') => `<svg class="mini ${cls}" viewBox="0 0 24 24" aria-hidden="true">${MINI[k] || MINI.pet}</svg>`;
function iconFor(ic){
  const [type, id] = String(ic || '').split(':');
  if (type === 'treat'){
    const t = allTreats().find(x => x.id === id);
    if (t) return `<svg class="mini" viewBox="0 0 48 48" aria-hidden="true">${treatIcon(t)}</svg>`;
  }
  if (type === 'souv') return `<svg class="mini" viewBox="0 0 48 48" aria-hidden="true">${souvenirIcon(SOUV_BY_ID[id] ? SOUV_BY_ID[id].icon : 'stone')}</svg>`;
  return mini(MINI[type] ? type : 'pet');
}
function allTreats(){
  const list = (TREATS[S.pet.species] || []).slice();
  EVENTS.forEach(e => list.push(eventTreat(e)));
  return list;
}

/* ===== album ===== */
function addAlbum(k, ti, su, ic, t){
  if (!S) return;
  S.album.unshift({ t:t || now(), k, ti, su:su || '', ic:ic || k });
  S.album.sort((a, b) => b.t - a.t);
  if (S.album.length > 300) S.album.length = 300;
}
function first(key, ti, su, ic){
  if (!S || S.firsts[key]) return false;
  S.firsts[key] = true;
  addAlbum('first', ti, su, ic);
  return true;
}

/* ===== tracking: care actions feed requests and memories ===== */
function track(type, data = {}){
  if (!S) return;
  ensureDaily();
  for (const r of S.daily.list){
    if (r.done) continue;
    const hit = r.type === 'treatId' ? (type === 'treat' && data.id === r.id) : r.type === type;
    if (!hit) continue;
    r.got = Math.min(r.n, r.got + 1);
    if (r.got >= r.n){ r.done = true; reqComplete(r); }
  }
  if (type === 'meal') first('meal', 'はじめてのごはん', 'おいしそうに たべたね', 'meal');
  if (type === 'treat') first('treat', 'はじめてのおやつ', `「${data.ja}」をあげた`, 'treat:' + data.id);
  if (type === 'play') first('play', 'はじめてのあそび', isCat() ? '毛糸玉で じゃれたね' : 'ボールを おいかけたね', 'play');
  if (type === 'pet') first('pet', 'はじめてのなでなで', 'うれしそうだったね', 'pet');
  if (type === 'dress' && data.id && !S.firsts.wear[data.id]){
    S.firsts.wear[data.id] = true;
    const w = WEAR_BY_ID[data.id];
    if (w) addAlbum('wear', `はじめての${w.ja.replace(/（.*?）/, '')}`, `${w.ja}、にあってるね`, 'dress');
  }
  if (type === 'room') first('room', 'はじめてのもようがえ', data.ja ? `${data.ja}にしたよ` : '', 'room');
  renderReqBadge();
}

/* ===== きょうのおねがい ===== */
function reqText(r){
  switch (r.type){
    case 'meal': return `ごはんを${r.n}回たべたい`;
    case 'treat': return r.n > 1 ? `おやつを${r.n}こ ほしい` : 'おやつが ほしい';
    case 'treatId': { const t = allTreats().find(x => x.id === r.id); return `「${t ? t.ja : 'おやつ'}」が たべたい`; }
    case 'play': return isCat() ? `毛糸玉で${r.n}回 あそびたい` : `ボールで${r.n}回 あそびたい`;
    case 'pet': return `${r.n}回 なでなでしてほしい`;
    case 'trick': return `げいを${r.n}回 見せたい`;
    case 'dress': return 'きせかえ してほしい';
    case 'room': return 'もようがえ してみたい';
  }
  return '';
}
const REQ_ICON = { meal:'meal', treat:'treat', treatId:'treat', play:'play', pet:'pet', trick:'trick', dress:'dress', room:'room' };
function genDaily(day){
  const r = rng(hashStr(day + ':' + (S.created || 0)));
  const lv = lvNow();
  const unlocked = (TREATS[S.pet.species] || []).filter(t => t.lv <= lv);
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
}
function ensureDaily(){
  const d = dayKey();
  if (!S.daily || S.daily.day !== d) S.daily = genDaily(d);
  return S.daily;
}
function reqLeft(){ ensureDaily(); return S.daily.list.filter(r => !r.done).length; }
function renderReqBadge(){
  const b = $('#reqBadge'), btn = $('#reqBtn');
  if (!b || !S) return;
  const n = reqLeft();
  b.textContent = n ? String(n) : '✓';
  b.classList.toggle('done', !n);
  btn.setAttribute('aria-label', n ? `きょうのおねがい（のこり${n}こ）` : 'きょうのおねがい（ぜんぶかなえた）');
}
function reqComplete(r){
  S.stats.mood = clamp(S.stats.mood + 5, 0, 100);
  gainLove(4);
  toast(`おねがいをかなえた！ ♥+4`);
  setTimeout(() => { if (!Pet.sleeping){ Pet.say('ありがとう！ うれしい！'); Pet.wag(1500); } hearts(3); }, 300);
  if (S.daily.list.every(x => x.done) && !S.daily.all){
    S.daily.all = true;
    const d = S.daily.day;
    if (!S.stamps.includes(d)) S.stamps.push(d);
    const y = dayKey(new Date(new Date(d).getTime() - 864e5));
    S.streak.n = S.streak.last === y ? S.streak.n + 1 : (S.streak.last === d ? S.streak.n : 1);
    S.streak.last = d;
    S.streak.best = Math.max(S.streak.best || 0, S.streak.n);
    gainLove(10);
    if (!first('daily', 'はじめて おねがいを ぜんぶかなえた', 'スタンプカードに 1こめのスタンプ', 'stamp')){
      const total = S.stamps.length;
      if ([3, 7, 14, 30, 50, 100, 200, 365].includes(S.streak.n)) addAlbum('stamp', `おねがい${S.streak.n}日れんぞく！`, 'まいにち ありがとう', 'stamp');
      else if (total % 10 === 0) addAlbum('stamp', `スタンプが${total}こに！`, 'たくさん かなえてくれたね', 'stamp');
    }
    setTimeout(() => Modal.show({
      label:'きょうのおねがい コンプリート', confetti:true,
      html:() => `${petCard()}<h3>きょうのおねがい<br>ぜんぶかなえた！</h3>
        <div class="stampbig">${mini('stamp')}</div>
        <p>ごほうび ♥+10<br>${S.streak.n > 1 ? `れんぞく <b>${S.streak.n}日</b>！` : 'スタンプカードに スタンプをおしたよ'}</p>
        <button class="btn primary" type="button" data-close>やったね</button>`,
    }), 1200);
  }
  Persist.schedule();
}
function openRequests(){
  if (!S) return;
  ensureDaily();
  const D = S.daily;
  const cards = D.list.map(r => `<div class="req ${r.done ? 'done' : ''}">
      <div class="req-ic">${mini(REQ_ICON[r.type])}</div>
      <div class="req-body"><b>${esc(reqText(r))}</b>
        <div class="bar"><i style="width:${Math.round(r.got / r.n * 100)}%"></i></div></div>
      <div class="req-st">${r.done ? '<span class="okpill">かなえた</span>' : `<span class="cnt">${r.got}/${r.n}</span><small>♥+4</small>`}</div>
    </div>`).join('');
  const html = `<p class="sheet-sub">${esc(S.pet.name)}からの、きょうのおねがいです。毎日0時に新しくなります。</p>
    <div class="reqs" style="--c:var(--berry)">${cards}</div>
    <div class="reqfoot">${D.all ? '<b>きょうは ぜんぶかなえました！</b>' : 'ぜんぶかなえると <b>♥+10</b> とスタンプ'}<span>れんぞく ${S.streak.last === D.day || S.streak.last === dayKey(new Date(Date.now() - 864e5)) ? S.streak.n : 0}日</span></div>
    <button class="btn" type="button" id="toStamps">スタンプカードを見る</button>`;
  openSheet('きょうのおねがい', html, sh => {
    sh.querySelector('#toStamps').addEventListener('click', () => openAlbum('stamp'));
  });
}

/* ===== おるすばんのおみやげ ===== */
function maybeSouvenir(away){
  if (!S || !(away >= 3 * 3600e3)) return;
  const day = dayKey();
  if (S.souv.day !== day){ S.souv.day = day; S.souv.n = 0; }
  if (S.souv.n >= 3) return;
  S.souv.n++;
  const season = seasonOf();
  const pool = SOUVENIRS.filter(s => s.seasons === 'all' || s.seasons.split(' ').includes(season));
  const wt = s => ({ 1:10, 2:5, 3:2.2, 4:1, 5:.45 }[s.rare] || 1) * (S.souv.have[s.id] ? 1 : 1.6);
  let x = Math.random() * pool.reduce((a, s) => a + wt(s), 0), pickS = pool[0];
  for (const s of pool){ x -= wt(s); if (x <= 0){ pickS = s; break; } }
  const isNew = !S.souv.have[pickS.id];
  S.souv.have[pickS.id] = (S.souv.have[pickS.id] || 0) + 1;
  const bonus = away >= 12 * 3600e3 ? 4 : 2;
  if (isNew) addAlbum('souv', `おみやげ「${pickS.ja}」`, pickS.line, 'souv:' + pickS.id);
  Persist.schedule();
  Modal.show({
    label:'おるすばんのおみやげ',
    html:() => `<div class="souvwrap">${petCard()}<div class="souvitem"><svg viewBox="0 0 48 48" aria-hidden="true">${souvenirIcon(pickS.icon)}</svg>${isNew ? '<span class="newpill">NEW</span>' : ''}</div></div>
      <h3>おるすばん ありがとう！</h3>
      <p>${esc(S.pet.name)}が ${isCat() ? 'ねこのパトロール' : 'おさんぽ'}で<br><b>「${esc(pickS.ja)}」</b>を見つけてきたよ</p>
      <p class="quote">「${esc(pickS.line)}」</p>
      <p class="gainline">♥+${bonus}</p>
      <button class="btn primary" type="button" data-close>ありがとう</button>`,
  }).then(() => { gainLove(bonus); commit(); });
}

/* ===== seasonal events ===== */
function eventTreat(e){ return Object.assign({ line:e.hello, ev:e.id, evJa:e.ja }, EVENT_TREAT_STATS, e.treat); }
function checkEvent(){
  const ev = activeEvent();
  if (!ev || !S) return;
  const key = ev.id + ':' + new Date().getFullYear();
  if (S.events.seen[key]) return;
  S.events.seen[key] = now();
  const had = S.events.got.includes(ev.gift);
  if (!had) S.events.got.push(ev.gift);
  const w = WEAR_BY_ID[ev.gift];
  addAlbum('event', `${ev.ja}`, had ? 'ことしも いっしょに すごせたね' : `プレゼント「${w.ja}」をもらった`, 'gift');
  Persist.schedule();
  const trial = Object.assign({}, petWear(), { [w.slot]:w.id });
  Modal.show({
    label:ev.ja, confetti:true,
    html:`${petCard(trial)}<h3>${esc(ev.ja)}が はじまったよ！</h3>
      <p class="quote">「${esc(ev.hello)}」</p>
      <p>期間中は おへやが かざりつけされて、限定のおやつ<b>「${esc(ev.treat.ja)}」</b>が あげられます。</p>
      ${had ? '' : `<p class="giftline">${mini('gift')} プレゼント<b>「${esc(w.ja)}」</b></p>`}
      <div class="btnrow"><button class="btn" type="button" data-close="later">あとで</button><button class="btn primary" type="button" data-close="wear">つけてみる</button></div>`,
  }).then(v => {
    if (v === 'wear'){ const W = petWear(); W[w.slot] = w.id; S.pet.wear = W; track('dress', { slot:w.slot, id:w.id }); Pet.mount(); Pet.flash('happy', 1400); Pet.say('にあう？'); commit(); }
  });
}
function checkMilestones(){
  if (!S || !S.created) return;
  const days = daysBetween(S.created, now());
  for (const n of [7, 30, 100, 200, 300, 500, 1000]){
    const k = 'days' + n;
    if (days >= n && !S.milestones[k]){
      S.milestones[k] = true;
      addAlbum('days', `うちにきて${n}日`, n >= 100 ? 'これからも ずっといっしょだよ' : 'まいにち ありがとう', 'days', S.created + n * 864e5);
      if (days - n < 3) toast(`${S.pet.name}がうちにきて ${n}日！`);
    }
  }
  const c = new Date(S.created), d = new Date();
  const years = d.getFullYear() - c.getFullYear();
  if (years >= 1 && d.getMonth() === c.getMonth() && d.getDate() === c.getDate() && !S.milestones['anniv' + years]){
    S.milestones['anniv' + years] = true;
    addAlbum('days', `うちのこ記念日（${years}年）`, `${S.pet.name}がうちにきて ${years}年！`, 'days');
    Modal.show({ label:'うちのこ記念日', confetti:true,
      html:`${petCard()}<h3>うちのこ記念日！</h3><p>${esc(S.pet.name)}がうちにきて、きょうで<b>${years}年</b>。<br>いつも ありがとう。</p><button class="btn primary" type="button" data-close>おめでとう</button>` });
  }
}

/* ===== room: decoration, window view, seasonal decor ===== */
const svgUrl = s => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;
function wallBg(W){
  const pc = W.pc, b = W.base;
  switch (W.pat){
    case 'dots': return `radial-gradient(${pc} 2px,transparent 2.6px) 0 0/22px 22px,${b}`;
    case 'stripe': return `repeating-linear-gradient(90deg,${pc} 0 14px,transparent 14px 34px),${b}`;
    case 'check': return `linear-gradient(90deg,${pc} 50%,transparent 0) 0 0/30px 30px,linear-gradient(${pc} 50%,transparent 0) 0 0/30px 30px,${b}`;
    case 'heart': return `${svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34"><path d="M10 15c-5-3-6-6-4.4-7.8 1.2-1.2 3.2-.9 4.4.6 1.2-1.5 3.2-1.8 4.4-.6C16 9 15 12 10 15z" fill="${pc}"/><path d="M27 32c-5-3-6-6-4.4-7.8 1.2-1.2 3.2-.9 4.4.6 1.2-1.5 3.2-1.8 4.4-.6C33 26 32 29 27 32z" fill="${pc}"/></svg>`)} 0 0/34px 34px,${b}`;
    case 'wood': return `repeating-linear-gradient(90deg,${pc} 0 2px,transparent 2px 46px),${b}`;
    case 'star': return `${svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="46" height="46"><path d="M12 6l1.6 3.6 3.9.4-2.9 2.6.8 3.8L12 14.5l-3.4 1.9.8-3.8-2.9-2.6 3.9-.4z" fill="${pc}"/><circle cx="34" cy="30" r="1.6" fill="${pc}"/><circle cx="26" cy="12" r="1" fill="${pc}"/><circle cx="8" cy="36" r="1.2" fill="${pc}"/></svg>`)} 0 0/46px 46px,${b}`;
  }
  return b;
}
function floorBg(F){
  switch (F.pat){
    case 'boards': return `repeating-linear-gradient(90deg,rgba(120,80,40,.10) 0 2px,transparent 2px 64px),linear-gradient(${F.c1},${F.c2})`;
    case 'tatami': return `repeating-linear-gradient(90deg,rgba(90,90,30,.22) 0 3px,transparent 3px 96px),repeating-linear-gradient(0deg,rgba(90,90,30,.08) 0 1px,transparent 1px 5px),linear-gradient(${F.c1},${F.c2})`;
    case 'tile': return `conic-gradient(${F.c2} 25%,${F.c1} 0 50%,${F.c2} 0 75%,${F.c1} 0) 0 0/40px 40px`;
  }
  return `radial-gradient(rgba(255,255,255,.28) 1px,transparent 1.6px) 0 0/7px 7px,linear-gradient(${F.c1},${F.c2})`;
}
function rugBg(G){
  if (G.none) return 'none';
  if (G.stripe) return `repeating-linear-gradient(90deg,${G.stripe[0]} 0 18px,${G.stripe[1]} 18px 30px)`;
  if (G.id === 'tricolore') return `radial-gradient(ellipse closest-side,#1F4FA3 0 68%,#FFFFFF 68% 76%,#D9272E 76% 86%,#1F4FA3 86% 100%)`;
  const [a, b, c] = G.rings;
  return `radial-gradient(ellipse closest-side,${a} 0 58%,${b} 58% 63%,${c} 63% 100%)`;
}
function viewSvg(id){
  switch (id){
    case 'town': return '<g fill="var(--vw1)"><rect x="2" y="78" width="16" height="50"/><rect x="20" y="66" width="14" height="62"/><rect x="36" y="84" width="18" height="44"/><rect x="56" y="70" width="12" height="58"/><rect x="70" y="80" width="14" height="48"/><rect x="86" y="62" width="14" height="66"/></g>' +
      '<g fill="var(--vwin)"><rect x="6" y="84" width="3" height="4"/><rect x="11" y="92" width="3" height="4"/><rect x="24" y="72" width="3" height="4"/><rect x="28" y="82" width="3" height="4"/><rect x="41" y="90" width="3" height="4"/><rect x="47" y="98" width="3" height="4"/><rect x="60" y="76" width="3" height="4"/><rect x="74" y="88" width="3" height="4"/><rect x="90" y="70" width="3" height="4"/><rect x="94" y="80" width="3" height="4"/></g>';
    case 'mountain': return '<path d="M-5 128L30 66l22 30 18-24 36 56z" fill="var(--vw1)"/><path d="M30 66l-8 14 5-2 3 5 4-6 4 3z" fill="#FFFFFF" opacity=".9"/><path d="M-5 128c20-14 50-18 110-8v8z" fill="var(--vw2)"/>';
    case 'sea': return '<rect x="0" y="86" width="100" height="42" fill="var(--vsea)"/><path d="M0 92q6-3 12 0t12 0 12 0 12 0 12 0 12 0 12 0 12 0M0 102q6-3 12 0t12 0 12 0 12 0 12 0 12 0 12 0 12 0" stroke="#FFFFFF" stroke-width="1.6" fill="none" opacity=".6"/><path d="M0 116c30-6 60-6 100 0v12H0z" fill="#F3DFB4"/>';
    case 'forest': return '<g fill="var(--vw2)"><circle cx="8" cy="96" r="16"/><circle cx="32" cy="88" r="18"/><circle cx="58" cy="94" r="16"/><circle cx="84" cy="86" r="19"/></g><g fill="var(--vw1)"><circle cx="18" cy="110" r="16"/><circle cx="46" cy="106" r="17"/><circle cx="74" cy="110" r="16"/><circle cx="98" cy="104" r="14"/></g><rect x="0" y="116" width="100" height="12" fill="var(--vw1)"/>';
  }
  return '';
}
function garland(shape, cols){
  const W = 100, pts = 11;
  let s = `<path d="M0 3Q50 14 100 3" stroke="#B9A79A" stroke-width=".6" fill="none"/>`;
  for (let i = 1; i < pts; i++){
    const x = i * W / pts, t = x / W, y = 3 + 11 * 4 * t * (1 - t) * .5 + 1;
    const c = cols[i % cols.length];
    if (shape === 'flag') s += `<path d="M${(x - 3).toFixed(1)} ${y.toFixed(1)}h6l-3 6z" fill="${c}"/>`;
    else if (shape === 'heart') s += `<path d="M${x.toFixed(1)} ${(y + 6).toFixed(1)}c-4-2.4-4.6-4.6-3.4-5.8.9-.9 2.6-.6 3.4.5.8-1.1 2.5-1.4 3.4-.5 1.2 1.2.6 3.4-3.4 5.8z" fill="${c}"/>`;
    else if (shape === 'star') s += `<path d="M${x.toFixed(1)} ${(y).toFixed(1)}l1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8-2.1-1.9 2.8-.3z" fill="${c}"/>`;
    else if (shape === 'ball') s += `<circle cx="${x.toFixed(1)}" cy="${(y + 2.5).toFixed(1)}" r="2.4" fill="${c}"/>`;
    else if (shape === 'flower') s += `<circle cx="${x.toFixed(1)}" cy="${(y + 2.5).toFixed(1)}" r="2.6" fill="${c}"/><circle cx="${x.toFixed(1)}" cy="${(y + 2.5).toFixed(1)}" r="1" fill="#F5C04A"/>`;
  }
  return `<svg class="garland" viewBox="0 0 100 18" preserveAspectRatio="none" aria-hidden="true">${s}</svg>`;
}
const SEASON_DECOR = {
  halloween:{ g:['flag', ['#F0A04B','#7D5BA6','#2E2A33']], item:'<svg viewBox="0 0 80 70"><path d="M40 30c-14 0-22 7-22 17s10 15 22 15 22-5 22-15-8-17-22-17z" fill="#F0A04B" stroke="#A8642A" stroke-width="2.4"/><path d="M40 31c-6 4-6 26 0 30M40 31c6 4 6 26 0 30" fill="none" stroke="#C97A30" stroke-width="2"/><path d="M30 42l5 4-5 1zM50 42l-5 4 5 1z" fill="#5A3A24"/><path d="M31 53q9 6 18 0" stroke="#5A3A24" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M40 30c0-6 3-9 7-9" stroke="#5C8A3A" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="66" cy="58" r="7" fill="#9F8BD6" stroke="#6E5AA8" stroke-width="2"/><circle cx="14" cy="60" r="6" fill="#F7A9C4" stroke="#B5577A" stroke-width="2"/></svg>' },
  christmas:{ g:['ball', ['#E8505A','#F5C843','#3E8A45','#FFFFFF']], item:'<svg viewBox="0 0 80 90"><path d="M40 6L16 40h10L10 62h14L6 82h68L56 62h14L54 40h10z" fill="#3E8A45" stroke="#24602C" stroke-width="2.4" stroke-linejoin="round"/><rect x="34" y="80" width="12" height="9" fill="#8B5A3C"/><path d="M40 0l2.2 4.6 5 .5-3.8 3.4 1.1 5L40 11l-4.5 2.5 1.1-5L32.8 5l5-.5z" fill="#F5C843"/><circle cx="30" cy="36" r="3" fill="#E8505A"/><circle cx="48" cy="52" r="3" fill="#F5C843"/><circle cx="26" cy="68" r="3" fill="#7EC4E8"/><circle cx="54" cy="72" r="3" fill="#E8505A"/></svg>' },
  newyear:{ g:['flag', ['#E8505A','#FFFFFF','#F5C843']], item:'<svg viewBox="0 0 80 70"><path d="M10 66h60l-6-12H16z" fill="#C9A97A" stroke="#8B6A3E" stroke-width="2"/><ellipse cx="40" cy="48" rx="26" ry="10" fill="#FFFFFF" stroke="#B9B4C2" stroke-width="2.4"/><ellipse cx="40" cy="36" rx="19" ry="8" fill="#FFFFFF" stroke="#B9B4C2" stroke-width="2.4"/><circle cx="40" cy="24" r="8" fill="#F5A43A" stroke="#C47A1E" stroke-width="2"/><path d="M40 16c2-4 6-5 9-3-3 3-6 4-9 3z" fill="#5C8A3A"/></svg>' },
  valentine:{ g:['heart', ['#F0728E','#F7A9C4','#E8505A']], item:'<svg viewBox="0 0 80 70"><rect x="16" y="30" width="48" height="36" rx="4" fill="#F497B0" stroke="#B5577A" stroke-width="2.4"/><rect x="12" y="24" width="56" height="12" rx="3" fill="#F7A9C4" stroke="#B5577A" stroke-width="2.4"/><path d="M40 24v42" stroke="#FFFFFF" stroke-width="5"/><path d="M40 24c-6-12-18-9-14-2 3 4 9 3 14 2zM40 24c6-12 18-9 14-2-3 4-9 3-14 2z" fill="#FFFFFF" stroke="#B5577A" stroke-width="2"/></svg>' },
  sakura:{ g:['flower', ['#F9C6D3','#FBD9E2','#F4B4C6']], item:'<svg viewBox="0 0 80 90"><path d="M30 60h20l-3 28H33z" fill="#7EC4E8" stroke="#3E7FA8" stroke-width="2.2"/><path d="M40 62C38 40 26 26 14 18M40 62c2-22 14-36 28-42M40 62c0-20 4-34 2-48" stroke="#8B5A3C" stroke-width="2.6" fill="none" stroke-linecap="round"/>' + [[14,18],[24,26],[68,20],[56,30],[42,14],[34,36],[50,42]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#F9C6D3" stroke="#D98AA0" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="1.8" fill="#E8869E"/>`).join('') + '</svg>' },
  kodomo:{ g:['flag', ['#5B8FD9','#E8505A','#F5C843','#7CC26A']], item:'<svg viewBox="0 0 80 100"><path d="M10 98V6" stroke="#8B5A3C" stroke-width="3.4" stroke-linecap="round"/><circle cx="10" cy="6" r="4" fill="#F5C843"/><path d="M12 14h50l8 8-8 8H12z" fill="#2E2A33"/><path d="M12 38h44l8 8-8 8H12z" fill="#E8505A"/><path d="M12 62h36l8 8-8 8H12z" fill="#5B8FD9"/><circle cx="20" cy="22" r="3" fill="#FFFFFF"/><circle cx="20" cy="46" r="3" fill="#FFFFFF"/><circle cx="20" cy="70" r="3" fill="#FFFFFF"/></svg>' },
  tsuyu:{ g:['ball', ['#9FB4EA','#B9A6E6','#8FC7EA']], item:'<svg viewBox="0 0 80 90"><path d="M40 4v14" stroke="#9AA3B5" stroke-width="1.6"/><circle cx="40" cy="28" r="11" fill="#FFFFFF" stroke="#9AA3B5" stroke-width="2.2"/><path d="M29 34c-6 14-4 22 11 22s17-8 11-22" fill="#FFFFFF" stroke="#9AA3B5" stroke-width="2.2"/><circle cx="36" cy="27" r="1.4" fill="#3A3147"/><circle cx="44" cy="27" r="1.4" fill="#3A3147"/><path d="M37 31q3 2 6 0" stroke="#3A3147" stroke-width="1.4" fill="none"/><path d="M33 38h14" stroke="#F0728E" stroke-width="2.6" stroke-linecap="round"/></svg>' },
  tanabata:{ g:['star', ['#F5C843','#FFFFFF','#9FB4EA']], item:'<svg viewBox="0 0 80 100"><path d="M40 98C40 70 38 40 34 6" stroke="#5C8A3A" stroke-width="3.4" fill="none" stroke-linecap="round"/>' + [[22,26],[52,22],[18,48],[58,46],[26,70],[56,70]].map(([x, y], i) => `<path d="M${x} ${y}c${x < 40 ? 10 : -10} -4 ${x < 40 ? 14 : -14} -2 ${x < 40 ? 16 : -16} 2" stroke="#7CC26A" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="${x - 3}" y="${y + 2}" width="6" height="14" rx="1" fill="${['#F0728E','#F5C843','#7EC4E8','#B8A6EC','#7CC26A','#F0A04B'][i]}"/>`).join('') + '</svg>' },
  summer:{ g:null, item:'<svg viewBox="0 0 80 70"><path d="M8 50h64a32 32 0 0 1-64 0z" transform="translate(0 -14)" fill="#E8505A" stroke="#3E8A45" stroke-width="4"/><g fill="#2E2A33"><ellipse cx="26" cy="44" rx="1.6" ry="2.6"/><ellipse cx="40" cy="48" rx="1.6" ry="2.6"/><ellipse cx="54" cy="44" rx="1.6" ry="2.6"/></g></svg>', hang:'<svg viewBox="0 0 40 60"><path d="M20 0v12" stroke="#9AA3B5" stroke-width="1.4"/><path d="M8 26a12 12 0 0 1 24 0z" fill="#CDEEF7" stroke="#6FA8C2" stroke-width="1.8"/><path d="M12 22q4-4 8 0" stroke="#F0728E" stroke-width="2" fill="none"/><path d="M20 26v10" stroke="#9AA3B5" stroke-width="1"/><rect x="15" y="36" width="10" height="20" rx="1" fill="#FFF3C9" stroke="#C9A44C" stroke-width="1.2"/></svg>' },
  tsukimi:{ g:null, item:'<svg viewBox="0 0 80 90"><path d="M24 88V40M28 88C28 60 22 36 10 22M30 88c0-30 8-50 22-62" stroke="#B9A06A" stroke-width="2.4" fill="none"/><path d="M10 22c-4 6-2 12 2 14M52 26c4-4 10-4 12 0M24 40c-4-6-2-14 4-16" stroke="#E7D9B0" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M44 88h30l-4-8H48z" fill="#C9A97A"/><circle cx="52" cy="74" r="6" fill="#FFFFFF" stroke="#C9B9B0" stroke-width="1.6"/><circle cx="66" cy="74" r="6" fill="#FFFFFF" stroke="#C9B9B0" stroke-width="1.6"/><circle cx="59" cy="64" r="6" fill="#FFFFFF" stroke="#C9B9B0" stroke-width="1.6"/></svg>' },
};
function applyRoom(){
  if (!S) return;
  const R = S.room;
  const W = findDecor('wall', R.wall), F = findDecor('floor', R.floor), G = findDecor('rug', R.rug), B = findDecor('bed', R.bed), V = findDecor('view', R.view);
  $('.wall').style.background = wallBg(W);
  $('.floor').style.background = floorBg(F);
  const rug = $('.rug');
  rug.hidden = !!G.none;
  rug.style.background = rugBg(G);
  stage.style.setProperty('--bed', B.c); stage.style.setProperty('--bedI', B.i); stage.style.setProperty('--bedL', B.l);
  $('#viewArt').innerHTML = viewSvg(V.id);
  stage.dataset.walldark = W.id === 'starry' ? '1' : '';
  renderSeason();
}
function renderSeason(){
  const box = $('#evDeco'), hang = $('#evHang'), weather = $('#weather');
  const ev = S && S.room.season ? activeEvent() : null;
  const sd = ev ? SEASON_DECOR[ev.decor] : null;
  box.innerHTML = sd ? `${sd.g ? `<div class="gl">${garland(sd.g[0], sd.g[1])}</div>` : ''}<div class="evitem">${sd.item}</div>` : '';
  hang.innerHTML = sd && sd.hang ? sd.hang : (ev && ev.decor === 'tsuyu' ? SEASON_DECOR.tsuyu.item : '');
  if (ev && ev.decor === 'tsuyu'){ box.querySelector('.evitem') && box.querySelector('.evitem').remove(); }
  const w = S && S.room.season ? weatherOf() : null;
  weather.className = 'weather' + (w ? ' w-' + w : '');
  stage.dataset.event = ev ? ev.id : '';
}

/* ===== room tab inside きせかえ ===== */
let roomCat = 'wall';
function roomSwatch(cat, d){
  if (cat === 'wall') return `<span class="rsw" style="background:${wallBg(d)}"></span>`;
  if (cat === 'floor') return `<span class="rsw" style="background:${floorBg(d)}"></span>`;
  if (cat === 'rug') return `<span class="rsw rsw-floor"><i class="rsw-rug" style="background:${d.none ? 'transparent' : rugBg(d)};${d.none ? 'box-shadow:inset 0 0 0 2px rgba(0,0,0,.15);' : ''}"></i></span>`;
  if (cat === 'bed') return `<span class="rsw rsw-floor"><svg viewBox="0 0 200 90" class="rsw-bed"><ellipse cx="100" cy="52" rx="95" ry="34" style="fill:${d.c};stroke:${d.l}" stroke-width="5"/><ellipse cx="100" cy="47" rx="70" ry="22" style="fill:${d.i}"/></svg></span>`;
  return `<span class="rsw rsw-win"><svg viewBox="0 0 100 128" preserveAspectRatio="xMidYMax slice">${viewSvg(d.id)}</svg></span>`;
}
function roomTabHtml(){
  const lv = lvNow();
  const chips = DECOR_CATS.map(([k, ja]) => `<button class="chip" type="button" data-rc="${k}" aria-pressed="${k === roomCat}">${ja}</button>`).join('');
  const tiles = DECOR[roomCat].map(d => {
    const locked = lv < d.lv;
    return `<button class="tile rtile" type="button" data-rd="${d.id}" aria-pressed="${S.room[roomCat] === d.id}" ${locked ? 'aria-disabled="true"' : ''}>${roomSwatch(roomCat, d)}<span class="tname">${esc(d.ja)}</span>${locked ? `<span class="lockpill">Lv${d.lv}で解放</span>` : ''}</button>`;
  }).join('');
  const ev = activeEvent();
  return `<div class="chips rchips">${chips}</div><div class="tiles">${tiles}</div>
    <div class="seasonrow"><span>${ev ? `いまは<b>${esc(ev.ja)}</b>。` : ''}季節のかざりつけ</span><div class="seg mini-seg"><button type="button" data-season="1" aria-pressed="${S.room.season}">あり</button><button type="button" data-season="0" aria-pressed="${!S.room.season}">なし</button></div></div>`;
}
function wireRoomTab(root, rerender){
  root.querySelectorAll('[data-rc]').forEach(b => b.addEventListener('click', () => { roomCat = b.dataset.rc; rerender(); }));
  root.querySelectorAll('[data-rd]').forEach(b => b.addEventListener('click', () => {
    if (b.getAttribute('aria-disabled') === 'true') return;
    const d = findDecor(roomCat, b.dataset.rd);
    if (S.room[roomCat] === d.id) return;
    S.room[roomCat] = d.id;
    applyRoom();
    track('room', { ja:d.ja });
    if (!Pet.busy && !Pet.sleeping){ Pet.flash('happy', 1400); Pet.say(pick(['すてき！','いいかんじ！','わくわくする！'])); }
    commit();
    rerender();
  }));
  root.querySelectorAll('[data-season]').forEach(b => b.addEventListener('click', () => { S.room.season = b.dataset.season === '1'; applyRoom(); commit(); rerender(); }));
}

/* ===== tricks ===== */
const TRICK_MS = { sit:1100, paw:1600, down:1500, spin:1000, bigjump:900, high:1600, roll:1300, bow:1400, dance:1800, bang:2200, stretch:1600, punch:1500 };
function trickState(id){ return S.tricks[id] || (S.tricks[id] = { p:0, ok:false }); }
function openTricks(){
  if (Pet.busy || !S) return;
  const lv = lvNow(), list = TRICKS[S.pet.species] || TRICKS.dog;
  const learned = list.filter(t => S.tricks[t.id] && S.tricks[t.id].ok).length;
  const tiles = list.map(t => {
    const st = S.tricks[t.id] || { p:0, ok:false }, locked = lv < t.lv;
    const dots = Array.from({ length:t.need }, (_, i) => `<i class="${i < st.p ? 'on' : ''}"></i>`).join('');
    return `<button class="tile trick ${st.ok ? 'learned' : ''}" type="button" data-tk="${t.id}" ${locked ? 'aria-disabled="true"' : ''}>
      <span class="tk-star">${mini('trick', st.ok ? '' : 'dim')}</span><span class="tname">${esc(t.ja)}</span>
      ${locked ? `<span class="lockpill">Lv${t.lv}で解放</span>` : st.ok ? '<span class="okpill">できる！</span>' : `<span class="tk-dots" aria-label="れんしゅう ${st.p}/${t.need}">${dots}</span>`}</button>`;
  }).join('');
  openSheet('げい', `<p class="sheet-sub">おぼえた げい ${learned} / ${list.length}　れんしゅうして、できるようになったら いつでも見せてくれます。</p><div class="tiles">${tiles}</div><p class="note">ごきげんがいいと、れんしゅうが うまくいきやすいよ。</p>`, sh => {
    sh.querySelectorAll('[data-tk]').forEach(b => b.addEventListener('click', () => {
      if (b.getAttribute('aria-disabled') === 'true') return;
      doTrick(list.find(t => t.id === b.dataset.tk));
    }));
  });
}
async function doTrick(tk){
  closeSheet();
  if (Pet.busy || !S) return;
  decay();
  if (S.stats.full < 10){ Pet.wake(); Pet.flash('sad', 2000); Pet.say('おなかがすいて できないよ…'); return; }
  begin();
  await Pet.moveTo(50, 80, 1.2);
  Pet.say(tk.cue, 1100);
  await sleep(800);
  const st = trickState(tk.id);
  const pOk = Math.min(.93, .55 + st.p * .07 + (S.stats.mood >= 60 ? .1 : 0));
  const success = st.ok || Math.random() < pOk;
  const day = dayKey();
  if (S.trickDay.day !== day){ S.trickDay.day = day; S.trickDay.love = 0; }
  if (success){
    const cls = 'tr-' + tk.anim;
    if (tk.anim === 'bang') Pet.setExpr('sleep'); else Pet.setExpr('happy');
    Pet.el.classList.add(cls);
    await sleep(TRICK_MS[tk.anim] || 1200);
    Pet.el.classList.remove(cls);
    Pet.setExpr('happy'); Pet.wag(1500); hearts(3);
    S.stats.mood = clamp(S.stats.mood + 3, 0, 100);
    if (S.trickDay.love < 10){ S.trickDay.love += 1; gainLove(1); }
    if (!st.ok){
      st.p++;
      if (st.p >= tk.need){
        st.ok = true;
        addAlbum('trick', `げい「${tk.ja}」をおぼえた！`, `${tk.need}回のれんしゅうで できるようになったね`, 'trick');
        gainLove(5);
        Pet.say('できるように なったよ！');
        Modal.show({ label:'げいをおぼえた', confetti:true,
          html:`${petCard()}<h3>げい「${esc(tk.ja)}」を<br>おぼえた！</h3><p>これからは いつでも見せてくれます。<br>♥+5</p><button class="btn primary" type="button" data-close>すごいね！</button>` });
      } else Pet.say(`できた！（${st.p}/${tk.need}）`);
    } else Pet.say(pick(['どう？','じょうずでしょ！','えへへ','もっと見る？']));
  } else {
    Pet.tilt(); Pet.say(pick(['？？？','えっと…','むずかしいな…']), 1400);
    await sleep(1200);
    Pet.say('もういっかい やってみる！', 1600);
  }
  track('trick', { id:tk.id });
  await sleep(1000);
  Pet.setExpr(null);
  finish();
}

/* ===== album sheet ===== */
let albumTab = 'diary', stampMonth = null;
const SEASON_JA = { spring:'はる', summer:'なつ', autumn:'あき', winter:'ふゆ', all:'いつでも' };
function albumHtml(){
  const tabs = [['diary','にっき'],['souv','おみやげ'],['stamp','スタンプ']].map(([k, ja]) => `<button type="button" data-at="${k}" aria-pressed="${k === albumTab}">${ja}</button>`).join('');
  let body = '';
  if (albumTab === 'diary'){
    body = S.album.length ? `<ol class="diary">${S.album.map(a => `<li><span class="d-date">${fmtMD(a.t)}<small>${new Date(a.t).getFullYear()}</small></span><span class="d-ic">${iconFor(a.ic)}</span><span class="d-txt"><b>${esc(a.ti)}</b>${a.su ? `<small>${esc(a.su)}</small>` : ''}</span></li>`).join('')}</ol>`
      : '<p class="empty">まだ記録がありません。いっしょに すごすと、ここに思い出がたまっていきます。</p>';
  } else if (albumTab === 'souv'){
    const got = SOUVENIRS.filter(s => S.souv.have[s.id]).length;
    body = `<p class="sheet-sub">あつめた おみやげ ${got} / ${SOUVENIRS.length}　しばらく あけてから ひらくと、おみやげを もってきてくれます。</p><div class="tiles svtiles">${SOUVENIRS.slice().sort((a, b) => (S.souv.have[b.id] ? 1 : 0) - (S.souv.have[a.id] ? 1 : 0)).map(s => {
      const n = S.souv.have[s.id];
      return n ? `<div class="tile sv"><svg viewBox="0 0 48 48" aria-hidden="true">${souvenirIcon(s.icon)}</svg><span class="tname">${esc(s.ja)}</span><small>×${n}</small></div>`
        : `<div class="tile sv unknown"><svg viewBox="0 0 48 48" aria-hidden="true">${souvenirIcon(s.icon)}</svg><span class="tname">？？？</span><small>${s.seasons.split(' ').map(x => SEASON_JA[x]).join('・')}</small></div>`;
    }).join('')}</div>`;
  } else {
    const base = stampMonth || new Date();
    const y = base.getFullYear(), m = base.getMonth();
    const firstDow = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), today = dayKey();
    const set = new Set(S.stamps);
    let cells = '';
    for (let i = 0; i < firstDow; i++) cells += '<span></span>';
    for (let d = 1; d <= days; d++){
      const k = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells += `<span class="${set.has(k) ? 'st' : ''} ${k === today ? 'today' : ''}">${set.has(k) ? mini('stamp') : ''}<i>${d}</i></span>`;
    }
    const cur = S.streak.last === dayKey() || S.streak.last === dayKey(new Date(Date.now() - 864e5)) ? S.streak.n : 0;
    body = `<div class="cal-head"><button class="closebtn" type="button" data-mon="-1" aria-label="前の月">‹</button><b>${y}年${m + 1}月</b><button class="closebtn" type="button" data-mon="1" aria-label="次の月">›</button></div>
      <div class="cal"><b>日</b><b>月</b><b>火</b><b>水</b><b>木</b><b>金</b><b>土</b>${cells}</div>
      <div class="counts cal-stats"><div><b>${cur}</b>れんぞく</div><div><b>${S.streak.best || 0}</b>さいこう</div><div><b>${S.stamps.length}</b>ぜんぶ</div><div><b>${S.stamps.filter(k => k.startsWith(`${y}-${String(m + 1).padStart(2, '0')}`)).length}</b>この月</div></div>
      <p class="note">きょうのおねがいを ぜんぶかなえた日に、スタンプがつきます。</p>`;
  }
  return `<div class="seg" role="tablist">${tabs}</div>${body}`;
}
function openAlbum(tab){
  if (!S) return;
  if (tab) albumTab = tab;
  stampMonth = null;
  openSheet('おもいでアルバム', `<div id="albumBox">${albumHtml()}</div>`, sh => {
    const box = sh.querySelector('#albumBox');
    const wire = () => {
      box.querySelectorAll('[data-at]').forEach(b => b.addEventListener('click', () => { albumTab = b.dataset.at; box.innerHTML = albumHtml(); wire(); }));
      box.querySelectorAll('[data-mon]').forEach(b => b.addEventListener('click', () => {
        const base = stampMonth || new Date();
        stampMonth = new Date(base.getFullYear(), base.getMonth() + Number(b.dataset.mon), 1);
        box.innerHTML = albumHtml(); wire();
      }));
    };
    wire();
  });
}

/* ===== lifecycle hooks ===== */
const Features = {
  start(away){
    ensureState(S);
    if (!S.album.length) addAlbum('home', `${S.pet.name}が うちのこになった日`, breedLabel(S.pet), 'home', S.created || now());
    ensureDaily();
    applyRoom();
    renderReqBadge();
    checkMilestones();
    checkEvent();
    maybeSouvenir(away);
    Persist.schedule();
  },
  resume(away){
    ensureDaily();
    renderReqBadge();
    renderSeason();
    checkMilestones();
    checkEvent();
    maybeSouvenir(away);
  },
  hint(){
    if (!S || !S.daily || Math.random() > .35) return null;
    const open = S.daily.list.filter(r => !r.done);
    if (!open.length) return null;
    const r = pick(open);
    return reqText(r).replace(/ほしい$/, 'ほしいな').replace(/たい$/, 'たいな');
  },
};
