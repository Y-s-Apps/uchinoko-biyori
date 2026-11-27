{
/* だんかい 4 の 見本：うしろすがた（renderPetBack・back.css）を ミニの おへやで うごかす。正面・よこむきの 絵と CSS は アプリと 同じ。
   うごかし方（Mini）は js_app.js の Pet を 小さく した もの（見本 3 と 同じ）に、うしろ（view-back）を 足した */
const $ = (s, r = document) => r.querySelector(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const clampN = (v, a, b) => Math.min(b, Math.max(a, v));
const calm = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const st = { kid:'dog', view:{}, pick:{}, grid:'back' };
const isCat = () => st.kid === 'cat';
const look = () => isCat() ? breedLook('chatora') : LOOKS.daizu;
const wear = () => isCat() ? { neck:'bell_red' } : { neck:'scarf_tri' };
const WIN = { x:25, y:70 };
const POSE = {
  sit:{ head:.38, mouth:.52 }, stand:{ head:.37, mouth:.5, side:1, hx:.68 }, walk:{ head:.37, mouth:.5, side:1, hx:.68 },
  down:{ head:.5, mouth:.64 }, sleep:{ head:.54, mouth:.68 },
  bsit:{ head:.38, mouth:.5, back:1 }, bup:{ head:.35, mouth:.5, back:1 }, bdown:{ head:.5, mouth:.62, back:1 }, bwalk:{ head:.36, mouth:.5, back:1 },
};
const PART = { down:'down', sleep:'down' };
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.6 6.6 4.6c2.2 0 3.6 1.2 4.4 2.5.8-1.3 2.2-2.5 4.4-2.5 3.6 0 5.7 3.8 4.2 7.2C19.5 16.4 12 21 12 21z" fill="#F0728E" stroke="#FFFFFF" stroke-width="1.6"/></svg>';
const BOWL_SVG = '<svg viewBox="0 0 60 22" aria-hidden="true"><path d="M5 6h50l-5 12a5 5 0 0 1-5 3H15a5 5 0 0 1-5-3z" fill="#4FAE9A"/><rect x="1" y="2" width="58" height="6" rx="3" fill="#3E9A86"/><path d="M27 13c0-2 3-2 3 0 0-2 3-2 3 0 0 2-3 3.5-3 3.5S27 15 27 13z" fill="#FFFFFF" opacity=".85"/></svg>';
const roomBg = (dim, weather) => `<svg class="bg" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><linearGradient id="sky${dim ? 'n' : 'd'}${weather || ''}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${weather === 'rain' ? '#8E9BB8' : weather === 'snow' ? '#B9C6DE' : '#A9D8F2'}"/><stop offset="1" stop-color="${weather === 'rain' ? '#B5BED2' : weather === 'snow' ? '#E4ECF6' : '#DDF1FA'}"/></linearGradient></defs>
  <rect width="400" height="250" fill="#F4E9DD"/>
  <g fill="#EBDCCB"><circle cx="40" cy="26" r="3"/><circle cx="200" cy="30" r="3"/><circle cx="280" cy="18" r="3"/><circle cx="360" cy="28" r="3"/><circle cx="240" cy="110" r="3"/><circle cx="330" cy="96" r="3"/></g>
  <rect x="48" y="22" width="104" height="90" rx="14" fill="#FFFFFF"/><rect x="56" y="30" width="88" height="74" rx="9" fill="url(#sky${dim ? 'n' : 'd'}${weather || ''})"/>
  <rect x="98" y="30" width="4" height="74" fill="#FFFFFF"/><rect x="56" y="65" width="88" height="4" fill="#FFFFFF"/>
  <rect x="0" y="146" width="400" height="104" fill="#E6CBA5"/><rect x="0" y="142" width="400" height="6" fill="#D9BC94"/>
  <g stroke="#D7B88E" stroke-width="2"><path d="M0 178H400M0 214H400"/><path d="M90 148V178M250 148V178M170 178V214M330 178V214M60 214V250M220 214V250"/></g>
  <ellipse cx="200" cy="214" rx="118" ry="28" fill="#8FAEDF"/><ellipse cx="200" cy="214" rx="92" ry="20" fill="none" stroke="#B9CDEE" stroke-width="5"/>
  <ellipse cx="304" cy="214" rx="56" ry="17" fill="#E89AAE"/><ellipse cx="304" cy="210" rx="44" ry="11" fill="#F4C3D0"/>
  <g transform="translate(368 92)"><path d="M-9 50h18l-3 20h-12z" fill="#D88C6C"/><path d="M0 50C-4 34-14 26-20 15-7 21-2 31 0 44 2 30 7 19 20 12 14 26 5 36 0 50Z" fill="#6FB07E"/></g>
</svg>`;

/* ===== うちのこ（js_app.js の Pet を 小さく した もの ＋ うしろ） ===== */
class Mini {
  constructor(el, stage){ this.el = el; this.stage = stage; this.t = {}; this.reset(50, 80); }
  mount(){
    const lk = look(), w = { wear:wear() };
    this.el.innerHTML = `<div class="pet-floor"><i></i></div><div class="art"><div class="pet-turn"><div class="view-f">${renderPet(lk, w)}</div><div class="view-s">${renderPetSide(lk, w)}</div><div class="view-b">${renderPetBack(lk, w)}</div></div></div>`;
  }
  reset(x, y, pose){
    for (const k in this.t) clearTimeout(this.t[k]);
    this.el.className = 'pet';
    this.pose = 'sit'; this.view = 'front'; this.dir = 'r'; this.tok = 0;
    this.el.style.transition = 'none'; this.place(x, y); void this.el.offsetWidth; this.el.style.transition = '';
    this.mount();
    if (pose) this.setPose(pose);
  }
  place(x, y){ this.x = x; this.y = y; this.el.style.left = x + '%'; this.el.style.top = y + '%'; this.el.style.zIndex = String(10 + Math.round(y)); this.el.style.setProperty('--s', (.84 + clampN((y - 66) / 24, 0, 1) * .22).toFixed(3)); }
  cls(c, ms){ this.el.classList.remove(c); void this.el.offsetWidth; this.el.classList.add(c); clearTimeout(this.t[c]); if (ms) this.t[c] = setTimeout(() => this.el.classList.remove(c), ms); }
  off(c){ clearTimeout(this.t[c]); this.el.classList.remove(c); }
  expr(e){ this.el.classList.remove('ex-happy', 'ex-eat', 'ex-sleep', 'ex-sad'); if (e) this.el.classList.add('ex-' + e); }
  jump(){ this.cls('jump', 520); }
  tilt(){ this.cls('tilt', 1000); }
  wag(ms){ this.cls('wag-fast', ms); }
  gesture(id, ms){ this.cls('g-' + id, ms); return sleep(ms); }
  leave(part){ this.cls('leave-' + part, 360); }
  setPose(p, turn){
    const was = PART[this.pose], part = PART[p];
    if (part) this.off('leave-' + part);
    if (was && was !== part) this.leave(was);
    for (const k in POSE) if (k !== 'sit') this.el.classList.toggle('pose-' + k, k === p);
    this.pose = p;
    this.setView(POSE[p].back ? 'back' : POSE[p].side ? 'side' : 'front', turn);
  }
  setView(v, turn){ if (v === this.view) return; this.view = v; if (turn) this.turn(); else this.applyView(); }
  face(left, turn){ const d = left ? 'l' : 'r'; if (d === this.dir) return; this.dir = d; if (turn && this.view === 'side') this.turn(); else this.applyView(); }
  applyView(){ this.el.classList.toggle('view-side', this.view === 'side'); this.el.classList.toggle('view-back', this.view === 'back'); this.el.classList.toggle('dir-l', this.dir === 'l'); }
  turn(){
    if (calm()) return this.applyView();
    this.cls('turning', 330);
    clearTimeout(this.t.av); this.t.av = setTimeout(() => this.applyView(), 160);
  }
  /* あるく。back：奥へ（上へ）むかう ときは うしろすがたで あるく（あたらしい）。着いたら end の 体勢 */
  moveTo(x, y, speed = 1, end, back){
    const dx = x - this.x, dy = (y - this.y) * 1.6;
    const d = Math.hypot(dx, dy);
    const ms = Math.max(260, d * 36 / speed), walk = d >= 2.5, tok = ++this.tok;
    this.el.style.transition = `left ${ms}ms linear, top ${ms}ms linear, transform ${ms}ms linear`;
    if (walk){
      const step = clampN(.56 / Math.sqrt(speed), .3, .75);
      this.el.style.setProperty('--step', step.toFixed(2) + 's'); this.el.style.setProperty('--half', (step / 2).toFixed(2) + 's'); this.el.style.setProperty('--lag', (-step / 2).toFixed(2) + 's');
      if (back && -dy > Math.abs(dx)) this.setPose('bwalk', true);
      else { this.face(dx < 0, true); this.setPose('walk', true); }
    }
    this.place(x, y);
    return sleep(ms).then(() => { if (tok === this.tok && (end || walk)) this.setPose(end || 'sit', true); });
  }
  headAt(k){
    const r = this.el.getBoundingClientRect(), s = this.stage.getBoundingClientRect(), p = POSE[this.pose] || POSE.sit;
    const hx = p.side ? (this.dir === 'l' ? 1 - p.hx : p.hx) : .5;
    return { x:r.left - s.left + r.width * hx, y:r.top - s.top + r.height * p[k || 'head'] };
  }
}

/* ===== ミニの 画面 ===== */
function fx(stage, cls, x, y, html, dx){
  const e = document.createElement('div');
  e.className = 'fx ' + cls; e.style.left = x + 'px'; e.style.top = y + 'px'; e.innerHTML = html || '';
  if (dx != null) e.style.setProperty('--dx', dx + 'px');
  stage.appendChild(e); setTimeout(() => e.remove(), 1300);
}
function sayIn(stage, pet, text, ms = 1800){
  const b = $('.say', stage), h = pet.headAt();
  b.textContent = text; b.style.left = clampN(h.x, 60, stage.clientWidth - 60) + 'px'; b.style.top = (h.y - stage.clientHeight * .14) + 'px';
  b.classList.add('show'); clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove('show'), ms);
}
const roomHtml = o => `<div class="mroom${o && o.dim ? ' dim' : ''}">${roomBg(o && o.dim, o && o.weather)}${o && o.weather ? `<div class="winw"><div class="weather w-${o.weather}"></div></div>` : ''}<div class="bowl">${BOWL_SVG}</div><div class="pet" role="button" tabindex="0" aria-label="うちのこ"></div><div class="say"></div><div class="tapfx"></div></div>`;

const STOP = {};
function ctxFor(sc){
  const tok = ++sc.tok, stage = sc.stage, p = sc.pet;
  const w = async ms => { await sleep(ms); if (tok !== sc.tok) throw STOP; };
  return { p, stage, w, tok,
    say:(t, ms) => sayIn(stage, p, t, ms),
    hearts:n => { for (let i = 0; i < n; i++) setTimeout(() => { const h = p.headAt(); fx(stage, 'h', h.x + (Math.random() * 30 - 15), h.y - 4, HEART, Math.round(Math.random() * 40 - 20)); }, i * 160); },
  };
}
/* タップの しるし（指で さわった ところ） */
function tapMark(stage, p){
  const t = $('.tapfx', stage), h = p.headAt();
  t.style.left = h.x + 'px'; t.style.top = (h.y + stage.clientHeight * .08) + 'px';
  t.classList.remove('on'); void t.offsetWidth; t.classList.add('on');
}
/* うしろすがたで タップ → ふりかえって へんじ → また 外を 見る（あたらしい） */
async function turnAround(c, back){
  const { p, w } = c;
  p.setPose('sit', true); await w(170);
  p.jump(); p.tilt(); p.wag(1400); p.expr('happy');
  c.say(isCat() ? 'にゃ？' : 'ワン！', 1400); await w(1800);
  p.expr(null); p.setPose(back || 'bup', true);
}

/* ===== 場面 ===== */
const SCENES = [
  { h:'まどの 下で' },
  { id:'win', title:'まどの 下で 外を 見る（ひまな とき）', start:[62, 82],
    text:{ old:'まどの 下へ 行って、<b>よこむき</b>で たって 耳ぴく。', new:'まどの 下へ あるいて、<b>くるっと うしろを むいて すわり</b>、外を 見あげる（しっぽ ゆらゆら・耳ぴく・きょろきょろ）。しばらく すると <b>ふりかえって</b>「なあに？」と かしげて、また 外を 見る。' },
    caps:{ old:['まどの 下へ','よこむきで たつ・耳ぴく'], new:['まどの 下へ','うしろを むいて すわる','外を 見あげる・耳ぴく','ふりかえる「なあに？」','また 外を 見る'] },
    async run(m, c){
      const { p, w } = c;
      cap(this, 0);
      if (m === 'old'){ await p.moveTo(WIN.x - 3, WIN.y, .8, 'stand'); if (this.tok !== c.tok) return; cap(this, 1); await w(300); await p.gesture('ear', 750); await w(1800); return; }
      await p.moveTo(WIN.x, WIN.y, .8, 'bsit'); if (this.tok !== c.tok) return;
      cap(this, 1); await w(700);
      cap(this, 2); p.setPose('bup'); await w(800); await p.gesture('ear', 750); await w(500); await p.gesture('look', 1800); await w(600);
      cap(this, 3); p.setPose('sit', true); await w(170); p.tilt(); p.wag(1200); c.say('なあに？', 1500); await w(1700);
      cap(this, 4); p.setPose('bup', true); await w(1800);
    } },
  { id:'tap', title:'うしろを むいている ときに タップ', start:[25, 70], pose:'bup', modes:['new'], def:'new',
    text:{ new:'うしろすがたの ときに うちのこを タップすると、<b>ふりかえって</b> へんじ（はねて かしげる）。すこし して また 外を 見る。<b>この 見本の うちのこも タップできるよ。</b>' },
    caps:{ new:['外を 見ている','タップ','ふりかえって へんじ','また 外を 見る'] },
    tap:true,
    async run(m, c){
      const { p, w, stage } = c;
      cap(this, 0); await w(1400);
      cap(this, 1); tapMark(stage, p); await w(250);
      cap(this, 2); await turnAround(c, 'bup');
      cap(this, 3); await w(1200);
    } },
  { id:'rain', title:'雨の 日（つゆ）', weather:'rain', dim:true, start:[62, 82],
    text:{ old:'まどの 下で <b>こちらを むいて ふせ</b>、耳ぴく・きょろきょろ。', new:'まどの 下で <b>うしろを むいて ふせ</b>、雨を ながめる（耳ぴく・きょろきょろ・しっぽは ゆっくり）。' },
    caps:{ old:['まどの 下へ','こちらを むいて ふせる','耳ぴく・きょろきょろ「あめ、やまないね」'], new:['まどの 下へ','うしろを むいて ふせる','雨を ながめる「あめ、やまないね」'] },
    async run(m, c){
      const { p, w } = c;
      cap(this, 0); await p.moveTo(WIN.x - 1, WIN.y + 2, .8, m === 'old' ? 'down' : 'bdown'); if (this.tok !== c.tok) return;
      cap(this, 1); await w(700);
      cap(this, 2); await p.gesture('ear', 750); await p.gesture('look', 1800); c.say('あめ、やまないね', 1800); await w(2200);
    } },
  { id:'snow', title:'雪・花びらの 日', weather:'snow', start:[62, 82],
    text:{ old:'その場で 上を 見あげて ぴょん（雪は まどの 外に ふっている）。', new:'<b>まどの 下へ 行って</b>、うしろを むいて 雪を 見あげ、<b>ぴょん</b>（しっぽ ぶんぶん）「ゆきだ！」。' },
    caps:{ old:['上を 見あげる','ぴょん「ゆきだ！」'], new:['まどの 下へ','うしろを むいて 見あげる','ぴょん「ゆきだ！」'] },
    async run(m, c){
      const { p, w } = c;
      if (m === 'old'){ await w(500); cap(this, 0); p.gesture('lookup', 1300); await w(900); cap(this, 1); p.expr('happy'); p.jump(); p.wag(1200); await w(500); c.say(isCat() ? 'ゆきだにゃ！' : 'ゆきだ！', 1400); await w(1500); p.expr(null); return; }
      cap(this, 0); await p.moveTo(WIN.x, WIN.y, .9, 'bsit'); if (this.tok !== c.tok) return;
      cap(this, 1); await w(400); p.setPose('bup'); await w(1000);
      cap(this, 2); p.jump(); p.wag(1600); await w(500); c.say(isCat() ? 'ゆきだにゃ！' : 'ゆきだ！', 1500); await w(700); p.jump(); await w(1500);
    } },
  { h:'あるく' },
  { id:'walk', title:'奥へ あるく', start:[66, 88],
    text:{ old:'どこへ 行く ときも <b>よこむき</b>で あるく。', new:'<b>奥（かべの ほう）へ むかう ときは うしろすがた</b>で あるく（うしろ足で とことこ・しっぽ ゆらゆら）。よこへ・手前へ 行く ときは いままでどおり よこむき。' },
    caps:{ old:['奥へ あるく（よこむき）','すわる','手前へ もどる（よこむき）'], new:['奥へ あるく（うしろすがた）','くるっ → すわる','手前へ もどる（よこむき）'] },
    async run(m, c){
      const { p, w } = c;
      await w(400);
      cap(this, 0); await p.moveTo(46, 69, .8, 'sit', m === 'new'); if (this.tok !== c.tok) return;
      cap(this, 1); await w(1300);
      cap(this, 2); await p.moveTo(70, 86, .8, 'sit', m === 'new'); if (this.tok !== c.tok) return;
      await w(900);
    } },
];

/* ===== カードを 作る ===== */
const MODE_JA = { old:'いま', new:'あたらしい' };
const PICK = {
  win:[['new','あたらしく する'],['old','いまの まま']], tap:[['new','いれる'],['old','いらない']],
  rain:[['new','あたらしく する'],['old','いまの まま']], snow:[['new','あたらしく する'],['old','いまの まま']],
  walk:[['new','いれる'],['old','いらない']],
};
const box = $('#scenes');
box.innerHTML = SCENES.map(s => {
  if (s.h) return `<h2>${s.h}</h2>`;
  const modes = s.modes || ['new', 'old'];
  st.view[s.id] = s.def || 'new'; st.pick[s.id] = PICK[s.id][0][0];
  return `<section class="sc" id="sc-${s.id}">
    <div class="sc-h"><h3>${s.title}</h3>${modes.length > 1 ? `<span class="opts" data-view="${s.id}">${modes.map(m => `<button class="opt" type="button" data-v="${m}" aria-pressed="${m === st.view[s.id]}">${MODE_JA[m]}</button>`).join('')}</span>` : ''}</div>
    <p data-text></p><div data-stage>${roomHtml({ weather:s.weather, dim:s.dim })}</div><ol class="cap"></ol>
    <div class="row"><button class="play" type="button">▶ もういちど</button><span class="opts" data-pick="${s.id}">${PICK[s.id].map(([v, ja], i) => `<button class="opt" type="button" data-v="${v}" aria-pressed="${i === 0}">${ja}</button>`).join('')}</span></div>
  </section>`;
}).join('');
function cap(sc, i){ sc.capEl.querySelectorAll('li').forEach((li, j) => li.classList.toggle('on', j === i)); }
const list = SCENES.filter(s => !s.h);
for (const s of list){
  s.el = $('#sc-' + s.id); s.tok = 0;
  s.stage = $('.mroom', s.el);
  s.capEl = $('.cap', s.el);
  s.pet = new Mini($('.mroom .pet', s.el), s.stage);
}
async function play(s){
  const m = st.view[s.id];
  s.pet.reset(...(s.start || [50, 80]), s.pose);
  s.stage.querySelectorAll('.fx').forEach(e => e.remove());
  $('.say', s.stage).classList.remove('show');
  $('[data-text]', s.el).innerHTML = s.text[m];
  s.capEl.innerHTML = (s.caps ? s.caps[m] : []).map(t => `<li>${t}</li>`).join('');
  const c = ctxFor(s);
  try { await s.run(m, c); if (s.tok === c.tok) cap(s, -1); } catch(e){ if (e !== STOP) console.error(e); }
}
/* タップの 見本：うしろを むいている ときに うちのこを さわると ふりかえる */
const tapSc = list.find(s => s.id === 'tap');
async function tapNow(){
  const s = tapSc;
  if (s.pet.view !== 'back') return;
  const c = ctxFor(s);
  try { cap(s, 1); tapMark(s.stage, s.pet); await c.w(200); cap(s, 2); await turnAround(c, 'bup'); cap(s, 3); await c.w(800); cap(s, -1); } catch(e){ if (e !== STOP) console.error(e); }
}
tapSc.pet.el.addEventListener('click', tapNow);
tapSc.pet.el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); tapNow(); } });

function playAll(onlyVisible){ for (const s of list) if (!onlyVisible || s.seen) play(s); }
const io = new IntersectionObserver(es => { for (const e of es){ const s = list.find(x => x.el === e.target); if (s && e.isIntersecting && !s.seen){ s.seen = true; play(s); } } }, { threshold:.55 });
list.forEach(s => io.observe(s.el));

/* ===== 一覧：41種・きせかえ ===== */
const GRID_PICK = { art:[['ok','このままで OK'],['fix','直したい ところが ある']], scarf:[['on','せなかに たらす'],['off','なし（帯だけ）']] };
st.pick.art = 'ok'; st.pick.scarf = 'on';
function drawGrids(){
  const fn = st.grid === 'front' ? renderPet : renderPetBack;
  $('#breeds').innerHTML = BREEDS.map(b => `<figure class="gi"><div class="gp">${fn(breedLook(b.id), { wear:{} })}</div><figcaption>${softJa(b.ja)}</figcaption></figure>`).join('');
  const lk = look();
  $('#wears').innerHTML = WEAR.map(wr => `<figure class="gi"><div class="gp">${fn(lk, { wear:{ [wr.slot]:wr.id } })}</div><figcaption>${softJa(wr.ja)}</figcaption></figure>`).join('');
  $('#scarfPair').innerHTML = [true, false].map(on => `<figure class="gi big"><div class="gp">${scarfBack(on)}</div><figcaption>${on ? 'せなかに たらす' : 'なし（帯だけ）'}</figcaption></figure>`).join('');
}
/* せまい タイルの 名前は アプリの softName（js_app.js）と 同じ 切れ目 */
const escH = t => String(t).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch]);
const SOFT = ['ダックスフンド','シュナウザー','テリア','ブルドッグ','レトリーバー','コーギー','ハスキー','ラッセル','フォールド','ショートヘア','フォレスト','キャット'];
function softJa(s){
  let t = escH(s).replace(/([\u3041-\u3096])([\u30A1-\u30FA])/g, '$1<wbr>$2').replace(/([^\s<>]{2})\u306E(?=[^\s<>]{2})/g, '$1\u306E<wbr>').replace(/\uFF08/g, '<wbr>\uFF08');
  for (const w of SOFT) t = t.split(w).join('<wbr>' + w);
  return t.replace(/(<wbr>)+/g, '<wbr>').replace(/^<wbr>/, '');
}
function scarfBack(on){
  const svg = renderPetBack(LOOKS.daizu, { wear:{ neck:'scarf_tri' } });
  return on ? svg : svg.replace(/<g class="pb-scarf">[\s\S]*?<\/g>(?=<path d="M86 152)/, '');
}
drawGrids();

document.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  const g = b.parentElement;
  if (b.classList.contains('play')){ play(list.find(s => s.el.contains(b))); return; }
  if (g && g.dataset.view){ st.view[g.dataset.view] = b.dataset.v; g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); play(list.find(s => s.id === g.dataset.view)); return; }
  if (g && g.dataset.pick){ st.pick[g.dataset.pick] = b.dataset.v; g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); summary(); return; }
  if (g && g.dataset.g === 'kid'){ st.kid = b.dataset.v; g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); playAll(true); drawGrids(); return; }
  if (g && g.dataset.g === 'grid'){ st.grid = b.dataset.v; g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); drawGrids(); return; }
});

function summary(){
  const L = { win:'まどの 下で 外を 見る（うしろを むいて すわる・ふりかえる）', tap:'うしろの ときに タップ → ふりかえって へんじ', rain:'雨の 日（うしろを むいて ふせる）', snow:'雪・花びらの 日（まどの 下で 見あげて ぴょん）', walk:'奥へ あるく ときは うしろすがた', art:'うしろすがたの 絵（41種・きせかえ）', scarf:'マフラーの 端' };
  const all = Object.assign({}, PICK, GRID_PICK);
  const ja = (id, v) => (all[id].find(([x]) => x === v) || [])[1];
  $('#sumText').value = '【だんかい 4（うしろすがた）で えらんだ もの】\n' + ['art', 'scarf', 'win', 'tap', 'rain', 'snow', 'walk'].map(id => `${L[id]}：${ja(id, st.pick[id])}`).join('\n');
}
summary();
$('#copy').addEventListener('click', async () => {
  const t = $('#sumText'); let ok = false;
  try { await navigator.clipboard.writeText(t.value); ok = true; } catch(e){ try { t.select(); ok = document.execCommand('copy'); } catch(_){} }
  $('#copied').textContent = ok ? 'コピーしたよ' : 'えらんで コピーしてね';
});
}
