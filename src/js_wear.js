/* ===== outfit drawing (pet viewBox 240) ===== */
function wearSvg(W, x){
  const out = { neck:'', face:'', head:'', defs:'' };
  const SW = x.SW, HY = x.HY, HX = x.HX, EX = x.EX, EY = x.EY;
  const ink = c => mix(c, '#2A1E2A', .42);
  const curvePts = (n, y0 = 148, yc = 166) => Array.from({ length:n }, (_, i) => {
    const t = i / (n - 1), u = 1 - t;
    return [u * u * 86 + 2 * u * t * 120 + t * t * 154, u * u * y0 + 2 * u * t * yc + t * t * y0];
  });
  const flower = (fx, fy, petal, center, r = 4.4) => [0, 72, 144, 216, 288].map(p => {
    const a = (p - 90) * Math.PI / 180;
    return `<circle cx="${f1(fx + r * 1.1 * Math.cos(a))}" cy="${f1(fy + r * 1.1 * Math.sin(a))}" r="${r}" fill="${petal}" stroke="${ink(petal)}" stroke-width="1"/>`;
  }).join('') + `<circle cx="${f1(fx)}" cy="${f1(fy)}" r="${f1(r * .72)}" fill="${center}"/>`;

  /* neck */
  const n = WEAR_BY_ID[W.neck];
  if (n){
    const p = n.p;
    if (n.kind === 'bandana'){
      let fill = p.c;
      if (p.check){
        out.defs += `<pattern id="${x.id}ck" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#FFFFFF"/><rect width="4.5" height="9" fill="${p.c}" opacity=".55"/><rect width="9" height="4.5" fill="${p.c}" opacity=".55"/></pattern>`;
        fill = `url(#${x.id}ck)`;
      }
      out.neck = `<path d="M86 146Q120 160 154 146L127 186Q120 193 113 186Z" fill="${fill}" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/>` +
        (p.d ? [[104,155],[120,162],[136,155],[120,176]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.4" fill="${p.d}"/>`).join('') : '');
    } else if (n.kind === 'bell'){
      const band = 'M86 148Q120 166 154 148';
      let col = p.c, edge = ink(p.c);
      if (p.c === 'rainbow'){
        out.defs += `<linearGradient id="${x.id}rb" x1="86" x2="154" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#F27B7B"/><stop offset=".25" stop-color="#F5C562"/><stop offset=".5" stop-color="#8CC26A"/><stop offset=".75" stop-color="#6FABE3"/><stop offset="1" stop-color="#B8A6EC"/></linearGradient>`;
        col = `url(#${x.id}rb)`; edge = '#6B5A7A';
      }
      out.neck = `<path d="${band}" fill="none" stroke="${edge}" stroke-width="${8 + SW * 2}" stroke-linecap="round"/><path d="${band}" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round"/>` +
        `<path d="M95 152.5l3 1.4M108 156.6l3 .7M129 156.6l3-.7M142 152.5l3-1.4" stroke="#FFFFFF" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>` +
        `<circle cx="120" cy="167" r="9" fill="${p.b}" stroke="${ink(p.b)}" stroke-width="${SW}"/><path d="M113 168h14M120 168v6" stroke="${ink(p.b)}" stroke-width="1.8" stroke-linecap="round"/><circle cx="116.5" cy="163.5" r="2.2" fill="#FFFFFF" opacity=".75"/>`;
    } else if (n.kind === 'bowtie'){
      out.neck = `<path d="M120 158L102 148Q97 158 102 168ZM120 158L138 148Q143 158 138 168Z" fill="${p.c}" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/><rect x="114" y="152" width="12" height="12" rx="4" fill="${mix(p.c, '#FFFFFF', .18)}" stroke="${ink(p.c)}" stroke-width="${SW}"/>`;
    } else if (n.kind === 'scarf'){
      const band = 'M84 148Q120 168 156 148';
      const tail = 'M131 154L145 151L153 188L140 191Z';
      const edge = ink(p.c);
      let tailFill = '', bandFill = '';
      if (p.tri){
        const [a1, a2, a3] = p.tri;
        out.defs += `<clipPath id="${x.id}sc"><path d="${tail}"/></clipPath>`;
        tailFill = `<g clip-path="url(#${x.id}sc)">` + Array.from({ length:8 }, (_, i) =>
          `<rect x="126" y="${150 + i * 6}" width="32" height="6" fill="${[a2, a3, a1][i % 3]}" transform="rotate(-12 140 ${153 + i * 6})"/>`).join('') + '</g>';
        bandFill = `<path d="${band}" fill="none" stroke="${a2}" stroke-width="14" stroke-dasharray="6 12"/><path d="${band}" fill="none" stroke="${a3}" stroke-width="14" stroke-dasharray="6 12" stroke-dashoffset="-6"/>`;
      }
      out.neck = `<path d="${tail}" fill="${p.c}" stroke="${edge}" stroke-width="${SW}" stroke-linejoin="round"/>${tailFill}` +
        `<path d="${tail}" fill="none" stroke="${edge}" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M141 191l-1 6M146 190l0 6M151 189l1 6" stroke="${p.tri ? p.tri[0] : edge}" stroke-width="2.4" stroke-linecap="round"/>` +
        `<path d="${band}" fill="none" stroke="${edge}" stroke-width="${14 + SW * 2}" stroke-linecap="round"/><path d="${band}" fill="none" stroke="${p.c}" stroke-width="14" stroke-linecap="round"/>${bandFill}` +
        `<path d="M92 151l2 6M104 155l1 6M136 155l-1 6M148 151l-2 6" stroke="#FFFFFF" stroke-opacity=".18" stroke-width="2" stroke-linecap="round"/>`;
    } else if (n.kind === 'ukiwa'){
      const ring = 'M80 162a40 15 0 1 0 80 0a40 15 0 1 0 -80 0Z';
      out.defs += `<clipPath id="${x.id}uk"><path d="${ring}"/></clipPath>`;
      out.neck = `<path d="M74 162a46 21 0 1 0 92 0a46 21 0 1 0 -92 0Z" fill="#FFFFFF" stroke="#9AA3B5" stroke-width="${SW}"/>` +
        `<path d="M74 162a46 21 0 0 0 23 18.2L105 168a20 9 0 0 1 -9-6Z" fill="#F27B7B"/><path d="M166 162a46 21 0 0 1 -23 18.2L135 168a20 9 0 0 0 9-6Z" fill="#F27B7B"/>` +
        `<path d="M97 144.2a46 21 0 0 1 46 0L136 155a20 9 0 0 0 -32 0Z" fill="#F27B7B"/>` +
        `<path d="M74 162a46 21 0 1 0 92 0a46 21 0 1 0 -92 0Z" fill="none" stroke="#9AA3B5" stroke-width="${SW}"/>` +
        `<path d="M86 156q6-6 14-8" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity=".8"/>`;
    } else if (n.kind === 'pearls'){
      out.neck = curvePts(11).map(([a, b]) => `<circle cx="${f1(a)}" cy="${f1(b - 2)}" r="4.6" fill="#FBF7F2" stroke="#BFAF9A" stroke-width="1.4"/><circle cx="${f1(a - 1.4)}" cy="${f1(b - 3.6)}" r="1.4" fill="#FFFFFF"/>`).join('') +
        `<circle cx="120" cy="167" r="5.5" fill="#F7C9D6" stroke="#BF8A9C" stroke-width="1.4"/>`;
    } else if (n.kind === 'lei'){
      const cols = ['#F7A9C4','#FFD27A','#FFFFFF','#C9B6F2','#F28C8C'];
      out.neck = curvePts(8).map(([a, b], i) => flower(a, b - 2, cols[i % cols.length], '#F5C04A', 4.2)).join('');
    }
  }

  /* face */
  const fw = WEAR_BY_ID[W.face];
  if (fw){
    const p = fw.p, [L, R] = EX, y = EY;
    const arms = `<path d="M${L - 13} ${y - 3}L${L - 25} ${y - 7}M${R + 13} ${y - 3}L${R + 25} ${y - 7}" stroke="${p.c}" stroke-width="3" stroke-linecap="round"/>`;
    const bridge = `<path d="M${L + 12} ${y - 3}Q120 ${y - 9} ${R - 12} ${y - 3}" fill="none" stroke="${p.c}" stroke-width="3" stroke-linecap="round"/>`;
    if (fw.kind === 'glasses'){
      out.face = arms + bridge + `<g fill="rgba(255,255,255,.2)" stroke="${p.c}" stroke-width="3.2"><circle cx="${L}" cy="${y}" r="13"/><circle cx="${R}" cy="${y}" r="13"/></g>`;
    } else if (fw.kind === 'shades'){
      const lens = cx => p.heart
        ? `<path d="M${cx} ${y + 12}C${cx - 17} ${y + 2} ${cx - 15} ${y - 13} ${cx - 6} ${y - 11}C${cx - 2} ${y - 10} ${cx} ${y - 7} ${cx} ${y - 5}C${cx} ${y - 7} ${cx + 2} ${y - 10} ${cx + 6} ${y - 11}C${cx + 15} ${y - 13} ${cx + 17} ${y + 2} ${cx} ${y + 12}Z" fill="${p.c}" stroke="${ink(p.c)}" stroke-width="2.2" stroke-linejoin="round"/>`
        : `<rect x="${cx - 15}" y="${y - 11}" width="30" height="22" rx="10" fill="${p.c}" stroke="${ink(p.c)}" stroke-width="2.2"/>`;
      out.face = arms + bridge + lens(L) + lens(R) +
        `<path d="M${L - 8} ${y - 5}l5-3M${R - 8} ${y - 5}l5-3" stroke="#FFFFFF" stroke-opacity=".7" stroke-width="2.4" stroke-linecap="round"/>`;
    }
  }

  /* head */
  const h = WEAR_BY_ID[W.head];
  if (h){
    const p = h.p;
    if (h.kind === 'ribbon'){
      const loops = 'M0 0L-17-10Q-22 0-17 10ZM0 0L17-10Q22 0 17 10Z';
      out.head = `<g transform="translate(${x.ear === 'big' ? 134 : 150} ${HY - 44}) rotate(14)"><path d="${loops}" fill="${p.c}" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/>` +
        (p.d ? `<g fill="${p.d}"><circle cx="-12" cy="-3" r="2"/><circle cx="-14" cy="5" r="1.8"/><circle cx="12" cy="-3" r="2"/><circle cx="14" cy="5" r="1.8"/></g>` : '') +
        `<circle cx="0" cy="0" r="5.5" fill="${mix(p.c, '#FFFFFF', .25)}" stroke="${ink(p.c)}" stroke-width="${SW}"/></g>`;
    } else if (h.kind === 'flower'){
      const sets = {
        mix:{ petals:['#F7A9C4','#FFFFFF','#C9B6F2','#FFD27A','#F7A9C4'], center:'#F5C04A' },
        sun:{ petals:['#F7C843','#F7C843','#F7C843','#F7C843','#F7C843'], center:'#8B5A2B' },
        sakura:{ petals:['#F9C6D3','#FBD9E2','#F9C6D3','#FBD9E2','#F9C6D3'], center:'#E8869E' },
      }[p.set] || {};
      out.head = [-150, -125, -100, -75, -50].map((deg, i) => {
        const a = deg * Math.PI / 180;
        const fx = HX + 50 * Math.cos(a), fy = HY + 46 * Math.sin(a) + 2;
        return (i % 2 ? `<ellipse cx="${f1(fx + 7)}" cy="${f1(fy + 3)}" rx="5" ry="2.6" fill="#7CC28F" transform="rotate(${deg + 120} ${f1(fx + 7)} ${f1(fy + 3)})"/>` : '') +
          flower(fx, fy, sets.petals[i], sets.center, p.set === 'sun' ? 4.8 : 4.4);
      }).join('');
    } else if (h.kind === 'beret'){
      out.head = `<ellipse cx="112" cy="${HY - 46}" rx="38" ry="13" transform="rotate(-12 112 ${HY - 46})" fill="${p.c}" stroke="${ink(p.c)}" stroke-width="${SW}"/><path d="M108 ${HY - 58}q3-8 8-3" fill="none" stroke="${ink(p.c)}" stroke-width="3" stroke-linecap="round"/>`;
    } else if (h.kind === 'beanie'){
      const dome = `M72 ${HY - 30}C72 ${HY - 70} 168 ${HY - 70} 168 ${HY - 30}Z`;
      out.head = `<path d="${dome}" fill="${p.c}" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/>` +
        (p.s ? `<path d="M80 ${HY - 46}Q120 ${HY - 60} 160 ${HY - 46}M90 ${HY - 58}Q120 ${HY - 68} 150 ${HY - 58}" fill="none" stroke="${p.s}" stroke-width="5" stroke-linecap="round"/>` : '') +
        `<rect x="68" y="${HY - 36}" width="104" height="13" rx="6.5" fill="${mix(p.c, '#2A1E2A', .1)}" stroke="${ink(p.c)}" stroke-width="${SW}"/>` +
        `<path d="M80 ${HY - 34}v9M92 ${HY - 34}v9M104 ${HY - 34}v9M116 ${HY - 34}v9M128 ${HY - 34}v9M140 ${HY - 34}v9M152 ${HY - 34}v9M164 ${HY - 34}v9" stroke="${ink(p.c)}" stroke-opacity=".35" stroke-width="1.6"/>` +
        `<circle cx="120" cy="${HY - 68}" r="10" fill="${p.s || p.c}" stroke="${ink(p.c)}" stroke-width="${SW}"/>`;
    } else if (h.kind === 'straw'){
      out.head = `<ellipse cx="120" cy="${HY - 38}" rx="70" ry="15" fill="#F2D488" stroke="#A8823A" stroke-width="${SW}"/>` +
        `<path d="M86 ${HY - 38}C88 ${HY - 74} 152 ${HY - 74} 154 ${HY - 38}Z" fill="#EBC774" stroke="#A8823A" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M87 ${HY - 45}Q120 ${HY - 38} 153 ${HY - 45}" fill="none" stroke="#D9534F" stroke-width="7"/>` +
        `<path d="M70 ${HY - 34}q50 10 100 0" fill="none" stroke="#A8823A" stroke-opacity=".35" stroke-width="1.6"/>`;
    } else if (h.kind === 'crown'){
      const y0 = HY - 44;
      out.head = `<path d="M94 ${y0}L89 ${y0 - 30}L106 ${y0 - 15}L120 ${y0 - 36}L134 ${y0 - 15}L151 ${y0 - 30}L146 ${y0}Z" fill="#F5C843" stroke="#A8822A" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<rect x="93" y="${y0 - 6}" width="54" height="9" rx="3" fill="#F7D774" stroke="#A8822A" stroke-width="${SW}"/>` +
        `<circle cx="89" cy="${y0 - 31}" r="3.4" fill="#FFFFFF"/><circle cx="151" cy="${y0 - 31}" r="3.4" fill="#FFFFFF"/>` +
        (p.gem === 'heart'
          ? `<path d="M120 ${y0 - 8}c-9-6-7-14-2-14 1 0 2 1 2 2 0-1 1-2 2-2 5 0 7 8-2 14z" fill="#F0728E" stroke="#A8406A" stroke-width="1.6"/><circle cx="120" cy="${y0 - 37}" r="3.6" fill="#F0728E"/>`
          : `<circle cx="120" cy="${y0 - 14}" r="5" fill="${p.gem}" stroke="#8F3533" stroke-width="1.4"/><circle cx="104" cy="${y0 - 1.5}" r="2.6" fill="#6FABE3"/><circle cx="136" cy="${y0 - 1.5}" r="2.6" fill="#6FABE3"/><circle cx="120" cy="${y0 - 37}" r="3.4" fill="#FFFFFF"/>`);
    } else if (h.kind === 'pumpkin'){
      const y0 = HY - 50;
      out.head = `<path d="M120 ${y0 - 26}c-22 0-34 10-34 22 0 9 14 14 34 14s34-5 34-14c0-12-12-22-34-22z" fill="#F0A04B" stroke="#A8642A" stroke-width="${SW}"/>` +
        `<path d="M120 ${y0 - 25}c-9 6-9 29 0 35M120 ${y0 - 25}c9 6 9 29 0 35M102 ${y0 - 21}c-6 8-6 22 0 28M138 ${y0 - 21}c6 8 6 22 0 28" fill="none" stroke="#C97A30" stroke-width="2"/>` +
        `<path d="M108 ${y0 - 8}l5-6 5 6zM122 ${y0 - 8}l5-6 5 6z" fill="#5A3A24"/><path d="M110 ${y0 + 2}q10 6 20 0" stroke="#5A3A24" stroke-width="3" fill="none" stroke-linecap="round"/>` +
        `<path d="M120 ${y0 - 26}c0-8 4-12 9-13" stroke="#5C8A3A" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M128 ${y0 - 36}c6-4 12-2 13 2-6 3-10 2-13-2z" fill="#7CC26A"/>`;
    } else if (h.kind === 'santa'){
      const y0 = HY - 40;
      out.head = `<path d="M82 ${y0}C88 ${y0 - 40} 128 ${y0 - 54} 160 ${y0 - 36}C150 ${y0 - 30} 152 ${y0 - 18} 156 ${y0}Z" fill="#E8505A" stroke="#9A2E36" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<rect x="76" y="${y0 - 8}" width="88" height="16" rx="8" fill="#FFFFFF" stroke="#B9B4C2" stroke-width="${SW}"/>` +
        `<circle cx="162" cy="${y0 - 34}" r="10" fill="#FFFFFF" stroke="#B9B4C2" stroke-width="${SW}"/>`;
    } else if (h.kind === 'hachimaki'){
      out.head = `<path d="M66 ${HY - 26}Q120 ${HY - 44} 174 ${HY - 26}" fill="none" stroke="#B9373E" stroke-width="${12 + SW * 2}" stroke-linecap="round" opacity=".55"/><path d="M66 ${HY - 26}Q120 ${HY - 44} 174 ${HY - 26}" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>` +
        `<circle cx="120" cy="${HY - 36}" r="6" fill="#E0474C"/><path d="M172 ${HY - 28}l14-8M172 ${HY - 26}l16 2" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>`;
    } else if (h.kind === 'heartband' || h.kind === 'starband'){
      const band = `M76 ${HY - 22}Q120 ${HY - 66} 164 ${HY - 22}`;
      const shape = (cx, cy, r) => h.kind === 'heartband'
        ? `<path d="M${cx} ${cy + r}c-${r * 1.4} -${r * .8} -${r * 1.5} -${r * 1.6} -${r * .9} -${r * 2}c${r * .5} -${r * .3} ${r * .8} -${r * .1} ${r * .9} ${r * .3}c.1 -${r * .4} .4 -${r * .6} .9 -${r * .3}c${r * .6} .4 ${r * .5} ${r * 1.2} -${r * .9} ${r * 2}z" fill="#F0728E" stroke="#A8406A" stroke-width="2"/>`
        : `<path d="M${cx} ${cy - r}l${r * .3} ${r * .65} ${r * .7} .08-${r * .53} ${r * .47} ${r * .17} ${r * .7}-${r * .64}-${r * .36}-${r * .64} ${r * .36} ${r * .17}-${r * .7}-${r * .53}-${r * .47} ${r * .7}-.08z" fill="#FFE08A" stroke="#C9952A" stroke-width="2" stroke-linejoin="round"/>`;
      out.head = `<path d="${band}" fill="none" stroke="#2E2A33" stroke-width="${4 + SW}" stroke-linecap="round" opacity=".5"/><path d="${band}" fill="none" stroke="${h.kind === 'heartband' ? '#F7A9C4' : '#7EC4E8'}" stroke-width="4" stroke-linecap="round"/>` +
        shape(96, HY - 58, 13) + shape(144, HY - 58, 13);
    } else if (h.kind === 'flowerpin'){
      const fx = x.ear === 'big' ? 140 : 150, fy = HY - 40;
      out.head = [0, 72, 144, 216, 288].map(a => `<ellipse cx="${fx}" cy="${fy - 8}" rx="6" ry="8.5" fill="#F9C6D3" stroke="#D98AA0" stroke-width="1.6" transform="rotate(${a} ${fx} ${fy})"/>`).join('') + `<circle cx="${fx}" cy="${fy}" r="4" fill="#E8869E"/>`;
    } else if (h.kind === 'kabuto'){
      const y0 = HY - 40;
      out.head = `<path d="M80 ${y0 + 6}C80 ${y0 - 30} 160 ${y0 - 30} 160 ${y0 + 6}Z" fill="#3E5FA8" stroke="#24386A" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M72 ${y0 + 8}L168 ${y0 + 8}L160 ${y0 - 2}L80 ${y0 - 2}Z" fill="#5B7FC9" stroke="#24386A" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M104 ${y0 - 18}C96 ${y0 - 44} 108 ${y0 - 52} 112 ${y0 - 52}C110 ${y0 - 40} 112 ${y0 - 28} 116 ${y0 - 20}ZM136 ${y0 - 18}C144 ${y0 - 44} 132 ${y0 - 52} 128 ${y0 - 52}C130 ${y0 - 40} 128 ${y0 - 28} 124 ${y0 - 20}Z" fill="#F5C843" stroke="#A8822A" stroke-width="2" stroke-linejoin="round"/>` +
        `<circle cx="120" cy="${y0 - 10}" r="6" fill="#F5C843" stroke="#A8822A" stroke-width="2"/>`;
    } else if (h.kind === 'rainhat'){
      const y0 = HY - 44;
      out.head = `<path d="M70 ${y0 + 10}C78 ${y0 - 36} 162 ${y0 - 36} 170 ${y0 + 10}Q155 ${y0 + 2} 145 ${y0 + 10}Q132 ${y0 + 2} 120 ${y0 + 10}Q108 ${y0 + 2} 95 ${y0 + 10}Q85 ${y0 + 2} 70 ${y0 + 10}Z" fill="#7EC4E8" stroke="#3E7FA8" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M120 ${y0 - 24}C110 ${y0 - 10} 108 ${y0} 108 ${y0 + 6}M120 ${y0 - 24}C130 ${y0 - 10} 132 ${y0} 132 ${y0 + 6}M120 ${y0 - 24}V${y0 + 8}" fill="none" stroke="#3E7FA8" stroke-width="1.8"/>` +
        `<path d="M120 ${y0 - 24}v-8" stroke="#3E7FA8" stroke-width="3" stroke-linecap="round"/>`;
    } else if (h.kind === 'usagi'){
      const ear = (cx, rot) => `<g transform="rotate(${rot} ${cx} ${HY - 40})"><ellipse cx="${cx}" cy="${HY - 72}" rx="12" ry="32" fill="#FFFFFF" stroke="#B9B4C2" stroke-width="${SW}"/><ellipse cx="${cx}" cy="${HY - 70}" rx="6" ry="22" fill="#F9C6D3"/></g>`;
      out.head = `<path d="M84 ${HY - 34}Q120 ${HY - 56} 156 ${HY - 34}" fill="none" stroke="#B9B4C2" stroke-width="${5 + SW}" stroke-linecap="round" opacity=".6"/><path d="M84 ${HY - 34}Q120 ${HY - 56} 156 ${HY - 34}" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>` +
        ear(106, -12) + ear(134, 12);
    } else if (h.kind === 'tiara'){
      const y0 = HY - 40;
      out.head = `<path d="M86 ${y0 + 4}Q120 ${y0 - 16} 154 ${y0 + 4}" fill="none" stroke="#A9AFC2" stroke-width="${5 + SW * 2}" stroke-linecap="round"/><path d="M86 ${y0 + 4}Q120 ${y0 - 16} 154 ${y0 + 4}" fill="none" stroke="#E4E8F2" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M110 ${y0 - 4}L114 ${y0 - 18}L120 ${y0 - 8}L126 ${y0 - 18}L130 ${y0 - 4}" fill="#E4E8F2" stroke="#A9AFC2" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M120 ${y0 - 22}l5 7-5 7-5-7z" fill="#C9B6F2" stroke="#7D6AB0" stroke-width="1.6" stroke-linejoin="round"/>` +
        `<circle cx="100" cy="${y0 - 2}" r="2.6" fill="#F7A9C4"/><circle cx="140" cy="${y0 - 2}" r="2.6" fill="#F7A9C4"/>`;
    }
  }
  return out;
}
