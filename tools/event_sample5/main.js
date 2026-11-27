{
/* 見本 5：あたらしい 季節イベント 4つ（events.js）を、ミニの おへや・はじまりの ポップアップ・プレゼントの 3つの むき で 見せる */
const $ = (s, r = document) => r.querySelector(s);
const st = { kid:'dog', view:{}, pick:{} };
const isCat = () => st.kid === 'cat';
const look = () => isCat() ? breedLook('chatora') : LOOKS.daizu;
const baseWear = () => isCat() ? { neck:'bell_red' } : { neck:'scarf_tri' };
const MD = md => `${Math.floor(md / 100)}/${md % 100}`;
const WEATHER_JA = { leaves:'おちば', snow:'雪', petals:'花びら', rain:'雨' };
const roomBg = (weather) => `<svg class="bg" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><linearGradient id="sky${weather || 'n'}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${weather === 'snow' ? '#B9C6DE' : weather === 'leaves' ? '#F3C9A0' : '#A9D8F2'}"/><stop offset="1" stop-color="${weather === 'snow' ? '#E4ECF6' : weather === 'leaves' ? '#FBE6CF' : '#DDF1FA'}"/></linearGradient></defs>
  <rect width="400" height="250" fill="#F4E9DD"/>
  <g fill="#EBDCCB"><circle cx="200" cy="40" r="3"/><circle cx="280" cy="28" r="3"/><circle cx="360" cy="38" r="3"/><circle cx="240" cy="110" r="3"/><circle cx="330" cy="96" r="3"/></g>
  <rect x="28" y="30" width="104" height="90" rx="14" fill="#FFFFFF"/><rect x="36" y="38" width="88" height="74" rx="9" fill="url(#sky${weather || 'n'})"/>
  <rect x="78" y="38" width="4" height="74" fill="#FFFFFF"/><rect x="36" y="73" width="88" height="4" fill="#FFFFFF"/>
  <rect x="0" y="150" width="400" height="100" fill="#E6CBA5"/><rect x="0" y="146" width="400" height="6" fill="#D9BC94"/>
  <g stroke="#D7B88E" stroke-width="2"><path d="M0 182H400M0 216H400"/><path d="M90 152V182M250 152V182M170 182V216M330 182V216M60 216V250M220 216V250"/></g>
  <ellipse cx="180" cy="214" rx="110" ry="26" fill="#8FAEDF"/><ellipse cx="180" cy="214" rx="86" ry="18" fill="none" stroke="#B9CDEE" stroke-width="5"/>
</svg>`;
const viewsOf = (lk, w) => `<div class="pet-turn"><div class="view-f">${renderPet(lk, { wear:w })}</div><div class="view-s">${renderPetSide(lk, { wear:w })}</div><div class="view-b">${renderPetBack(lk, { wear:w })}</div></div>`;

/* 1年の カレンダー（いまの 10こ と あたらしい 4つ） */
function calendar(){
  const all = EVENTS.map(e => ({ e, add:false })).concat(NEW_EVENTS.map(e => ({ e, add:true }))).sort((a, b) => a.e.from - b.e.from);
  const day = md => { const m = Math.floor(md / 100), d = md % 100; const days = [0,31,59,90,120,151,181,212,243,273,304,334][m - 1]; return days + d - 1; };
  const months = Array.from({ length:12 }, (_, i) => `<span style="left:${(([0,31,59,90,120,151,181,212,243,273,304,334][i]) / 365 * 100).toFixed(2)}%">${i + 1}月</span>`).join('');
  const bars = all.map(({ e, add }) => { const a = day(e.from), b = day(e.to) + 1; return `<i class="${add ? 'add' : ''}" style="left:${(a / 365 * 100).toFixed(2)}%;width:${Math.max(.9, (b - a) / 365 * 100).toFixed(2)}%" title="${e.ja}"></i>`; }).join('');
  const list = all.map(({ e, add }) => `<li class="${add ? 'add' : ''}"><b>${e.ja}</b> ${MD(e.from)}〜${MD(e.to)}${add ? ' <em>あたらしい</em>' : ''}</li>`).join('');
  $('#cal').innerHTML = `<div class="calbar"><div class="months">${months}</div><div class="bars">${bars}</div></div><ul class="callist">${list}</ul>`;
}

const PICK = [['in','いれる'],['out','いらない']];
function card(e){
  const w = WEAR_BY_ID[e.gift], d = NEW_DECOR[e.decor], wt = NEW_WEATHER[e.id];
  st.view[e.id] = st.view[e.id] || 'f'; st.pick[e.id] = st.pick[e.id] || 'in';
  const trial = Object.assign({}, baseWear(), { [w.slot]:w.id });
  const v = st.view[e.id];
  return `<section class="sc" id="ev-${e.id}">
    <div class="sc-h"><h3>${e.ja} <small>${MD(e.from)}〜${MD(e.to)}</small></h3></div>
    <p>プレゼント「<b>${w.ja}</b>」・限定の おやつ「<b>${e.treat.ja}</b>」・おへやの かざり${d.g ? '（ガーランドと おきもの）' : '（おきもの）'}${wt ? `・まどの 外は ${WEATHER_JA[wt]}` : ''}。</p>
    <div class="mroom">${roomBg(wt)}${wt ? `<div class="winw"><div class="weather w-${wt}"></div></div>` : ''}
      ${d.g ? `<div class="gl">${garland2(d.g[0], d.g[1])}</div>` : ''}<div class="evitem">${d.item}</div>
      <div class="pet${v === 's' ? ' view-side' : v === 'b' ? ' view-back' : ''}" style="left:44%;top:84%;--s:1"><div class="pet-floor"><i></i></div><div class="art">${viewsOf(look(), trial)}</div></div>
    </div>
    <div class="row"><span class="opts" data-view="${e.id}">${[['f','正面'],['s','よこ'],['b','うしろ']].map(([k, ja]) => `<button class="opt" type="button" data-v="${k}" aria-pressed="${k === v}">${ja}</button>`).join('')}</span></div>
    <div class="pop"><div class="card"><div class="mpet ex-happy wag-fast">${renderPet(look(), { wear:trial })}</div>
      <b>${e.ja}が はじまったよ！</b><p class="quote">「${e.hello}」</p>
      <p class="small">期間中は おへやが かざりつけされて、限定の おやつ 「<span class="ti"><svg viewBox="0 0 48 48" aria-hidden="true">${treatIcon(e.treat)}</svg></span>${e.treat.ja}」が あげられます。</p>
      <p class="gift">プレゼント「${w.ja}」</p></div></div>
    <div class="row"><span></span><span class="opts" data-pick="${e.id}">${PICK.map(([k, ja]) => `<button class="opt" type="button" data-v="${k}" aria-pressed="${k === st.pick[e.id]}">${ja}</button>`).join('')}</span></div>
  </section>`;
}
function drawAll(){ $('#events').innerHTML = NEW_EVENTS.map(card).join(''); summary(); }
function summary(){
  $('#sumText').value = '【あたらしい 季節イベントで えらんだ もの】\n' + NEW_EVENTS.map(e => `${e.ja}（${MD(e.from)}〜${MD(e.to)}・${WEAR_BY_ID[e.gift].ja}・${e.treat.ja}）：${(PICK.find(([k]) => k === st.pick[e.id]) || [])[1]}`).join('\n');
}
calendar(); drawAll();
document.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  const g = b.parentElement;
  if (g && g.dataset.view){ st.view[g.dataset.view] = b.dataset.v; const sec = $('#ev-' + g.dataset.view); sec.outerHTML = card(NEW_EVENTS.find(x => x.id === g.dataset.view)); return; }
  if (g && g.dataset.pick){ st.pick[g.dataset.pick] = b.dataset.v; g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); summary(); return; }
  if (g && g.dataset.g === 'kid'){ st.kid = b.dataset.v; g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); drawAll(); return; }
});
$('#copy').addEventListener('click', async () => {
  const t = $('#sumText'); let ok = false;
  try { await navigator.clipboard.writeText(t.value); ok = true; } catch(err){ try { t.select(); ok = document.execCommand('copy'); } catch(_){} }
  $('#copied').textContent = ok ? 'コピーしたよ' : 'えらんで コピーしてね';
});
}
