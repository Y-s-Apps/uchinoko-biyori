/* ===== なかよし: level cap, titles ===== */
const MAX_LV = 100;
const TITLES = [
  [1,'はじめまして'],[5,'なかよし'],[10,'ともだち'],[20,'なかよしコンビ'],[30,'しんゆう'],[40,'あいぼう'],
  [50,'かぞく'],[60,'こころのとも'],[70,'たからもの'],[80,'ずっといっしょ'],[90,'きずなマスター'],[100,'さいこうのパートナー'],
];
function titleFor(lv){ let t = TITLES[0][1]; for (const [l, n] of TITLES) if (lv >= l) t = n; return t; }

/* ===== treats: [id, name, unlock Lv, full, mood, love, line, icon] ===== */
const T = (id, ja, lv, full, mood, love, line, icon) => ({ id, ja, lv, full, mood, love, line, icon });
const TREATS = {
  dog: [
    T('bolo','たまごボーロ',1,3,8,2,'ころころ、おいしいね',['balls','#F6D27A','#C99A3B']),
    T('jerky','ささみジャーキー',1,8,12,3,'おいしい！',['stick','#B9733F','#7A4A2A','#E2A06A']),
    T('milkgum','ミルクガム',4,4,12,4,'かみかみ…',['bone','#F7F3EA','#B9A88C']),
    T('imo','ふかしいも',7,10,14,4,'ほくほく〜',['potato']),
    T('pumpkin','かぼちゃ',10,8,14,5,'あまくておいしい',['pumpkin']),
    T('apple','りんご',13,6,16,5,'しゃくしゃく！',['apple']),
    T('strawberry','いちご',16,4,18,6,'あまずっぱい！',['strawberry']),
    T('blueberry','ブルーベリー',20,3,18,7,'ぷちぷち♪',['blueberry']),
    T('cheese','わんこチーズ',24,6,20,8,'チーズだいすき！',['cheese']),
    T('goatmilk','やぎミルク',28,6,20,9,'ごくごく…ぷはー',['milk','#9BD3C5']),
    T('bonegum','ほねガム',33,6,22,11,'ずっとかんでたい',['bone','#F2DDB4','#A9824A']),
    T('cookie','わんこクッキー',38,6,24,12,'さくさく！',['cookie']),
    T('venison','鹿肉ジャーキー',43,8,24,13,'ワイルドなあじ！',['stick','#8A3A2E','#5A2018','#C0675A']),
    T('pudding','わんこプリン',50,7,28,15,'ぷるぷる〜',['pudding']),
    T('cake','わんこケーキ',60,10,30,18,'とくべつな日みたい！',['cake',false]),
    T('steak','ちいさなステーキ',70,12,32,20,'ごちそうだ！',['steak']),
    T('parfait','わんこパフェ',85,8,34,24,'しあわせのあじ…',['parfait']),
    T('bdcake','なかよしバースデーケーキ',100,12,40,28,'さいこうの日！',['cake',true]),
  ],
  cat: [
    T('kibble','カリカリおやつ',1,3,8,2,'カリカリ♪',['kibble']),
    T('sasami','ささみ',1,8,12,3,'もぐもぐ…おいしい',['stick','#F7D3CF','#C98B86','#E7AFA9']),
    T('paste','ペーストおやつ',4,4,14,4,'ぺろぺろ…もっと！',['pouch','#9BD3C5','#4E9384']),
    T('katsuo','かつおぶし',7,4,14,4,'いいにおい〜',['flakes']),
    T('niboshi','にぼし',10,5,14,5,'ぽりぽり',['fish','#B9C4CF','#6F7B88',false]),
    T('catmilk','ねこ用ミルク',13,6,16,5,'ぺろぺろ…',['milk','#F497B0']),
    T('fdsasami','フリーズドライささみ',16,4,18,6,'サクサク！',['stick','#F2E3C6','#B79D72','#FFF6E6']),
    T('hotate','ほたて',20,6,18,7,'ほたて、すき…',['scallop']),
    T('maguro','まぐろ',24,8,20,8,'ごちそうだ！',['sashimi','#E9606A','#A23A44','#F49AA0']),
    T('salmon','サーモン',28,8,20,9,'とろける〜',['sashimi','#F59A6E','#B5603A','#FFE3D2']),
    T('shrimp','えび',33,6,22,11,'ぷりぷり！',['shrimp']),
    T('kanikama','ねこ用かにかま',38,6,22,12,'ふわふわ〜',['kanikama']),
    T('tai','鯛のほぐし身',43,8,24,13,'じょうひんなあじ…',['fish','#F28C8C','#A84B4B',false]),
    T('matatabi','またたび',50,2,32,15,'ふにゃ〜ん…♪',['leaf']),
    T('cake','ねこケーキ',60,10,30,18,'おいわいみたい！',['cake',false]),
    T('otoro','大トロ',70,10,32,20,'とろける…しあわせ',['sashimi','#F4A4A8','#B9646C','#FFFFFF']),
    T('soup','特選ささみスープ',85,8,34,24,'あったか〜い',['soup']),
    T('okashira','お祝いの尾頭つき鯛',100,12,40,28,'きょうはおまつりだ！',['fish','#E8605E','#9A3434',true]),
  ],
};

function treatIcon(t){
  const [k, a, b, c] = t.icon || [];
  switch (k){
    case 'balls': return `<g fill="${a}" stroke="${b}" stroke-width="2"><circle cx="17" cy="29" r="7"/><circle cx="31" cy="30" r="7"/><circle cx="24" cy="18" r="7"/></g>`;
    case 'kibble': return [[14,30],[30,32],[22,18]].map(([x, y]) => `<path d="M${x - 8} ${y}q7-7 13 0l4-4v8l-4-4q-6 7-13 0z" fill="#B97A3C" stroke="#7A4A2A" stroke-width="2" stroke-linejoin="round"/>`).join('');
    case 'stick': return `<g transform="rotate(-18 24 24)"><rect x="8" y="18" width="32" height="12" rx="6" fill="${a}" stroke="${b}" stroke-width="2"/><path d="M15 22v4M22 22v4M29 22v4" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/></g>`;
    case 'bone': {
      const sh = '<rect x="13" y="20" width="22" height="8" rx="3"/><circle cx="12" cy="19.5" r="5"/><circle cx="12" cy="28.5" r="5"/><circle cx="36" cy="19.5" r="5"/><circle cx="36" cy="28.5" r="5"/>';
      return `<g transform="rotate(-20 24 24)"><g fill="${b}" stroke="${b}" stroke-width="4.4">${sh}</g><g fill="${a}">${sh}</g></g>`;
    }
    case 'potato': return '<path d="M8 28c2-10 16-16 28-12 6 2 6 10 0 14-10 6-28 8-28-2z" fill="#9B5C9E" stroke="#6E3E73" stroke-width="2"/><ellipse cx="37" cy="22" rx="4" ry="6" fill="#F7D774" stroke="#6E3E73" stroke-width="2"/>';
    case 'pumpkin': return '<path d="M24 15c-10 0-16 6-16 13s7 11 16 11 16-4 16-11-6-13-16-13z" fill="#F0A04B" stroke="#B3692A" stroke-width="2"/><path d="M24 16c-5 4-5 19 0 23M24 16c5 4 5 19 0 23" fill="none" stroke="#B3692A" stroke-width="2"/><path d="M24 16c0-4 2-6 4-7" stroke="#5C8A3A" stroke-width="3" stroke-linecap="round" fill="none"/>';
    case 'apple': return '<path d="M24 15c-6-4-15-1-15 9 0 9 7 16 15 14 8 2 15-5 15-14 0-10-9-13-15-9z" fill="#EE6B6B" stroke="#A63E46" stroke-width="2"/><path d="M24 15c0-4 1-6 3-8" stroke="#7A4A2A" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M27 11c4-3 8-2 9 0-3 3-6 3-9 0z" fill="#7CC26A"/>';
    case 'strawberry': return '<path d="M24 41c-8-4-15-12-15-20 0-5 4-8 9-7 3 1 4 2 6 2s3-1 6-2c5-1 9 2 9 7 0 8-7 16-15 20z" fill="#EE5D6C" stroke="#A63E46" stroke-width="2"/><g fill="#FCE38A"><circle cx="18" cy="22" r="1.2"/><circle cx="24" cy="25" r="1.2"/><circle cx="30" cy="22" r="1.2"/><circle cx="21" cy="31" r="1.2"/><circle cx="27" cy="31" r="1.2"/></g><path d="M15 14l9 3 9-3-4 6h-10z" fill="#7CC26A" stroke="#4F8F45" stroke-width="1.6" stroke-linejoin="round"/>';
    case 'blueberry': return '<g fill="#5A6FC2" stroke="#33427E" stroke-width="2"><circle cx="16" cy="29" r="7.5"/><circle cx="32" cy="29" r="7.5"/><circle cx="24" cy="18" r="7.5"/></g><g fill="#33427E"><circle cx="16" cy="25" r="1.6"/><circle cx="32" cy="25" r="1.6"/><circle cx="24" cy="14" r="1.6"/></g>';
    case 'cheese': return '<path d="M8 32L36 16L40 22V37H8Z" fill="#F6CF57" stroke="#B9902C" stroke-width="2" stroke-linejoin="round"/><path d="M8 32H40" stroke="#B9902C" stroke-width="1.6"/><g fill="#E3B23C"><circle cx="18" cy="34.5" r="1.6"/><circle cx="29" cy="27" r="2.2"/><circle cx="34" cy="34" r="2"/></g>';
    case 'milk': return `<path d="M19 9h10v5l4 6v18a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4V20l4-6z" fill="#FFFFFF" stroke="#8C8C9A" stroke-width="2" stroke-linejoin="round"/><rect x="15" y="24" width="18" height="9" fill="${a}"/><rect x="18" y="5" width="12" height="5" rx="2" fill="${a}"/>`;
    case 'cookie': return '<circle cx="24" cy="25" r="15" fill="#E9B872" stroke="#A9743E" stroke-width="2"/><g fill="#B9733F"><ellipse cx="24" cy="29" rx="6" ry="5"/><circle cx="16" cy="22" r="2.8"/><circle cx="21" cy="17" r="2.8"/><circle cx="27" cy="17" r="2.8"/><circle cx="32" cy="22" r="2.8"/></g>';
    case 'pudding': return '<path d="M13 38l4-20h14l4 20z" fill="#F7DD8A" stroke="#B98A3A" stroke-width="2" stroke-linejoin="round"/><path d="M17 18h14l1 5c-5 2-11 2-16 0z" fill="#8B4E2A"/><path d="M10 38h28" stroke="#B98A3A" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="14" r="3.5" fill="#E8505A"/>';
    case 'cake': return '<path d="M10 25h28v13H10z" fill="#FBE3D6" stroke="#B9735F" stroke-width="2" stroke-linejoin="round"/><path d="M10 25c4 4 8 4 10 0 3 4 7 4 9 0 3 4 7 4 9 0" fill="#FFFFFF" stroke="#B9735F" stroke-width="2"/>' +
      (a ? '<rect x="22.5" y="12" width="3" height="12" rx="1" fill="#7EC4E8"/><path d="M24 4c-2.5 3.5-2.5 6 0 7 2.5-1 2.5-3.5 0-7z" fill="#F5B83F"/><circle cx="15" cy="32" r="1.6" fill="#F0728E"/><circle cx="33" cy="32" r="1.6" fill="#7EC4E8"/><circle cx="24" cy="33" r="1.6" fill="#F5C84C"/>'
         : '<path d="M24 21c-3-4-8 0-4 3l4 3 4-3c4-3-1-7-4-3z" fill="#F0728E"/>');
    case 'steak': return '<path d="M9 26c0-8 9-13 18-12 9 1 13 8 12 14-1 7-9 11-17 10S9 33 9 26z" fill="#A9533E" stroke="#6E2F22" stroke-width="2"/><path d="M15 25c5-3 10-2 14 1M17 31c4-1 9 0 12 2" stroke="#E7A08E" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="33" cy="22" rx="3.5" ry="3" fill="#F7EEDF" stroke="#6E2F22" stroke-width="1.5"/>';
    case 'parfait': return '<path d="M24 31v7M18 40h12" stroke="#9AA3B5" stroke-width="2.4" stroke-linecap="round"/><path d="M14 13h20l-4 18h-12z" fill="#FFFFFF" stroke="#9AA3B5" stroke-width="2" stroke-linejoin="round"/><path d="M15.2 19h17.6l-1.1 5H16.3z" fill="#F7A9C4"/><path d="M16.4 24h15.2l-1.1 5H17.5z" fill="#F7DD8A"/><path d="M13 13c2-6 6-6 11-4 4-2 9-2 11 4z" fill="#FFF8F0" stroke="#D8CFC4" stroke-width="1.6"/><circle cx="24" cy="7" r="3.4" fill="#E8505A"/>';
    case 'fish': {
      const body = `<path d="M8 24c6-9 18-11 26-4l6-6v20l-6-6c-8 7-20 5-26-4z" fill="${a}" stroke="${b}" stroke-width="2" stroke-linejoin="round"/><path d="M19 19q-2 5 0 10" stroke="${b}" stroke-width="1.8" fill="none"/><circle cx="14" cy="22.5" r="1.8" fill="#2E2A33"/>`;
      return c ? `<ellipse cx="24" cy="36" rx="21" ry="6" fill="#FFFFFF" stroke="#9AA3B5" stroke-width="2"/><g transform="translate(0 -3)">${body}</g><path d="M34 37c3-4 7-4 9-2-3 3-6 3-9 2z" fill="#7CC26A"/>`
               : `<g transform="translate(4 4) scale(.85)">${body}</g>`;
    }
    case 'sashimi': return `<path d="M5 32q11-24 36-14-13 19-36 14z" fill="#7CC26A" stroke="#4F8F45" stroke-width="1.6"/><rect x="9" y="19" width="31" height="13" rx="5" fill="${a}" stroke="${b}" stroke-width="2"/><path d="M15 21l4 9M22 21l4 9M29 21l4 9" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`;
    case 'flakes': return '<path d="M10 30l8-9 6 7-8 8zM22 22l9-8 6 8-9 7zM24 33l8-6 6 6-8 6z" fill="#E7B98A" stroke="#A9744A" stroke-width="2" stroke-linejoin="round"/>';
    case 'pouch': return `<rect x="17" y="6" width="14" height="36" rx="4" fill="${a}" stroke="${b}" stroke-width="2"/><path d="M17 14h14" stroke="${b}" stroke-width="2"/><circle cx="24" cy="27" r="4" fill="#F0728E"/>`;
    case 'scallop': return '<path d="M24 38c-9 0-15-6-15-13 0-8 7-13 15-13s15 5 15 13c0 7-6 13-15 13z" fill="#FBF3E6" stroke="#C9B497" stroke-width="2"/><circle cx="24" cy="25" r="7" fill="#F2DDBE" stroke="#D9C2A0" stroke-width="1.4"/>';
    case 'shrimp': return '<path d="M33 13c-10-2-21 4-21 14 0 6 4 10 10 10" fill="none" stroke="#B5482F" stroke-width="11" stroke-linecap="round"/><path d="M33 13c-10-2-21 4-21 14 0 6 4 10 10 10" fill="none" stroke="#F48A63" stroke-width="7" stroke-linecap="round"/><path d="M22 35l-7 7 10-1z" fill="#E8604A" stroke="#B5482F" stroke-width="1.6" stroke-linejoin="round"/><path d="M26 15l1 5M19 19l3 3M15 26l4 1" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/>';
    case 'kanikama': return '<g transform="rotate(-15 24 24)"><rect x="9" y="19" width="30" height="11" rx="5" fill="#FFFFFF" stroke="#C9B9B0" stroke-width="2"/><rect x="10" y="20" width="28" height="4.5" rx="2.2" fill="#E8604A"/></g>';
    case 'leaf': return '<path d="M12 38C18 28 26 18 36 10" stroke="#7A5A3A" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M20 28c-8-2-10-10-6-14 6 2 8 8 6 14zM28 20c2-8 10-10 14-6-2 6-8 8-14 6z" fill="#7CC26A" stroke="#4F8F45" stroke-width="2"/>';
    case 'soup': return '<path d="M18 17c-2-3 2-5 0-8M24 17c-2-3 2-5 0-8M30 17c-2-3 2-5 0-8" stroke="#BDB5C8" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M7 22h34a17 15 0 0 1-34 0z" fill="#F6E7C8" stroke="#B9935A" stroke-width="2" stroke-linejoin="round"/><path d="M7 22h34" stroke="#B9935A" stroke-width="2.4" stroke-linecap="round"/><path d="M15 27l5 1M23 29l5-1M29 26l4 2" stroke="#E7C9A0" stroke-width="2.4" stroke-linecap="round"/>';
  }
  return '';
}

/* ===== outfits: three slots, colour variants ===== */
const SLOTS = [['head','あたま'],['face','かお'],['neck','くび']];
const Wr = (id, slot, ja, lv, kind, p) => ({ id, slot, ja, lv, kind, p:p || {} });
const WEAR = [
  Wr('bandana_red','neck','バンダナ（あか）',2,'bandana',{ c:'#E8676B', d:'#FFF3EE' }),
  Wr('ribbon_pink','head','リボン（ピンク）',3,'ribbon',{ c:'#F48FB1' }),
  Wr('bell_blue','neck','すずの首輪（あお）',4,'bell',{ c:'#5AAED0', b:'#F2C94C' }),
  Wr('flower_mix','head','花かんむり',6,'flower',{ set:'mix' }),
  Wr('beret_red','head','ベレー帽（あか）',8,'beret',{ c:'#D95B57' }),
  Wr('bandana_blue','neck','バンダナ（あお）',9,'bandana',{ c:'#5B8FD9', d:'#FFFFFF' }),
  Wr('ribbon_sky','head','リボン（みずいろ）',11,'ribbon',{ c:'#7EC4E8' }),
  Wr('bell_red','neck','すずの首輪（あか）',12,'bell',{ c:'#E56B6F', b:'#F2C94C' }),
  Wr('bowtie_black','neck','ちょうネクタイ（くろ）',14,'bowtie',{ c:'#2E2A33' }),
  Wr('scarf_tri','neck','トリコロールのマフラー',17,'scarf',{ c:'#1F4FA3', tri:['#1F4FA3','#FFFFFF','#D9272E'] }),
  Wr('ribbon_yellow','head','リボン（きいろ）',19,'ribbon',{ c:'#F5C84C' }),
  Wr('bell_pink','neck','すずの首輪（ピンク）',21,'bell',{ c:'#F497B0', b:'#F2C94C' }),
  Wr('beanie_white','head','ニット帽（しろ）',23,'beanie',{ c:'#F4F1EC' }),
  Wr('scarf_red','neck','マフラー（あか）',24,'scarf',{ c:'#D9534F' }),
  Wr('bandana_yellow','neck','バンダナ（きいろ）',26,'bandana',{ c:'#F2C14E', d:'#FFFFFF' }),
  Wr('beret_navy','head','ベレー帽（こん）',27,'beret',{ c:'#3E4C7A' }),
  Wr('ribbon_red','head','リボン（あか）',29,'ribbon',{ c:'#E0474C' }),
  Wr('bell_black','neck','すずの首輪（くろ）',31,'bell',{ c:'#3A3540', b:'#D9DCE1' }),
  Wr('straw','head','むぎわらぼうし',33,'straw'),
  Wr('bowtie_red','neck','ちょうネクタイ（あか）',35,'bowtie',{ c:'#D9534F' }),
  Wr('flower_sun','head','ひまわりのかんむり',37,'flower',{ set:'sun' }),
  Wr('bandana_denim','neck','バンダナ（デニム）',40,'bandana',{ c:'#4D6A92', d:'#DDE6F2' }),
  Wr('beret_mustard','head','ベレー帽（からし）',42,'beret',{ c:'#D4A53A' }),
  Wr('glasses_brown','face','まるメガネ（べっこう）',44,'glasses',{ c:'#8B5A3C' }),
  Wr('scarf_brown','neck','マフラー（ブラウン）',45,'scarf',{ c:'#8B5A3C' }),
  Wr('ribbon_dot','head','リボン（みずたま）',47,'ribbon',{ c:'#F48FB1', d:'#FFFFFF' }),
  Wr('flower_sakura','head','さくらのかんむり',52,'flower',{ set:'sakura' }),
  Wr('bell_gold','neck','金のすずの首輪',55,'bell',{ c:'#E2B23C', b:'#F7D774' }),
  Wr('beanie_stripe','head','ニット帽（しましま）',58,'beanie',{ c:'#6FABE3', s:'#FFFFFF' }),
  Wr('shades_heart','face','ハートのサングラス',60,'shades',{ c:'#F0728E', heart:true }),
  Wr('pearls','neck','パールのネックレス',65,'pearls'),
  Wr('shades_black','face','サングラス',70,'shades',{ c:'#2E2A33' }),
  Wr('lei','neck','花のくびかざり',75,'lei'),
  Wr('crown','head','王冠',80,'crown',{ gem:'#E8505A' }),
  Wr('glasses_red','face','まるメガネ（あか）',85,'glasses',{ c:'#D9534F' }),
  Wr('tiara','head','ティアラ',90,'tiara'),
  Wr('bell_rainbow','neck','にじいろの首輪',95,'bell',{ c:'rainbow', b:'#F7D774' }),
  Wr('crown_heart','head','なかよしの王冠',100,'crown',{ gem:'heart' }),
];
const WEAR_BY_ID = Object.fromEntries(WEAR.map(w => [w.id, w]));
const WEAR_RENAMED = { uniform_tri:'scarf_tri', scarf_stripe:'scarf_brown' };
const LEGACY_ACC = { bandana:{ neck:'bandana_red' }, bell:{ neck:'bell_blue' }, ribbon:{ head:'ribbon_pink' }, flower:{ head:'flower_mix' }, beret:{ head:'beret_red' } };
function wearFrom(o){
  if (o && o.wear && typeof o.wear === 'object') return { head:o.wear.head || null, face:o.wear.face || null, neck:o.wear.neck || null };
  const w = { head:null, face:null, neck:null };
  if (o && LEGACY_ACC[o.acc]) Object.assign(w, LEGACY_ACC[o.acc]);
  return w;
}
