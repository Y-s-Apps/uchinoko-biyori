{
/* だんかい 3 の 見本：ミニの 画面で 「いま」と「あたらしい」の おせわ・げい・パズル・ポップアップ・きせかえ・季節を うごかす。
   うちのこの 絵と CSS は アプリと 同じ（renderPet・renderPetSide・head.html の うちのこの CSS ＋ stage3.css）。うごかし方（Mini）は js_app.js の Pet を 小さく した もの */
const $ = (s, r = document) => r.querySelector(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const clampN = (v, a, b) => Math.min(b, Math.max(a, v));
const calm = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const st = { kid:'dog', view:{}, pick:{} };
const isCat = () => st.kid === 'cat';
const look = () => isCat() ? breedLook('chatora') : LOOKS.daizu;
const wear = () => isCat() ? { neck:'bell_red' } : { neck:'scarf_tri' };
const BOWL = { x:24, y:93 }, BED = { x:76, y:84 };
const POSE = {
  sit:{ head:.38, mouth:.52 }, stand:{ head:.37, mouth:.5, side:1, hx:.68 }, walk:{ head:.37, mouth:.5, side:1, hx:.68 },
  down:{ head:.5, mouth:.64 }, sleep:{ head:.54, mouth:.68 }, side:{ head:.56, mouth:.72 }, beg:{ head:.32, mouth:.46 },
  cheer:{ head:.3, mouth:.44 }, lean:{ head:.42, mouth:.56 }, bow:{ head:.5, mouth:.6, side:1, hx:.72 },
};
const PART = { down:'down', sleep:'down', beg:'beg', cheer:'cheer' };
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.6 6.6 4.6c2.2 0 3.6 1.2 4.4 2.5.8-1.3 2.2-2.5 4.4-2.5 3.6 0 5.7 3.8 4.2 7.2C19.5 16.4 12 21 12 21z" fill="#F0728E" stroke="#FFFFFF" stroke-width="1.6"/></svg>';
const BALL = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="#FFFFFF" stroke="#3A3147" stroke-width="2.2"/><polygon points="20,13 26.7,17.9 24.1,25.7 15.9,25.7 13.3,17.9" fill="#2E2A33"/><path d="M20 13V5M26.7 17.9l7-2.4M24.1 25.7l4.6 6.4M15.9 25.7l-4.6 6.4M13.3 17.9l-7-2.4" stroke="#2E2A33" stroke-width="1.6"/></svg>';
const YARN = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#F497B0" stroke="#B5577A" stroke-width="2.4"/><path d="M8 14c8 6 18 8 26 4M6 22c9 6 19 7 28 2M12 31c6-10 14-18 22-20" fill="none" stroke="#B5577A" stroke-width="1.8" stroke-linecap="round"/></svg>';
const BOWL_SVG = '<svg viewBox="0 0 60 22" aria-hidden="true"><path d="M5 6h50l-5 12a5 5 0 0 1-5 3H15a5 5 0 0 1-5-3z" fill="#4FAE9A"/><rect x="1" y="2" width="58" height="6" rx="3" fill="#3E9A86"/><path d="M27 13c0-2 3-2 3 0 0-2 3-2 3 0 0 2-3 3.5-3 3.5S27 15 27 13z" fill="#FFFFFF" opacity=".85"/></svg>';
const roomBg = night => `<svg class="bg" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><linearGradient id="sky${night ? 'n' : 'd'}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${night ? '#5C6FA8' : '#A9D8F2'}"/><stop offset="1" stop-color="${night ? '#8FA0CC' : '#DDF1FA'}"/></linearGradient></defs>
  <rect width="400" height="250" fill="#F4E9DD"/>
  <g fill="#EBDCCB"><circle cx="40" cy="26" r="3"/><circle cx="200" cy="30" r="3"/><circle cx="280" cy="18" r="3"/><circle cx="360" cy="28" r="3"/><circle cx="240" cy="110" r="3"/><circle cx="330" cy="96" r="3"/></g>
  <rect x="48" y="22" width="104" height="90" rx="14" fill="#FFFFFF"/><rect x="56" y="30" width="88" height="74" rx="9" fill="url(#sky${night ? 'n' : 'd'})"/>
  <rect x="98" y="30" width="4" height="74" fill="#FFFFFF"/><rect x="56" y="65" width="88" height="4" fill="#FFFFFF"/>
  <rect x="0" y="146" width="400" height="104" fill="#E6CBA5"/><rect x="0" y="142" width="400" height="6" fill="#D9BC94"/>
  <g stroke="#D7B88E" stroke-width="2"><path d="M0 178H400M0 214H400"/><path d="M90 148V178M250 148V178M170 178V214M330 178V214M60 214V250M220 214V250"/></g>
  <ellipse cx="200" cy="214" rx="118" ry="28" fill="#8FAEDF"/><ellipse cx="200" cy="214" rx="92" ry="20" fill="none" stroke="#B9CDEE" stroke-width="5"/>
  <ellipse cx="304" cy="214" rx="56" ry="17" fill="#E89AAE"/><ellipse cx="304" cy="210" rx="44" ry="11" fill="#F4C3D0"/>
  <g transform="translate(368 92)"><path d="M-9 50h18l-3 20h-12z" fill="#D88C6C"/><path d="M0 50C-4 34-14 26-20 15-7 21-2 31 0 44 2 30 7 19 20 12 14 26 5 36 0 50Z" fill="#6FB07E"/></g>
</svg>`;

/* ===== うちのこ（js_app.js の Pet を 小さく した もの） ===== */
class Mini {
  constructor(el, stage, kind){ this.el = el; this.stage = stage; this.kind = kind || 'room'; this.t = {}; this.reset(50, 80); }
  mount(){
    const lk = look(), w = { wear:wear() };
    this.el.innerHTML = this.kind === 'pz'
      ? `<div class="pet-floor"><i></i></div><div class="pz-art">${renderPet(lk, w)}</div>`
      : `<div class="pet-floor"><i></i></div><div class="art"><div class="pet-turn"><div class="view-f">${renderPet(lk, w)}</div><div class="view-s">${renderPetSide(lk, w)}</div></div></div>`;
  }
  reset(x, y){
    for (const k in this.t) clearTimeout(this.t[k]);
    this.el.className = this.kind === 'pz' ? 'pz-pet' : 'pet';
    this.pose = 'sit'; this.view = 'front'; this.dir = 'r'; this.tok = 0;
    this.el.style.removeProperty('--by');
    if (this.kind === 'room'){ this.el.style.transition = 'none'; this.place(x, y); void this.el.offsetWidth; this.el.style.transition = ''; }
    this.mount();
  }
  place(x, y){ this.x = x; this.y = y; this.el.style.left = x + '%'; this.el.style.top = y + '%'; this.el.style.setProperty('--s', (.84 + clampN((y - 66) / 24, 0, 1) * .22).toFixed(3)); }
  cls(c, ms){ this.el.classList.remove(c); void this.el.offsetWidth; this.el.classList.add(c); clearTimeout(this.t[c]); if (ms) this.t[c] = setTimeout(() => this.el.classList.remove(c), ms); }
  off(c){ clearTimeout(this.t[c]); this.el.classList.remove(c); }
  expr(e){ this.el.classList.remove('ex-happy', 'ex-eat', 'ex-sleep', 'ex-sad'); if (e) this.el.classList.add('ex-' + e); }
  jump(){ this.cls(this.kind === 'pz' ? 'hop' : 'jump', 520); }
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
    if (this.kind === 'room') this.setView(POSE[p].side ? 'side' : 'front', turn);
  }
  setView(v, turn){ if (v === this.view) return; this.view = v; if (turn) this.turn(); else this.applyView(); }
  face(left, turn){ const d = left ? 'l' : 'r'; if (d === this.dir) return; this.dir = d; if (turn && this.view === 'side') this.turn(); else this.applyView(); }
  applyView(){ this.el.classList.toggle('view-side', this.view === 'side'); this.el.classList.toggle('dir-l', this.dir === 'l'); }
  turn(){
    if (calm()) return this.applyView();
    this.cls('turning', 330);
    clearTimeout(this.t.av); this.t.av = setTimeout(() => this.applyView(), 160);
  }
  /* くるっとターン（だんかい 3）：正面 → よこ → 反対の よこ → 正面 */
  async spin(){
    this.cls('tr-spin2', 1000);
    this.dir = 'r'; this.setView('side', true); await sleep(330);
    this.face(true, true); await sleep(330);
    this.setView('front', true); await sleep(340);
    this.dir = 'r'; this.applyView();
  }
  moveTo(x, y, speed = 1, end){
    const d = Math.hypot(x - this.x, (y - this.y) * 1.6);
    const ms = Math.max(260, d * 36 / speed), walk = d >= 2.5, tok = ++this.tok;
    this.el.style.transition = `left ${ms}ms linear, top ${ms}ms linear, transform ${ms}ms linear`;
    if (walk){
      const step = clampN(.56 / Math.sqrt(speed), .3, .75);
      this.el.style.setProperty('--step', step.toFixed(2) + 's'); this.el.style.setProperty('--half', (step / 2).toFixed(2) + 's'); this.el.style.setProperty('--lag', (-step / 2).toFixed(2) + 's');
      this.face(x < this.x, true); this.setPose('walk', true);
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
const roomHtml = o => `<div class="mroom${o && o.dim ? ' dim' : ''}">${roomBg(o && o.dim)}${o && o.weather ? `<div class="weather w-${o.weather}"></div>` : ''}<div class="bowlfood"></div><div class="bowl">${BOWL_SVG}</div><div class="pet"></div><div class="say"></div></div>`;

const STOP = {};
function ctxFor(sc){
  const tok = ++sc.tok, stage = sc.stage, p = sc.pet;
  const w = async ms => { await sleep(ms); if (tok !== sc.tok) throw STOP; };
  return { p, stage, w, tok,
    say:(t, ms) => sayIn(stage, p, t, ms),
    hearts:n => { for (let i = 0; i < n; i++) setTimeout(() => { const h = p.headAt(); fx(stage, 'h', h.x + (Math.random() * 30 - 15), h.y - 4, HEART, Math.round(Math.random() * 40 - 20)); }, i * 160); },
    crumbs:ms => { const iv = setInterval(() => { if (tok !== sc.tok) return clearInterval(iv); const m = p.headAt('mouth'); fx(stage, 'c', m.x + (Math.random() * 24 - 12), m.y + 14, '', Math.round(Math.random() * 24 - 12)); }, 260); setTimeout(() => clearInterval(iv), ms); },
  };
}

/* ===== 場面 ===== */
const TOY_PATH = [[28, 79], [72, 85], [42, 75]];
const SCENES = [
  { h:'おせわ' },
  { id:'meal', title:'ごはん', kind:'room', start:[64, 80],
    text:{ old:'お皿の 前へ 行って すわり、そのまま たべる。', new:'お皿の 前で <b>おねだり</b>（前あしを ふって まつ。1.2秒）してから、すわって たべる。たべる 時間は いまと 同じ。' },
    caps:{ old:['お皿へ あるく','すわって たべる','ごちそうさま'], new:['お皿へ あるく','おねだりで まつ','すわって たべる','ごちそうさま'] },
    async run(m, c){
      const { p, w, stage } = c;
      $('.bowlfood', stage).classList.add('on'); cap(this, 0);
      await w(300); c.say(isCat() ? 'ごはんだ！' : 'ごはん！ごはん！', 1400); p.wag(4000);
      await p.moveTo(BOWL.x, BOWL.y - 3.5, 1.3, m === 'new' ? 'beg' : 'sit'); if (this.tok !== c.tok) return;
      let eat = 2700;
      if (m === 'new'){ cap(this, 1); await w(1200); p.setPose('sit', true); }   /* おねだりは 1.2秒（オーナー：もう少し 長く。2026-11-27）。たべる 長さは 同じ */
      cap(this, m === 'new' ? 2 : 1); p.expr('eat'); c.crumbs(eat);
      await w(eat); $('.bowlfood', stage).classList.remove('on');
      cap(this, m === 'new' ? 3 : 2); p.expr('happy'); c.say('ごちそうさま！'); c.hearts(3);
      await w(1500); p.expr(null);
    } },
  { id:'treat', title:'おやつ', kind:'room', start:[66, 80],
    text:{ old:'まんなかへ 来て、おやつを 見て 2回 はねて たべる。', new:'まんなかへ 来て、おやつを 見あげて <b>おねだり</b>。さいごに ぴょんと とんで たべる（長さは いまと 同じ）。' },
    caps:{ old:['まんなかへ','おやつを 見て はねる ×2','たべる'], new:['まんなかへ','おねだりで 見あげる','ぴょんと とって たべる'] },
    async run(m, c){
      const { p, w, stage } = c;
      cap(this, 0); await p.moveTo(50, 82, 1.2);
      const h = p.headAt(), pop = document.createElement('div');
      pop.className = 'treat'; pop.innerHTML = `<svg viewBox="0 0 48 48">${treatIcon((TREATS[isCat() ? 'cat' : 'dog'] || TREATS.dog)[2])}</svg>`;
      pop.style.left = h.x + 'px'; pop.style.top = (h.y - stage.clientHeight * .2) + 'px'; stage.appendChild(pop);
      try {
        cap(this, 1); p.expr('happy'); p.wag(4000);
        if (m === 'new'){ p.setPose('beg', true); await w(1150); p.setPose('sit', true); p.jump(); cap(this, 2); }
        else { await w(450); p.jump(); await w(700); p.jump(); }
        await w(600);
        const mo = p.headAt('mouth'); pop.style.top = mo.y + 'px'; pop.style.left = mo.x + 'px';
        await w(450); pop.style.opacity = '0';
        cap(this, 2); p.expr('eat'); await w(1300);
        p.expr('happy'); c.say(isCat() ? 'おいしいにゃ！' : 'おいしい！'); c.hearts(4); await w(1600); p.expr(null);
      } finally { setTimeout(() => pop.remove(), 400); }
    } },
  { id:'ball', title:'ボール（ねこは 毛糸玉）', kind:'room', start:[50, 80],
    text:{ old:'ボールを おって あるき、着く たびに 正面を むいて すわって はねる（くるっが 6回）。', new:'はじめに <b>「あそぼ！」の ポーズ</b>（前足を のばして おしりを 上げ、しっぽ ぶんぶん）。おいかけて 着いたら よこむきの まま 前足で <b>とびつく</b>。さいごに すわる（0.6秒 ながく なる）。' },
    caps:{ old:['ボールを なげる','おいかけて すわって はねる ×3','たのしかった！'], new:['あそぼ！の ポーズ','おいかけて とびつく ×3','すわって たのしかった！'] },
    async run(m, c){
      const { p, w, stage } = c;
      const toy = document.createElement('div');
      toy.className = 'toy'; toy.innerHTML = isCat() ? YARN : BALL; toy.style.left = '50%'; toy.style.top = '96%'; stage.appendChild(toy);
      try {
        p.expr('happy'); p.wag(9000); cap(this, 0);
        if (m === 'new'){ p.face(true, false); p.setPose('bow', true); c.say('あそぼ！', 1200); await w(700); }
        cap(this, 1);
        for (const [tx, ty] of TOY_PATH){
          toy.style.left = tx + '%'; toy.style.top = (ty + 1) + '%';
          await w(220);
          await p.moveTo(tx, ty, 2.2, m === 'new' ? 'stand' : 'sit'); if (this.tok !== c.tok) return;
          if (m === 'new') p.gesture('pounce', 420); else p.jump();
          c.hearts(1); await w(420);
        }
        toy.style.transition = 'opacity .3s'; toy.style.opacity = '0';
        cap(this, 2); if (m === 'new') p.setPose('sit', true);
        c.say('たのしかった！'); await w(1400); p.expr(null);
      } finally { setTimeout(() => toy.remove(), 400); }
    } },
  { h:'げい' },
  { id:'sit', title:'げい「おすわり」', kind:'room', start:[66, 80],
    text:{ old:'すわった まま まんなかへ 来て、すわった まま 小さく ちぢむ。', new:'まんなかで <b>たって まって</b>、「おすわり！」で くるっと 正面を むいて すわる（ぽすん）。' },
    caps:{ old:['まんなかへ（すわる）','ちぢむ'], new:['まんなかへ（たって まつ）','くるっ → すわる'] },
    async run(m, c){
      const { p, w } = c;
      cap(this, 0); await p.moveTo(50, 80, 1.2, m === 'new' ? 'stand' : 'sit');
      c.say('おすわり！', 1100); await w(800);
      cap(this, 1); p.expr('happy');
      if (m === 'new'){ p.setPose('sit', true); await w(120); }
      p.cls('tr-sit', 1100); await w(1100);
      p.wag(1500); c.hearts(3); c.say('どう？'); await w(1400); p.expr(null);
    } },
  { id:'spin', title:'げい「くるっとターン」', kind:'room', start:[66, 80],
    text:{ old:'正面の 絵を うらがえして まわった ように 見せる。', new:'<b>正面 → よこ → 反対の よこ → 正面</b> と ほんとうに まわる（よこむきの 絵で。小さく はねながら）。' },
    caps:{ old:['まんなかへ','うらがえる'], new:['まんなかへ','よこ → 反対の よこ → 正面'] },
    async run(m, c){
      const { p, w } = c;
      cap(this, 0); await p.moveTo(50, 80, 1.2, 'sit');
      c.say('くるっと！', 1100); await w(800);
      cap(this, 1); p.expr('happy');
      if (m === 'new') await p.spin(); else { p.cls('tr-spin', 1000); await w(1000); }
      p.wag(1500); c.hearts(3); c.say('じょうずでしょ！'); await w(1400); p.expr(null);
    } },
  { id:'stretch', title:'げい「のびー」（ねこ）', kind:'room', start:[66, 80], cat:true,
    text:{ old:'正面の 絵を よこに のばして ちぢめる。', new:'まんなかで たって、<b>よこむきで ほんとうの のび</b>（前足を のばして おしりを 上げる）。おわったら すわる。' },
    caps:{ old:['まんなかへ','よこに のびる'], new:['まんなかへ（たって まつ）','よこむきで のび','すわる'] },
    async run(m, c){
      const { p, w } = c;
      cap(this, 0); await p.moveTo(50, 80, 1.2, m === 'new' ? 'stand' : 'sit');
      c.say('のびー！', 1100); await w(800);
      cap(this, 1); p.expr('happy');
      p.cls('tr-stretch', 1600); await w(1600);
      if (m === 'new'){ cap(this, 2); p.setPose('sit', true); }
      p.wag(1500); c.hearts(3); c.say('えへへ'); await w(1400); p.expr(null);
    } },
  { h:'パズルの 上' },
  { id:'puzzle', title:'パズル「おやつならべ」', kind:'pz',
    text:{ old:'そろう・れんさ・クリアで はねる だけ。', new:'まつ あいだは きょろきょろ・耳ぴく、れんさで <b>ばんざい</b>、のこり 3手で <b>前のめり</b>（盤を じっと 見る）、クリアで ばんざい＋はねる。おしかった ときも かなしまない（かしげて しっぽ）。かげも ゆかに のこる。' },
    caps:{ old:['まつ','3つ そろった（はねる）','れんさ（はねる）','のこり 3手','クリア（はねる ×3）','おしかった（はねる）'],
           new:['まつ（きょろきょろ・耳ぴく）','3つ そろった（はねる）','れんさ（ばんざい）','のこり 3手（前のめり）','クリア（ばんざい＋はねる ×3）','おしかった（かしげて しっぽ）'] },
    async run(m, c){
      const { p, w, stage } = c, say = t => { $('.pz-say', stage).textContent = t; }, mv = n => { $('.moves', stage).textContent = `のこり ${n}手`; };
      const nw = m === 'new';
      mv(12); cap(this, 0); say(isCat() ? 'いっしょに がんばるにゃ！' : 'いっしょに がんばろ！');
      await w(900); if (nw){ await p.gesture('look', 1800); await p.gesture('ear', 750); } else await w(2200);
      cap(this, 1); mv(9); say('いいね！'); p.expr('happy'); p.wag(1400); p.jump(); await w(1400); p.expr(null);
      cap(this, 2); mv(7); say('れんさだ！'); p.expr('happy'); p.wag(1400);
      if (nw){ p.setPose('cheer'); p.jump(); await w(1300); p.setPose('sit'); } else { p.jump(); await w(1300); }
      p.expr(null);
      cap(this, 3); mv(3); say('あと 3手！'); if (nw) p.setPose('lean'); await w(2200);
      cap(this, 4); mv(1); say(isCat() ? 'クリア！ やったにゃ！' : 'クリア！ やったね！'); p.expr('happy'); p.wag(2400);
      if (nw) p.setPose('cheer');
      p.cls('joy', 1400); await w(2000); p.setPose('sit'); p.expr(null);
      cap(this, 5); mv(0); say('おしかったね！ また あそぼ');
      if (nw){ p.tilt(); await w(400); p.gesture(isCat() ? 'sway' : 'tailup', 1400); await w(1400); } else { p.expr('happy'); p.jump(); await w(1400); p.expr(null); }
    } },
  { h:'ポップアップ' },
  { id:'pops', title:'ポップアップの うちのこ', kind:'pops',
    text:{ old:'どれも すわって しっぽを ふる（ピンチ・とぎれた は さみしい 顔）。', new:'できごとに あわせて 体勢を かえる。かげは ゆかに のこる。' },
    items:[
      { t:'なかよしLv 21', s:'レベルアップ・ぜんぶ かなえた・れんぞく つながった・げいを おぼえた', old:'ex-happy wag-fast', new:'pose-cheer ex-happy wag-fast m-hop', cap:'ばんざい＋はねる' },
      { t:'おみやげ', s:'おるすばんの おみやげ', old:'ex-happy wag-fast', new:'ex-happy m-tail', cap:'すわって しっぽ ぴん → ぶんぶん' },
      { t:'おはなみ', s:'季節の イベント・うちのこ記念日', old:'ex-happy wag-fast', new:'ex-happy wag-fast m-tilt m-hop', cap:'かしげて はねる' },
      { t:'ピンチ！', s:'れんぞくの ピンチ・とぎれちゃった', old:'ex-sad', new:'pose-down ex-sad look-up', cap:'ふせて 見あげる（さみしそう まで）' },
    ],
    async run(m, c){
      $('.pops', c.stage).innerHTML = this.items.map(it => `<div class="pop"><div class="card"><div class="mpet ${it[m]}">${renderPet(look(), { wear:wear() })}</div><b>${it.t}</b><small>${m === 'new' ? it.cap : it.s}</small></div></div>`).join('');
      cap(this, -1);
    } },
  { h:'きせかえ' },
  { id:'dress', title:'きせかえの シート', kind:'dress', modes:['A','B','AB','old'], def:'AB',
    text:{ old:'えらぶと シートの うしろで「にあう？」と 言う（シートに かくれて 見えない）。', A:'えらんだ タイルの 子が <b>ぴょん</b>（タイルの 絵は おすわりの まま）。', B:'シートを とじたら、おへやの 子が <b>くるっと 1回転</b>して「にあう？」と かしげる。', AB:'A と B の 両方。えらんだ ときに タイルの 子が ぴょん、とじたら おへやで くるっと 見せる。' },
    caps:{ old:['シートを ひらく','えらぶ（うしろで「にあう？」）','とじる'], A:['シートを ひらく','えらぶ → タイルの 子が ぴょん','とじる'], B:['シートを ひらく','えらぶ','とじる → くるっと「にあう？」'], AB:['シートを ひらく','えらぶ → タイルの 子が ぴょん','とじる → くるっと「にあう？」'] },
    async run(m, c){
      const { p, w, stage } = c, sheet = $('.msheet', stage), A = m === 'A' || m === 'AB', B = m === 'B' || m === 'AB';
      const opts = isCat() ? [{ neck:'bell_red' }, { neck:'bell_red', head:'ribbon_pink' }, { neck:'bell_red', head:'beret_red' }] : [{ neck:'scarf_tri' }, { neck:'scarf_tri', head:'ribbon_pink' }, { neck:'scarf_tri', head:'beret_red' }];
      sheet.innerHTML = opts.map((o, i) => `<div class="mtile${i === 0 ? ' sel' : ''}"><div class="tp">${renderPet(look(), { wear:o })}</div>${['いまの','リボン','ベレー帽'][i]}</div>`).join('');
      cap(this, 0); await w(500); sheet.classList.add('open'); await w(900);
      cap(this, 1); const t = sheet.children; t[0].classList.remove('sel'); t[1].classList.add('sel');
      if (A) t[1].classList.add('hop');
      p.el.querySelector('.view-f').innerHTML = renderPet(look(), { wear:opts[1] }); p.el.querySelector('.view-s').innerHTML = renderPetSide(look(), { wear:opts[1] });
      if (!B) c.say('にあう？', 1400);
      await w(1200); cap(this, 2); sheet.classList.remove('open'); await w(450);
      if (B){ p.expr('happy'); await p.spin(); c.say('にあう？', 1600); p.tilt(); p.wag(1400); await w(1400); p.expr(null); }
    } },
  { h:'季節（ひまな とき）' },
  { id:'snow', title:'雪・花びらの 日', kind:'room', weather:'snow', modes:['new'], def:'new', start:[50, 82],
    text:{ new:'雪（クリスマス・1〜2月）や 花びら（おはなみ）の 日は、ときどき <b>上を 見あげて ぴょん</b>（つかまえる）。' },
    caps:{ new:['上を 見あげる','ぴょん（ぱくっ）'] },
    async run(m, c){
      const { p, w } = c;
      await w(500); cap(this, 0); p.gesture('lookup', 1300); await w(900);
      cap(this, 1); p.expr('happy'); p.jump(); p.wag(1200); await w(500); c.say(isCat() ? 'つかまえたにゃ！' : 'ゆきだ！', 1400); await w(1300); p.expr(null);
    } },
  { id:'rain', title:'雨の 日（つゆ）', kind:'room', weather:'rain', dim:true, modes:['new'], def:'new', start:[60, 80],
    text:{ new:'つゆの 雨の 日は、ときどき <b>まどの 下で ふせて</b> 外を 気に する（耳ぴく・きょろきょろ）。' },
    caps:{ new:['まどの 下へ','ふせて 耳ぴく・きょろきょろ'] },
    async run(m, c){
      const { p, w } = c;
      cap(this, 0); await p.moveTo(24, 72, .8, 'down'); if (this.tok !== c.tok) return;
      cap(this, 1); await w(700); await p.gesture('ear', 750); await p.gesture('look', 1800); c.say('あめ、やまないね', 1800); await w(1800);
    } },
];

/* ===== カードを 作る ===== */
const MODE_JA = { old:'いま', new:'あたらしい', A:'A タイルで ぴょん', B:'B とじて くるっ', AB:'A＋B' };
const PICK = {
  meal:[['new','あたらしく する'],['old','いまの まま']], treat:[['new','あたらしく する'],['old','いまの まま']], ball:[['new','あたらしく する'],['old','いまの まま']],
  sit:[['new','あたらしく する'],['old','いまの まま']], spin:[['new','あたらしく する'],['old','いまの まま']], stretch:[['new','あたらしく する'],['old','いまの まま']],
  puzzle:[['new','あたらしく する'],['old','いまの まま']], pops:[['new','あたらしく する'],['old','いまの まま']],
  dress:[['AB','A＋B'],['A','A だけ'],['B','B だけ'],['old','いまの まま']], snow:[['new','いれる'],['old','いらない']], rain:[['new','いれる'],['old','いらない']],
};
const box = $('#scenes');
box.innerHTML = SCENES.map(s => {
  if (s.h) return `<h2>${s.h}</h2>`;
  const modes = s.modes || ['new', 'old'];
  st.view[s.id] = s.def || 'new'; st.pick[s.id] = PICK[s.id][0][0];
  const stage = s.kind === 'pz' ? `<div class="mpz" data-stage><div class="pz-wall"></div><div class="pz-floor"></div><span class="moves"></span><p class="pz-say"></p><div class="pz-pet"></div></div>`
    : s.kind === 'pops' ? `<div data-stage><div class="pops"></div></div>`
    : s.kind === 'dress' ? `<div class="mdress" data-stage>${roomHtml()}<div class="msheet"></div></div>`
    : `<div data-stage>${roomHtml({ weather:s.weather, dim:s.dim })}</div>`;
  return `<section class="sc" id="sc-${s.id}">
    <div class="sc-h"><h3>${typeof s.title === 'function' ? s.title() : s.title}</h3>${modes.length > 1 ? `<span class="opts" data-view="${s.id}">${modes.map(m => `<button class="opt" type="button" data-v="${m}" aria-pressed="${m === st.view[s.id]}">${MODE_JA[m]}</button>`).join('')}</span>` : ''}</div>
    <p data-text></p>${stage}<ol class="cap"></ol>
    <div class="row"><button class="play" type="button">▶ もういちど</button><span class="opts" data-pick="${s.id}">${PICK[s.id].map(([v, ja], i) => `<button class="opt" type="button" data-v="${v}" aria-pressed="${i === 0}">${ja}</button>`).join('')}</span></div>
  </section>`;
}).join('');
function cap(sc, i){ sc.capEl.querySelectorAll('li').forEach((li, j) => li.classList.toggle('on', j === i)); }
const list = SCENES.filter(s => !s.h);
for (const s of list){
  s.el = $('#sc-' + s.id); s.tok = 0;
  s.stage = s.kind === 'room' ? $('.mroom', s.el) : s.kind === 'dress' ? $('.mdress', s.el) : $('[data-stage]', s.el);
  s.capEl = $('.cap', s.el);
  const petEl = s.kind === 'pz' ? $('.pz-pet', s.el) : s.kind === 'pops' ? null : $('.mroom .pet', s.el);
  if (petEl) s.pet = new Mini(petEl, s.kind === 'dress' ? $('.mroom', s.el) : s.stage, s.kind === 'pz' ? 'pz' : 'room');
  if (s.kind === 'dress') s.stage = $('.mroom', s.el), s.sheetHost = $('.mdress', s.el);
}
async function play(s){
  const m = st.view[s.id];
  if (s.pet) s.pet.reset(...(s.start || [50, 80]));
  s.stage.querySelectorAll('.treat,.toy,.fx').forEach(e => e.remove());
  const say = $('.say', s.stage); if (say) say.classList.remove('show');
  const bf = $('.bowlfood', s.stage); if (bf) bf.classList.remove('on');
  if (s.kind === 'dress') $('.msheet', s.sheetHost).classList.remove('open');
  $('[data-text]', s.el).innerHTML = s.text[m];
  s.capEl.innerHTML = (s.caps ? s.caps[m] : []).map(t => `<li>${t}</li>`).join('');
  const c = ctxFor(s);
  if (s.kind === 'dress') c.stage = s.sheetHost;
  try { await s.run(m, c); if (s.tok === c.tok) cap(s, -1); } catch(e){ if (e !== STOP) console.error(e); }
}
const prevCat = { v:null };
function playAll(onlyVisible){ for (const s of list) if (!onlyVisible || s.seen) play(s); }
/* 見えたら 1回 うごかす */
const io = new IntersectionObserver(es => { for (const e of es){ const s = list.find(x => x.el === e.target); if (s && e.isIntersecting && !s.seen){ s.seen = true; play(s); } } }, { threshold:.55 });
list.forEach(s => io.observe(s.el));
document.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  const g = b.parentElement;
  if (b.classList.contains('play')){ play(list.find(s => s.el.contains(b))); return; }
  if (g && g.dataset.view){ st.view[g.dataset.view] = b.dataset.v; g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); play(list.find(s => s.id === g.dataset.view)); return; }
  if (g && g.dataset.pick){ st.pick[g.dataset.pick] = b.dataset.v; g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); summary(); return; }
  if (g && g.dataset.g === 'kid'){ st.kid = b.dataset.v; g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); playAll(true); return; }
});
/* げい「のびー」は ねこの げい：見本では ねこで（だいずの ときも） */
const stretch = list.find(s => s.id === 'stretch');
const stretchMount = stretch.pet.mount.bind(stretch.pet);
stretch.pet.mount = () => { const k = st.kid; st.kid = 'cat'; stretchMount(); st.kid = k; };

function summary(){
  const L = { meal:'ごはん（お皿の 前で おねだり → たべる）', treat:'おやつ（おねだりで 見あげて ぴょん）', ball:'ボール（あそぼ！の ポーズ・とびつく）', sit:'げい「おすわり」（たって → すわる）', spin:'げい「くるっとターン」（よこむきで まわる）', stretch:'げい「のびー」（よこむきの のび）', puzzle:'パズルの 上（まつ・ばんざい・前のめり）', pops:'ポップアップ（ばんざい・しっぽ・かしげる・ふせて 見あげる）', dress:'きせかえ', snow:'雪・花びらの 日（見あげて ぴょん）', rain:'雨の 日（まどの 下で ふせる）' };
  const ja = (id, v) => (PICK[id].find(([x]) => x === v) || [])[1];
  $('#sumText').value = '【だんかい 3 で えらんだ もの】\n' + list.map(s => `${L[s.id]}：${ja(s.id, st.pick[s.id])}`).join('\n');
}
summary();
$('#copy').addEventListener('click', async () => {
  const t = $('#sumText'); let ok = false;
  try { await navigator.clipboard.writeText(t.value); ok = true; } catch(e){ try { t.select(); ok = document.execCommand('copy'); } catch(_){} }
  $('#copied').textContent = ok ? 'コピーしたよ' : 'えらんで コピーしてね';
});
}
