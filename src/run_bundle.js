/* うちのこ日和：うちのこランの ゲーム（src/run/）と Three.js 0.170.0（MIT。ライセンスの 表示は さいご）を まとめた もの。
 * tools/run/build_run.mjs が 作る。手で 直さない（docs/RUN_DESIGN.md）。 */
var UchinokoRun=(()=>{var Ha=Object.defineProperty;var Fu=Object.getOwnPropertyDescriptor;var Ou=Object.getOwnPropertyNames;var Bu=Object.prototype.hasOwnProperty;var zu=(i,t)=>{for(var e in t)Ha(i,e,{get:t[e],enumerable:!0})},ku=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ou(t))!Bu.call(i,s)&&s!==e&&Ha(i,s,{get:()=>t[s],enumerable:!(n=Fu(t,s))||n.enumerable});return i};var Vu=i=>ku(Ha({},"__esModule",{value:!0}),i);var qx={};zu(qx,{AGILITY_COURSES:()=>Sr,COURSES:()=>yr,PET_SCALE:()=>Au,VERSION:()=>Xx,agilityHelpHtml:()=>_c,agilityMap:()=>Uu,courseMap:()=>Cu,disposePet3D:()=>Ps,formatClock:()=>vr,formatTime:()=>mi,helpHtml:()=>dc,makePet3D:()=>Rs,mountAgility:()=>Nu,mountRace:()=>Ru,posePet3D:()=>Is,timeMs:()=>Mr});var Xl="170";var Hu=0,vc=1,Gu=2;var Rh=1,rr=2,On=3,ai=0,Ge=1,Ie=2,si=0,ss=1,Mc=2,bc=3,Sc=4,Wu=5,Si=100,Xu=101,qu=102,$u=103,Yu=104,Zu=200,Ju=201,Ku=202,ju=203,bo=204,So=205,Qu=206,td=207,ed=208,nd=209,id=210,sd=211,rd=212,ad=213,od=214,wo=0,To=1,Eo=2,ls=3,Ao=4,Co=5,Ro=6,Io=7,Ih=0,ld=1,cd=2,ri=0,hd=1,ud=2,dd=3,fd=4,pd=5,md=6,ar=7;var Ph=300,cs=301,hs=302,Po=303,Lo=304,Ta=306,Do=1e3,Ei=1001,Uo=1002,ln=1003,gd=1004;var wr=1005;var En=1006,Ga=1007;var Ai=1008;var Hn=1009,Lh=1010,Dh=1011,Ks=1012,ql=1013,Ci=1014,An=1015,or=1016,$l=1017,Yl=1018,us=1020,Uh=35902,Nh=1021,Fh=1022,vn=1023,Oh=1024,Bh=1025,rs=1026,ds=1027,Zl=1028,Jl=1029,zh=1030,Kl=1031;var jl=1033,Jr=33776,Kr=33777,jr=33778,Qr=33779,No=35840,Fo=35841,Oo=35842,Bo=35843,zo=36196,ko=37492,Vo=37496,Ho=37808,Go=37809,Wo=37810,Xo=37811,qo=37812,$o=37813,Yo=37814,Zo=37815,Jo=37816,Ko=37817,jo=37818,Qo=37819,tl=37820,el=37821,ta=36492,nl=36494,il=36495,kh=36283,sl=36284,rl=36285,al=36286;var ea=2300,ol=2301,Wa=2302,wc=2400,Tc=2401,Ec=2402;var xd=3200,_d=3201;var Vh=0,yd=1,ii="",Ze="srgb",ws="srgb-linear",Ea="linear",ve="srgb";var ki=7680;var Ac=519,vd=512,Md=513,bd=514,Hh=515,Sd=516,wd=517,Td=518,Ed=519,Cc=35044;var Rc="300 es",zn=2e3,na=2001,oi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},$e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ic=1234567,qs=Math.PI/180,js=180/Math.PI;function Fi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($e[i&255]+$e[i>>8&255]+$e[i>>16&255]+$e[i>>24&255]+"-"+$e[t&255]+$e[t>>8&255]+"-"+$e[t>>16&15|64]+$e[t>>24&255]+"-"+$e[e&63|128]+$e[e>>8&255]+"-"+$e[e>>16&255]+$e[e>>24&255]+$e[n&255]+$e[n>>8&255]+$e[n>>16&255]+$e[n>>24&255]).toLowerCase()}function He(i,t,e){return Math.max(t,Math.min(e,i))}function Ql(i,t){return(i%t+t)%t}function Ad(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Cd(i,t,e){return i!==t?(e-i)/(t-i):0}function $s(i,t,e){return(1-e)*i+e*t}function Rd(i,t,e,n){return $s(i,t,1-Math.exp(-e*n))}function Id(i,t=1){return t-Math.abs(Ql(i,t*2)-t)}function Pd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ld(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Dd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Ud(i,t){return i+Math.random()*(t-i)}function Nd(i){return i*(.5-Math.random())}function Fd(i){i!==void 0&&(Ic=i);let t=Ic+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Od(i){return i*qs}function Bd(i){return i*js}function zd(i){return(i&i-1)===0&&i!==0}function kd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Vd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Hd(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),f=r((t-n)/2),d=a((t-n)/2),u=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*f,l*d,o*c);break;case"YZY":i.set(l*d,o*h,l*f,o*c);break;case"ZXZ":i.set(l*f,l*d,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*u,o*c);break;case"YXY":i.set(l*u,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*u,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function es(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ke(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var en={DEG2RAD:qs,RAD2DEG:js,generateUUID:Fi,clamp:He,euclideanModulo:Ql,mapLinear:Ad,inverseLerp:Cd,lerp:$s,damp:Rd,pingpong:Id,smoothstep:Pd,smootherstep:Ld,randInt:Dd,randFloat:Ud,randFloatSpread:Nd,seededRandom:Fd,degToRad:Od,radToDeg:Bd,isPowerOfTwo:zd,ceilPowerOfTwo:kd,floorPowerOfTwo:Vd,setQuaternionFromProperEuler:Hd,normalize:Ke,denormalize:es},Ct=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ae=class i{constructor(t,e,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],d=n[2],u=n[5],g=n[8],_=s[0],p=s[3],m=s[6],y=s[1],M=s[4],v=s[7],P=s[2],T=s[5],A=s[8];return r[0]=a*_+o*y+l*P,r[3]=a*p+o*M+l*T,r[6]=a*m+o*v+l*A,r[1]=c*_+h*y+f*P,r[4]=c*p+h*M+f*T,r[7]=c*m+h*v+f*A,r[2]=d*_+u*y+g*P,r[5]=d*p+u*M+g*T,r[8]=d*m+u*v+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,d=o*l-h*r,u=c*r-a*l,g=e*f+n*d+s*u;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=f*_,t[1]=(s*c-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=d*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=u*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Xa.makeScale(t,e)),this}rotate(t){return this.premultiply(Xa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Xa=new ae;function Gh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ia(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gd(){let i=ia("canvas");return i.style.display="block",i}var Pc={};function Ws(i){i in Pc||(Pc[i]=!0,console.warn(i))}function Wd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Xd(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function qd(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var he={enabled:!0,workingColorSpace:ws,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ve&&(i.r=kn(i.r),i.g=kn(i.g),i.b=kn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ve&&(i.r=as(i.r),i.g=as(i.g),i.b=as(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ii?Ea:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function as(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Lc=[.64,.33,.3,.6,.15,.06],Dc=[.2126,.7152,.0722],Uc=[.3127,.329],Nc=new ae().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fc=new ae().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);he.define({[ws]:{primaries:Lc,whitePoint:Uc,transfer:Ea,toXYZ:Nc,fromXYZ:Fc,luminanceCoefficients:Dc,workingColorSpaceConfig:{unpackColorSpace:Ze},outputColorSpaceConfig:{drawingBufferColorSpace:Ze}},[Ze]:{primaries:Lc,whitePoint:Uc,transfer:ve,toXYZ:Nc,fromXYZ:Fc,luminanceCoefficients:Dc,outputColorSpaceConfig:{drawingBufferColorSpace:Ze}}});var Vi,ll=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Vi===void 0&&(Vi=ia("canvas")),Vi.width=t.width,Vi.height=t.height;let n=Vi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Vi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ia("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=kn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(kn(e[n]/255)*255):e[n]=kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},$d=0,sa=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=Fi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(qa(s[a].image)):r.push(qa(s[a]))}else r=qa(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function qa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ll.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Yd=0,cn=class i extends oi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Ei,s=Ei,r=En,a=Ai,o=vn,l=Hn,c=i.DEFAULT_ANISOTROPY,h=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Fi(),this.name="",this.source=new sa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ae,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ph)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Do:t.x=t.x-Math.floor(t.x);break;case Ei:t.x=t.x<0?0:1;break;case Uo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Do:t.y=t.y-Math.floor(t.y);break;case Ei:t.y=t.y<0?0:1;break;case Uo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=Ph;cn.DEFAULT_ANISOTROPY=1;var Ce=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],f=l[8],d=l[1],u=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(f-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+u+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,v=(u+1)/2,P=(m+1)/2,T=(h+d)/4,A=(f+_)/4,C=(g+p)/4;return M>v&&M>P?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=T/n,r=A/n):v>P?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=C/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=A/r,s=C/r),this.set(n,s,r,e),this}let y=Math.sqrt((p-g)*(p-g)+(f-_)*(f-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(f-_)/y,this.z=(d-h)/y,this.w=Math.acos((c+u+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},cl=class extends oi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:En,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new cn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new sa(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gn=class extends cl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ra=class extends cn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var hl=class extends cn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var li=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],f=n[s+3],d=r[a+0],u=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f;return}if(o===1){t[e+0]=d,t[e+1]=u,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==d||c!==u||h!==g){let p=1-o,m=l*d+c*u+h*g+f*_,y=m>=0?1:-1,M=1-m*m;if(M>Number.EPSILON){let P=Math.sqrt(M),T=Math.atan2(P,m*y);p=Math.sin(p*T)/P,o=Math.sin(o*T)/P}let v=o*y;if(l=l*p+d*v,c=c*p+u*v,h=h*p+g*v,f=f*p+_*v,p===1-o){let P=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=P,c*=P,h*=P,f*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],f=r[a],d=r[a+1],u=r[a+2],g=r[a+3];return t[e]=o*g+h*f+l*u-c*d,t[e+1]=l*g+h*d+c*f-o*u,t[e+2]=c*g+h*u+o*d-l*f,t[e+3]=h*g-o*f-l*d-c*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),f=o(r/2),d=l(n/2),u=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*f+c*u*g,this._y=c*u*f-d*h*g,this._z=c*h*g+d*u*f,this._w=c*h*f-d*u*g;break;case"YXZ":this._x=d*h*f+c*u*g,this._y=c*u*f-d*h*g,this._z=c*h*g-d*u*f,this._w=c*h*f+d*u*g;break;case"ZXY":this._x=d*h*f-c*u*g,this._y=c*u*f+d*h*g,this._z=c*h*g+d*u*f,this._w=c*h*f-d*u*g;break;case"ZYX":this._x=d*h*f-c*u*g,this._y=c*u*f+d*h*g,this._z=c*h*g-d*u*f,this._w=c*h*f+d*u*g;break;case"YZX":this._x=d*h*f+c*u*g,this._y=c*u*f+d*h*g,this._z=c*h*g-d*u*f,this._w=c*h*f-d*u*g;break;case"XZY":this._x=d*h*f-c*u*g,this._y=c*u*f-d*h*g,this._z=c*h*g+d*u*f,this._w=c*h*f+d*u*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],d=n+o+f;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-l)*u,this._y=(r-c)*u,this._z=(a-s)*u}else if(n>o&&n>f){let u=2*Math.sqrt(1+n-o-f);this._w=(h-l)/u,this._x=.25*u,this._y=(s+a)/u,this._z=(r+c)/u}else if(o>f){let u=2*Math.sqrt(1+o-n-f);this._w=(r-c)/u,this._x=(s+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+f-n-o);this._w=(a-s)/u,this._x=(r+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(He(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let u=1-e;return this._w=u*a+e*this._w,this._x=u*n+e*this._x,this._y=u*s+e*this._y,this._z=u*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),f=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*f+this._w*d,this._x=n*f+this._x*d,this._y=s*f+this._y*d,this._z=r*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Oc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Oc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return $a.copy(this).projectOnVector(t),this.sub($a)}reflect(t){return this.sub($a.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},$a=new F,Oc=new li,Wn=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,xn):xn.fromBufferAttribute(r,a),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Tr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Tr.copy(n.boundingBox)),Tr.applyMatrix4(t.matrixWorld),this.union(Tr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Bs),Er.subVectors(this.max,Bs),Hi.subVectors(t.a,Bs),Gi.subVectors(t.b,Bs),Wi.subVectors(t.c,Bs),Kn.subVectors(Gi,Hi),jn.subVectors(Wi,Gi),gi.subVectors(Hi,Wi);let e=[0,-Kn.z,Kn.y,0,-jn.z,jn.y,0,-gi.z,gi.y,Kn.z,0,-Kn.x,jn.z,0,-jn.x,gi.z,0,-gi.x,-Kn.y,Kn.x,0,-jn.y,jn.x,0,-gi.y,gi.x,0];return!Ya(e,Hi,Gi,Wi,Er)||(e=[1,0,0,0,1,0,0,0,1],!Ya(e,Hi,Gi,Wi,Er))?!1:(Ar.crossVectors(Kn,jn),e=[Ar.x,Ar.y,Ar.z],Ya(e,Hi,Gi,Wi,Er))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Ln=[new F,new F,new F,new F,new F,new F,new F,new F],xn=new F,Tr=new Wn,Hi=new F,Gi=new F,Wi=new F,Kn=new F,jn=new F,gi=new F,Bs=new F,Er=new F,Ar=new F,xi=new F;function Ya(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){xi.fromArray(i,r);let o=s.x*Math.abs(xi.x)+s.y*Math.abs(xi.y)+s.z*Math.abs(xi.z),l=t.dot(xi),c=e.dot(xi),h=n.dot(xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Zd=new Wn,zs=new F,Za=new F,Ri=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Zd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zs.subVectors(t,this.center);let e=zs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(zs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Za.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zs.copy(t.center).add(Za)),this.expandByPoint(zs.copy(t.center).sub(Za))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Dn=new F,Ja=new F,Cr=new F,Qn=new F,Ka=new F,Rr=new F,ja=new F,ul=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ja.copy(t).add(e).multiplyScalar(.5),Cr.copy(e).sub(t).normalize(),Qn.copy(this.origin).sub(Ja);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Cr),o=Qn.dot(this.direction),l=-Qn.dot(Cr),c=Qn.lengthSq(),h=Math.abs(1-a*a),f,d,u,g;if(h>0)if(f=a*l-o,d=a*o-l,g=r*h,f>=0)if(d>=-g)if(d<=g){let _=1/h;f*=_,d*=_,u=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;else d<=-g?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),u=-f*f+d*(d+2*l)+c):d<=g?(f=0,d=Math.min(Math.max(-r,-l),r),u=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),u=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Ja).addScaledVector(Cr,d),u}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);let n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-d.z)*f,l=(t.max.z-d.z)*f):(o=(t.max.z-d.z)*f,l=(t.min.z-d.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,s,r){Ka.subVectors(e,t),Rr.subVectors(n,t),ja.crossVectors(Ka,Rr);let a=this.direction.dot(ja),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qn.subVectors(this.origin,t);let l=o*this.direction.dot(Rr.crossVectors(Qn,Rr));if(l<0)return null;let c=o*this.direction.dot(Ka.cross(Qn));if(c<0||l+c>a)return null;let h=-o*Qn.dot(ja);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ge=class i{constructor(t,e,n,s,r,a,o,l,c,h,f,d,u,g,_,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,f,d,u,g,_,p)}set(t,e,n,s,r,a,o,l,c,h,f,d,u,g,_,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=f,m[14]=d,m[3]=u,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Xi.setFromMatrixColumn(t,0).length(),r=1/Xi.setFromMatrixColumn(t,1).length(),a=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let d=a*h,u=a*f,g=o*h,_=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=u+g*c,e[5]=d-_*c,e[9]=-o*l,e[2]=_-d*c,e[6]=g+u*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,u=l*f,g=c*h,_=c*f;e[0]=d+_*o,e[4]=g*o-u,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=u*o-g,e[6]=_+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,u=l*f,g=c*h,_=c*f;e[0]=d-_*o,e[4]=-a*f,e[8]=g+u*o,e[1]=u+g*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,u=a*f,g=o*h,_=o*f;e[0]=l*h,e[4]=g*c-u,e[8]=d*c+_,e[1]=l*f,e[5]=_*c+d,e[9]=u*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,u=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-d*f,e[8]=g*f+u,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=u*f+g,e[10]=d-_*f}else if(t.order==="XZY"){let d=a*l,u=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=d*f+_,e[5]=a*h,e[9]=u*f-g,e[2]=g*f-u,e[6]=o*h,e[10]=_*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Jd,t,Kd)}lookAt(t,e,n){let s=this.elements;return an.subVectors(t,e),an.lengthSq()===0&&(an.z=1),an.normalize(),ti.crossVectors(n,an),ti.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),ti.crossVectors(n,an)),ti.normalize(),Ir.crossVectors(an,ti),s[0]=ti.x,s[4]=Ir.x,s[8]=an.x,s[1]=ti.y,s[5]=Ir.y,s[9]=an.y,s[2]=ti.z,s[6]=Ir.z,s[10]=an.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],d=n[9],u=n[13],g=n[2],_=n[6],p=n[10],m=n[14],y=n[3],M=n[7],v=n[11],P=n[15],T=s[0],A=s[4],C=s[8],b=s[12],x=s[1],S=s[5],I=s[9],D=s[13],B=s[2],W=s[6],H=s[10],st=s[14],O=s[3],Q=s[7],pt=s[11],it=s[15];return r[0]=a*T+o*x+l*B+c*O,r[4]=a*A+o*S+l*W+c*Q,r[8]=a*C+o*I+l*H+c*pt,r[12]=a*b+o*D+l*st+c*it,r[1]=h*T+f*x+d*B+u*O,r[5]=h*A+f*S+d*W+u*Q,r[9]=h*C+f*I+d*H+u*pt,r[13]=h*b+f*D+d*st+u*it,r[2]=g*T+_*x+p*B+m*O,r[6]=g*A+_*S+p*W+m*Q,r[10]=g*C+_*I+p*H+m*pt,r[14]=g*b+_*D+p*st+m*it,r[3]=y*T+M*x+v*B+P*O,r[7]=y*A+M*S+v*W+P*Q,r[11]=y*C+M*I+v*H+P*pt,r[15]=y*b+M*D+v*st+P*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],d=t[10],u=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+r*l*f-s*c*f-r*o*d+n*c*d+s*o*u-n*l*u)+_*(+e*l*u-e*c*d+r*a*d-s*a*u+s*c*h-r*l*h)+p*(+e*c*f-e*o*u-r*a*f+n*a*u+r*o*h-n*c*h)+m*(-s*o*h-e*l*f+e*o*d+s*a*f-n*a*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],d=t[10],u=t[11],g=t[12],_=t[13],p=t[14],m=t[15],y=f*p*c-_*d*c+_*l*u-o*p*u-f*l*m+o*d*m,M=g*d*c-h*p*c-g*l*u+a*p*u+h*l*m-a*d*m,v=h*_*c-g*f*c+g*o*u-a*_*u-h*o*m+a*f*m,P=g*f*l-h*_*l-g*o*d+a*_*d+h*o*p-a*f*p,T=e*y+n*M+s*v+r*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/T;return t[0]=y*A,t[1]=(_*d*r-f*p*r-_*s*u+n*p*u+f*s*m-n*d*m)*A,t[2]=(o*p*r-_*l*r+_*s*c-n*p*c-o*s*m+n*l*m)*A,t[3]=(f*l*r-o*d*r-f*s*c+n*d*c+o*s*u-n*l*u)*A,t[4]=M*A,t[5]=(h*p*r-g*d*r+g*s*u-e*p*u-h*s*m+e*d*m)*A,t[6]=(g*l*r-a*p*r-g*s*c+e*p*c+a*s*m-e*l*m)*A,t[7]=(a*d*r-h*l*r+h*s*c-e*d*c-a*s*u+e*l*u)*A,t[8]=v*A,t[9]=(g*f*r-h*_*r-g*n*u+e*_*u+h*n*m-e*f*m)*A,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*m+e*o*m)*A,t[11]=(h*o*r-a*f*r-h*n*c+e*f*c+a*n*u-e*o*u)*A,t[12]=P*A,t[13]=(h*_*s-g*f*s+g*n*d-e*_*d-h*n*p+e*f*p)*A,t[14]=(g*o*s-a*_*s-g*n*l+e*_*l+a*n*p-e*o*p)*A,t[15]=(a*f*s-h*o*s+h*n*l-e*f*l-a*n*d+e*o*d)*A,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,d=r*c,u=r*h,g=r*f,_=a*h,p=a*f,m=o*f,y=l*c,M=l*h,v=l*f,P=n.x,T=n.y,A=n.z;return s[0]=(1-(_+m))*P,s[1]=(u+v)*P,s[2]=(g-M)*P,s[3]=0,s[4]=(u-v)*T,s[5]=(1-(d+m))*T,s[6]=(p+y)*T,s[7]=0,s[8]=(g+M)*A,s[9]=(p-y)*A,s[10]=(1-(d+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Xi.set(s[0],s[1],s[2]).length(),a=Xi.set(s[4],s[5],s[6]).length(),o=Xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],_n.copy(this);let c=1/r,h=1/a,f=1/o;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=f,_n.elements[9]*=f,_n.elements[10]*=f,e.setFromRotationMatrix(_n),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=zn){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),u,g;if(o===zn)u=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===na)u=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=u,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=zn){let l=this.elements,c=1/(e-t),h=1/(n-s),f=1/(a-r),d=(e+t)*c,u=(n+s)*h,g,_;if(o===zn)g=(a+r)*f,_=-2*f;else if(o===na)g=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-u,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Xi=new F,_n=new ge,Jd=new F(0,0,0),Kd=new F(1,1,1),ti=new F,Ir=new F,an=new F,Bc=new ge,zc=new li,Cn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],d=s[6],u=s[10];switch(e){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-He(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Bc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return zc.setFromEuler(this),this.setFromQuaternion(zc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Cn.DEFAULT_ORDER="XYZ";var aa=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},jd=0,kc=new F,qi=new li,Un=new ge,Pr=new F,ks=new F,Qd=new F,tf=new li,Vc=new F(1,0,0),Hc=new F(0,1,0),Gc=new F(0,0,1),Wc={type:"added"},ef={type:"removed"},$i={type:"childadded",child:null},Qa={type:"childremoved",child:null},Ne=class i extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=Fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new F,e=new Cn,n=new li,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ge},normalMatrix:{value:new ae}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.multiply(qi),this}rotateOnWorldAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.premultiply(qi),this}rotateX(t){return this.rotateOnAxis(Vc,t)}rotateY(t){return this.rotateOnAxis(Hc,t)}rotateZ(t){return this.rotateOnAxis(Gc,t)}translateOnAxis(t,e){return kc.copy(t).applyQuaternion(this.quaternion),this.position.add(kc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Vc,t)}translateY(t){return this.translateOnAxis(Hc,t)}translateZ(t){return this.translateOnAxis(Gc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Pr.copy(t):Pr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(ks,Pr,this.up):Un.lookAt(Pr,ks,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),qi.setFromRotationMatrix(Un),this.quaternion.premultiply(qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wc),$i.child=t,this.dispatchEvent($i),$i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ef),Qa.child=t,this.dispatchEvent(Qa),Qa.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wc),$i.child=t,this.dispatchEvent($i),$i.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,t,Qd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,tf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),d=a(t.skeletons),u=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ne.DEFAULT_UP=new F(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var yn=new F,Nn=new F,to=new F,Fn=new F,Yi=new F,Zi=new F,Xc=new F,eo=new F,no=new F,io=new F,so=new Ce,ro=new Ce,ao=new Ce,wi=class i{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),yn.subVectors(t,e),s.cross(yn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){yn.subVectors(s,e),Nn.subVectors(n,e),to.subVectors(t,e);let a=yn.dot(yn),o=yn.dot(Nn),l=yn.dot(to),c=Nn.dot(Nn),h=Nn.dot(to),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let d=1/f,u=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-u-g,g,u)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Fn.x),l.addScaledVector(a,Fn.y),l.addScaledVector(o,Fn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return so.setScalar(0),ro.setScalar(0),ao.setScalar(0),so.fromBufferAttribute(t,e),ro.fromBufferAttribute(t,n),ao.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(so,r.x),a.addScaledVector(ro,r.y),a.addScaledVector(ao,r.z),a}static isFrontFacing(t,e,n,s){return yn.subVectors(n,e),Nn.subVectors(t,e),yn.cross(Nn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),yn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Yi.subVectors(s,n),Zi.subVectors(r,n),eo.subVectors(t,n);let l=Yi.dot(eo),c=Zi.dot(eo);if(l<=0&&c<=0)return e.copy(n);no.subVectors(t,s);let h=Yi.dot(no),f=Zi.dot(no);if(h>=0&&f<=h)return e.copy(s);let d=l*f-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Yi,a);io.subVectors(t,r);let u=Yi.dot(io),g=Zi.dot(io);if(g>=0&&u<=g)return e.copy(r);let _=u*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Zi,o);let p=h*g-u*f;if(p<=0&&f-h>=0&&u-g>=0)return Xc.subVectors(r,s),o=(f-h)/(f-h+(u-g)),e.copy(s).addScaledVector(Xc,o);let m=1/(p+_+d);return a=_*m,o=d*m,e.copy(n).addScaledVector(Yi,a).addScaledVector(Zi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ei={h:0,s:0,l:0},Lr={h:0,s:0,l:0};function oo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var zt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=he.workingColorSpace){return this.r=t,this.g=e,this.b=n,he.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=he.workingColorSpace){if(t=Ql(t,1),e=He(e,0,1),n=He(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=oo(a,r,t+1/3),this.g=oo(a,r,t),this.b=oo(a,r,t-1/3)}return he.toWorkingColorSpace(this,s),this}setStyle(t,e=Ze){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){let n=Wh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=as(t.r),this.g=as(t.g),this.b=as(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return he.fromWorkingColorSpace(Ye.copy(this),t),Math.round(He(Ye.r*255,0,255))*65536+Math.round(He(Ye.g*255,0,255))*256+Math.round(He(Ye.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=he.workingColorSpace){he.fromWorkingColorSpace(Ye.copy(this),e);let n=Ye.r,s=Ye.g,r=Ye.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=he.workingColorSpace){return he.fromWorkingColorSpace(Ye.copy(this),e),t.r=Ye.r,t.g=Ye.g,t.b=Ye.b,t}getStyle(t=Ze){he.fromWorkingColorSpace(Ye.copy(this),t);let e=Ye.r,n=Ye.g,s=Ye.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ei),this.setHSL(ei.h+t,ei.s+e,ei.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ei),t.getHSL(Lr);let n=$s(ei.h,Lr.h,e),s=$s(ei.s,Lr.s,e),r=$s(ei.l,Lr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ye=new zt;zt.NAMES=Wh;var nf=0,Ii=class extends oi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=Fi(),this.name="",this.blending=ss,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bo,this.blendDst=So,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ac,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ss&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==bo&&(n.blendSrc=this.blendSrc),this.blendDst!==So&&(n.blendDst=this.blendDst),this.blendEquation!==Si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ls&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ac&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Rn=class extends Ii{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=Ih,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ue=new F,Dr=new Ct,qe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Cc,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Dr.fromBufferAttribute(this,e),Dr.applyMatrix3(t),this.setXY(e,Dr.x,Dr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=es(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ke(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=es(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=es(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=es(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=es(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),n=Ke(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),n=Ke(n,this.array),s=Ke(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),n=Ke(n,this.array),s=Ke(s,this.array),r=Ke(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cc&&(t.usage=this.usage),t}};var oa=class extends qe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var la=class extends qe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var qt=class extends qe{constructor(t,e,n){super(new Float32Array(t),e,n)}},sf=0,dn=new ge,lo=new Ne,Ji=new F,on=new Wn,Vs=new Wn,Ve=new F,xe=class i extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=Fi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Gh(t)?la:oa)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ae().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return dn.makeRotationFromQuaternion(t),this.applyMatrix4(dn),this}rotateX(t){return dn.makeRotationX(t),this.applyMatrix4(dn),this}rotateY(t){return dn.makeRotationY(t),this.applyMatrix4(dn),this}rotateZ(t){return dn.makeRotationZ(t),this.applyMatrix4(dn),this}translate(t,e,n){return dn.makeTranslation(t,e,n),this.applyMatrix4(dn),this}scale(t,e,n){return dn.makeScale(t,e,n),this.applyMatrix4(dn),this}lookAt(t){return lo.lookAt(t),lo.updateMatrix(),this.applyMatrix4(lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new qt(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let n=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Vs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ve.addVectors(on.min,Vs.min),on.expandByPoint(Ve),Ve.addVectors(on.max,Vs.max),on.expandByPoint(Ve)):(on.expandByPoint(Vs.min),on.expandByPoint(Vs.max))}on.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ve.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ve));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ve.fromBufferAttribute(o,c),l&&(Ji.fromBufferAttribute(t,c),Ve.add(Ji)),s=Math.max(s,n.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qe(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new F,l[C]=new F;let c=new F,h=new F,f=new F,d=new Ct,u=new Ct,g=new Ct,_=new F,p=new F;function m(C,b,x){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,b),f.fromBufferAttribute(n,x),d.fromBufferAttribute(r,C),u.fromBufferAttribute(r,b),g.fromBufferAttribute(r,x),h.sub(c),f.sub(c),u.sub(d),g.sub(d);let S=1/(u.x*g.y-g.x*u.y);isFinite(S)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-u.y).multiplyScalar(S),p.copy(f).multiplyScalar(u.x).addScaledVector(h,-g.x).multiplyScalar(S),o[C].add(_),o[b].add(_),o[x].add(_),l[C].add(p),l[b].add(p),l[x].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let C=0,b=y.length;C<b;++C){let x=y[C],S=x.start,I=x.count;for(let D=S,B=S+I;D<B;D+=3)m(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let M=new F,v=new F,P=new F,T=new F;function A(C){P.fromBufferAttribute(s,C),T.copy(P);let b=o[C];M.copy(b),M.sub(P.multiplyScalar(P.dot(b))).normalize(),v.crossVectors(T,b);let S=v.dot(l[C])<0?-1:1;a.setXYZW(C,M.x,M.y,M.z,S)}for(let C=0,b=y.length;C<b;++C){let x=y[C],S=x.start,I=x.count;for(let D=S,B=S+I;D<B;D+=3)A(t.getX(D+0)),A(t.getX(D+1)),A(t.getX(D+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let s=new F,r=new F,a=new F,o=new F,l=new F,c=new F,h=new F,f=new F;if(t)for(let d=0,u=t.count;d<u;d+=3){let g=t.getX(d+0),_=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,u=e.count;d<u;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,f=o.normalized,d=new c.constructor(l.length*h),u=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?u=l[_]*o.data.stride+o.offset:u=l[_]*h;for(let m=0;m<h;m++)d[g++]=c[u++]}return new qe(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){let d=c[h],u=t(d,n);l.push(u)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,d=c.length;f<d;f++){let u=c[f];h.push(u.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let d=0,u=f.length;d<u;d++)h.push(f[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},qc=new ge,_i=new ul,Ur=new Ri,$c=new F,Nr=new F,Fr=new F,Or=new F,co=new F,Br=new F,Yc=new F,zr=new F,fe=class extends Ne{constructor(t=new xe,e=new Rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Br.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],f=r[l];h!==0&&(co.fromBufferAttribute(f,t),a?Br.addScaledVector(co,h):Br.addScaledVector(co.sub(e),h))}e.add(Br)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ur.copy(n.boundingSphere),Ur.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(Ur.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Ur,$c)===null||_i.origin.distanceToSquared($c)>(t.far-t.near)**2))&&(qc.copy(r).invert(),_i.copy(t.ray).applyMatrix4(qc),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let p=d[g],m=a[p.materialIndex],y=Math.max(p.start,u.start),M=Math.min(o.count,Math.min(p.start+p.count,u.start+u.count));for(let v=y,P=M;v<P;v+=3){let T=o.getX(v),A=o.getX(v+1),C=o.getX(v+2);s=kr(this,m,t,n,c,h,f,T,A,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,u.start),_=Math.min(o.count,u.start+u.count);for(let p=g,m=_;p<m;p+=3){let y=o.getX(p),M=o.getX(p+1),v=o.getX(p+2);s=kr(this,a,t,n,c,h,f,y,M,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let p=d[g],m=a[p.materialIndex],y=Math.max(p.start,u.start),M=Math.min(l.count,Math.min(p.start+p.count,u.start+u.count));for(let v=y,P=M;v<P;v+=3){let T=v,A=v+1,C=v+2;s=kr(this,m,t,n,c,h,f,T,A,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,u.start),_=Math.min(l.count,u.start+u.count);for(let p=g,m=_;p<m;p+=3){let y=p,M=p+1,v=p+2;s=kr(this,a,t,n,c,h,f,y,M,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function rf(i,t,e,n,s,r,a,o){let l;if(t.side===Ge?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ai,o),l===null)return null;zr.copy(o),zr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(zr);return c<e.near||c>e.far?null:{distance:c,point:zr.clone(),object:i}}function kr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Nr),i.getVertexPosition(l,Fr),i.getVertexPosition(c,Or);let h=rf(i,t,e,n,Nr,Fr,Or,Yc);if(h){let f=new F;wi.getBarycoord(Yc,Nr,Fr,Or,f),s&&(h.uv=wi.getInterpolatedAttribute(s,o,l,c,f,new Ct)),r&&(h.uv1=wi.getInterpolatedAttribute(r,o,l,c,f,new Ct)),a&&(h.normal=wi.getInterpolatedAttribute(a,o,l,c,f,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new F,materialIndex:0};wi.getNormal(Nr,Fr,Or,d.normal),h.face=d,h.barycoord=f}return h}var Te=class i extends xe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],f=[],d=0,u=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(f,2));function g(_,p,m,y,M,v,P,T,A,C,b){let x=v/A,S=P/C,I=v/2,D=P/2,B=T/2,W=A+1,H=C+1,st=0,O=0,Q=new F;for(let pt=0;pt<H;pt++){let it=pt*S-D;for(let ht=0;ht<W;ht++){let yt=ht*x-I;Q[_]=yt*y,Q[p]=it*M,Q[m]=B,c.push(Q.x,Q.y,Q.z),Q[_]=0,Q[p]=0,Q[m]=T>0?1:-1,h.push(Q.x,Q.y,Q.z),f.push(ht/A),f.push(1-pt/C),st+=1}}for(let pt=0;pt<C;pt++)for(let it=0;it<A;it++){let ht=d+it+W*pt,yt=d+it+W*(pt+1),X=d+(it+1)+W*(pt+1),nt=d+(it+1)+W*pt;l.push(ht,yt,nt),l.push(yt,X,nt),O+=6}o.addGroup(u,O,b),u+=O,d+=st}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function fs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function je(i){let t={};for(let e=0;e<i.length;e++){let n=fs(i[e]);for(let s in n)t[s]=n[s]}return t}function af(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Xh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}var of={clone:fs,merge:je},lf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,tn=class extends Ii{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lf,this.fragmentShader=cf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=fs(t.uniforms),this.uniformsGroups=af(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},ca=class extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ni=new F,Zc=new Ct,Jc=new Ct,Xe=class extends ca{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=js*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(qs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return js*2*Math.atan(Math.tan(qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ni.x,ni.y).multiplyScalar(-t/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ni.x,ni.y).multiplyScalar(-t/ni.z)}getViewSize(t,e){return this.getViewBounds(t,Zc,Jc),e.subVectors(Jc,Zc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(qs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ki=-90,ji=1,dl=class extends Ne{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Xe(Ki,ji,t,e);s.layers=this.layers,this.add(s);let r=new Xe(Ki,ji,t,e);r.layers=this.layers,this.add(r);let a=new Xe(Ki,ji,t,e);a.layers=this.layers,this.add(a);let o=new Xe(Ki,ji,t,e);o.layers=this.layers,this.add(o);let l=new Xe(Ki,ji,t,e);l.layers=this.layers,this.add(l);let c=new Xe(Ki,ji,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===na)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(f,d,u),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ha=class extends cn{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:cs,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},fl=class extends Gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ha(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:En}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Te(5,5,5),r=new tn({name:"CubemapFromEquirect",uniforms:fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:si});r.uniforms.tEquirect.value=e;let a=new fe(s,r),o=e.minFilter;return e.minFilter===Ai&&(e.minFilter=En),new dl(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},ho=new F,hf=new F,uf=new ae,Bn=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=ho.subVectors(n,e).cross(hf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(ho),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||uf.getNormalMatrix(t),s=this.coplanarPoint(ho).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},yi=new Ri,Vr=new F,Qs=class{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,a=new Bn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=zn){let n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],f=s[6],d=s[7],u=s[8],g=s[9],_=s[10],p=s[11],m=s[12],y=s[13],M=s[14],v=s[15];if(n[0].setComponents(l-r,d-c,p-u,v-m).normalize(),n[1].setComponents(l+r,d+c,p+u,v+m).normalize(),n[2].setComponents(l+a,d+h,p+g,v+y).normalize(),n[3].setComponents(l-a,d-h,p-g,v-y).normalize(),n[4].setComponents(l-o,d-f,p-_,v-M).normalize(),e===zn)n[5].setComponents(l+o,d+f,p+_,v+M).normalize();else if(e===na)n[5].setComponents(o,f,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(t){return yi.center.set(0,0,0),yi.radius=.7071067811865476,yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Vr.x=s.normal.x>0?t.max.x:t.min.x,Vr.y=s.normal.y>0?t.max.y:t.min.y,Vr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Vr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function qh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function df(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,f=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=i.SHORT;else if(c instanceof Uint32Array)u=i.UNSIGNED_INT;else if(c instanceof Int32Array)u=i.INT;else if(c instanceof Int8Array)u=i.BYTE;else if(c instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let h=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,h);else{f.sort((u,g)=>u.start-g.start);let d=0;for(let u=1;u<f.length;u++){let g=f[d],_=f[u];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,f[d]=_)}f.length=d+1;for(let u=0,g=f.length;u<g;u++){let _=f[u];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var ps=class i extends xe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,f=t/o,d=e/l,u=[],g=[],_=[],p=[];for(let m=0;m<h;m++){let y=m*d-a;for(let M=0;M<c;M++){let v=M*f-r;g.push(v,-y,0),_.push(0,0,1),p.push(M/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){let M=y+c*m,v=y+c*(m+1),P=y+1+c*(m+1),T=y+1+c*m;u.push(M,v,T),u.push(v,P,T)}this.setIndex(u),this.setAttribute("position",new qt(g,3)),this.setAttribute("normal",new qt(_,3)),this.setAttribute("uv",new qt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},ff=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pf=`#ifdef USE_ALPHAHASH
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
#endif`,mf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_f=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yf=`#ifdef USE_AOMAP
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
#endif`,vf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mf=`#ifdef USE_BATCHING
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
#endif`,bf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ef=`#ifdef USE_IRIDESCENCE
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
#endif`,Af=`#ifdef USE_BUMPMAP
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
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Rf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Df=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ff=`#define PI 3.141592653589793
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
} // validated`,Of=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bf=`vec3 transformedNormal = objectNormal;
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
#endif`,zf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xf=`#ifdef USE_ENVMAP
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
#endif`,qf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$f=`#ifdef USE_ENVMAP
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
#endif`,Yf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zf=`#ifdef USE_ENVMAP
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
#endif`,Jf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tp=`#ifdef USE_GRADIENTMAP
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
}`,ep=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,np=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sp=`uniform bool receiveShadow;
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
#endif`,rp=`#ifdef USE_ENVMAP
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
#endif`,ap=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,op=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hp=`PhysicalMaterial material;
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
#endif`,up=`struct PhysicalMaterial {
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
}`,dp=`
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
#endif`,fp=`#if defined( RE_IndirectDiffuse )
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
#endif`,pp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_p=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bp=`#if defined( USE_POINTS_UV )
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
#endif`,Sp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ep=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ap=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cp=`#ifdef USE_MORPHTARGETS
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
#endif`,Rp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ip=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Pp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Lp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Up=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Np=`#ifdef USE_NORMALMAP
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
#endif`,Fp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Op=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$p=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Kp=`float getShadowMask() {
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
}`,jp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qp=`#ifdef USE_SKINNING
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
#endif`,tm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,em=`#ifdef USE_SKINNING
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
#endif`,nm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,im=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,am=`#ifdef USE_TRANSMISSION
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
#endif`,om=`#ifdef USE_TRANSMISSION
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
#endif`,lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,um=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,dm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fm=`uniform sampler2D t2D;
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
}`,pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`#include <common>
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
}`,ym=`#if DEPTH_PACKING == 3200
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
}`,vm=`#define DISTANCE
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
}`,Mm=`#define DISTANCE
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
}`,bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wm=`uniform float scale;
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
}`,Tm=`uniform vec3 diffuse;
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
}`,Em=`#include <common>
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
}`,Am=`uniform vec3 diffuse;
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
}`,Cm=`#define LAMBERT
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
}`,Rm=`#define LAMBERT
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
}`,Im=`#define MATCAP
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
}`,Pm=`#define MATCAP
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
}`,Lm=`#define NORMAL
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
}`,Dm=`#define NORMAL
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
}`,Um=`#define PHONG
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
}`,Nm=`#define PHONG
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
}`,Fm=`#define STANDARD
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
}`,Om=`#define STANDARD
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
}`,Bm=`#define TOON
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
}`,zm=`#define TOON
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
}`,km=`uniform float size;
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
}`,Vm=`uniform vec3 diffuse;
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
}`,Hm=`#include <common>
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
}`,Gm=`uniform vec3 color;
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
}`,Wm=`uniform float rotation;
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
}`,Xm=`uniform vec3 diffuse;
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
}`,oe={alphahash_fragment:ff,alphahash_pars_fragment:pf,alphamap_fragment:mf,alphamap_pars_fragment:gf,alphatest_fragment:xf,alphatest_pars_fragment:_f,aomap_fragment:yf,aomap_pars_fragment:vf,batching_pars_vertex:Mf,batching_vertex:bf,begin_vertex:Sf,beginnormal_vertex:wf,bsdfs:Tf,iridescence_fragment:Ef,bumpmap_pars_fragment:Af,clipping_planes_fragment:Cf,clipping_planes_pars_fragment:Rf,clipping_planes_pars_vertex:If,clipping_planes_vertex:Pf,color_fragment:Lf,color_pars_fragment:Df,color_pars_vertex:Uf,color_vertex:Nf,common:Ff,cube_uv_reflection_fragment:Of,defaultnormal_vertex:Bf,displacementmap_pars_vertex:zf,displacementmap_vertex:kf,emissivemap_fragment:Vf,emissivemap_pars_fragment:Hf,colorspace_fragment:Gf,colorspace_pars_fragment:Wf,envmap_fragment:Xf,envmap_common_pars_fragment:qf,envmap_pars_fragment:$f,envmap_pars_vertex:Yf,envmap_physical_pars_fragment:rp,envmap_vertex:Zf,fog_vertex:Jf,fog_pars_vertex:Kf,fog_fragment:jf,fog_pars_fragment:Qf,gradientmap_pars_fragment:tp,lightmap_pars_fragment:ep,lights_lambert_fragment:np,lights_lambert_pars_fragment:ip,lights_pars_begin:sp,lights_toon_fragment:ap,lights_toon_pars_fragment:op,lights_phong_fragment:lp,lights_phong_pars_fragment:cp,lights_physical_fragment:hp,lights_physical_pars_fragment:up,lights_fragment_begin:dp,lights_fragment_maps:fp,lights_fragment_end:pp,logdepthbuf_fragment:mp,logdepthbuf_pars_fragment:gp,logdepthbuf_pars_vertex:xp,logdepthbuf_vertex:_p,map_fragment:yp,map_pars_fragment:vp,map_particle_fragment:Mp,map_particle_pars_fragment:bp,metalnessmap_fragment:Sp,metalnessmap_pars_fragment:wp,morphinstance_vertex:Tp,morphcolor_vertex:Ep,morphnormal_vertex:Ap,morphtarget_pars_vertex:Cp,morphtarget_vertex:Rp,normal_fragment_begin:Ip,normal_fragment_maps:Pp,normal_pars_fragment:Lp,normal_pars_vertex:Dp,normal_vertex:Up,normalmap_pars_fragment:Np,clearcoat_normal_fragment_begin:Fp,clearcoat_normal_fragment_maps:Op,clearcoat_pars_fragment:Bp,iridescence_pars_fragment:zp,opaque_fragment:kp,packing:Vp,premultiplied_alpha_fragment:Hp,project_vertex:Gp,dithering_fragment:Wp,dithering_pars_fragment:Xp,roughnessmap_fragment:qp,roughnessmap_pars_fragment:$p,shadowmap_pars_fragment:Yp,shadowmap_pars_vertex:Zp,shadowmap_vertex:Jp,shadowmask_pars_fragment:Kp,skinbase_vertex:jp,skinning_pars_vertex:Qp,skinning_vertex:tm,skinnormal_vertex:em,specularmap_fragment:nm,specularmap_pars_fragment:im,tonemapping_fragment:sm,tonemapping_pars_fragment:rm,transmission_fragment:am,transmission_pars_fragment:om,uv_pars_fragment:lm,uv_pars_vertex:cm,uv_vertex:hm,worldpos_vertex:um,background_vert:dm,background_frag:fm,backgroundCube_vert:pm,backgroundCube_frag:mm,cube_vert:gm,cube_frag:xm,depth_vert:_m,depth_frag:ym,distanceRGBA_vert:vm,distanceRGBA_frag:Mm,equirect_vert:bm,equirect_frag:Sm,linedashed_vert:wm,linedashed_frag:Tm,meshbasic_vert:Em,meshbasic_frag:Am,meshlambert_vert:Cm,meshlambert_frag:Rm,meshmatcap_vert:Im,meshmatcap_frag:Pm,meshnormal_vert:Lm,meshnormal_frag:Dm,meshphong_vert:Um,meshphong_frag:Nm,meshphysical_vert:Fm,meshphysical_frag:Om,meshtoon_vert:Bm,meshtoon_frag:zm,points_vert:km,points_frag:Vm,shadow_vert:Hm,shadow_frag:Gm,sprite_vert:Wm,sprite_frag:Xm},Tt={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ae},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ae}},envmap:{envMap:{value:null},envMapRotation:{value:new ae},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ae}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ae}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ae},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ae},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ae},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ae}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ae}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ae}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0},uvTransform:{value:new ae}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ae},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0}}},Tn={basic:{uniforms:je([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:oe.meshbasic_vert,fragmentShader:oe.meshbasic_frag},lambert:{uniforms:je([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)}}]),vertexShader:oe.meshlambert_vert,fragmentShader:oe.meshlambert_frag},phong:{uniforms:je([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:oe.meshphong_vert,fragmentShader:oe.meshphong_frag},standard:{uniforms:je([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag},toon:{uniforms:je([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)}}]),vertexShader:oe.meshtoon_vert,fragmentShader:oe.meshtoon_frag},matcap:{uniforms:je([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:oe.meshmatcap_vert,fragmentShader:oe.meshmatcap_frag},points:{uniforms:je([Tt.points,Tt.fog]),vertexShader:oe.points_vert,fragmentShader:oe.points_frag},dashed:{uniforms:je([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:oe.linedashed_vert,fragmentShader:oe.linedashed_frag},depth:{uniforms:je([Tt.common,Tt.displacementmap]),vertexShader:oe.depth_vert,fragmentShader:oe.depth_frag},normal:{uniforms:je([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:oe.meshnormal_vert,fragmentShader:oe.meshnormal_frag},sprite:{uniforms:je([Tt.sprite,Tt.fog]),vertexShader:oe.sprite_vert,fragmentShader:oe.sprite_frag},background:{uniforms:{uvTransform:{value:new ae},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:oe.background_vert,fragmentShader:oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ae}},vertexShader:oe.backgroundCube_vert,fragmentShader:oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:oe.cube_vert,fragmentShader:oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:oe.equirect_vert,fragmentShader:oe.equirect_frag},distanceRGBA:{uniforms:je([Tt.common,Tt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:oe.distanceRGBA_vert,fragmentShader:oe.distanceRGBA_frag},shadow:{uniforms:je([Tt.lights,Tt.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:oe.shadow_vert,fragmentShader:oe.shadow_frag}};Tn.physical={uniforms:je([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ae},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ae},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ae},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ae},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ae},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ae},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ae},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ae},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ae},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ae},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ae},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ae}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag};var Hr={r:0,b:0,g:0},vi=new Cn,qm=new ge;function $m(i,t,e,n,s,r,a){let o=new zt(0),l=r===!0?0:1,c,h,f=null,d=0,u=null;function g(y){let M=y.isScene===!0?y.background:null;return M&&M.isTexture&&(M=(y.backgroundBlurriness>0?e:t).get(M)),M}function _(y){let M=!1,v=g(y);v===null?m(o,l):v&&v.isColor&&(m(v,1),M=!0);let P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(y,M){let v=g(M);v&&(v.isCubeTexture||v.mapping===Ta)?(h===void 0&&(h=new fe(new Te(1,1,1),new tn({name:"BackgroundCubeMaterial",uniforms:fs(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),vi.copy(M.backgroundRotation),vi.x*=-1,vi.y*=-1,vi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(qm.makeRotationFromEuler(vi)),h.material.toneMapped=he.getTransfer(v.colorSpace)!==ve,(f!==v||d!==v.version||u!==i.toneMapping)&&(h.material.needsUpdate=!0,f=v,d=v.version,u=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new fe(new ps(2,2),new tn({name:"BackgroundMaterial",uniforms:fs(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=he.getTransfer(v.colorSpace)!==ve,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||d!==v.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,f=v,d=v.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,M){y.getRGB(Hr,Xh(i)),n.buffers.color.setClear(Hr.r,Hr.g,Hr.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(y,M=1){o.set(y),l=M,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,m(o,l)},render:_,addToRenderList:p}}function Ym(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(x,S,I,D,B){let W=!1,H=f(D,I,S);r!==H&&(r=H,c(r.object)),W=u(x,D,I,B),W&&g(x,D,I,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,v(x,S,I,D),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function f(x,S,I){let D=I.wireframe===!0,B=n[x.id];B===void 0&&(B={},n[x.id]=B);let W=B[S.id];W===void 0&&(W={},B[S.id]=W);let H=W[D];return H===void 0&&(H=d(l()),W[D]=H),H}function d(x){let S=[],I=[],D=[];for(let B=0;B<e;B++)S[B]=0,I[B]=0,D[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:I,attributeDivisors:D,object:x,attributes:{},index:null}}function u(x,S,I,D){let B=r.attributes,W=S.attributes,H=0,st=I.getAttributes();for(let O in st)if(st[O].location>=0){let pt=B[O],it=W[O];if(it===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&(it=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&(it=x.instanceColor)),pt===void 0||pt.attribute!==it||it&&pt.data!==it.data)return!0;H++}return r.attributesNum!==H||r.index!==D}function g(x,S,I,D){let B={},W=S.attributes,H=0,st=I.getAttributes();for(let O in st)if(st[O].location>=0){let pt=W[O];pt===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&(pt=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&(pt=x.instanceColor));let it={};it.attribute=pt,pt&&pt.data&&(it.data=pt.data),B[O]=it,H++}r.attributes=B,r.attributesNum=H,r.index=D}function _(){let x=r.newAttributes;for(let S=0,I=x.length;S<I;S++)x[S]=0}function p(x){m(x,0)}function m(x,S){let I=r.newAttributes,D=r.enabledAttributes,B=r.attributeDivisors;I[x]=1,D[x]===0&&(i.enableVertexAttribArray(x),D[x]=1),B[x]!==S&&(i.vertexAttribDivisor(x,S),B[x]=S)}function y(){let x=r.newAttributes,S=r.enabledAttributes;for(let I=0,D=S.length;I<D;I++)S[I]!==x[I]&&(i.disableVertexAttribArray(I),S[I]=0)}function M(x,S,I,D,B,W,H){H===!0?i.vertexAttribIPointer(x,S,I,B,W):i.vertexAttribPointer(x,S,I,D,B,W)}function v(x,S,I,D){_();let B=D.attributes,W=I.getAttributes(),H=S.defaultAttributeValues;for(let st in W){let O=W[st];if(O.location>=0){let Q=B[st];if(Q===void 0&&(st==="instanceMatrix"&&x.instanceMatrix&&(Q=x.instanceMatrix),st==="instanceColor"&&x.instanceColor&&(Q=x.instanceColor)),Q!==void 0){let pt=Q.normalized,it=Q.itemSize,ht=t.get(Q);if(ht===void 0)continue;let yt=ht.buffer,X=ht.type,nt=ht.bytesPerElement,ft=X===i.INT||X===i.UNSIGNED_INT||Q.gpuType===ql;if(Q.isInterleavedBufferAttribute){let k=Q.data,tt=k.stride,rt=Q.offset;if(k.isInstancedInterleavedBuffer){for(let mt=0;mt<O.locationSize;mt++)m(O.location+mt,k.meshPerAttribute);x.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let mt=0;mt<O.locationSize;mt++)p(O.location+mt);i.bindBuffer(i.ARRAY_BUFFER,yt);for(let mt=0;mt<O.locationSize;mt++)M(O.location+mt,it/O.locationSize,X,pt,tt*nt,(rt+it/O.locationSize*mt)*nt,ft)}else{if(Q.isInstancedBufferAttribute){for(let k=0;k<O.locationSize;k++)m(O.location+k,Q.meshPerAttribute);x.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let k=0;k<O.locationSize;k++)p(O.location+k);i.bindBuffer(i.ARRAY_BUFFER,yt);for(let k=0;k<O.locationSize;k++)M(O.location+k,it/O.locationSize,X,pt,it*nt,it/O.locationSize*k*nt,ft)}}else if(H!==void 0){let pt=H[st];if(pt!==void 0)switch(pt.length){case 2:i.vertexAttrib2fv(O.location,pt);break;case 3:i.vertexAttrib3fv(O.location,pt);break;case 4:i.vertexAttrib4fv(O.location,pt);break;default:i.vertexAttrib1fv(O.location,pt)}}}}y()}function P(){C();for(let x in n){let S=n[x];for(let I in S){let D=S[I];for(let B in D)h(D[B].object),delete D[B];delete S[I]}delete n[x]}}function T(x){if(n[x.id]===void 0)return;let S=n[x.id];for(let I in S){let D=S[I];for(let B in D)h(D[B].object),delete D[B];delete S[I]}delete n[x.id]}function A(x){for(let S in n){let I=n[S];if(I[x.id]===void 0)continue;let D=I[x.id];for(let B in D)h(D[B].object),delete D[B];delete I[x.id]}}function C(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:b,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function Zm(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,f){f!==0&&(i.drawArraysInstanced(n,c,h,f),e.update(h,n,f))}function o(c,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,f);let u=0;for(let g=0;g<f;g++)u+=h[g];e.update(u,n,1)}function l(c,h,f,d){if(f===0)return;let u=t.get("WEBGL_multi_draw");if(u===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{u.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Jm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==vn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let C=A===or&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Hn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==An&&!C)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:u,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:P,maxSamples:T}}function Km(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Bn,o=new ae,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let u=f.length!==0||d||n!==0||s;return s=d,n=f.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=h(f,d,0)},this.setState=function(f,d,u){let g=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,m=i.get(f);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{let y=r?0:n,M=y*4,v=m.clippingState||null;l.value=v,v=h(g,d,M,u);for(let P=0;P!==M;++P)v[P]=e[P];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,d,u,g){let _=f!==null?f.length:0,p=null;if(_!==0){if(p=l.value,g!==!0||p===null){let m=u+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let M=0,v=u;M!==_;++M,v+=4)a.copy(f[M]).applyMatrix4(y,o),a.normal.toArray(p,v),p[v+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function jm(i){let t=new WeakMap;function e(a,o){return o===Po?a.mapping=cs:o===Lo&&(a.mapping=hs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Po||o===Lo)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new fl(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ua=class extends ca{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ns=4,Kc=[.125,.215,.35,.446,.526,.582],Ti=20,uo=new ua,jc=new zt,fo=null,po=0,mo=0,go=!1,bi=(1+Math.sqrt(5))/2,Qi=1/bi,Qc=[new F(-bi,Qi,0),new F(bi,Qi,0),new F(-Qi,0,bi),new F(Qi,0,bi),new F(0,bi,-Qi),new F(0,bi,Qi),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],da=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=eh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fo,po,mo),this._renderer.xr.enabled=go,t.scissorTest=!1,Gr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===cs||t.mapping===hs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:En,minFilter:En,generateMipmaps:!1,type:or,format:vn,colorSpace:ws,depthBuffer:!1},s=th(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=th(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qm(r)),this._blurMaterial=tg(r,t,e)}return s}_compileMaterial(t){let e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,uo)}_sceneToCubeUV(t,e,n,s){let o=new Xe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(jc),h.toneMapping=ri,h.autoClear=!1;let u=new Rn({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),g=new fe(new Te,u),_=!1,p=t.background;p?p.isColor&&(u.color.copy(p),t.background=null,_=!0):(u.color.copy(jc),_=!0);for(let m=0;m<6;m++){let y=m%3;y===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):y===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));let M=this._cubeSize;Gr(s,y*M,m>2?M:0,M,M),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=f,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===cs||t.mapping===hs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=nh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=eh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new fe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Gr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,uo)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Qc[(s-r-1)%Qc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,f=new fe(this._lodPlanes[s],c),d=c.uniforms,u=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*u):2*Math.PI/(2*Ti-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Ti;p>Ti&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ti}`);let m=[],y=0;for(let A=0;A<Ti;++A){let C=A/_,b=Math.exp(-C*C/2);m.push(b),A===0?y+=b:A<p&&(y+=2*b)}for(let A=0;A<m.length;A++)m[A]=m[A]/y;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;let v=this._sizeLods[s],P=3*v*(s>M-ns?s-M+ns:0),T=4*(this._cubeSize-v);Gr(e,P,T,3*v,2*v),l.setRenderTarget(e),l.render(f,uo)}};function Qm(i){let t=[],e=[],n=[],s=i,r=i-ns+1+Kc.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-ns?l=Kc[a-i+ns-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,f=1+c,d=[h,h,f,h,f,f,h,h,f,f,h,f],u=6,g=6,_=3,p=2,m=1,y=new Float32Array(_*g*u),M=new Float32Array(p*g*u),v=new Float32Array(m*g*u);for(let T=0;T<u;T++){let A=T%3*2/3-1,C=T>2?0:-1,b=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];y.set(b,_*g*T),M.set(d,p*g*T);let x=[T,T,T,T,T,T];v.set(x,m*g*T)}let P=new xe;P.setAttribute("position",new qe(y,_)),P.setAttribute("uv",new qe(M,p)),P.setAttribute("faceIndex",new qe(v,m)),t.push(P),s>ns&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function th(i,t,e){let n=new Gn(i,t,e);return n.texture.mapping=Ta,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Gr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function tg(i,t,e){let n=new Float32Array(Ti),s=new F(0,1,0);return new tn({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:tc(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function eh(){return new tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tc(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function nh(){return new tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tc(),fragmentShader:`

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
	`}function eg(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Po||l===Lo,h=l===cs||l===hs;if(c||h){let f=t.get(o),d=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new da(i)),f=c?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{let u=o.image;return c&&u&&u.height>0||h&&u&&s(u)?(e===null&&(e=new da(i)),f=c?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function ng(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ws("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function ig(i,t,e,n){let s={},r=new WeakMap;function a(f){let d=f.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}d.removeEventListener("dispose",a),delete s[d.id];let u=r.get(d);u&&(t.remove(u),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(f,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(f){let d=f.attributes;for(let g in d)t.update(d[g],i.ARRAY_BUFFER);let u=f.morphAttributes;for(let g in u){let _=u[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],i.ARRAY_BUFFER)}}function c(f){let d=[],u=f.index,g=f.attributes.position,_=0;if(u!==null){let y=u.array;_=u.version;for(let M=0,v=y.length;M<v;M+=3){let P=y[M+0],T=y[M+1],A=y[M+2];d.push(P,T,T,A,A,P)}}else if(g!==void 0){let y=g.array;_=g.version;for(let M=0,v=y.length/3-1;M<v;M+=3){let P=M+0,T=M+1,A=M+2;d.push(P,T,T,A,A,P)}}else return;let p=new(Gh(d)?la:oa)(d,1);p.version=_;let m=r.get(f);m&&t.remove(m),r.set(f,p)}function h(f){let d=r.get(f);if(d){let u=f.index;u!==null&&d.version<u.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function sg(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),e.update(u,n,1)}function c(d,u,g){g!==0&&(i.drawElementsInstanced(n,u,r,d*a,g),e.update(u,n,g))}function h(d,u,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,g);let p=0;for(let m=0;m<g;m++)p+=u[m];e.update(p,n,1)}function f(d,u,g,_){if(g===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/a,u[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,u,0,r,d,0,_,0,g);let m=0;for(let y=0;y<g;y++)m+=u[y]*_[y];e.update(m,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function rg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ag(i,t,e){let n=new WeakMap,s=new Ce;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==f){let b=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let u=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],M=0;u===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let v=o.attributes.position.count*M,P=1;v>t.maxTextureSize&&(P=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let T=new Float32Array(v*P*4*f),A=new ra(T,v,P,f);A.type=An,A.needsUpdate=!0;let C=M*4;for(let x=0;x<f;x++){let S=p[x],I=m[x],D=y[x],B=v*P*4*x;for(let W=0;W<S.count;W++){let H=W*C;u===!0&&(s.fromBufferAttribute(S,W),T[B+H+0]=s.x,T[B+H+1]=s.y,T[B+H+2]=s.z,T[B+H+3]=0),g===!0&&(s.fromBufferAttribute(I,W),T[B+H+4]=s.x,T[B+H+5]=s.y,T[B+H+6]=s.z,T[B+H+7]=0),_===!0&&(s.fromBufferAttribute(D,W),T[B+H+8]=s.x,T[B+H+9]=s.y,T[B+H+10]=s.z,T[B+H+11]=D.itemSize===4?s.w:1)}}d={count:f,texture:A,size:new Ct(v,P)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let u=0;for(let _=0;_<c.length;_++)u+=c[_];let g=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function og(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,f=t.get(l,h);if(s.get(f)!==c&&(t.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return f}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var fa=class extends cn{constructor(t,e,n,s,r,a,o,l,c,h=rs){if(h!==rs&&h!==ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===rs&&(n=Ci),n===void 0&&h===ds&&(n=us),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:ln,this.minFilter=l!==void 0?l:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},$h=new cn,ih=new fa(1,1),Yh=new ra,Zh=new hl,Jh=new ha,sh=[],rh=[],ah=new Float32Array(16),oh=new Float32Array(9),lh=new Float32Array(4);function Ts(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=sh[s];if(r===void 0&&(r=new Float32Array(s),sh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Aa(i,t){let e=rh[t];e===void 0&&(e=new Int32Array(t),rh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function lg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function cg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2fv(this.addr,t),Oe(e,t)}}function hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;i.uniform3fv(this.addr,t),Oe(e,t)}}function ug(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4fv(this.addr,t),Oe(e,t)}}function dg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;lh.set(n),i.uniformMatrix2fv(this.addr,!1,lh),Oe(e,n)}}function fg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;oh.set(n),i.uniformMatrix3fv(this.addr,!1,oh),Oe(e,n)}}function pg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;ah.set(n),i.uniformMatrix4fv(this.addr,!1,ah),Oe(e,n)}}function mg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function gg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2iv(this.addr,t),Oe(e,t)}}function xg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3iv(this.addr,t),Oe(e,t)}}function _g(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4iv(this.addr,t),Oe(e,t)}}function yg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function vg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2uiv(this.addr,t),Oe(e,t)}}function Mg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3uiv(this.addr,t),Oe(e,t)}}function bg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4uiv(this.addr,t),Oe(e,t)}}function Sg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ih.compareFunction=Hh,r=ih):r=$h,e.setTexture2D(t||r,s)}function wg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Zh,s)}function Tg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Jh,s)}function Eg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Yh,s)}function Ag(i){switch(i){case 5126:return lg;case 35664:return cg;case 35665:return hg;case 35666:return ug;case 35674:return dg;case 35675:return fg;case 35676:return pg;case 5124:case 35670:return mg;case 35667:case 35671:return gg;case 35668:case 35672:return xg;case 35669:case 35673:return _g;case 5125:return yg;case 36294:return vg;case 36295:return Mg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return Sg;case 35679:case 36299:case 36307:return wg;case 35680:case 36300:case 36308:case 36293:return Tg;case 36289:case 36303:case 36311:case 36292:return Eg}}function Cg(i,t){i.uniform1fv(this.addr,t)}function Rg(i,t){let e=Ts(t,this.size,2);i.uniform2fv(this.addr,e)}function Ig(i,t){let e=Ts(t,this.size,3);i.uniform3fv(this.addr,e)}function Pg(i,t){let e=Ts(t,this.size,4);i.uniform4fv(this.addr,e)}function Lg(i,t){let e=Ts(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Dg(i,t){let e=Ts(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Ug(i,t){let e=Ts(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ng(i,t){i.uniform1iv(this.addr,t)}function Fg(i,t){i.uniform2iv(this.addr,t)}function Og(i,t){i.uniform3iv(this.addr,t)}function Bg(i,t){i.uniform4iv(this.addr,t)}function zg(i,t){i.uniform1uiv(this.addr,t)}function kg(i,t){i.uniform2uiv(this.addr,t)}function Vg(i,t){i.uniform3uiv(this.addr,t)}function Hg(i,t){i.uniform4uiv(this.addr,t)}function Gg(i,t,e){let n=this.cache,s=t.length,r=Aa(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||$h,r[a])}function Wg(i,t,e){let n=this.cache,s=t.length,r=Aa(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Zh,r[a])}function Xg(i,t,e){let n=this.cache,s=t.length,r=Aa(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Jh,r[a])}function qg(i,t,e){let n=this.cache,s=t.length,r=Aa(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Yh,r[a])}function $g(i){switch(i){case 5126:return Cg;case 35664:return Rg;case 35665:return Ig;case 35666:return Pg;case 35674:return Lg;case 35675:return Dg;case 35676:return Ug;case 5124:case 35670:return Ng;case 35667:case 35671:return Fg;case 35668:case 35672:return Og;case 35669:case 35673:return Bg;case 5125:return zg;case 36294:return kg;case 36295:return Vg;case 36296:return Hg;case 35678:case 36198:case 36298:case 36306:case 35682:return Gg;case 35679:case 36299:case 36307:return Wg;case 35680:case 36300:case 36308:case 36293:return Xg;case 36289:case 36303:case 36311:case 36292:return qg}}var pl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Ag(e.type)}},ml=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=$g(e.type)}},gl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},xo=/(\w+)(\])?(\[|\.)?/g;function ch(i,t){i.seq.push(t),i.map[t.id]=t}function Yg(i,t,e){let n=i.name,s=n.length;for(xo.lastIndex=0;;){let r=xo.exec(n),a=xo.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){ch(e,c===void 0?new pl(o,i,t):new ml(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new gl(o),ch(e,f)),e=f}}}var os=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Yg(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function hh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Zg=37297,Jg=0;function Kg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var uh=new ae;function jg(i){he._getMatrix(uh,he.workingColorSpace,i);let t=`mat3( ${uh.elements.map(e=>e.toFixed(4))} )`;switch(he.getTransfer(i)){case Ea:return[t,"LinearTransferOETF"];case ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function dh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Kg(i.getShaderSource(t),a)}else return s}function Qg(i,t){let e=jg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function t0(i,t){let e;switch(t){case hd:e="Linear";break;case ud:e="Reinhard";break;case dd:e="Cineon";break;case fd:e="ACESFilmic";break;case md:e="AgX";break;case ar:e="Neutral";break;case pd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Wr=new F;function e0(){he.getLuminanceCoefficients(Wr);let i=Wr.x.toFixed(4),t=Wr.y.toFixed(4),e=Wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function n0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xs).join(`
`)}function i0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function s0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Xs(i){return i!==""}function fh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ph(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var r0=/^[ \t]*#include +<([\w\d./]+)>/gm;function xl(i){return i.replace(r0,o0)}var a0=new Map;function o0(i,t){let e=oe[t];if(e===void 0){let n=a0.get(t);if(n!==void 0)e=oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return xl(e)}var l0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mh(i){return i.replace(l0,c0)}function c0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function gh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function h0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Rh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===rr?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===On&&(t="SHADOWMAP_TYPE_VSM"),t}function u0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case cs:case hs:t="ENVMAP_TYPE_CUBE";break;case Ta:t="ENVMAP_TYPE_CUBE_UV";break}return t}function d0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case hs:t="ENVMAP_MODE_REFRACTION";break}return t}function f0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ih:t="ENVMAP_BLENDING_MULTIPLY";break;case ld:t="ENVMAP_BLENDING_MIX";break;case cd:t="ENVMAP_BLENDING_ADD";break}return t}function p0(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function m0(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=h0(e),c=u0(e),h=d0(e),f=f0(e),d=p0(e),u=n0(e),g=i0(r),_=s.createProgram(),p,m,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Xs).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Xs).join(`
`),m.length>0&&(m+=`
`)):(p=[gh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xs).join(`
`),m=[gh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?oe.tonemapping_pars_fragment:"",e.toneMapping!==ri?t0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",oe.colorspace_pars_fragment,Qg("linearToOutputTexel",e.outputColorSpace),e0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Xs).join(`
`)),a=xl(a),a=fh(a,e),a=ph(a,e),o=xl(o),o=fh(o,e),o=ph(o,e),a=mh(a),o=mh(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Rc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let M=y+p+a,v=y+m+o,P=hh(s,s.VERTEX_SHADER,M),T=hh(s,s.FRAGMENT_SHADER,v);s.attachShader(_,P),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(S){if(i.debug.checkShaderErrors){let I=s.getProgramInfoLog(_).trim(),D=s.getShaderInfoLog(P).trim(),B=s.getShaderInfoLog(T).trim(),W=!0,H=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,P,T);else{let st=dh(s,P,"vertex"),O=dh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+I+`
`+st+`
`+O)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(D===""||B==="")&&(H=!1);H&&(S.diagnostics={runnable:W,programLog:I,vertexShader:{log:D,prefix:p},fragmentShader:{log:B,prefix:m}})}s.deleteShader(P),s.deleteShader(T),C=new os(s,_),b=s0(s,_)}let C;this.getUniforms=function(){return C===void 0&&A(this),C};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,Zg)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Jg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=T,this}var g0=0,_l=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new yl(t),e.set(t,n)),n}},yl=class{constructor(t){this.id=g0++,this.code=t,this.usedTimes=0}};function x0(i,t,e,n,s,r,a){let o=new aa,l=new _l,c=new Set,h=[],f=s.logarithmicDepthBuffer,d=s.vertexTextures,u=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function p(b,x,S,I,D){let B=I.fog,W=D.geometry,H=b.isMeshStandardMaterial?I.environment:null,st=(b.isMeshStandardMaterial?e:t).get(b.envMap||H),O=st&&st.mapping===Ta?st.image.height:null,Q=g[b.type];b.precision!==null&&(u=s.getMaxPrecision(b.precision),u!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",u,"instead."));let pt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,it=pt!==void 0?pt.length:0,ht=0;W.morphAttributes.position!==void 0&&(ht=1),W.morphAttributes.normal!==void 0&&(ht=2),W.morphAttributes.color!==void 0&&(ht=3);let yt,X,nt,ft;if(Q){let At=Tn[Q];yt=At.vertexShader,X=At.fragmentShader}else yt=b.vertexShader,X=b.fragmentShader,l.update(b),nt=l.getVertexShaderID(b),ft=l.getFragmentShaderID(b);let k=i.getRenderTarget(),tt=i.state.buffers.depth.getReversed(),rt=D.isInstancedMesh===!0,mt=D.isBatchedMesh===!0,Et=!!b.map,Ut=!!b.matcap,St=!!st,U=!!b.aoMap,jt=!!b.lightMap,Ft=!!b.bumpMap,$t=!!b.normalMap,Ot=!!b.displacementMap,le=!!b.emissiveMap,Gt=!!b.metalnessMap,R=!!b.roughnessMap,w=b.anisotropy>0,q=b.clearcoat>0,at=b.dispersion>0,dt=b.iridescence>0,ot=b.sheen>0,Dt=b.transmission>0,bt=w&&!!b.anisotropyMap,wt=q&&!!b.clearcoatMap,ee=q&&!!b.clearcoatNormalMap,gt=q&&!!b.clearcoatRoughnessMap,Pt=dt&&!!b.iridescenceMap,Nt=dt&&!!b.iridescenceThicknessMap,Yt=ot&&!!b.sheenColorMap,Rt=ot&&!!b.sheenRoughnessMap,se=!!b.specularMap,Qt=!!b.specularColorMap,ce=!!b.specularIntensityMap,z=Dt&&!!b.transmissionMap,vt=Dt&&!!b.thicknessMap,j=!!b.gradientMap,L=!!b.alphaMap,N=b.alphaTest>0,Y=!!b.alphaHash,xt=!!b.extensions,_t=ri;b.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(_t=i.toneMapping);let Bt={shaderID:Q,shaderType:b.type,shaderName:b.name,vertexShader:yt,fragmentShader:X,defines:b.defines,customVertexShaderID:nt,customFragmentShaderID:ft,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:u,batching:mt,batchingColor:mt&&D._colorsTexture!==null,instancing:rt,instancingColor:rt&&D.instanceColor!==null,instancingMorph:rt&&D.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:k===null?i.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:ws,alphaToCoverage:!!b.alphaToCoverage,map:Et,matcap:Ut,envMap:St,envMapMode:St&&st.mapping,envMapCubeUVHeight:O,aoMap:U,lightMap:jt,bumpMap:Ft,normalMap:$t,displacementMap:d&&Ot,emissiveMap:le,normalMapObjectSpace:$t&&b.normalMapType===yd,normalMapTangentSpace:$t&&b.normalMapType===Vh,metalnessMap:Gt,roughnessMap:R,anisotropy:w,anisotropyMap:bt,clearcoat:q,clearcoatMap:wt,clearcoatNormalMap:ee,clearcoatRoughnessMap:gt,dispersion:at,iridescence:dt,iridescenceMap:Pt,iridescenceThicknessMap:Nt,sheen:ot,sheenColorMap:Yt,sheenRoughnessMap:Rt,specularMap:se,specularColorMap:Qt,specularIntensityMap:ce,transmission:Dt,transmissionMap:z,thicknessMap:vt,gradientMap:j,opaque:b.transparent===!1&&b.blending===ss&&b.alphaToCoverage===!1,alphaMap:L,alphaTest:N,alphaHash:Y,combine:b.combine,mapUv:Et&&_(b.map.channel),aoMapUv:U&&_(b.aoMap.channel),lightMapUv:jt&&_(b.lightMap.channel),bumpMapUv:Ft&&_(b.bumpMap.channel),normalMapUv:$t&&_(b.normalMap.channel),displacementMapUv:Ot&&_(b.displacementMap.channel),emissiveMapUv:le&&_(b.emissiveMap.channel),metalnessMapUv:Gt&&_(b.metalnessMap.channel),roughnessMapUv:R&&_(b.roughnessMap.channel),anisotropyMapUv:bt&&_(b.anisotropyMap.channel),clearcoatMapUv:wt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:ee&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Pt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(b.sheenRoughnessMap.channel),specularMapUv:se&&_(b.specularMap.channel),specularColorMapUv:Qt&&_(b.specularColorMap.channel),specularIntensityMapUv:ce&&_(b.specularIntensityMap.channel),transmissionMapUv:z&&_(b.transmissionMap.channel),thicknessMapUv:vt&&_(b.thicknessMap.channel),alphaMapUv:L&&_(b.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&($t||w),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!W.attributes.uv&&(Et||L),fog:!!B,useFog:b.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:tt,skinning:D.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:it,morphTextureStride:ht,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&S.length>0,shadowMapType:i.shadowMap.type,toneMapping:_t,decodeVideoTexture:Et&&b.map.isVideoTexture===!0&&he.getTransfer(b.map.colorSpace)===ve,decodeVideoTextureEmissive:le&&b.emissiveMap.isVideoTexture===!0&&he.getTransfer(b.emissiveMap.colorSpace)===ve,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ie,flipSided:b.side===Ge,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:xt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&b.extensions.multiDraw===!0||mt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Bt.vertexUv1s=c.has(1),Bt.vertexUv2s=c.has(2),Bt.vertexUv3s=c.has(3),c.clear(),Bt}function m(b){let x=[];if(b.shaderID?x.push(b.shaderID):(x.push(b.customVertexShaderID),x.push(b.customFragmentShaderID)),b.defines!==void 0)for(let S in b.defines)x.push(S),x.push(b.defines[S]);return b.isRawShaderMaterial===!1&&(y(x,b),M(x,b),x.push(i.outputColorSpace)),x.push(b.customProgramCacheKey),x.join()}function y(b,x){b.push(x.precision),b.push(x.outputColorSpace),b.push(x.envMapMode),b.push(x.envMapCubeUVHeight),b.push(x.mapUv),b.push(x.alphaMapUv),b.push(x.lightMapUv),b.push(x.aoMapUv),b.push(x.bumpMapUv),b.push(x.normalMapUv),b.push(x.displacementMapUv),b.push(x.emissiveMapUv),b.push(x.metalnessMapUv),b.push(x.roughnessMapUv),b.push(x.anisotropyMapUv),b.push(x.clearcoatMapUv),b.push(x.clearcoatNormalMapUv),b.push(x.clearcoatRoughnessMapUv),b.push(x.iridescenceMapUv),b.push(x.iridescenceThicknessMapUv),b.push(x.sheenColorMapUv),b.push(x.sheenRoughnessMapUv),b.push(x.specularMapUv),b.push(x.specularColorMapUv),b.push(x.specularIntensityMapUv),b.push(x.transmissionMapUv),b.push(x.thicknessMapUv),b.push(x.combine),b.push(x.fogExp2),b.push(x.sizeAttenuation),b.push(x.morphTargetsCount),b.push(x.morphAttributeCount),b.push(x.numDirLights),b.push(x.numPointLights),b.push(x.numSpotLights),b.push(x.numSpotLightMaps),b.push(x.numHemiLights),b.push(x.numRectAreaLights),b.push(x.numDirLightShadows),b.push(x.numPointLightShadows),b.push(x.numSpotLightShadows),b.push(x.numSpotLightShadowsWithMaps),b.push(x.numLightProbes),b.push(x.shadowMapType),b.push(x.toneMapping),b.push(x.numClippingPlanes),b.push(x.numClipIntersection),b.push(x.depthPacking)}function M(b,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),b.push(o.mask)}function v(b){let x=g[b.type],S;if(x){let I=Tn[x];S=of.clone(I.uniforms)}else S=b.uniforms;return S}function P(b,x){let S;for(let I=0,D=h.length;I<D;I++){let B=h[I];if(B.cacheKey===x){S=B,++S.usedTimes;break}}return S===void 0&&(S=new m0(i,x,b,r),h.push(S)),S}function T(b){if(--b.usedTimes===0){let x=h.indexOf(b);h[x]=h[h.length-1],h.pop(),b.destroy()}}function A(b){l.remove(b)}function C(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:v,acquireProgram:P,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:C}}function _0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function y0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function xh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function _h(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(f,d,u,g,_,p){let m=i[t];return m===void 0?(m={id:f.id,object:f,geometry:d,material:u,groupOrder:g,renderOrder:f.renderOrder,z:_,group:p},i[t]=m):(m.id=f.id,m.object=f,m.geometry=d,m.material=u,m.groupOrder=g,m.renderOrder=f.renderOrder,m.z=_,m.group=p),t++,m}function o(f,d,u,g,_,p){let m=a(f,d,u,g,_,p);u.transmission>0?n.push(m):u.transparent===!0?s.push(m):e.push(m)}function l(f,d,u,g,_,p){let m=a(f,d,u,g,_,p);u.transmission>0?n.unshift(m):u.transparent===!0?s.unshift(m):e.unshift(m)}function c(f,d){e.length>1&&e.sort(f||y0),n.length>1&&n.sort(d||xh),s.length>1&&s.sort(d||xh)}function h(){for(let f=t,d=i.length;f<d;f++){let u=i[f];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function v0(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new _h,i.set(n,[a])):s>=r.length?(a=new _h,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function M0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new zt};break;case"SpotLight":e={position:new F,direction:new F,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function b0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var S0=0;function w0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function T0(i){let t=new M0,e=b0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);let s=new F,r=new ge,a=new ge;function o(c){let h=0,f=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let u=0,g=0,_=0,p=0,m=0,y=0,M=0,v=0,P=0,T=0,A=0;c.sort(w0);for(let b=0,x=c.length;b<x;b++){let S=c[b],I=S.color,D=S.intensity,B=S.distance,W=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)h+=I.r*D,f+=I.g*D,d+=I.b*D;else if(S.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(S.sh.coefficients[H],D);A++}else if(S.isDirectionalLight){let H=t.get(S);if(H.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let st=S.shadow,O=e.get(S);O.shadowIntensity=st.intensity,O.shadowBias=st.bias,O.shadowNormalBias=st.normalBias,O.shadowRadius=st.radius,O.shadowMapSize=st.mapSize,n.directionalShadow[u]=O,n.directionalShadowMap[u]=W,n.directionalShadowMatrix[u]=S.shadow.matrix,y++}n.directional[u]=H,u++}else if(S.isSpotLight){let H=t.get(S);H.position.setFromMatrixPosition(S.matrixWorld),H.color.copy(I).multiplyScalar(D),H.distance=B,H.coneCos=Math.cos(S.angle),H.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),H.decay=S.decay,n.spot[_]=H;let st=S.shadow;if(S.map&&(n.spotLightMap[P]=S.map,P++,st.updateMatrices(S),S.castShadow&&T++),n.spotLightMatrix[_]=st.matrix,S.castShadow){let O=e.get(S);O.shadowIntensity=st.intensity,O.shadowBias=st.bias,O.shadowNormalBias=st.normalBias,O.shadowRadius=st.radius,O.shadowMapSize=st.mapSize,n.spotShadow[_]=O,n.spotShadowMap[_]=W,v++}_++}else if(S.isRectAreaLight){let H=t.get(S);H.color.copy(I).multiplyScalar(D),H.halfWidth.set(S.width*.5,0,0),H.halfHeight.set(0,S.height*.5,0),n.rectArea[p]=H,p++}else if(S.isPointLight){let H=t.get(S);if(H.color.copy(S.color).multiplyScalar(S.intensity),H.distance=S.distance,H.decay=S.decay,S.castShadow){let st=S.shadow,O=e.get(S);O.shadowIntensity=st.intensity,O.shadowBias=st.bias,O.shadowNormalBias=st.normalBias,O.shadowRadius=st.radius,O.shadowMapSize=st.mapSize,O.shadowCameraNear=st.camera.near,O.shadowCameraFar=st.camera.far,n.pointShadow[g]=O,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=S.shadow.matrix,M++}n.point[g]=H,g++}else if(S.isHemisphereLight){let H=t.get(S);H.skyColor.copy(S.color).multiplyScalar(D),H.groundColor.copy(S.groundColor).multiplyScalar(D),n.hemi[m]=H,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Tt.LTC_FLOAT_1,n.rectAreaLTC2=Tt.LTC_FLOAT_2):(n.rectAreaLTC1=Tt.LTC_HALF_1,n.rectAreaLTC2=Tt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=d;let C=n.hash;(C.directionalLength!==u||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==p||C.hemiLength!==m||C.numDirectionalShadows!==y||C.numPointShadows!==M||C.numSpotShadows!==v||C.numSpotMaps!==P||C.numLightProbes!==A)&&(n.directional.length=u,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+P-T,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,C.directionalLength=u,C.pointLength=g,C.spotLength=_,C.rectAreaLength=p,C.hemiLength=m,C.numDirectionalShadows=y,C.numPointShadows=M,C.numSpotShadows=v,C.numSpotMaps=P,C.numLightProbes=A,n.version=S0++)}function l(c,h){let f=0,d=0,u=0,g=0,_=0,p=h.matrixWorldInverse;for(let m=0,y=c.length;m<y;m++){let M=c[m];if(M.isDirectionalLight){let v=n.directional[f];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),f++}else if(M.isSpotLight){let v=n.spot[u];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),u++}else if(M.isRectAreaLight){let v=n.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),a.identity(),r.copy(M.matrixWorld),r.premultiply(p),a.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){let v=n.point[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),d++}else if(M.isHemisphereLight){let v=n.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function yh(i){let t=new T0(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function E0(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new yh(i),t.set(s,[o])):r>=a.length?(o=new yh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var vl=class extends Ii{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=xd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ml=class extends Ii{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},A0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C0=`uniform sampler2D shadow_pass;
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
}`;function R0(i,t,e){let n=new Qs,s=new Ct,r=new Ct,a=new Ce,o=new vl({depthPacking:_d}),l=new Ml,c={},h=e.maxTextureSize,f={[ai]:Ge,[Ge]:ai,[Ie]:Ie},d=new tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:A0,fragmentShader:C0}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let g=new xe;g.setAttribute("position",new qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new fe(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rh;let m=this.type;this.render=function(T,A,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;let b=i.getRenderTarget(),x=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),I=i.state;I.setBlending(si),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let D=m!==On&&this.type===On,B=m===On&&this.type!==On;for(let W=0,H=T.length;W<H;W++){let st=T[W],O=st.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",st,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);let Q=O.getFrameExtents();if(s.multiply(Q),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,O.mapSize.y=r.y)),O.map===null||D===!0||B===!0){let it=this.type!==On?{minFilter:ln,magFilter:ln}:{};O.map!==null&&O.map.dispose(),O.map=new Gn(s.x,s.y,it),O.map.texture.name=st.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();let pt=O.getViewportCount();for(let it=0;it<pt;it++){let ht=O.getViewport(it);a.set(r.x*ht.x,r.y*ht.y,r.x*ht.z,r.y*ht.w),I.viewport(a),O.updateMatrices(st,it),n=O.getFrustum(),v(A,C,O.camera,st,this.type)}O.isPointLightShadow!==!0&&this.type===On&&y(O,C),O.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(b,x,S)};function y(T,A){let C=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,u.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Gn(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,C,d,_,null),u.uniforms.shadow_pass.value=T.mapPass.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,C,u,_,null)}function M(T,A,C,b){let x=null,S=C.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(S!==void 0)x=S;else if(x=C.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let I=x.uuid,D=A.uuid,B=c[I];B===void 0&&(B={},c[I]=B);let W=B[D];W===void 0&&(W=x.clone(),B[D]=W,A.addEventListener("dispose",P)),x=W}if(x.visible=A.visible,x.wireframe=A.wireframe,b===On?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:f[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,C.isPointLight===!0&&x.isMeshDistanceMaterial===!0){let I=i.properties.get(x);I.light=C}return x}function v(T,A,C,b,x){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&x===On)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld);let D=t.update(T),B=T.material;if(Array.isArray(B)){let W=D.groups;for(let H=0,st=W.length;H<st;H++){let O=W[H],Q=B[O.materialIndex];if(Q&&Q.visible){let pt=M(T,Q,b,x);T.onBeforeShadow(i,T,A,C,D,pt,O),i.renderBufferDirect(C,null,D,pt,T,O),T.onAfterShadow(i,T,A,C,D,pt,O)}}}else if(B.visible){let W=M(T,B,b,x);T.onBeforeShadow(i,T,A,C,D,W,null),i.renderBufferDirect(C,null,D,W,T,null),T.onAfterShadow(i,T,A,C,D,W,null)}}let I=T.children;for(let D=0,B=I.length;D<B;D++)v(I[D],A,C,b,x)}function P(T){T.target.removeEventListener("dispose",P);for(let C in c){let b=c[C],x=T.target.uuid;x in b&&(b[x].dispose(),delete b[x])}}}var I0={[wo]:To,[Eo]:Ro,[Ao]:Io,[ls]:Co,[To]:wo,[Ro]:Eo,[Io]:Ao,[Co]:ls};function P0(i,t){function e(){let z=!1,vt=new Ce,j=null,L=new Ce(0,0,0,0);return{setMask:function(N){j!==N&&!z&&(i.colorMask(N,N,N,N),j=N)},setLocked:function(N){z=N},setClear:function(N,Y,xt,_t,Bt){Bt===!0&&(N*=_t,Y*=_t,xt*=_t),vt.set(N,Y,xt,_t),L.equals(vt)===!1&&(i.clearColor(N,Y,xt,_t),L.copy(vt))},reset:function(){z=!1,j=null,L.set(-1,0,0,0)}}}function n(){let z=!1,vt=!1,j=null,L=null,N=null;return{setReversed:function(Y){if(vt!==Y){let xt=t.get("EXT_clip_control");vt?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT);let _t=N;N=null,this.setClear(_t)}vt=Y},getReversed:function(){return vt},setTest:function(Y){Y?k(i.DEPTH_TEST):tt(i.DEPTH_TEST)},setMask:function(Y){j!==Y&&!z&&(i.depthMask(Y),j=Y)},setFunc:function(Y){if(vt&&(Y=I0[Y]),L!==Y){switch(Y){case wo:i.depthFunc(i.NEVER);break;case To:i.depthFunc(i.ALWAYS);break;case Eo:i.depthFunc(i.LESS);break;case ls:i.depthFunc(i.LEQUAL);break;case Ao:i.depthFunc(i.EQUAL);break;case Co:i.depthFunc(i.GEQUAL);break;case Ro:i.depthFunc(i.GREATER);break;case Io:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}L=Y}},setLocked:function(Y){z=Y},setClear:function(Y){N!==Y&&(vt&&(Y=1-Y),i.clearDepth(Y),N=Y)},reset:function(){z=!1,j=null,L=null,N=null,vt=!1}}}function s(){let z=!1,vt=null,j=null,L=null,N=null,Y=null,xt=null,_t=null,Bt=null;return{setTest:function(At){z||(At?k(i.STENCIL_TEST):tt(i.STENCIL_TEST))},setMask:function(At){vt!==At&&!z&&(i.stencilMask(At),vt=At)},setFunc:function(At,Jt,Z){(j!==At||L!==Jt||N!==Z)&&(i.stencilFunc(At,Jt,Z),j=At,L=Jt,N=Z)},setOp:function(At,Jt,Z){(Y!==At||xt!==Jt||_t!==Z)&&(i.stencilOp(At,Jt,Z),Y=At,xt=Jt,_t=Z)},setLocked:function(At){z=At},setClear:function(At){Bt!==At&&(i.clearStencil(At),Bt=At)},reset:function(){z=!1,vt=null,j=null,L=null,N=null,Y=null,xt=null,_t=null,Bt=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},f={},d=new WeakMap,u=[],g=null,_=!1,p=null,m=null,y=null,M=null,v=null,P=null,T=null,A=new zt(0,0,0),C=0,b=!1,x=null,S=null,I=null,D=null,B=null,W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,st=0,O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(O)[1]),H=st>=1):O.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),H=st>=2);let Q=null,pt={},it=i.getParameter(i.SCISSOR_BOX),ht=i.getParameter(i.VIEWPORT),yt=new Ce().fromArray(it),X=new Ce().fromArray(ht);function nt(z,vt,j,L){let N=new Uint8Array(4),Y=i.createTexture();i.bindTexture(z,Y),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let xt=0;xt<j;xt++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(vt,0,i.RGBA,1,1,L,0,i.RGBA,i.UNSIGNED_BYTE,N):i.texImage2D(vt+xt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,N);return Y}let ft={};ft[i.TEXTURE_2D]=nt(i.TEXTURE_2D,i.TEXTURE_2D,1),ft[i.TEXTURE_CUBE_MAP]=nt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ft[i.TEXTURE_2D_ARRAY]=nt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ft[i.TEXTURE_3D]=nt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),k(i.DEPTH_TEST),a.setFunc(ls),Ft(!1),$t(vc),k(i.CULL_FACE),U(si);function k(z){h[z]!==!0&&(i.enable(z),h[z]=!0)}function tt(z){h[z]!==!1&&(i.disable(z),h[z]=!1)}function rt(z,vt){return f[z]!==vt?(i.bindFramebuffer(z,vt),f[z]=vt,z===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=vt),z===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=vt),!0):!1}function mt(z,vt){let j=u,L=!1;if(z){j=d.get(vt),j===void 0&&(j=[],d.set(vt,j));let N=z.textures;if(j.length!==N.length||j[0]!==i.COLOR_ATTACHMENT0){for(let Y=0,xt=N.length;Y<xt;Y++)j[Y]=i.COLOR_ATTACHMENT0+Y;j.length=N.length,L=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,L=!0);L&&i.drawBuffers(j)}function Et(z){return g!==z?(i.useProgram(z),g=z,!0):!1}let Ut={[Si]:i.FUNC_ADD,[Xu]:i.FUNC_SUBTRACT,[qu]:i.FUNC_REVERSE_SUBTRACT};Ut[$u]=i.MIN,Ut[Yu]=i.MAX;let St={[Zu]:i.ZERO,[Ju]:i.ONE,[Ku]:i.SRC_COLOR,[bo]:i.SRC_ALPHA,[id]:i.SRC_ALPHA_SATURATE,[ed]:i.DST_COLOR,[Qu]:i.DST_ALPHA,[ju]:i.ONE_MINUS_SRC_COLOR,[So]:i.ONE_MINUS_SRC_ALPHA,[nd]:i.ONE_MINUS_DST_COLOR,[td]:i.ONE_MINUS_DST_ALPHA,[sd]:i.CONSTANT_COLOR,[rd]:i.ONE_MINUS_CONSTANT_COLOR,[ad]:i.CONSTANT_ALPHA,[od]:i.ONE_MINUS_CONSTANT_ALPHA};function U(z,vt,j,L,N,Y,xt,_t,Bt,At){if(z===si){_===!0&&(tt(i.BLEND),_=!1);return}if(_===!1&&(k(i.BLEND),_=!0),z!==Wu){if(z!==p||At!==b){if((m!==Si||v!==Si)&&(i.blendEquation(i.FUNC_ADD),m=Si,v=Si),At)switch(z){case ss:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mc:i.blendFunc(i.ONE,i.ONE);break;case bc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Sc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case ss:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case bc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Sc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}y=null,M=null,P=null,T=null,A.set(0,0,0),C=0,p=z,b=At}return}N=N||vt,Y=Y||j,xt=xt||L,(vt!==m||N!==v)&&(i.blendEquationSeparate(Ut[vt],Ut[N]),m=vt,v=N),(j!==y||L!==M||Y!==P||xt!==T)&&(i.blendFuncSeparate(St[j],St[L],St[Y],St[xt]),y=j,M=L,P=Y,T=xt),(_t.equals(A)===!1||Bt!==C)&&(i.blendColor(_t.r,_t.g,_t.b,Bt),A.copy(_t),C=Bt),p=z,b=!1}function jt(z,vt){z.side===Ie?tt(i.CULL_FACE):k(i.CULL_FACE);let j=z.side===Ge;vt&&(j=!j),Ft(j),z.blending===ss&&z.transparent===!1?U(si):U(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),r.setMask(z.colorWrite);let L=z.stencilWrite;o.setTest(L),L&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),le(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?k(i.SAMPLE_ALPHA_TO_COVERAGE):tt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(z){x!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),x=z)}function $t(z){z!==Hu?(k(i.CULL_FACE),z!==S&&(z===vc?i.cullFace(i.BACK):z===Gu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):tt(i.CULL_FACE),S=z}function Ot(z){z!==I&&(H&&i.lineWidth(z),I=z)}function le(z,vt,j){z?(k(i.POLYGON_OFFSET_FILL),(D!==vt||B!==j)&&(i.polygonOffset(vt,j),D=vt,B=j)):tt(i.POLYGON_OFFSET_FILL)}function Gt(z){z?k(i.SCISSOR_TEST):tt(i.SCISSOR_TEST)}function R(z){z===void 0&&(z=i.TEXTURE0+W-1),Q!==z&&(i.activeTexture(z),Q=z)}function w(z,vt,j){j===void 0&&(Q===null?j=i.TEXTURE0+W-1:j=Q);let L=pt[j];L===void 0&&(L={type:void 0,texture:void 0},pt[j]=L),(L.type!==z||L.texture!==vt)&&(Q!==j&&(i.activeTexture(j),Q=j),i.bindTexture(z,vt||ft[z]),L.type=z,L.texture=vt)}function q(){let z=pt[Q];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function at(){try{i.compressedTexImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function dt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ot(){try{i.texSubImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Dt(){try{i.texSubImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function bt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function wt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ee(){try{i.texStorage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function gt(){try{i.texStorage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Pt(){try{i.texImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Nt(){try{i.texImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Yt(z){yt.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),yt.copy(z))}function Rt(z){X.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),X.copy(z))}function se(z,vt){let j=c.get(vt);j===void 0&&(j=new WeakMap,c.set(vt,j));let L=j.get(z);L===void 0&&(L=i.getUniformBlockIndex(vt,z.name),j.set(z,L))}function Qt(z,vt){let L=c.get(vt).get(z);l.get(vt)!==L&&(i.uniformBlockBinding(vt,L,z.__bindingPointIndex),l.set(vt,L))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Q=null,pt={},f={},d=new WeakMap,u=[],g=null,_=!1,p=null,m=null,y=null,M=null,v=null,P=null,T=null,A=new zt(0,0,0),C=0,b=!1,x=null,S=null,I=null,D=null,B=null,yt.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:k,disable:tt,bindFramebuffer:rt,drawBuffers:mt,useProgram:Et,setBlending:U,setMaterial:jt,setFlipSided:Ft,setCullFace:$t,setLineWidth:Ot,setPolygonOffset:le,setScissorTest:Gt,activeTexture:R,bindTexture:w,unbindTexture:q,compressedTexImage2D:at,compressedTexImage3D:dt,texImage2D:Pt,texImage3D:Nt,updateUBOMapping:se,uniformBlockBinding:Qt,texStorage2D:ee,texStorage3D:gt,texSubImage2D:ot,texSubImage3D:Dt,compressedTexSubImage2D:bt,compressedTexSubImage3D:wt,scissor:Yt,viewport:Rt,reset:ce}}function vh(i,t,e,n){let s=L0(n);switch(e){case Nh:return i*t;case Oh:return i*t;case Bh:return i*t*2;case Zl:return i*t/s.components*s.byteLength;case Jl:return i*t/s.components*s.byteLength;case zh:return i*t*2/s.components*s.byteLength;case Kl:return i*t*2/s.components*s.byteLength;case Fh:return i*t*3/s.components*s.byteLength;case vn:return i*t*4/s.components*s.byteLength;case jl:return i*t*4/s.components*s.byteLength;case Jr:case Kr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case jr:case Qr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fo:case Bo:return Math.max(i,16)*Math.max(t,8)/4;case No:case Oo:return Math.max(i,8)*Math.max(t,8)/2;case zo:case ko:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Vo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Go:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Wo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Xo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case qo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case $o:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Jo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ko:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case jo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Qo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case tl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case el:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ta:case nl:case il:return Math.ceil(i/4)*Math.ceil(t/4)*16;case kh:case sl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case rl:case al:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function L0(i){switch(i){case Hn:case Lh:return{byteLength:1,components:1};case Ks:case Dh:case or:return{byteLength:2,components:1};case $l:case Yl:return{byteLength:2,components:4};case Ci:case ql:case An:return{byteLength:4,components:1};case Uh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function D0(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,h=new WeakMap,f,d=new WeakMap,u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,w){return u?new OffscreenCanvas(R,w):ia("canvas")}function _(R,w,q){let at=1,dt=Gt(R);if((dt.width>q||dt.height>q)&&(at=q/Math.max(dt.width,dt.height)),at<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let ot=Math.floor(at*dt.width),Dt=Math.floor(at*dt.height);f===void 0&&(f=g(ot,Dt));let bt=w?g(ot,Dt):f;return bt.width=ot,bt.height=Dt,bt.getContext("2d").drawImage(R,0,0,ot,Dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+dt.width+"x"+dt.height+") to ("+ot+"x"+Dt+")."),bt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+dt.width+"x"+dt.height+")."),R;return R}function p(R){return R.generateMipmaps}function m(R){i.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,w,q,at,dt=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ot=w;if(w===i.RED&&(q===i.FLOAT&&(ot=i.R32F),q===i.HALF_FLOAT&&(ot=i.R16F),q===i.UNSIGNED_BYTE&&(ot=i.R8)),w===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(ot=i.R8UI),q===i.UNSIGNED_SHORT&&(ot=i.R16UI),q===i.UNSIGNED_INT&&(ot=i.R32UI),q===i.BYTE&&(ot=i.R8I),q===i.SHORT&&(ot=i.R16I),q===i.INT&&(ot=i.R32I)),w===i.RG&&(q===i.FLOAT&&(ot=i.RG32F),q===i.HALF_FLOAT&&(ot=i.RG16F),q===i.UNSIGNED_BYTE&&(ot=i.RG8)),w===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(ot=i.RG8UI),q===i.UNSIGNED_SHORT&&(ot=i.RG16UI),q===i.UNSIGNED_INT&&(ot=i.RG32UI),q===i.BYTE&&(ot=i.RG8I),q===i.SHORT&&(ot=i.RG16I),q===i.INT&&(ot=i.RG32I)),w===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(ot=i.RGB8UI),q===i.UNSIGNED_SHORT&&(ot=i.RGB16UI),q===i.UNSIGNED_INT&&(ot=i.RGB32UI),q===i.BYTE&&(ot=i.RGB8I),q===i.SHORT&&(ot=i.RGB16I),q===i.INT&&(ot=i.RGB32I)),w===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(ot=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(ot=i.RGBA16UI),q===i.UNSIGNED_INT&&(ot=i.RGBA32UI),q===i.BYTE&&(ot=i.RGBA8I),q===i.SHORT&&(ot=i.RGBA16I),q===i.INT&&(ot=i.RGBA32I)),w===i.RGB&&q===i.UNSIGNED_INT_5_9_9_9_REV&&(ot=i.RGB9_E5),w===i.RGBA){let Dt=dt?Ea:he.getTransfer(at);q===i.FLOAT&&(ot=i.RGBA32F),q===i.HALF_FLOAT&&(ot=i.RGBA16F),q===i.UNSIGNED_BYTE&&(ot=Dt===ve?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT_4_4_4_4&&(ot=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(ot=i.RGB5_A1)}return(ot===i.R16F||ot===i.R32F||ot===i.RG16F||ot===i.RG32F||ot===i.RGBA16F||ot===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function v(R,w){let q;return R?w===null||w===Ci||w===us?q=i.DEPTH24_STENCIL8:w===An?q=i.DEPTH32F_STENCIL8:w===Ks&&(q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Ci||w===us?q=i.DEPTH_COMPONENT24:w===An?q=i.DEPTH_COMPONENT32F:w===Ks&&(q=i.DEPTH_COMPONENT16),q}function P(R,w){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==ln&&R.minFilter!==En?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function T(R){let w=R.target;w.removeEventListener("dispose",T),C(w),w.isVideoTexture&&h.delete(w)}function A(R){let w=R.target;w.removeEventListener("dispose",A),x(w)}function C(R){let w=n.get(R);if(w.__webglInit===void 0)return;let q=R.source,at=d.get(q);if(at){let dt=at[w.__cacheKey];dt.usedTimes--,dt.usedTimes===0&&b(R),Object.keys(at).length===0&&d.delete(q)}n.remove(R)}function b(R){let w=n.get(R);i.deleteTexture(w.__webglTexture);let q=R.source,at=d.get(q);delete at[w.__cacheKey],a.memory.textures--}function x(R){let w=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let at=0;at<6;at++){if(Array.isArray(w.__webglFramebuffer[at]))for(let dt=0;dt<w.__webglFramebuffer[at].length;dt++)i.deleteFramebuffer(w.__webglFramebuffer[at][dt]);else i.deleteFramebuffer(w.__webglFramebuffer[at]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[at])}else{if(Array.isArray(w.__webglFramebuffer))for(let at=0;at<w.__webglFramebuffer.length;at++)i.deleteFramebuffer(w.__webglFramebuffer[at]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let at=0;at<w.__webglColorRenderbuffer.length;at++)w.__webglColorRenderbuffer[at]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[at]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let q=R.textures;for(let at=0,dt=q.length;at<dt;at++){let ot=n.get(q[at]);ot.__webglTexture&&(i.deleteTexture(ot.__webglTexture),a.memory.textures--),n.remove(q[at])}n.remove(R)}let S=0;function I(){S=0}function D(){let R=S;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),S+=1,R}function B(R){let w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.colorSpace),w.join()}function W(R,w){let q=n.get(R);if(R.isVideoTexture&&Ot(R),R.isRenderTargetTexture===!1&&R.version>0&&q.__version!==R.version){let at=R.image;if(at===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(at.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(q,R,w);return}}e.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+w)}function H(R,w){let q=n.get(R);if(R.version>0&&q.__version!==R.version){X(q,R,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+w)}function st(R,w){let q=n.get(R);if(R.version>0&&q.__version!==R.version){X(q,R,w);return}e.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+w)}function O(R,w){let q=n.get(R);if(R.version>0&&q.__version!==R.version){nt(q,R,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+w)}let Q={[Do]:i.REPEAT,[Ei]:i.CLAMP_TO_EDGE,[Uo]:i.MIRRORED_REPEAT},pt={[ln]:i.NEAREST,[gd]:i.NEAREST_MIPMAP_NEAREST,[wr]:i.NEAREST_MIPMAP_LINEAR,[En]:i.LINEAR,[Ga]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},it={[vd]:i.NEVER,[Ed]:i.ALWAYS,[Md]:i.LESS,[Hh]:i.LEQUAL,[bd]:i.EQUAL,[Td]:i.GEQUAL,[Sd]:i.GREATER,[wd]:i.NOTEQUAL};function ht(R,w){if(w.type===An&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===En||w.magFilter===Ga||w.magFilter===wr||w.magFilter===Ai||w.minFilter===En||w.minFilter===Ga||w.minFilter===wr||w.minFilter===Ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Q[w.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Q[w.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Q[w.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,pt[w.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,pt[w.minFilter]),w.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,it[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===ln||w.minFilter!==wr&&w.minFilter!==Ai||w.type===An&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let q=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function yt(R,w){let q=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",T));let at=w.source,dt=d.get(at);dt===void 0&&(dt={},d.set(at,dt));let ot=B(w);if(ot!==R.__cacheKey){dt[ot]===void 0&&(dt[ot]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),dt[ot].usedTimes++;let Dt=dt[R.__cacheKey];Dt!==void 0&&(dt[R.__cacheKey].usedTimes--,Dt.usedTimes===0&&b(w)),R.__cacheKey=ot,R.__webglTexture=dt[ot].texture}return q}function X(R,w,q){let at=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(at=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(at=i.TEXTURE_3D);let dt=yt(R,w),ot=w.source;e.bindTexture(at,R.__webglTexture,i.TEXTURE0+q);let Dt=n.get(ot);if(ot.version!==Dt.__version||dt===!0){e.activeTexture(i.TEXTURE0+q);let bt=he.getPrimaries(he.workingColorSpace),wt=w.colorSpace===ii?null:he.getPrimaries(w.colorSpace),ee=w.colorSpace===ii||bt===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let gt=_(w.image,!1,s.maxTextureSize);gt=le(w,gt);let Pt=r.convert(w.format,w.colorSpace),Nt=r.convert(w.type),Yt=M(w.internalFormat,Pt,Nt,w.colorSpace,w.isVideoTexture);ht(at,w);let Rt,se=w.mipmaps,Qt=w.isVideoTexture!==!0,ce=Dt.__version===void 0||dt===!0,z=ot.dataReady,vt=P(w,gt);if(w.isDepthTexture)Yt=v(w.format===ds,w.type),ce&&(Qt?e.texStorage2D(i.TEXTURE_2D,1,Yt,gt.width,gt.height):e.texImage2D(i.TEXTURE_2D,0,Yt,gt.width,gt.height,0,Pt,Nt,null));else if(w.isDataTexture)if(se.length>0){Qt&&ce&&e.texStorage2D(i.TEXTURE_2D,vt,Yt,se[0].width,se[0].height);for(let j=0,L=se.length;j<L;j++)Rt=se[j],Qt?z&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,Rt.width,Rt.height,Pt,Nt,Rt.data):e.texImage2D(i.TEXTURE_2D,j,Yt,Rt.width,Rt.height,0,Pt,Nt,Rt.data);w.generateMipmaps=!1}else Qt?(ce&&e.texStorage2D(i.TEXTURE_2D,vt,Yt,gt.width,gt.height),z&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt.width,gt.height,Pt,Nt,gt.data)):e.texImage2D(i.TEXTURE_2D,0,Yt,gt.width,gt.height,0,Pt,Nt,gt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Qt&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Yt,se[0].width,se[0].height,gt.depth);for(let j=0,L=se.length;j<L;j++)if(Rt=se[j],w.format!==vn)if(Pt!==null)if(Qt){if(z)if(w.layerUpdates.size>0){let N=vh(Rt.width,Rt.height,w.format,w.type);for(let Y of w.layerUpdates){let xt=Rt.data.subarray(Y*N/Rt.data.BYTES_PER_ELEMENT,(Y+1)*N/Rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,Y,Rt.width,Rt.height,1,Pt,xt)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,Rt.width,Rt.height,gt.depth,Pt,Rt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,Yt,Rt.width,Rt.height,gt.depth,0,Rt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qt?z&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,Rt.width,Rt.height,gt.depth,Pt,Nt,Rt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,j,Yt,Rt.width,Rt.height,gt.depth,0,Pt,Nt,Rt.data)}else{Qt&&ce&&e.texStorage2D(i.TEXTURE_2D,vt,Yt,se[0].width,se[0].height);for(let j=0,L=se.length;j<L;j++)Rt=se[j],w.format!==vn?Pt!==null?Qt?z&&e.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,Rt.width,Rt.height,Pt,Rt.data):e.compressedTexImage2D(i.TEXTURE_2D,j,Yt,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?z&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,Rt.width,Rt.height,Pt,Nt,Rt.data):e.texImage2D(i.TEXTURE_2D,j,Yt,Rt.width,Rt.height,0,Pt,Nt,Rt.data)}else if(w.isDataArrayTexture)if(Qt){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Yt,gt.width,gt.height,gt.depth),z)if(w.layerUpdates.size>0){let j=vh(gt.width,gt.height,w.format,w.type);for(let L of w.layerUpdates){let N=gt.data.subarray(L*j/gt.data.BYTES_PER_ELEMENT,(L+1)*j/gt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,L,gt.width,gt.height,1,Pt,Nt,N)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,Pt,Nt,gt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Yt,gt.width,gt.height,gt.depth,0,Pt,Nt,gt.data);else if(w.isData3DTexture)Qt?(ce&&e.texStorage3D(i.TEXTURE_3D,vt,Yt,gt.width,gt.height,gt.depth),z&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,Pt,Nt,gt.data)):e.texImage3D(i.TEXTURE_3D,0,Yt,gt.width,gt.height,gt.depth,0,Pt,Nt,gt.data);else if(w.isFramebufferTexture){if(ce)if(Qt)e.texStorage2D(i.TEXTURE_2D,vt,Yt,gt.width,gt.height);else{let j=gt.width,L=gt.height;for(let N=0;N<vt;N++)e.texImage2D(i.TEXTURE_2D,N,Yt,j,L,0,Pt,Nt,null),j>>=1,L>>=1}}else if(se.length>0){if(Qt&&ce){let j=Gt(se[0]);e.texStorage2D(i.TEXTURE_2D,vt,Yt,j.width,j.height)}for(let j=0,L=se.length;j<L;j++)Rt=se[j],Qt?z&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,Pt,Nt,Rt):e.texImage2D(i.TEXTURE_2D,j,Yt,Pt,Nt,Rt);w.generateMipmaps=!1}else if(Qt){if(ce){let j=Gt(gt);e.texStorage2D(i.TEXTURE_2D,vt,Yt,j.width,j.height)}z&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Pt,Nt,gt)}else e.texImage2D(i.TEXTURE_2D,0,Yt,Pt,Nt,gt);p(w)&&m(at),Dt.__version=ot.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function nt(R,w,q){if(w.image.length!==6)return;let at=yt(R,w),dt=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+q);let ot=n.get(dt);if(dt.version!==ot.__version||at===!0){e.activeTexture(i.TEXTURE0+q);let Dt=he.getPrimaries(he.workingColorSpace),bt=w.colorSpace===ii?null:he.getPrimaries(w.colorSpace),wt=w.colorSpace===ii||Dt===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);let ee=w.isCompressedTexture||w.image[0].isCompressedTexture,gt=w.image[0]&&w.image[0].isDataTexture,Pt=[];for(let L=0;L<6;L++)!ee&&!gt?Pt[L]=_(w.image[L],!0,s.maxCubemapSize):Pt[L]=gt?w.image[L].image:w.image[L],Pt[L]=le(w,Pt[L]);let Nt=Pt[0],Yt=r.convert(w.format,w.colorSpace),Rt=r.convert(w.type),se=M(w.internalFormat,Yt,Rt,w.colorSpace),Qt=w.isVideoTexture!==!0,ce=ot.__version===void 0||at===!0,z=dt.dataReady,vt=P(w,Nt);ht(i.TEXTURE_CUBE_MAP,w);let j;if(ee){Qt&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,se,Nt.width,Nt.height);for(let L=0;L<6;L++){j=Pt[L].mipmaps;for(let N=0;N<j.length;N++){let Y=j[N];w.format!==vn?Yt!==null?Qt?z&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N,0,0,Y.width,Y.height,Yt,Y.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N,se,Y.width,Y.height,0,Y.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qt?z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N,0,0,Y.width,Y.height,Yt,Rt,Y.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N,se,Y.width,Y.height,0,Yt,Rt,Y.data)}}}else{if(j=w.mipmaps,Qt&&ce){j.length>0&&vt++;let L=Gt(Pt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,se,L.width,L.height)}for(let L=0;L<6;L++)if(gt){Qt?z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,0,0,Pt[L].width,Pt[L].height,Yt,Rt,Pt[L].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,se,Pt[L].width,Pt[L].height,0,Yt,Rt,Pt[L].data);for(let N=0;N<j.length;N++){let xt=j[N].image[L].image;Qt?z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N+1,0,0,xt.width,xt.height,Yt,Rt,xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N+1,se,xt.width,xt.height,0,Yt,Rt,xt.data)}}else{Qt?z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,0,0,Yt,Rt,Pt[L]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,se,Yt,Rt,Pt[L]);for(let N=0;N<j.length;N++){let Y=j[N];Qt?z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N+1,0,0,Yt,Rt,Y.image[L]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N+1,se,Yt,Rt,Y.image[L])}}}p(w)&&m(i.TEXTURE_CUBE_MAP),ot.__version=dt.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function ft(R,w,q,at,dt,ot){let Dt=r.convert(q.format,q.colorSpace),bt=r.convert(q.type),wt=M(q.internalFormat,Dt,bt,q.colorSpace),ee=n.get(w),gt=n.get(q);if(gt.__renderTarget=w,!ee.__hasExternalTextures){let Pt=Math.max(1,w.width>>ot),Nt=Math.max(1,w.height>>ot);dt===i.TEXTURE_3D||dt===i.TEXTURE_2D_ARRAY?e.texImage3D(dt,ot,wt,Pt,Nt,w.depth,0,Dt,bt,null):e.texImage2D(dt,ot,wt,Pt,Nt,0,Dt,bt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),$t(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,at,dt,gt.__webglTexture,0,Ft(w)):(dt===i.TEXTURE_2D||dt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&dt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,at,dt,gt.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function k(R,w,q){if(i.bindRenderbuffer(i.RENDERBUFFER,R),w.depthBuffer){let at=w.depthTexture,dt=at&&at.isDepthTexture?at.type:null,ot=v(w.stencilBuffer,dt),Dt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,bt=Ft(w);$t(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,bt,ot,w.width,w.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,ot,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ot,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Dt,i.RENDERBUFFER,R)}else{let at=w.textures;for(let dt=0;dt<at.length;dt++){let ot=at[dt],Dt=r.convert(ot.format,ot.colorSpace),bt=r.convert(ot.type),wt=M(ot.internalFormat,Dt,bt,ot.colorSpace),ee=Ft(w);q&&$t(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,wt,w.width,w.height):$t(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,wt,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,wt,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function tt(R,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let at=n.get(w.depthTexture);at.__renderTarget=w,(!at.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),W(w.depthTexture,0);let dt=at.__webglTexture,ot=Ft(w);if(w.depthTexture.format===rs)$t(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,dt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,dt,0);else if(w.depthTexture.format===ds)$t(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,dt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,dt,0);else throw new Error("Unknown depthTexture format")}function rt(R){let w=n.get(R),q=R.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==R.depthTexture){let at=R.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),at){let dt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,at.removeEventListener("dispose",dt)};at.addEventListener("dispose",dt),w.__depthDisposeCallback=dt}w.__boundDepthTexture=at}if(R.depthTexture&&!w.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");tt(w.__webglFramebuffer,R)}else if(q){w.__webglDepthbuffer=[];for(let at=0;at<6;at++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[at]),w.__webglDepthbuffer[at]===void 0)w.__webglDepthbuffer[at]=i.createRenderbuffer(),k(w.__webglDepthbuffer[at],R,!1);else{let dt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=w.__webglDepthbuffer[at];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,dt,i.RENDERBUFFER,ot)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),k(w.__webglDepthbuffer,R,!1);else{let at=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,dt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function mt(R,w,q){let at=n.get(R);w!==void 0&&ft(at.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&rt(R)}function Et(R){let w=R.texture,q=n.get(R),at=n.get(w);R.addEventListener("dispose",A);let dt=R.textures,ot=R.isWebGLCubeRenderTarget===!0,Dt=dt.length>1;if(Dt||(at.__webglTexture===void 0&&(at.__webglTexture=i.createTexture()),at.__version=w.version,a.memory.textures++),ot){q.__webglFramebuffer=[];for(let bt=0;bt<6;bt++)if(w.mipmaps&&w.mipmaps.length>0){q.__webglFramebuffer[bt]=[];for(let wt=0;wt<w.mipmaps.length;wt++)q.__webglFramebuffer[bt][wt]=i.createFramebuffer()}else q.__webglFramebuffer[bt]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){q.__webglFramebuffer=[];for(let bt=0;bt<w.mipmaps.length;bt++)q.__webglFramebuffer[bt]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Dt)for(let bt=0,wt=dt.length;bt<wt;bt++){let ee=n.get(dt[bt]);ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&$t(R)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let bt=0;bt<dt.length;bt++){let wt=dt[bt];q.__webglColorRenderbuffer[bt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[bt]);let ee=r.convert(wt.format,wt.colorSpace),gt=r.convert(wt.type),Pt=M(wt.internalFormat,ee,gt,wt.colorSpace,R.isXRRenderTarget===!0),Nt=Ft(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,Pt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,q.__webglColorRenderbuffer[bt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),k(q.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,at.__webglTexture),ht(i.TEXTURE_CUBE_MAP,w);for(let bt=0;bt<6;bt++)if(w.mipmaps&&w.mipmaps.length>0)for(let wt=0;wt<w.mipmaps.length;wt++)ft(q.__webglFramebuffer[bt][wt],R,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,wt);else ft(q.__webglFramebuffer[bt],R,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0);p(w)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Dt){for(let bt=0,wt=dt.length;bt<wt;bt++){let ee=dt[bt],gt=n.get(ee);e.bindTexture(i.TEXTURE_2D,gt.__webglTexture),ht(i.TEXTURE_2D,ee),ft(q.__webglFramebuffer,R,ee,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,0),p(ee)&&m(i.TEXTURE_2D)}e.unbindTexture()}else{let bt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(bt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(bt,at.__webglTexture),ht(bt,w),w.mipmaps&&w.mipmaps.length>0)for(let wt=0;wt<w.mipmaps.length;wt++)ft(q.__webglFramebuffer[wt],R,w,i.COLOR_ATTACHMENT0,bt,wt);else ft(q.__webglFramebuffer,R,w,i.COLOR_ATTACHMENT0,bt,0);p(w)&&m(bt),e.unbindTexture()}R.depthBuffer&&rt(R)}function Ut(R){let w=R.textures;for(let q=0,at=w.length;q<at;q++){let dt=w[q];if(p(dt)){let ot=y(R),Dt=n.get(dt).__webglTexture;e.bindTexture(ot,Dt),m(ot),e.unbindTexture()}}}let St=[],U=[];function jt(R){if(R.samples>0){if($t(R)===!1){let w=R.textures,q=R.width,at=R.height,dt=i.COLOR_BUFFER_BIT,ot=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Dt=n.get(R),bt=w.length>1;if(bt)for(let wt=0;wt<w.length;wt++)e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let wt=0;wt<w.length;wt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(dt|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(dt|=i.STENCIL_BUFFER_BIT)),bt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Dt.__webglColorRenderbuffer[wt]);let ee=n.get(w[wt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ee,0)}i.blitFramebuffer(0,0,q,at,0,0,q,at,dt,i.NEAREST),l===!0&&(St.length=0,U.length=0,St.push(i.COLOR_ATTACHMENT0+wt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(St.push(ot),U.push(ot),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,St))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),bt)for(let wt=0;wt<w.length;wt++){e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,Dt.__webglColorRenderbuffer[wt]);let ee=n.get(w[wt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,ee,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let w=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function Ft(R){return Math.min(s.maxSamples,R.samples)}function $t(R){let w=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ot(R){let w=a.render.frame;h.get(R)!==w&&(h.set(R,w),R.update())}function le(R,w){let q=R.colorSpace,at=R.format,dt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||q!==ws&&q!==ii&&(he.getTransfer(q)===ve?(at!==vn||dt!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),w}function Gt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=I,this.setTexture2D=W,this.setTexture2DArray=H,this.setTexture3D=st,this.setTextureCube=O,this.rebindTextures=mt,this.setupRenderTarget=Et,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=$t}function U0(i,t){function e(n,s=ii){let r,a=he.getTransfer(s);if(n===Hn)return i.UNSIGNED_BYTE;if(n===$l)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Lh)return i.BYTE;if(n===Dh)return i.SHORT;if(n===Ks)return i.UNSIGNED_SHORT;if(n===ql)return i.INT;if(n===Ci)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===or)return i.HALF_FLOAT;if(n===Nh)return i.ALPHA;if(n===Fh)return i.RGB;if(n===vn)return i.RGBA;if(n===Oh)return i.LUMINANCE;if(n===Bh)return i.LUMINANCE_ALPHA;if(n===rs)return i.DEPTH_COMPONENT;if(n===ds)return i.DEPTH_STENCIL;if(n===Zl)return i.RED;if(n===Jl)return i.RED_INTEGER;if(n===zh)return i.RG;if(n===Kl)return i.RG_INTEGER;if(n===jl)return i.RGBA_INTEGER;if(n===Jr||n===Kr||n===jr||n===Qr)if(a===ve)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Jr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Jr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===No||n===Fo||n===Oo||n===Bo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===No)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Oo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Bo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===zo||n===ko||n===Vo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===zo||n===ko)return a===ve?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Vo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ho||n===Go||n===Wo||n===Xo||n===qo||n===$o||n===Yo||n===Zo||n===Jo||n===Ko||n===jo||n===Qo||n===tl||n===el)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ho)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Go)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$o)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Yo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Zo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Jo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ko)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===jo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===tl)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===el)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ta||n===nl||n===il)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ta)return a===ve?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===nl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===il)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kh||n===sl||n===rl||n===al)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ta)return r.COMPRESSED_RED_RGTC1_EXT;if(n===sl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===rl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===us?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var bl=class extends Xe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Re=class extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}},N0={type:"move"},Ys=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=h.position.distanceTo(f.position),u=.02,g=.005;c.inputState.pinching&&d>u+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=u-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(N0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},F0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O0=`
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

}`,Sl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new cn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new tn({vertexShader:F0,fragmentShader:O0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new fe(new ps(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wl=class extends oi{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,d=null,u=null,g=null,_=new Sl,p=e.getContextAttributes(),m=null,y=null,M=[],v=[],P=new Ct,T=null,A=new Xe;A.viewport=new Ce;let C=new Xe;C.viewport=new Ce;let b=[A,C],x=new bl,S=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let nt=M[X];return nt===void 0&&(nt=new Ys,M[X]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(X){let nt=M[X];return nt===void 0&&(nt=new Ys,M[X]=nt),nt.getGripSpace()},this.getHand=function(X){let nt=M[X];return nt===void 0&&(nt=new Ys,M[X]=nt),nt.getHandSpace()};function D(X){let nt=v.indexOf(X.inputSource);if(nt===-1)return;let ft=M[nt];ft!==void 0&&(ft.update(X.inputSource,X.frame,c||a),ft.dispatchEvent({type:X.type,data:X.inputSource}))}function B(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",W);for(let X=0;X<M.length;X++){let nt=v[X];nt!==null&&(v[X]=null,M[X].disconnect(nt))}S=null,I=null,_.reset(),t.setRenderTarget(m),u=null,d=null,f=null,s=null,y=null,yt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",B),s.addEventListener("inputsourceschange",W),p.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){let nt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),y=new Gn(u.framebufferWidth,u.framebufferHeight,{format:vn,type:Hn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let nt=null,ft=null,k=null;p.depth&&(k=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=p.stencil?ds:rs,ft=p.stencil?us:Ci);let tt={colorFormat:e.RGBA8,depthFormat:k,scaleFactor:r};f=new XRWebGLBinding(s,e),d=f.createProjectionLayer(tt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new Gn(d.textureWidth,d.textureHeight,{format:vn,type:Hn,depthTexture:new fa(d.textureWidth,d.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),yt.setContext(s),yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function W(X){for(let nt=0;nt<X.removed.length;nt++){let ft=X.removed[nt],k=v.indexOf(ft);k>=0&&(v[k]=null,M[k].disconnect(ft))}for(let nt=0;nt<X.added.length;nt++){let ft=X.added[nt],k=v.indexOf(ft);if(k===-1){for(let rt=0;rt<M.length;rt++)if(rt>=v.length){v.push(ft),k=rt;break}else if(v[rt]===null){v[rt]=ft,k=rt;break}if(k===-1)break}let tt=M[k];tt&&tt.connect(ft)}}let H=new F,st=new F;function O(X,nt,ft){H.setFromMatrixPosition(nt.matrixWorld),st.setFromMatrixPosition(ft.matrixWorld);let k=H.distanceTo(st),tt=nt.projectionMatrix.elements,rt=ft.projectionMatrix.elements,mt=tt[14]/(tt[10]-1),Et=tt[14]/(tt[10]+1),Ut=(tt[9]+1)/tt[5],St=(tt[9]-1)/tt[5],U=(tt[8]-1)/tt[0],jt=(rt[8]+1)/rt[0],Ft=mt*U,$t=mt*jt,Ot=k/(-U+jt),le=Ot*-U;if(nt.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(le),X.translateZ(Ot),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),tt[10]===-1)X.projectionMatrix.copy(nt.projectionMatrix),X.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let Gt=mt+Ot,R=Et+Ot,w=Ft-le,q=$t+(k-le),at=Ut*Et/R*Gt,dt=St*Et/R*Gt;X.projectionMatrix.makePerspective(w,q,at,dt,Gt,R),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function Q(X,nt){nt===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(nt.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let nt=X.near,ft=X.far;_.texture!==null&&(_.depthNear>0&&(nt=_.depthNear),_.depthFar>0&&(ft=_.depthFar)),x.near=C.near=A.near=nt,x.far=C.far=A.far=ft,(S!==x.near||I!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),S=x.near,I=x.far),A.layers.mask=X.layers.mask|2,C.layers.mask=X.layers.mask|4,x.layers.mask=A.layers.mask|C.layers.mask;let k=X.parent,tt=x.cameras;Q(x,k);for(let rt=0;rt<tt.length;rt++)Q(tt[rt],k);tt.length===2?O(x,A,C):x.projectionMatrix.copy(A.projectionMatrix),pt(X,x,k)};function pt(X,nt,ft){ft===null?X.matrix.copy(nt.matrixWorld):(X.matrix.copy(ft.matrixWorld),X.matrix.invert(),X.matrix.multiply(nt.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(nt.projectionMatrix),X.projectionMatrixInverse.copy(nt.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=js*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&u===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let it=null;function ht(X,nt){if(h=nt.getViewerPose(c||a),g=nt,h!==null){let ft=h.views;u!==null&&(t.setRenderTargetFramebuffer(y,u.framebuffer),t.setRenderTarget(y));let k=!1;ft.length!==x.cameras.length&&(x.cameras.length=0,k=!0);for(let rt=0;rt<ft.length;rt++){let mt=ft[rt],Et=null;if(u!==null)Et=u.getViewport(mt);else{let St=f.getViewSubImage(d,mt);Et=St.viewport,rt===0&&(t.setRenderTargetTextures(y,St.colorTexture,d.ignoreDepthValues?void 0:St.depthStencilTexture),t.setRenderTarget(y))}let Ut=b[rt];Ut===void 0&&(Ut=new Xe,Ut.layers.enable(rt),Ut.viewport=new Ce,b[rt]=Ut),Ut.matrix.fromArray(mt.transform.matrix),Ut.matrix.decompose(Ut.position,Ut.quaternion,Ut.scale),Ut.projectionMatrix.fromArray(mt.projectionMatrix),Ut.projectionMatrixInverse.copy(Ut.projectionMatrix).invert(),Ut.viewport.set(Et.x,Et.y,Et.width,Et.height),rt===0&&(x.matrix.copy(Ut.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),k===!0&&x.cameras.push(Ut)}let tt=s.enabledFeatures;if(tt&&tt.includes("depth-sensing")){let rt=f.getDepthInformation(ft[0]);rt&&rt.isValid&&rt.texture&&_.init(t,rt,s.renderState)}}for(let ft=0;ft<M.length;ft++){let k=v[ft],tt=M[ft];k!==null&&tt!==void 0&&tt.update(k,nt,c||a)}it&&it(X,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}let yt=new qh;yt.setAnimationLoop(ht),this.setAnimationLoop=function(X){it=X},this.dispose=function(){}}},Mi=new Cn,B0=new ge;function z0(i,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Xh(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,y,M,v){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),f(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&u(p,m,v)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,y,M):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ge&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ge&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let y=t.get(m),M=y.envMap,v=y.envMapRotation;M&&(p.envMap.value=M,Mi.copy(v),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),p.envMapRotation.value.setFromMatrix4(B0.makeRotationFromEuler(Mi)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,M){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=M*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function u(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ge&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){let y=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function k0(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,M){let v=M.program;n.uniformBlockBinding(y,v)}function c(y,M){let v=s[y.id];v===void 0&&(g(y),v=h(y),s[y.id]=v,y.addEventListener("dispose",p));let P=M.program;n.updateUBOMapping(y,P);let T=t.render.frame;r[y.id]!==T&&(d(y),r[y.id]=T)}function h(y){let M=f();y.__bindingPointIndex=M;let v=i.createBuffer(),P=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,P,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,v),v}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let M=s[y.id],v=y.uniforms,P=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let T=0,A=v.length;T<A;T++){let C=Array.isArray(v[T])?v[T]:[v[T]];for(let b=0,x=C.length;b<x;b++){let S=C[b];if(u(S,T,b,P)===!0){let I=S.__offset,D=Array.isArray(S.value)?S.value:[S.value],B=0;for(let W=0;W<D.length;W++){let H=D[W],st=_(H);typeof H=="number"||typeof H=="boolean"?(S.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,I+B,S.__data)):H.isMatrix3?(S.__data[0]=H.elements[0],S.__data[1]=H.elements[1],S.__data[2]=H.elements[2],S.__data[3]=0,S.__data[4]=H.elements[3],S.__data[5]=H.elements[4],S.__data[6]=H.elements[5],S.__data[7]=0,S.__data[8]=H.elements[6],S.__data[9]=H.elements[7],S.__data[10]=H.elements[8],S.__data[11]=0):(H.toArray(S.__data,B),B+=st.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,I,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(y,M,v,P){let T=y.value,A=M+"_"+v;if(P[A]===void 0)return typeof T=="number"||typeof T=="boolean"?P[A]=T:P[A]=T.clone(),!0;{let C=P[A];if(typeof T=="number"||typeof T=="boolean"){if(C!==T)return P[A]=T,!0}else if(C.equals(T)===!1)return C.copy(T),!0}return!1}function g(y){let M=y.uniforms,v=0,P=16;for(let A=0,C=M.length;A<C;A++){let b=Array.isArray(M[A])?M[A]:[M[A]];for(let x=0,S=b.length;x<S;x++){let I=b[x],D=Array.isArray(I.value)?I.value:[I.value];for(let B=0,W=D.length;B<W;B++){let H=D[B],st=_(H),O=v%P,Q=O%st.boundary,pt=O+Q;v+=Q,pt!==0&&P-pt<st.storage&&(v+=P-pt),I.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=st.storage}}}let T=v%P;return T>0&&(v+=P-T),y.__size=v,y.__cache={},this}function _(y){let M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),M}function p(y){let M=y.target;M.removeEventListener("dispose",p);let v=a.indexOf(M.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function m(){for(let y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}var ms=class{constructor(t={}){let{canvas:e=Gd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=a;let g=new Uint32Array(4),_=new Int32Array(4),p=null,m=null,y=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ze,this.toneMapping=ri,this.toneMappingExposure=1;let v=this,P=!1,T=0,A=0,C=null,b=-1,x=null,S=new Ce,I=new Ce,D=null,B=new zt(0),W=0,H=e.width,st=e.height,O=1,Q=null,pt=null,it=new Ce(0,0,H,st),ht=new Ce(0,0,H,st),yt=!1,X=new Qs,nt=!1,ft=!1,k=new ge,tt=new ge,rt=new F,mt=new Ce,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ut=!1;function St(){return C===null?O:1}let U=n;function jt(E,V){return e.getContext(E,V)}try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Xl}`),e.addEventListener("webglcontextlost",L,!1),e.addEventListener("webglcontextrestored",N,!1),e.addEventListener("webglcontextcreationerror",Y,!1),U===null){let V="webgl2";if(U=jt(V,E),U===null)throw jt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ft,$t,Ot,le,Gt,R,w,q,at,dt,ot,Dt,bt,wt,ee,gt,Pt,Nt,Yt,Rt,se,Qt,ce,z;function vt(){Ft=new ng(U),Ft.init(),Qt=new U0(U,Ft),$t=new Jm(U,Ft,t,Qt),Ot=new P0(U,Ft),$t.reverseDepthBuffer&&d&&Ot.buffers.depth.setReversed(!0),le=new rg(U),Gt=new _0,R=new D0(U,Ft,Ot,Gt,$t,Qt,le),w=new jm(v),q=new eg(v),at=new df(U),ce=new Ym(U,at),dt=new ig(U,at,le,ce),ot=new og(U,dt,at,le),Yt=new ag(U,$t,R),gt=new Km(Gt),Dt=new x0(v,w,q,Ft,$t,ce,gt),bt=new z0(v,Gt),wt=new v0,ee=new E0(Ft),Nt=new $m(v,w,q,Ot,ot,u,l),Pt=new R0(v,ot,$t),z=new k0(U,le,$t,Ot),Rt=new Zm(U,Ft,le),se=new sg(U,Ft,le),le.programs=Dt.programs,v.capabilities=$t,v.extensions=Ft,v.properties=Gt,v.renderLists=wt,v.shadowMap=Pt,v.state=Ot,v.info=le}vt();let j=new wl(v,U);this.xr=j,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let E=Ft.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Ft.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(E){E!==void 0&&(O=E,this.setSize(H,st,!1))},this.getSize=function(E){return E.set(H,st)},this.setSize=function(E,V,J=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=E,st=V,e.width=Math.floor(E*O),e.height=Math.floor(V*O),J===!0&&(e.style.width=E+"px",e.style.height=V+"px"),this.setViewport(0,0,E,V)},this.getDrawingBufferSize=function(E){return E.set(H*O,st*O).floor()},this.setDrawingBufferSize=function(E,V,J){H=E,st=V,O=J,e.width=Math.floor(E*J),e.height=Math.floor(V*J),this.setViewport(0,0,E,V)},this.getCurrentViewport=function(E){return E.copy(S)},this.getViewport=function(E){return E.copy(it)},this.setViewport=function(E,V,J,K){E.isVector4?it.set(E.x,E.y,E.z,E.w):it.set(E,V,J,K),Ot.viewport(S.copy(it).multiplyScalar(O).round())},this.getScissor=function(E){return E.copy(ht)},this.setScissor=function(E,V,J,K){E.isVector4?ht.set(E.x,E.y,E.z,E.w):ht.set(E,V,J,K),Ot.scissor(I.copy(ht).multiplyScalar(O).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(E){Ot.setScissorTest(yt=E)},this.setOpaqueSort=function(E){Q=E},this.setTransparentSort=function(E){pt=E},this.getClearColor=function(E){return E.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(E=!0,V=!0,J=!0){let K=0;if(E){let G=!1;if(C!==null){let Mt=C.texture.format;G=Mt===jl||Mt===Kl||Mt===Jl}if(G){let Mt=C.texture.type,Lt=Mt===Hn||Mt===Ci||Mt===Ks||Mt===us||Mt===$l||Mt===Yl,kt=Nt.getClearColor(),Vt=Nt.getClearAlpha(),ne=kt.r,re=kt.g,Ht=kt.b;Lt?(g[0]=ne,g[1]=re,g[2]=Ht,g[3]=Vt,U.clearBufferuiv(U.COLOR,0,g)):(_[0]=ne,_[1]=re,_[2]=Ht,_[3]=Vt,U.clearBufferiv(U.COLOR,0,_))}else K|=U.COLOR_BUFFER_BIT}V&&(K|=U.DEPTH_BUFFER_BIT),J&&(K|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",L,!1),e.removeEventListener("webglcontextrestored",N,!1),e.removeEventListener("webglcontextcreationerror",Y,!1),wt.dispose(),ee.dispose(),Gt.dispose(),w.dispose(),q.dispose(),ot.dispose(),ce.dispose(),z.dispose(),Dt.dispose(),j.dispose(),j.removeEventListener("sessionstart",et),j.removeEventListener("sessionend",$),lt.stop()};function L(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function N(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let E=le.autoReset,V=Pt.enabled,J=Pt.autoUpdate,K=Pt.needsUpdate,G=Pt.type;vt(),le.autoReset=E,Pt.enabled=V,Pt.autoUpdate=J,Pt.needsUpdate=K,Pt.type=G}function Y(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function xt(E){let V=E.target;V.removeEventListener("dispose",xt),_t(V)}function _t(E){Bt(E),Gt.remove(E)}function Bt(E){let V=Gt.get(E).programs;V!==void 0&&(V.forEach(function(J){Dt.releaseProgram(J)}),E.isShaderMaterial&&Dt.releaseShaderCache(E))}this.renderBufferDirect=function(E,V,J,K,G,Mt){V===null&&(V=Et);let Lt=G.isMesh&&G.matrixWorld.determinant()<0,kt=sn(E,V,J,K,G);Ot.setMaterial(K,Lt);let Vt=J.index,ne=1;if(K.wireframe===!0){if(Vt=dt.getWireframeAttribute(J),Vt===void 0)return;ne=2}let re=J.drawRange,Ht=J.attributes.position,de=re.start*ne,Me=(re.start+re.count)*ne;Mt!==null&&(de=Math.max(de,Mt.start*ne),Me=Math.min(Me,(Mt.start+Mt.count)*ne)),Vt!==null?(de=Math.max(de,0),Me=Math.min(Me,Vt.count)):Ht!=null&&(de=Math.max(de,0),Me=Math.min(Me,Ht.count));let be=Me-de;if(be<0||be===1/0)return;ce.setup(G,K,kt,J,Vt);let Qe,pe=Rt;if(Vt!==null&&(Qe=at.get(Vt),pe=se,pe.setIndex(Qe)),G.isMesh)K.wireframe===!0?(Ot.setLineWidth(K.wireframeLinewidth*St()),pe.setMode(U.LINES)):pe.setMode(U.TRIANGLES);else if(G.isLine){let Xt=K.linewidth;Xt===void 0&&(Xt=1),Ot.setLineWidth(Xt*St()),G.isLineSegments?pe.setMode(U.LINES):G.isLineLoop?pe.setMode(U.LINE_LOOP):pe.setMode(U.LINE_STRIP)}else G.isPoints?pe.setMode(U.POINTS):G.isSprite&&pe.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)pe.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Ft.get("WEBGL_multi_draw"))pe.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Xt=G._multiDrawStarts,Pn=G._multiDrawCounts,me=G._multiDrawCount,gn=Vt?at.get(Vt).bytesPerElement:1,zi=Gt.get(K).currentProgram.getUniforms();for(let rn=0;rn<me;rn++)zi.setValue(U,"_gl_DrawID",rn),pe.render(Xt[rn]/gn,Pn[rn])}else if(G.isInstancedMesh)pe.renderInstances(de,be,G.count);else if(J.isInstancedBufferGeometry){let Xt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Pn=Math.min(J.instanceCount,Xt);pe.renderInstances(de,be,Pn)}else pe.render(de,be)};function At(E,V,J){E.transparent===!0&&E.side===Ie&&E.forceSinglePass===!1?(E.side=Ge,E.needsUpdate=!0,te(E,V,J),E.side=ai,E.needsUpdate=!0,te(E,V,J),E.side=Ie):te(E,V,J)}this.compile=function(E,V,J=null){J===null&&(J=E),m=ee.get(J),m.init(V),M.push(m),J.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),E!==J&&E.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights();let K=new Set;return E.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let Mt=G.material;if(Mt)if(Array.isArray(Mt))for(let Lt=0;Lt<Mt.length;Lt++){let kt=Mt[Lt];At(kt,J,G),K.add(kt)}else At(Mt,J,G),K.add(Mt)}),M.pop(),m=null,K},this.compileAsync=function(E,V,J=null){let K=this.compile(E,V,J);return new Promise(G=>{function Mt(){if(K.forEach(function(Lt){Gt.get(Lt).currentProgram.isReady()&&K.delete(Lt)}),K.size===0){G(E);return}setTimeout(Mt,10)}Ft.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let Jt=null;function Z(E){Jt&&Jt(E)}function et(){lt.stop()}function $(){lt.start()}let lt=new qh;lt.setAnimationLoop(Z),typeof self<"u"&&lt.setContext(self),this.setAnimationLoop=function(E){Jt=E,j.setAnimationLoop(E),E===null?lt.stop():lt.start()},j.addEventListener("sessionstart",et),j.addEventListener("sessionend",$),this.render=function(E,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(V),V=j.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,V,C),m=ee.get(E,M.length),m.init(V),M.push(m),tt.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),X.setFromProjectionMatrix(tt),ft=this.localClippingEnabled,nt=gt.init(this.clippingPlanes,ft),p=wt.get(E,y.length),p.init(),y.push(p),j.enabled===!0&&j.isPresenting===!0){let Mt=v.xr.getDepthSensingMesh();Mt!==null&&ct(Mt,V,-1/0,v.sortObjects)}ct(E,V,0,v.sortObjects),p.finish(),v.sortObjects===!0&&p.sort(Q,pt),Ut=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Ut&&Nt.addToRenderList(p,E),this.info.render.frame++,nt===!0&&gt.beginShadows();let J=m.state.shadowsArray;Pt.render(J,E,V),nt===!0&&gt.endShadows(),this.info.autoReset===!0&&this.info.reset();let K=p.opaque,G=p.transmissive;if(m.setupLights(),V.isArrayCamera){let Mt=V.cameras;if(G.length>0)for(let Lt=0,kt=Mt.length;Lt<kt;Lt++){let Vt=Mt[Lt];It(K,G,E,Vt)}Ut&&Nt.render(E);for(let Lt=0,kt=Mt.length;Lt<kt;Lt++){let Vt=Mt[Lt];ut(p,E,Vt,Vt.viewport)}}else G.length>0&&It(K,G,E,V),Ut&&Nt.render(E),ut(p,E,V);C!==null&&(R.updateMultisampleRenderTarget(C),R.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(v,E,V),ce.resetDefaultState(),b=-1,x=null,M.pop(),M.length>0?(m=M[M.length-1],nt===!0&&gt.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,y.pop(),y.length>0?p=y[y.length-1]:p=null};function ct(E,V,J,K){if(E.visible===!1)return;if(E.layers.test(V.layers)){if(E.isGroup)J=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(V);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||X.intersectsSprite(E)){K&&mt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(tt);let Lt=ot.update(E),kt=E.material;kt.visible&&p.push(E,Lt,kt,J,mt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||X.intersectsObject(E))){let Lt=ot.update(E),kt=E.material;if(K&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),mt.copy(E.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),mt.copy(Lt.boundingSphere.center)),mt.applyMatrix4(E.matrixWorld).applyMatrix4(tt)),Array.isArray(kt)){let Vt=Lt.groups;for(let ne=0,re=Vt.length;ne<re;ne++){let Ht=Vt[ne],de=kt[Ht.materialIndex];de&&de.visible&&p.push(E,Lt,de,J,mt.z,Ht)}}else kt.visible&&p.push(E,Lt,kt,J,mt.z,null)}}let Mt=E.children;for(let Lt=0,kt=Mt.length;Lt<kt;Lt++)ct(Mt[Lt],V,J,K)}function ut(E,V,J,K){let G=E.opaque,Mt=E.transmissive,Lt=E.transparent;m.setupLightsView(J),nt===!0&&gt.setGlobalState(v.clippingPlanes,J),K&&Ot.viewport(S.copy(K)),G.length>0&&Kt(G,V,J),Mt.length>0&&Kt(Mt,V,J),Lt.length>0&&Kt(Lt,V,J),Ot.buffers.depth.setTest(!0),Ot.buffers.depth.setMask(!0),Ot.buffers.color.setMask(!0),Ot.setPolygonOffset(!1)}function It(E,V,J,K){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[K.id]===void 0&&(m.state.transmissionRenderTarget[K.id]=new Gn(1,1,{generateMipmaps:!0,type:Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float")?or:Hn,minFilter:Ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));let Mt=m.state.transmissionRenderTarget[K.id],Lt=K.viewport||S;Mt.setSize(Lt.z,Lt.w);let kt=v.getRenderTarget();v.setRenderTarget(Mt),v.getClearColor(B),W=v.getClearAlpha(),W<1&&v.setClearColor(16777215,.5),v.clear(),Ut&&Nt.render(J);let Vt=v.toneMapping;v.toneMapping=ri;let ne=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),m.setupLightsView(K),nt===!0&&gt.setGlobalState(v.clippingPlanes,K),Kt(E,J,K),R.updateMultisampleRenderTarget(Mt),R.updateRenderTargetMipmap(Mt),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let re=!1;for(let Ht=0,de=V.length;Ht<de;Ht++){let Me=V[Ht],be=Me.object,Qe=Me.geometry,pe=Me.material,Xt=Me.group;if(pe.side===Ie&&be.layers.test(K.layers)){let Pn=pe.side;pe.side=Ge,pe.needsUpdate=!0,Wt(be,J,K,Qe,pe,Xt),pe.side=Pn,pe.needsUpdate=!0,re=!0}}re===!0&&(R.updateMultisampleRenderTarget(Mt),R.updateRenderTargetMipmap(Mt))}v.setRenderTarget(kt),v.setClearColor(B,W),ne!==void 0&&(K.viewport=ne),v.toneMapping=Vt}function Kt(E,V,J){let K=V.isScene===!0?V.overrideMaterial:null;for(let G=0,Mt=E.length;G<Mt;G++){let Lt=E[G],kt=Lt.object,Vt=Lt.geometry,ne=K===null?Lt.material:K,re=Lt.group;kt.layers.test(J.layers)&&Wt(kt,V,J,Vt,ne,re)}}function Wt(E,V,J,K,G,Mt){E.onBeforeRender(v,V,J,K,G,Mt),E.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(v,V,J,K,E,Mt),G.transparent===!0&&G.side===Ie&&G.forceSinglePass===!1?(G.side=Ge,G.needsUpdate=!0,v.renderBufferDirect(J,V,K,G,E,Mt),G.side=ai,G.needsUpdate=!0,v.renderBufferDirect(J,V,K,G,E,Mt),G.side=Ie):v.renderBufferDirect(J,V,K,G,E,Mt),E.onAfterRender(v,V,J,K,G,Mt)}function te(E,V,J){V.isScene!==!0&&(V=Et);let K=Gt.get(E),G=m.state.lights,Mt=m.state.shadowsArray,Lt=G.state.version,kt=Dt.getParameters(E,G.state,Mt,V,J),Vt=Dt.getProgramCacheKey(kt),ne=K.programs;K.environment=E.isMeshStandardMaterial?V.environment:null,K.fog=V.fog,K.envMap=(E.isMeshStandardMaterial?q:w).get(E.envMap||K.environment),K.envMapRotation=K.environment!==null&&E.envMap===null?V.environmentRotation:E.envMapRotation,ne===void 0&&(E.addEventListener("dispose",xt),ne=new Map,K.programs=ne);let re=ne.get(Vt);if(re!==void 0){if(K.currentProgram===re&&K.lightsStateVersion===Lt)return ke(E,kt),re}else kt.uniforms=Dt.getUniforms(E),E.onBeforeCompile(kt,v),re=Dt.acquireProgram(kt,Vt),ne.set(Vt,re),K.uniforms=kt.uniforms;let Ht=K.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ht.clippingPlanes=gt.uniform),ke(E,kt),K.needsLights=ye(E),K.lightsStateVersion=Lt,K.needsLights&&(Ht.ambientLightColor.value=G.state.ambient,Ht.lightProbe.value=G.state.probe,Ht.directionalLights.value=G.state.directional,Ht.directionalLightShadows.value=G.state.directionalShadow,Ht.spotLights.value=G.state.spot,Ht.spotLightShadows.value=G.state.spotShadow,Ht.rectAreaLights.value=G.state.rectArea,Ht.ltc_1.value=G.state.rectAreaLTC1,Ht.ltc_2.value=G.state.rectAreaLTC2,Ht.pointLights.value=G.state.point,Ht.pointLightShadows.value=G.state.pointShadow,Ht.hemisphereLights.value=G.state.hemi,Ht.directionalShadowMap.value=G.state.directionalShadowMap,Ht.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ht.spotShadowMap.value=G.state.spotShadowMap,Ht.spotLightMatrix.value=G.state.spotLightMatrix,Ht.spotLightMap.value=G.state.spotLightMap,Ht.pointShadowMap.value=G.state.pointShadowMap,Ht.pointShadowMatrix.value=G.state.pointShadowMatrix),K.currentProgram=re,K.uniformsList=null,re}function De(E){if(E.uniformsList===null){let V=E.currentProgram.getUniforms();E.uniformsList=os.seqWithValue(V.seq,E.uniforms)}return E.uniformsList}function ke(E,V){let J=Gt.get(E);J.outputColorSpace=V.outputColorSpace,J.batching=V.batching,J.batchingColor=V.batchingColor,J.instancing=V.instancing,J.instancingColor=V.instancingColor,J.instancingMorph=V.instancingMorph,J.skinning=V.skinning,J.morphTargets=V.morphTargets,J.morphNormals=V.morphNormals,J.morphColors=V.morphColors,J.morphTargetsCount=V.morphTargetsCount,J.numClippingPlanes=V.numClippingPlanes,J.numIntersection=V.numClipIntersection,J.vertexAlphas=V.vertexAlphas,J.vertexTangents=V.vertexTangents,J.toneMapping=V.toneMapping}function sn(E,V,J,K,G){V.isScene!==!0&&(V=Et),R.resetTextureUnits();let Mt=V.fog,Lt=K.isMeshStandardMaterial?V.environment:null,kt=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:ws,Vt=(K.isMeshStandardMaterial?q:w).get(K.envMap||Lt),ne=K.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,re=!!J.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ht=!!J.morphAttributes.position,de=!!J.morphAttributes.normal,Me=!!J.morphAttributes.color,be=ri;K.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(be=v.toneMapping);let Qe=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,pe=Qe!==void 0?Qe.length:0,Xt=Gt.get(K),Pn=m.state.lights;if(nt===!0&&(ft===!0||E!==x)){let un=E===x&&K.id===b;gt.setState(K,E,un)}let me=!1;K.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==Pn.state.version||Xt.outputColorSpace!==kt||G.isBatchedMesh&&Xt.batching===!1||!G.isBatchedMesh&&Xt.batching===!0||G.isBatchedMesh&&Xt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Xt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Xt.instancing===!1||!G.isInstancedMesh&&Xt.instancing===!0||G.isSkinnedMesh&&Xt.skinning===!1||!G.isSkinnedMesh&&Xt.skinning===!0||G.isInstancedMesh&&Xt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Xt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Xt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Xt.instancingMorph===!1&&G.morphTexture!==null||Xt.envMap!==Vt||K.fog===!0&&Xt.fog!==Mt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==gt.numPlanes||Xt.numIntersection!==gt.numIntersection)||Xt.vertexAlphas!==ne||Xt.vertexTangents!==re||Xt.morphTargets!==Ht||Xt.morphNormals!==de||Xt.morphColors!==Me||Xt.toneMapping!==be||Xt.morphTargetsCount!==pe)&&(me=!0):(me=!0,Xt.__version=K.version);let gn=Xt.currentProgram;me===!0&&(gn=te(K,V,G));let zi=!1,rn=!1,Fs=!1,Se=gn.getUniforms(),wn=Xt.uniforms;if(Ot.useProgram(gn.program)&&(zi=!0,rn=!0,Fs=!0),K.id!==b&&(b=K.id,rn=!0),zi||x!==E){Ot.buffers.depth.getReversed()?(k.copy(E.projectionMatrix),Xd(k),qd(k),Se.setValue(U,"projectionMatrix",k)):Se.setValue(U,"projectionMatrix",E.projectionMatrix),Se.setValue(U,"viewMatrix",E.matrixWorldInverse);let Zn=Se.map.cameraPosition;Zn!==void 0&&Zn.setValue(U,rt.setFromMatrixPosition(E.matrixWorld)),$t.logarithmicDepthBuffer&&Se.setValue(U,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Se.setValue(U,"isOrthographic",E.isOrthographicCamera===!0),x!==E&&(x=E,rn=!0,Fs=!0)}if(G.isSkinnedMesh){Se.setOptional(U,G,"bindMatrix"),Se.setOptional(U,G,"bindMatrixInverse");let un=G.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),Se.setValue(U,"boneTexture",un.boneTexture,R))}G.isBatchedMesh&&(Se.setOptional(U,G,"batchingTexture"),Se.setValue(U,"batchingTexture",G._matricesTexture,R),Se.setOptional(U,G,"batchingIdTexture"),Se.setValue(U,"batchingIdTexture",G._indirectTexture,R),Se.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&Se.setValue(U,"batchingColorTexture",G._colorsTexture,R));let Os=J.morphAttributes;if((Os.position!==void 0||Os.normal!==void 0||Os.color!==void 0)&&Yt.update(G,J,gn),(rn||Xt.receiveShadow!==G.receiveShadow)&&(Xt.receiveShadow=G.receiveShadow,Se.setValue(U,"receiveShadow",G.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(wn.envMap.value=Vt,wn.flipEnvMap.value=Vt.isCubeTexture&&Vt.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&V.environment!==null&&(wn.envMapIntensity.value=V.environmentIntensity),rn&&(Se.setValue(U,"toneMappingExposure",v.toneMappingExposure),Xt.needsLights&&Ee(wn,Fs),Mt&&K.fog===!0&&bt.refreshFogUniforms(wn,Mt),bt.refreshMaterialUniforms(wn,K,O,st,m.state.transmissionRenderTarget[E.id]),os.upload(U,De(Xt),wn,R)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(os.upload(U,De(Xt),wn,R),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Se.setValue(U,"center",G.center),Se.setValue(U,"modelViewMatrix",G.modelViewMatrix),Se.setValue(U,"normalMatrix",G.normalMatrix),Se.setValue(U,"modelMatrix",G.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){let un=K.uniformsGroups;for(let Zn=0,Jn=un.length;Zn<Jn;Zn++){let yc=un[Zn];z.update(yc,gn),z.bind(yc,gn)}}return gn}function Ee(E,V){E.ambientLightColor.needsUpdate=V,E.lightProbe.needsUpdate=V,E.directionalLights.needsUpdate=V,E.directionalLightShadows.needsUpdate=V,E.pointLights.needsUpdate=V,E.pointLightShadows.needsUpdate=V,E.spotLights.needsUpdate=V,E.spotLightShadows.needsUpdate=V,E.rectAreaLights.needsUpdate=V,E.hemisphereLights.needsUpdate=V}function ye(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,V,J){Gt.get(E.texture).__webglTexture=V,Gt.get(E.depthTexture).__webglTexture=J;let K=Gt.get(E);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=J===void 0,K.__autoAllocateDepthBuffer||Ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,V){let J=Gt.get(E);J.__webglFramebuffer=V,J.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(E,V=0,J=0){C=E,T=V,A=J;let K=!0,G=null,Mt=!1,Lt=!1;if(E){let Vt=Gt.get(E);if(Vt.__useDefaultFramebuffer!==void 0)Ot.bindFramebuffer(U.FRAMEBUFFER,null),K=!1;else if(Vt.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(Vt.__hasExternalTextures)R.rebindTextures(E,Gt.get(E.texture).__webglTexture,Gt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Ht=E.depthTexture;if(Vt.__boundDepthTexture!==Ht){if(Ht!==null&&Gt.has(Ht)&&(E.width!==Ht.image.width||E.height!==Ht.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}let ne=E.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Lt=!0);let re=Gt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(re[V])?G=re[V][J]:G=re[V],Mt=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?G=Gt.get(E).__webglMultisampledFramebuffer:Array.isArray(re)?G=re[J]:G=re,S.copy(E.viewport),I.copy(E.scissor),D=E.scissorTest}else S.copy(it).multiplyScalar(O).floor(),I.copy(ht).multiplyScalar(O).floor(),D=yt;if(Ot.bindFramebuffer(U.FRAMEBUFFER,G)&&K&&Ot.drawBuffers(E,G),Ot.viewport(S),Ot.scissor(I),Ot.setScissorTest(D),Mt){let Vt=Gt.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+V,Vt.__webglTexture,J)}else if(Lt){let Vt=Gt.get(E.texture),ne=V||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Vt.__webglTexture,J||0,ne)}b=-1},this.readRenderTargetPixels=function(E,V,J,K,G,Mt,Lt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=Gt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Lt!==void 0&&(kt=kt[Lt]),kt){Ot.bindFramebuffer(U.FRAMEBUFFER,kt);try{let Vt=E.texture,ne=Vt.format,re=Vt.type;if(!$t.textureFormatReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$t.textureTypeReadable(re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=E.width-K&&J>=0&&J<=E.height-G&&U.readPixels(V,J,K,G,Qt.convert(ne),Qt.convert(re),Mt)}finally{let Vt=C!==null?Gt.get(C).__webglFramebuffer:null;Ot.bindFramebuffer(U.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(E,V,J,K,G,Mt,Lt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let kt=Gt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Lt!==void 0&&(kt=kt[Lt]),kt){let Vt=E.texture,ne=Vt.format,re=Vt.type;if(!$t.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$t.textureTypeReadable(re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=E.width-K&&J>=0&&J<=E.height-G){Ot.bindFramebuffer(U.FRAMEBUFFER,kt);let Ht=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ht),U.bufferData(U.PIXEL_PACK_BUFFER,Mt.byteLength,U.STREAM_READ),U.readPixels(V,J,K,G,Qt.convert(ne),Qt.convert(re),0);let de=C!==null?Gt.get(C).__webglFramebuffer:null;Ot.bindFramebuffer(U.FRAMEBUFFER,de);let Me=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Wd(U,Me,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ht),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Mt),U.deleteBuffer(Ht),U.deleteSync(Me),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,V=null,J=0){E.isTexture!==!0&&(Ws("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,E=arguments[1]);let K=Math.pow(2,-J),G=Math.floor(E.image.width*K),Mt=Math.floor(E.image.height*K),Lt=V!==null?V.x:0,kt=V!==null?V.y:0;R.setTexture2D(E,0),U.copyTexSubImage2D(U.TEXTURE_2D,J,0,0,Lt,kt,G,Mt),Ot.unbindTexture()},this.copyTextureToTexture=function(E,V,J=null,K=null,G=0){E.isTexture!==!0&&(Ws("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,E=arguments[1],V=arguments[2],G=arguments[3]||0,J=null);let Mt,Lt,kt,Vt,ne,re,Ht,de,Me,be=E.isCompressedTexture?E.mipmaps[G]:E.image;J!==null?(Mt=J.max.x-J.min.x,Lt=J.max.y-J.min.y,kt=J.isBox3?J.max.z-J.min.z:1,Vt=J.min.x,ne=J.min.y,re=J.isBox3?J.min.z:0):(Mt=be.width,Lt=be.height,kt=be.depth||1,Vt=0,ne=0,re=0),K!==null?(Ht=K.x,de=K.y,Me=K.z):(Ht=0,de=0,Me=0);let Qe=Qt.convert(V.format),pe=Qt.convert(V.type),Xt;V.isData3DTexture?(R.setTexture3D(V,0),Xt=U.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(R.setTexture2DArray(V,0),Xt=U.TEXTURE_2D_ARRAY):(R.setTexture2D(V,0),Xt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,V.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,V.unpackAlignment);let Pn=U.getParameter(U.UNPACK_ROW_LENGTH),me=U.getParameter(U.UNPACK_IMAGE_HEIGHT),gn=U.getParameter(U.UNPACK_SKIP_PIXELS),zi=U.getParameter(U.UNPACK_SKIP_ROWS),rn=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,be.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,be.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Vt),U.pixelStorei(U.UNPACK_SKIP_ROWS,ne),U.pixelStorei(U.UNPACK_SKIP_IMAGES,re);let Fs=E.isDataArrayTexture||E.isData3DTexture,Se=V.isDataArrayTexture||V.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){let wn=Gt.get(E),Os=Gt.get(V),un=Gt.get(wn.__renderTarget),Zn=Gt.get(Os.__renderTarget);Ot.bindFramebuffer(U.READ_FRAMEBUFFER,un.__webglFramebuffer),Ot.bindFramebuffer(U.DRAW_FRAMEBUFFER,Zn.__webglFramebuffer);for(let Jn=0;Jn<kt;Jn++)Fs&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Gt.get(E).__webglTexture,G,re+Jn),E.isDepthTexture?(Se&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Gt.get(V).__webglTexture,G,Me+Jn),U.blitFramebuffer(Vt,ne,Mt,Lt,Ht,de,Mt,Lt,U.DEPTH_BUFFER_BIT,U.NEAREST)):Se?U.copyTexSubImage3D(Xt,G,Ht,de,Me+Jn,Vt,ne,Mt,Lt):U.copyTexSubImage2D(Xt,G,Ht,de,Me+Jn,Vt,ne,Mt,Lt);Ot.bindFramebuffer(U.READ_FRAMEBUFFER,null),Ot.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Se?E.isDataTexture||E.isData3DTexture?U.texSubImage3D(Xt,G,Ht,de,Me,Mt,Lt,kt,Qe,pe,be.data):V.isCompressedArrayTexture?U.compressedTexSubImage3D(Xt,G,Ht,de,Me,Mt,Lt,kt,Qe,be.data):U.texSubImage3D(Xt,G,Ht,de,Me,Mt,Lt,kt,Qe,pe,be):E.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,G,Ht,de,Mt,Lt,Qe,pe,be.data):E.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,G,Ht,de,be.width,be.height,Qe,be.data):U.texSubImage2D(U.TEXTURE_2D,G,Ht,de,Mt,Lt,Qe,pe,be);U.pixelStorei(U.UNPACK_ROW_LENGTH,Pn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,me),U.pixelStorei(U.UNPACK_SKIP_PIXELS,gn),U.pixelStorei(U.UNPACK_SKIP_ROWS,zi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,rn),G===0&&V.generateMipmaps&&U.generateMipmap(Xt),Ot.unbindTexture()},this.copyTextureToTexture3D=function(E,V,J=null,K=null,G=0){return E.isTexture!==!0&&(Ws("WebGLRenderer: copyTextureToTexture3D function signature has changed."),J=arguments[0]||null,K=arguments[1]||null,E=arguments[2],V=arguments[3],G=arguments[4]||0),Ws('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,V,J,K,G)},this.initRenderTarget=function(E){Gt.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),Ot.unbindTexture()},this.resetState=function(){T=0,A=0,C=null,Ot.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=he._getDrawingBufferColorSpace(t),e.unpackColorSpace=he._getUnpackColorSpace()}};var gs=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},xs=class extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Tl=class extends cn{constructor(t=null,e=1,n=1,s,r,a,o,l,c=ln,h=ln,f,d){super(null,a,o,l,c,h,s,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var tr=class extends qe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ts=new ge,Mh=new ge,Xr=[],bh=new Wn,V0=new ge,Hs=new fe,Gs=new Ri,Pi=class extends fe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new tr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,V0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Wn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),bh.copy(t.boundingBox).applyMatrix4(ts),this.boundingBox.union(bh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ri),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),Gs.copy(t.boundingSphere).applyMatrix4(ts),this.boundingSphere.union(Gs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Hs.geometry=this.geometry,Hs.material=this.material,Hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gs.copy(this.boundingSphere),Gs.applyMatrix4(n),t.ray.intersectsSphere(Gs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ts),Mh.multiplyMatrices(n,ts),Hs.matrixWorld=Mh,Hs.raycast(t,Xr);for(let a=0,o=Xr.length;a<o;a++){let l=Xr[a];l.instanceId=r,l.object=this,e.push(l)}Xr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new tr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Tl(new Float32Array(s*this.count),s,this.count,Zl,An));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var fn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],d=n[s+1]-h,u=(a-h)/d;return(s+u)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new Ct:new F);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new F,s=[],r=[],a=[],o=new F,l=new ge;for(let u=0;u<=t;u++){let g=u/t;s[u]=this.getTangentAt(g,new F)}r[0]=new F,a[0]=new F;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(s[u-1],s[u]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(He(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(l.makeRotationAxis(o,g))}a[u].crossVectors(s[u],r[u])}if(e===!0){let u=Math.acos(He(r[0].dot(r[t]),-1,1));u/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(u=-u);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],u*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},er=class extends fn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Ct){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,u=c-this.aY;l=d*h-u*f+this.aX,c=d*f+u*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},El=class extends er{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function ec(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+f)+(l-o)/f;d*=h,u*=h,s(a,o,d,u)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var qr=new F,_o=new ec,yo=new ec,vo=new ec,Li=class extends fn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new F){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(qr.subVectors(s[0],s[1]).add(s[0]),c=qr);let f=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(qr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=qr),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(f),u),_=Math.pow(f.distanceToSquared(d),u),p=Math.pow(d.distanceToSquared(h),u);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),_o.initNonuniformCatmullRom(c.x,f.x,d.x,h.x,g,_,p),yo.initNonuniformCatmullRom(c.y,f.y,d.y,h.y,g,_,p),vo.initNonuniformCatmullRom(c.z,f.z,d.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(_o.initCatmullRom(c.x,f.x,d.x,h.x,this.tension),yo.initCatmullRom(c.y,f.y,d.y,h.y,this.tension),vo.initCatmullRom(c.z,f.z,d.z,h.z,this.tension));return n.set(_o.calc(l),yo.calc(l),vo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new F().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Sh(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function H0(i,t){let e=1-i;return e*e*t}function G0(i,t){return 2*(1-i)*i*t}function W0(i,t){return i*i*t}function Zs(i,t,e,n){return H0(i,t)+G0(i,e)+W0(i,n)}function X0(i,t){let e=1-i;return e*e*e*t}function q0(i,t){let e=1-i;return 3*e*e*i*t}function $0(i,t){return 3*(1-i)*i*i*t}function Y0(i,t){return i*i*i*t}function Js(i,t,e,n,s){return X0(i,t)+q0(i,e)+$0(i,n)+Y0(i,s)}var pa=class extends fn{constructor(t=new Ct,e=new Ct,n=new Ct,s=new Ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ct){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Js(t,s.x,r.x,a.x,o.x),Js(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Al=class extends fn{constructor(t=new F,e=new F,n=new F,s=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new F){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Js(t,s.x,r.x,a.x,o.x),Js(t,s.y,r.y,a.y,o.y),Js(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ma=class extends fn{constructor(t=new Ct,e=new Ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ct){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Cl=class extends fn{constructor(t=new F,e=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new F){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new F){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ga=class extends fn{constructor(t=new Ct,e=new Ct,n=new Ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ct){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Zs(t,s.x,r.x,a.x),Zs(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},xa=class extends fn{constructor(t=new F,e=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new F){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Zs(t,s.x,r.x,a.x),Zs(t,s.y,r.y,a.y),Zs(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},_a=class extends fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ct){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(Sh(o,l.x,c.x,h.x,f.x),Sh(o,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new Ct().fromArray(s))}return this}},Rl=Object.freeze({__proto__:null,ArcCurve:El,CatmullRomCurve3:Li,CubicBezierCurve:pa,CubicBezierCurve3:Al,EllipseCurve:er,LineCurve:ma,LineCurve3:Cl,QuadraticBezierCurve:ga,QuadraticBezierCurve3:xa,SplineCurve:_a}),Il=class extends fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Rl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Rl[s.type]().fromJSON(s))}return this}},ya=class extends Il{constructor(t){super(),this.type="Path",this.currentPoint=new Ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new ma(this.currentPoint.clone(),new Ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new ga(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new pa(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s),new Ct(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new _a(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new er(t,e,n,s,r,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},va=class i extends xe{constructor(t=[new Ct(0,-.5),new Ct(.5,0),new Ct(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=He(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,f=new F,d=new Ct,u=new F,g=new F,_=new F,p=0,m=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:p=t[y+1].x-t[y].x,m=t[y+1].y-t[y].y,u.x=m*1,u.y=-p,u.z=m*0,_.copy(u),u.normalize(),l.push(u.x,u.y,u.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:p=t[y+1].x-t[y].x,m=t[y+1].y-t[y].y,u.x=m*1,u.y=-p,u.z=m*0,g.copy(u),u.x+=_.x,u.y+=_.y,u.z+=_.z,u.normalize(),l.push(u.x,u.y,u.z),_.copy(g)}for(let y=0;y<=e;y++){let M=n+y*h*s,v=Math.sin(M),P=Math.cos(M);for(let T=0;T<=t.length-1;T++){f.x=t[T].x*v,f.y=t[T].y,f.z=t[T].x*P,a.push(f.x,f.y,f.z),d.x=y/e,d.y=T/(t.length-1),o.push(d.x,d.y);let A=l[3*T+0]*v,C=l[3*T+1],b=l[3*T+0]*P;c.push(A,C,b)}}for(let y=0;y<e;y++)for(let M=0;M<t.length-1;M++){let v=M+y*t.length,P=v,T=v+t.length,A=v+t.length+1,C=v+1;r.push(P,T,C),r.push(A,C,T)}this.setIndex(r),this.setAttribute("position",new qt(a,3)),this.setAttribute("uv",new qt(o,2)),this.setAttribute("normal",new qt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var ci=class i extends xe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new F,h=new Ct;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){let u=n+f/e*s;c.x=t*Math.cos(u),c.y=t*Math.sin(u),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(o,3)),this.setAttribute("uv",new qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ue=class i extends xe{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],d=[],u=[],g=0,_=[],p=n/2,m=0;y(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new qt(f,3)),this.setAttribute("normal",new qt(d,3)),this.setAttribute("uv",new qt(u,2));function y(){let v=new F,P=new F,T=0,A=(e-t)/n;for(let C=0;C<=r;C++){let b=[],x=C/r,S=x*(e-t)+t;for(let I=0;I<=s;I++){let D=I/s,B=D*l+o,W=Math.sin(B),H=Math.cos(B);P.x=S*W,P.y=-x*n+p,P.z=S*H,f.push(P.x,P.y,P.z),v.set(W,A,H).normalize(),d.push(v.x,v.y,v.z),u.push(D,1-x),b.push(g++)}_.push(b)}for(let C=0;C<s;C++)for(let b=0;b<r;b++){let x=_[b][C],S=_[b+1][C],I=_[b+1][C+1],D=_[b][C+1];(t>0||b!==0)&&(h.push(x,S,D),T+=3),(e>0||b!==r-1)&&(h.push(S,I,D),T+=3)}c.addGroup(m,T,0),m+=T}function M(v){let P=g,T=new Ct,A=new F,C=0,b=v===!0?t:e,x=v===!0?1:-1;for(let I=1;I<=s;I++)f.push(0,p*x,0),d.push(0,x,0),u.push(.5,.5),g++;let S=g;for(let I=0;I<=s;I++){let B=I/s*l+o,W=Math.cos(B),H=Math.sin(B);A.x=b*H,A.y=p*x,A.z=b*W,f.push(A.x,A.y,A.z),d.push(0,x,0),T.x=W*.5+.5,T.y=H*.5*x+.5,u.push(T.x,T.y),g++}for(let I=0;I<s;I++){let D=P+I,B=S+I;v===!0?h.push(B,B+1,D):h.push(B+1,B,D),C+=3}c.addGroup(m,C,v===!0?1:2),m+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},We=class i extends ue{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ma=class i extends xe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new qt(r,3)),this.setAttribute("normal",new qt(r.slice(),3)),this.setAttribute("uv",new qt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){let M=new F,v=new F,P=new F;for(let T=0;T<e.length;T+=3)u(e[T+0],M),u(e[T+1],v),u(e[T+2],P),l(M,v,P,y)}function l(y,M,v,P){let T=P+1,A=[];for(let C=0;C<=T;C++){A[C]=[];let b=y.clone().lerp(v,C/T),x=M.clone().lerp(v,C/T),S=T-C;for(let I=0;I<=S;I++)I===0&&C===T?A[C][I]=b:A[C][I]=b.clone().lerp(x,I/S)}for(let C=0;C<T;C++)for(let b=0;b<2*(T-C)-1;b++){let x=Math.floor(b/2);b%2===0?(d(A[C][x+1]),d(A[C+1][x]),d(A[C][x])):(d(A[C][x+1]),d(A[C+1][x+1]),d(A[C+1][x]))}}function c(y){let M=new F;for(let v=0;v<r.length;v+=3)M.x=r[v+0],M.y=r[v+1],M.z=r[v+2],M.normalize().multiplyScalar(y),r[v+0]=M.x,r[v+1]=M.y,r[v+2]=M.z}function h(){let y=new F;for(let M=0;M<r.length;M+=3){y.x=r[M+0],y.y=r[M+1],y.z=r[M+2];let v=p(y)/2/Math.PI+.5,P=m(y)/Math.PI+.5;a.push(v,1-P)}g(),f()}function f(){for(let y=0;y<a.length;y+=6){let M=a[y+0],v=a[y+2],P=a[y+4],T=Math.max(M,v,P),A=Math.min(M,v,P);T>.9&&A<.1&&(M<.2&&(a[y+0]+=1),v<.2&&(a[y+2]+=1),P<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function u(y,M){let v=y*3;M.x=t[v+0],M.y=t[v+1],M.z=t[v+2]}function g(){let y=new F,M=new F,v=new F,P=new F,T=new Ct,A=new Ct,C=new Ct;for(let b=0,x=0;b<r.length;b+=9,x+=6){y.set(r[b+0],r[b+1],r[b+2]),M.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),T.set(a[x+0],a[x+1]),A.set(a[x+2],a[x+3]),C.set(a[x+4],a[x+5]),P.copy(y).add(M).add(v).divideScalar(3);let S=p(P);_(T,x+0,y,S),_(A,x+2,M,S),_(C,x+4,v,S)}}function _(y,M,v,P){P<0&&y.x===1&&(a[M]=y.x-1),v.x===0&&v.z===0&&(a[M]=P/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}},_s=class i extends Ma{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var Xn=class extends ya{constructor(t){super(t),this.uuid=Fi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new ya().fromJSON(s))}return this}},Z0={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Kh(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,f,d,u;if(n&&(r=tx(i,t,r,e)),i.length>80*e){o=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)f=i[g],d=i[g+1],f<o&&(o=f),d<l&&(l=d),f>c&&(c=f),d>h&&(h=d);u=Math.max(c-o,h-l),u=u!==0?32767/u:0}return nr(r,a,e,o,l,u,0),a}};function Kh(i,t,e,n,s){let r,a;if(s===ux(i,t,e,n)>0)for(r=t;r<e;r+=n)a=wh(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=wh(r,i[r],i[r+1],a);return a&&Ca(a,a.next)&&(sr(a),a=a.next),a}function Di(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ca(e,e.next)||Ae(e.prev,e,e.next)===0)){if(sr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function nr(i,t,e,n,s,r,a){if(!i)return;!a&&r&&rx(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?K0(i,n,s,r):J0(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),sr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=j0(Di(i),t,e),nr(i,t,e,n,s,r,2)):a===2&&Q0(i,t,e,n,s,r):nr(Di(i),t,e,n,s,r,1);break}}}function J0(i){let t=i.prev,e=i,n=i.next;if(Ae(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=s<r?s<a?s:a:r<a?r:a,f=o<l?o<c?o:c:l<c?l:c,d=s>r?s>a?s:a:r>a?r:a,u=o>l?o>c?o:c:l>c?l:c,g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=f&&g.y<=u&&is(s,o,r,l,a,c,g.x,g.y)&&Ae(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function K0(i,t,e,n){let s=i.prev,r=i,a=i.next;if(Ae(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,f=r.y,d=a.y,u=o<l?o<c?o:c:l<c?l:c,g=h<f?h<d?h:d:f<d?f:d,_=o>l?o>c?o:c:l>c?l:c,p=h>f?h>d?h:d:f>d?f:d,m=Pl(u,g,t,e,n),y=Pl(_,p,t,e,n),M=i.prevZ,v=i.nextZ;for(;M&&M.z>=m&&v&&v.z<=y;){if(M.x>=u&&M.x<=_&&M.y>=g&&M.y<=p&&M!==s&&M!==a&&is(o,h,l,f,c,d,M.x,M.y)&&Ae(M.prev,M,M.next)>=0||(M=M.prevZ,v.x>=u&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==a&&is(o,h,l,f,c,d,v.x,v.y)&&Ae(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;M&&M.z>=m;){if(M.x>=u&&M.x<=_&&M.y>=g&&M.y<=p&&M!==s&&M!==a&&is(o,h,l,f,c,d,M.x,M.y)&&Ae(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;v&&v.z<=y;){if(v.x>=u&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==a&&is(o,h,l,f,c,d,v.x,v.y)&&Ae(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function j0(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!Ca(s,r)&&jh(s,n,n.next,r)&&ir(s,r)&&ir(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),sr(n),sr(n.next),n=i=r),n=n.next}while(n!==i);return Di(n)}function Q0(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&lx(a,o)){let l=Qh(a,o);a=Di(a,a.next),l=Di(l,l.next),nr(a,t,e,n,s,r,0),nr(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function tx(i,t,e,n){let s=[],r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Kh(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(ox(c));for(s.sort(ex),r=0;r<s.length;r++)e=nx(s[r],e);return e}function ex(i,t){return i.x-t.x}function nx(i,t){let e=ix(i,t);if(!e)return t;let n=Qh(e,i);return Di(n,n.next),Di(e,e.next)}function ix(i,t){let e=t,n=-1/0,s,r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){let d=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;let o=s,l=s.x,c=s.y,h=1/0,f;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&is(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(f=Math.abs(a-e.y)/(r-e.x),ir(e,i)&&(f<h||f===h&&(e.x>s.x||e.x===s.x&&sx(s,e)))&&(s=e,h=f)),e=e.next;while(e!==o);return s}function sx(i,t){return Ae(i.prev,i,t.prev)<0&&Ae(t.next,i,i.next)<0}function rx(i,t,e,n){let s=i;do s.z===0&&(s.z=Pl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,ax(s)}function ax(i){let t,e,n,s,r,a,o,l,c=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(a>1);return i}function Pl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function ox(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function is(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function lx(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!cx(i,t)&&(ir(i,t)&&ir(t,i)&&hx(i,t)&&(Ae(i.prev,i,t.prev)||Ae(i,t.prev,t))||Ca(i,t)&&Ae(i.prev,i,i.next)>0&&Ae(t.prev,t,t.next)>0)}function Ae(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ca(i,t){return i.x===t.x&&i.y===t.y}function jh(i,t,e,n){let s=Yr(Ae(i,t,e)),r=Yr(Ae(i,t,n)),a=Yr(Ae(e,n,i)),o=Yr(Ae(e,n,t));return!!(s!==r&&a!==o||s===0&&$r(i,e,t)||r===0&&$r(i,n,t)||a===0&&$r(e,i,n)||o===0&&$r(e,t,n))}function $r(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Yr(i){return i>0?1:i<0?-1:0}function cx(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&jh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ir(i,t){return Ae(i.prev,i,i.next)<0?Ae(i,t,i.next)>=0&&Ae(i,i.prev,t)>=0:Ae(i,t,i.prev)<0||Ae(i,i.next,t)<0}function hx(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Qh(i,t){let e=new Ll(i.i,i.x,i.y),n=new Ll(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function wh(i,t,e,n){let s=new Ll(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function sr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ll(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ux(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Vn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Th(t),Eh(n,t);let a=t.length;e.forEach(Th);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Eh(n,e[l]);let o=Z0.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Th(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Eh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Be=class i extends Ma{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var ba=class i extends xe{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],h=[],f=t,d=(e-t)/s,u=new F,g=new Ct;for(let _=0;_<=s;_++){for(let p=0;p<=n;p++){let m=r+p/n*a;u.x=f*Math.cos(m),u.y=f*Math.sin(m),l.push(u.x,u.y,u.z),c.push(0,0,1),g.x=(u.x/e+1)/2,g.y=(u.y/e+1)/2,h.push(g.x,g.y)}f+=d}for(let _=0;_<s;_++){let p=_*(n+1);for(let m=0;m<n;m++){let y=m+p,M=y,v=y+n+1,P=y+n+2,T=y+1;o.push(M,v,T),o.push(v,P,T)}}this.setIndex(o),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(c,3)),this.setAttribute("uv",new qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},ys=class i extends xe{constructor(t=new Xn([new Ct(0,.5),new Ct(-.5,-.5),new Ct(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],a=[],o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new qt(s,3)),this.setAttribute("normal",new qt(r,3)),this.setAttribute("uv",new qt(a,2));function c(h){let f=s.length/3,d=h.extractPoints(e),u=d.shape,g=d.holes;Vn.isClockWise(u)===!1&&(u=u.reverse());for(let p=0,m=g.length;p<m;p++){let y=g[p];Vn.isClockWise(y)===!0&&(g[p]=y.reverse())}let _=Vn.triangulateShape(u,g);for(let p=0,m=g.length;p<m;p++){let y=g[p];u=u.concat(y)}for(let p=0,m=u.length;p<m;p++){let y=u[p];s.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let p=0,m=_.length;p<m;p++){let y=_[p],M=y[0]+f,v=y[1]+f,P=y[2]+f;n.push(M,v,P),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return dx(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let a=e[t.shapes[s]];n.push(a)}return new i(n,t.curveSegments)}};function dx(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var ze=class i extends xe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],f=new F,d=new F,u=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){let y=[],M=m/n,v=0;m===0&&a===0?v=.5/e:m===n&&l===Math.PI&&(v=-.5/e);for(let P=0;P<=e;P++){let T=P/e;f.x=-t*Math.cos(s+T*r)*Math.sin(a+M*o),f.y=t*Math.cos(a+M*o),f.z=t*Math.sin(s+T*r)*Math.sin(a+M*o),g.push(f.x,f.y,f.z),d.copy(f).normalize(),_.push(d.x,d.y,d.z),p.push(T+v,1-M),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){let M=h[m][y+1],v=h[m][y],P=h[m+1][y],T=h[m+1][y+1];(m!==0||a>0)&&u.push(M,v,T),(m!==n-1||l<Math.PI)&&u.push(v,P,T)}this.setIndex(u),this.setAttribute("position",new qt(g,3)),this.setAttribute("normal",new qt(_,3)),this.setAttribute("uv",new qt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var pn=class i extends xe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],h=new F,f=new F,d=new F;for(let u=0;u<=n;u++)for(let g=0;g<=s;g++){let _=g/s*r,p=u/n*Math.PI*2;f.x=(t+e*Math.cos(p))*Math.cos(_),f.y=(t+e*Math.cos(p))*Math.sin(_),f.z=e*Math.sin(p),o.push(f.x,f.y,f.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(f,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(u/n)}for(let u=1;u<=n;u++)for(let g=1;g<=s;g++){let _=(s+1)*u+g-1,p=(s+1)*(u-1)+g-1,m=(s+1)*(u-1)+g,y=(s+1)*u+g;a.push(_,p,y),a.push(p,m,y)}this.setIndex(a),this.setAttribute("position",new qt(o,3)),this.setAttribute("normal",new qt(l,3)),this.setAttribute("uv",new qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var vs=class i extends xe{constructor(t=new xa(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new F,l=new F,c=new Ct,h=new F,f=[],d=[],u=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new qt(f,3)),this.setAttribute("normal",new qt(d,3)),this.setAttribute("uv",new qt(u,2));function _(){for(let M=0;M<e;M++)p(M);p(r===!1?e:0),y(),m()}function p(M){h=t.getPointAt(M/e,h);let v=a.normals[M],P=a.binormals[M];for(let T=0;T<=s;T++){let A=T/s*Math.PI*2,C=Math.sin(A),b=-Math.cos(A);l.x=b*v.x+C*P.x,l.y=b*v.y+C*P.y,l.z=b*v.z+C*P.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,f.push(o.x,o.y,o.z)}}function m(){for(let M=1;M<=e;M++)for(let v=1;v<=s;v++){let P=(s+1)*(M-1)+(v-1),T=(s+1)*M+(v-1),A=(s+1)*M+v,C=(s+1)*(M-1)+v;g.push(P,T,C),g.push(T,A,C)}}function y(){for(let M=0;M<=e;M++)for(let v=0;v<=s;v++)c.x=M/e,c.y=v/s,u.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new Rl[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Je=class extends Ii{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vh,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Zr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function fx(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ms=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Dl=class extends Ms{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wc,endingEnd:wc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Tc:r=t,o=2*e-n;break;case Ec:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Tc:a=t,l=2*n-e;break;case Ec:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,u=this._weightNext,g=(n-e)/(s-e),_=g*g,p=_*g,m=-d*p+2*d*_-d*g,y=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*g+1,M=(-1-u)*p+(1.5+u)*_+.5*g,v=u*p-u*_;for(let P=0;P!==o;++P)r[P]=m*a[h+P]+y*a[c+P]+M*a[l+P]+v*a[f+P];return r}},Ul=class extends Ms{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),f=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*f+a[l+d]*h;return r}},Nl=class extends Ms{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Mn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Zr(e,this.TimeBufferType),this.values=Zr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Zr(t.times,Array),values:Zr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Nl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ul(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Dl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ea:e=this.InterpolantFactoryMethodDiscrete;break;case ol:e=this.InterpolantFactoryMethodLinear;break;case Wa:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ea;case this.InterpolantFactoryMethodLinear:return ol;case this.InterpolantFactoryMethodSmooth:return Wa}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&fx(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Wa,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let f=o*n,d=f-n,u=f+n;for(let g=0;g!==n;++g){let _=e[f+g];if(_!==e[d+g]||_!==e[u+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*n,d=a*n;for(let u=0;u!==n;++u)e[d+u]=e[f+u]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=ol;var Ui=class extends Mn{constructor(t,e,n){super(t,e,n)}};Ui.prototype.ValueTypeName="bool";Ui.prototype.ValueBufferType=Array;Ui.prototype.DefaultInterpolation=ea;Ui.prototype.InterpolantFactoryMethodLinear=void 0;Ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Fl=class extends Mn{};Fl.prototype.ValueTypeName="color";var Ol=class extends Mn{};Ol.prototype.ValueTypeName="number";var Bl=class extends Ms{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)li.slerpFlat(r,0,a,c-o,a,c,l);return r}},Sa=class extends Mn{InterpolantFactoryMethodLinear(t){return new Bl(this.times,this.values,this.getValueSize(),t)}};Sa.prototype.ValueTypeName="quaternion";Sa.prototype.InterpolantFactoryMethodSmooth=void 0;var Ni=class extends Mn{constructor(t,e,n){super(t,e,n)}};Ni.prototype.ValueTypeName="string";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=ea;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var zl=class extends Mn{};zl.prototype.ValueTypeName="vector";var kl=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=c.length;f<d;f+=2){let u=c[f],g=c[f+1];if(u.global&&(u.lastIndex=0),u.test(h))return g}return null}}},px=new kl,Vl=class{constructor(t){this.manager=t!==void 0?t:px,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Vl.DEFAULT_MATERIAL_NAME="__DEFAULT";var wa=class extends Ne{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},bs=class extends wa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Mo=new ge,Ah=new F,Ch=new F,Hl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.map=null,this.mapPass=null,this.matrix=new ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qs,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new Ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Ah.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ah),Ch.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ch),e.updateMatrixWorld(),Mo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Mo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Gl=class extends Hl{constructor(){super(new ua(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ss=class extends wa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.shadow=new Gl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var nc="\\[\\]\\.:\\/",mx=new RegExp("["+nc+"]","g"),ic="[^"+nc+"]",gx="[^"+nc.replace("\\.","")+"]",xx=/((?:WC+[\/:])*)/.source.replace("WC",ic),_x=/(WCOD+)?/.source.replace("WCOD",gx),yx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ic),vx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ic),Mx=new RegExp("^"+xx+_x+yx+vx+"$"),bx=["material","materials","bones","map"],Wl=class{constructor(t,e,n){let s=n||we.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},we=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(mx,"")}static parseTrackName(t){let e=Mx.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);bx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};we.Composite=Wl;we.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};we.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};we.prototype.GetterByBindingType=[we.prototype._getValue_direct,we.prototype._getValue_array,we.prototype._getValue_arrayElement,we.prototype._getValue_toArray];we.prototype.SetterByBindingTypeAndVersioning=[[we.prototype._setValue_direct,we.prototype._setValue_direct_setNeedsUpdate,we.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[we.prototype._setValue_array,we.prototype._setValue_array_setNeedsUpdate,we.prototype._setValue_array_setMatrixWorldNeedsUpdate],[we.prototype._setValue_arrayElement,we.prototype._setValue_arrayElement_setNeedsUpdate,we.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[we.prototype._setValue_fromArray,we.prototype._setValue_fromArray_setNeedsUpdate,we.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Yx=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xl);function eu(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new xe,c=0;for(let h=0;h<i.length;++h){let f=i[h],d=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let u in f.attributes){if(!n.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+u+'" attribute exists among all geometries, or in none of them.'),null;r[u]===void 0&&(r[u]=[]),r[u].push(f.attributes[u]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let u in f.morphAttributes){if(!s.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[u]===void 0&&(a[u]=[]),a[u].push(f.morphAttributes[u])}if(t){let u;if(e)u=f.index.count;else if(f.attributes.position!==void 0)u=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,u,h),c+=u}}if(e){let h=0,f=[];for(let d=0;d<i.length;++d){let u=i[d].index;for(let g=0;g<u.count;++g)f.push(u.getX(g)+h);h+=i[d].attributes.position.count}l.setIndex(f)}for(let h in r){let f=tu(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(let h in a){let f=a[h][0].length;if(f===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<f;++d){let u=[];for(let _=0;_<a[h].length;++_)u.push(a[h][_][d]);let g=tu(u);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function tu(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new qe(a,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let f=l/e;for(let d=0,u=h.count;d<u;d++)for(let g=0;g<e;g++){let _=h.getComponent(d,g);o.setComponent(d+f,g,_)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}var Zt=en.smoothstep;function Ra(i){i=String(i).replace("#",""),i.length===3&&(i=i.split("").map(e=>e+e).join(""));let t=parseInt(i,16);return[t>>16&255,t>>8&255,t&255]}function Sx(i,t,e){return"#"+[i,t,e].map(n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0")).join("")}function qn(i,t,e){let n=Ra(i),s=Ra(t);return Sx(n[0]+(s[0]-n[0])*e,n[1]+(s[1]-n[1])*e,n[2]+(s[2]-n[2])*e)}function Es(i){let[t,e,n]=Ra(i).map(s=>(s/=255,s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4)));return .2126*t+.7152*e+.0722*n}var nu=(i,t)=>qn(i,"#ffffff",t);function wx(i,t,e){let n=i.attributes.normal,s=new F,r=new F;for(let a=0;a<=e;a++){let o=a*(t+1),l=o+t;if(a===0||a===e){for(let c=o;c<=l;c++)n.setXYZ(c,0,a===0?1:-1,0);continue}s.fromBufferAttribute(n,o).add(r.fromBufferAttribute(n,l)).normalize(),n.setXYZ(o,s.x,s.y,s.z),n.setXYZ(l,s.x,s.y,s.z)}}function hn(i,t,e,n){let s=new ze(1,i,t),r=s.attributes.position,a=new F,o=new zt,l=n?new Float32Array(r.count*3):null;for(let c=0;c<r.count;c++)if(a.fromBufferAttribute(r,c).normalize(),n&&(n(a.x,a.y,a.z,o),o.toArray(l,c*3)),e){let h=e(a.x,a.y,a.z);r.setXYZ(c,a.x*h,a.y*h,a.z*h)}return n&&s.setAttribute("color",new qe(l,3)),e&&(s.computeVertexNormals(),wx(s,i,t)),s}function su(i,t){let e=[],n=Math.PI*(3-Math.sqrt(5));for(let s=0;s<i;s++){let r=1-2*(s+.5)/i,a=Math.sqrt(1-r*r),o=s*n+t+.3*Math.sin(s*7.3+t);e.push([a*Math.cos(o),r,a*Math.sin(o)])}return e}function hi(i,t,e){let n=su(i,e);return(s,r,a)=>{let o=0;for(let l of n){let c=1-(s*l[0]+r*l[1]+a*l[2]);c<.25&&(o+=Math.exp(-c*t))}return Math.min(1.25,o)}}function As(i){let t=i?54:73,e=Math.PI*(3-Math.sqrt(5)),n=[];for(let r=0;r<t;r++){let a=1-2*(r+.5)/t,o=Math.sqrt(1-a*a),l=r*e+.13*Math.sin(r*5.1),c=new F(o*Math.cos(l),a,o*Math.sin(l)),h=new F(-Math.sin(l),0,Math.cos(l));n.push({center:c,east:h,north:new F().crossVectors(h,c),phase:r*e})}let s=new F;return(r,a,o)=>{s.set(r,a,o);let l=0,c=0;for(let{center:h,east:f,north:d,phase:u}of n){let g=1-s.dot(h);if(g>=.12)continue;l+=Math.exp(-g*(i?70:89));let _=Math.atan2(s.dot(d),s.dot(f))+u,p=Math.sqrt(2*g)-(.123+.036*Math.cos(_));c=Math.max(c,Math.exp(-p*p/.0017)*(.5+.5*Math.sin(_)))}return{r:1+.088*l-.021*c,v:.93+.07*Math.min(1,l)-.07*c}}}function bn(i,t,e,n,s,r,a=.18){let o=(i-e)/s,l=(t-n)/r;return 1-Zt(o*o+l*l,1-a,1+a)}function Tx(i,t,e,n,s,r){let a=s-e,o=r-n,l=a*a+o*o,c=Math.max(0,Math.min(1,((i-e)*a+(t-n)*o)/l)),h=i-e-a*c,f=t-n-o*c;return Math.sqrt(h*h+f*f)}function iu(i,t,e,n){let s=(i.x-e.x)/n.x,r=(i.y-e.y)/n.y,a=(i.z-e.z)/n.z,o=t.x/n.x,l=t.y/n.y,c=t.z/n.z,h=o*o+l*l+c*c,f=s*o+r*l+a*c,d=f*f-h*(s*s+r*r+a*a-1);return d>=0?Math.max(0,(Math.sqrt(d)-f)/h):0}function Ex(i){let t=new Map,e=new ze(1,16,12),n=new ze(1,10,8),s={sphere:e,tiny:n,seg:r=>Math.max(8,Math.round(r*i/2)*2),std(r,a=.9,o=0){let l=r+"|"+a+"|"+o;return t.has(l)||t.set(l,new Je({color:r,roughness:a,metalness:o})),t.get(l)},flat(r,a=1){let o="flat|"+r+"|"+a;return t.has(o)||t.set(o,new Rn({color:r,transparent:a<1,opacity:a,depthWrite:a>=1})),t.get(o)},paint:new Je({vertexColors:!0,roughness:.9}),cloth:new Je({vertexColors:!0,roughness:.95,side:Ie}),add(r,a,o,l=0,c=0,h=0,f=1,d=f,u=f){let g=new fe(a,o);return g.position.set(l,c,h),g.scale.set(f,d,u),g.castShadow=!0,g.receiveShadow=!0,r.add(g),g},oval(r,a,o,l,c,h,f,d){return s.add(r,e,a,o,l,c,h,f,d)},dot(r,a,o,l,c,h,f,d){return s.add(r,n,a,o,l,c,h,f,d)},group(r,a=0,o=0,l=0,c){let h=new Re;return h.position.set(a,o,l),c&&(h.name=c),r.add(h),h}};return s}function Cs(i,t,e,n,s){let r=new Li(e.map(o=>new F(...o))),a=new fe(new vs(r,8,n,5,!1),s);return t.add(a),a}function lr(i,t,e,n,s){let r=new Li(i.map(f=>new F(...f))),a=new vs(r,t,1,e,!1),o=a.attributes.position,l=a.attributes.normal,c=[],h=new zt;for(let f=0;f<=t;f++){let d=f/t,u=r.getPointAt(d);for(let g=0;g<=e;g++){let _=f*(e+1)+g,p=n(d,g/e);o.setXYZ(_,u.x+l.getX(_)*p,u.y+l.getY(_)*p,u.z+l.getZ(_)*p),s(d,g/e,h),h.toArray(c,_*3)}}return a.setAttribute("color",new qt(c,3)),a.computeVertexNormals(),a}function Rs(i,t,e={}){let n=i,s=n.colors,r=n.marks||{},a=n.species==="cat",o=n.coat==="fluffy",l=n.coat==="long",c=n.coat==="curly",h=o||l||c,f=n.legs==="short",d=Math.max(.4,Math.min(1,e.detail||1)),u=Ex(d),g=Z=>new zt(Z),_=u.seg,p=new Re;p.name="pet3d";let m=s.chest===s.body?nu(s.body,Es(s.body)>.7?0:.1):s.chest,y=s.face===s.main?nu(s.main,Es(s.main)>.7?0:.16):s.face,M=r.patchL&&s.ear===s.main?r.patchL:s.ear,v=r.patchR&&s.ear===s.main?r.patchR:s.ear,P=Z=>a?qn(Z,"#F4AEBB",.7):qn(Z,"#F3C2C9",.55),T=s.chest!==s.body?qn(s.body,s.chest,.5):s.body,A=n.face==="mask"?s.face:r.patchL||s.main,C=Es(A)<.12,b=Es(r.mask||y)<.12?"#F4E6EA":"#3A2A33",x=r.saddle||s.body,S={main:g(s.main),body:g(s.body),face:g(s.face),chest:g(m),paws:g(s.paws),muzzle:g(y),blush:g("#FF9DB2"),ruff:g(T),haunch:g(x)},I={};for(let Z of["stripes","spots","patchL","patchR","brows","mask","saddle"])r[Z]&&(I[Z]=g(r[Z]));let D=f?.24:a?.36:.38,B=a?.27:.3,W=a?.25:.27,H=(a?.37:.4)*(f?1.18:1),st=D+.09,O=a?[.41,.335,.35]:[.4,.34,.355],Q=st+W*.95+O[1]*.55,pt=H*.78,it=I.spots?su(34,1.7).filter(Z=>Z[1]>-.4):[],ht=o?hi(90,110,.4):l?hi(70,90,1.1):null,yt=c?As(!1):null,X=(Z,et,$)=>{if(yt)return yt(Z,et,$).r;let lt=1;return ht&&(lt+=(o?.06:.04)*(ht(Z,et,$)-.45)),lt},nt=new zt,ft=s.body!==s.main,k=(Z,et,$)=>ft?Zt(et,-.34,-.18)*(1-Zt($,.5,.78)*(1-Zt(et,.55,.8))):1,tt=(Z,et,$,lt)=>{if(lt.copy(S.main).lerp(S.body,k(Z,et,$)),I.saddle&&lt.lerp(I.saddle,Zt(et,.12,.38)*(1-Zt($,.4,.72))),r.bodyPatch){let ut=(It,Kt,Wt,te)=>1-Zt(1-(Z*It+et*Kt+$*Wt),te*.75,te*1.25);I.patchR&&(lt.lerp(I.patchR,ut(.62,.55,.1,.22)),lt.lerp(I.patchR,ut(-.2,.62,-.62,.14))),I.patchL&&(lt.lerp(I.patchL,ut(-.78,-.05,-.25,.2)),lt.lerp(I.patchL,ut(.35,.3,-.75,.12)))}let ct=Zt($,.42,.72)*(1-Zt(et,.3,.62))+Zt(-et,.55,.85)*.9;if(lt.lerp(S.chest,Math.min(1,ct)),I.stripes){let ut=Zt(et,-.5,-.25)*(1-Zt($,.42,.62))*(1-Zt(-$,.72,.9)*(1-Zt(et,.35,.6))),It=$*3.1-.28*(1-et)*(1-et),Kt=1-Zt(Math.abs((It%1+1)%1-.5),.16,.24),Wt=(1-Zt(Math.abs(Z),.07,.12))*Zt(et,.8,.88)*(1-Zt($,.5,.7));lt.lerp(I.stripes,Math.max(Kt*ut,Wt))}if(I.spots){let ut=0;for(let It of it){let Kt=1-(Z*It[0]+et*It[1]+$*It[2]);ut=Math.max(ut,1-Zt(Kt,.008,.016))}lt.lerp(I.spots,ut*(1-Zt($,.5,.7)))}},rt=hn(_(56),_(40),X,tt),mt=u.add(p,rt,u.paint,0,st,0,B,W,H);mt.name="body";let Et=[{c:mt.position.clone(),r:new F(B,W,H)}];if(l){let Z=hi(70,90,2.3),et=f?.2:.34,$=hn(_(56),_(36),(lt,ct,ut)=>{let It=1+.03*(Z(lt,ct,ut)-.45);return ct<0&&(It*=1+et*Math.pow(-ct,1.8)*(1+.1*Math.sin(Math.atan2(ut,lt)*11))),It},(lt,ct,ut,It)=>{It.copy(S.body),ft&&It.lerp(S.main,Zt(-ct,.3,.85)),It.lerp(S.chest,Zt(ut,.45,.8)*(1-Zt(ct,.2,.5))),It.multiplyScalar(.97)});u.add(p,$,u.paint,0,st-.01,-.01,B*1.03,W*.98,H*1.01)}let Ut=[],St=c?As(!0):null;for(let Z of[-1,1])for(let et of[-1,1]){let $=u.group(p,Z*B*.58,D,et*H*.56);$.userData.hip=$.position.clone(),$.userData.phase=Z*et>0?0:Math.PI;let lt=et<0,ct=D/.38,ut=lt?S.haunch:S.body,It=ft?S.main:S.body,Kt=o||l?hi(14,30,Z+et*2):null,Wt=St?(Ee,ye,E)=>St(Ee,ye,E).r:Kt?(Ee,ye,E)=>1+.06*(Kt(Ee,ye,E)-.4):null,te=hn(_(28),_(20),Wt,(Ee,ye,E,V)=>{V.copy(ut),lt&&I.saddle&&V.lerp(S.body,Zt(-ye,.3,.9)*.6),ft&&V.lerp(S.main,Zt(-ye,-.45,.15))});u.add($,te,u.paint,0,-D*.12,0,lt?.125:.105,D*.42,lt?.135:.11);let De=s.paws!==(ft?s.main:s.body),ke=hn(_(18),_(14),null,(Ee,ye,E,V)=>{if(V.copy(It),De&&V.lerp(S.paws,Zt(-ye,.05,.35)),I.stripes&&!f){let J=1-Zt(Math.abs(((ye*1.6+.2)%1+1)%1-.5),.14,.22);V.lerp(I.stripes,J*Zt(ye,-.4,-.2)*(1-Zt(ye,.6,.8)))}});u.add($,ke,u.paint,0,-D*.6,0,.078*Math.max(.9,ct),D*.34,.082*Math.max(.9,ct));let sn=u.oval($,u.std(s.paws),0,.08-D,.03,.088,.075,.115);$.userData.paw=sn,Ut.push($),c&&u.add($,hn(_(20),_(14),(Ee,ye,E)=>St(Ee,ye,E).r,(Ee,ye,E,V)=>V.copy(S.body).multiplyScalar(St(Ee,ye,E).v)),u.paint,0,.14-D,0,.1,.07,.1)}let U=u.group(p,0,Q,pt,"head"),jt=a?.4:.383,Ft=a?.06:.04,$t=a?{short:109,medium:111,long:113}[n.muzzle]:{short:112,medium:116,long:119}[n.muzzle],Ot=(100-($t+2))/51,le=a?.6:.58,Gt=I.spots?[[100,64,4],[140,60,5],[124,72,3.5],[70,94,4],[170,90,4.5]].map(([Z,et,$])=>[(Z-120)/60,(100-et)/51,$/55]):[],R=a?(100-($t-4))/51:(100-($t+2))/51,w=a?[.63,.63]:[.52,.51],q=(Z,et,$,lt)=>{let ct=Z,ut=et,It=Zt($,-.3,.12);lt.copy(S.main),I.patchL&&lt.lerp(I.patchL,bn(ct,ut,-.5,.27,.64,.74,.22)),I.patchR&&lt.lerp(I.patchR,bn(ct,ut,.5,.27,.64,.74,.22));let Kt=0;if(n.face==="lower")Kt=Math.max(bn(ct,ut,0,-.59,a?.83:.8,.59),Zt(-ut,.78,.92));else if(n.face==="mask"){Kt=Math.max(bn(ct,ut,0,-.39,.97,.67),bn(ct,ut,-.38,.04,.27,.25),bn(ct,ut,.38,.04,.27,.25),Zt(-ut,.75,.9));let Wt=.133-.07*(1.06-ut)/.9;ut>.12&&(Kt*=Zt(Math.abs(ct),Wt-.03,Wt+.03))}else if(n.face==="hachiware"){let Wt=Math.max(-.25,.71-2.6*Math.abs(ct));Kt=1-Zt(ut-Wt,-.05,.05)}else if(n.face==="blaze"){let Wt=ut>.39?.085:.085+(.39-ut)*.62;Kt=(1-Zt(Math.abs(ct)-Wt,-.03,.03))*(1-Zt(ut,1,1.1)),Kt=Math.max(Kt,Zt(-ut,.8,.95))}if(Kt>0&&lt.lerp(S.face,Kt*It),I.stripes){let Wt=[[-.133,.86,-.1,.63],[0,.94,0,.67],[.133,.86,.1,.63],[-1,-.04,-.77,-.1],[-.97,-.24,-.77,-.24],[1,-.04,.77,-.1],[.97,-.24,.77,-.24]],te=0;for(let sn of Wt)te=Math.max(te,1-Zt(Tx(ct,ut,...sn),.03,.05));lt.lerp(I.stripes,te*It);let De=1-Zt($,-.4,-.05),ke=Math.atan2(Z,-$)/.42;lt.lerp(I.stripes,De*(1-Zt(Math.abs((ke%1+1.5)%1-.5),.17,.26))*Zt(ut,-.45,-.15))}if(I.spots){let Wt=0;for(let[te,De,ke]of Gt)Wt=Math.max(Wt,bn(ct,ut,te,De,ke,ke*1.15,.3));lt.lerp(I.spots,Wt*It)}I.brows&&lt.lerp(I.brows,Math.max(bn(ct,ut,-jt,.35,.092,.078,.3),bn(ct,ut,jt,.35,.092,.078,.3))*It),I.mask&&lt.lerp(I.mask,.92*(1-Zt((ct/w[0])**2+((ut-R)/w[1])**2,.25,1.05))*It),lt.lerp(S.blush,.42*Math.max(bn(ct,ut,-le,Ot,.14,.1,.5),bn(ct,ut,le,Ot,.14,.1,.5))*Zt($,.2,.4))},at=o||l?hi(80,105,2.1):null,dt=c?As(!1):null,ot=(Z,et)=>Zt(et,.2,.6)*(1-Zt(Z,.4,.75)),Dt=(Z,et,$)=>dt?1+(dt(Z,et,$).r-1)*(1-ot(et,$))*1.1:at?1+.045*(at(Z,et,$)-.45)*(1-ot(et,$)):1,bt=hn(_(64),_(48),dt||at?Dt:null,(Z,et,$,lt)=>{q(Z,et,$,lt),dt&&lt.multiplyScalar(1-(1-dt(Z,et,$).v)*(1-ot(et,$)))});u.add(U,bt,u.paint,0,0,0,O[0],O[1],O[2]).name="skull",Et.push({c:new F(0,Q,pt),r:new F(...O),head:!0});let wt=(Z,et,$,lt=0)=>{let ct=new F(Z,et,$??Math.sqrt(Math.max(0,1-Z*Z-et*et))).normalize(),ut=new F(ct.x*O[0],ct.y*O[1],ct.z*O[2]),It=new F(ut.x/O[0]**2,ut.y/O[1]**2,ut.z/O[2]**2).normalize();return{p:ut.addScaledVector(It,-lt),n:It}},ee=[],gt=a?[.068,.076,.03]:[.06,.07,.03],Pt=Es(s.eye)>.06;for(let Z of[-1,1]){let{p:et,n:$}=wt(Z*jt,Ft,null,.012),lt=u.group(U,et.x,et.y,et.z);lt.quaternion.setFromUnitVectors(new F(0,0,1),$.clone().add(new F(0,0,.7)).normalize()),C&&u.oval(lt,u.std(qn(A,"#ffffff",.42)),0,0,-.004,gt[0]*1.24,gt[1]*1.22,gt[2]*.7),u.oval(lt,u.std(s.eye,.28),0,0,0,...gt),Pt&&u.oval(lt,u.std("#1E1620",.3),0,-.002,gt[2]*.72,a?.024:.029,a?.056:.04,.012),u.dot(lt,u.flat("#ffffff"),.022,.028,gt[2]*.92,.021,.021,.01),u.dot(lt,u.flat("#ffffff",.85),-.022,-.03,gt[2]*.85,.01,.01,.006),ee.push(lt)}let Nt=null;if(a){let Z=-O[1]*($t-100+6)/51,et=Math.sqrt(1-(Z/O[1])**2)*O[2]-.035;for(let Kt of[-1,1])u.oval(U,u.std(y),Kt*.052,Z,et,.068,.055,.06);u.oval(U,u.std(y),0,Z-.04,et-.01,.05,.035,.045);let $=-O[1]*($t-100)/51,lt=Math.sqrt(1-($/O[1])**2)*O[2]+.022,ct=u.add(U,new We(.034,.036,3),u.std(s.nose,.45),0,$+.004,lt);ct.rotation.set(-Math.PI/2+.25,0,Math.PI),ct.scale.set(1,1,.55);let ut=u.std(b,.6);Cs(u,U,[[0,$-.014,lt-.002],[0,$-.03,lt+.004]],.005,ut);for(let Kt of[-1,1])Cs(u,U,[[0,$-.03,lt+.004],[Kt*.02,$-.045,lt+.006],[Kt*.045,$-.033,lt+.002]],.005,ut);let It=Es(s.main)<.2?u.flat("#ffffff",.65):u.flat("#3C2837",.45);for(let Kt of[-1,1])for(let Wt of[-1,0,1])Cs(u,U,[[Kt*.07,Z+Wt*.012,et+.04],[Kt*.2,Z+Wt*.03+.006,et+.005],[Kt*.3,Z+Wt*.05,et-.05]],.0035,It);Nt=u.oval(U,u.std("#F38BA0",.5),0,Z-.055,et+.03,.026,.014,.03),Nt.rotation.x=.45,Nt.visible=!1}else{let Z={short:[.17,.115,.12],medium:[.18,.125,.16],long:[.185,.13,.21]}[n.muzzle],et=-O[1]*{short:.3,medium:.34,long:.38}[n.muzzle],$=Math.sqrt(1-(et/O[1])**2)*O[2]+{short:.055,medium:.095,long:.145}[n.muzzle]-Z[2],lt=hn(_(32),_(24),null,(Wt,te,De,ke)=>{ke.copy(S.muzzle),I.mask&&ke.lerp(I.mask,.9*Zt(De,-.4,.35))});u.add(U,lt,u.paint,0,et,$,...Z).name="muzzle";let ct=(Wt,te,De)=>[Wt*Z[0],et+te*Z[1],$+Math.sqrt(Math.max(0,1-Wt*Wt-te*te))*Z[2]+De],ut=ct(0,.5,-.01),It=n.muzzle==="short"?.9:1;u.oval(U,u.std(s.nose,.35),ut[0],ut[1],ut[2],.062*It,.043*It,.042*It),u.dot(U,u.flat("#ffffff",.55),-.018*It,ut[1]+.018,ut[2]+.03,.012,.007,.005);let Kt=u.std(b,.6);Cs(u,U,[ct(0,.18,.002),ct(0,-.08,.002)],.0055,Kt);for(let Wt of[-1,1])Cs(u,U,[ct(0,-.08,.002),ct(Wt*.2,-.24,.002),ct(Wt*.42,-.06,.002)],.0055,Kt);Nt=u.oval(U,u.std("#F38BA0",.5),0,et-Z[1]*.72,$+Z[2]*.62,.042,.022,.05),Nt.rotation.x=.45,Nt.visible=!1}let Yt=[],Rt=c?As(!0):null,se=o||l?hi(18,30,3.3):null,Qt=[[1,0],[.94,.2],[.74,.45],[.46,.72],[.16,.94],[.01,1]],ce=a||n.ear==="small"?Qt:[[.67,0],[.97,.17],[1,.32],[.85,.52],[.54,.78],[.15,.96],[.005,1]],z=(Z,et,$,lt,ct=.55)=>{let ut=ce[0][0],It=[[ut*.92,-.6],[ut*1.02,-.28],...ce],Kt=new va(It.map(([te,De])=>new Ct(te*et,De*$)),22),Wt=u.add(Z,Kt,u.std(lt),0,0,0);Wt.scale.z=ct,u.oval(Z,u.std(P(lt)),0,$*.4,et*ct*.52,et*.5,$*.32,et*.1)};for(let Z of[-1,1]){let et=Z<0?M:v,$,lt,ct=0,ut=0,It=0,Kt=!1,Wt=n.ear;if(Wt==="pointy"||Wt==="big"||Wt==="small"){let te=a?{pointy:[.16,.25,.58,.72,.1,.3],big:[.175,.31,.6,.7,.06,.36],small:[.13,.17,.55,.76,.12,.24]}[Wt]:{pointy:[.15,.27,.56,.74,.06,.3],big:[.175,.37,.6,.7,.02,.46],small:[.105,.16,.5,.8,.12,.2]}[Wt];$=wt(Z*te[2],te[3],te[4],Wt==="small"&&h?0:.045),lt=u.group(U,$.p.x,$.p.y,$.p.z),It=-Z*te[5],ut=Z*.28,z(lt,te[0],te[1],et)}else if(Wt==="semi"){$=wt(Z*.6,.72,.04,.04),lt=u.group(U,$.p.x,$.p.y,$.p.z),It=-Z*.3,ut=Z*.2,z(lt,.13,.16,et);let te=u.group(lt,0,.13,.01);te.rotation.x=2.05,u.oval(te,u.std(et),0,.06,.012,.105,.075,.028)}else if(Wt==="fold")$=wt(Z*.45,.84,.25,.01),lt=u.group(U,$.p.x,$.p.y,$.p.z),ct=1.2,It=-Z*.25,u.oval(lt,u.std(et),0,.035,0,.1,.065,.035);else{let te=Wt==="long";$=wt(Z*.9,.44,-.02,.03),lt=u.group(U,$.p.x,$.p.y,$.p.z),It=Z*.16,Kt=!0;let De=te?h?[.115,.27,.15]:[.09,.26,.13]:[.085,.19,.125],ke=Rt?hn(_(28),_(22),(sn,Ee,ye)=>Rt(sn,Ee,ye).r,(sn,Ee,ye,E)=>E.set(et).multiplyScalar(Rt(sn,Ee,ye).v)):se&&te?hn(_(24),_(20),(sn,Ee,ye)=>1+.07*(se(sn,Ee,ye)-.4),(sn,Ee,ye,E)=>E.set(et)):null;ke?u.add(lt,ke,u.paint,Z*.035,-(te?.23:.16),0,...De):u.oval(lt,u.std(et),Z*.03,-(te?.23:.16),0,...De)}lt.rotation.set(ct,ut,It),Yt.push({g:lt,rx:ct,ry:ut,rz:It,floppy:Kt})}if(h){let et=n.ear==="small"&&o?[.45,.27,.33]:a?[.34,.19,.27]:[.37,.21,.29],$=new F(0,Q-O[1]*.78,pt-O[2]*.35),lt=hi(110,120,.9),ct=c?As(!1):null,ut=hn(_(64),_(44),(It,Kt,Wt)=>ct?ct(It,Kt,Wt).r:1+.075*(lt(It,Kt,Wt)-.45),(It,Kt,Wt,te)=>{te.copy(S.body).lerp(ft?S.chest:S.ruff,Zt(Wt,-.2,.3)),ct&&te.multiplyScalar(ct(It,Kt,Wt).v)});u.add(p,ut,u.paint,$.x,$.y,$.z,...et).name="ruff",Et.push({c:$,r:new F(...et).multiplyScalar(1.05)})}let vt=u.group(p,0,st+W*.3,-H*.9,"tail"),j=g(s.tail),L=s.tailTip?g(s.tailTip):null,N=(Z,et)=>L?Zt(Z,et,et+.08):0,Y=(Z,et)=>($,lt)=>Z($)*(1+et*Math.sin(lt*Math.PI*2*5+$*23)*Math.sin($*31+lt*9)),xt=Z=>I.stripes?1-Zt(Math.abs(Z/.15%1-.5),.16,.24):0,_t=(Z,et)=>($,lt,ct)=>{ct.copy(j),et&&I.stripes&&ct.lerp(I.stripes,xt($)*(1-Zt($,.86,.9))*Zt($,.08,.12)),L&&ct.lerp(L,N($,Z))},Bt=Z=>u.add(vt,Z,u.paint),At=n.tail,Jt=6.5;if(At==="curl"){let Z=[[0,0,0],[-.08,.12,-.1],[-.065,.27,-.14],[.044,.35,-.13],[.17,.32,-.11],[.21,.22,-.11],[.16,.17,-.14],[.12,.19,-.156]],et=o?1.3:1;Bt(lr(Z,_(42),_(14),($,lt)=>et*(.062+.05*Math.pow(Math.sin(Math.PI*$),.55)-.06*Zt($,.79,1))*(o?1+.1*Math.sin(lt*6.28*5+$*20):1),_t(.78,!1))),Jt=7.5}else if(At==="plume"){if(c){Bt(lr([[0,0,0],[0,.1,-.06],[0,.2,-.08]],10,8,()=>.034,_t(2,!1)));let Z=As(!1);u.add(vt,hn(_(32),_(24),(et,$,lt)=>Z(et,$,lt).r,(et,$,lt,ct)=>ct.copy(L||j).multiplyScalar(Z(et,$,lt).v)),u.paint,0,.26,-.09,.11,.11,.11)}else{let Z=o?1.2:1;Bt(lr([[0,0,0],[0,.17,-.07],[0,.3,.01],[0,.31,.14],[0,.24,.25]],_(32),_(16),Y($=>Z*(.07+.085*Math.pow(Math.sin(Math.PI*Math.min(1,$*1.05)),.7))*(1-.85*Zt($,.8,1)),.12),_t(.7,!1)))}Jt=5.5}else if(At==="straight"){let Z=o||l?.068:.052;Bt(lr([[0,0,0],[0,.08,-.12],[0,.2,-.2],[0,.33,-.24]],_(20),_(12),et=>Z*(1-.55*Zt(et,.3,1))*(et>.94?Math.sqrt(Math.max(.04,1-((et-.94)/.06)**2)):1),_t(.78,!0)))}else if(At==="stub"){let Z=o?hi(12,24,4.4):null;u.add(vt,hn(_(20),_(16),Z?(et,$,lt)=>1+.12*(Z(et,$,lt)-.4):null,(et,$,lt,ct)=>ct.copy(j)),u.paint,0,.03,-.02,.075,.07,.075),Jt=9}else{let Z=At==="fluffy",et=[[0,0,0],[0,.02,-.15],[0,.12,-.27],[0,.3,-.31],[0,.45,-.25],[0,.5,-.17]],$=Z?.085:.044,lt=ct=>$*(Z?1+.25*Math.sin(Math.PI*ct):1)*(ct>.9?Math.sqrt(Math.max(.03,1-((ct-.9)/.1)**2)):1);Bt(lr(et,_(40),_(14),Z?Y(lt,.1):lt,_t(.82,!0))),Jt=3.6}return t&&Cx(u,p,t,Et,{headY:Q,headZ:pt,HR:O,bodyY:st,BH:W,BW:B,BL:H}),Ax(p,new Set([p,U,vt,...ee,...Yt.map(Z=>Z.g),...Ut]),new Set([...Ut.map(Z=>Z.userData.paw),Nt].filter(Boolean))),p.userData.legs=Ut,p.userData.tail=vt,p.userData.height=D,p.userData.rig={head:U,headY:Q,ears:Yt,eyes:ee,tongue:Nt,wag:Jt,seed:Ra(s.main)[0]%17/10},p.userData.size={H:D,BW:B,BH:W,BL:H,HR:O,headY:Q,headZ:pt,top:Q+O[1]+.2},p}function Ax(i,t,e){i.updateMatrixWorld(!0);let n=new ge,s=new ge,r=new Set;for(let l of t){s.copy(l.matrixWorld).invert();let c=new Map,h=[],f=d=>{for(let u of d.children)if(!(t.has(u)||e.has(u))){if(u.isMesh){let g=u.geometry.clone();r.add(u.geometry),g.applyMatrix4(n.multiplyMatrices(s,u.matrixWorld)),g.deleteAttribute("uv");let _=u.material.uuid+(g.attributes.color?"|c":"");c.has(_)||c.set(_,{mat:u.material,geos:[]}),c.get(_).geos.push(g.index?g:g.setIndex([...Array(g.attributes.position.count).keys()])),h.push(u)}f(u)}};f(l);for(let d of h)d.removeFromParent();for(let{mat:d,geos:u}of c.values()){let g=u.length===1?u[0]:eu(u,!1);u.length>1&&u.forEach(p=>p.dispose());let _=new fe(g,d);_.castShadow=_.receiveShadow=!0,l.add(_)}}let a=[];i.traverse(l=>{l!==i&&!l.isMesh&&!t.has(l)&&l.children.length===0&&a.push(l)}),a.forEach(l=>l.removeFromParent());let o=new Set;i.traverse(l=>{l.geometry&&o.add(l.geometry)});for(let l of r)o.has(l)||l.dispose()}function Cx(i,t,e,n,s){let r=new F(0,(s.headY-s.HR[1]*.7+s.bodyY+s.BH*.6)/2,s.headZ*.7),a=n.filter(x=>x.head),o=n.filter(x=>!x.head),l=(x,S)=>new F(Math.sin(x)*Math.cos(S),Math.sin(S),Math.cos(x)*Math.cos(S)),c=(x,S)=>x.reduce((I,D)=>Math.max(I,iu(r,S,D.c,D.r)),0),h=x=>{let S=-1.35,I=1.35;for(let D=0;D<26;D++){let B=(S+I)/2,W=l(x,B);c(a,W)>c(o,W)?I=B:S=B}return(S+I)/2},f=72,d=Array.from({length:f+1},(x,S)=>h(S/f*Math.PI*2)),u=x=>{let S=(x/(Math.PI*2)%1+1)%1*f,I=Math.floor(S),D=S-I;return d[I]*(1-D)+d[(I+1)%(f+1)]*D},g=(x,S,I)=>{let D=u(x)-S,B=l(x,D);return r.clone().addScaledVector(B,Math.max(c(a,B),c(o,B))+I)},_=x=>Math.max(0,1-Math.abs(Math.atan2(Math.sin(x),Math.cos(x)))/1.4),p=i.group(t,0,0,0,"neck-wear"),m=(x,S,I,D,B)=>{let W=[],H=[],st=[],O=new zt,Q=S+(B?0:1);for(let ht=0;ht<=x;ht++)for(let yt=0;yt<Q;yt++)if(I(ht/x,yt/S).toArray(W,W.length),D(ht/x,yt/S,O),st.push(O.r,O.g,O.b),ht&&(B||yt<Q-1)){let X=(ht-1)*Q+yt,nt=(ht-1)*Q+(yt+1)%Q;H.push(X,X+Q,nt,nt,X+Q,nt+Q)}let pt=new xe;pt.setAttribute("position",new qt(W,3)),pt.setAttribute("color",new qt(st,3)),pt.setIndex(H),pt.computeVertexNormals();let it=new fe(pt,i.cloth);return it.castShadow=it.receiveShadow=!0,p.add(it),it},y=e.p||{},M=new zt(y.c&&y.c!=="rainbow"?y.c:"#ffffff"),v=(x,S,I)=>S.copy(x).multiplyScalar(I),P=(x,S,I)=>m(5,96,(D,B)=>{let W=B*Math.PI*2,H=x[0]+x[1]*Math.pow(_(W),1.25);return g(W,-.03+D*H,S+.012*Math.sin(D*Math.PI))},I,!0),T=(x,S,I)=>{let D=g(x,S,I),B=g(x,S,I+.05);return{p:D,n:B.sub(D).normalize()}},A=(x,S,I,D)=>{let{p:B,n:W}=T(S,I,D);return x.position.copy(B),x.quaternion.setFromUnitVectors(new F(0,0,1),W),x},C=["#F27B7B","#F5C562","#8CC26A","#6FABE3","#B8A6EC"].map(x=>new zt(x)),b=x=>{let S=(x/(Math.PI*2)%1+1)%1*C.length,I=Math.floor(S);return C[I].clone().lerp(C[(I+1)%C.length],S-I)};if(e.kind==="scarf"){let x=y.tri?y.tri.map(D=>new zt(D)):null;P([.2,.16],.03,(D,B,W)=>{let H=D<.08||D>.92?.84:1;v(x?x[Math.floor(B*27)%3]:M,W,H)});let S=.95,I=x?hn(16,12,null,(D,B,W,H)=>H.copy(x[Math.floor((B+1)*1.6)%3])):i.sphere;A(i.add(p,I,x?i.paint:i.std(y.c,.93),0,0,0,.05,.048,.065),S,.1,.045),[[.04,.6],[.3,.46]].forEach(([D,B],W)=>{let H=O=>(.3+.08*Math.sin(O*Math.PI))*(1-.35*O**3);m(12,4,(O,Q)=>g(S+D*O+(Q-.5)*H(O),.1+O*B,.05+.012*Math.sin(Q*Math.PI)+.012*W),(O,Q,pt)=>{let it=Q===0||Q===1?.86:1;v(x?x[[1,2,0][Math.floor(O*7.99)%3]]:M,pt,it)},!1);let st=x?i.std(y.tri[0]):i.std(qn(y.c,"#2A1E2A",.3));for(let O of[-.33,0,.33]){let Q=S+D+O*H(1),pt=g(Q,.1+B,.052+.012*W),it=g(Q,.1+B+.09,.05+.012*W);Cs(i,p,[pt.toArray(),it.toArray()],.008,st)}})}else if(e.kind==="bandana"){P([.06,.02],.022,(D,B,W)=>v(M,W,D>.9?.86:1));let x=new zt("#ffffff"),S=y.check,I=m(10,20,(D,B)=>{let W=B*2-1,H=1.05*(1-D*.97);return g(W*H,.05+D*.62*(1-.12*W*W),.03+.006*D)},(D,B,W)=>{if(S){let H=Math.floor(B*10)%2,st=Math.floor(D*6)%2;W.copy(x).lerp(M,.55*(H+st))}else W.copy(M);D>.96&&W.multiplyScalar(.86)},!1);if(I.name="bandana",y.d)for(let[D,B]of[[-.45,.16],[0,.3],[.45,.16],[0,.62]]){let W=i.dot(p,i.std(y.d),0,0,0,.017,.017,.004);A(W,D*1.05*(1-B*.97),.05+B*.62*(1-.12*D*D),.036)}}else if(e.kind==="bell"){P([.07,.015],.022,(S,I,D)=>{y.c==="rainbow"?D.copy(b(I*Math.PI*2)):D.copy(M),(S<.1||S>.9)&&D.multiplyScalar(.82)});let x=i.group(p);A(x,0,.21,.062),i.oval(x,i.std(y.b,.32,.45),0,0,0,.062,.062,.062),i.oval(x,i.std(qn(y.b,"#2A1E2A",.42),.5),0,-.014,.054,.034,.005,.012),i.oval(x,i.std(qn(y.b,"#2A1E2A",.42),.5),0,-.031,.049,.008,.014,.01),i.dot(x,i.flat("#ffffff",.75),-.02,.024,.054,.013,.013,.006)}else if(e.kind==="bowtie"){let x=i.group(p);A(x,0,.08,.025);let S=i.std(y.c,.7),I=i.std(qn(y.c,"#ffffff",.18),.7);for(let D of[-1,1]){let B=i.add(x,new We(.055,.085,4),S,D*.045,0,.01);B.rotation.z=D*Math.PI/2,B.scale.set(1,1,.45)}i.oval(x,I,0,0,.018,.026,.026,.02)}else if(e.kind==="pearls"){let x=i.std("#FBF7F2",.22,.1);for(let S=0;S<26;S++){let I=S/26*Math.PI*2;A(i.dot(p,x,0,0,0,.021,.021,.021),I,.06+.03*_(I),.02)}A(i.oval(p,i.std("#F7C9D6",.3),0,0,0,.028,.028,.022),0,.18,.028)}else if(e.kind==="lei"){let x=["#F7A9C4","#FFD27A","#FFFFFF","#C9B6F2","#F28C8C"];for(let S=0;S<14;S++){let I=S/14*Math.PI*2,D=i.group(p);A(D,I,.06+.03*_(I),.022);let B=i.std(x[S%x.length],.8);for(let W=0;W<5;W++){let H=W/5*Math.PI*2;i.dot(D,B,Math.cos(H)*.026,Math.sin(H)*.026,0,.022,.022,.012)}i.dot(D,i.std("#F5C04A",.7),0,0,.01,.012,.012,.008)}}else if(e.kind==="ukiwa"){let x=s.bodyY+s.BH*.38,S=new F(0,x,s.BL*.18),I=.085,D=[];for(let it=0;it<48;it++){let ht=it/48*Math.PI*2,yt=new F(Math.sin(ht),0,Math.cos(ht)),X=n.reduce((nt,ft)=>Math.max(nt,iu(S,yt,ft.c,ft.r)),0);D.push(S.clone().addScaledVector(yt,X+I*.8))}let B=new Li(D,!0),W=new vs(B,96,I,14,!0),H=W.attributes.position,st=[],O=new zt,Q=new zt("#F27B7B"),pt=new zt("#FFFFFF");for(let it=0;it<H.count;it++){let ht=Math.atan2(H.getX(it),H.getZ(it)-S.z)+Math.PI/4;O.copy(Math.floor((ht/(Math.PI/2)%4+4)%4)%2?pt:Q),O.toArray(st,it*3)}W.setAttribute("color",new qt(st,3)),i.add(p,W,i.paint)}}function Is(i,t,e,n={}){let s=i.userData,r=s.rig;if(!r)return;let a=!!n.reduced,o=a?0:t,l=n.phase??o*9,c=Math.sin(o*(e?r.wag*1.25:r.wag*.62));s.tail.rotation.y=c*(e?.35:.24),s.tail.rotation.x=e?.08*Math.sin(o*9.5):0;let h=a?0:Math.max(0,1-Math.abs((o+r.seed)%4.3-3.6)/.11);r.eyes.forEach(d=>{d.scale.y=1-.92*h});let f=Math.sin(l*3.7);r.head.position.y=r.headY+(e?.014*f:.006*Math.sin(o*1.6)),r.head.rotation.x=e?.03*Math.sin(l*3.7+.6):.015*Math.sin(o*1.65),r.head.rotation.z=e?0:.035*Math.sin(o*1.34),r.ears.forEach((d,u)=>{let g=u?1:-1;d.g.rotation.z=d.rz+g*(d.floppy?e?.16:.035:.03)*Math.sin(l*3.7+u*.5),d.g.rotation.x=d.rx+(d.floppy&&e?.14*Math.sin(l*3.7):0)}),r.tongue&&(r.tongue.visible=!!e),n.legs!==!1&&Rx(i,l,e,!!n.airborne)}function Rx(i,t,e,n){let s=i.rotation.x,r=i.rotation.z,a=i.scale.y,o=Math.cos(s),l=Math.sin(s),c=Math.cos(r),h=Math.sin(r);for(let f of i.userData.legs){let{hip:d,paw:u}=f.userData,g=t*1.85+f.userData.phase,_=n?d.z>0?-.64:.74:e?.52*Math.sin(g):0;if(f.position.copy(d),f.rotation.x=_,u.rotation.x=n?-.35*_:-_,n)continue;let p=e?Math.max(0,-Math.cos(g))**2*d.y*.23:0,m=Math.cos(_),y=Math.sin(_),M=d.y+u.position.y*m-u.position.z*y-u.scale.y,v=d.z+u.position.y*y+u.position.z*m,P=d.x*h+M*c,A=-(i.position.y+a*(o*P-l*v))/a+p;f.position.x+=o*h*A,f.position.y+=o*c*A,f.position.z-=l*A}}function Ps(i){let t=new Set;i.traverse(e=>{e.geometry&&!t.has(e.geometry)&&(t.add(e.geometry),e.geometry.dispose());let n=Array.isArray(e.material)?e.material:e.material?[e.material]:[];for(let s of n)t.has(s)||(t.add(s),s.dispose())}),i.removeFromParent()}var Pe=Object.freeze({run:4.8,height:2.15,width:1.9,entryTolerance:.68}),Ia=Math.atan2(Pe.height,Pe.run);function Ls(i){return Math.max(0,1-Math.abs(i)/Pe.run)*Pe.height}function ru(i){let t=Math.max(0,Math.min(1,i/Pe.height)),e=.2,n=t-e/2;return t<e&&(n=t*t/(2*e)),t>1-e&&(n=1-e-(1-t)**2/(2*e)),Pe.height*.85*n/(1-e)}function au(i){let t=Math.min(1,Math.abs(i)/.85,Math.max(0,Pe.run-Math.abs(i))/.85);return Math.sign(i)*Ia*t}function ou(i,t){let{run:e,width:n}=Pe,s=.12;for(let r of[1,-1]){let a=r*Ia;for(let[o,l,c]of[[0,e-1.35,"#4b8f95"],[e-1.35,e,"#edc65e"]]){let h=(o+l)/2,f=t(n,s,(l-o)/Math.cos(Ia),c,0,Ls(h)-s*Math.cos(Ia)/2,r*h-s*Math.sin(a)/2,i);f.name="a-frame-panel",f.rotation.x=a,f.castShadow=!0}for(let o of[.85,1.65,2.45,3.25,4.05]){let l=t(n-.12,.032,.078,o>e-1.35?"#d4aa48":"#78a9a2",0,Ls(o)+.013,r*o,i);l.rotation.x=a}}for(let r of[-1,1])t(.075,.09,e,"#677e78",r*(n/2-.1),.86,0,i)}var _e=Object.freeze({length:8,width:1.2,thickness:.12,pivotHeight:.95,angle:Math.asin(.235),speed:4.2,stopFrom:-.7,stopTo:1,hold:.35,tipDuration:.85}),lu=()=>_e.length/2*Math.cos(_e.angle);function Pa(i,t){return Math.max(0,_e.pivotHeight+i*Math.tan(t)+_e.thickness/(2*Math.cos(t)))}function cu(i){let t=Math.max(0,Math.min(1,i));return _e.angle*(1-2*t*t*(3-2*t))}var cr=()=>-.035,Ix=()=>.015,Px=()=>.016;function La(i,t){if(!t)return i.layout.theme==="forest"?Px:Ix;let e=i.player,n=i.layout.obstacles.find(r=>(r.type==="a-frame"||r.type==="seesaw")&&Math.abs(e.s-r.s)<Pe.run+1);if(!n||Math.abs(e.x-n.lane*2)>.68)return cr;let s=e.s-n.s;if(n.type==="a-frame"&&i.rampPass?.onBoard!==!1&&Math.abs(s)<Pe.run+1)return r=>Math.abs(s+r)<=Pe.run?Ls(s+r):cr();if(n.type==="seesaw"&&Math.abs(s)<_e.length/2+1){let{angle:r,phase:a}=i.seesaws.get(n.id);if(a==="missed"||Math.abs(e.x-n.lane*2)>=.48)return cr;let o=_e.length/2*Math.cos(r);return l=>Math.abs(s+l)<=o?Pa(s+l,r):cr()}return cr}function Da(i,t,e,n,s){let r=i.rotation.x,a=i.rotation.z,o=i.scale.y,l=Math.cos(r),c=Math.sin(r),h=Math.cos(a),f=Math.sin(a);for(let d of i.userData.legs){let{hip:u,paw:g}=d.userData,_=t*1.85+d.userData.phase,p=n?u.z>0?-.64:.74:e?.52*Math.sin(_):0;if(d.position.copy(u),d.rotation.x=p,g.rotation.x=n?-.35*p:-p,n)continue;let m=e?Math.max(0,-Math.cos(_))**2*u.y*.23:0,y=Math.cos(p),M=Math.sin(p),v=u.y+g.position.y*y-g.position.z*M-g.scale.y,P=u.z+g.position.y*M+g.position.z*y,T=u.x*f+v*h,A=o*(c*T+l*P),C=i.position.y+o*(l*T-c*P),b=(s(A)-C)/o+m;d.position.x+=l*f*b,d.position.y+=l*h*b,d.position.z-=c*b}}var Ua=[{id:0,start:90,direction:"right"},{id:1,start:185,direction:"left"},{id:2,start:280,direction:"left"},{id:3,start:385,direction:"right"}].map(i=>({...i,radius:10,length:Math.PI*5,end:i.start+Math.PI*5}));function ui(i,t=0){return hr(Ua,i,t)}function hr(i,t,e=0){let n=0,s=0,r=0,a=0;for(let o of i){let l=Math.min(t,o.start)-a;if(n+=Math.sin(r)*l,s-=Math.cos(r)*l,t<=o.start)return sc(n,s,r,e);let c=Math.min(t-o.start,o.length),h=o.direction==="right"?1:-1,f=r+h*c/o.radius;if(n+=o.radius/h*(Math.cos(r)-Math.cos(f)),s+=o.radius/h*(Math.sin(r)-Math.sin(f)),r=f,a=o.end,t<=o.end)return sc(n,s,r,e)}return n+=Math.sin(r)*(t-a),s-=Math.cos(r)*(t-a),sc(n,s,r,e)}function sc(i,t,e,n){return{x:i+Math.cos(e)*n,z:t+Math.sin(e)*n,heading:e}}var $n=(i,t=0,e=0,n=Ua)=>n.find(s=>i>=s.start-t&&i<=s.end+e);var Lx=[{distance:-2.1,height:1.7},{distance:0,height:2.12},{distance:2.1,height:1.7}];function Na(i,t){for(let{distance:e,height:n}of Lx)i.push({id:i.length,s:t.s+e,lane:t.lane,y:n,jumpLog:t.id})}function hu(){let t=[[72,"left",18,52],[142,"right",20,88],[231,"left",19,78],[298,"right",19,76],[389,"left",18,68],[452,"right",19,48]].map(([s,r,a,o],l)=>{let c=a*o*Math.PI/180;return{id:l,start:s,direction:r,radius:a,length:c,end:s+c}}),e=[[35,0],[105,-1],[195,1],[273,0],[349,-1],[425,1],[492,0]].map(([s,r],a)=>({id:a,s,lane:r,type:"log"})),n=[];for(let s=7;s<505;s+=2.15){let r=e.find(o=>Math.abs(s-o.s)<13);if(r&&Math.abs(s-r.s)<=4.8)continue;let a=$n(s,20,4,t)?0:r?.lane??0;n.push({id:n.length,s,lane:a,y:.65})}for(let s of e)Na(n,s);return n.sort((s,r)=>s.s-r.s),{theme:"forest",length:510,turns:t,obstacles:e,treats:n,point:(s,r=0)=>hr(t,s,r)}}var rc=472,ur=[[82,"right",32,36],[180,"left",35,62],[288,"left",34,26],[388,"right",32,52]].map(([i,t,e,n],s)=>{let r=e*n*Math.PI/180;return{id:s,start:i,direction:t,radius:e,length:r,end:i+r}});function uu(){let i=[[38,0,-1],[138,1,-1],[244,-1,1],[344,1,-1],[440,-1,1]].map(([r,a,o],l)=>({id:l,s:r,lane:a,snackLane:o,type:"log"})),t=i.map((r,a)=>({lane:r.lane,from:a?ur[a-1].end+6:0,to:ur[a]?ur[a].start-20-6:rc})),e=i.map(({s:r,snackLane:a})=>({s:r,lane:a,halfLength:4.8,halfWidth:.87})),n=[];function s(r,a){n.push({id:n.length,s:r,lane:a,y:.65})}for(let r=7;r<rc-6;r+=2.15){if(i.some(o=>Math.abs(r-o.s)<=8.5))continue;let a=t.find(o=>r>=o.from&&r<=o.to);t.some(o=>o.lane!==0&&(Math.abs(r-o.from)<1.6||Math.abs(r-o.to)<1.6))||s(r,a?.lane??0)}for(let r of i){Na(n,r);for(let a=-6;a<=6;a++)s(r.s+a*1.3,r.snackLane)}return n.sort((r,a)=>r.s-a.s),{theme:"beach",length:rc,turns:ur,point:(r,a=0)=>hr(ur,r,a),sand:e,obstacles:i,treats:n}}function du(i,t,e){return i.some(n=>{let s=(t-n.s)/n.halfLength,r=(e-n.lane*2)/n.halfWidth;return s*s+r*r<1})}var ie={length:480,lanewidth:2,speed:9.6,jumpDuration:.94,jumpHeight:1.55,gaugeMax:20,boostDuration:3,boostSpeed:16.2},mr=(i,t,e)=>t+(i-t)*Math.exp(-13*e),gr=i=>i===null||i>=ie.jumpDuration?0:Math.sin(i/ie.jumpDuration*Math.PI)*ie.jumpHeight;function Ux(i,t,e){let n=mr(t.x,t.target,e),s=t.wall;return s&&i>=s.fromS&&(n-s.x)*s.blockedSide>0?s.x:n}function fi(i,t,e){if(i<=t.s||i>e)return null;let n=t.dt*(i-t.s)/(e-t.s),s=t.jump===null?null:t.jump+n;return{x:Ux(i,t,n),y:gr(s),grounded:s===null||s>=ie.jumpDuration}}var Fa=1.7-.54,ac=1.7+.26;function Nx(i,t,e){let n=i.s+-5.05,s=i.s+2.55;if(e<n||t.s>=s||e<=t.s)return null;let r=i.lane*ie.lanewidth,a=c=>mr(t.x,t.target,t.dt*(c-t.s)/(e-t.s))-r,o=a(Math.max(t.s,n)),l=a(Math.min(e,s));for(let c of[-1,1]){let h=c*o,f=c*l;if(Math.min(h,f)>=ac-1e-9||Math.max(h,f)<=Fa+1e-9)continue;let d=h<=Fa||h<ac&&h<1.7;return{x:r+c*(d?Fa:ac),fromS:Math.max(n,t.s),blockedSide:d?c:-c,lane:d?i.lane:Math.max(-1,Math.min(1,i.lane+c))}}return null}function fu(){let i=Array.from({length:15},(e,n)=>({id:n,s:36+n*28,lane:[0,-1,1,0,1,-1,0,1,0,-1,1,0,-1,1,0][n],type:n%4===2?"tunnel":"hurdle"})).filter(e=>!$n(e.s,26,9)),t=[];for(let e=8;e<465;e+=2.2){let n=[0,0,-1,0,1,0][Math.floor((e-8)/17)%6],s=.65;$n(e,20,4)&&(n=0);let r=i.find(a=>Math.abs(a.s-e)<4.5);r&&(n=r.lane,r.type==="hurdle"&&(s=.65+1.25*Math.sin(Math.PI*(e-r.s+4.5)/9))),t.push({id:t.length,s:e,lane:n,y:s})}return{theme:"park",length:ie.length,obstacles:i,treats:t,turns:Ua}}var dr=(i,t,e,n)=>({id:i,lane:t,x:t*ie.lanewidth,s:e,speed:n,y:0,jumpElapsed:null,slow:0,brake:0,boost:0,finishTime:null,hits:0,lastHitObstacle:null,phase:0}),fr=class{constructor(t="park"){let e={park:fu,beach:uu,forest:hu}[t]??fu;this.layout=e(),this.reset()}reset(){this.status="ready",this.previousStatus=null,this.countdown=3,this.time=0,this.player=dr("player",0,0,ie.speed),this.cpus=[dr("cpu0",-1,0,9.7),dr("cpu1",1,0,10),dr("cpu2",0,-3.3,10.25),dr("cpu3",-1,-4.4,9.9)];let t=this.layout.theme==="beach"?this.cpus.slice(0,2):this.layout.theme==="forest"?[this.cpus[2],this.cpus[1]]:[];for(let e of t)e.nextTreat=0,e.gauge=0;this.gauge=0,this.treatCount=0,this.dashCount=0,this.collected=new Set,this.events=[],this.result=null,this.armedTurns=new Set,this.passedTurns=new Set,this.missedTurns=new Set,this.waitingTurn=null,this.wallReach=null}start(){this.status==="ready"&&(this.status="countdown")}pause(){["countdown","running"].includes(this.status)&&(this.previousStatus=this.status,this.status="paused")}resume(){this.status==="paused"&&(this.status=this.previousStatus,this.previousStatus=null)}inTunnel(t){return this.layout.theme==="park"?this.layout.obstacles.find(e=>e.type==="tunnel"&&t.s>=e.s+-5.05&&t.s<e.s+2.55&&Math.abs(t.x-e.lane*ie.lanewidth)<=Fa):this.layout.obstacles.find(e=>e.type==="tunnel"&&Math.abs(t.s-e.s)<3.4&&Math.abs(t.x-e.lane*ie.lanewidth)<.8)}get turnCue(){let t=$n(this.player.s,32,0,this.layout.turns);return t?{...t,distance:Math.max(0,t.start-this.player.s),active:this.player.s>=t.start-20,armed:this.armedTurns.has(t.id),waiting:this.waitingTurn===t.id}:null}input(t){if(this.status!=="running")return!1;let e=this.player;if(t==="left"||t==="right"){let s=this.turnCue;if(s?.active)return s.armed?!1:t!==s.direction?(this.events.push({type:"turn-wrong",direction:s.direction}),!1):(this.armedTurns.add(s.id),this.waitingTurn=null,e.lane=0,this.events.push({type:"turn-armed",direction:s.direction}),!0)}if(this.waitingTurn!==null)return!1;if(t==="dash")return this.gauge<ie.gaugeMax||e.boost>0?!1:(this.gauge=0,e.boost=ie.boostDuration,this.dashCount++,this.events.push({type:"dash"}),!0);if(t==="brake")return e.brake=.6,!0;let n=this.inTunnel(e);if(n&&(this.layout.theme!=="park"||t==="jump"))return!1;if(t==="left"||t==="right"){let s=e.lane+(t==="left"?-1:1);return e.lane=Math.max(-1,Math.min(1,s)),this.wallReach=n&&s!==e.lane?{gate:n,target:s*ie.lanewidth}:null,!0}return t==="jump"&&e.jumpElapsed===null?(e.jumpElapsed=0,!0):!1}obstacleHit(t,e,n){t.lastHitObstacle!==e.id&&(t.lastHitObstacle=e.id,t.slow=1.15,t.hits++,t===this.player&&this.events.push({type:"hit",reason:n}))}collectRivalTreats(t,e){let n=this.layout.treats;for(;t.nextTreat<n.length&&n[t.nextTreat].s<=t.s;){let s=n[t.nextTreat++],r=fi(s.s,e,t.s);r&&Math.abs(r.x-s.lane*ie.lanewidth)<.72&&Math.abs(r.y+.65-s.y)<.8&&(t.gauge=Math.min(ie.gaugeMax,t.gauge+1))}t.gauge===ie.gaugeMax&&t.boost===0&&(t.gauge=0,t.boost=ie.boostDuration)}get rank(){return this.result?this.result.rank:1+this.cpus.filter(t=>t.finishTime!==null||t.s>this.player.s+.02).length}step(t){if(!Number.isFinite(t)||t<=0||t>.1)return;if(this.status==="countdown"){this.countdown=Math.max(0,this.countdown-t),this.countdown===0&&(this.status="running",this.events.push({type:"go"}));return}if(this.status!=="running")return;let e=this.time;if(this.time+=t,this.advanceField(t,e,this.cpus),this.player.finishTime!==null){let n=this.finishStandings(this.time);this.result={rank:1+n.findIndex(s=>s.id===this.player.id),standings:n,time:this.player.finishTime,treats:this.treatCount,dashes:this.dashCount,hits:this.player.hits,turns:this.passedTurns.size,turnMisses:this.missedTurns.size},this.time=this.player.finishTime,this.status="finished",this.events.push({type:"finish"})}}finishStandings(t){let e=this.cpus.map(s=>({...s})),n=1/60;for(;e.some(s=>s.finishTime===null);)this.advanceField(n,t,e),t+=n;return[this.player,...e].map(({id:s,finishTime:r})=>({id:s,time:r})).sort((s,r)=>s.time-r.time)}advanceField(t,e,n){for(let s=0;s<n.length;s++){let r=n[s];if(r.finishTime!==null)continue;r.lane=$n(r.s,20,0,this.layout.turns)?0:[-1,1,0,-1][s];let a=this.layout.obstacles.find(o=>o.s>r.s&&o.s-r.s<4.3&&Math.abs(r.x-o.lane*ie.lanewidth)<.65);(a?.type==="hurdle"||a?.type==="log")&&r.jumpElapsed===null&&(a.id+s*3)%7!==0&&(r.jumpElapsed=0)}for(let s of[this.player,...n]){if(s.finishTime!==null)continue;let r=s.s,a=s===this.player?this.wallReach:null,o={s:r,x:s.x,target:a?.target??s.lane*ie.lanewidth,jump:s.jumpElapsed,dt:t};s.slow=Math.max(0,s.slow-t),s.brake=Math.max(0,s.brake-t),s.boost=Math.max(0,s.boost-t),s.jumpElapsed!==null&&(s.jumpElapsed+=t,s.jumpElapsed>=ie.jumpDuration?(s.jumpElapsed=null,s.y=0):s.y=gr(s.jumpElapsed)),s.x=mr(s.x,o.target,t);let l=s===this.player&&this.waitingTurn!==null,c=this.layout.sand&&s.y<.2&&du(this.layout.sand,s.s,s.x),h=l?0:(c?.8:1)*(s.boost>0?ie.boostSpeed:s.speed)*(s.slow>0?.43:1)*(s.brake>0?.63:1);if(s.s+=h*t,s===this.player){let f=this.layout.turns.find(d=>r<=d.start&&s.s>=d.start&&!this.armedTurns.has(d.id));f&&(s.s=f.start,this.waitingTurn=f.id,this.missedTurns.has(f.id)||(this.missedTurns.add(f.id),this.events.push({type:"turn-missed",direction:f.direction})));for(let d of this.layout.turns)r<d.end&&s.s>=d.end&&!this.passedTurns.has(d.id)&&(this.passedTurns.add(d.id),this.events.push({type:"turn-done",direction:d.direction}))}s.phase+=s.s-r;for(let f of this.layout.obstacles){if(f.type==="tunnel"&&this.layout.theme==="park"){let g=Nx(f,o,s.s);g&&(o.wall=g,s.x=g.x,s.lane=g.lane,s===this.player&&(this.wallReach=null),this.obstacleHit(s,f,"tunnel-wall"))}let d=fi(f.s,o,s.s);if(!d||Math.abs(d.x-f.lane*ie.lanewidth)>=(f.type==="log"?1.12:.72))continue;(f.type==="tunnel"?d.y>.55:d.y<(f.type==="log"?.68:.74))&&(this.obstacleHit(s,f),f.type==="tunnel"&&(s.jumpElapsed=null,s.y=0))}if(a&&s.s>=a.gate.s+2.55&&(this.wallReach=null),s===this.player){for(let f of this.layout.treats)if(!this.collected.has(f.id)&&r<=f.s+.4&&s.s>=f.s-.4&&Math.abs(s.x-f.lane*ie.lanewidth)<.72&&Math.abs(s.y+.65-f.y)<.8){this.collected.add(f.id),this.treatCount++;let d=this.gauge;this.gauge=Math.min(ie.gaugeMax,this.gauge+1),this.events.push({type:"treat",id:f.id}),d<ie.gaugeMax&&this.gauge===ie.gaugeMax&&this.events.push({type:"ready"})}}s.nextTreat!==void 0&&this.collectRivalTreats(s,o),s.s>=this.layout.length&&(s.finishTime=e+t*(this.layout.length-r)/(s.s-r),s.s=this.layout.length)}}drainEvents(){let t=this.events;return this.events=[],t}};function Oa(i,t,e,n=!1){let s=Math.abs(i),r=Math.abs(t),a=Math.max(s,r),o=Math.min(s,r),l=n&&e<=210&&a>=20&&a>=o*1.4;return a>=28||l?s>r?i<0?"left":"right":t<0?"jump":"brake":Math.hypot(i,t)<12&&e<350?"dash":null}function Fx(i){return()=>(i=1664525*i+1013904223>>>0)/4294967296}function mu({root:i,routePoint:t,end:e,ribbon:n,mesh:s,box:r,groupAt:a,instances:o,pose:l}){let c=Fx(1071);r(1300,.15,1300,"#9bc95f",0,-.12,-180),s(n(0,7.65,.015,-15,e,t),"#edc285").name="continuous-road";let h=[],f=[],d=[],u=[],g=[],_=[],p=[],m=[],y=[],M=[],v=[],P=[],T=["#bedc77","#a4cc65","#c4df81","#99c461"],A=[],C=[];for(let it of[-1,1]){let ht;for(let yt=-15;yt<=e+3;yt+=2.8){let X=3.77+c()*.28,nt=5.6+c()*1.2,ft=[t(yt,X*it),t(yt,nt*it)];if(ht){let k=new zt(T[Math.floor(c()*T.length)]);for(let tt of[ht[0],ht[1],ft[0],ht[1],ft[1],ft[0]])A.push(tt.x,.024,tt.z),k.toArray(C,C.length)}ht=ft}}let b=new xe;b.setAttribute("position",new qt(A,3)),b.setAttribute("color",new qt(C,3));let x=new fe(b,new Rn({vertexColors:!0,side:Ie}));i.add(x);for(let it=-10;it<e;it+=1.3){let ht=c()<.5?-1:1;h.push(l(it,ht*(2.44+c()*1.24),.027,.08+c()*.24,.009,.06+c()*.18));let yt=ht*(4.1+c()*2.05),X=l(it,yt,.13,.1,.26+c()*.22,.15);if(f.push(X),!(c()>.28))for(let nt=0;nt<3;nt++){let ft=l(it+c()*.6,yt+c()*.4,.19+c()*.13,.12,.055,.12);u.push([ft[0],ft[1]+.033,ft[2],.057,.038,.057]);for(let k=0;k<5;k++){let tt=k*2*Math.PI/5;d.push([ft[0]+Math.cos(tt)*.069,ft[1],ft[2]+Math.sin(tt)*.069,.07,.032,.07])}}}o(new _s(1,0),"#d8ab76",h,"path-grit"),o(new We(1,1,3),"#75a34c",f,"grass-tips");let S=new Be(1,0);o(S,"#fff4d8",d,"daisies"),o(S,"#efaf31",u,"daisy-centres");for(let it of[-1,1]){for(let ht=-11;ht<e;ht+=3.1){if((Math.floor((ht+12)/21)+(it+1))%4===2)continue;let yt=t(ht,it*5.72),X=t(ht+3.1,it*5.72);v.push(l(ht,it*5.72,.56));for(let nt of[.46,.89])P.push([(yt.x+X.x)/2,nt,(yt.z+X.z)/2,1,1,Math.hypot(X.x-yt.x,X.z-yt.z)+.08,-Math.atan2(X.x-yt.x,yt.z-X.z)])}for(let ht=-12+(it+1)*2.9;ht<e;ht+=9+c()*6){let yt=it*(6.8+c()*3.6),X=2.45+c()*1.35;p.push(l(ht,yt,X*.48,1,X,1));let nt=l(ht,yt,X*.89,1,.95,1);m.push(nt);let ft=c()*6,k=1.65+c()*.91;y.push([...l(ht,yt,X+.56,k,1.66+c(),k*.91).slice(0,6),ft]),M.push([...l(ht+.42,yt-it*.71,X+1.58,k*.76,1.24+c()*.5,k*.7).slice(0,6),ft+.71])}for(let ht=-9;ht<e;ht+=5+c()*7){let yt=6.2+c()*4,X=.7+c()*.8;g.push(l(ht,it*yt,X*.55,X*1.13,X,X*.91)),_.push(l(ht+1,it*(yt+.65),X*.44,X*1.12,X*.74,X))}}let I=new Be(1,1);function D(it,ht,yt,X){let nt=o(it,ht,yt,X);nt.material.flatShading=!0;for(let ft=0;ft<yt.length;ft++){let k=.8+c()*.2;nt.setColorAt(ft,new zt().setRGB(k,Math.min(1,k+.03),k*.94))}return nt}D(I,"#70ae51",y,"tree-crowns"),D(I,"#a3ca59",M,"sunlit-canopies"),D(new _s(1,0),"#81af4a",g,"shrubs"),D(I,"#589b55",_,"hedges"),o(new ue(.22,.34,1,7),"#966745",p,"tree-trunks");let B=new ue(.1,.18,1.45,6);B.rotateZ(.53),B.translate(-.29,0,0),o(B,"#a5744d",m,"tree-branches"),o(new ue(.099,.111,1.17,5),"#aa7450",v,"fence-posts"),o(new Te(.085,.13,1),"#bc895d",P,"fence-rails");let W=p.map(it=>[it[0]+.75,.007,it[2]-.37,2.43,1,1.44,it[6]]),H=new ci(1,9);H.rotateX(-Math.PI/2),o(H,"#8db55f",W,"tree-shadows");let st=[],O=[];for(let it=-30;it<e+60;it+=25)for(let ht of[-1,1]){let yt=44+c()*26;if(st.push(l(it,ht*yt,-2,11+c()*13,5+c()*8,15+c()*13)),c()<.5){let X=ht*(13+c()*23),nt=12+c()*8;for(let[ft,k,tt,rt,mt]of[[-2,0,-.1,2.1,.82],[0,.67,0,2.35,1.45],[2.1,.12,.3,1.8,.96]])O.push(l(it+tt,X+ft,nt+k,rt,mt,1.85))}}let Q=[];for(let it=-20;it<=e+5;it+=2)Q.push(t(it,0));let pt=st.filter(([it,,ht,yt,,X])=>{let nt=Math.max(yt,X)+16;return Q.every(ft=>(ft.x-it)**2+(ft.z-ht)**2>nt**2)});D(new Be(1,0),"#83b69b",pt,"far-hills"),o(new Be(1,1),"#fff8df",O,"clouds");for(let it of[45,162,322]){let ht=a(it,-11);ht.name="park-pavilion",s(new ue(2.3,2.46,.27,8),"#d5b68a",0,.13,0,ht);for(let yt=0;yt<8;yt++){let X=Math.PI*yt/4;s(new ue(.083,.1,2.65,6),"#f4e4be",Math.cos(X)*1.9,1.56,Math.sin(X)*1.9,ht)}s(new We(2.9,1.55,8),"#cf6c50",0,3.65,0,ht),s(new ue(2.9,2.81,.15,8),"#8f5542",0,2.88,0,ht),s(new ze(.16,8,6),"#f3be66",0,4.48,0,ht)}}function gu(i,t){let e=t(new ue(.365,.345,1.76,11),"#925d38",0,.39,0,i);e.castShadow=!0,e.rotation.z=Math.PI/2,e.rotation.y=.09;for(let s of[-1,1]){let r=s*.88,a=-s*.079;t(new ue(.303,.303,.02,11),"#e2ab70",r,.39,a,i).rotation.copy(e.rotation);let l=t(new pn(.195,.014,4,12),"#b57a46",r+s*.017,.39,a,i);l.rotation.y=Math.PI/2+.09}for(let s of[-.51,.32]){let r=t(new ue(.027,.033,.42,6),"#b7814e",s,.5,.32-s*.09,i);r.rotation.z=Math.PI/2-.08,r.rotation.y=.09}let n=t(new ue(.089,.125,.22,7),"#99643c",-.41,.67,-.06,i);n.rotation.z=.54,t(new _s(1,0),"#8ca54b",.42,.699,-.04,i).scale.set(.25,.078,.139)}var oc=[[0,-.15,.3,.216],[-.35,.15,.106,.16],[-.13,.35,.115,.166],[.14,.35,.115,.166],[.35,.15,.106,.16]],mn=new Xn;mn.moveTo(-.92,0);mn.bezierCurveTo(-1.24,-.33,-1.05,-.64,-.76,-.58);mn.bezierCurveTo(-.53,-.55,-.56,-.34,-.31,-.315);mn.bezierCurveTo(-.09,-.29,.11,-.3,.32,-.32);mn.bezierCurveTo(.55,-.34,.55,-.56,.77,-.585);mn.bezierCurveTo(1.08,-.635,1.23,-.29,.92,0);mn.bezierCurveTo(1.2,.31,1.06,.61,.78,.57);mn.bezierCurveTo(.53,.55,.56,.33,.31,.315);mn.bezierCurveTo(.1,.295,-.11,.295,-.31,.315);mn.bezierCurveTo(-.57,.33,-.54,.565,-.78,.58);mn.bezierCurveTo(-1.08,.615,-1.21,.29,-.92,0);var nn=mn.getPoints(6);nn.at(-1).equals(nn[0])&&nn.pop();var Ba=oc.map(([i,t,e,n])=>Array.from({length:16},(s,r)=>{let a=-r*Math.PI/8;return new Ct((i+e*Math.cos(a))*.56,(t+n*Math.sin(a))*.56)})),xu=i=>i.map(({x:t,y:e},n)=>(n?"L":"M")+t.toFixed(3)+" "+(-e).toFixed(3)).join(" ")+"Z",lc='<svg viewBox="-1.19 -.71 2.38 1.42" aria-hidden="true"><path d="'+xu(nn)+'" fill="#efc384" stroke="#99633d" stroke-width=".11"/><path d="'+Ba.map(xu).join("")+'" fill="#91572f"/></svg>';function _u(){let i=[],t=[],e=[],n=(d,u,g,_=1,p=new Ct)=>{let m=i.length/3,y=new zt(g);for(let M of d)i.push((p.x+(M.x-p.x)*_)*.327,(p.y+(M.y-p.y)*_)*.327,u),t.push(y.r,y.g,y.b);return m};function s(d,u,g){for(let _=0;_<g;_++){let p=(_+1)%g;e.push(d+_,d+p,u+p,d+_,u+p,u+_)}}let r=n(nn,-.052,"#b97a42",.94),a=n(nn,-.034,"#c78749"),o=n(nn,.031,"#d89a54"),l=n(nn,.053,"#f1c080",.95);s(r,a,nn.length),s(a,o,nn.length),s(o,l,nn.length);for(let d of Vn.triangulateShape(nn,[]))e.push(...d.reverse().map(u=>u+r));let c=nn.map(d=>d.clone().multiplyScalar(.95));for(let d of Ba)n(d,.053,"#d5a16a");for(let d of Vn.triangulateShape(c,Ba))e.push(...d.map(u=>u+l));let h=l+nn.length;Ba.forEach((d,u)=>{let g=new Ct(oc[u][0],oc[u][1]).multiplyScalar(.56),_=n(d,.038,"#956537",.8,g);s(_,h,d.length);for(let p of Vn.triangulateShape(d,[]))e.push(...p.map(m=>_+m));h+=d.length});let f=new xe;return f.setAttribute("position",new qt(i,3)),f.setAttribute("color",new qt(t,3)),f.setIndex(e),f.computeVertexNormals(),f.rotateZ(.22),f.rotateX(-.38),f}function xr(i,t,e=1.58,n=6){let s=new ue(e,e,n,32,1,!0,Math.PI/2,Math.PI);s.rotateX(Math.PI/2);let r=t(s,"#5686aa",0,0,0,i);r.material.side=Ie,r.name="tunnel-fabric";let a=8;for(let o=0;o<=a;o++){let l=o===0||o===a,c=t(new pn(e,e*(l?.068:.032),8,32,Math.PI),l?"#91b7c3":"#729cba",0,0,n*(o/a-.5),i);c.name=l?"tunnel-rim":"tunnel-rib"}}function yu(i,t){let e=1.7,n=7.6,s=new Re;s.name="park-tunnel",s.scale.y=1.1,s.position.z=1.25,i.add(s),xr(s,t,e,n);for(let r of[-1,1])t(new Te(.12,.08,n),"#75969c",r*e,.04,0,s)}function vu(i,{mesh:t,box:e,instances:n,pose:s,ribbon:r}){let a=i.length+35;e(1e3,.16,1300,"#93a978",0,-.12,-230),t(r(0,8.8,.005,-20,a,i.point),"#b7ad79").name="trail-verge",t(r(0,7.5,.016,-20,a,i.point),"#d1af80").name="continuous-road";let o=41383,l=()=>(o=Math.imul(o,1664525)+1013904223>>>0,o/4294967296),c=[],h=[],f=[],d=[],u=[],g=[],_=[],p=[],m=[],y=[],M=[],v=[];for(let T=-10;T<a;T+=4.3)for(let A of[-1,1]){let C=T+l()*3,b=Math.sin(T*.065)>.6?3:0,x=A*(7.6+b+l()*5),S=.78+l()*.58;if(l()<.28){d.push(s(C,x,S*2.1,S,S,S));for(let D=0;D<3;D++)g.push(s(C,x,S*(.9+D*.9),S,S,S));u.push(s(C,x,S*4.4,1.6*S,2.1*S,1.6*S))}else c.push(s(C,x,S*1.6,S,S,S)),h.push(s(C,x,S*3.35,S,S,S)),f.push(s(C,x,S*4.95,S,S,S));let I=A*(4.8+l()*1.6);if(l()<.35)_.push(s(T,I,.16,.46,.32,.57)),p.push(s(T,I,.3,.38,.24,.45));else{let D=s(T,I,.22,.38,.47,.38);m.push(D)}y.push(s(T+l(),A*(3.2+l()*.85),.027,.1,.007,.19))}for(let T=0;T<a;T+=17){let A=Math.floor(T/17)%2?-1:1;M.push(s(T,A*4.55,.49)),v.push(s(T,A*4.55,.73))}let P=[];for(let T=24;T<a;T+=55)for(let A of[-1,1])P.push(s(T,A*33,1,13,7+3*Math.sin(T),18));n(new Be(1,0),"#819e91",P,"forest-ridge"),n(new ue(.18,.29,3.2,8),"#79644c",c,"fir-trunks"),n(new We(1.85,3.7,8),"#355e51",h,"fir-boughs"),n(new We(1.35,3.25,8),"#63865f",f,"fir-tops"),n(new ue(.14,.2,4.2,8),"#ded8ba",d,"birch-trunks"),n(new ue(.19,.2,.085,8),"#817b67",g,"birch-bark"),n(new Be(1,1),"#9cb668",u,"birch-leaves"),n(new Be(1,0),"#8b8876",_,"verge-rocks"),n(new Be(1,0),"#83905e",p,"rock-moss"),n(new We(1,1,5),"#668451",m,"forest-floor"),n(new Be(1,0),"#a98853",y,"fallen-leaves"),n(new Te(.17,.98,.17),"#8a785e",M,"waymarks"),n(new Te(.177,.16,.177),"#eabd76",v,"trail-blazes")}function Mu(i,t){let e=t(new ue(.32,.34,1.95,12),"#74583f",0,.34,0,i);e.rotation.z=Math.PI/2,e.castShadow=!0;for(let n of[-1,1]){let s=n*.978,r=t(new ue(.294,.294,.012,16),"#cdab74",s,.34,0,i);r.rotation.z=Math.PI/2;let a=t(new pn(.18,.015,5,18),"#a48255",s+n*.011,.34,0,i);a.rotation.y=Math.PI/2}}function zx(i,t,e,n,s,r,a=2){let o=[],l=[],c=Math.ceil((r-s)/a);for(let f=0;f<=c;f++){let d=s+(r-s)*f/c,u=i(d,-6.8-.6*Math.sin(d/8)-.35*Math.sin(d/3));for(let g of[e,t])o.push(u.x-g,n,u.z);if(f<c){let g=2*f;l.push(g,g+1,g+2,g+1,g+3,g+2)}}let h=new xe;return h.setAttribute("position",new qt(o,3)),h.setIndex(l),h.computeVertexNormals(),h}function bu(i,{mesh:t,box:e,pose:n,instances:s,groupAt:r,ribbon:a}){let{point:o,length:l}=i;e(1100,.12,1400,"#e7cd98",0,-.1,-200);let c=(y,M,v,P,T)=>{t(zx(o,y,M,v,-210,l+220),P).name=T};c(-1.7,0,-.007,"#c8b994","wet-sand"),c(0,320,.008,"#469eae","ocean"),c(0,2.8,.013,"#9edbd0","shallows"),c(2.8,10,.012,"#7fbcb7","coastal-water"),c(-.1,.19,.025,"#f5f1d9","surf-line"),t(a(0,7.5,.015,-15,l+30,o),"#eacb95").name="continuous-road";for(let y of i.sand){let M=r(y.s,y.lane*2);M.name="soft-sand",t(new ue(1,1,.025,36),"#c9a574",0,.018,0,M).scale.set(y.halfWidth,1,y.halfLength);for(let P=-2;P<=2;P++){let T=t(new ze(1,9,5),"#bfa077",.09*Math.sin(P),.034,P*1.55,M);T.scale.set(.38,.022,.085),T.rotation.y=.2*Math.sin(P+1)}}let h=[],f=[],d=[],u=[],g=[],_=[[],[]];for(let y=-30;y<l+75;y+=5.5){let M=o(y,-6.8-.6*Math.sin(y/8)-.35*Math.sin(y/3));for(let v=0;v<3;v++)h.push([M.x-1.6-v*7.8-1.1*Math.cos(y+v),.027,M.z+Math.sin(y*.32+v),.09+.04*v,.012,.65+.5*(1+Math.sin(y)),-.35*Math.sin(y*.1)])}for(let y=0;y*13<=l+8;y++){let M=y*13;for(let v of[-1,1])f.push(n(M,v*4.2,.48)),d.push(n(M,v*4.2+.15,.83))}for(let y=0;y*18<l+50;y++){let M=y*18-15;u.push(n(M,12+2*Math.sin(y),-.15,3.6+y%3,.9,5)),y%3===1&&(g.push(n(M,9,1.3)),_[y%2].push(n(M,9,2.6)))}s(new ze(1,9,5),"#cce4db",h,"whitecaps"),s(new ue(.045,.055,.96,8),"#a58562",f,"beach-stakes"),s(new Te(.3,.18,.035),"#e57e5b",d,"course-pennants"),s(new Be(1,1),"#d6bd8e",u,"dunes"),s(new ue(.065,.075,2.6,8),"#9f8668",g,"parasol-poles");for(let y=0;y<2;y++)s(new We(1.8,.65,10),["#d87559","#478b91"][y],_[y],"parasols");let p=r(l*.63,-30);t(new Be(1,0),"#849b88",0,.2,0,p).scale.set(7,2.4,5);for(let[y,M,v,P]of[[1.6,3.6,1.25,"#f4e5c3"],[5.2,1,1.12,"#c3654a"],[6.2,1.6,1.05,"#f4e5c3"],[7.8,.85,.93,"#497b86"]])t(new ue(v*.94,v,M,10),P,0,y+M/2,0,p);t(new We(1.28,.85,10),"#b75e45",0,9.06,0,p);for(let y of[45,164,296,435]){let M=r(y,-8);M.position.x-=20+7*Math.sin(y),M.rotation.y+=.5,t(new ze(1,12,8),"#9b6650",0,.24,0,M).scale.set(.66,.38,2.2),e(.07,3.7,.07,"#927763",0,2,0,M);let P=new Xn;P.moveTo(0,0),P.lineTo(1.65,0),P.lineTo(0,3.1),P.closePath();let T=t(new ys(P),"#fbefd6",0,.7,.08,M);T.rotation.y=Math.PI/2,T.material.side=Ie}}function Su(i,t){function e(n,s,r,a,o,l,c){let h=t(new ue(n,s,r,12),c,a,o,0,i);return h.rotation.z=l,h.castShadow=!0,h}e(.32,.3,1.92,0,.34,Math.PI/2,"#886246");for(let n of[-.963,.963])e(.26,.26,.012,n,.34,Math.PI/2,"#d1ad77");e(.087,.13,.36,.51,.56,-.9,"#8c694d")}var wu=i=>new Je({color:i,roughness:1});function _r(i,t,e,n=-15,s=510,r=ui){let a=[],o=[],l=Math.ceil(s-n);for(let h=0;h<=l;h++){let f=n+(s-n)*h/l;for(let d of[-1,1]){let u=r(f,i+d*t/2);a.push(u.x,e,u.z)}if(h<l){let d=h*2;o.push(d,d+1,d+2,d+1,d+3,d+2)}}let c=new xe;return c.setAttribute("position",new qt(a,3)),c.setIndex(o),c.computeVertexNormals(),c}function Tu(i){let t=new Re;t.name=(i.theme||"park")+"-race-track";let e=i.point||ui,n=i.length||ie.length,s=n+30,r=i.theme==="field";function a(y,M,v=0,P=0,T=0,A=t){let C=new fe(y,wu(M));return C.position.set(v,P,T),C.receiveShadow=!0,A.add(C),C}function o(y,M,v,P,T,A,C,b=t){return a(new Te(y,M,v),P,T,A,C,b)}function l(y,M=0){let v=e(y,M),P=new Re;return P.position.set(v.x,0,v.z),P.rotation.y=-v.heading,t.add(P),P}function c(y,M,v,P=1,T=1,A=1){let C=e(y,M);return[C.x,v,C.z,P,T,A,-C.heading]}function h(y,M,v,P){let T=new Pi(y,wu(M),v.length),A=new Ne;T.name=P;for(let C=0;C<v.length;C++){let b=v[C];A.position.set(b[0],b[1],b[2]),A.scale.set(b[3]??1,b[4]??1,b[5]??1),A.rotation.set(0,b[6]??0,0),A.updateMatrix(),T.setMatrixAt(C,A.matrix)}return T.receiveShadow=!0,t.add(T),T}if(i.theme==="beach")bu(i,{mesh:a,box:o,pose:c,instances:h,groupAt:l,ribbon:_r});else if(i.theme==="forest")vu(i,{mesh:a,box:o,pose:c,instances:h,ribbon:_r});else if(i.theme==="park")mu({root:t,routePoint:e,end:s,ribbon:_r,mesh:a,box:o,groupAt:l,instances:h,pose:c});else{o(800,.12,800,"#9fb681",50,-.12,-200),a(_r(0,7.6,.015,-15,s,e),r?"#b4c49a":"#cfbc95").name="continuous-road";for(let C of[-3.7,3.7])a(_r(C,.08,.025,-15,s,e),"#e6d7b6");let y=[];for(let C=-12;C<s;C+=5)for(let b of[-1,1])y.push(c(C,b,.025));h(new Te(.035,.015,1.5),"#e3d5b5",y,"lane-markings");let M=[],v=[],P=[],T=[],A=[];for(let C=-12;C<s;C+=4)for(let b of[-1,1])T.push(c(C,b*4.4,.6));for(let C=-12;C<s;C+=2)for(let b of[-1,1]){let x=e(C,b*4.4),S=e(C+2,b*4.4);A.push([(x.x+S.x)/2,.75,(x.z+S.z)/2,1,1,Math.hypot(S.x-x.x,S.z-x.z)+.04,-Math.atan2(S.x-x.x,x.z-S.z)])}for(let C=-10;C<s;C+=11)for(let b of[-1,1]){let x=b*(7+Math.abs(C)%4*.6);M.push(c(C,x,1)),v.push(c(C,x,2.5,1.3,1.5,1.3)),P.push(c(C+.4,x+.45,3.2,1,1.2,1))}h(new ue(.13,.17,2,7),"#8e7c54",M,"tree-trunks"),h(new ze(1,10,7),"#79985f",v,"tree-crowns"),h(new ze(1,10,7),"#8caa6a",P,"tree-caps"),h(new Te(.1,1.2,.1),"#d7c6a2",T,"fence-posts"),h(new Te(.07,.12,1),"#d7c6a2",A,"fence-rails")}for(let y of i.turns)for(let M of[23,6]){let v=y.direction==="right"?-1:1,P=l(y.start-M,v*4.7);P.name="turn-sign",P.userData.turnId=y.id,o(.12,2.2,.12,"#778566",0,1.1,0,P),o(2.5,1.2,.12,"#315b49",0,2.2,0,P);let T=new Xn;[[-.8,.14],[.12,.14],[.12,.43],[.8,0],[.12,-.43],[.12,-.14],[-.8,-.14]].forEach(([C,b],x)=>x?T.lineTo(C,b):T.moveTo(C,b)),T.closePath();let A=a(new ys(T),"#f5df9f",0,2.2,.071,P);A.material.side=Ie,y.direction==="left"&&(A.scale.x=-1)}for(let y of i.obstacles){let M=l(y.s,y.lane*ie.lanewidth);if(M.name="race-obstacle",M.userData.obstacleId=y.id,y.type==="log")i.theme==="forest"?Mu(M,a):Su(M,a);else if(y.type==="hurdle"&&i.theme==="park"&&y.id%4===0)gu(M,a);else if(y.type==="hurdle"){for(let v of[-.8,.8])o(.1,1.1,.12,"#72929b",v,.55,0,M),o(.42,.08,.6,"#72929b",v,.04,0,M);for(let v=0;v<8;v++)o(.2,.11,.1,v%2?"#c78465":"#f6edda",-.7+v*.2,.74,0,M)}else if(y.type==="hoop"){a(new pn(1.2,.09,10,40),"#d6b35a",0,1.7,0,M);for(let v of[-1.35,1.35])o(.1,2.6,.12,"#72929b",v,1.3,0,M),o(.18,.08,.08,"#78909a",v*.945,1.7,0,M),o(.5,.08,.7,"#72929b",v,.04,0,M)}else if(i.theme==="park")yu(M,a);else{xr(M,a);for(let v of[-1,1])o(.12,.1,6,"#6a97a2",v*1.58,.05,0,M)}}let f=_u().scale(.76,.76,.76),d=new Je({vertexColors:!0,roughness:.93}),u=new Pi(f,d,i.treats.length);u.name="treat-trail",u.visible=i.treats.length>0,t.add(u);function g(){let y=new Ne;for(let M of i.treats){let v=e(M.s,M.lane*ie.lanewidth);y.position.set(v.x,M.y,v.z),y.rotation.set(0,-v.heading,0),y.updateMatrix(),u.setMatrixAt(M.id,y.matrix)}u.instanceMatrix.needsUpdate=!0,i.treats.length&&u.computeBoundingSphere()}function _(y){u.setMatrixAt(y,new ge().makeScale(0,0,0)),u.instanceMatrix.needsUpdate=!0}g();let p=l(n);p.name="finish-gate";for(let y of[-3.6,3.6])o(.18,4,.18,"#607e6c",y,2,0,p);for(let y=0;y<16;y++)for(let M=0;M<2;M++)o(.45,.35,.06,(y+M)%2?"#f6efda":"#486f59",-3.375+y*.45,3.3+M*.35,0,p);let m=[];for(let y=0;y<16;y++)for(let M=0;M<2;M++)(y+M)%2===0&&m.push(c(n-M*.5,-3.75+y*.5,.03));return h(new Te(.5,.012,.5),"#f6f0dc",m,"finish-tiles"),{root:t,treatMesh:u,resetTreats:g,collectTreat:_}}function pi(i,{distance:t=6,height:e=2.8,lookAhead:n=10,lookHeight:s=1}={}){let r=Math.sin(i.heading),a=-Math.cos(i.heading);return{position:{x:i.x-r*t,y:e,z:i.z-a*t},target:{x:i.x+r*n,y:s,z:i.z+a*n}}}function Eu(i){let t=i.filter(s=>s.type==="tunnel"),e=[];function n(s){let r=e.findIndex(l=>l.s>=s);if(r<0)return e.at(-1).x;if(r===0)return e[0].x;let a=e[r-1],o=e[r];return en.lerp(a.x,o.x,(s-a.s)/(o.s-a.s))}return(s,r,a)=>{let{s:o,x:l}=s;for(e.length&&o<e.at(-1).s&&(e.length=0),(!e.length||o-e.at(-1).s>=.1)&&e.push({s:o,x:l});e.length>2&&e[1].s<o-10;)e.shift();let c=ui(o,l),h=t.find(C=>o>C.s-22&&o<C.s+24);if(!h)return pi(c,{distance:r,height:a});let f=o-h.s,d=en.smoothstep(f,-22,-7),u=1-en.smoothstep(f,12,24),g=n(o-r),_=h.lane*ie.lanewidth,p=Math.min(Math.abs(l-_),Math.abs(g-_)),m=d*u*(1-en.smoothstep(p,.85,1.85)),y=en.lerp(r,4.85,m),M=en.lerp(a,1.26,m),v=en.lerp(1,.77,m),P=Math.abs(l-_),T=en.smoothstep(P,.48,.98)*(1-en.smoothstep(P,1.85,2)),A=f-2.55-.18;if(A>0&&A<y&&T>0){let C=T*en.smoothstep(A,0,.66),b=en.lerp(y,A,C),x=b/y,S=M+(v-M)*(b+10)/(y+10),I=pi(c,{distance:b,height:M,lookHeight:S});return I.zoom=x,I}return pi(c,{distance:y,height:M,lookHeight:v})}}var yr=[{id:"park",name:"\u3053\u3046\u3048\u3093",level:"\u3084\u3055\u3057\u3044",lv:0,color:"#a9bd87",desc:"4\u3064\u306E \u307E\u304C\u308A\u304B\u3069\u3092 \u306C\u3051\u3066\u3001\u3053\u3046\u3048\u3093\u3092 \u304B\u3051\u307E\u308F\u308D\u3046",tags:["\u307E\u304C\u308A\u304B\u3069","\u30CF\u30FC\u30C9\u30EB","\u30C8\u30F3\u30CD\u30EB"],sky:"#9ed9ee",fog:[32,107],zenith:[.26,.67,.88],horizon:[.73,.91,.89],ground:"#a9b792",scale:.62,shadow:.55},{id:"beach",name:"\u3046\u307F\u3079",level:"\u3075\u3064\u3046",lv:1,color:"#d4bf88",desc:"\u304A\u3084\u3064\u306E \u308C\u3064\u3092 \u304A\u3044\u304B\u3051\u3066\u3001\u3059\u306A\u306F\u307E\u306E \u308A\u3085\u3046\u307C\u304F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046",tags:["\u308A\u3085\u3046\u307C\u304F","\u3059\u306A\u306F\u307E","\u307F\u3061 \u3048\u3089\u3073"],sky:"#b5dce4",fog:[85,175],zenith:[.2,.66,.85],horizon:[.91,.93,.81],ground:"#c4bc98",scale:.76,shadow:.8,flick:!0},{id:"forest",name:"\u3082\u308A",level:"\u3080\u305A\u304B\u3057\u3044",lv:2,color:"#6d9273",desc:"\u6728\u306E \u3042\u3044\u3060\u3092 \u306F\u3057\u3063\u3066\u3001\u30AB\u30FC\u30D6\u3068 \u307E\u308B\u305F\u3092 \u306E\u308A\u3053\u3048\u3088\u3046",tags:["\u307E\u308B\u305F","\u3064\u3065\u304F \u30AB\u30FC\u30D6","\u30BF\u30A4\u30DF\u30F3\u30B0"],sky:"#c1cfb0",fog:[42,110],zenith:[.42,.69,.7],horizon:[.81,.89,.78],ground:"#97a585",scale:.76,shadow:.8}],cc=i=>yr.find(t=>t.id===i)||yr[0],hc='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',uc='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 6v12M15.5 6v12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',Au=.62;function vr(i){let t=Math.round(i*10),e=Math.floor(t/600),n=Math.floor(t/10)%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}.${t%10}`}var mi=i=>(Math.round(i*100)/100).toFixed(2)+"\u79D2",Mr=i=>Math.round(i*100)*10;function Cu(i){let t=cc(i),e=new fr(t.id).layout,n=e.point||ui,s=e.length||ie.length,r=[];for(let T=0;T<=s;T+=3)r.push(n(Math.min(T,s),0));r.push(n(s,0));let a=r.map(T=>T.x),o=r.map(T=>T.z),l=Math.min(...a),c=Math.max(...a),h=Math.min(...o),f=Math.max(...o),d=76/Math.max(c-l,f-h,1),u=50-(l+c)/2*d,g=50-(h+f)/2*d,_=T=>`${(T.x*d+u).toFixed(1)} ${(T.z*d+g).toFixed(1)}`,p="M"+r.map(_).join("L"),m=(T,A,C,b)=>{let x=n(T,A*ie.lanewidth);return`<circle cx="${(x.x*d+u).toFixed(1)}" cy="${(x.z*d+g).toFixed(1)}" r="${b}" fill="${C}"/>`},y=e.obstacles.map(T=>m(T.s,0,T.type==="tunnel"?"#5f8ea6":T.type==="log"?"#8a6a45":"#c78465",3.2)).join(""),M=t.id==="beach"?'<path d="M0 0h100v100H0z" fill="#d4bf88"/><path d="M78 0h22v100H78z" fill="#7cc3d6"/><path d="M74 0q5 12 0 25t0 25 0 25 0 25h4V0z" fill="#e9ddb3"/>':t.id==="forest"?'<path d="M0 0h100v100H0z" fill="#6d9273"/>'+[[12,14],[86,20],[14,82],[88,76],[50,8],[10,48],[90,50]].map(([T,A])=>`<path d="M${T} ${A-7}l6 11h-12z" fill="#4f7356"/>`).join(""):'<path d="M0 0h100v100H0z" fill="#a9bd87"/>'+[[12,14],[86,18],[12,84],[88,82]].map(([T,A])=>`<circle cx="${T}" cy="${A}" r="6" fill="#86a56a"/>`).join(""),v=r[0],P=r[r.length-1];return`<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${M}<path d="${p}" fill="none" stroke="#f3e9cf" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${p}" fill="none" stroke="#d8c79f" stroke-width="1.4" stroke-dasharray="3 4" stroke-linecap="round"/>${y}
    <circle cx="${(v.x*d+u).toFixed(1)}" cy="${(v.z*d+g).toFixed(1)}" r="4.6" fill="#4fae9a" stroke="#fff" stroke-width="1.6"/>
    <circle cx="${(P.x*d+u).toFixed(1)}" cy="${(P.z*d+g).toFixed(1)}" r="4.6" fill="#ec6c8a" stroke="#fff" stroke-width="1.6"/></svg>`}function dc(i){let t=(s,r,a)=>`<div class="run-hrow"><b aria-hidden="true">${s}</b><div><strong>${r}</strong><span>${a}</span></div></div>`,e={park:"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078\u3002\u30C8\u30F3\u30CD\u30EB\u306E \u4E2D\u3067 \u304B\u3079\u306B \u3076\u3064\u304B\u308B\u3068 \u304A\u305D\u304F \u306A\u308B\u3088",beach:"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078\u3002\u3046\u307F\u3079\u306F \u307F\u3058\u304B\u3044 \u30B9\u30EF\u30A4\u30D7\u3067\u3082 \u3046\u3054\u3051\u308B\u3088",forest:"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078"}[i]||"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078",n={park:"\u30B8\u30E3\u30F3\u30D7\u3002\u30CF\u30FC\u30C9\u30EB\u3092 \u3068\u3073\u3053\u3048\u3088\u3046\u3002\u30C8\u30F3\u30CD\u30EB\u306F \u305D\u306E\u307E\u307E \u306F\u3057\u3063\u3066\u306D",beach:"\u30B8\u30E3\u30F3\u30D7\u3002\u308A\u3085\u3046\u307C\u304F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046\u3002\u3059\u306A\u306E \u4E0A\u306F \u3059\u3053\u3057 \u304A\u305D\u304F \u306A\u308B\u3088",forest:"\u30B8\u30E3\u30F3\u30D7\u3002\u307E\u308B\u305F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046"}[i]||"\u30B8\u30E3\u30F3\u30D7\u3002\u30CF\u30FC\u30C9\u30EB\u30FB\u308A\u3085\u3046\u307C\u304F\u30FB\u307E\u308B\u305F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046";return`<div class="run-hrows">
    ${t("\u2194","\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7",e)}
    ${t("\u21B1","\u307E\u304C\u308A\u304B\u3069","\u3084\u3058\u308B\u3057\u304C \u51FA\u305F\u3089\u3001\u307E\u304C\u308B \u307B\u3046\u3078 \u30B9\u30EF\u30A4\u30D7\u3002\u307E\u304C\u308A\u305D\u3053\u306D\u3066 \u3068\u307E\u3063\u3066\u3082\u3001\u540C\u3058 \u30B9\u30EF\u30A4\u30D7\u3067 \u307E\u305F \u306F\u3057\u308A\u3060\u3059\u3088")}
    ${t("\u2191","\u3046\u3048\u306B \u30B9\u30EF\u30A4\u30D7",n)}
    ${t("\u2193","\u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7","\u3059\u3053\u3057\u3060\u3051 \u30D6\u30EC\u30FC\u30AD")}
    ${t("\u25CF","\u30BF\u30C3\u30D7","\u304A\u3084\u3064\u3092 20\u3053 \u3042\u3064\u3081\u308B\u3068\u3001\u3059\u304D\u306A \u3068\u304D\u306B \u30BF\u30C3\u30D7\u3067 3\u79D2 \u30C0\u30C3\u30B7\u30E5")}
  </div><p class="run-hnote">\u30AD\u30FC\u30DC\u30FC\u30C9\u306F \u3084\u3058\u308B\u3057\u3068 \u30B9\u30DA\u30FC\u30B9\u3067 \u3042\u305D\u3079\u307E\u3059</p>`}function Ru(i){let{container:t,look:e,neckWear:n=null,name:s="\u3046\u3061\u306E\u3053",rivals:r=[],art:a="",best:o=null,next:l=null,onExit:c=()=>{},onSelect:h=null,onNext:f=null,onFinish:d=()=>null}=i,u=cc(i.course),g=u.id,_=g==="park",p=new fr(g),m=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches),y=_?Eu(p.layout.obstacles):null,M=p.layout.point||ui,v=p.layout.length||ie.length,P=p.cpus.length+1,T=i.petScale||u.scale,A=l&&yr.some(N=>N.id===l)?cc(l):null,C=0,b=null,x=null,S=null,I=null,D=null,B=0,W=0,H=0,st=0,O=!1,Q=null,pt=null,it=0,ht=6,yt="",X="",nt=!1,ft=[],k=new Map([[p.player.id,`${s}<small>\uFF08\u3046\u3061\u306E\u3053\uFF09</small>`],...p.cpus.map((N,Y)=>[N.id,r[Y]?r[Y].label:"\u304A\u3068\u3082\u3060\u3061"])]);t.className="run-root",t.dataset.course=g,t.innerHTML=`<canvas class="run-canvas" tabindex="0" aria-label="${u.name}\u306E \u30EC\u30FC\u30B9\u3002\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u30EC\u30FC\u30F3\u3068 \u307E\u304C\u308A\u304B\u3069\u3001\u3046\u3048\u3067 \u30B8\u30E3\u30F3\u30D7\u3001\u3057\u305F\u3067 \u30D6\u30EC\u30FC\u30AD\u3001\u304A\u3084\u3064\u304C \u305F\u307E\u3063\u305F\u3089 \u30BF\u30C3\u30D7\u3067 \u30C0\u30C3\u30B7\u30E5"></canvas>
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
          <i class="run-fill" data-q="fill"></i>${p.cpus.map((N,Y)=>`<i class="run-mark" data-row="${Y}" aria-hidden="true"></i>`).join("")}<i class="run-me" aria-hidden="true"></i>
        </div>
        <div class="run-chip run-clock" data-q="clock">00:00.0</div>
      </div>
    </div>
    <div class="run-cue" data-q="cue" role="status" hidden></div>
    <div class="run-count" data-q="count" aria-live="polite"></div>
    <div class="run-bottom">
      <div class="run-gauge-l">${lc}<b data-q="hint">\u30C0\u30C3\u30B7\u30E5</b></div>
      <div class="run-gauge" role="meter" aria-label="\u30C0\u30C3\u30B7\u30E5\u306E \u30B2\u30FC\u30B8" aria-valuemin="0" aria-valuemax="${ie.gaugeMax}" aria-valuenow="0"><i data-q="gauge"></i></div>
      <b class="run-gauge-n" data-q="gaugeN">0 / ${ie.gaugeMax}</b>
    </div>
    <div class="run-over" data-q="over" role="dialog" aria-modal="true" aria-label="\u30E9\u30F3\u306E \u30E1\u30CB\u30E5\u30FC" hidden></div>`;let tt=N=>t.querySelector(`[data-q="${N}"]`),rt=N=>t.querySelector(`[data-run="${N}"]`),mt=t.querySelector(".run-canvas"),Et=tt("over"),Ut=t.querySelectorAll(".run-mark"),St=t.querySelector(".run-me");function U(){b=new ms({canvas:mt,antialias:!0,powerPreference:"high-performance"}),b.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),b.outputColorSpace=Ze,b.shadowMap.enabled=!0,b.shadowMap.type=rr,b.toneMapping=ar,b.toneMappingExposure=1,x=new xs,x.background=new zt(u.sky),x.fog=new gs(u.sky,u.fog[0],u.fog[1]),S=new Xe(60,1,.1,180),x.add(new bs("#fffaf0",u.ground,2.1)),I=new Ss("#fff7ea",2.1),I.castShadow=!0,I.shadow.mapSize.set(1024,1024),Object.assign(I.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.5,far:45}),I.shadow.bias=-3e-4,I.shadow.normalBias=.03,x.add(I,I.target);let N=new fe(new ze(134,24,12),new tn({side:Ge,depthWrite:!1,uniforms:{zenith:{value:new F(...u.zenith)},horizon:{value:new F(...u.horizon)}},vertexShader:"varying float altitude; void main(){altitude=position.y/134.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform vec3 zenith; uniform vec3 horizon; varying float altitude; void main(){vec3 sky=mix(horizon,zenith,smoothstep(-.035,.34,altitude));gl_FragColor=vec4(sky,1.);}"}));N.name="park-sky",N.renderOrder=-10,x.add(N),D=Tu(p.layout),x.add(D.root);let Y=new Rn({colorWrite:!1}),xt=new ci(u.shadow,24),_t=new Je({color:"#536848",transparent:!0,opacity:.15});[{look:e,neck:n,detail:1},...p.cpus.map((Bt,At)=>({look:r[At]&&r[At].look||e,neck:null,detail:.6}))].forEach((Bt,At)=>{let Jt=Rs(Bt.look,Bt.neck,{detail:Bt.detail});Jt.scale.setScalar(T),Jt.rotation.y=Math.PI;let Z=[],et=[];if(At){let lt=[];Jt.traverse(ct=>{ct.isMesh&&lt.push(ct)});for(let ct of lt){ct.castShadow=!1;for(let It of[].concat(ct.material))Z.includes(It)||(It.transparent=!0,Z.push(It));let ut=new fe(ct.geometry,Y);ut.renderOrder=1,ut.visible=!1,ut.castShadow=!1,ut.frustumCulled=ct.frustumCulled,ct.add(ut),et.push(ut)}}let $=new fe(xt,_t);$.rotation.x=-Math.PI/2,x.add(Jt,$),ft.push({pet:Jt,shadow:$,mats:Z,depth:et,fade:1})}),S.position.set(0,2.8,6),jt()}function jt(){if(!b)return;let N=t.getBoundingClientRect();N.width<1||N.height<1||(b.setSize(N.width,N.height,!1),S.aspect=N.width/N.height,S.fov=N.width>N.height?54:60,S.updateProjectionMatrix(),H=0)}function Ft(N,Y,xt){if(Et.hidden=N==null,Et.className="run-over"+(xt?" "+xt:""),t.classList.toggle("menu",N!=null),Et.innerHTML=N==null?"":`<div class="run-card">${N}</div>`,$t(),N!=null){let _t=Et.querySelector(Y||".btn.primary")||Et.querySelector("button");if(_t)try{_t.focus({preventScroll:!0})}catch{}}return Et}function $t(){let N=p.status==="running"||p.status==="countdown";rt("pause").hidden=!N||!Et.hidden,rt("help").hidden=N&&Et.hidden||nt}let Ot=()=>h?'<button class="btn" type="button" data-m="select">\u30B3\u30FC\u30B9\u3092 \u3048\u3089\u3076</button>':"";function le(N){let Y=N.querySelector('[data-m="select"]');Y&&Y.addEventListener("click",()=>h())}function Gt(){pt=null;let N=Ft(`<span class="run-over-l">\u30EC\u30FC\u30B9\u30FB${u.level}</span><h2>${u.name}</h2>
      <p class="run-sub">${s}\u3068 \u304A\u3068\u3082\u3060\u3061 ${P-1}\u3072\u304D\u3067\u3001<br>\u30B4\u30FC\u30EB\u307E\u3067 \u304D\u3087\u3046\u305D\u3046\uFF01</p>
      ${o?`<p class="run-best">\u30D9\u30B9\u30C8 <b>${mi(o)}</b></p>`:""}
      <div class="btnrow">${Ot()}<button class="btn primary" type="button" data-m="go">\u306F\u3057\u308B</button></div>`,'[data-m="go"]',"top");N.querySelector('[data-m="go"]').addEventListener("click",q),le(N)}function R(N){pt=N,Ft(`<h2>\u3042\u305D\u3073\u304B\u305F</h2>${dc(g)}<div class="btnrow"><button class="btn primary" type="button" data-m="ok">\u308F\u304B\u3063\u305F</button></div>`).querySelector('[data-m="ok"]').addEventListener("click",w)}function w(){let N=pt;pt=null,N&&N()}function q(){Q=null,pt=null,Ft(null),p.start(),ee(),$t();try{mt.focus({preventScroll:!0})}catch{}}function at(){if(Q=null,p.pause(),p.status!=="paused")return;pt=null;let N=Ft(`<h2>\u3072\u3068\u3084\u3059\u307F</h2><p class="run-sub">${u.name}\u306E \u3068\u3061\u3085\u3046\u3060\u3088</p>
      <div class="btnrow"><button class="btn" type="button" data-m="restart">\u3055\u3044\u3057\u3087\u304B\u3089</button><button class="btn primary" type="button" data-m="resume">\u3064\u3065\u3051\u308B</button></div>
      ${h?`<div class="btnrow run-more">${Ot()}</div>`:""}`,'[data-m="resume"]');N.querySelector('[data-m="resume"]').addEventListener("click",dt),N.querySelector('[data-m="restart"]').addEventListener("click",ot),le(N),ee()}function dt(){Ft(null),p.resume(),W=performance.now(),ee(),$t();try{mt.focus({preventScroll:!0})}catch{}}function ot(){p.reset(),D.resetTreats(),S.position.set(0,2.8,6),ht=6,W=performance.now(),C++,Dt=null,q()}let Dt=null;function bt(N){let Y=p.result,xt=Y.rank===1,_t=Y.standings.map(({id:ct,time:ut},It)=>`<li${ct===p.player.id?' class="me"':""}><span>${It+1}\u4F4D</span><span>${k.get(ct)}</span><b>${mi(ut)}</b></li>`).join(""),Bt=A&&f?`<button class="btn primary run-next" type="button" data-m="next" aria-label="\u3064\u304E\u306E \u30B3\u30FC\u30B9\u300C${A.name}\u300D\u3078">\u3064\u304E\u306E \u30B3\u30FC\u30B9\u3078<small>${A.name}</small></button>`:"",At=`<button class="btn${Bt?"":" primary"}" type="button" data-m="exit">\u304A\u308F\u308B</button>`,Jt=(h?Ot():"")+(Bt?At:""),Z=Ft(`<span class="run-over-l">${u.name}</span>
      <div class="run-res">${a?`<div class="run-art" aria-hidden="true">${a}</div>`:""}<div class="run-rankbig"><b>${Y.rank}</b><span>\u4F4D / ${P}\u3072\u304D</span></div></div>
      <h2>${xt?"\u3044\u3061\u3070\u3093\u3067 \u30B4\u30FC\u30EB\uFF01":"\u3055\u3044\u3054\u307E\u3067 \u306F\u3057\u3063\u305F\u306D\uFF01"}</h2>
      <div class="run-stats">
        <div><span>\u30BF\u30A4\u30E0</span><b>${mi(Y.time)}</b></div><div><span>\u304A\u3084\u3064</span><b>${Y.treats}\u3053</b></div>
        <div><span>\u30C0\u30C3\u30B7\u30E5</span><b>${Y.dashes}\u56DE</b></div><div><span>\u3054\u3064\u3093</span><b>${Y.hits}\u56DE</b></div>
      </div>
      <p class="run-sub">\u307E\u304C\u308A\u305D\u3053\u306D ${Y.turnMisses}\u56DE</p>
      <div class="run-rec" data-q="rec" role="status">${Dt??'<span class="run-rec-wait">\u304D\u308D\u304F \u3057\u3066\u3044\u308B\u3088\u2026</span>'}</div>
      <details class="run-order"><summary>${P}\u3072\u304D\u306E \u3058\u3085\u3093\u3044\u3068 \u30BF\u30A4\u30E0</summary><ol>${_t}</ol></details>
      <div class="btnrow"><button class="btn" type="button" data-m="again">\u3082\u3046\u3044\u3061\u3069</button>${Bt||At}</div>
      ${Jt?`<div class="btnrow run-more">${Jt}</div>`:""}`,'[data-m="again"]');Z.querySelector('[data-m="again"]').addEventListener("click",ot),Z.querySelector('[data-m="exit"]').addEventListener("click",()=>c());let et=Z.querySelector('[data-m="next"]');if(et&&et.addEventListener("click",()=>f(A.id)),le(Z),!N)return;Dt=null;let $=++C,lt;try{lt=d({course:g,ms:Mr(Y.time),time:Y.time,rank:Y.rank,misses:Y.hits+Y.turnMisses,treats:Y.treats,hits:Y.hits,turnMisses:Y.turnMisses})}catch{lt=null}Promise.resolve(lt).then(ct=>ct,()=>null).then(ct=>{if(O||$!==C)return;Dt=ct||"";let ut=tt("rec");ut&&(ut.innerHTML=Dt)})}function wt(N,Y){Q=null,p.pause(),nt=!0,Ft(`<h2>${N}</h2><p class="run-sub">${Y}</p><div class="btnrow"><button class="btn primary" type="button" data-m="exit">\u3068\u3058\u308B</button></div>`).querySelector('[data-m="exit"]').addEventListener("click",()=>c())}function ee(){tt("rank").textContent=p.rank,tt("treats").textContent=p.treatCount;let N=Math.min(100,p.player.s/v*100);tt("fill").style.width=N+"%",t.querySelector(".run-progress").setAttribute("aria-valuenow",Math.round(N)),tt("clock").textContent=vr(p.time),St.hidden=p.status==="paused",St.style.left=N+"%",p.cpus.forEach((Bt,At)=>{Ut[At].style.left=Math.max(0,Math.min(100,Bt.s/v*100))+"%"});let Y=p.player.boost>0,xt=p.gauge===ie.gaugeMax&&!Y;tt("gaugeN").textContent=Y?`${p.player.boost.toFixed(1)}\u79D2`:`${p.gauge} / ${ie.gaugeMax}`,tt("gauge").style.width=p.gauge/ie.gaugeMax*100+"%",t.querySelector(".run-gauge").setAttribute("aria-valuenow",p.gauge),t.classList.toggle("dash-ready",xt),t.classList.toggle("boosting",Y),tt("hint").textContent=Y?"\u30C0\u30C3\u30B7\u30E5\u3061\u3085\u3046":xt?"\u30BF\u30C3\u30D7\u3067 \u30C0\u30C3\u30B7\u30E5":"\u30C0\u30C3\u30B7\u30E5",gt();let _t=p.status==="countdown"?String(Math.ceil(p.countdown)):"";_t!==yt&&(yt=_t,tt("count").textContent=_t,tt("count").classList.toggle("show",!!_t))}function gt(){let N=p.status==="running"?p.turnCue:null,Y=tt("cue");if(Y.hidden=!N,t.classList.toggle("turn-visible",!!N),!N){X="";return}let xt=N.direction==="right",_t=xt?"\u307F\u304E":"\u3072\u3060\u308A",Bt=N.waiting?"waiting":N.armed?"armed":N.active?"active":"ahead",At=N.waiting?`${_t}\u3078 \u30B9\u30EF\u30A4\u30D7`:N.armed?p.player.s>=N.start?`${_t}\u30AB\u30FC\u30D6`:`${_t}\u3078 OK`:N.active?`${_t}\u3078 \u30B9\u30EF\u30A4\u30D7`:`\u3053\u306E \u3055\u304D ${_t}\u30AB\u30FC\u30D6`,Jt=`${N.id}:${Bt}:${At}`;Jt!==X&&(X=Jt,Y.dataset.state=Bt,Y.innerHTML=`<strong aria-hidden="true">${xt?"\u21B1":"\u21B0"}</strong><span><small>\u307E\u304C\u308A\u304B\u3069 ${N.id+1} / ${p.layout.turns.length}</small><b>${At}</b></span>${N.armed?'<i aria-hidden="true">\u2713</i>':""}`)}function Pt(N){if(O)return;B=requestAnimationFrame(Pt);let Y=W?Math.max(0,Math.min(.2,(N-W)/1e3)):0;W=N;let xt=Math.max(1,Math.ceil(Y/.05));for(let $=0;$<xt;$++)p.step(Y/xt);for(let $ of p.drainEvents())$.type==="treat"?D.collectTreat($.id):$.type==="finish"&&bt(!0);if(!(p.status==="running"||p.status==="countdown")&&H&&N-H<100)return;H=N||1;let Bt=La(p,!1);[p.player,...p.cpus].forEach(($,lt)=>{if(p.status==="paused")return;let ct=ft[lt],{pet:ut,shadow:It}=ct,Kt=lt===0&&p.waitingTurn!==null;if(lt){let ke=p.player.s-$.s,Ee=ke>.4&&ke<ht+.5&&Math.abs($.x-p.player.x)<1.35?.32:1;if(ct.fade!==Ee){ct.fade+=(Ee-ct.fade)*Math.min(1,Y*8||1),Math.abs(ct.fade-Ee)<.01&&(ct.fade=Ee);for(let ye of ct.mats)ye.opacity=ct.fade;for(let ye of ct.depth)ye.visible=ct.fade<1}}let Wt=p.status==="running"&&$.finishTime===null&&!Kt,te=M($.s,$.x),De=$n($.s,0,0,p.layout.turns);ut.position.set(te.x,$.y+(Wt&&!m?Math.abs(Math.cos($.phase*1.85))*.025:0),te.z),ut.rotation.order="YXZ",ut.rotation.x=0,ut.rotation.y=Math.PI-te.heading,ut.rotation.z=Wt&&!m?($.lane*ie.lanewidth-$.x)*.07+(De?De.direction==="right"?.08:-.08:0):0,Da(ut,$.phase,Wt,$.jumpElapsed!==null,Bt),Is(ut,N/1e3+lt,Wt,{legs:!1,phase:$.phase,airborne:$.jumpElapsed!==null,reduced:m}),It.position.set(te.x,.035,te.z),It.scale.setScalar($.jumpElapsed!==null?.7:1)});let At=p.player;ht+=((_?Math.min(8.65,Math.max(6,3.58/S.aspect)):6)-ht)*(1-Math.exp(-Y*5));let Jt=M(At.s,At.x),Z;if(_)Z=y(At,ht,2.8+(m?0:At.y*.18));else{let $=S.position.y+(2.8+(m?0:At.y*.18)-S.position.y)*(1-Math.exp(-Y*6));Z=pi(Jt,{distance:ht,height:$,lookHeight:1})}S.position.set(Z.position.x,Z.position.y,Z.position.z),S.lookAt(Z.target.x,Z.target.y,Z.target.z);let et=Z.zoom??1;Math.abs(S.zoom-et)>1e-5&&(S.zoom=et,S.updateProjectionMatrix()),x.getObjectByName("park-sky").position.copy(S.position),I.position.set(Jt.x-7,12,Jt.z+6),I.target.position.set(Jt.x,0,Jt.z),st+=Y,st>.08||p.status==="countdown"?(ee(),st=0):!_&&p.status==="running"&&gt(),b.render(x,S),it++}function Nt(N){if(!(!N.isPrimary||p.status!=="running"||Q)){Q={id:N.pointerId,x:N.clientX,y:N.clientY,time:performance.now(),used:!1,tap:!0};try{mt.setPointerCapture(N.pointerId)}catch{}}}function Yt(N,Y){if(!Q||Q.id!==N.pointerId||Q.used)return;let xt=N.clientX-Q.x,_t=N.clientY-Q.y;Math.hypot(xt,_t)>=12&&(Q.tap=!1);let Bt=Oa(xt,_t,performance.now()-Q.time,!!u.flick);!Bt||Bt==="dash"&&(!Y||!Q.tap)||(Q.used=!0,p.input(Bt))}let Rt=N=>Yt(N,!1),se=N=>{Q&&Q.id===N.pointerId&&(Q=null)},Qt=N=>{Yt(N,!0),se(N)};function ce(N){if(N.target&&N.target.closest&&N.target.closest("button,summary"))return;let Y={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"jump",ArrowDown:"brake"," ":"dash"};Y[N.key]&&(N.preventDefault(),N.repeat||p.input(Y[N.key]))}let z=()=>{document.hidden&&at()},vt=N=>{O||(N.preventDefault(),wt("3D\u306E \u304C\u3081\u3093\u304C \u3068\u307E\u3063\u305F\u3088","\u3044\u3061\u3069 \u3068\u3058\u3066\u3001<br>\u3082\u3046\u3044\u3061\u3069 \u3072\u3089\u3044\u3066\u306D"))};mt.addEventListener("pointerdown",Nt),mt.addEventListener("pointermove",Rt),mt.addEventListener("pointerup",Qt),mt.addEventListener("pointercancel",se),mt.addEventListener("lostpointercapture",se),mt.addEventListener("webglcontextlost",vt),t.addEventListener("keydown",ce),rt("x").addEventListener("click",()=>{p.status==="running"||p.status==="countdown"?at():c()}),rt("pause").addEventListener("click",at),rt("help").addEventListener("click",()=>{if(pt)return;let N=p.status;R(N==="paused"?at:N==="finished"?()=>bt(!1):Gt)}),document.addEventListener("visibilitychange",z),addEventListener("blur",at),addEventListener("pagehide",at),addEventListener("resize",jt);let j=typeof ResizeObserver=="function"?new ResizeObserver(jt):null;j&&j.observe(t);let L=!0;try{U(),Gt(),B=requestAnimationFrame(Pt)}catch(N){L=!1,console.error("run: 3D unavailable",N),wt("3D\u306E \u304C\u3081\u3093\u3092 \u3072\u3089\u3051\u307E\u305B\u3093\u3067\u3057\u305F","\u3053\u306E\u7AEF\u672B\u3067\u306F \u3042\u305D\u3079\u306A\u3044\u307F\u305F\u3044")}return{ok:L,get sim(){return p},get renderer(){return b},get frames(){return it},get status(){return nt?"lost":p.status},course:g,pause:at,escape(){return nt?!1:pt?(w(),!0):p.status==="running"||p.status==="countdown"?(at(),!0):!1},dispose(){if(O)return;O=!0,cancelAnimationFrame(B),mt.removeEventListener("webglcontextlost",vt),j&&j.disconnect(),document.removeEventListener("visibilitychange",z),removeEventListener("blur",at),removeEventListener("pagehide",at),removeEventListener("resize",jt);for(let{pet:xt}of ft)Ps(xt);let N=new Set,Y=new Set;x&&x.traverse(xt=>{xt.geometry&&N.add(xt.geometry),xt.material&&[].concat(xt.material).forEach(_t=>Y.add(_t)),xt.isInstancedMesh&&xt.dispose()}),N.forEach(xt=>xt.dispose()),Y.forEach(xt=>xt.dispose()),I&&I.dispose(),b&&(b.dispose(),b.forceContextLoss()),t.innerHTML=""}}}var kx=Math.PI*10/2,Vx=[{straight:48},{turn:1},{straight:34},{turn:1},{straight:44},{turn:1},{straight:24},{turn:1},{straight:30}],fc=-24,pc=24,Oi=0,za=0,Iu=Vx.map(i=>{let t=i.straight??kx,e={start:za,end:za+t,x:fc,z:pc,heading:Oi,radius:10,turn:i.turn||0};if(i.turn){let n=Oi+i.turn*Math.PI/2;fc+=10/i.turn*(Math.cos(Oi)-Math.cos(n)),pc+=10/i.turn*(Math.sin(Oi)-Math.sin(n)),Oi=n}else fc+=Math.sin(Oi)*t,pc-=Math.cos(Oi)*t;return za+=t,e}),Pu=za,Lu={minX:-38,maxX:44,minZ:-48,maxZ:44};function mc(i,t=0){let e=Iu.find(o=>i<=o.end)||Iu.at(-1),n=i-e.start,{x:s,z:r,heading:a}=e;if(e.turn){let o=a+e.turn*n/e.radius;s+=e.radius/e.turn*(Math.cos(a)-Math.cos(o)),r+=e.radius/e.turn*(Math.sin(a)-Math.sin(o)),a=o}else s+=Math.sin(a)*n,r-=Math.cos(a)*n;return{x:s+Math.cos(a)*t,z:r+Math.sin(a)*t,heading:a}}var Le=Object.freeze({count:6,spacing:3.6,offset:.9,speed:8,approach:4,exit:1.6,minOffset:.48,maxOffset:1.35}),Sn=(i,t)=>i.s+(t-(Le.count-1)/2)*Le.spacing,Us=(i,t)=>(i.startSide??-1)*(t%2?-1:1),ka=i=>Sn(i,0)-Le.approach,Va=i=>Sn(i,Le.count-1)+Le.exit;var Bi={length:Pu,speed:11.25,penalty:5};function Hx(){return{length:Bi.length,point:mc,bounds:Lu,theme:"field",turns:[],treats:[],obstacles:[{id:0,s:24,lane:0,type:"hurdle"},{id:1,s:76,lane:-1,type:"hoop"},{id:2,s:130,lane:1,type:"tunnel"},{id:3,s:148,lane:0,type:"hurdle"},{id:4,s:187,lane:1,type:"hoop"},{id:5,s:226,lane:0,type:"tunnel"}]}}function Gx(i="first-field"){let t=Hx();return t.courseId=["balance","zigzag","hill-field"].includes(i)?i:"first-field",i==="balance"&&(t.obstacles=[{id:0,s:24,lane:0,type:"hoop"},{id:1,s:76,lane:-1,type:"seesaw"},{id:2,s:130,lane:1,type:"tunnel"},{id:3,s:148,lane:0,type:"hurdle"},{id:4,s:187,lane:1,type:"hoop"},{id:5,s:226,lane:0,type:"seesaw"}]),i==="zigzag"&&(t.obstacles=[{id:0,s:24,lane:0,type:"hurdle"},{id:1,s:80,lane:0,type:"slalom",startSide:-1},{id:2,s:130,lane:1,type:"tunnel"},{id:3,s:148,lane:0,type:"hurdle"},{id:4,s:185,lane:0,type:"slalom",startSide:1},{id:5,s:226,lane:0,type:"hoop"}]),i==="hill-field"&&(t.length=196,t.obstacles=[{id:0,s:18,lane:0,type:"a-frame"},{id:1,s:38,lane:1,type:"hurdle"},{id:2,s:81,lane:-1,type:"tunnel"},{id:3,s:130,lane:-1,type:"a-frame"},{id:4,s:150,lane:0,type:"hoop"},{id:5,s:185,lane:1,type:"hurdle"}]),t}var br=class{constructor(t="first-field"){this.layout=Gx(t),this.reset()}reset(){this.status="ready",this.previousStatus=null,this.countdown=3,this.time=0,this.stopped=!1,this.player={id:"player",s:0,x:0,lane:0,y:0,surfaceY:0,pitch:0,jumpElapsed:null,phase:0,slow:0,boost:0,finishTime:null,hits:0},this.cpus=[],this.results=new Map,this.tunnelEntries=new Map,this.rampPass=null,this.seesaws=new Map(this.layout.obstacles.filter(t=>t.type==="seesaw").map(t=>[t.id,{phase:"idle",angle:_e.angle,elapsed:0,failed:!1}])),this.slaloms=new Map(this.layout.obstacles.filter(t=>t.type==="slalom").map(t=>[t.id,{index:0,side:0,passed:[],failed:!1}])),this.cleared=0,this.faults=0,this.events=[],this.result=null}start(){this.status==="ready"&&(this.status="countdown")}pause(){["countdown","running"].includes(this.status)&&(this.previousStatus=this.status,this.status="paused")}resume(){this.status==="paused"&&(this.status=this.previousStatus,this.previousStatus=null)}get nextObstacle(){return this.layout.obstacles.find(t=>!this.results.has(t.id))}get activeSeesaw(){let t=this.layout.obstacles.find(e=>e.type==="seesaw"&&["approach","hold","tipping","ready","exit"].includes(this.seesaws.get(e.id).phase));return t?{obstacle:t,state:this.seesaws.get(t.id)}:null}get activeSlalom(){let t=this.layout.obstacles.find(e=>e.type==="slalom"&&!this.results.has(e.id)&&this.player.s>=ka(e)&&this.player.s<Va(e));return t?{obstacle:t,state:this.slaloms.get(t.id)}:null}get targetX(){let t=this.activeSlalom;return t?t.obstacle.lane*2+t.state.side*Le.offset:this.player.lane*2}inTunnel(){return this.layout.obstacles.some(t=>t.type==="tunnel"&&Math.abs(this.player.s-t.s)<3.4&&Math.abs(this.player.x-t.lane*2)<.8)}input(t){if(this.status!=="running")return!1;let e=this.player,n=this.activeSeesaw;if(t==="brake")return this.stopped=!0,n?.state.phase==="approach"&&e.s-n.obstacle.s>=_e.stopFrom&&(n.state.phase="hold",n.state.elapsed=0),!0;if(t==="dash")return!this.stopped||n&&["hold","tipping"].includes(n.state.phase)?!1:(n?.state.phase==="ready"&&(n.state.phase="exit"),this.stopped=!1,!0);if(n||this.rampPass)return!1;let s=this.activeSlalom;return s?t==="left"||t==="right"?(s.state.side=t==="left"?-1:1,!0):!1:this.inTunnel()?!1:t==="left"||t==="right"?(e.lane=Math.max(-1,Math.min(1,e.lane+(t==="left"?-1:1))),!0):t==="jump"&&!this.stopped&&e.jumpElapsed===null?(e.jumpElapsed=0,!0):!1}score(t,e,n){this.results.has(t.id)||(this.results.set(t.id,!!e),e?(this.cleared++,this.events.push({type:"obstacle-clear",id:t.id})):(this.faults++,this.player.hits++,this.player.slow=.65,this.events.push({type:"obstacle-miss",id:t.id,reason:n})))}updateSlalom(t){let e=this.player,n=t.s;for(let s of this.layout.obstacles){if(s.type!=="slalom"||this.results.has(s.id))continue;let r=this.slaloms.get(s.id);for(n<ka(s)&&e.s>=ka(s)&&(e.lane=s.lane);r.index<Le.count&&e.s>=Sn(s,r.index);){let a=fi(Sn(s,r.index),t,e.s),o=a&&(a.x-s.lane*2)*Us(s,r.index),l=!!a&&o>=Le.minOffset&&o<=Le.maxOffset&&a.y<.25;r.passed.push(l),r.failed||=!l,r.index++}n<Va(s)&&e.s>=Va(s)&&(e.lane=s.lane,this.score(s,!r.failed&&r.index===Le.count,"slalom"))}}updateAFrame(t){let e=this.player,n=this.rampPass?.obstacle??this.nextObstacle;if(n?.type!=="a-frame")return;let s=n.s-Pe.run,r=n.s+Pe.run,a=fi(s,t,e.s);if(a){let l=n.lane*2,c=a.x,h=Math.abs(c-l)<=Pe.entryTolerance;this.rampPass={obstacle:n,onBoard:h,clear:h&&a.grounded},h?(e.lane=n.lane,e.x=l):(e.lane-n.lane)*(c-l)<=0&&(e.lane=n.lane+Math.sign(c-l))}if(!this.rampPass)return;let o=gr(e.jumpElapsed);this.rampPass.onBoard&&(e.surfaceY=Ls(e.s-n.s),e.y=e.surfaceY+o,e.pitch=au(e.s-n.s)),e.s>=r&&(this.score(n,this.rampPass.clear,this.rampPass.onBoard?"ramp-jump":"ramp-entry"),this.rampPass=null,e.surfaceY=0,e.y=o,e.pitch=0)}updateSeesaw(t){let e=this.player,n=lu(),s=t.dt;for(let r of this.layout.obstacles){if(r.type!=="seesaw"||this.results.has(r.id))continue;let a=this.seesaws.get(r.id),o=fi(r.s-n,t,e.s);a.phase==="idle"&&o&&(Math.abs(o.x-r.lane*2)<.48&&o.grounded?(a.phase="approach",e.s=r.s-n+(e.s-(r.s-n))*_e.speed/Bi.speed,e.lane=r.lane,e.x=r.lane*2):(a.phase="missed",a.failed=!0)),a.phase==="approach"&&e.s>=r.s+_e.stopTo&&(e.s=r.s+_e.stopTo,this.stopped=!0,a.failed=!0,a.phase="hold",a.elapsed=0,this.events.push({type:"seesaw-recover"})),a.phase==="hold"?(a.elapsed+=s,a.elapsed>=_e.hold&&(a.phase="tipping",a.elapsed=0)):a.phase==="tipping"&&(a.elapsed=Math.min(_e.tipDuration,a.elapsed+s),a.angle=cu(a.elapsed/_e.tipDuration),a.elapsed>=_e.tipDuration&&(a.phase="ready")),["approach","hold","tipping","ready","exit"].includes(a.phase)&&(e.x=r.lane*2,e.surfaceY=Pa(e.s-r.s,a.angle),e.y=e.surfaceY,e.pitch=-a.angle),e.s>=r.s+n&&(this.score(r,a.phase==="exit"&&!a.failed,a.phase==="missed"?"board-entry":"board-stop"),a.phase="done",e.surfaceY=0,e.y=0,e.pitch=0)}}step(t){if(!Number.isFinite(t)||t<=0||t>.1)return;if(this.status==="countdown"){this.countdown=Math.max(0,this.countdown-t),this.countdown===0&&(this.status="running",this.events.push({type:"go"}));return}if(this.status!=="running")return;let e=this.player,n=e.s,s=this.time,r={s:n,x:e.x,target:this.targetX,jump:e.jumpElapsed,dt:t};this.time+=t,e.slow=Math.max(0,e.slow-t),e.jumpElapsed!==null&&(e.jumpElapsed+=t,e.jumpElapsed>=ie.jumpDuration?(e.jumpElapsed=null,e.y=0):e.y=gr(e.jumpElapsed)),e.x=mr(e.x,r.target,t),this.stopped||(e.s+=(this.activeSeesaw?_e.speed:this.activeSlalom?Le.speed:Bi.speed)*(e.slow>0?.65:1)*t),this.updateAFrame(r),this.updateSeesaw(r),this.updateSlalom(r),e.phase+=e.s-n;for(let a of this.layout.obstacles){if(this.results.has(a.id)||a.type==="seesaw"||a.type==="slalom"||a.type==="a-frame")continue;let o=a.type==="tunnel";if(o){let h=fi(a.s-3,r,e.s);h&&this.tunnelEntries.set(a.id,Math.abs(h.x-a.lane*2)<.72&&h.y<.55)}let l=fi(a.s+(o?3:0),r,e.s);if(!l)continue;let c=Math.abs(l.x-a.lane*2)<.72;if(o){let h=this.tunnelEntries.get(a.id);this.score(a,h&&c&&l.y<.55,h?"tunnel-exit":"tunnel-entry")}else{let h=a.type==="hurdle"?l.y>=.74:l.y>=.7&&l.y<=1.6;this.score(a,c&&h,c?"jump-low":"off-line")}}e.s>=this.layout.length&&(e.finishTime=s+t*(this.layout.length-n)/(e.s-n),e.s=this.layout.length,this.time=e.finishTime,this.status="finished",this.result={time:this.time,penalty:this.faults*Bi.penalty,total:this.time+this.faults*Bi.penalty,cleared:this.cleared,faults:this.faults},this.events.push({type:"finish"}))}drainEvents(){let t=this.events;return this.events=[],t}};function Du(i){let t=new Re;t.name="agility-arena";let e=i.bounds,n=i.point,s={"first-field":{lawn:"#a5c27a",leaves:"#85ab59",roof:"#d67d55",hill:"#b1cfaa",tree:"round"},zigzag:{lawn:"#9cc39a",leaves:"#528d78",roof:"#478c92",hill:"#98c5bb",tree:"pine"},balance:{lawn:"#bec682",leaves:"#96a451",roof:"#c79748",hill:"#becc9d",tree:"round"},"hill-field":{lawn:"#99be80",leaves:"#679b71",roof:"#537d9e",hill:"#9dbcb3",tree:"pine"}},r=s[i.courseId]??s["first-field"],a=new Map,o=k=>(a.has(k)||a.set(k,new Je({color:k,roughness:1})),a.get(k));function l(k,tt,rt=0,mt=0,Et=0,Ut=t){let St=new fe(k,o(tt));return St.position.set(rt,mt,Et),St.receiveShadow=!0,Ut.add(St),St}let c=(k,tt,rt,mt,Et,Ut,St,U=t)=>l(new Te(k,tt,rt),mt,Et,Ut,St,U),h=(k,tt,rt,mt,Et,Ut,St=t)=>l(new ue(k,k,tt,9),rt,mt,Et,Ut,St),f=741,d=()=>(f=Math.imul(f,1664525)+1013904223>>>0,f/4294967296);function u(k,tt,rt,mt){let Et=new Pi(tt,o(rt),mt.length),Ut=new Ne;Et.name=k;for(let St=0;St<mt.length;St++){let U=mt[St];Ut.position.set(U.x,U.y,U.z),Ut.scale.set(U.sx??1,U.sy??1,U.sz??1),Ut.rotation.set(0,U.angle??0,0),Ut.updateMatrix(),Et.setMatrixAt(St,Ut.matrix)}return Et.receiveShadow=!0,t.add(Et),Et}let g=new ps(400,400,90,90);g.rotateX(-Math.PI/2);let _=[],p=new zt;for(let k=0;k<g.attributes.position.count;k++){let tt=g.attributes.position.getX(k),rt=g.attributes.position.getZ(k),mt=.011*Math.sin(rt*.29)+.008*Math.cos(tt*.12);p.set(r.lawn).offsetHSL(0,0,mt),_.push(p.r,p.g,p.b)}g.setAttribute("color",new qt(_,3));let m=new fe(g,new Je({vertexColors:!0,roughness:1}));m.name="open-lawn",m.position.y=-.035,m.receiveShadow=!0,t.add(m);let y=new xe;y.setAttribute("position",new qt([-.07,0,0,.07,0,0,.025,.2,0,0,0,-.07,0,0,.07,-.02,.17,.02],3)),y.computeVertexNormals();let M=[];for(let k=0;k<2300;k++){let tt=.4+d()*.7;M.push({x:e.minX+d()*(e.maxX-e.minX),y:-.015,z:e.minZ+d()*(e.maxZ-e.minZ),sx:tt,sy:tt,sz:tt,angle:d()*Math.PI})}let v=u("grass-tufts",y,"#91ad72",M);v.material.side=Ie;let P=[],T=[],A=[[e.minX,e.minZ],[e.maxX,e.minZ],[e.maxX,e.maxZ],[e.minX,e.maxZ]];for(let k=0;k<4;k++){let tt=A[k],rt=A[(k+1)%4],mt=Math.hypot(rt[0]-tt[0],rt[1]-tt[1]),Et=Math.ceil(mt/4),Ut=-Math.atan2(rt[0]-tt[0],tt[1]-rt[1]);for(let St=0;St<Et;St++){let U=St/Et,jt=tt[0]+(rt[0]-tt[0])*U,Ft=tt[1]+(rt[1]-tt[1])*U;P.push({x:jt,y:.85,z:Ft});for(let $t of[.65,1.25])T.push({x:jt+(rt[0]-tt[0])/Et/2,y:$t,z:Ft+(rt[1]-tt[1])/Et/2,sz:mt/Et,angle:Ut})}}u("perimeter-posts",new Te(.2,1.7,.2),"#d4c4a2",P),u("perimeter-rails",new Te(.13,.16,1),"#e5d7b8",T);let C=[],b=[];for(let k=0;k<30;k++){let tt=k%4,rt=(Math.floor(k/4)+.5)/8,mt,Et;tt<2?(mt=tt?e.maxX+7:e.minX-7,Et=e.minZ+rt*(e.maxZ-e.minZ)):(mt=e.minX+rt*(e.maxX-e.minX),Et=tt===2?e.minZ-7:e.maxZ+7),C.push({x:mt,y:2.2,z:Et}),b.push({x:mt,y:5.2,z:Et,sx:2.1,sy:2.5,sz:2.1}),b.push({x:mt+.8,y:6.8,z:Et-.3,sx:1.7,sy:1.8,sz:1.7})}u("arena-trees",new ue(.22,.3,4.4,8),"#8c7c57",C);let x=r.tree==="pine"?new We(1,2.35,7):new Be(1,1),S=u("arena-canopies",x,r.leaves,b);S.material.flatShading=!0;for(let k=0;k<7;k++){let tt=k*Math.PI*2/7,rt=l(new Be(1,1),r.hill,Math.cos(tt)*135,0,Math.sin(tt)*135);rt.scale.set(44,(i.courseId==="hill-field"?20:10)+k%3*3,36),rt.material.flatShading=!0}let I=new Re;I.position.set(e.maxX+9,0,10),t.add(I);for(let k of[-2.7,2.7])for(let tt of[-2.7,2.7])c(.22,3.4,.22,"#a2926e",k,1.7,tt,I);let D=l(new We(4.5,1.5,4),r.roof,0,4.1,0,I);D.rotation.y=Math.PI/4;for(let k of[-1,1])c(6.3,.24,.12,"#fff0cf",0,3.27,k*3.07,I),c(.12,.24,6.3,"#fff0cf",k*3.07,3.27,0,I);let B=new Map,W=new Map,H=new Map,st=new Map;for(let k of i.obstacles){let tt=n(k.s,k.lane*2),rt=new Re;if(rt.name="race-obstacle",rt.userData.obstacleId=k.id,rt.position.set(tt.x,0,tt.z),rt.rotation.y=-tt.heading,t.add(rt),B.set(k.id,rt),k.type==="hurdle"){for(let St of[-.8,.8])c(.12,1.1,.14,"#5c8eab",St,.55,0,rt),c(.45,.08,.65,"#5c8eab",St,.04,0,rt);for(let St=0;St<8;St++)c(.2,.11,.1,St%2?"#c87961":"#fff1d5",-.7+St*.2,.74,0,rt)}else if(k.type==="hoop"){l(new pn(1.2,.09,10,40),"#e0b34f",0,1.7,0,rt);for(let St of[-1.35,1.35])c(.1,2.6,.12,"#5c8eab",St,1.3,0,rt),c(.18,.08,.08,"#78909a",St*.945,1.7,0,rt),c(.5,.08,.7,"#5c8eab",St,.04,0,rt)}else if(k.type==="a-frame")ou(rt,c);else if(k.type==="slalom"){let St=[];st.set(k.id,St);for(let U=0;U<Le.count;U++){let jt=new Re;jt.name="slalom-pole",jt.userData={obstacleId:k.id,poleIndex:U},jt.position.z=k.s-Sn(k,U),rt.add(jt),h(.075,1.9,"#f5eed8",0,.95,0,jt);let Ft=h(.079,.55,"#548cba",0,1.35,0,jt);Ft.material=Ft.material.clone(),St.push(Ft),h(.08,.3,"#548cba",0,.35,0,jt),c(.38,.045,.38,"#c9c4a7",0,.025,0,jt)}}else if(k.type==="seesaw"){let St=new Re;St.name="rigid-plank",St.userData.obstacleId=k.id,St.position.y=_e.pivotHeight,St.rotation.x=_e.angle,rt.add(St),H.set(k.id,St),c(_e.width,_e.thickness,5.2,"#548cba",0,0,0,St);for(let jt of[-3.3,3.3])c(_e.width,_e.thickness,1.4,"#edcb62",0,0,jt,St);for(let jt of[-.72,.72]){for(let Ft of[-1,1]){let $t=c(.12,1.05,.12,"#748889",jt,.47,Ft*.23,rt);$t.rotation.x=Ft*-.46}c(.18,.08,1.15,"#748889",jt,.04,0,rt)}let U=h(.052,1.7,"#a6b2ad",0,_e.pivotHeight,0,rt);U.name="seesaw-axle",U.rotation.z=Math.PI/2}else xr(rt,l),c(.12,.1,6,"#548cba",-1.58,.05,0,rt),c(.12,.1,6,"#548cba",1.58,.05,0,rt);h(.045,.9,"#ad9f7d",2.7,.45,1,rt);let mt=c(.68,.8,.1,"#f5eed8",2.7,1.12,1,rt);mt.material=mt.material.clone(),W.set(k.id,mt);let Et=["bc","abged","abgcd","fgbc","afgcd","afgecd"],Ut={a:[0,.27,.28,.045],g:[0,0,.28,.045],d:[0,-.27,.28,.045],f:[-.15,.14,.045,.22],b:[.15,.14,.045,.22],e:[-.15,-.14,.045,.22],c:[.15,-.14,.045,.22]};for(let St of Et[k.id]){let[U,jt,Ft,$t]=Ut[St];c(Ft,$t,.015,"#48684f",2.7+U,1.12+jt,1.06,rt)}}let O=new Re;O.name="next-obstacle-marker",t.add(O);let Q=l(new ba(1.8,1.95,48),"#e9cf76",0,.015,0,O);Q.rotation.x=-Math.PI/2,Q.material=Q.material.clone(),Q.material.transparent=!0,Q.material.opacity=.65;let pt=new Re,it=n(i.length);pt.name="finish-gate",pt.position.set(it.x,0,it.z),pt.rotation.y=-it.heading,t.add(pt);let ht=n(0);for(let[k,tt]of[[pt,"#e8c86b"]])for(let rt of[-2.8,2.8])h(.055,1.8,"#f5eed8",rt,.9,0,k),c(.65,.43,.035,tt,rt+.3,1.5,0,k),c(.32,.06,.32,"#c9c4a7",rt,.03,0,k);for(let k of[-2.8,2.8])h(.055,1.3,"#f5eed8",ht.x+k,.65,ht.z),c(.55,.35,.035,"#83aabd",ht.x+k+.25,1.05,ht.z);let yt="";function X(k){let tt=k.nextObstacle,rt=`${tt?.id}:${k.results.size}:${[...k.slaloms.values()].map(mt=>mt.index).join(",")}`;if(rt!==yt){if(yt=rt,O.visible=!!tt,O.scale.setScalar(1),tt){let mt=B.get(tt.id);if(O.position.copy(mt.position),O.rotation.y=mt.rotation.y,tt.type==="a-frame"){let Et=n(tt.s-Pe.run,tt.lane*2);O.position.set(Et.x,.012,Et.z),O.scale.setScalar(.56)}if(tt.type==="slalom"){let Et=k.slaloms.get(tt.id).index;if(O.visible=Et<Le.count,O.visible){let Ut=n(Sn(tt,Et),tt.lane*2+Us(tt,Et)*Le.offset);O.position.set(Ut.x,.012,Ut.z),O.scale.setScalar(.3)}}}for(let mt of i.obstacles)W.get(mt.id).material.color.set(k.results.has(mt.id)?k.results.get(mt.id)?"#b6d59c":"#d9aa8d":mt.id===tt?.id?"#f4d77b":"#f5eed8");for(let[mt,Et]of st){let Ut=k.slaloms.get(mt);Et.forEach((St,U)=>St.material.color.set(U<Ut.index?Ut.passed[U]?"#8eb87c":"#ca8f75":tt?.id===mt&&U===Ut.index?"#e5bd5c":"#548cba"))}}}function nt(k){for(let[tt,rt]of H)rt.rotation.x=k.seesaws.get(tt).angle}function ft(){yt="",O.visible=!1,O.scale.setScalar(1);for(let k of W.values())k.material.color.set("#f5eed8");for(let k of H.values())k.rotation.x=_e.angle;for(let k of st.values())for(let tt of k)tt.material.color.set("#548cba")}return ft(),{root:t,resetTreats:ft,collectTreat(){},update:X,animate:nt}}var Sr=[{id:"first-field",name:"\u306F\u3058\u3081\u3066\u306E \u3072\u308D\u3070",level:"\u3084\u3055\u3057\u3044",lv:0,color:"#a5bd90",tree:"round",desc:"6\u3064\u306E \u3057\u3087\u3046\u304C\u3044\u3076\u3064\u3092\u3001\u3058\u3085\u3093\u3070\u3093\u306B \u30AF\u30EA\u30A2\u3057\u3088\u3046",tags:["\u30CF\u30FC\u30C9\u30EB","\u308F\u3063\u304B","\u30C8\u30F3\u30CD\u30EB"]},{id:"zigzag",name:"\u30B8\u30B0\u30B6\u30B0",level:"\u3075\u3064\u3046",lv:1,color:"#84aca0",tree:"pine",desc:"\u30DD\u30FC\u30EB\u306E \u3042\u3044\u3060\u3092\u3001\u307F\u304E\u30FB\u3072\u3060\u308A\u306B \u30EA\u30BA\u30E0\u3088\u304F \u3059\u3059\u3082\u3046",tags:["\u30B9\u30E9\u30ED\u30FC\u30E0","\u30CF\u30FC\u30C9\u30EB","\u30C8\u30F3\u30CD\u30EB"]},{id:"balance",name:"\u30D0\u30E9\u30F3\u30B9",level:"\u3080\u305A\u304B\u3057\u3044",lv:2,color:"#a6ae86",tree:"round",desc:"\u3068\u307E\u3063\u3066\u3001\u307E\u3063\u3066\u3001\u307E\u305F \u3059\u3059\u3080\u3002\u30B7\u30FC\u30BD\u30FC\u306B \u3061\u3087\u3046\u305B\u3093",tags:["\u30B7\u30FC\u30BD\u30FC","\u308F\u3063\u304B","\u30CF\u30FC\u30C9\u30EB"]},{id:"hill-field",name:"\u304A\u304B\u306E \u3072\u308D\u3070",level:"\u3075\u3064\u3046",lv:1,color:"#7ca69b",tree:"pine",desc:"\u304D\u3044\u308D\u3044 \u3044\u308A\u3050\u3061\u3092 \u306D\u3089\u3063\u3066\u30012\u3064\u306E \u3055\u304B\u3092 \u304B\u3051\u306C\u3051\u3088\u3046",tags:["A\u30D5\u30EC\u30FC\u30E0","\u30C8\u30F3\u30CD\u30EB","\u308F\u3063\u304B"]}],xc=i=>Sr.find(t=>t.id===i)||Sr[0],Yn={sky:"#bad7e3",fog:[85,175],zenith:[.26,.67,.88],horizon:[.73,.91,.89],ground:"#a3b48a",scale:.76,shadow:.8},gc={hurdle:"\u30CF\u30FC\u30C9\u30EB",hoop:"\u308F\u3063\u304B",tunnel:"\u30C8\u30F3\u30CD\u30EB",slalom:"\u30B9\u30E9\u30ED\u30FC\u30E0",seesaw:"\u30B7\u30FC\u30BD\u30FC","a-frame":"A\u30D5\u30EC\u30FC\u30E0"},Wx=["\u3072\u3060\u308A","\u307E\u3093\u306A\u304B","\u307F\u304E"],Ns={hurdle:"#c78465",hoop:"#d9a63e",tunnel:"#5f8ea6",slalom:"#4f7fb0",seesaw:"#7b6aa8","a-frame":"#3f7f86"};function Uu(i){let t=xc(i),e=new br(t.id).layout,n=e.point,s=e.length,r=[];for(let A=0;A<=s;A+=2)r.push(n(Math.min(A,s),0));r.push(n(s,0));let a=r.map(A=>A.x),o=r.map(A=>A.z),l=Math.min(...a),c=Math.max(...a),h=Math.min(...o),f=Math.max(...o),d=70/Math.max(c-l,f-h,1),u=50-(l+c)/2*d,g=50-(h+f)/2*d,_=A=>A.x*d+u,p=A=>A.z*d+g,m=A=>A.toFixed(1),y="M"+r.map(A=>`${m(_(A))} ${m(p(A))}`).join("L"),M=A=>{let C=n(A.s,A.lane*2),b=_(C),x=p(C),S=Math.sin(C.heading),I=-Math.cos(C.heading),D=-I,B=S,W=(H,st,O,Q)=>`<path d="M${m(b+H[0])} ${m(x+H[1])}L${m(b+st[0])} ${m(x+st[1])}" stroke="#fff" stroke-width="${O+1.8}" stroke-linecap="round"/><path d="M${m(b+H[0])} ${m(x+H[1])}L${m(b+st[0])} ${m(x+st[1])}" stroke="${Q}" stroke-width="${O}" stroke-linecap="round"/>`;return A.type==="hurdle"?W([-D*3,-B*3],[D*3,B*3],2.4,Ns.hurdle):A.type==="hoop"?`<circle cx="${m(b)}" cy="${m(x)}" r="2.9" fill="none" stroke="#fff" stroke-width="3.4"/><circle cx="${m(b)}" cy="${m(x)}" r="2.9" fill="none" stroke="${Ns.hoop}" stroke-width="1.8"/>`:A.type==="tunnel"?W([-S*3*d,-I*3*d],[S*3*d,I*3*d],4.4,Ns.tunnel):A.type==="seesaw"?W([-S*3.9*d,-I*3.9*d],[S*3.9*d,I*3.9*d],2.8,Ns.seesaw)+`<circle cx="${m(b)}" cy="${m(x)}" r="1.4" fill="#fff"/>`:A.type==="slalom"?Array.from({length:Le.count},(H,st)=>{let O=n(Sn(A,st),A.lane*2);return`<circle cx="${m(_(O))}" cy="${m(p(O))}" r="1.5" fill="${Ns.slalom}" stroke="#fff" stroke-width=".9"/>`}).join(""):A.type==="a-frame"?`<path d="M${m(b+S*3.6)} ${m(x+I*3.6)}L${m(b-S*3.6+D*2.8)} ${m(x-I*3.6+B*2.8)}L${m(b-S*3.6-D*2.8)} ${m(x-I*3.6-B*2.8)}z" fill="${Ns["a-frame"]}" stroke="#fff" stroke-width="1.1" stroke-linejoin="round"/>`:`<circle cx="${m(b)}" cy="${m(x)}" r="3" fill="#c78465"/>`},v=t.tree==="pine"?(A,C)=>`<path d="M${A} ${C-6}l5 10h-10z" fill="#4f7d63"/>`:(A,C)=>`<circle cx="${A}" cy="${C}" r="5" fill="#7f9f5f"/>`,P=r[0],T=r[r.length-1];return`<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M0 0h100v100H0z" fill="${t.color}"/>
    <rect x="7" y="7" width="86" height="86" rx="10" fill="none" stroke="#efe3c4" stroke-width="1.6" stroke-dasharray="4 3"/>
    ${[[4,4],[96,4],[4,96],[96,96]].map(([A,C])=>v(A,C)).join("")}
    <path d="${y}" fill="none" stroke="#f3e9cf" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
    <path d="${y}" fill="none" stroke="#d8c79f" stroke-width="1.3" stroke-dasharray="3 4" stroke-linecap="round"/>${e.obstacles.map(M).join("")}
    <circle cx="${m(_(P))}" cy="${m(p(P))}" r="4.6" fill="#4fae9a" stroke="#fff" stroke-width="1.6"/>
    <circle cx="${m(_(T))}" cy="${m(p(T))}" r="4.6" fill="#ec6c8a" stroke="#fff" stroke-width="1.6"/></svg>`}function _c(i){let t=(n,s,r)=>`<div class="run-hrow"><b aria-hidden="true">${n}</b><div><strong>${s}</strong><span>${r}</span></div></div>`,e={zigzag:t("\u21C6","\u30B9\u30E9\u30ED\u30FC\u30E0","\u3081\u3058\u308B\u3057\u306E \u307B\u3046\u3078\u3001\u307F\u304E\u30FB\u3072\u3060\u308A \u3053\u3046\u3054\u306B 6\u672C \u3068\u304A\u308D\u3046\u3002\u30DD\u30FC\u30EB\u306E \u308C\u3064\u306F \u30B8\u30E3\u30F3\u30D7 \u3067\u304D\u306A\u3044\u3088"),balance:t("\u25C7","\u30B7\u30FC\u30BD\u30FC","\u307E\u3093\u306A\u304B\u306E \u3042\u305F\u308A\u3067 \u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7\u3057\u3066 \u3068\u307E\u308B\u3002\u3044\u305F\u304C \u3055\u304C\u3063\u305F\u3089 \u30BF\u30C3\u30D7\u3067 \u307E\u305F \u3059\u3059\u3080\u3088"),"hill-field":t("\u25B3","A\u30D5\u30EC\u30FC\u30E0","\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u304D\u3044\u308D\u3044 \u3044\u308A\u3050\u3061\u306B \u3042\u308F\u305B\u3066\u3001\u305D\u306E\u307E\u307E \u3055\u304B\u3092 \u306F\u3057\u308A\u306C\u3051\u3088\u3046")}[i];return`<div class="run-hrows">
    ${t("\u2194","\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7",i==="zigzag"?"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078\u3002\u30DD\u30FC\u30EB\u306E \u3042\u3044\u3060\u3067\u306F 1\u56DE\u3067 \u307F\u304E\u30FB\u3072\u3060\u308A\u3078":"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078")}
    ${t("\u2191","\u3046\u3048\u306B \u30B9\u30EF\u30A4\u30D7","\u30B8\u30E3\u30F3\u30D7\u3002\u30CF\u30FC\u30C9\u30EB\u3084 \u308F\u3063\u304B\u3092 \u3068\u3073\u3053\u3048\u3088\u3046\u3002\u30C8\u30F3\u30CD\u30EB\u306F \u305D\u306E\u307E\u307E \u306F\u3057\u3063\u3066\u306D")}
    ${t("\u2193","\u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7","\u305D\u306E\u3070\u3067 \u3068\u307E\u308B\uFF08\u3068\u3051\u3044\u306F \u3059\u3059\u3080\u3088\uFF09")}
    ${t("\u25CF","\u30BF\u30C3\u30D7","\u3068\u307E\u3063\u3066\u3044\u308B \u3046\u3061\u306E\u3053\u304C \u307E\u305F \u306F\u3057\u308A\u3060\u3059\u3088")}
    ${e||(i?"":t("\u25C7","\u30B7\u30FC\u30BD\u30FC","\u307E\u3093\u306A\u304B\u3067 \u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7\u3002\u3044\u305F\u304C \u3055\u304C\u3063\u305F\u3089 \u30BF\u30C3\u30D7"))}
  </div><p class="run-hnote">\u30DF\u30B9 1\u56DE\u3067\u3001\u304D\u308D\u304F\u306B ${Bi.penalty}\u79D2 \u305F\u3055\u308C\u308B\u3088<br>\u30AD\u30FC\u30DC\u30FC\u30C9\u306F \u3084\u3058\u308B\u3057\u3068 \u30B9\u30DA\u30FC\u30B9\u3067 \u3042\u305D\u3079\u307E\u3059</p>`}function Nu(i){let{container:t,look:e,neckWear:n=null,name:s="\u3046\u3061\u306E\u3053",art:r="",best:a=null,next:o=null,onExit:l=()=>{},onSelect:c=null,onNext:h=null,onFinish:f=()=>null}=i,d=xc(i.course),u=d.id,g=new br(u),_=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches),p=g.layout.point,m=g.layout.length,y=g.layout.obstacles,M=y.length,v=i.petScale||Yn.scale,P=o&&Sr.some(L=>L.id===o)?xc(o):null,T=0,A=null,C=null,b=null,x=null,S=null,I=null,D=0,B=0,W=0,H=0,st=!1,O=null,Q=null,pt=0,it=6,ht="",yt="",X=!1,nt=null,ft=null;t.className="run-root run-agi",t.dataset.course=u,t.innerHTML=`<canvas class="run-canvas" tabindex="0" aria-label="${d.name}\u306E \u30A2\u30B8\u30EA\u30C6\u30A3\u3002\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u30EC\u30FC\u30F3\u3001\u3046\u3048\u3067 \u30B8\u30E3\u30F3\u30D7\u3001\u3057\u305F\u3067 \u3068\u307E\u308B\u3001\u30BF\u30C3\u30D7\u3067 \u307E\u305F \u3059\u3059\u3080"></canvas>
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
    <div class="run-bottom run-steps" role="list" aria-label="\u3057\u3087\u3046\u304C\u3044\u3076\u3064">${y.map((L,N)=>`<span class="run-step" role="listitem" data-step="${L.id}" data-state="pending" aria-label="\u3057\u3087\u3046\u304C\u3044\u3076\u3064 ${N+1}\uFF08${gc[L.type]||""}\uFF09\u307E\u3060">${N+1}</span>`).join("")}</div>
    <div class="run-over" data-q="over" role="dialog" aria-modal="true" aria-label="\u30E9\u30F3\u306E \u30E1\u30CB\u30E5\u30FC" hidden></div>`;let k=L=>t.querySelector(`[data-q="${L}"]`),tt=L=>t.querySelector(`[data-run="${L}"]`),rt=t.querySelector(".run-canvas"),mt=k("over"),Et=t.querySelector(".run-me"),Ut=new Map([...t.querySelectorAll(".run-step")].map(L=>[Number(L.dataset.step),L]));function St(){C=new ms({canvas:rt,antialias:!0,powerPreference:"high-performance"}),C.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),C.outputColorSpace=Ze,C.shadowMap.enabled=!0,C.shadowMap.type=rr,C.toneMapping=ar,C.toneMappingExposure=1,b=new xs,b.background=new zt(Yn.sky),b.fog=new gs(Yn.sky,Yn.fog[0],Yn.fog[1]),x=new Xe(60,1,.1,180),b.add(new bs("#fffaf0",Yn.ground,2.1)),S=new Ss("#fff7ea",2.1),S.castShadow=!0,S.shadow.mapSize.set(1024,1024),Object.assign(S.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.5,far:45}),S.shadow.bias=-3e-4,S.shadow.normalBias=.03,b.add(S,S.target);let L=new fe(new ze(134,24,12),new tn({side:Ge,depthWrite:!1,uniforms:{zenith:{value:new F(...Yn.zenith)},horizon:{value:new F(...Yn.horizon)}},vertexShader:"varying float altitude; void main(){altitude=position.y/134.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform vec3 zenith; uniform vec3 horizon; varying float altitude; void main(){vec3 sky=mix(horizon,zenith,smoothstep(-.035,.34,altitude));gl_FragColor=vec4(sky,1.);}"}));L.name="park-sky",L.renderOrder=-10,b.add(L),I=Du(g.layout),b.add(I.root),nt=Rs(e,n,{detail:1}),nt.scale.setScalar(v),nt.rotation.y=Math.PI,ft=new fe(new ci(Yn.shadow,24),new Je({color:"#536848",transparent:!0,opacity:.15})),ft.rotation.x=-Math.PI/2,b.add(nt,ft),x.position.set(0,2.8,6),U()}function U(){if(!C)return;let L=t.getBoundingClientRect();L.width<1||L.height<1||(C.setSize(L.width,L.height,!1),x.aspect=L.width/L.height,x.fov=L.width>L.height?54:60,x.updateProjectionMatrix(),W=0)}function jt(L,N,Y){if(mt.hidden=L==null,mt.className="run-over"+(Y?" "+Y:""),t.classList.toggle("menu",L!=null),mt.innerHTML=L==null?"":`<div class="run-card">${L}</div>`,Ft(),L!=null){let xt=mt.querySelector(N||".btn.primary")||mt.querySelector("button");if(xt)try{xt.focus({preventScroll:!0})}catch{}}return mt}function Ft(){let L=g.status==="running"||g.status==="countdown";tt("pause").hidden=!L||!mt.hidden,tt("help").hidden=L&&mt.hidden||X}let $t=()=>c?'<button class="btn" type="button" data-m="select">\u30B3\u30FC\u30B9\u3092 \u3048\u3089\u3076</button>':"";function Ot(L){let N=L.querySelector('[data-m="select"]');N&&N.addEventListener("click",()=>c())}function le(){Q=null;let L=jt(`<span class="run-over-l">\u30A2\u30B8\u30EA\u30C6\u30A3\u30FB${d.level}</span><h2>${d.name}</h2>
      <p class="run-sub">${s}\u3068 ${M}\u3064\u306E \u3057\u3087\u3046\u304C\u3044\u3076\u3064\u306B<br>\u3061\u3087\u3046\u305B\u3093\uFF01</p>
      ${a?`<p class="run-best">\u30D9\u30B9\u30C8 <b>${mi(a)}</b></p>`:""}
      <div class="btnrow">${$t()}<button class="btn primary" type="button" data-m="go">\u306F\u3057\u308B</button></div>`,'[data-m="go"]',"top");L.querySelector('[data-m="go"]').addEventListener("click",w),Ot(L)}function Gt(L){Q=L,jt(`<h2>\u3042\u305D\u3073\u304B\u305F</h2>${_c(u)}<div class="btnrow"><button class="btn primary" type="button" data-m="ok">\u308F\u304B\u3063\u305F</button></div>`).querySelector('[data-m="ok"]').addEventListener("click",R)}function R(){let L=Q;Q=null,L&&L()}function w(){O=null,Q=null,jt(null),g.start(),bt(),Ft();try{rt.focus({preventScroll:!0})}catch{}}function q(){if(O=null,g.pause(),g.status!=="paused")return;Q=null;let L=jt(`<h2>\u3072\u3068\u3084\u3059\u307F</h2><p class="run-sub">${d.name}\u306E \u3068\u3061\u3085\u3046\u3060\u3088</p>
      <div class="btnrow"><button class="btn" type="button" data-m="restart">\u3055\u3044\u3057\u3087\u304B\u3089</button><button class="btn primary" type="button" data-m="resume">\u3064\u3065\u3051\u308B</button></div>
      ${c?`<div class="btnrow run-more">${$t()}</div>`:""}`,'[data-m="resume"]');L.querySelector('[data-m="resume"]').addEventListener("click",at),L.querySelector('[data-m="restart"]').addEventListener("click",dt),Ot(L),bt()}function at(){jt(null),g.resume(),B=performance.now(),bt(),Ft();try{rt.focus({preventScroll:!0})}catch{}}function dt(){g.reset(),I.resetTreats(),x.position.set(0,2.8,6),it=6,B=performance.now(),T++,A=null;for(let L of Ut.values())L.dataset.state="";w()}function ot(L){let N=g.result,Y=N.faults===0,xt=P&&h?`<button class="btn primary run-next" type="button" data-m="next" aria-label="\u3064\u304E\u306E \u30B3\u30FC\u30B9\u300C${P.name}\u300D\u3078">\u3064\u304E\u306E \u30B3\u30FC\u30B9\u3078<small>${P.name}</small></button>`:"",_t=`<button class="btn${xt?"":" primary"}" type="button" data-m="exit">\u304A\u308F\u308B</button>`,Bt=(c?$t():"")+(xt?_t:""),At=jt(`<span class="run-over-l">\u30A2\u30B8\u30EA\u30C6\u30A3\u30FB${d.name}</span>
      <div class="run-res">${r?`<div class="run-art" aria-hidden="true">${r}</div>`:""}<div class="run-total"><small>\u3054\u3046\u3051\u3044</small><span><b>${(Math.round(N.total*100)/100).toFixed(2)}</b>\u79D2</span></div></div>
      <h2>${Y?"\u30CE\u30FC\u30DF\u30B9\u3067 \u30B4\u30FC\u30EB\uFF01":"\u3055\u3044\u3054\u307E\u3067 \u306F\u3057\u3063\u305F\u306D\uFF01"}</h2>
      <div class="run-stats">
        <div><span>\u306F\u3057\u3063\u305F \u30BF\u30A4\u30E0</span><b>${mi(N.time)}</b></div><div><span>\u30DF\u30B9\u306E \u3076\u3093</span><b>+${N.penalty}\u79D2</b></div>
        <div><span>\u30AF\u30EA\u30A2</span><b>${N.cleared} / ${M}</b></div><div><span>\u30DF\u30B9</span><b>${N.faults}\u56DE</b></div>
      </div>
      <div class="run-rec" data-q="rec" role="status">${A??'<span class="run-rec-wait">\u304D\u308D\u304F \u3057\u3066\u3044\u308B\u3088\u2026</span>'}</div>
      <div class="btnrow"><button class="btn" type="button" data-m="again">\u3082\u3046\u3044\u3061\u3069</button>${xt||_t}</div>
      ${Bt?`<div class="btnrow run-more">${Bt}</div>`:""}`,'[data-m="again"]');At.querySelector('[data-m="again"]').addEventListener("click",dt),At.querySelector('[data-m="exit"]').addEventListener("click",()=>l());let Jt=At.querySelector('[data-m="next"]');if(Jt&&Jt.addEventListener("click",()=>h(P.id)),Ot(At),!L)return;A=null;let Z=++T,et;try{et=f({course:u,mode:"agility",ms:Mr(N.total),time:N.time,total:N.total,misses:N.faults,cleared:N.cleared})}catch{et=null}Promise.resolve(et).then($=>$,()=>null).then($=>{if(st||Z!==T)return;A=$||"";let lt=k("rec");lt&&(lt.innerHTML=A)})}function Dt(L,N){O=null,g.pause(),X=!0,jt(`<h2>${L}</h2><p class="run-sub">${N}</p><div class="btnrow"><button class="btn primary" type="button" data-m="exit">\u3068\u3058\u308B</button></div>`).querySelector('[data-m="exit"]').addEventListener("click",()=>l())}function bt(){k("clear").textContent=g.cleared,k("miss").textContent=g.faults;let L=Math.min(100,g.player.s/m*100);k("fill").style.width=L+"%",t.querySelector(".run-progress").setAttribute("aria-valuenow",Math.round(L)),k("clock").textContent=vr(g.time),Et.hidden=g.status==="paused",Et.style.left=L+"%",I&&I.update(g);let N=g.nextObstacle,Y=g.status==="running"||g.status==="countdown";y.forEach((_t,Bt)=>{let At=Ut.get(_t.id),Jt=g.results.has(_t.id),Z=g.results.get(_t.id),et=Jt?Z?"clear":"miss":N&&N.id===_t.id&&Y?"next":"pending";if(At.dataset.state===et)return;let $=Jt&&At.dataset.state!=="";At.dataset.state=et,At.textContent=Jt?Z?"\u2713":"\u2212":String(Bt+1),At.setAttribute("aria-label",`\u3057\u3087\u3046\u304C\u3044\u3076\u3064 ${Bt+1}\uFF08${gc[_t.type]||""}\uFF09${Jt?Z?"\u30AF\u30EA\u30A2":"\u30DF\u30B9":"\u307E\u3060"}`),At.classList.toggle("pop",$)}),k("stop").hidden=!(g.stopped&&g.status==="running"&&!g.activeSeesaw),wt();let xt=g.status==="countdown"?String(Math.ceil(g.countdown)):"";xt!==ht&&(ht=xt,k("count").textContent=xt,k("count").classList.toggle("show",!!xt))}function wt(){let L=g.status==="running"?g.nextObstacle:null,N=k("cue");if(N.hidden=!L,t.classList.toggle("turn-visible",!!L),!L){yt="";return}let Y=g.player,xt=Wx[L.lane+1]||"\u307E\u3093\u306A\u304B",_t=Math.abs(Y.x-L.lane*2)<(L.type==="seesaw"?.48:L.type==="a-frame"?Pe.entryTolerance:.72),Bt=(L.type==="slalom"?Sn(L,0):L.type==="a-frame"?L.s-Pe.run:L.s)-Y.s<8,At=g.activeSeesaw,Jt=g.activeSlalom,Z=_t?L.type==="tunnel"?"\u2229":["seesaw","slalom","a-frame"].includes(L.type)?"\u25C7":Bt?"\u2191":"\u25C7":L.lane*2<Y.x?"\u2190":"\u2192",et=gc[L.type]||"",$=`${L.id+1} / ${M}\u30FB${xt}`,lt=Bt?"active":"ahead";if(!_t&&Bt&&!At&&!Jt&&!g.rampPass?et=`${xt}\u3078`:_t&&Bt&&(L.type==="hurdle"||L.type==="hoop")&&(et=`${et}\u3092 \u30B8\u30E3\u30F3\u30D7`),L.type==="a-frame"&&(g.rampPass?(Z="\u25C7",et=g.rampPass.onBoard?"\u3055\u304B\u3092 \u304B\u3051\u306C\u3051\u3088\u3046":"\u3055\u304B\u306E \u3088\u3053\u3092 \u3068\u304A\u3063\u3066\u3044\u308B\u3088"):Bt&&_t&&(Z="\u25C7",et="\u304D\u3044\u308D\u3044 \u3044\u308A\u3050\u3061\u3078")),At){let ut=At.state.phase,It=Y.s-L.s>=_e.stopFrom;et=ut==="hold"||ut==="tipping"?"\u3044\u305F\u304C \u3055\u304C\u308B\u307E\u3067 \u307E\u3063\u3066\u306D":ut==="ready"||g.stopped?"\u30BF\u30C3\u30D7\u3067 \u3059\u3059\u3080":ut==="exit"?"\u305D\u306E\u307E\u307E \u3059\u3059\u3082\u3046":It?"\u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u3068\u307E\u308B":"\u307E\u3093\u306A\u304B\u3078 \u3059\u3059\u3082\u3046",Z=ut==="hold"||ut==="tipping"?"\u2026":ut==="ready"||g.stopped?"\u25CF":ut==="exit"?"\u2713":It?"\u2193":"\u25C7",(ut==="ready"||g.stopped&&ut!=="hold"&&ut!=="tipping"||ut==="approach"&&It)&&(lt="waiting")}if(Jt){let ut=Jt.state.index,It=ut>=Le.count,Kt=Us(L,ut)>0;Z=It?"\u2713":Kt?"\u2192":"\u2190",et=It?"\u3067\u3050\u3061\u3078":Kt?"\u307F\u304E\u3092 \u3068\u304A\u308B":"\u3072\u3060\u308A\u3092 \u3068\u304A\u308B",$=`${L.id+1} / ${M}\u30FB\u30DD\u30FC\u30EB ${Math.min(ut+1,Le.count)} / ${Le.count}`}let ct=`${L.id}:${Z}:${et}:${$}:${lt}`;ct!==yt&&(yt=ct,N.dataset.state=lt,N.innerHTML=`<strong aria-hidden="true">${Z}</strong><span><small>${$}</small><b>${et}</b></span>`)}function ee(L){if(st)return;D=requestAnimationFrame(ee);let N=B?Math.max(0,Math.min(.2,(L-B)/1e3)):0;B=L;let Y=Math.max(1,Math.ceil(N/.05));for(let ct=0;ct<Y;ct++)g.step(N/Y);I.animate(g);for(let ct of g.drainEvents())ct.type==="finish"&&ot(!0);if(!(g.status==="running"||g.status==="countdown")&&W&&L-W<100)return;W=L||1;let _t=g.player;if(g.status!=="paused"){let ct=La(g,!0),ut=g.status==="running"&&_t.finishTime===null&&!g.stopped,It=p(_t.s,_t.x);nt.position.set(It.x,_t.y+(ut&&!_&&!_t.surfaceY?Math.abs(Math.cos(_t.phase*1.85))*.025:0),It.z),nt.rotation.order="YXZ",nt.rotation.x=_t.pitch||0,nt.rotation.y=Math.PI-It.heading,nt.rotation.z=ut&&!_?(g.targetX-_t.x)*.07:0,Da(nt,_t.phase,ut,_t.jumpElapsed!==null,ct),Is(nt,L/1e3,ut,{legs:!1,phase:_t.phase,airborne:_t.jumpElapsed!==null,reduced:_}),ft.position.set(It.x,.035,It.z),ft.scale.setScalar(_t.jumpElapsed!==null?.7:1),ft.visible=!_t.surfaceY}let Bt=y.some(ct=>ct.type==="tunnel"&&ct.s-_t.s<9&&ct.s-_t.s>-6&&Math.abs(_t.x-ct.lane*2)<.8),At=_t.surfaceY||0,Jt=!!(g.rampPass&&g.rampPass.onBoard),Z=Jt?ru(At):At,et=At?2.8+Z:x.position.y+((Bt?1.15:2.8+(_?0:_t.y*.18))-x.position.y)*(1-Math.exp(-N*6));it+=((Bt?4:6)-it)*(1-Math.exp(-N*5));let $=p(_t.s,_t.x),lt=pi($,{distance:it,height:et,lookHeight:Bt?.65:1+Z*(Jt?.65:1)});x.position.set(lt.position.x,lt.position.y,lt.position.z),x.lookAt(lt.target.x,lt.target.y,lt.target.z),b.getObjectByName("park-sky").position.copy(x.position),S.position.set($.x-7,12,$.z+6),S.target.position.set($.x,0,$.z),H+=N,(H>.08||g.status==="countdown")&&(bt(),H=0),C.render(b,x),pt++}let gt=u==="hill-field";function Pt(L){if(!(!L.isPrimary||g.status!=="running"||O)){O={id:L.pointerId,x:L.clientX,y:L.clientY,time:performance.now(),used:!1,tap:!0};try{rt.setPointerCapture(L.pointerId)}catch{}}}function Nt(L,N){if(!O||O.id!==L.pointerId||O.used)return;let Y=L.clientX-O.x,xt=L.clientY-O.y;Math.hypot(Y,xt)>=12&&(O.tap=!1);let _t=Oa(Y,xt,performance.now()-O.time,gt);!_t||_t==="dash"&&(!N||!O.tap)||(O.used=!0,g.input(_t))}let Yt=L=>Nt(L,!1),Rt=L=>{O&&O.id===L.pointerId&&(O=null)},se=L=>{Nt(L,!0),Rt(L)};function Qt(L){if(L.target&&L.target.closest&&L.target.closest("button,summary"))return;let N={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"jump",ArrowDown:"brake"," ":"dash"};N[L.key]&&(L.preventDefault(),L.repeat||g.input(N[L.key]))}let ce=()=>{document.hidden&&q()},z=L=>{st||(L.preventDefault(),Dt("3D\u306E \u304C\u3081\u3093\u304C \u3068\u307E\u3063\u305F\u3088","\u3044\u3061\u3069 \u3068\u3058\u3066\u3001<br>\u3082\u3046\u3044\u3061\u3069 \u3072\u3089\u3044\u3066\u306D"))};rt.addEventListener("pointerdown",Pt),rt.addEventListener("pointermove",Yt),rt.addEventListener("pointerup",se),rt.addEventListener("pointercancel",Rt),rt.addEventListener("lostpointercapture",Rt),rt.addEventListener("webglcontextlost",z),t.addEventListener("keydown",Qt),tt("x").addEventListener("click",()=>{g.status==="running"||g.status==="countdown"?q():l()}),tt("pause").addEventListener("click",q),tt("help").addEventListener("click",()=>{if(Q)return;let L=g.status;Gt(L==="paused"?q:L==="finished"?()=>ot(!1):le)}),document.addEventListener("visibilitychange",ce),addEventListener("blur",q),addEventListener("pagehide",q),addEventListener("resize",U);let vt=typeof ResizeObserver=="function"?new ResizeObserver(U):null;vt&&vt.observe(t);let j=!0;try{St(),le(),D=requestAnimationFrame(ee)}catch(L){j=!1,console.error("run: 3D unavailable",L),Dt("3D\u306E \u304C\u3081\u3093\u3092 \u3072\u3089\u3051\u307E\u305B\u3093\u3067\u3057\u305F","\u3053\u306E\u7AEF\u672B\u3067\u306F \u3042\u305D\u3079\u306A\u3044\u307F\u305F\u3044")}return{ok:j,mode:"agility",get sim(){return g},get renderer(){return C},get frames(){return pt},get status(){return X?"lost":g.status},course:u,pause:q,escape(){return X?!1:Q?(R(),!0):g.status==="running"||g.status==="countdown"?(q(),!0):!1},dispose(){if(st)return;st=!0,cancelAnimationFrame(D),rt.removeEventListener("webglcontextlost",z),vt&&vt.disconnect(),document.removeEventListener("visibilitychange",ce),removeEventListener("blur",q),removeEventListener("pagehide",q),removeEventListener("resize",U),nt&&Ps(nt);let L=new Set,N=new Set;b&&b.traverse(Y=>{Y.geometry&&L.add(Y.geometry),Y.material&&[].concat(Y.material).forEach(xt=>N.add(xt)),Y.isInstancedMesh&&Y.dispose()}),L.forEach(Y=>Y.dispose()),N.forEach(Y=>Y.dispose()),S&&S.dispose(),C&&(C.dispose(),C.forceContextLoss()),t.innerHTML=""}}}var Xx="p4";return Vu(qx);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
