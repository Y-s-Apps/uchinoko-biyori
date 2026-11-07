
/* ===== LINE版（LINEミニアプリ）だけのしくみ =====
   - LIFF の準備と判定。LIFF が読みこめない・初期化できない・外部ブラウザで開いた、のどれでも、
     LINEに ほぞんしていない子なら、いまの端末保存のまま（ゲスト）ふつうに遊べるようにする（白い画面にしない）。
   - LINE の中で開いたら、サーバー（Supabase の Edge Function `api`）で本人確認する。
     IDトークンは liff.getIDToken() の生のものだけを送り、サーバーが LINE で検証する（プロフィールの値は使わない）。
     セッションのトークンは、このページのメモリだけに置く（端末に保存しない。開くたびに取り直す）。
   - つながったら、おせわは ぜんぶサーバーが決める（Act.remote → POST /act）。サーバーの時計（日付は日本時間）と乱数を使い、
     画面の S はサーバーのセーブの写し。この端末から送るのは、名前・みため（POST /save）と、新しい子（adopt）・取りこみだけ。
   - LINEに ほぞんしている子（この端末の line-owner がある）は、サーバーに つながっていないと何も変えられない（つながるまで まってね）。
     ほかの子（ゲスト）は端末だけで遊べるが、LINEへは 取りこみの1回でしか入らない。
   - サーバーには写真の控え（160px）を送らない。写真はこの端末の中だけ。
   - AIの読みとり（LineAI）：LINEの中で サーバーに つながっているときだけ。写真をえらんだら、送る前に「AIで読みとる？」と きく。
     読みとるときは、この端末で はば768pxまでの JPEG に作り直して（位置情報などは入らない）POST /read へ。
     サーバーが Claude に わたし、写真も結果も のこさない。1人1日の回数はサーバーが数える。使わないときは いままでどおり端末の中だけ。
   - やめる（LineLeave）：プロフィールの「LINEの データを けす」。2回 たしかめてから POST /leave（サーバーの データを すぐに ぜんぶ消し、
     LINE の許可も取り消す）。この端末の子は のこして ゲストにする（line-owner は消さず、line-left に やめた会員IDを書く）。 */
const LINE_CFG = {
  sdk:'https://static.line-scdn.net/liff/edge/2/sdk.js',  /* エッジパス：v2 の最新版が自動で入る（古い版に固定しない） */
  liffId:'2012410263-cuCI7vQS',  /* 開発用の LIFF ID（https://miniapp.line.me/2012410263-cuCI7vQS）。空なら LIFF は使わない */
  initTimeout:10000,  /* LIFF の初期化を待つ上限（ミリ秒） */
  api:'https://ftakgswltcavwixqxpzi.supabase.co/functions/v1/api',  /* 空ならサーバーを使わない（CSP の connect-src にも同じホスト） */
  apiTimeout:15000,
  aiTimeout:50000,  /* AIの読みとりを待つ上限（サーバーは45秒で あきらめる） */
  aiSide:768,       /* AIに送る写真の 長いほうの辺（px） */
  aiQuality:.8,
};
const LINE_OWNER_KEY = 'uchinoko-biyori:line-owner';  /* この端末のセーブが、どの会員のものか（サーバーの会員ID） */
const LINE_GUEST_KEY = 'uchinoko-biyori:line-guest';  /* LINEの子と入れかわった、この端末にいた子（消さずにとっておく） */
const LINE_LEFT_KEY = 'uchinoko-biyori:line-left';    /* やめた（LINEの データを けした）会員ID。line-owner が これと同じなら、この端末の子は ゲスト */

/* プライバシーポリシーと利用規約（この画面と同じ場所の privacy.html・terms.html。build.sh が src/legal/ から作る）。
   LINEの中では LINEのブラウザで上に ひらく（うちのこ日和の画面は そのまま）。LINEの外では べつのタブ */
const LineDocs = {
  on:typeof LINE_DOCS !== 'undefined' && LINE_DOCS === true,   /* build.sh が お問い合わせ先を入れたときだけ ページがある */
  url(name){ return new URL(name + '.html', location.href).href; },
  open(name){
    const url = this.url(name);
    try {
      if (window.liff && LineApp.state === 'ready' && LineApp.inClient && typeof liff.openWindow === 'function'){ liff.openWindow({ url, external:false }); return; }
    } catch(e){}
    window.open(url, '_blank', 'noopener');
  },
  links(){
    const p = document.createElement('p');
    p.className = 'line-docs';
    for (const [name, label] of [['privacy', 'プライバシーポリシー'], ['terms', '利用規約']]){
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'linkbtn'; b.textContent = label;
      b.addEventListener('click', () => this.open(name));
      p.appendChild(b);
    }
    return p;
  },
};

const LineApp = {
  state:'off',        /* off（LIFF IDなし）→ loading → ready ／ failed */
  inClient:false, os:null, error:null,
  /* LIFF SDK を読みこんで待つ。読めなければ null（待ち受けを先につけてから読みこむので、失敗を取りこぼさない） */
  sdk(){
    return new Promise(res => {
      if (window.liff) return res(window.liff);
      let settled = false;
      const done = v => { if (!settled){ settled = true; res(v); } };
      const s = document.createElement('script');
      s.charset = 'utf-8'; s.async = true; s.src = LINE_CFG.sdk;
      s.addEventListener('load', () => done(window.liff || null));
      s.addEventListener('error', () => done(null));
      setTimeout(() => done(window.liff || null), LINE_CFG.initTimeout);
      document.head.appendChild(s);
    });
  },
  async init(){
    if (!LINE_CFG.liffId){ this.mark(); return LineSync.settle(); }
    this.state = 'loading';
    this.mark();
    const liff = await this.sdk();
    if (!liff){ this.error = 'sdk'; this.state = 'failed'; this.mark(); return LineSync.settle(); }
    try {
      await Promise.race([
        liff.init({ liffId:LINE_CFG.liffId }),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), LINE_CFG.initTimeout)),
      ]);
      this.inClient = !!liff.isInClient();
      this.os = liff.getOS();
      this.state = 'ready';
    } catch(e){
      this.error = String((e && (e.code || e.message)) || e).slice(0, 80);
      this.state = 'failed';
    }
    this.mark();
    if (this.state === 'ready' && this.inClient && LINE_CFG.api) LineSync.start();
    else LineSync.settle();
  },
  /* 見た目の切りかえ用：<html data-line="off|ready|failed" data-line-client="1" data-line-server="on|connecting|failed"> */
  mark(){
    const d = document.documentElement.dataset;
    d.line = this.state;
    if (this.inClient) d.lineClient = '1';
    if (LineSync.state !== 'off') d.lineServer = LineSync.state;
    this.paint();
  },
  /* プロフィールのシートに出す1行（LIFF ID がないときは出さない） */
  statusText(){
    switch (this.state){
      case 'loading': return 'LINEに つないでいます…';
      case 'ready':
        if (!this.inClient) return LineSync.owner() ? 'LINEの外で ひらいています。LINEに ほぞんしている子は、LINEの中で おせわできます'
          : 'LINEの外で ひらいています。ゲストとして あそべます';
        if (LineSync.state === 'left') return 'LINEの データを けしました。この端末で ゲストとして あそべます';
        if (LineSync.state === 'connecting') return 'LINEと つながっています（サーバーに つないでいます…）';
        if (LineSync.state === 'failed') return LineSync.owner()
          ? `LINEと つながっています。サーバーに つながれないので、おせわは つながるまで まってね（${LineSync.error}）`
          : `LINEと つながっています。サーバーに つながれないので、この端末に ほぞんしています（${LineSync.error}）`;
        return 'LINEと つながっています';
      case 'failed': return LineSync.owner() ? `LINEに つながれませんでした。つながるまで おせわは まってね（${this.error}）`
        : `LINEに つながれませんでした。ゲストとして あそべます（${this.error}）`;
    }
    return '';
  },
  /* 引っこしコードで受け取るところに出す、LINE版だけの決まり */
  moveText(){
    if (LineSync.state !== 'on') return '';
    return LineServer.importable
      ? 'LINEに ほぞんしている子には、引っこしコードで 受け取れるのは 1回だけです。'
      : 'LINEに ほぞんしている子には、もう 引っこしコードで 受け取りずみです（1回だけ）。';
  },
  paint(){
    const sh = document.getElementById('sheet');
    if (sh && sh.querySelector('#menuBtns')){
      const text = this.statusText();
      let p = sh.querySelector('.line-status');
      if (!text){ if (p) p.remove(); }
      else {
        if (!p){ p = document.createElement('p'); p.className = 'note line-status'; sh.appendChild(p); }
        p.textContent = text;
      }
      /* やめる：サーバーに つながっているときだけ、いちばん下に */
      let lb = sh.querySelector('.line-leave');
      if (!(p && LineSync.state === 'on' && LineServer.member)){ if (lb) lb.remove(); }
      else if (!lb){
        lb = document.createElement('button');
        lb.type = 'button'; lb.className = 'linkbtn line-leave'; lb.textContent = 'LINEの データを けす';
        lb.addEventListener('click', () => LineLeave.start());
        p.insertAdjacentElement('afterend', lb);
      }
      /* プライバシーポリシーと利用規約：いつも いちばん下に */
      if (LineDocs.on){
        let docs = sh.querySelector('.line-docs');
        if (!docs) docs = LineDocs.links();
        if (sh.lastElementChild !== docs) sh.appendChild(docs);
      }
    }
    /* はじめての画面の写真のことわり：AIで読みとれるときは、えらんだあとに きくことを書く */
    const obNote = document.querySelector('#ob #obFile') ? document.querySelector('#ob .ob-step > p.note:last-child') : null;
    if (obNote){
      if (!obNote.dataset.orig) obNote.dataset.orig = obNote.textContent;
      obNote.textContent = LineAI.ready()
        ? 'えらんだ写真は、AIで 読みとるか きいてから つかいます。AIを使わないときは、この端末の中で 毛の色を ひろうだけで、どこにも 送りません。お部屋には 小さなサムネイルを 飾ります。'
        : obNote.dataset.orig;
    }
    /* 引っこしのシート（#mvInBox）と、はじめての画面の「引っこしコードで受け取る」（#imGo） */
    for (const anchor of [sh && sh.querySelector('#mvIn'), document.querySelector('#ob #imCode')]){
      if (!anchor) continue;
      const text = this.moveText();
      let p = anchor.parentNode.querySelector('.line-move');
      if (!text){ if (p) p.remove(); continue; }
      if (!p){ p = document.createElement('p'); p.className = 'note line-move'; anchor.insertAdjacentElement('beforebegin', p); }
      p.textContent = text;
    }
  },
};

/* ----- サーバーとのやりとり ----- */
function lineErr(code, data, status){ const e = new Error(code); e.code = code; e.data = data || null; e.status = status || 0; return e; }
const LineServer = {
  token:null, member:null, importable:false,
  ai:null,            /* AIの読みとり：{ on, left, perDay }（サーバーが数える） */
  /* opt：{ timeout, signal }（signal で とめたら 'cancelled'） */
  async call(method, path, body, again = true, opt = {}){
    if (LineSync.state === 'left') throw lineErr('left');   /* やめたあとは、だまって つなぎなおさない（新しい会員を作らない） */
    const headers = {};
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (this.token) headers['x-session'] = this.token;
    const ctl = window.AbortController ? new AbortController() : null;
    const timer = ctl ? setTimeout(() => ctl.abort(), opt.timeout || LINE_CFG.apiTimeout) : null;
    const stop = () => { if (ctl) ctl.abort(); };
    const cancelled = () => !!(opt.signal && opt.signal.aborted);
    if (cancelled()) throw lineErr('cancelled');
    if (opt.signal) opt.signal.addEventListener('abort', stop);
    let res, data = null;
    try {
      try {
        res = await fetch(LINE_CFG.api + path, {
          method, headers, body:body === undefined ? undefined : JSON.stringify(body),
          cache:'no-store', credentials:'omit', referrerPolicy:'no-referrer', signal:ctl ? ctl.signal : undefined,
        });
      } catch(e){ throw lineErr(cancelled() ? 'cancelled' : 'unavailable'); }
      try { data = await res.json(); } catch(e){}
      if (cancelled()) throw lineErr('cancelled');
    } finally {
      if (timer) clearTimeout(timer);
      if (opt.signal) opt.signal.removeEventListener('abort', stop);
    }
    /* セッションが切れていたら、IDトークンで1回だけ取り直す */
    if (res.status === 401 && again && path !== '/login' && data && data.error === 'nosession'){
      await this.login();
      return this.call(method, path, body, false, opt);
    }
    if (!res.ok) throw lineErr(res.status >= 500 || res.status === 429 ? 'unavailable' : (data && data.error) || 'http' + res.status, data, res.status);
    return data;
  },
  async login(){
    let idToken = null;
    try { idToken = window.liff && liff.getIDToken ? liff.getIDToken() : null; } catch(e){}
    if (!idToken) throw lineErr('notoken');
    this.token = null;
    const r = await this.call('POST', '/login', { idToken }, false);
    if (!r || typeof r.token !== 'string' || !r.member || typeof r.member.id !== 'string') throw lineErr('badreply');
    this.token = r.token; this.member = r.member.id; this.importable = !!r.member.importable;
    this.ai = lineAiStatus(r.ai);
    lineServerClock(r.now);
    return r;
  },
};

/* つながっている間、画面のルールの時計はサーバーの時刻（日付は日本時間）に合わせる */
function lineServerClock(serverNow){
  const off = Number(serverNow) - Date.now();
  if (!Number.isFinite(off)) return;
  Clock.now = () => Date.now() + off;
  Clock.dayKey = function(t){
    const ms = t == null ? this.now() : (t instanceof Date ? t.getTime() : Number(t));
    const d = new Date(ms + 9 * 3600e3);
    return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
  };
}

/* セーブの中身を、引っこしコードと同じ形にする（写真の控えは入れない。サーバーは写真を受け取らない） */
function lineEncodeCode(st){
  const o = JSON.parse(JSON.stringify(st));
  if (o.pet) o.pet.photo = null;
  const bytes = new TextEncoder().encode(JSON.stringify(o));
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  const b64 = btoa(bin);
  return MOVE_PREFIX + b64.length + ':' + b64;
}
/* この端末から送ってよいのは、名前とみためだけ */
const linePet = st => ({ name:st.pet.name, species:st.pet.species, breedId:st.pet.breedId, look:st.pet.look, colorName:st.pet.colorName || '' });
const lineIdKey = st => JSON.stringify(linePet(st));

/* Persist.ref の代わり：Persist.flush() がここに書く。送るのは、取りこみ・新しい子・名前とみための変更だけ
   （おせわの数字は /act でサーバーが決めるので、ここでは送らない） */
const ServerRef = {
  set(){
    return LineSync.queue(async () => {
      if (!S || LineSync.state !== 'on') return;
      try {
        const sent = await LineSync.pushPending();
        if (sent === 'adopt') setTimeout(() => Act.open(0), 0);
        else if (!sent && LineSync.created != null && Number(S.created) === LineSync.created && lineIdKey(S) !== LineSync.idSent){
          const r = await LineSync.send('POST', '/save', { pet:linePet(S) });
          LineSync.apply(r.save);
        }
        LineSync.markOwner();
      } catch(e){
        if (LineSync.pendingRefused(e)) return;
        if (LineSync.refusal(e)) return;
        LineSync.fail(e);
        throw lineErr('off');   /* Persist はこの回 端末だけに保存する */
      }
    });
  },
};

let lineSettle = null;
const LineSync = {
  state:'off',        /* off → connecting → on ／ failed */
  error:null, rev:null, pendingCode:null, fresh:null,
  created:null,       /* サーバーにいる子の created（null：まだいない） */
  idSent:null,        /* サーバーにいる子の名前・みため */
  chain:Promise.resolve(), lastToast:0, waitOpen:false,
  setState(s){ if (this.state !== s){ this.state = s; LineApp.mark(); } },
  /* 「サーバーを使うかどうか」が決まった（Act.open がまっている） */
  settle(){ if (lineSettle){ lineSettle(); lineSettle = null; } },
  /* サーバーとのやりとりは、1つずつ順に */
  queue(fn){ const job = this.chain.then(fn, fn); this.chain = job.catch(() => {}); return job; },
  /* この端末で うまれた子（新しい子・引っこしコードの子）を、おせわより先に サーバーへ送る（queue の中から呼ぶ）。
     先に おせわ（open など）を送ると、サーバーは前の子の セーブを返し、画面が前の子に もどってしまうため。
     送ったものを返す（'import'・'adopt'・null） */
  async pushPending(){
    if (!S || this.state !== 'on') return null;
    const p = this.pendingCode;
    if (p && p.st === S){
      /* 引っこしコードで受け取った子は、取りこみ口（1回だけ）から入れる */
      const r = await this.send('POST', '/import', { code:p.text });
      this.pendingCode = null;
      LineServer.importable = false;
      this.apply(r.save, { photo:S.pet.photo });
      return 'import';
    }
    if (this.fresh && this.fresh === S){
      /* この端末でむかえた新しい子：サーバーが まっさらの子を作る（名前・みためだけ送る） */
      const photo = S.pet.photo;
      const r = await this.send('POST', '/act', { type:'adopt', pet:linePet(S) });
      this.fresh = null;
      this.apply(r.save, { photo });
      return 'adopt';
    }
    return null;
  },
  /* 取りこみを サーバーが ことわった：LINEに ほぞんしている子に もどす（queue の中から呼ぶので、reload は またない） */
  pendingRefused(e){
    if (!e || (e.code !== 'already' && e.code !== 'badcode')) return false;
    this.pendingCode = null;
    if (e.code === 'already') LineServer.importable = false;
    this.reload(e.code === 'already' ? '引っこしコードで 受け取れるのは 1回だけでした。LINEに ほぞんしている子に もどります' : 'コードを サーバーで 読めませんでした。LINEに ほぞんしている子に もどります');
    return true;
  },
  async send(method, path, body){
    try { return await LineServer.call(method, path, body); }
    catch(e){
      if (e.code !== 'unavailable') throw e;
      await sleep(900);   /* 1回だけ、少しまってから */
      return await LineServer.call(method, path, body);
    }
  },
  /* サーバーがことわった（つながってはいる）ものか */
  refusal(e){ return e && e.status >= 400 && e.status < 500 && e.status !== 401 && e.status !== 429; },
  async start(){
    this.setState('connecting');
    let r;
    try { r = await LineServer.login(); }
    catch(e){ return this.fail(e); }
    this.attach(r.save);
  },
  fail(e){
    this.error = String((e && e.code) || 'error').slice(0, 40);
    if (Persist.ref === ServerRef){ Persist.ref = null; Persist.mode = 'local'; }
    Act.remote = null;
    this.setState('failed');
    this.settle();
  },
  /* この端末のセーブが LINEの子なら、その会員ID（やめた会員のものなら null＝ゲスト） */
  owner(){
    try {
      const o = localStorage.getItem(LINE_OWNER_KEY);
      return o && o !== localStorage.getItem(LINE_LEFT_KEY) ? o : null;
    } catch(e){ return null; }
  },
  /* やめた（サーバーの データを けした）：この端末の子は ゲストとして のこす */
  left(){
    try { if (LineServer.member) localStorage.setItem(LINE_LEFT_KEY, LineServer.member); } catch(e){}
    LineServer.token = null; LineServer.member = null; LineServer.ai = null; LineServer.importable = false;
    if (Persist.ref === ServerRef){ Persist.ref = null; Persist.mode = 'local'; }
    Act.remote = null;
    this.created = this.idSent = this.rev = null;
    this.pendingCode = null; this.fresh = null;
    this.setState('left');
    if (S) Persist.saveLocal();
  },
  markOwner(){ try { if (LineServer.member && this.created != null) localStorage.setItem(LINE_OWNER_KEY, LineServer.member); } catch(e){} },
  samePet(a, b){ return !!(a && b && Number(a.created) && Number(a.created) === Number(b.created)); },
  valid(d){ return d && typeof d === 'object' && d.pet && typeof d.pet === 'object' ? d : null; },
  /* この端末で遊んだあとがある子か（なかよし・おせわの回数・スタンプ） */
  progressed(st){
    if (!st || !st.stats) return false;
    const c = st.counts || {};
    return Number(st.stats.love) > 0 || ['meals','treats','pets','plays'].some(k => Number(c[k]) > 0) || (Array.isArray(st.stamps) && st.stamps.length > 0);
  },
  /* いま何も変えられない理由（null なら変えられる） */
  lockReason(){
    if (this.state === 'on') return this.created == null && S && !Onboard.busy ? 'connecting' : null;
    if (LineApp.state === 'loading' || this.state === 'connecting') return 'connecting';
    if (this.owner()) return LineApp.state === 'ready' && !LineApp.inClient ? 'outside' : 'offline';
    return null;
  },
  waitNotice(why, quiet){
    const t = Date.now();
    if (why === 'connecting' || quiet){
      if (t - this.lastToast > 3000){ this.lastToast = t; toast(why === 'connecting' ? 'LINEに つないでいるよ。すこし まってね' : 'つながるまで おせわは おやすみだよ'); }
      return;
    }
    if (this.waitOpen || !S) return;
    this.waitOpen = true;
    const name = esc(S.pet.name);
    Modal.show({
      label:'つながるまで まってね',
      html:() => `${petCard('', 'ex-sad')}<h3>サーバーに<br>つながっていません</h3>
        <p>${why === 'outside' ? `${name}は LINEに ほぞんしている子です。LINEの中で ひらくと おせわできます。`
          : `${name}は LINEに ほぞんしている子です。サーバーに つながるまで、おせわは すこし まってね。`}</p>
        <div class="btnrow"><button class="btn" type="button" data-close>とじる</button>${why === 'outside' ? '' : '<button class="btn primary" type="button" data-close="retry">もういちど つなぐ</button>'}</div>`,
    }).then(v => { this.waitOpen = false; if (v === 'retry') this.retry(); });
  },
  retry(){
    if (LineApp.state === 'ready' && LineApp.inClient && LINE_CFG.api) return this.start();
    location.reload();   /* LIFF そのものが はじまらなかった */
  },
  /* サーバーにいる子のことを覚える */
  know(st){ this.created = Number(st.created) || null; this.idSent = lineIdKey(st); },
  /* ログインしたあと、またはセーブを読みなおしたあと：サーバーの子に合わせる */
  attach(save){
    this.rev = null;
    const remote = save ? this.valid(save.data) : null;
    const mine = this.owner() === LineServer.member;
    Persist.ref = ServerRef; Persist.mode = 'cloud';
    Act.remote = (t, p) => this.act(t, p);
    if (remote){
      this.setState('on');
      if (S && mine && (this.fresh === S || (this.pendingCode && this.pendingCode.st === S))){
        this.know(remote);
        Persist.flush();                                        /* この端末で むかえた子が まだ とどいていない：先に送る */
      }
      else if (S && this.samePet(S, remote)) this.apply(save);   /* 同じ子：サーバーのほうにそろえる（写真の控えはのこす） */
      else {
        if (S && !mine) this.stash(S);                          /* この端末の子は、このLINEの子ではない：とっておく */
        this.adopt(save);
        if (S && !mine) this.offerGuest();
      }
    } else {
      this.created = this.idSent = null;
      this.setState('on');
      if (S && this.progressed(S)) this.offerLocal();           /* LINEに まだ子がいない：この端末の子をどうするか聞く */
      else if (S){ this.fresh = S; Persist.flush(); }           /* いまむかえたばかりの子：サーバーが まっさらの子を作る */
    }
    this.settle();
    LineApp.paint();
  },
  /* サーバーの返事（同じ子の新しい数字）を画面に。古い返事はつかわない */
  apply(save, o = {}){
    const data = save && this.valid(save.data);
    if (!data) return;
    if (this.rev != null && save.rev < this.rev) return;
    const same = S && this.samePet(S, data);
    const photo = 'photo' in o ? safePhoto(o.photo) : (same ? safePhoto(S.pet.photo) : null);
    this.rev = save.rev;
    S = JSON.parse(JSON.stringify(data));
    S.pet.photo = photo;
    this.know(S);
    Persist.base = Number(S.updated) || 0;
    Persist.saveLocal();
    this.markOwner();
    Game.refresh();
  },
  /* サーバーの子にする（ちがう子）。同じ子なら、この端末の写真の控えをのこす */
  adopt(save, photoFrom){
    const remote = this.valid(save.data);
    const src = photoFrom || S;
    const keep = src && this.samePet(src, remote) && src.pet ? safePhoto(src.pet.photo) : null;
    const had = !!S;
    this.rev = save.rev;
    S = JSON.parse(JSON.stringify(remote));
    if (keep) S.pet.photo = keep;
    this.know(S);
    Persist.base = Number(S.updated) || 0;
    Persist.saveLocal();
    this.markOwner();
    if (had) Game.onStateReplaced();
    else Game.start('おかえり！');   /* はじめての画面の上からでも、LINEの子に会えるように */
  },
  /* おせわ：サーバーに決めてもらい、返事のセーブを画面に */
  act(type, p){
    return this.queue(async () => {
      if (this.state !== 'on') return { ok:false, why:'offline', ev:[] };
      try {
        await this.pushPending();   /* むかえたばかりの子が まだなら、先に */
        const r = await this.send('POST', '/act', Object.assign({ type }, p));
        if (r && r.save) this.apply(r.save);
        return Object.assign({ ev:[] }, r);
      } catch(e){
        if (this.pendingRefused(e)) return { ok:false, why:'nosave', ev:[] };
        if (e.code === 'nosave'){ this.reload(); return { ok:false, why:'nosave', ev:[] }; }
        if (this.refusal(e)) return { ok:false, why:e.code, ev:[] };
        this.fail(e);
        return { ok:false, why:'offline', ev:[] };
      }
    });
  },
  stash(st){ try { localStorage.setItem(LINE_GUEST_KEY, JSON.stringify(st)); } catch(e){} },
  stashed(){
    try {
      const g = Persist.readSave(localStorage.getItem(LINE_GUEST_KEY));
      return g ? ensureState(g) : null;
    } catch(e){ return null; }
  },
  guestHtml(g, body){
    const wear = wearFrom(g.pet);
    for (const k of ['head','face','neck']) if (wear[k] && !WEAR_BY_ID[wear[k]]) wear[k] = WEAR_RENAMED[wear[k]] || null;
    return `<div class="mpet ex-happy">${renderPet(g.pet.look, { wear })}</div>${body}`;
  },
  /* この端末の子を、取りこみ口（1回だけ）からつれてくる */
  async bring(g){
    const r = await this.queue(() => this.send('POST', '/import', { code:lineEncodeCode(g) }));
    LineServer.importable = false;
    this.adopt(r.save, g);
    toast(`${g.pet.name}を つれてきたよ`);
  },
  async offerGuest(){
    if (!LineServer.importable) return;
    const g = this.stashed();
    if (!g || !S || this.samePet(g, S) || !this.progressed(g)) return;
    const lv = levelInfo(g.stats.love).lv;
    const v = await Modal.show({
      label:'この端末にいた子',
      html:() => this.guestHtml(g, `<h3>この端末にいた<br>${esc(g.pet.name)}は どうする？</h3>
        <p>LINEには ${esc(S.pet.name)}が ほぞんされています。この端末にいた ${esc(g.pet.name)}（なかよしLv ${lv}）を つれてくると、${esc(S.pet.name)}と いれかわります。つれてこられるのは 1回だけです。やめておいても、${esc(g.pet.name)}は この端末に とっておきます。</p>
        <div class="btnrow"><button class="btn" type="button" data-close>やめておく</button><button class="btn primary" type="button" data-close="take">つれてくる</button></div>`),
    });
    if (v !== 'take') return;
    try { await this.bring(g); }
    catch(e){
      if (e.code === 'already') LineServer.importable = false;
      toast(e.code === 'already' ? 'つれてこられるのは 1回だけでした' : 'いまは つれてこられませんでした。あとで もう一度 ひらいてね');
    }
  },
  /* LINEに まだ子がいない：この端末で遊んだ子を つれてくるか、新しい子をむかえるか */
  async offerLocal(){
    const g = S;
    this.stash(g);
    const lv = levelInfo(g.stats.love).lv;
    let v = null;
    if (!LineServer.importable){
      await Modal.show({ label:'この端末の子',
        html:() => this.guestHtml(g, `<h3>あたらしい子を<br>むかえてね</h3>
          <p>この端末の ${esc(g.pet.name)}（なかよしLv ${lv}）は、LINEへの引っこし（1回だけ）を もう つかったので、つれてこられません。${esc(g.pet.name)}は この端末に とっておきます。</p>
          <button class="btn primary" type="button" data-close>わかった</button>`) });
    } else {
      while (v == null){
        v = await Modal.show({ label:'この端末の子',
          html:() => this.guestHtml(g, `<h3>この端末の ${esc(g.pet.name)}を<br>LINEに つれてくる？</h3>
            <p>LINEには まだ 子がいません。${esc(g.pet.name)}（なかよしLv ${lv}）を つれてこられるのは 1回だけです（引っこしコードと あわせて）。やめておくと、あたらしい子を むかえます。${esc(g.pet.name)}は この端末に とっておきます。</p>
            <div class="btnrow"><button class="btn" type="button" data-close="no">やめておく</button><button class="btn primary" type="button" data-close="take">つれてくる</button></div>`) });
      }
      if (v === 'take'){
        try { return await this.bring(g); }
        catch(e){
          if (e.code === 'already') LineServer.importable = false;
          toast('いまは つれてこられませんでした。あたらしい子を むかえてね');
        }
      }
    }
    S = null;
    Onboard.openNew(false);
  },
  async reload(msg){
    try {
      const r = await this.queue(() => this.send('GET', '/save'));
      LineServer.importable = !!r.importable;
      this.attach(r.save);
    } catch(e){ this.fail(e); }
    if (msg) toast(msg);
  },
};

/* ----- AIの読みとり（LINEの中で、サーバーに つながっているときだけ） ----- */
function lineAiStatus(a){
  if (!a || typeof a !== 'object') return null;
  const n = (v, hi) => clamp(Math.floor(Number(v) || 0), 0, hi);
  return { on:a.on === true, left:n(a.left, 99), perDay:n(a.perDay, 99) };
}
const LineAI = {
  ready(){ return LineSync.state === 'on' && !!(LineServer.ai && LineServer.ai.on); },
  /* きょうの のこり回数を聞きなおす（日付が かわったときのため） */
  async refresh(){
    try { const r = await LineServer.call('GET', '/ai'); if (r && r.ai) LineServer.ai = lineAiStatus(r.ai); } catch(e){}
    return LineServer.ai;
  },
  leftText(a){
    if (!a) return '';
    if (!a.on) return 'いまは AIの読みとりを おやすみしています';
    return a.left > 0 ? `1日${a.perDay}回まで（きょうは あと${a.left}回）` : `きょうの分は つかいきりました（1日${a.perDay}回まで。あすの0時に もどります）`;
  },
  /* この端末で小さくする（長いほうの辺を768pxまで、JPEG）。キャンバスで作り直すので、位置情報などは入らない */
  async shrink(blob){
    const url = URL.createObjectURL(blob);
    try {
      const im = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
      const sc = Math.min(1, LINE_CFG.aiSide / Math.max(im.naturalWidth, im.naturalHeight));
      const cv = document.createElement('canvas');
      cv.width = Math.max(1, Math.round(im.naturalWidth * sc)); cv.height = Math.max(1, Math.round(im.naturalHeight * sc));
      cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
      return cv.toDataURL('image/jpeg', LINE_CFG.aiQuality);
    } finally { URL.revokeObjectURL(url); }
  },
  /* 写真をえらんだあと、送る前に：AIで読みとるか、自分でえらぶか */
  ask(ob, img){
    ob.busy = true;
    ob.show();
    ob.box.innerHTML = `<div class="ob-step aiask">
      <div class="aiphoto"><img src="${esc(img.preview)}" alt="えらんだ写真"></div>
      <h2 class="brand">AIで 読みとる？</h2>
      <p class="lead">AIが 写真から、種類・毛の色・耳や しっぽの形を 読みとって、そっくりな子に します。</p>
      <button class="btn primary" type="button" id="aiGo">AIで 読みとる</button>
      <p class="note" id="aiLeft" role="status">${esc(this.leftText(LineServer.ai))}</p>
      <button class="btn" type="button" id="aiSelf">AIを使わずに、自分で えらぶ</button>
      <p class="note">写真は この端末で 小さくしてから、うちのこ日和の サーバーを通して AI（Anthropic の Claude）に 送ります。読みとったら すぐに すてて、サーバーには のこしません。AIを使わないときは、写真は この端末の中だけで つかいます。${LineDocs.on ? '<button class="linkbtn inline" type="button" id="aiPolicy">くわしく（プライバシーポリシー）</button>' : ''}</p>
      <button class="linkbtn" type="button" id="aiBack">べつの写真にする</button>
    </div>`;
    const go = $('#aiGo'), self = $('#aiSelf'), left = $('#aiLeft');
    const show = a => {
      const none = !a || !a.on || a.left <= 0;
      go.disabled = none;
      go.classList.toggle('primary', !none);
      self.classList.toggle('primary', none);
      left.textContent = this.leftText(a);
    };
    show(LineServer.ai);
    this.refresh().then(a => { if (ob.box.contains(go)) show(a); });
    go.addEventListener('click', () => { if (!go.disabled) this.read(ob, img); });
    self.addEventListener('click', () => ob.fromPhotoOnly(img, '写真から毛の色をひろいました。犬か猫と種類をえらんで、色を近づけてね。'));
    $('#aiBack').addEventListener('click', () => ob.welcome());
    if (LineDocs.on) $('#aiPolicy').addEventListener('click', () => LineDocs.open('privacy'));
  },
  async read(ob, img){
    ob.scan(img.preview);
    const note = ob.box.querySelector('.scan .note');
    if (note) note.textContent = '写真を 小さくして、AIに 送っています。読みとりには 10〜20秒ほど かかることがあります。';
    const ctl = ob.ctl = new AbortController();
    let r;
    try {
      const image = await this.shrink(img.blob);
      r = await LineServer.call('POST', '/read', { image }, true, { timeout:LINE_CFG.aiTimeout, signal:ctl.signal });
    } catch(e){
      r = { ok:false, why:ctl.signal.aborted ? 'cancelled' : e && e.code === 'badimage' ? 'badimage' : 'unavailable' };
    }
    if (ob.ctl === ctl) ob.ctl = null;
    clearInterval(ob.msgT);
    if (!r || typeof r !== 'object') r = { ok:false, why:'unavailable' };
    if (r.ai) LineServer.ai = lineAiStatus(r.ai);
    if (!ob.busy) return;                                  /* とちゅうで はじめての画面が とじた */
    if (r.why === 'cancelled') return ob.welcome();
    const photoOnly = msg => ob.fromPhotoOnly(img, msg);
    if (r.ok){
      const out = parseAI(r.result);
      if (!out) return photoOnly('うまく読みとれませんでした。種類と色をえらんでね。');
      if (out.species === 'other') return ob.welcome('犬か猫が写っている写真をえらんでね。顔がはっきり写っている写真がおすすめです。');
      ob.draft = { look:out.look, name:'', photo:img.thumb, preview:img.preview, colorName:out.colorName, cands:out.cands, comment:out.comment, note:'', keepColors:true, photoMain:null };
      return ob.edit();
    }
    if (r.why === 'refused' || r.why === 'badimage') return ob.welcome('この写真は読みとれませんでした。ちがう写真でためしてね。');
    const per = LineServer.ai && LineServer.ai.perDay;
    photoOnly({
      limit:`きょうの AIの読みとりは つかいきりました${per ? `（1日${per}回まで）` : ''}。写真の色で 仮の見た目を つくったので、種類を えらんでね。`,
      busy:'きょうは AIの読みとりが いっぱいに なりました。写真の色で 仮の見た目を つくったので、種類を えらんでね。',
      off:'いまは AIの読みとりを おやすみしています。写真の色で 仮の見た目を つくったので、種類を えらんでね。',
    }[r.why] || 'うまく読みとれませんでした。写真の色で 仮の見た目を つくったので、種類を えらぶか、すこし あとで ためしてね。');
  },
};
/* ----- やめる（LINEの データを けす） -----
   2回 たしかめてから、サーバーの データを すぐに ぜんぶ消す（会員・LINEのひもづけ・セーブ・AIの回数）。
   LINE の許可の取り消し（deauthorize）は サーバーがする（アクセストークンは このときだけ送る）。
   この端末の子は のこして ゲストに。また LINEで ひらくと、ふつうの はじめての人と同じに「つれてくる？」を きく。 */
const LineLeave = {
  busy:false,
  async start(){
    if (this.busy || LineSync.state !== 'on' || !S) return;
    closeSheet();
    const name = esc(S.pet.name);
    const v = await Modal.show({
      label:'LINEの データを けす',
      html:() => `${petCard('', 'ex-sad')}<h3>LINEの データを<br>けしますか？</h3>
        <p>サーバーに ほぞんしている ${name}の データ（なかよし・おせわの記録・きせかえ・おみやげ など）を ぜんぶ けして、LINEとの 連携も 解除します。けしたら もとに もどせません。</p>
        <p>この端末の ${name}は のこるので、ゲストとして あそべます。</p>
        <button class="btn" type="button" id="lvCopy">さきに 引っこしコードを コピー</button>
        <p class="note" id="lvMsg" role="status">引っこしコードを ひかえておくと、あとで ホーム画面のアプリなどへ つれていけます。</p>
        <textarea id="lvCode" readonly tabindex="-1" aria-hidden="true" ${CODE_ATTRS} style="position:absolute;left:-9999px;top:0;width:1px;height:1px;opacity:0"></textarea>
        <div class="btnrow"><button class="btn" type="button" data-close>やめておく</button><button class="btn warn" type="button" data-close="next">けす</button></div>`,
      ready:box => {
        const ta = box.querySelector('#lvCode'), msg = box.querySelector('#lvMsg');
        box.querySelector('#lvCopy').addEventListener('click', async () => {
          if (!S) return;
          ta.value = encodeMoveCode();
          const r = await copyText(ta);
          msg.textContent = r === 'copied' ? 'コピーしました。メモなどに 貼りつけて とっておいてね。'
            : 'コピーできませんでした。プロフィールの「引っこし・バックアップ」から ひかえてね。';
        });
      },
    });
    if (v !== 'next') return;
    const v2 = await Modal.show({
      label:'ほんとうに けしますか',
      html:() => `<h3>ほんとうに<br>けしますか？</h3>
        <p>${name}の LINEの データを けします。もとに もどせません。</p>
        <div class="btnrow"><button class="btn" type="button" data-close>やめておく</button><button class="btn warn" type="button" data-close="yes">けす</button></div>`,
    });
    if (v2 === 'yes') await this.run(name);
  },
  async run(name){
    if (this.busy || LineSync.state !== 'on') return;
    this.busy = true;
    toast('けしています…');
    let accessToken = null;
    try { accessToken = window.liff && liff.getAccessToken ? liff.getAccessToken() : null; } catch(e){}
    let r;
    try { r = await LineSync.queue(() => LineServer.call('POST', '/leave', { confirm:'leave', accessToken:accessToken || null })); }
    catch(e){
      this.busy = false;
      toast('いまは けせませんでした。すこし あとで もう一度 ためしてね');
      return;
    }
    this.busy = false;
    LineSync.left();
    const unlinked = r && (r.deauth === 'done' || r.deauth === 'already');
    await Modal.show({
      label:'けしました',
      html:() => `${S ? petCard() : ''}<h3>LINEの データを<br>けしました</h3>
        <p>${S ? `この端末の ${name}とは、これからも ゲストとして あそべます。` : ''}${S && LineSync.progressed(S) ? `また LINEで ひらくと、${name}を LINEに つれてくるか ききます。` : 'また LINEで ひらくと、はじめから はじめられます。'}</p>
        ${unlinked ? '' : '<p class="note">LINEとの 連携は、LINEの「設定」の「アカウント」から はずせます。</p>'}
        <button class="btn primary" type="button" data-close>わかった</button>`,
    });
  },
};

/* 写真をえらんだら：AIで読みとれるときは、送る前に きく。読みとれないとき（LINEの外・つながらない・おやすみ）は いままでどおり */
const lineAnalyze = Onboard.analyze;
Onboard.analyze = async function(file){
  if (!LineAI.ready()) return lineAnalyze.call(this, file);
  this.busy = true;
  let img;
  try { img = await prepImage(file); }
  catch(e){ return this.welcome('この写真は読みこめませんでした。JPEGかPNGの写真でためしてね。'); }
  if (!this.busy) return;
  LineAI.ask(this, img);
};

/* おせわの動きの あいだに サーバーの返事が とどいても、メーターと おねがいのバッジは 動きが おわってから（ホーム画面版と同じ）。
   返事は すぐ とどくので、そのまま出すと「ごはん」を押した とたんに メーターが 動いてしまう。
   動きの おわりに finish()（メーター）と playEvents()（バッジ）が 出しなおす */
let lineHold = false;
const lineRenderStats = renderStats, lineRenderBadge = renderReqBadge, lineRefresh = Game.refresh;
renderStats = function(){ if (!lineHold) lineRenderStats(); };
renderReqBadge = function(){ if (!lineHold) lineRenderBadge(); };
Game.refresh = function(){
  lineHold = !!Pet.busy;
  try { lineRefresh.call(this); } finally { lineHold = false; }
};

/* 画面のしくみ（js_app.js の Act）に、サーバーとつながりのことを教える */
Act.gate = new Promise(res => { lineSettle = res; });
Act.lock = () => LineSync.lockReason();
Act.onWait = (why, quiet) => LineSync.waitNotice(why, quiet);
/* この端末で新しい子をむかえたら、サーバーには adopt で作ってもらう */
const lineNewState = newState;
newState = function(pet, t){ const st = lineNewState(pet, t); LineSync.fresh = st; return st; };

/* 引っこしコード：LINEに ほぞんしているときは、取りこみ口（1回だけ）を通す */
const lineReadMoveCode = readMoveCode;
readMoveCode = function(text){
  const r = lineReadMoveCode(text);
  if (r.st && LineSync.state === 'on'){
    if (!LineServer.importable) return { reason:'once' };
    LineSync.pendingCode = { text:String(text), st:r.st };
  }
  return r;
};
const lineMoveErrorText = moveErrorText;
moveErrorText = function(r){
  if (r && r.reason === 'once') return 'LINEに ほぞんしている子には、引っこしコードで 受け取れるのは 1回だけです。もう 受け取りずみなので、いまの子のままです。';
  return lineMoveErrorText(r);
};

/* シートやはじめての画面の中身が入れかわるたびに、LINEの1行を足す */
(() => {
  if (!window.MutationObserver) return;
  const watch = el => { if (el) new MutationObserver(() => LineApp.paint()).observe(el, { childList:true }); };
  watch(document.getElementById('sheet'));
  watch(document.getElementById('ob'));
})();
LineApp.init();
