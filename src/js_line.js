
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
   - サーバーには写真の控え（160px）を送らない。写真はこの端末の中だけ。 */
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
        const p = LineSync.pendingCode;
        if (p && p.st === S){
          /* 引っこしコードで受け取った子は、取りこみ口（1回だけ）から入れる */
          const r = await LineSync.send('POST', '/import', { code:p.text });
          LineSync.pendingCode = null;
          LineServer.importable = false;
          LineSync.apply(r.save, { photo:S.pet.photo });
        } else if (LineSync.fresh && LineSync.fresh === S){
          /* この端末でむかえた新しい子：サーバーが まっさらの子を作る（名前・みためだけ送る） */
          const photo = S.pet.photo;
          const r = await LineSync.send('POST', '/act', { type:'adopt', pet:linePet(S) });
          LineSync.fresh = null;
          LineSync.apply(r.save, { photo });
          setTimeout(() => Act.open(0), 0);
        } else if (LineSync.created != null && Number(S.created) === LineSync.created && lineIdKey(S) !== LineSync.idSent){
          const r = await LineSync.send('POST', '/save', { pet:linePet(S) });
          LineSync.apply(r.save);
        }
        LineSync.markOwner();
      } catch(e){
        if (e.code === 'already' || e.code === 'badcode'){
          LineSync.pendingCode = null;
          if (e.code === 'already') LineServer.importable = false;
          return LineSync.reload(e.code === 'already' ? '引っこしコードで 受け取れるのは 1回だけでした。LINEに ほぞんしている子に もどります' : 'コードを サーバーで 読めませんでした。LINEに ほぞんしている子に もどります');
        }
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
  owner(){ try { return localStorage.getItem(LINE_OWNER_KEY); } catch(e){ return null; } },
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
      if (S && this.samePet(S, remote)) this.apply(save);        /* 同じ子：サーバーのほうにそろえる（写真の控えはのこす） */
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
        const r = await this.send('POST', '/act', Object.assign({ type }, p));
        if (r && r.save) this.apply(r.save);
        return Object.assign({ ev:[] }, r);
      } catch(e){
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
