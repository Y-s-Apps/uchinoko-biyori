
/* ===== LINE版（LINEミニアプリ）だけのしくみ =====
   いまは「入れもの」の段階：セーブはホーム画面版と同じく端末に保存（ゲスト）し、LIFF は準備と判定だけ。
   LIFF が読みこめない・初期化できない・外部ブラウザで開いた、のどれでも、ふつうに遊べるようにする（白い画面にしない）。
   本人確認（IDトークンをサーバーで検証）とサーバー保存は、次の段階で足す。 */
const LINE_CFG = {
  liffId:'',          /* LINE Developers の LIFF ID（LINEミニアプリチャネルを作ったら入れる。空なら LIFF は使わない） */
  initTimeout:10000,  /* LIFF の初期化を待つ上限（ミリ秒） */
};
const LineApp = {
  state:'off',        /* off（LIFF IDなし）→ loading → ready ／ failed */
  inClient:false, os:null, error:null,
  /* async で読みこむ LIFF SDK を待つ。読めなければ null */
  sdk(){
    return new Promise(res => {
      if (window.liff) return res(window.liff);
      const s = document.getElementById('liffSdk');
      if (!s) return res(null);
      const done = () => res(window.liff || null);
      s.addEventListener('load', done, { once:true });
      s.addEventListener('error', () => res(null), { once:true });
      setTimeout(done, LINE_CFG.initTimeout);
    });
  },
  async init(){
    if (!LINE_CFG.liffId) return this.mark();
    this.state = 'loading';
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
  },
};
LineApp.init();
