
/* ===== LINE版（LINEミニアプリ）だけのしくみ =====
   いまは「入れもの」の段階：セーブはホーム画面版と同じく端末に保存（ゲスト）し、LIFF は準備と判定だけ。
   LIFF が読みこめない・初期化できない・外部ブラウザで開いた、のどれでも、ふつうに遊べるようにする（白い画面にしない）。
   本人確認（IDトークンをサーバーで検証）とサーバー保存は、次の段階で足す。 */
const LINE_CFG = {
  sdk:'https://static.line-scdn.net/liff/edge/2/sdk.js',  /* エッジパス：v2 の最新版が自動で入る（古い版に固定しない） */
  liffId:'2012410263-cuCI7vQS',  /* 開発用の LIFF ID（https://miniapp.line.me/2012410263-cuCI7vQS）。空なら LIFF は使わない */
  initTimeout:10000,  /* LIFF の初期化を待つ上限（ミリ秒） */
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
  },
  /* 見た目の切りかえ用：<html data-line="off|ready|failed" data-line-client="1"> */
  mark(){
    const d = document.documentElement.dataset;
    d.line = this.state;
    if (this.inClient) d.lineClient = '1';
    this.paint();
  },
  /* プロフィールのシートに出す1行（LIFF ID がないときは出さない） */
  statusText(){
    switch (this.state){
      case 'loading': return 'LINEに つないでいます…';
      case 'ready': return this.inClient ? 'LINEと つながっています' : 'LINEの外で ひらいています。ゲストとして あそべます';
      case 'failed': return `LINEに つながれませんでした。ゲストとして あそべます（${this.error}）`;
    }
    return '';
  },
  paint(){
    const sh = document.getElementById('sheet');
    if (!sh || !sh.querySelector('#menuBtns')) return;
    const text = this.statusText();
    let p = sh.querySelector('.line-status');
    if (!text){ if (p) p.remove(); return; }
    if (!p){ p = document.createElement('p'); p.className = 'note line-status'; sh.appendChild(p); }
    p.textContent = text;
  },
};
/* シートが開くたびに（中身が入れかわるたびに）、プロフィールなら1行を足す */
(() => {
  const sh = document.getElementById('sheet');
  if (sh && window.MutationObserver) new MutationObserver(() => LineApp.paint()).observe(sh, { childList:true });
})();
LineApp.init();
