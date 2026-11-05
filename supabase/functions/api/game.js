/* うちのこ日和：サーバーで使うゲームの確かめ。tools/build_server.py が src/ から作る（手で直さない） */

/* eslint-disable */

/* ---- src/js_data.js ---- */
/* ===== data: breeds, treats, accessories ===== */
const DOG_D = { ear:'semi', coat:'smooth', muzzle:'medium', tail:'straight', face:'muzzle', legs:'normal' };
const CAT_D = { ear:'pointy', coat:'smooth', muzzle:'medium', tail:'long', face:'muzzle', legs:'normal' };
const W = '#FBF8F4';
function B(id, ja, sp, shape, colors, marks){
  return { id, ja, sp, look: Object.assign({}, sp==='cat'?CAT_D:DOG_D, shape, { colors, marks: marks||{} }) };
}
const BREEDS = [
  B('toy_poodle','トイプードル','dog',{ear:'long',coat:'curly',tail:'plume'},{main:'#C98A5B'}),
  B('chihuahua','チワワ','dog',{ear:'big',muzzle:'short',face:'lower'},{main:'#E3B57E',face:'#F6E6CF',chest:'#F6E6CF'}),
  B('dachshund','ミニチュアダックスフンド','dog',{ear:'floppy',coat:'long',muzzle:'long',legs:'short'},{main:'#B8622F'}),
  B('pomeranian','ポメラニアン','dog',{ear:'small',coat:'fluffy',muzzle:'short',tail:'plume',face:'lower'},{main:'#F0A253',face:'#F8CB8E',chest:'#F8CB8E'}),
  B('shiba','柴犬','dog',{ear:'pointy',tail:'curl',face:'lower'},{main:'#D8843D',face:'#F8EAD5',chest:'#F8EAD5',paws:'#F8EAD5'},{brows:'#F8EAD5'}),
  B('akita','秋田犬','dog',{ear:'pointy',coat:'fluffy',tail:'curl',face:'lower'},{main:'#DE8E4E',face:'#FBF2E6',chest:'#FBF2E6',paws:'#FBF2E6'}),
  B('schnauzer','ミニチュアシュナウザー','dog',{ear:'semi',muzzle:'long',tail:'stub',face:'lower'},{main:'#8F9196',face:'#E4E4E2',chest:'#E4E4E2',paws:'#E4E4E2'},{brows:'#E4E4E2'}),
  B('yorkie','ヨークシャーテリア','dog',{ear:'pointy',coat:'long',tail:'plume'},{main:'#D3A064',body:'#5D6A80',tail:'#5D6A80',chest:'#D3A064',paws:'#D3A064'}),
  B('frenchie','フレンチブルドッグ','dog',{ear:'big',muzzle:'short',tail:'stub'},{main:'#DDBB8A'},{mask:'#4A3B33'}),
  B('maltese','マルチーズ','dog',{ear:'long',coat:'long',muzzle:'short',tail:'plume'},{main:W}),
  B('shihtzu','シーズー','dog',{ear:'long',coat:'long',muzzle:'short',tail:'plume',face:'blaze'},{main:'#B48352',face:W,chest:W,paws:W}),
  B('golden','ゴールデンレトリーバー','dog',{ear:'floppy',coat:'long',muzzle:'long'},{main:'#E1A75C'}),
  B('labrador','ラブラドールレトリーバー','dog',{ear:'floppy',muzzle:'long'},{main:'#EBCB93'}),
  B('corgi','ウェルシュコーギー','dog',{ear:'big',muzzle:'long',tail:'stub',legs:'short',face:'blaze'},{main:'#E2994D',face:W,chest:W,paws:W}),
  B('pug','パグ','dog',{ear:'semi',muzzle:'short',tail:'curl'},{main:'#E8D1A6',ear:'#3B3330'},{mask:'#3B3330'}),
  B('beagle','ビーグル','dog',{ear:'floppy',face:'blaze'},{main:'#C98A48',ear:'#AE6E33',face:W,chest:W,paws:W,tailTip:W},{saddle:'#2F2A2B'}),
  B('husky','シベリアンハスキー','dog',{ear:'pointy',coat:'fluffy',tail:'plume',face:'mask'},{main:'#6F7682',face:'#F7F6F3',chest:'#F7F6F3',paws:'#F7F6F3',eye:'#79B4E6'}),
  B('border_collie','ボーダーコリー','dog',{ear:'semi',coat:'long',muzzle:'long',face:'blaze'},{main:'#2B2729',face:'#F7F6F3',chest:'#F7F6F3',paws:'#F7F6F3',tailTip:'#F7F6F3'}),
  B('cavalier','キャバリア','dog',{ear:'long',coat:'long',muzzle:'short',tail:'plume',face:'blaze'},{main:'#FBF5EC',ear:'#B9672F'},{patchL:'#B9672F',patchR:'#B9672F'}),
  B('papillon','パピヨン','dog',{ear:'big',coat:'long',tail:'plume',face:'blaze'},{main:W,ear:'#4A3530'},{patchL:'#4A3530',patchR:'#4A3530'}),
  B('jack_russell','ジャックラッセルテリア','dog',{ear:'semi'},{main:W,ear:'#C98A4B'},{patchL:'#C98A4B'}),
  B('mix_dog','ミックス犬','dog',{},{main:'#C9A27A'}),

  B('scottish','スコティッシュフォールド','cat',{ear:'fold',muzzle:'short'},{main:'#C9CCD2',eye:'#E3A93E'},{stripes:'#8D9099'}),
  B('munchkin','マンチカン','cat',{legs:'short',face:'lower'},{main:'#E6B06C',face:'#FBF0E0',chest:'#FBF0E0',eye:'#D9A23A'},{stripes:'#C98538'}),
  B('american_sh','アメリカンショートヘア','cat',{},{main:'#C6CAD1',eye:'#93C06A'},{stripes:'#3D4047'}),
  B('ragdoll','ラグドール','cat',{coat:'long',muzzle:'short',tail:'fluffy'},{main:'#F6F0E6',ear:'#8C7362',tail:'#8C7362',eye:'#6EA6DC'},{mask:'#8C7362'}),
  B('british','ブリティッシュショートヘア','cat',{ear:'small',muzzle:'short'},{main:'#8D97A5',eye:'#E59A3A',nose:'#6B7280'}),
  B('norwegian','ノルウェージャンフォレストキャット','cat',{coat:'fluffy',tail:'fluffy',face:'lower'},{main:'#9B8B7A',face:'#F5EEE5',chest:'#F5EEE5',eye:'#B9C25A'},{stripes:'#594A3E'}),
  B('russian_blue','ロシアンブルー','cat',{ear:'big'},{main:'#8996A8',eye:'#7CC16E',nose:'#6D7686'}),
  B('persian','ペルシャ','cat',{ear:'small',coat:'fluffy',muzzle:'short',tail:'fluffy'},{main:'#F7F3EE',eye:'#E3A13C'}),
  B('siamese','シャム','cat',{ear:'big',muzzle:'long'},{main:'#F2E7D6',ear:'#4B3B32',tail:'#4B3B32',paws:'#4B3B32',eye:'#68A3DA'},{mask:'#4B3B32'}),
  B('bengal','ベンガル','cat',{face:'lower'},{main:'#E2B068',face:'#F7E6C8',chest:'#F7E6C8',eye:'#9DC16A'},{spots:'#6A4528'}),
  B('maine_coon','メインクーン','cat',{ear:'big',coat:'fluffy',muzzle:'long',tail:'fluffy',face:'lower'},{main:'#8E705A',face:'#EFE3D2',chest:'#EFE3D2',eye:'#C9A84A'},{stripes:'#4C3A2E'}),
  B('mike','三毛猫','cat',{},{main:'#FBF8F3',eye:'#D9A23A'},{patchL:'#E7964C',patchR:'#2E292B',bodyPatch:true}),
  B('chatora','茶トラ','cat',{face:'lower'},{main:'#F0A35C',face:'#FBE8CF',chest:'#FBE8CF',eye:'#E2A23A'},{stripes:'#D0782F'}),
  B('kijitora','キジトラ','cat',{},{main:'#9C8869',eye:'#C8B04A'},{stripes:'#3E3428'}),
  B('sabatora','サバトラ','cat',{},{main:'#A8ADB5',eye:'#A9C35A'},{stripes:'#3E4147'}),
  B('hachiware','ハチワレ','cat',{face:'hachiware'},{main:'#2B2729',face:W,chest:W,paws:W,eye:'#E2C24A'}),
  B('kuro','黒猫','cat',{},{main:'#2B2729',eye:'#E9C64A',nose:'#4A3F45'}),
  B('shiro','白猫','cat',{},{main:W,eye:'#7DB5E2'}),
  B('mix_cat','ミックス猫','cat',{face:'lower'},{main:'#B59B78',face:'#F8EEE0',chest:'#F8EEE0',eye:'#C8B04A'},{stripes:'#6E5A43'}),
];
const BREED_BY_ID = Object.fromEntries(BREEDS.map(b => [b.id, b]));

const COAT_SW = [
  ['ホワイト','#FBF8F4'],['クリーム','#F3DDB3'],['アプリコット','#EBB27A'],['レッド','#D9823B'],
  ['ゴールド','#E0A458'],['ブラウン','#8B5A3C'],['チョコ','#5C3A2E'],['グレー','#9BA0A8'],
  ['シルバー','#C9CDD3'],['ブルー','#8A97A8'],['ブラック','#2B2729'],
];
const EYE_SW = [['こげ茶','#2B1E1A'],['ゴールド','#E3B04A'],['グリーン','#8CC26A'],['ブルー','#74AEE0'],['カッパー','#E0913A']];

const NAME_IDEAS = {
  white:['しろ','マシュマロ','ゆき','もち','ミルク'],
  cream:['きなこ','むぎ','プリン','わらび'],
  orange:['みかん','あんず','くり','こむぎ'],
  brown:['ココア','ちょこ','まめ','かりん'],
  black:['くろまめ','ごま','のり','すみ'],
  gray:['すず','もなか','グレイ','あずき'],
};

/* ---- src/js_data2.js ---- */
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
    case 'jubako': return '<rect x="9" y="14" width="30" height="24" rx="3" fill="#2E2A33" stroke="#1A161E" stroke-width="2"/><rect x="12" y="17" width="24" height="18" rx="1.5" fill="#B9373E"/><path d="M24 17v18M12 26h24" stroke="#F5C84C" stroke-width="1.6"/><circle cx="18" cy="21.5" r="2.6" fill="#F7D774"/><circle cx="30" cy="30.5" r="2.6" fill="#7CC26A"/><path d="M27 20h6M15 30h5" stroke="#FBF3E6" stroke-width="2.6" stroke-linecap="round"/>';
    case 'heartcookie': return '<path d="M24 40c-14-8-17-17-12-22 4-4 10-3 12 2 2-5 8-6 12-2 5 5 2 14-12 22z" fill="#E9B872" stroke="#A9743E" stroke-width="2"/><path d="M24 34c-8-5-9-10-6.5-12.5 2-2 5-1.5 6.5 1 1.5-2.5 4.5-3 6.5-1 2.5 2.5 1.5 7.5-6.5 12.5z" fill="#F497B0"/>';
    case 'koicookie': return '<path d="M7 24c6-8 22-10 30-4l5-5v18l-5-5c-8 6-24 4-30-4z" fill="#E9B872" stroke="#A9743E" stroke-width="2" stroke-linejoin="round"/><path d="M8 24c7-4 20-5 28-2" stroke="#5B8FD9" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="13" cy="22" r="2.6" fill="#FFFFFF" stroke="#2E2A33" stroke-width="1.2"/><circle cx="13" cy="22" r="1" fill="#2E2A33"/>';
    case 'jelly': return '<path d="M12 22h24l-3 16H15z" fill="#C7B6EE" stroke="#7D6AB0" stroke-width="2" stroke-linejoin="round" opacity=".9"/><circle cx="20" cy="29" r="3.4" fill="#9FB4EA"/><circle cx="27" cy="31" r="3.2" fill="#B9A6E6"/><circle cx="24" cy="26" r="3" fill="#8FC7EA"/><path d="M10 22h28" stroke="#7D6AB0" stroke-width="3" stroke-linecap="round"/><path d="M28 14c3 0 5 2 5 4" stroke="#7CC26A" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    case 'suika': return '<path d="M6 18h36a18 18 0 0 1-36 0z" fill="#E8505A" stroke="#3E8A45" stroke-width="3.4"/><path d="M8.5 20h31" stroke="#B7E0A0" stroke-width="2"/><g fill="#2E2A33"><ellipse cx="17" cy="25" rx="1.3" ry="2"/><ellipse cx="24" cy="28" rx="1.3" ry="2"/><ellipse cx="31" cy="25" rx="1.3" ry="2"/><ellipse cx="21" cy="32" rx="1.2" ry="1.8"/><ellipse cx="27" cy="32" rx="1.2" ry="1.8"/></g>';
    case 'dango': return '<path d="M8 40L40 8" stroke="#C9A97A" stroke-width="2.4" stroke-linecap="round"/><circle cx="16" cy="32" r="7" fill="#FFFFFF" stroke="#C9B9B0" stroke-width="2"/><circle cx="24" cy="24" r="7" fill="#F9C6D3" stroke="#D98AA0" stroke-width="2"/><circle cx="32" cy="16" r="7" fill="#B7E0A0" stroke="#7CB46A" stroke-width="2"/>';
    case 'pumpkincookie': return '<path d="M24 14c-10 0-16 6-16 13s7 11 16 11 16-4 16-11-6-13-16-13z" fill="#F0A04B" stroke="#B3692A" stroke-width="2"/><path d="M24 15c-5 4-5 19 0 23M24 15c5 4 5 19 0 23" fill="none" stroke="#C97A30" stroke-width="1.6"/><path d="M17 24l3 3-3 0zM31 24l-3 3 3 0z" fill="#5A3A24"/><path d="M18 31q6 4 12 0" stroke="#5A3A24" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M24 14c0-4 2-6 4-6" stroke="#5C8A3A" stroke-width="3" stroke-linecap="round" fill="none"/>';
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

/* ---- src/js_data3.js ---- */
/* ===== tricks ===== */
const TK = (id, ja, lv, need, anim, cue) => ({ id, ja, lv, need, anim, cue });
const TRICKS = {
  dog: [
    TK('sit','おすわり',1,3,'sit','おすわり！'),
    TK('paw','お手',3,4,'paw','お手！'),
    TK('down','ふせ',6,5,'down','ふせ！'),
    TK('spin','くるっとターン',10,6,'spin','くるっと！'),
    TK('jump','ジャンプ',15,6,'bigjump','ジャンプ！'),
    TK('high','ハイタッチ',20,7,'high','ハイタッチ！'),
    TK('roll','ごろん',28,8,'roll','ごろん！'),
    TK('bow','ごあいさつ',36,8,'bow','ごあいさつ！'),
    TK('dance','ダンス',45,10,'dance','ダンス！'),
    TK('bang','ばたんきゅー',60,10,'bang','バーン！'),
  ],
  cat: [
    TK('sit','おすわり',1,3,'sit','おすわり！'),
    TK('paw','お手',3,4,'paw','お手！'),
    TK('stretch','のびー',6,5,'stretch','のびー！'),
    TK('spin','くるっとターン',10,6,'spin','くるっと！'),
    TK('jump','ジャンプ',15,6,'bigjump','ジャンプ！'),
    TK('high','ハイタッチ',20,7,'high','ハイタッチ！'),
    TK('punch','ねこパンチ',28,8,'punch','パンチ！'),
    TK('roll','ごろん',36,8,'roll','ごろん！'),
    TK('bow','ごあいさつ',45,10,'bow','ごあいさつ！'),
    TK('dance','ダンス',60,10,'dance','ダンス！'),
  ],
};

/* ===== seasons & events (month-day of the rules' clock: this device's date, or Japan time on the LINE server) ===== */
function mdOf(d){ return (d.getMonth() + 1) * 100 + d.getDate(); }
function seasonOf(d = clockDate()){
  const m = d.getMonth() + 1;
  return m >= 3 && m <= 5 ? 'spring' : m >= 6 && m <= 8 ? 'summer' : m >= 9 && m <= 11 ? 'autumn' : 'winter';
}
const EV = (id, ja, from, to, gift, treat, decor, hello) => ({ id, ja, from, to, gift, treat, decor, hello });
const EVENTS = [
  EV('newyear','おしょうがつ',101,107,'ev_hachimaki',{ id:'ev_osechi', ja:'ペット用おせち', icon:['jubako'] },'newyear','あけましておめでとう！ことしもよろしくね'),
  EV('valentine','バレンタイン',207,214,'ev_heartband',{ id:'ev_heartcookie', ja:'ハートのクッキー', icon:['heartcookie'] },'valentine','バレンタインだよ！だいすき！'),
  EV('sakura','おはなみ',325,410,'ev_sakurapin',{ id:'ev_sakurabolo', ja:'さくらボーロ', icon:['balls','#F9C6D3','#D98AA0'] },'sakura','さくらがさいたよ！'),
  EV('kodomo','こどもの日',501,505,'ev_kabuto',{ id:'ev_koicookie', ja:'こいのぼりクッキー', icon:['koicookie'] },'kodomo','こいのぼりがおよいでるね'),
  EV('tsuyu','つゆ',610,630,'ev_rainhat',{ id:'ev_ajisai', ja:'あじさいゼリー', icon:['jelly'] },'tsuyu','あめの日も、いっしょだね'),
  EV('tanabata','たなばた',701,707,'ev_starband',{ id:'ev_starbolo', ja:'おほしさまボーロ', icon:['balls','#FFE08A','#D9A83A'] },'tanabata','おねがいごと、なににする？'),
  EV('summer','なつやすみ',720,831,'ev_ukiwa',{ id:'ev_suika', ja:'ひんやりすいか', icon:['suika'] },'summer','なつだ！あついね〜'),
  EV('tsukimi','おつきみ',915,930,'ev_usagi',{ id:'ev_dango', ja:'おつきみボーロ', icon:['dango'] },'tsukimi','おつきさま、まんまるだね'),
  EV('halloween','ハロウィン',1001,1031,'ev_pumpkin',{ id:'ev_pumpkincookie', ja:'かぼちゃクッキー', icon:['pumpkincookie'] },'halloween','トリック・オア・トリート！'),
  EV('christmas','クリスマス',1201,1225,'ev_santa',{ id:'ev_xmascake', ja:'クリスマスケーキ', icon:['cake',true] },'christmas','メリークリスマス！'),
];
function activeEvent(d = clockDate()){
  const md = mdOf(d);
  return EVENTS.find(e => md >= e.from && md <= e.to) || null;
}
function weatherOf(d = clockDate()){
  const ev = activeEvent(d), m = d.getMonth() + 1;
  if (ev && ev.id === 'christmas') return 'snow';
  if (ev && ev.id === 'sakura') return 'petals';
  if (ev && ev.id === 'tsuyu') return 'rain';
  if (m === 1 || m === 2) return 'snow';
  return null;
}
const EVENT_TREAT_STATS = { lv:1, full:6, mood:22, love:9 };

/* event outfits: owned once received, never level-locked */
const EVENT_WEAR = [
  Wr('ev_pumpkin','head','かぼちゃのぼうし',0,'pumpkin'),
  Wr('ev_santa','head','サンタのぼうし',0,'santa'),
  Wr('ev_hachimaki','head','おめでたいはちまき',0,'hachimaki'),
  Wr('ev_heartband','head','ハートのカチューシャ',0,'heartband'),
  Wr('ev_sakurapin','head','さくらのヘアピン',0,'flowerpin'),
  Wr('ev_kabuto','head','こどもの日のかぶと',0,'kabuto'),
  Wr('ev_rainhat','head','あまがさぼうし',0,'rainhat'),
  Wr('ev_starband','head','おほしさまカチューシャ',0,'starband'),
  Wr('ev_usagi','head','うさぎのみみ',0,'usagi'),
  Wr('ev_ukiwa','neck','うきわ',0,'ukiwa'),
];
EVENT_WEAR.forEach(w => { w.ev = true; WEAR.push(w); WEAR_BY_ID[w.id] = w; });

/* ===== souvenirs from time away ===== */
const SV = (id, ja, seasons, rare, icon, line) => ({ id, ja, seasons, rare, icon, line });
const SOUVENIRS = [
  SV('stone','まるい小石','all',1,'stone','つるつるで、きもちいいよ'),
  SV('stick','いい感じの枝','all',1,'stick','このかたち、さいこうでしょ？'),
  SV('leaf','はっぱ','all',1,'leaf','ひらひら〜ってとんできたよ'),
  SV('feather','とりの羽根','all',2,'feather','ふわふわの羽根だよ'),
  SV('ball','だれかのボール','all',2,'ball','ころころ…だれのかな？'),
  SV('heartstone','ハートの石','all',3,'heartstone','ハートのかたち、見つけちゃった'),
  SV('glass','きらきらのビー玉','all',3,'marble','ひかってて、きれいなの'),
  SV('letter','おてがみ','all',4,'letter','いつも ありがとう。だいすきだよ'),
  SV('star','ながれ星のかけら','all',5,'starpiece','よるのあいだに ひろったんだ…'),
  SV('sakura','さくらの花びら','spring',1,'sakura','はるのにおいがするよ'),
  SV('tanpopo','たんぽぽ','spring',1,'tanpopo','きいろくて かわいいね'),
  SV('clover','クローバー','spring summer',1,'clover','みどりのはっぱ、どうぞ'),
  SV('yotsuba','四つ葉のクローバー','spring summer',4,'yotsuba','しあわせになれるんだって！'),
  SV('ajisai','あじさいの花','summer',2,'ajisai','あめのあとに さいてたよ'),
  SV('shell','かいがら','summer',2,'shell','うみのおと、きこえる？'),
  SV('himawari','ひまわりのたね','summer',2,'seed','おひさまの たね！'),
  SV('donguri','どんぐり','autumn',1,'donguri','ぼうしつきのどんぐりだよ'),
  SV('momiji','もみじ','autumn',1,'momiji','まっかで きれいでしょ'),
  SV('ichou','いちょうの葉','autumn',2,'ichou','きいろの おうぎだよ'),
  SV('matsubokkuri','まつぼっくり','autumn winter',2,'pinecone','かさかさ、いいおと'),
  SV('tsubaki','つばきの花','winter',2,'tsubaki','さむい日にも さいてたよ'),
  SV('yukidaruma','ちいさな雪だるま','winter',3,'snowman','とけないうちに、はい！'),
];
const SOUV_BY_ID = Object.fromEntries(SOUVENIRS.map(s => [s.id, s]));
function souvenirIcon(id){
  const P = {
    stone:'<ellipse cx="24" cy="28" rx="15" ry="10" fill="#B9B4C2" stroke="#7F798C" stroke-width="2"/><ellipse cx="19" cy="24" rx="5" ry="2.5" fill="#FFFFFF" opacity=".6"/>',
    stick:'<path d="M8 36L40 14M22 27l-4-9M31 21l7 3" stroke="#8B5A3C" stroke-width="4.5" stroke-linecap="round" fill="none"/><path d="M8 36L40 14M22 27l-4-9M31 21l7 3" stroke="#B9824F" stroke-width="2" stroke-linecap="round" fill="none"/>',
    leaf:'<path d="M10 38C10 20 22 10 38 10c0 16-10 28-28 28z" fill="#8CC97A" stroke="#4F8F45" stroke-width="2"/><path d="M12 36L34 14" stroke="#4F8F45" stroke-width="1.8"/>',
    feather:'<path d="M14 40C16 24 26 12 38 8c-2 14-10 26-24 32z" fill="#F4F1EC" stroke="#A9A2B8" stroke-width="2"/><path d="M14 40L34 12" stroke="#A9A2B8" stroke-width="1.6"/><path d="M20 30l-5-2M24 25l-6-1M28 20l-5-1" stroke="#C9C3D6" stroke-width="1.4"/>',
    ball:'<circle cx="24" cy="25" r="14" fill="#F27B7B" stroke="#A84B4B" stroke-width="2"/><path d="M10.5 22c9 4 18 4 27 0" stroke="#FFFFFF" stroke-width="3" fill="none"/>',
    heartstone:'<path d="M24 38c-12-7-14-15-10-20 3-3 8-2 10 2 2-4 7-5 10-2 4 5 2 13-10 20z" fill="#C9C3D6" stroke="#7F798C" stroke-width="2"/><path d="M17 21q2-3 5-1" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".7"/>',
    marble:'<circle cx="24" cy="25" r="13" fill="#9ED8E8" stroke="#4C93A8" stroke-width="2"/><path d="M15 28c6-1 10-7 18-6" stroke="#4FAE9A" stroke-width="3" fill="none"/><circle cx="19" cy="19" r="3" fill="#FFFFFF" opacity=".85"/>',
    letter:'<rect x="9" y="14" width="30" height="21" rx="3" fill="#FFFFFF" stroke="#C9A97A" stroke-width="2"/><path d="M9 16l15 11 15-11" fill="none" stroke="#C9A97A" stroke-width="2"/><path d="M24 33c-4-3-5-5-3.5-6.5 1-1 2.5-.5 3.5.7 1-1.2 2.5-1.7 3.5-.7 1.5 1.5.5 3.5-3.5 6.5z" fill="#F0728E"/>',
    starpiece:'<path d="M24 8l4.5 10 11 1-8.3 7.4 2.5 10.8L24 31.6l-9.7 5.6 2.5-10.8L8.5 19l11-1z" fill="#FFE08A" stroke="#D9A83A" stroke-width="2" stroke-linejoin="round"/><circle cx="37" cy="9" r="2" fill="#FFE08A"/><circle cx="10" cy="38" r="1.6" fill="#FFE08A"/>',
    sakura:[0,72,144,216,288].map(a => `<ellipse cx="24" cy="15" rx="5.5" ry="8" fill="#F9C6D3" stroke="#D98AA0" stroke-width="1.4" transform="rotate(${a} 24 25)"/>`).join('') + '<circle cx="24" cy="25" r="3" fill="#E8869E"/>',
    tanpopo:'<path d="M24 30v12" stroke="#5C8A3A" stroke-width="3"/>' + Array.from({ length:12 }, (_, i) => `<ellipse cx="24" cy="12" rx="2.6" ry="7" fill="#F7D046" transform="rotate(${i * 30} 24 20)"/>`).join('') + '<circle cx="24" cy="20" r="4" fill="#E9B52A"/>',
    clover:'<path d="M24 26v14" stroke="#4F8F45" stroke-width="3"/>' + [-90, 30, 150].map(a => `<path d="M24 24c-6-6-12 0-6 5 3 3 6 2 6 0z" fill="#7CC26A" stroke="#4F8F45" stroke-width="1.6" transform="rotate(${a + 90} 24 24)"/>`).join(''),
    yotsuba:'<path d="M24 26v14" stroke="#4F8F45" stroke-width="3"/>' + [0, 90, 180, 270].map(a => `<path d="M24 24c-6-6-12 0-6 5 3 3 6 2 6 0z" fill="#5FB35A" stroke="#3E7F3A" stroke-width="1.6" transform="rotate(${a + 45} 24 24)"/>`).join('') + '<circle cx="24" cy="24" r="2" fill="#FFE08A"/>',
    ajisai:[[18,20],[28,18],[22,28],[31,27],[24,22]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="6" fill="${['#9FB4EA','#B9A6E6','#8FC7EA','#C7B6EE','#A8BDF0'][i]}" stroke="#6E7FC0" stroke-width="1.2"/>`).join('') + '<path d="M14 36c4-2 8-2 10 0M34 36c-4-2-8-2-10 0" stroke="#5C8A3A" stroke-width="3" fill="none"/>',
    shell:'<path d="M24 38L9 22c3-10 27-10 30 0z" fill="#FCE3D6" stroke="#D99B86" stroke-width="2" stroke-linejoin="round"/><path d="M24 38L16 16M24 38V13M24 38l8-22" stroke="#D99B86" stroke-width="1.6"/>',
    seed:'<path d="M24 10c7 6 9 18 0 28-9-10-7-22 0-28z" fill="#5A4636" stroke="#2E2420" stroke-width="2"/><path d="M24 14v20" stroke="#F4F1EC" stroke-width="2.4" stroke-dasharray="3 3"/>',
    donguri:'<path d="M14 22c0 10 4 17 10 17s10-7 10-17z" fill="#B9824F" stroke="#7A4A2A" stroke-width="2"/><path d="M12 22c0-6 6-10 12-10s12 4 12 10z" fill="#8B5A3C" stroke="#5A3A24" stroke-width="2"/><path d="M24 12V7" stroke="#5A3A24" stroke-width="3" stroke-linecap="round"/>',
    momiji:'<path d="M24 8l3 9 8-5-3 9 9 1-8 5 5 7-9-3-1 9-4-8-4 8-1-9-9 3 5-7-8-5 9-1-3-9 8 5z" fill="#E8604A" stroke="#A8382A" stroke-width="1.6" stroke-linejoin="round"/><path d="M24 30v12" stroke="#A8382A" stroke-width="2.4"/>',
    ichou:'<path d="M24 40V28M24 28L10 18c4-8 24-8 28 0z" fill="#F5C84C" stroke="#C9952A" stroke-width="2" stroke-linejoin="round"/><path d="M24 28l-2-12" stroke="#C9952A" stroke-width="1.6"/>',
    pinecone:'<ellipse cx="24" cy="26" rx="10" ry="14" fill="#9B6A42" stroke="#5A3A24" stroke-width="2"/><path d="M15 20l9 5 9-5M14 27l10 5 10-5M16 34l8 4 8-4" fill="none" stroke="#5A3A24" stroke-width="1.6"/>',
    tsubaki:[0,72,144,216,288].map(a => `<circle cx="24" cy="15" r="7" fill="#E8505A" stroke="#A23A44" stroke-width="1.4" transform="rotate(${a} 24 24)"/>`).join('') + '<circle cx="24" cy="24" r="4" fill="#F5C84C"/>',
    snowman:'<circle cx="24" cy="31" r="10" fill="#FFFFFF" stroke="#9AA3B5" stroke-width="2"/><circle cx="24" cy="16" r="7" fill="#FFFFFF" stroke="#9AA3B5" stroke-width="2"/><circle cx="21.5" cy="15" r="1.2" fill="#3A3147"/><circle cx="26.5" cy="15" r="1.2" fill="#3A3147"/><path d="M24 17.5l4 1-4 1z" fill="#F0A04B"/><path d="M17 22h14" stroke="#E8505A" stroke-width="3" stroke-linecap="round"/>',
  };
  return P[id] || P.stone;
}

/* ===== room decoration ===== */
const DECOR = {
  wall: [
    { id:'mint_dots', ja:'ミントのみずたま', lv:1, base:'#E1EFE9', pat:'dots', pc:'rgba(255,255,255,.65)' },
    { id:'peach_dots', ja:'ピーチのみずたま', lv:4, base:'#FBE3D6', pat:'dots', pc:'rgba(255,255,255,.65)' },
    { id:'sky_stripe', ja:'みずいろストライプ', lv:8, base:'#DCEAF7', pat:'stripe', pc:'rgba(255,255,255,.7)' },
    { id:'lemon_check', ja:'レモンのチェック', lv:13, base:'#FFF4CC', pat:'check', pc:'rgba(240,196,80,.22)' },
    { id:'pink_heart', ja:'ハートがら', lv:19, base:'#FCE4EB', pat:'heart', pc:'#F7C1D0' },
    { id:'wood', ja:'木のかべ', lv:26, base:'#EAD3B0', pat:'wood', pc:'rgba(140,96,52,.14)' },
    { id:'lavender', ja:'ラベンダー', lv:33, base:'#E8E1F5', pat:'dots', pc:'rgba(255,255,255,.7)' },
    { id:'starry', ja:'ほしぞらのかべ', lv:40, base:'#46508A', pat:'star', pc:'#FFF3B0' },
  ],
  floor: [
    { id:'wood_light', ja:'あかるい木', lv:1, c1:'#EACFA6', c2:'#DDB98C', pat:'boards' },
    { id:'wood_dark', ja:'こげ茶の木', lv:7, c1:'#C39A70', c2:'#AD8158', pat:'boards' },
    { id:'tatami', ja:'たたみ', lv:16, c1:'#DCD9A4', c2:'#CBC78E', pat:'tatami' },
    { id:'tile', ja:'チェックのタイル', lv:24, c1:'#F3EFE7', c2:'#E1DACD', pat:'tile' },
    { id:'carpet', ja:'ふかふかカーペット', lv:38, c1:'#CADAEE', c2:'#B7CAE4', pat:'plain' },
  ],
  rug: [
    { id:'blue', ja:'あおいラグ', lv:1, rings:['#CFDDF5','#FFFFFF','#B9CBEF'] },
    { id:'pink', ja:'ピンクのラグ', lv:5, rings:['#F9D3DE','#FFFFFF','#F2B5C6'] },
    { id:'mint', ja:'ミントのラグ', lv:11, rings:['#CDEEE3','#FFFFFF','#A8DCCB'] },
    { id:'tricolore', ja:'トリコロールのラグ', lv:17, rings:['#1F4FA3','#FFFFFF','#D9272E'] },
    { id:'sun', ja:'おひさまラグ', lv:30, rings:['#FFE7A3','#FFFFFF','#F7CF6B'] },
    { id:'stripe', ja:'しましまラグ', lv:44, stripe:['#F6C9A8','#FFFFFF'] },
    { id:'none', ja:'ラグなし', lv:1, none:true },
  ],
  bed: [
    { id:'pink', ja:'ピンクのクッション', lv:1, c:'#F3B9C6', i:'#F9D6DE', l:'#C77E91' },
    { id:'blue', ja:'あおいクッション', lv:6, c:'#B8CDEB', i:'#DCE7F7', l:'#7E97C2' },
    { id:'mint', ja:'ミントのクッション', lv:12, c:'#AEDDCB', i:'#D6F0E6', l:'#6FAE97' },
    { id:'yellow', ja:'きいろのクッション', lv:22, c:'#F6D98C', i:'#FBEBC0', l:'#C9A44C' },
    { id:'lavender', ja:'ラベンダーのクッション', lv:35, c:'#CDBDEB', i:'#E6DDF6', l:'#8F7CC0' },
  ],
  view: [
    { id:'sky', ja:'おそら', lv:1 },
    { id:'town', ja:'まちなみ', lv:9 },
    { id:'mountain', ja:'やま', lv:14 },
    { id:'sea', ja:'うみ', lv:21 },
    { id:'forest', ja:'もり', lv:29 },
  ],
};
const DECOR_CATS = [['wall','かべがみ'],['floor','ゆか'],['rug','ラグ'],['bed','ベッド'],['view','まどのけしき']];
const ROOM_DEFAULT = { wall:'mint_dots', floor:'wood_light', rug:'blue', bed:'pink', view:'sky', season:true };

/* ---- src/js_pet.js ---- */
/* ===== color utils ===== */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function isHex(v){ return typeof v === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.trim()); }
function hexToRgb(h){ h = h.trim().replace('#',''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function rgbToHex(r, g, b){ return '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join(''); }
function mix(a, b, t){ const A = hexToRgb(a), C = hexToRgb(b); return rgbToHex(A[0] + (C[0] - A[0]) * t, A[1] + (C[1] - A[1]) * t, A[2] + (C[2] - A[2]) * t); }
function lum(h){ const [r, g, b] = hexToRgb(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; }
const lighten = (c, t) => mix(c, '#ffffff', t);
const normHex = h => { const [r, g, b] = hexToRgb(h); return rgbToHex(r, g, b); };

/* ===== look normalisation ===== */
const ENUMS = {
  ear: ['pointy','big','small','floppy','long','semi','fold'],
  coat: ['smooth','fluffy','curly','long'],
  muzzle: ['short','medium','long'],
  tail: ['curl','plume','straight','stub','long','fluffy'],
  face: ['muzzle','lower','mask','hachiware','blaze'],
  legs: ['normal','short'],
};
function normalizeLook(raw){
  raw = raw || {};
  const sp = raw.species === 'cat' ? 'cat' : 'dog';
  let preset = BREED_BY_ID[raw.breedId];
  if (!preset || preset.sp !== sp) preset = BREED_BY_ID[sp === 'cat' ? 'mix_cat' : 'mix_dog'];
  const P = preset.look;
  const L = { species: sp, breedId: (BREED_BY_ID[raw.breedId] ? raw.breedId : preset.id) };
  for (const k in ENUMS) L[k] = ENUMS[k].includes(raw[k]) ? raw[k] : P[k];
  const useRaw = raw.colors && isHex(raw.colors.main);
  const src = useRaw ? raw.colors : P.colors;
  const srcM = useRaw ? (raw.marks || {}) : (P.marks || {});
  const hx = (v, d) => isHex(v) ? normHex(v) : d;
  const c = {};
  c.main = hx(src.main, '#C9A27A');
  c.body = hx(src.body, c.main);
  c.ear = hx(src.ear, c.main);
  c.tail = hx(src.tail, c.body);
  c.face = hx(src.face, c.main);
  c.chest = hx(src.chest, c.face === c.main ? c.body : c.face);
  c.paws = hx(src.paws, c.body);
  c.tailTip = hx(src.tailTip, null);
  c.eye = hx(src.eye, sp === 'cat' ? '#E3B04A' : '#2B1E1A');
  c.nose = hx(src.nose, sp === 'cat' ? (lum(c.main) < .06 ? '#5A4650' : '#F0A0AA') : '#2E2328');
  const m = {};
  for (const k of ['stripes','spots','patchL','patchR','brows','mask','saddle']) m[k] = hx(srcM[k], null);
  m.bodyPatch = !!srcM.bodyPatch && !!(m.patchL || m.patchR);
  L.colors = c; L.marks = m;
  return L;
}

/* ===== geometry helpers ===== */
const f1 = n => Math.round(n * 10) / 10;
function ellD(cx, cy, rx, ry){ return `M${f1(cx - rx)} ${f1(cy)}a${rx} ${ry} 0 1 0 ${f1(2 * rx)} 0a${rx} ${ry} 0 1 0 ${f1(-2 * rx)} 0Z`; }
function blob(cx, cy, rx, ry, n, amp){
  let d = '';
  const k = 1 + amp * 2.2;
  for (let i = 0; i < n; i++){
    const a0 = -Math.PI / 2 + i / n * 2 * Math.PI, a1 = -Math.PI / 2 + (i + 1) / n * 2 * Math.PI, am = (a0 + a1) / 2;
    if (i === 0) d += `M${f1(cx + rx * Math.cos(a0))} ${f1(cy + ry * Math.sin(a0))}`;
    d += `Q${f1(cx + rx * k * Math.cos(am))} ${f1(cy + ry * k * Math.sin(am))} ${f1(cx + rx * Math.cos(a1))} ${f1(cy + ry * Math.sin(a1))}`;
  }
  return d + 'Z';
}
const MIRROR = 'matrix(-1 0 0 1 240 0)';
const EARS = {
  pointy: { o:'M66 74C60 48 62 26 70 14C86 22 100 38 108 54Z', i:'M74 62C71 46 72 34 76 26C85 33 93 42 98 52Z' },
  big:    { o:'M60 82C48 52 48 18 58 4C82 12 100 32 110 56Z', i:'M69 68C62 46 62 26 65 16C79 24 91 38 98 52Z' },
  small:  { o:'M72 66C70 52 72 40 78 32C88 38 96 46 102 54Z', i:'M78 60C77 51 78 45 81 41C87 45 91 49 94 53Z' },
  floppy: { o:'M98 54C80 48 58 56 48 76C38 96 40 124 52 136C62 146 74 136 78 120C82 100 88 76 98 54Z' },
  long:   { o:'M98 54C78 46 54 56 44 80C34 106 36 140 46 160C56 176 76 168 80 146C84 120 88 80 98 54Z' },
  semi:   { o:'M70 70C66 54 72 40 86 36C98 34 106 44 108 54C100 56 92 62 88 72C84 78 76 78 70 70Z' },
  fold:   { o:'M78 62C78 50 88 44 100 48C104 56 98 64 88 68C82 70 78 68 78 62Z' },
};
let PET_SEQ = 0;

/* ===== the chibi pet ===== */
function renderPet(rawLook, opts = {}){
  const L = normalizeLook(rawLook);
  const c = L.colors, m = L.marks, cat = L.species === 'cat';
  const id = 'pt' + (++PET_SEQ);
  const SW = 2.4;
  const ol = col => mix(col, '#3A2A3A', .5);
  const S = col => `fill="${col}" stroke="${ol(col)}" stroke-width="${SW}" stroke-linejoin="round"`;
  const fluffy = L.coat === 'fluffy' || L.coat === 'long', curly = L.coat === 'curly';
  const HX = 120, HY = 100, hrx = cat ? 62 : 60, hry = cat ? 50 : 51;
  const headD = curly ? blob(HX, HY, hrx, hry, 18, .07) : fluffy ? blob(HX, HY, hrx + 1, hry + 1, 16, .05) : ellD(HX, HY, hrx, hry);
  const BX = 120, BY = 182, brx = cat ? 42 : 46, bry = 40;
  const bodyD = curly ? blob(BX, BY, brx, bry, 16, .07) : fluffy ? blob(BX, BY, brx + 1, bry, 14, .05) : ellD(BX, BY, brx, bry);
  const thick = (d, col, w) => `<path d="${d}" fill="none" stroke="${ol(col)}" stroke-width="${w + SW * 2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

  /* tail */
  let tail = '';
  const tc = c.tail;
  if (L.tail === 'curl'){
    tail = thick('M150 190C176 196 194 176 186 156C180 140 160 140 158 154C157 164 168 168 174 160', tc, 17);
    if (c.tailTip) tail += `<circle cx="174" cy="160" r="8" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'plume'){
    tail = `<path d="${blob(176, 160, 24, 30, 12, .08)}" ${S(tc)}/>`;
  } else if (L.tail === 'straight'){
    const d = 'M150 196C172 194 186 178 192 152';
    tail = thick(d, tc, fluffy ? 15 : 12);
    if (c.tailTip) tail += `<circle cx="192" cy="152" r="${fluffy ? 7.5 : 6}" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'stub'){
    tail = `<ellipse cx="163" cy="204" rx="9" ry="8" ${S(tc)}/>`;
  } else {
    const d = 'M154 206C188 210 198 186 192 160C189 146 194 136 202 134';
    const w = L.tail === 'fluffy' ? 22 : 13;
    tail = thick(d, tc, w);
    if (m.stripes) tail += `<path d="${d}" fill="none" stroke="${m.stripes}" stroke-width="${w}" stroke-dasharray="5 11" stroke-dashoffset="-14"/>`;
    if (c.tailTip) tail += `<circle cx="202" cy="134" r="${w / 2}" fill="${c.tailTip}"/>`;
  }

  /* body */
  const hx1 = cat ? 84 : 80, hx2 = 240 - hx1, hrr = cat ? 19 : 22;
  const haunchCol = m.saddle || c.body;
  const legTop = L.legs === 'short' ? 196 : 176;
  const chestFill = c.chest === c.body ? lighten(c.body, lum(c.body) > .7 ? 0 : .1) : c.chest;
  let body = `<path d="${bodyD}" ${S(c.body)}/>`;
  body += `<g clip-path="url(#${id}b)">`;
  if (m.saddle) body += `<ellipse cx="120" cy="150" rx="62" ry="26" fill="${m.saddle}"/>`;
  if (m.bodyPatch){
    if (m.patchR) body += `<ellipse cx="148" cy="174" rx="19" ry="15" fill="${m.patchR}"/>`;
    if (m.patchL) body += `<ellipse cx="90" cy="196" rx="16" ry="12" fill="${m.patchL}"/>`;
  }
  body += `<ellipse cx="120" cy="164" rx="${cat ? 20 : 23}" ry="25" fill="${chestFill}"/>`;
  if (m.stripes) body += `<path d="M78 166q10 3 17-5M76 182q12 3 19-5M162 166q-10 3-17-5M164 182q-12 3-19-5" fill="none" stroke="${m.stripes}" stroke-width="5" stroke-linecap="round"/>`;
  if (m.spots) body += [[92,170,5],[148,166,6],[141,196,4.5],[99,199,5],[160,188,4],[82,186,3.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${m.spots}"/>`).join('');
  body += `</g><path d="${bodyD}" fill="none" stroke="${ol(c.body)}" stroke-width="${SW}"/>`;
  const haunch = x => fluffy || curly ? `<path d="${blob(x, 206, hrr, 16, 9, .07)}" ${S(haunchCol)}/>` : `<ellipse cx="${x}" cy="206" rx="${hrr}" ry="16" ${S(haunchCol)}/>`;
  const feet = `<ellipse cx="${hx1 - 6}" cy="219" rx="12" ry="6.5" ${S(c.paws)}/><ellipse cx="${hx2 + 6}" cy="219" rx="12" ry="6.5" ${S(c.paws)}/>`;
  const legPart = (x, px, toes, sx) => `<rect x="${x}" y="${legTop}" width="19" height="${218 - legTop}" rx="9.5" ${S(c.body)}/>` +
    (m.stripes && L.legs !== 'short' ? `<path d="M${sx} 194h6M${sx} 202h6" stroke="${m.stripes}" stroke-width="3.5" stroke-linecap="round"/>` : '') +
    `<ellipse cx="${px}" cy="217" rx="12" ry="7.5" ${S(c.paws)}/>` +
    `<path d="M${toes[0]} 213.5v5M${toes[1]} 213.5v5" stroke="${ol(c.paws)}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`;
  const legs = `<g class="pv-legL">${legPart(99, 108.5, [104.5, 112.5], 101)}</g><g class="pv-legR">${legPart(122, 131.5, [127.5, 135.5], 133)}</g>`;

  /* head */
  const backEar = ['pointy','big','small'].includes(L.ear);
  const earL = (m.patchL && c.ear === c.main) ? m.patchL : c.ear;
  const earR = (m.patchR && c.ear === c.main) ? m.patchR : c.ear;
  const innerCol = col => cat ? mix(col, '#F4AEBB', .7) : mix(col, '#F3C2C9', .55);
  let earsBack = '', earsFront = '';
  if (backEar){
    const E = EARS[L.ear];
    earsBack = `<path d="${E.o}" ${S(earL)}/><path d="${E.i}" fill="${innerCol(earL)}"/>` +
      `<g transform="${MIRROR}"><path d="${E.o}" ${S(earR)}/><path d="${E.i}" fill="${innerCol(earR)}"/></g>`;
  } else {
    const d = (L.ear === 'long' && (curly || fluffy)) ? blob(66, 112, 22, 46, 12, .07) : EARS[L.ear].o;
    earsFront = `<path d="${d}" ${S(earL)}/><g transform="${MIRROR}"><path d="${d}" ${S(earR)}/></g>`;
  }
  let ruff = '';
  if (fluffy || curly){
    const big = L.ear === 'small' && fluffy;
    const rc = c.chest !== c.body ? mix(c.body, c.chest, .5) : c.body;
    ruff = `<path d="${blob(120, 142, big ? 64 : (cat ? 50 : 54), big ? 34 : 26, 14, .09)}" ${S(rc)}/>`;
  }
  const EX = cat ? [96, 144] : [97, 143], EY = cat ? 97 : 98;
  const NY = cat ? { short:109, medium:111, long:113 }[L.muzzle] : { short:112, medium:116, long:119 }[L.muzzle];
  const mz = { short:[19, 13], medium:[22, 15], long:[24, 17] }[L.muzzle];

  let faceIn = '';
  if (m.patchL) faceIn += `<ellipse cx="90" cy="${HY - 14}" rx="38" ry="36" fill="${m.patchL}"/>`;
  if (m.patchR) faceIn += `<ellipse cx="150" cy="${HY - 14}" rx="38" ry="36" fill="${m.patchR}"/>`;
  const fc = c.face;
  if (L.face === 'lower') faceIn += `<ellipse cx="120" cy="${HY + 30}" rx="${cat ? 50 : 48}" ry="30" fill="${fc}"/>`;
  else if (L.face === 'mask'){
    faceIn += `<ellipse cx="120" cy="${HY + 20}" rx="58" ry="34" fill="${fc}"/><ellipse cx="${EX[0]}" cy="${EY}" rx="16" ry="13" fill="${fc}"/><ellipse cx="${EX[1]}" cy="${EY}" rx="16" ry="13" fill="${fc}"/>`;
    faceIn += `<path d="M112 ${HY - 54}L128 ${HY - 54}L124 ${HY - 8}Q120 ${HY - 2} 116 ${HY - 8}Z" fill="${c.main}"/>`;
  } else if (L.face === 'hachiware'){
    faceIn += `<path d="M120 ${HY - 36}C124 ${HY - 18} 130 ${HY + 6} 150 ${HY + 14}C166 ${HY + 18} 180 ${HY + 14} 190 ${HY + 12}L190 ${HY + 60}L50 ${HY + 60}L50 ${HY + 12}C60 ${HY + 14} 74 ${HY + 18} 90 ${HY + 14}C110 ${HY + 6} 116 ${HY - 18} 120 ${HY - 36}Z" fill="${fc}"/>`;
  } else if (L.face === 'blaze'){
    faceIn += `<path d="M115 ${HY - 54}L125 ${HY - 54}C126 ${HY - 20} 130 ${HY - 2} 146 ${HY + 10}L172 ${HY + 60}L68 ${HY + 60}L94 ${HY + 10}C110 ${HY - 2} 114 ${HY - 20} 115 ${HY - 54}Z" fill="${fc}"/>`;
  }
  if (m.stripes){
    faceIn += `<path d="M112 ${HY - 44}l2 12M120 ${HY - 47}v14M128 ${HY - 44}l-2 12M60 ${HY + 2}l14 3M62 ${HY + 12}h12M180 ${HY + 2}l-14 3M178 ${HY + 12}h-12" fill="none" stroke="${m.stripes}" stroke-width="4.5" stroke-linecap="round"/>`;
  }
  if (m.spots) faceIn += [[100,64,4],[140,60,5],[124,72,3.5],[70,94,4],[170,90,4.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${m.spots}"/>`).join('');
  if (m.brows) faceIn += `<ellipse cx="${EX[0]}" cy="${EY - 16}" rx="5.5" ry="4" fill="${m.brows}"/><ellipse cx="${EX[1]}" cy="${EY - 16}" rx="5.5" ry="4" fill="${m.brows}"/>`;

  // colour around the eyes decides rim + line colour
  const eyeArea = L.face === 'mask' ? fc : (m.patchL || c.main);
  const darkEyes = lum(eyeArea) < .12;
  const lineCol = darkEyes ? '#FFF2EA' : '#2E2430';
  const muzzleFill = c.face === c.main ? lighten(c.main, lum(c.main) > .7 ? 0 : .16) : c.face;
  let muzzle = '';
  if (!cat){
    if (muzzleFill !== c.main) muzzle = `<ellipse cx="120" cy="${NY + 7}" rx="${mz[0]}" ry="${mz[1]}" fill="${muzzleFill}"/>`;
  } else if (muzzleFill !== c.main){
    muzzle = `<circle cx="113.5" cy="${NY + 6}" r="7.5" fill="${muzzleFill}"/><circle cx="126.5" cy="${NY + 6}" r="7.5" fill="${muzzleFill}"/>`;
  }
  let maskSvg = '';
  if (m.mask){
    maskSvg = cat ? `<ellipse cx="120" cy="${NY - 4}" rx="38" ry="32" fill="url(#${id}g)"/>` : `<ellipse cx="120" cy="${NY + 2}" rx="31" ry="26" fill="url(#${id}g)"/>`;
  }
  const muzzleDark = lum(m.mask || muzzleFill) < .12;
  const mouthCol = muzzleDark ? '#F4E6EA' : '#3A2A33';

  // eyes
  const lightIris = lum(c.eye) > .06;
  let eyeOpen = '';
  for (const x of EX){
    eyeOpen += `<g class="pv-eye">`;
    if (darkEyes) eyeOpen += `<ellipse cx="${x}" cy="${EY}" rx="${cat ? 12.5 : 11.5}" ry="${cat ? 14 : 13}" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="2"/>`;
    eyeOpen += `<ellipse cx="${x}" cy="${EY}" rx="${cat ? 10 : 9}" ry="${cat ? 11.5 : 10.5}" fill="${c.eye}"/>`;
    if (lightIris) eyeOpen += `<ellipse cx="${x}" cy="${EY + 1}" rx="${cat ? 3.6 : 4.4}" ry="${cat ? 8.5 : 6}" fill="#1E1620"/>`;
    eyeOpen += `<circle cx="${x + 3.4}" cy="${EY - 4.2}" r="3.6" fill="#fff"/><circle cx="${x - 3.4}" cy="${EY + 4.4}" r="1.7" fill="#fff" opacity=".85"/></g>`;
  }
  const arcs = (dy1, dy2) => EX.map(x => `M${x - 9} ${EY + dy1}Q${x} ${EY + dy2} ${x + 9} ${EY + dy1}`).join('');
  const eyeHappy = `<path d="${arcs(2, -8)}" fill="none" stroke="${lineCol}" stroke-width="3.6" stroke-linecap="round"/>`;
  const eyeClosed = `<path d="${arcs(0, 7)}" fill="none" stroke="${lineCol}" stroke-width="3.4" stroke-linecap="round"/>`;
  const browSad = `<path d="M${EX[0] - 8} ${EY - 13}L${EX[0] + 6} ${EY - 18}M${EX[1] + 8} ${EY - 13}L${EX[1] - 6} ${EY - 18}" stroke="${lineCol}" stroke-width="3" stroke-linecap="round"/>`;

  // nose + mouth
  let nose, mouthW, mouthO;
  if (!cat){
    nose = `<path d="M112 ${NY - 2}Q120 ${NY - 7} 128 ${NY - 2}Q128 ${NY + 5} 120 ${NY + 8}Q112 ${NY + 5} 112 ${NY - 2}Z" fill="${c.nose}"/><ellipse cx="117" cy="${NY - 1}" rx="2.4" ry="1.4" fill="#fff" opacity=".6"/>`;
    mouthW = `<path d="M120 ${NY + 8}V${NY + 12}M111 ${NY + 11}Q115.5 ${NY + 17} 120 ${NY + 12}Q124.5 ${NY + 17} 129 ${NY + 11}" fill="none" stroke="${mouthCol}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
    mouthO = `<path d="M110 ${NY + 11}Q120 ${NY + 29} 130 ${NY + 11}Q120 ${NY + 15} 110 ${NY + 11}Z" fill="#7A2F43"/><ellipse cx="120" cy="${NY + 21}" rx="5.5" ry="4" fill="#F38BA0"/>`;
  } else {
    nose = `<path d="M115 ${NY - 3}H125Q125 ${NY} 120 ${NY + 3}Q115 ${NY} 115 ${NY - 3}Z" fill="${c.nose}"/>`;
    mouthW = `<path d="M120 ${NY + 3}V${NY + 6}M113 ${NY + 6}Q116.5 ${NY + 10} 120 ${NY + 6}Q123.5 ${NY + 10} 127 ${NY + 6}" fill="none" stroke="${mouthCol}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
    mouthO = `<path d="M113 ${NY + 6}Q120 ${NY + 20} 127 ${NY + 6}Q120 ${NY + 9} 113 ${NY + 6}Z" fill="#7A2F43"/><ellipse cx="120" cy="${NY + 13}" rx="3.6" ry="2.8" fill="#F38BA0"/>`;
  }
  const cheeks = `<g class="pv-cheek"><ellipse cx="${EX[0] - 12}" cy="${NY + 2}" rx="8.5" ry="5" fill="#FF9DB2"/><ellipse cx="${EX[1] + 12}" cy="${NY + 2}" rx="8.5" ry="5" fill="#FF9DB2"/></g>`;
  let whiskers = '';
  if (cat){
    const wc = lum(c.main) < .2 ? 'rgba(255,255,255,.6)' : 'rgba(60,40,55,.38)';
    whiskers = `<path d="M104 ${NY + 4}L78 ${NY - 1}M104 ${NY + 7}H77M104 ${NY + 10}L79 ${NY + 15}M136 ${NY + 4}L162 ${NY - 1}M136 ${NY + 7}H163M136 ${NY + 10}L161 ${NY + 15}" stroke="${wc}" stroke-width="1.6" stroke-linecap="round"/>`;
  }

  const WS = wearSvg(wearFrom(opts), { id, SW, HX, HY, EX, EY, ear:L.ear });

  const head = `${ruff}${earsBack}
    <path d="${headD}" ${S(c.main)}/>
    <g clip-path="url(#${id}h)">${faceIn}</g>
    <path d="${headD}" fill="none" stroke="${ol(c.main)}" stroke-width="${SW}"/>
    ${earsFront}${muzzle}${maskSvg}
    <g class="pv-eyes-open">${eyeOpen}</g>
    <g class="pv-eyes-happy">${eyeHappy}</g>
    <g class="pv-eyes-closed">${eyeClosed}</g>
    <g class="pv-brow-sad">${browSad}</g>
    ${nose}${whiskers}
    <g class="pv-mouth-w">${mouthW}</g>
    <g class="pv-mouth-o">${mouthO}</g>
    ${cheeks}${WS.face}${WS.head}`;

  return `<svg class="pet-svg" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <clipPath id="${id}h"><path d="${headD}"/></clipPath>
    <clipPath id="${id}b"><path d="${bodyD}"/></clipPath>
    ${WS.defs}
    ${m.mask ? `<radialGradient id="${id}g"><stop offset="0" stop-color="${m.mask}" stop-opacity=".95"/><stop offset=".55" stop-color="${m.mask}" stop-opacity=".85"/><stop offset="1" stop-color="${m.mask}" stop-opacity="0"/></radialGradient>` : ''}
  </defs>
  <ellipse class="pv-shadow" cx="120" cy="225" rx="62" ry="8" fill="rgba(58,40,60,.16)"/>
  <g class="pv-all">
    <g class="pv-tail">${tail}</g>
    <g class="pv-body">${haunch(hx1)}${haunch(hx2)}${feet}${body}<g class="pv-legs">${legs}</g></g>
    <g class="pv-head">${head}</g>
    <g class="pv-neck">${WS.neck}</g>
  </g>
</svg>`;
}

/* ---- src/js_rules.js ---- */
/* ===== rules: what happens to the save, without the screen =====
   The same file runs on the LINE server (tools/build_server.py puts it into game.js), so nothing here may touch the page.
   - Every function takes the save (`st`) it changes, and returns what happened as a list of events (`ev`)
     that the screen turns into popups, toasts and words (js_app.js / js_features.js: playEvents).
   - Time, the calendar day and chance all come from Clock. The home-screen and Claude versions use this device's clock;
     the LINE server uses its own clock (Japan time) and random numbers, and the LINE screen follows the server's clock. */
const Clock = {
  now(){ return Date.now(); },
  /* the calendar day of a time, YYYY-MM-DD (here: this device's local date) */
  dayKey(t){
    const d = t == null ? new Date(this.now()) : (t instanceof Date ? t : new Date(t));
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },
  rand(){ return Math.random(); },
};
const now = () => Clock.now();
function dayKey(t){ return Clock.dayKey(t); }
/* a Date at local midnight of a YYYY-MM-DD day: its getMonth()/getDate() are that day's, in any time zone */
function dateOfDay(key){ const [Y, M, D] = String(key).split('-').map(Number); return new Date(Y, M - 1, D); }
/* "today" on the rules' clock, as a Date for month/day checks (seasons, events) */
const clockDate = () => dateOfDay(dayKey());
/* shift a YYYY-MM-DD key by whole calendar days (pure date arithmetic, no time zone) */
function keyShift(key, k){
  const [Y, M, D] = key.split('-').map(Number), d = new Date(Date.UTC(Y, M - 1, D + k));
  return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
}
const keyDiff = (a, b) => { const p = k => { const [Y, M, D] = k.split('-').map(Number); return Date.UTC(Y, M - 1, D); }; return Math.round((p(b) - p(a)) / 864e5); };
const daysBetween = (a, b) => Math.floor((new Date(dayKey(b)) - new Date(dayKey(a))) / 864e5);
const mdOfKey = k => { const [, M, D] = k.split('-').map(Number); return `${M}/${D}`; };
function hashStr(s){ let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed){
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function levelInfo(love){
  let lv = 1, acc = 0, need = 20;
  while (lv < MAX_LV && love >= acc + need){ acc += need; lv++; need = 20 + (lv - 1) * 5; }
  const max = lv >= MAX_LV;
  return { lv, into:max ? need : love - acc, need, max };
}
function newState(pet, t = now()){
  return { v:1, pet, stats:{ full:72, mood:78, love:0 }, counts:{ meals:0, treats:0, pets:0, plays:0 }, recentTreats:[], last:t, created:t, updated:t };
}
function breedLabel(p){
  const b = BREED_BY_ID[p.breedId];
  const bn = b ? b.ja : '';
  if (!p.colorName) return bn;
  return p.colorName.includes(bn) ? p.colorName : p.colorName + 'の' + bn;
}
function eventTreat(e){ return Object.assign({ line:e.hello, ev:e.id, evJa:e.ja }, EVENT_TREAT_STATS, e.treat); }

const RESCUE_EVERY = 7;
const TRICK_LOVE_A_DAY = 10;
const STROKE_MAX = 12;       /* なでなでのなかよし：たまる上限（回分）と、1回分がたまる分数 */
const STROKE_MINUTES = 3;

const Rules = {
  /* おなか・ごきげんは、前に計算した時刻（last）からの時間で減る */
  decay(st, t = now()){
    if (!st) return;
    const hrs = Math.max(0, (t - (st.last || t)) / 3.6e6);
    const s = st.stats;
    s.full = clamp(s.full - hrs * 8, 0, 100);
    s.mood = clamp(s.mood - hrs * 5 - (s.full < 25 ? hrs * 4 : 0), 0, 100);
    st.last = t;
  },
  lv(st){ return levelInfo(st.stats.love).lv; },
  isCat(st){ return !!st && st.pet.species === 'cat'; },
  wear(st){
    if (!st.pet.wear){ st.pet.wear = wearFrom(st.pet); delete st.pet.acc; }
    for (const k of ['head','face','neck']){
      const v = st.pet.wear[k];
      if (v && WEAR_RENAMED[v]) st.pet.wear[k] = WEAR_RENAMED[v];
      else if (v && !WEAR_BY_ID[v]) st.pet.wear[k] = null;
    }
    return st.pet.wear;
  },
  wearOwned(st, w, lv = this.lv(st)){ return w.ev ? st.events.got.includes(w.id) : lv >= w.lv; },
  /* the treats that can be given today: this pet's, plus the season's own treat during an event */
  treatList(st){
    const base = TREATS[st.pet.species] || TREATS.dog;
    const ev = activeEvent();
    return ev ? [eventTreat(ev)].concat(base) : base;
  },

  /* ----- album ----- */
  addAlbum(st, k, ti, su, ic, t){
    st.album.unshift({ t:t || now(), k, ti, su:su || '', ic:ic || k });
    st.album.sort((a, b) => b.t - a.t);
    if (st.album.length > 300) st.album.length = 300;
  },
  first(st, key, ti, su, ic){
    if (st.firsts[key]) return false;
    st.firsts[key] = true;
    this.addAlbum(st, 'first', ti, su, ic);
    return true;
  },
  gainLove(st, n, ev){
    const before = levelInfo(st.stats.love).lv;
    st.stats.love = Math.round((st.stats.love + n) * 10) / 10;
    const after = levelInfo(st.stats.love).lv;
    if (after > before){
      for (let lv = before + 1; lv <= after; lv++){
        const t = TITLES.find(([l]) => l === lv);
        if (lv <= 5 || lv % 5 === 0 || t) this.addAlbum(st, 'lv', `なかよしLv ${lv}`, t ? `あたらしい関係「${t[1]}」` : `${st.pet.name}と さらになかよくなった`, 'lv');
      }
      ev.push({ k:'lv', lv:after, before });
    }
  },

  /* ----- きょうのおねがい ----- */
  genDaily(st, day){
    const r = rng(hashStr(day + ':' + (st.created || 0)));
    const lv = this.lv(st);
    const unlocked = (TREATS[st.pet.species] || []).filter(t => t.lv <= lv);
    const pool = [
      () => ({ type:'meal', n:2 }),
      () => r() < .5 ? { type:'treat', n:1 + (r() < .4 ? 1 : 0) } : { type:'treatId', n:1, id:unlocked[Math.floor(r() * unlocked.length)].id },
      () => ({ type:'play', n:2 + (r() < .4 ? 1 : 0) }),
      () => ({ type:'pet', n:[10, 12, 15, 20][Math.floor(r() * 4)] }),
      () => ({ type:'trick', n:2 + (r() < .3 ? 1 : 0) }),
    ];
    if (lv >= 2) pool.push(() => ({ type:'dress', n:1 }));
    if (lv >= 4) pool.push(() => ({ type:'room', n:1 }));
    const list = [], used = new Set();
    let guard = 0;
    while (list.length < 3 && guard++ < 50){
      const i = Math.floor(r() * pool.length);
      if (used.has(i)) continue;
      used.add(i);
      list.push(Object.assign({ got:0, done:false }, pool[i]()));
    }
    return { day, list, all:false };
  },
  /* おたすけのおねがい: exactly one missed calendar day can be bridged, once every RESCUE_EVERY days */
  lastRescueDay(st){ const m = st.rescued.slice().sort().pop(); return m ? keyShift(m, 1) : null; },
  rescueReady(st, d = dayKey()){ const l = this.lastRescueDay(st); return !l || keyDiff(l, d) >= RESCUE_EVERY; },
  nextRescueDay(st){ const l = this.lastRescueDay(st); return l ? keyShift(l, RESCUE_EVERY) : null; },
  gapOfOne(st, d = dayKey()){ return st.streak.n > 0 && st.streak.last === keyShift(d, -2); },
  rescueOpen(st, d = dayKey()){
    if (st.streak.saved && st.streak.saved.day === d) return true;
    return this.gapOfOne(st, d) && this.rescueReady(st, d);
  },
  genRescue(st, d){
    const r = rng(hashStr('rescue:' + d + ':' + (st.created || 0)));
    const used = new Set(st.daily.list.map(x => x.type === 'treatId' ? 'treat' : x.type));
    const pool = [{ type:'pet', n:25 }, { type:'play', n:3 }, { type:'trick', n:3 }, { type:'meal', n:2 }, { type:'treat', n:2 }].filter(x => !used.has(x.type));
    const c = pool.length ? pool[Math.floor(r() * pool.length)] : { type:'pet', n:30 };
    return Object.assign({ got:0, done:false, rescue:true }, c);
  },
  streakInfo(st){
    const t = dayKey(), L = st.streak.last;
    if (st.streak.saved && st.streak.saved.day === t && !(st.daily && st.daily.rescue && st.daily.rescue.done)) return { n:st.streak.saved.n, pinch:true };
    if (L === t || L === keyShift(t, -1)) return { n:st.streak.n, pinch:false };
    if (this.rescueOpen(st, t)) return { n:st.streak.n, pinch:true };
    return { n:0, pinch:false };
  },
  ensureDaily(st){
    const d = dayKey();
    if (!st.daily || st.daily.day !== d) st.daily = this.genDaily(st, d);
    if (!st.daily.rescue && this.rescueOpen(st, d)) st.daily.rescue = this.genRescue(st, d);
    return st.daily;
  },
  reqLeft(st){
    this.ensureDaily(st);
    const open = st.daily.list.filter(r => !r.done).length;
    return open + (st.daily.rescue && !st.daily.rescue.done && this.streakInfo(st).pinch ? 1 : 0);
  },
  bridgeStreak(st, prevN, d){
    const y = keyShift(d, -1);
    st.streak.n = prevN + 1;
    st.streak.last = d;
    st.streak.best = Math.max(st.streak.best || 0, st.streak.n);
    delete st.streak.saved;
    if (!st.rescued.includes(y)) st.rescued.push(y);
    this.addAlbum(st, 'stamp', `れんぞく記録を つないだ！（${st.streak.n}日）`, 'おたすけのおねがいで、おやすみの日を つないだよ', 'rescue');
  },
  rescueComplete(st, r, ev){
    st.stats.mood = clamp(st.stats.mood + 5, 0, 100);
    this.gainLove(st, 5, ev);
    const d = st.daily.day;
    if (st.daily.all && st.streak.saved && st.streak.saved.day === d){
      this.bridgeStreak(st, st.streak.saved.n, d);
      ev.push({ k:'rescue', bridged:true });
    } else ev.push({ k:'rescue', bridged:false });
  },
  reqComplete(st, r, ev){
    st.stats.mood = clamp(st.stats.mood + 5, 0, 100);
    this.gainLove(st, 4, ev);
    ev.push({ k:'req' });
    if (st.daily.list.every(x => x.done) && !st.daily.all){
      st.daily.all = true;
      const d = st.daily.day;
      if (!st.stamps.includes(d)) st.stamps.push(d);
      const y = keyShift(d, -1), prevN = st.streak.n, last = st.streak.last;
      let bridged = false, waiting = false;
      if (last === y) st.streak.n = prevN + 1;
      else if (last === d) st.streak.n = prevN;
      else if (last === keyShift(d, -2) && prevN > 0 && this.rescueReady(st, d)){
        if (st.daily.rescue && st.daily.rescue.done){ this.bridgeStreak(st, prevN, d); bridged = true; }
        else { st.streak.saved = { n:prevN, day:d }; st.streak.n = 1; waiting = true; }
      } else st.streak.n = 1;
      st.streak.last = d;
      st.streak.best = Math.max(st.streak.best || 0, st.streak.n);
      this.gainLove(st, 10, ev);
      if (!this.first(st, 'daily', 'はじめて おねがいを ぜんぶかなえた', 'スタンプカードに 1こめのスタンプ', 'stamp')){
        const total = st.stamps.length;
        if ([3, 7, 14, 30, 50, 100, 200, 365].includes(st.streak.n)) this.addAlbum(st, 'stamp', `おねがい${st.streak.n}日れんぞく！`, 'まいにち ありがとう', 'stamp');
        else if (total % 10 === 0) this.addAlbum(st, 'stamp', `スタンプが${total}こに！`, 'たくさん かなえてくれたね', 'stamp');
      }
      ev.push({ k:'all', bridged, waiting });
    }
  },
  /* a care action counts toward today's requests and the album's firsts */
  track(st, type, data, ev){
    data = data || {};
    this.ensureDaily(st);
    const reqs = st.daily.list.concat(st.daily.rescue ? [st.daily.rescue] : []);
    for (const r of reqs){
      if (r.done) continue;
      const hit = r.type === 'treatId' ? (type === 'treat' && data.id === r.id) : r.type === type;
      if (!hit) continue;
      r.got = Math.min(r.n, r.got + 1);
      if (r.got >= r.n){ r.done = true; if (r.rescue) this.rescueComplete(st, r, ev); else this.reqComplete(st, r, ev); }
    }
    if (type === 'meal') this.first(st, 'meal', 'はじめてのごはん', 'おいしそうに たべたね', 'meal');
    if (type === 'treat') this.first(st, 'treat', 'はじめてのおやつ', `「${data.ja}」をあげた`, 'treat:' + data.id);
    if (type === 'play') this.first(st, 'play', 'はじめてのあそび', this.isCat(st) ? '毛糸玉で じゃれたね' : 'ボールを おいかけたね', 'play');
    if (type === 'pet') this.first(st, 'pet', 'はじめてのなでなで', 'うれしそうだったね', 'pet');
    if (type === 'dress' && data.id && !st.firsts.wear[data.id]){
      st.firsts.wear[data.id] = true;
      const w = WEAR_BY_ID[data.id];
      if (w) this.addAlbum(st, 'wear', `はじめての${w.ja.replace(/（.*?）/, '')}`, `${w.ja}、にあってるね`, 'dress');
    }
    if (type === 'room') this.first(st, 'room', 'はじめてのもようがえ', data.ja ? `${data.ja}にしたよ` : '', 'room');
  },

  /* ----- opening the app: milestones, the season's event, a souvenir, the streak notices ----- */
  checkMilestones(st, ev){
    if (!st.created) return;
    const days = daysBetween(st.created, now());
    for (const n of [7, 30, 100, 200, 300, 500, 1000]){
      const k = 'days' + n;
      if (days >= n && !st.milestones[k]){
        st.milestones[k] = true;
        this.addAlbum(st, 'days', `うちにきて${n}日`, n >= 100 ? 'これからも ずっといっしょだよ' : 'まいにち ありがとう', 'days', st.created + n * 864e5);
        if (days - n < 3) ev.push({ k:'days', n });
      }
    }
    const c = dateOfDay(dayKey(st.created)), d = clockDate();
    const years = d.getFullYear() - c.getFullYear();
    if (years >= 1 && d.getMonth() === c.getMonth() && d.getDate() === c.getDate() && !st.milestones['anniv' + years]){
      st.milestones['anniv' + years] = true;
      this.addAlbum(st, 'days', `うちのこ記念日（${years}年）`, `${st.pet.name}がうちにきて ${years}年！`, 'days');
      ev.push({ k:'anniv', years });
    }
  },
  checkEvent(st, ev){
    const e = activeEvent();
    if (!e) return;
    const key = e.id + ':' + clockDate().getFullYear();
    if (st.events.seen[key]) return;
    st.events.seen[key] = now();
    const had = st.events.got.includes(e.gift);
    if (!had) st.events.got.push(e.gift);
    const w = WEAR_BY_ID[e.gift];
    this.addAlbum(st, 'event', `${e.ja}`, had ? 'ことしも いっしょに すごせたね' : `プレゼント「${w.ja}」をもらった`, 'gift');
    ev.push({ k:'event', id:e.id, had });
  },
  /* おるすばんのおみやげ: 3 hours away, up to 3 a day; the love is given now and shown when the popup closes */
  souvenir(st, away, ev){
    if (!(away >= 3 * 3600e3)) return;
    const day = dayKey();
    if (st.souv.day !== day){ st.souv.day = day; st.souv.n = 0; }
    if (st.souv.n >= 3) return;
    st.souv.n++;
    const season = seasonOf();
    const pool = SOUVENIRS.filter(s => s.seasons === 'all' || s.seasons.split(' ').includes(season));
    const wt = s => ({ 1:10, 2:5, 3:2.2, 4:1, 5:.45 }[s.rare] || 1) * (st.souv.have[s.id] ? 1 : 1.6);
    let x = Clock.rand() * pool.reduce((a, s) => a + wt(s), 0), pickS = pool[0];
    for (const s of pool){ x -= wt(s); if (x <= 0){ pickS = s; break; } }
    const isNew = !st.souv.have[pickS.id];
    st.souv.have[pickS.id] = (st.souv.have[pickS.id] || 0) + 1;
    const bonus = away >= 12 * 3600e3 ? 4 : 2;
    if (isNew) this.addAlbum(st, 'souv', `おみやげ「${pickS.ja}」`, pickS.line, 'souv:' + pickS.id);
    const after = [];
    this.gainLove(st, bonus, after);
    ev.push({ k:'souv', id:pickS.id, isNew, bonus, after });
  },
  rescueNotice(st, ev){
    if (!st.daily || st.daily.rescueNoticed) return;
    if (!st.daily.rescue && this.gapOfOne(st, st.daily.day) && !this.rescueReady(st, st.daily.day) && !st.daily.all){
      st.daily.rescueNoticed = true;
      ev.push({ k:'broke', next:this.nextRescueDay(st) });
      return;
    }
    if (!st.daily.rescue || st.daily.rescue.done) return;
    const si = this.streakInfo(st);
    if (!si.pinch) return;
    st.daily.rescueNoticed = true;
    ev.push({ k:'pinch', n:si.n });
  },
  /* opening (or coming back to) the app. `away` is how long nobody looked, measured before the stats decay */
  open(st, away, ev){
    this.decay(st);
    if (!st.album.length) this.addAlbum(st, 'home', `${st.pet.name}が うちのこになった日`, breedLabel(st.pet), 'home', st.created || now());
    this.ensureDaily(st);
    this.checkMilestones(st, ev);
    this.checkEvent(st, ev);
    this.souvenir(st, away, ev);
    this.rescueNotice(st, ev);
    return { ok:true };
  },

  /* ----- care ----- */
  feed(st, p, ev){
    this.decay(st);
    if (st.stats.full >= 92) return { ok:false, why:'full' };
    st.stats.full = clamp(st.stats.full + 45, 0, 100);
    st.stats.mood = clamp(st.stats.mood + 6, 0, 100);
    st.counts.meals++;
    this.gainLove(st, 3, ev);
    this.track(st, 'meal', {}, ev);
    return { ok:true };
  },
  treatCheck(st, id){
    st.recentTreats = (st.recentTreats || []).filter(ts => now() - ts < 30 * 60e3);
    if (st.recentTreats.length >= 5) return 'limit';
    this.decay(st);
    if (st.stats.full >= 99) return 'full';
    const t = this.treatList(st).find(x => x.id === id);
    if (!t || this.lv(st) < t.lv) return 'locked';
    return null;
  },
  treat(st, p, ev){
    const why = this.treatCheck(st, p.id);
    if (why) return { ok:false, why };
    const t = this.treatList(st).find(x => x.id === p.id);
    st.stats.full = clamp(st.stats.full + t.full, 0, 100);
    st.stats.mood = clamp(st.stats.mood + t.mood, 0, 100);
    st.recentTreats.push(now());
    st.counts.treats++;
    this.gainLove(st, t.love, ev);
    this.track(st, 'treat', t, ev);
    return { ok:true, id:t.id };
  },
  play(st, p, ev){
    this.decay(st);
    if (st.stats.full < 12) return { ok:false, why:'hungry' };
    st.stats.mood = clamp(st.stats.mood + 12, 0, 100);
    st.stats.full = clamp(st.stats.full - 4, 0, 100);
    st.counts.plays++;
    this.gainLove(st, 3, ev);
    this.track(st, 'play', {}, ev);
    return { ok:true };
  },
  /* なでなで: one stroke. `budget` ({left, t}) refills one stroke's love every 3 minutes, up to 12 */
  stroke(st, budget, ev){
    this.decay(st);
    st.stats.mood = clamp(st.stats.mood + 1.5, 0, 100);
    const mins = (now() - budget.t) / 60000;
    budget.left = Math.min(STROKE_MAX, budget.left + mins / STROKE_MINUTES);
    budget.t = now();
    if (budget.left >= 1){ budget.left -= 1; this.gainLove(st, .6, ev); }
    this.track(st, 'pet', {}, ev);
  },
  /* the end of a stroking session counts once */
  strokeEnd(st){ st.counts.pets++; },
  trickCheck(st, id){
    const tk = (TRICKS[st.pet.species] || TRICKS.dog).find(t => t.id === id);
    if (!tk || this.lv(st) < tk.lv) return 'locked';
    this.decay(st);
    if (st.stats.full < 10) return 'hungry';
    return null;
  },
  trick(st, p, ev){
    const why = this.trickCheck(st, p.id);
    if (why) return { ok:false, why };
    const tk = (TRICKS[st.pet.species] || TRICKS.dog).find(t => t.id === p.id);
    const ts = st.tricks[tk.id] || (st.tricks[tk.id] = { p:0, ok:false });
    const pOk = Math.min(.93, .55 + ts.p * .07 + (st.stats.mood >= 60 ? .1 : 0));
    const known = ts.ok;
    const success = known || Clock.rand() < pOk;
    const day = dayKey();
    if (st.trickDay.day !== day){ st.trickDay.day = day; st.trickDay.love = 0; }
    let learned = false;
    if (success){
      st.stats.mood = clamp(st.stats.mood + 3, 0, 100);
      if (st.trickDay.love < TRICK_LOVE_A_DAY){ st.trickDay.love += 1; this.gainLove(st, 1, ev); }
      if (!ts.ok){
        ts.p++;
        if (ts.p >= tk.need){
          ts.ok = true;
          learned = true;
          this.addAlbum(st, 'trick', `げい「${tk.ja}」をおぼえた！`, `${tk.need}回のれんしゅうで できるようになったね`, 'trick');
          this.gainLove(st, 5, ev);
        }
      }
    }
    const tev = [];
    this.track(st, 'trick', { id:tk.id }, tev);
    return { ok:true, id:tk.id, success, known, learned, p:ts.p, need:tk.need, after:tev };
  },
  dress(st, p, ev){
    const slot = SLOTS.some(([k]) => k === p.slot) ? p.slot : null;
    const w = p.id == null ? null : WEAR_BY_ID[p.id];
    if (!slot || (p.id != null && (!w || w.slot !== slot || !this.wearOwned(st, w)))) return { ok:false, why:'locked' };
    const W = Object.assign({}, this.wear(st));
    W[slot] = w ? w.id : null;
    st.pet.wear = W;
    if (w) this.track(st, 'dress', { slot, id:w.id }, ev);
    return { ok:true };
  },
  room(st, p, ev){
    const cat = DECOR_CATS.some(([k]) => k === p.cat) ? p.cat : null;
    const d = cat && DECOR[cat].find(x => x.id === p.id);
    if (!d || this.lv(st) < d.lv) return { ok:false, why:'locked' };
    if (st.room[cat] === d.id) return { ok:false, why:'same' };
    st.room[cat] = d.id;
    this.track(st, 'room', { ja:d.ja }, ev);
    return { ok:true };
  },
  season(st, p){ st.room.season = !!p.on; return { ok:true }; },

  /* one entry for every action, here and on the server. `ctx.budget` is the stroke budget, `ctx.away` the time away */
  act(st, type, p, ctx){
    p = p || {}; ctx = ctx || {};
    const ev = [];
    let r;
    switch (type){
      case 'open': r = this.open(st, ctx.away || 0, ev); break;
      case 'feed': r = this.feed(st, p, ev); break;
      case 'treat': r = this.treat(st, p, ev); break;
      case 'play': r = this.play(st, p, ev); break;
      case 'pet': {
        const n = Math.max(0, Math.min(60, Math.floor(Number(p.n) || 0)));
        for (let i = 0; i < n; i++) this.stroke(st, ctx.budget, ev);
        if (p.end !== false && n) this.strokeEnd(st);
        r = { ok:true, n };
        break;
      }
      case 'trick': r = this.trick(st, p, ev); break;
      case 'dress': r = this.dress(st, p, ev); break;
      case 'room': r = this.room(st, p, ev); break;
      case 'season': r = this.season(st, p, ev); break;
      default: r = { ok:false, why:'unknown' };
    }
    r.ev = ev;
    return r;
  },
};

/* ---- src/js_app.js（PHOTO_RE, safePhoto, MOVE_PREFIX, MOVE_MAX, readMoveCode, decodeMovePayload） ---- */
const PHOTO_RE = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const safePhoto = (v, max = 2e6) => typeof v === 'string' && v.length < max && PHOTO_RE.test(v) ? v : null;
const MOVE_PREFIX = 'UCHINOKO2:';
const MOVE_MAX = 2e6; /* a real code is well under 1MB (the photo is capped at 400k) */
function readMoveCode(text){
  const raw = String(text || '');
  if (raw.length > MOVE_MAX) return { reason:'big', got:raw.length };
  const t = raw.replace(/[\s​-‍﻿]+/g, '');
  if (!t) return { reason:'empty', got:0 };
  const m = t.match(/UCHINOKO([12]):(?:(\d+):)?([A-Za-z0-9+/=]*)/);
  if (!m) return { reason:'noprefix', got:t.length };
  let b64 = m[3];
  const need = m[2] ? Number(m[2]) : 0;
  if (need && b64.length < need) return { reason:'short', got:b64.length, need };
  if (need) b64 = b64.slice(0, need);
  const st = decodeMovePayload(b64);
  return st ? { st } : { reason:'broken', got:b64.length, need };
}
function decodeMovePayload(b64){
  try {
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, ch => ch.charCodeAt(0));
    const o = JSON.parse(new TextDecoder().decode(bytes));
    if (!o || typeof o !== 'object' || !o.pet || !o.stats) return null;
    const num = (v, d, lo, hi) => { v = Number(v); return Number.isFinite(v) ? clamp(v, lo, hi) : d; };
    const p = o.pet, look = normalizeLook(p.look || p);
    const photo = safePhoto(p.photo, 400000);
    const wear = wearFrom(p);
    for (const k of ['head','face','neck']){ const v = wear[k]; if (v && WEAR_RENAMED[v]) wear[k] = WEAR_RENAMED[v]; else if (v && !WEAR_BY_ID[v]) wear[k] = null; }
    const c = o.counts || {};
    const t0 = now();
    const st = {
      v:1,
      pet:{ name:String(p.name || 'うちのこ').slice(0, 10), species:look.species, breedId:look.breedId, look, photo,
            colorName:typeof p.colorName === 'string' ? p.colorName.slice(0, 14) : '', wear },
      stats:{ full:num(o.stats.full, 70, 0, 100), mood:num(o.stats.mood, 70, 0, 100), love:num(o.stats.love, 0, 0, 1e7) },
      counts:{ meals:num(c.meals, 0, 0, 1e9), treats:num(c.treats, 0, 0, 1e9), pets:num(c.pets, 0, 0, 1e9), plays:num(c.plays, 0, 0, 1e9) },
      recentTreats:[], last:t0, created:num(o.created, t0, 0, t0), updated:t0,
    };
    return carryExtras(o, st);
  } catch(e){ return null; }
}

/* ---- src/js_features.js（ensureState, carryExtras） ---- */
function ensureState(st){
  if (!st) return st;
  const obj = v => v && typeof v === 'object' && !Array.isArray(v);
  /* numbers and text that reach the screen are coerced here, whatever the source (this browser, the cloud copy, a move code) */
  const num = (v, d, lo, hi) => { v = Number(v); return Number.isFinite(v) ? clamp(v, lo, hi) : d; };
  if (obj(st.pet)){
    if (typeof st.pet.name !== 'string') st.pet.name = String(st.pet.name || 'うちのこ');
    if (typeof st.pet.colorName !== 'string') st.pet.colorName = '';
    st.pet.photo = safePhoto(st.pet.photo);
  }
  st.stats = obj(st.stats) ? st.stats : {};
  st.stats.full = num(st.stats.full, 70, 0, 100);
  st.stats.mood = num(st.stats.mood, 70, 0, 100);
  st.stats.love = num(st.stats.love, 0, 0, 1e7);
  st.counts = obj(st.counts) ? st.counts : {};
  for (const k of ['meals','treats','pets','plays']) st.counts[k] = num(st.counts[k], 0, 0, 1e9);
  st.recentTreats = Array.isArray(st.recentTreats) ? st.recentTreats.filter(Number.isFinite).slice(-20) : [];
  for (const k of ['last','created','updated']) st[k] = num(st[k], now(), 0, 8.64e15);
  st.room = Object.assign({}, ROOM_DEFAULT, obj(st.room) ? st.room : {});
  for (const [cat] of DECOR_CATS) if (!DECOR[cat].some(d => d.id === st.room[cat])) st.room[cat] = ROOM_DEFAULT[cat];
  st.room.season = st.room.season !== false;
  st.tricks = obj(st.tricks) ? st.tricks : {};
  for (const [k, v] of Object.entries(st.tricks)){
    if (obj(v)){ v.p = num(v.p, 0, 0, 99); v.ok = !!v.ok; } else delete st.tricks[k];
  }
  st.daily = obj(st.daily) && Array.isArray(st.daily.list) ? st.daily : null;
  if (st.daily){
    const req = r => { r.n = num(r.n, 1, 1, 999); r.got = num(r.got, 0, 0, 1e6); r.done = !!r.done; return r; };
    st.daily.list = st.daily.list.filter(obj).map(req);
    if (st.daily.rescue != null) st.daily.rescue = obj(st.daily.rescue) ? req(st.daily.rescue) : null;
  }
  /* one stamp a day: keep about 100 years, so the "ぜんぶ" count never stops growing */
  st.stamps = Array.isArray(st.stamps) ? st.stamps.filter(x => typeof x === 'string').slice(-40000) : [];
  st.streak = obj(st.streak) ? st.streak : { last:null, n:0, best:0 };
  st.streak.n = num(st.streak.n, 0, 0, 1e5);
  st.streak.best = num(st.streak.best, 0, 0, 1e5);
  if (st.streak.saved && !(obj(st.streak.saved) && st.streak.saved.day === dayKey())) delete st.streak.saved;
  if (st.streak.saved) st.streak.saved.n = num(st.streak.saved.n, 0, 0, 1e5);
  st.rescued = Array.isArray(st.rescued) ? st.rescued.filter(x => typeof x === 'string').slice(-6000) : [];
  st.souv = obj(st.souv) ? st.souv : {};
  st.souv.have = obj(st.souv.have) ? st.souv.have : {};
  for (const k of Object.keys(st.souv.have)) st.souv.have[k] = num(st.souv.have[k], 0, 0, 1e6);
  st.souv.n = num(st.souv.n, 0, 0, 99);
  st.events = obj(st.events) ? st.events : {};
  st.events.got = Array.isArray(st.events.got) ? st.events.got.filter(id => WEAR_BY_ID[id]) : [];
  st.events.seen = obj(st.events.seen) ? st.events.seen : {};
  st.album = Array.isArray(st.album) ? st.album.filter(a => a && Number.isFinite(a.t) && typeof a.ti === 'string').slice(0, 300) : [];
  st.album.forEach(a => { if (a.k === 'trick' || /^芸/.test(a.ti)) a.ti = a.ti.replace(/芸/g, 'げい'); });
  st.milestones = obj(st.milestones) ? st.milestones : {};
  st.trickDay = obj(st.trickDay) ? st.trickDay : { day:null, love:0 };
  st.trickDay.love = num(st.trickDay.love, 0, 0, 10);
  if (!obj(st.firsts) || !st.firsts._init){
    const c = st.counts || {};
    st.firsts = { _init:true, meal:c.meals > 0, treat:c.treats > 0, play:c.plays > 0, pet:c.pets > 0, room:false, wear:{} };
    const w = st.pet && st.pet.wear;
    if (w) for (const k of ['head','face','neck']) if (w[k]) st.firsts.wear[w[k]] = true;
  }
  st.firsts.wear = obj(st.firsts.wear) ? st.firsts.wear : {};
  return st;
}
function carryExtras(o, st){
  const src = ensureState(JSON.parse(JSON.stringify({
    room:o.room, tricks:o.tricks, daily:null, stamps:o.stamps, streak:o.streak, souv:o.souv, events:o.events, rescued:o.rescued,
    album:o.album, milestones:o.milestones, firsts:o.firsts, counts:st.counts, pet:st.pet,
  })));
  const tricks = {}, trickIds = new Set(Object.values(TRICKS).flat().map(t => t.id));
  for (const [k, v] of Object.entries(src.tricks)) if (trickIds.has(k) && v && typeof v === 'object') tricks[k] = { p:clamp(Number(v.p) || 0, 0, 99), ok:!!v.ok };
  const firsts = { _init:true, wear:{} };
  for (const k of ['meal','treat','play','pet','room','daily']) firsts[k] = !!src.firsts[k];
  for (const k of Object.keys(src.firsts.wear)) if (WEAR_BY_ID[k] || WEAR_RENAMED[k]) firsts.wear[k] = true;
  const have = {};
  for (const [k, v] of Object.entries(src.souv.have)) if (SOUV_BY_ID[k]) have[k] = clamp(Number(v) || 0, 0, 1e6);
  st.room = src.room;
  st.tricks = tricks;
  st.stamps = src.stamps.filter(x => /^\d{4}-\d{2}-\d{2}$/.test(x));
  st.rescued = src.rescued.filter(x => /^\d{4}-\d{2}-\d{2}$/.test(x));
  st.streak = { last:/^\d{4}-\d{2}-\d{2}$/.test(src.streak.last) ? src.streak.last : null, n:clamp(Number(src.streak.n) || 0, 0, 1e5), best:clamp(Number(src.streak.best) || 0, 0, 1e5) };
  st.souv = { have, day:null, n:0 };
  st.events = { got:src.events.got, seen:Object.fromEntries(Object.entries(src.events.seen).filter(([k]) => /^[a-z]+:\d{4}$/.test(k)).map(([k, v]) => [k, Number(v) || 1])) };
  st.album = src.album.map(a => ({ t:a.t, k:String(a.k || '').slice(0, 20), ti:a.ti.slice(0, 40), su:String(a.su || '').slice(0, 80), ic:String(a.ic || '').slice(0, 40) }));
  st.milestones = Object.fromEntries(Object.entries(src.milestones).filter(([k]) => /^[a-z0-9:_-]{1,30}$/.test(k)).map(([k, v]) => [k, !!v]));
  st.firsts = firsts;
  return ensureState(st);
}

/* ---- src/js_onboard.js（buildPrompt, parseAI） ---- */
function buildPrompt(){
  const ids = sp => BREEDS.filter(b => b.sp === sp).map(b => `${b.id}(${b.ja})`).join(', ');
  return `You read photos for a cozy pet-raising game. The attached photo was uploaded by the player so the game can draw a cute chibi cartoon of their own dog or cat.
Look at the main animal and reply with ONLY one JSON object, no other text:
{"species":"dog"|"cat"|"other",
 "candidates":[{"id":"<breed id from the list>","confidence":0.0}],
 "colorName":"<short Japanese coat colour or pattern, e.g. 白, クリーム, 黒白, 茶トラ>",
 "comment":"<one warm Japanese sentence, at most 30 characters, about how this animal looks>",
 "look":{"ear":"pointy|big|small|floppy|long|semi|fold","coat":"smooth|fluffy|curly|long","muzzle":"short|medium|long","tail":"curl|plume|straight|stub|long|fluffy","legs":"normal|short","face":"muzzle|lower|mask|hachiware|blaze",
  "colors":{"main":"#hex","body":"#hex","ear":"#hex","tail":"#hex","face":"#hex","chest":"#hex","paws":"#hex","eye":"#hex","nose":"#hex","tailTip":"#hex or null"},
  "marks":{"stripes":"#hex or null","spots":"#hex or null","patchL":"#hex or null","patchR":"#hex or null","bodyPatch":false,"brows":"#hex or null","mask":"#hex or null","saddle":"#hex or null"}}}
Breed ids. Dogs: ${ids('dog')}. Cats: ${ids('cat')}.
Rules:
- candidates: 1 to 3 ids from the list, most likely first. For cats without a pedigree look, use the coat-pattern ids (kijitora, chatora, sabatora, mike, kuro, shiro, hachiware). Use mix_dog or mix_cat when nothing fits.
- main = fur colour of the head; body = torso; face = lower face and muzzle; chest and paws likewise. Use the same hex when areas share a colour.
- face: "muzzle" = only the snout differs; "lower" = lower half of the face is lighter; "mask" = husky-style white face with a dark cap; "hachiware" = white inverted V between the eyes; "blaze" = narrow white stripe down the forehead into a white muzzle.
- tail: dogs use curl, plume, straight or stub; cats use long or fluffy. ear "fold" is for folded cat ears. legs "short" for dachshund, corgi, munchkin.
- marks: stripes for tabby, spots for spotted coats, patchL/patchR for colour patches over the left/right eye and ear (calico, papillon, cavalier), bodyPatch true if the torso has such patches, brows for light eyebrow dots, mask for dark shading around the muzzle (pug, siamese), saddle for a dark back (beagle). Use null when absent.
- Colours should match the photo, slightly clean and bright like a cute illustration. Pure white fur is about #FBF8F4, black fur about #2B2729. Dog eyes are usually dark brown #2B1E1A.
- If no dog or cat is visible, reply {"species":"other"}.`;
}
function parseAI(r){
  if (!r || typeof r !== 'object' || Array.isArray(r)) return null;
  const species = r.species === 'cat' ? 'cat' : r.species === 'dog' ? 'dog' : 'other';
  if (species === 'other') return { species };
  const seen = new Set();
  let cands = (Array.isArray(r.candidates) ? r.candidates : [])
    .map(c => ({ id:String(c && c.id || ''), conf:clamp(Number(c && c.confidence) || 0, 0, 1) }))
    .filter(c => BREED_BY_ID[c.id] && BREED_BY_ID[c.id].sp === species && !seen.has(c.id) && seen.add(c.id))
    .slice(0, 3);
  if (!cands.length) cands = [{ id:species === 'cat' ? 'mix_cat' : 'mix_dog', conf:0 }];
  const lk = r.look && typeof r.look === 'object' ? r.look : {};
  const look = normalizeLook(Object.assign({}, lk, { species, breedId:cands[0].id }));
  return {
    species, cands, look,
    colorName:typeof r.colorName === 'string' ? r.colorName.trim().slice(0, 14) : '',
    comment:typeof r.comment === 'string' ? r.comment.trim().slice(0, 60) : '',
  };
}

/* サーバーの時計：日付は日本時間（UTC+9。夏時間はない）、偶然は crypto */
Clock.dayKey = function(t){
  const ms = t == null ? this.now() : (t instanceof Date ? t.getTime() : Number(t));
  const d = new Date(ms + 9 * 3600e3);
  return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
};
Clock.rand = () => crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;


export { ensureState, carryExtras, readMoveCode, safePhoto, levelInfo, normalizeLook, dayKey, MOVE_MAX, Rules, Clock, newState, wearFrom, buildPrompt, parseAI };
