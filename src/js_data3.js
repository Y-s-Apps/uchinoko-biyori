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

/* ===== seasons & events (month-day, local time) ===== */
function mdOf(d){ return (d.getMonth() + 1) * 100 + d.getDate(); }
function seasonOf(d = new Date()){
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
function activeEvent(d = new Date()){
  const md = mdOf(d);
  return EVENTS.find(e => md >= e.from && md <= e.to) || null;
}
function weatherOf(d = new Date()){
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
