
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
     LINE の許可も取り消す）。この端末の子は のこして ゲストにする（line-owner は消さず、line-left に やめた会員IDを書く）。
   - うちのこカード（LineCard）：プロフィールの「うちのこカードを おくる」。この端末で カードの絵（きせかえを着た うちのこ＋おへや＋季節のわく。
     写真と文字は入れない）を PNG にして見本を出し、「おくる」で POST /card（サーバーが Storage に1年おく。1人1日3まい）→ liff.shareTargetPicker()。 */
const LINE_CFG = {
  sdk:'https://static.line-scdn.net/liff/edge/2/sdk.js',  /* エッジパス：v2 の最新版が自動で入る（古い版に固定しない） */
  /* LINEミニアプリの内部チャネル（本番用・審査用・開発用）ごとの LIFF ID（秘密ではない。前の数字がチャネルID）。
     build.sh が 同じページを3か所に置き、ひらいた場所でえらぶ：本番用＝/、審査用＝/review/、開発用＝/dev/
     （LINE Developers の「ウェブアプリ設定」の エンドポイントURL と そろえる）。空なら その場所では LIFF を使わない */
  liffIds:{ prod:'2012410265-PutgsCLS', review:'2012410264-JD4WhzAb', dev:'2012410263-cuCI7vQS' },
  liffId:'',   /* この画面で使う LIFF ID（下の LINE_CH で きまる） */
  initTimeout:10000,  /* LIFF の初期化を待つ上限（ミリ秒） */
  api:'https://ftakgswltcavwixqxpzi.supabase.co/functions/v1/api',  /* 空ならサーバーを使わない（CSP の connect-src にも同じホスト） */
  apiTimeout:15000,
  aiTimeout:50000,  /* AIの読みとりを待つ上限（サーバーは45秒で あきらめる） */
  aiSide:768,       /* AIに送る写真の 長いほうの辺（px） */
  aiQuality:.8,
  /* うちのこカード：トークの「あそぶ」ボタンと下の行は、どこ（開発用・審査用）から送っても 本番用の LIFF URL。
     下の行の アイコンは LINEミニアプリの アイコン（build.sh が src/icons/line-icon-130.png を いちばん上に置く） */
  cardIcon:'https://uchinoko-biyori.pages.dev/line-icon.png',
  cardTimeout:30000,
  cardMax:1990000,  /* POST /card に送る data URL の長さの上限（サーバーは PNG 1.5MB まで） */
  reopenGap:10 * 60e3,  /* IDトークンが切れたときに LIFF URL から ひらきなおすのは、この間に1回まで（くりかえさない） */
  reopenWait:8000,      /* ひらきなおすとき、ページが うつるのを まつ上限（うつらなければ「つながれません」にする） */
};
LINE_CFG.shareUrl = 'https://miniapp.line.me/' + LINE_CFG.liffIds.prod;
/* この画面が どの内部チャネルのものか（ひらいた場所の さいしょのフォルダ。/dev/ と /review/ のほかは本番用） */
const LINE_CH = (/^\/(dev|review)(?:\/|$)/.exec(location.pathname) || [0, 'prod'])[1];
LINE_CFG.liffId = LINE_CFG.liffIds[LINE_CH] || '';
const LINE_OWNER_KEY = 'uchinoko-biyori:line-owner';  /* この端末のセーブが、どの会員のものか（サーバーの会員ID） */
const LINE_GUEST_KEY = 'uchinoko-biyori:line-guest';  /* LINEの子と入れかわった、この端末にいた子（消さずにとっておく） */
const LINE_LEFT_KEY = 'uchinoko-biyori:line-left';    /* やめた（LINEの データを けした）会員ID。line-owner が これと同じなら、この端末の子は ゲスト */
const LINE_REOPEN_KEY = 'uchinoko-biyori:line-reopen';  /* さいごに LIFF URL から ひらきなおした時刻（くりかえさないため） */
/* サーバーが IDトークンを ことわった合図（切れている・たしかめられない・とれない） */
const LINE_TOKEN_ERR = new Set(['expired', 'badtoken', 'notoken']);
/* 合図の なかま：プロフィールの1行は 英語の合図を出さずに、やさしい ことばにする（合図は data-why に のこす） */
function lineWhyKind(code){
  if (code === 'expired') return 'expired';
  if (LINE_TOKEN_ERR.has(code)) return 'token';
  if (code === 'unavailable' || code === 'cancelled' || code === 'server' || /^http5/.test(String(code))) return 'net';
  return 'other';
}

/* プライバシーポリシーと利用規約（サイトの いちばん上の /privacy.html・/terms.html。build.sh が src/legal/ から作る。
   審査用・開発用の画面〈/review/・/dev/〉からも 同じページ）と、
   おといあわせ（Googleフォーム。build.sh の CONTACT）。
   LINEの中では LINEのブラウザで上に ひらく（うちのこ日和の画面は そのまま）。LINEの外では べつのタブ */
const LineDocs = {
  on:typeof LINE_DOCS !== 'undefined' && LINE_DOCS === true,   /* build.sh が お問い合わせ先を入れたときだけ ページがある */
  url(name){
    if (name === 'contact') return typeof LINE_CONTACT === 'string' ? LINE_CONTACT : '';
    return new URL('/' + name + '.html', location.href).href;
  },
  open(name){
    const url = this.url(name);
    if (!url) return;
    try {
      if (window.liff && LineApp.state === 'ready' && LineApp.inClient && typeof liff.openWindow === 'function'){ liff.openWindow({ url, external:false }); return; }
    } catch(e){}
    window.open(url, '_blank', 'noopener');
  },
  links(){
    const p = document.createElement('p');
    p.className = 'line-docs';
    for (const [name, label] of [['privacy', 'プライバシーポリシー'], ['terms', '利用規約'], ['contact', 'おといあわせ']]){
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
    d.lineCh = LINE_CH;   /* どの内部チャネルの画面か（prod・review・dev） */
    if (this.inClient) d.lineClient = '1';
    if (LineSync.state !== 'off') d.lineServer = LineSync.state;
    this.paint();
  },
  /* プロフィールのシートに出す1行（LIFF ID がないときは出さない）。つながれない理由は やさしい ことばで（英語の合図は whyCode() で data-why に） */
  statusText(){
    const own = !!LineSync.owner();
    switch (this.state){
      case 'loading': return 'LINEに つないでいます…';
      case 'ready':
        if (!this.inClient) return own ? 'LINEの外で ひらいています。LINEに ほぞんしている子は、LINEの中で おせわできます'
          : 'LINEの外で ひらいています。ゲストとして あそべます';
        if (LineSync.state === 'left') return 'LINEの データを けしました。この端末で ゲストとして あそべます';
        if (LineSync.state === 'connecting') return 'LINEと つながっています（サーバーに つないでいます…）';
        if (LineSync.state === 'failed'){
          if (LineSync.error === 'later') return `LINEと つながっています。${S ? S.pet.name : 'この子'}は まだ この端末だけに います。つぎに ひらいたとき、LINEに つれてくるか また ききます`;
          const k = lineWhyKind(LineSync.error);
          if (k === 'expired' || k === 'token') return (k === 'expired' ? 'LINEの ログインの じかんが きれました。' : 'LINEの ログインを たしかめられませんでした。')
            + 'ミニアプリを とじて、ひらきなおしてね' + (own ? '（それまで おせわは おやすみ）' : '（それまで この端末に ほぞんします）');
          return 'LINEと つながっています。' + (k === 'net' ? 'サーバーに とどかないので、' : 'サーバーと うまく やりとり できないので、')
            + (own ? 'おせわは つながるまで まってね' : 'この端末に ほぞんしています');
        }
        return 'LINEと つながっています';
      case 'failed': {
        const why = this.error === 'sdk' ? 'LINEの 読みこみに しっぱいしました' : this.error === 'timeout' ? 'LINEの じゅんびが まにあいませんでした' : 'LINEに つながれませんでした';
        return why + (own ? '。ミニアプリを ひらきなおすまで、おせわは まってね' : '。ゲストとして あそべます');
      }
    }
    return '';
  },
  /* プロフィールの1行の うらに のこす 英語の合図（しらべるとき用。画面には出さない） */
  whyCode(){
    if (this.state === 'failed') return this.error || '';
    return this.state === 'ready' && LineSync.state === 'failed' ? LineSync.error || '' : '';
  },
  /* LINE の IDトークンは 1時間で切れ、ページを読みなおすだけでは 新しくならない（LIFF が 前のトークンを とっておくため）。
     そこで LIFF の とっておきを けして（liff.logout）、LIFF URL から ひらきなおし、LINE に 新しいトークンを わたしてもらう。
     くりかえさないように reopenGap に1回まで（端末に時刻を書けないときは しない）。user：押した「もういちど つなぐ」から（間は見ない）。
     ひらきなおすなら true（ページが うつる） */
  reopen(user = false){
    if (this.state !== 'ready' || !this.inClient || !LINE_CFG.liffId) return false;
    const t = String(Date.now());
    try {
      const last = Number(localStorage.getItem(LINE_REOPEN_KEY)) || 0;
      if (!user && Math.abs(Date.now() - last) < LINE_CFG.reopenGap) return false;
      localStorage.setItem(LINE_REOPEN_KEY, t);
      if (!user && localStorage.getItem(LINE_REOPEN_KEY) !== t) return false;
    } catch(e){ if (!user) return false; }
    try { if (window.liff && typeof liff.logout === 'function') liff.logout(); } catch(e){}
    location.href = 'https://miniapp.line.me/' + LINE_CFG.liffId;
    return true;
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
        p.textContent = (LINE_CH === 'dev' ? '［開発用］' : '') + text;   /* 開発用の画面だと わかるように（本番用・審査用には出さない） */
        p.dataset.why = this.whyCode();
      }
      /* うちのこカード：サーバーに つながっていて、この LINE で シェアが使えるときだけ。「引っこし・バックアップ」の上に */
      const mv = sh.querySelector('#menuBtns #mMove');
      let cb = sh.querySelector('#mCard');
      if (!(mv && LineCard.available())){ if (cb) cb.remove(); }
      else if (!cb){
        cb = document.createElement('button');
        cb.type = 'button'; cb.className = 'btn'; cb.id = 'mCard'; cb.textContent = 'うちのこカードを おくる';
        cb.addEventListener('click', () => LineCard.start());
        mv.insertAdjacentElement('beforebegin', cb);
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
        ? 'えらんだ写真は、AIで 読みとるか きいてから つかいます。AIを使わないときは、この端末の中で 毛の色を ひろうだけで、どこにも 送りません。お部屋には 小さな サムネイルを 飾ります。'
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
  card:null,          /* うちのこカード：{ on, left, perDay }（サーバーが数える） */
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
    let idToken = null, r;
    try { idToken = window.liff && liff.getIDToken ? liff.getIDToken() : null; } catch(e){}
    try {
      if (!idToken) throw lineErr('notoken');
      this.token = null;
      r = await this.call('POST', '/login', { idToken }, false);
    } catch(e){
      /* IDトークンが 切れている・たしかめられない：LIFF URL から 1回だけ ひらきなおす（ページが うつるまで まつ） */
      if (LINE_TOKEN_ERR.has(e.code) && LineApp.reopen()) await sleep(LINE_CFG.reopenWait);
      throw e;
    }
    if (!r || typeof r.token !== 'string' || !r.member || typeof r.member.id !== 'string') throw lineErr('badreply');
    this.token = r.token; this.member = r.member.id; this.importable = !!r.member.importable;
    this.ai = lineAiStatus(r.ai);
    this.card = lineAiStatus(r.card);
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
    LineServer.token = null; LineServer.member = null; LineServer.ai = null; LineServer.card = null; LineServer.importable = false;
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
    /* IDトークンが 切れていたら、同じトークンで つなぎなおしても とおらないので、LIFF URL から ひらきなおす（押したときだけ。間は見ない） */
    if (this.state === 'failed' && LINE_TOKEN_ERR.has(this.error) && LineApp.reopen(true)) return;
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
          <p>この端末の ${esc(g.pet.name)}（なかよしLv ${lv}）は、LINEへの 引っこし（1回だけ）を もう つかったので、つれてこられません。${esc(g.pet.name)}は この端末に とっておきます。</p>
          <button class="btn primary" type="button" data-close>わかった</button>`) });
    } else {
      while (v == null){
        v = await Modal.show({ label:'この端末の子',
          html:() => this.guestHtml(g, `<h3>この端末の ${esc(g.pet.name)}を<br>LINEに つれてくる？</h3>
            <p>LINEには まだ 子がいません。${esc(g.pet.name)}（なかよしLv ${lv}）を つれてこられるのは 1回だけです（引っこしコードと あわせて）。やめておくと、あたらしい子を むかえます。${esc(g.pet.name)}は この端末に とっておきます。</p>
            <div class="btnrow"><button class="btn" type="button" data-close="no">やめておく</button><button class="btn primary" type="button" data-close="take">つれてくる</button></div>`) });
      }
      while (v === 'take'){
        try { return await this.bring(g); }
        catch(e){
          if (e.code === 'already'){ LineServer.importable = false; toast('つれてこられるのは 1回だけでした。あたらしい子を むかえてね'); break; }
          if (this.refusal(e)){ toast(`${g.pet.name}は つれてこられませんでした。あたらしい子を むかえてね`); break; }
          /* 通信の失敗：新しい子を むりに むかえさせない（この端末の子は そのまま） */
          v = await Modal.show({ label:'つれてこられませんでした',
            html:() => this.guestHtml(g, `<h3>${esc(g.pet.name)}を<br>つれてこられませんでした</h3>
              <p>サーバーに とどきませんでした。${esc(g.pet.name)}は この端末に いるので、あんしんしてね。</p>
              <div class="btnrow"><button class="btn" type="button" data-close="later">あとで</button><button class="btn primary" type="button" data-close="take">もういちど ためす</button></div>`) });
          if (v !== 'take'){ this.later(); toast('つぎに ひらいたとき また きくね'); return; }
        }
      }
    }
    S = null;
    Onboard.openNew(false);
  },
  /* 「あとで」：この回は この端末の子のまま、この端末だけで あそぶ（LINEには まだ 入れない）。つぎに ひらいたとき また きく */
  later(){
    this.error = 'later';
    if (Persist.ref === ServerRef){ Persist.ref = null; Persist.mode = 'local'; }
    Act.remote = null;
    this.setState('failed');
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
      <p class="note">写真は この端末で 小さくしてから、うちのこ日和の サーバーを通して AI（Anthropic の Claude）に 送ります。読みとったら すぐに すてて、サーバーには のこしません。AIを 使わないときは、写真は この端末の中だけで つかいます。${LineDocs.on ? '<button class="linkbtn inline" type="button" id="aiPolicy">くわしく（プライバシーポリシー）</button>' : ''}</p>
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
    self.addEventListener('click', () => ob.fromPhotoOnly(img, '写真から 毛の色を ひろいました。犬か猫と 種類を えらんで、色を 近づけてね。'));
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
      if (!out) return photoOnly('うまく 読みとれませんでした。種類と 色を えらんでね。');
      if (out.species === 'other') return ob.welcome('犬か猫が 写っている 写真を えらんでね。顔が はっきり 写っている 写真が おすすめです。');
      ob.draft = { look:out.look, name:'', photo:img.thumb, preview:img.preview, colorName:out.colorName, cands:out.cands, comment:out.comment, note:'', keepColors:true, photoMain:null };
      return ob.edit();
    }
    if (r.why === 'refused' || r.why === 'badimage') return ob.welcome('この写真は 読みとれませんでした。ちがう 写真で ためしてね。');
    const per = LineServer.ai && LineServer.ai.perDay;
    photoOnly({
      limit:`きょうの AIの読みとりは つかいきりました${per ? `（1日${per}回まで）` : ''}。写真の色で 仮の見た目を つくったので、種類を えらんでね。`,
      busy:'きょうは AIの読みとりが いっぱいに なりました。写真の色で 仮の見た目を つくったので、種類を えらんでね。',
      off:'いまは AIの読みとりを おやすみしています。写真の色で 仮の見た目を つくったので、種類を えらんでね。',
    }[r.why] || 'うまく 読みとれませんでした。写真の色で 仮の見た目を つくったので、種類を えらぶか、すこし あとで ためしてね。');
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

/* ----- うちのこカード（LINEの中で、サーバーに つながっているときだけ） -----
   カードの絵：たて長（768×1024）。うちのこ（きせかえを着て、にっこり）＋その子の おへや（かべ・ゆか・ラグ）＋季節のわく
   （イベント中は ガーランドと置きもの、ほかは 春・夏・秋・冬の小もの）。写真と文字は入れない（名前などは Flex Message の本文）。
   SVG → キャンバス → PNG。画像の中では ページの CSS が効かないので、表情は SVG の中の <style> で きめる。
   トークに送るのは LINEミニアプリの「カスタムシェアメッセージ」の標準タイプ（バブル1つ、ヒーローに絵、本文、ボタン、アイコンの行） */
const CARD_W = 768, CARD_H = 1024, CARD_M = 52;
const CARD_FRAME = {   /* わくの色・わくの水玉・（おへやの背景は その子の おへや） */
  spring:{ frame:'#F6C5D1', dot:'#FBE0E7' }, summer:{ frame:'#8ED2E6', dot:'#BDE6F2' },
  autumn:{ frame:'#EEB27C', dot:'#F6CFA8' }, winter:{ frame:'#A8C3EA', dot:'#CADAF3' },
  newyear:{ frame:'#F2B3B0', dot:'#F8D3D1' }, valentine:{ frame:'#F5B3C6', dot:'#FAD3DE' }, sakura:{ frame:'#F6C5D1', dot:'#FBE0E7' },
  kodomo:{ frame:'#A9C7EF', dot:'#CBDCF5' }, tsuyu:{ frame:'#B7BFEC', dot:'#D3D8F4' }, tanabata:{ frame:'#9FB0E4', dot:'#C2CDEE' },
  tsukimi:{ frame:'#D9C68E', dot:'#E9DDB6' }, halloween:{ frame:'#B89BD9', dot:'#D2C1EA' }, christmas:{ frame:'#9CCB98', dot:'#C2E0BF' },
};
const CardArt = {
  /* 季節の小もの（0,0 が まんなか、だいたい 100 の大きさ） */
  sakura(){
    let s = '';
    for (let i = 0; i < 5; i++) s += `<ellipse cx="0" cy="-22" rx="15" ry="22" fill="#FBD9E2" stroke="#E39AB0" stroke-width="3" transform="rotate(${i * 72})"/>`;
    return s + '<circle r="9" fill="#F5C04A"/><circle r="4" fill="#E8869E"/>';
  },
  petal(){ return '<path d="M0 -14C10 -8 10 8 0 14C-6 6 -6 -6 0 -14z" fill="#F9C6D3" stroke="#E39AB0" stroke-width="2"/>'; },
  sunflower(){
    let s = '';
    for (let i = 0; i < 12; i++) s += `<ellipse cx="0" cy="-30" rx="9" ry="18" fill="#F7CF4A" stroke="#D9A83A" stroke-width="2.4" transform="rotate(${i * 30})"/>`;
    return s + '<circle r="20" fill="#9A6A3E" stroke="#6E4A2A" stroke-width="3"/><circle cx="-6" cy="-5" r="2.4" fill="#6E4A2A"/><circle cx="6" cy="2" r="2.4" fill="#6E4A2A"/><circle cx="-2" cy="8" r="2.4" fill="#6E4A2A"/>';
  },
  bubble(){ return '<circle r="13" fill="rgba(255,255,255,.35)" stroke="#FFFFFF" stroke-width="3.4"/><path d="M-6 -4a7 7 0 0 1 6-5" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/>'; },
  maple(c, k){
    return `<path d="M0 46V20" stroke="${k}" stroke-width="4" stroke-linecap="round"/><path d="M0 -46L10 -22L28 -32L22 -10L44 -12L32 4L42 14L14 14L16 32L4 26L0 34L-4 26L-16 32L-14 14L-42 14L-32 4L-44 -12L-22 -10L-28 -32L-10 -22Z" fill="${c}" stroke="${k}" stroke-width="3.4" stroke-linejoin="round"/><path d="M0 26V-30M0 4L26 -6M0 4L-26 -6" stroke="${k}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".7"/>`;
  },
  acorn(){ return '<ellipse cx="0" cy="8" rx="17" ry="21" fill="#C98A52" stroke="#8B5A3C" stroke-width="3"/><path d="M-21 -2C-21 -18 21 -18 21 -2C14 2 -14 2 -21 -2z" fill="#7A5233" stroke="#5A3A24" stroke-width="3" stroke-linejoin="round"/><path d="M0 -14V-24" stroke="#5A3A24" stroke-width="4" stroke-linecap="round"/><ellipse cx="-6" cy="8" rx="4" ry="8" fill="#FFFFFF" opacity=".35"/>'; },
  flake(){
    let s = '';
    for (let i = 0; i < 6; i++) s += `<g transform="rotate(${i * 60})"><path d="M0 0V-34M0 -20L-9 -29M0 -20L9 -29M0 -10L-6 -16M0 -10L6 -16" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none"/></g>`;
    return s + '<circle r="5" fill="#FFFFFF"/>';
  },
  dot(c, r){ return `<circle r="${r}" fill="${c}"/>`; },
  star(c){ return `<path d="M0 -16L4.6 -5.4L16 -4.6L7.4 3L10 14.6L0 8.6L-10 14.6L-7.4 3L-16 -4.6L-4.6 -5.4Z" fill="${c}"/>`; },
  heart(c){ return `<path d="M0 14C-16 4 -18 -6 -12 -11C-7 -15 -2 -13 0 -9C2 -13 7 -15 12 -11C18 -6 16 4 0 14Z" fill="${c}"/>`; },
  at(x, y, sc, rot, svg){ return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})">${svg}</g>`; },
  /* わくの4すみに 季節の小もの */
  corners(season, W, H){
    const A = this.at.bind(this);
    if (season === 'spring') return [
      A(70, 74, 1.25, 10, this.sakura()), A(150, 46, .7, -20, this.sakura()), A(40, 160, .55, 0, this.petal()),
      A(W - 66, 80, 1.05, -14, this.sakura()), A(W - 150, 40, .9, 30, this.petal()),
      A(66, H - 70, .95, 20, this.sakura()), A(150, H - 34, .9, -40, this.petal()),
      A(W - 74, H - 76, 1.3, -6, this.sakura()), A(W - 160, H - 40, .6, 12, this.sakura()), A(W - 36, H - 170, .9, 60, this.petal()),
    ].join('');
    if (season === 'summer') return [
      A(76, 78, 1.15, 0, this.sunflower()), A(158, 40, .9, 0, this.bubble()), A(40, 168, .8, 0, this.bubble()),
      A(W - 70, 70, .8, 0, this.sunflower()), A(W - 150, 36, .7, 0, this.bubble()),
      A(56, H - 64, .75, 0, this.sunflower()), A(140, H - 32, .9, 0, this.bubble()),
      A(W - 78, H - 80, 1.2, 0, this.sunflower()), A(W - 34, H - 180, .8, 0, this.bubble()), A(W - 170, H - 36, .6, 0, this.bubble()),
    ].join('');
    if (season === 'autumn'){
      const red = this.maple('#E8613C', '#B33F22'), orange = this.maple('#F0A04B', '#B86A22'), yellow = this.maple('#E2B23A', '#A87E1C');
      return [
        A(74, 76, 1.2, -18, red), A(160, 40, .7, 24, yellow), A(38, 170, .75, 0, this.acorn()),
        A(W - 70, 74, .95, 20, orange), A(W - 156, 38, .62, -12, this.acorn()),
        A(64, H - 70, .9, 30, orange), A(150, H - 34, .7, -10, this.acorn()),
        A(W - 76, H - 78, 1.25, 12, red), A(W - 170, H - 38, .62, -30, yellow), A(W - 36, H - 172, .7, 15, this.acorn()),
      ].join('');
    }
    return [
      A(72, 74, 1.2, 8, this.flake()), A(156, 40, .6, -10, this.flake()), A(40, 160, .9, 0, this.dot('#FFFFFF', 7)),
      A(W - 70, 76, .9, -12, this.flake()), A(W - 150, 38, 1, 0, this.star('#FFFFFF')),
      A(64, H - 70, .8, 20, this.flake()), A(150, H - 36, 1, 0, this.dot('#FFFFFF', 6)),
      A(W - 76, H - 78, 1.3, 4, this.flake()), A(W - 168, H - 40, .55, 0, this.flake()), A(W - 36, H - 170, 1, 0, this.star('#FFFFFF')),
    ].join('');
  },
  /* イベントの かざり：上に ガーランド、右下に イベントの置きもの（おへやと同じ絵） */
  eventDeco(ev, x, y, w, h){
    const sd = SEASON_DECOR[ev.decor];
    if (!sd) return '';
    let s = '';
    if (sd.g) s += garland(sd.g[0], sd.g[1]).replace(' class="garland"', '').replace(' aria-hidden="true"', '').replace('<svg ', `<svg x="${x}" y="${y}" width="${w}" height="${Math.round(w * .16)}" `);
    const iw = Math.round(w * .2);
    s += (sd.hang || sd.item).replace('<svg ', `<svg x="${x + w - iw - 18}" y="${y + h - iw - 10}" width="${iw}" height="${iw}" `);
    return s;
  },
  /* その子の おへや（かべ・ゆか・ラグ）。CSS の背景の かわりに SVG の もようで */
  room(st, x, y, w, h, uid){
    const R = st.room || ROOM_DEFAULT;
    const W = findDecor('wall', R.wall), F = findDecor('floor', R.floor), G = findDecor('rug', R.rug);
    const fy = y + Math.round(h * .62);
    const pat = (pw, inner) => `<pattern id="${uid}w" width="${pw}" height="${pw}" patternUnits="userSpaceOnUse">${inner}</pattern>`;
    const wall = W.pat === 'stripe' ? pat(34, `<rect width="14" height="34" fill="${W.pc}"/>`)
      : W.pat === 'check' ? pat(60, `<rect width="30" height="60" fill="${W.pc}"/><rect width="60" height="30" fill="${W.pc}"/>`)
      : W.pat === 'wood' ? pat(46, `<rect width="3" height="46" fill="${W.pc}"/>`)
      : W.pat === 'heart' ? pat(68, `<g transform="translate(20 26)">${this.heart(W.pc)}</g><g transform="translate(54 60) scale(.8)">${this.heart(W.pc)}</g>`)
      : W.pat === 'star' ? pat(92, `<g transform="translate(24 22) scale(.8)">${this.star(W.pc)}</g><circle cx="68" cy="60" r="3" fill="${W.pc}"/><circle cx="52" cy="22" r="2" fill="${W.pc}"/>`)
      : pat(44, `<circle cx="22" cy="22" r="5" fill="${W.pc}"/>`);
    const rx = w * .36, ry = h * .085, cx = x + w / 2, cy = fy + (y + h - fy) * .55;
    const ring = list => list.map(([k, c]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx * k}" ry="${ry * k}" fill="${c}"/>`).join('');
    const rug = G.none ? ''
      : G.stripe ? `<pattern id="${uid}r" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="${G.stripe[1]}"/><rect width="36" height="60" fill="${G.stripe[0]}"/></pattern><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${uid}r)"/>`
      : G.id === 'tricolore' ? ring([[1, '#1F4FA3'], [.86, '#D9272E'], [.76, '#FFFFFF'], [.68, '#1F4FA3']])
      : ring([[1, G.rings[2]], [.63, G.rings[1]], [.58, G.rings[0]]]);
    return { floor:cy, svg:`<defs>${wall}<linearGradient id="${uid}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${F.c1}"/><stop offset="1" stop-color="${F.c2}"/></linearGradient></defs>
      <rect x="${x}" y="${y}" width="${w}" height="${fy - y}" fill="${W.base}"/><rect x="${x}" y="${y}" width="${w}" height="${fy - y}" fill="url(#${uid}w)"/>
      <rect x="${x}" y="${fy}" width="${w}" height="${y + h - fy}" fill="url(#${uid}f)"/><rect x="${x}" y="${fy}" width="${w}" height="6" fill="rgba(0,0,0,.06)"/>${rug}` };
  },
  /* カードの SVG（季節・イベントは ルールの時計の日付。LINEの中では サーバーの日本時間） */
  svg(st){
    const W = CARD_W, H = CARD_H, M = CARD_M;
    const ev = activeEvent(), season = seasonOf();
    const P = (ev && CARD_FRAME[ev.decor]) || CARD_FRAME[season];
    const uid = 'cd' + (++PET_SEQ);
    const ix = M, iy = M, iw = W - M * 2, ih = H - M * 2;
    const room = this.room(st, ix, iy, iw, ih, uid);
    const ps = 640, px = (W - ps) / 2, py = room.floor - ps * 225 / 240;   /* 影（y=225）が ラグの まんなかに */
    const pet = renderPet(st.pet.look, { wear:Rules.wear(st) }).replace(' aria-hidden="true"', '')
      .replace('<svg class="pet-svg"', `<svg x="${px}" y="${py}" width="${ps}" height="${ps}" overflow="visible"`);
    const sparkle = this.at(px + ps * .16, py + ps * .2, 1.4, -14, this.heart('#FF8FAB')) + this.at(px + ps * .86, py + ps * .14, 1, 12, this.heart('#FFB3C6'))
      + this.at(px + ps * .9, py + ps * .4, .9, 0, this.star('#FFD86B'));
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<style>.pv-eyes-open,.pv-eyes-closed,.pv-brow-sad,.pv-mouth-w{display:none}.pv-cheek{opacity:.8}</style>
<defs><pattern id="${uid}d" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="3.2" fill="${P.dot}"/><circle cx="21" cy="21" r="3.2" fill="${P.dot}"/></pattern>
<clipPath id="${uid}c"><rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" rx="34"/></clipPath></defs>
<rect width="${W}" height="${H}" fill="${P.frame}"/><rect width="${W}" height="${H}" fill="url(#${uid}d)"/>
<g clip-path="url(#${uid}c)">${room.svg}${ev ? this.eventDeco(ev, ix, iy + 8, iw, ih) : ''}${pet}${sparkle}</g>
<rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" rx="34" fill="none" stroke="#FFFFFF" stroke-width="10"/>
${ev ? '' : this.corners(season, W, H)}
</svg>`;
  },
  /* SVG を PNG（data URL）に */
  async png(svg, w, h){
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(lineErr('svg')); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    cv.getContext('2d').drawImage(img, 0, 0, w, h);
    return cv.toDataURL('image/png');
  },
};
const LineCard = {
  busy:false,
  /* プロフィールに ボタンを出すか：LINEの中で サーバーに つながり、LINEに 子がいて、カードが休みでなく、この LINE で シェアが使える */
  available(){
    if (LineSync.state !== 'on' || !LineServer.member || LineSync.created == null || !S || !(LineServer.card && LineServer.card.on)) return false;
    try { return !!(window.liff && LineApp.inClient && typeof liff.isApiAvailable === 'function' && liff.isApiAvailable('shareTargetPicker')); }
    catch(e){ return false; }
  },
  async refresh(){
    try { const r = await LineServer.call('GET', '/card'); if (r && r.card) LineServer.card = lineAiStatus(r.card); } catch(e){}
    return LineServer.card;
  },
  /* のこりの枚数（HTML。2行に わけて、ことばの まんなかで 切れないように） */
  leftText(c){
    if (!c || !c.on) return '';
    return c.left > 0 ? `きょうは あと${c.left}まい つくれます<br><small>（1日${c.perDay}まいまで。おなじ絵は かぞえません）</small>`
      : `きょうの分は つかいきりました<br><small>（あすの0時に もどります。まえに おくった絵なら おくれます）</small>`;
  },
  /* この端末で カードの絵を作る（大きすぎたら 小さくして作りなおす） */
  async make(st){
    const svg = CardArt.svg(st);
    let url = await CardArt.png(svg, CARD_W, CARD_H);
    if (url.length > LINE_CFG.cardMax) url = await CardArt.png(svg, CARD_W * 3 / 4, CARD_H * 3 / 4);
    if (!/^data:image\/png;base64,/.test(url) || url.length > LINE_CFG.cardMax) throw lineErr('canvas');
    return url;
  },
  /* トークの本文に書くこと（いまの S から） */
  info(st){
    const L = levelInfo(st.stats.love), si = Rules.streakInfo(st);
    const days = Math.max(1, daysBetween(st.created || now(), now()) + 1);
    return {
      name:cleanText(st.pet.name || 'うちのこ', 40), breed:breedLabel(st.pet),
      love:`Lv ${L.lv}・${titleFor(L.lv)}`,
      days:si.n >= 2 ? ['れんぞく', `${si.n}日`] : ['きてから', `${days}日`],
    };
  },
  /* サーバーが返した 画像の URL か（Storage の公開バケット cards の ランダムな名前だけ） */
  okUrl(u){
    const base = new URL(LINE_CFG.api).origin + '/storage/v1/object/public/cards/';
    return typeof u === 'string' && u.startsWith(base) && /^[A-Za-z0-9_-]{16,64}\.png$/.test(u.slice(base.length));
  },
  /* LINEミニアプリの カスタムシェアメッセージ（標準タイプ）：ヒーローに絵、タイトル＝名前、サブタイトル＝種類、詳細＝なかよし・れんぞく、
     ボタン（本番用をひらく）、下の行（アイコン・名前・矢印）。ここに書いていない プロパティは 変えない（LINE のガイドライン） */
  flex(i, url){
    const row = (k, v) => ({ type:'box', layout:'horizontal', spacing:'sm', flex:1, contents:[
      { type:'text', text:k, size:'sm', color:'#555555', wrap:false, flex:20 },
      { type:'text', text:v, size:'sm', color:'#111111', wrap:false, flex:55 },
    ] });
    return {
      type:'flex', altText:`${i.name}の うちのこカードが とどいたよ`,
      contents:{
        type:'bubble',
        hero:{ type:'image', url, size:'full', aspectMode:'cover', aspectRatio:'3:4' },
        body:{ type:'box', layout:'vertical', spacing:'md', contents:[
          { type:'box', layout:'vertical', spacing:'none', contents:[{ type:'text', text:i.name, size:'lg', color:'#000000', weight:'bold', wrap:true }] },
          { type:'box', layout:'vertical', spacing:'none', contents:[{ type:'text', text:i.breed, size:'sm', color:'#999999', wrap:true }] },
          { type:'box', layout:'vertical', spacing:'sm', margin:'lg', flex:1, contents:[row('なかよし', i.love), row(i.days[0], i.days[1])] },
          { type:'box', layout:'vertical', spacing:'xs', margin:'lg', contents:[
            { type:'button', style:'primary', height:'md', color:'#4FAE9A', action:{ type:'uri', label:'うちのこ日和で あそぶ', uri:LINE_CFG.shareUrl } },
          ] },
        ] },
        footer:{ type:'box', layout:'vertical', contents:[
          { type:'separator', color:'#f0f0f0' },
          { type:'box', layout:'horizontal', flex:1, spacing:'md', margin:'md', contents:[
            { type:'image', url:LINE_CFG.cardIcon, flex:1, gravity:'center' },
            { type:'text', text:'うちのこ日和', flex:19, size:'xs', color:'#999999', weight:'bold', gravity:'center', wrap:false },
            { type:'image', url:'https://vos.line-scdn.net/service-notifier/footer_go_btn.png', flex:1, gravity:'center', size:'xxs',
              action:{ type:'uri', label:'action', uri:LINE_CFG.shareUrl } },
          ] },
        ] },
      },
    };
  },
  async start(){
    if (this.busy || !this.available() || Act.waiting()) return;
    this.busy = true;
    try {
      closeSheet();
      let png;
      try { png = await this.make(S); }
      catch(e){ toast('カードを つくれませんでした'); return; }
      const info = this.info(S);
      const v = await Modal.show({
        label:'うちのこカード', cls:'cardprev',
        html:() => `<div class="cardimg"><img alt="${esc(info.name)}の うちのこカード"></div>
          <h3>うちのこカードを<br>おくる？</h3>
          <p>えらんだ 友だちや グループに、${esc(info.name)}の カードを おくります。</p>
          <p class="cardleft" id="cdLeft" role="status">${this.leftText(LineServer.card)}</p>
          <div class="btnrow"><button class="btn" type="button" data-close>やめておく</button><button class="btn primary" type="button" data-close="send">おくる</button></div>
          <p class="cardnote">カードの絵は うちのこ日和の サーバーに おいて、トークに 出します（URLを 知っている人は 見られます）。さいごに おくってから 1年で けします。${LineDocs.on ? '<button class="linkbtn inline" type="button" id="cdPolicy">くわしく</button>' : ''}</p>`,
        ready:box => {
          box.querySelector('.cardimg img').src = png;
          const left = box.querySelector('#cdLeft');
          this.refresh().then(c => { if (box.isConnected) left.innerHTML = this.leftText(c); });
          if (LineDocs.on) box.querySelector('#cdPolicy').addEventListener('click', () => LineDocs.open('privacy'));
        },
      });
      if (v === 'send') await this.send(png, info);
    } finally { this.busy = false; }
  },
  async send(png, info){
    toast('カードを じゅんびしています…');
    let r;
    try { r = await LineServer.call('POST', '/card', { image:png }, true, { timeout:LINE_CFG.cardTimeout }); }
    catch(e){ r = { ok:false, why:e.code === 'badimage' || e.code === 'nosave' ? e.code : 'unavailable' }; }
    if (!r || typeof r !== 'object') r = { ok:false, why:'unavailable' };
    if (r.card) LineServer.card = lineAiStatus(r.card);
    if (!r.ok || !this.okUrl(r.url)){
      const per = LineServer.card && LineServer.card.perDay;
      toast({
        limit:`きょうの カードは つかいきりました${per ? `（1日${per}まいまで）` : ''}。あすの0時に もどります`,
        off:'いまは カードを おやすみしています',
        badimage:'カードの絵を つくれませんでした',
      }[r.why] || 'いまは カードを おくれませんでした。すこし あとで ためしてね');
      LineApp.paint();
      return;
    }
    let res;
    try { res = await liff.shareTargetPicker([this.flex(info, r.url)], { isMultiple:true }); }
    catch(e){ toast('カードを おくれませんでした。LINEを 新しくしてから ためしてね'); return; }
    if (res && res.status === 'success') toast('カードを おくったよ');
  },
};

/* 写真をえらんだら：AIで読みとれるときは、送る前に きく。読みとれないとき（LINEの外・つながらない・おやすみ）は いままでどおり */
const lineAnalyze = Onboard.analyze;
Onboard.analyze = async function(file){
  if (!LineAI.ready()) return lineAnalyze.call(this, file);
  this.busy = true;
  let img;
  try { img = await prepImage(file); }
  catch(e){ return this.welcome('この写真は 読みこめませんでした。JPEGか PNGの 写真で ためしてね。'); }
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
  LineFrame.paint();   /* サーバーの返事で みためが かわったとき */
};

/* 写真立て：写真の控えがない子（ほかの端末で ひらいた・LINEの保存から きた・写真なしで むかえた）は、
   うちのこの イラスト（きせかえなし、にっこり）を かざる。写真の控えがある端末は いままでどおり写真 */
const LineFrame = {
  paint(){
    const f = document.getElementById('frame');
    if (!f || !S || !S.pet) return;
    let art = f.querySelector('.frame-art');
    if (S.pet.photo){ f.classList.remove('art'); if (art) art.hidden = true; return; }
    if (!art){
      art = document.createElement('div');
      art.className = 'frame-art ex-happy';
      art.setAttribute('aria-hidden', 'true');
      f.appendChild(art);
    }
    const k = JSON.stringify(S.pet.look);
    if (art.dataset.k !== k){ art.innerHTML = renderPet(S.pet.look); art.dataset.k = k; }
    art.hidden = false;
    f.classList.add('art');
    f.hidden = false;
  },
};
const lineRenderHeader = renderHeader;
renderHeader = function(){ lineRenderHeader(); LineFrame.paint(); };
if (Game.started) LineFrame.paint();   /* boot（js_onboard.js）は この前に おへやを出している */

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
