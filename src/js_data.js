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
