/* ===== app core ===== */
const $ = s => document.querySelector(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const pick = a => a[Math.floor(Math.random() * a.length)];
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
/* a saved photo is only ever a base64 image data URL; anything else is dropped */
const PHOTO_RE = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const safePhoto = (v, max = 2e6) => typeof v === 'string' && v.length < max && PHOTO_RE.test(v) ? v : null;
const STORE_KEY = 'uchinoko-biyori:v1';
const BACKUP_KEY = 'uchinoko-biyori:backup';          /* the last good save from an earlier day */
const BACKUP_DAY_KEY = 'uchinoko-biyori:backup-day';  /* the day that backup was taken */
const BROKEN_KEY = 'uchinoko-biyori:broken';          /* an unreadable save, kept as it was found */
const BOWL = { x:24, y:93 }, BED = { x:76, y:84 };
let S = null;

const CL = window.claude && typeof window.claude.use === 'function' ? window.claude : null;
const useCap = name => CL ? CL.use(name).catch(() => null) : Promise.resolve(null);

/* ----- state (the rules themselves are in js_rules.js) ----- */
function decay(t = now()){ if (S) Rules.decay(S, t); }
function petWear(){ return Rules.wear(S); }
function nextupHtml(nx){
  return `<p class="nextup"><span class="nx-head">つぎのごほうび</span><span class="nx-body"><b>Lv.${nx.lv}</b> <span class="nx-item">${esc(nx.ja)}</span></span></p>`;
}
function nextReward(lv){
  const items = [];
  (TREATS[S.pet.species] || []).forEach(t => { if (t.lv > lv) items.push({ lv:t.lv, ja:'おやつ「' + t.ja + '」' }); });
  WEAR.forEach(w => { if (w.lv > lv) items.push({ lv:w.lv, ja:'きせかえ「' + w.ja + '」' }); });
  DECOR_CATS.forEach(([k]) => DECOR[k].forEach(d => { if (d.lv > lv) items.push({ lv:d.lv, ja:'もようがえ「' + d.ja + '」' }); }));
  (TRICKS[S.pet.species] || []).forEach(t => { if (t.lv > lv) items.push({ lv:t.lv, ja:'げい「' + t.ja + '」' }); });
  items.sort((a, b) => a.lv - b.lv);
  return items[0] || null;
}

/* ----- saving: private per-person doc in db, mirrored to this browser ----- */
const Persist = {
  ref:null, mode:'local', timer:null, writing:false, again:false,
  restored:null, bkDay:null, failNoticed:false,
  checking:false,   /* Claude版：クラウドの セーブを たしかめている あいだ（はじめての画面に「たしかめています」。診断 3-7） */
  base:null,   /* `updated` of the save this device opened with: opening the app bumps S.updated, this does not */
  readSave(t){
    try { const v = t ? JSON.parse(t) : null; return v && typeof v === 'object' && v.pet && typeof v.pet === 'object' ? v : null; }
    catch(e){ return null; }
  },
  /* the save on this device; if it cannot be read, it is kept aside and the backup is used instead */
  loadLocal(){
    let raw = null;
    try { raw = localStorage.getItem(STORE_KEY); } catch(e){ return null; }
    const v = this.readSave(raw);
    if (v){ this.base = Number(v.updated) || 0; return v; }
    if (raw != null){ try { localStorage.setItem(BROKEN_KEY, raw); } catch(e){} }
    let b = null;
    try { b = this.readSave(localStorage.getItem(BACKUP_KEY)); } catch(e){}
    if (b) this.restored = this.base = Number(b.updated) || 0;
    return b;
  },
  /* once a day, before the first save, the last good save is copied aside */
  backup(){
    const day = dayKey();
    if (this.bkDay === day) return;
    try {
      if (localStorage.getItem(BACKUP_DAY_KEY) !== day){
        const prev = localStorage.getItem(STORE_KEY);
        if (this.readSave(prev)){ localStorage.setItem(BACKUP_KEY, prev); localStorage.setItem(BACKUP_DAY_KEY, day); }
      }
      this.bkDay = day;
    } catch(e){}
  },
  saveLocal(){
    if (!S) return;
    this.backup();
    try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); }
    catch(e){ if (HOME) this.failNotice(); }
  },
  failNotice(){
    if (this.failNoticed || !S) return;
    this.failNoticed = true;
    Modal.show({
      label:'ほぞんできませんでした',
      html:() => `${petCard('', 'ex-sad')}<h3>この端末に<br>ほぞんできませんでした</h3>
        <p>端末の空きが すくないのかも しれません。${esc(S.pet.name)}を なくさないように、「引っこし・バックアップ」で コードを コピーするか、ファイルで 保存しておいてね。</p>
        <div class="btnrow"><button class="btn" type="button" data-close>とじる</button><button class="btn primary" type="button" data-close="move">バックアップ</button></div>`,
    }).then(v => { if (v === 'move') openMove(); });
  },
  restoredNotice(){
    if (this.restored == null || !S) return;
    const when = this.restored ? fmtMD(this.restored) + 'の' : '';
    this.restored = null;
    Modal.show({
      label:'ひかえから もどしました',
      html:() => `${petCard()}<h3>ひかえから<br>もどしたよ</h3>
        <p>この端末の セーブが 読めなかったので、${when}ひかえから ${esc(S.pet.name)}を もどしました。</p>
        <button class="btn primary" type="button" data-close>OK</button>`,
    });
  },
  /* a home-screen app asks the browser not to clear its storage when the device runs low on space */
  keep(){
    try {
      const st = navigator.storage;
      if (HOME && st && st.persist && st.persisted) st.persisted().then(p => p || st.persist()).catch(() => {});
    } catch(e){}
  },
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
    if (!CL) return;
    this.checking = true;
    Onboard.checkLine();
    try { await this.connectCloud(); }
    finally { this.checking = false; Onboard.checkLine(); }
  },
  /* はじめての画面で「この子とくらす」「受け取る」を押したとき、クラウドを たしかめている あいだは 8秒まで まつ */
  async settle(ms = 8000){
    const t0 = Date.now();
    while (this.checking && Date.now() - t0 < ms) await new Promise(r => setTimeout(r, 200));
  },
  async connectCloud(){
    const [db, user] = await Promise.all([useCap('db'), useCap('user')]);
    if (!db || !user) return;
    let uid = null;
    try { uid = await user.id(); } catch(e){}
    if (!uid) return;
    try {
      const ref = db.doc('data/users/' + uid + '/pet');
      const snap = await ref.get();
      this.ref = ref; this.mode = 'cloud';
      /* the cloud copy goes through the same checks as a save on this device (ensureState runs in Game.start) */
      const raw = snap.exists ? snap.data() : null;
      const remote = raw && typeof raw === 'object' && raw.pet && typeof raw.pet === 'object' ? raw : null;
      /* compare with the save this device opened with, not with S.updated (already bumped by opening the app),
         so an older copy on this device never overwrites newer play from another device */
      const remoteT = remote ? Number(remote.updated) || 0 : 0;
      const localT = this.base != null ? this.base : (S ? Number(S.updated) || 0 : 0);
      /* この端末に セーブが なかった（はじめての端末）ときは、クラウドの子が 先。クラウドが 答える前に はじめての画面で
         新しい子を 作っても、クラウドの子を 上書きしない（診断 3-7） */
      const fresh = this.base == null;
      if (remote && (!S || fresh || remoteT > localT)){
        const met = fresh && (Onboard.busy || Game.started);
        S = JSON.parse(JSON.stringify(remote));
        this.base = remoteT;
        this.saveLocal();
        if (met){ Onboard.close(); Game.start('ただいま！'); toast(`クラウドに いた ${S.pet.name}と あえたよ`); }
        else Game.onStateReplaced();
      } else if (S && (!remote || (Number(S.updated) || 0) > remoteT)){
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
/* 名前（種類・おやつ・きせかえ など）を、タイルのような せまいところで ことばの まんなかで 切らないように：
   切ってよいところに <wbr>（ひらがなから カタカナへ かわるところ・「の」のあと・「ちいさな」などの あと・カタカナの ことばの つなぎめ）。HTML を返す */
const SOFT_WORDS = ['ダックスフンド','シュナウザー','テリア','ブルドッグ','レトリーバー','コーギー','ハスキー','ラッセル','フォールド',
  'ショートヘア','フォレスト','キャット','ケーキ','ささみ'];
function softName(s){
  /* 正規表現の中の文字は \u で書く（ひらがな ぁ-ゖ・カタカナ ァ-ヺ・漢字・の・な） */
  let t = esc(s).replace(/([\u3041-\u3096])([\u30A1-\u30FA])/g, '$1<wbr>$2').replace(/([^\s<>]{2})\u306E(?=[^\s<>]{2})/g, '$1\u306E<wbr>')
    .replace(/([\u3041-\u3096]{2}\u306A)(?=[\u4E00-\u9FFF])/g, '$1<wbr>');
  for (const w of SOFT_WORDS) t = t.split(w).join('<wbr>' + w);
  return t.replace(/(<wbr>)+/g, '<wbr>').replace(/^<wbr>/, '');
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
/* 体勢（docs/MOTION_DESIGN.md 4-3・10章・12章）：入れものの クラス pose-<id>（すわる は クラスなし）と、体勢ごとの 頭・口の 高さ（うちのこの わくの 上から の 割合）・
   ふきだしを 下げる px（--by）。side:true は よこむきの 絵（renderPetSide。たつ・あるく）で、hx は 頭の よこの 位置（右むきの とき。左むきは 1−hx）。
   2026-11-27 だんかい 2：たつ・あるく（よこ）・ふせる・ねる（あごを 前あしに）・ごろん（A おなか）・おねだり */
const POSE = {
  sit:   { head:.38, mouth:.52, bubble:0 },
  stand: { head:.37, mouth:.5, bubble:6, side:true, hx:.68 },
  walk:  { head:.37, mouth:.5, bubble:6, side:true, hx:.68 },
  down:  { head:.5, mouth:.64, bubble:20 },
  sleep: { head:.54, mouth:.68, bubble:26 },
  side:  { head:.56, mouth:.72, bubble:22 },
  beg:   { head:.32, mouth:.46, bubble:-10 },
  /* だんかい 3（2026-11-27）：よろこび（ばんざい）・前のめり（パズル）・あそぼ（プレイバウ。よこむき） */
  cheer: { head:.3, mouth:.44, bubble:-12 },
  lean:  { head:.42, mouth:.56, bubble:6 },
  bow:   { head:.5, mouth:.62, bubble:18, side:true, hx:.72 },
  /* だんかい 4（2026-11-27）：うしろすがた（renderPetBack。back:true）。まどの 下で すわる・見あげる・ふせる、奥へ あるく */
  bsit:  { head:.38, mouth:.52, bubble:0, back:true },
  bup:   { head:.36, mouth:.5, bubble:-2, back:true },
  bdown: { head:.5, mouth:.64, bubble:20, back:true },
  bwalk: { head:.33, mouth:.47, bubble:-6, back:true },
};
/* まどの 下（だんかい 4：うしろを むいて 外を 見る ところ） */
const WIN = { x:22, y:70 };
/* しぐさ（4-4・10章。2026-11-26 だんかい 1）：{ ms, poses:[できる 体勢], sp:'dog'|'cat'|'both', calm:true＝ねていても よい }。
   クラス g-<id> を ms だけ つける（CSS は head.html）。のび（stretch）・くんくん（sniff）は よこむきの 絵で「たつ」の ときだけ（2026-11-27 だんかい 2） */
const GESTURE = {
  ear:     { ms:750,  poses:['sit','stand','down','sleep','beg','side','bsit','bup','bdown'], sp:'both', calm:true },   /* 耳ぴく（うしろでも。だんかい 4） */
  look:    { ms:1800, poses:['sit','down','bsit','bup','bdown'], sp:'both' },                  /* きょろきょろ（うしろでも） */
  yawn:    { ms:1600, poses:['sit','down'], sp:'both' },                                       /* あくび */
  shake:   { ms:800,  poses:['sit'], sp:'dog' },                                               /* ぶるぶる */
  scratch: { ms:1700, poses:['sit'], sp:'both' },                                              /* かく（うしろ足で 耳の うしろ） */
  groom:   { ms:2400, poses:['sit'], sp:'cat' },                                               /* けづくろい */
  sway:    { ms:2400, poses:['sit','stand','down','sleep','beg','side'], sp:'cat', calm:true }, /* しっぽ ゆらり */
  tailup:  { ms:1400, poses:['sit','stand'], sp:'both' },                                      /* しっぽ ぴん */
  pant:    { ms:1600, poses:['sit','stand'], sp:'dog' },                                       /* はぁはぁ（あそんだ あと） */
  lick:    { ms:1000, poses:['sit'], sp:'both' },                                              /* ぺろり（たべた あと） */
  stretch: { ms:1900, poses:['stand'], sp:'both' },                                            /* のび（よこむき） */
  sniff:   { ms:1600, poses:['stand'], sp:'both' },                                            /* くんくん（よこむき。鼻を 床へ） */
  lookup:  { ms:1300, poses:['sit'], sp:'both' },                                              /* 上を 見あげる（雪・花びらの 日。だんかい 3） */
};
/* 体勢ごとの 部品（ふせる・ねる＝前に のばした 前あし、おねだり＝胸の 前の 前あし）。ほかの 体勢へ うつる ときに ふわっと けす */
const POSE_PART = { down:'down', sleep:'down', beg:'beg', cheer:'cheer' };
const calmMotion = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const Pet = {
  el: $('#pet'), x:50, y:80, busy:false, sleeping:false, expr:null, tok:0, sayT:null, wakeUntil:0, pose:'sit', gest:null, gtok:0, ateAt:0, playedAt:0,
  view:'front', dir:'r', ttok:0, ptok:0, rub:null, stok:0,
  scaleAt(y){ return .84 + clamp((y - 66) / 24, 0, 1) * .22; },
  apply(){
    this.el.style.left = this.x + '%';
    this.el.style.top = this.y + '%';
    this.el.style.zIndex = String(10 + Math.round(this.y));
    this.el.style.setProperty('--s', this.scaleAt(this.y).toFixed(3));
  },
  /* 絵は 3まい：正面（renderPet）・よこむき（renderPetSide）・うしろ（renderPetBack。だんかい 4）。見せるのは どれか 1つ（.pet の view-side・view-back。head.html） */
  mount(){
    const wear = petWear();
    $('#petArt').innerHTML = `<div class="pet-turn"><div class="view-f">${renderPet(S.pet.look, { wear })}</div><div class="view-s"></div><div class="view-b"></div></div>`;
    this.apply();
    this.applyView();
    this.setExpr(this.expr);
  },
  /* よこむき・うしろの 絵は はじめて その むきに なる ときに かく（mount で 空に もどる＝きせかえ・名前の たびに 3まい かかない。
     古い 端末で おもく ならない ように。診断 C2-3・C5-3。2026-11-28）。見えていない 絵は display:none なので 大きさは かわらない */
  draw(v){
    if ((v !== 'side' && v !== 'back') || !S) return;
    const box = this.el.querySelector(v === 'side' ? '.view-s' : '.view-b');
    if (!box || box.firstChild) return;
    const wear = petWear();
    box.innerHTML = v === 'side' ? renderPetSide(S.pet.look, { wear }) : renderPetBack(S.pet.look, { wear });
  },
  poseAt(){ return hasId(POSE, this.pose) ? POSE[this.pose] : POSE.sit; },
  /* 頭の よこの 位置（わくの 左から の 割合）。よこむきは 頭が 前に ある */
  poseX(){ const P = this.poseAt(); return P.hx ? (this.dir === 'l' ? 1 - P.hx : P.hx) : .5; },
  headPoint(){
    const r = this.el.getBoundingClientRect(), s = stage.getBoundingClientRect();
    return { x:r.left - s.left + r.width * this.poseX(), y:r.top - s.top + r.height * this.poseAt().head };
  },
  mouthPoint(){
    const r = this.el.getBoundingClientRect(), s = stage.getBoundingClientRect();
    return { x:r.left - s.left + r.width * this.poseX(), y:r.top - s.top + r.height * this.poseAt().mouth };
  },
  /* 体勢を かえる（見た目だけ。セーブ・ルールに さわらない）。知らない 体勢は すわる。
     正面と よこむきが かわる ときは turn なら くるっと まわる（またない＝おせわの 長さは かわらない）。ほかの 体勢へは 0.5秒で なめらかに（CSS の transition） */
  setPose(p, turn){
    if (!hasId(POSE, p)) p = 'sit';
    this.ptok++;
    const was = POSE_PART[this.pose], part = POSE_PART[p];
    if (part) this.el.classList.remove('leave-' + part);
    if (was && was !== part) this.leave(was);
    for (const k in POSE) if (k !== 'sit') this.el.classList.toggle('pose-' + k, k === p);
    this.pose = p;
    const by = POSE[p].bubble;
    if (by) this.el.style.setProperty('--by', by + 'px'); else this.el.style.removeProperty('--by');
    this.setView(POSE[p].back ? 'back' : POSE[p].side ? 'side' : 'front', turn);
  },
  /* 体勢の 部品（pvx-down・pvx-beg）を ふわっと けす（display:none に すると いっしゅんで きえて、前あしが ない コマが 出る） */
  leave(part){
    const c = 'leave-' + part, k = 'leaveT_' + part;
    this.el.classList.remove(c); void this.el.offsetWidth; this.el.classList.add(c);
    clearTimeout(this[k]); this[k] = setTimeout(() => this.el.classList.remove(c), 360);
  },
  /* しばらく その 体勢で、ms たったら すわる（とちゅうで ほかの 体勢に なったら なにも しない） */
  poseFor(p, ms){
    this.setPose(p, true);
    const tok = this.ptok;
    return sleep(ms).then(() => { if (tok === this.ptok && !this.busy) this.setPose('sit', true); });
  },
  setView(v, turn){
    if (v === this.view) return;
    this.view = v;
    this.draw(v);   /* くるっの まんなかで 入れかえる 前に かいておく */
    if (turn) this.turn(); else this.snap();
  },
  /* 左右の むき（left で 左）。よこむきの ときは くるっと まわる */
  face(left, turn){
    const d = left ? 'l' : 'r';
    if (d === this.dir) return;
    this.dir = d;
    if (turn && this.view === 'side') this.turn(); else this.applyView();
  },
  applyView(){
    this.draw(this.view);
    this.el.classList.toggle('view-side', this.view === 'side');
    this.el.classList.toggle('view-back', this.view === 'back');
    this.el.classList.toggle('dir-l', this.dir === 'l');
  },
  snap(){ this.ttok++; this.el.classList.remove('turning'); this.applyView(); },
  /* くるっ：入れもの（.pet-turn）を 0.32秒で scaleX 1→0.08→1。まんなか（0.16秒）で 絵と むきを 入れかえる。うごきを へらす 設定では すぐ */
  turn(){
    if (calmMotion()) return this.snap();
    const tok = ++this.ttok;
    this.el.classList.remove('turning'); void this.el.offsetWidth; this.el.classList.add('turning');
    setTimeout(() => this.applyView(), 160);
    setTimeout(() => { if (tok === this.ttok) this.el.classList.remove('turning'); }, 330);
  },
  /* しぐさ（GESTURE の id）が いま できるか。おせわ・げいの とちゅう・ほかの しぐさの とちゅう・合わない 体勢や 種類・ねている（calm で ない もの）・
     パズルや ランの ページを ひらいている（うしろでは 見えない）・うごきを へらす 設定 の ときは できない */
  canGesture(id){
    const g = hasId(GESTURE, id) ? GESTURE[id] : null;
    if (!g || !S || this.busy || this.gest) return false;
    if (g.sp && g.sp !== 'both' && g.sp !== (S.pet.species === 'cat' ? 'cat' : 'dog')) return false;
    if (this.sleeping && !g.calm) return false;
    if (g.poses && g.poses.indexOf(this.pose) < 0) return false;
    if (PuzzleUI.page || document.documentElement.classList.contains('run-open')) return false;
    if (calmMotion()) return false;
    return true;
  },
  /* しぐさを 1つ。おわったら true（しなかった・とちゅうで とめたら false）の Promise */
  gesture(id){
    if (!this.canGesture(id)) return Promise.resolve(false);
    const cls = 'g-' + id, tok = ++this.gtok;
    this.gest = id;
    void this.el.offsetWidth;   /* とめた すぐ あとに 同じ しぐさでも はじめから */
    this.el.classList.add(cls);
    return sleep(GESTURE[id].ms).then(() => {
      if (tok !== this.gtok) return false;
      this.el.classList.remove(cls); this.gest = null;
      return true;
    });
  },
  /* いまの しぐさを すぐ やめる（おせわ・げい・タップの 前） */
  stopGesture(){
    if (!this.gest) return;
    this.el.classList.remove('g-' + this.gest);
    this.gest = null; this.gtok++;
  },
  /* なでている あいだ、目（±4px）と 頭（±5px・±4°）を 指の ほうへ（x は 画面の x。null で もどす）。すわっていて、ねていない・おせわの とちゅうで ない とき */
  lean(x){
    let head = '', eye = '';
    if (x != null && !this.sleeping && !this.busy && this.pose === 'sit'){
      const r = this.el.getBoundingClientRect();
      const k = r.width ? clamp((x - (r.left + r.width / 2)) / (r.width * .5), -1, 1) : 0;
      head = `translate(${(k * 5).toFixed(1)}px,0) rotate(${(k * 4).toFixed(1)}deg)`;
      eye = `translateX(${(k * 4).toFixed(1)}px)`;
    }
    this.el.querySelectorAll('.pv-head-g,.pv-neck-g').forEach(n => { n.style.transform = head; });
    this.el.querySelectorAll('.pv-eye').forEach(n => { n.style.transform = eye; });
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
    b.textContent = text; b.style.removeProperty('--bx'); b.style.removeProperty('--bt'); b.classList.add('show');
    /* ふきだしは 頭の 上（よこむきは 頭が 前に ある）。おへやの はしで 切れないように、ふきだしだけ 内がわへ ずらす
       （しっぽ〈--bt〉は 頭を さしたまま。うちのこは --s で 大きさが かわる） */
    try {
      const sc = Number(getComputedStyle(this.el).getPropertyValue('--s')) || 1;
      const pr = this.el.getBoundingClientRect(), sr = stage.getBoundingClientRect();
      const half = b.offsetWidth * sc / 2, cx = pr.left + pr.width * this.poseX(), pad = 6;
      const dx = cx - half < sr.left + pad ? sr.left + pad - (cx - half) : cx + half > sr.right - pad ? sr.right - pad - (cx + half) : 0;
      const base = cx - (pr.left + pr.width / 2);
      if (dx || base){ b.style.setProperty('--bx', ((base + dx) / sc).toFixed(1) + 'px'); b.style.setProperty('--bt', (dx / sc).toFixed(1) + 'px'); }
    } catch(e){}
    clearTimeout(this.sayT); this.sayT = setTimeout(() => b.classList.remove('show'), ms);
  },
  /* あるく（2026-11-27 だんかい 2）：よこむきに なって 行く ほうを むき（くるっ）、4本足で あるく（奥へは うしろすがた＝だんかい 4）。着いたら end の 体勢
     （end なし：おせわの とちゅうは すわる＝正面で たべる・げい、ひまな ときは たつ）。かかる 時間は 前と 同じ（くるっは あるきながら）。
     ちいさな うごき（2.5 より 近い）は むきを かえない（end が あれば その 体勢に） */
  moveTo(x, y, speed = 1, end){
    const d = Math.hypot(x - this.x, (y - this.y) * 1.6);
    const ms = Math.max(260, d * 36 / speed);
    const tok = ++this.tok;
    const walk = d >= 2.5;
    this.el.style.transition = `left ${ms}ms linear, top ${ms}ms linear, transform ${ms}ms linear`;
    if (walk){
      this.stopGesture(); this.lean(null); this.rub = null;
      const step = clamp(.56 / Math.sqrt(speed), .3, .75);
      this.el.style.setProperty('--step', step.toFixed(2) + 's');
      this.el.style.setProperty('--half', (step / 2).toFixed(2) + 's');
      this.el.style.setProperty('--lag', (-step / 2).toFixed(2) + 's');
      /* 奥（かべの ほう）へ むかう ときは うしろすがたで あるく（上へ うごく ぶんが よこより 大きい とき。だんかい 4）。むきは おぼえる だけ */
      if ((this.y - y) * 1.6 > Math.abs(x - this.x)){ this.dir = x < this.x ? 'l' : 'r'; this.setPose('bwalk', true); }
      else { this.face(x < this.x, true); this.setPose('walk', true); }
    }
    this.x = x; this.y = y; this.apply();
    return sleep(ms).then(() => {
      if (tok !== this.tok) return;
      if (end || walk) this.setPose(end || (this.busy ? 'sit' : 'stand'), true);
    });
  },
  jump(){ this.el.classList.remove('jump'); void this.el.offsetWidth; this.el.classList.add('jump'); setTimeout(() => this.el.classList.remove('jump'), 520); },
  /* クラスを ms だけ（おせわ・げいの とちゅうの 動き。Pet.gesture と ちがって busy でも する） */
  cls(c, ms){
    this.el.classList.remove(c); void this.el.offsetWidth; this.el.classList.add(c);
    const k = 'clsT_' + c;
    clearTimeout(this[k]); this[k] = setTimeout(() => this.el.classList.remove(c), ms);
  },
  /* くるっと 1回転（げい「くるっとターン」・きせかえを 見せる。だんかい 3）：正面 → よこ → 反対の よこ → 正面。からだは 小さく はねる（tr-spin2）。
     1秒。とちゅうで ほかの むき・体勢に なったら やめる */
  spin(){
    this.stopGesture(); this.lean(null); this.rub = null;
    if (this.pose !== 'sit') this.setPose('sit');
    this.cls('tr-spin2', 1000);
    if (calmMotion()) return sleep(1000);
    const tok = ++this.stok, pt = this.ptok, live = () => tok === this.stok && pt === this.ptok;
    this.dir = 'r'; this.setView('side', true);
    return sleep(330).then(() => { if (live()) this.face(true, true); return sleep(330); })
      .then(() => { if (live()) this.setView('front', true); return sleep(340); })
      .then(() => { if (live()){ this.dir = 'r'; this.applyView(); } });
  },
  tilt(){ this.el.classList.remove('tilt'); void this.el.offsetWidth; this.el.classList.add('tilt'); setTimeout(() => this.el.classList.remove('tilt'), 1000); },
  wag(ms = 1500){ this.el.classList.add('wag-fast'); clearTimeout(this.wagT); this.wagT = setTimeout(() => this.el.classList.remove('wag-fast'), ms); },
  zz:null,
  sleep(){
    this.sleeping = true; this.rub = null;
    this.setPose('sleep', true);
    this.setExpr(null);
    clearInterval(this.zz);
    this.zz = setInterval(() => { const h = this.headPoint(); fx('z', h.x + 20, h.y - 10, 'z'); }, 1700);
  },
  wake(stay = 25000){
    this.wakeUntil = now() + stay;
    if (!this.sleeping) return false;
    this.sleeping = false;
    clearInterval(this.zz);
    this.setPose('sit');
    this.setExpr(null);
    return true;
  },
};

/* ----- idle life ----- */
let idleT = null, lastChat = 0, dragging = false, idleLast = [];
function idleTick(delay){
  clearTimeout(idleT);
  idleT = setTimeout(idleStep, delay != null ? delay : 3200 + Math.random() * 5200);
}
/* ひまな ときの 行動（docs/MOTION_DESIGN.md 4-6・12章。2026-11-26 だんかい 1、2026-11-27 だんかい 2）：重みの 表。w(c) が 0 なら えらばない、さっきの 2つも えらばない。
   g は しぐさ（Pet.canGesture で できる ときだけ）。c：tod（morning・day・evening・night）・full・mood・ate／played（たべた・あそんだ あと 1分）・chat（ひとことを いえる）・
   pose（いまの 体勢）・cat。見た目だけ（Math.random で よい。ルール・セーブに さわらない）。
   うごく 多さは「おちつき」（2026-11-26 オーナー）：あるく（行き先も）・しぐさ は それぞれ 3回に 1回 くらい。体勢が かわるのは 15〜20秒に 1回 くらい。
   行き先：ベッドで ふせる、ごはん皿の 前で すわる、まどの 下で たつ、ラグの まんなかで ごろん（ねこは 多め）、ゆかの においを かぐ */
const SIT_POSES = ['sit','stand'];
const IDLE = [
  { id:'walk',  w:() => 20, run:() => Pet.moveTo(22 + Math.random() * 56, 70 + Math.random() * 18, .7 + Math.random() * .4, Math.random() < .5 ? 'sit' : 'stand') },
  { id:'sit',   w:c => c.pose === 'stand' ? 24 : c.pose === 'sit' ? 0 : POSE[c.pose] && POSE[c.pose].back ? 14 : 30, run:() => Pet.setPose('sit', true) },
  { id:'tilt',  w:c => ['sit','stand','down','bsit','bup'].indexOf(c.pose) >= 0 ? 8 : 0, run:() => Pet.tilt() },
  { id:'hop',   w:c => c.mood > 60 && SIT_POSES.indexOf(c.pose) >= 0 ? 6 : 0, run:() => { Pet.jump(); Pet.flash('happy', 1000); Pet.wag(1200); } },
  { id:'chat',  w:c => c.chat ? 14 : 0, run:() => { lastChat = now(); Pet.say(ambientLine()); } },
  /* おなかが すいたら ごはん皿の 前へ 行って すわって まわりを 見る */
  { id:'bowl',  w:c => c.full < 25 && Math.hypot(Pet.x - BOWL.x - 12, Pet.y - BOWL.y + 4) > 6 ? 14 : 0,
    run:async () => { await Pet.moveTo(BOWL.x + 12, BOWL.y - 4, .8, 'sit'); if (!Pet.busy) await Pet.gesture('look'); } },
  /* ベッドで ふせる（夕方・夜・おなか いっぱいは 多め） */
  { id:'bed',   w:c => c.pose === 'down' ? 0 : (c.tod === 'evening' || c.tod === 'night' || c.full > 85) ? 8 : 4,
    run:() => Pet.moveTo(BED.x, BED.y - 1, .8, 'down') },
  /* その場で ふせる・おねだり（すわっている とき） */
  { id:'lie',   w:c => c.pose === 'sit' ? 3 : 0, run:() => Pet.setPose('down', true) },
  { id:'beg',   w:c => c.pose === 'sit' ? 3 : 0, run:() => Pet.poseFor('beg', 2400) },
  /* まどの 下で 外を 見る（だんかい 4）：うしろを むいて すわり、見あげて 耳ぴく・きょろきょろ。ときどき ふりかえって「なあに？」 */
  { id:'win',   w:c => c.tod === 'night' ? 2 : 5, run:async () => {
      const at = p => !Pet.busy && !Pet.sleeping && Pet.pose === p;
      await Pet.moveTo(WIN.x, WIN.y, .8, 'bsit');
      if (!at('bsit')) return; await sleep(600);
      if (!at('bsit')) return; Pet.setPose('bup');
      await sleep(500); if (!at('bup')) return; await Pet.gesture('ear');
      await sleep(400); if (!at('bup')) return; await Pet.gesture('look');
      if (at('bup') && Math.random() < .5) await lookBack('なあに？');
    } },
  /* ラグの まんなかで ごろん（おなかを 見せる） */
  { id:'rug',   w:c => c.pose === 'side' ? 0 : c.cat ? 5 : 2, run:() => Pet.moveTo(50, 84, .8, 'side') },
  /* ゆかの においを かぐ（よこむきで 鼻を 床へ） */
  { id:'sniffwalk', w:() => 5, run:async () => { await Pet.moveTo(28 + Math.random() * 44, 74 + Math.random() * 14, .7, 'stand'); if (!Pet.busy) await Pet.gesture('sniff'); } },
  { g:'sniff',   w:() => 8 },
  { g:'stretch', w:() => 5 },
  { g:'ear',     w:() => 8 },
  { g:'look',    w:() => 7 },
  { g:'yawn',    w:c => c.tod === 'morning' || c.tod === 'night' ? 10 : 3 },
  { g:'scratch', w:() => 5 },
  { g:'shake',   w:() => 4 },
  { g:'groom',   w:() => 9 },
  { g:'sway',    w:() => 7 },
  { g:'tailup',  w:c => c.mood > 50 ? 4 : 2 },
  { g:'pant',    w:c => c.played ? 30 : 0 },
  { g:'lick',    w:c => c.ate ? 30 : 0 },
  /* 季節（だんかい 3。もようがえの 季節の かざりつけが「あり」の とき）：雪・花びらの 日は 上を 見あげて ぴょん（つかまえる）、
     つゆの 雨の 日は まどの 下で ふせて 外を 気に する */
  /* だんかい 4：雪・花びら・おちば（もみじがり）は まどの 下へ 行って うしろを むいて 見あげて ぴょん、雨は うしろを むいて ふせて ながめる（雪・雨は まどの 中に ふる） */
  { id:'catch', w:c => (c.weather === 'snow' || c.weather === 'petals' || c.weather === 'leaves') && !calmMotion() ? 8 : 0,
    run:async () => {
      const at = p => !Pet.busy && !Pet.sleeping && Pet.pose === p;
      await Pet.moveTo(WIN.x, WIN.y, .9, 'bsit');
      if (!at('bsit')) return; await sleep(400);
      if (!at('bsit')) return; Pet.setPose('bup'); await sleep(900);
      if (!at('bup')) return;
      Pet.jump(); Pet.wag(1600);
      if (now() - lastChat > 30000){ lastChat = now(); const w = weatherOf(); Pet.say(w === 'petals' ? 'はなびらだ！' : w === 'leaves' ? 'はっぱだ！' : 'ゆきだ！', 1600); }
      await sleep(700); if (at('bup')) Pet.jump();
    } },
  { id:'rainwin', w:c => c.weather === 'rain' && c.pose !== 'bdown' ? 7 : 0,
    run:async () => {
      const at = () => !Pet.busy && !Pet.sleeping && Pet.pose === 'bdown';
      await Pet.moveTo(WIN.x + 2, WIN.y + 2, .8, 'bdown');
      if (at()) await Pet.gesture('ear');
      if (at()) await Pet.gesture('look');
      if (at() && now() - lastChat > 30000){ lastChat = now(); Pet.say('あめ、やまないね', 1800); }
    } },
];
/* あるいて どこかへ 行く 行動。うごきを へらす 設定では 重みを 1/4 に（しぐさが とまる ぶん あるくのが 目立ち、
   transition も ほぼ 0秒なので ぱっと うつる。診断 C5-2） */
const IDLE_WALKS = ['walk','bowl','bed','win','rug','sniffwalk','rainwin'];
function idlePick(){
  const t = now();
  const c = { tod:stage.dataset.tod, full:S.stats.full, mood:S.stats.mood, chat:t - lastChat > 30000, ate:t - Pet.ateAt < 60000, played:t - Pet.playedAt < 60000,
              pose:Pet.pose, cat:S.pet.species === 'cat', weather:S.room && S.room.season ? weatherOf() : null };
  const list = IDLE.filter(a => idleLast.indexOf(a.g || a.id) < 0 && (!a.g || Pet.canGesture(a.g)));
  const calm = calmMotion();
  const ws = list.map(a => Math.max(0, a.w(c) || 0) * (calm && IDLE_WALKS.indexOf(a.id) >= 0 ? .25 : 1));
  let r = Math.random() * ws.reduce((x, y) => x + y, 0);
  for (let i = 0; i < list.length; i++){ if (ws[i] > 0 && (r -= ws[i]) < 0) return list[i]; }
  return null;
}
async function idleStep(){
  if (!S || Pet.busy || dragging || document.hidden || Pet.rub) return idleTick();
  /* パズル・ランの ページの うしろでは なにも しない（見えない。電池の ため） */
  if (PuzzleUI.page || document.documentElement.classList.contains('run-open')) return idleTick();
  const night = stage.dataset.tod === 'night';
  if (Pet.sleeping){
    if (!night && Math.random() < .35){ Pet.wake(); Pet.say(pick(['ふぁ〜あ','よくねた〜'])); }
    else if (Math.random() < .3) Pet.gesture(S.pet.species === 'cat' && Math.random() < .5 ? 'sway' : 'ear');   /* ねたまま 耳ぴく・しっぽ ゆらり */
    return idleTick();
  }
  if (now() > Pet.wakeUntil && (night ? Math.random() < .55 : Math.random() < .05)){
    /* ベッドへ 行って ふせて から ねる（あごを 前あしに のせる） */
    await Pet.moveTo(BED.x, BED.y - 1, .8, 'down');
    if (!Pet.busy && Pet.pose === 'down') await sleep(900);
    if (!Pet.busy && Pet.pose === 'down') Pet.sleep();
    return idleTick(night ? 20000 : 14000 + Math.random() * 10000);
  }
  const a = idlePick();
  if (a){
    idleLast = [a.g || a.id].concat(idleLast).slice(0, 2);
    await (a.g ? Pet.gesture(a.g) : a.run());
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
function renderHeader(){
  $('#petName').textContent = S.pet.name;
  $('#petBreed').textContent = breedLabel(S.pet);
  /* むかえた日だけ、右上の ボタンに 名前を出す */
  $('.top').classList.toggle('newday', !!S.created && dayKey(S.created) === dayKey());
  const f = $('#frame');
  if (S.pet.photo){ $('#frameImg').src = S.pet.photo; f.hidden = false; } else f.hidden = true;
}
function lockDock(on){ document.querySelectorAll('.act').forEach(b => b.setAttribute('aria-disabled', on ? 'true' : 'false')); }

/* ----- care actions -----
   Each action asks the rules (Act.run) as soon as it starts: here on this device, or on the LINE server.
   The pet's movements play meanwhile; what happened (level up, requests, …) is shown when the movement ends. */
function commit(){ Persist.schedule(); renderStats(); }
const Act = {
  remote:null,   /* js_line.js: (type, params) => Promise<result>, while this child lives on the LINE server */
  gate:null,     /* js_line.js: settles once it is known whether the LINE server is used */
  lock:null,     /* js_line.js: () => a reason, while this child can only change through the server and it is not reached */
  onWait:null,   /* js_line.js: shows that reason */
  budget:{ left:STROKE_MAX, t:now() },   /* なでなで on this device (the LINE server keeps its own) */
  opening:null,
  blocked(){ return this.lock ? this.lock() : null; },
  /* true (and a notice) when nothing can change right now */
  waiting(quiet){
    const why = this.blocked();
    if (!why) return false;
    if (this.onWait) this.onWait(why, quiet);
    return true;
  },
  run(type, p, ctx){
    if (this.remote) return this.remote(type, p || {});
    return Promise.resolve(Rules.act(S, type, p, Object.assign({ budget:this.budget }, ctx)));
  },
  /* opening or coming back: milestones, the season's event, a souvenir, the streak notices */
  open(away){
    if (this.opening) return this.opening;
    const job = (async () => {
      await null;                       /* js_line.js comes later in the same script and may set the gate */
      if (this.gate) await this.gate;
      if (!S || this.blocked()) return;
      const r = await this.run('open', {}, { away });
      if (!r || !r.ok) return;
      playEvents(r.ev);
      commit();
    })();
    this.opening = job.finally(() => { this.opening = null; });
    return this.opening;
  },
};
/* the pet says why an action could not happen */
function careRefused(r){
  const cat = S && S.pet.species === 'cat';
  switch (r && r.why){
    case 'offline': Act.waiting(); break;
    case 'limit': toast('おやつは 少し 時間を あけてね'); break;
    case 'full': Pet.wake(); Pet.tilt(); Pet.say(cat ? 'おなかいっぱいにゃ…' : 'おなかいっぱい！'); break;
    case 'hungry': Pet.wake(); Pet.flash('sad', 2000); Pet.say('おなかがすいて できないよ…'); break;
    case 'locked': toast('まだ えらべないよ'); break;
    /* LINE版：前の おせわから 2.5秒 たたないうちに サーバーへ 届いた（動きだけ出て なにも ふえない。診断 3-9） */
    case 'busy': toast('いまのは かぞえられなかったよ。\nすこし まってね'); break;
  }
}
/* what the rules said happened, as popups and words (the same order and timing as always) */
function playEvents(ev){
  for (const e of ev || []){
    switch (e.k){
      case 'lv': setTimeout(() => celebrate(e.lv, e.before), 900); break;
      case 'req':
        toast('おねがいを かなえた！ ♥+4');
        setTimeout(() => { if (!Pet.sleeping){ Pet.say('ありがとう！ うれしい！'); Pet.wag(1500); } hearts(3); }, 300);
        break;
      case 'all': allDoneModal(e); break;
      case 'rescue':
        if (e.bridged) rescueModal();
        else {
          toast('おたすけのおねがいを かなえた！ ♥+5');
          setTimeout(() => { if (!Pet.sleeping) Pet.say('あとは きょうのおねがいを ぜんぶ かなえよう！', 2600); }, 300);
        }
        break;
      case 'days': toast(`${S.pet.name}が うちにきて ${e.n}日！`); break;
      case 'anniv': annivModal(e); break;
      case 'event': eventModal(e); break;
      case 'souv': souvenirModal(e); break;
      case 'broke': brokeModal(e); break;
      case 'pinch': pinchModal(e); break;
    }
  }
  renderReqBadge();
}
function begin(){
  if (!S || Pet.busy) return false;
  decay();
  Pet.busy = true; lockDock(true); clearTimeout(idleT);
  Pet.stopGesture(); Pet.lean(null); Pet.rub = null;   /* しぐさは すぐ やめる（おせわの 長さは かえない） */
  if (Pet.wake()) Pet.say('ふぁ…？', 1200);
  else if (Pet.pose !== 'sit') Pet.setPose('sit', true);   /* おせわの 前に すわる（またない。2026-11-27 だんかい 2） */
  return true;
}
function finish(){
  Pet.busy = false; lockDock(false);
  commit();
  idleTick(4000);
}

async function feed(){
  if (Pet.busy || !S || Act.waiting()) return;
  decay();
  if (S.stats.full >= 92){
    Pet.wake(); Pet.tilt();
    Pet.say(S.pet.species === 'cat' ? 'もう入らないにゃ…' : 'おなかいっぱい！');
    return;
  }
  begin();
  const job = Act.run('feed');
  $('#bowl').classList.add('filled');
  await sleep(300);
  Pet.say(S.pet.species === 'cat' ? 'ごはんだ！' : 'ごはん！ごはん！', 1400);
  Pet.wag(4000);
  /* お皿の 前で おねだり（前あしを ふって まつ）してから すわって たべる（だんかい 3。おねだりは 1.2秒＝オーナー「もう少し 長く」。
     たべる 長さ・かけらの 数は 前と 同じ） */
  await Pet.moveTo(BOWL.x, BOWL.y - 3.5, 1.3, 'beg');
  await sleep(1200);
  Pet.setPose('sit', true);
  Pet.setExpr('eat');
  const crumbs = setInterval(() => { const m = Pet.mouthPoint(); fx('crumb', m.x + (Math.random() * 30 - 15), m.y + 26, '', { '--dx': (Math.random() * 30 - 15).toFixed(0) + 'px' }); }, 260);
  await sleep(2700);
  clearInterval(crumbs);
  $('#bowl').classList.remove('filled');
  const r = await job;
  if (!r.ok){ Pet.setExpr(null); careRefused(r); finish(); return; }
  playEvents(r.ev);
  Pet.ateAt = now();   /* このあと しばらく ひまな ときに ぺろり */
  Pet.setExpr('happy'); Pet.say('ごちそうさま！'); hearts(3);
  await sleep(1500);
  Pet.setExpr(null);
  finish();
}

async function giveTreat(t){
  closeSheet();
  if (Pet.busy || !S || Act.waiting()) return;
  const why = Rules.treatCheck(S, t.id);
  if (why){ careRefused({ why }); return; }
  begin();
  const job = Act.run('treat', { id:t.id });
  await Pet.moveTo(50, 82, 1.2);
  const h = Pet.headPoint();
  const pop = document.createElement('div');
  pop.className = 'treatpop';
  pop.innerHTML = `<svg viewBox="0 0 48 48">${treatIcon(t)}</svg>`;
  pop.style.left = h.x + 'px'; pop.style.top = (h.y - stage.clientHeight * .22) + 'px';
  stage.appendChild(pop);
  /* おやつを 見あげて おねだり → さいごに ぴょんと とる（だんかい 3。前は 2回 はねた。長さは 同じ） */
  Pet.setExpr('happy'); Pet.wag(4000);
  Pet.setPose('beg', true);
  await sleep(1150);
  Pet.setPose('sit', true); Pet.jump();
  await sleep(600);
  const m = Pet.mouthPoint();
  pop.style.top = m.y + 'px'; pop.style.left = m.x + 'px';
  await sleep(450);
  pop.style.opacity = '0';
  setTimeout(() => pop.remove(), 350);
  Pet.setExpr('eat');
  await sleep(1300);
  const r = await job;
  if (!r.ok){ Pet.setExpr(null); careRefused(r); finish(); return; }
  playEvents(r.ev);
  Pet.ateAt = now();
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
/* あそぶ：ボール（猫は 毛糸玉）か パズル「おやつならべ」を えらぶ（2026-11-15 オーナー決定）。パズルの あそびかたは ここと、パズルの 画面の「？」に */
function openPlay(){
  if (Pet.busy || !S) return;
  const cat = S.pet.species === 'cat', left = Rules.puzzleLeft(S), best = S.puzzle && S.puzzle.best;
  const toy = document.querySelector('#actPlay svg');
  const html = `<div class="tiles playpick">
      <button class="tile" type="button" data-play="ball">${toy ? toy.outerHTML : ''}<span class="tname">${cat ? '毛糸玉' : 'ボール'}</span><span class="gain"><b>♥+3</b> ごきげん+12</span></button>
      <button class="tile" type="button" data-play="puzzle"><svg viewBox="0 0 24 24" aria-hidden="true">${MINI.puzzle}</svg><span class="tname">パズル<small>おやつならべ</small></span><span class="gain">${left ? `ほうび あと${left}回` : 'ほうびは<br>また あした'}</span></button>
    </div>
    <p class="note">パズルは、となりの おやつと 入れかえて 3つ そろえる あそび。${PUZZLE.moves}手で ${PUZZLE.goal}こ けしたら クリア！${best ? `<br>いままでの さいこうは ${Math.floor(best)}点` : ''}</p>`;
  openSheet('なにで あそぶ？', html, sh => {
    sh.querySelector('[data-play="ball"]').addEventListener('click', () => { closeSheet(); play(); });
    sh.querySelector('[data-play="puzzle"]').addEventListener('click', () => PuzzleUI.open());
  });
}
async function play(){
  if (Pet.busy || !S || Act.waiting()) return;
  decay();
  if (S.stats.full < 12){ Pet.wake(); Pet.flash('sad', 2200); Pet.say('おなかがすいて動けない…'); return; }
  begin();
  const job = Act.run('play');
  const toy = document.createElement('div');
  toy.className = 'toy';
  toy.innerHTML = TOY[S.pet.species] || TOY.dog;
  toy.style.left = Pet.x + '%'; toy.style.top = '96%'; toy.style.zIndex = '150';
  stage.appendChild(toy);
  Pet.setExpr('happy'); Pet.wag(9000);
  /* はじめに「あそぼ！」の ポーズ（前足を のばして おしりを 上げる。1つめの ボールの ほうを むく）。おいかけて 着いたら よこむきの まま
     前足で とびつく（前は 着く たびに 正面で すわって はねた）。さいごに すわる（だんかい 3。0.6秒 ながく なる。乱数を つかう 順と 数は 前と 同じ） */
  const aim = () => {
    let tx = 18 + Math.random() * 64;
    if (Math.abs(tx - Pet.x) < 18) tx = Pet.x > 50 ? tx - 28 : tx + 28;
    return [clamp(tx, 16, 84), 72 + Math.random() * 18];
  };
  let next = aim();
  Pet.face(next[0] < Pet.x, false); Pet.setPose('bow', true);
  Pet.say('あそぼ！', 1100);
  await sleep(600);
  for (let i = 0; i < 3; i++){
    const [tx, ty] = i ? aim() : next;
    toy.style.transition = 'left .8s cubic-bezier(.3,.7,.4,1), top .8s cubic-bezier(.3,.7,.4,1)';
    await sleep(30);
    toy.style.left = tx + '%'; toy.style.top = (ty + 1) + '%';
    toy.style.zIndex = String(11 + Math.round(ty));
    await sleep(220);
    await Pet.moveTo(tx, ty, 2.2, 'stand');
    Pet.cls('g-pounce', 420);
    hearts(1);
    await sleep(420);
  }
  Pet.setPose('sit', true);
  toy.style.transition = 'opacity .3s'; toy.style.opacity = '0';
  setTimeout(() => toy.remove(), 350);
  const r = await job;
  if (!r.ok){ Pet.setExpr(null); careRefused(r); finish(); return; }
  playEvents(r.ev);
  Pet.playedAt = now();   /* このあと しばらく ひまな ときに はぁはぁ（いぬ） */
  Pet.say(pick(S.pet.species === 'cat' ? ['たのしかった！','もっかい！','ふんふん♪'] : ['たのしかった！','もっとあそぼ！','わんわん♪']));
  await sleep(1400);
  Pet.setExpr(null);
  finish();
}

/* ----- stroking & tapping ----- */
let drag = null, strokeT = null, strokeN = 0;
function onStroke(e){
  if (!S) return;
  const p = stageXY(e.clientX, e.clientY);
  heartAt(p.x, p.y - 10);
  $('#hint').hidden = true;
  if (Act.waiting(true)) return;   /* hearts only: nothing changes until the LINE server is reached */
  if (Act.remote){
    /* the gauge moves now; the server counts the strokes when the hand stops */
    decay();
    S.stats.mood = clamp(S.stats.mood + 1.5, 0, 100);
    strokeN++;
  } else {
    decay();
    playEvents(Rules.act(S, 'pet', { n:1, end:false }, { budget:Act.budget }).ev);
  }
  if (!Pet.sleeping && !Pet.busy){ Pet.setExpr('happy'); Pet.wag(1600); }
  rubbed();
  renderStats();
  clearTimeout(strokeT);
  strokeT = setTimeout(() => {
    if (!Pet.busy && !Pet.sleeping){
      Pet.setExpr(null);
      Pet.say(pick(S.pet.species === 'cat' ? ['ゴロゴロ…','きもちいい〜','もっとなでて'] : ['うれしい！','きもちいい〜','もっとなでて！']));
    }
    if (Act.remote){
      const n = strokeN; strokeN = 0;
      if (n) Act.run('pet', { n }).then(r => { if (r.ok) playEvents(r.ev); else careRefused(r); renderStats(); });
    } else Rules.strokeEnd(S);
    commit();
  }, 700);
}
/* たくさん なでたら（1回の なでなでで 8回）：ねこは ごろん（おなかを 見せる）、いぬは ふせて しっぽ ぶんぶん。なでている あいだは そのまま、
   手を とめて 3秒で すわる。回数は 見た目の ためだけ（セーブしない）。おせわ・タップ・あるく と ねている ときは しない（4-5。2026-11-27 だんかい 2） */
let rubN = 0, rubT = null, rubEndT = null;
function rubbed(){
  if (!S || Pet.busy || Pet.sleeping){ rubN = 0; return; }
  clearTimeout(rubT); rubT = setTimeout(() => { rubN = 0; }, 1500);
  if (!Pet.rub){
    if (++rubN < 8) return;
    rubN = 0;
    Pet.stopGesture(); Pet.lean(null);
    Pet.rub = S.pet.species === 'cat' ? 'side' : 'down';
    Pet.setPose(Pet.rub, true);
  }
  if (Pet.rub === 'down') Pet.wag(3600);
  clearTimeout(rubEndT);
  rubEndT = setTimeout(() => {
    const p = Pet.rub; Pet.rub = null;
    if (p && Pet.pose === p && !Pet.busy && !Pet.sleeping) Pet.setPose('sit', true);
    idleTick(4000);
  }, 3000);
}
/* うしろすがたの とき ふりかえる（だんかい 4）：くるっと 正面で すわって へんじ、すこし して もとの うしろの 体勢へ（とちゅうで ほかの 体勢に なったら もどらない） */
async function lookBack(text){
  const back = Pet.pose;
  Pet.setPose('sit', true);
  const pt = Pet.ptok;
  await sleep(170);
  if (pt !== Pet.ptok || Pet.busy) return;
  Pet.tilt(); Pet.wag(1200); Pet.say(text, 1500);
  await sleep(1700);
  if (pt === Pet.ptok && !Pet.busy && !Pet.sleeping && !Pet.rub) Pet.setPose(back, true);
}
function onTap(){
  if (!S) return;
  if (Pet.sleeping){
    Pet.wake(); Pet.say('ふぁ〜あ…おはよう'); Pet.tilt();
    idleTick(5000);
    return;
  }
  if (Pet.busy) return;
  /* へんじ（4-5。2026-11-26 だんかい 1、2026-11-27 だんかい 2）：はねて かしげる・はねて 耳ぴく・しっぽ ぴんで かしげる・おねだり を まぜる
     （同じ へんじは つづけない）。すわって いなければ まず すわる（くるっ）。おねだりは すわっていた ときだけ */
  Pet.stopGesture(); Pet.rub = null;
  const sat = Pet.pose === 'sit';
  /* うしろを むいて すわる・見あげる・ふせる ときは ふりかえって へんじ、すこし して また 外を 見る（だんかい 4） */
  const backWas = ['bsit','bup','bdown'].indexOf(Pet.pose) >= 0 ? Pet.pose : null;
  if (!sat) Pet.setPose('sit', true);
  const r = pick(TAP_REPLY.filter(x => x !== tapLast && (sat || x !== 'beg')));
  tapLast = r;
  if (r === 'ear'){ Pet.jump(); Pet.gesture('ear'); Pet.wag(1200); }
  else if (r === 'tailup'){ Pet.gesture('tailup'); Pet.tilt(); }
  else if (r === 'beg'){ Pet.poseFor('beg', 1700); Pet.wag(1600); }
  else { Pet.jump(); Pet.tilt(); Pet.wag(1200); }
  Pet.say(pick(S.pet.species === 'cat' ? ['にゃ？','にゃーん','なあに？'] : ['ワン！','わふっ','なあに？']), 1600);
  if (backWas){
    const pt = Pet.ptok;
    setTimeout(() => { if (pt === Pet.ptok && !Pet.busy && !Pet.sleeping && !Pet.rub) Pet.setPose(backWas, true); }, 2200);
  }
  idleTick(4000);
}
const TAP_REPLY = ['hop', 'ear', 'tailup', 'beg'];
let tapLast = '';
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
  if (drag.dist >= 12) Pet.lean(e.clientX);   /* なでている あいだ 目と 頭が 指の ほうへ */
  if (drag.acc > 55){ drag.acc = 0; onStroke(e); }
});
let leanT = null;
const endDrag = () => {
  if (!drag) return;
  const tap = drag.dist < 12;
  drag = null; dragging = false;
  clearTimeout(leanT); leanT = setTimeout(() => { if (!drag) Pet.lean(null); }, 500);   /* 手を とめたら もどす */
  if (tap) onTap();
};
/* LINE の 中で うちのこを 下に こすると、はじめの 1回だけ ページごと 引っぱられた（ミニアプリの 最小化）。
   パズルの 盤と 同じに、さわった ところで ブラウザの 動きを とめる（なでる・タップは ポインターの イベントで うけとるので そのまま。P5-1） */
const petStill = e => { if (e.cancelable) e.preventDefault(); };
Pet.el.addEventListener('touchstart', petStill, { passive:false });
Pet.el.addEventListener('touchmove', petStill, { passive:false });
Pet.el.addEventListener('pointerup', endDrag);
Pet.el.addEventListener('pointercancel', () => { drag = null; dragging = false; Pet.lean(null); });
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
  (TRICKS[S.pet.species] || []).forEach(t => { if (t.lv > from && t.lv <= to && t.lv > 1) list.push('げい「' + t.ja + '」'); });
  return list;
}
function celebrate(lv, before){
  const items = unlocksBetween(before == null ? lv - 1 : before, lv);
  const newTitle = TITLES.some(([l]) => l === lv || (before != null && l > before && l <= lv));
  const nx = lv < MAX_LV ? nextReward(lv) : null;
  Modal.show({
    label:'なかよしレベルアップ', confetti:true,
    html:() => `<div class="mpet ${MPET.joy}">${renderPet(S.pet.look, { wear:petWear() })}</div>
    <h3>${lv >= MAX_LV ? 'なかよしMAX！' : 'なかよしLv ' + lv}</h3><p>${esc(S.pet.name)}と さらに なかよく なりました${newTitle ? `<br>あたらしい関係「${esc(titleFor(lv))}」` : ''}</p>
    ${items.length ? `<ul>${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}
    ${nx ? nextupHtml(nx) : ''}
    <button class="btn primary" type="button" data-close>やったね</button>`,
  });
}

/* ----- sheets ----- */
const ICON_X = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';
let sheetReturn = null;
/* きせかえを 見せる（だんかい 3）：きせかえの シートで 着がえて とじたら・イベントの「つけてみる」の あと、おへやで くるっと 1回転して
   「にあう？」（はずしたら「すっきり！」）と かしげる。dressShow は シートで 着がえた しるし（null＝着がえていない）。
   まんなか（OUTFIT_SPOT）から はなれて いたら、先に まんなかへ あるいて こっちを むいて すわってから まわる（2026-11-27 オーナーの 声） */
let dressShow = null;
const OUTFIT_SPOT = { x:50, y:82 };
async function showOutfit(wore){
  if (!S || Pet.busy || Pet.sleeping) return;
  clearTimeout(idleT);
  await sleep(250);   /* シート・ポップアップが しまる あいだ */
  if (Pet.busy || Pet.sleeping) return;
  if (Math.hypot(OUTFIT_SPOT.x - Pet.x, (OUTFIT_SPOT.y - Pet.y) * 1.6) >= 6){
    clearTimeout(idleT);
    const go = Pet.moveTo(OUTFIT_SPOT.x, OUTFIT_SPOT.y, 1.2, 'sit'), tok = Pet.tok;
    await go;
    if (tok !== Pet.tok || Pet.busy || Pet.sleeping) return;
    await sleep(550);   /* 正面に くるっと なって ひと息 */
    if (tok !== Pet.tok || Pet.busy || Pet.sleeping) return;
    clearTimeout(idleT);
  }
  Pet.setExpr('happy');
  await Pet.spin();
  if (Pet.busy || Pet.sleeping) return;
  Pet.say(wore ? 'にあう？' : 'すっきり！'); Pet.tilt(); Pet.wag(1400);
  setTimeout(() => { if (!Pet.busy && Pet.expr === 'happy') Pet.setExpr(null); }, 1400);
  idleTick(4000);
}
function openSheet(title, html, after){
  sheetReturn = document.activeElement;
  dressShow = null;
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
  if (dressShow != null){ const w = dressShow; dressShow = null; showOutfit(w); }
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
  const html = `<p class="sheet-sub">${open} / ${base.length} しゅるい　レベルの 高い おやつほど、なかよし度が 大きく 上がります</p>
    <div class="tiles">${list.map(t => {
    const locked = lv < t.lv;
    return `<button class="tile treat" type="button" data-t="${t.id}" ${locked ? 'aria-disabled="true"' : ''}>
      <svg viewBox="0 0 48 48" aria-hidden="true">${treatIcon(t)}</svg><span class="tname">${softName(t.ja)}</span>
      ${locked ? `<span class="lockpill">Lv${t.lv}で解放</span>` : `<span class="gain"><b>♥+${t.love}</b> ごきげん+${t.mood}</span>`}${t.ev ? `<span class="evpill">${esc(t.evJa)}限定</span>` : ''}</button>`;
  }).join('')}</div><p class="note">おやつは 30分に 5回まで。ごはんの 代わりには なりません。</p>`;
  openSheet('どのおやつをあげる？', html, sh => {
    sh.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => {
      if (b.getAttribute('aria-disabled') === 'true') return;
      giveTreat(list.find(t => t.id === b.dataset.t));
    }));
  });
}

let dressSlot = 'head';
function wearOwned(w, lv){ return Rules.wearOwned(S, w, lv); }
function openDress(){
  if (!S) return;
  const lv = levelInfo(S.stats.love).lv;
  const tabs = () => `<div class="seg" role="tablist">${SLOTS.map(([k, ja]) => {
    const items = WEAR.filter(w => w.slot === k && (!w.ev || wearOwned(w, lv))), got = items.filter(w => wearOwned(w, lv)).length;
    return `<button type="button" role="tab" data-slot="${k}" aria-pressed="${k === dressSlot}">${ja}<small>${got}/${items.length}</small></button>`;
  }).join('')}<button type="button" role="tab" data-slot="room" aria-pressed="${dressSlot === 'room'}">おへや<small>もようがえ</small></button></div>`;
  const tiles = () => {
    if (dressSlot === 'room') return roomTabHtml();
    const items = [{ id:null, ja:'なし', lv:1 }].concat(WEAR.filter(w => w.slot === dressSlot && (!w.ev || wearOwned(w, lv))));
    const W = petWear();
    return `<div class="tiles">${items.map(it => {
      const locked = it.id && !wearOwned(it, lv);
      const trial = Object.assign({}, W, { [dressSlot]:it.id });
      return `<button class="tile" type="button" data-w="${it.id || ''}" aria-pressed="${(W[dressSlot] || null) === it.id}" ${locked ? 'aria-disabled="true"' : ''}>
        ${renderPet(S.pet.look, { wear:trial })}<span class="tname">${softName(it.ja)}</span>${locked ? `<span class="lockpill">Lv${it.lv}で解放</span>` : ''}${it.ev ? '<span class="evpill">季節の限定</span>' : ''}</button>`;
    }).join('')}</div><p class="note">あたま・かお・くびを 1つずつ 組み合わせられます。季節の イベントでは、限定の きせかえが もらえます。</p>`;
  };
  openSheet('きせかえ・もようがえ', `${tabs()}<div id="dressTiles">${tiles()}</div>`, sh => {
    const box = sh.querySelector('#dressTiles');
    const rerender = () => { box.innerHTML = tiles(); wire(); };
    const wire = () => {
      if (dressSlot === 'room') return wireRoomTab(box, rerender);
      box.querySelectorAll('[data-w]').forEach(b => b.addEventListener('click', async () => {
        if (b.getAttribute('aria-disabled') === 'true' || Act.waiting()) return;
        const r = await Act.run('dress', { slot:dressSlot, id:b.dataset.w || null });
        if (!r.ok){ careRefused(r); return; }
        playEvents(r.ev);
        rerender();
        Pet.mount();
        /* えらんだ タイルの 子が ぴょん。シートを とじたら おへやで くるっと 見せる（だんかい 3。前は シートの うしろで「にあう？」＝見えなかった） */
        const t = box.querySelector(`[data-w="${b.dataset.w || ''}"]`);
        if (t){ t.classList.add('hop'); setTimeout(() => t.classList.remove('hop'), 520); }
        dressShow = !!b.dataset.w;
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
      <div class="ph">${renderPet(p.look, { wear:petWear() })}${safePhoto(p.photo) ? `<img src="${esc(p.photo)}" alt="">` : ''}</div>
      <div style="min-width:0"><h3>${esc(p.name)}</h3><p>${esc(breedLabel(p))}</p><p>なかよしLv ${L.lv}${L.max ? '（MAX）' : ''}・${esc(titleFor(L.lv))}</p></div>
    </div>
    <div class="counts">
      <div><b>${c.meals}</b>ごはん</div><div><b>${c.treats}</b>おやつ</div><div><b>${c.pets}</b>なでなで</div><div><b>${c.plays}</b>あそび</div>
      <div><b>${(TRICKS[p.species] || []).filter(t => S.tricks[t.id] && S.tricks[t.id].ok).length}</b>げい</div><div><b>${SOUVENIRS.filter(x => S.souv.have[x.id]).length}</b>おみやげ</div><div><b>${S.stamps.length}</b>スタンプ</div><div><b>${Math.max(1, daysBetween(S.created || now(), now()) + 1)}</b>日</div>
    </div>
    ${(() => { const nx = nextReward(L.lv); return nx ? nextupHtml(nx) : '<p class="nextup">すべての ごほうびを 集めました</p>'; })()}
    <div class="btnstack" id="menuBtns">
      <button class="btn" type="button" id="mAlbum">おもいでアルバム</button>
      <button class="btn" type="button" id="mEdit">名前・みためを変える</button>
      <button class="btn" type="button" id="mMove">引っこし・バックアップ</button>
      <button class="btn warn" type="button" id="mNew">新しい子をむかえる</button>
    </div>
    <p class="note">${Persist.mode === 'cloud' ? 'あなたの アカウントに 保存しています。ほかの 端末で 開いても 同じ子に 会えます。' : HOME ? 'この端末に 保存しています。ときどき 引っこしコードを コピーしておくと、バックアップに なります。' : 'この ブラウザに 保存しています。'}</p>`;
  openSheet('プロフィール', html, sh => {
    sh.querySelector('#mEdit').addEventListener('click', () => { if (Act.waiting()) return; closeSheet(); Onboard.openEdit(); });
    sh.querySelector('#mMove').addEventListener('click', () => openMove());
    sh.querySelector('#mAlbum').addEventListener('click', () => openAlbum('diary'));
    sh.querySelector('#mNew').addEventListener('click', () => {
      if (Act.waiting()) return;
      const box = sh.querySelector('#menuBtns');
      box.innerHTML = `<div class="confirm"><p>新しい子を むかえると、${esc(p.name)}の なかよし度や 記録は 新しい子の ものに 置きかわります。</p>
        <div class="row"><button class="btn" type="button" id="mNo">やめる</button><button class="btn warn" type="button" id="mYes">むかえる</button></div></div>`;
      box.querySelector('#mNo').addEventListener('click', () => { closeSheet(); });
      box.querySelector('#mYes').addEventListener('click', () => { closeSheet(); Onboard.openNew(true); });
      box.querySelector('#mNo').focus();
    });
  });
}

/* ----- move code: carry a pet to another place ----- */
const MOVE_PREFIX = 'UCHINOKO2:';
const MOVE_MAX = 2e6; /* a real code is well under 1MB (the photo is capped at 400k) */
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
  if (raw.length > MOVE_MAX) return { reason:'big', got:raw.length };
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
  if (r.reason === 'empty') return 'コードが 空っぽです。コピーした コードを 貼りつけてから 押してね。';
  if (r.reason === 'noprefix') return `「UCHINOKO」で はじまる コードが 見つかりませんでした（貼りつけた 文字数：${n(r.got)}）。コピーが うまく いっていないかも しれません。「ファイルで保存」の 方法も ためしてみてね。`;
  if (r.reason === 'big') return `コードが 大きすぎて 読めませんでした（${n(r.got)}文字）。うちのこ日和の 引っこしコードか、たしかめてね。`;
  if (r.reason === 'short') return `コードが 途中で 切れています（${n(r.need)}文字のうち ${n(r.got)}文字）。もう一度 まるごと コピーするか、「ファイルで保存」の 方法を ためしてみてね。`;
  return `コードを 読みとれませんでした（${n(r.got)}文字）。もう一度 コピーし直してみてね。`;
}
function decodeMovePayload(b64){
  try {
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, ch => ch.charCodeAt(0));
    const o = JSON.parse(new TextDecoder().decode(bytes));
    if (!o || typeof o !== 'object' || !o.pet || !o.stats) return null;
    const num = (v, d, lo, hi) => { v = Number(v); return Number.isFinite(v) ? clamp(v, lo, hi) : d; };
    const p = o.pet, look = normalizeLook(p.look || p);
    const photo = safePhoto(p.photo, 400000);
    const wear = wearFrom(p);
    for (const k of ['head','face','neck']){ const v = wear[k]; if (hasId(WEAR_RENAMED, v)) wear[k] = WEAR_RENAMED[v]; else if (!hasId(WEAR_BY_ID, v)) wear[k] = null; }
    const c = o.counts || {};
    const t0 = now();
    const st = {
      v:1,
      pet:{ name:cleanText(p.name || 'うちのこ', 10) || 'うちのこ', species:look.species, breedId:look.breedId, look, photo,
            colorName:typeof p.colorName === 'string' ? cleanText(p.colorName, 14) : '', wear },
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
  const html = `<p class="sheet-sub">${esc(S.pet.name)}を、ほかの 場所（ホーム画面の アプリや 別の 端末）へ つれていけます。</p>
    <div class="card movecard"><h3>この子をつれていく</h3>
      <textarea class="codebox" id="mvOut" rows="4" ${CODE_ATTRS} aria-label="引っこしコード">${esc(code)}</textarea>
      <div class="btnrow"><button class="btn primary" type="button" id="mvCopy">コードをコピー</button><button class="btn" type="button" id="mvSave">ファイルで保存</button></div>
      <p class="note" id="mvMsg" role="status">コードは ${len}文字 あります。つれていく 先の「引っこしコードで受け取る」で、貼りつけるか、保存した ファイルを えらんでね。</p>
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
        ? `コピーしました（${len}文字）。つれていく 先で 貼りつけてね。`
        : 'コードを ぜんぶ 選びました。表示された メニューの「コピー」を 押してね。メニューが 出ないときは「ファイルで保存」が かんたんです。';
    });
    sh.querySelector('#mvSave').addEventListener('click', async () => {
      const r = await saveMoveFile(code);
      msg.textContent = r === 'saved' ? `「${MOVE_FILE}」を 保存しました。つれていく 先で「ファイルからえらぶ」で えらんでね。`
        : r === 'declined' ? '保存を とりやめました。' : 'ここでは ファイルの 保存が できませんでした。コードの コピーを ためしてね。';
    });
    const take = (text, pre) => {
      if (Act.waiting()) return;
      const r = pre || readMoveCode(text);
      const box = sh.querySelector('#mvInBox');
      sh.querySelectorAll('.mverr').forEach(e => e.remove());
      if (!r.st){ box.insertAdjacentHTML('beforebegin', `<p class="oberr mverr" role="alert" style="margin:0">${esc(moveErrorText(r))}</p>`); return; }
      const st = r.st;
      box.classList.remove('btnrow');
      box.innerHTML = `<div class="confirm"><p>いまの ${esc(S.pet.name)}は、コードの ${esc(st.pet.name)}（なかよしLv ${levelInfo(st.stats.love).lv}）に 置きかわります。</p>
        <div class="row"><button class="btn" type="button" id="mvNo">やめる</button><button class="btn warn" type="button" id="mvYes">受け取る</button></div></div>`;
      box.querySelector('#mvNo').addEventListener('click', () => closeSheet());
      box.querySelector('#mvYes').addEventListener('click', () => { S = st; closeSheet(); Persist.schedule(); Game.start('ただいま！'); });
    };
    sh.querySelector('#mvTake').addEventListener('click', () => take(sh.querySelector('#mvIn').value));
    sh.querySelector('#mvFile').addEventListener('change', async e => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      if (f.size > MOVE_MAX){ take('', { reason:'big', got:f.size }); return; }
      try { take(await readTextFile(f)); } catch(err){ take(''); }
    });
  });
}

/* ----- game lifecycle ----- */
const Game = {
  started:false,
  start(greet, away){
    Onboard.close();
    if (PuzzleUI.page) PuzzleUI.close();   /* 子が 入れかわった・読みなおした：パズルの 画面は とじる（たねが かわるため） */
    ensureState(S);
    decay();
    renderHeader();
    setPlayIcon();
    Pet.sleeping = false; clearInterval(Pet.zz); Pet.stopGesture(); Pet.rub = null; Pet.setPose('sit');
    /* あるいている とちゅうでも まんなかへ すぐ（moveTo の ゆっくりした left・top の transition を けす。のこると すわった まま すべる＝診断 C5-1） */
    Pet.tok++; Pet.el.style.transition = '';
    Pet.x = 50; Pet.y = 80; Pet.mount();
    renderStats();
    updateClock();
    Persist.restoredNotice();   /* before the other popups, so it is read first */
    if (!this.started){
      this.started = true;
      setInterval(() => { updateClock(); if (S){ decay(); renderStats(); Nudge.check(); } }, 30000);
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
    this.drawn = this.keys();
    if (S.counts.pets === 0) $('#hint').hidden = false;
    if (greet){ setTimeout(() => { Pet.jump(); Pet.wag(2000); Pet.say(greet); }, 500); }
    idleTick(2500);
  },
  onStateReplaced(){
    if (Onboard.busy) return;
    this.start('ただいま！');
  },
  /* the same child, newer numbers (a reply from the LINE server): redraw only what changed */
  keys(){
    return { hk:JSON.stringify([S.pet.name, S.pet.colorName, S.pet.breedId, S.pet.species, S.pet.photo]),
             wk:JSON.stringify([S.pet.look, petWear()]), rk:JSON.stringify(S.room) };
  },
  refresh(){
    if (!S || Onboard.busy || !this.started) return;
    ensureState(S);
    const k = this.keys(), o = this.drawn || {};
    if (k.hk !== o.hk){ renderHeader(); setPlayIcon(); }
    if (k.wk !== o.wk) Pet.mount();
    if (k.rk !== o.rk) applyRoom();
    this.drawn = k;
    renderStats();
    renderReqBadge();
  },
};

$('#actFeed').addEventListener('click', feed);
$('#actTreat').addEventListener('click', openTreats);
$('#actPlay').addEventListener('click', openPlay);
$('#actDress').addEventListener('click', openDress);
$('#actTrick').addEventListener('click', openTricks);
$('#reqBtn').addEventListener('click', openRequests);
$('#albumBtn').addEventListener('click', () => openAlbum());
$('#menuBtn').addEventListener('click', openMenu);
