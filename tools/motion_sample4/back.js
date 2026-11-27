/* ===== うしろすがたの うちのこ（docs/MOTION_DESIGN.md 14章。2026-11-27 見本 4＝だんかい 4 の 下書き）=====
   すわった 正面の 絵（renderPet）と 同じ 位置・大きさで、うしろから 見た 絵（くるっと 入れかえても ずれない）。顔は かかない。
   左右は 正面と 反対：正面の 左がわの もよう（patchL・耳の 色）は うしろでは 右がわ。
   41種の 耳（7しゅるい）・しっぽ（6）・毛（ふわふわ・くるくる）・せなかと うしろあたまの もよう（しま・ぶち・サドル・ぶち〈patch〉・てん）を 引きつぐ。
   グループ：pb-all > pb-legs（立つ・あるく ときの うしろ足。ふだんは display="none"）、pb-feet（すわった ときの かかと・前あしの 先）、
   pb-body > pb-body-g（おしり pb-haunchL/R・からだ・せなかの もよう）、pb-ruff、pb-tail > pb-tail-g、
   pb-head > pb-head-g（耳 pb-earL/R・頭・うしろあたまの もよう・かおの きせかえの つる・あたまの きせかえ）、pb-neck（首の きせかえ。頭と しっぽより てまえ＝うなじの 帯が かくれない）。
   きせかえ（wearBack）：首は うなじの 帯（バンダナは むすび目、すずは 金具、マフラーは 端を 1本 せなかへ）、かおは めがねの つる、
   あたまは 正面の 絵を 左右 反対に して（王冠・かぼちゃ・ティアラ・かぶと・はちまき・うさぎのみみ は うしろ用に かいた） */
function renderPetBack(rawLook, opts = {}){
  const L = normalizeLook(rawLook);
  const c = L.colors, m = L.marks, cat = L.species === 'cat';
  const id = 'pb' + (++PET_SEQ);
  const SW = 2.4;
  const ol = col => mix(col, '#3A2A3A', .5);
  const S = col => `fill="${col}" stroke="${ol(col)}" stroke-width="${SW}" stroke-linejoin="round"`;
  const far = col => mix(col, '#3A2A3A', .16);
  const fluffy = L.coat === 'fluffy' || L.coat === 'long', curly = L.coat === 'curly';
  const short = L.legs === 'short';
  const thick = (d, col, w) => `<path d="${d}" fill="none" stroke="${ol(col)}" stroke-width="${w + SW * 2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const HX = 120, HY = 100, hrx = cat ? 62 : 60, hry = cat ? 50 : 51;
  const headD = curly ? blob(HX, HY, hrx, hry, 18, .07) : fluffy ? blob(HX, HY, hrx + 1, hry + 1, 16, .05) : ellD(HX, HY, hrx, hry);
  /* からだ：正面より すこし 上まで（せなかが 見える）。おしりは 正面と 同じ ところ */
  const BX = 120, BY = 178, brx = cat ? 43 : 47, bry = 44;
  const bodyD = curly ? blob(BX, BY, brx, bry, 16, .07) : fluffy ? blob(BX, BY, brx + 1, bry, 14, .05) : ellD(BX, BY, brx, bry);
  /* 左右 反対：うしろの 左（x が 小さい がわ）は 正面の 右（patchR） */
  const pL = m.patchR, pR = m.patchL;

  /* しっぽ（いちばん てまえ。つけねは おしりの まんなか 120,204） */
  let tail = '';
  const tc = c.tail;
  if (L.tail === 'curl'){
    /* まいた しっぽは こしの 上に のる */
    const d = 'M120 204C102 200 98 178 110 168C122 158 142 164 140 180C138 192 122 192 122 182';
    tail = thick(d, tc, 16);
    if (c.tailTip) tail += `<circle cx="122" cy="182" r="8" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'plume'){
    /* ふさふさの しっぽは せなかに ふわっと のる（ポメラニアンなど） */
    tail = `<path d="${blob(126, 172, 30, 25, 13, .08)}" ${S(tc)}/>` +
      `<path d="M112 182q8-12 22-16M120 190q10-10 24-12" fill="none" stroke="${ol(tc)}" stroke-opacity=".35" stroke-width="1.8" stroke-linecap="round"/>`;
    if (c.tailTip) tail += `<path d="${blob(140, 160, 13, 11, 9, .08)}" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'straight'){
    /* まっすぐの しっぽは ゆかに のばす（みぎへ） */
    const d = 'M120 206C134 216 152 222 174 220';
    tail = thick(d, tc, fluffy ? 15 : 12);
    if (c.tailTip) tail += `<circle cx="174" cy="220" r="${fluffy ? 7.5 : 6}" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'stub'){
    tail = `<ellipse cx="120" cy="200" rx="9" ry="8" ${S(tc)}/>`;
  } else {
    /* ながい しっぽ（ねこ）：ゆかを みぎへ まわって さきが 上を むく */
    const d = 'M120 208C140 226 176 228 188 212C193 205 192 196 186 190';
    const w = L.tail === 'fluffy' ? 20 : 13;
    tail = thick(d, tc, w);
    if (m.stripes) tail += `<path d="${d}" fill="none" stroke="${m.stripes}" stroke-width="${w}" stroke-dasharray="5 11" stroke-dashoffset="-8"/>`;
    if (c.tailTip) tail += `<circle cx="186" cy="190" r="${w / 2}" fill="${c.tailTip}"/>`;
  }

  /* おしり・かかと・前あしの 先 */
  const hx1 = cat ? 84 : 80, hx2 = 240 - hx1, hrr = cat ? 19 : 22;
  const haunchCol = m.saddle || c.body;
  const haunch = (x, k) => `<g class="pb-haunch pb-haunch${k}">` + (fluffy || curly ? `<path d="${blob(x, 206, hrr, 16, 9, .07)}" ${S(haunchCol)}/>` : `<ellipse cx="${x}" cy="206" rx="${hrr}" ry="16" ${S(haunchCol)}/>`) + '</g>';
  const feet = `<g class="pb-feet">` +
    `<ellipse cx="108" cy="220" rx="10" ry="5.5" ${S(far(c.paws))}/><ellipse cx="132" cy="220" rx="10" ry="5.5" ${S(far(c.paws))}/>` +
    `<g class="pb-footL"><ellipse cx="${hx1 - 2}" cy="219" rx="12" ry="6.5" ${S(c.paws)}/></g><g class="pb-footR"><ellipse cx="${hx2 + 2}" cy="219" rx="12" ry="6.5" ${S(c.paws)}/></g></g>`;
  /* 立つ・あるく ときの うしろ足（ふだんは 見えない）。おくに 前足 */
  const LT = short ? 198 : 184;
  const standLeg = (x, k) => `<g class="pb-leg pb-leg${k}"><rect x="${x - 10}" y="${LT}" width="20" height="${216 - LT}" rx="10" ${S(haunchCol === c.body ? c.body : haunchCol)}/>` +
    (m.stripes && !short ? `<path d="M${x - 5} ${LT + 12}h10M${x - 5} ${LT + 19}h10" stroke="${m.stripes}" stroke-width="3" stroke-linecap="round"/>` : '') +
    `<ellipse cx="${x}" cy="217" rx="11.5" ry="6.5" ${S(c.paws)}/></g>`;
  const legs = `<g class="pb-legs" display="none">` +
    `<rect x="${103}" y="${LT}" width="15" height="${214 - LT}" rx="7.5" ${S(far(c.body))}/><rect x="${122}" y="${LT}" width="15" height="${214 - LT}" rx="7.5" ${S(far(c.body))}/>` +
    standLeg(97, 'L') + standLeg(143, 'R') + '</g>';

  /* からだと せなかの もよう */
  let body = `<path d="${bodyD}" ${S(c.body)}/><g clip-path="url(#${id}b)">`;
  if (m.saddle) body += `<ellipse cx="120" cy="168" rx="${brx - 4}" ry="34" fill="${m.saddle}"/>`;
  if (m.bodyPatch){
    if (pL) body += `<ellipse cx="94" cy="172" rx="19" ry="15" fill="${pL}"/>`;
    if (pR) body += `<ellipse cx="150" cy="194" rx="16" ry="12" fill="${pR}"/>`;
  }
  if (m.stripes) body += `<path d="M120 140V214" stroke="${m.stripes}" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M120 158q-16 1-30 11M120 158q16 1 30 11M120 176q-19 1-36 12M120 176q19 1 36 12M120 194q-16 1-30 10M120 194q16 1 30 10" fill="none" stroke="${m.stripes}" stroke-width="5" stroke-linecap="round"/>`;
  if (m.spots) body += [[148,166,6],[92,170,5],[99,196,4.5],[141,199,5],[80,186,4],[158,184,3.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${m.spots}"/>`).join('');
  body += `</g><path d="${bodyD}" fill="none" stroke="${ol(c.body)}" stroke-width="${SW}"/>`;

  let ruff = '';
  if (fluffy || curly){
    const big = L.ear === 'small' && fluffy;
    /* うしろの えりまきは からだの 色に むねの 色を すこし（ボーダーコリーなどで 頭と からだの さかいが 見える） */
    const rc = c.chest !== c.body ? mix(c.body, c.chest, .35) : c.body;
    ruff = `<path d="${blob(120, 144, big ? 62 : (cat ? 50 : 54), big ? 32 : 25, 14, .09)}" ${S(rc)}/>`;
  }

  /* 耳（うしろから。左右の 色は 正面と 反対） */
  const backEar = ['pointy','big','small'].includes(L.ear);
  const earLc = (pL && c.ear === c.main) ? pL : c.ear;
  const earRc = (pR && c.ear === c.main) ? pR : c.ear;
  const earBack = col => mix(col, '#FFFFFF', .14);
  let earsBack = '', earsFront = '';
  if (backEar){
    const E = EARS[L.ear];
    /* 耳の うら：ふちの 色を すこし こく、まんなかを すこし あかるく（ふくらみ） */
    earsBack = `<g class="pb-earL"><path d="${E.o}" ${S(earLc)}/><path d="${E.i}" fill="${earBack(earLc)}" opacity=".55"/></g>` +
      `<g class="pb-earR"><g transform="${MIRROR}"><path d="${E.o}" ${S(earRc)}/><path d="${E.i}" fill="${earBack(earRc)}" opacity=".55"/></g></g>`;
  } else {
    const d = (L.ear === 'long' && (curly || fluffy)) ? blob(66, 112, 22, 46, 12, .07) : EARS[L.ear].o;
    earsFront = `<g class="pb-earL"><path d="${d}" ${S(earLc)}/></g><g class="pb-earR"><g transform="${MIRROR}"><path d="${d}" ${S(earRc)}/></g></g>`;
  }

  /* うしろあたまの もよう（顔の もよう〈lower・mask・blaze〉は うしろからは 見えない） */
  let headIn = '';
  if (pL) headIn += `<ellipse cx="90" cy="${HY - 14}" rx="38" ry="36" fill="${pL}"/>`;
  if (pR) headIn += `<ellipse cx="150" cy="${HY - 14}" rx="38" ry="36" fill="${pR}"/>`;
  if (m.stripes) headIn += `<path d="M108 ${HY - 46}l3 15M120 ${HY - 50}v18M132 ${HY - 46}l-3 15M62 ${HY + 2}l14 3M62 ${HY + 14}h13M178 ${HY + 2}l-14 3M178 ${HY + 14}h-13M98 ${HY + 34}q22 9 44 0" fill="none" stroke="${m.stripes}" stroke-width="4.5" stroke-linecap="round"/>`;
  if (m.spots) headIn += [[140,64,4],[100,60,5],[116,72,3.5],[170,94,4],[70,90,4.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${m.spots}"/>`).join('');
  /* うなじの ふわっと した 毛（ふわふわ・ながい 毛の 子） */
  const nape = (fluffy || curly) ? `<path d="M100 ${HY + 40}q6 6 10 0q6 6 10 0q6 6 10 0q6 6 10 0" fill="none" stroke="${ol(c.main)}" stroke-opacity=".3" stroke-width="1.8" stroke-linecap="round"/>` : '';

  const WS = wearBack(wearFrom(opts), { id, SW, HX, HY, hrx, EY:cat ? 97 : 98, ear:L.ear });

  const head = `${earsBack}
    <path d="${headD}" ${S(c.main)}/>
    <g clip-path="url(#${id}h)">${headIn}</g>
    <path d="${headD}" fill="none" stroke="${ol(c.main)}" stroke-width="${SW}"/>
    ${nape}${earsFront}${WS.face}${WS.head}`;

  return `<svg class="pet-svg pet-back pb-t-${L.tail}${cat ? ' pb-cat' : ''}${short ? ' pb-short' : ''}" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <clipPath id="${id}h"><path d="${headD}"/></clipPath>
    <clipPath id="${id}b"><path d="${bodyD}"/></clipPath>
    ${WS.defs}
  </defs>
  <ellipse class="pb-shadow" cx="120" cy="225" rx="62" ry="8" fill="rgba(58,40,60,.16)"/>
  <g class="pb-all">
    ${legs}
    <g class="pb-body"><g class="pb-body-g">${haunch(hx1, 'L')}${haunch(hx2, 'R')}${feet}${body}</g></g>
    ${ruff}
    <g class="pb-tail"><g class="pb-tail-g">${tail}</g></g>
    <g class="pb-head"><g class="pb-head-g">${head}</g></g>
    <g class="pb-neck">${WS.neck}</g>
    ${WS.over}
  </g>
</svg>`;
}

/* うしろから 見た きせかえ。x：id・SW・HX・HY・hrx（頭の よこはば）・EY（目の 高さ）・ear */
function wearBack(W, x){
  const out = { neck:'', face:'', head:'', defs:'', over:'' };
  const SW = x.SW, HX = x.HX, HY = x.HY, EY = x.EY;
  const ink = col => mix(col, '#2A1E2A', .42);
  const band = 'M86 152Q120 168 154 152';
  const bandStroke = (col, w, edge) => `<path d="${band}" fill="none" stroke="${edge || ink(col)}" stroke-width="${w + SW * 2}" stroke-linecap="round"/><path d="${band}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const along = (n) => Array.from({ length:n }, (_, i) => { const t = i / (n - 1), u = 1 - t; return [u * u * 86 + 2 * u * t * 120 + t * t * 154, u * u * 152 + 2 * u * t * 168 + t * t * 152]; });

  /* くび */
  const n = WEAR_BY_ID[W.neck];
  if (n){
    const p = n.p;
    if (n.kind === 'bandana'){
      /* うしろは むすび目と 2本の 先 */
      let fill = p.c;
      if (p.check){ out.defs += `<pattern id="${x.id}ck" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#FFFFFF"/><rect width="4.5" height="9" fill="${p.c}" opacity=".55"/><rect width="9" height="4.5" fill="${p.c}" opacity=".55"/></pattern>`; fill = `url(#${x.id}ck)`; }
      out.neck = bandStroke(p.c, 9) +
        `<path d="M118 162L104 178L112 181ZM122 162L136 178L128 181Z" fill="${fill}" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<ellipse cx="120" cy="161" rx="7" ry="6" fill="${fill}" stroke="${ink(p.c)}" stroke-width="${SW}"/>` +
        (p.d ? [[98,158],[142,158],[110,174],[130,174]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.1" fill="${p.d}"/>`).join('') : '');
    } else if (n.kind === 'bell'){
      /* すずは 前。うしろは 帯と 金具 */
      let col = p.c, edge = ink(p.c);
      if (p.c === 'rainbow'){
        out.defs += `<linearGradient id="${x.id}rb" x1="86" x2="154" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#B8A6EC"/><stop offset=".25" stop-color="#6FABE3"/><stop offset=".5" stop-color="#8CC26A"/><stop offset=".75" stop-color="#F5C562"/><stop offset="1" stop-color="#F27B7B"/></linearGradient>`;
        col = `url(#${x.id}rb)`; edge = '#6B5A7A';
      }
      out.neck = bandStroke(col, 8, edge) +
        `<rect x="114" y="155" width="12" height="10" rx="2.5" fill="${p.b}" stroke="${ink(p.b)}" stroke-width="1.8"/><path d="M120 157v6" stroke="${ink(p.b)}" stroke-width="1.6" stroke-linecap="round"/>`;
    } else if (n.kind === 'bowtie'){
      out.neck = bandStroke(p.c, 5);
    } else if (n.kind === 'scarf'){
      /* 帯と、せなかへ たらした 端（正面の 端と 同じ がわ＝うしろでは 左） */
      const tail = 'M104 158L90 156L84 192L97 195Z';
      const edge = ink(p.c);
      let tailFill = '', bandFill = '';
      if (p.tri){
        const [a1, a2, a3] = p.tri;
        out.defs += `<clipPath id="${x.id}sc"><path d="${tail}"/></clipPath>`;
        tailFill = `<g clip-path="url(#${x.id}sc)">` + Array.from({ length:8 }, (_, i) =>
          `<rect x="78" y="${153 + i * 6}" width="32" height="6" fill="${[a2, a3, a1][i % 3]}" transform="rotate(10 94 ${156 + i * 6})"/>`).join('') + '</g>';
        bandFill = `<path d="${band}" fill="none" stroke="${a2}" stroke-width="14" stroke-dasharray="6 12"/><path d="${band}" fill="none" stroke="${a3}" stroke-width="14" stroke-dasharray="6 12" stroke-dashoffset="-6"/>`;
      }
      out.neck = `<g class="pb-scarf"><path d="${tail}" fill="${p.c}" stroke="${edge}" stroke-width="${SW}" stroke-linejoin="round"/>${tailFill}` +
        `<path d="${tail}" fill="none" stroke="${edge}" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M86 194l-1 6M91 195l0 6M96 196l1 6" stroke="${p.tri ? p.tri[0] : edge}" stroke-width="2.4" stroke-linecap="round"/></g>` +
        `<path d="${band}" fill="none" stroke="${edge}" stroke-width="${14 + SW * 2}" stroke-linecap="round"/><path d="${band}" fill="none" stroke="${p.c}" stroke-width="14" stroke-linecap="round"/>${bandFill}` +
        `<path d="M94 155l2 6M106 159l1 6M134 159l-1 6M146 155l-2 6" stroke="#FFFFFF" stroke-opacity=".18" stroke-width="2" stroke-linecap="round"/>`;
    } else if (n.kind === 'ukiwa'){
      /* うきわは からだの まわり。うしろからも 同じ（しっぽの 上に かさねる） */
      out.over = `<path d="M74 168a46 21 0 1 0 92 0a46 21 0 1 0 -92 0Z" fill="#FFFFFF" stroke="#9AA3B5" stroke-width="${SW}"/>` +
        `<path d="M74 168a46 21 0 0 0 23 18.2L105 174a20 9 0 0 1 -9-6Z" fill="#F27B7B"/><path d="M166 168a46 21 0 0 1 -23 18.2L135 174a20 9 0 0 0 9-6Z" fill="#F27B7B"/>` +
        `<path d="M97 150.2a46 21 0 0 1 46 0L136 161a20 9 0 0 0 -32 0Z" fill="#F27B7B"/>` +
        `<path d="M74 168a46 21 0 1 0 92 0a46 21 0 1 0 -92 0Z" fill="none" stroke="#9AA3B5" stroke-width="${SW}"/>` +
        `<path d="M86 162q6-6 14-8" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity=".8"/>`;
    } else if (n.kind === 'pearls'){
      out.neck = along(9).map(([a, b]) => `<circle cx="${f1(a)}" cy="${f1(b)}" r="4.4" fill="#FBF7F2" stroke="#BFAF9A" stroke-width="1.4"/><circle cx="${f1(a - 1.3)}" cy="${f1(b - 1.5)}" r="1.3" fill="#FFFFFF"/>`).join('');
    } else if (n.kind === 'lei'){
      const cols = ['#F28C8C','#C9B6F2','#FFFFFF','#FFD27A','#F7A9C4'];
      out.neck = along(7).map(([a, b], i) => [0, 72, 144, 216, 288].map(q => { const r = (q - 90) * Math.PI / 180; return `<circle cx="${f1(a + 4.6 * Math.cos(r))}" cy="${f1(b + 4.6 * Math.sin(r))}" r="4.1" fill="${cols[i % cols.length]}" stroke="${ink(cols[i % cols.length])}" stroke-width="1"/>`; }).join('') + `<circle cx="${f1(a)}" cy="${f1(b)}" r="3" fill="#F5C04A"/>`).join('');
    }
  }

  /* かお：めがね・サングラスは つるだけ（頭の よこ） */
  const fw = WEAR_BY_ID[W.face];
  if (fw){
    const p = fw.p, l = HX - x.hrx, r = HX + x.hrx;
    out.face = `<path d="M${l - 1} ${EY - 2}Q${l + 8} ${EY - 8} ${l + 16} ${EY - 16}M${r + 1} ${EY - 2}Q${r - 8} ${EY - 8} ${r - 16} ${EY - 16}" fill="none" stroke="${ink(p.c)}" stroke-width="${3 + SW}" stroke-linecap="round"/>` +
      `<path d="M${l - 1} ${EY - 2}Q${l + 8} ${EY - 8} ${l + 16} ${EY - 16}M${r + 1} ${EY - 2}Q${r - 8} ${EY - 8} ${r - 16} ${EY - 16}" fill="none" stroke="${p.c}" stroke-width="3" stroke-linecap="round"/>`;
  }

  /* あたま */
  const h = WEAR_BY_ID[W.head];
  if (h){
    const p = h.p;
    const mirrorFront = () => {
      const f = wearSvg({ head:W.head, face:null, neck:null }, { id:x.id + 'f', SW, HX, HY, EX:[97, 143], EY, ear:x.ear });
      out.defs += f.defs;
      return `<g transform="${MIRROR}">${f.head}</g>`;
    };
    if (h.kind === 'crown'){
      /* 王冠の うら：宝石は 前なので 見えない */
      const y0 = HY - 44;
      out.head = `<path d="M94 ${y0}L89 ${y0 - 30}L106 ${y0 - 15}L120 ${y0 - 36}L134 ${y0 - 15}L151 ${y0 - 30}L146 ${y0}Z" fill="#EDBE3A" stroke="#A8822A" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<rect x="93" y="${y0 - 6}" width="54" height="9" rx="3" fill="#F2CF66" stroke="#A8822A" stroke-width="${SW}"/>` +
        `<circle cx="89" cy="${y0 - 31}" r="3.4" fill="#FFFFFF"/><circle cx="151" cy="${y0 - 31}" r="3.4" fill="#FFFFFF"/>` +
        (p.gem === 'heart' ? `<circle cx="120" cy="${y0 - 37}" r="3.6" fill="#F0728E"/>` : `<circle cx="120" cy="${y0 - 37}" r="3.4" fill="#FFFFFF"/>`);
    } else if (h.kind === 'pumpkin'){
      /* かぼちゃの うしろ（かおは ない） */
      const y0 = HY - 50;
      out.head = `<path d="M120 ${y0 - 26}c-22 0-34 10-34 22 0 9 14 14 34 14s34-5 34-14c0-12-12-22-34-22z" fill="#F0A04B" stroke="#A8642A" stroke-width="${SW}"/>` +
        `<path d="M120 ${y0 - 25}c-9 6-9 29 0 35M120 ${y0 - 25}c9 6 9 29 0 35M102 ${y0 - 21}c-6 8-6 22 0 28M138 ${y0 - 21}c6 8 6 22 0 28" fill="none" stroke="#C97A30" stroke-width="2"/>` +
        `<path d="M120 ${y0 - 26}c0-8-4-12-9-13" stroke="#5C8A3A" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M112 ${y0 - 36}c-6-4-12-2-13 2 6 3 10 2 13-2z" fill="#7CC26A"/>`;
    } else if (h.kind === 'hachimaki'){
      /* はちまきの むすび目は うしろ。2本の 先が たれる */
      out.head = `<path d="M62 ${HY - 22}Q120 ${HY - 40} 178 ${HY - 22}" fill="none" stroke="#B9373E" stroke-width="${12 + SW * 2}" stroke-linecap="round" opacity=".55"/><path d="M62 ${HY - 22}Q120 ${HY - 40} 178 ${HY - 22}" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>` +
        `<path d="M118 ${HY - 28}l-12 26M122 ${HY - 28}l14 24" stroke="#B9373E" stroke-opacity=".55" stroke-width="${8 + SW * 2}" stroke-linecap="round"/><path d="M118 ${HY - 28}l-12 26M122 ${HY - 28}l14 24" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>` +
        `<ellipse cx="120" cy="${HY - 30}" rx="9" ry="7" fill="#FFFFFF" stroke="#C9A0A3" stroke-width="${SW}"/>`;
    } else if (h.kind === 'usagi'){
      /* うさぎのみみの うら（ピンクは 前） */
      const ear = (cx, rot) => `<g transform="rotate(${rot} ${cx} ${HY - 40})"><ellipse cx="${cx}" cy="${HY - 72}" rx="12" ry="32" fill="#FFFFFF" stroke="#B9B4C2" stroke-width="${SW}"/><path d="M${cx} ${HY - 96}v40" stroke="#E4E0EA" stroke-width="4" stroke-linecap="round"/></g>`;
      out.head = `<path d="M84 ${HY - 34}Q120 ${HY - 56} 156 ${HY - 34}" fill="none" stroke="#B9B4C2" stroke-width="${5 + SW}" stroke-linecap="round" opacity=".6"/><path d="M84 ${HY - 34}Q120 ${HY - 56} 156 ${HY - 34}" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>` +
        ear(106, -12) + ear(134, 12);
    } else if (h.kind === 'tiara'){
      /* ティアラの うら：帯と 山の かげ */
      const y0 = HY - 40;
      out.head = `<path d="M110 ${y0 - 4}L114 ${y0 - 18}L120 ${y0 - 8}L126 ${y0 - 18}L130 ${y0 - 4}" fill="#CDD2E0" stroke="#A9AFC2" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M120 ${y0 - 22}l5 7-5 7-5-7z" fill="#B3A3DE" stroke="#7D6AB0" stroke-width="1.6" stroke-linejoin="round"/>` +
        `<path d="M86 ${y0 + 4}Q120 ${y0 - 16} 154 ${y0 + 4}" fill="none" stroke="#A9AFC2" stroke-width="${5 + SW * 2}" stroke-linecap="round"/><path d="M86 ${y0 + 4}Q120 ${y0 - 16} 154 ${y0 + 4}" fill="none" stroke="#E4E8F2" stroke-width="5" stroke-linecap="round"/>`;
    } else if (h.kind === 'kabuto'){
      /* かぶとの うしろ：ドームと しころ（くびの うしろの たれ）。くわがたの 先が 上に 見える */
      const y0 = HY - 40;
      out.head = `<path d="M104 ${y0 - 18}C96 ${y0 - 44} 108 ${y0 - 52} 112 ${y0 - 52}C110 ${y0 - 40} 112 ${y0 - 28} 116 ${y0 - 20}ZM136 ${y0 - 18}C144 ${y0 - 44} 132 ${y0 - 52} 128 ${y0 - 52}C130 ${y0 - 40} 128 ${y0 - 28} 124 ${y0 - 20}Z" fill="#E2B43A" stroke="#A8822A" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M80 ${y0 + 6}C80 ${y0 - 30} 160 ${y0 - 30} 160 ${y0 + 6}Z" fill="#3E5FA8" stroke="#24386A" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M70 ${y0 + 4}L170 ${y0 + 4}L164 ${y0 + 24}Q120 ${y0 + 32} 76 ${y0 + 24}Z" fill="#5B7FC9" stroke="#24386A" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M74 ${y0 + 14}Q120 ${y0 + 22} 166 ${y0 + 14}" fill="none" stroke="#24386A" stroke-opacity=".45" stroke-width="2"/>`;
    } else if (h.kind === 'straw'){
      /* むぎわらぼうしは 正面と 同じ ＋ リボンの 先が うしろに たれる */
      out.head = mirrorFront() + `<path d="M116 ${HY - 40}l-8 22M124 ${HY - 40}l9 20" stroke="#D9534F" stroke-width="6" stroke-linecap="round"/>`;
    } else {
      /* リボン・花かんむり・ベレー・ニット帽・サンタ・カチューシャ・ヘアピン・あまがさ：正面の 絵を 左右 反対に */
      out.head = mirrorFront();
    }
  }
  return out;
}
