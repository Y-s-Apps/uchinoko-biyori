/* ===== app core ===== */
const $ = s => document.querySelector(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const now = () => Date.now();
const pick = a => a[Math.floor(Math.random() * a.length)];
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
const STORE_KEY = 'uchinoko-biyori:v1';
const BOWL = { x:24, y:93 }, BED = { x:76, y:84 };
let S = null;

const CL = window.claude && typeof window.claude.use === 'function' ? window.claude : null;
const useCap = name => CL ? CL.use(name).catch(() => null) : Promise.resolve(null);

/* ----- state ----- */
function newState(pet){
  const t = now();
  return { v:1, pet, stats:{ full:72, mood:78, love:0 }, counts:{ meals:0, treats:0, pets:0, plays:0 }, recentTreats:[], last:t, created:t, updated:t };
}
function decay(t = now()){
  if (!S) return;
  const hrs = Math.max(0, (t - (S.last || t)) / 3.6e6);
  const s = S.stats;
  s.full = clamp(s.full - hrs * 8, 0, 100);
  s.mood = clamp(s.mood - hrs * 5 - (s.full < 25 ? hrs * 4 : 0), 0, 100);
  S.last = t;
}
function levelInfo(love){
  let lv = 1, acc = 0, need = 20;
  while (lv < MAX_LV && love >= acc + need){ acc += need; lv++; need = 20 + (lv - 1) * 5; }
  const max = lv >= MAX_LV;
  return { lv, into:max ? need : love - acc, need, max };
}
function petWear(){
  if (!S.pet.wear){ S.pet.wear = wearFrom(S.pet); delete S.pet.acc; }
  for (const k of ['head','face','neck']){
    const v = S.pet.wear[k];
    if (v && WEAR_RENAMED[v]) S.pet.wear[k] = WEAR_RENAMED[v];
    else if (v && !WEAR_BY_ID[v]) S.pet.wear[k] = null;
  }
  return S.pet.wear;
}
function nextupHtml(nx){
  return `<p class="nextup"><span class="nx-head">つぎのごほうび</span><span class="nx-body"><b>Lv.${nx.lv}</b> <span class="nx-item">${esc(nx.ja)}</span></span></p>`;
}
function nextReward(lv){
  const items = [];
  (TREATS[S.pet.species] || []).forEach(t => { if (t.lv > lv) items.push({ lv:t.lv, ja:'おやつ「' + t.ja + '」' }); });
  WEAR.forEach(w => { if (w.lv > lv) items.push({ lv:w.lv, ja:'きせかえ「' + w.ja + '」' }); });
  DECOR_CATS.forEach(([k]) => DECOR[k].forEach(d => { if (d.lv > lv) items.push({ lv:d.lv, ja:'もようがえ「' + d.ja + '」' }); }));
  (TRICKS[S.pet.species] || []).forEach(t => { if (t.lv > lv) items.push({ lv:t.lv, ja:'芸「' + t.ja + '」' }); });
  items.sort((a, b) => a.lv - b.lv);
  return items[0] || null;
}

/* ----- saving: private per-person doc in db, mirrored to this browser ----- */
const Persist = {
  ref:null, mode:'local', timer:null, writing:false, again:false,
  loadLocal(){ try { const t = localStorage.getItem(STORE_KEY); const v = t ? JSON.parse(t) : null; return v && v.pet ? v : null; } catch(e){ return null; } },
  saveLocal(){ try { if (S) localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch(e){} },
  schedule(){
    if (!S) return;
    S.updated = now();
    this.saveLocal();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), 1200);
  },
  async flush(){
    if (!this.ref || !S) return;
    if (this.writing){ this.again = true; return; }
    this.writing = true;
    try { await this.ref.set(JSON.parse(JSON.stringify(S))); this.mode = 'cloud'; }
    catch(e){
      const code = e && e.code;
      if (code === 'unavailable'){ setTimeout(() => this.flush(), 1500 + Math.random() * 1500); }
      else { this.ref = null; this.mode = 'local'; }
    }
    this.writing = false;
    if (this.again){ this.again = false; this.flush(); }
  },
  async connect(){
    const [db, user] = await Promise.all([useCap('db'), useCap('user')]);
    if (!db || !user) return;
    let uid = null;
    try { uid = await user.id(); } catch(e){}
    if (!uid) return;
    try {
      const ref = db.doc('data/users/' + uid + '/pet');
      const snap = await ref.get();
      this.ref = ref; this.mode = 'cloud';
      const remote = snap.exists ? snap.data() : null;
      if (remote && remote.pet && (!S || (remote.updated || 0) > (S.updated || 0))){
        S = JSON.parse(JSON.stringify(remote));
        this.saveLocal();
        Game.onStateReplaced();
      } else if (S && (!remote || (S.updated || 0) > (remote.updated || 0))){
        this.flush();
      }
    } catch(e){ this.ref = null; this.mode = 'local'; }
  },
};

/* ----- small fx ----- */
const stage = $('#stage');
function stageXY(clientX, clientY){
  const r = stage.getBoundingClientRect();
  return { x:clientX - r.left, y:clientY - r.top };
}
function fx(cls, x, y, html, style){
  const el = document.createElement('div');
  el.className = 'fx ' + cls;
  el.style.left = x + 'px'; el.style.top = y + 'px';
  if (style) for (const k in style) el.style.setProperty(k, style[k]);
  if (html) el.innerHTML = html;
  stage.appendChild(el);
  setTimeout(() => el.remove(), 2600);
  return el;
}
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.6 6.6 4.6c2.2 0 3.6 1.2 4.4 2.5.8-1.3 2.2-2.5 4.4-2.5 3.6 0 5.7 3.8 4.2 7.2C19.5 16.4 12 21 12 21z" fill="#F0728E" stroke="#FFFFFF" stroke-width="1.6"/></svg>';
function heartAt(x, y){ fx('heart', x, y, HEART, { '--dx': (Math.random() * 40 - 20).toFixed(0) + 'px' }); }
function hearts(n){
  const h = Pet.headPoint();
  for (let i = 0; i < n; i++) setTimeout(() => heartAt(h.x + (Math.random() * 60 - 30), h.y + (Math.random() * 20 - 10)), i * 140);
}
let toastT = null;
function toast(msg){
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ----- time of day ----- */
function tod(){
  const h = new Date().getHours();
  if (h >= 5 && h < 9) return 'morning';
  if (h >= 9 && h < 16) return 'day';
  if (h >= 16 && h < 19) return 'evening';
  return 'night';
}
function updateClock(){
  const d = new Date(), h = d.getHours() % 12, m = d.getMinutes();
  $('#clockH').style.transform = `rotate(${h * 30 + m * .5}deg)`;
  $('#clockM').style.transform = `rotate(${m * 6}deg)`;
  stage.dataset.tod = tod();
}

/* ----- the pet on stage ----- */
const Pet = {
  el: $('#pet'), x:50, y:80, busy:false, sleeping:false, expr:null, tok:0, sayT:null, wakeUntil:0,
  scaleAt(y){ return .84 + clamp((y - 66) / 24, 0, 1) * .22; },
  apply(){
    this.el.style.left = this.x + '%';
    this.el.style.top = this.y + '%';
    this.el.style.zIndex = String(10 + Math.round(this.y));
    this.el.style.setProperty('--s', this.scaleAt(this.y).toFixed(3));
  },
  mount(){
    $('#petArt').innerHTML = renderPet(S.pet.look, { wear:petWear() });
    this.apply();
    this.setExpr(this.expr);
  },
  headPoint(){
    const r = this.el.getBoundingClientRect(), s = stage.getBoundingClientRect();
    return { x:r.left - s.left + r.width / 2, y:r.top - s.top + r.height * .38 };
  },
  mouthPoint(){
    const r = this.el.getBoundingClientRect(), s = stage.getBoundingClientRect();
    return { x:r.left - s.left + r.width / 2, y:r.top - s.top + r.height * .52 };
  },
  baseExpr(){
    if (this.sleeping) return 'sleep';
    if (S && (S.stats.full < 25 || S.stats.mood < 28)) return 'sad';
    return null;
  },
  setExpr(e){
    this.expr = e;
    const cur = e || this.baseExpr();
    this.el.classList.remove('ex-happy', 'ex-eat', 'ex-sleep', 'ex-sad');
    if (cur) this.el.classList.add('ex-' + cur);
  },
  flash(e, ms){ this.setExpr(e); clearTimeout(this.flashT); this.flashT = setTimeout(() => this.setExpr(null), ms); },
  say(text, ms = 2400){
    const b = $('#bubble');
    b.textContent = text; b.classList.add('show');
    clearTimeout(this.sayT); this.sayT = setTimeout(() => b.classList.remove('show'), ms);
  },
  moveTo(x, y, speed = 1){
    const d = Math.hypot(x - this.x, (y - this.y) * 1.6);
    const ms = Math.max(260, d * 36 / speed);
    const tok = ++this.tok;
    this.el.style.transition = `left ${ms}ms linear, top ${ms}ms linear, transform ${ms}ms linear`;
    this.el.classList.add('walking');
    this.el.classList.toggle('dir-l', x < this.x);
    this.x = x; this.y = y; this.apply();
    return sleep(ms).then(() => { if (tok === this.tok) this.el.classList.remove('walking'); });
  },
  jump(){ this.el.classList.remove('jump'); void this.el.offsetWidth; this.el.classList.add('jump'); setTimeout(() => this.el.classList.remove('jump'), 520); },
  tilt(){ this.el.classList.remove('tilt'); void this.el.offsetWidth; this.el.classList.add('tilt'); setTimeout(() => this.el.classList.remove('tilt'), 1000); },
  wag(ms = 1500){ this.el.classList.add('wag-fast'); clearTimeout(this.wagT); this.wagT = setTimeout(() => this.el.classList.remove('wag-fast'), ms); },
  zz:null,
  sleep(){
    this.sleeping = true;
    this.el.classList.add('pose-sleep');
    this.setExpr(null);
    clearInterval(this.zz);
    this.zz = setInterval(() => { const h = this.headPoint(); fx('z', h.x + 20, h.y - 10, 'z'); }, 1700);
  },
  wake(stay = 25000){
    this.wakeUntil = now() + stay;
    if (!this.sleeping) return false;
    this.sleeping = false;
    clearInterval(this.zz);
    this.el.classList.remove('pose-sleep');
    this.setExpr(null);
    return true;
  },
};

/* ----- idle life ----- */
let idleT = null, lastChat = 0, dragging = false;
function idleTick(delay){
  clearTimeout(idleT);
  idleT = setTimeout(idleStep, delay != null ? delay : 3200 + Math.random() * 5200);
}
async function idleStep(){
  if (!S || Pet.busy || dragging || document.hidden) return idleTick();
  const night = stage.dataset.tod === 'night';
  if (Pet.sleeping){
    if (!night && Math.random() < .35){ Pet.wake(); Pet.say(pick(['ふぁ〜あ','よくねた〜'])); }
    return idleTick();
  }
  if (now() > Pet.wakeUntil && (night ? Math.random() < .55 : Math.random() < .05)){
    await Pet.moveTo(BED.x, BED.y - 1, .8);
    if (!Pet.busy) Pet.sleep();
    return idleTick(night ? 20000 : 14000 + Math.random() * 10000);
  }
  const r = Math.random();
  if (r < .5){
    const tx = 22 + Math.random() * 56, ty = 70 + Math.random() * 18;
    await Pet.moveTo(tx, ty, .7 + Math.random() * .4);
  } else if (r < .66){
    Pet.tilt();
  } else if (r < .78 && S.stats.mood > 60){
    Pet.jump(); Pet.flash('happy', 1000); Pet.wag(1200);
  } else if (now() - lastChat > 30000){
    lastChat = now();
    Pet.say(ambientLine());
  }
  idleTick();
}
function ambientLine(){
  const s = S.stats, cat = S.pet.species === 'cat', t = stage.dataset.tod;
  if (s.full < 25) return pick(['おなかすいたな…','ごはん、まだかな','ぐぅ〜']);
  if (s.mood < 30) return pick(['かまってほしいな','なでてほしいな…','あそぼ？']);
  const h = Features.hint(); if (h) return h;
  if (t === 'morning') return pick(['おはよう！','いい朝だね', cat ? 'にゃ〜ん' : 'わん！']);
  if (t === 'night') return pick(['ねむねむ…','そろそろ寝よっか','おやすみの時間？']);
  if (t === 'evening') return pick(['ゆうやけ、きれいだね','おかえり！','おつかれさま']);
  return pick(cat ? ['にゃ〜','ゴロゴロ…','ひなたぼっこしたいな','♪'] : ['わん！','しっぽぶんぶん','おさんぽ行きたいな','♪']);
}

/* ----- stats ui ----- */
function renderStats(){
  if (!S) return;
  const s = S.stats;
  const full = Math.round(s.full), mood = Math.round(s.mood);
  $('#bFull').style.width = full + '%';
  $('#bMood').style.width = mood + '%';
  $('#sFull').textContent = full >= 80 ? 'まんぷく' : full >= 45 ? 'ちょうどいい' : full >= 20 ? 'こばら' : 'ぺこぺこ';
  $('#sMood').textContent = mood >= 80 ? 'るんるん' : mood >= 50 ? 'ごきげん' : mood >= 25 ? 'まあまあ' : 'さみしい';
  $('#mFull').classList.toggle('low', full < 20);
  $('#mMood').classList.toggle('low', mood < 25);
  const L = levelInfo(s.love);
  $('#lvNum').textContent = 'Lv' + L.lv;
  $('#bLove').style.width = Math.round(L.into / L.need * 100) + '%';
  $('#sLove').textContent = L.max ? 'なかよしMAX' : 'つぎのLvまで あと' + Math.ceil(L.need - L.into);
  if (!Pet.busy) Pet.setExpr(Pet.expr);
}
function breedLabel(p){
  const b = BREED_BY_ID[p.breedId];
  const bn = b ? b.ja : '';
  if (!p.colorName) return bn;
  return p.colorName.includes(bn) ? p.colorName : p.colorName + 'の' + bn;
}
function renderHeader(){
  $('#petName').textContent = S.pet.name;
  $('#petBreed').textContent = breedLabel(S.pet);
  const f = $('#frame');
  if (S.pet.photo){ $('#frameImg').src = S.pet.photo; f.hidden = false; } else f.hidden = true;
}
function lockDock(on){ document.querySelectorAll('.act').forEach(b => b.setAttribute('aria-disabled', on ? 'true' : 'false')); }

/* ----- care actions ----- */
function commit(){ Persist.schedule(); renderStats(); }
function gainLove(n){
  const before = levelInfo(S.stats.love).lv;
  S.stats.love = Math.round((S.stats.love + n) * 10) / 10;
  const after = levelInfo(S.stats.love).lv;
  if (after > before){
    for (let lv = before + 1; lv <= after; lv++){
      const t = TITLES.find(([l]) => l === lv);
      if (lv <= 5 || lv % 5 === 0 || t) addAlbum('lv', `なかよしLv ${lv}`, t ? `あたらしい関係「${t[1]}」` : `${S.pet.name}と さらになかよくなった`, 'lv');
    }
    setTimeout(() => celebrate(after, before), 900);
  }
}
function begin(){
  if (!S || Pet.busy) return false;
  decay();
  Pet.busy = true; lockDock(true); clearTimeout(idleT);
  if (Pet.wake()) Pet.say('ふぁ…？', 1200);
  return true;
}
function finish(){
  Pet.busy = false; lockDock(false);
  commit();
  idleTick(4000);
}

async function feed(){
  if (Pet.busy || !S) return;
  decay();
  if (S.stats.full >= 92){
    Pet.wake(); Pet.tilt();
    Pet.say(S.pet.species === 'cat' ? 'もう入らないにゃ…' : 'おなかいっぱい！');
    return;
  }
  begin();
  $('#bowl').classList.add('filled');
  await sleep(300);
  Pet.say(S.pet.species === 'cat' ? 'ごはんだ！' : 'ごはん！ごはん！', 1400);
  Pet.wag(4000);
  await Pet.moveTo(BOWL.x, BOWL.y - 3.5, 1.3);
  Pet.setExpr('eat');
  const crumbs = setInterval(() => { const m = Pet.mouthPoint(); fx('crumb', m.x + (Math.random() * 30 - 15), m.y + 26, '', { '--dx': (Math.random() * 30 - 15).toFixed(0) + 'px' }); }, 260);
  await sleep(2700);
  clearInterval(crumbs);
  $('#bowl').classList.remove('filled');
  S.stats.full = clamp(S.stats.full + 45, 0, 100);
  S.stats.mood = clamp(S.stats.mood + 6, 0, 100);
  S.counts.meals++;
  gainLove(3);
  track('meal');
  Pet.setExpr('happy'); Pet.say('ごちそうさま！'); hearts(3);
  await sleep(1500);
  Pet.setExpr(null);
  finish();
}

async function giveTreat(t){
  closeSheet();
  if (Pet.busy || !S) return;
  S.recentTreats = (S.recentTreats || []).filter(ts => now() - ts < 30 * 60e3);
  if (S.recentTreats.length >= 5){ toast('おやつは少し時間をあけてね'); return; }
  decay();
  if (S.stats.full >= 99){ Pet.wake(); Pet.tilt(); Pet.say(S.pet.species === 'cat' ? 'おなかいっぱいにゃ…' : 'おなかいっぱい！'); return; }
  begin();
  await Pet.moveTo(50, 82, 1.2);
  const h = Pet.headPoint();
  const pop = document.createElement('div');
  pop.className = 'treatpop';
  pop.innerHTML = `<svg viewBox="0 0 48 48">${treatIcon(t)}</svg>`;
  pop.style.left = h.x + 'px'; pop.style.top = (h.y - stage.clientHeight * .22) + 'px';
  stage.appendChild(pop);
  Pet.setExpr('happy'); Pet.wag(4000);
  await sleep(450); Pet.jump();
  await sleep(700); Pet.jump();
  await sleep(600);
  const m = Pet.mouthPoint();
  pop.style.top = m.y + 'px'; pop.style.left = m.x + 'px';
  await sleep(450);
  pop.style.opacity = '0';
  setTimeout(() => pop.remove(), 350);
  Pet.setExpr('eat');
  await sleep(1300);
  S.stats.full = clamp(S.stats.full + t.full, 0, 100);
  S.stats.mood = clamp(S.stats.mood + t.mood, 0, 100);
  S.recentTreats.push(now());
  S.counts.treats++;
  gainLove(t.love);
  track('treat', t);
  Pet.setExpr('happy'); Pet.say(t.line); hearts(4);
  await sleep(1600);
  Pet.setExpr(null);
  finish();
}

const SOCCER = '<svg viewBox="0 0 40 40"><defs><clipPath id="sbToy"><circle cx="20" cy="20" r="17"/></clipPath></defs><circle cx="20" cy="20" r="17" fill="#FFFFFF"/><g clip-path="url(#sbToy)"><polygon points="27.9,9.2 26.2,4.0 30.6,0.8 35.0,4.0 33.3,9.2" fill="#2E2A33"/><polygon points="32.7,24.1 37.1,21.0 41.5,24.1 39.8,29.3 34.4,29.3" fill="#2E2A33"/><polygon points="20.0,33.4 24.4,36.6 22.7,41.7 17.3,41.7 15.6,36.6" fill="#2E2A33"/><polygon points="7.3,24.1 5.6,29.3 0.2,29.3 -1.5,24.1 2.9,21.0" fill="#2E2A33"/><polygon points="12.1,9.2 6.7,9.2 5.0,4.0 9.4,0.8 13.8,4.0" fill="#2E2A33"/></g><polygon points="20.0,14.0 25.7,18.1 23.5,24.9 16.5,24.9 14.3,18.1" fill="#2E2A33"/><path d="M20.0 14.0L20.0 9.0M25.7 18.1L30.5 16.6M23.5 24.9L26.5 28.9M16.5 24.9L13.5 28.9M14.3 18.1L9.5 16.6" stroke="#2E2A33" stroke-width="1.4" stroke-linecap="round"/><circle cx="20" cy="20" r="17" fill="none" stroke="#3A3147" stroke-width="2.2"/></svg>';
const YARN = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#F497B0" stroke="#B5577A" stroke-width="2.4"/><path d="M8 14c8 6 18 8 26 4M6 22c9 6 19 7 28 2M12 31c6-10 14-18 22-20" fill="none" stroke="#B5577A" stroke-width="1.8" stroke-linecap="round"/><path d="M34 26c4 2 5 6 2 9" fill="none" stroke="#F497B0" stroke-width="2.4" stroke-linecap="round"/></svg>';
const TOY = { dog:SOCCER, cat:YARN };
const YARN_ICON = '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="25" r="14" fill="#F497B0" stroke="currentColor" stroke-width="2.2"/><path d="M13 20c7 5 15 6 22 3M11.5 27c8 5 17 6 25 1.5M17 36c5-9 12-15 19-17" fill="none" stroke="#B5577A" stroke-width="1.8" stroke-linecap="round"/><path d="M37 31c3 2 4 5 2 8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
let SOCCER_ICON = null;
function setPlayIcon(){
  const svg = document.querySelector('#actPlay svg');
  if (!svg || !S) return;
  if (!SOCCER_ICON) SOCCER_ICON = svg.outerHTML;
  const want = S.pet.species === 'cat' ? YARN_ICON : SOCCER_ICON;
  if (svg.outerHTML !== want) svg.outerHTML = want;
}
async function play(){
  if (Pet.busy || !S) return;
  decay();
  if (S.stats.full < 12){ Pet.wake(); Pet.flash('sad', 2200); Pet.say('おなかがすいて動けない…'); return; }
  begin();
  const toy = document.createElement('div');
  toy.className = 'toy';
  toy.innerHTML = TOY[S.pet.species] || TOY.dog;
  toy.style.left = Pet.x + '%'; toy.style.top = '96%'; toy.style.zIndex = '150';
  stage.appendChild(toy);
  Pet.setExpr('happy'); Pet.wag(9000);
  for (let i = 0; i < 3; i++){
    let tx = 18 + Math.random() * 64;
    if (Math.abs(tx - Pet.x) < 18) tx = Pet.x > 50 ? tx - 28 : tx + 28;
    tx = clamp(tx, 16, 84);
    const ty = 72 + Math.random() * 18;
    toy.style.transition = 'left .8s cubic-bezier(.3,.7,.4,1), top .8s cubic-bezier(.3,.7,.4,1)';
    await sleep(30);
    toy.style.left = tx + '%'; toy.style.top = (ty + 1) + '%';
    toy.style.zIndex = String(11 + Math.round(ty));
    await sleep(220);
    await Pet.moveTo(tx, ty, 2.2);
    Pet.jump();
    hearts(1);
    await sleep(420);
  }
  toy.style.transition = 'opacity .3s'; toy.style.opacity = '0';
  setTimeout(() => toy.remove(), 350);
  S.stats.mood = clamp(S.stats.mood + 12, 0, 100);
  S.stats.full = clamp(S.stats.full - 4, 0, 100);
  S.counts.plays++;
  gainLove(3);
  track('play');
  Pet.say(pick(S.pet.species === 'cat' ? ['たのしかった！','もっかい！','ふんふん♪'] : ['たのしかった！','もっとあそぼ！','わんわん♪']));
  await sleep(1400);
  Pet.setExpr(null);
  finish();
}

/* ----- stroking & tapping ----- */
const strokeBudget = { left:12, t:now() };
let drag = null, strokeT = null;
function strokeGain(){
  const mins = (now() - strokeBudget.t) / 60000;
  strokeBudget.left = Math.min(12, strokeBudget.left + mins / 3);
  strokeBudget.t = now();
  if (strokeBudget.left >= 1){ strokeBudget.left -= 1; return 1; }
  return 0;
}
function onStroke(e){
  if (!S) return;
  decay();
  const p = stageXY(e.clientX, e.clientY);
  heartAt(p.x, p.y - 10);
  S.stats.mood = clamp(S.stats.mood + 1.5, 0, 100);
  const g = strokeGain();
  if (g) gainLove(g * .6);
  track('pet');
  if (!Pet.sleeping && !Pet.busy){ Pet.setExpr('happy'); Pet.wag(1600); }
  $('#hint').hidden = true;
  renderStats();
  clearTimeout(strokeT);
  strokeT = setTimeout(() => {
    if (!Pet.busy && !Pet.sleeping){
      Pet.setExpr(null);
      Pet.say(pick(S.pet.species === 'cat' ? ['ゴロゴロ…','きもちいい〜','もっとなでて'] : ['うれしい！','きもちいい〜','もっとなでて！']));
    }
    S.counts.pets++;
    commit();
  }, 700);
}
function onTap(){
  if (!S) return;
  if (Pet.sleeping){
    Pet.wake(); Pet.say('ふぁ〜あ…おはよう'); Pet.tilt();
    idleTick(5000);
    return;
  }
  if (Pet.busy) return;
  Pet.jump(); Pet.tilt(); Pet.wag(1200);
  Pet.say(pick(S.pet.species === 'cat' ? ['にゃ？','にゃーん','なあに？'] : ['ワン！','わふっ','なあに？']), 1600);
  idleTick(4000);
}
Pet.el.addEventListener('pointerdown', e => {
  if (!S) return;
  drag = { x:e.clientX, y:e.clientY, dist:0, acc:0 };
  dragging = true;
  try { Pet.el.setPointerCapture(e.pointerId); } catch(_){}
});
Pet.el.addEventListener('pointermove', e => {
  if (!drag) return;
  const d = Math.hypot(e.clientX - drag.x, e.clientY - drag.y);
  drag.x = e.clientX; drag.y = e.clientY; drag.dist += d; drag.acc += d;
  if (drag.acc > 55){ drag.acc = 0; onStroke(e); }
});
const endDrag = () => {
  if (!drag) return;
  const tap = drag.dist < 12;
  drag = null; dragging = false;
  if (tap) onTap();
};
Pet.el.addEventListener('pointerup', endDrag);
Pet.el.addEventListener('pointercancel', () => { drag = null; dragging = false; });
Pet.el.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    const r = Pet.el.getBoundingClientRect();
    onStroke({ clientX:r.left + r.width / 2, clientY:r.top + r.height * .35 });
  }
});

/* ----- level up ----- */
function unlocksBetween(from, to){
  const list = [];
  (TREATS[S.pet.species] || []).forEach(t => { if (t.lv > from && t.lv <= to) list.push('おやつ「' + t.ja + '」'); });
  WEAR.forEach(w => { if (w.lv > from && w.lv <= to) list.push('きせかえ「' + w.ja + '」'); });
  DECOR_CATS.forEach(([k]) => DECOR[k].forEach(d => { if (d.lv > from && d.lv <= to && d.lv > 1) list.push('もようがえ「' + d.ja + '」'); }));
  (TRICKS[S.pet.species] || []).forEach(t => { if (t.lv > from && t.lv <= to && t.lv > 1) list.push('芸「' + t.ja + '」'); });
  return list;
}
function celebrate(lv, before){
  const items = unlocksBetween(before == null ? lv - 1 : before, lv);
  const newTitle = TITLES.some(([l]) => l === lv || (before != null && l > before && l <= lv));
  const nx = lv < MAX_LV ? nextReward(lv) : null;
  Modal.show({
    label:'なかよしレベルアップ', confetti:true,
    html:() => `<div class="mpet ex-happy wag-fast">${renderPet(S.pet.look, { wear:petWear() })}</div>
    <h3>${lv >= MAX_LV ? 'なかよしMAX！' : 'なかよしLv ' + lv}</h3><p>${esc(S.pet.name)}とさらになかよくなりました${newTitle ? `<br>あたらしい関係「${esc(titleFor(lv))}」` : ''}</p>
    ${items.length ? `<ul>${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}
    ${nx ? nextupHtml(nx) : ''}
    <button class="btn primary" type="button" data-close>やったね</button>`,
  });
}

/* ----- sheets ----- */
const ICON_X = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';
let sheetReturn = null;
function openSheet(title, html, after){
  sheetReturn = document.activeElement;
  const sh = $('#sheet');
  sh.innerHTML = `<div class="sheet-head"><h2 id="sheetTitle">${esc(title)}</h2><button class="closebtn" type="button" data-close aria-label="とじる">${ICON_X}</button></div>${html}`;
  $('#sheetWrap').classList.add('open');
  sh.querySelector('[data-close]').addEventListener('click', closeSheet);
  if (after) after(sh);
  setTimeout(() => { const f = sh.querySelector('[data-close]'); if (f) f.focus(); }, 50);
}
function closeSheet(){
  $('#sheetWrap').classList.remove('open');
  if (sheetReturn && sheetReturn.focus) sheetReturn.focus();
}
$('#sheetWrap').addEventListener('click', e => { if (e.target.id === 'sheetWrap') closeSheet(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

function openTreats(){
  if (Pet.busy || !S) return;
  const lv = levelInfo(S.stats.love).lv;
  const base = TREATS[S.pet.species] || TREATS.dog;
  const ev = activeEvent();
  const list = ev ? [eventTreat(ev)].concat(base) : base;
  const open = base.filter(t => t.lv <= lv).length;
  const html = `<p class="sheet-sub">${open} / ${base.length} しゅるい　レベルの高いおやつほど、なかよし度が大きく上がります</p>
    <div class="tiles">${list.map(t => {
    const locked = lv < t.lv;
    return `<button class="tile treat" type="button" data-t="${t.id}" ${locked ? 'aria-disabled="true"' : ''}>
      <svg viewBox="0 0 48 48" aria-hidden="true">${treatIcon(t)}</svg><span class="tname">${esc(t.ja)}</span>
      ${locked ? `<span class="lockpill">Lv${t.lv}で解放</span>` : `<span class="gain"><b>♥+${t.love}</b> ごきげん+${t.mood}</span>`}${t.ev ? `<span class="evpill">${esc(t.evJa)}限定</span>` : ''}</button>`;
  }).join('')}</div><p class="note">おやつは30分に5回まで。ごはんの代わりにはなりません。</p>`;
  openSheet('どのおやつをあげる？', html, sh => {
    sh.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => {
      if (b.getAttribute('aria-disabled') === 'true') return;
      giveTreat(list.find(t => t.id === b.dataset.t));
    }));
  });
}

let dressSlot = 'head';
function wearOwned(w, lv){ return w.ev ? S.events.got.includes(w.id) : lv >= w.lv; }
function openDress(){
  if (!S) return;
  const lv = levelInfo(S.stats.love).lv;
  const W = petWear();
  const tabs = () => `<div class="seg" role="tablist">${SLOTS.map(([k, ja]) => {
    const items = WEAR.filter(w => w.slot === k && (!w.ev || wearOwned(w, lv))), got = items.filter(w => wearOwned(w, lv)).length;
    return `<button type="button" role="tab" data-slot="${k}" aria-pressed="${k === dressSlot}">${ja}<small>${got}/${items.length}</small></button>`;
  }).join('')}<button type="button" role="tab" data-slot="room" aria-pressed="${dressSlot === 'room'}">おへや<small>もようがえ</small></button></div>`;
  const tiles = () => {
    if (dressSlot === 'room') return roomTabHtml();
    const items = [{ id:null, ja:'なし', lv:1 }].concat(WEAR.filter(w => w.slot === dressSlot && (!w.ev || wearOwned(w, lv))));
    return `<div class="tiles">${items.map(it => {
      const locked = it.id && !wearOwned(it, lv);
      const trial = Object.assign({}, W, { [dressSlot]:it.id });
      return `<button class="tile" type="button" data-w="${it.id || ''}" aria-pressed="${(W[dressSlot] || null) === it.id}" ${locked ? 'aria-disabled="true"' : ''}>
        ${renderPet(S.pet.look, { wear:trial })}<span class="tname">${esc(it.ja)}</span>${locked ? `<span class="lockpill">Lv${it.lv}で解放</span>` : ''}${it.ev ? '<span class="evpill">季節の限定</span>' : ''}</button>`;
    }).join('')}</div><p class="note">あたま・かお・くびを1つずつ組み合わせられます。季節のイベントでは、限定のきせかえがもらえます。</p>`;
  };
  openSheet('きせかえ・もようがえ', `${tabs()}<div id="dressTiles">${tiles()}</div>`, sh => {
    const box = sh.querySelector('#dressTiles');
    const rerender = () => { box.innerHTML = tiles(); wire(); };
    const wire = () => {
      if (dressSlot === 'room') return wireRoomTab(box, rerender);
      box.querySelectorAll('[data-w]').forEach(b => b.addEventListener('click', () => {
        if (b.getAttribute('aria-disabled') === 'true') return;
        W[dressSlot] = b.dataset.w || null;
        S.pet.wear = W;
        if (b.dataset.w) track('dress', { slot:dressSlot, id:b.dataset.w });
        rerender();
        Pet.mount();
        if (!Pet.busy && !Pet.sleeping){ Pet.flash('happy', 1400); Pet.say(b.dataset.w ? 'にあう？' : 'すっきり！'); }
        commit();
      }));
    };
    sh.querySelectorAll('[data-slot]').forEach(t => t.addEventListener('click', () => {
      dressSlot = t.dataset.slot;
      sh.querySelectorAll('[data-slot]').forEach(x => x.setAttribute('aria-pressed', String(x === t)));
      rerender();
    }));
    wire();
  });
}

function openMenu(){
  if (!S) return;
  const p = S.pet, c = S.counts, L = levelInfo(S.stats.love);
  const html = `<div class="profile">
      <div class="ph">${renderPet(p.look, { wear:petWear() })}${p.photo ? `<img src="${p.photo}" alt="">` : ''}</div>
      <div style="min-width:0"><h3>${esc(p.name)}</h3><p>${esc(breedLabel(p))}</p><p>なかよしLv ${L.lv}${L.max ? '（MAX）' : ''}・${esc(titleFor(L.lv))}</p></div>
    </div>
    <div class="counts">
      <div><b>${c.meals}</b>ごはん</div><div><b>${c.treats}</b>おやつ</div><div><b>${c.pets}</b>なでなで</div><div><b>${c.plays}</b>あそび</div>
      <div><b>${(TRICKS[p.species] || []).filter(t => S.tricks[t.id] && S.tricks[t.id].ok).length}</b>芸</div><div><b>${SOUVENIRS.filter(x => S.souv.have[x.id]).length}</b>おみやげ</div><div><b>${S.stamps.length}</b>スタンプ</div><div><b>${Math.max(1, daysBetween(S.created || now(), now()) + 1)}</b>日め</div>
    </div>
    ${(() => { const nx = nextReward(L.lv); return nx ? nextupHtml(nx) : '<p class="nextup">すべてのごほうびを集めました</p>'; })()}
    <div class="btnstack" id="menuBtns">
      <button class="btn" type="button" id="mAlbum">おもいでアルバム</button>
      <button class="btn" type="button" id="mEdit">名前・みためを変える</button>
      <button class="btn" type="button" id="mMove">引っこし・バックアップ</button>
      <button class="btn warn" type="button" id="mNew">新しい子をむかえる</button>
    </div>
    <p class="note">${Persist.mode === 'cloud' ? 'あなたのアカウントに保存しています。ほかの端末で開いても同じ子に会えます。' : HOME ? 'この端末に保存しています。ときどき引っこしコードをコピーしておくと、バックアップになります。' : 'このブラウザに保存しています。'}</p>`;
  openSheet('プロフィール', html, sh => {
    sh.querySelector('#mEdit').addEventListener('click', () => { closeSheet(); Onboard.openEdit(); });
    sh.querySelector('#mMove').addEventListener('click', () => openMove());
    sh.querySelector('#mAlbum').addEventListener('click', () => openAlbum('diary'));
    sh.querySelector('#mNew').addEventListener('click', () => {
      const box = sh.querySelector('#menuBtns');
      box.innerHTML = `<div class="confirm"><p>新しい子をむかえると、${esc(p.name)}のなかよし度や記録は新しい子のものに置きかわります。</p>
        <div class="row"><button class="btn" type="button" id="mNo">やめる</button><button class="btn warn" type="button" id="mYes">むかえる</button></div></div>`;
      box.querySelector('#mNo').addEventListener('click', () => { closeSheet(); });
      box.querySelector('#mYes').addEventListener('click', () => { closeSheet(); Onboard.openNew(true); });
      box.querySelector('#mNo').focus();
    });
  });
}

/* ----- move code: carry a pet to another place ----- */
const MOVE_PREFIX = 'UCHINOKO2:';
function encodeMoveCode(){
  const bytes = new TextEncoder().encode(JSON.stringify(S));
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  const b64 = btoa(bin);
  return MOVE_PREFIX + b64.length + ':' + b64;
}
/* returns { st } on success, or { reason:'empty'|'noprefix'|'short'|'broken', got, need } */
function readMoveCode(text){
  const raw = String(text || '');
  const t = raw.replace(/[\s​-‍﻿]+/g, '');
  if (!t) return { reason:'empty', got:0 };
  const m = t.match(/UCHINOKO([12]):(?:(\d+):)?([A-Za-z0-9+/=]*)/);
  if (!m) return { reason:'noprefix', got:t.length };
  let b64 = m[3];
  const need = m[2] ? Number(m[2]) : 0;
  if (need && b64.length < need) return { reason:'short', got:b64.length, need };
  if (need) b64 = b64.slice(0, need);
  const st = decodeMovePayload(b64);
  return st ? { st } : { reason:'broken', got:b64.length, need };
}
function decodeMoveCode(text){ return readMoveCode(text).st || null; }
function moveErrorText(r){
  const n = v => Number(v || 0).toLocaleString('ja-JP');
  if (r.reason === 'empty') return 'コードが空っぽです。コピーしたコードを貼りつけてから押してね。';
  if (r.reason === 'noprefix') return `「UCHINOKO」ではじまるコードが見つかりませんでした（貼りつけた文字数：${n(r.got)}）。コピーがうまくいっていないかもしれません。「ファイルで保存」の方法もためしてみてね。`;
  if (r.reason === 'short') return `コードが途中で切れています（${n(r.need)}文字のうち${n(r.got)}文字）。もう一度まるごとコピーするか、「ファイルで保存」の方法をためしてみてね。`;
  return `コードを読みとれませんでした（${n(r.got)}文字）。もう一度コピーし直してみてね。`;
}
function decodeMovePayload(b64){
  try {
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, ch => ch.charCodeAt(0));
    const o = JSON.parse(new TextDecoder().decode(bytes));
    if (!o || typeof o !== 'object' || !o.pet || !o.stats) return null;
    const num = (v, d, lo, hi) => { v = Number(v); return Number.isFinite(v) ? clamp(v, lo, hi) : d; };
    const p = o.pet, look = normalizeLook(p.look || p);
    const photo = typeof p.photo === 'string' && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(p.photo) && p.photo.length < 400000 ? p.photo : null;
    const wear = wearFrom(p);
    for (const k of ['head','face','neck']){ const v = wear[k]; if (v && WEAR_RENAMED[v]) wear[k] = WEAR_RENAMED[v]; else if (v && !WEAR_BY_ID[v]) wear[k] = null; }
    const c = o.counts || {};
    const t0 = now();
    const st = {
      v:1,
      pet:{ name:String(p.name || 'うちのこ').slice(0, 10), species:look.species, breedId:look.breedId, look, photo,
            colorName:typeof p.colorName === 'string' ? p.colorName.slice(0, 14) : '', wear },
      stats:{ full:num(o.stats.full, 70, 0, 100), mood:num(o.stats.mood, 70, 0, 100), love:num(o.stats.love, 0, 0, 1e7) },
      counts:{ meals:num(c.meals, 0, 0, 1e9), treats:num(c.treats, 0, 0, 1e9), pets:num(c.pets, 0, 0, 1e9), plays:num(c.plays, 0, 0, 1e9) },
      recentTreats:[], last:t0, created:num(o.created, t0, 0, t0), updated:t0,
    };
    return carryExtras(o, st);
  } catch(e){ return null; }
}
const MOVE_FILE = 'uchinoko-hikkoshi.txt';
/* copy: async clipboard, then the older copy command, then leave the text selected */
async function copyText(el){
  try { if (navigator.clipboard && navigator.clipboard.writeText){ await navigator.clipboard.writeText(el.value); return 'copied'; } } catch(e){}
  try {
    el.removeAttribute('readonly'); el.focus(); el.setSelectionRange(0, el.value.length);
    if (document.execCommand && document.execCommand('copy')) return 'copied';
  } catch(e){}
  try { el.focus(); el.setSelectionRange(0, el.value.length); } catch(e){}
  return 'selected';
}
/* save the code as a small text file: Claude's download prompt, the share sheet, or a plain download */
async function saveMoveFile(code){
  if (!HOME){
    const dl = await useCap('downloads');
    if (!dl) return 'unavailable';
    try { await dl.save({ filename:MOVE_FILE, data:code }); return 'saved'; }
    catch(e){ return e && e.code === 'declined' ? 'declined' : 'unavailable'; }
  }
  try {
    const file = new File([code], MOVE_FILE, { type:'text/plain' });
    if (navigator.canShare && navigator.canShare({ files:[file] })){ await navigator.share({ files:[file], title:'うちのこ日和 引っこしコード' }); return 'saved'; }
  } catch(e){ if (e && e.name === 'AbortError') return 'declined'; }
  try {
    const url = URL.createObjectURL(new Blob([code], { type:'text/plain' }));
    const a = document.createElement('a'); a.href = url; a.download = MOVE_FILE; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    return 'saved';
  } catch(e){ return 'unavailable'; }
}
function readTextFile(file){
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result || '')); r.onerror = rej; r.readAsText(file); });
}
const CODE_ATTRS = 'autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false"';
function openMove(){
  if (!S) return;
  const code = encodeMoveCode();
  const len = code.length.toLocaleString('ja-JP');
  const html = `<p class="sheet-sub">${esc(S.pet.name)}を、ほかの場所（ホーム画面のアプリや別の端末）へつれていけます。</p>
    <div class="card movecard"><h3>この子をつれていく</h3>
      <textarea class="codebox" id="mvOut" rows="4" ${CODE_ATTRS} aria-label="引っこしコード">${esc(code)}</textarea>
      <div class="btnrow"><button class="btn primary" type="button" id="mvCopy">コードをコピー</button><button class="btn" type="button" id="mvSave">ファイルで保存</button></div>
      <p class="note" id="mvMsg" role="status">コードは${len}文字あります。つれていく先の「引っこしコードで受け取る」で、貼りつけるか、保存したファイルをえらんでね。</p>
    </div>
    <div class="card movecard"><h3>コードで受け取る</h3>
      <textarea class="codebox" id="mvIn" rows="3" ${CODE_ATTRS} placeholder="UCHINOKO ではじまるコード" aria-label="受け取る引っこしコード"></textarea>
      <div id="mvInBox" class="btnrow"><button class="btn" type="button" id="mvTake">受け取る</button><label class="btn filebtn">ファイルからえらぶ<input type="file" id="mvFile" accept=".txt,text/plain"></label></div>
    </div>`;
  openSheet('引っこし・バックアップ', html, sh => {
    const out = sh.querySelector('#mvOut'), msg = sh.querySelector('#mvMsg');
    sh.querySelector('#mvCopy').addEventListener('click', async () => {
      const r = await copyText(out);
      msg.textContent = r === 'copied'
        ? `コピーしました（${len}文字）。つれていく先で貼りつけてね。`
        : 'コードをぜんぶ選びました。表示されたメニューの「コピー」を押してね。メニューが出ないときは「ファイルで保存」がかんたんです。';
    });
    sh.querySelector('#mvSave').addEventListener('click', async () => {
      const r = await saveMoveFile(code);
      msg.textContent = r === 'saved' ? `「${MOVE_FILE}」を保存しました。つれていく先で「ファイルからえらぶ」でえらんでね。`
        : r === 'declined' ? '保存をとりやめました。' : 'ここではファイルの保存ができませんでした。コードのコピーをためしてね。';
    });
    const take = text => {
      const r = readMoveCode(text);
      const box = sh.querySelector('#mvInBox');
      sh.querySelectorAll('.mverr').forEach(e => e.remove());
      if (!r.st){ box.insertAdjacentHTML('beforebegin', `<p class="oberr mverr" role="alert" style="margin:0">${esc(moveErrorText(r))}</p>`); return; }
      const st = r.st;
      box.classList.remove('btnrow');
      box.innerHTML = `<div class="confirm"><p>いまの${esc(S.pet.name)}は、コードの${esc(st.pet.name)}（なかよしLv ${levelInfo(st.stats.love).lv}）に置きかわります。</p>
        <div class="row"><button class="btn" type="button" id="mvNo">やめる</button><button class="btn warn" type="button" id="mvYes">受け取る</button></div></div>`;
      box.querySelector('#mvNo').addEventListener('click', () => closeSheet());
      box.querySelector('#mvYes').addEventListener('click', () => { S = st; closeSheet(); Persist.schedule(); Game.start('ただいま！'); });
    };
    sh.querySelector('#mvTake').addEventListener('click', () => take(sh.querySelector('#mvIn').value));
    sh.querySelector('#mvFile').addEventListener('change', async e => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      try { take(await readTextFile(f)); } catch(err){ take(''); }
    });
  });
}

/* ----- game lifecycle ----- */
const Game = {
  started:false,
  start(greet, away){
    Onboard.close();
    ensureState(S);
    decay();
    renderHeader();
    setPlayIcon();
    Pet.sleeping = false; clearInterval(Pet.zz); Pet.el.classList.remove('pose-sleep');
    Pet.x = 50; Pet.y = 80; Pet.mount();
    renderStats();
    updateClock();
    if (!this.started){
      this.started = true;
      setInterval(() => { updateClock(); if (S){ decay(); renderStats(); } }, 30000);
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && S){
          const away = now() - (S.last || now());
          decay(); renderStats(); updateClock();
          if (away > 30 * 60e3 && !Pet.busy){ Pet.wake(); Pet.jump(); Pet.say('おかえり！'); }
          Features.resume(away);
          idleTick();
        } else if (document.hidden && S){
          decay(); Persist.saveLocal(); Persist.flush();
        }
      });
    }
    Features.start(away || 0);
    if (S.counts.pets === 0) $('#hint').hidden = false;
    if (greet){ setTimeout(() => { Pet.jump(); Pet.wag(2000); Pet.say(greet); }, 500); }
    idleTick(2500);
  },
  onStateReplaced(){
    if (Onboard.busy) return;
    this.start('ただいま！');
  },
};

$('#actFeed').addEventListener('click', feed);
$('#actTreat').addEventListener('click', openTreats);
$('#actPlay').addEventListener('click', play);
$('#actDress').addEventListener('click', openDress);
$('#actTrick').addEventListener('click', openTricks);
$('#reqBtn').addEventListener('click', openRequests);
$('#albumBtn').addEventListener('click', () => openAlbum());
$('#menuBtn').addEventListener('click', openMenu);
