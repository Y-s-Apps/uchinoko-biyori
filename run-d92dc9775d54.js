/* うちのこ日和：うちのこランの ゲーム（src/run/）と Three.js 0.170.0（MIT。ライセンスの 表示は さいご）を まとめた もの。
 * tools/run/build_run.mjs が 作る。手で 直さない（docs/RUN_DESIGN.md）。 */
var UchinokoRun=(()=>{var Ga=Object.defineProperty;var Ou=Object.getOwnPropertyDescriptor;var Bu=Object.getOwnPropertyNames;var zu=Object.prototype.hasOwnProperty;var ku=(i,t)=>{for(var e in t)Ga(i,e,{get:t[e],enumerable:!0})},Vu=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Bu(t))!zu.call(i,s)&&s!==e&&Ga(i,s,{get:()=>t[s],enumerable:!(n=Ou(t,s))||n.enumerable});return i};var Hu=i=>Vu(Ga({},"__esModule",{value:!0}),i);var $x={};ku($x,{AGILITY_COURSES:()=>br,COURSES:()=>_r,PET_SCALE:()=>Au,VERSION:()=>qx,agilityHelpHtml:()=>_c,agilityMap:()=>Nu,courseMap:()=>Cu,disposePet3D:()=>Ps,formatClock:()=>yr,formatTime:()=>mi,helpHtml:()=>dc,makePet3D:()=>Rs,mountAgility:()=>Fu,mountRace:()=>Ru,posePet3D:()=>Is,timeMs:()=>vr});var Gu=0,vc=1,Wu=2;var Rh=1,sr=2,On=3,ai=0,We=1,Pe=2,si=0,ss=1,Mc=2,bc=3,Sc=4,Xu=5,Si=100,qu=101,$u=102,Yu=103,Zu=104,Ju=200,Ku=201,ju=202,Qu=203,So=204,wo=205,td=206,ed=207,nd=208,id=209,sd=210,rd=211,ad=212,od=213,ld=214,To=0,Eo=1,Ao=2,ls=3,Co=4,Ro=5,Io=6,Po=7,Ih=0,cd=1,hd=2,ri=0,ud=1,dd=2,fd=3,pd=4,md=5,gd=6,rr=7;var Ph=300,cs=301,hs=302,Lo=303,Do=304,wa=306,Uo=1e3,Ei=1001,No=1002,ln=1003,xd=1004;var Sr=1005;var Tn=1006,Wa=1007;var Ai=1008;var Hn=1009,Lh=1010,Dh=1011,Js=1012,ql=1013,Ci=1014,En=1015,ar=1016,$l=1017,Yl=1018,us=1020,Uh=35902,Nh=1021,Fh=1022,vn=1023,Oh=1024,Bh=1025,rs=1026,ds=1027,Zl=1028,Jl=1029,zh=1030,Kl=1031;var jl=1033,Zr=33776,Jr=33777,Kr=33778,jr=33779,Fo=35840,Oo=35841,Bo=35842,zo=35843,ko=36196,Vo=37492,Ho=37496,Go=37808,Wo=37809,Xo=37810,qo=37811,$o=37812,Yo=37813,Zo=37814,Jo=37815,Ko=37816,jo=37817,Qo=37818,tl=37819,el=37820,nl=37821,Qr=36492,il=36494,sl=36495,kh=36283,rl=36284,al=36285,ol=36286;var ta=2300,ll=2301,Xa=2302,wc=2400,Tc=2401,Ec=2402;var _d=3200,yd=3201;var Vh=0,vd=1,ii="",Je="srgb",ws="srgb-linear",Ta="linear",ye="srgb";var ki=7680;var Ac=519,Md=512,bd=513,Sd=514,Hh=515,wd=516,Td=517,Ed=518,Ad=519,Cc=35044;var Rc="300 es",zn=2e3,ea=2001,oi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ic=1234567,Xs=Math.PI/180,Ks=180/Math.PI;function Fi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ye[i&255]+Ye[i>>8&255]+Ye[i>>16&255]+Ye[i>>24&255]+"-"+Ye[t&255]+Ye[t>>8&255]+"-"+Ye[t>>16&15|64]+Ye[t>>24&255]+"-"+Ye[e&63|128]+Ye[e>>8&255]+"-"+Ye[e>>16&255]+Ye[e>>24&255]+Ye[n&255]+Ye[n>>8&255]+Ye[n>>16&255]+Ye[n>>24&255]).toLowerCase()}function Ge(i,t,e){return Math.max(t,Math.min(e,i))}function Ql(i,t){return(i%t+t)%t}function Cd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Rd(i,t,e){return i!==t?(e-i)/(t-i):0}function qs(i,t,e){return(1-e)*i+e*t}function Id(i,t,e,n){return qs(i,t,1-Math.exp(-e*n))}function Pd(i,t=1){return t-Math.abs(Ql(i,t*2)-t)}function Ld(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Dd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ud(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Nd(i,t){return i+Math.random()*(t-i)}function Fd(i){return i*(.5-Math.random())}function Od(i){i!==void 0&&(Ic=i);let t=Ic+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Bd(i){return i*Xs}function zd(i){return i*Ks}function kd(i){return(i&i-1)===0&&i!==0}function Vd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Hd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Gd(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),f=a((t-n)/2),u=r((n-t)/2),m=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*f,o*c);break;case"YZY":i.set(l*f,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*f,o*h,o*c);break;case"XZX":i.set(o*h,l*m,l*u,o*c);break;case"YXY":i.set(l*u,o*h,l*m,o*c);break;case"ZYZ":i.set(l*m,l*u,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function es(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function je(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var nn={DEG2RAD:Xs,RAD2DEG:Ks,generateUUID:Fi,clamp:Ge,euclideanModulo:Ql,mapLinear:Cd,inverseLerp:Rd,lerp:qs,damp:Id,pingpong:Pd,smoothstep:Ld,smootherstep:Dd,randInt:Ud,randFloat:Nd,randFloatSpread:Fd,seededRandom:Od,degToRad:Bd,radToDeg:zd,isPowerOfTwo:kd,ceilPowerOfTwo:Vd,floorPowerOfTwo:Hd,setQuaternionFromProperEuler:Gd,normalize:je,denormalize:es},Ut=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},re=class i{constructor(t,e,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],u=n[5],m=n[8],y=s[0],p=s[3],g=s[6],v=s[1],M=s[4],_=s[7],P=s[2],A=s[5],C=s[8];return r[0]=a*y+o*v+l*P,r[3]=a*p+o*M+l*A,r[6]=a*g+o*_+l*C,r[1]=c*y+h*v+d*P,r[4]=c*p+h*M+d*A,r[7]=c*g+h*_+d*C,r[2]=f*y+u*v+m*P,r[5]=f*p+u*M+m*A,r[8]=f*g+u*_+m*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,f=o*l-h*r,u=c*r-a*l,m=e*d+n*f+s*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return t[0]=d*y,t[1]=(s*c-h*n)*y,t[2]=(o*n-s*a)*y,t[3]=f*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=u*y,t[7]=(n*l-c*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(qa.makeScale(t,e)),this}rotate(t){return this.premultiply(qa.makeRotation(-t)),this}translate(t,e){return this.premultiply(qa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},qa=new re;function Gh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function na(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wd(){let i=na("canvas");return i.style.display="block",i}var Pc={};function Gs(i){i in Pc||(Pc[i]=!0,console.warn(i))}function Xd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function qd(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function $d(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var he={enabled:!0,workingColorSpace:ws,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ye&&(i.r=kn(i.r),i.g=kn(i.g),i.b=kn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ye&&(i.r=as(i.r),i.g=as(i.g),i.b=as(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ii?Ta:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function as(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Lc=[.64,.33,.3,.6,.15,.06],Dc=[.2126,.7152,.0722],Uc=[.3127,.329],Nc=new re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fc=new re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);he.define({[ws]:{primaries:Lc,whitePoint:Uc,transfer:Ta,toXYZ:Nc,fromXYZ:Fc,luminanceCoefficients:Dc,workingColorSpaceConfig:{unpackColorSpace:Je},outputColorSpaceConfig:{drawingBufferColorSpace:Je}},[Je]:{primaries:Lc,whitePoint:Uc,transfer:ye,toXYZ:Nc,fromXYZ:Fc,luminanceCoefficients:Dc,outputColorSpaceConfig:{drawingBufferColorSpace:Je}}});var Vi,cl=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Vi===void 0&&(Vi=na("canvas")),Vi.width=t.width,Vi.height=t.height;let n=Vi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Vi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=na("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=kn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(kn(e[n]/255)*255):e[n]=kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Yd=0,ia=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Fi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push($a(s[a].image)):r.push($a(s[a]))}else r=$a(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function $a(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?cl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Zd=0,cn=class i extends oi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Ei,s=Ei,r=Tn,a=Ai,o=vn,l=Hn,c=i.DEFAULT_ANISOTROPY,h=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=Fi(),this.name="",this.source=new ia(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ph)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Uo:t.x=t.x-Math.floor(t.x);break;case Ei:t.x=t.x<0?0:1;break;case No:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Uo:t.y=t.y-Math.floor(t.y);break;case Ei:t.y=t.y<0?0:1;break;case No:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=Ph;cn.DEFAULT_ANISOTROPY=1;var Ce=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],f=l[1],u=l[5],m=l[9],y=l[2],p=l[6],g=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-y)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+y)<.1&&Math.abs(m+p)<.1&&Math.abs(c+u+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,_=(u+1)/2,P=(g+1)/2,A=(h+f)/4,C=(d+y)/4,T=(m+p)/4;return M>_&&M>P?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=A/n,r=C/n):_>P?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=A/s,r=T/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=C/r,s=T/r),this.set(n,s,r,e),this}let v=Math.sqrt((p-m)*(p-m)+(d-y)*(d-y)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(p-m)/v,this.y=(d-y)/v,this.z=(f-h)/v,this.w=Math.acos((c+u+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},hl=class extends oi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new cn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new ia(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gn=class extends hl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},sa=class extends cn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ul=class extends cn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var li=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],f=r[a+0],u=r[a+1],m=r[a+2],y=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=f,t[e+1]=u,t[e+2]=m,t[e+3]=y;return}if(d!==y||l!==f||c!==u||h!==m){let p=1-o,g=l*f+c*u+h*m+d*y,v=g>=0?1:-1,M=1-g*g;if(M>Number.EPSILON){let P=Math.sqrt(M),A=Math.atan2(P,g*v);p=Math.sin(p*A)/P,o=Math.sin(o*A)/P}let _=o*v;if(l=l*p+f*_,c=c*p+u*_,h=h*p+m*_,d=d*p+y*_,p===1-o){let P=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=P,c*=P,h*=P,d*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],f=r[a+1],u=r[a+2],m=r[a+3];return t[e]=o*m+h*d+l*u-c*f,t[e+1]=l*m+h*f+c*d-o*u,t[e+2]=c*m+h*u+o*f-l*d,t[e+3]=h*m-o*d-l*f-c*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),f=l(n/2),u=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=f*h*d+c*u*m,this._y=c*u*d-f*h*m,this._z=c*h*m+f*u*d,this._w=c*h*d-f*u*m;break;case"YXZ":this._x=f*h*d+c*u*m,this._y=c*u*d-f*h*m,this._z=c*h*m-f*u*d,this._w=c*h*d+f*u*m;break;case"ZXY":this._x=f*h*d-c*u*m,this._y=c*u*d+f*h*m,this._z=c*h*m+f*u*d,this._w=c*h*d-f*u*m;break;case"ZYX":this._x=f*h*d-c*u*m,this._y=c*u*d+f*h*m,this._z=c*h*m-f*u*d,this._w=c*h*d+f*u*m;break;case"YZX":this._x=f*h*d+c*u*m,this._y=c*u*d+f*h*m,this._z=c*h*m-f*u*d,this._w=c*h*d-f*u*m;break;case"XZY":this._x=f*h*d-c*u*m,this._y=c*u*d-f*h*m,this._z=c*h*m+f*u*d,this._w=c*h*d+f*u*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],f=n+o+d;if(f>0){let u=.5/Math.sqrt(f+1);this._w=.25/u,this._x=(h-l)*u,this._y=(r-c)*u,this._z=(a-s)*u}else if(n>o&&n>d){let u=2*Math.sqrt(1+n-o-d);this._w=(h-l)/u,this._x=.25*u,this._y=(s+a)/u,this._z=(r+c)/u}else if(o>d){let u=2*Math.sqrt(1+o-n-d);this._w=(r-c)/u,this._x=(s+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+d-n-o);this._w=(a-s)/u,this._x=(r+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ge(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let u=1-e;return this._w=u*a+e*this._w,this._x=u*n+e*this._x,this._y=u*s+e*this._y,this._z=u*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Oc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Oc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ya.copy(this).projectOnVector(t),this.sub(Ya)}reflect(t){return this.sub(Ya.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ya=new U,Oc=new li,Wn=class{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,xn):xn.fromBufferAttribute(r,a),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),wr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),wr.copy(n.boundingBox)),wr.applyMatrix4(t.matrixWorld),this.union(wr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Os),Tr.subVectors(this.max,Os),Hi.subVectors(t.a,Os),Gi.subVectors(t.b,Os),Wi.subVectors(t.c,Os),Kn.subVectors(Gi,Hi),jn.subVectors(Wi,Gi),gi.subVectors(Hi,Wi);let e=[0,-Kn.z,Kn.y,0,-jn.z,jn.y,0,-gi.z,gi.y,Kn.z,0,-Kn.x,jn.z,0,-jn.x,gi.z,0,-gi.x,-Kn.y,Kn.x,0,-jn.y,jn.x,0,-gi.y,gi.x,0];return!Za(e,Hi,Gi,Wi,Tr)||(e=[1,0,0,0,1,0,0,0,1],!Za(e,Hi,Gi,Wi,Tr))?!1:(Er.crossVectors(Kn,jn),e=[Er.x,Er.y,Er.z],Za(e,Hi,Gi,Wi,Tr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Ln=[new U,new U,new U,new U,new U,new U,new U,new U],xn=new U,wr=new Wn,Hi=new U,Gi=new U,Wi=new U,Kn=new U,jn=new U,gi=new U,Os=new U,Tr=new U,Er=new U,xi=new U;function Za(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){xi.fromArray(i,r);let o=s.x*Math.abs(xi.x)+s.y*Math.abs(xi.y)+s.z*Math.abs(xi.z),l=t.dot(xi),c=e.dot(xi),h=n.dot(xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Jd=new Wn,Bs=new U,Ja=new U,Ri=class{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Jd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Bs.subVectors(t,this.center);let e=Bs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Bs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ja.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Bs.copy(t.center).add(Ja)),this.expandByPoint(Bs.copy(t.center).sub(Ja))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Dn=new U,Ka=new U,Ar=new U,Qn=new U,ja=new U,Cr=new U,Qa=new U,dl=class{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ka.copy(t).add(e).multiplyScalar(.5),Ar.copy(e).sub(t).normalize(),Qn.copy(this.origin).sub(Ka);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Ar),o=Qn.dot(this.direction),l=-Qn.dot(Ar),c=Qn.lengthSq(),h=Math.abs(1-a*a),d,f,u,m;if(h>0)if(d=a*l-o,f=a*o-l,m=r*h,d>=0)if(f>=-m)if(f<=m){let y=1/h;d*=y,f*=y,u=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;else f<=-m?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),u=-d*d+f*(f+2*l)+c):f<=m?(d=0,f=Math.min(Math.max(-r,-l),r),u=f*(f+2*l)+c):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),u=-d*d+f*(f+2*l)+c);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ka).addScaledVector(Ar,f),u}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);let n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,s,r){ja.subVectors(e,t),Cr.subVectors(n,t),Qa.crossVectors(ja,Cr);let a=this.direction.dot(Qa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qn.subVectors(this.origin,t);let l=o*this.direction.dot(Cr.crossVectors(Qn,Cr));if(l<0)return null;let c=o*this.direction.dot(ja.cross(Qn));if(c<0||l+c>a)return null;let h=-o*Qn.dot(Qa);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ge=class i{constructor(t,e,n,s,r,a,o,l,c,h,d,f,u,m,y,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,f,u,m,y,p)}set(t,e,n,s,r,a,o,l,c,h,d,f,u,m,y,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=f,g[3]=u,g[7]=m,g[11]=y,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Xi.setFromMatrixColumn(t,0).length(),r=1/Xi.setFromMatrixColumn(t,1).length(),a=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let f=a*h,u=a*d,m=o*h,y=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=u+m*c,e[5]=f-y*c,e[9]=-o*l,e[2]=y-f*c,e[6]=m+u*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*h,u=l*d,m=c*h,y=c*d;e[0]=f+y*o,e[4]=m*o-u,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=u*o-m,e[6]=y+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*h,u=l*d,m=c*h,y=c*d;e[0]=f-y*o,e[4]=-a*d,e[8]=m+u*o,e[1]=u+m*o,e[5]=a*h,e[9]=y-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*h,u=a*d,m=o*h,y=o*d;e[0]=l*h,e[4]=m*c-u,e[8]=f*c+y,e[1]=l*d,e[5]=y*c+f,e[9]=u*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,u=a*c,m=o*l,y=o*c;e[0]=l*h,e[4]=y-f*d,e[8]=m*d+u,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=u*d+m,e[10]=f-y*d}else if(t.order==="XZY"){let f=a*l,u=a*c,m=o*l,y=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=f*d+y,e[5]=a*h,e[9]=u*d-m,e[2]=m*d-u,e[6]=o*h,e[10]=y*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Kd,t,jd)}lookAt(t,e,n){let s=this.elements;return an.subVectors(t,e),an.lengthSq()===0&&(an.z=1),an.normalize(),ti.crossVectors(n,an),ti.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),ti.crossVectors(n,an)),ti.normalize(),Rr.crossVectors(an,ti),s[0]=ti.x,s[4]=Rr.x,s[8]=an.x,s[1]=ti.y,s[5]=Rr.y,s[9]=an.y,s[2]=ti.z,s[6]=Rr.z,s[10]=an.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],u=n[13],m=n[2],y=n[6],p=n[10],g=n[14],v=n[3],M=n[7],_=n[11],P=n[15],A=s[0],C=s[4],T=s[8],b=s[12],x=s[1],w=s[5],I=s[9],L=s[13],B=s[2],X=s[6],G=s[10],ht=s[14],N=s[3],st=s[7],ft=s[11],J=s[15];return r[0]=a*A+o*x+l*B+c*N,r[4]=a*C+o*w+l*X+c*st,r[8]=a*T+o*I+l*G+c*ft,r[12]=a*b+o*L+l*ht+c*J,r[1]=h*A+d*x+f*B+u*N,r[5]=h*C+d*w+f*X+u*st,r[9]=h*T+d*I+f*G+u*ft,r[13]=h*b+d*L+f*ht+u*J,r[2]=m*A+y*x+p*B+g*N,r[6]=m*C+y*w+p*X+g*st,r[10]=m*T+y*I+p*G+g*ft,r[14]=m*b+y*L+p*ht+g*J,r[3]=v*A+M*x+_*B+P*N,r[7]=v*C+M*w+_*X+P*st,r[11]=v*T+M*I+_*G+P*ft,r[15]=v*b+M*L+_*ht+P*J,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],f=t[10],u=t[14],m=t[3],y=t[7],p=t[11],g=t[15];return m*(+r*l*d-s*c*d-r*o*f+n*c*f+s*o*u-n*l*u)+y*(+e*l*u-e*c*f+r*a*f-s*a*u+s*c*h-r*l*h)+p*(+e*c*d-e*o*u-r*a*d+n*a*u+r*o*h-n*c*h)+g*(-s*o*h-e*l*d+e*o*f+s*a*d-n*a*f+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],f=t[10],u=t[11],m=t[12],y=t[13],p=t[14],g=t[15],v=d*p*c-y*f*c+y*l*u-o*p*u-d*l*g+o*f*g,M=m*f*c-h*p*c-m*l*u+a*p*u+h*l*g-a*f*g,_=h*y*c-m*d*c+m*o*u-a*y*u-h*o*g+a*d*g,P=m*d*l-h*y*l-m*o*f+a*y*f+h*o*p-a*d*p,A=e*v+n*M+s*_+r*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/A;return t[0]=v*C,t[1]=(y*f*r-d*p*r-y*s*u+n*p*u+d*s*g-n*f*g)*C,t[2]=(o*p*r-y*l*r+y*s*c-n*p*c-o*s*g+n*l*g)*C,t[3]=(d*l*r-o*f*r-d*s*c+n*f*c+o*s*u-n*l*u)*C,t[4]=M*C,t[5]=(h*p*r-m*f*r+m*s*u-e*p*u-h*s*g+e*f*g)*C,t[6]=(m*l*r-a*p*r-m*s*c+e*p*c+a*s*g-e*l*g)*C,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*u+e*l*u)*C,t[8]=_*C,t[9]=(m*d*r-h*y*r-m*n*u+e*y*u+h*n*g-e*d*g)*C,t[10]=(a*y*r-m*o*r+m*n*c-e*y*c-a*n*g+e*o*g)*C,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*u-e*o*u)*C,t[12]=P*C,t[13]=(h*y*s-m*d*s+m*n*f-e*y*f-h*n*p+e*d*p)*C,t[14]=(m*o*s-a*y*s-m*n*l+e*y*l+a*n*p-e*o*p)*C,t[15]=(a*d*s-h*o*s+h*n*l-e*d*l-a*n*f+e*o*f)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,f=r*c,u=r*h,m=r*d,y=a*h,p=a*d,g=o*d,v=l*c,M=l*h,_=l*d,P=n.x,A=n.y,C=n.z;return s[0]=(1-(y+g))*P,s[1]=(u+_)*P,s[2]=(m-M)*P,s[3]=0,s[4]=(u-_)*A,s[5]=(1-(f+g))*A,s[6]=(p+v)*A,s[7]=0,s[8]=(m+M)*C,s[9]=(p-v)*C,s[10]=(1-(f+y))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Xi.set(s[0],s[1],s[2]).length(),a=Xi.set(s[4],s[5],s[6]).length(),o=Xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],_n.copy(this);let c=1/r,h=1/a,d=1/o;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=d,_n.elements[9]*=d,_n.elements[10]*=d,e.setFromRotationMatrix(_n),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=zn){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s),u,m;if(o===zn)u=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===ea)u=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=u,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=zn){let l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(a-r),f=(e+t)*c,u=(n+s)*h,m,y;if(o===zn)m=(a+r)*d,y=-2*d;else if(o===ea)m=r*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-u,l[2]=0,l[6]=0,l[10]=y,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Xi=new U,_n=new ge,Kd=new U(0,0,0),jd=new U(1,1,1),ti=new U,Rr=new U,an=new U,Bc=new ge,zc=new li,An=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],f=s[6],u=s[10];switch(e){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ge(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Bc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return zc.setFromEuler(this),this.setFromQuaternion(zc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};An.DEFAULT_ORDER="XYZ";var ra=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Qd=0,kc=new U,qi=new li,Un=new ge,Ir=new U,zs=new U,tf=new U,ef=new li,Vc=new U(1,0,0),Hc=new U(0,1,0),Gc=new U(0,0,1),Wc={type:"added"},nf={type:"removed"},$i={type:"childadded",child:null},to={type:"childremoved",child:null},Fe=class i extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=Fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new U,e=new An,n=new li,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ge},normalMatrix:{value:new re}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ra,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.multiply(qi),this}rotateOnWorldAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.premultiply(qi),this}rotateX(t){return this.rotateOnAxis(Vc,t)}rotateY(t){return this.rotateOnAxis(Hc,t)}rotateZ(t){return this.rotateOnAxis(Gc,t)}translateOnAxis(t,e){return kc.copy(t).applyQuaternion(this.quaternion),this.position.add(kc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Vc,t)}translateY(t){return this.translateOnAxis(Hc,t)}translateZ(t){return this.translateOnAxis(Gc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ir.copy(t):Ir.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(zs,Ir,this.up):Un.lookAt(Ir,zs,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),qi.setFromRotationMatrix(Un),this.quaternion.premultiply(qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wc),$i.child=t,this.dispatchEvent($i),$i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(nf),to.child=t,this.dispatchEvent(to),to.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wc),$i.child=t,this.dispatchEvent($i),$i.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,t,tf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,ef,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),f=a(t.skeletons),u=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Fe.DEFAULT_UP=new U(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var yn=new U,Nn=new U,eo=new U,Fn=new U,Yi=new U,Zi=new U,Xc=new U,no=new U,io=new U,so=new U,ro=new Ce,ao=new Ce,oo=new Ce,wi=class i{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),yn.subVectors(t,e),s.cross(yn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){yn.subVectors(s,e),Nn.subVectors(n,e),eo.subVectors(t,e);let a=yn.dot(yn),o=yn.dot(Nn),l=yn.dot(eo),c=Nn.dot(Nn),h=Nn.dot(eo),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,u=(c*l-o*h)*f,m=(a*h-o*l)*f;return r.set(1-u-m,m,u)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Fn.x),l.addScaledVector(a,Fn.y),l.addScaledVector(o,Fn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return ro.setScalar(0),ao.setScalar(0),oo.setScalar(0),ro.fromBufferAttribute(t,e),ao.fromBufferAttribute(t,n),oo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ro,r.x),a.addScaledVector(ao,r.y),a.addScaledVector(oo,r.z),a}static isFrontFacing(t,e,n,s){return yn.subVectors(n,e),Nn.subVectors(t,e),yn.cross(Nn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),yn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Yi.subVectors(s,n),Zi.subVectors(r,n),no.subVectors(t,n);let l=Yi.dot(no),c=Zi.dot(no);if(l<=0&&c<=0)return e.copy(n);io.subVectors(t,s);let h=Yi.dot(io),d=Zi.dot(io);if(h>=0&&d<=h)return e.copy(s);let f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Yi,a);so.subVectors(t,r);let u=Yi.dot(so),m=Zi.dot(so);if(m>=0&&u<=m)return e.copy(r);let y=u*c-l*m;if(y<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(Zi,o);let p=h*m-u*d;if(p<=0&&d-h>=0&&u-m>=0)return Xc.subVectors(r,s),o=(d-h)/(d-h+(u-m)),e.copy(s).addScaledVector(Xc,o);let g=1/(p+y+f);return a=y*g,o=f*g,e.copy(n).addScaledVector(Yi,a).addScaledVector(Zi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ei={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function lo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Gt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=he.workingColorSpace){return this.r=t,this.g=e,this.b=n,he.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=he.workingColorSpace){if(t=Ql(t,1),e=Ge(e,0,1),n=Ge(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=lo(a,r,t+1/3),this.g=lo(a,r,t),this.b=lo(a,r,t-1/3)}return he.toWorkingColorSpace(this,s),this}setStyle(t,e=Je){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Je){let n=Wh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=as(t.r),this.g=as(t.g),this.b=as(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Je){return he.fromWorkingColorSpace(Ze.copy(this),t),Math.round(Ge(Ze.r*255,0,255))*65536+Math.round(Ge(Ze.g*255,0,255))*256+Math.round(Ge(Ze.b*255,0,255))}getHexString(t=Je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=he.workingColorSpace){he.fromWorkingColorSpace(Ze.copy(this),e);let n=Ze.r,s=Ze.g,r=Ze.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=he.workingColorSpace){return he.fromWorkingColorSpace(Ze.copy(this),e),t.r=Ze.r,t.g=Ze.g,t.b=Ze.b,t}getStyle(t=Je){he.fromWorkingColorSpace(Ze.copy(this),t);let e=Ze.r,n=Ze.g,s=Ze.b;return t!==Je?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ei),this.setHSL(ei.h+t,ei.s+e,ei.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ei),t.getHSL(Pr);let n=qs(ei.h,Pr.h,e),s=qs(ei.s,Pr.s,e),r=qs(ei.l,Pr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ze=new Gt;Gt.NAMES=Wh;var sf=0,Ii=class extends oi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=Fi(),this.name="",this.blending=ss,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=So,this.blendDst=wo,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ac,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ss&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==So&&(n.blendSrc=this.blendSrc),this.blendDst!==wo&&(n.blendDst=this.blendDst),this.blendEquation!==Si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ls&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ac&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Cn=class extends Ii{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=Ih,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ne=new U,Lr=new Ut,$e=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Cc,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Lr.fromBufferAttribute(this,e),Lr.applyMatrix3(t),this.setXY(e,Lr.x,Lr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=es(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=je(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=es(e,this.array)),e}setX(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=es(e,this.array)),e}setY(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=es(e,this.array)),e}setZ(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=es(e,this.array)),e}setW(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array),s=je(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array),s=je(s,this.array),r=je(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cc&&(t.usage=this.usage),t}};var aa=class extends $e{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var oa=class extends $e{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Yt=class extends $e{constructor(t,e,n){super(new Float32Array(t),e,n)}},rf=0,dn=new ge,co=new Fe,Ji=new U,on=new Wn,ks=new Wn,He=new U,xe=class i extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=Fi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Gh(t)?oa:aa)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new re().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return dn.makeRotationFromQuaternion(t),this.applyMatrix4(dn),this}rotateX(t){return dn.makeRotationX(t),this.applyMatrix4(dn),this}rotateY(t){return dn.makeRotationY(t),this.applyMatrix4(dn),this}rotateZ(t){return dn.makeRotationZ(t),this.applyMatrix4(dn),this}translate(t,e,n){return dn.makeTranslation(t,e,n),this.applyMatrix4(dn),this}scale(t,e,n){return dn.makeScale(t,e,n),this.applyMatrix4(dn),this}lookAt(t){return co.lookAt(t),co.updateMatrix(),this.applyMatrix4(co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Yt(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(He.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(He),He.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(He)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){let n=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];ks.setFromBufferAttribute(o),this.morphTargetsRelative?(He.addVectors(on.min,ks.min),on.expandByPoint(He),He.addVectors(on.max,ks.max),on.expandByPoint(He)):(on.expandByPoint(ks.min),on.expandByPoint(ks.max))}on.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)He.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(He));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)He.fromBufferAttribute(o,c),l&&(Ji.fromBufferAttribute(t,c),He.add(Ji)),s=Math.max(s,n.distanceToSquared(He))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let T=0;T<n.count;T++)o[T]=new U,l[T]=new U;let c=new U,h=new U,d=new U,f=new Ut,u=new Ut,m=new Ut,y=new U,p=new U;function g(T,b,x){c.fromBufferAttribute(n,T),h.fromBufferAttribute(n,b),d.fromBufferAttribute(n,x),f.fromBufferAttribute(r,T),u.fromBufferAttribute(r,b),m.fromBufferAttribute(r,x),h.sub(c),d.sub(c),u.sub(f),m.sub(f);let w=1/(u.x*m.y-m.x*u.y);isFinite(w)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(d,-u.y).multiplyScalar(w),p.copy(d).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(w),o[T].add(y),o[b].add(y),o[x].add(y),l[T].add(p),l[b].add(p),l[x].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let T=0,b=v.length;T<b;++T){let x=v[T],w=x.start,I=x.count;for(let L=w,B=w+I;L<B;L+=3)g(t.getX(L+0),t.getX(L+1),t.getX(L+2))}let M=new U,_=new U,P=new U,A=new U;function C(T){P.fromBufferAttribute(s,T),A.copy(P);let b=o[T];M.copy(b),M.sub(P.multiplyScalar(P.dot(b))).normalize(),_.crossVectors(A,b);let w=_.dot(l[T])<0?-1:1;a.setXYZW(T,M.x,M.y,M.z,w)}for(let T=0,b=v.length;T<b;++T){let x=v[T],w=x.start,I=x.count;for(let L=w,B=w+I;L<B;L+=3)C(t.getX(L+0)),C(t.getX(L+1)),C(t.getX(L+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $e(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,u=n.count;f<u;f++)n.setXYZ(f,0,0,0);let s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,h=new U,d=new U;if(t)for(let f=0,u=t.count;f<u;f+=3){let m=t.getX(f+0),y=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,p),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,u=e.count;f<u;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)He.fromBufferAttribute(t,e),He.normalize(),t.setXYZ(e,He.x,He.y,He.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h),u=0,m=0;for(let y=0,p=l.length;y<p;y++){o.isInterleavedBufferAttribute?u=l[y]*o.data.stride+o.offset:u=l[y]*h;for(let g=0;g<h;g++)f[m++]=c[u++]}return new $e(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let f=c[h],u=t(f,n);l.push(u)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){let u=c[d];h.push(u.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let f=0,u=d.length;f<u;f++)h.push(d[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},qc=new ge,_i=new dl,Dr=new Ri,$c=new U,Ur=new U,Nr=new U,Fr=new U,ho=new U,Or=new U,Yc=new U,Br=new U,fe=class extends Fe{constructor(t=new xe,e=new Cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Or.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(ho.fromBufferAttribute(d,t),a?Or.addScaledVector(ho,h):Or.addScaledVector(ho.sub(e),h))}e.add(Or)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(Dr.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Dr,$c)===null||_i.origin.distanceToSquared($c)>(t.far-t.near)**2))&&(qc.copy(r).invert(),_i.copy(t.ray).applyMatrix4(qc),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=f.length;m<y;m++){let p=f[m],g=a[p.materialIndex],v=Math.max(p.start,u.start),M=Math.min(o.count,Math.min(p.start+p.count,u.start+u.count));for(let _=v,P=M;_<P;_+=3){let A=o.getX(_),C=o.getX(_+1),T=o.getX(_+2);s=zr(this,g,t,n,c,h,d,A,C,T),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,u.start),y=Math.min(o.count,u.start+u.count);for(let p=m,g=y;p<g;p+=3){let v=o.getX(p),M=o.getX(p+1),_=o.getX(p+2);s=zr(this,a,t,n,c,h,d,v,M,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,y=f.length;m<y;m++){let p=f[m],g=a[p.materialIndex],v=Math.max(p.start,u.start),M=Math.min(l.count,Math.min(p.start+p.count,u.start+u.count));for(let _=v,P=M;_<P;_+=3){let A=_,C=_+1,T=_+2;s=zr(this,g,t,n,c,h,d,A,C,T),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,u.start),y=Math.min(l.count,u.start+u.count);for(let p=m,g=y;p<g;p+=3){let v=p,M=p+1,_=p+2;s=zr(this,a,t,n,c,h,d,v,M,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function af(i,t,e,n,s,r,a,o){let l;if(t.side===We?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ai,o),l===null)return null;Br.copy(o),Br.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Br);return c<e.near||c>e.far?null:{distance:c,point:Br.clone(),object:i}}function zr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Ur),i.getVertexPosition(l,Nr),i.getVertexPosition(c,Fr);let h=af(i,t,e,n,Ur,Nr,Fr,Yc);if(h){let d=new U;wi.getBarycoord(Yc,Ur,Nr,Fr,d),s&&(h.uv=wi.getInterpolatedAttribute(s,o,l,c,d,new Ut)),r&&(h.uv1=wi.getInterpolatedAttribute(r,o,l,c,d,new Ut)),a&&(h.normal=wi.getInterpolatedAttribute(a,o,l,c,d,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new U,materialIndex:0};wi.getNormal(Ur,Nr,Fr,f.normal),h.face=f,h.barycoord=d}return h}var Te=class i extends xe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],f=0,u=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(h,3)),this.setAttribute("uv",new Yt(d,2));function m(y,p,g,v,M,_,P,A,C,T,b){let x=_/C,w=P/T,I=_/2,L=P/2,B=A/2,X=C+1,G=T+1,ht=0,N=0,st=new U;for(let ft=0;ft<G;ft++){let J=ft*w-L;for(let it=0;it<X;it++){let vt=it*x-I;st[y]=vt*v,st[p]=J*M,st[g]=B,c.push(st.x,st.y,st.z),st[y]=0,st[p]=0,st[g]=A>0?1:-1,h.push(st.x,st.y,st.z),d.push(it/C),d.push(1-ft/T),ht+=1}}for(let ft=0;ft<T;ft++)for(let J=0;J<C;J++){let it=f+J+X*ft,vt=f+J+X*(ft+1),W=f+(J+1)+X*(ft+1),rt=f+(J+1)+X*ft;l.push(it,vt,rt),l.push(vt,W,rt),N+=6}o.addGroup(u,N,b),u+=N,f+=ht}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function fs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Qe(i){let t={};for(let e=0;e<i.length;e++){let n=fs(i[e]);for(let s in n)t[s]=n[s]}return t}function of(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Xh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}var lf={clone:fs,merge:Qe},cf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,en=class extends Ii{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cf,this.fragmentShader=hf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=fs(t.uniforms),this.uniformsGroups=of(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},la=class extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ni=new U,Zc=new Ut,Jc=new Ut,qe=class extends la{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ks*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Xs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ks*2*Math.atan(Math.tan(Xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ni.x,ni.y).multiplyScalar(-t/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ni.x,ni.y).multiplyScalar(-t/ni.z)}getViewSize(t,e){return this.getViewBounds(t,Zc,Jc),e.subVectors(Jc,Zc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Xs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ki=-90,ji=1,fl=class extends Fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new qe(Ki,ji,t,e);s.layers=this.layers,this.add(s);let r=new qe(Ki,ji,t,e);r.layers=this.layers,this.add(r);let a=new qe(Ki,ji,t,e);a.layers=this.layers,this.add(a);let o=new qe(Ki,ji,t,e);o.layers=this.layers,this.add(o);let l=new qe(Ki,ji,t,e);l.layers=this.layers,this.add(l);let c=new qe(Ki,ji,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ea)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,f,u),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ca=class extends cn{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:cs,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},pl=class extends Gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ca(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Tn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Te(5,5,5),r=new en({name:"CubemapFromEquirect",uniforms:fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:We,blending:si});r.uniforms.tEquirect.value=e;let a=new fe(s,r),o=e.minFilter;return e.minFilter===Ai&&(e.minFilter=Tn),new fl(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},uo=new U,uf=new U,df=new re,Bn=class{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=uo.subVectors(n,e).cross(uf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(uo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||df.getNormalMatrix(t),s=this.coplanarPoint(uo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},yi=new Ri,kr=new U,js=class{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,a=new Bn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=zn){let n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],f=s[7],u=s[8],m=s[9],y=s[10],p=s[11],g=s[12],v=s[13],M=s[14],_=s[15];if(n[0].setComponents(l-r,f-c,p-u,_-g).normalize(),n[1].setComponents(l+r,f+c,p+u,_+g).normalize(),n[2].setComponents(l+a,f+h,p+m,_+v).normalize(),n[3].setComponents(l-a,f-h,p-m,_-v).normalize(),n[4].setComponents(l-o,f-d,p-y,_-M).normalize(),e===zn)n[5].setComponents(l+o,f+d,p+y,_+M).normalize();else if(e===ea)n[5].setComponents(o,d,y,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(t){return yi.center.set(0,0,0),yi.radius=.7071067811865476,yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(kr.x=s.normal.x>0?t.max.x:t.min.x,kr.y=s.normal.y>0?t.max.y:t.min.y,kr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(kr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function qh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ff(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=i.SHORT;else if(c instanceof Uint32Array)u=i.UNSIGNED_INT;else if(c instanceof Int32Array)u=i.INT;else if(c instanceof Int8Array)u=i.BYTE;else if(c instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((u,m)=>u.start-m.start);let f=0;for(let u=1;u<d.length;u++){let m=d[f],y=d[u];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++f,d[f]=y)}d.length=f+1;for(let u=0,m=d.length;u<m;u++){let y=d[u];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var ps=class i extends xe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,f=e/l,u=[],m=[],y=[],p=[];for(let g=0;g<h;g++){let v=g*f-a;for(let M=0;M<c;M++){let _=M*d-r;m.push(_,-v,0),y.push(0,0,1),p.push(M/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<o;v++){let M=v+c*g,_=v+c*(g+1),P=v+1+c*(g+1),A=v+1+c*g;u.push(M,_,A),u.push(_,P,A)}this.setIndex(u),this.setAttribute("position",new Yt(m,3)),this.setAttribute("normal",new Yt(y,3)),this.setAttribute("uv",new Yt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},pf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,gf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_f=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Mf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Sf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ef=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Af=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Cf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Rf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Df=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Nf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ff=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Of=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Bf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,zf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$f=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Zf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Kf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ep=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,np=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ip=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ap=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,op=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,up=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,dp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,pp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,mp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_p=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Sp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ep=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ap=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ip=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Lp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Np=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Fp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Op=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Gp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$p=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Jp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,jp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Qp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,em=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,im=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,am=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,om=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,lm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,dm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,fm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_m=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ym=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,vm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Mm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Em=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Am=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Cm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Im=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Lm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Um=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Nm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Om=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Bm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,km=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,le={alphahash_fragment:pf,alphahash_pars_fragment:mf,alphamap_fragment:gf,alphamap_pars_fragment:xf,alphatest_fragment:_f,alphatest_pars_fragment:yf,aomap_fragment:vf,aomap_pars_fragment:Mf,batching_pars_vertex:bf,batching_vertex:Sf,begin_vertex:wf,beginnormal_vertex:Tf,bsdfs:Ef,iridescence_fragment:Af,bumpmap_pars_fragment:Cf,clipping_planes_fragment:Rf,clipping_planes_pars_fragment:If,clipping_planes_pars_vertex:Pf,clipping_planes_vertex:Lf,color_fragment:Df,color_pars_fragment:Uf,color_pars_vertex:Nf,color_vertex:Ff,common:Of,cube_uv_reflection_fragment:Bf,defaultnormal_vertex:zf,displacementmap_pars_vertex:kf,displacementmap_vertex:Vf,emissivemap_fragment:Hf,emissivemap_pars_fragment:Gf,colorspace_fragment:Wf,colorspace_pars_fragment:Xf,envmap_fragment:qf,envmap_common_pars_fragment:$f,envmap_pars_fragment:Yf,envmap_pars_vertex:Zf,envmap_physical_pars_fragment:ap,envmap_vertex:Jf,fog_vertex:Kf,fog_pars_vertex:jf,fog_fragment:Qf,fog_pars_fragment:tp,gradientmap_pars_fragment:ep,lightmap_pars_fragment:np,lights_lambert_fragment:ip,lights_lambert_pars_fragment:sp,lights_pars_begin:rp,lights_toon_fragment:op,lights_toon_pars_fragment:lp,lights_phong_fragment:cp,lights_phong_pars_fragment:hp,lights_physical_fragment:up,lights_physical_pars_fragment:dp,lights_fragment_begin:fp,lights_fragment_maps:pp,lights_fragment_end:mp,logdepthbuf_fragment:gp,logdepthbuf_pars_fragment:xp,logdepthbuf_pars_vertex:_p,logdepthbuf_vertex:yp,map_fragment:vp,map_pars_fragment:Mp,map_particle_fragment:bp,map_particle_pars_fragment:Sp,metalnessmap_fragment:wp,metalnessmap_pars_fragment:Tp,morphinstance_vertex:Ep,morphcolor_vertex:Ap,morphnormal_vertex:Cp,morphtarget_pars_vertex:Rp,morphtarget_vertex:Ip,normal_fragment_begin:Pp,normal_fragment_maps:Lp,normal_pars_fragment:Dp,normal_pars_vertex:Up,normal_vertex:Np,normalmap_pars_fragment:Fp,clearcoat_normal_fragment_begin:Op,clearcoat_normal_fragment_maps:Bp,clearcoat_pars_fragment:zp,iridescence_pars_fragment:kp,opaque_fragment:Vp,packing:Hp,premultiplied_alpha_fragment:Gp,project_vertex:Wp,dithering_fragment:Xp,dithering_pars_fragment:qp,roughnessmap_fragment:$p,roughnessmap_pars_fragment:Yp,shadowmap_pars_fragment:Zp,shadowmap_pars_vertex:Jp,shadowmap_vertex:Kp,shadowmask_pars_fragment:jp,skinbase_vertex:Qp,skinning_pars_vertex:tm,skinning_vertex:em,skinnormal_vertex:nm,specularmap_fragment:im,specularmap_pars_fragment:sm,tonemapping_fragment:rm,tonemapping_pars_fragment:am,transmission_fragment:om,transmission_pars_fragment:lm,uv_pars_fragment:cm,uv_pars_vertex:hm,uv_vertex:um,worldpos_vertex:dm,background_vert:fm,background_frag:pm,backgroundCube_vert:mm,backgroundCube_frag:gm,cube_vert:xm,cube_frag:_m,depth_vert:ym,depth_frag:vm,distanceRGBA_vert:Mm,distanceRGBA_frag:bm,equirect_vert:Sm,equirect_frag:wm,linedashed_vert:Tm,linedashed_frag:Em,meshbasic_vert:Am,meshbasic_frag:Cm,meshlambert_vert:Rm,meshlambert_frag:Im,meshmatcap_vert:Pm,meshmatcap_frag:Lm,meshnormal_vert:Dm,meshnormal_frag:Um,meshphong_vert:Nm,meshphong_frag:Fm,meshphysical_vert:Om,meshphysical_frag:Bm,meshtoon_vert:zm,meshtoon_frag:km,points_vert:Vm,points_frag:Hm,shadow_vert:Gm,shadow_frag:Wm,sprite_vert:Xm,sprite_frag:qm},Dt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},envMapRotation:{value:new re},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},wn={basic:{uniforms:Qe([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:Qe([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:Qe([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:Qe([Dt.common,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.roughnessmap,Dt.metalnessmap,Dt.fog,Dt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:Qe([Dt.common,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.gradientmap,Dt.fog,Dt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:Qe([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:Qe([Dt.points,Dt.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:Qe([Dt.common,Dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:Qe([Dt.common,Dt.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:Qe([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:Qe([Dt.sprite,Dt.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new re}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distanceRGBA:{uniforms:Qe([Dt.common,Dt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distanceRGBA_vert,fragmentShader:le.distanceRGBA_frag},shadow:{uniforms:Qe([Dt.lights,Dt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};wn.physical={uniforms:Qe([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};var Vr={r:0,b:0,g:0},vi=new An,$m=new ge;function Ym(i,t,e,n,s,r,a){let o=new Gt(0),l=r===!0?0:1,c,h,d=null,f=0,u=null;function m(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?e:t).get(M)),M}function y(v){let M=!1,_=m(v);_===null?g(o,l):_&&_.isColor&&(g(_,1),M=!0);let P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(v,M){let _=m(M);_&&(_.isCubeTexture||_.mapping===wa)?(h===void 0&&(h=new fe(new Te(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:fs(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),vi.copy(M.backgroundRotation),vi.x*=-1,vi.y*=-1,vi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($m.makeRotationFromEuler(vi)),h.material.toneMapped=he.getTransfer(_.colorSpace)!==ye,(d!==_||f!==_.version||u!==i.toneMapping)&&(h.material.needsUpdate=!0,d=_,f=_.version,u=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new fe(new ps(2,2),new en({name:"BackgroundMaterial",uniforms:fs(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=he.getTransfer(_.colorSpace)!==ye,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||f!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=_,f=_.version,u=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function g(v,M){v.getRGB(Vr,Xh(i)),n.buffers.color.setClear(Vr.r,Vr.g,Vr.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(v,M=1){o.set(v),l=M,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,g(o,l)},render:y,addToRenderList:p}}function Zm(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(x,w,I,L,B){let X=!1,G=d(L,I,w);r!==G&&(r=G,c(r.object)),X=u(x,L,I,B),X&&m(x,L,I,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,_(x,w,I,L),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function d(x,w,I){let L=I.wireframe===!0,B=n[x.id];B===void 0&&(B={},n[x.id]=B);let X=B[w.id];X===void 0&&(X={},B[w.id]=X);let G=X[L];return G===void 0&&(G=f(l()),X[L]=G),G}function f(x){let w=[],I=[],L=[];for(let B=0;B<e;B++)w[B]=0,I[B]=0,L[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:I,attributeDivisors:L,object:x,attributes:{},index:null}}function u(x,w,I,L){let B=r.attributes,X=w.attributes,G=0,ht=I.getAttributes();for(let N in ht)if(ht[N].location>=0){let ft=B[N],J=X[N];if(J===void 0&&(N==="instanceMatrix"&&x.instanceMatrix&&(J=x.instanceMatrix),N==="instanceColor"&&x.instanceColor&&(J=x.instanceColor)),ft===void 0||ft.attribute!==J||J&&ft.data!==J.data)return!0;G++}return r.attributesNum!==G||r.index!==L}function m(x,w,I,L){let B={},X=w.attributes,G=0,ht=I.getAttributes();for(let N in ht)if(ht[N].location>=0){let ft=X[N];ft===void 0&&(N==="instanceMatrix"&&x.instanceMatrix&&(ft=x.instanceMatrix),N==="instanceColor"&&x.instanceColor&&(ft=x.instanceColor));let J={};J.attribute=ft,ft&&ft.data&&(J.data=ft.data),B[N]=J,G++}r.attributes=B,r.attributesNum=G,r.index=L}function y(){let x=r.newAttributes;for(let w=0,I=x.length;w<I;w++)x[w]=0}function p(x){g(x,0)}function g(x,w){let I=r.newAttributes,L=r.enabledAttributes,B=r.attributeDivisors;I[x]=1,L[x]===0&&(i.enableVertexAttribArray(x),L[x]=1),B[x]!==w&&(i.vertexAttribDivisor(x,w),B[x]=w)}function v(){let x=r.newAttributes,w=r.enabledAttributes;for(let I=0,L=w.length;I<L;I++)w[I]!==x[I]&&(i.disableVertexAttribArray(I),w[I]=0)}function M(x,w,I,L,B,X,G){G===!0?i.vertexAttribIPointer(x,w,I,B,X):i.vertexAttribPointer(x,w,I,L,B,X)}function _(x,w,I,L){y();let B=L.attributes,X=I.getAttributes(),G=w.defaultAttributeValues;for(let ht in X){let N=X[ht];if(N.location>=0){let st=B[ht];if(st===void 0&&(ht==="instanceMatrix"&&x.instanceMatrix&&(st=x.instanceMatrix),ht==="instanceColor"&&x.instanceColor&&(st=x.instanceColor)),st!==void 0){let ft=st.normalized,J=st.itemSize,it=t.get(st);if(it===void 0)continue;let vt=it.buffer,W=it.type,rt=it.bytesPerElement,mt=W===i.INT||W===i.UNSIGNED_INT||st.gpuType===ql;if(st.isInterleavedBufferAttribute){let k=st.data,tt=k.stride,at=st.offset;if(k.isInstancedInterleavedBuffer){for(let xt=0;xt<N.locationSize;xt++)g(N.location+xt,k.meshPerAttribute);x.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let xt=0;xt<N.locationSize;xt++)p(N.location+xt);i.bindBuffer(i.ARRAY_BUFFER,vt);for(let xt=0;xt<N.locationSize;xt++)M(N.location+xt,J/N.locationSize,W,ft,tt*rt,(at+J/N.locationSize*xt)*rt,mt)}else{if(st.isInstancedBufferAttribute){for(let k=0;k<N.locationSize;k++)g(N.location+k,st.meshPerAttribute);x.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let k=0;k<N.locationSize;k++)p(N.location+k);i.bindBuffer(i.ARRAY_BUFFER,vt);for(let k=0;k<N.locationSize;k++)M(N.location+k,J/N.locationSize,W,ft,J*rt,J/N.locationSize*k*rt,mt)}}else if(G!==void 0){let ft=G[ht];if(ft!==void 0)switch(ft.length){case 2:i.vertexAttrib2fv(N.location,ft);break;case 3:i.vertexAttrib3fv(N.location,ft);break;case 4:i.vertexAttrib4fv(N.location,ft);break;default:i.vertexAttrib1fv(N.location,ft)}}}}v()}function P(){T();for(let x in n){let w=n[x];for(let I in w){let L=w[I];for(let B in L)h(L[B].object),delete L[B];delete w[I]}delete n[x]}}function A(x){if(n[x.id]===void 0)return;let w=n[x.id];for(let I in w){let L=w[I];for(let B in L)h(L[B].object),delete L[B];delete w[I]}delete n[x.id]}function C(x){for(let w in n){let I=n[w];if(I[x.id]===void 0)continue;let L=I[x.id];for(let B in L)h(L[B].object),delete L[B];delete I[x.id]}}function T(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:b,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:p,disableUnusedAttributes:v}}function Jm(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let u=0;for(let m=0;m<d;m++)u+=h[m];e.update(u,n,1)}function l(c,h,d,f){if(d===0)return;let u=t.get("WEBGL_multi_draw");if(u===null)for(let m=0;m<c.length;m++)a(c[m],h[m],f[m]);else{u.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,d);let m=0;for(let y=0;y<d;y++)m+=h[y]*f[y];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Km(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==vn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let T=C===ar&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Hn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==En&&!T)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=m>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:u,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:P,maxSamples:A}}function jm(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Bn,o=new re,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let u=d.length!==0||f||n!==0||s;return s=f,n=d.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=h(d,f,0)},this.setState=function(d,f,u){let m=d.clippingPlanes,y=d.clipIntersection,p=d.clipShadows,g=i.get(d);if(!s||m===null||m.length===0||r&&!p)r?h(null):c();else{let v=r?0:n,M=v*4,_=g.clippingState||null;l.value=_,_=h(m,f,M,u);for(let P=0;P!==M;++P)_[P]=e[P];g.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,f,u,m){let y=d!==null?d.length:0,p=null;if(y!==0){if(p=l.value,m!==!0||p===null){let g=u+y*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<g)&&(p=new Float32Array(g));for(let M=0,_=u;M!==y;++M,_+=4)a.copy(d[M]).applyMatrix4(v,o),a.normal.toArray(p,_),p[_+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,p}}function Qm(i){let t=new WeakMap;function e(a,o){return o===Lo?a.mapping=cs:o===Do&&(a.mapping=hs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Lo||o===Do)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new pl(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ha=class extends la{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ns=4,Kc=[.125,.215,.35,.446,.526,.582],Ti=20,fo=new ha,jc=new Gt,po=null,mo=0,go=0,xo=!1,bi=(1+Math.sqrt(5))/2,Qi=1/bi,Qc=[new U(-bi,Qi,0),new U(bi,Qi,0),new U(-Qi,0,bi),new U(Qi,0,bi),new U(0,bi,-Qi),new U(0,bi,Qi),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],ua=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),go=this._renderer.getActiveMipmapLevel(),xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=eh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(po,mo,go),this._renderer.xr.enabled=xo,t.scissorTest=!1,Hr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===cs||t.mapping===hs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),go=this._renderer.getActiveMipmapLevel(),xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:ar,format:vn,colorSpace:ws,depthBuffer:!1},s=th(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=th(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=tg(r)),this._blurMaterial=eg(r,t,e)}return s}_compileMaterial(t){let e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,fo)}_sceneToCubeUV(t,e,n,s){let o=new qe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(jc),h.toneMapping=ri,h.autoClear=!1;let u=new Cn({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),m=new fe(new Te,u),y=!1,p=t.background;p?p.isColor&&(u.color.copy(p),t.background=null,y=!0):(u.color.copy(jc),y=!0);for(let g=0;g<6;g++){let v=g%3;v===0?(o.up.set(0,l[g],0),o.lookAt(c[g],0,0)):v===1?(o.up.set(0,0,l[g]),o.lookAt(0,c[g],0)):(o.up.set(0,l[g],0),o.lookAt(0,0,c[g]));let M=this._cubeSize;Hr(s,v*M,g>2?M:0,M,M),h.setRenderTarget(s),y&&h.render(m,o),h.render(t,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===cs||t.mapping===hs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=nh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=eh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new fe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Hr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,fo)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Qc[(s-r-1)%Qc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new fe(this._lodPlanes[s],c),f=c.uniforms,u=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*u):2*Math.PI/(2*Ti-1),y=r/m,p=isFinite(r)?1+Math.floor(h*y):Ti;p>Ti&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ti}`);let g=[],v=0;for(let C=0;C<Ti;++C){let T=C/y,b=Math.exp(-T*T/2);g.push(b),C===0?v+=b:C<p&&(v+=2*b)}for(let C=0;C<g.length;C++)g[C]=g[C]/v;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=g,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:M}=this;f.dTheta.value=m,f.mipInt.value=M-n;let _=this._sizeLods[s],P=3*_*(s>M-ns?s-M+ns:0),A=4*(this._cubeSize-_);Hr(e,P,A,3*_,2*_),l.setRenderTarget(e),l.render(d,fo)}};function tg(i){let t=[],e=[],n=[],s=i,r=i-ns+1+Kc.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-ns?l=Kc[a-i+ns-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],u=6,m=6,y=3,p=2,g=1,v=new Float32Array(y*m*u),M=new Float32Array(p*m*u),_=new Float32Array(g*m*u);for(let A=0;A<u;A++){let C=A%3*2/3-1,T=A>2?0:-1,b=[C,T,0,C+2/3,T,0,C+2/3,T+1,0,C,T,0,C+2/3,T+1,0,C,T+1,0];v.set(b,y*m*A),M.set(f,p*m*A);let x=[A,A,A,A,A,A];_.set(x,g*m*A)}let P=new xe;P.setAttribute("position",new $e(v,y)),P.setAttribute("uv",new $e(M,p)),P.setAttribute("faceIndex",new $e(_,g)),t.push(P),s>ns&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function th(i,t,e){let n=new Gn(i,t,e);return n.texture.mapping=wa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function eg(i,t,e){let n=new Float32Array(Ti),s=new U(0,1,0);return new en({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function eh(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function nh(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function tc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ng(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Lo||l===Do,h=l===cs||l===hs;if(c||h){let d=t.get(o),f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new ua(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let u=o.image;return c&&u&&u.height>0||h&&u&&s(u)?(e===null&&(e=new ua(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function ig(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Gs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function sg(i,t,e,n){let s={},r=new WeakMap;function a(d){let f=d.target;f.index!==null&&t.remove(f.index);for(let m in f.attributes)t.remove(f.attributes[m]);for(let m in f.morphAttributes){let y=f.morphAttributes[m];for(let p=0,g=y.length;p<g;p++)t.remove(y[p])}f.removeEventListener("dispose",a),delete s[f.id];let u=r.get(f);u&&(t.remove(u),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(d){let f=d.attributes;for(let m in f)t.update(f[m],i.ARRAY_BUFFER);let u=d.morphAttributes;for(let m in u){let y=u[m];for(let p=0,g=y.length;p<g;p++)t.update(y[p],i.ARRAY_BUFFER)}}function c(d){let f=[],u=d.index,m=d.attributes.position,y=0;if(u!==null){let v=u.array;y=u.version;for(let M=0,_=v.length;M<_;M+=3){let P=v[M+0],A=v[M+1],C=v[M+2];f.push(P,A,A,C,C,P)}}else if(m!==void 0){let v=m.array;y=m.version;for(let M=0,_=v.length/3-1;M<_;M+=3){let P=M+0,A=M+1,C=M+2;f.push(P,A,A,C,C,P)}}else return;let p=new(Gh(f)?oa:aa)(f,1);p.version=y;let g=r.get(d);g&&t.remove(g),r.set(d,p)}function h(d){let f=r.get(d);if(f){let u=d.index;u!==null&&f.version<u.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function rg(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){i.drawElements(n,u,r,f*a),e.update(u,n,1)}function c(f,u,m){m!==0&&(i.drawElementsInstanced(n,u,r,f*a,m),e.update(u,n,m))}function h(f,u,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,m);let p=0;for(let g=0;g<m;g++)p+=u[g];e.update(p,n,1)}function d(f,u,m,y){if(m===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<f.length;g++)c(f[g]/a,u[g],y[g]);else{p.multiDrawElementsInstancedWEBGL(n,u,0,r,f,0,y,0,m);let g=0;for(let v=0;v<m;v++)g+=u[v]*y[v];e.update(g,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function ag(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function og(i,t,e){let n=new WeakMap,s=new Ce;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==d){let b=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let u=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],M=0;u===!0&&(M=1),m===!0&&(M=2),y===!0&&(M=3);let _=o.attributes.position.count*M,P=1;_>t.maxTextureSize&&(P=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let A=new Float32Array(_*P*4*d),C=new sa(A,_,P,d);C.type=En,C.needsUpdate=!0;let T=M*4;for(let x=0;x<d;x++){let w=p[x],I=g[x],L=v[x],B=_*P*4*x;for(let X=0;X<w.count;X++){let G=X*T;u===!0&&(s.fromBufferAttribute(w,X),A[B+G+0]=s.x,A[B+G+1]=s.y,A[B+G+2]=s.z,A[B+G+3]=0),m===!0&&(s.fromBufferAttribute(I,X),A[B+G+4]=s.x,A[B+G+5]=s.y,A[B+G+6]=s.z,A[B+G+7]=0),y===!0&&(s.fromBufferAttribute(L,X),A[B+G+8]=s.x,A[B+G+9]=s.y,A[B+G+10]=s.z,A[B+G+11]=L.itemSize===4?s.w:1)}}f={count:d,texture:C,size:new Ut(_,P)},n.set(o,f),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let u=0;for(let y=0;y<c.length;y++)u+=c[y];let m=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function lg(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var da=class extends cn{constructor(t,e,n,s,r,a,o,l,c,h=rs){if(h!==rs&&h!==ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===rs&&(n=Ci),n===void 0&&h===ds&&(n=us),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:ln,this.minFilter=l!==void 0?l:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},$h=new cn,ih=new da(1,1),Yh=new sa,Zh=new ul,Jh=new ca,sh=[],rh=[],ah=new Float32Array(16),oh=new Float32Array(9),lh=new Float32Array(4);function Ts(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=sh[s];if(r===void 0&&(r=new Float32Array(s),sh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Oe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Be(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ea(i,t){let e=rh[t];e===void 0&&(e=new Int32Array(t),rh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function cg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;i.uniform2fv(this.addr,t),Be(e,t)}}function ug(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Oe(e,t))return;i.uniform3fv(this.addr,t),Be(e,t)}}function dg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;i.uniform4fv(this.addr,t),Be(e,t)}}function fg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,n))return;lh.set(n),i.uniformMatrix2fv(this.addr,!1,lh),Be(e,n)}}function pg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,n))return;oh.set(n),i.uniformMatrix3fv(this.addr,!1,oh),Be(e,n)}}function mg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,n))return;ah.set(n),i.uniformMatrix4fv(this.addr,!1,ah),Be(e,n)}}function gg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function xg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;i.uniform2iv(this.addr,t),Be(e,t)}}function _g(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Oe(e,t))return;i.uniform3iv(this.addr,t),Be(e,t)}}function yg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;i.uniform4iv(this.addr,t),Be(e,t)}}function vg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Mg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;i.uniform2uiv(this.addr,t),Be(e,t)}}function bg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Oe(e,t))return;i.uniform3uiv(this.addr,t),Be(e,t)}}function Sg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;i.uniform4uiv(this.addr,t),Be(e,t)}}function wg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ih.compareFunction=Hh,r=ih):r=$h,e.setTexture2D(t||r,s)}function Tg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Zh,s)}function Eg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Jh,s)}function Ag(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Yh,s)}function Cg(i){switch(i){case 5126:return cg;case 35664:return hg;case 35665:return ug;case 35666:return dg;case 35674:return fg;case 35675:return pg;case 35676:return mg;case 5124:case 35670:return gg;case 35667:case 35671:return xg;case 35668:case 35672:return _g;case 35669:case 35673:return yg;case 5125:return vg;case 36294:return Mg;case 36295:return bg;case 36296:return Sg;case 35678:case 36198:case 36298:case 36306:case 35682:return wg;case 35679:case 36299:case 36307:return Tg;case 35680:case 36300:case 36308:case 36293:return Eg;case 36289:case 36303:case 36311:case 36292:return Ag}}function Rg(i,t){i.uniform1fv(this.addr,t)}function Ig(i,t){let e=Ts(t,this.size,2);i.uniform2fv(this.addr,e)}function Pg(i,t){let e=Ts(t,this.size,3);i.uniform3fv(this.addr,e)}function Lg(i,t){let e=Ts(t,this.size,4);i.uniform4fv(this.addr,e)}function Dg(i,t){let e=Ts(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Ug(i,t){let e=Ts(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Ng(i,t){let e=Ts(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Fg(i,t){i.uniform1iv(this.addr,t)}function Og(i,t){i.uniform2iv(this.addr,t)}function Bg(i,t){i.uniform3iv(this.addr,t)}function zg(i,t){i.uniform4iv(this.addr,t)}function kg(i,t){i.uniform1uiv(this.addr,t)}function Vg(i,t){i.uniform2uiv(this.addr,t)}function Hg(i,t){i.uniform3uiv(this.addr,t)}function Gg(i,t){i.uniform4uiv(this.addr,t)}function Wg(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||$h,r[a])}function Xg(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Zh,r[a])}function qg(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Jh,r[a])}function $g(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Yh,r[a])}function Yg(i){switch(i){case 5126:return Rg;case 35664:return Ig;case 35665:return Pg;case 35666:return Lg;case 35674:return Dg;case 35675:return Ug;case 35676:return Ng;case 5124:case 35670:return Fg;case 35667:case 35671:return Og;case 35668:case 35672:return Bg;case 35669:case 35673:return zg;case 5125:return kg;case 36294:return Vg;case 36295:return Hg;case 36296:return Gg;case 35678:case 36198:case 36298:case 36306:case 35682:return Wg;case 35679:case 36299:case 36307:return Xg;case 35680:case 36300:case 36308:case 36293:return qg;case 36289:case 36303:case 36311:case 36292:return $g}}var ml=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Cg(e.type)}},gl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Yg(e.type)}},xl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},_o=/(\w+)(\])?(\[|\.)?/g;function ch(i,t){i.seq.push(t),i.map[t.id]=t}function Zg(i,t,e){let n=i.name,s=n.length;for(_o.lastIndex=0;;){let r=_o.exec(n),a=_o.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){ch(e,c===void 0?new ml(o,i,t):new gl(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new xl(o),ch(e,d)),e=d}}}var os=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Zg(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function hh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Jg=37297,Kg=0;function jg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var uh=new re;function Qg(i){he._getMatrix(uh,he.workingColorSpace,i);let t=`mat3( ${uh.elements.map(e=>e.toFixed(4))} )`;switch(he.getTransfer(i)){case Ta:return[t,"LinearTransferOETF"];case ye:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function dh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+jg(i.getShaderSource(t),a)}else return s}function t0(i,t){let e=Qg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function e0(i,t){let e;switch(t){case ud:e="Linear";break;case dd:e="Reinhard";break;case fd:e="Cineon";break;case pd:e="ACESFilmic";break;case gd:e="AgX";break;case rr:e="Neutral";break;case md:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Gr=new U;function n0(){he.getLuminanceCoefficients(Gr);let i=Gr.x.toFixed(4),t=Gr.y.toFixed(4),e=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function i0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ws).join(`
`)}function s0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function r0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ws(i){return i!==""}function fh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ph(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var a0=/^[ \t]*#include +<([\w\d./]+)>/gm;function _l(i){return i.replace(a0,l0)}var o0=new Map;function l0(i,t){let e=le[t];if(e===void 0){let n=o0.get(t);if(n!==void 0)e=le[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return _l(e)}var c0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mh(i){return i.replace(c0,h0)}function h0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function gh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function u0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Rh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===sr?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===On&&(t="SHADOWMAP_TYPE_VSM"),t}function d0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case cs:case hs:t="ENVMAP_TYPE_CUBE";break;case wa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function f0(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===hs&&(t="ENVMAP_MODE_REFRACTION"),t}function p0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ih:t="ENVMAP_BLENDING_MULTIPLY";break;case cd:t="ENVMAP_BLENDING_MIX";break;case hd:t="ENVMAP_BLENDING_ADD";break}return t}function m0(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function g0(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=u0(e),c=d0(e),h=f0(e),d=p0(e),f=m0(e),u=i0(e),m=s0(r),y=s.createProgram(),p,g,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ws).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ws).join(`
`),g.length>0&&(g+=`
`)):(p=[gh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ws).join(`
`),g=[gh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?le.tonemapping_pars_fragment:"",e.toneMapping!==ri?e0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,t0("linearToOutputTexel",e.outputColorSpace),n0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ws).join(`
`)),a=_l(a),a=fh(a,e),a=ph(a,e),o=_l(o),o=fh(o,e),o=ph(o,e),a=mh(a),o=mh(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",e.glslVersion===Rc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=v+p+a,_=v+g+o,P=hh(s,s.VERTEX_SHADER,M),A=hh(s,s.FRAGMENT_SHADER,_);s.attachShader(y,P),s.attachShader(y,A),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function C(w){if(i.debug.checkShaderErrors){let I=s.getProgramInfoLog(y).trim(),L=s.getShaderInfoLog(P).trim(),B=s.getShaderInfoLog(A).trim(),X=!0,G=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,P,A);else{let ht=dh(s,P,"vertex"),N=dh(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+I+`
`+ht+`
`+N)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(L===""||B==="")&&(G=!1);G&&(w.diagnostics={runnable:X,programLog:I,vertexShader:{log:L,prefix:p},fragmentShader:{log:B,prefix:g}})}s.deleteShader(P),s.deleteShader(A),T=new os(s,y),b=r0(s,y)}let T;this.getUniforms=function(){return T===void 0&&C(this),T};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(y,Jg)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Kg++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=P,this.fragmentShader=A,this}var x0=0,yl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new vl(t),e.set(t,n)),n}},vl=class{constructor(t){this.id=x0++,this.code=t,this.usedTimes=0}};function _0(i,t,e,n,s,r,a){let o=new ra,l=new yl,c=new Set,h=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures,u=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(b){return c.add(b),b===0?"uv":`uv${b}`}function p(b,x,w,I,L){let B=I.fog,X=L.geometry,G=b.isMeshStandardMaterial?I.environment:null,ht=(b.isMeshStandardMaterial?e:t).get(b.envMap||G),N=ht&&ht.mapping===wa?ht.image.height:null,st=m[b.type];b.precision!==null&&(u=s.getMaxPrecision(b.precision),u!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",u,"instead."));let ft=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,J=ft!==void 0?ft.length:0,it=0;X.morphAttributes.position!==void 0&&(it=1),X.morphAttributes.normal!==void 0&&(it=2),X.morphAttributes.color!==void 0&&(it=3);let vt,W,rt,mt;if(st){let Mt=wn[st];vt=Mt.vertexShader,W=Mt.fragmentShader}else vt=b.vertexShader,W=b.fragmentShader,l.update(b),rt=l.getVertexShaderID(b),mt=l.getFragmentShaderID(b);let k=i.getRenderTarget(),tt=i.state.buffers.depth.getReversed(),at=L.isInstancedMesh===!0,xt=L.isBatchedMesh===!0,Et=!!b.map,Ct=!!b.matcap,_t=!!ht,D=!!b.aoMap,ae=!!b.lightMap,Kt=!!b.bumpMap,jt=!!b.normalMap,zt=!!b.displacementMap,oe=!!b.emissiveMap,Ht=!!b.metalnessMap,R=!!b.roughnessMap,S=b.anisotropy>0,q=b.clearcoat>0,ct=b.dispersion>0,ut=b.iridescence>0,nt=b.sheen>0,Ft=b.transmission>0,It=S&&!!b.anisotropyMap,Pt=q&&!!b.clearcoatMap,Qt=q&&!!b.clearcoatNormalMap,pt=q&&!!b.clearcoatRoughnessMap,Ot=ut&&!!b.iridescenceMap,kt=ut&&!!b.iridescenceThicknessMap,Zt=nt&&!!b.sheenColorMap,Nt=nt&&!!b.sheenRoughnessMap,ie=!!b.specularMap,te=!!b.specularColorMap,ce=!!b.specularIntensityMap,F=Ft&&!!b.transmissionMap,wt=Ft&&!!b.thicknessMap,Q=!!b.gradientMap,ot=!!b.alphaMap,Rt=b.alphaTest>0,At=!!b.alphaHash,H=!!b.extensions,z=ri;b.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(z=i.toneMapping);let dt={shaderID:st,shaderType:b.type,shaderName:b.name,vertexShader:vt,fragmentShader:W,defines:b.defines,customVertexShaderID:rt,customFragmentShaderID:mt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:u,batching:xt,batchingColor:xt&&L._colorsTexture!==null,instancing:at,instancingColor:at&&L.instanceColor!==null,instancingMorph:at&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:k===null?i.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:ws,alphaToCoverage:!!b.alphaToCoverage,map:Et,matcap:Ct,envMap:_t,envMapMode:_t&&ht.mapping,envMapCubeUVHeight:N,aoMap:D,lightMap:ae,bumpMap:Kt,normalMap:jt,displacementMap:f&&zt,emissiveMap:oe,normalMapObjectSpace:jt&&b.normalMapType===vd,normalMapTangentSpace:jt&&b.normalMapType===Vh,metalnessMap:Ht,roughnessMap:R,anisotropy:S,anisotropyMap:It,clearcoat:q,clearcoatMap:Pt,clearcoatNormalMap:Qt,clearcoatRoughnessMap:pt,dispersion:ct,iridescence:ut,iridescenceMap:Ot,iridescenceThicknessMap:kt,sheen:nt,sheenColorMap:Zt,sheenRoughnessMap:Nt,specularMap:ie,specularColorMap:te,specularIntensityMap:ce,transmission:Ft,transmissionMap:F,thicknessMap:wt,gradientMap:Q,opaque:b.transparent===!1&&b.blending===ss&&b.alphaToCoverage===!1,alphaMap:ot,alphaTest:Rt,alphaHash:At,combine:b.combine,mapUv:Et&&y(b.map.channel),aoMapUv:D&&y(b.aoMap.channel),lightMapUv:ae&&y(b.lightMap.channel),bumpMapUv:Kt&&y(b.bumpMap.channel),normalMapUv:jt&&y(b.normalMap.channel),displacementMapUv:zt&&y(b.displacementMap.channel),emissiveMapUv:oe&&y(b.emissiveMap.channel),metalnessMapUv:Ht&&y(b.metalnessMap.channel),roughnessMapUv:R&&y(b.roughnessMap.channel),anisotropyMapUv:It&&y(b.anisotropyMap.channel),clearcoatMapUv:Pt&&y(b.clearcoatMap.channel),clearcoatNormalMapUv:Qt&&y(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&y(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ot&&y(b.iridescenceMap.channel),iridescenceThicknessMapUv:kt&&y(b.iridescenceThicknessMap.channel),sheenColorMapUv:Zt&&y(b.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&y(b.sheenRoughnessMap.channel),specularMapUv:ie&&y(b.specularMap.channel),specularColorMapUv:te&&y(b.specularColorMap.channel),specularIntensityMapUv:ce&&y(b.specularIntensityMap.channel),transmissionMapUv:F&&y(b.transmissionMap.channel),thicknessMapUv:wt&&y(b.thicknessMap.channel),alphaMapUv:ot&&y(b.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(jt||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!X.attributes.uv&&(Et||ot),fog:!!B,useFog:b.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:tt,skinning:L.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:it,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:z,decodeVideoTexture:Et&&b.map.isVideoTexture===!0&&he.getTransfer(b.map.colorSpace)===ye,decodeVideoTextureEmissive:oe&&b.emissiveMap.isVideoTexture===!0&&he.getTransfer(b.emissiveMap.colorSpace)===ye,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Pe,flipSided:b.side===We,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:H&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(H&&b.extensions.multiDraw===!0||xt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return dt.vertexUv1s=c.has(1),dt.vertexUv2s=c.has(2),dt.vertexUv3s=c.has(3),c.clear(),dt}function g(b){let x=[];if(b.shaderID?x.push(b.shaderID):(x.push(b.customVertexShaderID),x.push(b.customFragmentShaderID)),b.defines!==void 0)for(let w in b.defines)x.push(w),x.push(b.defines[w]);return b.isRawShaderMaterial===!1&&(v(x,b),M(x,b),x.push(i.outputColorSpace)),x.push(b.customProgramCacheKey),x.join()}function v(b,x){b.push(x.precision),b.push(x.outputColorSpace),b.push(x.envMapMode),b.push(x.envMapCubeUVHeight),b.push(x.mapUv),b.push(x.alphaMapUv),b.push(x.lightMapUv),b.push(x.aoMapUv),b.push(x.bumpMapUv),b.push(x.normalMapUv),b.push(x.displacementMapUv),b.push(x.emissiveMapUv),b.push(x.metalnessMapUv),b.push(x.roughnessMapUv),b.push(x.anisotropyMapUv),b.push(x.clearcoatMapUv),b.push(x.clearcoatNormalMapUv),b.push(x.clearcoatRoughnessMapUv),b.push(x.iridescenceMapUv),b.push(x.iridescenceThicknessMapUv),b.push(x.sheenColorMapUv),b.push(x.sheenRoughnessMapUv),b.push(x.specularMapUv),b.push(x.specularColorMapUv),b.push(x.specularIntensityMapUv),b.push(x.transmissionMapUv),b.push(x.thicknessMapUv),b.push(x.combine),b.push(x.fogExp2),b.push(x.sizeAttenuation),b.push(x.morphTargetsCount),b.push(x.morphAttributeCount),b.push(x.numDirLights),b.push(x.numPointLights),b.push(x.numSpotLights),b.push(x.numSpotLightMaps),b.push(x.numHemiLights),b.push(x.numRectAreaLights),b.push(x.numDirLightShadows),b.push(x.numPointLightShadows),b.push(x.numSpotLightShadows),b.push(x.numSpotLightShadowsWithMaps),b.push(x.numLightProbes),b.push(x.shadowMapType),b.push(x.toneMapping),b.push(x.numClippingPlanes),b.push(x.numClipIntersection),b.push(x.depthPacking)}function M(b,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),b.push(o.mask)}function _(b){let x=m[b.type],w;if(x){let I=wn[x];w=lf.clone(I.uniforms)}else w=b.uniforms;return w}function P(b,x){let w;for(let I=0,L=h.length;I<L;I++){let B=h[I];if(B.cacheKey===x){w=B,++w.usedTimes;break}}return w===void 0&&(w=new g0(i,x,b,r),h.push(w)),w}function A(b){if(--b.usedTimes===0){let x=h.indexOf(b);h[x]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function T(){l.dispose()}return{getParameters:p,getProgramCacheKey:g,getUniforms:_,acquireProgram:P,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:T}}function y0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function v0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function xh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function _h(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,f,u,m,y,p){let g=i[t];return g===void 0?(g={id:d.id,object:d,geometry:f,material:u,groupOrder:m,renderOrder:d.renderOrder,z:y,group:p},i[t]=g):(g.id=d.id,g.object=d,g.geometry=f,g.material=u,g.groupOrder=m,g.renderOrder=d.renderOrder,g.z=y,g.group=p),t++,g}function o(d,f,u,m,y,p){let g=a(d,f,u,m,y,p);u.transmission>0?n.push(g):u.transparent===!0?s.push(g):e.push(g)}function l(d,f,u,m,y,p){let g=a(d,f,u,m,y,p);u.transmission>0?n.unshift(g):u.transparent===!0?s.unshift(g):e.unshift(g)}function c(d,f){e.length>1&&e.sort(d||v0),n.length>1&&n.sort(f||xh),s.length>1&&s.sort(f||xh)}function h(){for(let d=t,f=i.length;d<f;d++){let u=i[d];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function M0(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new _h,i.set(n,[a])):s>=r.length?(a=new _h,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function b0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Gt};break;case"SpotLight":e={position:new U,direction:new U,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function S0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var w0=0;function T0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function E0(i){let t=new b0,e=S0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);let s=new U,r=new ge,a=new ge;function o(c){let h=0,d=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let u=0,m=0,y=0,p=0,g=0,v=0,M=0,_=0,P=0,A=0,C=0;c.sort(T0);for(let b=0,x=c.length;b<x;b++){let w=c[b],I=w.color,L=w.intensity,B=w.distance,X=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=I.r*L,d+=I.g*L,f+=I.b*L;else if(w.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(w.sh.coefficients[G],L);C++}else if(w.isDirectionalLight){let G=t.get(w);if(G.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let ht=w.shadow,N=e.get(w);N.shadowIntensity=ht.intensity,N.shadowBias=ht.bias,N.shadowNormalBias=ht.normalBias,N.shadowRadius=ht.radius,N.shadowMapSize=ht.mapSize,n.directionalShadow[u]=N,n.directionalShadowMap[u]=X,n.directionalShadowMatrix[u]=w.shadow.matrix,v++}n.directional[u]=G,u++}else if(w.isSpotLight){let G=t.get(w);G.position.setFromMatrixPosition(w.matrixWorld),G.color.copy(I).multiplyScalar(L),G.distance=B,G.coneCos=Math.cos(w.angle),G.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),G.decay=w.decay,n.spot[y]=G;let ht=w.shadow;if(w.map&&(n.spotLightMap[P]=w.map,P++,ht.updateMatrices(w),w.castShadow&&A++),n.spotLightMatrix[y]=ht.matrix,w.castShadow){let N=e.get(w);N.shadowIntensity=ht.intensity,N.shadowBias=ht.bias,N.shadowNormalBias=ht.normalBias,N.shadowRadius=ht.radius,N.shadowMapSize=ht.mapSize,n.spotShadow[y]=N,n.spotShadowMap[y]=X,_++}y++}else if(w.isRectAreaLight){let G=t.get(w);G.color.copy(I).multiplyScalar(L),G.halfWidth.set(w.width*.5,0,0),G.halfHeight.set(0,w.height*.5,0),n.rectArea[p]=G,p++}else if(w.isPointLight){let G=t.get(w);if(G.color.copy(w.color).multiplyScalar(w.intensity),G.distance=w.distance,G.decay=w.decay,w.castShadow){let ht=w.shadow,N=e.get(w);N.shadowIntensity=ht.intensity,N.shadowBias=ht.bias,N.shadowNormalBias=ht.normalBias,N.shadowRadius=ht.radius,N.shadowMapSize=ht.mapSize,N.shadowCameraNear=ht.camera.near,N.shadowCameraFar=ht.camera.far,n.pointShadow[m]=N,n.pointShadowMap[m]=X,n.pointShadowMatrix[m]=w.shadow.matrix,M++}n.point[m]=G,m++}else if(w.isHemisphereLight){let G=t.get(w);G.skyColor.copy(w.color).multiplyScalar(L),G.groundColor.copy(w.groundColor).multiplyScalar(L),n.hemi[g]=G,g++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;let T=n.hash;(T.directionalLength!==u||T.pointLength!==m||T.spotLength!==y||T.rectAreaLength!==p||T.hemiLength!==g||T.numDirectionalShadows!==v||T.numPointShadows!==M||T.numSpotShadows!==_||T.numSpotMaps!==P||T.numLightProbes!==C)&&(n.directional.length=u,n.spot.length=y,n.rectArea.length=p,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+P-A,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,T.directionalLength=u,T.pointLength=m,T.spotLength=y,T.rectAreaLength=p,T.hemiLength=g,T.numDirectionalShadows=v,T.numPointShadows=M,T.numSpotShadows=_,T.numSpotMaps=P,T.numLightProbes=C,n.version=w0++)}function l(c,h){let d=0,f=0,u=0,m=0,y=0,p=h.matrixWorldInverse;for(let g=0,v=c.length;g<v;g++){let M=c[g];if(M.isDirectionalLight){let _=n.directional[d];_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),d++}else if(M.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),u++}else if(M.isRectAreaLight){let _=n.rectArea[m];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),a.identity(),r.copy(M.matrixWorld),r.premultiply(p),a.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),m++}else if(M.isPointLight){let _=n.point[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){let _=n.hemi[y];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(p),y++}}}return{setup:o,setupView:l,state:n}}function yh(i){let t=new E0(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function A0(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new yh(i),t.set(s,[o])):r>=a.length?(o=new yh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Ml=class extends Ii{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=_d,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},bl=class extends Ii{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},C0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,R0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function I0(i,t,e){let n=new js,s=new Ut,r=new Ut,a=new Ce,o=new Ml({depthPacking:yd}),l=new bl,c={},h=e.maxTextureSize,d={[ai]:We,[We]:ai,[Pe]:Pe},f=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:C0,fragmentShader:R0}),u=f.clone();u.defines.HORIZONTAL_PASS=1;let m=new xe;m.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new fe(m,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rh;let g=this.type;this.render=function(A,C,T){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;let b=i.getRenderTarget(),x=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),I=i.state;I.setBlending(si),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let L=g!==On&&this.type===On,B=g===On&&this.type!==On;for(let X=0,G=A.length;X<G;X++){let ht=A[X],N=ht.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",ht,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);let st=N.getFrameExtents();if(s.multiply(st),r.copy(N.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,N.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,N.mapSize.y=r.y)),N.map===null||L===!0||B===!0){let J=this.type!==On?{minFilter:ln,magFilter:ln}:{};N.map!==null&&N.map.dispose(),N.map=new Gn(s.x,s.y,J),N.map.texture.name=ht.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();let ft=N.getViewportCount();for(let J=0;J<ft;J++){let it=N.getViewport(J);a.set(r.x*it.x,r.y*it.y,r.x*it.z,r.y*it.w),I.viewport(a),N.updateMatrices(ht,J),n=N.getFrustum(),_(C,T,N.camera,ht,this.type)}N.isPointLightShadow!==!0&&this.type===On&&v(N,T),N.needsUpdate=!1}g=this.type,p.needsUpdate=!1,i.setRenderTarget(b,x,w)};function v(A,C){let T=t.update(y);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,u.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,u.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Gn(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(C,null,T,f,y,null),u.uniforms.shadow_pass.value=A.mapPass.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(C,null,T,u,y,null)}function M(A,C,T,b){let x=null,w=T.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(w!==void 0)x=w;else if(x=T.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let I=x.uuid,L=C.uuid,B=c[I];B===void 0&&(B={},c[I]=B);let X=B[L];X===void 0&&(X=x.clone(),B[L]=X,C.addEventListener("dispose",P)),x=X}if(x.visible=C.visible,x.wireframe=C.wireframe,b===On?x.side=C.shadowSide!==null?C.shadowSide:C.side:x.side=C.shadowSide!==null?C.shadowSide:d[C.side],x.alphaMap=C.alphaMap,x.alphaTest=C.alphaTest,x.map=C.map,x.clipShadows=C.clipShadows,x.clippingPlanes=C.clippingPlanes,x.clipIntersection=C.clipIntersection,x.displacementMap=C.displacementMap,x.displacementScale=C.displacementScale,x.displacementBias=C.displacementBias,x.wireframeLinewidth=C.wireframeLinewidth,x.linewidth=C.linewidth,T.isPointLight===!0&&x.isMeshDistanceMaterial===!0){let I=i.properties.get(x);I.light=T}return x}function _(A,C,T,b,x){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===On)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,A.matrixWorld);let L=t.update(A),B=A.material;if(Array.isArray(B)){let X=L.groups;for(let G=0,ht=X.length;G<ht;G++){let N=X[G],st=B[N.materialIndex];if(st&&st.visible){let ft=M(A,st,b,x);A.onBeforeShadow(i,A,C,T,L,ft,N),i.renderBufferDirect(T,null,L,ft,A,N),A.onAfterShadow(i,A,C,T,L,ft,N)}}}else if(B.visible){let X=M(A,B,b,x);A.onBeforeShadow(i,A,C,T,L,X,null),i.renderBufferDirect(T,null,L,X,A,null),A.onAfterShadow(i,A,C,T,L,X,null)}}let I=A.children;for(let L=0,B=I.length;L<B;L++)_(I[L],C,T,b,x)}function P(A){A.target.removeEventListener("dispose",P);for(let T in c){let b=c[T],x=A.target.uuid;x in b&&(b[x].dispose(),delete b[x])}}}var P0={[To]:Eo,[Ao]:Io,[Co]:Po,[ls]:Ro,[Eo]:To,[Io]:Ao,[Po]:Co,[Ro]:ls};function L0(i,t){function e(){let F=!1,wt=new Ce,Q=null,ot=new Ce(0,0,0,0);return{setMask:function(Rt){Q!==Rt&&!F&&(i.colorMask(Rt,Rt,Rt,Rt),Q=Rt)},setLocked:function(Rt){F=Rt},setClear:function(Rt,At,H,z,dt){dt===!0&&(Rt*=z,At*=z,H*=z),wt.set(Rt,At,H,z),ot.equals(wt)===!1&&(i.clearColor(Rt,At,H,z),ot.copy(wt))},reset:function(){F=!1,Q=null,ot.set(-1,0,0,0)}}}function n(){let F=!1,wt=!1,Q=null,ot=null,Rt=null;return{setReversed:function(At){if(wt!==At){let H=t.get("EXT_clip_control");wt?H.clipControlEXT(H.LOWER_LEFT_EXT,H.ZERO_TO_ONE_EXT):H.clipControlEXT(H.LOWER_LEFT_EXT,H.NEGATIVE_ONE_TO_ONE_EXT);let z=Rt;Rt=null,this.setClear(z)}wt=At},getReversed:function(){return wt},setTest:function(At){At?k(i.DEPTH_TEST):tt(i.DEPTH_TEST)},setMask:function(At){Q!==At&&!F&&(i.depthMask(At),Q=At)},setFunc:function(At){if(wt&&(At=P0[At]),ot!==At){switch(At){case To:i.depthFunc(i.NEVER);break;case Eo:i.depthFunc(i.ALWAYS);break;case Ao:i.depthFunc(i.LESS);break;case ls:i.depthFunc(i.LEQUAL);break;case Co:i.depthFunc(i.EQUAL);break;case Ro:i.depthFunc(i.GEQUAL);break;case Io:i.depthFunc(i.GREATER);break;case Po:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ot=At}},setLocked:function(At){F=At},setClear:function(At){Rt!==At&&(wt&&(At=1-At),i.clearDepth(At),Rt=At)},reset:function(){F=!1,Q=null,ot=null,Rt=null,wt=!1}}}function s(){let F=!1,wt=null,Q=null,ot=null,Rt=null,At=null,H=null,z=null,dt=null;return{setTest:function(Mt){F||(Mt?k(i.STENCIL_TEST):tt(i.STENCIL_TEST))},setMask:function(Mt){wt!==Mt&&!F&&(i.stencilMask(Mt),wt=Mt)},setFunc:function(Mt,Tt,$){(Q!==Mt||ot!==Tt||Rt!==$)&&(i.stencilFunc(Mt,Tt,$),Q=Mt,ot=Tt,Rt=$)},setOp:function(Mt,Tt,$){(At!==Mt||H!==Tt||z!==$)&&(i.stencilOp(Mt,Tt,$),At=Mt,H=Tt,z=$)},setLocked:function(Mt){F=Mt},setClear:function(Mt){dt!==Mt&&(i.clearStencil(Mt),dt=Mt)},reset:function(){F=!1,wt=null,Q=null,ot=null,Rt=null,At=null,H=null,z=null,dt=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},f=new WeakMap,u=[],m=null,y=!1,p=null,g=null,v=null,M=null,_=null,P=null,A=null,C=new Gt(0,0,0),T=0,b=!1,x=null,w=null,I=null,L=null,B=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,ht=0,N=i.getParameter(i.VERSION);N.indexOf("WebGL")!==-1?(ht=parseFloat(/^WebGL (\d)/.exec(N)[1]),G=ht>=1):N.indexOf("OpenGL ES")!==-1&&(ht=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),G=ht>=2);let st=null,ft={},J=i.getParameter(i.SCISSOR_BOX),it=i.getParameter(i.VIEWPORT),vt=new Ce().fromArray(J),W=new Ce().fromArray(it);function rt(F,wt,Q,ot){let Rt=new Uint8Array(4),At=i.createTexture();i.bindTexture(F,At),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let H=0;H<Q;H++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(wt,0,i.RGBA,1,1,ot,0,i.RGBA,i.UNSIGNED_BYTE,Rt):i.texImage2D(wt+H,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Rt);return At}let mt={};mt[i.TEXTURE_2D]=rt(i.TEXTURE_2D,i.TEXTURE_2D,1),mt[i.TEXTURE_CUBE_MAP]=rt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[i.TEXTURE_2D_ARRAY]=rt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),mt[i.TEXTURE_3D]=rt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),k(i.DEPTH_TEST),a.setFunc(ls),Kt(!1),jt(vc),k(i.CULL_FACE),D(si);function k(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function tt(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function at(F,wt){return d[F]!==wt?(i.bindFramebuffer(F,wt),d[F]=wt,F===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=wt),F===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=wt),!0):!1}function xt(F,wt){let Q=u,ot=!1;if(F){Q=f.get(wt),Q===void 0&&(Q=[],f.set(wt,Q));let Rt=F.textures;if(Q.length!==Rt.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let At=0,H=Rt.length;At<H;At++)Q[At]=i.COLOR_ATTACHMENT0+At;Q.length=Rt.length,ot=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,ot=!0);ot&&i.drawBuffers(Q)}function Et(F){return m!==F?(i.useProgram(F),m=F,!0):!1}let Ct={[Si]:i.FUNC_ADD,[qu]:i.FUNC_SUBTRACT,[$u]:i.FUNC_REVERSE_SUBTRACT};Ct[Yu]=i.MIN,Ct[Zu]=i.MAX;let _t={[Ju]:i.ZERO,[Ku]:i.ONE,[ju]:i.SRC_COLOR,[So]:i.SRC_ALPHA,[sd]:i.SRC_ALPHA_SATURATE,[nd]:i.DST_COLOR,[td]:i.DST_ALPHA,[Qu]:i.ONE_MINUS_SRC_COLOR,[wo]:i.ONE_MINUS_SRC_ALPHA,[id]:i.ONE_MINUS_DST_COLOR,[ed]:i.ONE_MINUS_DST_ALPHA,[rd]:i.CONSTANT_COLOR,[ad]:i.ONE_MINUS_CONSTANT_COLOR,[od]:i.CONSTANT_ALPHA,[ld]:i.ONE_MINUS_CONSTANT_ALPHA};function D(F,wt,Q,ot,Rt,At,H,z,dt,Mt){if(F===si){y===!0&&(tt(i.BLEND),y=!1);return}if(y===!1&&(k(i.BLEND),y=!0),F!==Xu){if(F!==p||Mt!==b){if((g!==Si||_!==Si)&&(i.blendEquation(i.FUNC_ADD),g=Si,_=Si),Mt)switch(F){case ss:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mc:i.blendFunc(i.ONE,i.ONE);break;case bc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Sc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case ss:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case bc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Sc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}v=null,M=null,P=null,A=null,C.set(0,0,0),T=0,p=F,b=Mt}return}Rt=Rt||wt,At=At||Q,H=H||ot,(wt!==g||Rt!==_)&&(i.blendEquationSeparate(Ct[wt],Ct[Rt]),g=wt,_=Rt),(Q!==v||ot!==M||At!==P||H!==A)&&(i.blendFuncSeparate(_t[Q],_t[ot],_t[At],_t[H]),v=Q,M=ot,P=At,A=H),(z.equals(C)===!1||dt!==T)&&(i.blendColor(z.r,z.g,z.b,dt),C.copy(z),T=dt),p=F,b=!1}function ae(F,wt){F.side===Pe?tt(i.CULL_FACE):k(i.CULL_FACE);let Q=F.side===We;wt&&(Q=!Q),Kt(Q),F.blending===ss&&F.transparent===!1?D(si):D(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);let ot=F.stencilWrite;o.setTest(ot),ot&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),oe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?k(i.SAMPLE_ALPHA_TO_COVERAGE):tt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Kt(F){x!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),x=F)}function jt(F){F!==Gu?(k(i.CULL_FACE),F!==w&&(F===vc?i.cullFace(i.BACK):F===Wu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):tt(i.CULL_FACE),w=F}function zt(F){F!==I&&(G&&i.lineWidth(F),I=F)}function oe(F,wt,Q){F?(k(i.POLYGON_OFFSET_FILL),(L!==wt||B!==Q)&&(i.polygonOffset(wt,Q),L=wt,B=Q)):tt(i.POLYGON_OFFSET_FILL)}function Ht(F){F?k(i.SCISSOR_TEST):tt(i.SCISSOR_TEST)}function R(F){F===void 0&&(F=i.TEXTURE0+X-1),st!==F&&(i.activeTexture(F),st=F)}function S(F,wt,Q){Q===void 0&&(st===null?Q=i.TEXTURE0+X-1:Q=st);let ot=ft[Q];ot===void 0&&(ot={type:void 0,texture:void 0},ft[Q]=ot),(ot.type!==F||ot.texture!==wt)&&(st!==Q&&(i.activeTexture(Q),st=Q),i.bindTexture(F,wt||mt[F]),ot.type=F,ot.texture=wt)}function q(){let F=ft[st];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ct(){try{i.compressedTexImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ut(){try{i.compressedTexImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function nt(){try{i.texSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ft(){try{i.texSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function It(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Qt(){try{i.texStorage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pt(){try{i.texStorage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ot(){try{i.texImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function kt(){try{i.texImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Zt(F){vt.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),vt.copy(F))}function Nt(F){W.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),W.copy(F))}function ie(F,wt){let Q=c.get(wt);Q===void 0&&(Q=new WeakMap,c.set(wt,Q));let ot=Q.get(F);ot===void 0&&(ot=i.getUniformBlockIndex(wt,F.name),Q.set(F,ot))}function te(F,wt){let ot=c.get(wt).get(F);l.get(wt)!==ot&&(i.uniformBlockBinding(wt,ot,F.__bindingPointIndex),l.set(wt,ot))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},st=null,ft={},d={},f=new WeakMap,u=[],m=null,y=!1,p=null,g=null,v=null,M=null,_=null,P=null,A=null,C=new Gt(0,0,0),T=0,b=!1,x=null,w=null,I=null,L=null,B=null,vt.set(0,0,i.canvas.width,i.canvas.height),W.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:k,disable:tt,bindFramebuffer:at,drawBuffers:xt,useProgram:Et,setBlending:D,setMaterial:ae,setFlipSided:Kt,setCullFace:jt,setLineWidth:zt,setPolygonOffset:oe,setScissorTest:Ht,activeTexture:R,bindTexture:S,unbindTexture:q,compressedTexImage2D:ct,compressedTexImage3D:ut,texImage2D:Ot,texImage3D:kt,updateUBOMapping:ie,uniformBlockBinding:te,texStorage2D:Qt,texStorage3D:pt,texSubImage2D:nt,texSubImage3D:Ft,compressedTexSubImage2D:It,compressedTexSubImage3D:Pt,scissor:Zt,viewport:Nt,reset:ce}}function vh(i,t,e,n){let s=D0(n);switch(e){case Nh:return i*t;case Oh:return i*t;case Bh:return i*t*2;case Zl:return i*t/s.components*s.byteLength;case Jl:return i*t/s.components*s.byteLength;case zh:return i*t*2/s.components*s.byteLength;case Kl:return i*t*2/s.components*s.byteLength;case Fh:return i*t*3/s.components*s.byteLength;case vn:return i*t*4/s.components*s.byteLength;case jl:return i*t*4/s.components*s.byteLength;case Zr:case Jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Kr:case jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oo:case zo:return Math.max(i,16)*Math.max(t,8)/4;case Fo:case Bo:return Math.max(i,8)*Math.max(t,8)/2;case ko:case Vo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Go:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Wo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Xo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case qo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case $o:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Yo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Zo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Jo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ko:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case jo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Qo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case tl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case el:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case nl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Qr:case il:case sl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case kh:case rl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case al:case ol:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function D0(i){switch(i){case Hn:case Lh:return{byteLength:1,components:1};case Js:case Dh:case ar:return{byteLength:2,components:1};case $l:case Yl:return{byteLength:2,components:4};case Ci:case ql:case En:return{byteLength:4,components:1};case Uh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function U0(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ut,h=new WeakMap,d,f=new WeakMap,u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,S){return u?new OffscreenCanvas(R,S):na("canvas")}function y(R,S,q){let ct=1,ut=Ht(R);if((ut.width>q||ut.height>q)&&(ct=q/Math.max(ut.width,ut.height)),ct<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let nt=Math.floor(ct*ut.width),Ft=Math.floor(ct*ut.height);d===void 0&&(d=m(nt,Ft));let It=S?m(nt,Ft):d;return It.width=nt,It.height=Ft,It.getContext("2d").drawImage(R,0,0,nt,Ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ut.width+"x"+ut.height+") to ("+nt+"x"+Ft+")."),It}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ut.width+"x"+ut.height+")."),R;return R}function p(R){return R.generateMipmaps}function g(R){i.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,S,q,ct,ut=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let nt=S;if(S===i.RED&&(q===i.FLOAT&&(nt=i.R32F),q===i.HALF_FLOAT&&(nt=i.R16F),q===i.UNSIGNED_BYTE&&(nt=i.R8)),S===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(nt=i.R8UI),q===i.UNSIGNED_SHORT&&(nt=i.R16UI),q===i.UNSIGNED_INT&&(nt=i.R32UI),q===i.BYTE&&(nt=i.R8I),q===i.SHORT&&(nt=i.R16I),q===i.INT&&(nt=i.R32I)),S===i.RG&&(q===i.FLOAT&&(nt=i.RG32F),q===i.HALF_FLOAT&&(nt=i.RG16F),q===i.UNSIGNED_BYTE&&(nt=i.RG8)),S===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(nt=i.RG8UI),q===i.UNSIGNED_SHORT&&(nt=i.RG16UI),q===i.UNSIGNED_INT&&(nt=i.RG32UI),q===i.BYTE&&(nt=i.RG8I),q===i.SHORT&&(nt=i.RG16I),q===i.INT&&(nt=i.RG32I)),S===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(nt=i.RGB8UI),q===i.UNSIGNED_SHORT&&(nt=i.RGB16UI),q===i.UNSIGNED_INT&&(nt=i.RGB32UI),q===i.BYTE&&(nt=i.RGB8I),q===i.SHORT&&(nt=i.RGB16I),q===i.INT&&(nt=i.RGB32I)),S===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(nt=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(nt=i.RGBA16UI),q===i.UNSIGNED_INT&&(nt=i.RGBA32UI),q===i.BYTE&&(nt=i.RGBA8I),q===i.SHORT&&(nt=i.RGBA16I),q===i.INT&&(nt=i.RGBA32I)),S===i.RGB&&q===i.UNSIGNED_INT_5_9_9_9_REV&&(nt=i.RGB9_E5),S===i.RGBA){let Ft=ut?Ta:he.getTransfer(ct);q===i.FLOAT&&(nt=i.RGBA32F),q===i.HALF_FLOAT&&(nt=i.RGBA16F),q===i.UNSIGNED_BYTE&&(nt=Ft===ye?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT_4_4_4_4&&(nt=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(nt=i.RGB5_A1)}return(nt===i.R16F||nt===i.R32F||nt===i.RG16F||nt===i.RG32F||nt===i.RGBA16F||nt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),nt}function _(R,S){let q;return R?S===null||S===Ci||S===us?q=i.DEPTH24_STENCIL8:S===En?q=i.DEPTH32F_STENCIL8:S===Js&&(q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ci||S===us?q=i.DEPTH_COMPONENT24:S===En?q=i.DEPTH_COMPONENT32F:S===Js&&(q=i.DEPTH_COMPONENT16),q}function P(R,S){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==ln&&R.minFilter!==Tn?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function A(R){let S=R.target;S.removeEventListener("dispose",A),T(S),S.isVideoTexture&&h.delete(S)}function C(R){let S=R.target;S.removeEventListener("dispose",C),x(S)}function T(R){let S=n.get(R);if(S.__webglInit===void 0)return;let q=R.source,ct=f.get(q);if(ct){let ut=ct[S.__cacheKey];ut.usedTimes--,ut.usedTimes===0&&b(R),Object.keys(ct).length===0&&f.delete(q)}n.remove(R)}function b(R){let S=n.get(R);i.deleteTexture(S.__webglTexture);let q=R.source,ct=f.get(q);delete ct[S.__cacheKey],a.memory.textures--}function x(R){let S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let ct=0;ct<6;ct++){if(Array.isArray(S.__webglFramebuffer[ct]))for(let ut=0;ut<S.__webglFramebuffer[ct].length;ut++)i.deleteFramebuffer(S.__webglFramebuffer[ct][ut]);else i.deleteFramebuffer(S.__webglFramebuffer[ct]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[ct])}else{if(Array.isArray(S.__webglFramebuffer))for(let ct=0;ct<S.__webglFramebuffer.length;ct++)i.deleteFramebuffer(S.__webglFramebuffer[ct]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let ct=0;ct<S.__webglColorRenderbuffer.length;ct++)S.__webglColorRenderbuffer[ct]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[ct]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let q=R.textures;for(let ct=0,ut=q.length;ct<ut;ct++){let nt=n.get(q[ct]);nt.__webglTexture&&(i.deleteTexture(nt.__webglTexture),a.memory.textures--),n.remove(q[ct])}n.remove(R)}let w=0;function I(){w=0}function L(){let R=w;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),w+=1,R}function B(R){let S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function X(R,S){let q=n.get(R);if(R.isVideoTexture&&zt(R),R.isRenderTargetTexture===!1&&R.version>0&&q.__version!==R.version){let ct=R.image;if(ct===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(q,R,S);return}}e.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+S)}function G(R,S){let q=n.get(R);if(R.version>0&&q.__version!==R.version){W(q,R,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+S)}function ht(R,S){let q=n.get(R);if(R.version>0&&q.__version!==R.version){W(q,R,S);return}e.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+S)}function N(R,S){let q=n.get(R);if(R.version>0&&q.__version!==R.version){rt(q,R,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+S)}let st={[Uo]:i.REPEAT,[Ei]:i.CLAMP_TO_EDGE,[No]:i.MIRRORED_REPEAT},ft={[ln]:i.NEAREST,[xd]:i.NEAREST_MIPMAP_NEAREST,[Sr]:i.NEAREST_MIPMAP_LINEAR,[Tn]:i.LINEAR,[Wa]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},J={[Md]:i.NEVER,[Ad]:i.ALWAYS,[bd]:i.LESS,[Hh]:i.LEQUAL,[Sd]:i.EQUAL,[Ed]:i.GEQUAL,[wd]:i.GREATER,[Td]:i.NOTEQUAL};function it(R,S){if(S.type===En&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Tn||S.magFilter===Wa||S.magFilter===Sr||S.magFilter===Ai||S.minFilter===Tn||S.minFilter===Wa||S.minFilter===Sr||S.minFilter===Ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,st[S.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,st[S.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,st[S.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,ft[S.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,ft[S.minFilter]),S.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,J[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===ln||S.minFilter!==Sr&&S.minFilter!==Ai||S.type===En&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let q=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function vt(R,S){let q=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",A));let ct=S.source,ut=f.get(ct);ut===void 0&&(ut={},f.set(ct,ut));let nt=B(S);if(nt!==R.__cacheKey){ut[nt]===void 0&&(ut[nt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),ut[nt].usedTimes++;let Ft=ut[R.__cacheKey];Ft!==void 0&&(ut[R.__cacheKey].usedTimes--,Ft.usedTimes===0&&b(S)),R.__cacheKey=nt,R.__webglTexture=ut[nt].texture}return q}function W(R,S,q){let ct=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ct=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ct=i.TEXTURE_3D);let ut=vt(R,S),nt=S.source;e.bindTexture(ct,R.__webglTexture,i.TEXTURE0+q);let Ft=n.get(nt);if(nt.version!==Ft.__version||ut===!0){e.activeTexture(i.TEXTURE0+q);let It=he.getPrimaries(he.workingColorSpace),Pt=S.colorSpace===ii?null:he.getPrimaries(S.colorSpace),Qt=S.colorSpace===ii||It===Pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qt);let pt=y(S.image,!1,s.maxTextureSize);pt=oe(S,pt);let Ot=r.convert(S.format,S.colorSpace),kt=r.convert(S.type),Zt=M(S.internalFormat,Ot,kt,S.colorSpace,S.isVideoTexture);it(ct,S);let Nt,ie=S.mipmaps,te=S.isVideoTexture!==!0,ce=Ft.__version===void 0||ut===!0,F=nt.dataReady,wt=P(S,pt);if(S.isDepthTexture)Zt=_(S.format===ds,S.type),ce&&(te?e.texStorage2D(i.TEXTURE_2D,1,Zt,pt.width,pt.height):e.texImage2D(i.TEXTURE_2D,0,Zt,pt.width,pt.height,0,Ot,kt,null));else if(S.isDataTexture)if(ie.length>0){te&&ce&&e.texStorage2D(i.TEXTURE_2D,wt,Zt,ie[0].width,ie[0].height);for(let Q=0,ot=ie.length;Q<ot;Q++)Nt=ie[Q],te?F&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,Nt.width,Nt.height,Ot,kt,Nt.data):e.texImage2D(i.TEXTURE_2D,Q,Zt,Nt.width,Nt.height,0,Ot,kt,Nt.data);S.generateMipmaps=!1}else te?(ce&&e.texStorage2D(i.TEXTURE_2D,wt,Zt,pt.width,pt.height),F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,pt.width,pt.height,Ot,kt,pt.data)):e.texImage2D(i.TEXTURE_2D,0,Zt,pt.width,pt.height,0,Ot,kt,pt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){te&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,Zt,ie[0].width,ie[0].height,pt.depth);for(let Q=0,ot=ie.length;Q<ot;Q++)if(Nt=ie[Q],S.format!==vn)if(Ot!==null)if(te){if(F)if(S.layerUpdates.size>0){let Rt=vh(Nt.width,Nt.height,S.format,S.type);for(let At of S.layerUpdates){let H=Nt.data.subarray(At*Rt/Nt.data.BYTES_PER_ELEMENT,(At+1)*Rt/Nt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,At,Nt.width,Nt.height,1,Ot,H)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,Nt.width,Nt.height,pt.depth,Ot,Nt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,Zt,Nt.width,Nt.height,pt.depth,0,Nt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else te?F&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,Nt.width,Nt.height,pt.depth,Ot,kt,Nt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Q,Zt,Nt.width,Nt.height,pt.depth,0,Ot,kt,Nt.data)}else{te&&ce&&e.texStorage2D(i.TEXTURE_2D,wt,Zt,ie[0].width,ie[0].height);for(let Q=0,ot=ie.length;Q<ot;Q++)Nt=ie[Q],S.format!==vn?Ot!==null?te?F&&e.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,Nt.width,Nt.height,Ot,Nt.data):e.compressedTexImage2D(i.TEXTURE_2D,Q,Zt,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?F&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,Nt.width,Nt.height,Ot,kt,Nt.data):e.texImage2D(i.TEXTURE_2D,Q,Zt,Nt.width,Nt.height,0,Ot,kt,Nt.data)}else if(S.isDataArrayTexture)if(te){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,Zt,pt.width,pt.height,pt.depth),F)if(S.layerUpdates.size>0){let Q=vh(pt.width,pt.height,S.format,S.type);for(let ot of S.layerUpdates){let Rt=pt.data.subarray(ot*Q/pt.data.BYTES_PER_ELEMENT,(ot+1)*Q/pt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ot,pt.width,pt.height,1,Ot,kt,Rt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,pt.width,pt.height,pt.depth,Ot,kt,pt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Zt,pt.width,pt.height,pt.depth,0,Ot,kt,pt.data);else if(S.isData3DTexture)te?(ce&&e.texStorage3D(i.TEXTURE_3D,wt,Zt,pt.width,pt.height,pt.depth),F&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,pt.width,pt.height,pt.depth,Ot,kt,pt.data)):e.texImage3D(i.TEXTURE_3D,0,Zt,pt.width,pt.height,pt.depth,0,Ot,kt,pt.data);else if(S.isFramebufferTexture){if(ce)if(te)e.texStorage2D(i.TEXTURE_2D,wt,Zt,pt.width,pt.height);else{let Q=pt.width,ot=pt.height;for(let Rt=0;Rt<wt;Rt++)e.texImage2D(i.TEXTURE_2D,Rt,Zt,Q,ot,0,Ot,kt,null),Q>>=1,ot>>=1}}else if(ie.length>0){if(te&&ce){let Q=Ht(ie[0]);e.texStorage2D(i.TEXTURE_2D,wt,Zt,Q.width,Q.height)}for(let Q=0,ot=ie.length;Q<ot;Q++)Nt=ie[Q],te?F&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,Ot,kt,Nt):e.texImage2D(i.TEXTURE_2D,Q,Zt,Ot,kt,Nt);S.generateMipmaps=!1}else if(te){if(ce){let Q=Ht(pt);e.texStorage2D(i.TEXTURE_2D,wt,Zt,Q.width,Q.height)}F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Ot,kt,pt)}else e.texImage2D(i.TEXTURE_2D,0,Zt,Ot,kt,pt);p(S)&&g(ct),Ft.__version=nt.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function rt(R,S,q){if(S.image.length!==6)return;let ct=vt(R,S),ut=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+q);let nt=n.get(ut);if(ut.version!==nt.__version||ct===!0){e.activeTexture(i.TEXTURE0+q);let Ft=he.getPrimaries(he.workingColorSpace),It=S.colorSpace===ii?null:he.getPrimaries(S.colorSpace),Pt=S.colorSpace===ii||Ft===It?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let Qt=S.isCompressedTexture||S.image[0].isCompressedTexture,pt=S.image[0]&&S.image[0].isDataTexture,Ot=[];for(let ot=0;ot<6;ot++)!Qt&&!pt?Ot[ot]=y(S.image[ot],!0,s.maxCubemapSize):Ot[ot]=pt?S.image[ot].image:S.image[ot],Ot[ot]=oe(S,Ot[ot]);let kt=Ot[0],Zt=r.convert(S.format,S.colorSpace),Nt=r.convert(S.type),ie=M(S.internalFormat,Zt,Nt,S.colorSpace),te=S.isVideoTexture!==!0,ce=nt.__version===void 0||ct===!0,F=ut.dataReady,wt=P(S,kt);it(i.TEXTURE_CUBE_MAP,S);let Q;if(Qt){te&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,ie,kt.width,kt.height);for(let ot=0;ot<6;ot++){Q=Ot[ot].mipmaps;for(let Rt=0;Rt<Q.length;Rt++){let At=Q[Rt];S.format!==vn?Zt!==null?te?F&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,0,0,At.width,At.height,Zt,At.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,ie,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):te?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,0,0,At.width,At.height,Zt,Nt,At.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,ie,At.width,At.height,0,Zt,Nt,At.data)}}}else{if(Q=S.mipmaps,te&&ce){Q.length>0&&wt++;let ot=Ht(Ot[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,ie,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(pt){te?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Ot[ot].width,Ot[ot].height,Zt,Nt,Ot[ot].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,ie,Ot[ot].width,Ot[ot].height,0,Zt,Nt,Ot[ot].data);for(let Rt=0;Rt<Q.length;Rt++){let H=Q[Rt].image[ot].image;te?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,0,0,H.width,H.height,Zt,Nt,H.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,ie,H.width,H.height,0,Zt,Nt,H.data)}}else{te?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Zt,Nt,Ot[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,ie,Zt,Nt,Ot[ot]);for(let Rt=0;Rt<Q.length;Rt++){let At=Q[Rt];te?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,0,0,Zt,Nt,At.image[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,ie,Zt,Nt,At.image[ot])}}}p(S)&&g(i.TEXTURE_CUBE_MAP),nt.__version=ut.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function mt(R,S,q,ct,ut,nt){let Ft=r.convert(q.format,q.colorSpace),It=r.convert(q.type),Pt=M(q.internalFormat,Ft,It,q.colorSpace),Qt=n.get(S),pt=n.get(q);if(pt.__renderTarget=S,!Qt.__hasExternalTextures){let Ot=Math.max(1,S.width>>nt),kt=Math.max(1,S.height>>nt);ut===i.TEXTURE_3D||ut===i.TEXTURE_2D_ARRAY?e.texImage3D(ut,nt,Pt,Ot,kt,S.depth,0,Ft,It,null):e.texImage2D(ut,nt,Pt,Ot,kt,0,Ft,It,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),jt(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ct,ut,pt.__webglTexture,0,Kt(S)):(ut===i.TEXTURE_2D||ut>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ut<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ct,ut,pt.__webglTexture,nt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function k(R,S,q){if(i.bindRenderbuffer(i.RENDERBUFFER,R),S.depthBuffer){let ct=S.depthTexture,ut=ct&&ct.isDepthTexture?ct.type:null,nt=_(S.stencilBuffer,ut),Ft=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,It=Kt(S);jt(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It,nt,S.width,S.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,It,nt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,nt,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ft,i.RENDERBUFFER,R)}else{let ct=S.textures;for(let ut=0;ut<ct.length;ut++){let nt=ct[ut],Ft=r.convert(nt.format,nt.colorSpace),It=r.convert(nt.type),Pt=M(nt.internalFormat,Ft,It,nt.colorSpace),Qt=Kt(S);q&&jt(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Qt,Pt,S.width,S.height):jt(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Qt,Pt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Pt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function tt(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ct=n.get(S.depthTexture);ct.__renderTarget=S,(!ct.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),X(S.depthTexture,0);let ut=ct.__webglTexture,nt=Kt(S);if(S.depthTexture.format===rs)jt(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ut,0,nt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ut,0);else if(S.depthTexture.format===ds)jt(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ut,0,nt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ut,0);else throw new Error("Unknown depthTexture format")}function at(R){let S=n.get(R),q=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){let ct=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),ct){let ut=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,ct.removeEventListener("dispose",ut)};ct.addEventListener("dispose",ut),S.__depthDisposeCallback=ut}S.__boundDepthTexture=ct}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");tt(S.__webglFramebuffer,R)}else if(q){S.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[ct]),S.__webglDepthbuffer[ct]===void 0)S.__webglDepthbuffer[ct]=i.createRenderbuffer(),k(S.__webglDepthbuffer[ct],R,!1);else{let ut=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=S.__webglDepthbuffer[ct];i.bindRenderbuffer(i.RENDERBUFFER,nt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ut,i.RENDERBUFFER,nt)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),k(S.__webglDepthbuffer,R,!1);else{let ct=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ut),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,ut)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(R,S,q){let ct=n.get(R);S!==void 0&&mt(ct.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&at(R)}function Et(R){let S=R.texture,q=n.get(R),ct=n.get(S);R.addEventListener("dispose",C);let ut=R.textures,nt=R.isWebGLCubeRenderTarget===!0,Ft=ut.length>1;if(Ft||(ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture()),ct.__version=S.version,a.memory.textures++),nt){q.__webglFramebuffer=[];for(let It=0;It<6;It++)if(S.mipmaps&&S.mipmaps.length>0){q.__webglFramebuffer[It]=[];for(let Pt=0;Pt<S.mipmaps.length;Pt++)q.__webglFramebuffer[It][Pt]=i.createFramebuffer()}else q.__webglFramebuffer[It]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){q.__webglFramebuffer=[];for(let It=0;It<S.mipmaps.length;It++)q.__webglFramebuffer[It]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Ft)for(let It=0,Pt=ut.length;It<Pt;It++){let Qt=n.get(ut[It]);Qt.__webglTexture===void 0&&(Qt.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&jt(R)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let It=0;It<ut.length;It++){let Pt=ut[It];q.__webglColorRenderbuffer[It]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[It]);let Qt=r.convert(Pt.format,Pt.colorSpace),pt=r.convert(Pt.type),Ot=M(Pt.internalFormat,Qt,pt,Pt.colorSpace,R.isXRRenderTarget===!0),kt=Kt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,Ot,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,q.__webglColorRenderbuffer[It])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),k(q.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(nt){e.bindTexture(i.TEXTURE_CUBE_MAP,ct.__webglTexture),it(i.TEXTURE_CUBE_MAP,S);for(let It=0;It<6;It++)if(S.mipmaps&&S.mipmaps.length>0)for(let Pt=0;Pt<S.mipmaps.length;Pt++)mt(q.__webglFramebuffer[It][Pt],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+It,Pt);else mt(q.__webglFramebuffer[It],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+It,0);p(S)&&g(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ft){for(let It=0,Pt=ut.length;It<Pt;It++){let Qt=ut[It],pt=n.get(Qt);e.bindTexture(i.TEXTURE_2D,pt.__webglTexture),it(i.TEXTURE_2D,Qt),mt(q.__webglFramebuffer,R,Qt,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,0),p(Qt)&&g(i.TEXTURE_2D)}e.unbindTexture()}else{let It=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(It=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(It,ct.__webglTexture),it(It,S),S.mipmaps&&S.mipmaps.length>0)for(let Pt=0;Pt<S.mipmaps.length;Pt++)mt(q.__webglFramebuffer[Pt],R,S,i.COLOR_ATTACHMENT0,It,Pt);else mt(q.__webglFramebuffer,R,S,i.COLOR_ATTACHMENT0,It,0);p(S)&&g(It),e.unbindTexture()}R.depthBuffer&&at(R)}function Ct(R){let S=R.textures;for(let q=0,ct=S.length;q<ct;q++){let ut=S[q];if(p(ut)){let nt=v(R),Ft=n.get(ut).__webglTexture;e.bindTexture(nt,Ft),g(nt),e.unbindTexture()}}}let _t=[],D=[];function ae(R){if(R.samples>0){if(jt(R)===!1){let S=R.textures,q=R.width,ct=R.height,ut=i.COLOR_BUFFER_BIT,nt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ft=n.get(R),It=S.length>1;if(It)for(let Pt=0;Pt<S.length;Pt++)e.bindFramebuffer(i.FRAMEBUFFER,Ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ft.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ft.__webglFramebuffer);for(let Pt=0;Pt<S.length;Pt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ut|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ut|=i.STENCIL_BUFFER_BIT)),It){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ft.__webglColorRenderbuffer[Pt]);let Qt=n.get(S[Pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Qt,0)}i.blitFramebuffer(0,0,q,ct,0,0,q,ct,ut,i.NEAREST),l===!0&&(_t.length=0,D.length=0,_t.push(i.COLOR_ATTACHMENT0+Pt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(_t.push(nt),D.push(nt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,D)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_t))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),It)for(let Pt=0;Pt<S.length;Pt++){e.bindFramebuffer(i.FRAMEBUFFER,Ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,Ft.__webglColorRenderbuffer[Pt]);let Qt=n.get(S[Pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,Qt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ft.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let S=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function Kt(R){return Math.min(s.maxSamples,R.samples)}function jt(R){let S=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function zt(R){let S=a.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function oe(R,S){let q=R.colorSpace,ct=R.format,ut=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||q!==ws&&q!==ii&&(he.getTransfer(q)===ye?(ct!==vn||ut!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),S}function Ht(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=I,this.setTexture2D=X,this.setTexture2DArray=G,this.setTexture3D=ht,this.setTextureCube=N,this.rebindTextures=xt,this.setupRenderTarget=Et,this.updateRenderTargetMipmap=Ct,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=jt}function N0(i,t){function e(n,s=ii){let r,a=he.getTransfer(s);if(n===Hn)return i.UNSIGNED_BYTE;if(n===$l)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Lh)return i.BYTE;if(n===Dh)return i.SHORT;if(n===Js)return i.UNSIGNED_SHORT;if(n===ql)return i.INT;if(n===Ci)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===ar)return i.HALF_FLOAT;if(n===Nh)return i.ALPHA;if(n===Fh)return i.RGB;if(n===vn)return i.RGBA;if(n===Oh)return i.LUMINANCE;if(n===Bh)return i.LUMINANCE_ALPHA;if(n===rs)return i.DEPTH_COMPONENT;if(n===ds)return i.DEPTH_STENCIL;if(n===Zl)return i.RED;if(n===Jl)return i.RED_INTEGER;if(n===zh)return i.RG;if(n===Kl)return i.RG_INTEGER;if(n===jl)return i.RGBA_INTEGER;if(n===Zr||n===Jr||n===Kr||n===jr)if(a===ye)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Fo||n===Oo||n===Bo||n===zo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Fo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Oo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Bo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===zo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ko||n===Vo||n===Ho)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ko||n===Vo)return a===ye?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ho)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Go||n===Wo||n===Xo||n===qo||n===$o||n===Yo||n===Zo||n===Jo||n===Ko||n===jo||n===Qo||n===tl||n===el||n===nl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Go)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Wo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Xo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===qo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===$o)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Yo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Zo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Jo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ko)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===jo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Qo)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===tl)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===el)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===nl)return a===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qr||n===il||n===sl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Qr)return a===ye?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===sl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kh||n===rl||n===al||n===ol)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Qr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===rl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===al)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ol)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===us?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Sl=class extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Re=class extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}},F0={type:"move"},$s=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let y of t.hand.values()){let p=e.getJointPose(y,n),g=this._getHandJoint(c,y);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),u=.02,m=.005;c.inputState.pinching&&f>u+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=u-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(F0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},O0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,B0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,wl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new cn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new en({vertexShader:O0,fragmentShader:B0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new fe(new ps(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tl=class extends oi{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,u=null,m=null,y=new wl,p=e.getContextAttributes(),g=null,v=null,M=[],_=[],P=new Ut,A=null,C=new qe;C.viewport=new Ce;let T=new qe;T.viewport=new Ce;let b=[C,T],x=new Sl,w=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let rt=M[W];return rt===void 0&&(rt=new $s,M[W]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(W){let rt=M[W];return rt===void 0&&(rt=new $s,M[W]=rt),rt.getGripSpace()},this.getHand=function(W){let rt=M[W];return rt===void 0&&(rt=new $s,M[W]=rt),rt.getHandSpace()};function L(W){let rt=_.indexOf(W.inputSource);if(rt===-1)return;let mt=M[rt];mt!==void 0&&(mt.update(W.inputSource,W.frame,c||a),mt.dispatchEvent({type:W.type,data:W.inputSource}))}function B(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",X);for(let W=0;W<M.length;W++){let rt=_[W];rt!==null&&(_[W]=null,M[W].disconnect(rt))}w=null,I=null,y.reset(),t.setRenderTarget(g),u=null,f=null,d=null,s=null,v=null,vt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:u},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(g=t.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",B),s.addEventListener("inputsourceschange",X),p.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){let rt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),v=new Gn(u.framebufferWidth,u.framebufferHeight,{format:vn,type:Hn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let rt=null,mt=null,k=null;p.depth&&(k=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=p.stencil?ds:rs,mt=p.stencil?us:Ci);let tt={colorFormat:e.RGBA8,depthFormat:k,scaleFactor:r};d=new XRWebGLBinding(s,e),f=d.createProjectionLayer(tt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new Gn(f.textureWidth,f.textureHeight,{format:vn,type:Hn,depthTexture:new da(f.textureWidth,f.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),vt.setContext(s),vt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function X(W){for(let rt=0;rt<W.removed.length;rt++){let mt=W.removed[rt],k=_.indexOf(mt);k>=0&&(_[k]=null,M[k].disconnect(mt))}for(let rt=0;rt<W.added.length;rt++){let mt=W.added[rt],k=_.indexOf(mt);if(k===-1){for(let at=0;at<M.length;at++)if(at>=_.length){_.push(mt),k=at;break}else if(_[at]===null){_[at]=mt,k=at;break}if(k===-1)break}let tt=M[k];tt&&tt.connect(mt)}}let G=new U,ht=new U;function N(W,rt,mt){G.setFromMatrixPosition(rt.matrixWorld),ht.setFromMatrixPosition(mt.matrixWorld);let k=G.distanceTo(ht),tt=rt.projectionMatrix.elements,at=mt.projectionMatrix.elements,xt=tt[14]/(tt[10]-1),Et=tt[14]/(tt[10]+1),Ct=(tt[9]+1)/tt[5],_t=(tt[9]-1)/tt[5],D=(tt[8]-1)/tt[0],ae=(at[8]+1)/at[0],Kt=xt*D,jt=xt*ae,zt=k/(-D+ae),oe=zt*-D;if(rt.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(oe),W.translateZ(zt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),tt[10]===-1)W.projectionMatrix.copy(rt.projectionMatrix),W.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{let Ht=xt+zt,R=Et+zt,S=Kt-oe,q=jt+(k-oe),ct=Ct*Et/R*Ht,ut=_t*Et/R*Ht;W.projectionMatrix.makePerspective(S,q,ct,ut,Ht,R),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function st(W,rt){rt===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(rt.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let rt=W.near,mt=W.far;y.texture!==null&&(y.depthNear>0&&(rt=y.depthNear),y.depthFar>0&&(mt=y.depthFar)),x.near=T.near=C.near=rt,x.far=T.far=C.far=mt,(w!==x.near||I!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),w=x.near,I=x.far),C.layers.mask=W.layers.mask|2,T.layers.mask=W.layers.mask|4,x.layers.mask=C.layers.mask|T.layers.mask;let k=W.parent,tt=x.cameras;st(x,k);for(let at=0;at<tt.length;at++)st(tt[at],k);tt.length===2?N(x,C,T):x.projectionMatrix.copy(C.projectionMatrix),ft(W,x,k)};function ft(W,rt,mt){mt===null?W.matrix.copy(rt.matrixWorld):(W.matrix.copy(mt.matrixWorld),W.matrix.invert(),W.matrix.multiply(rt.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(rt.projectionMatrix),W.projectionMatrixInverse.copy(rt.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ks*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&u===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=W)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(x)};let J=null;function it(W,rt){if(h=rt.getViewerPose(c||a),m=rt,h!==null){let mt=h.views;u!==null&&(t.setRenderTargetFramebuffer(v,u.framebuffer),t.setRenderTarget(v));let k=!1;mt.length!==x.cameras.length&&(x.cameras.length=0,k=!0);for(let at=0;at<mt.length;at++){let xt=mt[at],Et=null;if(u!==null)Et=u.getViewport(xt);else{let _t=d.getViewSubImage(f,xt);Et=_t.viewport,at===0&&(t.setRenderTargetTextures(v,_t.colorTexture,f.ignoreDepthValues?void 0:_t.depthStencilTexture),t.setRenderTarget(v))}let Ct=b[at];Ct===void 0&&(Ct=new qe,Ct.layers.enable(at),Ct.viewport=new Ce,b[at]=Ct),Ct.matrix.fromArray(xt.transform.matrix),Ct.matrix.decompose(Ct.position,Ct.quaternion,Ct.scale),Ct.projectionMatrix.fromArray(xt.projectionMatrix),Ct.projectionMatrixInverse.copy(Ct.projectionMatrix).invert(),Ct.viewport.set(Et.x,Et.y,Et.width,Et.height),at===0&&(x.matrix.copy(Ct.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),k===!0&&x.cameras.push(Ct)}let tt=s.enabledFeatures;if(tt&&tt.includes("depth-sensing")){let at=d.getDepthInformation(mt[0]);at&&at.isValid&&at.texture&&y.init(t,at,s.renderState)}}for(let mt=0;mt<M.length;mt++){let k=_[mt],tt=M[mt];k!==null&&tt!==void 0&&tt.update(k,rt,c||a)}J&&J(W,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),m=null}let vt=new qh;vt.setAnimationLoop(it),this.setAnimationLoop=function(W){J=W},this.dispose=function(){}}},Mi=new An,z0=new ge;function k0(i,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,Xh(i)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,v,M,_){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(p,g):g.isMeshToonMaterial?(r(p,g),d(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g)):g.isMeshStandardMaterial?(r(p,g),f(p,g),g.isMeshPhysicalMaterial&&u(p,g,_)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),y(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,v,M):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===We&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===We&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let v=t.get(g),M=v.envMap,_=v.envMapRotation;M&&(p.envMap.value=M,Mi.copy(_),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),p.envMapRotation.value.setFromMatrix4(z0.makeRotationFromEuler(Mi)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,v,M){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*v,p.scale.value=M*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function f(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function u(p,g,v){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===We&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function y(p,g){let v=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function V0(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){let _=M.program;n.uniformBlockBinding(v,_)}function c(v,M){let _=s[v.id];_===void 0&&(m(v),_=h(v),s[v.id]=_,v.addEventListener("dispose",p));let P=M.program;n.updateUBOMapping(v,P);let A=t.render.frame;r[v.id]!==A&&(f(v),r[v.id]=A)}function h(v){let M=d();v.__bindingPointIndex=M;let _=i.createBuffer(),P=v.__size,A=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,P,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,_),_}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let M=s[v.id],_=v.uniforms,P=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let A=0,C=_.length;A<C;A++){let T=Array.isArray(_[A])?_[A]:[_[A]];for(let b=0,x=T.length;b<x;b++){let w=T[b];if(u(w,A,b,P)===!0){let I=w.__offset,L=Array.isArray(w.value)?w.value:[w.value],B=0;for(let X=0;X<L.length;X++){let G=L[X],ht=y(G);typeof G=="number"||typeof G=="boolean"?(w.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,I+B,w.__data)):G.isMatrix3?(w.__data[0]=G.elements[0],w.__data[1]=G.elements[1],w.__data[2]=G.elements[2],w.__data[3]=0,w.__data[4]=G.elements[3],w.__data[5]=G.elements[4],w.__data[6]=G.elements[5],w.__data[7]=0,w.__data[8]=G.elements[6],w.__data[9]=G.elements[7],w.__data[10]=G.elements[8],w.__data[11]=0):(G.toArray(w.__data,B),B+=ht.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,I,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(v,M,_,P){let A=v.value,C=M+"_"+_;if(P[C]===void 0)return typeof A=="number"||typeof A=="boolean"?P[C]=A:P[C]=A.clone(),!0;{let T=P[C];if(typeof A=="number"||typeof A=="boolean"){if(T!==A)return P[C]=A,!0}else if(T.equals(A)===!1)return T.copy(A),!0}return!1}function m(v){let M=v.uniforms,_=0,P=16;for(let C=0,T=M.length;C<T;C++){let b=Array.isArray(M[C])?M[C]:[M[C]];for(let x=0,w=b.length;x<w;x++){let I=b[x],L=Array.isArray(I.value)?I.value:[I.value];for(let B=0,X=L.length;B<X;B++){let G=L[B],ht=y(G),N=_%P,st=N%ht.boundary,ft=N+st;_+=st,ft!==0&&P-ft<ht.storage&&(_+=P-ft),I.__data=new Float32Array(ht.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=_,_+=ht.storage}}}let A=_%P;return A>0&&(_+=P-A),v.__size=_,v.__cache={},this}function y(v){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function p(v){let M=v.target;M.removeEventListener("dispose",p);let _=a.indexOf(M.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function g(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:g}}var ms=class{constructor(t={}){let{canvas:e=Wd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=a;let m=new Uint32Array(4),y=new Int32Array(4),p=null,g=null,v=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Je,this.toneMapping=ri,this.toneMappingExposure=1;let _=this,P=!1,A=0,C=0,T=null,b=-1,x=null,w=new Ce,I=new Ce,L=null,B=new Gt(0),X=0,G=e.width,ht=e.height,N=1,st=null,ft=null,J=new Ce(0,0,G,ht),it=new Ce(0,0,G,ht),vt=!1,W=new js,rt=!1,mt=!1,k=new ge,tt=new ge,at=new U,xt=new Ce,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ct=!1;function _t(){return T===null?N:1}let D=n;function ae(E,O){return e.getContext(E,O)}try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",Rt,!1),e.addEventListener("webglcontextcreationerror",At,!1),D===null){let O="webgl2";if(D=ae(O,E),D===null)throw ae(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Kt,jt,zt,oe,Ht,R,S,q,ct,ut,nt,Ft,It,Pt,Qt,pt,Ot,kt,Zt,Nt,ie,te,ce,F;function wt(){Kt=new ig(D),Kt.init(),te=new N0(D,Kt),jt=new Km(D,Kt,t,te),zt=new L0(D,Kt),jt.reverseDepthBuffer&&f&&zt.buffers.depth.setReversed(!0),oe=new ag(D),Ht=new y0,R=new U0(D,Kt,zt,Ht,jt,te,oe),S=new Qm(_),q=new ng(_),ct=new ff(D),ce=new Zm(D,ct),ut=new sg(D,ct,oe,ce),nt=new lg(D,ut,ct,oe),Zt=new og(D,jt,R),pt=new jm(Ht),Ft=new _0(_,S,q,Kt,jt,ce,pt),It=new k0(_,Ht),Pt=new M0,Qt=new A0(Kt),kt=new Ym(_,S,q,zt,nt,u,l),Ot=new I0(_,nt,jt),F=new V0(D,oe,jt,zt),Nt=new Jm(D,Kt,oe),ie=new rg(D,Kt,oe),oe.programs=Ft.programs,_.capabilities=jt,_.extensions=Kt,_.properties=Ht,_.renderLists=Pt,_.shadowMap=Ot,_.state=zt,_.info=oe}wt();let Q=new Tl(_,D);this.xr=Q,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let E=Kt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Kt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(E){E!==void 0&&(N=E,this.setSize(G,ht,!1))},this.getSize=function(E){return E.set(G,ht)},this.setSize=function(E,O,Y=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=E,ht=O,e.width=Math.floor(E*N),e.height=Math.floor(O*N),Y===!0&&(e.style.width=E+"px",e.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(G*N,ht*N).floor()},this.setDrawingBufferSize=function(E,O,Y){G=E,ht=O,N=Y,e.width=Math.floor(E*Y),e.height=Math.floor(O*Y),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(w)},this.getViewport=function(E){return E.copy(J)},this.setViewport=function(E,O,Y,K){E.isVector4?J.set(E.x,E.y,E.z,E.w):J.set(E,O,Y,K),zt.viewport(w.copy(J).multiplyScalar(N).round())},this.getScissor=function(E){return E.copy(it)},this.setScissor=function(E,O,Y,K){E.isVector4?it.set(E.x,E.y,E.z,E.w):it.set(E,O,Y,K),zt.scissor(I.copy(it).multiplyScalar(N).round())},this.getScissorTest=function(){return vt},this.setScissorTest=function(E){zt.setScissorTest(vt=E)},this.setOpaqueSort=function(E){st=E},this.setTransparentSort=function(E){ft=E},this.getClearColor=function(E){return E.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor.apply(kt,arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha.apply(kt,arguments)},this.clear=function(E=!0,O=!0,Y=!0){let K=0;if(E){let V=!1;if(T!==null){let St=T.texture.format;V=St===jl||St===Kl||St===Jl}if(V){let St=T.texture.type,Bt=St===Hn||St===Ci||St===Js||St===us||St===$l||St===Yl,Wt=kt.getClearColor(),Xt=kt.getClearAlpha(),ee=Wt.r,se=Wt.g,qt=Wt.b;Bt?(m[0]=ee,m[1]=se,m[2]=qt,m[3]=Xt,D.clearBufferuiv(D.COLOR,0,m)):(y[0]=ee,y[1]=se,y[2]=qt,y[3]=Xt,D.clearBufferiv(D.COLOR,0,y))}else K|=D.COLOR_BUFFER_BIT}O&&(K|=D.DEPTH_BUFFER_BIT),Y&&(K|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",Rt,!1),e.removeEventListener("webglcontextcreationerror",At,!1),Pt.dispose(),Qt.dispose(),Ht.dispose(),S.dispose(),q.dispose(),nt.dispose(),ce.dispose(),F.dispose(),Ft.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",j),Q.removeEventListener("sessionend",Z),et.stop()};function ot(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Rt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let E=oe.autoReset,O=Ot.enabled,Y=Ot.autoUpdate,K=Ot.needsUpdate,V=Ot.type;wt(),oe.autoReset=E,Ot.enabled=O,Ot.autoUpdate=Y,Ot.needsUpdate=K,Ot.type=V}function At(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function H(E){let O=E.target;O.removeEventListener("dispose",H),z(O)}function z(E){dt(E),Ht.remove(E)}function dt(E){let O=Ht.get(E).programs;O!==void 0&&(O.forEach(function(Y){Ft.releaseProgram(Y)}),E.isShaderMaterial&&Ft.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,Y,K,V,St){O===null&&(O=Et);let Bt=V.isMesh&&V.matrixWorld.determinant()<0,Wt=Ve(E,O,Y,K,V);zt.setMaterial(K,Bt);let Xt=Y.index,ee=1;if(K.wireframe===!0){if(Xt=ut.getWireframeAttribute(Y),Xt===void 0)return;ee=2}let se=Y.drawRange,qt=Y.attributes.position,de=se.start*ee,Me=(se.start+se.count)*ee;St!==null&&(de=Math.max(de,St.start*ee),Me=Math.min(Me,(St.start+St.count)*ee)),Xt!==null?(de=Math.max(de,0),Me=Math.min(Me,Xt.count)):qt!=null&&(de=Math.max(de,0),Me=Math.min(Me,qt.count));let be=Me-de;if(be<0||be===1/0)return;ce.setup(V,K,Wt,Y,Xt);let tn,pe=Nt;if(Xt!==null&&(tn=ct.get(Xt),pe=ie,pe.setIndex(tn)),V.isMesh)K.wireframe===!0?(zt.setLineWidth(K.wireframeLinewidth*_t()),pe.setMode(D.LINES)):pe.setMode(D.TRIANGLES);else if(V.isLine){let $t=K.linewidth;$t===void 0&&($t=1),zt.setLineWidth($t*_t()),V.isLineSegments?pe.setMode(D.LINES):V.isLineLoop?pe.setMode(D.LINE_LOOP):pe.setMode(D.LINE_STRIP)}else V.isPoints?pe.setMode(D.POINTS):V.isSprite&&pe.setMode(D.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)pe.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(Kt.get("WEBGL_multi_draw"))pe.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let $t=V._multiDrawStarts,Pn=V._multiDrawCounts,me=V._multiDrawCount,gn=Xt?ct.get(Xt).bytesPerElement:1,zi=Ht.get(K).currentProgram.getUniforms();for(let rn=0;rn<me;rn++)zi.setValue(D,"_gl_DrawID",rn),pe.render($t[rn]/gn,Pn[rn])}else if(V.isInstancedMesh)pe.renderInstances(de,be,V.count);else if(Y.isInstancedBufferGeometry){let $t=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Pn=Math.min(Y.instanceCount,$t);pe.renderInstances(de,be,Pn)}else pe.render(de,be)};function Mt(E,O,Y){E.transparent===!0&&E.side===Pe&&E.forceSinglePass===!1?(E.side=We,E.needsUpdate=!0,Vt(E,O,Y),E.side=ai,E.needsUpdate=!0,Vt(E,O,Y),E.side=Pe):Vt(E,O,Y)}this.compile=function(E,O,Y=null){Y===null&&(Y=E),g=Qt.get(Y),g.init(O),M.push(g),Y.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(g.pushLight(V),V.castShadow&&g.pushShadow(V))}),E!==Y&&E.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(g.pushLight(V),V.castShadow&&g.pushShadow(V))}),g.setupLights();let K=new Set;return E.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let St=V.material;if(St)if(Array.isArray(St))for(let Bt=0;Bt<St.length;Bt++){let Wt=St[Bt];Mt(Wt,Y,V),K.add(Wt)}else Mt(St,Y,V),K.add(St)}),M.pop(),g=null,K},this.compileAsync=function(E,O,Y=null){let K=this.compile(E,O,Y);return new Promise(V=>{function St(){if(K.forEach(function(Bt){Ht.get(Bt).currentProgram.isReady()&&K.delete(Bt)}),K.size===0){V(E);return}setTimeout(St,10)}Kt.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let Tt=null;function $(E){Tt&&Tt(E)}function j(){et.stop()}function Z(){et.start()}let et=new qh;et.setAnimationLoop($),typeof self<"u"&&et.setContext(self),this.setAnimationLoop=function(E){Tt=E,Q.setAnimationLoop(E),E===null?et.stop():et.start()},Q.addEventListener("sessionstart",j),Q.addEventListener("sessionend",Z),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(O),O=Q.getCamera()),E.isScene===!0&&E.onBeforeRender(_,E,O,T),g=Qt.get(E,M.length),g.init(O),M.push(g),tt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),W.setFromProjectionMatrix(tt),mt=this.localClippingEnabled,rt=pt.init(this.clippingPlanes,mt),p=Pt.get(E,v.length),p.init(),v.push(p),Q.enabled===!0&&Q.isPresenting===!0){let St=_.xr.getDepthSensingMesh();St!==null&&gt(St,O,-1/0,_.sortObjects)}gt(E,O,0,_.sortObjects),p.finish(),_.sortObjects===!0&&p.sort(st,ft),Ct=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,Ct&&kt.addToRenderList(p,E),this.info.render.frame++,rt===!0&&pt.beginShadows();let Y=g.state.shadowsArray;Ot.render(Y,E,O),rt===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset();let K=p.opaque,V=p.transmissive;if(g.setupLights(),O.isArrayCamera){let St=O.cameras;if(V.length>0)for(let Bt=0,Wt=St.length;Bt<Wt;Bt++){let Xt=St[Bt];Lt(K,V,E,Xt)}Ct&&kt.render(E);for(let Bt=0,Wt=St.length;Bt<Wt;Bt++){let Xt=St[Bt];lt(p,E,Xt,Xt.viewport)}}else V.length>0&&Lt(K,V,E,O),Ct&&kt.render(E),lt(p,E,O);T!==null&&(R.updateMultisampleRenderTarget(T),R.updateRenderTargetMipmap(T)),E.isScene===!0&&E.onAfterRender(_,E,O),ce.resetDefaultState(),b=-1,x=null,M.pop(),M.length>0?(g=M[M.length-1],rt===!0&&pt.setGlobalState(_.clippingPlanes,g.state.camera)):g=null,v.pop(),v.length>0?p=v[v.length-1]:p=null};function gt(E,O,Y,K){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)Y=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)g.pushLight(E),E.castShadow&&g.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||W.intersectsSprite(E)){K&&xt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(tt);let Bt=nt.update(E),Wt=E.material;Wt.visible&&p.push(E,Bt,Wt,Y,xt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||W.intersectsObject(E))){let Bt=nt.update(E),Wt=E.material;if(K&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),xt.copy(E.boundingSphere.center)):(Bt.boundingSphere===null&&Bt.computeBoundingSphere(),xt.copy(Bt.boundingSphere.center)),xt.applyMatrix4(E.matrixWorld).applyMatrix4(tt)),Array.isArray(Wt)){let Xt=Bt.groups;for(let ee=0,se=Xt.length;ee<se;ee++){let qt=Xt[ee],de=Wt[qt.materialIndex];de&&de.visible&&p.push(E,Bt,de,Y,xt.z,qt)}}else Wt.visible&&p.push(E,Bt,Wt,Y,xt.z,null)}}let St=E.children;for(let Bt=0,Wt=St.length;Bt<Wt;Bt++)gt(St[Bt],O,Y,K)}function lt(E,O,Y,K){let V=E.opaque,St=E.transmissive,Bt=E.transparent;g.setupLightsView(Y),rt===!0&&pt.setGlobalState(_.clippingPlanes,Y),K&&zt.viewport(w.copy(K)),V.length>0&&bt(V,O,Y),St.length>0&&bt(St,O,Y),Bt.length>0&&bt(Bt,O,Y),zt.buffers.depth.setTest(!0),zt.buffers.depth.setMask(!0),zt.buffers.color.setMask(!0),zt.setPolygonOffset(!1)}function Lt(E,O,Y,K){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[K.id]===void 0&&(g.state.transmissionRenderTarget[K.id]=new Gn(1,1,{generateMipmaps:!0,type:Kt.has("EXT_color_buffer_half_float")||Kt.has("EXT_color_buffer_float")?ar:Hn,minFilter:Ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));let St=g.state.transmissionRenderTarget[K.id],Bt=K.viewport||w;St.setSize(Bt.z,Bt.w);let Wt=_.getRenderTarget();_.setRenderTarget(St),_.getClearColor(B),X=_.getClearAlpha(),X<1&&_.setClearColor(16777215,.5),_.clear(),Ct&&kt.render(Y);let Xt=_.toneMapping;_.toneMapping=ri;let ee=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),g.setupLightsView(K),rt===!0&&pt.setGlobalState(_.clippingPlanes,K),bt(E,Y,K),R.updateMultisampleRenderTarget(St),R.updateRenderTargetMipmap(St),Kt.has("WEBGL_multisampled_render_to_texture")===!1){let se=!1;for(let qt=0,de=O.length;qt<de;qt++){let Me=O[qt],be=Me.object,tn=Me.geometry,pe=Me.material,$t=Me.group;if(pe.side===Pe&&be.layers.test(K.layers)){let Pn=pe.side;pe.side=We,pe.needsUpdate=!0,yt(be,Y,K,tn,pe,$t),pe.side=Pn,pe.needsUpdate=!0,se=!0}}se===!0&&(R.updateMultisampleRenderTarget(St),R.updateRenderTargetMipmap(St))}_.setRenderTarget(Wt),_.setClearColor(B,X),ee!==void 0&&(K.viewport=ee),_.toneMapping=Xt}function bt(E,O,Y){let K=O.isScene===!0?O.overrideMaterial:null;for(let V=0,St=E.length;V<St;V++){let Bt=E[V],Wt=Bt.object,Xt=Bt.geometry,ee=K===null?Bt.material:K,se=Bt.group;Wt.layers.test(Y.layers)&&yt(Wt,O,Y,Xt,ee,se)}}function yt(E,O,Y,K,V,St){E.onBeforeRender(_,O,Y,K,V,St),E.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),V.onBeforeRender(_,O,Y,K,E,St),V.transparent===!0&&V.side===Pe&&V.forceSinglePass===!1?(V.side=We,V.needsUpdate=!0,_.renderBufferDirect(Y,O,K,V,E,St),V.side=ai,V.needsUpdate=!0,_.renderBufferDirect(Y,O,K,V,E,St),V.side=Pe):_.renderBufferDirect(Y,O,K,V,E,St),E.onAfterRender(_,O,Y,K,V,St)}function Vt(E,O,Y){O.isScene!==!0&&(O=Et);let K=Ht.get(E),V=g.state.lights,St=g.state.shadowsArray,Bt=V.state.version,Wt=Ft.getParameters(E,V.state,St,O,Y),Xt=Ft.getProgramCacheKey(Wt),ee=K.programs;K.environment=E.isMeshStandardMaterial?O.environment:null,K.fog=O.fog,K.envMap=(E.isMeshStandardMaterial?q:S).get(E.envMap||K.environment),K.envMapRotation=K.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,ee===void 0&&(E.addEventListener("dispose",H),ee=new Map,K.programs=ee);let se=ee.get(Xt);if(se!==void 0){if(K.currentProgram===se&&K.lightsStateVersion===Bt)return Ue(E,Wt),se}else Wt.uniforms=Ft.getUniforms(E),E.onBeforeCompile(Wt,_),se=Ft.acquireProgram(Wt,Xt),ee.set(Xt,se),K.uniforms=Wt.uniforms;let qt=K.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(qt.clippingPlanes=pt.uniform),Ue(E,Wt),K.needsLights=ve(E),K.lightsStateVersion=Bt,K.needsLights&&(qt.ambientLightColor.value=V.state.ambient,qt.lightProbe.value=V.state.probe,qt.directionalLights.value=V.state.directional,qt.directionalLightShadows.value=V.state.directionalShadow,qt.spotLights.value=V.state.spot,qt.spotLightShadows.value=V.state.spotShadow,qt.rectAreaLights.value=V.state.rectArea,qt.ltc_1.value=V.state.rectAreaLTC1,qt.ltc_2.value=V.state.rectAreaLTC2,qt.pointLights.value=V.state.point,qt.pointLightShadows.value=V.state.pointShadow,qt.hemisphereLights.value=V.state.hemi,qt.directionalShadowMap.value=V.state.directionalShadowMap,qt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,qt.spotShadowMap.value=V.state.spotShadowMap,qt.spotLightMatrix.value=V.state.spotLightMatrix,qt.spotLightMap.value=V.state.spotLightMap,qt.pointShadowMap.value=V.state.pointShadowMap,qt.pointShadowMatrix.value=V.state.pointShadowMatrix),K.currentProgram=se,K.uniformsList=null,se}function Ae(E){if(E.uniformsList===null){let O=E.currentProgram.getUniforms();E.uniformsList=os.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function Ue(E,O){let Y=Ht.get(E);Y.outputColorSpace=O.outputColorSpace,Y.batching=O.batching,Y.batchingColor=O.batchingColor,Y.instancing=O.instancing,Y.instancingColor=O.instancingColor,Y.instancingMorph=O.instancingMorph,Y.skinning=O.skinning,Y.morphTargets=O.morphTargets,Y.morphNormals=O.morphNormals,Y.morphColors=O.morphColors,Y.morphTargetsCount=O.morphTargetsCount,Y.numClippingPlanes=O.numClippingPlanes,Y.numIntersection=O.numClipIntersection,Y.vertexAlphas=O.vertexAlphas,Y.vertexTangents=O.vertexTangents,Y.toneMapping=O.toneMapping}function Ve(E,O,Y,K,V){O.isScene!==!0&&(O=Et),R.resetTextureUnits();let St=O.fog,Bt=K.isMeshStandardMaterial?O.environment:null,Wt=T===null?_.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:ws,Xt=(K.isMeshStandardMaterial?q:S).get(K.envMap||Bt),ee=K.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,se=!!Y.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),qt=!!Y.morphAttributes.position,de=!!Y.morphAttributes.normal,Me=!!Y.morphAttributes.color,be=ri;K.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(be=_.toneMapping);let tn=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,pe=tn!==void 0?tn.length:0,$t=Ht.get(K),Pn=g.state.lights;if(rt===!0&&(mt===!0||E!==x)){let un=E===x&&K.id===b;pt.setState(K,E,un)}let me=!1;K.version===$t.__version?($t.needsLights&&$t.lightsStateVersion!==Pn.state.version||$t.outputColorSpace!==Wt||V.isBatchedMesh&&$t.batching===!1||!V.isBatchedMesh&&$t.batching===!0||V.isBatchedMesh&&$t.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&$t.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&$t.instancing===!1||!V.isInstancedMesh&&$t.instancing===!0||V.isSkinnedMesh&&$t.skinning===!1||!V.isSkinnedMesh&&$t.skinning===!0||V.isInstancedMesh&&$t.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&$t.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&$t.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&$t.instancingMorph===!1&&V.morphTexture!==null||$t.envMap!==Xt||K.fog===!0&&$t.fog!==St||$t.numClippingPlanes!==void 0&&($t.numClippingPlanes!==pt.numPlanes||$t.numIntersection!==pt.numIntersection)||$t.vertexAlphas!==ee||$t.vertexTangents!==se||$t.morphTargets!==qt||$t.morphNormals!==de||$t.morphColors!==Me||$t.toneMapping!==be||$t.morphTargetsCount!==pe)&&(me=!0):(me=!0,$t.__version=K.version);let gn=$t.currentProgram;me===!0&&(gn=Vt(K,O,V));let zi=!1,rn=!1,Ns=!1,Se=gn.getUniforms(),Sn=$t.uniforms;if(zt.useProgram(gn.program)&&(zi=!0,rn=!0,Ns=!0),K.id!==b&&(b=K.id,rn=!0),zi||x!==E){zt.buffers.depth.getReversed()?(k.copy(E.projectionMatrix),qd(k),$d(k),Se.setValue(D,"projectionMatrix",k)):Se.setValue(D,"projectionMatrix",E.projectionMatrix),Se.setValue(D,"viewMatrix",E.matrixWorldInverse);let Zn=Se.map.cameraPosition;Zn!==void 0&&Zn.setValue(D,at.setFromMatrixPosition(E.matrixWorld)),jt.logarithmicDepthBuffer&&Se.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Se.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),x!==E&&(x=E,rn=!0,Ns=!0)}if(V.isSkinnedMesh){Se.setOptional(D,V,"bindMatrix"),Se.setOptional(D,V,"bindMatrixInverse");let un=V.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),Se.setValue(D,"boneTexture",un.boneTexture,R))}V.isBatchedMesh&&(Se.setOptional(D,V,"batchingTexture"),Se.setValue(D,"batchingTexture",V._matricesTexture,R),Se.setOptional(D,V,"batchingIdTexture"),Se.setValue(D,"batchingIdTexture",V._indirectTexture,R),Se.setOptional(D,V,"batchingColorTexture"),V._colorsTexture!==null&&Se.setValue(D,"batchingColorTexture",V._colorsTexture,R));let Fs=Y.morphAttributes;if((Fs.position!==void 0||Fs.normal!==void 0||Fs.color!==void 0)&&Zt.update(V,Y,gn),(rn||$t.receiveShadow!==V.receiveShadow)&&($t.receiveShadow=V.receiveShadow,Se.setValue(D,"receiveShadow",V.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(Sn.envMap.value=Xt,Sn.flipEnvMap.value=Xt.isCubeTexture&&Xt.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&O.environment!==null&&(Sn.envMapIntensity.value=O.environmentIntensity),rn&&(Se.setValue(D,"toneMappingExposure",_.toneMappingExposure),$t.needsLights&&Ie(Sn,Ns),St&&K.fog===!0&&It.refreshFogUniforms(Sn,St),It.refreshMaterialUniforms(Sn,K,N,ht,g.state.transmissionRenderTarget[E.id]),os.upload(D,Ae($t),Sn,R)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(os.upload(D,Ae($t),Sn,R),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Se.setValue(D,"center",V.center),Se.setValue(D,"modelViewMatrix",V.modelViewMatrix),Se.setValue(D,"normalMatrix",V.normalMatrix),Se.setValue(D,"modelMatrix",V.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){let un=K.uniformsGroups;for(let Zn=0,Jn=un.length;Zn<Jn;Zn++){let yc=un[Zn];F.update(yc,gn),F.bind(yc,gn)}}return gn}function Ie(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function ve(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(E,O,Y){Ht.get(E.texture).__webglTexture=O,Ht.get(E.depthTexture).__webglTexture=Y;let K=Ht.get(E);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=Y===void 0,K.__autoAllocateDepthBuffer||Kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,O){let Y=Ht.get(E);Y.__webglFramebuffer=O,Y.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,Y=0){T=E,A=O,C=Y;let K=!0,V=null,St=!1,Bt=!1;if(E){let Xt=Ht.get(E);if(Xt.__useDefaultFramebuffer!==void 0)zt.bindFramebuffer(D.FRAMEBUFFER,null),K=!1;else if(Xt.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(Xt.__hasExternalTextures)R.rebindTextures(E,Ht.get(E.texture).__webglTexture,Ht.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let qt=E.depthTexture;if(Xt.__boundDepthTexture!==qt){if(qt!==null&&Ht.has(qt)&&(E.width!==qt.image.width||E.height!==qt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}let ee=E.texture;(ee.isData3DTexture||ee.isDataArrayTexture||ee.isCompressedArrayTexture)&&(Bt=!0);let se=Ht.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(se[O])?V=se[O][Y]:V=se[O],St=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?V=Ht.get(E).__webglMultisampledFramebuffer:Array.isArray(se)?V=se[Y]:V=se,w.copy(E.viewport),I.copy(E.scissor),L=E.scissorTest}else w.copy(J).multiplyScalar(N).floor(),I.copy(it).multiplyScalar(N).floor(),L=vt;if(zt.bindFramebuffer(D.FRAMEBUFFER,V)&&K&&zt.drawBuffers(E,V),zt.viewport(w),zt.scissor(I),zt.setScissorTest(L),St){let Xt=Ht.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,Xt.__webglTexture,Y)}else if(Bt){let Xt=Ht.get(E.texture),ee=O||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Xt.__webglTexture,Y||0,ee)}b=-1},this.readRenderTargetPixels=function(E,O,Y,K,V,St,Bt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Wt=Ht.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Bt!==void 0&&(Wt=Wt[Bt]),Wt){zt.bindFramebuffer(D.FRAMEBUFFER,Wt);try{let Xt=E.texture,ee=Xt.format,se=Xt.type;if(!jt.textureFormatReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!jt.textureTypeReadable(se)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-K&&Y>=0&&Y<=E.height-V&&D.readPixels(O,Y,K,V,te.convert(ee),te.convert(se),St)}finally{let Xt=T!==null?Ht.get(T).__webglFramebuffer:null;zt.bindFramebuffer(D.FRAMEBUFFER,Xt)}}},this.readRenderTargetPixelsAsync=async function(E,O,Y,K,V,St,Bt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Wt=Ht.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Bt!==void 0&&(Wt=Wt[Bt]),Wt){let Xt=E.texture,ee=Xt.format,se=Xt.type;if(!jt.textureFormatReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!jt.textureTypeReadable(se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=E.width-K&&Y>=0&&Y<=E.height-V){zt.bindFramebuffer(D.FRAMEBUFFER,Wt);let qt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,qt),D.bufferData(D.PIXEL_PACK_BUFFER,St.byteLength,D.STREAM_READ),D.readPixels(O,Y,K,V,te.convert(ee),te.convert(se),0);let de=T!==null?Ht.get(T).__webglFramebuffer:null;zt.bindFramebuffer(D.FRAMEBUFFER,de);let Me=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Xd(D,Me,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,qt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,St),D.deleteBuffer(qt),D.deleteSync(Me),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,O=null,Y=0){E.isTexture!==!0&&(Gs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,E=arguments[1]);let K=Math.pow(2,-Y),V=Math.floor(E.image.width*K),St=Math.floor(E.image.height*K),Bt=O!==null?O.x:0,Wt=O!==null?O.y:0;R.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,Y,0,0,Bt,Wt,V,St),zt.unbindTexture()},this.copyTextureToTexture=function(E,O,Y=null,K=null,V=0){E.isTexture!==!0&&(Gs("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,E=arguments[1],O=arguments[2],V=arguments[3]||0,Y=null);let St,Bt,Wt,Xt,ee,se,qt,de,Me,be=E.isCompressedTexture?E.mipmaps[V]:E.image;Y!==null?(St=Y.max.x-Y.min.x,Bt=Y.max.y-Y.min.y,Wt=Y.isBox3?Y.max.z-Y.min.z:1,Xt=Y.min.x,ee=Y.min.y,se=Y.isBox3?Y.min.z:0):(St=be.width,Bt=be.height,Wt=be.depth||1,Xt=0,ee=0,se=0),K!==null?(qt=K.x,de=K.y,Me=K.z):(qt=0,de=0,Me=0);let tn=te.convert(O.format),pe=te.convert(O.type),$t;O.isData3DTexture?(R.setTexture3D(O,0),$t=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(R.setTexture2DArray(O,0),$t=D.TEXTURE_2D_ARRAY):(R.setTexture2D(O,0),$t=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);let Pn=D.getParameter(D.UNPACK_ROW_LENGTH),me=D.getParameter(D.UNPACK_IMAGE_HEIGHT),gn=D.getParameter(D.UNPACK_SKIP_PIXELS),zi=D.getParameter(D.UNPACK_SKIP_ROWS),rn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,be.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,be.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Xt),D.pixelStorei(D.UNPACK_SKIP_ROWS,ee),D.pixelStorei(D.UNPACK_SKIP_IMAGES,se);let Ns=E.isDataArrayTexture||E.isData3DTexture,Se=O.isDataArrayTexture||O.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){let Sn=Ht.get(E),Fs=Ht.get(O),un=Ht.get(Sn.__renderTarget),Zn=Ht.get(Fs.__renderTarget);zt.bindFramebuffer(D.READ_FRAMEBUFFER,un.__webglFramebuffer),zt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Zn.__webglFramebuffer);for(let Jn=0;Jn<Wt;Jn++)Ns&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ht.get(E).__webglTexture,V,se+Jn),E.isDepthTexture?(Se&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ht.get(O).__webglTexture,V,Me+Jn),D.blitFramebuffer(Xt,ee,St,Bt,qt,de,St,Bt,D.DEPTH_BUFFER_BIT,D.NEAREST)):Se?D.copyTexSubImage3D($t,V,qt,de,Me+Jn,Xt,ee,St,Bt):D.copyTexSubImage2D($t,V,qt,de,Me+Jn,Xt,ee,St,Bt);zt.bindFramebuffer(D.READ_FRAMEBUFFER,null),zt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Se?E.isDataTexture||E.isData3DTexture?D.texSubImage3D($t,V,qt,de,Me,St,Bt,Wt,tn,pe,be.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D($t,V,qt,de,Me,St,Bt,Wt,tn,be.data):D.texSubImage3D($t,V,qt,de,Me,St,Bt,Wt,tn,pe,be):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,V,qt,de,St,Bt,tn,pe,be.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,V,qt,de,be.width,be.height,tn,be.data):D.texSubImage2D(D.TEXTURE_2D,V,qt,de,St,Bt,tn,pe,be);D.pixelStorei(D.UNPACK_ROW_LENGTH,Pn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,me),D.pixelStorei(D.UNPACK_SKIP_PIXELS,gn),D.pixelStorei(D.UNPACK_SKIP_ROWS,zi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,rn),V===0&&O.generateMipmaps&&D.generateMipmap($t),zt.unbindTexture()},this.copyTextureToTexture3D=function(E,O,Y=null,K=null,V=0){return E.isTexture!==!0&&(Gs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,K=arguments[1]||null,E=arguments[2],O=arguments[3],V=arguments[4]||0),Gs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,O,Y,K,V)},this.initRenderTarget=function(E){Ht.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),zt.unbindTexture()},this.resetState=function(){A=0,C=0,T=null,zt.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=he._getDrawingBufferColorSpace(t),e.unpackColorSpace=he._getUnpackColorSpace()}};var gs=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Gt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},xs=class extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var El=class extends cn{constructor(t=null,e=1,n=1,s,r,a,o,l,c=ln,h=ln,d,f){super(null,a,o,l,c,h,s,r,d,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Qs=class extends $e{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ts=new ge,Mh=new ge,Wr=[],bh=new Wn,H0=new ge,Vs=new fe,Hs=new Ri,Pi=class extends fe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Qs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,H0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Wn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),bh.copy(t.boundingBox).applyMatrix4(ts),this.boundingBox.union(bh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ri),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),Hs.copy(t.boundingSphere).applyMatrix4(ts),this.boundingSphere.union(Hs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Vs.geometry=this.geometry,Vs.material=this.material,Vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hs.copy(this.boundingSphere),Hs.applyMatrix4(n),t.ray.intersectsSphere(Hs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ts),Mh.multiplyMatrices(n,ts),Vs.matrixWorld=Mh,Vs.raycast(t,Wr);for(let a=0,o=Wr.length;a<o;a++){let l=Wr[a];l.instanceId=r,l.object=this,e.push(l)}Wr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Qs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new El(new Float32Array(s*this.count),s,this.count,Zl,En));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var fn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],f=n[s+1]-h,u=(a-h)/f;return(s+u)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new Ut:new U);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new U,s=[],r=[],a=[],o=new U,l=new ge;for(let u=0;u<=t;u++){let m=u/t;s[u]=this.getTangentAt(m,new U)}r[0]=new U,a[0]=new U;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(s[u-1],s[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Ge(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(l.makeRotationAxis(o,m))}a[u].crossVectors(s[u],r[u])}if(e===!0){let u=Math.acos(Ge(r[0].dot(r[t]),-1,1));u/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(u=-u);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],u*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},tr=class extends fn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Ut){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,u=c-this.aY;l=f*h-u*d+this.aX,c=f*d+u*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Al=class extends tr{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function ec(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+d)+(l-o)/d;f*=h,u*=h,s(a,o,f,u)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var Xr=new U,yo=new ec,vo=new ec,Mo=new ec,Li=class extends fn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new U){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Xr.subVectors(s[0],s[1]).add(s[0]),c=Xr);let d=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Xr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Xr),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),u),y=Math.pow(d.distanceToSquared(f),u),p=Math.pow(f.distanceToSquared(h),u);y<1e-4&&(y=1),m<1e-4&&(m=y),p<1e-4&&(p=y),yo.initNonuniformCatmullRom(c.x,d.x,f.x,h.x,m,y,p),vo.initNonuniformCatmullRom(c.y,d.y,f.y,h.y,m,y,p),Mo.initNonuniformCatmullRom(c.z,d.z,f.z,h.z,m,y,p)}else this.curveType==="catmullrom"&&(yo.initCatmullRom(c.x,d.x,f.x,h.x,this.tension),vo.initCatmullRom(c.y,d.y,f.y,h.y,this.tension),Mo.initCatmullRom(c.z,d.z,f.z,h.z,this.tension));return n.set(yo.calc(l),vo.calc(l),Mo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new U().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Sh(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function G0(i,t){let e=1-i;return e*e*t}function W0(i,t){return 2*(1-i)*i*t}function X0(i,t){return i*i*t}function Ys(i,t,e,n){return G0(i,t)+W0(i,e)+X0(i,n)}function q0(i,t){let e=1-i;return e*e*e*t}function $0(i,t){let e=1-i;return 3*e*e*i*t}function Y0(i,t){return 3*(1-i)*i*i*t}function Z0(i,t){return i*i*i*t}function Zs(i,t,e,n,s){return q0(i,t)+$0(i,e)+Y0(i,n)+Z0(i,s)}var fa=class extends fn{constructor(t=new Ut,e=new Ut,n=new Ut,s=new Ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ut){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Zs(t,s.x,r.x,a.x,o.x),Zs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Cl=class extends fn{constructor(t=new U,e=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new U){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Zs(t,s.x,r.x,a.x,o.x),Zs(t,s.y,r.y,a.y,o.y),Zs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},pa=class extends fn{constructor(t=new Ut,e=new Ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ut){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Rl=class extends fn{constructor(t=new U,e=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new U){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new U){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ma=class extends fn{constructor(t=new Ut,e=new Ut,n=new Ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ut){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ys(t,s.x,r.x,a.x),Ys(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ga=class extends fn{constructor(t=new U,e=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new U){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ys(t,s.x,r.x,a.x),Ys(t,s.y,r.y,a.y),Ys(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},xa=class extends fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ut){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Sh(o,l.x,c.x,h.x,d.x),Sh(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new Ut().fromArray(s))}return this}},Il=Object.freeze({__proto__:null,ArcCurve:Al,CatmullRomCurve3:Li,CubicBezierCurve:fa,CubicBezierCurve3:Cl,EllipseCurve:tr,LineCurve:pa,LineCurve3:Rl,QuadraticBezierCurve:ma,QuadraticBezierCurve3:ga,SplineCurve:xa}),Pl=class extends fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Il[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Il[s.type]().fromJSON(s))}return this}},_a=class extends Pl{constructor(t){super(),this.type="Path",this.currentPoint=new Ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new pa(this.currentPoint.clone(),new Ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new ma(this.currentPoint.clone(),new Ut(t,e),new Ut(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new fa(this.currentPoint.clone(),new Ut(t,e),new Ut(n,s),new Ut(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new xa(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new tr(t,e,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ya=class i extends xe{constructor(t=[new Ut(0,-.5),new Ut(.5,0),new Ut(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ge(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,d=new U,f=new Ut,u=new U,m=new U,y=new U,p=0,g=0;for(let v=0;v<=t.length-1;v++)switch(v){case 0:p=t[v+1].x-t[v].x,g=t[v+1].y-t[v].y,u.x=g*1,u.y=-p,u.z=g*0,y.copy(u),u.normalize(),l.push(u.x,u.y,u.z);break;case t.length-1:l.push(y.x,y.y,y.z);break;default:p=t[v+1].x-t[v].x,g=t[v+1].y-t[v].y,u.x=g*1,u.y=-p,u.z=g*0,m.copy(u),u.x+=y.x,u.y+=y.y,u.z+=y.z,u.normalize(),l.push(u.x,u.y,u.z),y.copy(m)}for(let v=0;v<=e;v++){let M=n+v*h*s,_=Math.sin(M),P=Math.cos(M);for(let A=0;A<=t.length-1;A++){d.x=t[A].x*_,d.y=t[A].y,d.z=t[A].x*P,a.push(d.x,d.y,d.z),f.x=v/e,f.y=A/(t.length-1),o.push(f.x,f.y);let C=l[3*A+0]*_,T=l[3*A+1],b=l[3*A+0]*P;c.push(C,T,b)}}for(let v=0;v<e;v++)for(let M=0;M<t.length-1;M++){let _=M+v*t.length,P=_,A=_+t.length,C=_+t.length+1,T=_+1;r.push(P,A,T),r.push(C,T,A)}this.setIndex(r),this.setAttribute("position",new Yt(a,3)),this.setAttribute("uv",new Yt(o,2)),this.setAttribute("normal",new Yt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var ci=class i extends xe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new U,h=new Ut;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=e;d++,f+=3){let u=n+d/e*s;c.x=t*Math.cos(u),c.y=t*Math.sin(u),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Yt(a,3)),this.setAttribute("normal",new Yt(o,3)),this.setAttribute("uv",new Yt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ue=class i extends xe{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],f=[],u=[],m=0,y=[],p=n/2,g=0;v(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Yt(d,3)),this.setAttribute("normal",new Yt(f,3)),this.setAttribute("uv",new Yt(u,2));function v(){let _=new U,P=new U,A=0,C=(e-t)/n;for(let T=0;T<=r;T++){let b=[],x=T/r,w=x*(e-t)+t;for(let I=0;I<=s;I++){let L=I/s,B=L*l+o,X=Math.sin(B),G=Math.cos(B);P.x=w*X,P.y=-x*n+p,P.z=w*G,d.push(P.x,P.y,P.z),_.set(X,C,G).normalize(),f.push(_.x,_.y,_.z),u.push(L,1-x),b.push(m++)}y.push(b)}for(let T=0;T<s;T++)for(let b=0;b<r;b++){let x=y[b][T],w=y[b+1][T],I=y[b+1][T+1],L=y[b][T+1];(t>0||b!==0)&&(h.push(x,w,L),A+=3),(e>0||b!==r-1)&&(h.push(w,I,L),A+=3)}c.addGroup(g,A,0),g+=A}function M(_){let P=m,A=new Ut,C=new U,T=0,b=_===!0?t:e,x=_===!0?1:-1;for(let I=1;I<=s;I++)d.push(0,p*x,0),f.push(0,x,0),u.push(.5,.5),m++;let w=m;for(let I=0;I<=s;I++){let B=I/s*l+o,X=Math.cos(B),G=Math.sin(B);C.x=b*G,C.y=p*x,C.z=b*X,d.push(C.x,C.y,C.z),f.push(0,x,0),A.x=X*.5+.5,A.y=G*.5*x+.5,u.push(A.x,A.y),m++}for(let I=0;I<s;I++){let L=P+I,B=w+I;_===!0?h.push(B,B+1,L):h.push(B+1,B,L),T+=3}c.addGroup(g,T,_===!0?1:2),g+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Xe=class i extends ue{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},va=class i extends xe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new Yt(r,3)),this.setAttribute("normal",new Yt(r.slice(),3)),this.setAttribute("uv",new Yt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let M=new U,_=new U,P=new U;for(let A=0;A<e.length;A+=3)u(e[A+0],M),u(e[A+1],_),u(e[A+2],P),l(M,_,P,v)}function l(v,M,_,P){let A=P+1,C=[];for(let T=0;T<=A;T++){C[T]=[];let b=v.clone().lerp(_,T/A),x=M.clone().lerp(_,T/A),w=A-T;for(let I=0;I<=w;I++)I===0&&T===A?C[T][I]=b:C[T][I]=b.clone().lerp(x,I/w)}for(let T=0;T<A;T++)for(let b=0;b<2*(A-T)-1;b++){let x=Math.floor(b/2);b%2===0?(f(C[T][x+1]),f(C[T+1][x]),f(C[T][x])):(f(C[T][x+1]),f(C[T+1][x+1]),f(C[T+1][x]))}}function c(v){let M=new U;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(v),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function h(){let v=new U;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];let _=p(v)/2/Math.PI+.5,P=g(v)/Math.PI+.5;a.push(_,1-P)}m(),d()}function d(){for(let v=0;v<a.length;v+=6){let M=a[v+0],_=a[v+2],P=a[v+4],A=Math.max(M,_,P),C=Math.min(M,_,P);A>.9&&C<.1&&(M<.2&&(a[v+0]+=1),_<.2&&(a[v+2]+=1),P<.2&&(a[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function u(v,M){let _=v*3;M.x=t[_+0],M.y=t[_+1],M.z=t[_+2]}function m(){let v=new U,M=new U,_=new U,P=new U,A=new Ut,C=new Ut,T=new Ut;for(let b=0,x=0;b<r.length;b+=9,x+=6){v.set(r[b+0],r[b+1],r[b+2]),M.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),A.set(a[x+0],a[x+1]),C.set(a[x+2],a[x+3]),T.set(a[x+4],a[x+5]),P.copy(v).add(M).add(_).divideScalar(3);let w=p(P);y(A,x+0,v,w),y(C,x+2,M,w),y(T,x+4,_,w)}}function y(v,M,_,P){P<0&&v.x===1&&(a[M]=v.x-1),_.x===0&&_.z===0&&(a[M]=P/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function g(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}},_s=class i extends va{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var Xn=class extends _a{constructor(t){super(t),this.uuid=Fi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new _a().fromJSON(s))}return this}},J0={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Kh(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,d,f,u;if(n&&(r=ex(i,t,r,e)),i.length>80*e){o=c=i[0],l=h=i[1];for(let m=e;m<s;m+=e)d=i[m],f=i[m+1],d<o&&(o=d),f<l&&(l=f),d>c&&(c=d),f>h&&(h=f);u=Math.max(c-o,h-l),u=u!==0?32767/u:0}return er(r,a,e,o,l,u,0),a}};function Kh(i,t,e,n,s){let r,a;if(s===dx(i,t,e,n)>0)for(r=t;r<e;r+=n)a=wh(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=wh(r,i[r],i[r+1],a);return a&&Aa(a,a.next)&&(ir(a),a=a.next),a}function Di(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Aa(e,e.next)||Ee(e.prev,e,e.next)===0)){if(ir(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function er(i,t,e,n,s,r,a){if(!i)return;!a&&r&&ax(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?j0(i,n,s,r):K0(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),ir(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Q0(Di(i),t,e),er(i,t,e,n,s,r,2)):a===2&&tx(i,t,e,n,s,r):er(Di(i),t,e,n,s,r,1);break}}}function K0(i){let t=i.prev,e=i,n=i.next;if(Ee(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=s<r?s<a?s:a:r<a?r:a,d=o<l?o<c?o:c:l<c?l:c,f=s>r?s>a?s:a:r>a?r:a,u=o>l?o>c?o:c:l>c?l:c,m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=f&&m.y>=d&&m.y<=u&&is(s,o,r,l,a,c,m.x,m.y)&&Ee(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function j0(i,t,e,n){let s=i.prev,r=i,a=i.next;if(Ee(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,f=a.y,u=o<l?o<c?o:c:l<c?l:c,m=h<d?h<f?h:f:d<f?d:f,y=o>l?o>c?o:c:l>c?l:c,p=h>d?h>f?h:f:d>f?d:f,g=Ll(u,m,t,e,n),v=Ll(y,p,t,e,n),M=i.prevZ,_=i.nextZ;for(;M&&M.z>=g&&_&&_.z<=v;){if(M.x>=u&&M.x<=y&&M.y>=m&&M.y<=p&&M!==s&&M!==a&&is(o,h,l,d,c,f,M.x,M.y)&&Ee(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=u&&_.x<=y&&_.y>=m&&_.y<=p&&_!==s&&_!==a&&is(o,h,l,d,c,f,_.x,_.y)&&Ee(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=g;){if(M.x>=u&&M.x<=y&&M.y>=m&&M.y<=p&&M!==s&&M!==a&&is(o,h,l,d,c,f,M.x,M.y)&&Ee(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=v;){if(_.x>=u&&_.x<=y&&_.y>=m&&_.y<=p&&_!==s&&_!==a&&is(o,h,l,d,c,f,_.x,_.y)&&Ee(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Q0(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!Aa(s,r)&&jh(s,n,n.next,r)&&nr(s,r)&&nr(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ir(n),ir(n.next),n=i=r),n=n.next}while(n!==i);return Di(n)}function tx(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&cx(a,o)){let l=Qh(a,o);a=Di(a,a.next),l=Di(l,l.next),er(a,t,e,n,s,r,0),er(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function ex(i,t,e,n){let s=[],r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Kh(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(lx(c));for(s.sort(nx),r=0;r<s.length;r++)e=ix(s[r],e);return e}function nx(i,t){return i.x-t.x}function ix(i,t){let e=sx(i,t);if(!e)return t;let n=Qh(e,i);return Di(n,n.next),Di(e,e.next)}function sx(i,t){let e=t,n=-1/0,s,r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){let f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let o=s,l=s.x,c=s.y,h=1/0,d;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&is(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(d=Math.abs(a-e.y)/(r-e.x),nr(e,i)&&(d<h||d===h&&(e.x>s.x||e.x===s.x&&rx(s,e)))&&(s=e,h=d)),e=e.next;while(e!==o);return s}function rx(i,t){return Ee(i.prev,i,t.prev)<0&&Ee(t.next,i,i.next)<0}function ax(i,t,e,n){let s=i;do s.z===0&&(s.z=Ll(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,ox(s)}function ox(i){let t,e,n,s,r,a,o,l,c=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(a>1);return i}function Ll(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function lx(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function is(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function cx(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!hx(i,t)&&(nr(i,t)&&nr(t,i)&&ux(i,t)&&(Ee(i.prev,i,t.prev)||Ee(i,t.prev,t))||Aa(i,t)&&Ee(i.prev,i,i.next)>0&&Ee(t.prev,t,t.next)>0)}function Ee(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Aa(i,t){return i.x===t.x&&i.y===t.y}function jh(i,t,e,n){let s=$r(Ee(i,t,e)),r=$r(Ee(i,t,n)),a=$r(Ee(e,n,i)),o=$r(Ee(e,n,t));return!!(s!==r&&a!==o||s===0&&qr(i,e,t)||r===0&&qr(i,n,t)||a===0&&qr(e,i,n)||o===0&&qr(e,t,n))}function qr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function $r(i){return i>0?1:i<0?-1:0}function hx(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&jh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function nr(i,t){return Ee(i.prev,i,i.next)<0?Ee(i,t,i.next)>=0&&Ee(i,i.prev,t)>=0:Ee(i,t,i.prev)<0||Ee(i,i.next,t)<0}function ux(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Qh(i,t){let e=new Dl(i.i,i.x,i.y),n=new Dl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function wh(i,t,e,n){let s=new Dl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ir(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Dl(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function dx(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Vn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Th(t),Eh(n,t);let a=t.length;e.forEach(Th);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Eh(n,e[l]);let o=J0.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Th(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Eh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var ze=class i extends va{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var Ma=class i extends xe{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],h=[],d=t,f=(e-t)/s,u=new U,m=new Ut;for(let y=0;y<=s;y++){for(let p=0;p<=n;p++){let g=r+p/n*a;u.x=d*Math.cos(g),u.y=d*Math.sin(g),l.push(u.x,u.y,u.z),c.push(0,0,1),m.x=(u.x/e+1)/2,m.y=(u.y/e+1)/2,h.push(m.x,m.y)}d+=f}for(let y=0;y<s;y++){let p=y*(n+1);for(let g=0;g<n;g++){let v=g+p,M=v,_=v+n+1,P=v+n+2,A=v+1;o.push(M,_,A),o.push(_,P,A)}}this.setIndex(o),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(c,3)),this.setAttribute("uv",new Yt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},ys=class i extends xe{constructor(t=new Xn([new Ut(0,.5),new Ut(-.5,-.5),new Ut(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],a=[],o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Yt(s,3)),this.setAttribute("normal",new Yt(r,3)),this.setAttribute("uv",new Yt(a,2));function c(h){let d=s.length/3,f=h.extractPoints(e),u=f.shape,m=f.holes;Vn.isClockWise(u)===!1&&(u=u.reverse());for(let p=0,g=m.length;p<g;p++){let v=m[p];Vn.isClockWise(v)===!0&&(m[p]=v.reverse())}let y=Vn.triangulateShape(u,m);for(let p=0,g=m.length;p<g;p++){let v=m[p];u=u.concat(v)}for(let p=0,g=u.length;p<g;p++){let v=u[p];s.push(v.x,v.y,0),r.push(0,0,1),a.push(v.x,v.y)}for(let p=0,g=y.length;p<g;p++){let v=y[p],M=v[0]+d,_=v[1]+d,P=v[2]+d;n.push(M,_,P),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return fx(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let a=e[t.shapes[s]];n.push(a)}return new i(n,t.curveSegments)}};function fx(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var ke=class i extends xe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new U,f=new U,u=[],m=[],y=[],p=[];for(let g=0;g<=n;g++){let v=[],M=g/n,_=0;g===0&&a===0?_=.5/e:g===n&&l===Math.PI&&(_=-.5/e);for(let P=0;P<=e;P++){let A=P/e;d.x=-t*Math.cos(s+A*r)*Math.sin(a+M*o),d.y=t*Math.cos(a+M*o),d.z=t*Math.sin(s+A*r)*Math.sin(a+M*o),m.push(d.x,d.y,d.z),f.copy(d).normalize(),y.push(f.x,f.y,f.z),p.push(A+_,1-M),v.push(c++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<e;v++){let M=h[g][v+1],_=h[g][v],P=h[g+1][v],A=h[g+1][v+1];(g!==0||a>0)&&u.push(M,_,A),(g!==n-1||l<Math.PI)&&u.push(_,P,A)}this.setIndex(u),this.setAttribute("position",new Yt(m,3)),this.setAttribute("normal",new Yt(y,3)),this.setAttribute("uv",new Yt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var pn=class i extends xe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],h=new U,d=new U,f=new U;for(let u=0;u<=n;u++)for(let m=0;m<=s;m++){let y=m/s*r,p=u/n*Math.PI*2;d.x=(t+e*Math.cos(p))*Math.cos(y),d.y=(t+e*Math.cos(p))*Math.sin(y),d.z=e*Math.sin(p),o.push(d.x,d.y,d.z),h.x=t*Math.cos(y),h.y=t*Math.sin(y),f.subVectors(d,h).normalize(),l.push(f.x,f.y,f.z),c.push(m/s),c.push(u/n)}for(let u=1;u<=n;u++)for(let m=1;m<=s;m++){let y=(s+1)*u+m-1,p=(s+1)*(u-1)+m-1,g=(s+1)*(u-1)+m,v=(s+1)*u+m;a.push(y,p,v),a.push(p,g,v)}this.setIndex(a),this.setAttribute("position",new Yt(o,3)),this.setAttribute("normal",new Yt(l,3)),this.setAttribute("uv",new Yt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var vs=class i extends xe{constructor(t=new ga(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new U,l=new U,c=new Ut,h=new U,d=[],f=[],u=[],m=[];y(),this.setIndex(m),this.setAttribute("position",new Yt(d,3)),this.setAttribute("normal",new Yt(f,3)),this.setAttribute("uv",new Yt(u,2));function y(){for(let M=0;M<e;M++)p(M);p(r===!1?e:0),v(),g()}function p(M){h=t.getPointAt(M/e,h);let _=a.normals[M],P=a.binormals[M];for(let A=0;A<=s;A++){let C=A/s*Math.PI*2,T=Math.sin(C),b=-Math.cos(C);l.x=b*_.x+T*P.x,l.y=b*_.y+T*P.y,l.z=b*_.z+T*P.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function g(){for(let M=1;M<=e;M++)for(let _=1;_<=s;_++){let P=(s+1)*(M-1)+(_-1),A=(s+1)*M+(_-1),C=(s+1)*M+_,T=(s+1)*(M-1)+_;m.push(P,A,T),m.push(A,C,T)}}function v(){for(let M=0;M<=e;M++)for(let _=0;_<=s;_++)c.x=M/e,c.y=_/s,u.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new Il[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Ke=class extends Ii{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vh,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Yr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function px(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ms=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ul=class extends Ms{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wc,endingEnd:wc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Tc:r=t,o=2*e-n;break;case Ec:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Tc:a=t,l=2*n-e;break;case Ec:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,u=this._weightNext,m=(n-e)/(s-e),y=m*m,p=y*m,g=-f*p+2*f*y-f*m,v=(1+f)*p+(-1.5-2*f)*y+(-.5+f)*m+1,M=(-1-u)*p+(1.5+u)*y+.5*m,_=u*p-u*y;for(let P=0;P!==o;++P)r[P]=g*a[h+P]+v*a[c+P]+M*a[l+P]+_*a[d+P];return r}},Nl=class extends Ms{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),d=1-h;for(let f=0;f!==o;++f)r[f]=a[c+f]*d+a[l+f]*h;return r}},Fl=class extends Ms{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Mn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Yr(e,this.TimeBufferType),this.values=Yr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Yr(t.times,Array),values:Yr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Fl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Nl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ul(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ta:e=this.InterpolantFactoryMethodDiscrete;break;case ll:e=this.InterpolantFactoryMethodLinear;break;case Xa:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ta;case this.InterpolantFactoryMethodLinear:return ll;case this.InterpolantFactoryMethodSmooth:return Xa}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&px(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Xa,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*n,f=d-n,u=d+n;for(let m=0;m!==n;++m){let y=e[d+m];if(y!==e[f+m]||y!==e[u+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,f=a*n;for(let u=0;u!==n;++u)e[f+u]=e[d+u]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=ll;var Ui=class extends Mn{constructor(t,e,n){super(t,e,n)}};Ui.prototype.ValueTypeName="bool";Ui.prototype.ValueBufferType=Array;Ui.prototype.DefaultInterpolation=ta;Ui.prototype.InterpolantFactoryMethodLinear=void 0;Ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Ol=class extends Mn{};Ol.prototype.ValueTypeName="color";var Bl=class extends Mn{};Bl.prototype.ValueTypeName="number";var zl=class extends Ms{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)li.slerpFlat(r,0,a,c-o,a,c,l);return r}},ba=class extends Mn{InterpolantFactoryMethodLinear(t){return new zl(this.times,this.values,this.getValueSize(),t)}};ba.prototype.ValueTypeName="quaternion";ba.prototype.InterpolantFactoryMethodSmooth=void 0;var Ni=class extends Mn{constructor(t,e,n){super(t,e,n)}};Ni.prototype.ValueTypeName="string";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=ta;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var kl=class extends Mn{};kl.prototype.ValueTypeName="vector";var Vl=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=c.length;d<f;d+=2){let u=c[d],m=c[d+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null}}},mx=new Vl,Hl=class{constructor(t){this.manager=t!==void 0?t:mx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Hl.DEFAULT_MATERIAL_NAME="__DEFAULT";var Sa=class extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},bs=class extends Sa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},bo=new ge,Ah=new U,Ch=new U,Gl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ut(512,512),this.map=null,this.mapPass=null,this.matrix=new ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new js,this._frameExtents=new Ut(1,1),this._viewportCount=1,this._viewports=[new Ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Ah.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ah),Ch.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ch),e.updateMatrixWorld(),bo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(bo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Wl=class extends Gl{constructor(){super(new ha(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ss=class extends Sa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new Wl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var nc="\\[\\]\\.:\\/",gx=new RegExp("["+nc+"]","g"),ic="[^"+nc+"]",xx="[^"+nc.replace("\\.","")+"]",_x=/((?:WC+[\/:])*)/.source.replace("WC",ic),yx=/(WCOD+)?/.source.replace("WCOD",xx),vx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ic),Mx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ic),bx=new RegExp("^"+_x+yx+vx+Mx+"$"),Sx=["material","materials","bones","map"],Xl=class{constructor(t,e,n){let s=n||we.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},we=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(gx,"")}static parseTrackName(t){let e=bx.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Sx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};we.Composite=Xl;we.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};we.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};we.prototype.GetterByBindingType=[we.prototype._getValue_direct,we.prototype._getValue_array,we.prototype._getValue_arrayElement,we.prototype._getValue_toArray];we.prototype.SetterByBindingTypeAndVersioning=[[we.prototype._setValue_direct,we.prototype._setValue_direct_setNeedsUpdate,we.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[we.prototype._setValue_array,we.prototype._setValue_array_setNeedsUpdate,we.prototype._setValue_array_setMatrixWorldNeedsUpdate],[we.prototype._setValue_arrayElement,we.prototype._setValue_arrayElement_setNeedsUpdate,we.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[we.prototype._setValue_fromArray,we.prototype._setValue_fromArray_setNeedsUpdate,we.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Zx=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");function eu(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new xe,c=0;for(let h=0;h<i.length;++h){let d=i[h],f=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let u in d.attributes){if(!n.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+u+'" attribute exists among all geometries, or in none of them.'),null;r[u]===void 0&&(r[u]=[]),r[u].push(d.attributes[u]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let u in d.morphAttributes){if(!s.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[u]===void 0&&(a[u]=[]),a[u].push(d.morphAttributes[u])}if(t){let u;if(e)u=d.index.count;else if(d.attributes.position!==void 0)u=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,u,h),c+=u}}if(e){let h=0,d=[];for(let f=0;f<i.length;++f){let u=i[f].index;for(let m=0;m<u.count;++m)d.push(u.getX(m)+h);h+=i[f].attributes.position.count}l.setIndex(d)}for(let h in r){let d=tu(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<d;++f){let u=[];for(let y=0;y<a[h].length;++y)u.push(a[h][y][f]);let m=tu(u);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function tu(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new $e(a,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let d=l/e;for(let f=0,u=h.count;f<u;f++)for(let m=0;m<e;m++){let y=h.getComponent(f,m);o.setComponent(f+d,m,y)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}var Jt=nn.smoothstep;function Ca(i){i=String(i).replace("#",""),i.length===3&&(i=i.split("").map(e=>e+e).join(""));let t=parseInt(i,16);return[t>>16&255,t>>8&255,t&255]}function wx(i,t,e){return"#"+[i,t,e].map(n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0")).join("")}function qn(i,t,e){let n=Ca(i),s=Ca(t);return wx(n[0]+(s[0]-n[0])*e,n[1]+(s[1]-n[1])*e,n[2]+(s[2]-n[2])*e)}function Es(i){let[t,e,n]=Ca(i).map(s=>(s/=255,s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4)));return .2126*t+.7152*e+.0722*n}var nu=(i,t)=>qn(i,"#ffffff",t);function Tx(i,t,e){let n=i.attributes.normal,s=new U,r=new U;for(let a=0;a<=e;a++){let o=a*(t+1),l=o+t;if(a===0||a===e){for(let c=o;c<=l;c++)n.setXYZ(c,0,a===0?1:-1,0);continue}s.fromBufferAttribute(n,o).add(r.fromBufferAttribute(n,l)).normalize(),n.setXYZ(o,s.x,s.y,s.z),n.setXYZ(l,s.x,s.y,s.z)}}function hn(i,t,e,n){let s=new ke(1,i,t),r=s.attributes.position,a=new U,o=new Gt,l=n?new Float32Array(r.count*3):null;for(let c=0;c<r.count;c++)if(a.fromBufferAttribute(r,c).normalize(),n&&(n(a.x,a.y,a.z,o),o.toArray(l,c*3)),e){let h=e(a.x,a.y,a.z);r.setXYZ(c,a.x*h,a.y*h,a.z*h)}return n&&s.setAttribute("color",new $e(l,3)),e&&(s.computeVertexNormals(),Tx(s,i,t)),s}function su(i,t){let e=[],n=Math.PI*(3-Math.sqrt(5));for(let s=0;s<i;s++){let r=1-2*(s+.5)/i,a=Math.sqrt(1-r*r),o=s*n+t+.3*Math.sin(s*7.3+t);e.push([a*Math.cos(o),r,a*Math.sin(o)])}return e}function hi(i,t,e){let n=su(i,e);return(s,r,a)=>{let o=0;for(let l of n){let c=1-(s*l[0]+r*l[1]+a*l[2]);c<.25&&(o+=Math.exp(-c*t))}return Math.min(1.25,o)}}function As(i){let t=i?54:73,e=Math.PI*(3-Math.sqrt(5)),n=[];for(let r=0;r<t;r++){let a=1-2*(r+.5)/t,o=Math.sqrt(1-a*a),l=r*e+.13*Math.sin(r*5.1),c=new U(o*Math.cos(l),a,o*Math.sin(l)),h=new U(-Math.sin(l),0,Math.cos(l));n.push({center:c,east:h,north:new U().crossVectors(h,c),phase:r*e})}let s=new U;return(r,a,o)=>{s.set(r,a,o);let l=0,c=0;for(let{center:h,east:d,north:f,phase:u}of n){let m=1-s.dot(h);if(m>=.12)continue;l+=Math.exp(-m*(i?70:89));let y=Math.atan2(s.dot(f),s.dot(d))+u,p=Math.sqrt(2*m)-(.123+.036*Math.cos(y));c=Math.max(c,Math.exp(-p*p/.0017)*(.5+.5*Math.sin(y)))}return{r:1+.088*l-.021*c,v:.93+.07*Math.min(1,l)-.07*c}}}function bn(i,t,e,n,s,r,a=.18){let o=(i-e)/s,l=(t-n)/r;return 1-Jt(o*o+l*l,1-a,1+a)}function Ex(i,t,e,n,s,r){let a=s-e,o=r-n,l=a*a+o*o,c=Math.max(0,Math.min(1,((i-e)*a+(t-n)*o)/l)),h=i-e-a*c,d=t-n-o*c;return Math.sqrt(h*h+d*d)}function iu(i,t,e,n){let s=(i.x-e.x)/n.x,r=(i.y-e.y)/n.y,a=(i.z-e.z)/n.z,o=t.x/n.x,l=t.y/n.y,c=t.z/n.z,h=o*o+l*l+c*c,d=s*o+r*l+a*c,f=d*d-h*(s*s+r*r+a*a-1);return f>=0?Math.max(0,(Math.sqrt(f)-d)/h):0}function Ax(i){let t=new Map,e=new ke(1,16,12),n=new ke(1,10,8),s={sphere:e,tiny:n,seg:r=>Math.max(8,Math.round(r*i/2)*2),std(r,a=.9,o=0){let l=r+"|"+a+"|"+o;return t.has(l)||t.set(l,new Ke({color:r,roughness:a,metalness:o})),t.get(l)},flat(r,a=1){let o="flat|"+r+"|"+a;return t.has(o)||t.set(o,new Cn({color:r,transparent:a<1,opacity:a,depthWrite:a>=1})),t.get(o)},paint:new Ke({vertexColors:!0,roughness:.9}),cloth:new Ke({vertexColors:!0,roughness:.95,side:Pe}),add(r,a,o,l=0,c=0,h=0,d=1,f=d,u=d){let m=new fe(a,o);return m.position.set(l,c,h),m.scale.set(d,f,u),m.castShadow=!0,m.receiveShadow=!0,r.add(m),m},oval(r,a,o,l,c,h,d,f){return s.add(r,e,a,o,l,c,h,d,f)},dot(r,a,o,l,c,h,d,f){return s.add(r,n,a,o,l,c,h,d,f)},group(r,a=0,o=0,l=0,c){let h=new Re;return h.position.set(a,o,l),c&&(h.name=c),r.add(h),h}};return s}function Cs(i,t,e,n,s){let r=new Li(e.map(o=>new U(...o))),a=new fe(new vs(r,8,n,5,!1),s);return t.add(a),a}function or(i,t,e,n,s){let r=new Li(i.map(d=>new U(...d))),a=new vs(r,t,1,e,!1),o=a.attributes.position,l=a.attributes.normal,c=[],h=new Gt;for(let d=0;d<=t;d++){let f=d/t,u=r.getPointAt(f);for(let m=0;m<=e;m++){let y=d*(e+1)+m,p=n(f,m/e);o.setXYZ(y,u.x+l.getX(y)*p,u.y+l.getY(y)*p,u.z+l.getZ(y)*p),s(f,m/e,h),h.toArray(c,y*3)}}return a.setAttribute("color",new Yt(c,3)),a.computeVertexNormals(),a}function Rs(i,t,e={}){let n=i,s=n.colors,r=n.marks||{},a=n.species==="cat",o=n.coat==="fluffy",l=n.coat==="long",c=n.coat==="curly",h=o||l||c,d=n.legs==="short",f=Math.max(.4,Math.min(1,e.detail||1)),u=Ax(f),m=$=>new Gt($),y=u.seg,p=new Re;p.name="pet3d";let g=s.chest===s.body?nu(s.body,Es(s.body)>.7?0:.1):s.chest,v=s.face===s.main?nu(s.main,Es(s.main)>.7?0:.16):s.face,M=r.patchL&&s.ear===s.main?r.patchL:s.ear,_=r.patchR&&s.ear===s.main?r.patchR:s.ear,P=$=>a?qn($,"#F4AEBB",.7):qn($,"#F3C2C9",.55),A=s.chest!==s.body?qn(s.body,s.chest,.5):s.body,C=n.face==="mask"?s.face:r.patchL||s.main,T=Es(C)<.12,b=Es(r.mask||v)<.12?"#F4E6EA":"#3A2A33",x=r.saddle||s.body,w={main:m(s.main),body:m(s.body),face:m(s.face),chest:m(g),paws:m(s.paws),muzzle:m(v),blush:m("#FF9DB2"),ruff:m(A),haunch:m(x)},I={};for(let $ of["stripes","spots","patchL","patchR","brows","mask","saddle"])r[$]&&(I[$]=m(r[$]));let L=d?.24:a?.36:.38,B=a?.27:.3,X=a?.25:.27,G=(a?.37:.4)*(d?1.18:1),ht=L+.09,N=a?[.41,.335,.35]:[.4,.34,.355],st=ht+X*.95+N[1]*.55,ft=G*.78,J=I.spots?su(34,1.7).filter($=>$[1]>-.4):[],it=o?hi(90,110,.4):l?hi(70,90,1.1):null,vt=c?As(!1):null,W=($,j,Z)=>{if(vt)return vt($,j,Z).r;let et=1;return it&&(et+=(o?.06:.04)*(it($,j,Z)-.45)),et},rt=new Gt,mt=s.body!==s.main,k=($,j,Z)=>mt?Jt(j,-.34,-.18)*(1-Jt(Z,.5,.78)*(1-Jt(j,.55,.8))):1,tt=($,j,Z,et)=>{if(et.copy(w.main).lerp(w.body,k($,j,Z)),I.saddle&&et.lerp(I.saddle,Jt(j,.12,.38)*(1-Jt(Z,.4,.72))),r.bodyPatch){let lt=(Lt,bt,yt,Vt)=>1-Jt(1-($*Lt+j*bt+Z*yt),Vt*.75,Vt*1.25);I.patchR&&(et.lerp(I.patchR,lt(.62,.55,.1,.22)),et.lerp(I.patchR,lt(-.2,.62,-.62,.14))),I.patchL&&(et.lerp(I.patchL,lt(-.78,-.05,-.25,.2)),et.lerp(I.patchL,lt(.35,.3,-.75,.12)))}let gt=Jt(Z,.42,.72)*(1-Jt(j,.3,.62))+Jt(-j,.55,.85)*.9;if(et.lerp(w.chest,Math.min(1,gt)),I.stripes){let lt=Jt(j,-.5,-.25)*(1-Jt(Z,.42,.62))*(1-Jt(-Z,.72,.9)*(1-Jt(j,.35,.6))),Lt=Z*3.1-.28*(1-j)*(1-j),bt=1-Jt(Math.abs((Lt%1+1)%1-.5),.16,.24),yt=(1-Jt(Math.abs($),.07,.12))*Jt(j,.8,.88)*(1-Jt(Z,.5,.7));et.lerp(I.stripes,Math.max(bt*lt,yt))}if(I.spots){let lt=0;for(let Lt of J){let bt=1-($*Lt[0]+j*Lt[1]+Z*Lt[2]);lt=Math.max(lt,1-Jt(bt,.008,.016))}et.lerp(I.spots,lt*(1-Jt(Z,.5,.7)))}},at=hn(y(56),y(40),W,tt),xt=u.add(p,at,u.paint,0,ht,0,B,X,G);xt.name="body";let Et=[{c:xt.position.clone(),r:new U(B,X,G)}];if(l){let $=hi(70,90,2.3),j=d?.2:.34,Z=hn(y(56),y(36),(et,gt,lt)=>{let Lt=1+.03*($(et,gt,lt)-.45);return gt<0&&(Lt*=1+j*Math.pow(-gt,1.8)*(1+.1*Math.sin(Math.atan2(lt,et)*11))),Lt},(et,gt,lt,Lt)=>{Lt.copy(w.body),mt&&Lt.lerp(w.main,Jt(-gt,.3,.85)),Lt.lerp(w.chest,Jt(lt,.45,.8)*(1-Jt(gt,.2,.5))),Lt.multiplyScalar(.97)});u.add(p,Z,u.paint,0,ht-.01,-.01,B*1.03,X*.98,G*1.01)}let Ct=[],_t=c?As(!0):null;for(let $ of[-1,1])for(let j of[-1,1]){let Z=u.group(p,$*B*.58,L,j*G*.56);Z.userData.hip=Z.position.clone(),Z.userData.phase=$*j>0?0:Math.PI;let et=j<0,gt=L/.38,lt=et?w.haunch:w.body,Lt=mt?w.main:w.body,bt=o||l?hi(14,30,$+j*2):null,yt=_t?(Ie,ve,E)=>_t(Ie,ve,E).r:bt?(Ie,ve,E)=>1+.06*(bt(Ie,ve,E)-.4):null,Vt=hn(y(28),y(20),yt,(Ie,ve,E,O)=>{O.copy(lt),et&&I.saddle&&O.lerp(w.body,Jt(-ve,.3,.9)*.6),mt&&O.lerp(w.main,Jt(-ve,-.45,.15))});u.add(Z,Vt,u.paint,0,-L*.12,0,et?.125:.105,L*.42,et?.135:.11);let Ae=s.paws!==(mt?s.main:s.body),Ue=hn(y(18),y(14),null,(Ie,ve,E,O)=>{if(O.copy(Lt),Ae&&O.lerp(w.paws,Jt(-ve,.05,.35)),I.stripes&&!d){let Y=1-Jt(Math.abs(((ve*1.6+.2)%1+1)%1-.5),.14,.22);O.lerp(I.stripes,Y*Jt(ve,-.4,-.2)*(1-Jt(ve,.6,.8)))}});u.add(Z,Ue,u.paint,0,-L*.6,0,.078*Math.max(.9,gt),L*.34,.082*Math.max(.9,gt));let Ve=u.oval(Z,u.std(s.paws),0,.08-L,.03,.088,.075,.115);Z.userData.paw=Ve,Ct.push(Z),c&&u.add(Z,hn(y(20),y(14),(Ie,ve,E)=>_t(Ie,ve,E).r,(Ie,ve,E,O)=>O.copy(w.body).multiplyScalar(_t(Ie,ve,E).v)),u.paint,0,.14-L,0,.1,.07,.1)}let D=u.group(p,0,st,ft,"head"),ae=a?.4:.383,Kt=a?.06:.04,jt=a?{short:109,medium:111,long:113}[n.muzzle]:{short:112,medium:116,long:119}[n.muzzle],zt=(100-(jt+2))/51,oe=a?.6:.58,Ht=I.spots?[[100,64,4],[140,60,5],[124,72,3.5],[70,94,4],[170,90,4.5]].map(([$,j,Z])=>[($-120)/60,(100-j)/51,Z/55]):[],R=a?(100-(jt-4))/51:(100-(jt+2))/51,S=a?[.63,.63]:[.52,.51],q=($,j,Z,et)=>{let gt=$,lt=j,Lt=Jt(Z,-.3,.12);et.copy(w.main),I.patchL&&et.lerp(I.patchL,bn(gt,lt,-.5,.27,.64,.74,.22)),I.patchR&&et.lerp(I.patchR,bn(gt,lt,.5,.27,.64,.74,.22));let bt=0;if(n.face==="lower")bt=Math.max(bn(gt,lt,0,-.59,a?.83:.8,.59),Jt(-lt,.78,.92));else if(n.face==="mask"){bt=Math.max(bn(gt,lt,0,-.39,.97,.67),bn(gt,lt,-.38,.04,.27,.25),bn(gt,lt,.38,.04,.27,.25),Jt(-lt,.75,.9));let yt=.133-.07*(1.06-lt)/.9;lt>.12&&(bt*=Jt(Math.abs(gt),yt-.03,yt+.03))}else if(n.face==="hachiware"){let yt=Math.max(-.25,.71-2.6*Math.abs(gt));bt=1-Jt(lt-yt,-.05,.05)}else if(n.face==="blaze"){let yt=lt>.39?.085:.085+(.39-lt)*.62;bt=(1-Jt(Math.abs(gt)-yt,-.03,.03))*(1-Jt(lt,1,1.1)),bt=Math.max(bt,Jt(-lt,.8,.95))}if(bt>0&&et.lerp(w.face,bt*Lt),I.stripes){let yt=[[-.133,.86,-.1,.63],[0,.94,0,.67],[.133,.86,.1,.63],[-1,-.04,-.77,-.1],[-.97,-.24,-.77,-.24],[1,-.04,.77,-.1],[.97,-.24,.77,-.24]],Vt=0;for(let Ve of yt)Vt=Math.max(Vt,1-Jt(Ex(gt,lt,...Ve),.03,.05));et.lerp(I.stripes,Vt*Lt);let Ae=1-Jt(Z,-.4,-.05),Ue=Math.atan2($,-Z)/.42;et.lerp(I.stripes,Ae*(1-Jt(Math.abs((Ue%1+1.5)%1-.5),.17,.26))*Jt(lt,-.45,-.15))}if(I.spots){let yt=0;for(let[Vt,Ae,Ue]of Ht)yt=Math.max(yt,bn(gt,lt,Vt,Ae,Ue,Ue*1.15,.3));et.lerp(I.spots,yt*Lt)}I.brows&&et.lerp(I.brows,Math.max(bn(gt,lt,-ae,.35,.092,.078,.3),bn(gt,lt,ae,.35,.092,.078,.3))*Lt),I.mask&&et.lerp(I.mask,.92*(1-Jt((gt/S[0])**2+((lt-R)/S[1])**2,.25,1.05))*Lt),et.lerp(w.blush,.42*Math.max(bn(gt,lt,-oe,zt,.14,.1,.5),bn(gt,lt,oe,zt,.14,.1,.5))*Jt(Z,.2,.4))},ct=o||l?hi(80,105,2.1):null,ut=c?As(!1):null,nt=($,j)=>Jt(j,.2,.6)*(1-Jt($,.4,.75)),Ft=($,j,Z)=>ut?1+(ut($,j,Z).r-1)*(1-nt(j,Z))*1.1:ct?1+.045*(ct($,j,Z)-.45)*(1-nt(j,Z)):1,It=hn(y(64),y(48),ut||ct?Ft:null,($,j,Z,et)=>{q($,j,Z,et),ut&&et.multiplyScalar(1-(1-ut($,j,Z).v)*(1-nt(j,Z)))});u.add(D,It,u.paint,0,0,0,N[0],N[1],N[2]).name="skull",Et.push({c:new U(0,st,ft),r:new U(...N),head:!0});let Pt=($,j,Z,et=0)=>{let gt=new U($,j,Z??Math.sqrt(Math.max(0,1-$*$-j*j))).normalize(),lt=new U(gt.x*N[0],gt.y*N[1],gt.z*N[2]),Lt=new U(lt.x/N[0]**2,lt.y/N[1]**2,lt.z/N[2]**2).normalize();return{p:lt.addScaledVector(Lt,-et),n:Lt}},Qt=[],pt=a?[.068,.076,.03]:[.06,.07,.03],Ot=Es(s.eye)>.06;for(let $ of[-1,1]){let{p:j,n:Z}=Pt($*ae,Kt,null,.012),et=u.group(D,j.x,j.y,j.z);et.quaternion.setFromUnitVectors(new U(0,0,1),Z.clone().add(new U(0,0,.7)).normalize()),T&&u.oval(et,u.std(qn(C,"#ffffff",.42)),0,0,-.004,pt[0]*1.24,pt[1]*1.22,pt[2]*.7),u.oval(et,u.std(s.eye,.28),0,0,0,...pt),Ot&&u.oval(et,u.std("#1E1620",.3),0,-.002,pt[2]*.72,a?.024:.029,a?.056:.04,.012),u.dot(et,u.flat("#ffffff"),.022,.028,pt[2]*.92,.021,.021,.01),u.dot(et,u.flat("#ffffff",.85),-.022,-.03,pt[2]*.85,.01,.01,.006),Qt.push(et)}let kt=null;if(a){let $=-N[1]*(jt-100+6)/51,j=Math.sqrt(1-($/N[1])**2)*N[2]-.035;for(let bt of[-1,1])u.oval(D,u.std(v),bt*.052,$,j,.068,.055,.06);u.oval(D,u.std(v),0,$-.04,j-.01,.05,.035,.045);let Z=-N[1]*(jt-100)/51,et=Math.sqrt(1-(Z/N[1])**2)*N[2]+.022,gt=u.add(D,new Xe(.034,.036,3),u.std(s.nose,.45),0,Z+.004,et);gt.rotation.set(-Math.PI/2+.25,0,Math.PI),gt.scale.set(1,1,.55);let lt=u.std(b,.6);Cs(u,D,[[0,Z-.014,et-.002],[0,Z-.03,et+.004]],.005,lt);for(let bt of[-1,1])Cs(u,D,[[0,Z-.03,et+.004],[bt*.02,Z-.045,et+.006],[bt*.045,Z-.033,et+.002]],.005,lt);let Lt=Es(s.main)<.2?u.flat("#ffffff",.65):u.flat("#3C2837",.45);for(let bt of[-1,1])for(let yt of[-1,0,1])Cs(u,D,[[bt*.07,$+yt*.012,j+.04],[bt*.2,$+yt*.03+.006,j+.005],[bt*.3,$+yt*.05,j-.05]],.0035,Lt);kt=u.oval(D,u.std("#F38BA0",.5),0,$-.055,j+.03,.026,.014,.03),kt.rotation.x=.45,kt.visible=!1}else{let $={short:[.17,.115,.12],medium:[.18,.125,.16],long:[.185,.13,.21]}[n.muzzle],j=-N[1]*{short:.3,medium:.34,long:.38}[n.muzzle],Z=Math.sqrt(1-(j/N[1])**2)*N[2]+{short:.055,medium:.095,long:.145}[n.muzzle]-$[2],et=hn(y(32),y(24),null,(yt,Vt,Ae,Ue)=>{Ue.copy(w.muzzle),I.mask&&Ue.lerp(I.mask,.9*Jt(Ae,-.4,.35))});u.add(D,et,u.paint,0,j,Z,...$).name="muzzle";let gt=(yt,Vt,Ae)=>[yt*$[0],j+Vt*$[1],Z+Math.sqrt(Math.max(0,1-yt*yt-Vt*Vt))*$[2]+Ae],lt=gt(0,.5,-.01),Lt=n.muzzle==="short"?.9:1;u.oval(D,u.std(s.nose,.35),lt[0],lt[1],lt[2],.062*Lt,.043*Lt,.042*Lt),u.dot(D,u.flat("#ffffff",.55),-.018*Lt,lt[1]+.018,lt[2]+.03,.012,.007,.005);let bt=u.std(b,.6);Cs(u,D,[gt(0,.18,.002),gt(0,-.08,.002)],.0055,bt);for(let yt of[-1,1])Cs(u,D,[gt(0,-.08,.002),gt(yt*.2,-.24,.002),gt(yt*.42,-.06,.002)],.0055,bt);kt=u.oval(D,u.std("#F38BA0",.5),0,j-$[1]*.72,Z+$[2]*.62,.042,.022,.05),kt.rotation.x=.45,kt.visible=!1}let Zt=[],Nt=c?As(!0):null,ie=o||l?hi(18,30,3.3):null,te=[[1,0],[.94,.2],[.74,.45],[.46,.72],[.16,.94],[.01,1]],ce=a||n.ear==="small"?te:[[.67,0],[.97,.17],[1,.32],[.85,.52],[.54,.78],[.15,.96],[.005,1]],F=($,j,Z,et,gt=.55)=>{let lt=ce[0][0],Lt=[[lt*.92,-.6],[lt*1.02,-.28],...ce],bt=new ya(Lt.map(([Vt,Ae])=>new Ut(Vt*j,Ae*Z)),22),yt=u.add($,bt,u.std(et),0,0,0);yt.scale.z=gt,u.oval($,u.std(P(et)),0,Z*.4,j*gt*.52,j*.5,Z*.32,j*.1)};for(let $ of[-1,1]){let j=$<0?M:_,Z,et,gt=0,lt=0,Lt=0,bt=!1,yt=n.ear;if(yt==="pointy"||yt==="big"||yt==="small"){let Vt=a?{pointy:[.16,.25,.58,.72,.1,.3],big:[.175,.31,.6,.7,.06,.36],small:[.13,.17,.55,.76,.12,.24]}[yt]:{pointy:[.15,.27,.56,.74,.06,.3],big:[.175,.37,.6,.7,.02,.46],small:[.105,.16,.5,.8,.12,.2]}[yt];Z=Pt($*Vt[2],Vt[3],Vt[4],yt==="small"&&h?0:.045),et=u.group(D,Z.p.x,Z.p.y,Z.p.z),Lt=-$*Vt[5],lt=$*.28,F(et,Vt[0],Vt[1],j)}else if(yt==="semi"){Z=Pt($*.6,.72,.04,.04),et=u.group(D,Z.p.x,Z.p.y,Z.p.z),Lt=-$*.3,lt=$*.2,F(et,.13,.16,j);let Vt=u.group(et,0,.13,.01);Vt.rotation.x=2.05,u.oval(Vt,u.std(j),0,.06,.012,.105,.075,.028)}else if(yt==="fold")Z=Pt($*.45,.84,.25,.01),et=u.group(D,Z.p.x,Z.p.y,Z.p.z),gt=1.2,Lt=-$*.25,u.oval(et,u.std(j),0,.035,0,.1,.065,.035);else{let Vt=yt==="long";Z=Pt($*.9,.44,-.02,.03),et=u.group(D,Z.p.x,Z.p.y,Z.p.z),Lt=$*.16,bt=!0;let Ae=Vt?h?[.115,.27,.15]:[.09,.26,.13]:[.085,.19,.125],Ue=Nt?hn(y(28),y(22),(Ve,Ie,ve)=>Nt(Ve,Ie,ve).r,(Ve,Ie,ve,E)=>E.set(j).multiplyScalar(Nt(Ve,Ie,ve).v)):ie&&Vt?hn(y(24),y(20),(Ve,Ie,ve)=>1+.07*(ie(Ve,Ie,ve)-.4),(Ve,Ie,ve,E)=>E.set(j)):null;Ue?u.add(et,Ue,u.paint,$*.035,-(Vt?.23:.16),0,...Ae):u.oval(et,u.std(j),$*.03,-(Vt?.23:.16),0,...Ae)}et.rotation.set(gt,lt,Lt),Zt.push({g:et,rx:gt,ry:lt,rz:Lt,floppy:bt})}if(h){let j=n.ear==="small"&&o?[.45,.27,.33]:a?[.34,.19,.27]:[.37,.21,.29],Z=new U(0,st-N[1]*.78,ft-N[2]*.35),et=hi(110,120,.9),gt=c?As(!1):null,lt=hn(y(64),y(44),(Lt,bt,yt)=>gt?gt(Lt,bt,yt).r:1+.075*(et(Lt,bt,yt)-.45),(Lt,bt,yt,Vt)=>{Vt.copy(w.body).lerp(mt?w.chest:w.ruff,Jt(yt,-.2,.3)),gt&&Vt.multiplyScalar(gt(Lt,bt,yt).v)});u.add(p,lt,u.paint,Z.x,Z.y,Z.z,...j).name="ruff",Et.push({c:Z,r:new U(...j).multiplyScalar(1.05)})}let wt=u.group(p,0,ht+X*.3,-G*.9,"tail"),Q=m(s.tail),ot=s.tailTip?m(s.tailTip):null,Rt=($,j)=>ot?Jt($,j,j+.08):0,At=($,j)=>(Z,et)=>$(Z)*(1+j*Math.sin(et*Math.PI*2*5+Z*23)*Math.sin(Z*31+et*9)),H=$=>I.stripes?1-Jt(Math.abs($/.15%1-.5),.16,.24):0,z=($,j)=>(Z,et,gt)=>{gt.copy(Q),j&&I.stripes&&gt.lerp(I.stripes,H(Z)*(1-Jt(Z,.86,.9))*Jt(Z,.08,.12)),ot&&gt.lerp(ot,Rt(Z,$))},dt=$=>u.add(wt,$,u.paint),Mt=n.tail,Tt=6.5;if(Mt==="curl"){let $=[[0,0,0],[-.08,.12,-.1],[-.065,.27,-.14],[.044,.35,-.13],[.17,.32,-.11],[.21,.22,-.11],[.16,.17,-.14],[.12,.19,-.156]],j=o?1.3:1;dt(or($,y(42),y(14),(Z,et)=>j*(.062+.05*Math.pow(Math.sin(Math.PI*Z),.55)-.06*Jt(Z,.79,1))*(o?1+.1*Math.sin(et*6.28*5+Z*20):1),z(.78,!1))),Tt=7.5}else if(Mt==="plume"){if(c){dt(or([[0,0,0],[0,.1,-.06],[0,.2,-.08]],10,8,()=>.034,z(2,!1)));let $=As(!1);u.add(wt,hn(y(32),y(24),(j,Z,et)=>$(j,Z,et).r,(j,Z,et,gt)=>gt.copy(ot||Q).multiplyScalar($(j,Z,et).v)),u.paint,0,.26,-.09,.11,.11,.11)}else{let $=o?1.2:1;dt(or([[0,0,0],[0,.17,-.07],[0,.3,.01],[0,.31,.14],[0,.24,.25]],y(32),y(16),At(Z=>$*(.07+.085*Math.pow(Math.sin(Math.PI*Math.min(1,Z*1.05)),.7))*(1-.85*Jt(Z,.8,1)),.12),z(.7,!1)))}Tt=5.5}else if(Mt==="straight"){let $=o||l?.068:.052;dt(or([[0,0,0],[0,.08,-.12],[0,.2,-.2],[0,.33,-.24]],y(20),y(12),j=>$*(1-.55*Jt(j,.3,1))*(j>.94?Math.sqrt(Math.max(.04,1-((j-.94)/.06)**2)):1),z(.78,!0)))}else if(Mt==="stub"){let $=o?hi(12,24,4.4):null;u.add(wt,hn(y(20),y(16),$?(j,Z,et)=>1+.12*($(j,Z,et)-.4):null,(j,Z,et,gt)=>gt.copy(Q)),u.paint,0,.03,-.02,.075,.07,.075),Tt=9}else{let $=Mt==="fluffy",j=[[0,0,0],[0,.02,-.15],[0,.12,-.27],[0,.3,-.31],[0,.45,-.25],[0,.5,-.17]],Z=$?.085:.044,et=gt=>Z*($?1+.25*Math.sin(Math.PI*gt):1)*(gt>.9?Math.sqrt(Math.max(.03,1-((gt-.9)/.1)**2)):1);dt(or(j,y(40),y(14),$?At(et,.1):et,z(.82,!0))),Tt=3.6}return t&&Rx(u,p,t,Et,{headY:st,headZ:ft,HR:N,bodyY:ht,BH:X,BW:B,BL:G}),Cx(p,new Set([p,D,wt,...Qt,...Zt.map($=>$.g),...Ct]),new Set([...Ct.map($=>$.userData.paw),kt].filter(Boolean))),p.userData.legs=Ct,p.userData.tail=wt,p.userData.height=L,p.userData.rig={head:D,headY:st,ears:Zt,eyes:Qt,tongue:kt,wag:Tt,seed:Ca(s.main)[0]%17/10},p.userData.size={H:L,BW:B,BH:X,BL:G,HR:N,headY:st,headZ:ft,top:st+N[1]+.2},p}function Cx(i,t,e){i.updateMatrixWorld(!0);let n=new ge,s=new ge,r=new Set;for(let l of t){s.copy(l.matrixWorld).invert();let c=new Map,h=[],d=f=>{for(let u of f.children)if(!(t.has(u)||e.has(u))){if(u.isMesh){let m=u.geometry.clone();r.add(u.geometry),m.applyMatrix4(n.multiplyMatrices(s,u.matrixWorld)),m.deleteAttribute("uv");let y=u.material.uuid+(m.attributes.color?"|c":"");c.has(y)||c.set(y,{mat:u.material,geos:[]}),c.get(y).geos.push(m.index?m:m.setIndex([...Array(m.attributes.position.count).keys()])),h.push(u)}d(u)}};d(l);for(let f of h)f.removeFromParent();for(let{mat:f,geos:u}of c.values()){let m=u.length===1?u[0]:eu(u,!1);u.length>1&&u.forEach(p=>p.dispose());let y=new fe(m,f);y.castShadow=y.receiveShadow=!0,l.add(y)}}let a=[];i.traverse(l=>{l!==i&&!l.isMesh&&!t.has(l)&&l.children.length===0&&a.push(l)}),a.forEach(l=>l.removeFromParent());let o=new Set;i.traverse(l=>{l.geometry&&o.add(l.geometry)});for(let l of r)o.has(l)||l.dispose()}function Rx(i,t,e,n,s){let r=new U(0,(s.headY-s.HR[1]*.7+s.bodyY+s.BH*.6)/2,s.headZ*.7),a=n.filter(x=>x.head),o=n.filter(x=>!x.head),l=(x,w)=>new U(Math.sin(x)*Math.cos(w),Math.sin(w),Math.cos(x)*Math.cos(w)),c=(x,w)=>x.reduce((I,L)=>Math.max(I,iu(r,w,L.c,L.r)),0),h=x=>{let w=-1.35,I=1.35;for(let L=0;L<26;L++){let B=(w+I)/2,X=l(x,B);c(a,X)>c(o,X)?I=B:w=B}return(w+I)/2},d=72,f=Array.from({length:d+1},(x,w)=>h(w/d*Math.PI*2)),u=x=>{let w=(x/(Math.PI*2)%1+1)%1*d,I=Math.floor(w),L=w-I;return f[I]*(1-L)+f[(I+1)%(d+1)]*L},m=(x,w,I)=>{let L=u(x)-w,B=l(x,L);return r.clone().addScaledVector(B,Math.max(c(a,B),c(o,B))+I)},y=x=>Math.max(0,1-Math.abs(Math.atan2(Math.sin(x),Math.cos(x)))/1.4),p=i.group(t,0,0,0,"neck-wear"),g=(x,w,I,L,B)=>{let X=[],G=[],ht=[],N=new Gt,st=w+(B?0:1);for(let it=0;it<=x;it++)for(let vt=0;vt<st;vt++)if(I(it/x,vt/w).toArray(X,X.length),L(it/x,vt/w,N),ht.push(N.r,N.g,N.b),it&&(B||vt<st-1)){let W=(it-1)*st+vt,rt=(it-1)*st+(vt+1)%st;G.push(W,W+st,rt,rt,W+st,rt+st)}let ft=new xe;ft.setAttribute("position",new Yt(X,3)),ft.setAttribute("color",new Yt(ht,3)),ft.setIndex(G),ft.computeVertexNormals();let J=new fe(ft,i.cloth);return J.castShadow=J.receiveShadow=!0,p.add(J),J},v=e.p||{},M=new Gt(v.c&&v.c!=="rainbow"?v.c:"#ffffff"),_=(x,w,I)=>w.copy(x).multiplyScalar(I),P=(x,w,I)=>g(5,96,(L,B)=>{let X=B*Math.PI*2,G=x[0]+x[1]*Math.pow(y(X),1.25);return m(X,-.03+L*G,w+.012*Math.sin(L*Math.PI))},I,!0),A=(x,w,I)=>{let L=m(x,w,I),B=m(x,w,I+.05);return{p:L,n:B.sub(L).normalize()}},C=(x,w,I,L)=>{let{p:B,n:X}=A(w,I,L);return x.position.copy(B),x.quaternion.setFromUnitVectors(new U(0,0,1),X),x},T=["#F27B7B","#F5C562","#8CC26A","#6FABE3","#B8A6EC"].map(x=>new Gt(x)),b=x=>{let w=(x/(Math.PI*2)%1+1)%1*T.length,I=Math.floor(w);return T[I].clone().lerp(T[(I+1)%T.length],w-I)};if(e.kind==="scarf"){let x=v.tri?v.tri.map(L=>new Gt(L)):null;P([.2,.16],.03,(L,B,X)=>{let G=L<.08||L>.92?.84:1;_(x?x[Math.floor(B*27)%3]:M,X,G)});let w=.95,I=x?hn(16,12,null,(L,B,X,G)=>G.copy(x[Math.floor((B+1)*1.6)%3])):i.sphere;C(i.add(p,I,x?i.paint:i.std(v.c,.93),0,0,0,.05,.048,.065),w,.1,.045),[[.04,.6],[.3,.46]].forEach(([L,B],X)=>{let G=N=>(.3+.08*Math.sin(N*Math.PI))*(1-.35*N**3);g(12,4,(N,st)=>m(w+L*N+(st-.5)*G(N),.1+N*B,.05+.012*Math.sin(st*Math.PI)+.012*X),(N,st,ft)=>{let J=st===0||st===1?.86:1;_(x?x[[1,2,0][Math.floor(N*7.99)%3]]:M,ft,J)},!1);let ht=x?i.std(v.tri[0]):i.std(qn(v.c,"#2A1E2A",.3));for(let N of[-.33,0,.33]){let st=w+L+N*G(1),ft=m(st,.1+B,.052+.012*X),J=m(st,.1+B+.09,.05+.012*X);Cs(i,p,[ft.toArray(),J.toArray()],.008,ht)}})}else if(e.kind==="bandana"){P([.06,.02],.022,(L,B,X)=>_(M,X,L>.9?.86:1));let x=new Gt("#ffffff"),w=v.check,I=g(10,20,(L,B)=>{let X=B*2-1,G=1.05*(1-L*.97);return m(X*G,.05+L*.62*(1-.12*X*X),.03+.006*L)},(L,B,X)=>{if(w){let G=Math.floor(B*10)%2,ht=Math.floor(L*6)%2;X.copy(x).lerp(M,.55*(G+ht))}else X.copy(M);L>.96&&X.multiplyScalar(.86)},!1);if(I.name="bandana",v.d)for(let[L,B]of[[-.45,.16],[0,.3],[.45,.16],[0,.62]]){let X=i.dot(p,i.std(v.d),0,0,0,.017,.017,.004);C(X,L*1.05*(1-B*.97),.05+B*.62*(1-.12*L*L),.036)}}else if(e.kind==="bell"){P([.07,.015],.022,(w,I,L)=>{v.c==="rainbow"?L.copy(b(I*Math.PI*2)):L.copy(M),(w<.1||w>.9)&&L.multiplyScalar(.82)});let x=i.group(p);C(x,0,.21,.062),i.oval(x,i.std(v.b,.32,.45),0,0,0,.062,.062,.062),i.oval(x,i.std(qn(v.b,"#2A1E2A",.42),.5),0,-.014,.054,.034,.005,.012),i.oval(x,i.std(qn(v.b,"#2A1E2A",.42),.5),0,-.031,.049,.008,.014,.01),i.dot(x,i.flat("#ffffff",.75),-.02,.024,.054,.013,.013,.006)}else if(e.kind==="bowtie"){let x=i.group(p);C(x,0,.08,.025);let w=i.std(v.c,.7),I=i.std(qn(v.c,"#ffffff",.18),.7);for(let L of[-1,1]){let B=i.add(x,new Xe(.055,.085,4),w,L*.045,0,.01);B.rotation.z=L*Math.PI/2,B.scale.set(1,1,.45)}i.oval(x,I,0,0,.018,.026,.026,.02)}else if(e.kind==="pearls"){let x=i.std("#FBF7F2",.22,.1);for(let w=0;w<26;w++){let I=w/26*Math.PI*2;C(i.dot(p,x,0,0,0,.021,.021,.021),I,.06+.03*y(I),.02)}C(i.oval(p,i.std("#F7C9D6",.3),0,0,0,.028,.028,.022),0,.18,.028)}else if(e.kind==="lei"){let x=["#F7A9C4","#FFD27A","#FFFFFF","#C9B6F2","#F28C8C"];for(let w=0;w<14;w++){let I=w/14*Math.PI*2,L=i.group(p);C(L,I,.06+.03*y(I),.022);let B=i.std(x[w%x.length],.8);for(let X=0;X<5;X++){let G=X/5*Math.PI*2;i.dot(L,B,Math.cos(G)*.026,Math.sin(G)*.026,0,.022,.022,.012)}i.dot(L,i.std("#F5C04A",.7),0,0,.01,.012,.012,.008)}}else if(e.kind==="ukiwa"){let x=s.bodyY+s.BH*.38,w=new U(0,x,s.BL*.18),I=.085,L=[];for(let J=0;J<48;J++){let it=J/48*Math.PI*2,vt=new U(Math.sin(it),0,Math.cos(it)),W=n.reduce((rt,mt)=>Math.max(rt,iu(w,vt,mt.c,mt.r)),0);L.push(w.clone().addScaledVector(vt,W+I*.8))}let B=new Li(L,!0),X=new vs(B,96,I,14,!0),G=X.attributes.position,ht=[],N=new Gt,st=new Gt("#F27B7B"),ft=new Gt("#FFFFFF");for(let J=0;J<G.count;J++){let it=Math.atan2(G.getX(J),G.getZ(J)-w.z)+Math.PI/4;N.copy(Math.floor((it/(Math.PI/2)%4+4)%4)%2?ft:st),N.toArray(ht,J*3)}X.setAttribute("color",new Yt(ht,3)),i.add(p,X,i.paint)}}function Is(i,t,e,n={}){let s=i.userData,r=s.rig;if(!r)return;let a=!!n.reduced,o=a?0:t,l=n.phase??o*9,c=Math.sin(o*(e?r.wag*1.25:r.wag*.62));s.tail.rotation.y=c*(e?.35:.24),s.tail.rotation.x=e?.08*Math.sin(o*9.5):0;let h=a?0:Math.max(0,1-Math.abs((o+r.seed)%4.3-3.6)/.11);r.eyes.forEach(f=>{f.scale.y=1-.92*h});let d=Math.sin(l*3.7);r.head.position.y=r.headY+(e?.014*d:.006*Math.sin(o*1.6)),r.head.rotation.x=e?.03*Math.sin(l*3.7+.6):.015*Math.sin(o*1.65),r.head.rotation.z=e?0:.035*Math.sin(o*1.34),r.ears.forEach((f,u)=>{let m=u?1:-1;f.g.rotation.z=f.rz+m*(f.floppy?e?.16:.035:.03)*Math.sin(l*3.7+u*.5),f.g.rotation.x=f.rx+(f.floppy&&e?.14*Math.sin(l*3.7):0)}),r.tongue&&(r.tongue.visible=!!e),n.legs!==!1&&Ix(i,l,e,!!n.airborne)}function Ix(i,t,e,n){let s=i.rotation.x,r=i.rotation.z,a=i.scale.y,o=Math.cos(s),l=Math.sin(s),c=Math.cos(r),h=Math.sin(r);for(let d of i.userData.legs){let{hip:f,paw:u}=d.userData,m=t*1.85+d.userData.phase,y=n?f.z>0?-.64:.74:e?.52*Math.sin(m):0;if(d.position.copy(f),d.rotation.x=y,u.rotation.x=n?-.35*y:-y,n)continue;let p=e?Math.max(0,-Math.cos(m))**2*f.y*.23:0,g=Math.cos(y),v=Math.sin(y),M=f.y+u.position.y*g-u.position.z*v-u.scale.y,_=f.z+u.position.y*v+u.position.z*g,P=f.x*h+M*c,C=-(i.position.y+a*(o*P-l*_))/a+p;d.position.x+=o*h*C,d.position.y+=o*c*C,d.position.z-=l*C}}function Ps(i){let t=new Set;i.traverse(e=>{e.geometry&&!t.has(e.geometry)&&(t.add(e.geometry),e.geometry.dispose());let n=Array.isArray(e.material)?e.material:e.material?[e.material]:[];for(let s of n)t.has(s)||(t.add(s),s.dispose())}),i.removeFromParent()}var Ra={fps:24,window:2,warmup:1.2,cool:1.5};function Ia(i,t){let n=[Math.min(window.devicePixelRatio||1,1.6)];for(let h of[1.25,1])h<n[n.length-1]&&n.push(h);let s=0,r=0,a=!0,o=Ra.warmup,l=0,c=0;return{get level(){return r},get pixelRatio(){return n[s]},get shadows(){return a},sample(h,d){if(!d||!(h>0)){l=0,c=0;return}if(o>0){o-=h,l=0,c=0;return}if(l+=h,c++,l<Ra.window)return;let f=l/c>1/Ra.fps;if(l=0,c=0,!!f){if(s<n.length-1)s++,i.setPixelRatio(n[s]);else if(a&&t)a=!1,t.castShadow=!1;else return;r++,o=Ra.cool}}}}var Le=Object.freeze({run:4.8,height:2.15,width:1.9,entryTolerance:.68}),Pa=Math.atan2(Le.height,Le.run);function Ls(i){return Math.max(0,1-Math.abs(i)/Le.run)*Le.height}function ru(i){let t=Math.max(0,Math.min(1,i/Le.height)),e=.2,n=t-e/2;return t<e&&(n=t*t/(2*e)),t>1-e&&(n=1-e-(1-t)**2/(2*e)),Le.height*.85*n/(1-e)}function au(i){let t=Math.min(1,Math.abs(i)/.85,Math.max(0,Le.run-Math.abs(i))/.85);return Math.sign(i)*Pa*t}function ou(i,t){let{run:e,width:n}=Le,s=.12;for(let r of[1,-1]){let a=r*Pa;for(let[o,l,c]of[[0,e-1.35,"#4b8f95"],[e-1.35,e,"#edc65e"]]){let h=(o+l)/2,d=t(n,s,(l-o)/Math.cos(Pa),c,0,Ls(h)-s*Math.cos(Pa)/2,r*h-s*Math.sin(a)/2,i);d.name="a-frame-panel",d.rotation.x=a,d.castShadow=!0}for(let o of[.85,1.65,2.45,3.25,4.05]){let l=t(n-.12,.032,.078,o>e-1.35?"#d4aa48":"#78a9a2",0,Ls(o)+.013,r*o,i);l.rotation.x=a}}for(let r of[-1,1])t(.075,.09,e,"#677e78",r*(n/2-.1),.86,0,i)}var _e=Object.freeze({length:8,width:1.2,thickness:.12,pivotHeight:.95,angle:Math.asin(.235),speed:4.2,stopFrom:-.7,stopTo:1,hold:.35,tipDuration:.85}),lu=()=>_e.length/2*Math.cos(_e.angle);function La(i,t){return Math.max(0,_e.pivotHeight+i*Math.tan(t)+_e.thickness/(2*Math.cos(t)))}function cu(i){let t=Math.max(0,Math.min(1,i));return _e.angle*(1-2*t*t*(3-2*t))}var lr=()=>-.035,Px=()=>.015,Lx=()=>.016;function Da(i,t){if(!t)return i.layout.theme==="forest"?Lx:Px;let e=i.player,n=i.layout.obstacles.find(r=>(r.type==="a-frame"||r.type==="seesaw")&&Math.abs(e.s-r.s)<Le.run+1);if(!n||Math.abs(e.x-n.lane*2)>.68)return lr;let s=e.s-n.s;if(n.type==="a-frame"&&i.rampPass?.onBoard!==!1&&Math.abs(s)<Le.run+1)return r=>Math.abs(s+r)<=Le.run?Ls(s+r):lr();if(n.type==="seesaw"&&Math.abs(s)<_e.length/2+1){let{angle:r,phase:a}=i.seesaws.get(n.id);if(a==="missed"||Math.abs(e.x-n.lane*2)>=.48)return lr;let o=_e.length/2*Math.cos(r);return l=>Math.abs(s+l)<=o?La(s+l,r):lr()}return lr}function Ua(i,t,e,n,s){let r=i.rotation.x,a=i.rotation.z,o=i.scale.y,l=Math.cos(r),c=Math.sin(r),h=Math.cos(a),d=Math.sin(a);for(let f of i.userData.legs){let{hip:u,paw:m}=f.userData,y=t*1.85+f.userData.phase,p=n?u.z>0?-.64:.74:e?.52*Math.sin(y):0;if(f.position.copy(u),f.rotation.x=p,m.rotation.x=n?-.35*p:-p,n)continue;let g=e?Math.max(0,-Math.cos(y))**2*u.y*.23:0,v=Math.cos(p),M=Math.sin(p),_=u.y+m.position.y*v-m.position.z*M-m.scale.y,P=u.z+m.position.y*M+m.position.z*v,A=u.x*d+_*h,C=o*(c*A+l*P),T=i.position.y+o*(l*A-c*P),b=(s(C)-T)/o+g;f.position.x+=l*d*b,f.position.y+=l*h*b,f.position.z-=c*b}}var Na=[{id:0,start:90,direction:"right"},{id:1,start:185,direction:"left"},{id:2,start:280,direction:"left"},{id:3,start:385,direction:"right"}].map(i=>({...i,radius:10,length:Math.PI*5,end:i.start+Math.PI*5}));function ui(i,t=0){return cr(Na,i,t)}function cr(i,t,e=0){let n=0,s=0,r=0,a=0;for(let o of i){let l=Math.min(t,o.start)-a;if(n+=Math.sin(r)*l,s-=Math.cos(r)*l,t<=o.start)return sc(n,s,r,e);let c=Math.min(t-o.start,o.length),h=o.direction==="right"?1:-1,d=r+h*c/o.radius;if(n+=o.radius/h*(Math.cos(r)-Math.cos(d)),s+=o.radius/h*(Math.sin(r)-Math.sin(d)),r=d,a=o.end,t<=o.end)return sc(n,s,r,e)}return n+=Math.sin(r)*(t-a),s-=Math.cos(r)*(t-a),sc(n,s,r,e)}function sc(i,t,e,n){return{x:i+Math.cos(e)*n,z:t+Math.sin(e)*n,heading:e}}var $n=(i,t=0,e=0,n=Na)=>n.find(s=>i>=s.start-t&&i<=s.end+e);var Dx=[{distance:-2.1,height:1.7},{distance:0,height:2.12},{distance:2.1,height:1.7}];function Fa(i,t){for(let{distance:e,height:n}of Dx)i.push({id:i.length,s:t.s+e,lane:t.lane,y:n,jumpLog:t.id})}function hu(){let t=[[72,"left",18,52],[142,"right",20,88],[231,"left",19,78],[298,"right",19,76],[389,"left",18,68],[452,"right",19,48]].map(([s,r,a,o],l)=>{let c=a*o*Math.PI/180;return{id:l,start:s,direction:r,radius:a,length:c,end:s+c}}),e=[[35,0],[105,-1],[195,1],[273,0],[349,-1],[425,1],[492,0]].map(([s,r],a)=>({id:a,s,lane:r,type:"log"})),n=[];for(let s=7;s<505;s+=2.15){let r=e.find(o=>Math.abs(s-o.s)<13);if(r&&Math.abs(s-r.s)<=4.8)continue;let a=$n(s,20,4,t)?0:r?.lane??0;n.push({id:n.length,s,lane:a,y:.65})}for(let s of e)Fa(n,s);return n.sort((s,r)=>s.s-r.s),{theme:"forest",length:510,turns:t,obstacles:e,treats:n,point:(s,r=0)=>cr(t,s,r)}}var rc=472,hr=[[82,"right",32,36],[180,"left",35,62],[288,"left",34,26],[388,"right",32,52]].map(([i,t,e,n],s)=>{let r=e*n*Math.PI/180;return{id:s,start:i,direction:t,radius:e,length:r,end:i+r}});function uu(){let i=[[38,0,-1],[138,1,-1],[244,-1,1],[344,1,-1],[440,-1,1]].map(([r,a,o],l)=>({id:l,s:r,lane:a,snackLane:o,type:"log"})),t=i.map((r,a)=>({lane:r.lane,from:a?hr[a-1].end+6:0,to:hr[a]?hr[a].start-20-6:rc})),e=i.map(({s:r,snackLane:a})=>({s:r,lane:a,halfLength:4.8,halfWidth:.87})),n=[];function s(r,a){n.push({id:n.length,s:r,lane:a,y:.65})}for(let r=7;r<rc-6;r+=2.15){if(i.some(o=>Math.abs(r-o.s)<=8.5))continue;let a=t.find(o=>r>=o.from&&r<=o.to);t.some(o=>o.lane!==0&&(Math.abs(r-o.from)<1.6||Math.abs(r-o.to)<1.6))||s(r,a?.lane??0)}for(let r of i){Fa(n,r);for(let a=-6;a<=6;a++)s(r.s+a*1.3,r.snackLane)}return n.sort((r,a)=>r.s-a.s),{theme:"beach",length:rc,turns:hr,point:(r,a=0)=>cr(hr,r,a),sand:e,obstacles:i,treats:n}}function du(i,t,e){return i.some(n=>{let s=(t-n.s)/n.halfLength,r=(e-n.lane*2)/n.halfWidth;return s*s+r*r<1})}var ne={length:480,lanewidth:2,speed:9.6,jumpDuration:.94,jumpHeight:1.55,gaugeMax:20,boostDuration:3,boostSpeed:16.2},pr=(i,t,e)=>t+(i-t)*Math.exp(-13*e),mr=i=>i===null||i>=ne.jumpDuration?0:Math.sin(i/ne.jumpDuration*Math.PI)*ne.jumpHeight;function Nx(i,t,e){let n=pr(t.x,t.target,e),s=t.wall;return s&&i>=s.fromS&&(n-s.x)*s.blockedSide>0?s.x:n}function fi(i,t,e){if(i<=t.s||i>e)return null;let n=t.dt*(i-t.s)/(e-t.s),s=t.jump===null?null:t.jump+n;return{x:Nx(i,t,n),y:mr(s),grounded:s===null||s>=ne.jumpDuration}}var Oa=1.7-.54,ac=1.7+.26;function Fx(i,t,e){let n=i.s+-5.05,s=i.s+2.55;if(e<n||t.s>=s||e<=t.s)return null;let r=i.lane*ne.lanewidth,a=c=>pr(t.x,t.target,t.dt*(c-t.s)/(e-t.s))-r,o=a(Math.max(t.s,n)),l=a(Math.min(e,s));for(let c of[-1,1]){let h=c*o,d=c*l;if(Math.min(h,d)>=ac-1e-9||Math.max(h,d)<=Oa+1e-9)continue;let f=h<=Oa||h<ac&&h<1.7;return{x:r+c*(f?Oa:ac),fromS:Math.max(n,t.s),blockedSide:f?c:-c,lane:f?i.lane:Math.max(-1,Math.min(1,i.lane+c))}}return null}function fu(){let i=Array.from({length:15},(e,n)=>({id:n,s:36+n*28,lane:[0,-1,1,0,1,-1,0,1,0,-1,1,0,-1,1,0][n],type:n%4===2?"tunnel":"hurdle"})).filter(e=>!$n(e.s,26,9)),t=[];for(let e=8;e<465;e+=2.2){let n=[0,0,-1,0,1,0][Math.floor((e-8)/17)%6],s=.65;$n(e,20,4)&&(n=0);let r=i.find(a=>Math.abs(a.s-e)<4.5);r&&(n=r.lane,r.type==="hurdle"&&(s=.65+1.25*Math.sin(Math.PI*(e-r.s+4.5)/9))),t.push({id:t.length,s:e,lane:n,y:s})}return{theme:"park",length:ne.length,obstacles:i,treats:t,turns:Na}}var ur=(i,t,e,n)=>({id:i,lane:t,x:t*ne.lanewidth,s:e,speed:n,y:0,jumpElapsed:null,slow:0,brake:0,boost:0,finishTime:null,hits:0,lastHitObstacle:null,phase:0}),dr=class{constructor(t="park"){let e={park:fu,beach:uu,forest:hu}[t]??fu;this.layout=e(),this.reset()}reset(){this.status="ready",this.previousStatus=null,this.countdown=3,this.time=0,this.player=ur("player",0,0,ne.speed),this.cpus=[ur("cpu0",-1,0,9.7),ur("cpu1",1,0,10),ur("cpu2",0,-3.3,10.25),ur("cpu3",-1,-4.4,9.9)];let t=this.layout.theme==="beach"?this.cpus.slice(0,2):this.layout.theme==="forest"?[this.cpus[2],this.cpus[1]]:[];for(let e of t)e.nextTreat=0,e.gauge=0;this.gauge=0,this.treatCount=0,this.dashCount=0,this.collected=new Set,this.events=[],this.result=null,this.armedTurns=new Set,this.passedTurns=new Set,this.missedTurns=new Set,this.waitingTurn=null,this.wallReach=null}start(){this.status==="ready"&&(this.status="countdown")}pause(){["countdown","running"].includes(this.status)&&(this.previousStatus=this.status,this.status="paused")}resume(){this.status==="paused"&&(this.status=this.previousStatus,this.previousStatus=null)}inTunnel(t){return this.layout.theme==="park"?this.layout.obstacles.find(e=>e.type==="tunnel"&&t.s>=e.s+-5.05&&t.s<e.s+2.55&&Math.abs(t.x-e.lane*ne.lanewidth)<=Oa):this.layout.obstacles.find(e=>e.type==="tunnel"&&Math.abs(t.s-e.s)<3.4&&Math.abs(t.x-e.lane*ne.lanewidth)<.8)}get turnCue(){let t=$n(this.player.s,32,0,this.layout.turns);return t?{...t,distance:Math.max(0,t.start-this.player.s),active:this.player.s>=t.start-20,armed:this.armedTurns.has(t.id),waiting:this.waitingTurn===t.id}:null}input(t){if(this.status!=="running")return!1;let e=this.player;if(t==="left"||t==="right"){let s=this.turnCue;if(s?.active)return s.armed?!1:t!==s.direction?(this.events.push({type:"turn-wrong",direction:s.direction}),!1):(this.armedTurns.add(s.id),this.waitingTurn=null,e.lane=0,this.events.push({type:"turn-armed",direction:s.direction}),!0)}if(this.waitingTurn!==null)return!1;if(t==="dash")return this.gauge<ne.gaugeMax||e.boost>0?!1:(this.gauge=0,e.boost=ne.boostDuration,this.dashCount++,this.events.push({type:"dash"}),!0);if(t==="brake")return e.brake=.6,!0;let n=this.inTunnel(e);if(n&&(this.layout.theme!=="park"||t==="jump"))return!1;if(t==="left"||t==="right"){let s=e.lane+(t==="left"?-1:1);return e.lane=Math.max(-1,Math.min(1,s)),this.wallReach=n&&s!==e.lane?{gate:n,target:s*ne.lanewidth}:null,!0}return t==="jump"&&e.jumpElapsed===null?(e.jumpElapsed=0,!0):!1}obstacleHit(t,e,n){t.lastHitObstacle!==e.id&&(t.lastHitObstacle=e.id,t.slow=1.15,t.hits++,t===this.player&&this.events.push({type:"hit",reason:n}))}collectRivalTreats(t,e){let n=this.layout.treats;for(;t.nextTreat<n.length&&n[t.nextTreat].s<=t.s;){let s=n[t.nextTreat++],r=fi(s.s,e,t.s);r&&Math.abs(r.x-s.lane*ne.lanewidth)<.72&&Math.abs(r.y+.65-s.y)<.8&&(t.gauge=Math.min(ne.gaugeMax,t.gauge+1))}t.gauge===ne.gaugeMax&&t.boost===0&&(t.gauge=0,t.boost=ne.boostDuration)}get rank(){return this.result?this.result.rank:1+this.cpus.filter(t=>t.finishTime!==null||t.s>this.player.s+.02).length}step(t){if(!Number.isFinite(t)||t<=0||t>.1)return;if(this.status==="countdown"){this.countdown=Math.max(0,this.countdown-t),this.countdown===0&&(this.status="running",this.events.push({type:"go"}));return}if(this.status!=="running")return;let e=this.time;if(this.time+=t,this.advanceField(t,e,this.cpus),this.player.finishTime!==null){let n=this.finishStandings(this.time);this.result={rank:1+n.findIndex(s=>s.id===this.player.id),standings:n,time:this.player.finishTime,treats:this.treatCount,dashes:this.dashCount,hits:this.player.hits,turns:this.passedTurns.size,turnMisses:this.missedTurns.size},this.time=this.player.finishTime,this.status="finished",this.events.push({type:"finish"})}}finishStandings(t){let e=this.cpus.map(s=>({...s})),n=1/60;for(;e.some(s=>s.finishTime===null);)this.advanceField(n,t,e),t+=n;return[this.player,...e].map(({id:s,finishTime:r})=>({id:s,time:r})).sort((s,r)=>s.time-r.time)}advanceField(t,e,n){for(let s=0;s<n.length;s++){let r=n[s];if(r.finishTime!==null)continue;r.lane=$n(r.s,20,0,this.layout.turns)?0:[-1,1,0,-1][s];let a=this.layout.obstacles.find(o=>o.s>r.s&&o.s-r.s<4.3&&Math.abs(r.x-o.lane*ne.lanewidth)<.65);(a?.type==="hurdle"||a?.type==="log")&&r.jumpElapsed===null&&(a.id+s*3)%7!==0&&(r.jumpElapsed=0)}for(let s of[this.player,...n]){if(s.finishTime!==null)continue;let r=s.s,a=s===this.player?this.wallReach:null,o={s:r,x:s.x,target:a?.target??s.lane*ne.lanewidth,jump:s.jumpElapsed,dt:t};s.slow=Math.max(0,s.slow-t),s.brake=Math.max(0,s.brake-t),s.boost=Math.max(0,s.boost-t),s.jumpElapsed!==null&&(s.jumpElapsed+=t,s.jumpElapsed>=ne.jumpDuration?(s.jumpElapsed=null,s.y=0):s.y=mr(s.jumpElapsed)),s.x=pr(s.x,o.target,t);let l=s===this.player&&this.waitingTurn!==null,c=this.layout.sand&&s.y<.2&&du(this.layout.sand,s.s,s.x),h=l?0:(c?.8:1)*(s.boost>0?ne.boostSpeed:s.speed)*(s.slow>0?.43:1)*(s.brake>0?.63:1);if(s.s+=h*t,s===this.player){let d=this.layout.turns.find(f=>r<=f.start&&s.s>=f.start&&!this.armedTurns.has(f.id));d&&(s.s=d.start,this.waitingTurn=d.id,this.missedTurns.has(d.id)||(this.missedTurns.add(d.id),this.events.push({type:"turn-missed",direction:d.direction})));for(let f of this.layout.turns)r<f.end&&s.s>=f.end&&!this.passedTurns.has(f.id)&&(this.passedTurns.add(f.id),this.events.push({type:"turn-done",direction:f.direction}))}s.phase+=s.s-r;for(let d of this.layout.obstacles){if(d.type==="tunnel"&&this.layout.theme==="park"){let m=Fx(d,o,s.s);m&&(o.wall=m,s.x=m.x,s.lane=m.lane,s===this.player&&(this.wallReach=null),this.obstacleHit(s,d,"tunnel-wall"))}let f=fi(d.s,o,s.s);if(!f||Math.abs(f.x-d.lane*ne.lanewidth)>=(d.type==="log"?1.12:.72))continue;(d.type==="tunnel"?f.y>.55:f.y<(d.type==="log"?.68:.74))&&(this.obstacleHit(s,d),d.type==="tunnel"&&(s.jumpElapsed=null,s.y=0))}if(a&&s.s>=a.gate.s+2.55&&(this.wallReach=null),s===this.player){for(let d of this.layout.treats)if(!this.collected.has(d.id)&&r<=d.s+.4&&s.s>=d.s-.4&&Math.abs(s.x-d.lane*ne.lanewidth)<.72&&Math.abs(s.y+.65-d.y)<.8){this.collected.add(d.id),this.treatCount++;let f=this.gauge;this.gauge=Math.min(ne.gaugeMax,this.gauge+1),this.events.push({type:"treat",id:d.id}),f<ne.gaugeMax&&this.gauge===ne.gaugeMax&&this.events.push({type:"ready"})}}s.nextTreat!==void 0&&this.collectRivalTreats(s,o),s.s>=this.layout.length&&(s.finishTime=e+t*(this.layout.length-r)/(s.s-r),s.s=this.layout.length)}}drainEvents(){let t=this.events;return this.events=[],t}};function Ba(i,t,e,n=!1){let s=Math.abs(i),r=Math.abs(t),a=Math.max(s,r),o=Math.min(s,r),l=n&&e<=210&&a>=20&&a>=o*1.4;return a>=28||l?s>r?i<0?"left":"right":t<0?"jump":"brake":Math.hypot(i,t)<12&&e<350?"dash":null}function Ox(i){return()=>(i=1664525*i+1013904223>>>0)/4294967296}function mu({root:i,routePoint:t,end:e,ribbon:n,mesh:s,box:r,groupAt:a,instances:o,pose:l}){let c=Ox(1071);r(1300,.15,1300,"#9bc95f",0,-.12,-180),s(n(0,7.65,.015,-15,e,t),"#edc285").name="continuous-road";let h=[],d=[],f=[],u=[],m=[],y=[],p=[],g=[],v=[],M=[],_=[],P=[],A=["#bedc77","#a4cc65","#c4df81","#99c461"],C=[],T=[];for(let J of[-1,1]){let it;for(let vt=-15;vt<=e+3;vt+=2.8){let W=3.77+c()*.28,rt=5.6+c()*1.2,mt=[t(vt,W*J),t(vt,rt*J)];if(it){let k=new Gt(A[Math.floor(c()*A.length)]);for(let tt of[it[0],it[1],mt[0],it[1],mt[1],mt[0]])C.push(tt.x,.024,tt.z),k.toArray(T,T.length)}it=mt}}let b=new xe;b.setAttribute("position",new Yt(C,3)),b.setAttribute("color",new Yt(T,3));let x=new fe(b,new Cn({vertexColors:!0,side:Pe}));i.add(x);for(let J=-10;J<e;J+=1.3){let it=c()<.5?-1:1;h.push(l(J,it*(2.44+c()*1.24),.027,.08+c()*.24,.009,.06+c()*.18));let vt=it*(4.1+c()*2.05),W=l(J,vt,.13,.1,.26+c()*.22,.15);if(d.push(W),!(c()>.28))for(let rt=0;rt<3;rt++){let mt=l(J+c()*.6,vt+c()*.4,.19+c()*.13,.12,.055,.12);u.push([mt[0],mt[1]+.033,mt[2],.057,.038,.057]);for(let k=0;k<5;k++){let tt=k*2*Math.PI/5;f.push([mt[0]+Math.cos(tt)*.069,mt[1],mt[2]+Math.sin(tt)*.069,.07,.032,.07])}}}o(new _s(1,0),"#d8ab76",h,"path-grit"),o(new Xe(1,1,3),"#75a34c",d,"grass-tips");let w=new ze(1,0);o(w,"#fff4d8",f,"daisies"),o(w,"#efaf31",u,"daisy-centres");for(let J of[-1,1]){for(let it=-11;it<e;it+=3.1){if((Math.floor((it+12)/21)+(J+1))%4===2)continue;let vt=t(it,J*5.72),W=t(it+3.1,J*5.72);_.push(l(it,J*5.72,.56));for(let rt of[.46,.89])P.push([(vt.x+W.x)/2,rt,(vt.z+W.z)/2,1,1,Math.hypot(W.x-vt.x,W.z-vt.z)+.08,-Math.atan2(W.x-vt.x,vt.z-W.z)])}for(let it=-12+(J+1)*2.9;it<e;it+=9+c()*6){let vt=J*(6.8+c()*3.6),W=2.45+c()*1.35;p.push(l(it,vt,W*.48,1,W,1));let rt=l(it,vt,W*.89,1,.95,1);g.push(rt);let mt=c()*6,k=1.65+c()*.91;v.push([...l(it,vt,W+.56,k,1.66+c(),k*.91).slice(0,6),mt]),M.push([...l(it+.42,vt-J*.71,W+1.58,k*.76,1.24+c()*.5,k*.7).slice(0,6),mt+.71])}for(let it=-9;it<e;it+=5+c()*7){let vt=6.2+c()*4,W=.7+c()*.8;m.push(l(it,J*vt,W*.55,W*1.13,W,W*.91)),y.push(l(it+1,J*(vt+.65),W*.44,W*1.12,W*.74,W))}}let I=new ze(1,1);function L(J,it,vt,W){let rt=o(J,it,vt,W);rt.material.flatShading=!0;for(let mt=0;mt<vt.length;mt++){let k=.8+c()*.2;rt.setColorAt(mt,new Gt().setRGB(k,Math.min(1,k+.03),k*.94))}return rt}L(I,"#70ae51",v,"tree-crowns"),L(I,"#a3ca59",M,"sunlit-canopies"),L(new _s(1,0),"#81af4a",m,"shrubs"),L(I,"#589b55",y,"hedges"),o(new ue(.22,.34,1,7),"#966745",p,"tree-trunks");let B=new ue(.1,.18,1.45,6);B.rotateZ(.53),B.translate(-.29,0,0),o(B,"#a5744d",g,"tree-branches"),o(new ue(.099,.111,1.17,5),"#aa7450",_,"fence-posts"),o(new Te(.085,.13,1),"#bc895d",P,"fence-rails");let X=p.map(J=>[J[0]+.75,.007,J[2]-.37,2.43,1,1.44,J[6]]),G=new ci(1,9);G.rotateX(-Math.PI/2),o(G,"#8db55f",X,"tree-shadows");let ht=[],N=[];for(let J=-30;J<e+60;J+=25)for(let it of[-1,1]){let vt=44+c()*26;if(ht.push(l(J,it*vt,-2,11+c()*13,5+c()*8,15+c()*13)),c()<.5){let W=it*(13+c()*23),rt=12+c()*8;for(let[mt,k,tt,at,xt]of[[-2,0,-.1,2.1,.82],[0,.67,0,2.35,1.45],[2.1,.12,.3,1.8,.96]])N.push(l(J+tt,W+mt,rt+k,at,xt,1.85))}}let st=[];for(let J=-20;J<=e+5;J+=2)st.push(t(J,0));let ft=ht.filter(([J,,it,vt,,W])=>{let rt=Math.max(vt,W)+16;return st.every(mt=>(mt.x-J)**2+(mt.z-it)**2>rt**2)});L(new ze(1,0),"#83b69b",ft,"far-hills"),o(new ze(1,1),"#fff8df",N,"clouds");for(let J of[45,162,322]){let it=a(J,-11);it.name="park-pavilion",s(new ue(2.3,2.46,.27,8),"#d5b68a",0,.13,0,it);for(let vt=0;vt<8;vt++){let W=Math.PI*vt/4;s(new ue(.083,.1,2.65,6),"#f4e4be",Math.cos(W)*1.9,1.56,Math.sin(W)*1.9,it)}s(new Xe(2.9,1.55,8),"#cf6c50",0,3.65,0,it),s(new ue(2.9,2.81,.15,8),"#8f5542",0,2.88,0,it),s(new ke(.16,8,6),"#f3be66",0,4.48,0,it)}}function gu(i,t){let e=t(new ue(.365,.345,1.76,11),"#925d38",0,.39,0,i);e.castShadow=!0,e.rotation.z=Math.PI/2,e.rotation.y=.09;for(let s of[-1,1]){let r=s*.88,a=-s*.079;t(new ue(.303,.303,.02,11),"#e2ab70",r,.39,a,i).rotation.copy(e.rotation);let l=t(new pn(.195,.014,4,12),"#b57a46",r+s*.017,.39,a,i);l.rotation.y=Math.PI/2+.09}for(let s of[-.51,.32]){let r=t(new ue(.027,.033,.42,6),"#b7814e",s,.5,.32-s*.09,i);r.rotation.z=Math.PI/2-.08,r.rotation.y=.09}let n=t(new ue(.089,.125,.22,7),"#99643c",-.41,.67,-.06,i);n.rotation.z=.54,t(new _s(1,0),"#8ca54b",.42,.699,-.04,i).scale.set(.25,.078,.139)}var oc=[[0,-.15,.3,.216],[-.35,.15,.106,.16],[-.13,.35,.115,.166],[.14,.35,.115,.166],[.35,.15,.106,.16]],mn=new Xn;mn.moveTo(-.92,0);mn.bezierCurveTo(-1.24,-.33,-1.05,-.64,-.76,-.58);mn.bezierCurveTo(-.53,-.55,-.56,-.34,-.31,-.315);mn.bezierCurveTo(-.09,-.29,.11,-.3,.32,-.32);mn.bezierCurveTo(.55,-.34,.55,-.56,.77,-.585);mn.bezierCurveTo(1.08,-.635,1.23,-.29,.92,0);mn.bezierCurveTo(1.2,.31,1.06,.61,.78,.57);mn.bezierCurveTo(.53,.55,.56,.33,.31,.315);mn.bezierCurveTo(.1,.295,-.11,.295,-.31,.315);mn.bezierCurveTo(-.57,.33,-.54,.565,-.78,.58);mn.bezierCurveTo(-1.08,.615,-1.21,.29,-.92,0);var sn=mn.getPoints(6);sn.at(-1).equals(sn[0])&&sn.pop();var za=oc.map(([i,t,e,n])=>Array.from({length:16},(s,r)=>{let a=-r*Math.PI/8;return new Ut((i+e*Math.cos(a))*.56,(t+n*Math.sin(a))*.56)})),xu=i=>i.map(({x:t,y:e},n)=>(n?"L":"M")+t.toFixed(3)+" "+(-e).toFixed(3)).join(" ")+"Z",lc='<svg viewBox="-1.19 -.71 2.38 1.42" aria-hidden="true"><path d="'+xu(sn)+'" fill="#efc384" stroke="#99633d" stroke-width=".11"/><path d="'+za.map(xu).join("")+'" fill="#91572f"/></svg>';function _u(){let i=[],t=[],e=[],n=(f,u,m,y=1,p=new Ut)=>{let g=i.length/3,v=new Gt(m);for(let M of f)i.push((p.x+(M.x-p.x)*y)*.327,(p.y+(M.y-p.y)*y)*.327,u),t.push(v.r,v.g,v.b);return g};function s(f,u,m){for(let y=0;y<m;y++){let p=(y+1)%m;e.push(f+y,f+p,u+p,f+y,u+p,u+y)}}let r=n(sn,-.052,"#b97a42",.94),a=n(sn,-.034,"#c78749"),o=n(sn,.031,"#d89a54"),l=n(sn,.053,"#f1c080",.95);s(r,a,sn.length),s(a,o,sn.length),s(o,l,sn.length);for(let f of Vn.triangulateShape(sn,[]))e.push(...f.reverse().map(u=>u+r));let c=sn.map(f=>f.clone().multiplyScalar(.95));for(let f of za)n(f,.053,"#d5a16a");for(let f of Vn.triangulateShape(c,za))e.push(...f.map(u=>u+l));let h=l+sn.length;za.forEach((f,u)=>{let m=new Ut(oc[u][0],oc[u][1]).multiplyScalar(.56),y=n(f,.038,"#956537",.8,m);s(y,h,f.length);for(let p of Vn.triangulateShape(f,[]))e.push(...p.map(g=>y+g));h+=f.length});let d=new xe;return d.setAttribute("position",new Yt(i,3)),d.setAttribute("color",new Yt(t,3)),d.setIndex(e),d.computeVertexNormals(),d.rotateZ(.22),d.rotateX(-.38),d}function gr(i,t,e=1.58,n=6){let s=new ue(e,e,n,32,1,!0,Math.PI/2,Math.PI);s.rotateX(Math.PI/2);let r=t(s,"#5686aa",0,0,0,i);r.material.side=Pe,r.name="tunnel-fabric";let a=8;for(let o=0;o<=a;o++){let l=o===0||o===a,c=t(new pn(e,e*(l?.068:.032),8,32,Math.PI),l?"#91b7c3":"#729cba",0,0,n*(o/a-.5),i);c.name=l?"tunnel-rim":"tunnel-rib"}}function yu(i,t){let e=1.7,n=7.6,s=new Re;s.name="park-tunnel",s.scale.y=1.1,s.position.z=1.25,i.add(s),gr(s,t,e,n);for(let r of[-1,1])t(new Te(.12,.08,n),"#75969c",r*e,.04,0,s)}function vu(i,{mesh:t,box:e,instances:n,pose:s,ribbon:r}){let a=i.length+35;e(1e3,.16,1300,"#93a978",0,-.12,-230),t(r(0,8.8,.005,-20,a,i.point),"#b7ad79").name="trail-verge",t(r(0,7.5,.016,-20,a,i.point),"#d1af80").name="continuous-road";let o=41383,l=()=>(o=Math.imul(o,1664525)+1013904223>>>0,o/4294967296),c=[],h=[],d=[],f=[],u=[],m=[],y=[],p=[],g=[],v=[],M=[],_=[];for(let A=-10;A<a;A+=4.3)for(let C of[-1,1]){let T=A+l()*3,b=Math.sin(A*.065)>.6?3:0,x=C*(7.6+b+l()*5),w=.78+l()*.58;if(l()<.28){f.push(s(T,x,w*2.1,w,w,w));for(let L=0;L<3;L++)m.push(s(T,x,w*(.9+L*.9),w,w,w));u.push(s(T,x,w*4.4,1.6*w,2.1*w,1.6*w))}else c.push(s(T,x,w*1.6,w,w,w)),h.push(s(T,x,w*3.35,w,w,w)),d.push(s(T,x,w*4.95,w,w,w));let I=C*(4.8+l()*1.6);if(l()<.35)y.push(s(A,I,.16,.46,.32,.57)),p.push(s(A,I,.3,.38,.24,.45));else{let L=s(A,I,.22,.38,.47,.38);g.push(L)}v.push(s(A+l(),C*(3.2+l()*.85),.027,.1,.007,.19))}for(let A=0;A<a;A+=17){let C=Math.floor(A/17)%2?-1:1;M.push(s(A,C*4.55,.49)),_.push(s(A,C*4.55,.73))}let P=[];for(let A=24;A<a;A+=55)for(let C of[-1,1])P.push(s(A,C*33,1,13,7+3*Math.sin(A),18));n(new ze(1,0),"#819e91",P,"forest-ridge"),n(new ue(.18,.29,3.2,8),"#79644c",c,"fir-trunks"),n(new Xe(1.85,3.7,8),"#355e51",h,"fir-boughs"),n(new Xe(1.35,3.25,8),"#63865f",d,"fir-tops"),n(new ue(.14,.2,4.2,8),"#ded8ba",f,"birch-trunks"),n(new ue(.19,.2,.085,8),"#817b67",m,"birch-bark"),n(new ze(1,1),"#9cb668",u,"birch-leaves"),n(new ze(1,0),"#8b8876",y,"verge-rocks"),n(new ze(1,0),"#83905e",p,"rock-moss"),n(new Xe(1,1,5),"#668451",g,"forest-floor"),n(new ze(1,0),"#a98853",v,"fallen-leaves"),n(new Te(.17,.98,.17),"#8a785e",M,"waymarks"),n(new Te(.177,.16,.177),"#eabd76",_,"trail-blazes")}function Mu(i,t){let e=t(new ue(.32,.34,1.95,12),"#74583f",0,.34,0,i);e.rotation.z=Math.PI/2,e.castShadow=!0;for(let n of[-1,1]){let s=n*.978,r=t(new ue(.294,.294,.012,16),"#cdab74",s,.34,0,i);r.rotation.z=Math.PI/2;let a=t(new pn(.18,.015,5,18),"#a48255",s+n*.011,.34,0,i);a.rotation.y=Math.PI/2}}function kx(i,t,e,n,s,r,a=2){let o=[],l=[],c=Math.ceil((r-s)/a);for(let d=0;d<=c;d++){let f=s+(r-s)*d/c,u=i(f,-6.8-.6*Math.sin(f/8)-.35*Math.sin(f/3));for(let m of[e,t])o.push(u.x-m,n,u.z);if(d<c){let m=2*d;l.push(m,m+1,m+2,m+1,m+3,m+2)}}let h=new xe;return h.setAttribute("position",new Yt(o,3)),h.setIndex(l),h.computeVertexNormals(),h}function bu(i,{mesh:t,box:e,pose:n,instances:s,groupAt:r,ribbon:a}){let{point:o,length:l}=i;e(1100,.12,1400,"#e7cd98",0,-.1,-200);let c=(v,M,_,P,A)=>{t(kx(o,v,M,_,-210,l+220),P).name=A};c(-1.7,0,-.007,"#c8b994","wet-sand"),c(0,320,.008,"#469eae","ocean"),c(0,2.8,.013,"#9edbd0","shallows"),c(2.8,10,.012,"#7fbcb7","coastal-water"),c(-.1,.19,.025,"#f5f1d9","surf-line"),t(a(0,7.5,.015,-15,l+30,o),"#eacb95").name="continuous-road";for(let v of i.sand){let M=r(v.s,v.lane*2);M.name="soft-sand",t(new ue(1,1,.025,36),"#c9a574",0,.018,0,M).scale.set(v.halfWidth,1,v.halfLength);for(let P=-2;P<=2;P++){let A=t(new ke(1,9,5),"#bfa077",.09*Math.sin(P),.034,P*1.55,M);A.scale.set(.38,.022,.085),A.rotation.y=.2*Math.sin(P+1)}}let h=[],d=[],f=[],u=[],m=[],y=[[],[]];for(let v=-30;v<l+75;v+=5.5){let M=o(v,-6.8-.6*Math.sin(v/8)-.35*Math.sin(v/3));for(let _=0;_<3;_++)h.push([M.x-1.6-_*7.8-1.1*Math.cos(v+_),.027,M.z+Math.sin(v*.32+_),.09+.04*_,.012,.65+.5*(1+Math.sin(v)),-.35*Math.sin(v*.1)])}for(let v=0;v*13<=l+8;v++){let M=v*13;for(let _ of[-1,1])d.push(n(M,_*4.2,.48)),f.push(n(M,_*4.2+.15,.83))}for(let v=0;v*18<l+50;v++){let M=v*18-15;u.push(n(M,12+2*Math.sin(v),-.15,3.6+v%3,.9,5)),v%3===1&&(m.push(n(M,9,1.3)),y[v%2].push(n(M,9,2.6)))}s(new ke(1,9,5),"#cce4db",h,"whitecaps"),s(new ue(.045,.055,.96,8),"#a58562",d,"beach-stakes"),s(new Te(.3,.18,.035),"#e57e5b",f,"course-pennants"),s(new ze(1,1),"#d6bd8e",u,"dunes"),s(new ue(.065,.075,2.6,8),"#9f8668",m,"parasol-poles");for(let v=0;v<2;v++)s(new Xe(1.8,.65,10),["#d87559","#478b91"][v],y[v],"parasols");let p=r(l*.63,-30);t(new ze(1,0),"#849b88",0,.2,0,p).scale.set(7,2.4,5);for(let[v,M,_,P]of[[1.6,3.6,1.25,"#f4e5c3"],[5.2,1,1.12,"#c3654a"],[6.2,1.6,1.05,"#f4e5c3"],[7.8,.85,.93,"#497b86"]])t(new ue(_*.94,_,M,10),P,0,v+M/2,0,p);t(new Xe(1.28,.85,10),"#b75e45",0,9.06,0,p);for(let v of[45,164,296,435]){let M=r(v,-8);M.position.x-=20+7*Math.sin(v),M.rotation.y+=.5,t(new ke(1,12,8),"#9b6650",0,.24,0,M).scale.set(.66,.38,2.2),e(.07,3.7,.07,"#927763",0,2,0,M);let P=new Xn;P.moveTo(0,0),P.lineTo(1.65,0),P.lineTo(0,3.1),P.closePath();let A=t(new ys(P),"#fbefd6",0,.7,.08,M);A.rotation.y=Math.PI/2,A.material.side=Pe}}function Su(i,t){function e(n,s,r,a,o,l,c){let h=t(new ue(n,s,r,12),c,a,o,0,i);return h.rotation.z=l,h.castShadow=!0,h}e(.32,.3,1.92,0,.34,Math.PI/2,"#886246");for(let n of[-.963,.963])e(.26,.26,.012,n,.34,Math.PI/2,"#d1ad77");e(.087,.13,.36,.51,.56,-.9,"#8c694d")}var wu=i=>new Ke({color:i,roughness:1});function xr(i,t,e,n=-15,s=510,r=ui){let a=[],o=[],l=Math.ceil(s-n);for(let h=0;h<=l;h++){let d=n+(s-n)*h/l;for(let f of[-1,1]){let u=r(d,i+f*t/2);a.push(u.x,e,u.z)}if(h<l){let f=h*2;o.push(f,f+1,f+2,f+1,f+3,f+2)}}let c=new xe;return c.setAttribute("position",new Yt(a,3)),c.setIndex(o),c.computeVertexNormals(),c}function Tu(i){let t=new Re;t.name=(i.theme||"park")+"-race-track";let e=i.point||ui,n=i.length||ne.length,s=n+30,r=i.theme==="field";function a(v,M,_=0,P=0,A=0,C=t){let T=new fe(v,wu(M));return T.position.set(_,P,A),T.receiveShadow=!0,C.add(T),T}function o(v,M,_,P,A,C,T,b=t){return a(new Te(v,M,_),P,A,C,T,b)}function l(v,M=0){let _=e(v,M),P=new Re;return P.position.set(_.x,0,_.z),P.rotation.y=-_.heading,t.add(P),P}function c(v,M,_,P=1,A=1,C=1){let T=e(v,M);return[T.x,_,T.z,P,A,C,-T.heading]}function h(v,M,_,P){let A=new Pi(v,wu(M),_.length),C=new Fe;A.name=P;for(let T=0;T<_.length;T++){let b=_[T];C.position.set(b[0],b[1],b[2]),C.scale.set(b[3]??1,b[4]??1,b[5]??1),C.rotation.set(0,b[6]??0,0),C.updateMatrix(),A.setMatrixAt(T,C.matrix)}return A.receiveShadow=!0,t.add(A),A}if(i.theme==="beach")bu(i,{mesh:a,box:o,pose:c,instances:h,groupAt:l,ribbon:xr});else if(i.theme==="forest")vu(i,{mesh:a,box:o,pose:c,instances:h,ribbon:xr});else if(i.theme==="park")mu({root:t,routePoint:e,end:s,ribbon:xr,mesh:a,box:o,groupAt:l,instances:h,pose:c});else{o(800,.12,800,"#9fb681",50,-.12,-200),a(xr(0,7.6,.015,-15,s,e),r?"#b4c49a":"#cfbc95").name="continuous-road";for(let T of[-3.7,3.7])a(xr(T,.08,.025,-15,s,e),"#e6d7b6");let v=[];for(let T=-12;T<s;T+=5)for(let b of[-1,1])v.push(c(T,b,.025));h(new Te(.035,.015,1.5),"#e3d5b5",v,"lane-markings");let M=[],_=[],P=[],A=[],C=[];for(let T=-12;T<s;T+=4)for(let b of[-1,1])A.push(c(T,b*4.4,.6));for(let T=-12;T<s;T+=2)for(let b of[-1,1]){let x=e(T,b*4.4),w=e(T+2,b*4.4);C.push([(x.x+w.x)/2,.75,(x.z+w.z)/2,1,1,Math.hypot(w.x-x.x,w.z-x.z)+.04,-Math.atan2(w.x-x.x,x.z-w.z)])}for(let T=-10;T<s;T+=11)for(let b of[-1,1]){let x=b*(7+Math.abs(T)%4*.6);M.push(c(T,x,1)),_.push(c(T,x,2.5,1.3,1.5,1.3)),P.push(c(T+.4,x+.45,3.2,1,1.2,1))}h(new ue(.13,.17,2,7),"#8e7c54",M,"tree-trunks"),h(new ke(1,10,7),"#79985f",_,"tree-crowns"),h(new ke(1,10,7),"#8caa6a",P,"tree-caps"),h(new Te(.1,1.2,.1),"#d7c6a2",A,"fence-posts"),h(new Te(.07,.12,1),"#d7c6a2",C,"fence-rails")}for(let v of i.turns)for(let M of[23,6]){let _=v.direction==="right"?-1:1,P=l(v.start-M,_*4.7);P.name="turn-sign",P.userData.turnId=v.id,o(.12,2.2,.12,"#778566",0,1.1,0,P),o(2.5,1.2,.12,"#315b49",0,2.2,0,P);let A=new Xn;[[-.8,.14],[.12,.14],[.12,.43],[.8,0],[.12,-.43],[.12,-.14],[-.8,-.14]].forEach(([T,b],x)=>x?A.lineTo(T,b):A.moveTo(T,b)),A.closePath();let C=a(new ys(A),"#f5df9f",0,2.2,.071,P);C.material.side=Pe,v.direction==="left"&&(C.scale.x=-1)}for(let v of i.obstacles){let M=l(v.s,v.lane*ne.lanewidth);if(M.name="race-obstacle",M.userData.obstacleId=v.id,v.type==="log")i.theme==="forest"?Mu(M,a):Su(M,a);else if(v.type==="hurdle"&&i.theme==="park"&&v.id%4===0)gu(M,a);else if(v.type==="hurdle"){for(let _ of[-.8,.8])o(.1,1.1,.12,"#72929b",_,.55,0,M),o(.42,.08,.6,"#72929b",_,.04,0,M);for(let _=0;_<8;_++)o(.2,.11,.1,_%2?"#c78465":"#f6edda",-.7+_*.2,.74,0,M)}else if(v.type==="hoop"){a(new pn(1.2,.09,10,40),"#d6b35a",0,1.7,0,M);for(let _ of[-1.35,1.35])o(.1,2.6,.12,"#72929b",_,1.3,0,M),o(.18,.08,.08,"#78909a",_*.945,1.7,0,M),o(.5,.08,.7,"#72929b",_,.04,0,M)}else if(i.theme==="park")yu(M,a);else{gr(M,a);for(let _ of[-1,1])o(.12,.1,6,"#6a97a2",_*1.58,.05,0,M)}}let d=_u().scale(.76,.76,.76),f=new Ke({vertexColors:!0,roughness:.93}),u=new Pi(d,f,i.treats.length);u.name="treat-trail",u.visible=i.treats.length>0,t.add(u);function m(){let v=new Fe;for(let M of i.treats){let _=e(M.s,M.lane*ne.lanewidth);v.position.set(_.x,M.y,_.z),v.rotation.set(0,-_.heading,0),v.updateMatrix(),u.setMatrixAt(M.id,v.matrix)}u.instanceMatrix.needsUpdate=!0,i.treats.length&&u.computeBoundingSphere()}function y(v){u.setMatrixAt(v,new ge().makeScale(0,0,0)),u.instanceMatrix.needsUpdate=!0}m();let p=l(n);p.name="finish-gate";for(let v of[-3.6,3.6])o(.18,4,.18,"#607e6c",v,2,0,p);for(let v=0;v<16;v++)for(let M=0;M<2;M++)o(.45,.35,.06,(v+M)%2?"#f6efda":"#486f59",-3.375+v*.45,3.3+M*.35,0,p);let g=[];for(let v=0;v<16;v++)for(let M=0;M<2;M++)(v+M)%2===0&&g.push(c(n-M*.5,-3.75+v*.5,.03));return h(new Te(.5,.012,.5),"#f6f0dc",g,"finish-tiles"),{root:t,treatMesh:u,resetTreats:m,collectTreat:y}}function pi(i,{distance:t=6,height:e=2.8,lookAhead:n=10,lookHeight:s=1}={}){let r=Math.sin(i.heading),a=-Math.cos(i.heading);return{position:{x:i.x-r*t,y:e,z:i.z-a*t},target:{x:i.x+r*n,y:s,z:i.z+a*n}}}function Eu(i){let t=i.filter(s=>s.type==="tunnel"),e=[];function n(s){let r=e.findIndex(l=>l.s>=s);if(r<0)return e.at(-1).x;if(r===0)return e[0].x;let a=e[r-1],o=e[r];return nn.lerp(a.x,o.x,(s-a.s)/(o.s-a.s))}return(s,r,a)=>{let{s:o,x:l}=s;for(e.length&&o<e.at(-1).s&&(e.length=0),(!e.length||o-e.at(-1).s>=.1)&&e.push({s:o,x:l});e.length>2&&e[1].s<o-10;)e.shift();let c=ui(o,l),h=t.find(T=>o>T.s-22&&o<T.s+24);if(!h)return pi(c,{distance:r,height:a});let d=o-h.s,f=nn.smoothstep(d,-22,-7),u=1-nn.smoothstep(d,12,24),m=n(o-r),y=h.lane*ne.lanewidth,p=Math.min(Math.abs(l-y),Math.abs(m-y)),g=f*u*(1-nn.smoothstep(p,.85,1.85)),v=nn.lerp(r,4.85,g),M=nn.lerp(a,1.26,g),_=nn.lerp(1,.77,g),P=Math.abs(l-y),A=nn.smoothstep(P,.48,.98)*(1-nn.smoothstep(P,1.85,2)),C=d-2.55-.18;if(C>0&&C<v&&A>0){let T=A*nn.smoothstep(C,0,.66),b=nn.lerp(v,C,T),x=b/v,w=M+(_-M)*(b+10)/(v+10),I=pi(c,{distance:b,height:M,lookHeight:w});return I.zoom=x,I}return pi(c,{distance:v,height:M,lookHeight:_})}}var _r=[{id:"park",name:"\u3053\u3046\u3048\u3093",level:"\u3084\u3055\u3057\u3044",lv:0,color:"#a9bd87",desc:"4\u3064\u306E \u307E\u304C\u308A\u304B\u3069\u3092 \u306C\u3051\u3066\u3001\u3053\u3046\u3048\u3093\u3092 \u304B\u3051\u307E\u308F\u308D\u3046",tags:["\u307E\u304C\u308A\u304B\u3069","\u30CF\u30FC\u30C9\u30EB","\u30C8\u30F3\u30CD\u30EB"],sky:"#9ed9ee",fog:[32,107],zenith:[.26,.67,.88],horizon:[.73,.91,.89],ground:"#a9b792",scale:.62,shadow:.55},{id:"beach",name:"\u3046\u307F\u3079",level:"\u3075\u3064\u3046",lv:1,color:"#d4bf88",desc:"\u304A\u3084\u3064\u306E \u308C\u3064\u3092 \u304A\u3044\u304B\u3051\u3066\u3001\u3059\u306A\u306F\u307E\u306E \u308A\u3085\u3046\u307C\u304F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046",tags:["\u308A\u3085\u3046\u307C\u304F","\u3059\u306A\u306F\u307E","\u307F\u3061 \u3048\u3089\u3073"],sky:"#b5dce4",fog:[85,175],zenith:[.2,.66,.85],horizon:[.91,.93,.81],ground:"#c4bc98",scale:.76,shadow:.8,flick:!0},{id:"forest",name:"\u3082\u308A",level:"\u3080\u305A\u304B\u3057\u3044",lv:2,color:"#6d9273",desc:"\u6728\u306E \u3042\u3044\u3060\u3092 \u306F\u3057\u3063\u3066\u3001\u30AB\u30FC\u30D6\u3068 \u307E\u308B\u305F\u3092 \u306E\u308A\u3053\u3048\u3088\u3046",tags:["\u307E\u308B\u305F","\u3064\u3065\u304F \u30AB\u30FC\u30D6","\u30BF\u30A4\u30DF\u30F3\u30B0"],sky:"#c1cfb0",fog:[42,110],zenith:[.42,.69,.7],horizon:[.81,.89,.78],ground:"#97a585",scale:.76,shadow:.8}],cc=i=>_r.find(t=>t.id===i)||_r[0],hc='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',uc='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 6v12M15.5 6v12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',Au=.62;function yr(i){let t=Math.round(i*10),e=Math.floor(t/600),n=Math.floor(t/10)%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}.${t%10}`}var mi=i=>(Math.round(i*100)/100).toFixed(2)+"\u79D2",vr=i=>Math.round(i*100)*10;function Cu(i){let t=cc(i),e=new dr(t.id).layout,n=e.point||ui,s=e.length||ne.length,r=[];for(let A=0;A<=s;A+=3)r.push(n(Math.min(A,s),0));r.push(n(s,0));let a=r.map(A=>A.x),o=r.map(A=>A.z),l=Math.min(...a),c=Math.max(...a),h=Math.min(...o),d=Math.max(...o),f=76/Math.max(c-l,d-h,1),u=50-(l+c)/2*f,m=50-(h+d)/2*f,y=A=>`${(A.x*f+u).toFixed(1)} ${(A.z*f+m).toFixed(1)}`,p="M"+r.map(y).join("L"),g=(A,C,T,b)=>{let x=n(A,C*ne.lanewidth);return`<circle cx="${(x.x*f+u).toFixed(1)}" cy="${(x.z*f+m).toFixed(1)}" r="${b}" fill="${T}"/>`},v=e.obstacles.map(A=>g(A.s,0,A.type==="tunnel"?"#5f8ea6":A.type==="log"?"#8a6a45":"#c78465",3.2)).join(""),M=t.id==="beach"?'<path d="M0 0h100v100H0z" fill="#d4bf88"/><path d="M78 0h22v100H78z" fill="#7cc3d6"/><path d="M74 0q5 12 0 25t0 25 0 25 0 25h4V0z" fill="#e9ddb3"/>':t.id==="forest"?'<path d="M0 0h100v100H0z" fill="#6d9273"/>'+[[12,14],[86,20],[14,82],[88,76],[50,8],[10,48],[90,50]].map(([A,C])=>`<path d="M${A} ${C-7}l6 11h-12z" fill="#4f7356"/>`).join(""):'<path d="M0 0h100v100H0z" fill="#a9bd87"/>'+[[12,14],[86,18],[12,84],[88,82]].map(([A,C])=>`<circle cx="${A}" cy="${C}" r="6" fill="#86a56a"/>`).join(""),_=r[0],P=r[r.length-1];return`<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${M}<path d="${p}" fill="none" stroke="#f3e9cf" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${p}" fill="none" stroke="#d8c79f" stroke-width="1.4" stroke-dasharray="3 4" stroke-linecap="round"/>${v}
    <circle cx="${(_.x*f+u).toFixed(1)}" cy="${(_.z*f+m).toFixed(1)}" r="4.6" fill="#4fae9a" stroke="#fff" stroke-width="1.6"/>
    <circle cx="${(P.x*f+u).toFixed(1)}" cy="${(P.z*f+m).toFixed(1)}" r="4.6" fill="#ec6c8a" stroke="#fff" stroke-width="1.6"/></svg>`}function dc(i){let t=(s,r,a)=>`<div class="run-hrow"><b aria-hidden="true">${s}</b><div><strong>${r}</strong><span>${a}</span></div></div>`,e={park:"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078\u3002\u30C8\u30F3\u30CD\u30EB\u306E \u4E2D\u3067 \u304B\u3079\u306B \u3076\u3064\u304B\u308B\u3068 \u304A\u305D\u304F \u306A\u308B\u3088",beach:"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078\u3002\u3046\u307F\u3079\u306F \u307F\u3058\u304B\u3044 \u30B9\u30EF\u30A4\u30D7\u3067\u3082 \u3046\u3054\u3051\u308B\u3088",forest:"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078"}[i]||"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078",n={park:"\u30B8\u30E3\u30F3\u30D7\u3002\u30CF\u30FC\u30C9\u30EB\u3092 \u3068\u3073\u3053\u3048\u3088\u3046\u3002\u30C8\u30F3\u30CD\u30EB\u306F \u305D\u306E\u307E\u307E \u306F\u3057\u3063\u3066\u306D",beach:"\u30B8\u30E3\u30F3\u30D7\u3002\u308A\u3085\u3046\u307C\u304F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046\u3002\u3059\u306A\u306E \u4E0A\u306F \u3059\u3053\u3057 \u304A\u305D\u304F \u306A\u308B\u3088",forest:"\u30B8\u30E3\u30F3\u30D7\u3002\u307E\u308B\u305F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046"}[i]||"\u30B8\u30E3\u30F3\u30D7\u3002\u30CF\u30FC\u30C9\u30EB\u30FB\u308A\u3085\u3046\u307C\u304F\u30FB\u307E\u308B\u305F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046";return`<div class="run-hrows">
    ${t("\u2194","\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7",e)}
    ${t("\u21B1","\u307E\u304C\u308A\u304B\u3069","\u3084\u3058\u308B\u3057\u304C \u51FA\u305F\u3089\u3001\u307E\u304C\u308B \u307B\u3046\u3078 \u30B9\u30EF\u30A4\u30D7\u3002\u307E\u304C\u308A\u305D\u3053\u306D\u3066 \u3068\u307E\u3063\u3066\u3082\u3001\u540C\u3058 \u30B9\u30EF\u30A4\u30D7\u3067 \u307E\u305F \u306F\u3057\u308A\u3060\u3059\u3088")}
    ${t("\u2191","\u3046\u3048\u306B \u30B9\u30EF\u30A4\u30D7",n)}
    ${t("\u2193","\u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7","\u3059\u3053\u3057\u3060\u3051 \u30D6\u30EC\u30FC\u30AD")}
    ${t("\u25CF","\u30BF\u30C3\u30D7","\u304A\u3084\u3064\u3092 20\u3053 \u3042\u3064\u3081\u308B\u3068\u3001\u3059\u304D\u306A \u3068\u304D\u306B \u30BF\u30C3\u30D7\u3067 3\u79D2 \u30C0\u30C3\u30B7\u30E5")}
  </div><p class="run-hnote">\u30AD\u30FC\u30DC\u30FC\u30C9\u306F \u3084\u3058\u308B\u3057\u3068 \u30B9\u30DA\u30FC\u30B9\u3067 \u3042\u305D\u3079\u307E\u3059</p>`}function Ru(i){let{container:t,look:e,neckWear:n=null,name:s="\u3046\u3061\u306E\u3053",rivals:r=[],art:a="",best:o=null,next:l=null,onExit:c=()=>{},onSelect:h=null,onNext:d=null,onFinish:f=()=>null}=i,u=cc(i.course),m=u.id,y=m==="park",p=new dr(m),g=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches),v=y?Eu(p.layout.obstacles):null,M=p.layout.point||ui,_=p.layout.length||ne.length,P=p.cpus.length+1,A=i.petScale||u.scale,C=l&&_r.some(z=>z.id===l)?cc(l):null,T=0,b=null,x=null,w=null,I=null,L=null,B=0,X=0,G=0,ht=null,N=0,st=0,ft=null,J=!1,it=null,vt=null,W=0,rt=6,mt="",k="",tt=!1,at=[],xt=new Map([[p.player.id,`${s}<small>\uFF08\u3046\u3061\u306E\u3053\uFF09</small>`],...p.cpus.map((z,dt)=>[z.id,r[dt]?r[dt].label:"\u304A\u3068\u3082\u3060\u3061"])]);t.className="run-root",t.dataset.course=m,t.innerHTML=`<canvas class="run-canvas" tabindex="0" aria-label="${u.name}\u306E \u30EC\u30FC\u30B9\u3002\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u30EC\u30FC\u30F3\u3068 \u307E\u304C\u308A\u304B\u3069\u3001\u3046\u3048\u3067 \u30B8\u30E3\u30F3\u30D7\u3001\u3057\u305F\u3067 \u30D6\u30EC\u30FC\u30AD\u3001\u304A\u3084\u3064\u304C \u305F\u307E\u3063\u305F\u3089 \u30BF\u30C3\u30D7\u3067 \u30C0\u30C3\u30B7\u30E5"></canvas>
    <div class="run-hud">
      <div class="run-top">
        <button class="closebtn run-btn" type="button" data-run="x" aria-label="\u30E9\u30F3\u3092 \u3084\u3081\u308B">${hc}</button>
        <div class="run-chip run-rank"><b data-q="rank">1</b><span>\u4F4D / ${P}\u3072\u304D</span></div>
        <div class="run-chip run-treat">${lc}<b data-q="treats">0</b></div>
        <span class="run-gap"></span>
        <button class="closebtn run-btn" type="button" data-run="help" aria-label="\u3042\u305D\u3073\u304B\u305F">\uFF1F</button>
        <button class="closebtn run-btn" type="button" data-run="pause" aria-label="\u3072\u3068\u3084\u3059\u307F" hidden>${uc}</button>
      </div>
      <div class="run-line">
        <div class="run-progress" role="progressbar" aria-label="\u30B3\u30FC\u30B9\u306E \u3059\u3059\u307F\u3050\u3042\u3044" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <i class="run-fill" data-q="fill"></i>${p.cpus.map((z,dt)=>`<i class="run-mark" data-row="${dt}" aria-hidden="true"></i>`).join("")}<i class="run-me" aria-hidden="true"></i>
        </div>
        <div class="run-chip run-clock" data-q="clock">00:00.0</div>
      </div>
    </div>
    <div class="run-cue" data-q="cue" role="status" hidden></div>
    <div class="run-count" data-q="count" aria-live="polite"></div>
    <div class="run-bottom">
      <div class="run-gauge-l">${lc}<b data-q="hint">\u30C0\u30C3\u30B7\u30E5</b></div>
      <div class="run-gauge" role="meter" aria-label="\u30C0\u30C3\u30B7\u30E5\u306E \u30B2\u30FC\u30B8" aria-valuemin="0" aria-valuemax="${ne.gaugeMax}" aria-valuenow="0"><i data-q="gauge"></i></div>
      <b class="run-gauge-n" data-q="gaugeN">0 / ${ne.gaugeMax}</b>
    </div>
    <div class="run-over" data-q="over" role="dialog" aria-modal="true" aria-label="\u30E9\u30F3\u306E \u30E1\u30CB\u30E5\u30FC" hidden></div>`;let Et=z=>t.querySelector(`[data-q="${z}"]`),Ct=z=>t.querySelector(`[data-run="${z}"]`),_t=t.querySelector(".run-canvas"),D=Et("over"),ae=t.querySelectorAll(".run-mark"),Kt=t.querySelector(".run-me");function jt(){b=new ms({canvas:_t,antialias:!0,powerPreference:"high-performance"}),b.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),b.outputColorSpace=Je,b.shadowMap.enabled=!0,b.shadowMap.type=sr,b.toneMapping=rr,b.toneMappingExposure=1,x=new xs,x.background=new Gt(u.sky),x.fog=new gs(u.sky,u.fog[0],u.fog[1]),w=new qe(60,1,.1,180),x.add(new bs("#fffaf0",u.ground,2.1)),I=new Ss("#fff7ea",2.1),I.castShadow=!0,I.shadow.mapSize.set(1024,1024),Object.assign(I.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.5,far:45}),I.shadow.bias=-3e-4,I.shadow.normalBias=.03,x.add(I,I.target);let z=new fe(new ke(134,24,12),new en({side:We,depthWrite:!1,uniforms:{zenith:{value:new U(...u.zenith)},horizon:{value:new U(...u.horizon)}},vertexShader:"varying float altitude; void main(){altitude=position.y/134.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform vec3 zenith; uniform vec3 horizon; varying float altitude; void main(){vec3 sky=mix(horizon,zenith,smoothstep(-.035,.34,altitude));gl_FragColor=vec4(sky,1.);}"}));z.name="park-sky",z.renderOrder=-10,x.add(z),L=Tu(p.layout),x.add(L.root);let dt=new Cn({colorWrite:!1}),Mt=new ci(u.shadow,24),Tt=new Ke({color:"#536848",transparent:!0,opacity:.15});[{look:e,neck:n,detail:1},...p.cpus.map(($,j)=>({look:r[j]&&r[j].look||e,neck:null,detail:.6}))].forEach(($,j)=>{let Z=Rs($.look,$.neck,{detail:$.detail});Z.scale.setScalar(A),Z.rotation.y=Math.PI;let et=[],gt=[];if(j){let Lt=[];Z.traverse(bt=>{bt.isMesh&&Lt.push(bt)});for(let bt of Lt){bt.castShadow=!1;for(let Vt of[].concat(bt.material))et.includes(Vt)||(Vt.transparent=!0,et.push(Vt));let yt=new fe(bt.geometry,dt);yt.renderOrder=1,yt.visible=!1,yt.castShadow=!1,yt.frustumCulled=bt.frustumCulled,bt.add(yt),gt.push(yt)}}let lt=new fe(Mt,Tt);lt.rotation.x=-Math.PI/2,x.add(Z,lt),at.push({pet:Z,shadow:lt,mats:et,depth:gt,fade:1})}),w.position.set(0,2.8,6),ft=Ia(b,I),zt()}function zt(){if(!b)return;let z=t.getBoundingClientRect();z.width<1||z.height<1||(b.setSize(z.width,z.height,!1),w.aspect=z.width/z.height,w.fov=z.width>z.height?54:60,w.updateProjectionMatrix(),N=performance.now()+600,st=3)}function oe(z,dt,Mt){if(D.hidden=z==null,D.className="run-over"+(Mt?" "+Mt:""),t.classList.toggle("menu",z!=null),D.innerHTML=z==null?"":`<div class="run-card">${z}</div>`,Ht(),z!=null){let Tt=D.querySelector(dt||".btn.primary")||D.querySelector("button");if(Tt)try{Tt.focus({preventScroll:!0})}catch{}}return D}function Ht(){let z=p.status==="running"||p.status==="countdown";Ct("pause").hidden=!z||!D.hidden,Ct("help").hidden=z&&D.hidden||tt}let R=()=>h?'<button class="btn" type="button" data-m="select">\u30B3\u30FC\u30B9\u3092 \u3048\u3089\u3076</button>':"";function S(z){let dt=z.querySelector('[data-m="select"]');dt&&dt.addEventListener("click",()=>h())}function q(){vt=null;let z=oe(`<span class="run-over-l">\u30EC\u30FC\u30B9\u30FB${u.level}</span><h2>${u.name}</h2>
      <p class="run-sub">${s}\u3068 \u304A\u3068\u3082\u3060\u3061 ${P-1}\u3072\u304D\u3067\u3001<br>\u30B4\u30FC\u30EB\u307E\u3067 \u304D\u3087\u3046\u305D\u3046\uFF01</p>
      ${o?`<p class="run-best">\u30D9\u30B9\u30C8 <b>${mi(o)}</b></p>`:""}
      <div class="btnrow">${R()}<button class="btn primary" type="button" data-m="go">\u306F\u3057\u308B</button></div>`,'[data-m="go"]',"top");z.querySelector('[data-m="go"]').addEventListener("click",nt),S(z)}function ct(z){vt=z,oe(`<h2>\u3042\u305D\u3073\u304B\u305F</h2>${dc(m)}<div class="btnrow"><button class="btn primary" type="button" data-m="ok">\u308F\u304B\u3063\u305F</button></div>`).querySelector('[data-m="ok"]').addEventListener("click",ut)}function ut(){let z=vt;vt=null,z&&z()}function nt(){it=null,vt=null,oe(null),p.start(),kt(),Ht();try{_t.focus({preventScroll:!0})}catch{}}function Ft(){if(it=null,p.pause(),p.status!=="paused")return;vt=null;let z=oe(`<h2>\u3072\u3068\u3084\u3059\u307F</h2><p class="run-sub">${u.name}\u306E \u3068\u3061\u3085\u3046\u3060\u3088</p>
      <div class="btnrow"><button class="btn" type="button" data-m="restart">\u3055\u3044\u3057\u3087\u304B\u3089</button><button class="btn primary" type="button" data-m="resume">\u3064\u3065\u3051\u308B</button></div>
      ${h?`<div class="btnrow run-more">${R()}</div>`:""}`,'[data-m="resume"]');z.querySelector('[data-m="resume"]').addEventListener("click",It),z.querySelector('[data-m="restart"]').addEventListener("click",Pt),S(z),kt()}function It(){oe(null),p.resume(),X=performance.now(),kt(),Ht();try{_t.focus({preventScroll:!0})}catch{}}function Pt(){p.reset(),L.resetTreats(),w.position.set(0,2.8,6),rt=6,X=performance.now(),T++,Qt=null,nt()}let Qt=null;function pt(z){let dt=p.result,Mt=dt.rank===1,Tt=dt.standings.map(({id:bt,time:yt},Vt)=>`<li${bt===p.player.id?' class="me"':""}><span>${Vt+1}\u4F4D</span><span>${xt.get(bt)}</span><b>${mi(yt)}</b></li>`).join(""),$=C&&d?`<button class="btn primary run-next" type="button" data-m="next" aria-label="\u3064\u304E\u306E \u30B3\u30FC\u30B9\u300C${C.name}\u300D\u3078">\u3064\u304E\u306E \u30B3\u30FC\u30B9\u3078<small>${C.name}</small></button>`:"",j=`<button class="btn${$?"":" primary"}" type="button" data-m="exit">\u304A\u308F\u308B</button>`,Z=(h?R():"")+($?j:""),et=oe(`<span class="run-over-l">${u.name}</span>
      <div class="run-res">${a?`<div class="run-art" aria-hidden="true">${a}</div>`:""}<div class="run-rankbig"><b>${dt.rank}</b><span>\u4F4D / ${P}\u3072\u304D</span></div></div>
      <h2>${Mt?"\u3044\u3061\u3070\u3093\u3067 \u30B4\u30FC\u30EB\uFF01":"\u3055\u3044\u3054\u307E\u3067 \u306F\u3057\u3063\u305F\u306D\uFF01"}</h2>
      <div class="run-stats">
        <div><span>\u30BF\u30A4\u30E0</span><b>${mi(dt.time)}</b></div><div><span>\u304A\u3084\u3064</span><b>${dt.treats}\u3053</b></div>
        <div><span>\u30C0\u30C3\u30B7\u30E5</span><b>${dt.dashes}\u56DE</b></div><div><span>\u3054\u3064\u3093</span><b>${dt.hits}\u56DE</b></div>
      </div>
      <p class="run-sub">\u307E\u304C\u308A\u305D\u3053\u306D ${dt.turnMisses}\u56DE</p>
      <div class="run-rec" data-q="rec" role="status">${Qt??'<span class="run-rec-wait">\u304D\u308D\u304F \u3057\u3066\u3044\u308B\u3088\u2026</span>'}</div>
      <details class="run-order"><summary>${P}\u3072\u304D\u306E \u3058\u3085\u3093\u3044\u3068 \u30BF\u30A4\u30E0</summary><ol>${Tt}</ol></details>
      <div class="btnrow"><button class="btn" type="button" data-m="again">\u3082\u3046\u3044\u3061\u3069</button>${$||j}</div>
      ${Z?`<div class="btnrow run-more">${Z}</div>`:""}`,'[data-m="again"]');et.querySelector('[data-m="again"]').addEventListener("click",Pt),et.querySelector('[data-m="exit"]').addEventListener("click",()=>c());let gt=et.querySelector('[data-m="next"]');if(gt&&gt.addEventListener("click",()=>d(C.id)),S(et),!z)return;Qt=null;let lt=++T,Lt;try{Lt=f({course:m,ms:vr(dt.time),time:dt.time,rank:dt.rank,misses:dt.hits+dt.turnMisses,treats:dt.treats,hits:dt.hits,turnMisses:dt.turnMisses})}catch{Lt=null}Promise.resolve(Lt).then(bt=>bt,()=>null).then(bt=>{if(J||lt!==T)return;Qt=bt||"";let yt=Et("rec");yt&&(yt.innerHTML=Qt)})}function Ot(z,dt){it=null,p.pause(),tt=!0,oe(`<h2>${z}</h2><p class="run-sub">${dt}</p><div class="btnrow"><button class="btn primary" type="button" data-m="exit">\u3068\u3058\u308B</button></div>`).querySelector('[data-m="exit"]').addEventListener("click",()=>c())}function kt(){Et("rank").textContent=p.rank,Et("treats").textContent=p.treatCount;let z=Math.min(100,p.player.s/_*100);Et("fill").style.width=z+"%",t.querySelector(".run-progress").setAttribute("aria-valuenow",Math.round(z)),Et("clock").textContent=yr(p.time),Kt.hidden=p.status==="paused",Kt.style.left=z+"%",p.cpus.forEach(($,j)=>{ae[j].style.left=Math.max(0,Math.min(100,$.s/_*100))+"%"});let dt=p.player.boost>0,Mt=p.gauge===ne.gaugeMax&&!dt;Et("gaugeN").textContent=dt?`${p.player.boost.toFixed(1)}\u79D2`:`${p.gauge} / ${ne.gaugeMax}`,Et("gauge").style.width=p.gauge/ne.gaugeMax*100+"%",t.querySelector(".run-gauge").setAttribute("aria-valuenow",p.gauge),t.classList.toggle("dash-ready",Mt),t.classList.toggle("boosting",dt),Et("hint").textContent=dt?"\u30C0\u30C3\u30B7\u30E5\u3061\u3085\u3046":Mt?"\u30BF\u30C3\u30D7\u3067 \u30C0\u30C3\u30B7\u30E5":"\u30C0\u30C3\u30B7\u30E5",Zt();let Tt=p.status==="countdown"?String(Math.ceil(p.countdown)):"";Tt!==mt&&(mt=Tt,Et("count").textContent=Tt,Et("count").classList.toggle("show",!!Tt))}function Zt(){let z=p.status==="running"?p.turnCue:null,dt=Et("cue");if(dt.hidden=!z,t.classList.toggle("turn-visible",!!z),!z){k="";return}let Mt=z.direction==="right",Tt=Mt?"\u307F\u304E":"\u3072\u3060\u308A",$=z.waiting?"waiting":z.armed?"armed":z.active?"active":"ahead",j=z.waiting?`${Tt}\u3078 \u30B9\u30EF\u30A4\u30D7`:z.armed?p.player.s>=z.start?`${Tt}\u30AB\u30FC\u30D6`:`${Tt}\u3078 OK`:z.active?`${Tt}\u3078 \u30B9\u30EF\u30A4\u30D7`:`\u3053\u306E \u3055\u304D ${Tt}\u30AB\u30FC\u30D6`,Z=`${z.id}:${$}:${j}`;Z!==k&&(k=Z,dt.dataset.state=$,dt.innerHTML=`<strong aria-hidden="true">${Mt?"\u21B1":"\u21B0"}</strong><span><small>\u307E\u304C\u308A\u304B\u3069 ${z.id+1} / ${p.layout.turns.length}</small><b>${j}</b></span>${z.armed?'<i aria-hidden="true">\u2713</i>':""}`)}function Nt(z){if(J)return;B=requestAnimationFrame(Nt);let dt=X?Math.max(0,Math.min(.2,(z-X)/1e3)):0;X=z;let Mt=Math.max(1,Math.ceil(dt/.05));for(let lt=0;lt<Mt;lt++)p.step(dt/Mt);for(let lt of p.drainEvents())lt.type==="treat"?L.collectTreat(lt.id):lt.type==="finish"&&pt(!0);let Tt=p.status==="running"||p.status==="countdown";if(p.status!==ht&&(ht=p.status,N=z+600,st=3),!Tt&&z>N&&st<=0)return;st--;let $=Da(p,!1);[p.player,...p.cpus].forEach((lt,Lt)=>{if(p.status==="paused")return;let bt=at[Lt],{pet:yt,shadow:Vt}=bt,Ae=Lt===0&&p.waitingTurn!==null;if(Lt){let ve=p.player.s-lt.s,O=ve>.4&&ve<rt+.5&&Math.abs(lt.x-p.player.x)<1.35?.32:1;if(bt.fade!==O){bt.fade+=(O-bt.fade)*Math.min(1,dt*8||1),Math.abs(bt.fade-O)<.01&&(bt.fade=O);for(let Y of bt.mats)Y.opacity=bt.fade;for(let Y of bt.depth)Y.visible=bt.fade<1}}let Ue=p.status==="running"&&lt.finishTime===null&&!Ae,Ve=M(lt.s,lt.x),Ie=$n(lt.s,0,0,p.layout.turns);yt.position.set(Ve.x,lt.y+(Ue&&!g?Math.abs(Math.cos(lt.phase*1.85))*.025:0),Ve.z),yt.rotation.order="YXZ",yt.rotation.x=0,yt.rotation.y=Math.PI-Ve.heading,yt.rotation.z=Ue&&!g?(lt.lane*ne.lanewidth-lt.x)*.07+(Ie?Ie.direction==="right"?.08:-.08:0):0,Ua(yt,lt.phase,Ue,lt.jumpElapsed!==null,$),Is(yt,z/1e3+Lt,Ue,{legs:!1,phase:lt.phase,airborne:lt.jumpElapsed!==null,reduced:g}),Vt.position.set(Ve.x,.035,Ve.z),Vt.scale.setScalar(lt.jumpElapsed!==null?.7:1)});let j=p.player;rt+=((y?Math.min(8.65,Math.max(6,3.58/w.aspect)):6)-rt)*(1-Math.exp(-dt*5));let Z=M(j.s,j.x),et;if(y)et=v(j,rt,2.8+(g?0:j.y*.18));else{let lt=w.position.y+(2.8+(g?0:j.y*.18)-w.position.y)*(1-Math.exp(-dt*6));et=pi(Z,{distance:rt,height:lt,lookHeight:1})}w.position.set(et.position.x,et.position.y,et.position.z),w.lookAt(et.target.x,et.target.y,et.target.z);let gt=et.zoom??1;Math.abs(w.zoom-gt)>1e-5&&(w.zoom=gt,w.updateProjectionMatrix()),x.getObjectByName("park-sky").position.copy(w.position),I.position.set(Z.x-7,12,Z.z+6),I.target.position.set(Z.x,0,Z.z),G+=dt,G>.08||p.status==="countdown"?(kt(),G=0):!y&&p.status==="running"&&Zt(),ft.sample(dt,p.status==="running"),b.render(x,w),W++}function ie(z){if(!(!z.isPrimary||p.status!=="running"||it)){it={id:z.pointerId,x:z.clientX,y:z.clientY,time:performance.now(),used:!1,tap:!0};try{_t.setPointerCapture(z.pointerId)}catch{}}}function te(z,dt){if(!it||it.id!==z.pointerId||it.used)return;let Mt=z.clientX-it.x,Tt=z.clientY-it.y;Math.hypot(Mt,Tt)>=12&&(it.tap=!1);let $=Ba(Mt,Tt,performance.now()-it.time,!!u.flick);!$||$==="dash"&&(!dt||!it.tap)||(it.used=!0,p.input($))}let ce=z=>te(z,!1),F=z=>{it&&it.id===z.pointerId&&(it=null)},wt=z=>{te(z,!0),F(z)};function Q(z){if(z.target&&z.target.closest&&z.target.closest("button,summary"))return;let dt={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"jump",ArrowDown:"brake"," ":"dash"};dt[z.key]&&(z.preventDefault(),z.repeat||p.input(dt[z.key]))}let ot=()=>{document.hidden&&Ft()},Rt=z=>{J||(z.preventDefault(),Ot("3D\u306E \u304C\u3081\u3093\u304C \u3068\u307E\u3063\u305F\u3088","\u3044\u3061\u3069 \u3068\u3058\u3066\u3001<br>\u3082\u3046\u3044\u3061\u3069 \u3072\u3089\u3044\u3066\u306D"))};_t.addEventListener("pointerdown",ie),_t.addEventListener("pointermove",ce),_t.addEventListener("pointerup",wt),_t.addEventListener("pointercancel",F),_t.addEventListener("lostpointercapture",F),_t.addEventListener("webglcontextlost",Rt),t.addEventListener("keydown",Q),Ct("x").addEventListener("click",()=>{p.status==="running"||p.status==="countdown"?Ft():c()}),Ct("pause").addEventListener("click",Ft),Ct("help").addEventListener("click",()=>{if(vt)return;let z=p.status;ct(z==="paused"?Ft:z==="finished"?()=>pt(!1):q)}),document.addEventListener("visibilitychange",ot),addEventListener("blur",Ft),addEventListener("pagehide",Ft),addEventListener("resize",zt);let At=typeof ResizeObserver=="function"?new ResizeObserver(zt):null;At&&At.observe(t);let H=!0;try{jt(),q(),B=requestAnimationFrame(Nt)}catch(z){H=!1,console.error("run: 3D unavailable",z),Ot("3D\u306E \u304C\u3081\u3093\u3092 \u3072\u3089\u3051\u307E\u305B\u3093\u3067\u3057\u305F","\u3053\u306E\u7AEF\u672B\u3067\u306F \u3042\u305D\u3079\u306A\u3044\u307F\u305F\u3044")}return{ok:H,get sim(){return p},get renderer(){return b},get frames(){return W},get quality(){return ft?{level:ft.level,pixelRatio:ft.pixelRatio,shadows:ft.shadows}:null},get status(){return tt?"lost":p.status},course:m,pause:Ft,escape(){return tt?!1:vt?(ut(),!0):p.status==="running"||p.status==="countdown"?(Ft(),!0):!1},dispose(){if(J)return;J=!0,cancelAnimationFrame(B),_t.removeEventListener("webglcontextlost",Rt),At&&At.disconnect(),t.removeEventListener("keydown",Q),document.removeEventListener("visibilitychange",ot),removeEventListener("blur",Ft),removeEventListener("pagehide",Ft),removeEventListener("resize",zt);for(let{pet:Mt}of at)Ps(Mt);let z=new Set,dt=new Set;x&&x.traverse(Mt=>{Mt.geometry&&z.add(Mt.geometry),Mt.material&&[].concat(Mt.material).forEach(Tt=>dt.add(Tt)),Mt.isInstancedMesh&&Mt.dispose()}),z.forEach(Mt=>Mt.dispose()),dt.forEach(Mt=>Mt.dispose()),I&&I.dispose(),b&&(b.dispose(),b.forceContextLoss()),t.innerHTML=""}}}var Vx=Math.PI*10/2,Hx=[{straight:48},{turn:1},{straight:34},{turn:1},{straight:44},{turn:1},{straight:24},{turn:1},{straight:30}],fc=-24,pc=24,Oi=0,ka=0,Iu=Hx.map(i=>{let t=i.straight??Vx,e={start:ka,end:ka+t,x:fc,z:pc,heading:Oi,radius:10,turn:i.turn||0};if(i.turn){let n=Oi+i.turn*Math.PI/2;fc+=10/i.turn*(Math.cos(Oi)-Math.cos(n)),pc+=10/i.turn*(Math.sin(Oi)-Math.sin(n)),Oi=n}else fc+=Math.sin(Oi)*t,pc-=Math.cos(Oi)*t;return ka+=t,e}),Pu=ka,Lu={minX:-38,maxX:44,minZ:-48,maxZ:44};function mc(i,t=0){let e=Iu.find(o=>i<=o.end)||Iu.at(-1),n=i-e.start,{x:s,z:r,heading:a}=e;if(e.turn){let o=a+e.turn*n/e.radius;s+=e.radius/e.turn*(Math.cos(a)-Math.cos(o)),r+=e.radius/e.turn*(Math.sin(a)-Math.sin(o)),a=o}else s+=Math.sin(a)*n,r-=Math.cos(a)*n;return{x:s+Math.cos(a)*t,z:r+Math.sin(a)*t,heading:a}}var De=Object.freeze({count:6,spacing:3.6,offset:.9,speed:8,approach:4,exit:1.6,minOffset:.48,maxOffset:1.35}),In=(i,t)=>i.s+(t-(De.count-1)/2)*De.spacing,Us=(i,t)=>(i.startSide??-1)*(t%2?-1:1),Va=i=>In(i,0)-De.approach,Ha=i=>In(i,De.count-1)+De.exit;var Bi={length:Pu,speed:11.25,penalty:5};function Gx(){return{length:Bi.length,point:mc,bounds:Lu,theme:"field",turns:[],treats:[],obstacles:[{id:0,s:24,lane:0,type:"hurdle"},{id:1,s:76,lane:-1,type:"hoop"},{id:2,s:130,lane:1,type:"tunnel"},{id:3,s:148,lane:0,type:"hurdle"},{id:4,s:187,lane:1,type:"hoop"},{id:5,s:226,lane:0,type:"tunnel"}]}}function Wx(i="first-field"){let t=Gx();return t.courseId=["balance","zigzag","hill-field"].includes(i)?i:"first-field",i==="balance"&&(t.obstacles=[{id:0,s:24,lane:0,type:"hoop"},{id:1,s:76,lane:-1,type:"seesaw"},{id:2,s:130,lane:1,type:"tunnel"},{id:3,s:148,lane:0,type:"hurdle"},{id:4,s:187,lane:1,type:"hoop"},{id:5,s:226,lane:0,type:"seesaw"}]),i==="zigzag"&&(t.obstacles=[{id:0,s:24,lane:0,type:"hurdle"},{id:1,s:80,lane:0,type:"slalom",startSide:-1},{id:2,s:130,lane:1,type:"tunnel"},{id:3,s:148,lane:0,type:"hurdle"},{id:4,s:185,lane:0,type:"slalom",startSide:1},{id:5,s:226,lane:0,type:"hoop"}]),i==="hill-field"&&(t.length=196,t.obstacles=[{id:0,s:18,lane:0,type:"a-frame"},{id:1,s:38,lane:1,type:"hurdle"},{id:2,s:81,lane:-1,type:"tunnel"},{id:3,s:130,lane:-1,type:"a-frame"},{id:4,s:150,lane:0,type:"hoop"},{id:5,s:185,lane:1,type:"hurdle"}]),t}var Mr=class{constructor(t="first-field"){this.layout=Wx(t),this.reset()}reset(){this.status="ready",this.previousStatus=null,this.countdown=3,this.time=0,this.stopped=!1,this.player={id:"player",s:0,x:0,lane:0,y:0,surfaceY:0,pitch:0,jumpElapsed:null,phase:0,slow:0,boost:0,finishTime:null,hits:0},this.cpus=[],this.results=new Map,this.tunnelEntries=new Map,this.rampPass=null,this.seesaws=new Map(this.layout.obstacles.filter(t=>t.type==="seesaw").map(t=>[t.id,{phase:"idle",angle:_e.angle,elapsed:0,failed:!1}])),this.slaloms=new Map(this.layout.obstacles.filter(t=>t.type==="slalom").map(t=>[t.id,{index:0,side:0,passed:[],failed:!1}])),this.cleared=0,this.faults=0,this.events=[],this.result=null}start(){this.status==="ready"&&(this.status="countdown")}pause(){["countdown","running"].includes(this.status)&&(this.previousStatus=this.status,this.status="paused")}resume(){this.status==="paused"&&(this.status=this.previousStatus,this.previousStatus=null)}get nextObstacle(){return this.layout.obstacles.find(t=>!this.results.has(t.id))}get activeSeesaw(){let t=this.layout.obstacles.find(e=>e.type==="seesaw"&&["approach","hold","tipping","ready","exit"].includes(this.seesaws.get(e.id).phase));return t?{obstacle:t,state:this.seesaws.get(t.id)}:null}get activeSlalom(){let t=this.layout.obstacles.find(e=>e.type==="slalom"&&!this.results.has(e.id)&&this.player.s>=Va(e)&&this.player.s<Ha(e));return t?{obstacle:t,state:this.slaloms.get(t.id)}:null}get targetX(){let t=this.activeSlalom;return t?t.obstacle.lane*2+t.state.side*De.offset:this.player.lane*2}inTunnel(){return this.layout.obstacles.some(t=>t.type==="tunnel"&&Math.abs(this.player.s-t.s)<3.4&&Math.abs(this.player.x-t.lane*2)<.8)}input(t){if(this.status!=="running")return!1;let e=this.player,n=this.activeSeesaw;if(t==="brake")return this.stopped=!0,n?.state.phase==="approach"&&e.s-n.obstacle.s>=_e.stopFrom&&(n.state.phase="hold",n.state.elapsed=0),!0;if(t==="dash")return!this.stopped||n&&["hold","tipping"].includes(n.state.phase)?!1:(n?.state.phase==="ready"&&(n.state.phase="exit"),this.stopped=!1,!0);if(n||this.rampPass)return!1;let s=this.activeSlalom;return s?t==="left"||t==="right"?(s.state.side=t==="left"?-1:1,!0):!1:this.inTunnel()?!1:t==="left"||t==="right"?(e.lane=Math.max(-1,Math.min(1,e.lane+(t==="left"?-1:1))),!0):t==="jump"&&!this.stopped&&e.jumpElapsed===null?(e.jumpElapsed=0,!0):!1}score(t,e,n){this.results.has(t.id)||(this.results.set(t.id,!!e),e?(this.cleared++,this.events.push({type:"obstacle-clear",id:t.id})):(this.faults++,this.player.hits++,this.player.slow=.65,this.events.push({type:"obstacle-miss",id:t.id,reason:n})))}updateSlalom(t){let e=this.player,n=t.s;for(let s of this.layout.obstacles){if(s.type!=="slalom"||this.results.has(s.id))continue;let r=this.slaloms.get(s.id);for(n<Va(s)&&e.s>=Va(s)&&(e.lane=s.lane);r.index<De.count&&e.s>=In(s,r.index);){let a=fi(In(s,r.index),t,e.s),o=a&&(a.x-s.lane*2)*Us(s,r.index),l=!!a&&o>=De.minOffset&&o<=De.maxOffset&&a.y<.25;r.passed.push(l),r.failed||=!l,r.index++}n<Ha(s)&&e.s>=Ha(s)&&(e.lane=s.lane,this.score(s,!r.failed&&r.index===De.count,"slalom"))}}updateAFrame(t){let e=this.player,n=this.rampPass?.obstacle??this.nextObstacle;if(n?.type!=="a-frame")return;let s=n.s-Le.run,r=n.s+Le.run,a=fi(s,t,e.s);if(a){let l=n.lane*2,c=a.x,h=Math.abs(c-l)<=Le.entryTolerance;this.rampPass={obstacle:n,onBoard:h,clear:h&&a.grounded},h?(e.lane=n.lane,e.x=l):(e.lane-n.lane)*(c-l)<=0&&(e.lane=n.lane+Math.sign(c-l))}if(!this.rampPass)return;let o=mr(e.jumpElapsed);this.rampPass.onBoard&&(e.surfaceY=Ls(e.s-n.s),e.y=e.surfaceY+o,e.pitch=au(e.s-n.s)),e.s>=r&&(this.score(n,this.rampPass.clear,this.rampPass.onBoard?"ramp-jump":"ramp-entry"),this.rampPass=null,e.surfaceY=0,e.y=o,e.pitch=0)}updateSeesaw(t){let e=this.player,n=lu(),s=t.dt;for(let r of this.layout.obstacles){if(r.type!=="seesaw"||this.results.has(r.id))continue;let a=this.seesaws.get(r.id),o=fi(r.s-n,t,e.s);a.phase==="idle"&&o&&(Math.abs(o.x-r.lane*2)<.48&&o.grounded?(a.phase="approach",e.s=r.s-n+(e.s-(r.s-n))*_e.speed/Bi.speed,e.lane=r.lane,e.x=r.lane*2):(a.phase="missed",a.failed=!0)),a.phase==="approach"&&e.s>=r.s+_e.stopTo&&(e.s=r.s+_e.stopTo,this.stopped=!0,a.failed=!0,a.phase="hold",a.elapsed=0,this.events.push({type:"seesaw-recover"})),a.phase==="hold"?(a.elapsed+=s,a.elapsed>=_e.hold&&(a.phase="tipping",a.elapsed=0)):a.phase==="tipping"&&(a.elapsed=Math.min(_e.tipDuration,a.elapsed+s),a.angle=cu(a.elapsed/_e.tipDuration),a.elapsed>=_e.tipDuration&&(a.phase="ready")),["approach","hold","tipping","ready","exit"].includes(a.phase)&&(e.x=r.lane*2,e.surfaceY=La(e.s-r.s,a.angle),e.y=e.surfaceY,e.pitch=-a.angle),e.s>=r.s+n&&(this.score(r,a.phase==="exit"&&!a.failed,a.phase==="missed"?"board-entry":"board-stop"),a.phase="done",e.surfaceY=0,e.y=0,e.pitch=0)}}step(t){if(!Number.isFinite(t)||t<=0||t>.1)return;if(this.status==="countdown"){this.countdown=Math.max(0,this.countdown-t),this.countdown===0&&(this.status="running",this.events.push({type:"go"}));return}if(this.status!=="running")return;let e=this.player,n=e.s,s=this.time,r={s:n,x:e.x,target:this.targetX,jump:e.jumpElapsed,dt:t};this.time+=t,e.slow=Math.max(0,e.slow-t),e.jumpElapsed!==null&&(e.jumpElapsed+=t,e.jumpElapsed>=ne.jumpDuration?(e.jumpElapsed=null,e.y=0):e.y=mr(e.jumpElapsed)),e.x=pr(e.x,r.target,t),this.stopped||(e.s+=(this.activeSeesaw?_e.speed:this.activeSlalom?De.speed:Bi.speed)*(e.slow>0?.65:1)*t),this.updateAFrame(r),this.updateSeesaw(r),this.updateSlalom(r),e.phase+=e.s-n;for(let a of this.layout.obstacles){if(this.results.has(a.id)||a.type==="seesaw"||a.type==="slalom"||a.type==="a-frame")continue;let o=a.type==="tunnel";if(o){let h=fi(a.s-3,r,e.s);h&&this.tunnelEntries.set(a.id,Math.abs(h.x-a.lane*2)<.72&&h.y<.55)}let l=fi(a.s+(o?3:0),r,e.s);if(!l)continue;let c=Math.abs(l.x-a.lane*2)<.72;if(o){let h=this.tunnelEntries.get(a.id);this.score(a,h&&c&&l.y<.55,h?"tunnel-exit":"tunnel-entry")}else{let h=a.type==="hurdle"?l.y>=.74:l.y>=.7&&l.y<=1.6;this.score(a,c&&h,c?"jump-low":"off-line")}}e.s>=this.layout.length&&(e.finishTime=s+t*(this.layout.length-n)/(e.s-n),e.s=this.layout.length,this.time=e.finishTime,this.status="finished",this.result={time:this.time,penalty:this.faults*Bi.penalty,total:this.time+this.faults*Bi.penalty,cleared:this.cleared,faults:this.faults},this.events.push({type:"finish"}))}drainEvents(){let t=this.events;return this.events=[],t}};function Du(i){let t=new Re;t.name="agility-arena";let e=i.bounds,n=i.point,s={"first-field":{lawn:"#a5c27a",leaves:"#85ab59",roof:"#d67d55",hill:"#b1cfaa",tree:"round"},zigzag:{lawn:"#9cc39a",leaves:"#528d78",roof:"#478c92",hill:"#98c5bb",tree:"pine"},balance:{lawn:"#bec682",leaves:"#96a451",roof:"#c79748",hill:"#becc9d",tree:"round"},"hill-field":{lawn:"#99be80",leaves:"#679b71",roof:"#537d9e",hill:"#9dbcb3",tree:"pine"}},r=s[i.courseId]??s["first-field"],a=new Map,o=k=>(a.has(k)||a.set(k,new Ke({color:k,roughness:1})),a.get(k));function l(k,tt,at=0,xt=0,Et=0,Ct=t){let _t=new fe(k,o(tt));return _t.position.set(at,xt,Et),_t.receiveShadow=!0,Ct.add(_t),_t}let c=(k,tt,at,xt,Et,Ct,_t,D=t)=>l(new Te(k,tt,at),xt,Et,Ct,_t,D),h=(k,tt,at,xt,Et,Ct,_t=t)=>l(new ue(k,k,tt,9),at,xt,Et,Ct,_t),d=741,f=()=>(d=Math.imul(d,1664525)+1013904223>>>0,d/4294967296);function u(k,tt,at,xt){let Et=new Pi(tt,o(at),xt.length),Ct=new Fe;Et.name=k;for(let _t=0;_t<xt.length;_t++){let D=xt[_t];Ct.position.set(D.x,D.y,D.z),Ct.scale.set(D.sx??1,D.sy??1,D.sz??1),Ct.rotation.set(0,D.angle??0,0),Ct.updateMatrix(),Et.setMatrixAt(_t,Ct.matrix)}return Et.receiveShadow=!0,t.add(Et),Et}let m=new ps(400,400,90,90);m.rotateX(-Math.PI/2);let y=[],p=new Gt;for(let k=0;k<m.attributes.position.count;k++){let tt=m.attributes.position.getX(k),at=m.attributes.position.getZ(k),xt=.011*Math.sin(at*.29)+.008*Math.cos(tt*.12);p.set(r.lawn).offsetHSL(0,0,xt),y.push(p.r,p.g,p.b)}m.setAttribute("color",new Yt(y,3));let g=new fe(m,new Ke({vertexColors:!0,roughness:1}));g.name="open-lawn",g.position.y=-.035,g.receiveShadow=!0,t.add(g);let v=new xe;v.setAttribute("position",new Yt([-.07,0,0,.07,0,0,.025,.2,0,0,0,-.07,0,0,.07,-.02,.17,.02],3)),v.computeVertexNormals();let M=[];for(let k=0;k<2300;k++){let tt=.4+f()*.7;M.push({x:e.minX+f()*(e.maxX-e.minX),y:-.015,z:e.minZ+f()*(e.maxZ-e.minZ),sx:tt,sy:tt,sz:tt,angle:f()*Math.PI})}let _=u("grass-tufts",v,"#91ad72",M);_.material.side=Pe;let P=[],A=[],C=[[e.minX,e.minZ],[e.maxX,e.minZ],[e.maxX,e.maxZ],[e.minX,e.maxZ]];for(let k=0;k<4;k++){let tt=C[k],at=C[(k+1)%4],xt=Math.hypot(at[0]-tt[0],at[1]-tt[1]),Et=Math.ceil(xt/4),Ct=-Math.atan2(at[0]-tt[0],tt[1]-at[1]);for(let _t=0;_t<Et;_t++){let D=_t/Et,ae=tt[0]+(at[0]-tt[0])*D,Kt=tt[1]+(at[1]-tt[1])*D;P.push({x:ae,y:.85,z:Kt});for(let jt of[.65,1.25])A.push({x:ae+(at[0]-tt[0])/Et/2,y:jt,z:Kt+(at[1]-tt[1])/Et/2,sz:xt/Et,angle:Ct})}}u("perimeter-posts",new Te(.2,1.7,.2),"#d4c4a2",P),u("perimeter-rails",new Te(.13,.16,1),"#e5d7b8",A);let T=[],b=[];for(let k=0;k<30;k++){let tt=k%4,at=(Math.floor(k/4)+.5)/8,xt,Et;tt<2?(xt=tt?e.maxX+7:e.minX-7,Et=e.minZ+at*(e.maxZ-e.minZ)):(xt=e.minX+at*(e.maxX-e.minX),Et=tt===2?e.minZ-7:e.maxZ+7),T.push({x:xt,y:2.2,z:Et}),b.push({x:xt,y:5.2,z:Et,sx:2.1,sy:2.5,sz:2.1}),b.push({x:xt+.8,y:6.8,z:Et-.3,sx:1.7,sy:1.8,sz:1.7})}u("arena-trees",new ue(.22,.3,4.4,8),"#8c7c57",T);let x=r.tree==="pine"?new Xe(1,2.35,7):new ze(1,1),w=u("arena-canopies",x,r.leaves,b);w.material.flatShading=!0;for(let k=0;k<7;k++){let tt=k*Math.PI*2/7,at=l(new ze(1,1),r.hill,Math.cos(tt)*135,0,Math.sin(tt)*135);at.scale.set(44,(i.courseId==="hill-field"?20:10)+k%3*3,36),at.material.flatShading=!0}let I=new Re;I.position.set(e.maxX+9,0,10),t.add(I);for(let k of[-2.7,2.7])for(let tt of[-2.7,2.7])c(.22,3.4,.22,"#a2926e",k,1.7,tt,I);let L=l(new Xe(4.5,1.5,4),r.roof,0,4.1,0,I);L.rotation.y=Math.PI/4;for(let k of[-1,1])c(6.3,.24,.12,"#fff0cf",0,3.27,k*3.07,I),c(.12,.24,6.3,"#fff0cf",k*3.07,3.27,0,I);let B=new Map,X=new Map,G=new Map,ht=new Map;for(let k of i.obstacles){let tt=n(k.s,k.lane*2),at=new Re;if(at.name="race-obstacle",at.userData.obstacleId=k.id,at.position.set(tt.x,0,tt.z),at.rotation.y=-tt.heading,t.add(at),B.set(k.id,at),k.type==="hurdle"){for(let _t of[-.8,.8])c(.12,1.1,.14,"#5c8eab",_t,.55,0,at),c(.45,.08,.65,"#5c8eab",_t,.04,0,at);for(let _t=0;_t<8;_t++)c(.2,.11,.1,_t%2?"#c87961":"#fff1d5",-.7+_t*.2,.74,0,at)}else if(k.type==="hoop"){l(new pn(1.2,.09,10,40),"#e0b34f",0,1.7,0,at);for(let _t of[-1.35,1.35])c(.1,2.6,.12,"#5c8eab",_t,1.3,0,at),c(.18,.08,.08,"#78909a",_t*.945,1.7,0,at),c(.5,.08,.7,"#5c8eab",_t,.04,0,at)}else if(k.type==="a-frame")ou(at,c);else if(k.type==="slalom"){let _t=[];ht.set(k.id,_t);for(let D=0;D<De.count;D++){let ae=new Re;ae.name="slalom-pole",ae.userData={obstacleId:k.id,poleIndex:D},ae.position.z=k.s-In(k,D),at.add(ae),h(.075,1.9,"#f5eed8",0,.95,0,ae);let Kt=h(.079,.55,"#548cba",0,1.35,0,ae);Kt.material=Kt.material.clone(),_t.push(Kt),h(.08,.3,"#548cba",0,.35,0,ae),c(.38,.045,.38,"#c9c4a7",0,.025,0,ae)}}else if(k.type==="seesaw"){let _t=new Re;_t.name="rigid-plank",_t.userData.obstacleId=k.id,_t.position.y=_e.pivotHeight,_t.rotation.x=_e.angle,at.add(_t),G.set(k.id,_t),c(_e.width,_e.thickness,5.2,"#548cba",0,0,0,_t);for(let ae of[-3.3,3.3])c(_e.width,_e.thickness,1.4,"#edcb62",0,0,ae,_t);for(let ae of[-.72,.72]){for(let Kt of[-1,1]){let jt=c(.12,1.05,.12,"#748889",ae,.47,Kt*.23,at);jt.rotation.x=Kt*-.46}c(.18,.08,1.15,"#748889",ae,.04,0,at)}let D=h(.052,1.7,"#a6b2ad",0,_e.pivotHeight,0,at);D.name="seesaw-axle",D.rotation.z=Math.PI/2}else gr(at,l),c(.12,.1,6,"#548cba",-1.58,.05,0,at),c(.12,.1,6,"#548cba",1.58,.05,0,at);h(.045,.9,"#ad9f7d",2.7,.45,1,at);let xt=c(.68,.8,.1,"#f5eed8",2.7,1.12,1,at);xt.material=xt.material.clone(),X.set(k.id,xt);let Et=["bc","abged","abgcd","fgbc","afgcd","afgecd"],Ct={a:[0,.27,.28,.045],g:[0,0,.28,.045],d:[0,-.27,.28,.045],f:[-.15,.14,.045,.22],b:[.15,.14,.045,.22],e:[-.15,-.14,.045,.22],c:[.15,-.14,.045,.22]};for(let _t of Et[k.id]){let[D,ae,Kt,jt]=Ct[_t];c(Kt,jt,.015,"#48684f",2.7+D,1.12+ae,1.06,at)}}let N=new Re;N.name="next-obstacle-marker",t.add(N);let st=l(new Ma(1.8,1.95,48),"#e9cf76",0,.015,0,N);st.rotation.x=-Math.PI/2,st.material=st.material.clone(),st.material.transparent=!0,st.material.opacity=.65;let ft=new Re,J=n(i.length);ft.name="finish-gate",ft.position.set(J.x,0,J.z),ft.rotation.y=-J.heading,t.add(ft);let it=n(0);for(let[k,tt]of[[ft,"#e8c86b"]])for(let at of[-2.8,2.8])h(.055,1.8,"#f5eed8",at,.9,0,k),c(.65,.43,.035,tt,at+.3,1.5,0,k),c(.32,.06,.32,"#c9c4a7",at,.03,0,k);for(let k of[-2.8,2.8])h(.055,1.3,"#f5eed8",it.x+k,.65,it.z),c(.55,.35,.035,"#83aabd",it.x+k+.25,1.05,it.z);let vt="";function W(k){let tt=k.nextObstacle,at=`${tt?.id}:${k.results.size}:${[...k.slaloms.values()].map(xt=>xt.index).join(",")}`;if(at!==vt){if(vt=at,N.visible=!!tt,N.scale.setScalar(1),tt){let xt=B.get(tt.id);if(N.position.copy(xt.position),N.rotation.y=xt.rotation.y,tt.type==="a-frame"){let Et=n(tt.s-Le.run,tt.lane*2);N.position.set(Et.x,.012,Et.z),N.scale.setScalar(.56)}if(tt.type==="slalom"){let Et=k.slaloms.get(tt.id).index;if(N.visible=Et<De.count,N.visible){let Ct=n(In(tt,Et),tt.lane*2+Us(tt,Et)*De.offset);N.position.set(Ct.x,.012,Ct.z),N.scale.setScalar(.3)}}}for(let xt of i.obstacles)X.get(xt.id).material.color.set(k.results.has(xt.id)?k.results.get(xt.id)?"#b6d59c":"#d9aa8d":xt.id===tt?.id?"#f4d77b":"#f5eed8");for(let[xt,Et]of ht){let Ct=k.slaloms.get(xt);Et.forEach((_t,D)=>_t.material.color.set(D<Ct.index?Ct.passed[D]?"#8eb87c":"#ca8f75":tt?.id===xt&&D===Ct.index?"#e5bd5c":"#548cba"))}}}function rt(k){for(let[tt,at]of G)at.rotation.x=k.seesaws.get(tt).angle}function mt(){vt="",N.visible=!1,N.scale.setScalar(1);for(let k of X.values())k.material.color.set("#f5eed8");for(let k of G.values())k.rotation.x=_e.angle;for(let k of ht.values())for(let tt of k)tt.material.color.set("#548cba")}return mt(),{root:t,resetTreats:mt,collectTreat(){},update:W,animate:rt}}var br=[{id:"first-field",name:"\u306F\u3058\u3081\u3066\u306E \u3072\u308D\u3070",level:"\u3084\u3055\u3057\u3044",lv:0,color:"#a5bd90",tree:"round",desc:"6\u3064\u306E \u3057\u3087\u3046\u304C\u3044\u3076\u3064\u3092\u3001\u3058\u3085\u3093\u3070\u3093\u306B \u30AF\u30EA\u30A2\u3057\u3088\u3046",tags:["\u30CF\u30FC\u30C9\u30EB","\u308F\u3063\u304B","\u30C8\u30F3\u30CD\u30EB"]},{id:"zigzag",name:"\u30B8\u30B0\u30B6\u30B0",level:"\u3075\u3064\u3046",lv:1,color:"#84aca0",tree:"pine",desc:"\u30DD\u30FC\u30EB\u306E \u3042\u3044\u3060\u3092\u3001\u307F\u304E\u30FB\u3072\u3060\u308A\u306B \u30EA\u30BA\u30E0\u3088\u304F \u3059\u3059\u3082\u3046",tags:["\u30B9\u30E9\u30ED\u30FC\u30E0","\u30CF\u30FC\u30C9\u30EB","\u30C8\u30F3\u30CD\u30EB"]},{id:"balance",name:"\u30D0\u30E9\u30F3\u30B9",level:"\u3080\u305A\u304B\u3057\u3044",lv:2,color:"#a6ae86",tree:"round",desc:"\u3068\u307E\u3063\u3066\u3001\u307E\u3063\u3066\u3001\u307E\u305F \u3059\u3059\u3080\u3002\u30B7\u30FC\u30BD\u30FC\u306B \u3061\u3087\u3046\u305B\u3093",tags:["\u30B7\u30FC\u30BD\u30FC","\u308F\u3063\u304B","\u30CF\u30FC\u30C9\u30EB"]},{id:"hill-field",name:"\u304A\u304B\u306E \u3072\u308D\u3070",level:"\u3075\u3064\u3046",lv:1,color:"#7ca69b",tree:"pine",desc:"\u304D\u3044\u308D\u3044 \u3044\u308A\u3050\u3061\u3092 \u306D\u3089\u3063\u3066\u30012\u3064\u306E \u3055\u304B\u3092 \u304B\u3051\u306C\u3051\u3088\u3046",tags:["A\u30D5\u30EC\u30FC\u30E0","\u30C8\u30F3\u30CD\u30EB","\u308F\u3063\u304B"]}],xc=i=>br.find(t=>t.id===i)||br[0],Yn={sky:"#bad7e3",fog:[85,175],zenith:[.26,.67,.88],horizon:[.73,.91,.89],ground:"#a3b48a",scale:.76,shadow:.8},gc={hurdle:"\u30CF\u30FC\u30C9\u30EB",hoop:"\u308F\u3063\u304B",tunnel:"\u30C8\u30F3\u30CD\u30EB",slalom:"\u30B9\u30E9\u30ED\u30FC\u30E0",seesaw:"\u30B7\u30FC\u30BD\u30FC","a-frame":"A\u30D5\u30EC\u30FC\u30E0"},Xx=["\u3072\u3060\u308A","\u307E\u3093\u306A\u304B","\u307F\u304E"],Uu={"first-field":{lawn:"#a5c27a",leaves:"#85ab59",tree:"round"},zigzag:{lawn:"#9cc39a",leaves:"#528d78",tree:"pine"},balance:{lawn:"#bec682",leaves:"#96a451",tree:"round"},"hill-field":{lawn:"#99be80",leaves:"#679b71",tree:"pine",hill:"#9dbcb3"}};function Nu(i){let t=xc(i),e=Uu[t.id]||Uu["first-field"],n=new Mr(t.id).layout,s=T=>(Math.round(T*10)/10).toString(),r=22,a=95,o=T=>15-12*T,l=T=>85+12*T,c=(T,b)=>({x:T,y:b,k:(.72+.42*(b-r)/(a-r))*1.3}),h=T=>`<ellipse cx="0" cy=".4" rx="${T}" ry="1.6" fill="#2d4a2a" opacity=".16"/>`,d=T=>{switch(T.type){case"hurdle":return h(8)+'<rect x="-7.5" y="-8.5" width="1.6" height="8.5" rx=".5" fill="#3f6fa8"/><rect x="5.9" y="-8.5" width="1.6" height="8.5" rx=".5" fill="#3f6fa8"/><rect x="-6" y="-6.2" width="12" height="2" fill="#fff6e4"/>'+[-5,-1.2,2.6].map(b=>`<rect x="${b}" y="-6.2" width="1.9" height="2" fill="#d4654f"/>`).join("")+'<rect x="-8.6" y="-.9" width="3.8" height="1.1" rx=".4" fill="#3f6fa8"/><rect x="4.8" y="-.9" width="3.8" height="1.1" rx=".4" fill="#3f6fa8"/>';case"hoop":return h(7)+'<rect x="-6.6" y="-14" width="1.4" height="14" rx=".5" fill="#3f6fa8"/><rect x="5.2" y="-14" width="1.4" height="14" rx=".5" fill="#3f6fa8"/><circle cx="0" cy="-8.6" r="4.6" fill="none" stroke="#e8893a" stroke-width="1.9"/><rect x="-7.4" y="-.9" width="3" height="1.1" rx=".4" fill="#3f6fa8"/><rect x="4.4" y="-.9" width="3" height="1.1" rx=".4" fill="#3f6fa8"/>';case"tunnel":return h(9)+'<path d="M-8.5 0A8.5 7.5 0 0 1 8.5 0Z" fill="#3f78b8"/>'+[-4.5,0,4.5].map(b=>`<path d="M${b} 0V${s(-Math.sqrt(Math.max(0,1-(b/8.5)**2))*7.5)}" stroke="#2f5f96" stroke-width=".7"/>`).join("")+'<path d="M-8.5 0A8.5 7.5 0 0 1 8.5 0" fill="none" stroke="#f2c94c" stroke-width="1.3"/><path d="M-4.6 0A4.6 4.4 0 0 1 4.6 0Z" fill="#1d3557"/>';case"slalom":return Array.from({length:De.count},(I,L)=>({x:(L-2.5)*3,y:(L-2.5)*-.9})).sort((I,L)=>I.y-L.y).map(I=>`<g transform="translate(${s(I.x)} ${s(I.y)})"><ellipse cx="0" cy=".3" rx="1.6" ry=".7" fill="#2d4a2a" opacity=".16"/><rect x="-.65" y="-10" width="1.3" height="10" rx=".5" fill="#fffdf4"/><rect x="-.65" y="-7.4" width="1.3" height="2.2" fill="#3f6fa8"/><rect x="-.65" y="-3.2" width="1.3" height="1.6" fill="#3f6fa8"/></g>`).join("");case"seesaw":return h(9.5)+'<path d="M-3.4 0L0 -5.4L3.4 0Z" fill="#3f6fa8"/><g transform="translate(0 -5.4) rotate(-13)"><rect x="-10" y="-1.1" width="20" height="2.2" rx=".6" fill="#4a86c0"/><rect x="-10" y="-1.1" width="4" height="2.2" rx=".6" fill="#f2c94c"/><rect x="6" y="-1.1" width="4" height="2.2" rx=".6" fill="#f2c94c"/></g>';case"a-frame":return h(10)+'<path d="M-9 0L0 -11L0 0Z" fill="#4b8f95"/><path d="M0 -11L9 0L0 0Z" fill="#3c777d"/><path d="M-9 0L-6.6 -2.9L6.6 -2.9L9 0Z" fill="#edc65e"/><path d="M0 -11V0" stroke="#2f6166" stroke-width=".6"/>'}return h(4)+'<circle cx="0" cy="-3" r="3" fill="#c78465"/>'},f=(T,b)=>`<g transform="translate(${s(T.x)} ${s(T.y)}) scale(${s(T.k)})"><ellipse cx="0" cy=".3" rx="2" ry=".8" fill="#2d4a2a" opacity=".16"/><path d="M0 0V-12" stroke="#fffdf4" stroke-width="1"/><path d="M.4 -12L6.4 -9.8L.4 -7.6Z" fill="${b}"/></g>`,u=["slalom","seesaw","a-frame"],m=[...new Set(n.obstacles.map(T=>T.type))];m.sort((T,b)=>(u.includes(b)?1:0)-(u.includes(T)?1:0));let y=m.length>=4?[[38,82],[68,50],[31,48],[73,80]]:[[52,80],[32,50],[68,52]],p=m.slice(0,y.length).map((T,b)=>{let x=c(...y[b]);return{y:x.y,svg:`<g transform="translate(${s(x.x)} ${s(x.y)}) scale(${s(x.k)})">${d({type:T})}</g>`}}),g=c(11,91),v=c(m.length>=4?47:75,m.length>=4?35:34);p.push({y:g.y,svg:f(g,"#4fae9a")},{y:v.y,svg:f(v,"#ec6c8a")}),p.sort((T,b)=>T.y-b.y);let M=[],_=(T,b,x)=>M.push(`<path d="M${s(T)} ${s(b)}v${s(-x)}" stroke="#fffaf0" stroke-width="1.2" stroke-linecap="round"/>`);for(let T=0;T<=8;T++){let b=o(0)+(l(0)-o(0))*T/8;_(b,r,4)}for(let T=0;T<=6;T++){let b=T/6,x=r+(a-r)*b,w=4+2.5*b;_(o(b),x,w),_(l(b),x,w)}let P=[`M${o(0)} ${r-3}H${l(0)}`,`M${o(0)} ${r-1.4}H${l(0)}`,`M${o(0)} ${r-3}L${o(1)} ${a-5.5}`,`M${l(0)} ${r-3}L${l(1)} ${a-5.5}`,`M${o(0)} ${r-1.4}L${o(1)} ${a-2.6}`,`M${l(0)} ${r-1.4}L${l(1)} ${a-2.6}`].map(T=>`<path d="${T}" stroke="#fffaf0" stroke-width=".9" fill="none" opacity=".95"/>`).join(""),A=(T,b,x)=>e.tree==="pine"?`<path d="M${T} ${b-x*1.5}l${x} ${x*2}h${-2*x}z" fill="${e.leaves}"/><path d="M${T} ${b-x*.4}v${x*.8}" stroke="#8c7c57" stroke-width="1"/>`:`<circle cx="${T}" cy="${b-x*.6}" r="${x}" fill="${e.leaves}"/><path d="M${T} ${b-x*.2}v${x*.6}" stroke="#8c7c57" stroke-width="1"/>`,C=Array.from({length:7},(T,b)=>`<path d="M${-20+b*18} 100L${-2+b*18} 14H${7+b*18}L${-11+b*18} 100Z" fill="#fff" opacity=".07"/>`).join("");return`<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M0 0h100v100H0z" fill="${e.lawn}"/>
    <path d="M0 0h100v15H0z" fill="#cfe6ee"/>${e.hill?`<path d="M-5 16Q20 2 45 14T105 13V16H-5z" fill="${e.hill}"/>`:'<path d="M-5 16Q30 9 60 14T105 12V16H-5z" fill="#b8d3b6"/>'}
    <path d="M0 15h100v85H0z" fill="${e.lawn}"/>${C}
    ${[[6,15,4.5],[17,14,3.5],[83,14,3.8],[94,15,4.5],[50,13.5,3]].map(([T,b,x])=>A(T,b,x)).join("")}
    <path d="M${o(0)} ${r}L${l(0)} ${r}L${l(1)} ${a}L${o(1)} ${a}Z" fill="#fff" opacity=".08"/>
    ${P}${M.join("")}${p.map(T=>T.svg).join("")}</svg>`}function _c(i){let t=(n,s,r)=>`<div class="run-hrow"><b aria-hidden="true">${n}</b><div><strong>${s}</strong><span>${r}</span></div></div>`,e={zigzag:t("\u21C6","\u30B9\u30E9\u30ED\u30FC\u30E0","\u3081\u3058\u308B\u3057\u306E \u307B\u3046\u3078\u3001\u307F\u304E\u30FB\u3072\u3060\u308A \u3053\u3046\u3054\u306B 6\u672C \u3068\u304A\u308D\u3046\u3002\u30DD\u30FC\u30EB\u306E \u308C\u3064\u306F \u30B8\u30E3\u30F3\u30D7 \u3067\u304D\u306A\u3044\u3088"),balance:t("\u25C7","\u30B7\u30FC\u30BD\u30FC","\u307E\u3093\u306A\u304B\u306E \u3042\u305F\u308A\u3067 \u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7\u3057\u3066 \u3068\u307E\u308B\u3002\u3044\u305F\u304C \u3055\u304C\u3063\u305F\u3089 \u30BF\u30C3\u30D7\u3067 \u307E\u305F \u3059\u3059\u3080\u3088"),"hill-field":t("\u25B3","A\u30D5\u30EC\u30FC\u30E0","\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u304D\u3044\u308D\u3044 \u3044\u308A\u3050\u3061\u306B \u3042\u308F\u305B\u3066\u3001\u305D\u306E\u307E\u307E \u3055\u304B\u3092 \u306F\u3057\u308A\u306C\u3051\u3088\u3046")}[i];return`<div class="run-hrows">
    ${t("\u2194","\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7",i==="zigzag"?"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078\u3002\u30DD\u30FC\u30EB\u306E \u3042\u3044\u3060\u3067\u306F 1\u56DE\u3067 \u307F\u304E\u30FB\u3072\u3060\u308A\u3078":"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078")}
    ${t("\u2191","\u3046\u3048\u306B \u30B9\u30EF\u30A4\u30D7","\u30B8\u30E3\u30F3\u30D7\u3002\u30CF\u30FC\u30C9\u30EB\u3084 \u308F\u3063\u304B\u3092 \u3068\u3073\u3053\u3048\u3088\u3046\u3002\u30C8\u30F3\u30CD\u30EB\u306F \u305D\u306E\u307E\u307E \u306F\u3057\u3063\u3066\u306D")}
    ${t("\u2193","\u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7","\u305D\u306E\u3070\u3067 \u3068\u307E\u308B\uFF08\u3068\u3051\u3044\u306F \u3059\u3059\u3080\u3088\uFF09")}
    ${t("\u25CF","\u30BF\u30C3\u30D7","\u3068\u307E\u3063\u3066\u3044\u308B \u3046\u3061\u306E\u3053\u304C \u307E\u305F \u306F\u3057\u308A\u3060\u3059\u3088")}
    ${e||(i?"":t("\u25C7","\u30B7\u30FC\u30BD\u30FC","\u307E\u3093\u306A\u304B\u3067 \u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7\u3002\u3044\u305F\u304C \u3055\u304C\u3063\u305F\u3089 \u30BF\u30C3\u30D7"))}
  </div><p class="run-hnote">\u30DF\u30B9 1\u56DE\u3067\u3001\u304D\u308D\u304F\u306B ${Bi.penalty}\u79D2 \u305F\u3055\u308C\u308B\u3088<br>\u30AD\u30FC\u30DC\u30FC\u30C9\u306F \u3084\u3058\u308B\u3057\u3068 \u30B9\u30DA\u30FC\u30B9\u3067 \u3042\u305D\u3079\u307E\u3059</p>`}function Fu(i){let{container:t,look:e,neckWear:n=null,name:s="\u3046\u3061\u306E\u3053",art:r="",best:a=null,next:o=null,onExit:l=()=>{},onSelect:c=null,onNext:h=null,onFinish:d=()=>null}=i,f=xc(i.course),u=f.id,m=new Mr(u),y=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches),p=m.layout.point,g=m.layout.length,v=m.layout.obstacles,M=v.length,_=i.petScale||Yn.scale,P=o&&br.some(H=>H.id===o)?xc(o):null,A=0,C=null,T=null,b=null,x=null,w=null,I=null,L=0,B=0,X=0,G=null,ht=0,N=0,st=null,ft=!1,J=null,it=null,vt=0,W=6,rt="",mt="",k=!1,tt=null,at=null;t.className="run-root run-agi",t.dataset.course=u,t.innerHTML=`<canvas class="run-canvas" tabindex="0" aria-label="${f.name}\u306E \u30A2\u30B8\u30EA\u30C6\u30A3\u3002\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u30EC\u30FC\u30F3\u3001\u3046\u3048\u3067 \u30B8\u30E3\u30F3\u30D7\u3001\u3057\u305F\u3067 \u3068\u307E\u308B\u3001\u30BF\u30C3\u30D7\u3067 \u307E\u305F \u3059\u3059\u3080"></canvas>
    <div class="run-hud">
      <div class="run-top">
        <button class="closebtn run-btn" type="button" data-run="x" aria-label="\u30E9\u30F3\u3092 \u3084\u3081\u308B">${hc}</button>
        <div class="run-chip run-rank"><b data-q="clear">0</b><span>/ ${M} \u30AF\u30EA\u30A2</span></div>
        <div class="run-chip run-miss"><span>\u30DF\u30B9</span><b data-q="miss">0</b></div>
        <span class="run-gap"></span>
        <button class="closebtn run-btn" type="button" data-run="help" aria-label="\u3042\u305D\u3073\u304B\u305F">\uFF1F</button>
        <button class="closebtn run-btn" type="button" data-run="pause" aria-label="\u3072\u3068\u3084\u3059\u307F" hidden>${uc}</button>
      </div>
      <div class="run-line">
        <div class="run-progress" role="progressbar" aria-label="\u30B3\u30FC\u30B9\u306E \u3059\u3059\u307F\u3050\u3042\u3044" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <i class="run-fill" data-q="fill"></i><i class="run-me" aria-hidden="true"></i>
        </div>
        <div class="run-chip run-clock" data-q="clock">00:00.0</div>
      </div>
    </div>
    <div class="run-cue" data-q="cue" role="status" hidden></div>
    <div class="run-count" data-q="count" aria-live="polite"></div>
    <div class="run-stop" data-q="stop" role="status" hidden>\u3068\u307E\u3063\u3066\u3044\u308B\u3088 <b>\u30BF\u30C3\u30D7\u3067 \u3059\u3059\u3080</b></div>
    <div class="run-bottom run-steps" role="list" aria-label="\u3057\u3087\u3046\u304C\u3044\u3076\u3064">${v.map((H,z)=>`<span class="run-step" role="listitem" data-step="${H.id}" data-state="pending" aria-label="\u3057\u3087\u3046\u304C\u3044\u3076\u3064 ${z+1}\uFF08${gc[H.type]||""}\uFF09\u307E\u3060">${z+1}</span>`).join("")}</div>
    <div class="run-over" data-q="over" role="dialog" aria-modal="true" aria-label="\u30E9\u30F3\u306E \u30E1\u30CB\u30E5\u30FC" hidden></div>`;let xt=H=>t.querySelector(`[data-q="${H}"]`),Et=H=>t.querySelector(`[data-run="${H}"]`),Ct=t.querySelector(".run-canvas"),_t=xt("over"),D=t.querySelector(".run-me"),ae=new Map([...t.querySelectorAll(".run-step")].map(H=>[Number(H.dataset.step),H]));function Kt(){T=new ms({canvas:Ct,antialias:!0,powerPreference:"high-performance"}),T.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),T.outputColorSpace=Je,T.shadowMap.enabled=!0,T.shadowMap.type=sr,T.toneMapping=rr,T.toneMappingExposure=1,b=new xs,b.background=new Gt(Yn.sky),b.fog=new gs(Yn.sky,Yn.fog[0],Yn.fog[1]),x=new qe(60,1,.1,180),b.add(new bs("#fffaf0",Yn.ground,2.1)),w=new Ss("#fff7ea",2.1),w.castShadow=!0,w.shadow.mapSize.set(1024,1024),Object.assign(w.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.5,far:45}),w.shadow.bias=-3e-4,w.shadow.normalBias=.03,b.add(w,w.target);let H=new fe(new ke(134,24,12),new en({side:We,depthWrite:!1,uniforms:{zenith:{value:new U(...Yn.zenith)},horizon:{value:new U(...Yn.horizon)}},vertexShader:"varying float altitude; void main(){altitude=position.y/134.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform vec3 zenith; uniform vec3 horizon; varying float altitude; void main(){vec3 sky=mix(horizon,zenith,smoothstep(-.035,.34,altitude));gl_FragColor=vec4(sky,1.);}"}));H.name="park-sky",H.renderOrder=-10,b.add(H),I=Du(m.layout),b.add(I.root),tt=Rs(e,n,{detail:1}),tt.scale.setScalar(_),tt.rotation.y=Math.PI,at=new fe(new ci(Yn.shadow,24),new Ke({color:"#536848",transparent:!0,opacity:.15})),at.rotation.x=-Math.PI/2,b.add(tt,at),x.position.set(0,2.8,6),st=Ia(T,w),jt()}function jt(){if(!T)return;let H=t.getBoundingClientRect();H.width<1||H.height<1||(T.setSize(H.width,H.height,!1),x.aspect=H.width/H.height,x.fov=H.width>H.height?54:60,x.updateProjectionMatrix(),ht=performance.now()+600,N=3)}function zt(H,z,dt){if(_t.hidden=H==null,_t.className="run-over"+(dt?" "+dt:""),t.classList.toggle("menu",H!=null),_t.innerHTML=H==null?"":`<div class="run-card">${H}</div>`,oe(),H!=null){let Mt=_t.querySelector(z||".btn.primary")||_t.querySelector("button");if(Mt)try{Mt.focus({preventScroll:!0})}catch{}}return _t}function oe(){let H=m.status==="running"||m.status==="countdown";Et("pause").hidden=!H||!_t.hidden,Et("help").hidden=H&&_t.hidden||k}let Ht=()=>c?'<button class="btn" type="button" data-m="select">\u30B3\u30FC\u30B9\u3092 \u3048\u3089\u3076</button>':"";function R(H){let z=H.querySelector('[data-m="select"]');z&&z.addEventListener("click",()=>c())}function S(){it=null;let H=zt(`<span class="run-over-l">\u30A2\u30B8\u30EA\u30C6\u30A3\u30FB${f.level}</span><h2>${f.name}</h2>
      <p class="run-sub">${s}\u3068 ${M}\u3064\u306E \u3057\u3087\u3046\u304C\u3044\u3076\u3064\u306B<br>\u3061\u3087\u3046\u305B\u3093\uFF01</p>
      ${a?`<p class="run-best">\u30D9\u30B9\u30C8 <b>${mi(a)}</b></p>`:""}
      <div class="btnrow">${Ht()}<button class="btn primary" type="button" data-m="go">\u306F\u3057\u308B</button></div>`,'[data-m="go"]',"top");H.querySelector('[data-m="go"]').addEventListener("click",ut),R(H)}function q(H){it=H,zt(`<h2>\u3042\u305D\u3073\u304B\u305F</h2>${_c(u)}<div class="btnrow"><button class="btn primary" type="button" data-m="ok">\u308F\u304B\u3063\u305F</button></div>`).querySelector('[data-m="ok"]').addEventListener("click",ct)}function ct(){let H=it;it=null,H&&H()}function ut(){J=null,it=null,zt(null),m.start(),pt(),oe();try{Ct.focus({preventScroll:!0})}catch{}}function nt(){if(J=null,m.pause(),m.status!=="paused")return;it=null;let H=zt(`<h2>\u3072\u3068\u3084\u3059\u307F</h2><p class="run-sub">${f.name}\u306E \u3068\u3061\u3085\u3046\u3060\u3088</p>
      <div class="btnrow"><button class="btn" type="button" data-m="restart">\u3055\u3044\u3057\u3087\u304B\u3089</button><button class="btn primary" type="button" data-m="resume">\u3064\u3065\u3051\u308B</button></div>
      ${c?`<div class="btnrow run-more">${Ht()}</div>`:""}`,'[data-m="resume"]');H.querySelector('[data-m="resume"]').addEventListener("click",Ft),H.querySelector('[data-m="restart"]').addEventListener("click",It),R(H),pt()}function Ft(){zt(null),m.resume(),B=performance.now(),pt(),oe();try{Ct.focus({preventScroll:!0})}catch{}}function It(){m.reset(),I.resetTreats(),x.position.set(0,2.8,6),W=6,B=performance.now(),A++,C=null;for(let H of ae.values())H.dataset.state="";ut()}function Pt(H){let z=m.result,dt=z.faults===0,Mt=P&&h?`<button class="btn primary run-next" type="button" data-m="next" aria-label="\u3064\u304E\u306E \u30B3\u30FC\u30B9\u300C${P.name}\u300D\u3078">\u3064\u304E\u306E \u30B3\u30FC\u30B9\u3078<small>${P.name}</small></button>`:"",Tt=`<button class="btn${Mt?"":" primary"}" type="button" data-m="exit">\u304A\u308F\u308B</button>`,$=(c?Ht():"")+(Mt?Tt:""),j=zt(`<span class="run-over-l">\u30A2\u30B8\u30EA\u30C6\u30A3\u30FB${f.name}</span>
      <div class="run-res">${r?`<div class="run-art" aria-hidden="true">${r}</div>`:""}<div class="run-total"><small>\u3054\u3046\u3051\u3044</small><span><b>${(Math.round(z.total*100)/100).toFixed(2)}</b>\u79D2</span></div></div>
      <h2>${dt?"\u30CE\u30FC\u30DF\u30B9\u3067 \u30B4\u30FC\u30EB\uFF01":"\u3055\u3044\u3054\u307E\u3067 \u306F\u3057\u3063\u305F\u306D\uFF01"}</h2>
      <div class="run-stats">
        <div><span>\u306F\u3057\u3063\u305F \u30BF\u30A4\u30E0</span><b>${mi(z.time)}</b></div><div><span>\u30DF\u30B9\u306E \u3076\u3093</span><b>+${z.penalty}\u79D2</b></div>
        <div><span>\u30AF\u30EA\u30A2</span><b>${z.cleared} / ${M}</b></div><div><span>\u30DF\u30B9</span><b>${z.faults}\u56DE</b></div>
      </div>
      <div class="run-rec" data-q="rec" role="status">${C??'<span class="run-rec-wait">\u304D\u308D\u304F \u3057\u3066\u3044\u308B\u3088\u2026</span>'}</div>
      <div class="btnrow"><button class="btn" type="button" data-m="again">\u3082\u3046\u3044\u3061\u3069</button>${Mt||Tt}</div>
      ${$?`<div class="btnrow run-more">${$}</div>`:""}`,'[data-m="again"]');j.querySelector('[data-m="again"]').addEventListener("click",It),j.querySelector('[data-m="exit"]').addEventListener("click",()=>l());let Z=j.querySelector('[data-m="next"]');if(Z&&Z.addEventListener("click",()=>h(P.id)),R(j),!H)return;C=null;let et=++A,gt;try{gt=d({course:u,mode:"agility",ms:vr(z.total),time:z.time,total:z.total,misses:z.faults,cleared:z.cleared})}catch{gt=null}Promise.resolve(gt).then(lt=>lt,()=>null).then(lt=>{if(ft||et!==A)return;C=lt||"";let Lt=xt("rec");Lt&&(Lt.innerHTML=C)})}function Qt(H,z){J=null,m.pause(),k=!0,zt(`<h2>${H}</h2><p class="run-sub">${z}</p><div class="btnrow"><button class="btn primary" type="button" data-m="exit">\u3068\u3058\u308B</button></div>`).querySelector('[data-m="exit"]').addEventListener("click",()=>l())}function pt(){xt("clear").textContent=m.cleared,xt("miss").textContent=m.faults;let H=Math.min(100,m.player.s/g*100);xt("fill").style.width=H+"%",t.querySelector(".run-progress").setAttribute("aria-valuenow",Math.round(H)),xt("clock").textContent=yr(m.time),D.hidden=m.status==="paused",D.style.left=H+"%",I&&I.update(m);let z=m.nextObstacle,dt=m.status==="running"||m.status==="countdown";v.forEach((Tt,$)=>{let j=ae.get(Tt.id),Z=m.results.has(Tt.id),et=m.results.get(Tt.id),gt=Z?et?"clear":"miss":z&&z.id===Tt.id&&dt?"next":"pending";if(j.dataset.state===gt)return;let lt=Z&&j.dataset.state!=="";j.dataset.state=gt,j.textContent=Z?et?"\u2713":"\u2212":String($+1),j.setAttribute("aria-label",`\u3057\u3087\u3046\u304C\u3044\u3076\u3064 ${$+1}\uFF08${gc[Tt.type]||""}\uFF09${Z?et?"\u30AF\u30EA\u30A2":"\u30DF\u30B9":"\u307E\u3060"}`),j.classList.toggle("pop",lt)}),xt("stop").hidden=!(m.stopped&&m.status==="running"&&!m.activeSeesaw),Ot();let Mt=m.status==="countdown"?String(Math.ceil(m.countdown)):"";Mt!==rt&&(rt=Mt,xt("count").textContent=Mt,xt("count").classList.toggle("show",!!Mt))}function Ot(){let H=m.status==="running"?m.nextObstacle:null,z=xt("cue");if(z.hidden=!H,t.classList.toggle("turn-visible",!!H),!H){mt="";return}let dt=m.player,Mt=Xx[H.lane+1]||"\u307E\u3093\u306A\u304B",Tt=Math.abs(dt.x-H.lane*2)<(H.type==="seesaw"?.48:H.type==="a-frame"?Le.entryTolerance:.72),$=(H.type==="slalom"?In(H,0):H.type==="a-frame"?H.s-Le.run:H.s)-dt.s<8,j=m.activeSeesaw,Z=m.activeSlalom,et=Tt?H.type==="tunnel"?"\u2229":["seesaw","slalom","a-frame"].includes(H.type)?"\u25C7":$?"\u2191":"\u25C7":H.lane*2<dt.x?"\u2190":"\u2192",gt=gc[H.type]||"",lt=`${H.id+1} / ${M}\u30FB${Mt}`,Lt=$?"active":"ahead";if(!Tt&&$&&!j&&!Z&&!m.rampPass?gt=`${Mt}\u3078`:Tt&&$&&(H.type==="hurdle"||H.type==="hoop")&&(gt=`${gt}\u3092 \u30B8\u30E3\u30F3\u30D7`),H.type==="a-frame"&&(m.rampPass?(et="\u25C7",gt=m.rampPass.onBoard?"\u3055\u304B\u3092 \u304B\u3051\u306C\u3051\u3088\u3046":"\u3055\u304B\u306E \u3088\u3053\u3092 \u3068\u304A\u3063\u3066\u3044\u308B\u3088"):$&&Tt&&(et="\u25C7",gt="\u304D\u3044\u308D\u3044 \u3044\u308A\u3050\u3061\u3078")),j){let yt=j.state.phase,Vt=dt.s-H.s>=_e.stopFrom;gt=yt==="hold"||yt==="tipping"?"\u3044\u305F\u304C \u3055\u304C\u308B\u307E\u3067 \u307E\u3063\u3066\u306D":yt==="ready"||m.stopped?"\u30BF\u30C3\u30D7\u3067 \u3059\u3059\u3080":yt==="exit"?"\u305D\u306E\u307E\u307E \u3059\u3059\u3082\u3046":Vt?"\u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u3068\u307E\u308B":"\u307E\u3093\u306A\u304B\u3078 \u3059\u3059\u3082\u3046",et=yt==="hold"||yt==="tipping"?"\u2026":yt==="ready"||m.stopped?"\u25CF":yt==="exit"?"\u2713":Vt?"\u2193":"\u25C7",(yt==="ready"||m.stopped&&yt!=="hold"&&yt!=="tipping"||yt==="approach"&&Vt)&&(Lt="waiting")}if(Z){let yt=Z.state.index,Vt=yt>=De.count,Ae=Us(H,yt)>0;et=Vt?"\u2713":Ae?"\u2192":"\u2190",gt=Vt?"\u3067\u3050\u3061\u3078":Ae?"\u307F\u304E\u3092 \u3068\u304A\u308B":"\u3072\u3060\u308A\u3092 \u3068\u304A\u308B",lt=`${H.id+1} / ${M}\u30FB\u30DD\u30FC\u30EB ${Math.min(yt+1,De.count)} / ${De.count}`}let bt=`${H.id}:${et}:${gt}:${lt}:${Lt}`;bt!==mt&&(mt=bt,z.dataset.state=Lt,z.innerHTML=`<strong aria-hidden="true">${et}</strong><span><small>${lt}</small><b>${gt}</b></span>`)}function kt(H){if(ft)return;L=requestAnimationFrame(kt);let z=B?Math.max(0,Math.min(.2,(H-B)/1e3)):0;B=H;let dt=Math.max(1,Math.ceil(z/.05));for(let bt=0;bt<dt;bt++)m.step(z/dt);I.animate(m);for(let bt of m.drainEvents())bt.type==="finish"&&Pt(!0);let Mt=m.status==="running"||m.status==="countdown";if(m.status!==G&&(G=m.status,ht=H+600,N=3),!Mt&&H>ht&&N<=0)return;N--;let Tt=m.player;if(m.status!=="paused"){let bt=Da(m,!0),yt=m.status==="running"&&Tt.finishTime===null&&!m.stopped,Vt=p(Tt.s,Tt.x);tt.position.set(Vt.x,Tt.y+(yt&&!y&&!Tt.surfaceY?Math.abs(Math.cos(Tt.phase*1.85))*.025:0),Vt.z),tt.rotation.order="YXZ",tt.rotation.x=Tt.pitch||0,tt.rotation.y=Math.PI-Vt.heading,tt.rotation.z=yt&&!y?(m.targetX-Tt.x)*.07:0,Ua(tt,Tt.phase,yt,Tt.jumpElapsed!==null,bt),Is(tt,H/1e3,yt,{legs:!1,phase:Tt.phase,airborne:Tt.jumpElapsed!==null,reduced:y}),at.position.set(Vt.x,.035,Vt.z),at.scale.setScalar(Tt.jumpElapsed!==null?.7:1),at.visible=!Tt.surfaceY}let $=v.some(bt=>bt.type==="tunnel"&&bt.s-Tt.s<9&&bt.s-Tt.s>-6&&Math.abs(Tt.x-bt.lane*2)<.8),j=Tt.surfaceY||0,Z=!!(m.rampPass&&m.rampPass.onBoard),et=Z?ru(j):j,gt=j?2.8+et:x.position.y+(($?1.15:2.8+(y?0:Tt.y*.18))-x.position.y)*(1-Math.exp(-z*6));W+=(($?4:6)-W)*(1-Math.exp(-z*5));let lt=p(Tt.s,Tt.x),Lt=pi(lt,{distance:W,height:gt,lookHeight:$?.65:1+et*(Z?.65:1)});x.position.set(Lt.position.x,Lt.position.y,Lt.position.z),x.lookAt(Lt.target.x,Lt.target.y,Lt.target.z),b.getObjectByName("park-sky").position.copy(x.position),w.position.set(lt.x-7,12,lt.z+6),w.target.position.set(lt.x,0,lt.z),X+=z,(X>.08||m.status==="countdown")&&(pt(),X=0),st.sample(z,m.status==="running"),T.render(b,x),vt++}let Zt=u==="hill-field";function Nt(H){if(!(!H.isPrimary||m.status!=="running"||J)){J={id:H.pointerId,x:H.clientX,y:H.clientY,time:performance.now(),used:!1,tap:!0};try{Ct.setPointerCapture(H.pointerId)}catch{}}}function ie(H,z){if(!J||J.id!==H.pointerId||J.used)return;let dt=H.clientX-J.x,Mt=H.clientY-J.y;Math.hypot(dt,Mt)>=12&&(J.tap=!1);let Tt=Ba(dt,Mt,performance.now()-J.time,Zt);!Tt||Tt==="dash"&&(!z||!J.tap)||(J.used=!0,m.input(Tt))}let te=H=>ie(H,!1),ce=H=>{J&&J.id===H.pointerId&&(J=null)},F=H=>{ie(H,!0),ce(H)};function wt(H){if(H.target&&H.target.closest&&H.target.closest("button,summary"))return;let z={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"jump",ArrowDown:"brake"," ":"dash"};z[H.key]&&(H.preventDefault(),H.repeat||m.input(z[H.key]))}let Q=()=>{document.hidden&&nt()},ot=H=>{ft||(H.preventDefault(),Qt("3D\u306E \u304C\u3081\u3093\u304C \u3068\u307E\u3063\u305F\u3088","\u3044\u3061\u3069 \u3068\u3058\u3066\u3001<br>\u3082\u3046\u3044\u3061\u3069 \u3072\u3089\u3044\u3066\u306D"))};Ct.addEventListener("pointerdown",Nt),Ct.addEventListener("pointermove",te),Ct.addEventListener("pointerup",F),Ct.addEventListener("pointercancel",ce),Ct.addEventListener("lostpointercapture",ce),Ct.addEventListener("webglcontextlost",ot),t.addEventListener("keydown",wt),Et("x").addEventListener("click",()=>{m.status==="running"||m.status==="countdown"?nt():l()}),Et("pause").addEventListener("click",nt),Et("help").addEventListener("click",()=>{if(it)return;let H=m.status;q(H==="paused"?nt:H==="finished"?()=>Pt(!1):S)}),document.addEventListener("visibilitychange",Q),addEventListener("blur",nt),addEventListener("pagehide",nt),addEventListener("resize",jt);let Rt=typeof ResizeObserver=="function"?new ResizeObserver(jt):null;Rt&&Rt.observe(t);let At=!0;try{Kt(),S(),L=requestAnimationFrame(kt)}catch(H){At=!1,console.error("run: 3D unavailable",H),Qt("3D\u306E \u304C\u3081\u3093\u3092 \u3072\u3089\u3051\u307E\u305B\u3093\u3067\u3057\u305F","\u3053\u306E\u7AEF\u672B\u3067\u306F \u3042\u305D\u3079\u306A\u3044\u307F\u305F\u3044")}return{ok:At,mode:"agility",get sim(){return m},get renderer(){return T},get frames(){return vt},get quality(){return st?{level:st.level,pixelRatio:st.pixelRatio,shadows:st.shadows}:null},get status(){return k?"lost":m.status},course:u,pause:nt,escape(){return k?!1:it?(ct(),!0):m.status==="running"||m.status==="countdown"?(nt(),!0):!1},dispose(){if(ft)return;ft=!0,cancelAnimationFrame(L),Ct.removeEventListener("webglcontextlost",ot),Rt&&Rt.disconnect(),t.removeEventListener("keydown",wt),document.removeEventListener("visibilitychange",Q),removeEventListener("blur",nt),removeEventListener("pagehide",nt),removeEventListener("resize",jt),tt&&Ps(tt);let H=new Set,z=new Set;b&&b.traverse(dt=>{dt.geometry&&H.add(dt.geometry),dt.material&&[].concat(dt.material).forEach(Mt=>z.add(Mt)),dt.isInstancedMesh&&dt.dispose()}),H.forEach(dt=>dt.dispose()),z.forEach(dt=>dt.dispose()),w&&w.dispose(),T&&(T.dispose(),T.forceContextLoss()),t.innerHTML=""}}}var qx="p6";return Hu($x);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
