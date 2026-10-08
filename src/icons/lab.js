/* icon lab: composes the two pets into 1024px app-icon candidates */
const DOG = {
  species:'dog', breedId:'pomeranian', ear:'small', coat:'fluffy', muzzle:'short', tail:'plume', face:'lower', legs:'normal',
  colors:{ main:'#F1C890', body:'#F5D9B0', ear:'#EDBE82', tail:'#F7E2C2', face:'#FCF3E6', chest:'#FDF8F1', paws:'#FDF8F1', eye:'#2A1D1A', nose:'#4B3434' },
  marks:{},
};
const CAT = {
  species:'cat', breedId:'chatora', ear:'pointy', coat:'smooth', muzzle:'medium', tail:'long', face:'muzzle', legs:'normal',
  colors:{ main:'#EAA25C', body:'#E59B55', ear:'#E39550', tail:'#E59B55', face:'#FCF6EE', chest:'#FBEFE0', paws:'#EAA25C', eye:'#CFA548', nose:'#EE9EA2' },
  marks:{ stripes:'#C27232' },
};
const CSS = `
.pet-svg{display:block;overflow:visible}
.pet-svg .pv-eyes-happy,.pet-svg .pv-eyes-closed,.pet-svg .pv-brow-sad,.pet-svg .pv-mouth-o{display:none}
.pet-svg .pv-cheek{opacity:.5}
.x-happy .pv-eyes-open,.x-sleep .pv-eyes-open{display:none}
.x-happy .pv-eyes-happy{display:inline}
.x-sleep .pv-eyes-closed{display:inline}
.x-open .pv-mouth-w,.x-happy .pv-mouth-w{display:none}
.x-open .pv-mouth-o,.x-happy .pv-mouth-o{display:inline}
.x-happy .pv-cheek,.x-open .pv-cheek{opacity:.75}
.pv-head,.pv-body,.pv-neck,.pv-tail{transform-box:view-box}
.x-sleep .pv-legs{opacity:0}
.x-sleep .pv-body{transform-origin:120px 222px;transform:scaleY(.8)}
.x-sleep .pv-head{transform-origin:120px 146px;transform:translate(0,22px) rotate(-7deg)}
.x-sleep .pv-neck{transform-origin:120px 146px;transform:translate(0,21px) rotate(-7deg)}
.x-sleep .pv-tail{transform-origin:152px 198px;transform:translate(-8px,12px) rotate(30deg)}
.x-flip .pet-svg{transform:scaleX(-1)}
.x-notail .pv-tail{display:none}
.icon{position:relative;width:1024px;height:1024px;overflow:hidden}
.p{position:absolute}
`;
const HEART = c => `<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.6 6.6 4.6c2.2 0 3.6 1.2 4.4 2.5.8-1.3 2.2-2.5 4.4-2.5 3.6 0 5.7 3.8 4.2 7.2C19.5 16.4 12 21 12 21z" fill="${c}"/></svg>`;
// place a pet: x,y = top-left of the 240-unit box in px, size = rendered px of the 240 box
function pet(look, x, y, size, cls = '', wear = null){
  return `<div class="p ${cls}" style="left:${x}px;top:${y}px;width:${size}px;height:${size}px">${renderPet(look, { wear })}</div>`;
}
const dots = (bg, dot, gap = 64, r = 7) => `background:radial-gradient(${dot} ${r}px,transparent ${r + 1.5}px) 0 0/${gap}px ${gap}px,${bg}`;

const ICONS = {
  /* A: cheek to cheek close-up on the app's mint wall */
  A(){
    return `<div class="icon" style="${dots('#DCEFE7', 'rgba(255,255,255,.75)')}">
      ${pet(DOG, -118, 150, 840, 'x-open x-flip')}
      ${pet(CAT, 302, 150, 840, '')}
      <div class="p" style="left:457px;top:120px;width:110px;height:110px">${HEART('#F07592')}</div>
    </div>`;
  },
  /* B: the little room — both sitting on the rug */
  B(){
    return `<div class="icon" style="background:linear-gradient(#FBE5D8 0 58%,#FFFFFF 58% 59.6%,#EACFA6 59.6%)">
      <div class="p" style="inset:0 0 42% 0;${dots('transparent', 'rgba(255,255,255,.7)', 56, 6)}"></div>
      <div class="p" style="left:70px;top:90px;width:250px;height:300px;box-sizing:border-box;border:22px solid #FFFFFF;border-radius:46px 46px 18px 18px;background:linear-gradient(#9ED2F4,#DDF2FF);overflow:hidden">
        <div class="p" style="right:28px;top:28px;width:70px;height:70px;border-radius:50%;background:#FFE6A1"></div>
        <div class="p" style="left:50%;top:0;bottom:0;width:16px;margin-left:-8px;background:#FFFFFF"></div>
        <div class="p" style="top:50%;left:0;right:0;height:16px;margin-top:-8px;background:#FFFFFF"></div>
      </div>
      <div class="p" style="left:512px;top:880px;width:900px;height:250px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(ellipse closest-side,#CFDDF5 0 58%,#FFFFFF 58% 63%,#B9CBEF 63% 100%)"></div>
      ${pet(DOG, -20, 300, 620, 'x-open x-flip')}
      ${pet(CAT, 420, 312, 600, '')}
    </div>`;
  },
  /* C: peeking up over the edge */
  C(){
    return `<div class="icon" style="background:#FBD9A6">
      <div class="p" style="left:452px;top:140px;width:120px;height:120px">${HEART('#F07592')}</div>
      ${pet(DOG, -158, 205, 900, 'x-happy x-flip x-notail')}
      ${pet(CAT, 282, 196, 900, 'x-notail')}
      <div class="p" style="left:0;right:0;top:770px;bottom:0;background:#1F4FA3"></div>
      <div class="p" style="left:0;right:0;top:770px;height:24px;background:#FFFFFF"></div>
      <div class="p" style="left:0;right:0;top:794px;height:22px;background:#D9272E"></div>
      <div class="p" style="left:0;right:0;top:816px;height:10px;background:#173E85"></div>
      <div class="p" style="left:0;right:0;top:900px;height:16px;background:repeating-linear-gradient(90deg,#FFFFFF 0 36px,transparent 36px 72px);opacity:.5"></div>
      ${[[190,752],[318,752],[612,752],[740,752]].map(([x, y]) => `<div class="p" style="left:${x}px;top:${y}px;width:96px;height:62px;border-radius:48px 48px 30px 30px;background:${x < 500 ? '#FDF8F1' : '#EAA25C'};box-shadow:0 0 0 6px ${x < 500 ? '#C8B49A' : '#A8693A'}"></div>`).join('')}
    </div>`;
  },
  /* D: nap time on the pink cushion */
  D(){
    return `<div class="icon" style="background:linear-gradient(#3B4378,#5A5F9C)">
      <div class="p" style="inset:0;background:radial-gradient(#FFFFFF 3px,transparent 4px) 30px 40px/110px 96px,radial-gradient(#FFFFFF 2px,transparent 3px) 80px 10px/140px 120px;opacity:.6"></div>
      <div class="p" style="right:120px;top:110px;width:150px;height:150px;border-radius:50%;box-shadow:inset 38px -14px 0 0 #F6F0C8"></div>
      <div class="p" style="left:512px;top:770px;width:940px;height:420px;transform:translate(-50%,-50%);border-radius:50%;background:#F3B9C6;box-shadow:0 0 0 14px #C77E91"></div>
      <div class="p" style="left:512px;top:750px;width:700px;height:270px;transform:translate(-50%,-50%);border-radius:50%;background:#F9D6DE"></div>
      ${pet(DOG, 10, 300, 640, 'x-sleep x-flip')}
      ${pet(CAT, 380, 306, 630, 'x-sleep')}
      <div class="p" style="left:470px;top:210px;font:900 92px/1 'Mochiy Pop One',sans-serif;color:#FFFFFF;opacity:.9">z<span style="font-size:64px">z</span></div>
    </div>`;
  },
  /* E: tricolore day — close-up wearing the tricolore scarf */
  E(){
    const scarf = { head:null, face:null, neck:'scarf_tri' };
    return `<div class="icon" style="background:#FFFFFF">
      <div class="p" style="left:0;right:0;top:0;height:340px;background:#1F4FA3"></div>
      <div class="p" style="left:0;right:0;top:340px;height:28px;background:#D9272E"></div>
      ${pet(DOG, -120, 96, 860, 'x-happy x-flip', scarf)}
      ${pet(CAT, 284, 96, 860, '', scarf)}
    </div>`;
  },
};
