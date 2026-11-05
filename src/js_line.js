
/* ===== LINE版（LINEミニアプリ）だけのしくみ =====
   - LIFF の準備と判定。LIFF が読みこめない・初期化できない・外部ブラウザで開いた、のどれでも、
     いまの端末保存のまま（ゲスト）ふつうに遊べるようにする（白い画面にしない）。
   - LINE の中で開いたら、サーバー（Supabase の Edge Function `api`）で本人確認して、セーブをサーバーにも置く。
     IDトークンは liff.getIDToken() の生のものだけを送り、サーバーが LINE で検証する（プロフィールの値は使わない）。
     セッションのトークンは、このページのメモリだけに置く（端末に保存しない。開くたびに取り直す）。
   - サーバーには写真の控え（160px）を送らない。写真はこの端末の中だけ。
   - 端末のセーブ（uchinoko-biyori:v1）はそのまま使い、サーバーと「開いたときのセーブの時刻」で比べる（Claude版と同じ考え方）。 */
const LINE_CFG = {
  sdk:'https://static.line-scdn.net/liff/edge/2/sdk.js',  /* エッジパス：v2 の最新版が自動で入る（古い版に固定しない） */
  liffId:'2012410263-cuCI7vQS',  /* 開発用の LIFF ID（https://miniapp.line.me/2012410263-cuCI7vQS）。空なら LIFF は使わない */
  initTimeout:10000,  /* LIFF の初期化を待つ上限（ミリ秒） */
  api:'https://ftakgswltcavwixqxpzi.supabase.co/functions/v1/api',  /* 空ならサーバーを使わない（CSP の connect-src にも同じホスト） */
  apiTimeout:15000,
};
const LINE_OWNER_KEY = 'uchinoko-biyori:line-owner';  /* この端末のセーブが、どの会員のものか（サーバーの会員ID） */
const LINE_GUEST_KEY = 'uchinoko-biyori:line-guest';  /* LINEの子と入れかわった、この端末にいた子（消さずにとっておく） */

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
    if (!LINE_CFG.liffId) return this.mark();
    this.state = 'loading';
    this.mark();
    const liff = await this.sdk();
    if (!liff){ this.error = 'sdk'; this.state = 'failed'; return this.mark(); }
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
        if (!this.inClient) return 'LINEの外で ひらいています。ゲストとして あそべます';
        if (LineSync.state === 'connecting') return 'LINEと つながっています（サーバーに つないでいます…）';
        if (LineSync.state === 'failed') return `LINEと つながっています。サーバーに つながれないので、この端末に ほぞんしています（${LineSync.error}）`;
        return 'LINEと つながっています';
      case 'failed': return `LINEに つながれませんでした。ゲストとして あそべます（${this.error}）`;
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
  async call(method, path, body, again = true){
    const headers = {};
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (this.token) headers['x-session'] = this.token;
    const ctl = window.AbortController ? new AbortController() : null;
    const timer = ctl ? setTimeout(() => ctl.abort(), LINE_CFG.apiTimeout) : null;
    let res;
    try {
      res = await fetch(LINE_CFG.api + path, {
        method, headers, body:body === undefined ? undefined : JSON.stringify(body),
        cache:'no-store', credentials:'omit', referrerPolicy:'no-referrer', signal:ctl ? ctl.signal : undefined,
      });
    } catch(e){ throw lineErr('unavailable'); }
    finally { if (timer) clearTimeout(timer); }
    let data = null;
    try { data = await res.json(); } catch(e){}
    /* セッションが切れていたら、IDトークンで1回だけ取り直す */
    if (res.status === 401 && again && path !== '/login' && data && data.error === 'nosession'){
      await this.login();
      return this.call(method, path, body, false);
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
    return r;
  },
};

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

/* Persist.ref の代わり：Persist.flush() がここに書く（失敗のしかたも Persist に合わせる） */
const ServerRef = {
  async set(data){
    if (data && data.pet) data.pet.photo = null;   /* 写真の控えはサーバーに送らない（この端末の S にはのこる） */
    try {
      const p = LineSync.pendingCode;
      if (p && p.st === S){
        /* 引っこしコードで受け取った子は、取りこみ口（1回だけ）から入れる */
        const r = await LineServer.call('POST', '/import', { code:p.text });
        LineSync.pendingCode = null;
        LineServer.importable = false;
        LineSync.rev = r.save.rev;
      } else {
        const r = await LineServer.call('POST', '/save', { data, baseRev:LineSync.rev });
        LineSync.rev = r.rev;
      }
      LineSync.fails = 0;
      LineSync.markOwner();
      LineSync.setState('on');
    } catch(e){
      if (e.code === 'conflict') return LineSync.conflict(e.data && e.data.save);
      if (e.code === 'already' || e.code === 'badcode'){
        LineSync.pendingCode = null;
        if (e.code === 'already') LineServer.importable = false;
        return LineSync.reload(e.code === 'already' ? '引っこしコードで 受け取れるのは 1回だけでした。LINEに ほぞんしている子に もどります' : 'コードを サーバーで 読めませんでした。LINEに ほぞんしている子に もどります');
      }
      if (e.code === 'unavailable' && ++LineSync.fails < 4) throw e;   /* Persist.flush が少し待って、もう一度ためす */
      LineSync.fail(e);
      throw lineErr('off');   /* この回はあきらめて、この端末だけに保存する（つぎに開いたときに、またつなぐ） */
    }
  },
};

const LineSync = {
  state:'off',        /* off → connecting → on ／ failed（この端末だけに保存） */
  error:null, rev:null, fails:0, pendingCode:null,
  setState(s){ if (this.state !== s){ this.state = s; LineApp.mark(); } },
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
    this.setState('failed');
  },
  owner(){ try { return localStorage.getItem(LINE_OWNER_KEY); } catch(e){ return null; } },
  markOwner(){ try { if (LineServer.member) localStorage.setItem(LINE_OWNER_KEY, LineServer.member); } catch(e){} },
  samePet(a, b){ return !!(a && b && Number(a.created) && Number(a.created) === Number(b.created)); },
  valid(d){ return d && typeof d === 'object' && d.pet && typeof d.pet === 'object' ? d : null; },
  /* ログインしたあと：サーバーのセーブと、この端末のセーブを合わせる */
  attach(save){
    this.rev = save ? save.rev : null;
    const remote = save ? this.valid(save.data) : null;
    const mine = this.owner() === LineServer.member;
    Persist.ref = ServerRef; Persist.mode = 'cloud';
    this.setState('on');
    if (remote){
      const remoteT = Number(remote.updated) || 0;
      /* くらべるのは「開いたときのセーブの時刻」（開いただけで新しくなった S.updated ではない） */
      const localT = Persist.base != null ? Persist.base : (S ? Number(S.updated) || 0 : 0);
      if (S && !mine && !this.samePet(S, remote)){
        /* この端末の子は、このLINEの子ではない：LINEの子に会い、この端末の子はとっておいて、つれてくるかを聞く */
        this.stash(S);
        this.adopt(remote);
        this.offerGuest();
      } else if (!S || remoteT > localT){
        this.adopt(remote);
      } else {
        this.markOwner();
        if ((Number(S.updated) || 0) > remoteT) Persist.flush();
      }
    } else if (S){
      Persist.flush();   /* サーバーにまだ子がいない：この端末の子が、はじめてのセーブになる */
    }
    LineApp.paint();
  },
  /* サーバーの子にする。同じ子なら、この端末の写真の控えをのこす */
  adopt(remote, photoFrom){
    const src = photoFrom || S;
    const keep = src && this.samePet(src, remote) && src.pet ? safePhoto(src.pet.photo) : null;
    const had = !!S;
    S = JSON.parse(JSON.stringify(remote));
    if (keep) S.pet.photo = keep;
    Persist.base = Number(S.updated) || 0;
    Persist.saveLocal();
    this.markOwner();
    if (had) Game.onStateReplaced();
    else Game.start('おかえり！');   /* はじめての画面の上からでも、LINEの子に会えるように */
  },
  stash(st){ try { localStorage.setItem(LINE_GUEST_KEY, JSON.stringify(st)); } catch(e){} },
  stashed(){
    try {
      const g = Persist.readSave(localStorage.getItem(LINE_GUEST_KEY));
      return g ? ensureState(g) : null;
    } catch(e){ return null; }
  },
  async offerGuest(){
    if (!LineServer.importable) return;
    const g = this.stashed();
    if (!g || !S || this.samePet(g, S)) return;
    const wear = wearFrom(g.pet);
    for (const k of ['head','face','neck']) if (wear[k] && !WEAR_BY_ID[wear[k]]) wear[k] = WEAR_RENAMED[wear[k]] || null;
    const lv = levelInfo(g.stats.love).lv;
    const v = await Modal.show({
      label:'この端末にいた子',
      html:() => `<div class="mpet ex-happy">${renderPet(g.pet.look, { wear })}</div>
        <h3>この端末にいた<br>${esc(g.pet.name)}は どうする？</h3>
        <p>LINEには ${esc(S.pet.name)}が ほぞんされています。この端末にいた ${esc(g.pet.name)}（なかよしLv ${lv}）を つれてくると、${esc(S.pet.name)}と いれかわります。つれてこられるのは 1回だけです。やめておいても、${esc(g.pet.name)}は この端末に とっておきます。</p>
        <div class="btnrow"><button class="btn" type="button" data-close>やめておく</button><button class="btn primary" type="button" data-close="take">つれてくる</button></div>`,
    });
    if (v !== 'take') return;
    try {
      const r = await LineServer.call('POST', '/import', { code:lineEncodeCode(g) });
      LineServer.importable = false;
      this.rev = r.save.rev;
      this.adopt(r.save.data, g);
      toast(`${g.pet.name}を つれてきたよ`);
    } catch(e){
      if (e.code === 'already') LineServer.importable = false;
      toast(e.code === 'already' ? 'つれてこられるのは 1回だけでした' : 'いまは つれてこられませんでした。あとで もう一度 ひらいてね');
    }
  },
  /* べつの端末が先に書いていた：新しいほうを使う */
  conflict(save){
    const remote = save ? this.valid(save.data) : null;
    this.rev = save ? save.rev : null;
    if (remote && (Number(remote.updated) || 0) > (Number(S && S.updated) || 0)){
      this.adopt(remote);
    } else {
      Persist.flush();   /* こちらが新しい：いまの rev で書き直す */
    }
  },
  async reload(msg){
    try {
      const r = await LineServer.call('GET', '/save');
      LineServer.importable = !!r.importable;
      this.rev = r.save ? r.save.rev : null;
      const remote = r.save ? this.valid(r.save.data) : null;
      if (remote) this.adopt(remote);
    } catch(e){ this.fail(e); }
    if (msg) toast(msg);
  },
};

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
