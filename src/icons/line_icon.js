/* LINEミニアプリのアイコン（130×130。1040pxで描いて 1/8 にする）。候補C「ひょっこり」の2匹とトリコロールのふちを、
   LINEの決まり（背景130px、ロゴは54〜90px・おすすめ54〜76px）にあわせて、まんなかの 約76px に。lab.js の pet()・HEART・DOG・CAT を使う */
const LEDGE = (w, top, body = '#1F4FA3') => `
  <div class="p" style="left:0;top:${top}px;width:${w}px;height:150px;background:${body}"></div>
  <div class="p" style="left:0;top:${top}px;width:${w}px;height:26px;background:#FFFFFF"></div>
  <div class="p" style="left:0;top:${top + 26}px;width:${w}px;height:24px;background:#D9272E"></div>
  <div class="p" style="left:0;top:${top + 50}px;width:${w}px;height:10px;background:#173E85"></div>`;
function logo(k, L, T, heart = '#F07592', body){
  const X = 6;   /* ふちの左はし（C の 1024 の座標） */
  const W = 1000;
  const paws = [[190,752],[318,752],[612,752],[740,752]].map(([x, y]) => `<div class="p" style="left:${x - X}px;top:${y}px;width:96px;height:62px;border-radius:48px 48px 30px 30px;background:${x < 500 ? '#FDF8F1' : '#EAA25C'};box-shadow:0 0 0 7px ${x < 500 ? '#C8B49A' : '#A8693A'}"></div>`).join('');
  return `<div class="p" style="left:${L}px;top:${T}px;width:1024px;height:1024px;transform:scale(${k});transform-origin:0 0">
    <div class="p" style="left:452px;top:118px;width:124px;height:124px">${HEART(heart)}</div>
    <div class="p" style="left:${X}px;top:0;width:${W}px;height:920px;overflow:hidden;border-radius:0 0 64px 64px">
      ${pet(DOG, -158 - X, 205, 900, 'x-happy x-flip x-notail')}
      ${pet(CAT, 282 - X, 196, 900, 'x-notail')}
      ${LEDGE(W, 770, body)}
      ${paws}
    </div>
  </div>`;
}
const K = 0.64, SIDE = 1040;
const L0 = SIDE / 2 - 506 * K, T0 = (SIDE - 800 * K) / 2 - 118 * K;
/* オーナーが えらんだのは「クリーム」（2026-11-07。ホーム画面版のアイコンと同じ かべの色） */
const LINE_ICON = () => `<div class="icon130" style="background:#FBD9A6">${logo(K, L0, T0)}</div>`;
