/* うちのこ日和：うちのこランの ゲーム（src/run/）と Three.js 0.170.0（MIT。ライセンスの 表示は さいご）を まとめた もの。
 * tools/run/build_run.mjs が 作る。手で 直さない（docs/RUN_DESIGN.md）。 */
var UchinokoRun=(()=>{var Va=Object.defineProperty;var Nu=Object.getOwnPropertyDescriptor;var Fu=Object.getOwnPropertyNames;var Ou=Object.prototype.hasOwnProperty;var Bu=(i,t)=>{for(var e in t)Va(i,e,{get:t[e],enumerable:!0})},zu=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Fu(t))!Ou.call(i,s)&&s!==e&&Va(i,s,{get:()=>t[s],enumerable:!(n=Nu(t,s))||n.enumerable});return i};var ku=i=>zu(Va({},"__esModule",{value:!0}),i);var Xx={};Bu(Xx,{AGILITY_COURSES:()=>br,COURSES:()=>_r,PET_SCALE:()=>Tu,VERSION:()=>Wx,agilityHelpHtml:()=>gc,agilityMap:()=>Du,courseMap:()=>Eu,disposePet3D:()=>Ps,formatClock:()=>yr,formatTime:()=>mi,helpHtml:()=>hc,makePet3D:()=>Rs,mountAgility:()=>Uu,mountRace:()=>Au,posePet3D:()=>Is,timeMs:()=>vr});var Vu=0,_c=1,Hu=2;var Ah=1,sr=2,On=3,ai=0,Ge=1,Ie=2,si=0,ss=1,yc=2,vc=3,Mc=4,Gu=5,Si=100,Wu=101,Xu=102,qu=103,$u=104,Yu=200,Zu=201,Ju=202,Ku=203,Mo=204,bo=205,ju=206,Qu=207,td=208,ed=209,nd=210,id=211,sd=212,rd=213,ad=214,So=0,wo=1,To=2,ls=3,Eo=4,Ao=5,Co=6,Ro=7,Ch=0,od=1,ld=2,ri=0,cd=1,hd=2,ud=3,dd=4,fd=5,pd=6,rr=7;var Rh=300,cs=301,hs=302,Io=303,Po=304,wa=306,Lo=1e3,Ei=1001,Do=1002,ln=1003,md=1004;var Sr=1005;var Tn=1006,Ha=1007;var Ai=1008;var Hn=1009,Ih=1010,Ph=1011,Js=1012,Wl=1013,Ci=1014,En=1015,ar=1016,Xl=1017,ql=1018,us=1020,Lh=35902,Dh=1021,Uh=1022,vn=1023,Nh=1024,Fh=1025,rs=1026,ds=1027,$l=1028,Yl=1029,Oh=1030,Zl=1031;var Jl=1033,Zr=33776,Jr=33777,Kr=33778,jr=33779,Uo=35840,No=35841,Fo=35842,Oo=35843,Bo=36196,zo=37492,ko=37496,Vo=37808,Ho=37809,Go=37810,Wo=37811,Xo=37812,qo=37813,$o=37814,Yo=37815,Zo=37816,Jo=37817,Ko=37818,jo=37819,Qo=37820,tl=37821,Qr=36492,el=36494,nl=36495,Bh=36283,il=36284,sl=36285,rl=36286;var ta=2300,al=2301,Ga=2302,bc=2400,Sc=2401,wc=2402;var gd=3200,xd=3201;var zh=0,_d=1,ii="",Ze="srgb",ws="srgb-linear",Ta="linear",ve="srgb";var ki=7680;var Tc=519,yd=512,vd=513,Md=514,kh=515,bd=516,Sd=517,wd=518,Td=519,Ec=35044;var Ac="300 es",zn=2e3,ea=2001,oi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},$e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Cc=1234567,Xs=Math.PI/180,Ks=180/Math.PI;function Fi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($e[i&255]+$e[i>>8&255]+$e[i>>16&255]+$e[i>>24&255]+"-"+$e[t&255]+$e[t>>8&255]+"-"+$e[t>>16&15|64]+$e[t>>24&255]+"-"+$e[e&63|128]+$e[e>>8&255]+"-"+$e[e>>16&255]+$e[e>>24&255]+$e[n&255]+$e[n>>8&255]+$e[n>>16&255]+$e[n>>24&255]).toLowerCase()}function He(i,t,e){return Math.max(t,Math.min(e,i))}function Kl(i,t){return(i%t+t)%t}function Ed(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Ad(i,t,e){return i!==t?(e-i)/(t-i):0}function qs(i,t,e){return(1-e)*i+e*t}function Cd(i,t,e,n){return qs(i,t,1-Math.exp(-e*n))}function Rd(i,t=1){return t-Math.abs(Kl(i,t*2)-t)}function Id(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Pd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ld(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Dd(i,t){return i+Math.random()*(t-i)}function Ud(i){return i*(.5-Math.random())}function Nd(i){i!==void 0&&(Cc=i);let t=Cc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Fd(i){return i*Xs}function Od(i){return i*Ks}function Bd(i){return(i&i-1)===0&&i!==0}function zd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function kd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Vd(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),f=a((t-n)/2),u=r((n-t)/2),m=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*f,o*c);break;case"YZY":i.set(l*f,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*f,o*h,o*c);break;case"XZX":i.set(o*h,l*m,l*u,o*c);break;case"YXY":i.set(l*u,o*h,l*m,o*c);break;case"ZYZ":i.set(l*m,l*u,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function es(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ke(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var en={DEG2RAD:Xs,RAD2DEG:Ks,generateUUID:Fi,clamp:He,euclideanModulo:Kl,mapLinear:Ed,inverseLerp:Ad,lerp:qs,damp:Cd,pingpong:Rd,smoothstep:Id,smootherstep:Pd,randInt:Ld,randFloat:Dd,randFloatSpread:Ud,seededRandom:Nd,degToRad:Fd,radToDeg:Od,isPowerOfTwo:Bd,ceilPowerOfTwo:zd,floorPowerOfTwo:kd,setQuaternionFromProperEuler:Vd,normalize:Ke,denormalize:es},Ct=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ae=class i{constructor(t,e,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],u=n[5],m=n[8],y=s[0],p=s[3],g=s[6],v=s[1],M=s[4],_=s[7],P=s[2],E=s[5],C=s[8];return r[0]=a*y+o*v+l*P,r[3]=a*p+o*M+l*E,r[6]=a*g+o*_+l*C,r[1]=c*y+h*v+d*P,r[4]=c*p+h*M+d*E,r[7]=c*g+h*_+d*C,r[2]=f*y+u*v+m*P,r[5]=f*p+u*M+m*E,r[8]=f*g+u*_+m*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,f=o*l-h*r,u=c*r-a*l,m=e*d+n*f+s*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return t[0]=d*y,t[1]=(s*c-h*n)*y,t[2]=(o*n-s*a)*y,t[3]=f*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=u*y,t[7]=(n*l-c*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Wa.makeScale(t,e)),this}rotate(t){return this.premultiply(Wa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Wa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Wa=new ae;function Vh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function na(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Hd(){let i=na("canvas");return i.style.display="block",i}var Rc={};function Gs(i){i in Rc||(Rc[i]=!0,console.warn(i))}function Gd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Wd(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Xd(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var he={enabled:!0,workingColorSpace:ws,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ve&&(i.r=kn(i.r),i.g=kn(i.g),i.b=kn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ve&&(i.r=as(i.r),i.g=as(i.g),i.b=as(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ii?Ta:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function as(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ic=[.64,.33,.3,.6,.15,.06],Pc=[.2126,.7152,.0722],Lc=[.3127,.329],Dc=new ae().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uc=new ae().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);he.define({[ws]:{primaries:Ic,whitePoint:Lc,transfer:Ta,toXYZ:Dc,fromXYZ:Uc,luminanceCoefficients:Pc,workingColorSpaceConfig:{unpackColorSpace:Ze},outputColorSpaceConfig:{drawingBufferColorSpace:Ze}},[Ze]:{primaries:Ic,whitePoint:Lc,transfer:ve,toXYZ:Dc,fromXYZ:Uc,luminanceCoefficients:Pc,outputColorSpaceConfig:{drawingBufferColorSpace:Ze}}});var Vi,ol=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Vi===void 0&&(Vi=na("canvas")),Vi.width=t.width,Vi.height=t.height;let n=Vi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Vi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=na("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=kn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(kn(e[n]/255)*255):e[n]=kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},qd=0,ia=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=Fi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Xa(s[a].image)):r.push(Xa(s[a]))}else r=Xa(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Xa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ol.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var $d=0,cn=class i extends oi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Ei,s=Ei,r=Tn,a=Ai,o=vn,l=Hn,c=i.DEFAULT_ANISOTROPY,h=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=Fi(),this.name="",this.source=new ia(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ae,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Lo:t.x=t.x-Math.floor(t.x);break;case Ei:t.x=t.x<0?0:1;break;case Do:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Lo:t.y=t.y-Math.floor(t.y);break;case Ei:t.y=t.y<0?0:1;break;case Do:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=Rh;cn.DEFAULT_ANISOTROPY=1;var Ce=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],f=l[1],u=l[5],m=l[9],y=l[2],p=l[6],g=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-y)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+y)<.1&&Math.abs(m+p)<.1&&Math.abs(c+u+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,_=(u+1)/2,P=(g+1)/2,E=(h+f)/4,C=(d+y)/4,T=(m+p)/4;return M>_&&M>P?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=E/n,r=C/n):_>P?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=E/s,r=T/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=C/r,s=T/r),this.set(n,s,r,e),this}let v=Math.sqrt((p-m)*(p-m)+(d-y)*(d-y)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(p-m)/v,this.y=(d-y)/v,this.z=(f-h)/v,this.w=Math.acos((c+u+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ll=class extends oi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new cn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new ia(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gn=class extends ll{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},sa=class extends cn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var cl=class extends cn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var li=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],f=r[a+0],u=r[a+1],m=r[a+2],y=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=f,t[e+1]=u,t[e+2]=m,t[e+3]=y;return}if(d!==y||l!==f||c!==u||h!==m){let p=1-o,g=l*f+c*u+h*m+d*y,v=g>=0?1:-1,M=1-g*g;if(M>Number.EPSILON){let P=Math.sqrt(M),E=Math.atan2(P,g*v);p=Math.sin(p*E)/P,o=Math.sin(o*E)/P}let _=o*v;if(l=l*p+f*_,c=c*p+u*_,h=h*p+m*_,d=d*p+y*_,p===1-o){let P=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=P,c*=P,h*=P,d*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],f=r[a+1],u=r[a+2],m=r[a+3];return t[e]=o*m+h*d+l*u-c*f,t[e+1]=l*m+h*f+c*d-o*u,t[e+2]=c*m+h*u+o*f-l*d,t[e+3]=h*m-o*d-l*f-c*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),f=l(n/2),u=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=f*h*d+c*u*m,this._y=c*u*d-f*h*m,this._z=c*h*m+f*u*d,this._w=c*h*d-f*u*m;break;case"YXZ":this._x=f*h*d+c*u*m,this._y=c*u*d-f*h*m,this._z=c*h*m-f*u*d,this._w=c*h*d+f*u*m;break;case"ZXY":this._x=f*h*d-c*u*m,this._y=c*u*d+f*h*m,this._z=c*h*m+f*u*d,this._w=c*h*d-f*u*m;break;case"ZYX":this._x=f*h*d-c*u*m,this._y=c*u*d+f*h*m,this._z=c*h*m-f*u*d,this._w=c*h*d+f*u*m;break;case"YZX":this._x=f*h*d+c*u*m,this._y=c*u*d+f*h*m,this._z=c*h*m-f*u*d,this._w=c*h*d-f*u*m;break;case"XZY":this._x=f*h*d-c*u*m,this._y=c*u*d-f*h*m,this._z=c*h*m+f*u*d,this._w=c*h*d+f*u*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],f=n+o+d;if(f>0){let u=.5/Math.sqrt(f+1);this._w=.25/u,this._x=(h-l)*u,this._y=(r-c)*u,this._z=(a-s)*u}else if(n>o&&n>d){let u=2*Math.sqrt(1+n-o-d);this._w=(h-l)/u,this._x=.25*u,this._y=(s+a)/u,this._z=(r+c)/u}else if(o>d){let u=2*Math.sqrt(1+o-n-d);this._w=(r-c)/u,this._x=(s+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+d-n-o);this._w=(a-s)/u,this._x=(r+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(He(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let u=1-e;return this._w=u*a+e*this._w,this._x=u*n+e*this._x,this._y=u*s+e*this._y,this._z=u*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Nc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Nc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return qa.copy(this).projectOnVector(t),this.sub(qa)}reflect(t){return this.sub(qa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},qa=new F,Nc=new li,Wn=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,xn):xn.fromBufferAttribute(r,a),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),wr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),wr.copy(n.boundingBox)),wr.applyMatrix4(t.matrixWorld),this.union(wr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Os),Tr.subVectors(this.max,Os),Hi.subVectors(t.a,Os),Gi.subVectors(t.b,Os),Wi.subVectors(t.c,Os),Kn.subVectors(Gi,Hi),jn.subVectors(Wi,Gi),gi.subVectors(Hi,Wi);let e=[0,-Kn.z,Kn.y,0,-jn.z,jn.y,0,-gi.z,gi.y,Kn.z,0,-Kn.x,jn.z,0,-jn.x,gi.z,0,-gi.x,-Kn.y,Kn.x,0,-jn.y,jn.x,0,-gi.y,gi.x,0];return!$a(e,Hi,Gi,Wi,Tr)||(e=[1,0,0,0,1,0,0,0,1],!$a(e,Hi,Gi,Wi,Tr))?!1:(Er.crossVectors(Kn,jn),e=[Er.x,Er.y,Er.z],$a(e,Hi,Gi,Wi,Tr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Ln=[new F,new F,new F,new F,new F,new F,new F,new F],xn=new F,wr=new Wn,Hi=new F,Gi=new F,Wi=new F,Kn=new F,jn=new F,gi=new F,Os=new F,Tr=new F,Er=new F,xi=new F;function $a(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){xi.fromArray(i,r);let o=s.x*Math.abs(xi.x)+s.y*Math.abs(xi.y)+s.z*Math.abs(xi.z),l=t.dot(xi),c=e.dot(xi),h=n.dot(xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Yd=new Wn,Bs=new F,Ya=new F,Ri=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Yd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Bs.subVectors(t,this.center);let e=Bs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Bs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ya.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Bs.copy(t.center).add(Ya)),this.expandByPoint(Bs.copy(t.center).sub(Ya))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Dn=new F,Za=new F,Ar=new F,Qn=new F,Ja=new F,Cr=new F,Ka=new F,hl=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Za.copy(t).add(e).multiplyScalar(.5),Ar.copy(e).sub(t).normalize(),Qn.copy(this.origin).sub(Za);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Ar),o=Qn.dot(this.direction),l=-Qn.dot(Ar),c=Qn.lengthSq(),h=Math.abs(1-a*a),d,f,u,m;if(h>0)if(d=a*l-o,f=a*o-l,m=r*h,d>=0)if(f>=-m)if(f<=m){let y=1/h;d*=y,f*=y,u=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;else f<=-m?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),u=-d*d+f*(f+2*l)+c):f<=m?(d=0,f=Math.min(Math.max(-r,-l),r),u=f*(f+2*l)+c):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),u=-d*d+f*(f+2*l)+c);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Za).addScaledVector(Ar,f),u}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);let n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,s,r){Ja.subVectors(e,t),Cr.subVectors(n,t),Ka.crossVectors(Ja,Cr);let a=this.direction.dot(Ka),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qn.subVectors(this.origin,t);let l=o*this.direction.dot(Cr.crossVectors(Qn,Cr));if(l<0)return null;let c=o*this.direction.dot(Ja.cross(Qn));if(c<0||l+c>a)return null;let h=-o*Qn.dot(Ka);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ge=class i{constructor(t,e,n,s,r,a,o,l,c,h,d,f,u,m,y,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,f,u,m,y,p)}set(t,e,n,s,r,a,o,l,c,h,d,f,u,m,y,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=f,g[3]=u,g[7]=m,g[11]=y,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Xi.setFromMatrixColumn(t,0).length(),r=1/Xi.setFromMatrixColumn(t,1).length(),a=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let f=a*h,u=a*d,m=o*h,y=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=u+m*c,e[5]=f-y*c,e[9]=-o*l,e[2]=y-f*c,e[6]=m+u*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*h,u=l*d,m=c*h,y=c*d;e[0]=f+y*o,e[4]=m*o-u,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=u*o-m,e[6]=y+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*h,u=l*d,m=c*h,y=c*d;e[0]=f-y*o,e[4]=-a*d,e[8]=m+u*o,e[1]=u+m*o,e[5]=a*h,e[9]=y-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*h,u=a*d,m=o*h,y=o*d;e[0]=l*h,e[4]=m*c-u,e[8]=f*c+y,e[1]=l*d,e[5]=y*c+f,e[9]=u*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,u=a*c,m=o*l,y=o*c;e[0]=l*h,e[4]=y-f*d,e[8]=m*d+u,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=u*d+m,e[10]=f-y*d}else if(t.order==="XZY"){let f=a*l,u=a*c,m=o*l,y=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=f*d+y,e[5]=a*h,e[9]=u*d-m,e[2]=m*d-u,e[6]=o*h,e[10]=y*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Zd,t,Jd)}lookAt(t,e,n){let s=this.elements;return an.subVectors(t,e),an.lengthSq()===0&&(an.z=1),an.normalize(),ti.crossVectors(n,an),ti.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),ti.crossVectors(n,an)),ti.normalize(),Rr.crossVectors(an,ti),s[0]=ti.x,s[4]=Rr.x,s[8]=an.x,s[1]=ti.y,s[5]=Rr.y,s[9]=an.y,s[2]=ti.z,s[6]=Rr.z,s[10]=an.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],u=n[13],m=n[2],y=n[6],p=n[10],g=n[14],v=n[3],M=n[7],_=n[11],P=n[15],E=s[0],C=s[4],T=s[8],b=s[12],x=s[1],w=s[5],I=s[9],D=s[13],z=s[2],q=s[6],G=s[10],lt=s[14],O=s[3],Q=s[7],pt=s[11],it=s[15];return r[0]=a*E+o*x+l*z+c*O,r[4]=a*C+o*w+l*q+c*Q,r[8]=a*T+o*I+l*G+c*pt,r[12]=a*b+o*D+l*lt+c*it,r[1]=h*E+d*x+f*z+u*O,r[5]=h*C+d*w+f*q+u*Q,r[9]=h*T+d*I+f*G+u*pt,r[13]=h*b+d*D+f*lt+u*it,r[2]=m*E+y*x+p*z+g*O,r[6]=m*C+y*w+p*q+g*Q,r[10]=m*T+y*I+p*G+g*pt,r[14]=m*b+y*D+p*lt+g*it,r[3]=v*E+M*x+_*z+P*O,r[7]=v*C+M*w+_*q+P*Q,r[11]=v*T+M*I+_*G+P*pt,r[15]=v*b+M*D+_*lt+P*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],f=t[10],u=t[14],m=t[3],y=t[7],p=t[11],g=t[15];return m*(+r*l*d-s*c*d-r*o*f+n*c*f+s*o*u-n*l*u)+y*(+e*l*u-e*c*f+r*a*f-s*a*u+s*c*h-r*l*h)+p*(+e*c*d-e*o*u-r*a*d+n*a*u+r*o*h-n*c*h)+g*(-s*o*h-e*l*d+e*o*f+s*a*d-n*a*f+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],f=t[10],u=t[11],m=t[12],y=t[13],p=t[14],g=t[15],v=d*p*c-y*f*c+y*l*u-o*p*u-d*l*g+o*f*g,M=m*f*c-h*p*c-m*l*u+a*p*u+h*l*g-a*f*g,_=h*y*c-m*d*c+m*o*u-a*y*u-h*o*g+a*d*g,P=m*d*l-h*y*l-m*o*f+a*y*f+h*o*p-a*d*p,E=e*v+n*M+s*_+r*P;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/E;return t[0]=v*C,t[1]=(y*f*r-d*p*r-y*s*u+n*p*u+d*s*g-n*f*g)*C,t[2]=(o*p*r-y*l*r+y*s*c-n*p*c-o*s*g+n*l*g)*C,t[3]=(d*l*r-o*f*r-d*s*c+n*f*c+o*s*u-n*l*u)*C,t[4]=M*C,t[5]=(h*p*r-m*f*r+m*s*u-e*p*u-h*s*g+e*f*g)*C,t[6]=(m*l*r-a*p*r-m*s*c+e*p*c+a*s*g-e*l*g)*C,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*u+e*l*u)*C,t[8]=_*C,t[9]=(m*d*r-h*y*r-m*n*u+e*y*u+h*n*g-e*d*g)*C,t[10]=(a*y*r-m*o*r+m*n*c-e*y*c-a*n*g+e*o*g)*C,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*u-e*o*u)*C,t[12]=P*C,t[13]=(h*y*s-m*d*s+m*n*f-e*y*f-h*n*p+e*d*p)*C,t[14]=(m*o*s-a*y*s-m*n*l+e*y*l+a*n*p-e*o*p)*C,t[15]=(a*d*s-h*o*s+h*n*l-e*d*l-a*n*f+e*o*f)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,f=r*c,u=r*h,m=r*d,y=a*h,p=a*d,g=o*d,v=l*c,M=l*h,_=l*d,P=n.x,E=n.y,C=n.z;return s[0]=(1-(y+g))*P,s[1]=(u+_)*P,s[2]=(m-M)*P,s[3]=0,s[4]=(u-_)*E,s[5]=(1-(f+g))*E,s[6]=(p+v)*E,s[7]=0,s[8]=(m+M)*C,s[9]=(p-v)*C,s[10]=(1-(f+y))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Xi.set(s[0],s[1],s[2]).length(),a=Xi.set(s[4],s[5],s[6]).length(),o=Xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],_n.copy(this);let c=1/r,h=1/a,d=1/o;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=d,_n.elements[9]*=d,_n.elements[10]*=d,e.setFromRotationMatrix(_n),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=zn){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s),u,m;if(o===zn)u=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===ea)u=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=u,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=zn){let l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(a-r),f=(e+t)*c,u=(n+s)*h,m,y;if(o===zn)m=(a+r)*d,y=-2*d;else if(o===ea)m=r*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-u,l[2]=0,l[6]=0,l[10]=y,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Xi=new F,_n=new ge,Zd=new F(0,0,0),Jd=new F(1,1,1),ti=new F,Rr=new F,an=new F,Fc=new ge,Oc=new li,An=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],f=s[6],u=s[10];switch(e){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-He(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Fc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Oc.setFromEuler(this),this.setFromQuaternion(Oc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};An.DEFAULT_ORDER="XYZ";var ra=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Kd=0,Bc=new F,qi=new li,Un=new ge,Ir=new F,zs=new F,jd=new F,Qd=new li,zc=new F(1,0,0),kc=new F(0,1,0),Vc=new F(0,0,1),Hc={type:"added"},tf={type:"removed"},$i={type:"childadded",child:null},ja={type:"childremoved",child:null},Ne=class i extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=Fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new F,e=new An,n=new li,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ge},normalMatrix:{value:new ae}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ra,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.multiply(qi),this}rotateOnWorldAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.premultiply(qi),this}rotateX(t){return this.rotateOnAxis(zc,t)}rotateY(t){return this.rotateOnAxis(kc,t)}rotateZ(t){return this.rotateOnAxis(Vc,t)}translateOnAxis(t,e){return Bc.copy(t).applyQuaternion(this.quaternion),this.position.add(Bc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zc,t)}translateY(t){return this.translateOnAxis(kc,t)}translateZ(t){return this.translateOnAxis(Vc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ir.copy(t):Ir.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(zs,Ir,this.up):Un.lookAt(Ir,zs,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),qi.setFromRotationMatrix(Un),this.quaternion.premultiply(qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Hc),$i.child=t,this.dispatchEvent($i),$i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(tf),ja.child=t,this.dispatchEvent(ja),ja.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Hc),$i.child=t,this.dispatchEvent($i),$i.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,t,jd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,Qd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),f=a(t.skeletons),u=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ne.DEFAULT_UP=new F(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var yn=new F,Nn=new F,Qa=new F,Fn=new F,Yi=new F,Zi=new F,Gc=new F,to=new F,eo=new F,no=new F,io=new Ce,so=new Ce,ro=new Ce,wi=class i{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),yn.subVectors(t,e),s.cross(yn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){yn.subVectors(s,e),Nn.subVectors(n,e),Qa.subVectors(t,e);let a=yn.dot(yn),o=yn.dot(Nn),l=yn.dot(Qa),c=Nn.dot(Nn),h=Nn.dot(Qa),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,u=(c*l-o*h)*f,m=(a*h-o*l)*f;return r.set(1-u-m,m,u)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Fn.x),l.addScaledVector(a,Fn.y),l.addScaledVector(o,Fn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return io.setScalar(0),so.setScalar(0),ro.setScalar(0),io.fromBufferAttribute(t,e),so.fromBufferAttribute(t,n),ro.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(io,r.x),a.addScaledVector(so,r.y),a.addScaledVector(ro,r.z),a}static isFrontFacing(t,e,n,s){return yn.subVectors(n,e),Nn.subVectors(t,e),yn.cross(Nn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),yn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Yi.subVectors(s,n),Zi.subVectors(r,n),to.subVectors(t,n);let l=Yi.dot(to),c=Zi.dot(to);if(l<=0&&c<=0)return e.copy(n);eo.subVectors(t,s);let h=Yi.dot(eo),d=Zi.dot(eo);if(h>=0&&d<=h)return e.copy(s);let f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Yi,a);no.subVectors(t,r);let u=Yi.dot(no),m=Zi.dot(no);if(m>=0&&u<=m)return e.copy(r);let y=u*c-l*m;if(y<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(Zi,o);let p=h*m-u*d;if(p<=0&&d-h>=0&&u-m>=0)return Gc.subVectors(r,s),o=(d-h)/(d-h+(u-m)),e.copy(s).addScaledVector(Gc,o);let g=1/(p+y+f);return a=y*g,o=f*g,e.copy(n).addScaledVector(Yi,a).addScaledVector(Zi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ei={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function ao(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var zt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=he.workingColorSpace){return this.r=t,this.g=e,this.b=n,he.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=he.workingColorSpace){if(t=Kl(t,1),e=He(e,0,1),n=He(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ao(a,r,t+1/3),this.g=ao(a,r,t),this.b=ao(a,r,t-1/3)}return he.toWorkingColorSpace(this,s),this}setStyle(t,e=Ze){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){let n=Hh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=as(t.r),this.g=as(t.g),this.b=as(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return he.fromWorkingColorSpace(Ye.copy(this),t),Math.round(He(Ye.r*255,0,255))*65536+Math.round(He(Ye.g*255,0,255))*256+Math.round(He(Ye.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=he.workingColorSpace){he.fromWorkingColorSpace(Ye.copy(this),e);let n=Ye.r,s=Ye.g,r=Ye.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=he.workingColorSpace){return he.fromWorkingColorSpace(Ye.copy(this),e),t.r=Ye.r,t.g=Ye.g,t.b=Ye.b,t}getStyle(t=Ze){he.fromWorkingColorSpace(Ye.copy(this),t);let e=Ye.r,n=Ye.g,s=Ye.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ei),this.setHSL(ei.h+t,ei.s+e,ei.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ei),t.getHSL(Pr);let n=qs(ei.h,Pr.h,e),s=qs(ei.s,Pr.s,e),r=qs(ei.l,Pr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ye=new zt;zt.NAMES=Hh;var ef=0,Ii=class extends oi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=Fi(),this.name="",this.blending=ss,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mo,this.blendDst=bo,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ss&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Mo&&(n.blendSrc=this.blendSrc),this.blendDst!==bo&&(n.blendDst=this.blendDst),this.blendEquation!==Si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ls&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Cn=class extends Ii{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=Ch,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ue=new F,Lr=new Ct,qe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ec,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Lr.fromBufferAttribute(this,e),Lr.applyMatrix3(t),this.setXY(e,Lr.x,Lr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=es(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ke(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=es(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=es(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=es(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=es(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),n=Ke(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),n=Ke(n,this.array),s=Ke(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),n=Ke(n,this.array),s=Ke(s,this.array),r=Ke(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ec&&(t.usage=this.usage),t}};var aa=class extends qe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var oa=class extends qe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var qt=class extends qe{constructor(t,e,n){super(new Float32Array(t),e,n)}},nf=0,dn=new ge,oo=new Ne,Ji=new F,on=new Wn,ks=new Wn,Ve=new F,xe=class i extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=Fi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Vh(t)?oa:aa)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ae().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return dn.makeRotationFromQuaternion(t),this.applyMatrix4(dn),this}rotateX(t){return dn.makeRotationX(t),this.applyMatrix4(dn),this}rotateY(t){return dn.makeRotationY(t),this.applyMatrix4(dn),this}rotateZ(t){return dn.makeRotationZ(t),this.applyMatrix4(dn),this}translate(t,e,n){return dn.makeTranslation(t,e,n),this.applyMatrix4(dn),this}scale(t,e,n){return dn.makeScale(t,e,n),this.applyMatrix4(dn),this}lookAt(t){return oo.lookAt(t),oo.updateMatrix(),this.applyMatrix4(oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new qt(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let n=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];ks.setFromBufferAttribute(o),this.morphTargetsRelative?(Ve.addVectors(on.min,ks.min),on.expandByPoint(Ve),Ve.addVectors(on.max,ks.max),on.expandByPoint(Ve)):(on.expandByPoint(ks.min),on.expandByPoint(ks.max))}on.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ve.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ve));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ve.fromBufferAttribute(o,c),l&&(Ji.fromBufferAttribute(t,c),Ve.add(Ji)),s=Math.max(s,n.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qe(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let T=0;T<n.count;T++)o[T]=new F,l[T]=new F;let c=new F,h=new F,d=new F,f=new Ct,u=new Ct,m=new Ct,y=new F,p=new F;function g(T,b,x){c.fromBufferAttribute(n,T),h.fromBufferAttribute(n,b),d.fromBufferAttribute(n,x),f.fromBufferAttribute(r,T),u.fromBufferAttribute(r,b),m.fromBufferAttribute(r,x),h.sub(c),d.sub(c),u.sub(f),m.sub(f);let w=1/(u.x*m.y-m.x*u.y);isFinite(w)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(d,-u.y).multiplyScalar(w),p.copy(d).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(w),o[T].add(y),o[b].add(y),o[x].add(y),l[T].add(p),l[b].add(p),l[x].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let T=0,b=v.length;T<b;++T){let x=v[T],w=x.start,I=x.count;for(let D=w,z=w+I;D<z;D+=3)g(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let M=new F,_=new F,P=new F,E=new F;function C(T){P.fromBufferAttribute(s,T),E.copy(P);let b=o[T];M.copy(b),M.sub(P.multiplyScalar(P.dot(b))).normalize(),_.crossVectors(E,b);let w=_.dot(l[T])<0?-1:1;a.setXYZW(T,M.x,M.y,M.z,w)}for(let T=0,b=v.length;T<b;++T){let x=v[T],w=x.start,I=x.count;for(let D=w,z=w+I;D<z;D+=3)C(t.getX(D+0)),C(t.getX(D+1)),C(t.getX(D+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,u=n.count;f<u;f++)n.setXYZ(f,0,0,0);let s=new F,r=new F,a=new F,o=new F,l=new F,c=new F,h=new F,d=new F;if(t)for(let f=0,u=t.count;f<u;f+=3){let m=t.getX(f+0),y=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,p),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,u=e.count;f<u;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h),u=0,m=0;for(let y=0,p=l.length;y<p;y++){o.isInterleavedBufferAttribute?u=l[y]*o.data.stride+o.offset:u=l[y]*h;for(let g=0;g<h;g++)f[m++]=c[u++]}return new qe(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let f=c[h],u=t(f,n);l.push(u)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){let u=c[d];h.push(u.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let f=0,u=d.length;f<u;f++)h.push(d[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wc=new ge,_i=new hl,Dr=new Ri,Xc=new F,Ur=new F,Nr=new F,Fr=new F,lo=new F,Or=new F,qc=new F,Br=new F,fe=class extends Ne{constructor(t=new xe,e=new Cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Or.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(lo.fromBufferAttribute(d,t),a?Or.addScaledVector(lo,h):Or.addScaledVector(lo.sub(e),h))}e.add(Or)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(Dr.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Dr,Xc)===null||_i.origin.distanceToSquared(Xc)>(t.far-t.near)**2))&&(Wc.copy(r).invert(),_i.copy(t.ray).applyMatrix4(Wc),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=f.length;m<y;m++){let p=f[m],g=a[p.materialIndex],v=Math.max(p.start,u.start),M=Math.min(o.count,Math.min(p.start+p.count,u.start+u.count));for(let _=v,P=M;_<P;_+=3){let E=o.getX(_),C=o.getX(_+1),T=o.getX(_+2);s=zr(this,g,t,n,c,h,d,E,C,T),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,u.start),y=Math.min(o.count,u.start+u.count);for(let p=m,g=y;p<g;p+=3){let v=o.getX(p),M=o.getX(p+1),_=o.getX(p+2);s=zr(this,a,t,n,c,h,d,v,M,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,y=f.length;m<y;m++){let p=f[m],g=a[p.materialIndex],v=Math.max(p.start,u.start),M=Math.min(l.count,Math.min(p.start+p.count,u.start+u.count));for(let _=v,P=M;_<P;_+=3){let E=_,C=_+1,T=_+2;s=zr(this,g,t,n,c,h,d,E,C,T),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,u.start),y=Math.min(l.count,u.start+u.count);for(let p=m,g=y;p<g;p+=3){let v=p,M=p+1,_=p+2;s=zr(this,a,t,n,c,h,d,v,M,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function sf(i,t,e,n,s,r,a,o){let l;if(t.side===Ge?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ai,o),l===null)return null;Br.copy(o),Br.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Br);return c<e.near||c>e.far?null:{distance:c,point:Br.clone(),object:i}}function zr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Ur),i.getVertexPosition(l,Nr),i.getVertexPosition(c,Fr);let h=sf(i,t,e,n,Ur,Nr,Fr,qc);if(h){let d=new F;wi.getBarycoord(qc,Ur,Nr,Fr,d),s&&(h.uv=wi.getInterpolatedAttribute(s,o,l,c,d,new Ct)),r&&(h.uv1=wi.getInterpolatedAttribute(r,o,l,c,d,new Ct)),a&&(h.normal=wi.getInterpolatedAttribute(a,o,l,c,d,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new F,materialIndex:0};wi.getNormal(Ur,Nr,Fr,f.normal),h.face=f,h.barycoord=d}return h}var Te=class i extends xe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],f=0,u=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(d,2));function m(y,p,g,v,M,_,P,E,C,T,b){let x=_/C,w=P/T,I=_/2,D=P/2,z=E/2,q=C+1,G=T+1,lt=0,O=0,Q=new F;for(let pt=0;pt<G;pt++){let it=pt*w-D;for(let ht=0;ht<q;ht++){let yt=ht*x-I;Q[y]=yt*v,Q[p]=it*M,Q[g]=z,c.push(Q.x,Q.y,Q.z),Q[y]=0,Q[p]=0,Q[g]=E>0?1:-1,h.push(Q.x,Q.y,Q.z),d.push(ht/C),d.push(1-pt/T),lt+=1}}for(let pt=0;pt<T;pt++)for(let it=0;it<C;it++){let ht=f+it+q*pt,yt=f+it+q*(pt+1),W=f+(it+1)+q*(pt+1),nt=f+(it+1)+q*pt;l.push(ht,yt,nt),l.push(yt,W,nt),O+=6}o.addGroup(u,O,b),u+=O,f+=lt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function fs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function je(i){let t={};for(let e=0;e<i.length;e++){let n=fs(i[e]);for(let s in n)t[s]=n[s]}return t}function rf(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Gh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}var af={clone:fs,merge:je},of=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,tn=class extends Ii{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=of,this.fragmentShader=lf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=fs(t.uniforms),this.uniformsGroups=rf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},la=class extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ni=new F,$c=new Ct,Yc=new Ct,Xe=class extends la{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ks*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Xs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ks*2*Math.atan(Math.tan(Xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ni.x,ni.y).multiplyScalar(-t/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ni.x,ni.y).multiplyScalar(-t/ni.z)}getViewSize(t,e){return this.getViewBounds(t,$c,Yc),e.subVectors(Yc,$c)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Xs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ki=-90,ji=1,ul=class extends Ne{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Xe(Ki,ji,t,e);s.layers=this.layers,this.add(s);let r=new Xe(Ki,ji,t,e);r.layers=this.layers,this.add(r);let a=new Xe(Ki,ji,t,e);a.layers=this.layers,this.add(a);let o=new Xe(Ki,ji,t,e);o.layers=this.layers,this.add(o);let l=new Xe(Ki,ji,t,e);l.layers=this.layers,this.add(l);let c=new Xe(Ki,ji,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ea)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,f,u),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ca=class extends cn{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:cs,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},dl=class extends Gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ca(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Tn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Te(5,5,5),r=new tn({name:"CubemapFromEquirect",uniforms:fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:si});r.uniforms.tEquirect.value=e;let a=new fe(s,r),o=e.minFilter;return e.minFilter===Ai&&(e.minFilter=Tn),new ul(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},co=new F,cf=new F,hf=new ae,Bn=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=co.subVectors(n,e).cross(cf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(co),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||hf.getNormalMatrix(t),s=this.coplanarPoint(co).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},yi=new Ri,kr=new F,js=class{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,a=new Bn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=zn){let n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],f=s[7],u=s[8],m=s[9],y=s[10],p=s[11],g=s[12],v=s[13],M=s[14],_=s[15];if(n[0].setComponents(l-r,f-c,p-u,_-g).normalize(),n[1].setComponents(l+r,f+c,p+u,_+g).normalize(),n[2].setComponents(l+a,f+h,p+m,_+v).normalize(),n[3].setComponents(l-a,f-h,p-m,_-v).normalize(),n[4].setComponents(l-o,f-d,p-y,_-M).normalize(),e===zn)n[5].setComponents(l+o,f+d,p+y,_+M).normalize();else if(e===ea)n[5].setComponents(o,d,y,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(t){return yi.center.set(0,0,0),yi.radius=.7071067811865476,yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(kr.x=s.normal.x>0?t.max.x:t.min.x,kr.y=s.normal.y>0?t.max.y:t.min.y,kr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(kr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Wh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function uf(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=i.SHORT;else if(c instanceof Uint32Array)u=i.UNSIGNED_INT;else if(c instanceof Int32Array)u=i.INT;else if(c instanceof Int8Array)u=i.BYTE;else if(c instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((u,m)=>u.start-m.start);let f=0;for(let u=1;u<d.length;u++){let m=d[f],y=d[u];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++f,d[f]=y)}d.length=f+1;for(let u=0,m=d.length;u<m;u++){let y=d[u];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var ps=class i extends xe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,f=e/l,u=[],m=[],y=[],p=[];for(let g=0;g<h;g++){let v=g*f-a;for(let M=0;M<c;M++){let _=M*d-r;m.push(_,-v,0),y.push(0,0,1),p.push(M/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<o;v++){let M=v+c*g,_=v+c*(g+1),P=v+1+c*(g+1),E=v+1+c*g;u.push(M,_,E),u.push(_,P,E)}this.setIndex(u),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(y,3)),this.setAttribute("uv",new qt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},df=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ff=`#ifdef USE_ALPHAHASH
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
#endif`,pf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_f=`#ifdef USE_AOMAP
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
#endif`,yf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vf=`#ifdef USE_BATCHING
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
#endif`,Mf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Tf=`#ifdef USE_IRIDESCENCE
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
#endif`,Ef=`#ifdef USE_BUMPMAP
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
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Lf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Df=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Uf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Nf=`#define PI 3.141592653589793
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
} // validated`,Ff=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Of=`vec3 transformedNormal = objectNormal;
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
#endif`,Bf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wf=`#ifdef USE_ENVMAP
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
#endif`,Xf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qf=`#ifdef USE_ENVMAP
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
#endif`,$f=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yf=`#ifdef USE_ENVMAP
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
#endif`,Zf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qf=`#ifdef USE_GRADIENTMAP
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
}`,tp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ep=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,np=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ip=`uniform bool receiveShadow;
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
#endif`,sp=`#ifdef USE_ENVMAP
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
#endif`,rp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,op=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cp=`PhysicalMaterial material;
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
#endif`,hp=`struct PhysicalMaterial {
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
}`,up=`
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
#endif`,dp=`#if defined( RE_IndirectDiffuse )
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
#endif`,fp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_p=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Mp=`#if defined( USE_POINTS_UV )
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
#endif`,bp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ep=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ap=`#ifdef USE_MORPHTARGETS
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
#endif`,Cp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ip=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Up=`#ifdef USE_NORMALMAP
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
#endif`,Np=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Op=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Vp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$p=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jp=`float getShadowMask() {
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
}`,Kp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jp=`#ifdef USE_SKINNING
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
#endif`,Qp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tm=`#ifdef USE_SKINNING
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
#endif`,em=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,im=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rm=`#ifdef USE_TRANSMISSION
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
#endif`,am=`#ifdef USE_TRANSMISSION
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
#endif`,om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,um=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dm=`uniform sampler2D t2D;
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
}`,fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,mm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xm=`#include <common>
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
}`,_m=`#if DEPTH_PACKING == 3200
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
}`,ym=`#define DISTANCE
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
}`,vm=`#define DISTANCE
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
}`,Mm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sm=`uniform float scale;
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
}`,wm=`uniform vec3 diffuse;
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
}`,Tm=`#include <common>
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
}`,Em=`uniform vec3 diffuse;
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
}`,Am=`#define LAMBERT
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
}`,Cm=`#define LAMBERT
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
}`,Rm=`#define MATCAP
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
}`,Im=`#define MATCAP
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
}`,Pm=`#define NORMAL
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
}`,Lm=`#define NORMAL
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
}`,Dm=`#define PHONG
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
}`,Um=`#define PHONG
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
}`,Nm=`#define STANDARD
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
}`,Fm=`#define STANDARD
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
}`,Om=`#define TOON
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
}`,Bm=`#define TOON
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
}`,zm=`uniform float size;
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
}`,km=`uniform vec3 diffuse;
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
}`,Vm=`#include <common>
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
}`,Hm=`uniform vec3 color;
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
}`,Gm=`uniform float rotation;
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
}`,Wm=`uniform vec3 diffuse;
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
}`,oe={alphahash_fragment:df,alphahash_pars_fragment:ff,alphamap_fragment:pf,alphamap_pars_fragment:mf,alphatest_fragment:gf,alphatest_pars_fragment:xf,aomap_fragment:_f,aomap_pars_fragment:yf,batching_pars_vertex:vf,batching_vertex:Mf,begin_vertex:bf,beginnormal_vertex:Sf,bsdfs:wf,iridescence_fragment:Tf,bumpmap_pars_fragment:Ef,clipping_planes_fragment:Af,clipping_planes_pars_fragment:Cf,clipping_planes_pars_vertex:Rf,clipping_planes_vertex:If,color_fragment:Pf,color_pars_fragment:Lf,color_pars_vertex:Df,color_vertex:Uf,common:Nf,cube_uv_reflection_fragment:Ff,defaultnormal_vertex:Of,displacementmap_pars_vertex:Bf,displacementmap_vertex:zf,emissivemap_fragment:kf,emissivemap_pars_fragment:Vf,colorspace_fragment:Hf,colorspace_pars_fragment:Gf,envmap_fragment:Wf,envmap_common_pars_fragment:Xf,envmap_pars_fragment:qf,envmap_pars_vertex:$f,envmap_physical_pars_fragment:sp,envmap_vertex:Yf,fog_vertex:Zf,fog_pars_vertex:Jf,fog_fragment:Kf,fog_pars_fragment:jf,gradientmap_pars_fragment:Qf,lightmap_pars_fragment:tp,lights_lambert_fragment:ep,lights_lambert_pars_fragment:np,lights_pars_begin:ip,lights_toon_fragment:rp,lights_toon_pars_fragment:ap,lights_phong_fragment:op,lights_phong_pars_fragment:lp,lights_physical_fragment:cp,lights_physical_pars_fragment:hp,lights_fragment_begin:up,lights_fragment_maps:dp,lights_fragment_end:fp,logdepthbuf_fragment:pp,logdepthbuf_pars_fragment:mp,logdepthbuf_pars_vertex:gp,logdepthbuf_vertex:xp,map_fragment:_p,map_pars_fragment:yp,map_particle_fragment:vp,map_particle_pars_fragment:Mp,metalnessmap_fragment:bp,metalnessmap_pars_fragment:Sp,morphinstance_vertex:wp,morphcolor_vertex:Tp,morphnormal_vertex:Ep,morphtarget_pars_vertex:Ap,morphtarget_vertex:Cp,normal_fragment_begin:Rp,normal_fragment_maps:Ip,normal_pars_fragment:Pp,normal_pars_vertex:Lp,normal_vertex:Dp,normalmap_pars_fragment:Up,clearcoat_normal_fragment_begin:Np,clearcoat_normal_fragment_maps:Fp,clearcoat_pars_fragment:Op,iridescence_pars_fragment:Bp,opaque_fragment:zp,packing:kp,premultiplied_alpha_fragment:Vp,project_vertex:Hp,dithering_fragment:Gp,dithering_pars_fragment:Wp,roughnessmap_fragment:Xp,roughnessmap_pars_fragment:qp,shadowmap_pars_fragment:$p,shadowmap_pars_vertex:Yp,shadowmap_vertex:Zp,shadowmask_pars_fragment:Jp,skinbase_vertex:Kp,skinning_pars_vertex:jp,skinning_vertex:Qp,skinnormal_vertex:tm,specularmap_fragment:em,specularmap_pars_fragment:nm,tonemapping_fragment:im,tonemapping_pars_fragment:sm,transmission_fragment:rm,transmission_pars_fragment:am,uv_pars_fragment:om,uv_pars_vertex:lm,uv_vertex:cm,worldpos_vertex:hm,background_vert:um,background_frag:dm,backgroundCube_vert:fm,backgroundCube_frag:pm,cube_vert:mm,cube_frag:gm,depth_vert:xm,depth_frag:_m,distanceRGBA_vert:ym,distanceRGBA_frag:vm,equirect_vert:Mm,equirect_frag:bm,linedashed_vert:Sm,linedashed_frag:wm,meshbasic_vert:Tm,meshbasic_frag:Em,meshlambert_vert:Am,meshlambert_frag:Cm,meshmatcap_vert:Rm,meshmatcap_frag:Im,meshnormal_vert:Pm,meshnormal_frag:Lm,meshphong_vert:Dm,meshphong_frag:Um,meshphysical_vert:Nm,meshphysical_frag:Fm,meshtoon_vert:Om,meshtoon_frag:Bm,points_vert:zm,points_frag:km,shadow_vert:Vm,shadow_frag:Hm,sprite_vert:Gm,sprite_frag:Wm},Tt={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ae},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ae}},envmap:{envMap:{value:null},envMapRotation:{value:new ae},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ae}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ae}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ae},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ae},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ae},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ae}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ae}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ae}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0},uvTransform:{value:new ae}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ae},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0}}},wn={basic:{uniforms:je([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:oe.meshbasic_vert,fragmentShader:oe.meshbasic_frag},lambert:{uniforms:je([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)}}]),vertexShader:oe.meshlambert_vert,fragmentShader:oe.meshlambert_frag},phong:{uniforms:je([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:oe.meshphong_vert,fragmentShader:oe.meshphong_frag},standard:{uniforms:je([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag},toon:{uniforms:je([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new zt(0)}}]),vertexShader:oe.meshtoon_vert,fragmentShader:oe.meshtoon_frag},matcap:{uniforms:je([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:oe.meshmatcap_vert,fragmentShader:oe.meshmatcap_frag},points:{uniforms:je([Tt.points,Tt.fog]),vertexShader:oe.points_vert,fragmentShader:oe.points_frag},dashed:{uniforms:je([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:oe.linedashed_vert,fragmentShader:oe.linedashed_frag},depth:{uniforms:je([Tt.common,Tt.displacementmap]),vertexShader:oe.depth_vert,fragmentShader:oe.depth_frag},normal:{uniforms:je([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:oe.meshnormal_vert,fragmentShader:oe.meshnormal_frag},sprite:{uniforms:je([Tt.sprite,Tt.fog]),vertexShader:oe.sprite_vert,fragmentShader:oe.sprite_frag},background:{uniforms:{uvTransform:{value:new ae},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:oe.background_vert,fragmentShader:oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ae}},vertexShader:oe.backgroundCube_vert,fragmentShader:oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:oe.cube_vert,fragmentShader:oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:oe.equirect_vert,fragmentShader:oe.equirect_frag},distanceRGBA:{uniforms:je([Tt.common,Tt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:oe.distanceRGBA_vert,fragmentShader:oe.distanceRGBA_frag},shadow:{uniforms:je([Tt.lights,Tt.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:oe.shadow_vert,fragmentShader:oe.shadow_frag}};wn.physical={uniforms:je([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ae},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ae},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ae},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ae},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ae},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ae},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ae},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ae},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ae},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ae},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ae},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ae}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag};var Vr={r:0,b:0,g:0},vi=new An,Xm=new ge;function qm(i,t,e,n,s,r,a){let o=new zt(0),l=r===!0?0:1,c,h,d=null,f=0,u=null;function m(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?e:t).get(M)),M}function y(v){let M=!1,_=m(v);_===null?g(o,l):_&&_.isColor&&(g(_,1),M=!0);let P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(v,M){let _=m(M);_&&(_.isCubeTexture||_.mapping===wa)?(h===void 0&&(h=new fe(new Te(1,1,1),new tn({name:"BackgroundCubeMaterial",uniforms:fs(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),vi.copy(M.backgroundRotation),vi.x*=-1,vi.y*=-1,vi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Xm.makeRotationFromEuler(vi)),h.material.toneMapped=he.getTransfer(_.colorSpace)!==ve,(d!==_||f!==_.version||u!==i.toneMapping)&&(h.material.needsUpdate=!0,d=_,f=_.version,u=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new fe(new ps(2,2),new tn({name:"BackgroundMaterial",uniforms:fs(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=he.getTransfer(_.colorSpace)!==ve,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||f!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=_,f=_.version,u=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function g(v,M){v.getRGB(Vr,Gh(i)),n.buffers.color.setClear(Vr.r,Vr.g,Vr.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(v,M=1){o.set(v),l=M,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,g(o,l)},render:y,addToRenderList:p}}function $m(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(x,w,I,D,z){let q=!1,G=d(D,I,w);r!==G&&(r=G,c(r.object)),q=u(x,D,I,z),q&&m(x,D,I,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,_(x,w,I,D),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function d(x,w,I){let D=I.wireframe===!0,z=n[x.id];z===void 0&&(z={},n[x.id]=z);let q=z[w.id];q===void 0&&(q={},z[w.id]=q);let G=q[D];return G===void 0&&(G=f(l()),q[D]=G),G}function f(x){let w=[],I=[],D=[];for(let z=0;z<e;z++)w[z]=0,I[z]=0,D[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:I,attributeDivisors:D,object:x,attributes:{},index:null}}function u(x,w,I,D){let z=r.attributes,q=w.attributes,G=0,lt=I.getAttributes();for(let O in lt)if(lt[O].location>=0){let pt=z[O],it=q[O];if(it===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&(it=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&(it=x.instanceColor)),pt===void 0||pt.attribute!==it||it&&pt.data!==it.data)return!0;G++}return r.attributesNum!==G||r.index!==D}function m(x,w,I,D){let z={},q=w.attributes,G=0,lt=I.getAttributes();for(let O in lt)if(lt[O].location>=0){let pt=q[O];pt===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&(pt=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&(pt=x.instanceColor));let it={};it.attribute=pt,pt&&pt.data&&(it.data=pt.data),z[O]=it,G++}r.attributes=z,r.attributesNum=G,r.index=D}function y(){let x=r.newAttributes;for(let w=0,I=x.length;w<I;w++)x[w]=0}function p(x){g(x,0)}function g(x,w){let I=r.newAttributes,D=r.enabledAttributes,z=r.attributeDivisors;I[x]=1,D[x]===0&&(i.enableVertexAttribArray(x),D[x]=1),z[x]!==w&&(i.vertexAttribDivisor(x,w),z[x]=w)}function v(){let x=r.newAttributes,w=r.enabledAttributes;for(let I=0,D=w.length;I<D;I++)w[I]!==x[I]&&(i.disableVertexAttribArray(I),w[I]=0)}function M(x,w,I,D,z,q,G){G===!0?i.vertexAttribIPointer(x,w,I,z,q):i.vertexAttribPointer(x,w,I,D,z,q)}function _(x,w,I,D){y();let z=D.attributes,q=I.getAttributes(),G=w.defaultAttributeValues;for(let lt in q){let O=q[lt];if(O.location>=0){let Q=z[lt];if(Q===void 0&&(lt==="instanceMatrix"&&x.instanceMatrix&&(Q=x.instanceMatrix),lt==="instanceColor"&&x.instanceColor&&(Q=x.instanceColor)),Q!==void 0){let pt=Q.normalized,it=Q.itemSize,ht=t.get(Q);if(ht===void 0)continue;let yt=ht.buffer,W=ht.type,nt=ht.bytesPerElement,ft=W===i.INT||W===i.UNSIGNED_INT||Q.gpuType===Wl;if(Q.isInterleavedBufferAttribute){let k=Q.data,tt=k.stride,st=Q.offset;if(k.isInstancedInterleavedBuffer){for(let mt=0;mt<O.locationSize;mt++)g(O.location+mt,k.meshPerAttribute);x.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let mt=0;mt<O.locationSize;mt++)p(O.location+mt);i.bindBuffer(i.ARRAY_BUFFER,yt);for(let mt=0;mt<O.locationSize;mt++)M(O.location+mt,it/O.locationSize,W,pt,tt*nt,(st+it/O.locationSize*mt)*nt,ft)}else{if(Q.isInstancedBufferAttribute){for(let k=0;k<O.locationSize;k++)g(O.location+k,Q.meshPerAttribute);x.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let k=0;k<O.locationSize;k++)p(O.location+k);i.bindBuffer(i.ARRAY_BUFFER,yt);for(let k=0;k<O.locationSize;k++)M(O.location+k,it/O.locationSize,W,pt,it*nt,it/O.locationSize*k*nt,ft)}}else if(G!==void 0){let pt=G[lt];if(pt!==void 0)switch(pt.length){case 2:i.vertexAttrib2fv(O.location,pt);break;case 3:i.vertexAttrib3fv(O.location,pt);break;case 4:i.vertexAttrib4fv(O.location,pt);break;default:i.vertexAttrib1fv(O.location,pt)}}}}v()}function P(){T();for(let x in n){let w=n[x];for(let I in w){let D=w[I];for(let z in D)h(D[z].object),delete D[z];delete w[I]}delete n[x]}}function E(x){if(n[x.id]===void 0)return;let w=n[x.id];for(let I in w){let D=w[I];for(let z in D)h(D[z].object),delete D[z];delete w[I]}delete n[x.id]}function C(x){for(let w in n){let I=n[w];if(I[x.id]===void 0)continue;let D=I[x.id];for(let z in D)h(D[z].object),delete D[z];delete I[x.id]}}function T(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:b,dispose:P,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:p,disableUnusedAttributes:v}}function Ym(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let u=0;for(let m=0;m<d;m++)u+=h[m];e.update(u,n,1)}function l(c,h,d,f){if(d===0)return;let u=t.get("WEBGL_multi_draw");if(u===null)for(let m=0;m<c.length;m++)a(c[m],h[m],f[m]);else{u.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,d);let m=0;for(let y=0;y<d;y++)m+=h[y]*f[y];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Zm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==vn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let T=C===ar&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Hn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==En&&!T)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=m>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:u,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:P,maxSamples:E}}function Jm(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Bn,o=new ae,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let u=d.length!==0||f||n!==0||s;return s=f,n=d.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=h(d,f,0)},this.setState=function(d,f,u){let m=d.clippingPlanes,y=d.clipIntersection,p=d.clipShadows,g=i.get(d);if(!s||m===null||m.length===0||r&&!p)r?h(null):c();else{let v=r?0:n,M=v*4,_=g.clippingState||null;l.value=_,_=h(m,f,M,u);for(let P=0;P!==M;++P)_[P]=e[P];g.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,f,u,m){let y=d!==null?d.length:0,p=null;if(y!==0){if(p=l.value,m!==!0||p===null){let g=u+y*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<g)&&(p=new Float32Array(g));for(let M=0,_=u;M!==y;++M,_+=4)a.copy(d[M]).applyMatrix4(v,o),a.normal.toArray(p,_),p[_+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,p}}function Km(i){let t=new WeakMap;function e(a,o){return o===Io?a.mapping=cs:o===Po&&(a.mapping=hs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Io||o===Po)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new dl(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ha=class extends la{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ns=4,Zc=[.125,.215,.35,.446,.526,.582],Ti=20,ho=new ha,Jc=new zt,uo=null,fo=0,po=0,mo=!1,bi=(1+Math.sqrt(5))/2,Qi=1/bi,Kc=[new F(-bi,Qi,0),new F(bi,Qi,0),new F(-Qi,0,bi),new F(Qi,0,bi),new F(0,bi,-Qi),new F(0,bi,Qi),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],ua=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){uo=this._renderer.getRenderTarget(),fo=this._renderer.getActiveCubeFace(),po=this._renderer.getActiveMipmapLevel(),mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=th(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(uo,fo,po),this._renderer.xr.enabled=mo,t.scissorTest=!1,Hr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===cs||t.mapping===hs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),uo=this._renderer.getRenderTarget(),fo=this._renderer.getActiveCubeFace(),po=this._renderer.getActiveMipmapLevel(),mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:ar,format:vn,colorSpace:ws,depthBuffer:!1},s=jc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jc(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jm(r)),this._blurMaterial=Qm(r,t,e)}return s}_compileMaterial(t){let e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,ho)}_sceneToCubeUV(t,e,n,s){let o=new Xe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Jc),h.toneMapping=ri,h.autoClear=!1;let u=new Cn({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),m=new fe(new Te,u),y=!1,p=t.background;p?p.isColor&&(u.color.copy(p),t.background=null,y=!0):(u.color.copy(Jc),y=!0);for(let g=0;g<6;g++){let v=g%3;v===0?(o.up.set(0,l[g],0),o.lookAt(c[g],0,0)):v===1?(o.up.set(0,0,l[g]),o.lookAt(0,c[g],0)):(o.up.set(0,l[g],0),o.lookAt(0,0,c[g]));let M=this._cubeSize;Hr(s,v*M,g>2?M:0,M,M),h.setRenderTarget(s),y&&h.render(m,o),h.render(t,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===cs||t.mapping===hs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=th()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qc());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new fe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Hr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,ho)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Kc[(s-r-1)%Kc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new fe(this._lodPlanes[s],c),f=c.uniforms,u=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*u):2*Math.PI/(2*Ti-1),y=r/m,p=isFinite(r)?1+Math.floor(h*y):Ti;p>Ti&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ti}`);let g=[],v=0;for(let C=0;C<Ti;++C){let T=C/y,b=Math.exp(-T*T/2);g.push(b),C===0?v+=b:C<p&&(v+=2*b)}for(let C=0;C<g.length;C++)g[C]=g[C]/v;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=g,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:M}=this;f.dTheta.value=m,f.mipInt.value=M-n;let _=this._sizeLods[s],P=3*_*(s>M-ns?s-M+ns:0),E=4*(this._cubeSize-_);Hr(e,P,E,3*_,2*_),l.setRenderTarget(e),l.render(d,ho)}};function jm(i){let t=[],e=[],n=[],s=i,r=i-ns+1+Zc.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-ns?l=Zc[a-i+ns-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],u=6,m=6,y=3,p=2,g=1,v=new Float32Array(y*m*u),M=new Float32Array(p*m*u),_=new Float32Array(g*m*u);for(let E=0;E<u;E++){let C=E%3*2/3-1,T=E>2?0:-1,b=[C,T,0,C+2/3,T,0,C+2/3,T+1,0,C,T,0,C+2/3,T+1,0,C,T+1,0];v.set(b,y*m*E),M.set(f,p*m*E);let x=[E,E,E,E,E,E];_.set(x,g*m*E)}let P=new xe;P.setAttribute("position",new qe(v,y)),P.setAttribute("uv",new qe(M,p)),P.setAttribute("faceIndex",new qe(_,g)),t.push(P),s>ns&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function jc(i,t,e){let n=new Gn(i,t,e);return n.texture.mapping=wa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Qm(i,t,e){let n=new Float32Array(Ti),s=new F(0,1,0);return new tn({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:jl(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function Qc(){return new tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jl(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function th(){return new tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function jl(){return`

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
	`}function tg(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Io||l===Po,h=l===cs||l===hs;if(c||h){let d=t.get(o),f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new ua(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let u=o.image;return c&&u&&u.height>0||h&&u&&s(u)?(e===null&&(e=new ua(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function eg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Gs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function ng(i,t,e,n){let s={},r=new WeakMap;function a(d){let f=d.target;f.index!==null&&t.remove(f.index);for(let m in f.attributes)t.remove(f.attributes[m]);for(let m in f.morphAttributes){let y=f.morphAttributes[m];for(let p=0,g=y.length;p<g;p++)t.remove(y[p])}f.removeEventListener("dispose",a),delete s[f.id];let u=r.get(f);u&&(t.remove(u),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(d){let f=d.attributes;for(let m in f)t.update(f[m],i.ARRAY_BUFFER);let u=d.morphAttributes;for(let m in u){let y=u[m];for(let p=0,g=y.length;p<g;p++)t.update(y[p],i.ARRAY_BUFFER)}}function c(d){let f=[],u=d.index,m=d.attributes.position,y=0;if(u!==null){let v=u.array;y=u.version;for(let M=0,_=v.length;M<_;M+=3){let P=v[M+0],E=v[M+1],C=v[M+2];f.push(P,E,E,C,C,P)}}else if(m!==void 0){let v=m.array;y=m.version;for(let M=0,_=v.length/3-1;M<_;M+=3){let P=M+0,E=M+1,C=M+2;f.push(P,E,E,C,C,P)}}else return;let p=new(Vh(f)?oa:aa)(f,1);p.version=y;let g=r.get(d);g&&t.remove(g),r.set(d,p)}function h(d){let f=r.get(d);if(f){let u=d.index;u!==null&&f.version<u.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function ig(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){i.drawElements(n,u,r,f*a),e.update(u,n,1)}function c(f,u,m){m!==0&&(i.drawElementsInstanced(n,u,r,f*a,m),e.update(u,n,m))}function h(f,u,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,m);let p=0;for(let g=0;g<m;g++)p+=u[g];e.update(p,n,1)}function d(f,u,m,y){if(m===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<f.length;g++)c(f[g]/a,u[g],y[g]);else{p.multiDrawElementsInstancedWEBGL(n,u,0,r,f,0,y,0,m);let g=0;for(let v=0;v<m;v++)g+=u[v]*y[v];e.update(g,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function sg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function rg(i,t,e){let n=new WeakMap,s=new Ce;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==d){let b=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let u=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],M=0;u===!0&&(M=1),m===!0&&(M=2),y===!0&&(M=3);let _=o.attributes.position.count*M,P=1;_>t.maxTextureSize&&(P=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let E=new Float32Array(_*P*4*d),C=new sa(E,_,P,d);C.type=En,C.needsUpdate=!0;let T=M*4;for(let x=0;x<d;x++){let w=p[x],I=g[x],D=v[x],z=_*P*4*x;for(let q=0;q<w.count;q++){let G=q*T;u===!0&&(s.fromBufferAttribute(w,q),E[z+G+0]=s.x,E[z+G+1]=s.y,E[z+G+2]=s.z,E[z+G+3]=0),m===!0&&(s.fromBufferAttribute(I,q),E[z+G+4]=s.x,E[z+G+5]=s.y,E[z+G+6]=s.z,E[z+G+7]=0),y===!0&&(s.fromBufferAttribute(D,q),E[z+G+8]=s.x,E[z+G+9]=s.y,E[z+G+10]=s.z,E[z+G+11]=D.itemSize===4?s.w:1)}}f={count:d,texture:C,size:new Ct(_,P)},n.set(o,f),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let u=0;for(let y=0;y<c.length;y++)u+=c[y];let m=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function ag(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var da=class extends cn{constructor(t,e,n,s,r,a,o,l,c,h=rs){if(h!==rs&&h!==ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===rs&&(n=Ci),n===void 0&&h===ds&&(n=us),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:ln,this.minFilter=l!==void 0?l:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Xh=new cn,eh=new da(1,1),qh=new sa,$h=new cl,Yh=new ca,nh=[],ih=[],sh=new Float32Array(16),rh=new Float32Array(9),ah=new Float32Array(4);function Ts(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=nh[s];if(r===void 0&&(r=new Float32Array(s),nh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ea(i,t){let e=ih[t];e===void 0&&(e=new Int32Array(t),ih[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function og(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function lg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2fv(this.addr,t),Oe(e,t)}}function cg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;i.uniform3fv(this.addr,t),Oe(e,t)}}function hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4fv(this.addr,t),Oe(e,t)}}function ug(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;ah.set(n),i.uniformMatrix2fv(this.addr,!1,ah),Oe(e,n)}}function dg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;rh.set(n),i.uniformMatrix3fv(this.addr,!1,rh),Oe(e,n)}}function fg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;sh.set(n),i.uniformMatrix4fv(this.addr,!1,sh),Oe(e,n)}}function pg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function mg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2iv(this.addr,t),Oe(e,t)}}function gg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3iv(this.addr,t),Oe(e,t)}}function xg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4iv(this.addr,t),Oe(e,t)}}function _g(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function yg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2uiv(this.addr,t),Oe(e,t)}}function vg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3uiv(this.addr,t),Oe(e,t)}}function Mg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4uiv(this.addr,t),Oe(e,t)}}function bg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(eh.compareFunction=kh,r=eh):r=Xh,e.setTexture2D(t||r,s)}function Sg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||$h,s)}function wg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Yh,s)}function Tg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||qh,s)}function Eg(i){switch(i){case 5126:return og;case 35664:return lg;case 35665:return cg;case 35666:return hg;case 35674:return ug;case 35675:return dg;case 35676:return fg;case 5124:case 35670:return pg;case 35667:case 35671:return mg;case 35668:case 35672:return gg;case 35669:case 35673:return xg;case 5125:return _g;case 36294:return yg;case 36295:return vg;case 36296:return Mg;case 35678:case 36198:case 36298:case 36306:case 35682:return bg;case 35679:case 36299:case 36307:return Sg;case 35680:case 36300:case 36308:case 36293:return wg;case 36289:case 36303:case 36311:case 36292:return Tg}}function Ag(i,t){i.uniform1fv(this.addr,t)}function Cg(i,t){let e=Ts(t,this.size,2);i.uniform2fv(this.addr,e)}function Rg(i,t){let e=Ts(t,this.size,3);i.uniform3fv(this.addr,e)}function Ig(i,t){let e=Ts(t,this.size,4);i.uniform4fv(this.addr,e)}function Pg(i,t){let e=Ts(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Lg(i,t){let e=Ts(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Dg(i,t){let e=Ts(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ug(i,t){i.uniform1iv(this.addr,t)}function Ng(i,t){i.uniform2iv(this.addr,t)}function Fg(i,t){i.uniform3iv(this.addr,t)}function Og(i,t){i.uniform4iv(this.addr,t)}function Bg(i,t){i.uniform1uiv(this.addr,t)}function zg(i,t){i.uniform2uiv(this.addr,t)}function kg(i,t){i.uniform3uiv(this.addr,t)}function Vg(i,t){i.uniform4uiv(this.addr,t)}function Hg(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Xh,r[a])}function Gg(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||$h,r[a])}function Wg(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Yh,r[a])}function Xg(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||qh,r[a])}function qg(i){switch(i){case 5126:return Ag;case 35664:return Cg;case 35665:return Rg;case 35666:return Ig;case 35674:return Pg;case 35675:return Lg;case 35676:return Dg;case 5124:case 35670:return Ug;case 35667:case 35671:return Ng;case 35668:case 35672:return Fg;case 35669:case 35673:return Og;case 5125:return Bg;case 36294:return zg;case 36295:return kg;case 36296:return Vg;case 35678:case 36198:case 36298:case 36306:case 35682:return Hg;case 35679:case 36299:case 36307:return Gg;case 35680:case 36300:case 36308:case 36293:return Wg;case 36289:case 36303:case 36311:case 36292:return Xg}}var fl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Eg(e.type)}},pl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=qg(e.type)}},ml=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},go=/(\w+)(\])?(\[|\.)?/g;function oh(i,t){i.seq.push(t),i.map[t.id]=t}function $g(i,t,e){let n=i.name,s=n.length;for(go.lastIndex=0;;){let r=go.exec(n),a=go.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){oh(e,c===void 0?new fl(o,i,t):new pl(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new ml(o),oh(e,d)),e=d}}}var os=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);$g(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function lh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Yg=37297,Zg=0;function Jg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var ch=new ae;function Kg(i){he._getMatrix(ch,he.workingColorSpace,i);let t=`mat3( ${ch.elements.map(e=>e.toFixed(4))} )`;switch(he.getTransfer(i)){case Ta:return[t,"LinearTransferOETF"];case ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function hh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Jg(i.getShaderSource(t),a)}else return s}function jg(i,t){let e=Kg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Qg(i,t){let e;switch(t){case cd:e="Linear";break;case hd:e="Reinhard";break;case ud:e="Cineon";break;case dd:e="ACESFilmic";break;case pd:e="AgX";break;case rr:e="Neutral";break;case fd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Gr=new F;function t0(){he.getLuminanceCoefficients(Gr);let i=Gr.x.toFixed(4),t=Gr.y.toFixed(4),e=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function e0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ws).join(`
`)}function n0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function i0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ws(i){return i!==""}function uh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function dh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var s0=/^[ \t]*#include +<([\w\d./]+)>/gm;function gl(i){return i.replace(s0,a0)}var r0=new Map;function a0(i,t){let e=oe[t];if(e===void 0){let n=r0.get(t);if(n!==void 0)e=oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return gl(e)}var o0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fh(i){return i.replace(o0,l0)}function l0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ph(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function c0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ah?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===sr?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===On&&(t="SHADOWMAP_TYPE_VSM"),t}function h0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case cs:case hs:t="ENVMAP_TYPE_CUBE";break;case wa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function u0(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===hs&&(t="ENVMAP_MODE_REFRACTION"),t}function d0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ch:t="ENVMAP_BLENDING_MULTIPLY";break;case od:t="ENVMAP_BLENDING_MIX";break;case ld:t="ENVMAP_BLENDING_ADD";break}return t}function f0(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function p0(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=c0(e),c=h0(e),h=u0(e),d=d0(e),f=f0(e),u=e0(e),m=n0(r),y=s.createProgram(),p,g,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ws).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ws).join(`
`),g.length>0&&(g+=`
`)):(p=[ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ws).join(`
`),g=[ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?oe.tonemapping_pars_fragment:"",e.toneMapping!==ri?Qg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",oe.colorspace_pars_fragment,jg("linearToOutputTexel",e.outputColorSpace),t0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ws).join(`
`)),a=gl(a),a=uh(a,e),a=dh(a,e),o=gl(o),o=uh(o,e),o=dh(o,e),a=fh(a),o=fh(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",e.glslVersion===Ac?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ac?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=v+p+a,_=v+g+o,P=lh(s,s.VERTEX_SHADER,M),E=lh(s,s.FRAGMENT_SHADER,_);s.attachShader(y,P),s.attachShader(y,E),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function C(w){if(i.debug.checkShaderErrors){let I=s.getProgramInfoLog(y).trim(),D=s.getShaderInfoLog(P).trim(),z=s.getShaderInfoLog(E).trim(),q=!0,G=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,P,E);else{let lt=hh(s,P,"vertex"),O=hh(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+I+`
`+lt+`
`+O)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(D===""||z==="")&&(G=!1);G&&(w.diagnostics={runnable:q,programLog:I,vertexShader:{log:D,prefix:p},fragmentShader:{log:z,prefix:g}})}s.deleteShader(P),s.deleteShader(E),T=new os(s,y),b=i0(s,y)}let T;this.getUniforms=function(){return T===void 0&&C(this),T};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(y,Yg)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Zg++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=P,this.fragmentShader=E,this}var m0=0,xl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new _l(t),e.set(t,n)),n}},_l=class{constructor(t){this.id=m0++,this.code=t,this.usedTimes=0}};function g0(i,t,e,n,s,r,a){let o=new ra,l=new xl,c=new Set,h=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures,u=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(b){return c.add(b),b===0?"uv":`uv${b}`}function p(b,x,w,I,D){let z=I.fog,q=D.geometry,G=b.isMeshStandardMaterial?I.environment:null,lt=(b.isMeshStandardMaterial?e:t).get(b.envMap||G),O=lt&&lt.mapping===wa?lt.image.height:null,Q=m[b.type];b.precision!==null&&(u=s.getMaxPrecision(b.precision),u!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",u,"instead."));let pt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,it=pt!==void 0?pt.length:0,ht=0;q.morphAttributes.position!==void 0&&(ht=1),q.morphAttributes.normal!==void 0&&(ht=2),q.morphAttributes.color!==void 0&&(ht=3);let yt,W,nt,ft;if(Q){let At=wn[Q];yt=At.vertexShader,W=At.fragmentShader}else yt=b.vertexShader,W=b.fragmentShader,l.update(b),nt=l.getVertexShaderID(b),ft=l.getFragmentShaderID(b);let k=i.getRenderTarget(),tt=i.state.buffers.depth.getReversed(),st=D.isInstancedMesh===!0,mt=D.isBatchedMesh===!0,Et=!!b.map,Ut=!!b.matcap,St=!!lt,U=!!b.aoMap,jt=!!b.lightMap,Ft=!!b.bumpMap,$t=!!b.normalMap,Ot=!!b.displacementMap,le=!!b.emissiveMap,Gt=!!b.metalnessMap,R=!!b.roughnessMap,S=b.anisotropy>0,X=b.clearcoat>0,rt=b.dispersion>0,dt=b.iridescence>0,at=b.sheen>0,Dt=b.transmission>0,bt=S&&!!b.anisotropyMap,wt=X&&!!b.clearcoatMap,ee=X&&!!b.clearcoatNormalMap,gt=X&&!!b.clearcoatRoughnessMap,Pt=dt&&!!b.iridescenceMap,Nt=dt&&!!b.iridescenceThicknessMap,Yt=at&&!!b.sheenColorMap,Rt=at&&!!b.sheenRoughnessMap,se=!!b.specularMap,Qt=!!b.specularColorMap,ce=!!b.specularIntensityMap,B=Dt&&!!b.transmissionMap,vt=Dt&&!!b.thicknessMap,j=!!b.gradientMap,L=!!b.alphaMap,N=b.alphaTest>0,Y=!!b.alphaHash,xt=!!b.extensions,_t=ri;b.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(_t=i.toneMapping);let Bt={shaderID:Q,shaderType:b.type,shaderName:b.name,vertexShader:yt,fragmentShader:W,defines:b.defines,customVertexShaderID:nt,customFragmentShaderID:ft,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:u,batching:mt,batchingColor:mt&&D._colorsTexture!==null,instancing:st,instancingColor:st&&D.instanceColor!==null,instancingMorph:st&&D.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:k===null?i.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:ws,alphaToCoverage:!!b.alphaToCoverage,map:Et,matcap:Ut,envMap:St,envMapMode:St&&lt.mapping,envMapCubeUVHeight:O,aoMap:U,lightMap:jt,bumpMap:Ft,normalMap:$t,displacementMap:f&&Ot,emissiveMap:le,normalMapObjectSpace:$t&&b.normalMapType===_d,normalMapTangentSpace:$t&&b.normalMapType===zh,metalnessMap:Gt,roughnessMap:R,anisotropy:S,anisotropyMap:bt,clearcoat:X,clearcoatMap:wt,clearcoatNormalMap:ee,clearcoatRoughnessMap:gt,dispersion:rt,iridescence:dt,iridescenceMap:Pt,iridescenceThicknessMap:Nt,sheen:at,sheenColorMap:Yt,sheenRoughnessMap:Rt,specularMap:se,specularColorMap:Qt,specularIntensityMap:ce,transmission:Dt,transmissionMap:B,thicknessMap:vt,gradientMap:j,opaque:b.transparent===!1&&b.blending===ss&&b.alphaToCoverage===!1,alphaMap:L,alphaTest:N,alphaHash:Y,combine:b.combine,mapUv:Et&&y(b.map.channel),aoMapUv:U&&y(b.aoMap.channel),lightMapUv:jt&&y(b.lightMap.channel),bumpMapUv:Ft&&y(b.bumpMap.channel),normalMapUv:$t&&y(b.normalMap.channel),displacementMapUv:Ot&&y(b.displacementMap.channel),emissiveMapUv:le&&y(b.emissiveMap.channel),metalnessMapUv:Gt&&y(b.metalnessMap.channel),roughnessMapUv:R&&y(b.roughnessMap.channel),anisotropyMapUv:bt&&y(b.anisotropyMap.channel),clearcoatMapUv:wt&&y(b.clearcoatMap.channel),clearcoatNormalMapUv:ee&&y(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&y(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Pt&&y(b.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&y(b.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&y(b.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&y(b.sheenRoughnessMap.channel),specularMapUv:se&&y(b.specularMap.channel),specularColorMapUv:Qt&&y(b.specularColorMap.channel),specularIntensityMapUv:ce&&y(b.specularIntensityMap.channel),transmissionMapUv:B&&y(b.transmissionMap.channel),thicknessMapUv:vt&&y(b.thicknessMap.channel),alphaMapUv:L&&y(b.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&($t||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!q.attributes.uv&&(Et||L),fog:!!z,useFog:b.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:tt,skinning:D.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:it,morphTextureStride:ht,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:_t,decodeVideoTexture:Et&&b.map.isVideoTexture===!0&&he.getTransfer(b.map.colorSpace)===ve,decodeVideoTextureEmissive:le&&b.emissiveMap.isVideoTexture===!0&&he.getTransfer(b.emissiveMap.colorSpace)===ve,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ie,flipSided:b.side===Ge,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:xt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&b.extensions.multiDraw===!0||mt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Bt.vertexUv1s=c.has(1),Bt.vertexUv2s=c.has(2),Bt.vertexUv3s=c.has(3),c.clear(),Bt}function g(b){let x=[];if(b.shaderID?x.push(b.shaderID):(x.push(b.customVertexShaderID),x.push(b.customFragmentShaderID)),b.defines!==void 0)for(let w in b.defines)x.push(w),x.push(b.defines[w]);return b.isRawShaderMaterial===!1&&(v(x,b),M(x,b),x.push(i.outputColorSpace)),x.push(b.customProgramCacheKey),x.join()}function v(b,x){b.push(x.precision),b.push(x.outputColorSpace),b.push(x.envMapMode),b.push(x.envMapCubeUVHeight),b.push(x.mapUv),b.push(x.alphaMapUv),b.push(x.lightMapUv),b.push(x.aoMapUv),b.push(x.bumpMapUv),b.push(x.normalMapUv),b.push(x.displacementMapUv),b.push(x.emissiveMapUv),b.push(x.metalnessMapUv),b.push(x.roughnessMapUv),b.push(x.anisotropyMapUv),b.push(x.clearcoatMapUv),b.push(x.clearcoatNormalMapUv),b.push(x.clearcoatRoughnessMapUv),b.push(x.iridescenceMapUv),b.push(x.iridescenceThicknessMapUv),b.push(x.sheenColorMapUv),b.push(x.sheenRoughnessMapUv),b.push(x.specularMapUv),b.push(x.specularColorMapUv),b.push(x.specularIntensityMapUv),b.push(x.transmissionMapUv),b.push(x.thicknessMapUv),b.push(x.combine),b.push(x.fogExp2),b.push(x.sizeAttenuation),b.push(x.morphTargetsCount),b.push(x.morphAttributeCount),b.push(x.numDirLights),b.push(x.numPointLights),b.push(x.numSpotLights),b.push(x.numSpotLightMaps),b.push(x.numHemiLights),b.push(x.numRectAreaLights),b.push(x.numDirLightShadows),b.push(x.numPointLightShadows),b.push(x.numSpotLightShadows),b.push(x.numSpotLightShadowsWithMaps),b.push(x.numLightProbes),b.push(x.shadowMapType),b.push(x.toneMapping),b.push(x.numClippingPlanes),b.push(x.numClipIntersection),b.push(x.depthPacking)}function M(b,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),b.push(o.mask)}function _(b){let x=m[b.type],w;if(x){let I=wn[x];w=af.clone(I.uniforms)}else w=b.uniforms;return w}function P(b,x){let w;for(let I=0,D=h.length;I<D;I++){let z=h[I];if(z.cacheKey===x){w=z,++w.usedTimes;break}}return w===void 0&&(w=new p0(i,x,b,r),h.push(w)),w}function E(b){if(--b.usedTimes===0){let x=h.indexOf(b);h[x]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function T(){l.dispose()}return{getParameters:p,getProgramCacheKey:g,getUniforms:_,acquireProgram:P,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:T}}function x0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function _0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function mh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function gh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,f,u,m,y,p){let g=i[t];return g===void 0?(g={id:d.id,object:d,geometry:f,material:u,groupOrder:m,renderOrder:d.renderOrder,z:y,group:p},i[t]=g):(g.id=d.id,g.object=d,g.geometry=f,g.material=u,g.groupOrder=m,g.renderOrder=d.renderOrder,g.z=y,g.group=p),t++,g}function o(d,f,u,m,y,p){let g=a(d,f,u,m,y,p);u.transmission>0?n.push(g):u.transparent===!0?s.push(g):e.push(g)}function l(d,f,u,m,y,p){let g=a(d,f,u,m,y,p);u.transmission>0?n.unshift(g):u.transparent===!0?s.unshift(g):e.unshift(g)}function c(d,f){e.length>1&&e.sort(d||_0),n.length>1&&n.sort(f||mh),s.length>1&&s.sort(f||mh)}function h(){for(let d=t,f=i.length;d<f;d++){let u=i[d];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function y0(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new gh,i.set(n,[a])):s>=r.length?(a=new gh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function v0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new zt};break;case"SpotLight":e={position:new F,direction:new F,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function M0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var b0=0;function S0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function w0(i){let t=new v0,e=M0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);let s=new F,r=new ge,a=new ge;function o(c){let h=0,d=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let u=0,m=0,y=0,p=0,g=0,v=0,M=0,_=0,P=0,E=0,C=0;c.sort(S0);for(let b=0,x=c.length;b<x;b++){let w=c[b],I=w.color,D=w.intensity,z=w.distance,q=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=I.r*D,d+=I.g*D,f+=I.b*D;else if(w.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(w.sh.coefficients[G],D);C++}else if(w.isDirectionalLight){let G=t.get(w);if(G.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let lt=w.shadow,O=e.get(w);O.shadowIntensity=lt.intensity,O.shadowBias=lt.bias,O.shadowNormalBias=lt.normalBias,O.shadowRadius=lt.radius,O.shadowMapSize=lt.mapSize,n.directionalShadow[u]=O,n.directionalShadowMap[u]=q,n.directionalShadowMatrix[u]=w.shadow.matrix,v++}n.directional[u]=G,u++}else if(w.isSpotLight){let G=t.get(w);G.position.setFromMatrixPosition(w.matrixWorld),G.color.copy(I).multiplyScalar(D),G.distance=z,G.coneCos=Math.cos(w.angle),G.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),G.decay=w.decay,n.spot[y]=G;let lt=w.shadow;if(w.map&&(n.spotLightMap[P]=w.map,P++,lt.updateMatrices(w),w.castShadow&&E++),n.spotLightMatrix[y]=lt.matrix,w.castShadow){let O=e.get(w);O.shadowIntensity=lt.intensity,O.shadowBias=lt.bias,O.shadowNormalBias=lt.normalBias,O.shadowRadius=lt.radius,O.shadowMapSize=lt.mapSize,n.spotShadow[y]=O,n.spotShadowMap[y]=q,_++}y++}else if(w.isRectAreaLight){let G=t.get(w);G.color.copy(I).multiplyScalar(D),G.halfWidth.set(w.width*.5,0,0),G.halfHeight.set(0,w.height*.5,0),n.rectArea[p]=G,p++}else if(w.isPointLight){let G=t.get(w);if(G.color.copy(w.color).multiplyScalar(w.intensity),G.distance=w.distance,G.decay=w.decay,w.castShadow){let lt=w.shadow,O=e.get(w);O.shadowIntensity=lt.intensity,O.shadowBias=lt.bias,O.shadowNormalBias=lt.normalBias,O.shadowRadius=lt.radius,O.shadowMapSize=lt.mapSize,O.shadowCameraNear=lt.camera.near,O.shadowCameraFar=lt.camera.far,n.pointShadow[m]=O,n.pointShadowMap[m]=q,n.pointShadowMatrix[m]=w.shadow.matrix,M++}n.point[m]=G,m++}else if(w.isHemisphereLight){let G=t.get(w);G.skyColor.copy(w.color).multiplyScalar(D),G.groundColor.copy(w.groundColor).multiplyScalar(D),n.hemi[g]=G,g++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Tt.LTC_FLOAT_1,n.rectAreaLTC2=Tt.LTC_FLOAT_2):(n.rectAreaLTC1=Tt.LTC_HALF_1,n.rectAreaLTC2=Tt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;let T=n.hash;(T.directionalLength!==u||T.pointLength!==m||T.spotLength!==y||T.rectAreaLength!==p||T.hemiLength!==g||T.numDirectionalShadows!==v||T.numPointShadows!==M||T.numSpotShadows!==_||T.numSpotMaps!==P||T.numLightProbes!==C)&&(n.directional.length=u,n.spot.length=y,n.rectArea.length=p,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+P-E,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,T.directionalLength=u,T.pointLength=m,T.spotLength=y,T.rectAreaLength=p,T.hemiLength=g,T.numDirectionalShadows=v,T.numPointShadows=M,T.numSpotShadows=_,T.numSpotMaps=P,T.numLightProbes=C,n.version=b0++)}function l(c,h){let d=0,f=0,u=0,m=0,y=0,p=h.matrixWorldInverse;for(let g=0,v=c.length;g<v;g++){let M=c[g];if(M.isDirectionalLight){let _=n.directional[d];_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),d++}else if(M.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),u++}else if(M.isRectAreaLight){let _=n.rectArea[m];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),a.identity(),r.copy(M.matrixWorld),r.premultiply(p),a.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),m++}else if(M.isPointLight){let _=n.point[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){let _=n.hemi[y];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(p),y++}}}return{setup:o,setupView:l,state:n}}function xh(i){let t=new w0(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function T0(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new xh(i),t.set(s,[o])):r>=a.length?(o=new xh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var yl=class extends Ii{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=gd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},vl=class extends Ii{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},E0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,A0=`uniform sampler2D shadow_pass;
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
}`;function C0(i,t,e){let n=new js,s=new Ct,r=new Ct,a=new Ce,o=new yl({depthPacking:xd}),l=new vl,c={},h=e.maxTextureSize,d={[ai]:Ge,[Ge]:ai,[Ie]:Ie},f=new tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:E0,fragmentShader:A0}),u=f.clone();u.defines.HORIZONTAL_PASS=1;let m=new xe;m.setAttribute("position",new qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new fe(m,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ah;let g=this.type;this.render=function(E,C,T){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;let b=i.getRenderTarget(),x=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),I=i.state;I.setBlending(si),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let D=g!==On&&this.type===On,z=g===On&&this.type!==On;for(let q=0,G=E.length;q<G;q++){let lt=E[q],O=lt.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",lt,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);let Q=O.getFrameExtents();if(s.multiply(Q),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,O.mapSize.y=r.y)),O.map===null||D===!0||z===!0){let it=this.type!==On?{minFilter:ln,magFilter:ln}:{};O.map!==null&&O.map.dispose(),O.map=new Gn(s.x,s.y,it),O.map.texture.name=lt.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();let pt=O.getViewportCount();for(let it=0;it<pt;it++){let ht=O.getViewport(it);a.set(r.x*ht.x,r.y*ht.y,r.x*ht.z,r.y*ht.w),I.viewport(a),O.updateMatrices(lt,it),n=O.getFrustum(),_(C,T,O.camera,lt,this.type)}O.isPointLightShadow!==!0&&this.type===On&&v(O,T),O.needsUpdate=!1}g=this.type,p.needsUpdate=!1,i.setRenderTarget(b,x,w)};function v(E,C){let T=t.update(y);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,u.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,u.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Gn(s.x,s.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,T,f,y,null),u.uniforms.shadow_pass.value=E.mapPass.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,T,u,y,null)}function M(E,C,T,b){let x=null,w=T.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(w!==void 0)x=w;else if(x=T.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let I=x.uuid,D=C.uuid,z=c[I];z===void 0&&(z={},c[I]=z);let q=z[D];q===void 0&&(q=x.clone(),z[D]=q,C.addEventListener("dispose",P)),x=q}if(x.visible=C.visible,x.wireframe=C.wireframe,b===On?x.side=C.shadowSide!==null?C.shadowSide:C.side:x.side=C.shadowSide!==null?C.shadowSide:d[C.side],x.alphaMap=C.alphaMap,x.alphaTest=C.alphaTest,x.map=C.map,x.clipShadows=C.clipShadows,x.clippingPlanes=C.clippingPlanes,x.clipIntersection=C.clipIntersection,x.displacementMap=C.displacementMap,x.displacementScale=C.displacementScale,x.displacementBias=C.displacementBias,x.wireframeLinewidth=C.wireframeLinewidth,x.linewidth=C.linewidth,T.isPointLight===!0&&x.isMeshDistanceMaterial===!0){let I=i.properties.get(x);I.light=T}return x}function _(E,C,T,b,x){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&x===On)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,E.matrixWorld);let D=t.update(E),z=E.material;if(Array.isArray(z)){let q=D.groups;for(let G=0,lt=q.length;G<lt;G++){let O=q[G],Q=z[O.materialIndex];if(Q&&Q.visible){let pt=M(E,Q,b,x);E.onBeforeShadow(i,E,C,T,D,pt,O),i.renderBufferDirect(T,null,D,pt,E,O),E.onAfterShadow(i,E,C,T,D,pt,O)}}}else if(z.visible){let q=M(E,z,b,x);E.onBeforeShadow(i,E,C,T,D,q,null),i.renderBufferDirect(T,null,D,q,E,null),E.onAfterShadow(i,E,C,T,D,q,null)}}let I=E.children;for(let D=0,z=I.length;D<z;D++)_(I[D],C,T,b,x)}function P(E){E.target.removeEventListener("dispose",P);for(let T in c){let b=c[T],x=E.target.uuid;x in b&&(b[x].dispose(),delete b[x])}}}var R0={[So]:wo,[To]:Co,[Eo]:Ro,[ls]:Ao,[wo]:So,[Co]:To,[Ro]:Eo,[Ao]:ls};function I0(i,t){function e(){let B=!1,vt=new Ce,j=null,L=new Ce(0,0,0,0);return{setMask:function(N){j!==N&&!B&&(i.colorMask(N,N,N,N),j=N)},setLocked:function(N){B=N},setClear:function(N,Y,xt,_t,Bt){Bt===!0&&(N*=_t,Y*=_t,xt*=_t),vt.set(N,Y,xt,_t),L.equals(vt)===!1&&(i.clearColor(N,Y,xt,_t),L.copy(vt))},reset:function(){B=!1,j=null,L.set(-1,0,0,0)}}}function n(){let B=!1,vt=!1,j=null,L=null,N=null;return{setReversed:function(Y){if(vt!==Y){let xt=t.get("EXT_clip_control");vt?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT);let _t=N;N=null,this.setClear(_t)}vt=Y},getReversed:function(){return vt},setTest:function(Y){Y?k(i.DEPTH_TEST):tt(i.DEPTH_TEST)},setMask:function(Y){j!==Y&&!B&&(i.depthMask(Y),j=Y)},setFunc:function(Y){if(vt&&(Y=R0[Y]),L!==Y){switch(Y){case So:i.depthFunc(i.NEVER);break;case wo:i.depthFunc(i.ALWAYS);break;case To:i.depthFunc(i.LESS);break;case ls:i.depthFunc(i.LEQUAL);break;case Eo:i.depthFunc(i.EQUAL);break;case Ao:i.depthFunc(i.GEQUAL);break;case Co:i.depthFunc(i.GREATER);break;case Ro:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}L=Y}},setLocked:function(Y){B=Y},setClear:function(Y){N!==Y&&(vt&&(Y=1-Y),i.clearDepth(Y),N=Y)},reset:function(){B=!1,j=null,L=null,N=null,vt=!1}}}function s(){let B=!1,vt=null,j=null,L=null,N=null,Y=null,xt=null,_t=null,Bt=null;return{setTest:function(At){B||(At?k(i.STENCIL_TEST):tt(i.STENCIL_TEST))},setMask:function(At){vt!==At&&!B&&(i.stencilMask(At),vt=At)},setFunc:function(At,Jt,Z){(j!==At||L!==Jt||N!==Z)&&(i.stencilFunc(At,Jt,Z),j=At,L=Jt,N=Z)},setOp:function(At,Jt,Z){(Y!==At||xt!==Jt||_t!==Z)&&(i.stencilOp(At,Jt,Z),Y=At,xt=Jt,_t=Z)},setLocked:function(At){B=At},setClear:function(At){Bt!==At&&(i.clearStencil(At),Bt=At)},reset:function(){B=!1,vt=null,j=null,L=null,N=null,Y=null,xt=null,_t=null,Bt=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},f=new WeakMap,u=[],m=null,y=!1,p=null,g=null,v=null,M=null,_=null,P=null,E=null,C=new zt(0,0,0),T=0,b=!1,x=null,w=null,I=null,D=null,z=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,lt=0,O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(lt=parseFloat(/^WebGL (\d)/.exec(O)[1]),G=lt>=1):O.indexOf("OpenGL ES")!==-1&&(lt=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),G=lt>=2);let Q=null,pt={},it=i.getParameter(i.SCISSOR_BOX),ht=i.getParameter(i.VIEWPORT),yt=new Ce().fromArray(it),W=new Ce().fromArray(ht);function nt(B,vt,j,L){let N=new Uint8Array(4),Y=i.createTexture();i.bindTexture(B,Y),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let xt=0;xt<j;xt++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(vt,0,i.RGBA,1,1,L,0,i.RGBA,i.UNSIGNED_BYTE,N):i.texImage2D(vt+xt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,N);return Y}let ft={};ft[i.TEXTURE_2D]=nt(i.TEXTURE_2D,i.TEXTURE_2D,1),ft[i.TEXTURE_CUBE_MAP]=nt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ft[i.TEXTURE_2D_ARRAY]=nt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ft[i.TEXTURE_3D]=nt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),k(i.DEPTH_TEST),a.setFunc(ls),Ft(!1),$t(_c),k(i.CULL_FACE),U(si);function k(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function tt(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function st(B,vt){return d[B]!==vt?(i.bindFramebuffer(B,vt),d[B]=vt,B===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=vt),B===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=vt),!0):!1}function mt(B,vt){let j=u,L=!1;if(B){j=f.get(vt),j===void 0&&(j=[],f.set(vt,j));let N=B.textures;if(j.length!==N.length||j[0]!==i.COLOR_ATTACHMENT0){for(let Y=0,xt=N.length;Y<xt;Y++)j[Y]=i.COLOR_ATTACHMENT0+Y;j.length=N.length,L=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,L=!0);L&&i.drawBuffers(j)}function Et(B){return m!==B?(i.useProgram(B),m=B,!0):!1}let Ut={[Si]:i.FUNC_ADD,[Wu]:i.FUNC_SUBTRACT,[Xu]:i.FUNC_REVERSE_SUBTRACT};Ut[qu]=i.MIN,Ut[$u]=i.MAX;let St={[Yu]:i.ZERO,[Zu]:i.ONE,[Ju]:i.SRC_COLOR,[Mo]:i.SRC_ALPHA,[nd]:i.SRC_ALPHA_SATURATE,[td]:i.DST_COLOR,[ju]:i.DST_ALPHA,[Ku]:i.ONE_MINUS_SRC_COLOR,[bo]:i.ONE_MINUS_SRC_ALPHA,[ed]:i.ONE_MINUS_DST_COLOR,[Qu]:i.ONE_MINUS_DST_ALPHA,[id]:i.CONSTANT_COLOR,[sd]:i.ONE_MINUS_CONSTANT_COLOR,[rd]:i.CONSTANT_ALPHA,[ad]:i.ONE_MINUS_CONSTANT_ALPHA};function U(B,vt,j,L,N,Y,xt,_t,Bt,At){if(B===si){y===!0&&(tt(i.BLEND),y=!1);return}if(y===!1&&(k(i.BLEND),y=!0),B!==Gu){if(B!==p||At!==b){if((g!==Si||_!==Si)&&(i.blendEquation(i.FUNC_ADD),g=Si,_=Si),At)switch(B){case ss:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yc:i.blendFunc(i.ONE,i.ONE);break;case vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Mc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case ss:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Mc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}v=null,M=null,P=null,E=null,C.set(0,0,0),T=0,p=B,b=At}return}N=N||vt,Y=Y||j,xt=xt||L,(vt!==g||N!==_)&&(i.blendEquationSeparate(Ut[vt],Ut[N]),g=vt,_=N),(j!==v||L!==M||Y!==P||xt!==E)&&(i.blendFuncSeparate(St[j],St[L],St[Y],St[xt]),v=j,M=L,P=Y,E=xt),(_t.equals(C)===!1||Bt!==T)&&(i.blendColor(_t.r,_t.g,_t.b,Bt),C.copy(_t),T=Bt),p=B,b=!1}function jt(B,vt){B.side===Ie?tt(i.CULL_FACE):k(i.CULL_FACE);let j=B.side===Ge;vt&&(j=!j),Ft(j),B.blending===ss&&B.transparent===!1?U(si):U(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);let L=B.stencilWrite;o.setTest(L),L&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),le(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?k(i.SAMPLE_ALPHA_TO_COVERAGE):tt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(B){x!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),x=B)}function $t(B){B!==Vu?(k(i.CULL_FACE),B!==w&&(B===_c?i.cullFace(i.BACK):B===Hu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):tt(i.CULL_FACE),w=B}function Ot(B){B!==I&&(G&&i.lineWidth(B),I=B)}function le(B,vt,j){B?(k(i.POLYGON_OFFSET_FILL),(D!==vt||z!==j)&&(i.polygonOffset(vt,j),D=vt,z=j)):tt(i.POLYGON_OFFSET_FILL)}function Gt(B){B?k(i.SCISSOR_TEST):tt(i.SCISSOR_TEST)}function R(B){B===void 0&&(B=i.TEXTURE0+q-1),Q!==B&&(i.activeTexture(B),Q=B)}function S(B,vt,j){j===void 0&&(Q===null?j=i.TEXTURE0+q-1:j=Q);let L=pt[j];L===void 0&&(L={type:void 0,texture:void 0},pt[j]=L),(L.type!==B||L.texture!==vt)&&(Q!==j&&(i.activeTexture(j),Q=j),i.bindTexture(B,vt||ft[B]),L.type=B,L.texture=vt)}function X(){let B=pt[Q];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function rt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function dt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function at(){try{i.texSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Dt(){try{i.texSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function bt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function wt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ee(){try{i.texStorage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function gt(){try{i.texStorage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Pt(){try{i.texImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Nt(){try{i.texImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Yt(B){yt.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),yt.copy(B))}function Rt(B){W.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),W.copy(B))}function se(B,vt){let j=c.get(vt);j===void 0&&(j=new WeakMap,c.set(vt,j));let L=j.get(B);L===void 0&&(L=i.getUniformBlockIndex(vt,B.name),j.set(B,L))}function Qt(B,vt){let L=c.get(vt).get(B);l.get(vt)!==L&&(i.uniformBlockBinding(vt,L,B.__bindingPointIndex),l.set(vt,L))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Q=null,pt={},d={},f=new WeakMap,u=[],m=null,y=!1,p=null,g=null,v=null,M=null,_=null,P=null,E=null,C=new zt(0,0,0),T=0,b=!1,x=null,w=null,I=null,D=null,z=null,yt.set(0,0,i.canvas.width,i.canvas.height),W.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:k,disable:tt,bindFramebuffer:st,drawBuffers:mt,useProgram:Et,setBlending:U,setMaterial:jt,setFlipSided:Ft,setCullFace:$t,setLineWidth:Ot,setPolygonOffset:le,setScissorTest:Gt,activeTexture:R,bindTexture:S,unbindTexture:X,compressedTexImage2D:rt,compressedTexImage3D:dt,texImage2D:Pt,texImage3D:Nt,updateUBOMapping:se,uniformBlockBinding:Qt,texStorage2D:ee,texStorage3D:gt,texSubImage2D:at,texSubImage3D:Dt,compressedTexSubImage2D:bt,compressedTexSubImage3D:wt,scissor:Yt,viewport:Rt,reset:ce}}function _h(i,t,e,n){let s=P0(n);switch(e){case Dh:return i*t;case Nh:return i*t;case Fh:return i*t*2;case $l:return i*t/s.components*s.byteLength;case Yl:return i*t/s.components*s.byteLength;case Oh:return i*t*2/s.components*s.byteLength;case Zl:return i*t*2/s.components*s.byteLength;case Uh:return i*t*3/s.components*s.byteLength;case vn:return i*t*4/s.components*s.byteLength;case Jl:return i*t*4/s.components*s.byteLength;case Zr:case Jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Kr:case jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case No:case Oo:return Math.max(i,16)*Math.max(t,8)/4;case Uo:case Fo:return Math.max(i,8)*Math.max(t,8)/2;case Bo:case zo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ko:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Vo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ho:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Go:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Xo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case qo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case $o:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Yo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Zo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Jo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ko:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case jo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Qo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case tl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Qr:case el:case nl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Bh:case il:return Math.ceil(i/4)*Math.ceil(t/4)*8;case sl:case rl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function P0(i){switch(i){case Hn:case Ih:return{byteLength:1,components:1};case Js:case Ph:case ar:return{byteLength:2,components:1};case Xl:case ql:return{byteLength:2,components:4};case Ci:case Wl:case En:return{byteLength:4,components:1};case Lh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function L0(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,h=new WeakMap,d,f=new WeakMap,u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,S){return u?new OffscreenCanvas(R,S):na("canvas")}function y(R,S,X){let rt=1,dt=Gt(R);if((dt.width>X||dt.height>X)&&(rt=X/Math.max(dt.width,dt.height)),rt<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let at=Math.floor(rt*dt.width),Dt=Math.floor(rt*dt.height);d===void 0&&(d=m(at,Dt));let bt=S?m(at,Dt):d;return bt.width=at,bt.height=Dt,bt.getContext("2d").drawImage(R,0,0,at,Dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+dt.width+"x"+dt.height+") to ("+at+"x"+Dt+")."),bt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+dt.width+"x"+dt.height+")."),R;return R}function p(R){return R.generateMipmaps}function g(R){i.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,S,X,rt,dt=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let at=S;if(S===i.RED&&(X===i.FLOAT&&(at=i.R32F),X===i.HALF_FLOAT&&(at=i.R16F),X===i.UNSIGNED_BYTE&&(at=i.R8)),S===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(at=i.R8UI),X===i.UNSIGNED_SHORT&&(at=i.R16UI),X===i.UNSIGNED_INT&&(at=i.R32UI),X===i.BYTE&&(at=i.R8I),X===i.SHORT&&(at=i.R16I),X===i.INT&&(at=i.R32I)),S===i.RG&&(X===i.FLOAT&&(at=i.RG32F),X===i.HALF_FLOAT&&(at=i.RG16F),X===i.UNSIGNED_BYTE&&(at=i.RG8)),S===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(at=i.RG8UI),X===i.UNSIGNED_SHORT&&(at=i.RG16UI),X===i.UNSIGNED_INT&&(at=i.RG32UI),X===i.BYTE&&(at=i.RG8I),X===i.SHORT&&(at=i.RG16I),X===i.INT&&(at=i.RG32I)),S===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(at=i.RGB8UI),X===i.UNSIGNED_SHORT&&(at=i.RGB16UI),X===i.UNSIGNED_INT&&(at=i.RGB32UI),X===i.BYTE&&(at=i.RGB8I),X===i.SHORT&&(at=i.RGB16I),X===i.INT&&(at=i.RGB32I)),S===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(at=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(at=i.RGBA16UI),X===i.UNSIGNED_INT&&(at=i.RGBA32UI),X===i.BYTE&&(at=i.RGBA8I),X===i.SHORT&&(at=i.RGBA16I),X===i.INT&&(at=i.RGBA32I)),S===i.RGB&&X===i.UNSIGNED_INT_5_9_9_9_REV&&(at=i.RGB9_E5),S===i.RGBA){let Dt=dt?Ta:he.getTransfer(rt);X===i.FLOAT&&(at=i.RGBA32F),X===i.HALF_FLOAT&&(at=i.RGBA16F),X===i.UNSIGNED_BYTE&&(at=Dt===ve?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(at=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(at=i.RGB5_A1)}return(at===i.R16F||at===i.R32F||at===i.RG16F||at===i.RG32F||at===i.RGBA16F||at===i.RGBA32F)&&t.get("EXT_color_buffer_float"),at}function _(R,S){let X;return R?S===null||S===Ci||S===us?X=i.DEPTH24_STENCIL8:S===En?X=i.DEPTH32F_STENCIL8:S===Js&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ci||S===us?X=i.DEPTH_COMPONENT24:S===En?X=i.DEPTH_COMPONENT32F:S===Js&&(X=i.DEPTH_COMPONENT16),X}function P(R,S){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==ln&&R.minFilter!==Tn?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function E(R){let S=R.target;S.removeEventListener("dispose",E),T(S),S.isVideoTexture&&h.delete(S)}function C(R){let S=R.target;S.removeEventListener("dispose",C),x(S)}function T(R){let S=n.get(R);if(S.__webglInit===void 0)return;let X=R.source,rt=f.get(X);if(rt){let dt=rt[S.__cacheKey];dt.usedTimes--,dt.usedTimes===0&&b(R),Object.keys(rt).length===0&&f.delete(X)}n.remove(R)}function b(R){let S=n.get(R);i.deleteTexture(S.__webglTexture);let X=R.source,rt=f.get(X);delete rt[S.__cacheKey],a.memory.textures--}function x(R){let S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++){if(Array.isArray(S.__webglFramebuffer[rt]))for(let dt=0;dt<S.__webglFramebuffer[rt].length;dt++)i.deleteFramebuffer(S.__webglFramebuffer[rt][dt]);else i.deleteFramebuffer(S.__webglFramebuffer[rt]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[rt])}else{if(Array.isArray(S.__webglFramebuffer))for(let rt=0;rt<S.__webglFramebuffer.length;rt++)i.deleteFramebuffer(S.__webglFramebuffer[rt]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let rt=0;rt<S.__webglColorRenderbuffer.length;rt++)S.__webglColorRenderbuffer[rt]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[rt]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let X=R.textures;for(let rt=0,dt=X.length;rt<dt;rt++){let at=n.get(X[rt]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),a.memory.textures--),n.remove(X[rt])}n.remove(R)}let w=0;function I(){w=0}function D(){let R=w;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),w+=1,R}function z(R){let S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function q(R,S){let X=n.get(R);if(R.isVideoTexture&&Ot(R),R.isRenderTargetTexture===!1&&R.version>0&&X.__version!==R.version){let rt=R.image;if(rt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(X,R,S);return}}e.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+S)}function G(R,S){let X=n.get(R);if(R.version>0&&X.__version!==R.version){W(X,R,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+S)}function lt(R,S){let X=n.get(R);if(R.version>0&&X.__version!==R.version){W(X,R,S);return}e.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+S)}function O(R,S){let X=n.get(R);if(R.version>0&&X.__version!==R.version){nt(X,R,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+S)}let Q={[Lo]:i.REPEAT,[Ei]:i.CLAMP_TO_EDGE,[Do]:i.MIRRORED_REPEAT},pt={[ln]:i.NEAREST,[md]:i.NEAREST_MIPMAP_NEAREST,[Sr]:i.NEAREST_MIPMAP_LINEAR,[Tn]:i.LINEAR,[Ha]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},it={[yd]:i.NEVER,[Td]:i.ALWAYS,[vd]:i.LESS,[kh]:i.LEQUAL,[Md]:i.EQUAL,[wd]:i.GEQUAL,[bd]:i.GREATER,[Sd]:i.NOTEQUAL};function ht(R,S){if(S.type===En&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Tn||S.magFilter===Ha||S.magFilter===Sr||S.magFilter===Ai||S.minFilter===Tn||S.minFilter===Ha||S.minFilter===Sr||S.minFilter===Ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Q[S.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Q[S.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Q[S.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,pt[S.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,pt[S.minFilter]),S.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,it[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===ln||S.minFilter!==Sr&&S.minFilter!==Ai||S.type===En&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let X=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function yt(R,S){let X=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",E));let rt=S.source,dt=f.get(rt);dt===void 0&&(dt={},f.set(rt,dt));let at=z(S);if(at!==R.__cacheKey){dt[at]===void 0&&(dt[at]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),dt[at].usedTimes++;let Dt=dt[R.__cacheKey];Dt!==void 0&&(dt[R.__cacheKey].usedTimes--,Dt.usedTimes===0&&b(S)),R.__cacheKey=at,R.__webglTexture=dt[at].texture}return X}function W(R,S,X){let rt=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(rt=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(rt=i.TEXTURE_3D);let dt=yt(R,S),at=S.source;e.bindTexture(rt,R.__webglTexture,i.TEXTURE0+X);let Dt=n.get(at);if(at.version!==Dt.__version||dt===!0){e.activeTexture(i.TEXTURE0+X);let bt=he.getPrimaries(he.workingColorSpace),wt=S.colorSpace===ii?null:he.getPrimaries(S.colorSpace),ee=S.colorSpace===ii||bt===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let gt=y(S.image,!1,s.maxTextureSize);gt=le(S,gt);let Pt=r.convert(S.format,S.colorSpace),Nt=r.convert(S.type),Yt=M(S.internalFormat,Pt,Nt,S.colorSpace,S.isVideoTexture);ht(rt,S);let Rt,se=S.mipmaps,Qt=S.isVideoTexture!==!0,ce=Dt.__version===void 0||dt===!0,B=at.dataReady,vt=P(S,gt);if(S.isDepthTexture)Yt=_(S.format===ds,S.type),ce&&(Qt?e.texStorage2D(i.TEXTURE_2D,1,Yt,gt.width,gt.height):e.texImage2D(i.TEXTURE_2D,0,Yt,gt.width,gt.height,0,Pt,Nt,null));else if(S.isDataTexture)if(se.length>0){Qt&&ce&&e.texStorage2D(i.TEXTURE_2D,vt,Yt,se[0].width,se[0].height);for(let j=0,L=se.length;j<L;j++)Rt=se[j],Qt?B&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,Rt.width,Rt.height,Pt,Nt,Rt.data):e.texImage2D(i.TEXTURE_2D,j,Yt,Rt.width,Rt.height,0,Pt,Nt,Rt.data);S.generateMipmaps=!1}else Qt?(ce&&e.texStorage2D(i.TEXTURE_2D,vt,Yt,gt.width,gt.height),B&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt.width,gt.height,Pt,Nt,gt.data)):e.texImage2D(i.TEXTURE_2D,0,Yt,gt.width,gt.height,0,Pt,Nt,gt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Qt&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Yt,se[0].width,se[0].height,gt.depth);for(let j=0,L=se.length;j<L;j++)if(Rt=se[j],S.format!==vn)if(Pt!==null)if(Qt){if(B)if(S.layerUpdates.size>0){let N=_h(Rt.width,Rt.height,S.format,S.type);for(let Y of S.layerUpdates){let xt=Rt.data.subarray(Y*N/Rt.data.BYTES_PER_ELEMENT,(Y+1)*N/Rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,Y,Rt.width,Rt.height,1,Pt,xt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,Rt.width,Rt.height,gt.depth,Pt,Rt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,Yt,Rt.width,Rt.height,gt.depth,0,Rt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qt?B&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,Rt.width,Rt.height,gt.depth,Pt,Nt,Rt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,j,Yt,Rt.width,Rt.height,gt.depth,0,Pt,Nt,Rt.data)}else{Qt&&ce&&e.texStorage2D(i.TEXTURE_2D,vt,Yt,se[0].width,se[0].height);for(let j=0,L=se.length;j<L;j++)Rt=se[j],S.format!==vn?Pt!==null?Qt?B&&e.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,Rt.width,Rt.height,Pt,Rt.data):e.compressedTexImage2D(i.TEXTURE_2D,j,Yt,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?B&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,Rt.width,Rt.height,Pt,Nt,Rt.data):e.texImage2D(i.TEXTURE_2D,j,Yt,Rt.width,Rt.height,0,Pt,Nt,Rt.data)}else if(S.isDataArrayTexture)if(Qt){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Yt,gt.width,gt.height,gt.depth),B)if(S.layerUpdates.size>0){let j=_h(gt.width,gt.height,S.format,S.type);for(let L of S.layerUpdates){let N=gt.data.subarray(L*j/gt.data.BYTES_PER_ELEMENT,(L+1)*j/gt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,L,gt.width,gt.height,1,Pt,Nt,N)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,Pt,Nt,gt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Yt,gt.width,gt.height,gt.depth,0,Pt,Nt,gt.data);else if(S.isData3DTexture)Qt?(ce&&e.texStorage3D(i.TEXTURE_3D,vt,Yt,gt.width,gt.height,gt.depth),B&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,Pt,Nt,gt.data)):e.texImage3D(i.TEXTURE_3D,0,Yt,gt.width,gt.height,gt.depth,0,Pt,Nt,gt.data);else if(S.isFramebufferTexture){if(ce)if(Qt)e.texStorage2D(i.TEXTURE_2D,vt,Yt,gt.width,gt.height);else{let j=gt.width,L=gt.height;for(let N=0;N<vt;N++)e.texImage2D(i.TEXTURE_2D,N,Yt,j,L,0,Pt,Nt,null),j>>=1,L>>=1}}else if(se.length>0){if(Qt&&ce){let j=Gt(se[0]);e.texStorage2D(i.TEXTURE_2D,vt,Yt,j.width,j.height)}for(let j=0,L=se.length;j<L;j++)Rt=se[j],Qt?B&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,Pt,Nt,Rt):e.texImage2D(i.TEXTURE_2D,j,Yt,Pt,Nt,Rt);S.generateMipmaps=!1}else if(Qt){if(ce){let j=Gt(gt);e.texStorage2D(i.TEXTURE_2D,vt,Yt,j.width,j.height)}B&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Pt,Nt,gt)}else e.texImage2D(i.TEXTURE_2D,0,Yt,Pt,Nt,gt);p(S)&&g(rt),Dt.__version=at.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function nt(R,S,X){if(S.image.length!==6)return;let rt=yt(R,S),dt=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+X);let at=n.get(dt);if(dt.version!==at.__version||rt===!0){e.activeTexture(i.TEXTURE0+X);let Dt=he.getPrimaries(he.workingColorSpace),bt=S.colorSpace===ii?null:he.getPrimaries(S.colorSpace),wt=S.colorSpace===ii||Dt===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);let ee=S.isCompressedTexture||S.image[0].isCompressedTexture,gt=S.image[0]&&S.image[0].isDataTexture,Pt=[];for(let L=0;L<6;L++)!ee&&!gt?Pt[L]=y(S.image[L],!0,s.maxCubemapSize):Pt[L]=gt?S.image[L].image:S.image[L],Pt[L]=le(S,Pt[L]);let Nt=Pt[0],Yt=r.convert(S.format,S.colorSpace),Rt=r.convert(S.type),se=M(S.internalFormat,Yt,Rt,S.colorSpace),Qt=S.isVideoTexture!==!0,ce=at.__version===void 0||rt===!0,B=dt.dataReady,vt=P(S,Nt);ht(i.TEXTURE_CUBE_MAP,S);let j;if(ee){Qt&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,se,Nt.width,Nt.height);for(let L=0;L<6;L++){j=Pt[L].mipmaps;for(let N=0;N<j.length;N++){let Y=j[N];S.format!==vn?Yt!==null?Qt?B&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N,0,0,Y.width,Y.height,Yt,Y.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N,se,Y.width,Y.height,0,Y.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N,0,0,Y.width,Y.height,Yt,Rt,Y.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N,se,Y.width,Y.height,0,Yt,Rt,Y.data)}}}else{if(j=S.mipmaps,Qt&&ce){j.length>0&&vt++;let L=Gt(Pt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,se,L.width,L.height)}for(let L=0;L<6;L++)if(gt){Qt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,0,0,Pt[L].width,Pt[L].height,Yt,Rt,Pt[L].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,se,Pt[L].width,Pt[L].height,0,Yt,Rt,Pt[L].data);for(let N=0;N<j.length;N++){let xt=j[N].image[L].image;Qt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N+1,0,0,xt.width,xt.height,Yt,Rt,xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N+1,se,xt.width,xt.height,0,Yt,Rt,xt.data)}}else{Qt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,0,0,Yt,Rt,Pt[L]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,se,Yt,Rt,Pt[L]);for(let N=0;N<j.length;N++){let Y=j[N];Qt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N+1,0,0,Yt,Rt,Y.image[L]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+L,N+1,se,Yt,Rt,Y.image[L])}}}p(S)&&g(i.TEXTURE_CUBE_MAP),at.__version=dt.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function ft(R,S,X,rt,dt,at){let Dt=r.convert(X.format,X.colorSpace),bt=r.convert(X.type),wt=M(X.internalFormat,Dt,bt,X.colorSpace),ee=n.get(S),gt=n.get(X);if(gt.__renderTarget=S,!ee.__hasExternalTextures){let Pt=Math.max(1,S.width>>at),Nt=Math.max(1,S.height>>at);dt===i.TEXTURE_3D||dt===i.TEXTURE_2D_ARRAY?e.texImage3D(dt,at,wt,Pt,Nt,S.depth,0,Dt,bt,null):e.texImage2D(dt,at,wt,Pt,Nt,0,Dt,bt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),$t(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,rt,dt,gt.__webglTexture,0,Ft(S)):(dt===i.TEXTURE_2D||dt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&dt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,rt,dt,gt.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function k(R,S,X){if(i.bindRenderbuffer(i.RENDERBUFFER,R),S.depthBuffer){let rt=S.depthTexture,dt=rt&&rt.isDepthTexture?rt.type:null,at=_(S.stencilBuffer,dt),Dt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,bt=Ft(S);$t(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,bt,at,S.width,S.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,at,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,at,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Dt,i.RENDERBUFFER,R)}else{let rt=S.textures;for(let dt=0;dt<rt.length;dt++){let at=rt[dt],Dt=r.convert(at.format,at.colorSpace),bt=r.convert(at.type),wt=M(at.internalFormat,Dt,bt,at.colorSpace),ee=Ft(S);X&&$t(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,wt,S.width,S.height):$t(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,wt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,wt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function tt(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let rt=n.get(S.depthTexture);rt.__renderTarget=S,(!rt.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),q(S.depthTexture,0);let dt=rt.__webglTexture,at=Ft(S);if(S.depthTexture.format===rs)$t(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,dt,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,dt,0);else if(S.depthTexture.format===ds)$t(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,dt,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,dt,0);else throw new Error("Unknown depthTexture format")}function st(R){let S=n.get(R),X=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){let rt=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),rt){let dt=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,rt.removeEventListener("dispose",dt)};rt.addEventListener("dispose",dt),S.__depthDisposeCallback=dt}S.__boundDepthTexture=rt}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");tt(S.__webglFramebuffer,R)}else if(X){S.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[rt]),S.__webglDepthbuffer[rt]===void 0)S.__webglDepthbuffer[rt]=i.createRenderbuffer(),k(S.__webglDepthbuffer[rt],R,!1);else{let dt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=S.__webglDepthbuffer[rt];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,dt,i.RENDERBUFFER,at)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),k(S.__webglDepthbuffer,R,!1);else{let rt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,rt,i.RENDERBUFFER,dt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function mt(R,S,X){let rt=n.get(R);S!==void 0&&ft(rt.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&st(R)}function Et(R){let S=R.texture,X=n.get(R),rt=n.get(S);R.addEventListener("dispose",C);let dt=R.textures,at=R.isWebGLCubeRenderTarget===!0,Dt=dt.length>1;if(Dt||(rt.__webglTexture===void 0&&(rt.__webglTexture=i.createTexture()),rt.__version=S.version,a.memory.textures++),at){X.__webglFramebuffer=[];for(let bt=0;bt<6;bt++)if(S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer[bt]=[];for(let wt=0;wt<S.mipmaps.length;wt++)X.__webglFramebuffer[bt][wt]=i.createFramebuffer()}else X.__webglFramebuffer[bt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer=[];for(let bt=0;bt<S.mipmaps.length;bt++)X.__webglFramebuffer[bt]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(Dt)for(let bt=0,wt=dt.length;bt<wt;bt++){let ee=n.get(dt[bt]);ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&$t(R)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let bt=0;bt<dt.length;bt++){let wt=dt[bt];X.__webglColorRenderbuffer[bt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[bt]);let ee=r.convert(wt.format,wt.colorSpace),gt=r.convert(wt.type),Pt=M(wt.internalFormat,ee,gt,wt.colorSpace,R.isXRRenderTarget===!0),Nt=Ft(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,Pt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,X.__webglColorRenderbuffer[bt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),k(X.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,rt.__webglTexture),ht(i.TEXTURE_CUBE_MAP,S);for(let bt=0;bt<6;bt++)if(S.mipmaps&&S.mipmaps.length>0)for(let wt=0;wt<S.mipmaps.length;wt++)ft(X.__webglFramebuffer[bt][wt],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,wt);else ft(X.__webglFramebuffer[bt],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0);p(S)&&g(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Dt){for(let bt=0,wt=dt.length;bt<wt;bt++){let ee=dt[bt],gt=n.get(ee);e.bindTexture(i.TEXTURE_2D,gt.__webglTexture),ht(i.TEXTURE_2D,ee),ft(X.__webglFramebuffer,R,ee,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,0),p(ee)&&g(i.TEXTURE_2D)}e.unbindTexture()}else{let bt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(bt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(bt,rt.__webglTexture),ht(bt,S),S.mipmaps&&S.mipmaps.length>0)for(let wt=0;wt<S.mipmaps.length;wt++)ft(X.__webglFramebuffer[wt],R,S,i.COLOR_ATTACHMENT0,bt,wt);else ft(X.__webglFramebuffer,R,S,i.COLOR_ATTACHMENT0,bt,0);p(S)&&g(bt),e.unbindTexture()}R.depthBuffer&&st(R)}function Ut(R){let S=R.textures;for(let X=0,rt=S.length;X<rt;X++){let dt=S[X];if(p(dt)){let at=v(R),Dt=n.get(dt).__webglTexture;e.bindTexture(at,Dt),g(at),e.unbindTexture()}}}let St=[],U=[];function jt(R){if(R.samples>0){if($t(R)===!1){let S=R.textures,X=R.width,rt=R.height,dt=i.COLOR_BUFFER_BIT,at=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Dt=n.get(R),bt=S.length>1;if(bt)for(let wt=0;wt<S.length;wt++)e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let wt=0;wt<S.length;wt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(dt|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(dt|=i.STENCIL_BUFFER_BIT)),bt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Dt.__webglColorRenderbuffer[wt]);let ee=n.get(S[wt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ee,0)}i.blitFramebuffer(0,0,X,rt,0,0,X,rt,dt,i.NEAREST),l===!0&&(St.length=0,U.length=0,St.push(i.COLOR_ATTACHMENT0+wt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(St.push(at),U.push(at),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,St))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),bt)for(let wt=0;wt<S.length;wt++){e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,Dt.__webglColorRenderbuffer[wt]);let ee=n.get(S[wt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,ee,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let S=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function Ft(R){return Math.min(s.maxSamples,R.samples)}function $t(R){let S=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ot(R){let S=a.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function le(R,S){let X=R.colorSpace,rt=R.format,dt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||X!==ws&&X!==ii&&(he.getTransfer(X)===ve?(rt!==vn||dt!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),S}function Gt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=I,this.setTexture2D=q,this.setTexture2DArray=G,this.setTexture3D=lt,this.setTextureCube=O,this.rebindTextures=mt,this.setupRenderTarget=Et,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=$t}function D0(i,t){function e(n,s=ii){let r,a=he.getTransfer(s);if(n===Hn)return i.UNSIGNED_BYTE;if(n===Xl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ql)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Lh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ih)return i.BYTE;if(n===Ph)return i.SHORT;if(n===Js)return i.UNSIGNED_SHORT;if(n===Wl)return i.INT;if(n===Ci)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===ar)return i.HALF_FLOAT;if(n===Dh)return i.ALPHA;if(n===Uh)return i.RGB;if(n===vn)return i.RGBA;if(n===Nh)return i.LUMINANCE;if(n===Fh)return i.LUMINANCE_ALPHA;if(n===rs)return i.DEPTH_COMPONENT;if(n===ds)return i.DEPTH_STENCIL;if(n===$l)return i.RED;if(n===Yl)return i.RED_INTEGER;if(n===Oh)return i.RG;if(n===Zl)return i.RG_INTEGER;if(n===Jl)return i.RGBA_INTEGER;if(n===Zr||n===Jr||n===Kr||n===jr)if(a===ve)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Uo||n===No||n===Fo||n===Oo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Uo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===No)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Fo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Bo||n===zo||n===ko)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Bo||n===zo)return a===ve?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ko)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Vo||n===Ho||n===Go||n===Wo||n===Xo||n===qo||n===$o||n===Yo||n===Zo||n===Jo||n===Ko||n===jo||n===Qo||n===tl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Vo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ho)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Go)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Xo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$o)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Yo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Zo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Jo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ko)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===jo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Qo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===tl)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qr||n===el||n===nl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Qr)return a===ve?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===el)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===nl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Bh||n===il||n===sl||n===rl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Qr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===sl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===us?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Ml=class extends Xe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Re=class extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}},U0={type:"move"},$s=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let y of t.hand.values()){let p=e.getJointPose(y,n),g=this._getHandJoint(c,y);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),u=.02,m=.005;c.inputState.pinching&&f>u+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=u-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(U0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},N0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,F0=`
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

}`,bl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new cn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new tn({vertexShader:N0,fragmentShader:F0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new fe(new ps(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Sl=class extends oi{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,u=null,m=null,y=new bl,p=e.getContextAttributes(),g=null,v=null,M=[],_=[],P=new Ct,E=null,C=new Xe;C.viewport=new Ce;let T=new Xe;T.viewport=new Ce;let b=[C,T],x=new Ml,w=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let nt=M[W];return nt===void 0&&(nt=new $s,M[W]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(W){let nt=M[W];return nt===void 0&&(nt=new $s,M[W]=nt),nt.getGripSpace()},this.getHand=function(W){let nt=M[W];return nt===void 0&&(nt=new $s,M[W]=nt),nt.getHandSpace()};function D(W){let nt=_.indexOf(W.inputSource);if(nt===-1)return;let ft=M[nt];ft!==void 0&&(ft.update(W.inputSource,W.frame,c||a),ft.dispatchEvent({type:W.type,data:W.inputSource}))}function z(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",q);for(let W=0;W<M.length;W++){let nt=_[W];nt!==null&&(_[W]=null,M[W].disconnect(nt))}w=null,I=null,y.reset(),t.setRenderTarget(g),u=null,f=null,d=null,s=null,v=null,yt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:u},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(g=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",z),s.addEventListener("inputsourceschange",q),p.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){let nt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),v=new Gn(u.framebufferWidth,u.framebufferHeight,{format:vn,type:Hn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let nt=null,ft=null,k=null;p.depth&&(k=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=p.stencil?ds:rs,ft=p.stencil?us:Ci);let tt={colorFormat:e.RGBA8,depthFormat:k,scaleFactor:r};d=new XRWebGLBinding(s,e),f=d.createProjectionLayer(tt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new Gn(f.textureWidth,f.textureHeight,{format:vn,type:Hn,depthTexture:new da(f.textureWidth,f.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),yt.setContext(s),yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function q(W){for(let nt=0;nt<W.removed.length;nt++){let ft=W.removed[nt],k=_.indexOf(ft);k>=0&&(_[k]=null,M[k].disconnect(ft))}for(let nt=0;nt<W.added.length;nt++){let ft=W.added[nt],k=_.indexOf(ft);if(k===-1){for(let st=0;st<M.length;st++)if(st>=_.length){_.push(ft),k=st;break}else if(_[st]===null){_[st]=ft,k=st;break}if(k===-1)break}let tt=M[k];tt&&tt.connect(ft)}}let G=new F,lt=new F;function O(W,nt,ft){G.setFromMatrixPosition(nt.matrixWorld),lt.setFromMatrixPosition(ft.matrixWorld);let k=G.distanceTo(lt),tt=nt.projectionMatrix.elements,st=ft.projectionMatrix.elements,mt=tt[14]/(tt[10]-1),Et=tt[14]/(tt[10]+1),Ut=(tt[9]+1)/tt[5],St=(tt[9]-1)/tt[5],U=(tt[8]-1)/tt[0],jt=(st[8]+1)/st[0],Ft=mt*U,$t=mt*jt,Ot=k/(-U+jt),le=Ot*-U;if(nt.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(le),W.translateZ(Ot),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),tt[10]===-1)W.projectionMatrix.copy(nt.projectionMatrix),W.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let Gt=mt+Ot,R=Et+Ot,S=Ft-le,X=$t+(k-le),rt=Ut*Et/R*Gt,dt=St*Et/R*Gt;W.projectionMatrix.makePerspective(S,X,rt,dt,Gt,R),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function Q(W,nt){nt===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(nt.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let nt=W.near,ft=W.far;y.texture!==null&&(y.depthNear>0&&(nt=y.depthNear),y.depthFar>0&&(ft=y.depthFar)),x.near=T.near=C.near=nt,x.far=T.far=C.far=ft,(w!==x.near||I!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),w=x.near,I=x.far),C.layers.mask=W.layers.mask|2,T.layers.mask=W.layers.mask|4,x.layers.mask=C.layers.mask|T.layers.mask;let k=W.parent,tt=x.cameras;Q(x,k);for(let st=0;st<tt.length;st++)Q(tt[st],k);tt.length===2?O(x,C,T):x.projectionMatrix.copy(C.projectionMatrix),pt(W,x,k)};function pt(W,nt,ft){ft===null?W.matrix.copy(nt.matrixWorld):(W.matrix.copy(ft.matrixWorld),W.matrix.invert(),W.matrix.multiply(nt.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(nt.projectionMatrix),W.projectionMatrixInverse.copy(nt.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ks*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&u===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=W)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(x)};let it=null;function ht(W,nt){if(h=nt.getViewerPose(c||a),m=nt,h!==null){let ft=h.views;u!==null&&(t.setRenderTargetFramebuffer(v,u.framebuffer),t.setRenderTarget(v));let k=!1;ft.length!==x.cameras.length&&(x.cameras.length=0,k=!0);for(let st=0;st<ft.length;st++){let mt=ft[st],Et=null;if(u!==null)Et=u.getViewport(mt);else{let St=d.getViewSubImage(f,mt);Et=St.viewport,st===0&&(t.setRenderTargetTextures(v,St.colorTexture,f.ignoreDepthValues?void 0:St.depthStencilTexture),t.setRenderTarget(v))}let Ut=b[st];Ut===void 0&&(Ut=new Xe,Ut.layers.enable(st),Ut.viewport=new Ce,b[st]=Ut),Ut.matrix.fromArray(mt.transform.matrix),Ut.matrix.decompose(Ut.position,Ut.quaternion,Ut.scale),Ut.projectionMatrix.fromArray(mt.projectionMatrix),Ut.projectionMatrixInverse.copy(Ut.projectionMatrix).invert(),Ut.viewport.set(Et.x,Et.y,Et.width,Et.height),st===0&&(x.matrix.copy(Ut.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),k===!0&&x.cameras.push(Ut)}let tt=s.enabledFeatures;if(tt&&tt.includes("depth-sensing")){let st=d.getDepthInformation(ft[0]);st&&st.isValid&&st.texture&&y.init(t,st,s.renderState)}}for(let ft=0;ft<M.length;ft++){let k=_[ft],tt=M[ft];k!==null&&tt!==void 0&&tt.update(k,nt,c||a)}it&&it(W,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),m=null}let yt=new Wh;yt.setAnimationLoop(ht),this.setAnimationLoop=function(W){it=W},this.dispose=function(){}}},Mi=new An,O0=new ge;function B0(i,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,Gh(i)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,v,M,_){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(p,g):g.isMeshToonMaterial?(r(p,g),d(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g)):g.isMeshStandardMaterial?(r(p,g),f(p,g),g.isMeshPhysicalMaterial&&u(p,g,_)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),y(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,v,M):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Ge&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Ge&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let v=t.get(g),M=v.envMap,_=v.envMapRotation;M&&(p.envMap.value=M,Mi.copy(_),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),p.envMapRotation.value.setFromMatrix4(O0.makeRotationFromEuler(Mi)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,v,M){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*v,p.scale.value=M*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function f(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function u(p,g,v){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Ge&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function y(p,g){let v=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function z0(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){let _=M.program;n.uniformBlockBinding(v,_)}function c(v,M){let _=s[v.id];_===void 0&&(m(v),_=h(v),s[v.id]=_,v.addEventListener("dispose",p));let P=M.program;n.updateUBOMapping(v,P);let E=t.render.frame;r[v.id]!==E&&(f(v),r[v.id]=E)}function h(v){let M=d();v.__bindingPointIndex=M;let _=i.createBuffer(),P=v.__size,E=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,P,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,_),_}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let M=s[v.id],_=v.uniforms,P=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let E=0,C=_.length;E<C;E++){let T=Array.isArray(_[E])?_[E]:[_[E]];for(let b=0,x=T.length;b<x;b++){let w=T[b];if(u(w,E,b,P)===!0){let I=w.__offset,D=Array.isArray(w.value)?w.value:[w.value],z=0;for(let q=0;q<D.length;q++){let G=D[q],lt=y(G);typeof G=="number"||typeof G=="boolean"?(w.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,I+z,w.__data)):G.isMatrix3?(w.__data[0]=G.elements[0],w.__data[1]=G.elements[1],w.__data[2]=G.elements[2],w.__data[3]=0,w.__data[4]=G.elements[3],w.__data[5]=G.elements[4],w.__data[6]=G.elements[5],w.__data[7]=0,w.__data[8]=G.elements[6],w.__data[9]=G.elements[7],w.__data[10]=G.elements[8],w.__data[11]=0):(G.toArray(w.__data,z),z+=lt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,I,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(v,M,_,P){let E=v.value,C=M+"_"+_;if(P[C]===void 0)return typeof E=="number"||typeof E=="boolean"?P[C]=E:P[C]=E.clone(),!0;{let T=P[C];if(typeof E=="number"||typeof E=="boolean"){if(T!==E)return P[C]=E,!0}else if(T.equals(E)===!1)return T.copy(E),!0}return!1}function m(v){let M=v.uniforms,_=0,P=16;for(let C=0,T=M.length;C<T;C++){let b=Array.isArray(M[C])?M[C]:[M[C]];for(let x=0,w=b.length;x<w;x++){let I=b[x],D=Array.isArray(I.value)?I.value:[I.value];for(let z=0,q=D.length;z<q;z++){let G=D[z],lt=y(G),O=_%P,Q=O%lt.boundary,pt=O+Q;_+=Q,pt!==0&&P-pt<lt.storage&&(_+=P-pt),I.__data=new Float32Array(lt.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=_,_+=lt.storage}}}let E=_%P;return E>0&&(_+=P-E),v.__size=_,v.__cache={},this}function y(v){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function p(v){let M=v.target;M.removeEventListener("dispose",p);let _=a.indexOf(M.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function g(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:g}}var ms=class{constructor(t={}){let{canvas:e=Hd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=a;let m=new Uint32Array(4),y=new Int32Array(4),p=null,g=null,v=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ze,this.toneMapping=ri,this.toneMappingExposure=1;let _=this,P=!1,E=0,C=0,T=null,b=-1,x=null,w=new Ce,I=new Ce,D=null,z=new zt(0),q=0,G=e.width,lt=e.height,O=1,Q=null,pt=null,it=new Ce(0,0,G,lt),ht=new Ce(0,0,G,lt),yt=!1,W=new js,nt=!1,ft=!1,k=new ge,tt=new ge,st=new F,mt=new Ce,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ut=!1;function St(){return T===null?O:1}let U=n;function jt(A,V){return e.getContext(A,V)}try{let A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",L,!1),e.addEventListener("webglcontextrestored",N,!1),e.addEventListener("webglcontextcreationerror",Y,!1),U===null){let V="webgl2";if(U=jt(V,A),U===null)throw jt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Ft,$t,Ot,le,Gt,R,S,X,rt,dt,at,Dt,bt,wt,ee,gt,Pt,Nt,Yt,Rt,se,Qt,ce,B;function vt(){Ft=new eg(U),Ft.init(),Qt=new D0(U,Ft),$t=new Zm(U,Ft,t,Qt),Ot=new I0(U,Ft),$t.reverseDepthBuffer&&f&&Ot.buffers.depth.setReversed(!0),le=new sg(U),Gt=new x0,R=new L0(U,Ft,Ot,Gt,$t,Qt,le),S=new Km(_),X=new tg(_),rt=new uf(U),ce=new $m(U,rt),dt=new ng(U,rt,le,ce),at=new ag(U,dt,rt,le),Yt=new rg(U,$t,R),gt=new Jm(Gt),Dt=new g0(_,S,X,Ft,$t,ce,gt),bt=new B0(_,Gt),wt=new y0,ee=new T0(Ft),Nt=new qm(_,S,X,Ot,at,u,l),Pt=new C0(_,at,$t),B=new z0(U,le,$t,Ot),Rt=new Ym(U,Ft,le),se=new ig(U,Ft,le),le.programs=Dt.programs,_.capabilities=$t,_.extensions=Ft,_.properties=Gt,_.renderLists=wt,_.shadowMap=Pt,_.state=Ot,_.info=le}vt();let j=new Sl(_,U);this.xr=j,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let A=Ft.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Ft.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(A){A!==void 0&&(O=A,this.setSize(G,lt,!1))},this.getSize=function(A){return A.set(G,lt)},this.setSize=function(A,V,J=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=A,lt=V,e.width=Math.floor(A*O),e.height=Math.floor(V*O),J===!0&&(e.style.width=A+"px",e.style.height=V+"px"),this.setViewport(0,0,A,V)},this.getDrawingBufferSize=function(A){return A.set(G*O,lt*O).floor()},this.setDrawingBufferSize=function(A,V,J){G=A,lt=V,O=J,e.width=Math.floor(A*J),e.height=Math.floor(V*J),this.setViewport(0,0,A,V)},this.getCurrentViewport=function(A){return A.copy(w)},this.getViewport=function(A){return A.copy(it)},this.setViewport=function(A,V,J,K){A.isVector4?it.set(A.x,A.y,A.z,A.w):it.set(A,V,J,K),Ot.viewport(w.copy(it).multiplyScalar(O).round())},this.getScissor=function(A){return A.copy(ht)},this.setScissor=function(A,V,J,K){A.isVector4?ht.set(A.x,A.y,A.z,A.w):ht.set(A,V,J,K),Ot.scissor(I.copy(ht).multiplyScalar(O).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(A){Ot.setScissorTest(yt=A)},this.setOpaqueSort=function(A){Q=A},this.setTransparentSort=function(A){pt=A},this.getClearColor=function(A){return A.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(A=!0,V=!0,J=!0){let K=0;if(A){let H=!1;if(T!==null){let Mt=T.texture.format;H=Mt===Jl||Mt===Zl||Mt===Yl}if(H){let Mt=T.texture.type,Lt=Mt===Hn||Mt===Ci||Mt===Js||Mt===us||Mt===Xl||Mt===ql,kt=Nt.getClearColor(),Vt=Nt.getClearAlpha(),ne=kt.r,re=kt.g,Ht=kt.b;Lt?(m[0]=ne,m[1]=re,m[2]=Ht,m[3]=Vt,U.clearBufferuiv(U.COLOR,0,m)):(y[0]=ne,y[1]=re,y[2]=Ht,y[3]=Vt,U.clearBufferiv(U.COLOR,0,y))}else K|=U.COLOR_BUFFER_BIT}V&&(K|=U.DEPTH_BUFFER_BIT),J&&(K|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",L,!1),e.removeEventListener("webglcontextrestored",N,!1),e.removeEventListener("webglcontextcreationerror",Y,!1),wt.dispose(),ee.dispose(),Gt.dispose(),S.dispose(),X.dispose(),at.dispose(),ce.dispose(),B.dispose(),Dt.dispose(),j.dispose(),j.removeEventListener("sessionstart",et),j.removeEventListener("sessionend",$),ot.stop()};function L(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function N(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let A=le.autoReset,V=Pt.enabled,J=Pt.autoUpdate,K=Pt.needsUpdate,H=Pt.type;vt(),le.autoReset=A,Pt.enabled=V,Pt.autoUpdate=J,Pt.needsUpdate=K,Pt.type=H}function Y(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function xt(A){let V=A.target;V.removeEventListener("dispose",xt),_t(V)}function _t(A){Bt(A),Gt.remove(A)}function Bt(A){let V=Gt.get(A).programs;V!==void 0&&(V.forEach(function(J){Dt.releaseProgram(J)}),A.isShaderMaterial&&Dt.releaseShaderCache(A))}this.renderBufferDirect=function(A,V,J,K,H,Mt){V===null&&(V=Et);let Lt=H.isMesh&&H.matrixWorld.determinant()<0,kt=sn(A,V,J,K,H);Ot.setMaterial(K,Lt);let Vt=J.index,ne=1;if(K.wireframe===!0){if(Vt=dt.getWireframeAttribute(J),Vt===void 0)return;ne=2}let re=J.drawRange,Ht=J.attributes.position,de=re.start*ne,Me=(re.start+re.count)*ne;Mt!==null&&(de=Math.max(de,Mt.start*ne),Me=Math.min(Me,(Mt.start+Mt.count)*ne)),Vt!==null?(de=Math.max(de,0),Me=Math.min(Me,Vt.count)):Ht!=null&&(de=Math.max(de,0),Me=Math.min(Me,Ht.count));let be=Me-de;if(be<0||be===1/0)return;ce.setup(H,K,kt,J,Vt);let Qe,pe=Rt;if(Vt!==null&&(Qe=rt.get(Vt),pe=se,pe.setIndex(Qe)),H.isMesh)K.wireframe===!0?(Ot.setLineWidth(K.wireframeLinewidth*St()),pe.setMode(U.LINES)):pe.setMode(U.TRIANGLES);else if(H.isLine){let Xt=K.linewidth;Xt===void 0&&(Xt=1),Ot.setLineWidth(Xt*St()),H.isLineSegments?pe.setMode(U.LINES):H.isLineLoop?pe.setMode(U.LINE_LOOP):pe.setMode(U.LINE_STRIP)}else H.isPoints?pe.setMode(U.POINTS):H.isSprite&&pe.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)pe.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Ft.get("WEBGL_multi_draw"))pe.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Xt=H._multiDrawStarts,Pn=H._multiDrawCounts,me=H._multiDrawCount,gn=Vt?rt.get(Vt).bytesPerElement:1,zi=Gt.get(K).currentProgram.getUniforms();for(let rn=0;rn<me;rn++)zi.setValue(U,"_gl_DrawID",rn),pe.render(Xt[rn]/gn,Pn[rn])}else if(H.isInstancedMesh)pe.renderInstances(de,be,H.count);else if(J.isInstancedBufferGeometry){let Xt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Pn=Math.min(J.instanceCount,Xt);pe.renderInstances(de,be,Pn)}else pe.render(de,be)};function At(A,V,J){A.transparent===!0&&A.side===Ie&&A.forceSinglePass===!1?(A.side=Ge,A.needsUpdate=!0,te(A,V,J),A.side=ai,A.needsUpdate=!0,te(A,V,J),A.side=Ie):te(A,V,J)}this.compile=function(A,V,J=null){J===null&&(J=A),g=ee.get(J),g.init(V),M.push(g),J.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(g.pushLight(H),H.castShadow&&g.pushShadow(H))}),A!==J&&A.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(g.pushLight(H),H.castShadow&&g.pushShadow(H))}),g.setupLights();let K=new Set;return A.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let Mt=H.material;if(Mt)if(Array.isArray(Mt))for(let Lt=0;Lt<Mt.length;Lt++){let kt=Mt[Lt];At(kt,J,H),K.add(kt)}else At(Mt,J,H),K.add(Mt)}),M.pop(),g=null,K},this.compileAsync=function(A,V,J=null){let K=this.compile(A,V,J);return new Promise(H=>{function Mt(){if(K.forEach(function(Lt){Gt.get(Lt).currentProgram.isReady()&&K.delete(Lt)}),K.size===0){H(A);return}setTimeout(Mt,10)}Ft.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let Jt=null;function Z(A){Jt&&Jt(A)}function et(){ot.stop()}function $(){ot.start()}let ot=new Wh;ot.setAnimationLoop(Z),typeof self<"u"&&ot.setContext(self),this.setAnimationLoop=function(A){Jt=A,j.setAnimationLoop(A),A===null?ot.stop():ot.start()},j.addEventListener("sessionstart",et),j.addEventListener("sessionend",$),this.render=function(A,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(V),V=j.getCamera()),A.isScene===!0&&A.onBeforeRender(_,A,V,T),g=ee.get(A,M.length),g.init(V),M.push(g),tt.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),W.setFromProjectionMatrix(tt),ft=this.localClippingEnabled,nt=gt.init(this.clippingPlanes,ft),p=wt.get(A,v.length),p.init(),v.push(p),j.enabled===!0&&j.isPresenting===!0){let Mt=_.xr.getDepthSensingMesh();Mt!==null&&ct(Mt,V,-1/0,_.sortObjects)}ct(A,V,0,_.sortObjects),p.finish(),_.sortObjects===!0&&p.sort(Q,pt),Ut=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Ut&&Nt.addToRenderList(p,A),this.info.render.frame++,nt===!0&&gt.beginShadows();let J=g.state.shadowsArray;Pt.render(J,A,V),nt===!0&&gt.endShadows(),this.info.autoReset===!0&&this.info.reset();let K=p.opaque,H=p.transmissive;if(g.setupLights(),V.isArrayCamera){let Mt=V.cameras;if(H.length>0)for(let Lt=0,kt=Mt.length;Lt<kt;Lt++){let Vt=Mt[Lt];It(K,H,A,Vt)}Ut&&Nt.render(A);for(let Lt=0,kt=Mt.length;Lt<kt;Lt++){let Vt=Mt[Lt];ut(p,A,Vt,Vt.viewport)}}else H.length>0&&It(K,H,A,V),Ut&&Nt.render(A),ut(p,A,V);T!==null&&(R.updateMultisampleRenderTarget(T),R.updateRenderTargetMipmap(T)),A.isScene===!0&&A.onAfterRender(_,A,V),ce.resetDefaultState(),b=-1,x=null,M.pop(),M.length>0?(g=M[M.length-1],nt===!0&&gt.setGlobalState(_.clippingPlanes,g.state.camera)):g=null,v.pop(),v.length>0?p=v[v.length-1]:p=null};function ct(A,V,J,K){if(A.visible===!1)return;if(A.layers.test(V.layers)){if(A.isGroup)J=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(V);else if(A.isLight)g.pushLight(A),A.castShadow&&g.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||W.intersectsSprite(A)){K&&mt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(tt);let Lt=at.update(A),kt=A.material;kt.visible&&p.push(A,Lt,kt,J,mt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||W.intersectsObject(A))){let Lt=at.update(A),kt=A.material;if(K&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),mt.copy(A.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),mt.copy(Lt.boundingSphere.center)),mt.applyMatrix4(A.matrixWorld).applyMatrix4(tt)),Array.isArray(kt)){let Vt=Lt.groups;for(let ne=0,re=Vt.length;ne<re;ne++){let Ht=Vt[ne],de=kt[Ht.materialIndex];de&&de.visible&&p.push(A,Lt,de,J,mt.z,Ht)}}else kt.visible&&p.push(A,Lt,kt,J,mt.z,null)}}let Mt=A.children;for(let Lt=0,kt=Mt.length;Lt<kt;Lt++)ct(Mt[Lt],V,J,K)}function ut(A,V,J,K){let H=A.opaque,Mt=A.transmissive,Lt=A.transparent;g.setupLightsView(J),nt===!0&&gt.setGlobalState(_.clippingPlanes,J),K&&Ot.viewport(w.copy(K)),H.length>0&&Kt(H,V,J),Mt.length>0&&Kt(Mt,V,J),Lt.length>0&&Kt(Lt,V,J),Ot.buffers.depth.setTest(!0),Ot.buffers.depth.setMask(!0),Ot.buffers.color.setMask(!0),Ot.setPolygonOffset(!1)}function It(A,V,J,K){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[K.id]===void 0&&(g.state.transmissionRenderTarget[K.id]=new Gn(1,1,{generateMipmaps:!0,type:Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float")?ar:Hn,minFilter:Ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));let Mt=g.state.transmissionRenderTarget[K.id],Lt=K.viewport||w;Mt.setSize(Lt.z,Lt.w);let kt=_.getRenderTarget();_.setRenderTarget(Mt),_.getClearColor(z),q=_.getClearAlpha(),q<1&&_.setClearColor(16777215,.5),_.clear(),Ut&&Nt.render(J);let Vt=_.toneMapping;_.toneMapping=ri;let ne=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),g.setupLightsView(K),nt===!0&&gt.setGlobalState(_.clippingPlanes,K),Kt(A,J,K),R.updateMultisampleRenderTarget(Mt),R.updateRenderTargetMipmap(Mt),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let re=!1;for(let Ht=0,de=V.length;Ht<de;Ht++){let Me=V[Ht],be=Me.object,Qe=Me.geometry,pe=Me.material,Xt=Me.group;if(pe.side===Ie&&be.layers.test(K.layers)){let Pn=pe.side;pe.side=Ge,pe.needsUpdate=!0,Wt(be,J,K,Qe,pe,Xt),pe.side=Pn,pe.needsUpdate=!0,re=!0}}re===!0&&(R.updateMultisampleRenderTarget(Mt),R.updateRenderTargetMipmap(Mt))}_.setRenderTarget(kt),_.setClearColor(z,q),ne!==void 0&&(K.viewport=ne),_.toneMapping=Vt}function Kt(A,V,J){let K=V.isScene===!0?V.overrideMaterial:null;for(let H=0,Mt=A.length;H<Mt;H++){let Lt=A[H],kt=Lt.object,Vt=Lt.geometry,ne=K===null?Lt.material:K,re=Lt.group;kt.layers.test(J.layers)&&Wt(kt,V,J,Vt,ne,re)}}function Wt(A,V,J,K,H,Mt){A.onBeforeRender(_,V,J,K,H,Mt),A.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(_,V,J,K,A,Mt),H.transparent===!0&&H.side===Ie&&H.forceSinglePass===!1?(H.side=Ge,H.needsUpdate=!0,_.renderBufferDirect(J,V,K,H,A,Mt),H.side=ai,H.needsUpdate=!0,_.renderBufferDirect(J,V,K,H,A,Mt),H.side=Ie):_.renderBufferDirect(J,V,K,H,A,Mt),A.onAfterRender(_,V,J,K,H,Mt)}function te(A,V,J){V.isScene!==!0&&(V=Et);let K=Gt.get(A),H=g.state.lights,Mt=g.state.shadowsArray,Lt=H.state.version,kt=Dt.getParameters(A,H.state,Mt,V,J),Vt=Dt.getProgramCacheKey(kt),ne=K.programs;K.environment=A.isMeshStandardMaterial?V.environment:null,K.fog=V.fog,K.envMap=(A.isMeshStandardMaterial?X:S).get(A.envMap||K.environment),K.envMapRotation=K.environment!==null&&A.envMap===null?V.environmentRotation:A.envMapRotation,ne===void 0&&(A.addEventListener("dispose",xt),ne=new Map,K.programs=ne);let re=ne.get(Vt);if(re!==void 0){if(K.currentProgram===re&&K.lightsStateVersion===Lt)return ke(A,kt),re}else kt.uniforms=Dt.getUniforms(A),A.onBeforeCompile(kt,_),re=Dt.acquireProgram(kt,Vt),ne.set(Vt,re),K.uniforms=kt.uniforms;let Ht=K.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ht.clippingPlanes=gt.uniform),ke(A,kt),K.needsLights=ye(A),K.lightsStateVersion=Lt,K.needsLights&&(Ht.ambientLightColor.value=H.state.ambient,Ht.lightProbe.value=H.state.probe,Ht.directionalLights.value=H.state.directional,Ht.directionalLightShadows.value=H.state.directionalShadow,Ht.spotLights.value=H.state.spot,Ht.spotLightShadows.value=H.state.spotShadow,Ht.rectAreaLights.value=H.state.rectArea,Ht.ltc_1.value=H.state.rectAreaLTC1,Ht.ltc_2.value=H.state.rectAreaLTC2,Ht.pointLights.value=H.state.point,Ht.pointLightShadows.value=H.state.pointShadow,Ht.hemisphereLights.value=H.state.hemi,Ht.directionalShadowMap.value=H.state.directionalShadowMap,Ht.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ht.spotShadowMap.value=H.state.spotShadowMap,Ht.spotLightMatrix.value=H.state.spotLightMatrix,Ht.spotLightMap.value=H.state.spotLightMap,Ht.pointShadowMap.value=H.state.pointShadowMap,Ht.pointShadowMatrix.value=H.state.pointShadowMatrix),K.currentProgram=re,K.uniformsList=null,re}function De(A){if(A.uniformsList===null){let V=A.currentProgram.getUniforms();A.uniformsList=os.seqWithValue(V.seq,A.uniforms)}return A.uniformsList}function ke(A,V){let J=Gt.get(A);J.outputColorSpace=V.outputColorSpace,J.batching=V.batching,J.batchingColor=V.batchingColor,J.instancing=V.instancing,J.instancingColor=V.instancingColor,J.instancingMorph=V.instancingMorph,J.skinning=V.skinning,J.morphTargets=V.morphTargets,J.morphNormals=V.morphNormals,J.morphColors=V.morphColors,J.morphTargetsCount=V.morphTargetsCount,J.numClippingPlanes=V.numClippingPlanes,J.numIntersection=V.numClipIntersection,J.vertexAlphas=V.vertexAlphas,J.vertexTangents=V.vertexTangents,J.toneMapping=V.toneMapping}function sn(A,V,J,K,H){V.isScene!==!0&&(V=Et),R.resetTextureUnits();let Mt=V.fog,Lt=K.isMeshStandardMaterial?V.environment:null,kt=T===null?_.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:ws,Vt=(K.isMeshStandardMaterial?X:S).get(K.envMap||Lt),ne=K.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,re=!!J.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ht=!!J.morphAttributes.position,de=!!J.morphAttributes.normal,Me=!!J.morphAttributes.color,be=ri;K.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(be=_.toneMapping);let Qe=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,pe=Qe!==void 0?Qe.length:0,Xt=Gt.get(K),Pn=g.state.lights;if(nt===!0&&(ft===!0||A!==x)){let un=A===x&&K.id===b;gt.setState(K,A,un)}let me=!1;K.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==Pn.state.version||Xt.outputColorSpace!==kt||H.isBatchedMesh&&Xt.batching===!1||!H.isBatchedMesh&&Xt.batching===!0||H.isBatchedMesh&&Xt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Xt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Xt.instancing===!1||!H.isInstancedMesh&&Xt.instancing===!0||H.isSkinnedMesh&&Xt.skinning===!1||!H.isSkinnedMesh&&Xt.skinning===!0||H.isInstancedMesh&&Xt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Xt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Xt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Xt.instancingMorph===!1&&H.morphTexture!==null||Xt.envMap!==Vt||K.fog===!0&&Xt.fog!==Mt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==gt.numPlanes||Xt.numIntersection!==gt.numIntersection)||Xt.vertexAlphas!==ne||Xt.vertexTangents!==re||Xt.morphTargets!==Ht||Xt.morphNormals!==de||Xt.morphColors!==Me||Xt.toneMapping!==be||Xt.morphTargetsCount!==pe)&&(me=!0):(me=!0,Xt.__version=K.version);let gn=Xt.currentProgram;me===!0&&(gn=te(K,V,H));let zi=!1,rn=!1,Ns=!1,Se=gn.getUniforms(),Sn=Xt.uniforms;if(Ot.useProgram(gn.program)&&(zi=!0,rn=!0,Ns=!0),K.id!==b&&(b=K.id,rn=!0),zi||x!==A){Ot.buffers.depth.getReversed()?(k.copy(A.projectionMatrix),Wd(k),Xd(k),Se.setValue(U,"projectionMatrix",k)):Se.setValue(U,"projectionMatrix",A.projectionMatrix),Se.setValue(U,"viewMatrix",A.matrixWorldInverse);let Zn=Se.map.cameraPosition;Zn!==void 0&&Zn.setValue(U,st.setFromMatrixPosition(A.matrixWorld)),$t.logarithmicDepthBuffer&&Se.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Se.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),x!==A&&(x=A,rn=!0,Ns=!0)}if(H.isSkinnedMesh){Se.setOptional(U,H,"bindMatrix"),Se.setOptional(U,H,"bindMatrixInverse");let un=H.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),Se.setValue(U,"boneTexture",un.boneTexture,R))}H.isBatchedMesh&&(Se.setOptional(U,H,"batchingTexture"),Se.setValue(U,"batchingTexture",H._matricesTexture,R),Se.setOptional(U,H,"batchingIdTexture"),Se.setValue(U,"batchingIdTexture",H._indirectTexture,R),Se.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&Se.setValue(U,"batchingColorTexture",H._colorsTexture,R));let Fs=J.morphAttributes;if((Fs.position!==void 0||Fs.normal!==void 0||Fs.color!==void 0)&&Yt.update(H,J,gn),(rn||Xt.receiveShadow!==H.receiveShadow)&&(Xt.receiveShadow=H.receiveShadow,Se.setValue(U,"receiveShadow",H.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(Sn.envMap.value=Vt,Sn.flipEnvMap.value=Vt.isCubeTexture&&Vt.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&V.environment!==null&&(Sn.envMapIntensity.value=V.environmentIntensity),rn&&(Se.setValue(U,"toneMappingExposure",_.toneMappingExposure),Xt.needsLights&&Ee(Sn,Ns),Mt&&K.fog===!0&&bt.refreshFogUniforms(Sn,Mt),bt.refreshMaterialUniforms(Sn,K,O,lt,g.state.transmissionRenderTarget[A.id]),os.upload(U,De(Xt),Sn,R)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(os.upload(U,De(Xt),Sn,R),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Se.setValue(U,"center",H.center),Se.setValue(U,"modelViewMatrix",H.modelViewMatrix),Se.setValue(U,"normalMatrix",H.normalMatrix),Se.setValue(U,"modelMatrix",H.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){let un=K.uniformsGroups;for(let Zn=0,Jn=un.length;Zn<Jn;Zn++){let xc=un[Zn];B.update(xc,gn),B.bind(xc,gn)}}return gn}function Ee(A,V){A.ambientLightColor.needsUpdate=V,A.lightProbe.needsUpdate=V,A.directionalLights.needsUpdate=V,A.directionalLightShadows.needsUpdate=V,A.pointLights.needsUpdate=V,A.pointLightShadows.needsUpdate=V,A.spotLights.needsUpdate=V,A.spotLightShadows.needsUpdate=V,A.rectAreaLights.needsUpdate=V,A.hemisphereLights.needsUpdate=V}function ye(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(A,V,J){Gt.get(A.texture).__webglTexture=V,Gt.get(A.depthTexture).__webglTexture=J;let K=Gt.get(A);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=J===void 0,K.__autoAllocateDepthBuffer||Ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,V){let J=Gt.get(A);J.__webglFramebuffer=V,J.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(A,V=0,J=0){T=A,E=V,C=J;let K=!0,H=null,Mt=!1,Lt=!1;if(A){let Vt=Gt.get(A);if(Vt.__useDefaultFramebuffer!==void 0)Ot.bindFramebuffer(U.FRAMEBUFFER,null),K=!1;else if(Vt.__webglFramebuffer===void 0)R.setupRenderTarget(A);else if(Vt.__hasExternalTextures)R.rebindTextures(A,Gt.get(A.texture).__webglTexture,Gt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Ht=A.depthTexture;if(Vt.__boundDepthTexture!==Ht){if(Ht!==null&&Gt.has(Ht)&&(A.width!==Ht.image.width||A.height!==Ht.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(A)}}let ne=A.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Lt=!0);let re=Gt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(re[V])?H=re[V][J]:H=re[V],Mt=!0):A.samples>0&&R.useMultisampledRTT(A)===!1?H=Gt.get(A).__webglMultisampledFramebuffer:Array.isArray(re)?H=re[J]:H=re,w.copy(A.viewport),I.copy(A.scissor),D=A.scissorTest}else w.copy(it).multiplyScalar(O).floor(),I.copy(ht).multiplyScalar(O).floor(),D=yt;if(Ot.bindFramebuffer(U.FRAMEBUFFER,H)&&K&&Ot.drawBuffers(A,H),Ot.viewport(w),Ot.scissor(I),Ot.setScissorTest(D),Mt){let Vt=Gt.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+V,Vt.__webglTexture,J)}else if(Lt){let Vt=Gt.get(A.texture),ne=V||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Vt.__webglTexture,J||0,ne)}b=-1},this.readRenderTargetPixels=function(A,V,J,K,H,Mt,Lt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=Gt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Lt!==void 0&&(kt=kt[Lt]),kt){Ot.bindFramebuffer(U.FRAMEBUFFER,kt);try{let Vt=A.texture,ne=Vt.format,re=Vt.type;if(!$t.textureFormatReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$t.textureTypeReadable(re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=A.width-K&&J>=0&&J<=A.height-H&&U.readPixels(V,J,K,H,Qt.convert(ne),Qt.convert(re),Mt)}finally{let Vt=T!==null?Gt.get(T).__webglFramebuffer:null;Ot.bindFramebuffer(U.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(A,V,J,K,H,Mt,Lt){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let kt=Gt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Lt!==void 0&&(kt=kt[Lt]),kt){let Vt=A.texture,ne=Vt.format,re=Vt.type;if(!$t.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$t.textureTypeReadable(re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=A.width-K&&J>=0&&J<=A.height-H){Ot.bindFramebuffer(U.FRAMEBUFFER,kt);let Ht=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ht),U.bufferData(U.PIXEL_PACK_BUFFER,Mt.byteLength,U.STREAM_READ),U.readPixels(V,J,K,H,Qt.convert(ne),Qt.convert(re),0);let de=T!==null?Gt.get(T).__webglFramebuffer:null;Ot.bindFramebuffer(U.FRAMEBUFFER,de);let Me=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Gd(U,Me,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ht),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Mt),U.deleteBuffer(Ht),U.deleteSync(Me),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,V=null,J=0){A.isTexture!==!0&&(Gs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,A=arguments[1]);let K=Math.pow(2,-J),H=Math.floor(A.image.width*K),Mt=Math.floor(A.image.height*K),Lt=V!==null?V.x:0,kt=V!==null?V.y:0;R.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,J,0,0,Lt,kt,H,Mt),Ot.unbindTexture()},this.copyTextureToTexture=function(A,V,J=null,K=null,H=0){A.isTexture!==!0&&(Gs("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,A=arguments[1],V=arguments[2],H=arguments[3]||0,J=null);let Mt,Lt,kt,Vt,ne,re,Ht,de,Me,be=A.isCompressedTexture?A.mipmaps[H]:A.image;J!==null?(Mt=J.max.x-J.min.x,Lt=J.max.y-J.min.y,kt=J.isBox3?J.max.z-J.min.z:1,Vt=J.min.x,ne=J.min.y,re=J.isBox3?J.min.z:0):(Mt=be.width,Lt=be.height,kt=be.depth||1,Vt=0,ne=0,re=0),K!==null?(Ht=K.x,de=K.y,Me=K.z):(Ht=0,de=0,Me=0);let Qe=Qt.convert(V.format),pe=Qt.convert(V.type),Xt;V.isData3DTexture?(R.setTexture3D(V,0),Xt=U.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(R.setTexture2DArray(V,0),Xt=U.TEXTURE_2D_ARRAY):(R.setTexture2D(V,0),Xt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,V.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,V.unpackAlignment);let Pn=U.getParameter(U.UNPACK_ROW_LENGTH),me=U.getParameter(U.UNPACK_IMAGE_HEIGHT),gn=U.getParameter(U.UNPACK_SKIP_PIXELS),zi=U.getParameter(U.UNPACK_SKIP_ROWS),rn=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,be.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,be.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Vt),U.pixelStorei(U.UNPACK_SKIP_ROWS,ne),U.pixelStorei(U.UNPACK_SKIP_IMAGES,re);let Ns=A.isDataArrayTexture||A.isData3DTexture,Se=V.isDataArrayTexture||V.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){let Sn=Gt.get(A),Fs=Gt.get(V),un=Gt.get(Sn.__renderTarget),Zn=Gt.get(Fs.__renderTarget);Ot.bindFramebuffer(U.READ_FRAMEBUFFER,un.__webglFramebuffer),Ot.bindFramebuffer(U.DRAW_FRAMEBUFFER,Zn.__webglFramebuffer);for(let Jn=0;Jn<kt;Jn++)Ns&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Gt.get(A).__webglTexture,H,re+Jn),A.isDepthTexture?(Se&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Gt.get(V).__webglTexture,H,Me+Jn),U.blitFramebuffer(Vt,ne,Mt,Lt,Ht,de,Mt,Lt,U.DEPTH_BUFFER_BIT,U.NEAREST)):Se?U.copyTexSubImage3D(Xt,H,Ht,de,Me+Jn,Vt,ne,Mt,Lt):U.copyTexSubImage2D(Xt,H,Ht,de,Me+Jn,Vt,ne,Mt,Lt);Ot.bindFramebuffer(U.READ_FRAMEBUFFER,null),Ot.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Se?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(Xt,H,Ht,de,Me,Mt,Lt,kt,Qe,pe,be.data):V.isCompressedArrayTexture?U.compressedTexSubImage3D(Xt,H,Ht,de,Me,Mt,Lt,kt,Qe,be.data):U.texSubImage3D(Xt,H,Ht,de,Me,Mt,Lt,kt,Qe,pe,be):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,H,Ht,de,Mt,Lt,Qe,pe,be.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,H,Ht,de,be.width,be.height,Qe,be.data):U.texSubImage2D(U.TEXTURE_2D,H,Ht,de,Mt,Lt,Qe,pe,be);U.pixelStorei(U.UNPACK_ROW_LENGTH,Pn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,me),U.pixelStorei(U.UNPACK_SKIP_PIXELS,gn),U.pixelStorei(U.UNPACK_SKIP_ROWS,zi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,rn),H===0&&V.generateMipmaps&&U.generateMipmap(Xt),Ot.unbindTexture()},this.copyTextureToTexture3D=function(A,V,J=null,K=null,H=0){return A.isTexture!==!0&&(Gs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),J=arguments[0]||null,K=arguments[1]||null,A=arguments[2],V=arguments[3],H=arguments[4]||0),Gs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,V,J,K,H)},this.initRenderTarget=function(A){Gt.get(A).__webglFramebuffer===void 0&&R.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?R.setTextureCube(A,0):A.isData3DTexture?R.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?R.setTexture2DArray(A,0):R.setTexture2D(A,0),Ot.unbindTexture()},this.resetState=function(){E=0,C=0,T=null,Ot.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=he._getDrawingBufferColorSpace(t),e.unpackColorSpace=he._getUnpackColorSpace()}};var gs=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},xs=class extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var wl=class extends cn{constructor(t=null,e=1,n=1,s,r,a,o,l,c=ln,h=ln,d,f){super(null,a,o,l,c,h,s,r,d,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Qs=class extends qe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ts=new ge,yh=new ge,Wr=[],vh=new Wn,k0=new ge,Vs=new fe,Hs=new Ri,Pi=class extends fe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Qs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,k0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Wn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),vh.copy(t.boundingBox).applyMatrix4(ts),this.boundingBox.union(vh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ri),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),Hs.copy(t.boundingSphere).applyMatrix4(ts),this.boundingSphere.union(Hs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Vs.geometry=this.geometry,Vs.material=this.material,Vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hs.copy(this.boundingSphere),Hs.applyMatrix4(n),t.ray.intersectsSphere(Hs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ts),yh.multiplyMatrices(n,ts),Vs.matrixWorld=yh,Vs.raycast(t,Wr);for(let a=0,o=Wr.length;a<o;a++){let l=Wr[a];l.instanceId=r,l.object=this,e.push(l)}Wr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Qs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new wl(new Float32Array(s*this.count),s,this.count,$l,En));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var fn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],f=n[s+1]-h,u=(a-h)/f;return(s+u)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new Ct:new F);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new F,s=[],r=[],a=[],o=new F,l=new ge;for(let u=0;u<=t;u++){let m=u/t;s[u]=this.getTangentAt(m,new F)}r[0]=new F,a[0]=new F;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(s[u-1],s[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(He(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(l.makeRotationAxis(o,m))}a[u].crossVectors(s[u],r[u])}if(e===!0){let u=Math.acos(He(r[0].dot(r[t]),-1,1));u/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(u=-u);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],u*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},tr=class extends fn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Ct){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,u=c-this.aY;l=f*h-u*d+this.aX,c=f*d+u*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Tl=class extends tr{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Ql(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+d)+(l-o)/d;f*=h,u*=h,s(a,o,f,u)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var Xr=new F,xo=new Ql,_o=new Ql,yo=new Ql,Li=class extends fn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new F){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Xr.subVectors(s[0],s[1]).add(s[0]),c=Xr);let d=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Xr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Xr),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),u),y=Math.pow(d.distanceToSquared(f),u),p=Math.pow(f.distanceToSquared(h),u);y<1e-4&&(y=1),m<1e-4&&(m=y),p<1e-4&&(p=y),xo.initNonuniformCatmullRom(c.x,d.x,f.x,h.x,m,y,p),_o.initNonuniformCatmullRom(c.y,d.y,f.y,h.y,m,y,p),yo.initNonuniformCatmullRom(c.z,d.z,f.z,h.z,m,y,p)}else this.curveType==="catmullrom"&&(xo.initCatmullRom(c.x,d.x,f.x,h.x,this.tension),_o.initCatmullRom(c.y,d.y,f.y,h.y,this.tension),yo.initCatmullRom(c.z,d.z,f.z,h.z,this.tension));return n.set(xo.calc(l),_o.calc(l),yo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new F().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Mh(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function V0(i,t){let e=1-i;return e*e*t}function H0(i,t){return 2*(1-i)*i*t}function G0(i,t){return i*i*t}function Ys(i,t,e,n){return V0(i,t)+H0(i,e)+G0(i,n)}function W0(i,t){let e=1-i;return e*e*e*t}function X0(i,t){let e=1-i;return 3*e*e*i*t}function q0(i,t){return 3*(1-i)*i*i*t}function $0(i,t){return i*i*i*t}function Zs(i,t,e,n,s){return W0(i,t)+X0(i,e)+q0(i,n)+$0(i,s)}var fa=class extends fn{constructor(t=new Ct,e=new Ct,n=new Ct,s=new Ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ct){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Zs(t,s.x,r.x,a.x,o.x),Zs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},El=class extends fn{constructor(t=new F,e=new F,n=new F,s=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new F){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Zs(t,s.x,r.x,a.x,o.x),Zs(t,s.y,r.y,a.y,o.y),Zs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},pa=class extends fn{constructor(t=new Ct,e=new Ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ct){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Al=class extends fn{constructor(t=new F,e=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new F){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new F){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ma=class extends fn{constructor(t=new Ct,e=new Ct,n=new Ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ct){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ys(t,s.x,r.x,a.x),Ys(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ga=class extends fn{constructor(t=new F,e=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new F){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ys(t,s.x,r.x,a.x),Ys(t,s.y,r.y,a.y),Ys(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},xa=class extends fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ct){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Mh(o,l.x,c.x,h.x,d.x),Mh(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new Ct().fromArray(s))}return this}},Cl=Object.freeze({__proto__:null,ArcCurve:Tl,CatmullRomCurve3:Li,CubicBezierCurve:fa,CubicBezierCurve3:El,EllipseCurve:tr,LineCurve:pa,LineCurve3:Al,QuadraticBezierCurve:ma,QuadraticBezierCurve3:ga,SplineCurve:xa}),Rl=class extends fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Cl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Cl[s.type]().fromJSON(s))}return this}},_a=class extends Rl{constructor(t){super(),this.type="Path",this.currentPoint=new Ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new pa(this.currentPoint.clone(),new Ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new ma(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new fa(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s),new Ct(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new xa(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new tr(t,e,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ya=class i extends xe{constructor(t=[new Ct(0,-.5),new Ct(.5,0),new Ct(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=He(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,d=new F,f=new Ct,u=new F,m=new F,y=new F,p=0,g=0;for(let v=0;v<=t.length-1;v++)switch(v){case 0:p=t[v+1].x-t[v].x,g=t[v+1].y-t[v].y,u.x=g*1,u.y=-p,u.z=g*0,y.copy(u),u.normalize(),l.push(u.x,u.y,u.z);break;case t.length-1:l.push(y.x,y.y,y.z);break;default:p=t[v+1].x-t[v].x,g=t[v+1].y-t[v].y,u.x=g*1,u.y=-p,u.z=g*0,m.copy(u),u.x+=y.x,u.y+=y.y,u.z+=y.z,u.normalize(),l.push(u.x,u.y,u.z),y.copy(m)}for(let v=0;v<=e;v++){let M=n+v*h*s,_=Math.sin(M),P=Math.cos(M);for(let E=0;E<=t.length-1;E++){d.x=t[E].x*_,d.y=t[E].y,d.z=t[E].x*P,a.push(d.x,d.y,d.z),f.x=v/e,f.y=E/(t.length-1),o.push(f.x,f.y);let C=l[3*E+0]*_,T=l[3*E+1],b=l[3*E+0]*P;c.push(C,T,b)}}for(let v=0;v<e;v++)for(let M=0;M<t.length-1;M++){let _=M+v*t.length,P=_,E=_+t.length,C=_+t.length+1,T=_+1;r.push(P,E,T),r.push(C,T,E)}this.setIndex(r),this.setAttribute("position",new qt(a,3)),this.setAttribute("uv",new qt(o,2)),this.setAttribute("normal",new qt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var ci=class i extends xe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new F,h=new Ct;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=e;d++,f+=3){let u=n+d/e*s;c.x=t*Math.cos(u),c.y=t*Math.sin(u),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(o,3)),this.setAttribute("uv",new qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ue=class i extends xe{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],f=[],u=[],m=0,y=[],p=n/2,g=0;v(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new qt(d,3)),this.setAttribute("normal",new qt(f,3)),this.setAttribute("uv",new qt(u,2));function v(){let _=new F,P=new F,E=0,C=(e-t)/n;for(let T=0;T<=r;T++){let b=[],x=T/r,w=x*(e-t)+t;for(let I=0;I<=s;I++){let D=I/s,z=D*l+o,q=Math.sin(z),G=Math.cos(z);P.x=w*q,P.y=-x*n+p,P.z=w*G,d.push(P.x,P.y,P.z),_.set(q,C,G).normalize(),f.push(_.x,_.y,_.z),u.push(D,1-x),b.push(m++)}y.push(b)}for(let T=0;T<s;T++)for(let b=0;b<r;b++){let x=y[b][T],w=y[b+1][T],I=y[b+1][T+1],D=y[b][T+1];(t>0||b!==0)&&(h.push(x,w,D),E+=3),(e>0||b!==r-1)&&(h.push(w,I,D),E+=3)}c.addGroup(g,E,0),g+=E}function M(_){let P=m,E=new Ct,C=new F,T=0,b=_===!0?t:e,x=_===!0?1:-1;for(let I=1;I<=s;I++)d.push(0,p*x,0),f.push(0,x,0),u.push(.5,.5),m++;let w=m;for(let I=0;I<=s;I++){let z=I/s*l+o,q=Math.cos(z),G=Math.sin(z);C.x=b*G,C.y=p*x,C.z=b*q,d.push(C.x,C.y,C.z),f.push(0,x,0),E.x=q*.5+.5,E.y=G*.5*x+.5,u.push(E.x,E.y),m++}for(let I=0;I<s;I++){let D=P+I,z=w+I;_===!0?h.push(z,z+1,D):h.push(z+1,z,D),T+=3}c.addGroup(g,T,_===!0?1:2),g+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},We=class i extends ue{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},va=class i extends xe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new qt(r,3)),this.setAttribute("normal",new qt(r.slice(),3)),this.setAttribute("uv",new qt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let M=new F,_=new F,P=new F;for(let E=0;E<e.length;E+=3)u(e[E+0],M),u(e[E+1],_),u(e[E+2],P),l(M,_,P,v)}function l(v,M,_,P){let E=P+1,C=[];for(let T=0;T<=E;T++){C[T]=[];let b=v.clone().lerp(_,T/E),x=M.clone().lerp(_,T/E),w=E-T;for(let I=0;I<=w;I++)I===0&&T===E?C[T][I]=b:C[T][I]=b.clone().lerp(x,I/w)}for(let T=0;T<E;T++)for(let b=0;b<2*(E-T)-1;b++){let x=Math.floor(b/2);b%2===0?(f(C[T][x+1]),f(C[T+1][x]),f(C[T][x])):(f(C[T][x+1]),f(C[T+1][x+1]),f(C[T+1][x]))}}function c(v){let M=new F;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(v),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function h(){let v=new F;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];let _=p(v)/2/Math.PI+.5,P=g(v)/Math.PI+.5;a.push(_,1-P)}m(),d()}function d(){for(let v=0;v<a.length;v+=6){let M=a[v+0],_=a[v+2],P=a[v+4],E=Math.max(M,_,P),C=Math.min(M,_,P);E>.9&&C<.1&&(M<.2&&(a[v+0]+=1),_<.2&&(a[v+2]+=1),P<.2&&(a[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function u(v,M){let _=v*3;M.x=t[_+0],M.y=t[_+1],M.z=t[_+2]}function m(){let v=new F,M=new F,_=new F,P=new F,E=new Ct,C=new Ct,T=new Ct;for(let b=0,x=0;b<r.length;b+=9,x+=6){v.set(r[b+0],r[b+1],r[b+2]),M.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),E.set(a[x+0],a[x+1]),C.set(a[x+2],a[x+3]),T.set(a[x+4],a[x+5]),P.copy(v).add(M).add(_).divideScalar(3);let w=p(P);y(E,x+0,v,w),y(C,x+2,M,w),y(T,x+4,_,w)}}function y(v,M,_,P){P<0&&v.x===1&&(a[M]=v.x-1),_.x===0&&_.z===0&&(a[M]=P/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function g(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}},_s=class i extends va{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var Xn=class extends _a{constructor(t){super(t),this.uuid=Fi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new _a().fromJSON(s))}return this}},Y0={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Zh(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,d,f,u;if(n&&(r=Q0(i,t,r,e)),i.length>80*e){o=c=i[0],l=h=i[1];for(let m=e;m<s;m+=e)d=i[m],f=i[m+1],d<o&&(o=d),f<l&&(l=f),d>c&&(c=d),f>h&&(h=f);u=Math.max(c-o,h-l),u=u!==0?32767/u:0}return er(r,a,e,o,l,u,0),a}};function Zh(i,t,e,n,s){let r,a;if(s===hx(i,t,e,n)>0)for(r=t;r<e;r+=n)a=bh(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=bh(r,i[r],i[r+1],a);return a&&Aa(a,a.next)&&(ir(a),a=a.next),a}function Di(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Aa(e,e.next)||Ae(e.prev,e,e.next)===0)){if(ir(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function er(i,t,e,n,s,r,a){if(!i)return;!a&&r&&sx(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?J0(i,n,s,r):Z0(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),ir(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=K0(Di(i),t,e),er(i,t,e,n,s,r,2)):a===2&&j0(i,t,e,n,s,r):er(Di(i),t,e,n,s,r,1);break}}}function Z0(i){let t=i.prev,e=i,n=i.next;if(Ae(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=s<r?s<a?s:a:r<a?r:a,d=o<l?o<c?o:c:l<c?l:c,f=s>r?s>a?s:a:r>a?r:a,u=o>l?o>c?o:c:l>c?l:c,m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=f&&m.y>=d&&m.y<=u&&is(s,o,r,l,a,c,m.x,m.y)&&Ae(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function J0(i,t,e,n){let s=i.prev,r=i,a=i.next;if(Ae(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,f=a.y,u=o<l?o<c?o:c:l<c?l:c,m=h<d?h<f?h:f:d<f?d:f,y=o>l?o>c?o:c:l>c?l:c,p=h>d?h>f?h:f:d>f?d:f,g=Il(u,m,t,e,n),v=Il(y,p,t,e,n),M=i.prevZ,_=i.nextZ;for(;M&&M.z>=g&&_&&_.z<=v;){if(M.x>=u&&M.x<=y&&M.y>=m&&M.y<=p&&M!==s&&M!==a&&is(o,h,l,d,c,f,M.x,M.y)&&Ae(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=u&&_.x<=y&&_.y>=m&&_.y<=p&&_!==s&&_!==a&&is(o,h,l,d,c,f,_.x,_.y)&&Ae(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=g;){if(M.x>=u&&M.x<=y&&M.y>=m&&M.y<=p&&M!==s&&M!==a&&is(o,h,l,d,c,f,M.x,M.y)&&Ae(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=v;){if(_.x>=u&&_.x<=y&&_.y>=m&&_.y<=p&&_!==s&&_!==a&&is(o,h,l,d,c,f,_.x,_.y)&&Ae(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function K0(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!Aa(s,r)&&Jh(s,n,n.next,r)&&nr(s,r)&&nr(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ir(n),ir(n.next),n=i=r),n=n.next}while(n!==i);return Di(n)}function j0(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ox(a,o)){let l=Kh(a,o);a=Di(a,a.next),l=Di(l,l.next),er(a,t,e,n,s,r,0),er(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Q0(i,t,e,n){let s=[],r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Zh(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(ax(c));for(s.sort(tx),r=0;r<s.length;r++)e=ex(s[r],e);return e}function tx(i,t){return i.x-t.x}function ex(i,t){let e=nx(i,t);if(!e)return t;let n=Kh(e,i);return Di(n,n.next),Di(e,e.next)}function nx(i,t){let e=t,n=-1/0,s,r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){let f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let o=s,l=s.x,c=s.y,h=1/0,d;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&is(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(d=Math.abs(a-e.y)/(r-e.x),nr(e,i)&&(d<h||d===h&&(e.x>s.x||e.x===s.x&&ix(s,e)))&&(s=e,h=d)),e=e.next;while(e!==o);return s}function ix(i,t){return Ae(i.prev,i,t.prev)<0&&Ae(t.next,i,i.next)<0}function sx(i,t,e,n){let s=i;do s.z===0&&(s.z=Il(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,rx(s)}function rx(i){let t,e,n,s,r,a,o,l,c=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(a>1);return i}function Il(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function ax(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function is(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function ox(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!lx(i,t)&&(nr(i,t)&&nr(t,i)&&cx(i,t)&&(Ae(i.prev,i,t.prev)||Ae(i,t.prev,t))||Aa(i,t)&&Ae(i.prev,i,i.next)>0&&Ae(t.prev,t,t.next)>0)}function Ae(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Aa(i,t){return i.x===t.x&&i.y===t.y}function Jh(i,t,e,n){let s=$r(Ae(i,t,e)),r=$r(Ae(i,t,n)),a=$r(Ae(e,n,i)),o=$r(Ae(e,n,t));return!!(s!==r&&a!==o||s===0&&qr(i,e,t)||r===0&&qr(i,n,t)||a===0&&qr(e,i,n)||o===0&&qr(e,t,n))}function qr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function $r(i){return i>0?1:i<0?-1:0}function lx(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Jh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function nr(i,t){return Ae(i.prev,i,i.next)<0?Ae(i,t,i.next)>=0&&Ae(i,i.prev,t)>=0:Ae(i,t,i.prev)<0||Ae(i,i.next,t)<0}function cx(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Kh(i,t){let e=new Pl(i.i,i.x,i.y),n=new Pl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function bh(i,t,e,n){let s=new Pl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ir(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Pl(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function hx(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Vn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Sh(t),wh(n,t);let a=t.length;e.forEach(Sh);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,wh(n,e[l]);let o=Y0.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Sh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function wh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Be=class i extends va{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var Ma=class i extends xe{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],h=[],d=t,f=(e-t)/s,u=new F,m=new Ct;for(let y=0;y<=s;y++){for(let p=0;p<=n;p++){let g=r+p/n*a;u.x=d*Math.cos(g),u.y=d*Math.sin(g),l.push(u.x,u.y,u.z),c.push(0,0,1),m.x=(u.x/e+1)/2,m.y=(u.y/e+1)/2,h.push(m.x,m.y)}d+=f}for(let y=0;y<s;y++){let p=y*(n+1);for(let g=0;g<n;g++){let v=g+p,M=v,_=v+n+1,P=v+n+2,E=v+1;o.push(M,_,E),o.push(_,P,E)}}this.setIndex(o),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(c,3)),this.setAttribute("uv",new qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},ys=class i extends xe{constructor(t=new Xn([new Ct(0,.5),new Ct(-.5,-.5),new Ct(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],a=[],o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new qt(s,3)),this.setAttribute("normal",new qt(r,3)),this.setAttribute("uv",new qt(a,2));function c(h){let d=s.length/3,f=h.extractPoints(e),u=f.shape,m=f.holes;Vn.isClockWise(u)===!1&&(u=u.reverse());for(let p=0,g=m.length;p<g;p++){let v=m[p];Vn.isClockWise(v)===!0&&(m[p]=v.reverse())}let y=Vn.triangulateShape(u,m);for(let p=0,g=m.length;p<g;p++){let v=m[p];u=u.concat(v)}for(let p=0,g=u.length;p<g;p++){let v=u[p];s.push(v.x,v.y,0),r.push(0,0,1),a.push(v.x,v.y)}for(let p=0,g=y.length;p<g;p++){let v=y[p],M=v[0]+d,_=v[1]+d,P=v[2]+d;n.push(M,_,P),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return ux(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let a=e[t.shapes[s]];n.push(a)}return new i(n,t.curveSegments)}};function ux(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var ze=class i extends xe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new F,f=new F,u=[],m=[],y=[],p=[];for(let g=0;g<=n;g++){let v=[],M=g/n,_=0;g===0&&a===0?_=.5/e:g===n&&l===Math.PI&&(_=-.5/e);for(let P=0;P<=e;P++){let E=P/e;d.x=-t*Math.cos(s+E*r)*Math.sin(a+M*o),d.y=t*Math.cos(a+M*o),d.z=t*Math.sin(s+E*r)*Math.sin(a+M*o),m.push(d.x,d.y,d.z),f.copy(d).normalize(),y.push(f.x,f.y,f.z),p.push(E+_,1-M),v.push(c++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<e;v++){let M=h[g][v+1],_=h[g][v],P=h[g+1][v],E=h[g+1][v+1];(g!==0||a>0)&&u.push(M,_,E),(g!==n-1||l<Math.PI)&&u.push(_,P,E)}this.setIndex(u),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(y,3)),this.setAttribute("uv",new qt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var pn=class i extends xe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],h=new F,d=new F,f=new F;for(let u=0;u<=n;u++)for(let m=0;m<=s;m++){let y=m/s*r,p=u/n*Math.PI*2;d.x=(t+e*Math.cos(p))*Math.cos(y),d.y=(t+e*Math.cos(p))*Math.sin(y),d.z=e*Math.sin(p),o.push(d.x,d.y,d.z),h.x=t*Math.cos(y),h.y=t*Math.sin(y),f.subVectors(d,h).normalize(),l.push(f.x,f.y,f.z),c.push(m/s),c.push(u/n)}for(let u=1;u<=n;u++)for(let m=1;m<=s;m++){let y=(s+1)*u+m-1,p=(s+1)*(u-1)+m-1,g=(s+1)*(u-1)+m,v=(s+1)*u+m;a.push(y,p,v),a.push(p,g,v)}this.setIndex(a),this.setAttribute("position",new qt(o,3)),this.setAttribute("normal",new qt(l,3)),this.setAttribute("uv",new qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var vs=class i extends xe{constructor(t=new ga(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new F,l=new F,c=new Ct,h=new F,d=[],f=[],u=[],m=[];y(),this.setIndex(m),this.setAttribute("position",new qt(d,3)),this.setAttribute("normal",new qt(f,3)),this.setAttribute("uv",new qt(u,2));function y(){for(let M=0;M<e;M++)p(M);p(r===!1?e:0),v(),g()}function p(M){h=t.getPointAt(M/e,h);let _=a.normals[M],P=a.binormals[M];for(let E=0;E<=s;E++){let C=E/s*Math.PI*2,T=Math.sin(C),b=-Math.cos(C);l.x=b*_.x+T*P.x,l.y=b*_.y+T*P.y,l.z=b*_.z+T*P.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function g(){for(let M=1;M<=e;M++)for(let _=1;_<=s;_++){let P=(s+1)*(M-1)+(_-1),E=(s+1)*M+(_-1),C=(s+1)*M+_,T=(s+1)*(M-1)+_;m.push(P,E,T),m.push(E,C,T)}}function v(){for(let M=0;M<=e;M++)for(let _=0;_<=s;_++)c.x=M/e,c.y=_/s,u.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new Cl[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Je=class extends Ii{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zh,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Yr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function dx(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ms=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ll=class extends Ms{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:bc,endingEnd:bc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Sc:r=t,o=2*e-n;break;case wc:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Sc:a=t,l=2*n-e;break;case wc:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,u=this._weightNext,m=(n-e)/(s-e),y=m*m,p=y*m,g=-f*p+2*f*y-f*m,v=(1+f)*p+(-1.5-2*f)*y+(-.5+f)*m+1,M=(-1-u)*p+(1.5+u)*y+.5*m,_=u*p-u*y;for(let P=0;P!==o;++P)r[P]=g*a[h+P]+v*a[c+P]+M*a[l+P]+_*a[d+P];return r}},Dl=class extends Ms{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),d=1-h;for(let f=0;f!==o;++f)r[f]=a[c+f]*d+a[l+f]*h;return r}},Ul=class extends Ms{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Mn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Yr(e,this.TimeBufferType),this.values=Yr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Yr(t.times,Array),values:Yr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ul(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Dl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ll(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ta:e=this.InterpolantFactoryMethodDiscrete;break;case al:e=this.InterpolantFactoryMethodLinear;break;case Ga:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ta;case this.InterpolantFactoryMethodLinear:return al;case this.InterpolantFactoryMethodSmooth:return Ga}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&dx(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ga,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*n,f=d-n,u=d+n;for(let m=0;m!==n;++m){let y=e[d+m];if(y!==e[f+m]||y!==e[u+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,f=a*n;for(let u=0;u!==n;++u)e[f+u]=e[d+u]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=al;var Ui=class extends Mn{constructor(t,e,n){super(t,e,n)}};Ui.prototype.ValueTypeName="bool";Ui.prototype.ValueBufferType=Array;Ui.prototype.DefaultInterpolation=ta;Ui.prototype.InterpolantFactoryMethodLinear=void 0;Ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Nl=class extends Mn{};Nl.prototype.ValueTypeName="color";var Fl=class extends Mn{};Fl.prototype.ValueTypeName="number";var Ol=class extends Ms{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)li.slerpFlat(r,0,a,c-o,a,c,l);return r}},ba=class extends Mn{InterpolantFactoryMethodLinear(t){return new Ol(this.times,this.values,this.getValueSize(),t)}};ba.prototype.ValueTypeName="quaternion";ba.prototype.InterpolantFactoryMethodSmooth=void 0;var Ni=class extends Mn{constructor(t,e,n){super(t,e,n)}};Ni.prototype.ValueTypeName="string";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=ta;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var Bl=class extends Mn{};Bl.prototype.ValueTypeName="vector";var zl=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=c.length;d<f;d+=2){let u=c[d],m=c[d+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null}}},fx=new zl,kl=class{constructor(t){this.manager=t!==void 0?t:fx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};kl.DEFAULT_MATERIAL_NAME="__DEFAULT";var Sa=class extends Ne{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},bs=class extends Sa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},vo=new ge,Th=new F,Eh=new F,Vl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.map=null,this.mapPass=null,this.matrix=new ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new js,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new Ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Th.setFromMatrixPosition(t.matrixWorld),e.position.copy(Th),Eh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Eh),e.updateMatrixWorld(),vo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Hl=class extends Vl{constructor(){super(new ha(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ss=class extends Sa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.shadow=new Hl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var tc="\\[\\]\\.:\\/",px=new RegExp("["+tc+"]","g"),ec="[^"+tc+"]",mx="[^"+tc.replace("\\.","")+"]",gx=/((?:WC+[\/:])*)/.source.replace("WC",ec),xx=/(WCOD+)?/.source.replace("WCOD",mx),_x=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ec),yx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ec),vx=new RegExp("^"+gx+xx+_x+yx+"$"),Mx=["material","materials","bones","map"],Gl=class{constructor(t,e,n){let s=n||we.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},we=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(px,"")}static parseTrackName(t){let e=vx.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Mx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};we.Composite=Gl;we.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};we.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};we.prototype.GetterByBindingType=[we.prototype._getValue_direct,we.prototype._getValue_array,we.prototype._getValue_arrayElement,we.prototype._getValue_toArray];we.prototype.SetterByBindingTypeAndVersioning=[[we.prototype._setValue_direct,we.prototype._setValue_direct_setNeedsUpdate,we.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[we.prototype._setValue_array,we.prototype._setValue_array_setNeedsUpdate,we.prototype._setValue_array_setMatrixWorldNeedsUpdate],[we.prototype._setValue_arrayElement,we.prototype._setValue_arrayElement_setNeedsUpdate,we.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[we.prototype._setValue_fromArray,we.prototype._setValue_fromArray_setNeedsUpdate,we.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var $x=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");function Qh(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new xe,c=0;for(let h=0;h<i.length;++h){let d=i[h],f=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let u in d.attributes){if(!n.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+u+'" attribute exists among all geometries, or in none of them.'),null;r[u]===void 0&&(r[u]=[]),r[u].push(d.attributes[u]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let u in d.morphAttributes){if(!s.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[u]===void 0&&(a[u]=[]),a[u].push(d.morphAttributes[u])}if(t){let u;if(e)u=d.index.count;else if(d.attributes.position!==void 0)u=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,u,h),c+=u}}if(e){let h=0,d=[];for(let f=0;f<i.length;++f){let u=i[f].index;for(let m=0;m<u.count;++m)d.push(u.getX(m)+h);h+=i[f].attributes.position.count}l.setIndex(d)}for(let h in r){let d=jh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<d;++f){let u=[];for(let y=0;y<a[h].length;++y)u.push(a[h][y][f]);let m=jh(u);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function jh(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new qe(a,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let d=l/e;for(let f=0,u=h.count;f<u;f++)for(let m=0;m<e;m++){let y=h.getComponent(f,m);o.setComponent(f+d,m,y)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}var Zt=en.smoothstep;function Ca(i){i=String(i).replace("#",""),i.length===3&&(i=i.split("").map(e=>e+e).join(""));let t=parseInt(i,16);return[t>>16&255,t>>8&255,t&255]}function bx(i,t,e){return"#"+[i,t,e].map(n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0")).join("")}function qn(i,t,e){let n=Ca(i),s=Ca(t);return bx(n[0]+(s[0]-n[0])*e,n[1]+(s[1]-n[1])*e,n[2]+(s[2]-n[2])*e)}function Es(i){let[t,e,n]=Ca(i).map(s=>(s/=255,s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4)));return .2126*t+.7152*e+.0722*n}var tu=(i,t)=>qn(i,"#ffffff",t);function Sx(i,t,e){let n=i.attributes.normal,s=new F,r=new F;for(let a=0;a<=e;a++){let o=a*(t+1),l=o+t;if(a===0||a===e){for(let c=o;c<=l;c++)n.setXYZ(c,0,a===0?1:-1,0);continue}s.fromBufferAttribute(n,o).add(r.fromBufferAttribute(n,l)).normalize(),n.setXYZ(o,s.x,s.y,s.z),n.setXYZ(l,s.x,s.y,s.z)}}function hn(i,t,e,n){let s=new ze(1,i,t),r=s.attributes.position,a=new F,o=new zt,l=n?new Float32Array(r.count*3):null;for(let c=0;c<r.count;c++)if(a.fromBufferAttribute(r,c).normalize(),n&&(n(a.x,a.y,a.z,o),o.toArray(l,c*3)),e){let h=e(a.x,a.y,a.z);r.setXYZ(c,a.x*h,a.y*h,a.z*h)}return n&&s.setAttribute("color",new qe(l,3)),e&&(s.computeVertexNormals(),Sx(s,i,t)),s}function nu(i,t){let e=[],n=Math.PI*(3-Math.sqrt(5));for(let s=0;s<i;s++){let r=1-2*(s+.5)/i,a=Math.sqrt(1-r*r),o=s*n+t+.3*Math.sin(s*7.3+t);e.push([a*Math.cos(o),r,a*Math.sin(o)])}return e}function hi(i,t,e){let n=nu(i,e);return(s,r,a)=>{let o=0;for(let l of n){let c=1-(s*l[0]+r*l[1]+a*l[2]);c<.25&&(o+=Math.exp(-c*t))}return Math.min(1.25,o)}}function As(i){let t=i?54:73,e=Math.PI*(3-Math.sqrt(5)),n=[];for(let r=0;r<t;r++){let a=1-2*(r+.5)/t,o=Math.sqrt(1-a*a),l=r*e+.13*Math.sin(r*5.1),c=new F(o*Math.cos(l),a,o*Math.sin(l)),h=new F(-Math.sin(l),0,Math.cos(l));n.push({center:c,east:h,north:new F().crossVectors(h,c),phase:r*e})}let s=new F;return(r,a,o)=>{s.set(r,a,o);let l=0,c=0;for(let{center:h,east:d,north:f,phase:u}of n){let m=1-s.dot(h);if(m>=.12)continue;l+=Math.exp(-m*(i?70:89));let y=Math.atan2(s.dot(f),s.dot(d))+u,p=Math.sqrt(2*m)-(.123+.036*Math.cos(y));c=Math.max(c,Math.exp(-p*p/.0017)*(.5+.5*Math.sin(y)))}return{r:1+.088*l-.021*c,v:.93+.07*Math.min(1,l)-.07*c}}}function bn(i,t,e,n,s,r,a=.18){let o=(i-e)/s,l=(t-n)/r;return 1-Zt(o*o+l*l,1-a,1+a)}function wx(i,t,e,n,s,r){let a=s-e,o=r-n,l=a*a+o*o,c=Math.max(0,Math.min(1,((i-e)*a+(t-n)*o)/l)),h=i-e-a*c,d=t-n-o*c;return Math.sqrt(h*h+d*d)}function eu(i,t,e,n){let s=(i.x-e.x)/n.x,r=(i.y-e.y)/n.y,a=(i.z-e.z)/n.z,o=t.x/n.x,l=t.y/n.y,c=t.z/n.z,h=o*o+l*l+c*c,d=s*o+r*l+a*c,f=d*d-h*(s*s+r*r+a*a-1);return f>=0?Math.max(0,(Math.sqrt(f)-d)/h):0}function Tx(i){let t=new Map,e=new ze(1,16,12),n=new ze(1,10,8),s={sphere:e,tiny:n,seg:r=>Math.max(8,Math.round(r*i/2)*2),std(r,a=.9,o=0){let l=r+"|"+a+"|"+o;return t.has(l)||t.set(l,new Je({color:r,roughness:a,metalness:o})),t.get(l)},flat(r,a=1){let o="flat|"+r+"|"+a;return t.has(o)||t.set(o,new Cn({color:r,transparent:a<1,opacity:a,depthWrite:a>=1})),t.get(o)},paint:new Je({vertexColors:!0,roughness:.9}),cloth:new Je({vertexColors:!0,roughness:.95,side:Ie}),add(r,a,o,l=0,c=0,h=0,d=1,f=d,u=d){let m=new fe(a,o);return m.position.set(l,c,h),m.scale.set(d,f,u),m.castShadow=!0,m.receiveShadow=!0,r.add(m),m},oval(r,a,o,l,c,h,d,f){return s.add(r,e,a,o,l,c,h,d,f)},dot(r,a,o,l,c,h,d,f){return s.add(r,n,a,o,l,c,h,d,f)},group(r,a=0,o=0,l=0,c){let h=new Re;return h.position.set(a,o,l),c&&(h.name=c),r.add(h),h}};return s}function Cs(i,t,e,n,s){let r=new Li(e.map(o=>new F(...o))),a=new fe(new vs(r,8,n,5,!1),s);return t.add(a),a}function or(i,t,e,n,s){let r=new Li(i.map(d=>new F(...d))),a=new vs(r,t,1,e,!1),o=a.attributes.position,l=a.attributes.normal,c=[],h=new zt;for(let d=0;d<=t;d++){let f=d/t,u=r.getPointAt(f);for(let m=0;m<=e;m++){let y=d*(e+1)+m,p=n(f,m/e);o.setXYZ(y,u.x+l.getX(y)*p,u.y+l.getY(y)*p,u.z+l.getZ(y)*p),s(f,m/e,h),h.toArray(c,y*3)}}return a.setAttribute("color",new qt(c,3)),a.computeVertexNormals(),a}function Rs(i,t,e={}){let n=i,s=n.colors,r=n.marks||{},a=n.species==="cat",o=n.coat==="fluffy",l=n.coat==="long",c=n.coat==="curly",h=o||l||c,d=n.legs==="short",f=Math.max(.4,Math.min(1,e.detail||1)),u=Tx(f),m=Z=>new zt(Z),y=u.seg,p=new Re;p.name="pet3d";let g=s.chest===s.body?tu(s.body,Es(s.body)>.7?0:.1):s.chest,v=s.face===s.main?tu(s.main,Es(s.main)>.7?0:.16):s.face,M=r.patchL&&s.ear===s.main?r.patchL:s.ear,_=r.patchR&&s.ear===s.main?r.patchR:s.ear,P=Z=>a?qn(Z,"#F4AEBB",.7):qn(Z,"#F3C2C9",.55),E=s.chest!==s.body?qn(s.body,s.chest,.5):s.body,C=n.face==="mask"?s.face:r.patchL||s.main,T=Es(C)<.12,b=Es(r.mask||v)<.12?"#F4E6EA":"#3A2A33",x=r.saddle||s.body,w={main:m(s.main),body:m(s.body),face:m(s.face),chest:m(g),paws:m(s.paws),muzzle:m(v),blush:m("#FF9DB2"),ruff:m(E),haunch:m(x)},I={};for(let Z of["stripes","spots","patchL","patchR","brows","mask","saddle"])r[Z]&&(I[Z]=m(r[Z]));let D=d?.24:a?.36:.38,z=a?.27:.3,q=a?.25:.27,G=(a?.37:.4)*(d?1.18:1),lt=D+.09,O=a?[.41,.335,.35]:[.4,.34,.355],Q=lt+q*.95+O[1]*.55,pt=G*.78,it=I.spots?nu(34,1.7).filter(Z=>Z[1]>-.4):[],ht=o?hi(90,110,.4):l?hi(70,90,1.1):null,yt=c?As(!1):null,W=(Z,et,$)=>{if(yt)return yt(Z,et,$).r;let ot=1;return ht&&(ot+=(o?.06:.04)*(ht(Z,et,$)-.45)),ot},nt=new zt,ft=s.body!==s.main,k=(Z,et,$)=>ft?Zt(et,-.34,-.18)*(1-Zt($,.5,.78)*(1-Zt(et,.55,.8))):1,tt=(Z,et,$,ot)=>{if(ot.copy(w.main).lerp(w.body,k(Z,et,$)),I.saddle&&ot.lerp(I.saddle,Zt(et,.12,.38)*(1-Zt($,.4,.72))),r.bodyPatch){let ut=(It,Kt,Wt,te)=>1-Zt(1-(Z*It+et*Kt+$*Wt),te*.75,te*1.25);I.patchR&&(ot.lerp(I.patchR,ut(.62,.55,.1,.22)),ot.lerp(I.patchR,ut(-.2,.62,-.62,.14))),I.patchL&&(ot.lerp(I.patchL,ut(-.78,-.05,-.25,.2)),ot.lerp(I.patchL,ut(.35,.3,-.75,.12)))}let ct=Zt($,.42,.72)*(1-Zt(et,.3,.62))+Zt(-et,.55,.85)*.9;if(ot.lerp(w.chest,Math.min(1,ct)),I.stripes){let ut=Zt(et,-.5,-.25)*(1-Zt($,.42,.62))*(1-Zt(-$,.72,.9)*(1-Zt(et,.35,.6))),It=$*3.1-.28*(1-et)*(1-et),Kt=1-Zt(Math.abs((It%1+1)%1-.5),.16,.24),Wt=(1-Zt(Math.abs(Z),.07,.12))*Zt(et,.8,.88)*(1-Zt($,.5,.7));ot.lerp(I.stripes,Math.max(Kt*ut,Wt))}if(I.spots){let ut=0;for(let It of it){let Kt=1-(Z*It[0]+et*It[1]+$*It[2]);ut=Math.max(ut,1-Zt(Kt,.008,.016))}ot.lerp(I.spots,ut*(1-Zt($,.5,.7)))}},st=hn(y(56),y(40),W,tt),mt=u.add(p,st,u.paint,0,lt,0,z,q,G);mt.name="body";let Et=[{c:mt.position.clone(),r:new F(z,q,G)}];if(l){let Z=hi(70,90,2.3),et=d?.2:.34,$=hn(y(56),y(36),(ot,ct,ut)=>{let It=1+.03*(Z(ot,ct,ut)-.45);return ct<0&&(It*=1+et*Math.pow(-ct,1.8)*(1+.1*Math.sin(Math.atan2(ut,ot)*11))),It},(ot,ct,ut,It)=>{It.copy(w.body),ft&&It.lerp(w.main,Zt(-ct,.3,.85)),It.lerp(w.chest,Zt(ut,.45,.8)*(1-Zt(ct,.2,.5))),It.multiplyScalar(.97)});u.add(p,$,u.paint,0,lt-.01,-.01,z*1.03,q*.98,G*1.01)}let Ut=[],St=c?As(!0):null;for(let Z of[-1,1])for(let et of[-1,1]){let $=u.group(p,Z*z*.58,D,et*G*.56);$.userData.hip=$.position.clone(),$.userData.phase=Z*et>0?0:Math.PI;let ot=et<0,ct=D/.38,ut=ot?w.haunch:w.body,It=ft?w.main:w.body,Kt=o||l?hi(14,30,Z+et*2):null,Wt=St?(Ee,ye,A)=>St(Ee,ye,A).r:Kt?(Ee,ye,A)=>1+.06*(Kt(Ee,ye,A)-.4):null,te=hn(y(28),y(20),Wt,(Ee,ye,A,V)=>{V.copy(ut),ot&&I.saddle&&V.lerp(w.body,Zt(-ye,.3,.9)*.6),ft&&V.lerp(w.main,Zt(-ye,-.45,.15))});u.add($,te,u.paint,0,-D*.12,0,ot?.125:.105,D*.42,ot?.135:.11);let De=s.paws!==(ft?s.main:s.body),ke=hn(y(18),y(14),null,(Ee,ye,A,V)=>{if(V.copy(It),De&&V.lerp(w.paws,Zt(-ye,.05,.35)),I.stripes&&!d){let J=1-Zt(Math.abs(((ye*1.6+.2)%1+1)%1-.5),.14,.22);V.lerp(I.stripes,J*Zt(ye,-.4,-.2)*(1-Zt(ye,.6,.8)))}});u.add($,ke,u.paint,0,-D*.6,0,.078*Math.max(.9,ct),D*.34,.082*Math.max(.9,ct));let sn=u.oval($,u.std(s.paws),0,.08-D,.03,.088,.075,.115);$.userData.paw=sn,Ut.push($),c&&u.add($,hn(y(20),y(14),(Ee,ye,A)=>St(Ee,ye,A).r,(Ee,ye,A,V)=>V.copy(w.body).multiplyScalar(St(Ee,ye,A).v)),u.paint,0,.14-D,0,.1,.07,.1)}let U=u.group(p,0,Q,pt,"head"),jt=a?.4:.383,Ft=a?.06:.04,$t=a?{short:109,medium:111,long:113}[n.muzzle]:{short:112,medium:116,long:119}[n.muzzle],Ot=(100-($t+2))/51,le=a?.6:.58,Gt=I.spots?[[100,64,4],[140,60,5],[124,72,3.5],[70,94,4],[170,90,4.5]].map(([Z,et,$])=>[(Z-120)/60,(100-et)/51,$/55]):[],R=a?(100-($t-4))/51:(100-($t+2))/51,S=a?[.63,.63]:[.52,.51],X=(Z,et,$,ot)=>{let ct=Z,ut=et,It=Zt($,-.3,.12);ot.copy(w.main),I.patchL&&ot.lerp(I.patchL,bn(ct,ut,-.5,.27,.64,.74,.22)),I.patchR&&ot.lerp(I.patchR,bn(ct,ut,.5,.27,.64,.74,.22));let Kt=0;if(n.face==="lower")Kt=Math.max(bn(ct,ut,0,-.59,a?.83:.8,.59),Zt(-ut,.78,.92));else if(n.face==="mask"){Kt=Math.max(bn(ct,ut,0,-.39,.97,.67),bn(ct,ut,-.38,.04,.27,.25),bn(ct,ut,.38,.04,.27,.25),Zt(-ut,.75,.9));let Wt=.133-.07*(1.06-ut)/.9;ut>.12&&(Kt*=Zt(Math.abs(ct),Wt-.03,Wt+.03))}else if(n.face==="hachiware"){let Wt=Math.max(-.25,.71-2.6*Math.abs(ct));Kt=1-Zt(ut-Wt,-.05,.05)}else if(n.face==="blaze"){let Wt=ut>.39?.085:.085+(.39-ut)*.62;Kt=(1-Zt(Math.abs(ct)-Wt,-.03,.03))*(1-Zt(ut,1,1.1)),Kt=Math.max(Kt,Zt(-ut,.8,.95))}if(Kt>0&&ot.lerp(w.face,Kt*It),I.stripes){let Wt=[[-.133,.86,-.1,.63],[0,.94,0,.67],[.133,.86,.1,.63],[-1,-.04,-.77,-.1],[-.97,-.24,-.77,-.24],[1,-.04,.77,-.1],[.97,-.24,.77,-.24]],te=0;for(let sn of Wt)te=Math.max(te,1-Zt(wx(ct,ut,...sn),.03,.05));ot.lerp(I.stripes,te*It);let De=1-Zt($,-.4,-.05),ke=Math.atan2(Z,-$)/.42;ot.lerp(I.stripes,De*(1-Zt(Math.abs((ke%1+1.5)%1-.5),.17,.26))*Zt(ut,-.45,-.15))}if(I.spots){let Wt=0;for(let[te,De,ke]of Gt)Wt=Math.max(Wt,bn(ct,ut,te,De,ke,ke*1.15,.3));ot.lerp(I.spots,Wt*It)}I.brows&&ot.lerp(I.brows,Math.max(bn(ct,ut,-jt,.35,.092,.078,.3),bn(ct,ut,jt,.35,.092,.078,.3))*It),I.mask&&ot.lerp(I.mask,.92*(1-Zt((ct/S[0])**2+((ut-R)/S[1])**2,.25,1.05))*It),ot.lerp(w.blush,.42*Math.max(bn(ct,ut,-le,Ot,.14,.1,.5),bn(ct,ut,le,Ot,.14,.1,.5))*Zt($,.2,.4))},rt=o||l?hi(80,105,2.1):null,dt=c?As(!1):null,at=(Z,et)=>Zt(et,.2,.6)*(1-Zt(Z,.4,.75)),Dt=(Z,et,$)=>dt?1+(dt(Z,et,$).r-1)*(1-at(et,$))*1.1:rt?1+.045*(rt(Z,et,$)-.45)*(1-at(et,$)):1,bt=hn(y(64),y(48),dt||rt?Dt:null,(Z,et,$,ot)=>{X(Z,et,$,ot),dt&&ot.multiplyScalar(1-(1-dt(Z,et,$).v)*(1-at(et,$)))});u.add(U,bt,u.paint,0,0,0,O[0],O[1],O[2]).name="skull",Et.push({c:new F(0,Q,pt),r:new F(...O),head:!0});let wt=(Z,et,$,ot=0)=>{let ct=new F(Z,et,$??Math.sqrt(Math.max(0,1-Z*Z-et*et))).normalize(),ut=new F(ct.x*O[0],ct.y*O[1],ct.z*O[2]),It=new F(ut.x/O[0]**2,ut.y/O[1]**2,ut.z/O[2]**2).normalize();return{p:ut.addScaledVector(It,-ot),n:It}},ee=[],gt=a?[.068,.076,.03]:[.06,.07,.03],Pt=Es(s.eye)>.06;for(let Z of[-1,1]){let{p:et,n:$}=wt(Z*jt,Ft,null,.012),ot=u.group(U,et.x,et.y,et.z);ot.quaternion.setFromUnitVectors(new F(0,0,1),$.clone().add(new F(0,0,.7)).normalize()),T&&u.oval(ot,u.std(qn(C,"#ffffff",.42)),0,0,-.004,gt[0]*1.24,gt[1]*1.22,gt[2]*.7),u.oval(ot,u.std(s.eye,.28),0,0,0,...gt),Pt&&u.oval(ot,u.std("#1E1620",.3),0,-.002,gt[2]*.72,a?.024:.029,a?.056:.04,.012),u.dot(ot,u.flat("#ffffff"),.022,.028,gt[2]*.92,.021,.021,.01),u.dot(ot,u.flat("#ffffff",.85),-.022,-.03,gt[2]*.85,.01,.01,.006),ee.push(ot)}let Nt=null;if(a){let Z=-O[1]*($t-100+6)/51,et=Math.sqrt(1-(Z/O[1])**2)*O[2]-.035;for(let Kt of[-1,1])u.oval(U,u.std(v),Kt*.052,Z,et,.068,.055,.06);u.oval(U,u.std(v),0,Z-.04,et-.01,.05,.035,.045);let $=-O[1]*($t-100)/51,ot=Math.sqrt(1-($/O[1])**2)*O[2]+.022,ct=u.add(U,new We(.034,.036,3),u.std(s.nose,.45),0,$+.004,ot);ct.rotation.set(-Math.PI/2+.25,0,Math.PI),ct.scale.set(1,1,.55);let ut=u.std(b,.6);Cs(u,U,[[0,$-.014,ot-.002],[0,$-.03,ot+.004]],.005,ut);for(let Kt of[-1,1])Cs(u,U,[[0,$-.03,ot+.004],[Kt*.02,$-.045,ot+.006],[Kt*.045,$-.033,ot+.002]],.005,ut);let It=Es(s.main)<.2?u.flat("#ffffff",.65):u.flat("#3C2837",.45);for(let Kt of[-1,1])for(let Wt of[-1,0,1])Cs(u,U,[[Kt*.07,Z+Wt*.012,et+.04],[Kt*.2,Z+Wt*.03+.006,et+.005],[Kt*.3,Z+Wt*.05,et-.05]],.0035,It);Nt=u.oval(U,u.std("#F38BA0",.5),0,Z-.055,et+.03,.026,.014,.03),Nt.rotation.x=.45,Nt.visible=!1}else{let Z={short:[.17,.115,.12],medium:[.18,.125,.16],long:[.185,.13,.21]}[n.muzzle],et=-O[1]*{short:.3,medium:.34,long:.38}[n.muzzle],$=Math.sqrt(1-(et/O[1])**2)*O[2]+{short:.055,medium:.095,long:.145}[n.muzzle]-Z[2],ot=hn(y(32),y(24),null,(Wt,te,De,ke)=>{ke.copy(w.muzzle),I.mask&&ke.lerp(I.mask,.9*Zt(De,-.4,.35))});u.add(U,ot,u.paint,0,et,$,...Z).name="muzzle";let ct=(Wt,te,De)=>[Wt*Z[0],et+te*Z[1],$+Math.sqrt(Math.max(0,1-Wt*Wt-te*te))*Z[2]+De],ut=ct(0,.5,-.01),It=n.muzzle==="short"?.9:1;u.oval(U,u.std(s.nose,.35),ut[0],ut[1],ut[2],.062*It,.043*It,.042*It),u.dot(U,u.flat("#ffffff",.55),-.018*It,ut[1]+.018,ut[2]+.03,.012,.007,.005);let Kt=u.std(b,.6);Cs(u,U,[ct(0,.18,.002),ct(0,-.08,.002)],.0055,Kt);for(let Wt of[-1,1])Cs(u,U,[ct(0,-.08,.002),ct(Wt*.2,-.24,.002),ct(Wt*.42,-.06,.002)],.0055,Kt);Nt=u.oval(U,u.std("#F38BA0",.5),0,et-Z[1]*.72,$+Z[2]*.62,.042,.022,.05),Nt.rotation.x=.45,Nt.visible=!1}let Yt=[],Rt=c?As(!0):null,se=o||l?hi(18,30,3.3):null,Qt=[[1,0],[.94,.2],[.74,.45],[.46,.72],[.16,.94],[.01,1]],ce=a||n.ear==="small"?Qt:[[.67,0],[.97,.17],[1,.32],[.85,.52],[.54,.78],[.15,.96],[.005,1]],B=(Z,et,$,ot,ct=.55)=>{let ut=ce[0][0],It=[[ut*.92,-.6],[ut*1.02,-.28],...ce],Kt=new ya(It.map(([te,De])=>new Ct(te*et,De*$)),22),Wt=u.add(Z,Kt,u.std(ot),0,0,0);Wt.scale.z=ct,u.oval(Z,u.std(P(ot)),0,$*.4,et*ct*.52,et*.5,$*.32,et*.1)};for(let Z of[-1,1]){let et=Z<0?M:_,$,ot,ct=0,ut=0,It=0,Kt=!1,Wt=n.ear;if(Wt==="pointy"||Wt==="big"||Wt==="small"){let te=a?{pointy:[.16,.25,.58,.72,.1,.3],big:[.175,.31,.6,.7,.06,.36],small:[.13,.17,.55,.76,.12,.24]}[Wt]:{pointy:[.15,.27,.56,.74,.06,.3],big:[.175,.37,.6,.7,.02,.46],small:[.105,.16,.5,.8,.12,.2]}[Wt];$=wt(Z*te[2],te[3],te[4],Wt==="small"&&h?0:.045),ot=u.group(U,$.p.x,$.p.y,$.p.z),It=-Z*te[5],ut=Z*.28,B(ot,te[0],te[1],et)}else if(Wt==="semi"){$=wt(Z*.6,.72,.04,.04),ot=u.group(U,$.p.x,$.p.y,$.p.z),It=-Z*.3,ut=Z*.2,B(ot,.13,.16,et);let te=u.group(ot,0,.13,.01);te.rotation.x=2.05,u.oval(te,u.std(et),0,.06,.012,.105,.075,.028)}else if(Wt==="fold")$=wt(Z*.45,.84,.25,.01),ot=u.group(U,$.p.x,$.p.y,$.p.z),ct=1.2,It=-Z*.25,u.oval(ot,u.std(et),0,.035,0,.1,.065,.035);else{let te=Wt==="long";$=wt(Z*.9,.44,-.02,.03),ot=u.group(U,$.p.x,$.p.y,$.p.z),It=Z*.16,Kt=!0;let De=te?h?[.115,.27,.15]:[.09,.26,.13]:[.085,.19,.125],ke=Rt?hn(y(28),y(22),(sn,Ee,ye)=>Rt(sn,Ee,ye).r,(sn,Ee,ye,A)=>A.set(et).multiplyScalar(Rt(sn,Ee,ye).v)):se&&te?hn(y(24),y(20),(sn,Ee,ye)=>1+.07*(se(sn,Ee,ye)-.4),(sn,Ee,ye,A)=>A.set(et)):null;ke?u.add(ot,ke,u.paint,Z*.035,-(te?.23:.16),0,...De):u.oval(ot,u.std(et),Z*.03,-(te?.23:.16),0,...De)}ot.rotation.set(ct,ut,It),Yt.push({g:ot,rx:ct,ry:ut,rz:It,floppy:Kt})}if(h){let et=n.ear==="small"&&o?[.45,.27,.33]:a?[.34,.19,.27]:[.37,.21,.29],$=new F(0,Q-O[1]*.78,pt-O[2]*.35),ot=hi(110,120,.9),ct=c?As(!1):null,ut=hn(y(64),y(44),(It,Kt,Wt)=>ct?ct(It,Kt,Wt).r:1+.075*(ot(It,Kt,Wt)-.45),(It,Kt,Wt,te)=>{te.copy(w.body).lerp(ft?w.chest:w.ruff,Zt(Wt,-.2,.3)),ct&&te.multiplyScalar(ct(It,Kt,Wt).v)});u.add(p,ut,u.paint,$.x,$.y,$.z,...et).name="ruff",Et.push({c:$,r:new F(...et).multiplyScalar(1.05)})}let vt=u.group(p,0,lt+q*.3,-G*.9,"tail"),j=m(s.tail),L=s.tailTip?m(s.tailTip):null,N=(Z,et)=>L?Zt(Z,et,et+.08):0,Y=(Z,et)=>($,ot)=>Z($)*(1+et*Math.sin(ot*Math.PI*2*5+$*23)*Math.sin($*31+ot*9)),xt=Z=>I.stripes?1-Zt(Math.abs(Z/.15%1-.5),.16,.24):0,_t=(Z,et)=>($,ot,ct)=>{ct.copy(j),et&&I.stripes&&ct.lerp(I.stripes,xt($)*(1-Zt($,.86,.9))*Zt($,.08,.12)),L&&ct.lerp(L,N($,Z))},Bt=Z=>u.add(vt,Z,u.paint),At=n.tail,Jt=6.5;if(At==="curl"){let Z=[[0,0,0],[-.08,.12,-.1],[-.065,.27,-.14],[.044,.35,-.13],[.17,.32,-.11],[.21,.22,-.11],[.16,.17,-.14],[.12,.19,-.156]],et=o?1.3:1;Bt(or(Z,y(42),y(14),($,ot)=>et*(.062+.05*Math.pow(Math.sin(Math.PI*$),.55)-.06*Zt($,.79,1))*(o?1+.1*Math.sin(ot*6.28*5+$*20):1),_t(.78,!1))),Jt=7.5}else if(At==="plume"){if(c){Bt(or([[0,0,0],[0,.1,-.06],[0,.2,-.08]],10,8,()=>.034,_t(2,!1)));let Z=As(!1);u.add(vt,hn(y(32),y(24),(et,$,ot)=>Z(et,$,ot).r,(et,$,ot,ct)=>ct.copy(L||j).multiplyScalar(Z(et,$,ot).v)),u.paint,0,.26,-.09,.11,.11,.11)}else{let Z=o?1.2:1;Bt(or([[0,0,0],[0,.17,-.07],[0,.3,.01],[0,.31,.14],[0,.24,.25]],y(32),y(16),Y($=>Z*(.07+.085*Math.pow(Math.sin(Math.PI*Math.min(1,$*1.05)),.7))*(1-.85*Zt($,.8,1)),.12),_t(.7,!1)))}Jt=5.5}else if(At==="straight"){let Z=o||l?.068:.052;Bt(or([[0,0,0],[0,.08,-.12],[0,.2,-.2],[0,.33,-.24]],y(20),y(12),et=>Z*(1-.55*Zt(et,.3,1))*(et>.94?Math.sqrt(Math.max(.04,1-((et-.94)/.06)**2)):1),_t(.78,!0)))}else if(At==="stub"){let Z=o?hi(12,24,4.4):null;u.add(vt,hn(y(20),y(16),Z?(et,$,ot)=>1+.12*(Z(et,$,ot)-.4):null,(et,$,ot,ct)=>ct.copy(j)),u.paint,0,.03,-.02,.075,.07,.075),Jt=9}else{let Z=At==="fluffy",et=[[0,0,0],[0,.02,-.15],[0,.12,-.27],[0,.3,-.31],[0,.45,-.25],[0,.5,-.17]],$=Z?.085:.044,ot=ct=>$*(Z?1+.25*Math.sin(Math.PI*ct):1)*(ct>.9?Math.sqrt(Math.max(.03,1-((ct-.9)/.1)**2)):1);Bt(or(et,y(40),y(14),Z?Y(ot,.1):ot,_t(.82,!0))),Jt=3.6}return t&&Ax(u,p,t,Et,{headY:Q,headZ:pt,HR:O,bodyY:lt,BH:q,BW:z,BL:G}),Ex(p,new Set([p,U,vt,...ee,...Yt.map(Z=>Z.g),...Ut]),new Set([...Ut.map(Z=>Z.userData.paw),Nt].filter(Boolean))),p.userData.legs=Ut,p.userData.tail=vt,p.userData.height=D,p.userData.rig={head:U,headY:Q,ears:Yt,eyes:ee,tongue:Nt,wag:Jt,seed:Ca(s.main)[0]%17/10},p.userData.size={H:D,BW:z,BH:q,BL:G,HR:O,headY:Q,headZ:pt,top:Q+O[1]+.2},p}function Ex(i,t,e){i.updateMatrixWorld(!0);let n=new ge,s=new ge,r=new Set;for(let l of t){s.copy(l.matrixWorld).invert();let c=new Map,h=[],d=f=>{for(let u of f.children)if(!(t.has(u)||e.has(u))){if(u.isMesh){let m=u.geometry.clone();r.add(u.geometry),m.applyMatrix4(n.multiplyMatrices(s,u.matrixWorld)),m.deleteAttribute("uv");let y=u.material.uuid+(m.attributes.color?"|c":"");c.has(y)||c.set(y,{mat:u.material,geos:[]}),c.get(y).geos.push(m.index?m:m.setIndex([...Array(m.attributes.position.count).keys()])),h.push(u)}d(u)}};d(l);for(let f of h)f.removeFromParent();for(let{mat:f,geos:u}of c.values()){let m=u.length===1?u[0]:Qh(u,!1);u.length>1&&u.forEach(p=>p.dispose());let y=new fe(m,f);y.castShadow=y.receiveShadow=!0,l.add(y)}}let a=[];i.traverse(l=>{l!==i&&!l.isMesh&&!t.has(l)&&l.children.length===0&&a.push(l)}),a.forEach(l=>l.removeFromParent());let o=new Set;i.traverse(l=>{l.geometry&&o.add(l.geometry)});for(let l of r)o.has(l)||l.dispose()}function Ax(i,t,e,n,s){let r=new F(0,(s.headY-s.HR[1]*.7+s.bodyY+s.BH*.6)/2,s.headZ*.7),a=n.filter(x=>x.head),o=n.filter(x=>!x.head),l=(x,w)=>new F(Math.sin(x)*Math.cos(w),Math.sin(w),Math.cos(x)*Math.cos(w)),c=(x,w)=>x.reduce((I,D)=>Math.max(I,eu(r,w,D.c,D.r)),0),h=x=>{let w=-1.35,I=1.35;for(let D=0;D<26;D++){let z=(w+I)/2,q=l(x,z);c(a,q)>c(o,q)?I=z:w=z}return(w+I)/2},d=72,f=Array.from({length:d+1},(x,w)=>h(w/d*Math.PI*2)),u=x=>{let w=(x/(Math.PI*2)%1+1)%1*d,I=Math.floor(w),D=w-I;return f[I]*(1-D)+f[(I+1)%(d+1)]*D},m=(x,w,I)=>{let D=u(x)-w,z=l(x,D);return r.clone().addScaledVector(z,Math.max(c(a,z),c(o,z))+I)},y=x=>Math.max(0,1-Math.abs(Math.atan2(Math.sin(x),Math.cos(x)))/1.4),p=i.group(t,0,0,0,"neck-wear"),g=(x,w,I,D,z)=>{let q=[],G=[],lt=[],O=new zt,Q=w+(z?0:1);for(let ht=0;ht<=x;ht++)for(let yt=0;yt<Q;yt++)if(I(ht/x,yt/w).toArray(q,q.length),D(ht/x,yt/w,O),lt.push(O.r,O.g,O.b),ht&&(z||yt<Q-1)){let W=(ht-1)*Q+yt,nt=(ht-1)*Q+(yt+1)%Q;G.push(W,W+Q,nt,nt,W+Q,nt+Q)}let pt=new xe;pt.setAttribute("position",new qt(q,3)),pt.setAttribute("color",new qt(lt,3)),pt.setIndex(G),pt.computeVertexNormals();let it=new fe(pt,i.cloth);return it.castShadow=it.receiveShadow=!0,p.add(it),it},v=e.p||{},M=new zt(v.c&&v.c!=="rainbow"?v.c:"#ffffff"),_=(x,w,I)=>w.copy(x).multiplyScalar(I),P=(x,w,I)=>g(5,96,(D,z)=>{let q=z*Math.PI*2,G=x[0]+x[1]*Math.pow(y(q),1.25);return m(q,-.03+D*G,w+.012*Math.sin(D*Math.PI))},I,!0),E=(x,w,I)=>{let D=m(x,w,I),z=m(x,w,I+.05);return{p:D,n:z.sub(D).normalize()}},C=(x,w,I,D)=>{let{p:z,n:q}=E(w,I,D);return x.position.copy(z),x.quaternion.setFromUnitVectors(new F(0,0,1),q),x},T=["#F27B7B","#F5C562","#8CC26A","#6FABE3","#B8A6EC"].map(x=>new zt(x)),b=x=>{let w=(x/(Math.PI*2)%1+1)%1*T.length,I=Math.floor(w);return T[I].clone().lerp(T[(I+1)%T.length],w-I)};if(e.kind==="scarf"){let x=v.tri?v.tri.map(D=>new zt(D)):null;P([.2,.16],.03,(D,z,q)=>{let G=D<.08||D>.92?.84:1;_(x?x[Math.floor(z*27)%3]:M,q,G)});let w=.95,I=x?hn(16,12,null,(D,z,q,G)=>G.copy(x[Math.floor((z+1)*1.6)%3])):i.sphere;C(i.add(p,I,x?i.paint:i.std(v.c,.93),0,0,0,.05,.048,.065),w,.1,.045),[[.04,.6],[.3,.46]].forEach(([D,z],q)=>{let G=O=>(.3+.08*Math.sin(O*Math.PI))*(1-.35*O**3);g(12,4,(O,Q)=>m(w+D*O+(Q-.5)*G(O),.1+O*z,.05+.012*Math.sin(Q*Math.PI)+.012*q),(O,Q,pt)=>{let it=Q===0||Q===1?.86:1;_(x?x[[1,2,0][Math.floor(O*7.99)%3]]:M,pt,it)},!1);let lt=x?i.std(v.tri[0]):i.std(qn(v.c,"#2A1E2A",.3));for(let O of[-.33,0,.33]){let Q=w+D+O*G(1),pt=m(Q,.1+z,.052+.012*q),it=m(Q,.1+z+.09,.05+.012*q);Cs(i,p,[pt.toArray(),it.toArray()],.008,lt)}})}else if(e.kind==="bandana"){P([.06,.02],.022,(D,z,q)=>_(M,q,D>.9?.86:1));let x=new zt("#ffffff"),w=v.check,I=g(10,20,(D,z)=>{let q=z*2-1,G=1.05*(1-D*.97);return m(q*G,.05+D*.62*(1-.12*q*q),.03+.006*D)},(D,z,q)=>{if(w){let G=Math.floor(z*10)%2,lt=Math.floor(D*6)%2;q.copy(x).lerp(M,.55*(G+lt))}else q.copy(M);D>.96&&q.multiplyScalar(.86)},!1);if(I.name="bandana",v.d)for(let[D,z]of[[-.45,.16],[0,.3],[.45,.16],[0,.62]]){let q=i.dot(p,i.std(v.d),0,0,0,.017,.017,.004);C(q,D*1.05*(1-z*.97),.05+z*.62*(1-.12*D*D),.036)}}else if(e.kind==="bell"){P([.07,.015],.022,(w,I,D)=>{v.c==="rainbow"?D.copy(b(I*Math.PI*2)):D.copy(M),(w<.1||w>.9)&&D.multiplyScalar(.82)});let x=i.group(p);C(x,0,.21,.062),i.oval(x,i.std(v.b,.32,.45),0,0,0,.062,.062,.062),i.oval(x,i.std(qn(v.b,"#2A1E2A",.42),.5),0,-.014,.054,.034,.005,.012),i.oval(x,i.std(qn(v.b,"#2A1E2A",.42),.5),0,-.031,.049,.008,.014,.01),i.dot(x,i.flat("#ffffff",.75),-.02,.024,.054,.013,.013,.006)}else if(e.kind==="bowtie"){let x=i.group(p);C(x,0,.08,.025);let w=i.std(v.c,.7),I=i.std(qn(v.c,"#ffffff",.18),.7);for(let D of[-1,1]){let z=i.add(x,new We(.055,.085,4),w,D*.045,0,.01);z.rotation.z=D*Math.PI/2,z.scale.set(1,1,.45)}i.oval(x,I,0,0,.018,.026,.026,.02)}else if(e.kind==="pearls"){let x=i.std("#FBF7F2",.22,.1);for(let w=0;w<26;w++){let I=w/26*Math.PI*2;C(i.dot(p,x,0,0,0,.021,.021,.021),I,.06+.03*y(I),.02)}C(i.oval(p,i.std("#F7C9D6",.3),0,0,0,.028,.028,.022),0,.18,.028)}else if(e.kind==="lei"){let x=["#F7A9C4","#FFD27A","#FFFFFF","#C9B6F2","#F28C8C"];for(let w=0;w<14;w++){let I=w/14*Math.PI*2,D=i.group(p);C(D,I,.06+.03*y(I),.022);let z=i.std(x[w%x.length],.8);for(let q=0;q<5;q++){let G=q/5*Math.PI*2;i.dot(D,z,Math.cos(G)*.026,Math.sin(G)*.026,0,.022,.022,.012)}i.dot(D,i.std("#F5C04A",.7),0,0,.01,.012,.012,.008)}}else if(e.kind==="ukiwa"){let x=s.bodyY+s.BH*.38,w=new F(0,x,s.BL*.18),I=.085,D=[];for(let it=0;it<48;it++){let ht=it/48*Math.PI*2,yt=new F(Math.sin(ht),0,Math.cos(ht)),W=n.reduce((nt,ft)=>Math.max(nt,eu(w,yt,ft.c,ft.r)),0);D.push(w.clone().addScaledVector(yt,W+I*.8))}let z=new Li(D,!0),q=new vs(z,96,I,14,!0),G=q.attributes.position,lt=[],O=new zt,Q=new zt("#F27B7B"),pt=new zt("#FFFFFF");for(let it=0;it<G.count;it++){let ht=Math.atan2(G.getX(it),G.getZ(it)-w.z)+Math.PI/4;O.copy(Math.floor((ht/(Math.PI/2)%4+4)%4)%2?pt:Q),O.toArray(lt,it*3)}q.setAttribute("color",new qt(lt,3)),i.add(p,q,i.paint)}}function Is(i,t,e,n={}){let s=i.userData,r=s.rig;if(!r)return;let a=!!n.reduced,o=a?0:t,l=n.phase??o*9,c=Math.sin(o*(e?r.wag*1.25:r.wag*.62));s.tail.rotation.y=c*(e?.35:.24),s.tail.rotation.x=e?.08*Math.sin(o*9.5):0;let h=a?0:Math.max(0,1-Math.abs((o+r.seed)%4.3-3.6)/.11);r.eyes.forEach(f=>{f.scale.y=1-.92*h});let d=Math.sin(l*3.7);r.head.position.y=r.headY+(e?.014*d:.006*Math.sin(o*1.6)),r.head.rotation.x=e?.03*Math.sin(l*3.7+.6):.015*Math.sin(o*1.65),r.head.rotation.z=e?0:.035*Math.sin(o*1.34),r.ears.forEach((f,u)=>{let m=u?1:-1;f.g.rotation.z=f.rz+m*(f.floppy?e?.16:.035:.03)*Math.sin(l*3.7+u*.5),f.g.rotation.x=f.rx+(f.floppy&&e?.14*Math.sin(l*3.7):0)}),r.tongue&&(r.tongue.visible=!!e),n.legs!==!1&&Cx(i,l,e,!!n.airborne)}function Cx(i,t,e,n){let s=i.rotation.x,r=i.rotation.z,a=i.scale.y,o=Math.cos(s),l=Math.sin(s),c=Math.cos(r),h=Math.sin(r);for(let d of i.userData.legs){let{hip:f,paw:u}=d.userData,m=t*1.85+d.userData.phase,y=n?f.z>0?-.64:.74:e?.52*Math.sin(m):0;if(d.position.copy(f),d.rotation.x=y,u.rotation.x=n?-.35*y:-y,n)continue;let p=e?Math.max(0,-Math.cos(m))**2*f.y*.23:0,g=Math.cos(y),v=Math.sin(y),M=f.y+u.position.y*g-u.position.z*v-u.scale.y,_=f.z+u.position.y*v+u.position.z*g,P=f.x*h+M*c,C=-(i.position.y+a*(o*P-l*_))/a+p;d.position.x+=o*h*C,d.position.y+=o*c*C,d.position.z-=l*C}}function Ps(i){let t=new Set;i.traverse(e=>{e.geometry&&!t.has(e.geometry)&&(t.add(e.geometry),e.geometry.dispose());let n=Array.isArray(e.material)?e.material:e.material?[e.material]:[];for(let s of n)t.has(s)||(t.add(s),s.dispose())}),i.removeFromParent()}var Pe=Object.freeze({run:4.8,height:2.15,width:1.9,entryTolerance:.68}),Ra=Math.atan2(Pe.height,Pe.run);function Ls(i){return Math.max(0,1-Math.abs(i)/Pe.run)*Pe.height}function iu(i){let t=Math.max(0,Math.min(1,i/Pe.height)),e=.2,n=t-e/2;return t<e&&(n=t*t/(2*e)),t>1-e&&(n=1-e-(1-t)**2/(2*e)),Pe.height*.85*n/(1-e)}function su(i){let t=Math.min(1,Math.abs(i)/.85,Math.max(0,Pe.run-Math.abs(i))/.85);return Math.sign(i)*Ra*t}function ru(i,t){let{run:e,width:n}=Pe,s=.12;for(let r of[1,-1]){let a=r*Ra;for(let[o,l,c]of[[0,e-1.35,"#4b8f95"],[e-1.35,e,"#edc65e"]]){let h=(o+l)/2,d=t(n,s,(l-o)/Math.cos(Ra),c,0,Ls(h)-s*Math.cos(Ra)/2,r*h-s*Math.sin(a)/2,i);d.name="a-frame-panel",d.rotation.x=a,d.castShadow=!0}for(let o of[.85,1.65,2.45,3.25,4.05]){let l=t(n-.12,.032,.078,o>e-1.35?"#d4aa48":"#78a9a2",0,Ls(o)+.013,r*o,i);l.rotation.x=a}}for(let r of[-1,1])t(.075,.09,e,"#677e78",r*(n/2-.1),.86,0,i)}var _e=Object.freeze({length:8,width:1.2,thickness:.12,pivotHeight:.95,angle:Math.asin(.235),speed:4.2,stopFrom:-.7,stopTo:1,hold:.35,tipDuration:.85}),au=()=>_e.length/2*Math.cos(_e.angle);function Ia(i,t){return Math.max(0,_e.pivotHeight+i*Math.tan(t)+_e.thickness/(2*Math.cos(t)))}function ou(i){let t=Math.max(0,Math.min(1,i));return _e.angle*(1-2*t*t*(3-2*t))}var lr=()=>-.035,Rx=()=>.015,Ix=()=>.016;function Pa(i,t){if(!t)return i.layout.theme==="forest"?Ix:Rx;let e=i.player,n=i.layout.obstacles.find(r=>(r.type==="a-frame"||r.type==="seesaw")&&Math.abs(e.s-r.s)<Pe.run+1);if(!n||Math.abs(e.x-n.lane*2)>.68)return lr;let s=e.s-n.s;if(n.type==="a-frame"&&i.rampPass?.onBoard!==!1&&Math.abs(s)<Pe.run+1)return r=>Math.abs(s+r)<=Pe.run?Ls(s+r):lr();if(n.type==="seesaw"&&Math.abs(s)<_e.length/2+1){let{angle:r,phase:a}=i.seesaws.get(n.id);if(a==="missed"||Math.abs(e.x-n.lane*2)>=.48)return lr;let o=_e.length/2*Math.cos(r);return l=>Math.abs(s+l)<=o?Ia(s+l,r):lr()}return lr}function La(i,t,e,n,s){let r=i.rotation.x,a=i.rotation.z,o=i.scale.y,l=Math.cos(r),c=Math.sin(r),h=Math.cos(a),d=Math.sin(a);for(let f of i.userData.legs){let{hip:u,paw:m}=f.userData,y=t*1.85+f.userData.phase,p=n?u.z>0?-.64:.74:e?.52*Math.sin(y):0;if(f.position.copy(u),f.rotation.x=p,m.rotation.x=n?-.35*p:-p,n)continue;let g=e?Math.max(0,-Math.cos(y))**2*u.y*.23:0,v=Math.cos(p),M=Math.sin(p),_=u.y+m.position.y*v-m.position.z*M-m.scale.y,P=u.z+m.position.y*M+m.position.z*v,E=u.x*d+_*h,C=o*(c*E+l*P),T=i.position.y+o*(l*E-c*P),b=(s(C)-T)/o+g;f.position.x+=l*d*b,f.position.y+=l*h*b,f.position.z-=c*b}}var Da=[{id:0,start:90,direction:"right"},{id:1,start:185,direction:"left"},{id:2,start:280,direction:"left"},{id:3,start:385,direction:"right"}].map(i=>({...i,radius:10,length:Math.PI*5,end:i.start+Math.PI*5}));function ui(i,t=0){return cr(Da,i,t)}function cr(i,t,e=0){let n=0,s=0,r=0,a=0;for(let o of i){let l=Math.min(t,o.start)-a;if(n+=Math.sin(r)*l,s-=Math.cos(r)*l,t<=o.start)return nc(n,s,r,e);let c=Math.min(t-o.start,o.length),h=o.direction==="right"?1:-1,d=r+h*c/o.radius;if(n+=o.radius/h*(Math.cos(r)-Math.cos(d)),s+=o.radius/h*(Math.sin(r)-Math.sin(d)),r=d,a=o.end,t<=o.end)return nc(n,s,r,e)}return n+=Math.sin(r)*(t-a),s-=Math.cos(r)*(t-a),nc(n,s,r,e)}function nc(i,t,e,n){return{x:i+Math.cos(e)*n,z:t+Math.sin(e)*n,heading:e}}var $n=(i,t=0,e=0,n=Da)=>n.find(s=>i>=s.start-t&&i<=s.end+e);var Px=[{distance:-2.1,height:1.7},{distance:0,height:2.12},{distance:2.1,height:1.7}];function Ua(i,t){for(let{distance:e,height:n}of Px)i.push({id:i.length,s:t.s+e,lane:t.lane,y:n,jumpLog:t.id})}function lu(){let t=[[72,"left",18,52],[142,"right",20,88],[231,"left",19,78],[298,"right",19,76],[389,"left",18,68],[452,"right",19,48]].map(([s,r,a,o],l)=>{let c=a*o*Math.PI/180;return{id:l,start:s,direction:r,radius:a,length:c,end:s+c}}),e=[[35,0],[105,-1],[195,1],[273,0],[349,-1],[425,1],[492,0]].map(([s,r],a)=>({id:a,s,lane:r,type:"log"})),n=[];for(let s=7;s<505;s+=2.15){let r=e.find(o=>Math.abs(s-o.s)<13);if(r&&Math.abs(s-r.s)<=4.8)continue;let a=$n(s,20,4,t)?0:r?.lane??0;n.push({id:n.length,s,lane:a,y:.65})}for(let s of e)Ua(n,s);return n.sort((s,r)=>s.s-r.s),{theme:"forest",length:510,turns:t,obstacles:e,treats:n,point:(s,r=0)=>cr(t,s,r)}}var ic=472,hr=[[82,"right",32,36],[180,"left",35,62],[288,"left",34,26],[388,"right",32,52]].map(([i,t,e,n],s)=>{let r=e*n*Math.PI/180;return{id:s,start:i,direction:t,radius:e,length:r,end:i+r}});function cu(){let i=[[38,0,-1],[138,1,-1],[244,-1,1],[344,1,-1],[440,-1,1]].map(([r,a,o],l)=>({id:l,s:r,lane:a,snackLane:o,type:"log"})),t=i.map((r,a)=>({lane:r.lane,from:a?hr[a-1].end+6:0,to:hr[a]?hr[a].start-20-6:ic})),e=i.map(({s:r,snackLane:a})=>({s:r,lane:a,halfLength:4.8,halfWidth:.87})),n=[];function s(r,a){n.push({id:n.length,s:r,lane:a,y:.65})}for(let r=7;r<ic-6;r+=2.15){if(i.some(o=>Math.abs(r-o.s)<=8.5))continue;let a=t.find(o=>r>=o.from&&r<=o.to);t.some(o=>o.lane!==0&&(Math.abs(r-o.from)<1.6||Math.abs(r-o.to)<1.6))||s(r,a?.lane??0)}for(let r of i){Ua(n,r);for(let a=-6;a<=6;a++)s(r.s+a*1.3,r.snackLane)}return n.sort((r,a)=>r.s-a.s),{theme:"beach",length:ic,turns:hr,point:(r,a=0)=>cr(hr,r,a),sand:e,obstacles:i,treats:n}}function hu(i,t,e){return i.some(n=>{let s=(t-n.s)/n.halfLength,r=(e-n.lane*2)/n.halfWidth;return s*s+r*r<1})}var ie={length:480,lanewidth:2,speed:9.6,jumpDuration:.94,jumpHeight:1.55,gaugeMax:20,boostDuration:3,boostSpeed:16.2},pr=(i,t,e)=>t+(i-t)*Math.exp(-13*e),mr=i=>i===null||i>=ie.jumpDuration?0:Math.sin(i/ie.jumpDuration*Math.PI)*ie.jumpHeight;function Dx(i,t,e){let n=pr(t.x,t.target,e),s=t.wall;return s&&i>=s.fromS&&(n-s.x)*s.blockedSide>0?s.x:n}function fi(i,t,e){if(i<=t.s||i>e)return null;let n=t.dt*(i-t.s)/(e-t.s),s=t.jump===null?null:t.jump+n;return{x:Dx(i,t,n),y:mr(s),grounded:s===null||s>=ie.jumpDuration}}var Na=1.7-.54,sc=1.7+.26;function Ux(i,t,e){let n=i.s+-5.05,s=i.s+2.55;if(e<n||t.s>=s||e<=t.s)return null;let r=i.lane*ie.lanewidth,a=c=>pr(t.x,t.target,t.dt*(c-t.s)/(e-t.s))-r,o=a(Math.max(t.s,n)),l=a(Math.min(e,s));for(let c of[-1,1]){let h=c*o,d=c*l;if(Math.min(h,d)>=sc-1e-9||Math.max(h,d)<=Na+1e-9)continue;let f=h<=Na||h<sc&&h<1.7;return{x:r+c*(f?Na:sc),fromS:Math.max(n,t.s),blockedSide:f?c:-c,lane:f?i.lane:Math.max(-1,Math.min(1,i.lane+c))}}return null}function uu(){let i=Array.from({length:15},(e,n)=>({id:n,s:36+n*28,lane:[0,-1,1,0,1,-1,0,1,0,-1,1,0,-1,1,0][n],type:n%4===2?"tunnel":"hurdle"})).filter(e=>!$n(e.s,26,9)),t=[];for(let e=8;e<465;e+=2.2){let n=[0,0,-1,0,1,0][Math.floor((e-8)/17)%6],s=.65;$n(e,20,4)&&(n=0);let r=i.find(a=>Math.abs(a.s-e)<4.5);r&&(n=r.lane,r.type==="hurdle"&&(s=.65+1.25*Math.sin(Math.PI*(e-r.s+4.5)/9))),t.push({id:t.length,s:e,lane:n,y:s})}return{theme:"park",length:ie.length,obstacles:i,treats:t,turns:Da}}var ur=(i,t,e,n)=>({id:i,lane:t,x:t*ie.lanewidth,s:e,speed:n,y:0,jumpElapsed:null,slow:0,brake:0,boost:0,finishTime:null,hits:0,lastHitObstacle:null,phase:0}),dr=class{constructor(t="park"){let e={park:uu,beach:cu,forest:lu}[t]??uu;this.layout=e(),this.reset()}reset(){this.status="ready",this.previousStatus=null,this.countdown=3,this.time=0,this.player=ur("player",0,0,ie.speed),this.cpus=[ur("cpu0",-1,0,9.7),ur("cpu1",1,0,10),ur("cpu2",0,-3.3,10.25),ur("cpu3",-1,-4.4,9.9)];let t=this.layout.theme==="beach"?this.cpus.slice(0,2):this.layout.theme==="forest"?[this.cpus[2],this.cpus[1]]:[];for(let e of t)e.nextTreat=0,e.gauge=0;this.gauge=0,this.treatCount=0,this.dashCount=0,this.collected=new Set,this.events=[],this.result=null,this.armedTurns=new Set,this.passedTurns=new Set,this.missedTurns=new Set,this.waitingTurn=null,this.wallReach=null}start(){this.status==="ready"&&(this.status="countdown")}pause(){["countdown","running"].includes(this.status)&&(this.previousStatus=this.status,this.status="paused")}resume(){this.status==="paused"&&(this.status=this.previousStatus,this.previousStatus=null)}inTunnel(t){return this.layout.theme==="park"?this.layout.obstacles.find(e=>e.type==="tunnel"&&t.s>=e.s+-5.05&&t.s<e.s+2.55&&Math.abs(t.x-e.lane*ie.lanewidth)<=Na):this.layout.obstacles.find(e=>e.type==="tunnel"&&Math.abs(t.s-e.s)<3.4&&Math.abs(t.x-e.lane*ie.lanewidth)<.8)}get turnCue(){let t=$n(this.player.s,32,0,this.layout.turns);return t?{...t,distance:Math.max(0,t.start-this.player.s),active:this.player.s>=t.start-20,armed:this.armedTurns.has(t.id),waiting:this.waitingTurn===t.id}:null}input(t){if(this.status!=="running")return!1;let e=this.player;if(t==="left"||t==="right"){let s=this.turnCue;if(s?.active)return s.armed?!1:t!==s.direction?(this.events.push({type:"turn-wrong",direction:s.direction}),!1):(this.armedTurns.add(s.id),this.waitingTurn=null,e.lane=0,this.events.push({type:"turn-armed",direction:s.direction}),!0)}if(this.waitingTurn!==null)return!1;if(t==="dash")return this.gauge<ie.gaugeMax||e.boost>0?!1:(this.gauge=0,e.boost=ie.boostDuration,this.dashCount++,this.events.push({type:"dash"}),!0);if(t==="brake")return e.brake=.6,!0;let n=this.inTunnel(e);if(n&&(this.layout.theme!=="park"||t==="jump"))return!1;if(t==="left"||t==="right"){let s=e.lane+(t==="left"?-1:1);return e.lane=Math.max(-1,Math.min(1,s)),this.wallReach=n&&s!==e.lane?{gate:n,target:s*ie.lanewidth}:null,!0}return t==="jump"&&e.jumpElapsed===null?(e.jumpElapsed=0,!0):!1}obstacleHit(t,e,n){t.lastHitObstacle!==e.id&&(t.lastHitObstacle=e.id,t.slow=1.15,t.hits++,t===this.player&&this.events.push({type:"hit",reason:n}))}collectRivalTreats(t,e){let n=this.layout.treats;for(;t.nextTreat<n.length&&n[t.nextTreat].s<=t.s;){let s=n[t.nextTreat++],r=fi(s.s,e,t.s);r&&Math.abs(r.x-s.lane*ie.lanewidth)<.72&&Math.abs(r.y+.65-s.y)<.8&&(t.gauge=Math.min(ie.gaugeMax,t.gauge+1))}t.gauge===ie.gaugeMax&&t.boost===0&&(t.gauge=0,t.boost=ie.boostDuration)}get rank(){return this.result?this.result.rank:1+this.cpus.filter(t=>t.finishTime!==null||t.s>this.player.s+.02).length}step(t){if(!Number.isFinite(t)||t<=0||t>.1)return;if(this.status==="countdown"){this.countdown=Math.max(0,this.countdown-t),this.countdown===0&&(this.status="running",this.events.push({type:"go"}));return}if(this.status!=="running")return;let e=this.time;if(this.time+=t,this.advanceField(t,e,this.cpus),this.player.finishTime!==null){let n=this.finishStandings(this.time);this.result={rank:1+n.findIndex(s=>s.id===this.player.id),standings:n,time:this.player.finishTime,treats:this.treatCount,dashes:this.dashCount,hits:this.player.hits,turns:this.passedTurns.size,turnMisses:this.missedTurns.size},this.time=this.player.finishTime,this.status="finished",this.events.push({type:"finish"})}}finishStandings(t){let e=this.cpus.map(s=>({...s})),n=1/60;for(;e.some(s=>s.finishTime===null);)this.advanceField(n,t,e),t+=n;return[this.player,...e].map(({id:s,finishTime:r})=>({id:s,time:r})).sort((s,r)=>s.time-r.time)}advanceField(t,e,n){for(let s=0;s<n.length;s++){let r=n[s];if(r.finishTime!==null)continue;r.lane=$n(r.s,20,0,this.layout.turns)?0:[-1,1,0,-1][s];let a=this.layout.obstacles.find(o=>o.s>r.s&&o.s-r.s<4.3&&Math.abs(r.x-o.lane*ie.lanewidth)<.65);(a?.type==="hurdle"||a?.type==="log")&&r.jumpElapsed===null&&(a.id+s*3)%7!==0&&(r.jumpElapsed=0)}for(let s of[this.player,...n]){if(s.finishTime!==null)continue;let r=s.s,a=s===this.player?this.wallReach:null,o={s:r,x:s.x,target:a?.target??s.lane*ie.lanewidth,jump:s.jumpElapsed,dt:t};s.slow=Math.max(0,s.slow-t),s.brake=Math.max(0,s.brake-t),s.boost=Math.max(0,s.boost-t),s.jumpElapsed!==null&&(s.jumpElapsed+=t,s.jumpElapsed>=ie.jumpDuration?(s.jumpElapsed=null,s.y=0):s.y=mr(s.jumpElapsed)),s.x=pr(s.x,o.target,t);let l=s===this.player&&this.waitingTurn!==null,c=this.layout.sand&&s.y<.2&&hu(this.layout.sand,s.s,s.x),h=l?0:(c?.8:1)*(s.boost>0?ie.boostSpeed:s.speed)*(s.slow>0?.43:1)*(s.brake>0?.63:1);if(s.s+=h*t,s===this.player){let d=this.layout.turns.find(f=>r<=f.start&&s.s>=f.start&&!this.armedTurns.has(f.id));d&&(s.s=d.start,this.waitingTurn=d.id,this.missedTurns.has(d.id)||(this.missedTurns.add(d.id),this.events.push({type:"turn-missed",direction:d.direction})));for(let f of this.layout.turns)r<f.end&&s.s>=f.end&&!this.passedTurns.has(f.id)&&(this.passedTurns.add(f.id),this.events.push({type:"turn-done",direction:f.direction}))}s.phase+=s.s-r;for(let d of this.layout.obstacles){if(d.type==="tunnel"&&this.layout.theme==="park"){let m=Ux(d,o,s.s);m&&(o.wall=m,s.x=m.x,s.lane=m.lane,s===this.player&&(this.wallReach=null),this.obstacleHit(s,d,"tunnel-wall"))}let f=fi(d.s,o,s.s);if(!f||Math.abs(f.x-d.lane*ie.lanewidth)>=(d.type==="log"?1.12:.72))continue;(d.type==="tunnel"?f.y>.55:f.y<(d.type==="log"?.68:.74))&&(this.obstacleHit(s,d),d.type==="tunnel"&&(s.jumpElapsed=null,s.y=0))}if(a&&s.s>=a.gate.s+2.55&&(this.wallReach=null),s===this.player){for(let d of this.layout.treats)if(!this.collected.has(d.id)&&r<=d.s+.4&&s.s>=d.s-.4&&Math.abs(s.x-d.lane*ie.lanewidth)<.72&&Math.abs(s.y+.65-d.y)<.8){this.collected.add(d.id),this.treatCount++;let f=this.gauge;this.gauge=Math.min(ie.gaugeMax,this.gauge+1),this.events.push({type:"treat",id:d.id}),f<ie.gaugeMax&&this.gauge===ie.gaugeMax&&this.events.push({type:"ready"})}}s.nextTreat!==void 0&&this.collectRivalTreats(s,o),s.s>=this.layout.length&&(s.finishTime=e+t*(this.layout.length-r)/(s.s-r),s.s=this.layout.length)}}drainEvents(){let t=this.events;return this.events=[],t}};function Fa(i,t,e,n=!1){let s=Math.abs(i),r=Math.abs(t),a=Math.max(s,r),o=Math.min(s,r),l=n&&e<=210&&a>=20&&a>=o*1.4;return a>=28||l?s>r?i<0?"left":"right":t<0?"jump":"brake":Math.hypot(i,t)<12&&e<350?"dash":null}function Nx(i){return()=>(i=1664525*i+1013904223>>>0)/4294967296}function fu({root:i,routePoint:t,end:e,ribbon:n,mesh:s,box:r,groupAt:a,instances:o,pose:l}){let c=Nx(1071);r(1300,.15,1300,"#9bc95f",0,-.12,-180),s(n(0,7.65,.015,-15,e,t),"#edc285").name="continuous-road";let h=[],d=[],f=[],u=[],m=[],y=[],p=[],g=[],v=[],M=[],_=[],P=[],E=["#bedc77","#a4cc65","#c4df81","#99c461"],C=[],T=[];for(let it of[-1,1]){let ht;for(let yt=-15;yt<=e+3;yt+=2.8){let W=3.77+c()*.28,nt=5.6+c()*1.2,ft=[t(yt,W*it),t(yt,nt*it)];if(ht){let k=new zt(E[Math.floor(c()*E.length)]);for(let tt of[ht[0],ht[1],ft[0],ht[1],ft[1],ft[0]])C.push(tt.x,.024,tt.z),k.toArray(T,T.length)}ht=ft}}let b=new xe;b.setAttribute("position",new qt(C,3)),b.setAttribute("color",new qt(T,3));let x=new fe(b,new Cn({vertexColors:!0,side:Ie}));i.add(x);for(let it=-10;it<e;it+=1.3){let ht=c()<.5?-1:1;h.push(l(it,ht*(2.44+c()*1.24),.027,.08+c()*.24,.009,.06+c()*.18));let yt=ht*(4.1+c()*2.05),W=l(it,yt,.13,.1,.26+c()*.22,.15);if(d.push(W),!(c()>.28))for(let nt=0;nt<3;nt++){let ft=l(it+c()*.6,yt+c()*.4,.19+c()*.13,.12,.055,.12);u.push([ft[0],ft[1]+.033,ft[2],.057,.038,.057]);for(let k=0;k<5;k++){let tt=k*2*Math.PI/5;f.push([ft[0]+Math.cos(tt)*.069,ft[1],ft[2]+Math.sin(tt)*.069,.07,.032,.07])}}}o(new _s(1,0),"#d8ab76",h,"path-grit"),o(new We(1,1,3),"#75a34c",d,"grass-tips");let w=new Be(1,0);o(w,"#fff4d8",f,"daisies"),o(w,"#efaf31",u,"daisy-centres");for(let it of[-1,1]){for(let ht=-11;ht<e;ht+=3.1){if((Math.floor((ht+12)/21)+(it+1))%4===2)continue;let yt=t(ht,it*5.72),W=t(ht+3.1,it*5.72);_.push(l(ht,it*5.72,.56));for(let nt of[.46,.89])P.push([(yt.x+W.x)/2,nt,(yt.z+W.z)/2,1,1,Math.hypot(W.x-yt.x,W.z-yt.z)+.08,-Math.atan2(W.x-yt.x,yt.z-W.z)])}for(let ht=-12+(it+1)*2.9;ht<e;ht+=9+c()*6){let yt=it*(6.8+c()*3.6),W=2.45+c()*1.35;p.push(l(ht,yt,W*.48,1,W,1));let nt=l(ht,yt,W*.89,1,.95,1);g.push(nt);let ft=c()*6,k=1.65+c()*.91;v.push([...l(ht,yt,W+.56,k,1.66+c(),k*.91).slice(0,6),ft]),M.push([...l(ht+.42,yt-it*.71,W+1.58,k*.76,1.24+c()*.5,k*.7).slice(0,6),ft+.71])}for(let ht=-9;ht<e;ht+=5+c()*7){let yt=6.2+c()*4,W=.7+c()*.8;m.push(l(ht,it*yt,W*.55,W*1.13,W,W*.91)),y.push(l(ht+1,it*(yt+.65),W*.44,W*1.12,W*.74,W))}}let I=new Be(1,1);function D(it,ht,yt,W){let nt=o(it,ht,yt,W);nt.material.flatShading=!0;for(let ft=0;ft<yt.length;ft++){let k=.8+c()*.2;nt.setColorAt(ft,new zt().setRGB(k,Math.min(1,k+.03),k*.94))}return nt}D(I,"#70ae51",v,"tree-crowns"),D(I,"#a3ca59",M,"sunlit-canopies"),D(new _s(1,0),"#81af4a",m,"shrubs"),D(I,"#589b55",y,"hedges"),o(new ue(.22,.34,1,7),"#966745",p,"tree-trunks");let z=new ue(.1,.18,1.45,6);z.rotateZ(.53),z.translate(-.29,0,0),o(z,"#a5744d",g,"tree-branches"),o(new ue(.099,.111,1.17,5),"#aa7450",_,"fence-posts"),o(new Te(.085,.13,1),"#bc895d",P,"fence-rails");let q=p.map(it=>[it[0]+.75,.007,it[2]-.37,2.43,1,1.44,it[6]]),G=new ci(1,9);G.rotateX(-Math.PI/2),o(G,"#8db55f",q,"tree-shadows");let lt=[],O=[];for(let it=-30;it<e+60;it+=25)for(let ht of[-1,1]){let yt=44+c()*26;if(lt.push(l(it,ht*yt,-2,11+c()*13,5+c()*8,15+c()*13)),c()<.5){let W=ht*(13+c()*23),nt=12+c()*8;for(let[ft,k,tt,st,mt]of[[-2,0,-.1,2.1,.82],[0,.67,0,2.35,1.45],[2.1,.12,.3,1.8,.96]])O.push(l(it+tt,W+ft,nt+k,st,mt,1.85))}}let Q=[];for(let it=-20;it<=e+5;it+=2)Q.push(t(it,0));let pt=lt.filter(([it,,ht,yt,,W])=>{let nt=Math.max(yt,W)+16;return Q.every(ft=>(ft.x-it)**2+(ft.z-ht)**2>nt**2)});D(new Be(1,0),"#83b69b",pt,"far-hills"),o(new Be(1,1),"#fff8df",O,"clouds");for(let it of[45,162,322]){let ht=a(it,-11);ht.name="park-pavilion",s(new ue(2.3,2.46,.27,8),"#d5b68a",0,.13,0,ht);for(let yt=0;yt<8;yt++){let W=Math.PI*yt/4;s(new ue(.083,.1,2.65,6),"#f4e4be",Math.cos(W)*1.9,1.56,Math.sin(W)*1.9,ht)}s(new We(2.9,1.55,8),"#cf6c50",0,3.65,0,ht),s(new ue(2.9,2.81,.15,8),"#8f5542",0,2.88,0,ht),s(new ze(.16,8,6),"#f3be66",0,4.48,0,ht)}}function pu(i,t){let e=t(new ue(.365,.345,1.76,11),"#925d38",0,.39,0,i);e.castShadow=!0,e.rotation.z=Math.PI/2,e.rotation.y=.09;for(let s of[-1,1]){let r=s*.88,a=-s*.079;t(new ue(.303,.303,.02,11),"#e2ab70",r,.39,a,i).rotation.copy(e.rotation);let l=t(new pn(.195,.014,4,12),"#b57a46",r+s*.017,.39,a,i);l.rotation.y=Math.PI/2+.09}for(let s of[-.51,.32]){let r=t(new ue(.027,.033,.42,6),"#b7814e",s,.5,.32-s*.09,i);r.rotation.z=Math.PI/2-.08,r.rotation.y=.09}let n=t(new ue(.089,.125,.22,7),"#99643c",-.41,.67,-.06,i);n.rotation.z=.54,t(new _s(1,0),"#8ca54b",.42,.699,-.04,i).scale.set(.25,.078,.139)}var rc=[[0,-.15,.3,.216],[-.35,.15,.106,.16],[-.13,.35,.115,.166],[.14,.35,.115,.166],[.35,.15,.106,.16]],mn=new Xn;mn.moveTo(-.92,0);mn.bezierCurveTo(-1.24,-.33,-1.05,-.64,-.76,-.58);mn.bezierCurveTo(-.53,-.55,-.56,-.34,-.31,-.315);mn.bezierCurveTo(-.09,-.29,.11,-.3,.32,-.32);mn.bezierCurveTo(.55,-.34,.55,-.56,.77,-.585);mn.bezierCurveTo(1.08,-.635,1.23,-.29,.92,0);mn.bezierCurveTo(1.2,.31,1.06,.61,.78,.57);mn.bezierCurveTo(.53,.55,.56,.33,.31,.315);mn.bezierCurveTo(.1,.295,-.11,.295,-.31,.315);mn.bezierCurveTo(-.57,.33,-.54,.565,-.78,.58);mn.bezierCurveTo(-1.08,.615,-1.21,.29,-.92,0);var nn=mn.getPoints(6);nn.at(-1).equals(nn[0])&&nn.pop();var Oa=rc.map(([i,t,e,n])=>Array.from({length:16},(s,r)=>{let a=-r*Math.PI/8;return new Ct((i+e*Math.cos(a))*.56,(t+n*Math.sin(a))*.56)})),mu=i=>i.map(({x:t,y:e},n)=>(n?"L":"M")+t.toFixed(3)+" "+(-e).toFixed(3)).join(" ")+"Z",ac='<svg viewBox="-1.19 -.71 2.38 1.42" aria-hidden="true"><path d="'+mu(nn)+'" fill="#efc384" stroke="#99633d" stroke-width=".11"/><path d="'+Oa.map(mu).join("")+'" fill="#91572f"/></svg>';function gu(){let i=[],t=[],e=[],n=(f,u,m,y=1,p=new Ct)=>{let g=i.length/3,v=new zt(m);for(let M of f)i.push((p.x+(M.x-p.x)*y)*.327,(p.y+(M.y-p.y)*y)*.327,u),t.push(v.r,v.g,v.b);return g};function s(f,u,m){for(let y=0;y<m;y++){let p=(y+1)%m;e.push(f+y,f+p,u+p,f+y,u+p,u+y)}}let r=n(nn,-.052,"#b97a42",.94),a=n(nn,-.034,"#c78749"),o=n(nn,.031,"#d89a54"),l=n(nn,.053,"#f1c080",.95);s(r,a,nn.length),s(a,o,nn.length),s(o,l,nn.length);for(let f of Vn.triangulateShape(nn,[]))e.push(...f.reverse().map(u=>u+r));let c=nn.map(f=>f.clone().multiplyScalar(.95));for(let f of Oa)n(f,.053,"#d5a16a");for(let f of Vn.triangulateShape(c,Oa))e.push(...f.map(u=>u+l));let h=l+nn.length;Oa.forEach((f,u)=>{let m=new Ct(rc[u][0],rc[u][1]).multiplyScalar(.56),y=n(f,.038,"#956537",.8,m);s(y,h,f.length);for(let p of Vn.triangulateShape(f,[]))e.push(...p.map(g=>y+g));h+=f.length});let d=new xe;return d.setAttribute("position",new qt(i,3)),d.setAttribute("color",new qt(t,3)),d.setIndex(e),d.computeVertexNormals(),d.rotateZ(.22),d.rotateX(-.38),d}function gr(i,t,e=1.58,n=6){let s=new ue(e,e,n,32,1,!0,Math.PI/2,Math.PI);s.rotateX(Math.PI/2);let r=t(s,"#5686aa",0,0,0,i);r.material.side=Ie,r.name="tunnel-fabric";let a=8;for(let o=0;o<=a;o++){let l=o===0||o===a,c=t(new pn(e,e*(l?.068:.032),8,32,Math.PI),l?"#91b7c3":"#729cba",0,0,n*(o/a-.5),i);c.name=l?"tunnel-rim":"tunnel-rib"}}function xu(i,t){let e=1.7,n=7.6,s=new Re;s.name="park-tunnel",s.scale.y=1.1,s.position.z=1.25,i.add(s),gr(s,t,e,n);for(let r of[-1,1])t(new Te(.12,.08,n),"#75969c",r*e,.04,0,s)}function _u(i,{mesh:t,box:e,instances:n,pose:s,ribbon:r}){let a=i.length+35;e(1e3,.16,1300,"#93a978",0,-.12,-230),t(r(0,8.8,.005,-20,a,i.point),"#b7ad79").name="trail-verge",t(r(0,7.5,.016,-20,a,i.point),"#d1af80").name="continuous-road";let o=41383,l=()=>(o=Math.imul(o,1664525)+1013904223>>>0,o/4294967296),c=[],h=[],d=[],f=[],u=[],m=[],y=[],p=[],g=[],v=[],M=[],_=[];for(let E=-10;E<a;E+=4.3)for(let C of[-1,1]){let T=E+l()*3,b=Math.sin(E*.065)>.6?3:0,x=C*(7.6+b+l()*5),w=.78+l()*.58;if(l()<.28){f.push(s(T,x,w*2.1,w,w,w));for(let D=0;D<3;D++)m.push(s(T,x,w*(.9+D*.9),w,w,w));u.push(s(T,x,w*4.4,1.6*w,2.1*w,1.6*w))}else c.push(s(T,x,w*1.6,w,w,w)),h.push(s(T,x,w*3.35,w,w,w)),d.push(s(T,x,w*4.95,w,w,w));let I=C*(4.8+l()*1.6);if(l()<.35)y.push(s(E,I,.16,.46,.32,.57)),p.push(s(E,I,.3,.38,.24,.45));else{let D=s(E,I,.22,.38,.47,.38);g.push(D)}v.push(s(E+l(),C*(3.2+l()*.85),.027,.1,.007,.19))}for(let E=0;E<a;E+=17){let C=Math.floor(E/17)%2?-1:1;M.push(s(E,C*4.55,.49)),_.push(s(E,C*4.55,.73))}let P=[];for(let E=24;E<a;E+=55)for(let C of[-1,1])P.push(s(E,C*33,1,13,7+3*Math.sin(E),18));n(new Be(1,0),"#819e91",P,"forest-ridge"),n(new ue(.18,.29,3.2,8),"#79644c",c,"fir-trunks"),n(new We(1.85,3.7,8),"#355e51",h,"fir-boughs"),n(new We(1.35,3.25,8),"#63865f",d,"fir-tops"),n(new ue(.14,.2,4.2,8),"#ded8ba",f,"birch-trunks"),n(new ue(.19,.2,.085,8),"#817b67",m,"birch-bark"),n(new Be(1,1),"#9cb668",u,"birch-leaves"),n(new Be(1,0),"#8b8876",y,"verge-rocks"),n(new Be(1,0),"#83905e",p,"rock-moss"),n(new We(1,1,5),"#668451",g,"forest-floor"),n(new Be(1,0),"#a98853",v,"fallen-leaves"),n(new Te(.17,.98,.17),"#8a785e",M,"waymarks"),n(new Te(.177,.16,.177),"#eabd76",_,"trail-blazes")}function yu(i,t){let e=t(new ue(.32,.34,1.95,12),"#74583f",0,.34,0,i);e.rotation.z=Math.PI/2,e.castShadow=!0;for(let n of[-1,1]){let s=n*.978,r=t(new ue(.294,.294,.012,16),"#cdab74",s,.34,0,i);r.rotation.z=Math.PI/2;let a=t(new pn(.18,.015,5,18),"#a48255",s+n*.011,.34,0,i);a.rotation.y=Math.PI/2}}function Bx(i,t,e,n,s,r,a=2){let o=[],l=[],c=Math.ceil((r-s)/a);for(let d=0;d<=c;d++){let f=s+(r-s)*d/c,u=i(f,-6.8-.6*Math.sin(f/8)-.35*Math.sin(f/3));for(let m of[e,t])o.push(u.x-m,n,u.z);if(d<c){let m=2*d;l.push(m,m+1,m+2,m+1,m+3,m+2)}}let h=new xe;return h.setAttribute("position",new qt(o,3)),h.setIndex(l),h.computeVertexNormals(),h}function vu(i,{mesh:t,box:e,pose:n,instances:s,groupAt:r,ribbon:a}){let{point:o,length:l}=i;e(1100,.12,1400,"#e7cd98",0,-.1,-200);let c=(v,M,_,P,E)=>{t(Bx(o,v,M,_,-210,l+220),P).name=E};c(-1.7,0,-.007,"#c8b994","wet-sand"),c(0,320,.008,"#469eae","ocean"),c(0,2.8,.013,"#9edbd0","shallows"),c(2.8,10,.012,"#7fbcb7","coastal-water"),c(-.1,.19,.025,"#f5f1d9","surf-line"),t(a(0,7.5,.015,-15,l+30,o),"#eacb95").name="continuous-road";for(let v of i.sand){let M=r(v.s,v.lane*2);M.name="soft-sand",t(new ue(1,1,.025,36),"#c9a574",0,.018,0,M).scale.set(v.halfWidth,1,v.halfLength);for(let P=-2;P<=2;P++){let E=t(new ze(1,9,5),"#bfa077",.09*Math.sin(P),.034,P*1.55,M);E.scale.set(.38,.022,.085),E.rotation.y=.2*Math.sin(P+1)}}let h=[],d=[],f=[],u=[],m=[],y=[[],[]];for(let v=-30;v<l+75;v+=5.5){let M=o(v,-6.8-.6*Math.sin(v/8)-.35*Math.sin(v/3));for(let _=0;_<3;_++)h.push([M.x-1.6-_*7.8-1.1*Math.cos(v+_),.027,M.z+Math.sin(v*.32+_),.09+.04*_,.012,.65+.5*(1+Math.sin(v)),-.35*Math.sin(v*.1)])}for(let v=0;v*13<=l+8;v++){let M=v*13;for(let _ of[-1,1])d.push(n(M,_*4.2,.48)),f.push(n(M,_*4.2+.15,.83))}for(let v=0;v*18<l+50;v++){let M=v*18-15;u.push(n(M,12+2*Math.sin(v),-.15,3.6+v%3,.9,5)),v%3===1&&(m.push(n(M,9,1.3)),y[v%2].push(n(M,9,2.6)))}s(new ze(1,9,5),"#cce4db",h,"whitecaps"),s(new ue(.045,.055,.96,8),"#a58562",d,"beach-stakes"),s(new Te(.3,.18,.035),"#e57e5b",f,"course-pennants"),s(new Be(1,1),"#d6bd8e",u,"dunes"),s(new ue(.065,.075,2.6,8),"#9f8668",m,"parasol-poles");for(let v=0;v<2;v++)s(new We(1.8,.65,10),["#d87559","#478b91"][v],y[v],"parasols");let p=r(l*.63,-30);t(new Be(1,0),"#849b88",0,.2,0,p).scale.set(7,2.4,5);for(let[v,M,_,P]of[[1.6,3.6,1.25,"#f4e5c3"],[5.2,1,1.12,"#c3654a"],[6.2,1.6,1.05,"#f4e5c3"],[7.8,.85,.93,"#497b86"]])t(new ue(_*.94,_,M,10),P,0,v+M/2,0,p);t(new We(1.28,.85,10),"#b75e45",0,9.06,0,p);for(let v of[45,164,296,435]){let M=r(v,-8);M.position.x-=20+7*Math.sin(v),M.rotation.y+=.5,t(new ze(1,12,8),"#9b6650",0,.24,0,M).scale.set(.66,.38,2.2),e(.07,3.7,.07,"#927763",0,2,0,M);let P=new Xn;P.moveTo(0,0),P.lineTo(1.65,0),P.lineTo(0,3.1),P.closePath();let E=t(new ys(P),"#fbefd6",0,.7,.08,M);E.rotation.y=Math.PI/2,E.material.side=Ie}}function Mu(i,t){function e(n,s,r,a,o,l,c){let h=t(new ue(n,s,r,12),c,a,o,0,i);return h.rotation.z=l,h.castShadow=!0,h}e(.32,.3,1.92,0,.34,Math.PI/2,"#886246");for(let n of[-.963,.963])e(.26,.26,.012,n,.34,Math.PI/2,"#d1ad77");e(.087,.13,.36,.51,.56,-.9,"#8c694d")}var bu=i=>new Je({color:i,roughness:1});function xr(i,t,e,n=-15,s=510,r=ui){let a=[],o=[],l=Math.ceil(s-n);for(let h=0;h<=l;h++){let d=n+(s-n)*h/l;for(let f of[-1,1]){let u=r(d,i+f*t/2);a.push(u.x,e,u.z)}if(h<l){let f=h*2;o.push(f,f+1,f+2,f+1,f+3,f+2)}}let c=new xe;return c.setAttribute("position",new qt(a,3)),c.setIndex(o),c.computeVertexNormals(),c}function Su(i){let t=new Re;t.name=(i.theme||"park")+"-race-track";let e=i.point||ui,n=i.length||ie.length,s=n+30,r=i.theme==="field";function a(v,M,_=0,P=0,E=0,C=t){let T=new fe(v,bu(M));return T.position.set(_,P,E),T.receiveShadow=!0,C.add(T),T}function o(v,M,_,P,E,C,T,b=t){return a(new Te(v,M,_),P,E,C,T,b)}function l(v,M=0){let _=e(v,M),P=new Re;return P.position.set(_.x,0,_.z),P.rotation.y=-_.heading,t.add(P),P}function c(v,M,_,P=1,E=1,C=1){let T=e(v,M);return[T.x,_,T.z,P,E,C,-T.heading]}function h(v,M,_,P){let E=new Pi(v,bu(M),_.length),C=new Ne;E.name=P;for(let T=0;T<_.length;T++){let b=_[T];C.position.set(b[0],b[1],b[2]),C.scale.set(b[3]??1,b[4]??1,b[5]??1),C.rotation.set(0,b[6]??0,0),C.updateMatrix(),E.setMatrixAt(T,C.matrix)}return E.receiveShadow=!0,t.add(E),E}if(i.theme==="beach")vu(i,{mesh:a,box:o,pose:c,instances:h,groupAt:l,ribbon:xr});else if(i.theme==="forest")_u(i,{mesh:a,box:o,pose:c,instances:h,ribbon:xr});else if(i.theme==="park")fu({root:t,routePoint:e,end:s,ribbon:xr,mesh:a,box:o,groupAt:l,instances:h,pose:c});else{o(800,.12,800,"#9fb681",50,-.12,-200),a(xr(0,7.6,.015,-15,s,e),r?"#b4c49a":"#cfbc95").name="continuous-road";for(let T of[-3.7,3.7])a(xr(T,.08,.025,-15,s,e),"#e6d7b6");let v=[];for(let T=-12;T<s;T+=5)for(let b of[-1,1])v.push(c(T,b,.025));h(new Te(.035,.015,1.5),"#e3d5b5",v,"lane-markings");let M=[],_=[],P=[],E=[],C=[];for(let T=-12;T<s;T+=4)for(let b of[-1,1])E.push(c(T,b*4.4,.6));for(let T=-12;T<s;T+=2)for(let b of[-1,1]){let x=e(T,b*4.4),w=e(T+2,b*4.4);C.push([(x.x+w.x)/2,.75,(x.z+w.z)/2,1,1,Math.hypot(w.x-x.x,w.z-x.z)+.04,-Math.atan2(w.x-x.x,x.z-w.z)])}for(let T=-10;T<s;T+=11)for(let b of[-1,1]){let x=b*(7+Math.abs(T)%4*.6);M.push(c(T,x,1)),_.push(c(T,x,2.5,1.3,1.5,1.3)),P.push(c(T+.4,x+.45,3.2,1,1.2,1))}h(new ue(.13,.17,2,7),"#8e7c54",M,"tree-trunks"),h(new ze(1,10,7),"#79985f",_,"tree-crowns"),h(new ze(1,10,7),"#8caa6a",P,"tree-caps"),h(new Te(.1,1.2,.1),"#d7c6a2",E,"fence-posts"),h(new Te(.07,.12,1),"#d7c6a2",C,"fence-rails")}for(let v of i.turns)for(let M of[23,6]){let _=v.direction==="right"?-1:1,P=l(v.start-M,_*4.7);P.name="turn-sign",P.userData.turnId=v.id,o(.12,2.2,.12,"#778566",0,1.1,0,P),o(2.5,1.2,.12,"#315b49",0,2.2,0,P);let E=new Xn;[[-.8,.14],[.12,.14],[.12,.43],[.8,0],[.12,-.43],[.12,-.14],[-.8,-.14]].forEach(([T,b],x)=>x?E.lineTo(T,b):E.moveTo(T,b)),E.closePath();let C=a(new ys(E),"#f5df9f",0,2.2,.071,P);C.material.side=Ie,v.direction==="left"&&(C.scale.x=-1)}for(let v of i.obstacles){let M=l(v.s,v.lane*ie.lanewidth);if(M.name="race-obstacle",M.userData.obstacleId=v.id,v.type==="log")i.theme==="forest"?yu(M,a):Mu(M,a);else if(v.type==="hurdle"&&i.theme==="park"&&v.id%4===0)pu(M,a);else if(v.type==="hurdle"){for(let _ of[-.8,.8])o(.1,1.1,.12,"#72929b",_,.55,0,M),o(.42,.08,.6,"#72929b",_,.04,0,M);for(let _=0;_<8;_++)o(.2,.11,.1,_%2?"#c78465":"#f6edda",-.7+_*.2,.74,0,M)}else if(v.type==="hoop"){a(new pn(1.2,.09,10,40),"#d6b35a",0,1.7,0,M);for(let _ of[-1.35,1.35])o(.1,2.6,.12,"#72929b",_,1.3,0,M),o(.18,.08,.08,"#78909a",_*.945,1.7,0,M),o(.5,.08,.7,"#72929b",_,.04,0,M)}else if(i.theme==="park")xu(M,a);else{gr(M,a);for(let _ of[-1,1])o(.12,.1,6,"#6a97a2",_*1.58,.05,0,M)}}let d=gu().scale(.76,.76,.76),f=new Je({vertexColors:!0,roughness:.93}),u=new Pi(d,f,i.treats.length);u.name="treat-trail",u.visible=i.treats.length>0,t.add(u);function m(){let v=new Ne;for(let M of i.treats){let _=e(M.s,M.lane*ie.lanewidth);v.position.set(_.x,M.y,_.z),v.rotation.set(0,-_.heading,0),v.updateMatrix(),u.setMatrixAt(M.id,v.matrix)}u.instanceMatrix.needsUpdate=!0,i.treats.length&&u.computeBoundingSphere()}function y(v){u.setMatrixAt(v,new ge().makeScale(0,0,0)),u.instanceMatrix.needsUpdate=!0}m();let p=l(n);p.name="finish-gate";for(let v of[-3.6,3.6])o(.18,4,.18,"#607e6c",v,2,0,p);for(let v=0;v<16;v++)for(let M=0;M<2;M++)o(.45,.35,.06,(v+M)%2?"#f6efda":"#486f59",-3.375+v*.45,3.3+M*.35,0,p);let g=[];for(let v=0;v<16;v++)for(let M=0;M<2;M++)(v+M)%2===0&&g.push(c(n-M*.5,-3.75+v*.5,.03));return h(new Te(.5,.012,.5),"#f6f0dc",g,"finish-tiles"),{root:t,treatMesh:u,resetTreats:m,collectTreat:y}}function pi(i,{distance:t=6,height:e=2.8,lookAhead:n=10,lookHeight:s=1}={}){let r=Math.sin(i.heading),a=-Math.cos(i.heading);return{position:{x:i.x-r*t,y:e,z:i.z-a*t},target:{x:i.x+r*n,y:s,z:i.z+a*n}}}function wu(i){let t=i.filter(s=>s.type==="tunnel"),e=[];function n(s){let r=e.findIndex(l=>l.s>=s);if(r<0)return e.at(-1).x;if(r===0)return e[0].x;let a=e[r-1],o=e[r];return en.lerp(a.x,o.x,(s-a.s)/(o.s-a.s))}return(s,r,a)=>{let{s:o,x:l}=s;for(e.length&&o<e.at(-1).s&&(e.length=0),(!e.length||o-e.at(-1).s>=.1)&&e.push({s:o,x:l});e.length>2&&e[1].s<o-10;)e.shift();let c=ui(o,l),h=t.find(T=>o>T.s-22&&o<T.s+24);if(!h)return pi(c,{distance:r,height:a});let d=o-h.s,f=en.smoothstep(d,-22,-7),u=1-en.smoothstep(d,12,24),m=n(o-r),y=h.lane*ie.lanewidth,p=Math.min(Math.abs(l-y),Math.abs(m-y)),g=f*u*(1-en.smoothstep(p,.85,1.85)),v=en.lerp(r,4.85,g),M=en.lerp(a,1.26,g),_=en.lerp(1,.77,g),P=Math.abs(l-y),E=en.smoothstep(P,.48,.98)*(1-en.smoothstep(P,1.85,2)),C=d-2.55-.18;if(C>0&&C<v&&E>0){let T=E*en.smoothstep(C,0,.66),b=en.lerp(v,C,T),x=b/v,w=M+(_-M)*(b+10)/(v+10),I=pi(c,{distance:b,height:M,lookHeight:w});return I.zoom=x,I}return pi(c,{distance:v,height:M,lookHeight:_})}}var _r=[{id:"park",name:"\u3053\u3046\u3048\u3093",level:"\u3084\u3055\u3057\u3044",lv:0,color:"#a9bd87",desc:"4\u3064\u306E \u307E\u304C\u308A\u304B\u3069\u3092 \u306C\u3051\u3066\u3001\u3053\u3046\u3048\u3093\u3092 \u304B\u3051\u307E\u308F\u308D\u3046",tags:["\u307E\u304C\u308A\u304B\u3069","\u30CF\u30FC\u30C9\u30EB","\u30C8\u30F3\u30CD\u30EB"],sky:"#9ed9ee",fog:[32,107],zenith:[.26,.67,.88],horizon:[.73,.91,.89],ground:"#a9b792",scale:.62,shadow:.55},{id:"beach",name:"\u3046\u307F\u3079",level:"\u3075\u3064\u3046",lv:1,color:"#d4bf88",desc:"\u304A\u3084\u3064\u306E \u308C\u3064\u3092 \u304A\u3044\u304B\u3051\u3066\u3001\u3059\u306A\u306F\u307E\u306E \u308A\u3085\u3046\u307C\u304F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046",tags:["\u308A\u3085\u3046\u307C\u304F","\u3059\u306A\u306F\u307E","\u307F\u3061 \u3048\u3089\u3073"],sky:"#b5dce4",fog:[85,175],zenith:[.2,.66,.85],horizon:[.91,.93,.81],ground:"#c4bc98",scale:.76,shadow:.8,flick:!0},{id:"forest",name:"\u3082\u308A",level:"\u3080\u305A\u304B\u3057\u3044",lv:2,color:"#6d9273",desc:"\u6728\u306E \u3042\u3044\u3060\u3092 \u306F\u3057\u3063\u3066\u3001\u30AB\u30FC\u30D6\u3068 \u307E\u308B\u305F\u3092 \u306E\u308A\u3053\u3048\u3088\u3046",tags:["\u307E\u308B\u305F","\u3064\u3065\u304F \u30AB\u30FC\u30D6","\u30BF\u30A4\u30DF\u30F3\u30B0"],sky:"#c1cfb0",fog:[42,110],zenith:[.42,.69,.7],horizon:[.81,.89,.78],ground:"#97a585",scale:.76,shadow:.8}],oc=i=>_r.find(t=>t.id===i)||_r[0],lc='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',cc='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 6v12M15.5 6v12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',Tu=.62;function yr(i){let t=Math.round(i*10),e=Math.floor(t/600),n=Math.floor(t/10)%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}.${t%10}`}var mi=i=>(Math.round(i*100)/100).toFixed(2)+"\u79D2",vr=i=>Math.round(i*100)*10;function Eu(i){let t=oc(i),e=new dr(t.id).layout,n=e.point||ui,s=e.length||ie.length,r=[];for(let E=0;E<=s;E+=3)r.push(n(Math.min(E,s),0));r.push(n(s,0));let a=r.map(E=>E.x),o=r.map(E=>E.z),l=Math.min(...a),c=Math.max(...a),h=Math.min(...o),d=Math.max(...o),f=76/Math.max(c-l,d-h,1),u=50-(l+c)/2*f,m=50-(h+d)/2*f,y=E=>`${(E.x*f+u).toFixed(1)} ${(E.z*f+m).toFixed(1)}`,p="M"+r.map(y).join("L"),g=(E,C,T,b)=>{let x=n(E,C*ie.lanewidth);return`<circle cx="${(x.x*f+u).toFixed(1)}" cy="${(x.z*f+m).toFixed(1)}" r="${b}" fill="${T}"/>`},v=e.obstacles.map(E=>g(E.s,0,E.type==="tunnel"?"#5f8ea6":E.type==="log"?"#8a6a45":"#c78465",3.2)).join(""),M=t.id==="beach"?'<path d="M0 0h100v100H0z" fill="#d4bf88"/><path d="M78 0h22v100H78z" fill="#7cc3d6"/><path d="M74 0q5 12 0 25t0 25 0 25 0 25h4V0z" fill="#e9ddb3"/>':t.id==="forest"?'<path d="M0 0h100v100H0z" fill="#6d9273"/>'+[[12,14],[86,20],[14,82],[88,76],[50,8],[10,48],[90,50]].map(([E,C])=>`<path d="M${E} ${C-7}l6 11h-12z" fill="#4f7356"/>`).join(""):'<path d="M0 0h100v100H0z" fill="#a9bd87"/>'+[[12,14],[86,18],[12,84],[88,82]].map(([E,C])=>`<circle cx="${E}" cy="${C}" r="6" fill="#86a56a"/>`).join(""),_=r[0],P=r[r.length-1];return`<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${M}<path d="${p}" fill="none" stroke="#f3e9cf" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${p}" fill="none" stroke="#d8c79f" stroke-width="1.4" stroke-dasharray="3 4" stroke-linecap="round"/>${v}
    <circle cx="${(_.x*f+u).toFixed(1)}" cy="${(_.z*f+m).toFixed(1)}" r="4.6" fill="#4fae9a" stroke="#fff" stroke-width="1.6"/>
    <circle cx="${(P.x*f+u).toFixed(1)}" cy="${(P.z*f+m).toFixed(1)}" r="4.6" fill="#ec6c8a" stroke="#fff" stroke-width="1.6"/></svg>`}function hc(i){let t=(s,r,a)=>`<div class="run-hrow"><b aria-hidden="true">${s}</b><div><strong>${r}</strong><span>${a}</span></div></div>`,e={park:"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078\u3002\u30C8\u30F3\u30CD\u30EB\u306E \u4E2D\u3067 \u304B\u3079\u306B \u3076\u3064\u304B\u308B\u3068 \u304A\u305D\u304F \u306A\u308B\u3088",beach:"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078\u3002\u3046\u307F\u3079\u306F \u307F\u3058\u304B\u3044 \u30B9\u30EF\u30A4\u30D7\u3067\u3082 \u3046\u3054\u3051\u308B\u3088",forest:"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078"}[i]||"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078",n={park:"\u30B8\u30E3\u30F3\u30D7\u3002\u30CF\u30FC\u30C9\u30EB\u3092 \u3068\u3073\u3053\u3048\u3088\u3046\u3002\u30C8\u30F3\u30CD\u30EB\u306F \u305D\u306E\u307E\u307E \u306F\u3057\u3063\u3066\u306D",beach:"\u30B8\u30E3\u30F3\u30D7\u3002\u308A\u3085\u3046\u307C\u304F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046\u3002\u3059\u306A\u306E \u4E0A\u306F \u3059\u3053\u3057 \u304A\u305D\u304F \u306A\u308B\u3088",forest:"\u30B8\u30E3\u30F3\u30D7\u3002\u307E\u308B\u305F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046"}[i]||"\u30B8\u30E3\u30F3\u30D7\u3002\u30CF\u30FC\u30C9\u30EB\u30FB\u308A\u3085\u3046\u307C\u304F\u30FB\u307E\u308B\u305F\u3092 \u3068\u3073\u3053\u3048\u3088\u3046";return`<div class="run-hrows">
    ${t("\u2194","\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7",e)}
    ${t("\u21B1","\u307E\u304C\u308A\u304B\u3069","\u3084\u3058\u308B\u3057\u304C \u51FA\u305F\u3089\u3001\u307E\u304C\u308B \u307B\u3046\u3078 \u30B9\u30EF\u30A4\u30D7\u3002\u307E\u304C\u308A\u305D\u3053\u306D\u3066 \u3068\u307E\u3063\u3066\u3082\u3001\u540C\u3058 \u30B9\u30EF\u30A4\u30D7\u3067 \u307E\u305F \u306F\u3057\u308A\u3060\u3059\u3088")}
    ${t("\u2191","\u3046\u3048\u306B \u30B9\u30EF\u30A4\u30D7",n)}
    ${t("\u2193","\u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7","\u3059\u3053\u3057\u3060\u3051 \u30D6\u30EC\u30FC\u30AD")}
    ${t("\u25CF","\u30BF\u30C3\u30D7","\u304A\u3084\u3064\u3092 20\u3053 \u3042\u3064\u3081\u308B\u3068\u3001\u3059\u304D\u306A \u3068\u304D\u306B \u30BF\u30C3\u30D7\u3067 3\u79D2 \u30C0\u30C3\u30B7\u30E5")}
  </div><p class="run-hnote">\u30AD\u30FC\u30DC\u30FC\u30C9\u306F \u3084\u3058\u308B\u3057\u3068 \u30B9\u30DA\u30FC\u30B9\u3067 \u3042\u305D\u3079\u307E\u3059</p>`}function Au(i){let{container:t,look:e,neckWear:n=null,name:s="\u3046\u3061\u306E\u3053",rivals:r=[],art:a="",best:o=null,next:l=null,onExit:c=()=>{},onSelect:h=null,onNext:d=null,onFinish:f=()=>null}=i,u=oc(i.course),m=u.id,y=m==="park",p=new dr(m),g=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches),v=y?wu(p.layout.obstacles):null,M=p.layout.point||ui,_=p.layout.length||ie.length,P=p.cpus.length+1,E=i.petScale||u.scale,C=l&&_r.some(N=>N.id===l)?oc(l):null,T=0,b=null,x=null,w=null,I=null,D=null,z=0,q=0,G=0,lt=0,O=!1,Q=null,pt=null,it=0,ht=6,yt="",W="",nt=!1,ft=[],k=new Map([[p.player.id,`${s}<small>\uFF08\u3046\u3061\u306E\u3053\uFF09</small>`],...p.cpus.map((N,Y)=>[N.id,r[Y]?r[Y].label:"\u304A\u3068\u3082\u3060\u3061"])]);t.className="run-root",t.dataset.course=m,t.innerHTML=`<canvas class="run-canvas" tabindex="0" aria-label="${u.name}\u306E \u30EC\u30FC\u30B9\u3002\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u30EC\u30FC\u30F3\u3068 \u307E\u304C\u308A\u304B\u3069\u3001\u3046\u3048\u3067 \u30B8\u30E3\u30F3\u30D7\u3001\u3057\u305F\u3067 \u30D6\u30EC\u30FC\u30AD\u3001\u304A\u3084\u3064\u304C \u305F\u307E\u3063\u305F\u3089 \u30BF\u30C3\u30D7\u3067 \u30C0\u30C3\u30B7\u30E5"></canvas>
    <div class="run-hud">
      <div class="run-top">
        <button class="closebtn run-btn" type="button" data-run="x" aria-label="\u30E9\u30F3\u3092 \u3084\u3081\u308B">${lc}</button>
        <div class="run-chip run-rank"><b data-q="rank">1</b><span>\u4F4D / ${P}\u3072\u304D</span></div>
        <div class="run-chip run-treat">${ac}<b data-q="treats">0</b></div>
        <span class="run-gap"></span>
        <button class="closebtn run-btn" type="button" data-run="help" aria-label="\u3042\u305D\u3073\u304B\u305F">\uFF1F</button>
        <button class="closebtn run-btn" type="button" data-run="pause" aria-label="\u3072\u3068\u3084\u3059\u307F" hidden>${cc}</button>
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
      <div class="run-gauge-l">${ac}<b data-q="hint">\u30C0\u30C3\u30B7\u30E5</b></div>
      <div class="run-gauge" role="meter" aria-label="\u30C0\u30C3\u30B7\u30E5\u306E \u30B2\u30FC\u30B8" aria-valuemin="0" aria-valuemax="${ie.gaugeMax}" aria-valuenow="0"><i data-q="gauge"></i></div>
      <b class="run-gauge-n" data-q="gaugeN">0 / ${ie.gaugeMax}</b>
    </div>
    <div class="run-over" data-q="over" role="dialog" aria-modal="true" aria-label="\u30E9\u30F3\u306E \u30E1\u30CB\u30E5\u30FC" hidden></div>`;let tt=N=>t.querySelector(`[data-q="${N}"]`),st=N=>t.querySelector(`[data-run="${N}"]`),mt=t.querySelector(".run-canvas"),Et=tt("over"),Ut=t.querySelectorAll(".run-mark"),St=t.querySelector(".run-me");function U(){b=new ms({canvas:mt,antialias:!0,powerPreference:"high-performance"}),b.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),b.outputColorSpace=Ze,b.shadowMap.enabled=!0,b.shadowMap.type=sr,b.toneMapping=rr,b.toneMappingExposure=1,x=new xs,x.background=new zt(u.sky),x.fog=new gs(u.sky,u.fog[0],u.fog[1]),w=new Xe(60,1,.1,180),x.add(new bs("#fffaf0",u.ground,2.1)),I=new Ss("#fff7ea",2.1),I.castShadow=!0,I.shadow.mapSize.set(1024,1024),Object.assign(I.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.5,far:45}),I.shadow.bias=-3e-4,I.shadow.normalBias=.03,x.add(I,I.target);let N=new fe(new ze(134,24,12),new tn({side:Ge,depthWrite:!1,uniforms:{zenith:{value:new F(...u.zenith)},horizon:{value:new F(...u.horizon)}},vertexShader:"varying float altitude; void main(){altitude=position.y/134.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform vec3 zenith; uniform vec3 horizon; varying float altitude; void main(){vec3 sky=mix(horizon,zenith,smoothstep(-.035,.34,altitude));gl_FragColor=vec4(sky,1.);}"}));N.name="park-sky",N.renderOrder=-10,x.add(N),D=Su(p.layout),x.add(D.root);let Y=new Cn({colorWrite:!1}),xt=new ci(u.shadow,24),_t=new Je({color:"#536848",transparent:!0,opacity:.15});[{look:e,neck:n,detail:1},...p.cpus.map((Bt,At)=>({look:r[At]&&r[At].look||e,neck:null,detail:.6}))].forEach((Bt,At)=>{let Jt=Rs(Bt.look,Bt.neck,{detail:Bt.detail});Jt.scale.setScalar(E),Jt.rotation.y=Math.PI;let Z=[],et=[];if(At){let ot=[];Jt.traverse(ct=>{ct.isMesh&&ot.push(ct)});for(let ct of ot){ct.castShadow=!1;for(let It of[].concat(ct.material))Z.includes(It)||(It.transparent=!0,Z.push(It));let ut=new fe(ct.geometry,Y);ut.renderOrder=1,ut.visible=!1,ut.castShadow=!1,ut.frustumCulled=ct.frustumCulled,ct.add(ut),et.push(ut)}}let $=new fe(xt,_t);$.rotation.x=-Math.PI/2,x.add(Jt,$),ft.push({pet:Jt,shadow:$,mats:Z,depth:et,fade:1})}),w.position.set(0,2.8,6),jt()}function jt(){if(!b)return;let N=t.getBoundingClientRect();N.width<1||N.height<1||(b.setSize(N.width,N.height,!1),w.aspect=N.width/N.height,w.fov=N.width>N.height?54:60,w.updateProjectionMatrix(),G=0)}function Ft(N,Y,xt){if(Et.hidden=N==null,Et.className="run-over"+(xt?" "+xt:""),t.classList.toggle("menu",N!=null),Et.innerHTML=N==null?"":`<div class="run-card">${N}</div>`,$t(),N!=null){let _t=Et.querySelector(Y||".btn.primary")||Et.querySelector("button");if(_t)try{_t.focus({preventScroll:!0})}catch{}}return Et}function $t(){let N=p.status==="running"||p.status==="countdown";st("pause").hidden=!N||!Et.hidden,st("help").hidden=N&&Et.hidden||nt}let Ot=()=>h?'<button class="btn" type="button" data-m="select">\u30B3\u30FC\u30B9\u3092 \u3048\u3089\u3076</button>':"";function le(N){let Y=N.querySelector('[data-m="select"]');Y&&Y.addEventListener("click",()=>h())}function Gt(){pt=null;let N=Ft(`<span class="run-over-l">\u30EC\u30FC\u30B9\u30FB${u.level}</span><h2>${u.name}</h2>
      <p class="run-sub">${s}\u3068 \u304A\u3068\u3082\u3060\u3061 ${P-1}\u3072\u304D\u3067\u3001<br>\u30B4\u30FC\u30EB\u307E\u3067 \u304D\u3087\u3046\u305D\u3046\uFF01</p>
      ${o?`<p class="run-best">\u30D9\u30B9\u30C8 <b>${mi(o)}</b></p>`:""}
      <div class="btnrow">${Ot()}<button class="btn primary" type="button" data-m="go">\u306F\u3057\u308B</button></div>`,'[data-m="go"]',"top");N.querySelector('[data-m="go"]').addEventListener("click",X),le(N)}function R(N){pt=N,Ft(`<h2>\u3042\u305D\u3073\u304B\u305F</h2>${hc(m)}<div class="btnrow"><button class="btn primary" type="button" data-m="ok">\u308F\u304B\u3063\u305F</button></div>`).querySelector('[data-m="ok"]').addEventListener("click",S)}function S(){let N=pt;pt=null,N&&N()}function X(){Q=null,pt=null,Ft(null),p.start(),ee(),$t();try{mt.focus({preventScroll:!0})}catch{}}function rt(){if(Q=null,p.pause(),p.status!=="paused")return;pt=null;let N=Ft(`<h2>\u3072\u3068\u3084\u3059\u307F</h2><p class="run-sub">${u.name}\u306E \u3068\u3061\u3085\u3046\u3060\u3088</p>
      <div class="btnrow"><button class="btn" type="button" data-m="restart">\u3055\u3044\u3057\u3087\u304B\u3089</button><button class="btn primary" type="button" data-m="resume">\u3064\u3065\u3051\u308B</button></div>
      ${h?`<div class="btnrow run-more">${Ot()}</div>`:""}`,'[data-m="resume"]');N.querySelector('[data-m="resume"]').addEventListener("click",dt),N.querySelector('[data-m="restart"]').addEventListener("click",at),le(N),ee()}function dt(){Ft(null),p.resume(),q=performance.now(),ee(),$t();try{mt.focus({preventScroll:!0})}catch{}}function at(){p.reset(),D.resetTreats(),w.position.set(0,2.8,6),ht=6,q=performance.now(),T++,Dt=null,X()}let Dt=null;function bt(N){let Y=p.result,xt=Y.rank===1,_t=Y.standings.map(({id:ct,time:ut},It)=>`<li${ct===p.player.id?' class="me"':""}><span>${It+1}\u4F4D</span><span>${k.get(ct)}</span><b>${mi(ut)}</b></li>`).join(""),Bt=C&&d?`<button class="btn primary run-next" type="button" data-m="next" aria-label="\u3064\u304E\u306E \u30B3\u30FC\u30B9\u300C${C.name}\u300D\u3078">\u3064\u304E\u306E \u30B3\u30FC\u30B9\u3078<small>${C.name}</small></button>`:"",At=`<button class="btn${Bt?"":" primary"}" type="button" data-m="exit">\u304A\u308F\u308B</button>`,Jt=(h?Ot():"")+(Bt?At:""),Z=Ft(`<span class="run-over-l">${u.name}</span>
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
      ${Jt?`<div class="btnrow run-more">${Jt}</div>`:""}`,'[data-m="again"]');Z.querySelector('[data-m="again"]').addEventListener("click",at),Z.querySelector('[data-m="exit"]').addEventListener("click",()=>c());let et=Z.querySelector('[data-m="next"]');if(et&&et.addEventListener("click",()=>d(C.id)),le(Z),!N)return;Dt=null;let $=++T,ot;try{ot=f({course:m,ms:vr(Y.time),time:Y.time,rank:Y.rank,misses:Y.hits+Y.turnMisses,treats:Y.treats,hits:Y.hits,turnMisses:Y.turnMisses})}catch{ot=null}Promise.resolve(ot).then(ct=>ct,()=>null).then(ct=>{if(O||$!==T)return;Dt=ct||"";let ut=tt("rec");ut&&(ut.innerHTML=Dt)})}function wt(N,Y){Q=null,p.pause(),nt=!0,Ft(`<h2>${N}</h2><p class="run-sub">${Y}</p><div class="btnrow"><button class="btn primary" type="button" data-m="exit">\u3068\u3058\u308B</button></div>`).querySelector('[data-m="exit"]').addEventListener("click",()=>c())}function ee(){tt("rank").textContent=p.rank,tt("treats").textContent=p.treatCount;let N=Math.min(100,p.player.s/_*100);tt("fill").style.width=N+"%",t.querySelector(".run-progress").setAttribute("aria-valuenow",Math.round(N)),tt("clock").textContent=yr(p.time),St.hidden=p.status==="paused",St.style.left=N+"%",p.cpus.forEach((Bt,At)=>{Ut[At].style.left=Math.max(0,Math.min(100,Bt.s/_*100))+"%"});let Y=p.player.boost>0,xt=p.gauge===ie.gaugeMax&&!Y;tt("gaugeN").textContent=Y?`${p.player.boost.toFixed(1)}\u79D2`:`${p.gauge} / ${ie.gaugeMax}`,tt("gauge").style.width=p.gauge/ie.gaugeMax*100+"%",t.querySelector(".run-gauge").setAttribute("aria-valuenow",p.gauge),t.classList.toggle("dash-ready",xt),t.classList.toggle("boosting",Y),tt("hint").textContent=Y?"\u30C0\u30C3\u30B7\u30E5\u3061\u3085\u3046":xt?"\u30BF\u30C3\u30D7\u3067 \u30C0\u30C3\u30B7\u30E5":"\u30C0\u30C3\u30B7\u30E5",gt();let _t=p.status==="countdown"?String(Math.ceil(p.countdown)):"";_t!==yt&&(yt=_t,tt("count").textContent=_t,tt("count").classList.toggle("show",!!_t))}function gt(){let N=p.status==="running"?p.turnCue:null,Y=tt("cue");if(Y.hidden=!N,t.classList.toggle("turn-visible",!!N),!N){W="";return}let xt=N.direction==="right",_t=xt?"\u307F\u304E":"\u3072\u3060\u308A",Bt=N.waiting?"waiting":N.armed?"armed":N.active?"active":"ahead",At=N.waiting?`${_t}\u3078 \u30B9\u30EF\u30A4\u30D7`:N.armed?p.player.s>=N.start?`${_t}\u30AB\u30FC\u30D6`:`${_t}\u3078 OK`:N.active?`${_t}\u3078 \u30B9\u30EF\u30A4\u30D7`:`\u3053\u306E \u3055\u304D ${_t}\u30AB\u30FC\u30D6`,Jt=`${N.id}:${Bt}:${At}`;Jt!==W&&(W=Jt,Y.dataset.state=Bt,Y.innerHTML=`<strong aria-hidden="true">${xt?"\u21B1":"\u21B0"}</strong><span><small>\u307E\u304C\u308A\u304B\u3069 ${N.id+1} / ${p.layout.turns.length}</small><b>${At}</b></span>${N.armed?'<i aria-hidden="true">\u2713</i>':""}`)}function Pt(N){if(O)return;z=requestAnimationFrame(Pt);let Y=q?Math.max(0,Math.min(.2,(N-q)/1e3)):0;q=N;let xt=Math.max(1,Math.ceil(Y/.05));for(let $=0;$<xt;$++)p.step(Y/xt);for(let $ of p.drainEvents())$.type==="treat"?D.collectTreat($.id):$.type==="finish"&&bt(!0);if(!(p.status==="running"||p.status==="countdown")&&G&&N-G<100)return;G=N||1;let Bt=Pa(p,!1);[p.player,...p.cpus].forEach(($,ot)=>{if(p.status==="paused")return;let ct=ft[ot],{pet:ut,shadow:It}=ct,Kt=ot===0&&p.waitingTurn!==null;if(ot){let ke=p.player.s-$.s,Ee=ke>.4&&ke<ht+.5&&Math.abs($.x-p.player.x)<1.35?.32:1;if(ct.fade!==Ee){ct.fade+=(Ee-ct.fade)*Math.min(1,Y*8||1),Math.abs(ct.fade-Ee)<.01&&(ct.fade=Ee);for(let ye of ct.mats)ye.opacity=ct.fade;for(let ye of ct.depth)ye.visible=ct.fade<1}}let Wt=p.status==="running"&&$.finishTime===null&&!Kt,te=M($.s,$.x),De=$n($.s,0,0,p.layout.turns);ut.position.set(te.x,$.y+(Wt&&!g?Math.abs(Math.cos($.phase*1.85))*.025:0),te.z),ut.rotation.order="YXZ",ut.rotation.x=0,ut.rotation.y=Math.PI-te.heading,ut.rotation.z=Wt&&!g?($.lane*ie.lanewidth-$.x)*.07+(De?De.direction==="right"?.08:-.08:0):0,La(ut,$.phase,Wt,$.jumpElapsed!==null,Bt),Is(ut,N/1e3+ot,Wt,{legs:!1,phase:$.phase,airborne:$.jumpElapsed!==null,reduced:g}),It.position.set(te.x,.035,te.z),It.scale.setScalar($.jumpElapsed!==null?.7:1)});let At=p.player;ht+=((y?Math.min(8.65,Math.max(6,3.58/w.aspect)):6)-ht)*(1-Math.exp(-Y*5));let Jt=M(At.s,At.x),Z;if(y)Z=v(At,ht,2.8+(g?0:At.y*.18));else{let $=w.position.y+(2.8+(g?0:At.y*.18)-w.position.y)*(1-Math.exp(-Y*6));Z=pi(Jt,{distance:ht,height:$,lookHeight:1})}w.position.set(Z.position.x,Z.position.y,Z.position.z),w.lookAt(Z.target.x,Z.target.y,Z.target.z);let et=Z.zoom??1;Math.abs(w.zoom-et)>1e-5&&(w.zoom=et,w.updateProjectionMatrix()),x.getObjectByName("park-sky").position.copy(w.position),I.position.set(Jt.x-7,12,Jt.z+6),I.target.position.set(Jt.x,0,Jt.z),lt+=Y,lt>.08||p.status==="countdown"?(ee(),lt=0):!y&&p.status==="running"&&gt(),b.render(x,w),it++}function Nt(N){if(!(!N.isPrimary||p.status!=="running"||Q)){Q={id:N.pointerId,x:N.clientX,y:N.clientY,time:performance.now(),used:!1,tap:!0};try{mt.setPointerCapture(N.pointerId)}catch{}}}function Yt(N,Y){if(!Q||Q.id!==N.pointerId||Q.used)return;let xt=N.clientX-Q.x,_t=N.clientY-Q.y;Math.hypot(xt,_t)>=12&&(Q.tap=!1);let Bt=Fa(xt,_t,performance.now()-Q.time,!!u.flick);!Bt||Bt==="dash"&&(!Y||!Q.tap)||(Q.used=!0,p.input(Bt))}let Rt=N=>Yt(N,!1),se=N=>{Q&&Q.id===N.pointerId&&(Q=null)},Qt=N=>{Yt(N,!0),se(N)};function ce(N){if(N.target&&N.target.closest&&N.target.closest("button,summary"))return;let Y={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"jump",ArrowDown:"brake"," ":"dash"};Y[N.key]&&(N.preventDefault(),N.repeat||p.input(Y[N.key]))}let B=()=>{document.hidden&&rt()},vt=N=>{O||(N.preventDefault(),wt("3D\u306E \u304C\u3081\u3093\u304C \u3068\u307E\u3063\u305F\u3088","\u3044\u3061\u3069 \u3068\u3058\u3066\u3001<br>\u3082\u3046\u3044\u3061\u3069 \u3072\u3089\u3044\u3066\u306D"))};mt.addEventListener("pointerdown",Nt),mt.addEventListener("pointermove",Rt),mt.addEventListener("pointerup",Qt),mt.addEventListener("pointercancel",se),mt.addEventListener("lostpointercapture",se),mt.addEventListener("webglcontextlost",vt),t.addEventListener("keydown",ce),st("x").addEventListener("click",()=>{p.status==="running"||p.status==="countdown"?rt():c()}),st("pause").addEventListener("click",rt),st("help").addEventListener("click",()=>{if(pt)return;let N=p.status;R(N==="paused"?rt:N==="finished"?()=>bt(!1):Gt)}),document.addEventListener("visibilitychange",B),addEventListener("blur",rt),addEventListener("pagehide",rt),addEventListener("resize",jt);let j=typeof ResizeObserver=="function"?new ResizeObserver(jt):null;j&&j.observe(t);let L=!0;try{U(),Gt(),z=requestAnimationFrame(Pt)}catch(N){L=!1,console.error("run: 3D unavailable",N),wt("3D\u306E \u304C\u3081\u3093\u3092 \u3072\u3089\u3051\u307E\u305B\u3093\u3067\u3057\u305F","\u3053\u306E\u7AEF\u672B\u3067\u306F \u3042\u305D\u3079\u306A\u3044\u307F\u305F\u3044")}return{ok:L,get sim(){return p},get renderer(){return b},get frames(){return it},get status(){return nt?"lost":p.status},course:m,pause:rt,escape(){return nt?!1:pt?(S(),!0):p.status==="running"||p.status==="countdown"?(rt(),!0):!1},dispose(){if(O)return;O=!0,cancelAnimationFrame(z),mt.removeEventListener("webglcontextlost",vt),j&&j.disconnect(),t.removeEventListener("keydown",ce),document.removeEventListener("visibilitychange",B),removeEventListener("blur",rt),removeEventListener("pagehide",rt),removeEventListener("resize",jt);for(let{pet:xt}of ft)Ps(xt);let N=new Set,Y=new Set;x&&x.traverse(xt=>{xt.geometry&&N.add(xt.geometry),xt.material&&[].concat(xt.material).forEach(_t=>Y.add(_t)),xt.isInstancedMesh&&xt.dispose()}),N.forEach(xt=>xt.dispose()),Y.forEach(xt=>xt.dispose()),I&&I.dispose(),b&&(b.dispose(),b.forceContextLoss()),t.innerHTML=""}}}var zx=Math.PI*10/2,kx=[{straight:48},{turn:1},{straight:34},{turn:1},{straight:44},{turn:1},{straight:24},{turn:1},{straight:30}],uc=-24,dc=24,Oi=0,Ba=0,Cu=kx.map(i=>{let t=i.straight??zx,e={start:Ba,end:Ba+t,x:uc,z:dc,heading:Oi,radius:10,turn:i.turn||0};if(i.turn){let n=Oi+i.turn*Math.PI/2;uc+=10/i.turn*(Math.cos(Oi)-Math.cos(n)),dc+=10/i.turn*(Math.sin(Oi)-Math.sin(n)),Oi=n}else uc+=Math.sin(Oi)*t,dc-=Math.cos(Oi)*t;return Ba+=t,e}),Ru=Ba,Iu={minX:-38,maxX:44,minZ:-48,maxZ:44};function fc(i,t=0){let e=Cu.find(o=>i<=o.end)||Cu.at(-1),n=i-e.start,{x:s,z:r,heading:a}=e;if(e.turn){let o=a+e.turn*n/e.radius;s+=e.radius/e.turn*(Math.cos(a)-Math.cos(o)),r+=e.radius/e.turn*(Math.sin(a)-Math.sin(o)),a=o}else s+=Math.sin(a)*n,r-=Math.cos(a)*n;return{x:s+Math.cos(a)*t,z:r+Math.sin(a)*t,heading:a}}var Le=Object.freeze({count:6,spacing:3.6,offset:.9,speed:8,approach:4,exit:1.6,minOffset:.48,maxOffset:1.35}),In=(i,t)=>i.s+(t-(Le.count-1)/2)*Le.spacing,Us=(i,t)=>(i.startSide??-1)*(t%2?-1:1),za=i=>In(i,0)-Le.approach,ka=i=>In(i,Le.count-1)+Le.exit;var Bi={length:Ru,speed:11.25,penalty:5};function Vx(){return{length:Bi.length,point:fc,bounds:Iu,theme:"field",turns:[],treats:[],obstacles:[{id:0,s:24,lane:0,type:"hurdle"},{id:1,s:76,lane:-1,type:"hoop"},{id:2,s:130,lane:1,type:"tunnel"},{id:3,s:148,lane:0,type:"hurdle"},{id:4,s:187,lane:1,type:"hoop"},{id:5,s:226,lane:0,type:"tunnel"}]}}function Hx(i="first-field"){let t=Vx();return t.courseId=["balance","zigzag","hill-field"].includes(i)?i:"first-field",i==="balance"&&(t.obstacles=[{id:0,s:24,lane:0,type:"hoop"},{id:1,s:76,lane:-1,type:"seesaw"},{id:2,s:130,lane:1,type:"tunnel"},{id:3,s:148,lane:0,type:"hurdle"},{id:4,s:187,lane:1,type:"hoop"},{id:5,s:226,lane:0,type:"seesaw"}]),i==="zigzag"&&(t.obstacles=[{id:0,s:24,lane:0,type:"hurdle"},{id:1,s:80,lane:0,type:"slalom",startSide:-1},{id:2,s:130,lane:1,type:"tunnel"},{id:3,s:148,lane:0,type:"hurdle"},{id:4,s:185,lane:0,type:"slalom",startSide:1},{id:5,s:226,lane:0,type:"hoop"}]),i==="hill-field"&&(t.length=196,t.obstacles=[{id:0,s:18,lane:0,type:"a-frame"},{id:1,s:38,lane:1,type:"hurdle"},{id:2,s:81,lane:-1,type:"tunnel"},{id:3,s:130,lane:-1,type:"a-frame"},{id:4,s:150,lane:0,type:"hoop"},{id:5,s:185,lane:1,type:"hurdle"}]),t}var Mr=class{constructor(t="first-field"){this.layout=Hx(t),this.reset()}reset(){this.status="ready",this.previousStatus=null,this.countdown=3,this.time=0,this.stopped=!1,this.player={id:"player",s:0,x:0,lane:0,y:0,surfaceY:0,pitch:0,jumpElapsed:null,phase:0,slow:0,boost:0,finishTime:null,hits:0},this.cpus=[],this.results=new Map,this.tunnelEntries=new Map,this.rampPass=null,this.seesaws=new Map(this.layout.obstacles.filter(t=>t.type==="seesaw").map(t=>[t.id,{phase:"idle",angle:_e.angle,elapsed:0,failed:!1}])),this.slaloms=new Map(this.layout.obstacles.filter(t=>t.type==="slalom").map(t=>[t.id,{index:0,side:0,passed:[],failed:!1}])),this.cleared=0,this.faults=0,this.events=[],this.result=null}start(){this.status==="ready"&&(this.status="countdown")}pause(){["countdown","running"].includes(this.status)&&(this.previousStatus=this.status,this.status="paused")}resume(){this.status==="paused"&&(this.status=this.previousStatus,this.previousStatus=null)}get nextObstacle(){return this.layout.obstacles.find(t=>!this.results.has(t.id))}get activeSeesaw(){let t=this.layout.obstacles.find(e=>e.type==="seesaw"&&["approach","hold","tipping","ready","exit"].includes(this.seesaws.get(e.id).phase));return t?{obstacle:t,state:this.seesaws.get(t.id)}:null}get activeSlalom(){let t=this.layout.obstacles.find(e=>e.type==="slalom"&&!this.results.has(e.id)&&this.player.s>=za(e)&&this.player.s<ka(e));return t?{obstacle:t,state:this.slaloms.get(t.id)}:null}get targetX(){let t=this.activeSlalom;return t?t.obstacle.lane*2+t.state.side*Le.offset:this.player.lane*2}inTunnel(){return this.layout.obstacles.some(t=>t.type==="tunnel"&&Math.abs(this.player.s-t.s)<3.4&&Math.abs(this.player.x-t.lane*2)<.8)}input(t){if(this.status!=="running")return!1;let e=this.player,n=this.activeSeesaw;if(t==="brake")return this.stopped=!0,n?.state.phase==="approach"&&e.s-n.obstacle.s>=_e.stopFrom&&(n.state.phase="hold",n.state.elapsed=0),!0;if(t==="dash")return!this.stopped||n&&["hold","tipping"].includes(n.state.phase)?!1:(n?.state.phase==="ready"&&(n.state.phase="exit"),this.stopped=!1,!0);if(n||this.rampPass)return!1;let s=this.activeSlalom;return s?t==="left"||t==="right"?(s.state.side=t==="left"?-1:1,!0):!1:this.inTunnel()?!1:t==="left"||t==="right"?(e.lane=Math.max(-1,Math.min(1,e.lane+(t==="left"?-1:1))),!0):t==="jump"&&!this.stopped&&e.jumpElapsed===null?(e.jumpElapsed=0,!0):!1}score(t,e,n){this.results.has(t.id)||(this.results.set(t.id,!!e),e?(this.cleared++,this.events.push({type:"obstacle-clear",id:t.id})):(this.faults++,this.player.hits++,this.player.slow=.65,this.events.push({type:"obstacle-miss",id:t.id,reason:n})))}updateSlalom(t){let e=this.player,n=t.s;for(let s of this.layout.obstacles){if(s.type!=="slalom"||this.results.has(s.id))continue;let r=this.slaloms.get(s.id);for(n<za(s)&&e.s>=za(s)&&(e.lane=s.lane);r.index<Le.count&&e.s>=In(s,r.index);){let a=fi(In(s,r.index),t,e.s),o=a&&(a.x-s.lane*2)*Us(s,r.index),l=!!a&&o>=Le.minOffset&&o<=Le.maxOffset&&a.y<.25;r.passed.push(l),r.failed||=!l,r.index++}n<ka(s)&&e.s>=ka(s)&&(e.lane=s.lane,this.score(s,!r.failed&&r.index===Le.count,"slalom"))}}updateAFrame(t){let e=this.player,n=this.rampPass?.obstacle??this.nextObstacle;if(n?.type!=="a-frame")return;let s=n.s-Pe.run,r=n.s+Pe.run,a=fi(s,t,e.s);if(a){let l=n.lane*2,c=a.x,h=Math.abs(c-l)<=Pe.entryTolerance;this.rampPass={obstacle:n,onBoard:h,clear:h&&a.grounded},h?(e.lane=n.lane,e.x=l):(e.lane-n.lane)*(c-l)<=0&&(e.lane=n.lane+Math.sign(c-l))}if(!this.rampPass)return;let o=mr(e.jumpElapsed);this.rampPass.onBoard&&(e.surfaceY=Ls(e.s-n.s),e.y=e.surfaceY+o,e.pitch=su(e.s-n.s)),e.s>=r&&(this.score(n,this.rampPass.clear,this.rampPass.onBoard?"ramp-jump":"ramp-entry"),this.rampPass=null,e.surfaceY=0,e.y=o,e.pitch=0)}updateSeesaw(t){let e=this.player,n=au(),s=t.dt;for(let r of this.layout.obstacles){if(r.type!=="seesaw"||this.results.has(r.id))continue;let a=this.seesaws.get(r.id),o=fi(r.s-n,t,e.s);a.phase==="idle"&&o&&(Math.abs(o.x-r.lane*2)<.48&&o.grounded?(a.phase="approach",e.s=r.s-n+(e.s-(r.s-n))*_e.speed/Bi.speed,e.lane=r.lane,e.x=r.lane*2):(a.phase="missed",a.failed=!0)),a.phase==="approach"&&e.s>=r.s+_e.stopTo&&(e.s=r.s+_e.stopTo,this.stopped=!0,a.failed=!0,a.phase="hold",a.elapsed=0,this.events.push({type:"seesaw-recover"})),a.phase==="hold"?(a.elapsed+=s,a.elapsed>=_e.hold&&(a.phase="tipping",a.elapsed=0)):a.phase==="tipping"&&(a.elapsed=Math.min(_e.tipDuration,a.elapsed+s),a.angle=ou(a.elapsed/_e.tipDuration),a.elapsed>=_e.tipDuration&&(a.phase="ready")),["approach","hold","tipping","ready","exit"].includes(a.phase)&&(e.x=r.lane*2,e.surfaceY=Ia(e.s-r.s,a.angle),e.y=e.surfaceY,e.pitch=-a.angle),e.s>=r.s+n&&(this.score(r,a.phase==="exit"&&!a.failed,a.phase==="missed"?"board-entry":"board-stop"),a.phase="done",e.surfaceY=0,e.y=0,e.pitch=0)}}step(t){if(!Number.isFinite(t)||t<=0||t>.1)return;if(this.status==="countdown"){this.countdown=Math.max(0,this.countdown-t),this.countdown===0&&(this.status="running",this.events.push({type:"go"}));return}if(this.status!=="running")return;let e=this.player,n=e.s,s=this.time,r={s:n,x:e.x,target:this.targetX,jump:e.jumpElapsed,dt:t};this.time+=t,e.slow=Math.max(0,e.slow-t),e.jumpElapsed!==null&&(e.jumpElapsed+=t,e.jumpElapsed>=ie.jumpDuration?(e.jumpElapsed=null,e.y=0):e.y=mr(e.jumpElapsed)),e.x=pr(e.x,r.target,t),this.stopped||(e.s+=(this.activeSeesaw?_e.speed:this.activeSlalom?Le.speed:Bi.speed)*(e.slow>0?.65:1)*t),this.updateAFrame(r),this.updateSeesaw(r),this.updateSlalom(r),e.phase+=e.s-n;for(let a of this.layout.obstacles){if(this.results.has(a.id)||a.type==="seesaw"||a.type==="slalom"||a.type==="a-frame")continue;let o=a.type==="tunnel";if(o){let h=fi(a.s-3,r,e.s);h&&this.tunnelEntries.set(a.id,Math.abs(h.x-a.lane*2)<.72&&h.y<.55)}let l=fi(a.s+(o?3:0),r,e.s);if(!l)continue;let c=Math.abs(l.x-a.lane*2)<.72;if(o){let h=this.tunnelEntries.get(a.id);this.score(a,h&&c&&l.y<.55,h?"tunnel-exit":"tunnel-entry")}else{let h=a.type==="hurdle"?l.y>=.74:l.y>=.7&&l.y<=1.6;this.score(a,c&&h,c?"jump-low":"off-line")}}e.s>=this.layout.length&&(e.finishTime=s+t*(this.layout.length-n)/(e.s-n),e.s=this.layout.length,this.time=e.finishTime,this.status="finished",this.result={time:this.time,penalty:this.faults*Bi.penalty,total:this.time+this.faults*Bi.penalty,cleared:this.cleared,faults:this.faults},this.events.push({type:"finish"}))}drainEvents(){let t=this.events;return this.events=[],t}};function Pu(i){let t=new Re;t.name="agility-arena";let e=i.bounds,n=i.point,s={"first-field":{lawn:"#a5c27a",leaves:"#85ab59",roof:"#d67d55",hill:"#b1cfaa",tree:"round"},zigzag:{lawn:"#9cc39a",leaves:"#528d78",roof:"#478c92",hill:"#98c5bb",tree:"pine"},balance:{lawn:"#bec682",leaves:"#96a451",roof:"#c79748",hill:"#becc9d",tree:"round"},"hill-field":{lawn:"#99be80",leaves:"#679b71",roof:"#537d9e",hill:"#9dbcb3",tree:"pine"}},r=s[i.courseId]??s["first-field"],a=new Map,o=k=>(a.has(k)||a.set(k,new Je({color:k,roughness:1})),a.get(k));function l(k,tt,st=0,mt=0,Et=0,Ut=t){let St=new fe(k,o(tt));return St.position.set(st,mt,Et),St.receiveShadow=!0,Ut.add(St),St}let c=(k,tt,st,mt,Et,Ut,St,U=t)=>l(new Te(k,tt,st),mt,Et,Ut,St,U),h=(k,tt,st,mt,Et,Ut,St=t)=>l(new ue(k,k,tt,9),st,mt,Et,Ut,St),d=741,f=()=>(d=Math.imul(d,1664525)+1013904223>>>0,d/4294967296);function u(k,tt,st,mt){let Et=new Pi(tt,o(st),mt.length),Ut=new Ne;Et.name=k;for(let St=0;St<mt.length;St++){let U=mt[St];Ut.position.set(U.x,U.y,U.z),Ut.scale.set(U.sx??1,U.sy??1,U.sz??1),Ut.rotation.set(0,U.angle??0,0),Ut.updateMatrix(),Et.setMatrixAt(St,Ut.matrix)}return Et.receiveShadow=!0,t.add(Et),Et}let m=new ps(400,400,90,90);m.rotateX(-Math.PI/2);let y=[],p=new zt;for(let k=0;k<m.attributes.position.count;k++){let tt=m.attributes.position.getX(k),st=m.attributes.position.getZ(k),mt=.011*Math.sin(st*.29)+.008*Math.cos(tt*.12);p.set(r.lawn).offsetHSL(0,0,mt),y.push(p.r,p.g,p.b)}m.setAttribute("color",new qt(y,3));let g=new fe(m,new Je({vertexColors:!0,roughness:1}));g.name="open-lawn",g.position.y=-.035,g.receiveShadow=!0,t.add(g);let v=new xe;v.setAttribute("position",new qt([-.07,0,0,.07,0,0,.025,.2,0,0,0,-.07,0,0,.07,-.02,.17,.02],3)),v.computeVertexNormals();let M=[];for(let k=0;k<2300;k++){let tt=.4+f()*.7;M.push({x:e.minX+f()*(e.maxX-e.minX),y:-.015,z:e.minZ+f()*(e.maxZ-e.minZ),sx:tt,sy:tt,sz:tt,angle:f()*Math.PI})}let _=u("grass-tufts",v,"#91ad72",M);_.material.side=Ie;let P=[],E=[],C=[[e.minX,e.minZ],[e.maxX,e.minZ],[e.maxX,e.maxZ],[e.minX,e.maxZ]];for(let k=0;k<4;k++){let tt=C[k],st=C[(k+1)%4],mt=Math.hypot(st[0]-tt[0],st[1]-tt[1]),Et=Math.ceil(mt/4),Ut=-Math.atan2(st[0]-tt[0],tt[1]-st[1]);for(let St=0;St<Et;St++){let U=St/Et,jt=tt[0]+(st[0]-tt[0])*U,Ft=tt[1]+(st[1]-tt[1])*U;P.push({x:jt,y:.85,z:Ft});for(let $t of[.65,1.25])E.push({x:jt+(st[0]-tt[0])/Et/2,y:$t,z:Ft+(st[1]-tt[1])/Et/2,sz:mt/Et,angle:Ut})}}u("perimeter-posts",new Te(.2,1.7,.2),"#d4c4a2",P),u("perimeter-rails",new Te(.13,.16,1),"#e5d7b8",E);let T=[],b=[];for(let k=0;k<30;k++){let tt=k%4,st=(Math.floor(k/4)+.5)/8,mt,Et;tt<2?(mt=tt?e.maxX+7:e.minX-7,Et=e.minZ+st*(e.maxZ-e.minZ)):(mt=e.minX+st*(e.maxX-e.minX),Et=tt===2?e.minZ-7:e.maxZ+7),T.push({x:mt,y:2.2,z:Et}),b.push({x:mt,y:5.2,z:Et,sx:2.1,sy:2.5,sz:2.1}),b.push({x:mt+.8,y:6.8,z:Et-.3,sx:1.7,sy:1.8,sz:1.7})}u("arena-trees",new ue(.22,.3,4.4,8),"#8c7c57",T);let x=r.tree==="pine"?new We(1,2.35,7):new Be(1,1),w=u("arena-canopies",x,r.leaves,b);w.material.flatShading=!0;for(let k=0;k<7;k++){let tt=k*Math.PI*2/7,st=l(new Be(1,1),r.hill,Math.cos(tt)*135,0,Math.sin(tt)*135);st.scale.set(44,(i.courseId==="hill-field"?20:10)+k%3*3,36),st.material.flatShading=!0}let I=new Re;I.position.set(e.maxX+9,0,10),t.add(I);for(let k of[-2.7,2.7])for(let tt of[-2.7,2.7])c(.22,3.4,.22,"#a2926e",k,1.7,tt,I);let D=l(new We(4.5,1.5,4),r.roof,0,4.1,0,I);D.rotation.y=Math.PI/4;for(let k of[-1,1])c(6.3,.24,.12,"#fff0cf",0,3.27,k*3.07,I),c(.12,.24,6.3,"#fff0cf",k*3.07,3.27,0,I);let z=new Map,q=new Map,G=new Map,lt=new Map;for(let k of i.obstacles){let tt=n(k.s,k.lane*2),st=new Re;if(st.name="race-obstacle",st.userData.obstacleId=k.id,st.position.set(tt.x,0,tt.z),st.rotation.y=-tt.heading,t.add(st),z.set(k.id,st),k.type==="hurdle"){for(let St of[-.8,.8])c(.12,1.1,.14,"#5c8eab",St,.55,0,st),c(.45,.08,.65,"#5c8eab",St,.04,0,st);for(let St=0;St<8;St++)c(.2,.11,.1,St%2?"#c87961":"#fff1d5",-.7+St*.2,.74,0,st)}else if(k.type==="hoop"){l(new pn(1.2,.09,10,40),"#e0b34f",0,1.7,0,st);for(let St of[-1.35,1.35])c(.1,2.6,.12,"#5c8eab",St,1.3,0,st),c(.18,.08,.08,"#78909a",St*.945,1.7,0,st),c(.5,.08,.7,"#5c8eab",St,.04,0,st)}else if(k.type==="a-frame")ru(st,c);else if(k.type==="slalom"){let St=[];lt.set(k.id,St);for(let U=0;U<Le.count;U++){let jt=new Re;jt.name="slalom-pole",jt.userData={obstacleId:k.id,poleIndex:U},jt.position.z=k.s-In(k,U),st.add(jt),h(.075,1.9,"#f5eed8",0,.95,0,jt);let Ft=h(.079,.55,"#548cba",0,1.35,0,jt);Ft.material=Ft.material.clone(),St.push(Ft),h(.08,.3,"#548cba",0,.35,0,jt),c(.38,.045,.38,"#c9c4a7",0,.025,0,jt)}}else if(k.type==="seesaw"){let St=new Re;St.name="rigid-plank",St.userData.obstacleId=k.id,St.position.y=_e.pivotHeight,St.rotation.x=_e.angle,st.add(St),G.set(k.id,St),c(_e.width,_e.thickness,5.2,"#548cba",0,0,0,St);for(let jt of[-3.3,3.3])c(_e.width,_e.thickness,1.4,"#edcb62",0,0,jt,St);for(let jt of[-.72,.72]){for(let Ft of[-1,1]){let $t=c(.12,1.05,.12,"#748889",jt,.47,Ft*.23,st);$t.rotation.x=Ft*-.46}c(.18,.08,1.15,"#748889",jt,.04,0,st)}let U=h(.052,1.7,"#a6b2ad",0,_e.pivotHeight,0,st);U.name="seesaw-axle",U.rotation.z=Math.PI/2}else gr(st,l),c(.12,.1,6,"#548cba",-1.58,.05,0,st),c(.12,.1,6,"#548cba",1.58,.05,0,st);h(.045,.9,"#ad9f7d",2.7,.45,1,st);let mt=c(.68,.8,.1,"#f5eed8",2.7,1.12,1,st);mt.material=mt.material.clone(),q.set(k.id,mt);let Et=["bc","abged","abgcd","fgbc","afgcd","afgecd"],Ut={a:[0,.27,.28,.045],g:[0,0,.28,.045],d:[0,-.27,.28,.045],f:[-.15,.14,.045,.22],b:[.15,.14,.045,.22],e:[-.15,-.14,.045,.22],c:[.15,-.14,.045,.22]};for(let St of Et[k.id]){let[U,jt,Ft,$t]=Ut[St];c(Ft,$t,.015,"#48684f",2.7+U,1.12+jt,1.06,st)}}let O=new Re;O.name="next-obstacle-marker",t.add(O);let Q=l(new Ma(1.8,1.95,48),"#e9cf76",0,.015,0,O);Q.rotation.x=-Math.PI/2,Q.material=Q.material.clone(),Q.material.transparent=!0,Q.material.opacity=.65;let pt=new Re,it=n(i.length);pt.name="finish-gate",pt.position.set(it.x,0,it.z),pt.rotation.y=-it.heading,t.add(pt);let ht=n(0);for(let[k,tt]of[[pt,"#e8c86b"]])for(let st of[-2.8,2.8])h(.055,1.8,"#f5eed8",st,.9,0,k),c(.65,.43,.035,tt,st+.3,1.5,0,k),c(.32,.06,.32,"#c9c4a7",st,.03,0,k);for(let k of[-2.8,2.8])h(.055,1.3,"#f5eed8",ht.x+k,.65,ht.z),c(.55,.35,.035,"#83aabd",ht.x+k+.25,1.05,ht.z);let yt="";function W(k){let tt=k.nextObstacle,st=`${tt?.id}:${k.results.size}:${[...k.slaloms.values()].map(mt=>mt.index).join(",")}`;if(st!==yt){if(yt=st,O.visible=!!tt,O.scale.setScalar(1),tt){let mt=z.get(tt.id);if(O.position.copy(mt.position),O.rotation.y=mt.rotation.y,tt.type==="a-frame"){let Et=n(tt.s-Pe.run,tt.lane*2);O.position.set(Et.x,.012,Et.z),O.scale.setScalar(.56)}if(tt.type==="slalom"){let Et=k.slaloms.get(tt.id).index;if(O.visible=Et<Le.count,O.visible){let Ut=n(In(tt,Et),tt.lane*2+Us(tt,Et)*Le.offset);O.position.set(Ut.x,.012,Ut.z),O.scale.setScalar(.3)}}}for(let mt of i.obstacles)q.get(mt.id).material.color.set(k.results.has(mt.id)?k.results.get(mt.id)?"#b6d59c":"#d9aa8d":mt.id===tt?.id?"#f4d77b":"#f5eed8");for(let[mt,Et]of lt){let Ut=k.slaloms.get(mt);Et.forEach((St,U)=>St.material.color.set(U<Ut.index?Ut.passed[U]?"#8eb87c":"#ca8f75":tt?.id===mt&&U===Ut.index?"#e5bd5c":"#548cba"))}}}function nt(k){for(let[tt,st]of G)st.rotation.x=k.seesaws.get(tt).angle}function ft(){yt="",O.visible=!1,O.scale.setScalar(1);for(let k of q.values())k.material.color.set("#f5eed8");for(let k of G.values())k.rotation.x=_e.angle;for(let k of lt.values())for(let tt of k)tt.material.color.set("#548cba")}return ft(),{root:t,resetTreats:ft,collectTreat(){},update:W,animate:nt}}var br=[{id:"first-field",name:"\u306F\u3058\u3081\u3066\u306E \u3072\u308D\u3070",level:"\u3084\u3055\u3057\u3044",lv:0,color:"#a5bd90",tree:"round",desc:"6\u3064\u306E \u3057\u3087\u3046\u304C\u3044\u3076\u3064\u3092\u3001\u3058\u3085\u3093\u3070\u3093\u306B \u30AF\u30EA\u30A2\u3057\u3088\u3046",tags:["\u30CF\u30FC\u30C9\u30EB","\u308F\u3063\u304B","\u30C8\u30F3\u30CD\u30EB"]},{id:"zigzag",name:"\u30B8\u30B0\u30B6\u30B0",level:"\u3075\u3064\u3046",lv:1,color:"#84aca0",tree:"pine",desc:"\u30DD\u30FC\u30EB\u306E \u3042\u3044\u3060\u3092\u3001\u307F\u304E\u30FB\u3072\u3060\u308A\u306B \u30EA\u30BA\u30E0\u3088\u304F \u3059\u3059\u3082\u3046",tags:["\u30B9\u30E9\u30ED\u30FC\u30E0","\u30CF\u30FC\u30C9\u30EB","\u30C8\u30F3\u30CD\u30EB"]},{id:"balance",name:"\u30D0\u30E9\u30F3\u30B9",level:"\u3080\u305A\u304B\u3057\u3044",lv:2,color:"#a6ae86",tree:"round",desc:"\u3068\u307E\u3063\u3066\u3001\u307E\u3063\u3066\u3001\u307E\u305F \u3059\u3059\u3080\u3002\u30B7\u30FC\u30BD\u30FC\u306B \u3061\u3087\u3046\u305B\u3093",tags:["\u30B7\u30FC\u30BD\u30FC","\u308F\u3063\u304B","\u30CF\u30FC\u30C9\u30EB"]},{id:"hill-field",name:"\u304A\u304B\u306E \u3072\u308D\u3070",level:"\u3075\u3064\u3046",lv:1,color:"#7ca69b",tree:"pine",desc:"\u304D\u3044\u308D\u3044 \u3044\u308A\u3050\u3061\u3092 \u306D\u3089\u3063\u3066\u30012\u3064\u306E \u3055\u304B\u3092 \u304B\u3051\u306C\u3051\u3088\u3046",tags:["A\u30D5\u30EC\u30FC\u30E0","\u30C8\u30F3\u30CD\u30EB","\u308F\u3063\u304B"]}],mc=i=>br.find(t=>t.id===i)||br[0],Yn={sky:"#bad7e3",fog:[85,175],zenith:[.26,.67,.88],horizon:[.73,.91,.89],ground:"#a3b48a",scale:.76,shadow:.8},pc={hurdle:"\u30CF\u30FC\u30C9\u30EB",hoop:"\u308F\u3063\u304B",tunnel:"\u30C8\u30F3\u30CD\u30EB",slalom:"\u30B9\u30E9\u30ED\u30FC\u30E0",seesaw:"\u30B7\u30FC\u30BD\u30FC","a-frame":"A\u30D5\u30EC\u30FC\u30E0"},Gx=["\u3072\u3060\u308A","\u307E\u3093\u306A\u304B","\u307F\u304E"],Lu={"first-field":{lawn:"#a5c27a",leaves:"#85ab59",tree:"round"},zigzag:{lawn:"#9cc39a",leaves:"#528d78",tree:"pine"},balance:{lawn:"#bec682",leaves:"#96a451",tree:"round"},"hill-field":{lawn:"#99be80",leaves:"#679b71",tree:"pine",hill:"#9dbcb3"}};function Du(i){let t=mc(i),e=Lu[t.id]||Lu["first-field"],n=new Mr(t.id).layout,s=T=>(Math.round(T*10)/10).toString(),r=22,a=95,o=T=>15-12*T,l=T=>85+12*T,c=(T,b)=>({x:T,y:b,k:(.72+.42*(b-r)/(a-r))*1.3}),h=T=>`<ellipse cx="0" cy=".4" rx="${T}" ry="1.6" fill="#2d4a2a" opacity=".16"/>`,d=T=>{switch(T.type){case"hurdle":return h(8)+'<rect x="-7.5" y="-8.5" width="1.6" height="8.5" rx=".5" fill="#3f6fa8"/><rect x="5.9" y="-8.5" width="1.6" height="8.5" rx=".5" fill="#3f6fa8"/><rect x="-6" y="-6.2" width="12" height="2" fill="#fff6e4"/>'+[-5,-1.2,2.6].map(b=>`<rect x="${b}" y="-6.2" width="1.9" height="2" fill="#d4654f"/>`).join("")+'<rect x="-8.6" y="-.9" width="3.8" height="1.1" rx=".4" fill="#3f6fa8"/><rect x="4.8" y="-.9" width="3.8" height="1.1" rx=".4" fill="#3f6fa8"/>';case"hoop":return h(7)+'<rect x="-6.6" y="-14" width="1.4" height="14" rx=".5" fill="#3f6fa8"/><rect x="5.2" y="-14" width="1.4" height="14" rx=".5" fill="#3f6fa8"/><circle cx="0" cy="-8.6" r="4.6" fill="none" stroke="#e8893a" stroke-width="1.9"/><rect x="-7.4" y="-.9" width="3" height="1.1" rx=".4" fill="#3f6fa8"/><rect x="4.4" y="-.9" width="3" height="1.1" rx=".4" fill="#3f6fa8"/>';case"tunnel":return h(9)+'<path d="M-8.5 0A8.5 7.5 0 0 1 8.5 0Z" fill="#3f78b8"/>'+[-4.5,0,4.5].map(b=>`<path d="M${b} 0V${s(-Math.sqrt(Math.max(0,1-(b/8.5)**2))*7.5)}" stroke="#2f5f96" stroke-width=".7"/>`).join("")+'<path d="M-8.5 0A8.5 7.5 0 0 1 8.5 0" fill="none" stroke="#f2c94c" stroke-width="1.3"/><path d="M-4.6 0A4.6 4.4 0 0 1 4.6 0Z" fill="#1d3557"/>';case"slalom":return Array.from({length:Le.count},(I,D)=>({x:(D-2.5)*3,y:(D-2.5)*-.9})).sort((I,D)=>I.y-D.y).map(I=>`<g transform="translate(${s(I.x)} ${s(I.y)})"><ellipse cx="0" cy=".3" rx="1.6" ry=".7" fill="#2d4a2a" opacity=".16"/><rect x="-.65" y="-10" width="1.3" height="10" rx=".5" fill="#fffdf4"/><rect x="-.65" y="-7.4" width="1.3" height="2.2" fill="#3f6fa8"/><rect x="-.65" y="-3.2" width="1.3" height="1.6" fill="#3f6fa8"/></g>`).join("");case"seesaw":return h(9.5)+'<path d="M-3.4 0L0 -5.4L3.4 0Z" fill="#3f6fa8"/><g transform="translate(0 -5.4) rotate(-13)"><rect x="-10" y="-1.1" width="20" height="2.2" rx=".6" fill="#4a86c0"/><rect x="-10" y="-1.1" width="4" height="2.2" rx=".6" fill="#f2c94c"/><rect x="6" y="-1.1" width="4" height="2.2" rx=".6" fill="#f2c94c"/></g>';case"a-frame":return h(10)+'<path d="M-9 0L0 -11L0 0Z" fill="#4b8f95"/><path d="M0 -11L9 0L0 0Z" fill="#3c777d"/><path d="M-9 0L-6.6 -2.9L6.6 -2.9L9 0Z" fill="#edc65e"/><path d="M0 -11V0" stroke="#2f6166" stroke-width=".6"/>'}return h(4)+'<circle cx="0" cy="-3" r="3" fill="#c78465"/>'},f=(T,b)=>`<g transform="translate(${s(T.x)} ${s(T.y)}) scale(${s(T.k)})"><ellipse cx="0" cy=".3" rx="2" ry=".8" fill="#2d4a2a" opacity=".16"/><path d="M0 0V-12" stroke="#fffdf4" stroke-width="1"/><path d="M.4 -12L6.4 -9.8L.4 -7.6Z" fill="${b}"/></g>`,u=["slalom","seesaw","a-frame"],m=[...new Set(n.obstacles.map(T=>T.type))];m.sort((T,b)=>(u.includes(b)?1:0)-(u.includes(T)?1:0));let y=m.length>=4?[[38,82],[68,50],[31,48],[73,80]]:[[52,80],[32,50],[68,52]],p=m.slice(0,y.length).map((T,b)=>{let x=c(...y[b]);return{y:x.y,svg:`<g transform="translate(${s(x.x)} ${s(x.y)}) scale(${s(x.k)})">${d({type:T})}</g>`}}),g=c(11,91),v=c(m.length>=4?47:75,m.length>=4?35:34);p.push({y:g.y,svg:f(g,"#4fae9a")},{y:v.y,svg:f(v,"#ec6c8a")}),p.sort((T,b)=>T.y-b.y);let M=[],_=(T,b,x)=>M.push(`<path d="M${s(T)} ${s(b)}v${s(-x)}" stroke="#fffaf0" stroke-width="1.2" stroke-linecap="round"/>`);for(let T=0;T<=8;T++){let b=o(0)+(l(0)-o(0))*T/8;_(b,r,4)}for(let T=0;T<=6;T++){let b=T/6,x=r+(a-r)*b,w=4+2.5*b;_(o(b),x,w),_(l(b),x,w)}let P=[`M${o(0)} ${r-3}H${l(0)}`,`M${o(0)} ${r-1.4}H${l(0)}`,`M${o(0)} ${r-3}L${o(1)} ${a-5.5}`,`M${l(0)} ${r-3}L${l(1)} ${a-5.5}`,`M${o(0)} ${r-1.4}L${o(1)} ${a-2.6}`,`M${l(0)} ${r-1.4}L${l(1)} ${a-2.6}`].map(T=>`<path d="${T}" stroke="#fffaf0" stroke-width=".9" fill="none" opacity=".95"/>`).join(""),E=(T,b,x)=>e.tree==="pine"?`<path d="M${T} ${b-x*1.5}l${x} ${x*2}h${-2*x}z" fill="${e.leaves}"/><path d="M${T} ${b-x*.4}v${x*.8}" stroke="#8c7c57" stroke-width="1"/>`:`<circle cx="${T}" cy="${b-x*.6}" r="${x}" fill="${e.leaves}"/><path d="M${T} ${b-x*.2}v${x*.6}" stroke="#8c7c57" stroke-width="1"/>`,C=Array.from({length:7},(T,b)=>`<path d="M${-20+b*18} 100L${-2+b*18} 14H${7+b*18}L${-11+b*18} 100Z" fill="#fff" opacity=".07"/>`).join("");return`<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M0 0h100v100H0z" fill="${e.lawn}"/>
    <path d="M0 0h100v15H0z" fill="#cfe6ee"/>${e.hill?`<path d="M-5 16Q20 2 45 14T105 13V16H-5z" fill="${e.hill}"/>`:'<path d="M-5 16Q30 9 60 14T105 12V16H-5z" fill="#b8d3b6"/>'}
    <path d="M0 15h100v85H0z" fill="${e.lawn}"/>${C}
    ${[[6,15,4.5],[17,14,3.5],[83,14,3.8],[94,15,4.5],[50,13.5,3]].map(([T,b,x])=>E(T,b,x)).join("")}
    <path d="M${o(0)} ${r}L${l(0)} ${r}L${l(1)} ${a}L${o(1)} ${a}Z" fill="#fff" opacity=".08"/>
    ${P}${M.join("")}${p.map(T=>T.svg).join("")}</svg>`}function gc(i){let t=(n,s,r)=>`<div class="run-hrow"><b aria-hidden="true">${n}</b><div><strong>${s}</strong><span>${r}</span></div></div>`,e={zigzag:t("\u21C6","\u30B9\u30E9\u30ED\u30FC\u30E0","\u3081\u3058\u308B\u3057\u306E \u307B\u3046\u3078\u3001\u307F\u304E\u30FB\u3072\u3060\u308A \u3053\u3046\u3054\u306B 6\u672C \u3068\u304A\u308D\u3046\u3002\u30DD\u30FC\u30EB\u306E \u308C\u3064\u306F \u30B8\u30E3\u30F3\u30D7 \u3067\u304D\u306A\u3044\u3088"),balance:t("\u25C7","\u30B7\u30FC\u30BD\u30FC","\u307E\u3093\u306A\u304B\u306E \u3042\u305F\u308A\u3067 \u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7\u3057\u3066 \u3068\u307E\u308B\u3002\u3044\u305F\u304C \u3055\u304C\u3063\u305F\u3089 \u30BF\u30C3\u30D7\u3067 \u307E\u305F \u3059\u3059\u3080\u3088"),"hill-field":t("\u25B3","A\u30D5\u30EC\u30FC\u30E0","\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u304D\u3044\u308D\u3044 \u3044\u308A\u3050\u3061\u306B \u3042\u308F\u305B\u3066\u3001\u305D\u306E\u307E\u307E \u3055\u304B\u3092 \u306F\u3057\u308A\u306C\u3051\u3088\u3046")}[i];return`<div class="run-hrows">
    ${t("\u2194","\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7",i==="zigzag"?"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078\u3002\u30DD\u30FC\u30EB\u306E \u3042\u3044\u3060\u3067\u306F 1\u56DE\u3067 \u307F\u304E\u30FB\u3072\u3060\u308A\u3078":"\u3068\u306A\u308A\u306E \u30EC\u30FC\u30F3\u3078")}
    ${t("\u2191","\u3046\u3048\u306B \u30B9\u30EF\u30A4\u30D7","\u30B8\u30E3\u30F3\u30D7\u3002\u30CF\u30FC\u30C9\u30EB\u3084 \u308F\u3063\u304B\u3092 \u3068\u3073\u3053\u3048\u3088\u3046\u3002\u30C8\u30F3\u30CD\u30EB\u306F \u305D\u306E\u307E\u307E \u306F\u3057\u3063\u3066\u306D")}
    ${t("\u2193","\u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7","\u305D\u306E\u3070\u3067 \u3068\u307E\u308B\uFF08\u3068\u3051\u3044\u306F \u3059\u3059\u3080\u3088\uFF09")}
    ${t("\u25CF","\u30BF\u30C3\u30D7","\u3068\u307E\u3063\u3066\u3044\u308B \u3046\u3061\u306E\u3053\u304C \u307E\u305F \u306F\u3057\u308A\u3060\u3059\u3088")}
    ${e||(i?"":t("\u25C7","\u30B7\u30FC\u30BD\u30FC","\u307E\u3093\u306A\u304B\u3067 \u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7\u3002\u3044\u305F\u304C \u3055\u304C\u3063\u305F\u3089 \u30BF\u30C3\u30D7"))}
  </div><p class="run-hnote">\u30DF\u30B9 1\u56DE\u3067\u3001\u304D\u308D\u304F\u306B ${Bi.penalty}\u79D2 \u305F\u3055\u308C\u308B\u3088<br>\u30AD\u30FC\u30DC\u30FC\u30C9\u306F \u3084\u3058\u308B\u3057\u3068 \u30B9\u30DA\u30FC\u30B9\u3067 \u3042\u305D\u3079\u307E\u3059</p>`}function Uu(i){let{container:t,look:e,neckWear:n=null,name:s="\u3046\u3061\u306E\u3053",art:r="",best:a=null,next:o=null,onExit:l=()=>{},onSelect:c=null,onNext:h=null,onFinish:d=()=>null}=i,f=mc(i.course),u=f.id,m=new Mr(u),y=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches),p=m.layout.point,g=m.layout.length,v=m.layout.obstacles,M=v.length,_=i.petScale||Yn.scale,P=o&&br.some(L=>L.id===o)?mc(o):null,E=0,C=null,T=null,b=null,x=null,w=null,I=null,D=0,z=0,q=0,G=0,lt=!1,O=null,Q=null,pt=0,it=6,ht="",yt="",W=!1,nt=null,ft=null;t.className="run-root run-agi",t.dataset.course=u,t.innerHTML=`<canvas class="run-canvas" tabindex="0" aria-label="${f.name}\u306E \u30A2\u30B8\u30EA\u30C6\u30A3\u3002\u3088\u3053\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u30EC\u30FC\u30F3\u3001\u3046\u3048\u3067 \u30B8\u30E3\u30F3\u30D7\u3001\u3057\u305F\u3067 \u3068\u307E\u308B\u3001\u30BF\u30C3\u30D7\u3067 \u307E\u305F \u3059\u3059\u3080"></canvas>
    <div class="run-hud">
      <div class="run-top">
        <button class="closebtn run-btn" type="button" data-run="x" aria-label="\u30E9\u30F3\u3092 \u3084\u3081\u308B">${lc}</button>
        <div class="run-chip run-rank"><b data-q="clear">0</b><span>/ ${M} \u30AF\u30EA\u30A2</span></div>
        <div class="run-chip run-miss"><span>\u30DF\u30B9</span><b data-q="miss">0</b></div>
        <span class="run-gap"></span>
        <button class="closebtn run-btn" type="button" data-run="help" aria-label="\u3042\u305D\u3073\u304B\u305F">\uFF1F</button>
        <button class="closebtn run-btn" type="button" data-run="pause" aria-label="\u3072\u3068\u3084\u3059\u307F" hidden>${cc}</button>
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
    <div class="run-bottom run-steps" role="list" aria-label="\u3057\u3087\u3046\u304C\u3044\u3076\u3064">${v.map((L,N)=>`<span class="run-step" role="listitem" data-step="${L.id}" data-state="pending" aria-label="\u3057\u3087\u3046\u304C\u3044\u3076\u3064 ${N+1}\uFF08${pc[L.type]||""}\uFF09\u307E\u3060">${N+1}</span>`).join("")}</div>
    <div class="run-over" data-q="over" role="dialog" aria-modal="true" aria-label="\u30E9\u30F3\u306E \u30E1\u30CB\u30E5\u30FC" hidden></div>`;let k=L=>t.querySelector(`[data-q="${L}"]`),tt=L=>t.querySelector(`[data-run="${L}"]`),st=t.querySelector(".run-canvas"),mt=k("over"),Et=t.querySelector(".run-me"),Ut=new Map([...t.querySelectorAll(".run-step")].map(L=>[Number(L.dataset.step),L]));function St(){T=new ms({canvas:st,antialias:!0,powerPreference:"high-performance"}),T.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),T.outputColorSpace=Ze,T.shadowMap.enabled=!0,T.shadowMap.type=sr,T.toneMapping=rr,T.toneMappingExposure=1,b=new xs,b.background=new zt(Yn.sky),b.fog=new gs(Yn.sky,Yn.fog[0],Yn.fog[1]),x=new Xe(60,1,.1,180),b.add(new bs("#fffaf0",Yn.ground,2.1)),w=new Ss("#fff7ea",2.1),w.castShadow=!0,w.shadow.mapSize.set(1024,1024),Object.assign(w.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.5,far:45}),w.shadow.bias=-3e-4,w.shadow.normalBias=.03,b.add(w,w.target);let L=new fe(new ze(134,24,12),new tn({side:Ge,depthWrite:!1,uniforms:{zenith:{value:new F(...Yn.zenith)},horizon:{value:new F(...Yn.horizon)}},vertexShader:"varying float altitude; void main(){altitude=position.y/134.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform vec3 zenith; uniform vec3 horizon; varying float altitude; void main(){vec3 sky=mix(horizon,zenith,smoothstep(-.035,.34,altitude));gl_FragColor=vec4(sky,1.);}"}));L.name="park-sky",L.renderOrder=-10,b.add(L),I=Pu(m.layout),b.add(I.root),nt=Rs(e,n,{detail:1}),nt.scale.setScalar(_),nt.rotation.y=Math.PI,ft=new fe(new ci(Yn.shadow,24),new Je({color:"#536848",transparent:!0,opacity:.15})),ft.rotation.x=-Math.PI/2,b.add(nt,ft),x.position.set(0,2.8,6),U()}function U(){if(!T)return;let L=t.getBoundingClientRect();L.width<1||L.height<1||(T.setSize(L.width,L.height,!1),x.aspect=L.width/L.height,x.fov=L.width>L.height?54:60,x.updateProjectionMatrix(),q=0)}function jt(L,N,Y){if(mt.hidden=L==null,mt.className="run-over"+(Y?" "+Y:""),t.classList.toggle("menu",L!=null),mt.innerHTML=L==null?"":`<div class="run-card">${L}</div>`,Ft(),L!=null){let xt=mt.querySelector(N||".btn.primary")||mt.querySelector("button");if(xt)try{xt.focus({preventScroll:!0})}catch{}}return mt}function Ft(){let L=m.status==="running"||m.status==="countdown";tt("pause").hidden=!L||!mt.hidden,tt("help").hidden=L&&mt.hidden||W}let $t=()=>c?'<button class="btn" type="button" data-m="select">\u30B3\u30FC\u30B9\u3092 \u3048\u3089\u3076</button>':"";function Ot(L){let N=L.querySelector('[data-m="select"]');N&&N.addEventListener("click",()=>c())}function le(){Q=null;let L=jt(`<span class="run-over-l">\u30A2\u30B8\u30EA\u30C6\u30A3\u30FB${f.level}</span><h2>${f.name}</h2>
      <p class="run-sub">${s}\u3068 ${M}\u3064\u306E \u3057\u3087\u3046\u304C\u3044\u3076\u3064\u306B<br>\u3061\u3087\u3046\u305B\u3093\uFF01</p>
      ${a?`<p class="run-best">\u30D9\u30B9\u30C8 <b>${mi(a)}</b></p>`:""}
      <div class="btnrow">${$t()}<button class="btn primary" type="button" data-m="go">\u306F\u3057\u308B</button></div>`,'[data-m="go"]',"top");L.querySelector('[data-m="go"]').addEventListener("click",S),Ot(L)}function Gt(L){Q=L,jt(`<h2>\u3042\u305D\u3073\u304B\u305F</h2>${gc(u)}<div class="btnrow"><button class="btn primary" type="button" data-m="ok">\u308F\u304B\u3063\u305F</button></div>`).querySelector('[data-m="ok"]').addEventListener("click",R)}function R(){let L=Q;Q=null,L&&L()}function S(){O=null,Q=null,jt(null),m.start(),bt(),Ft();try{st.focus({preventScroll:!0})}catch{}}function X(){if(O=null,m.pause(),m.status!=="paused")return;Q=null;let L=jt(`<h2>\u3072\u3068\u3084\u3059\u307F</h2><p class="run-sub">${f.name}\u306E \u3068\u3061\u3085\u3046\u3060\u3088</p>
      <div class="btnrow"><button class="btn" type="button" data-m="restart">\u3055\u3044\u3057\u3087\u304B\u3089</button><button class="btn primary" type="button" data-m="resume">\u3064\u3065\u3051\u308B</button></div>
      ${c?`<div class="btnrow run-more">${$t()}</div>`:""}`,'[data-m="resume"]');L.querySelector('[data-m="resume"]').addEventListener("click",rt),L.querySelector('[data-m="restart"]').addEventListener("click",dt),Ot(L),bt()}function rt(){jt(null),m.resume(),z=performance.now(),bt(),Ft();try{st.focus({preventScroll:!0})}catch{}}function dt(){m.reset(),I.resetTreats(),x.position.set(0,2.8,6),it=6,z=performance.now(),E++,C=null;for(let L of Ut.values())L.dataset.state="";S()}function at(L){let N=m.result,Y=N.faults===0,xt=P&&h?`<button class="btn primary run-next" type="button" data-m="next" aria-label="\u3064\u304E\u306E \u30B3\u30FC\u30B9\u300C${P.name}\u300D\u3078">\u3064\u304E\u306E \u30B3\u30FC\u30B9\u3078<small>${P.name}</small></button>`:"",_t=`<button class="btn${xt?"":" primary"}" type="button" data-m="exit">\u304A\u308F\u308B</button>`,Bt=(c?$t():"")+(xt?_t:""),At=jt(`<span class="run-over-l">\u30A2\u30B8\u30EA\u30C6\u30A3\u30FB${f.name}</span>
      <div class="run-res">${r?`<div class="run-art" aria-hidden="true">${r}</div>`:""}<div class="run-total"><small>\u3054\u3046\u3051\u3044</small><span><b>${(Math.round(N.total*100)/100).toFixed(2)}</b>\u79D2</span></div></div>
      <h2>${Y?"\u30CE\u30FC\u30DF\u30B9\u3067 \u30B4\u30FC\u30EB\uFF01":"\u3055\u3044\u3054\u307E\u3067 \u306F\u3057\u3063\u305F\u306D\uFF01"}</h2>
      <div class="run-stats">
        <div><span>\u306F\u3057\u3063\u305F \u30BF\u30A4\u30E0</span><b>${mi(N.time)}</b></div><div><span>\u30DF\u30B9\u306E \u3076\u3093</span><b>+${N.penalty}\u79D2</b></div>
        <div><span>\u30AF\u30EA\u30A2</span><b>${N.cleared} / ${M}</b></div><div><span>\u30DF\u30B9</span><b>${N.faults}\u56DE</b></div>
      </div>
      <div class="run-rec" data-q="rec" role="status">${C??'<span class="run-rec-wait">\u304D\u308D\u304F \u3057\u3066\u3044\u308B\u3088\u2026</span>'}</div>
      <div class="btnrow"><button class="btn" type="button" data-m="again">\u3082\u3046\u3044\u3061\u3069</button>${xt||_t}</div>
      ${Bt?`<div class="btnrow run-more">${Bt}</div>`:""}`,'[data-m="again"]');At.querySelector('[data-m="again"]').addEventListener("click",dt),At.querySelector('[data-m="exit"]').addEventListener("click",()=>l());let Jt=At.querySelector('[data-m="next"]');if(Jt&&Jt.addEventListener("click",()=>h(P.id)),Ot(At),!L)return;C=null;let Z=++E,et;try{et=d({course:u,mode:"agility",ms:vr(N.total),time:N.time,total:N.total,misses:N.faults,cleared:N.cleared})}catch{et=null}Promise.resolve(et).then($=>$,()=>null).then($=>{if(lt||Z!==E)return;C=$||"";let ot=k("rec");ot&&(ot.innerHTML=C)})}function Dt(L,N){O=null,m.pause(),W=!0,jt(`<h2>${L}</h2><p class="run-sub">${N}</p><div class="btnrow"><button class="btn primary" type="button" data-m="exit">\u3068\u3058\u308B</button></div>`).querySelector('[data-m="exit"]').addEventListener("click",()=>l())}function bt(){k("clear").textContent=m.cleared,k("miss").textContent=m.faults;let L=Math.min(100,m.player.s/g*100);k("fill").style.width=L+"%",t.querySelector(".run-progress").setAttribute("aria-valuenow",Math.round(L)),k("clock").textContent=yr(m.time),Et.hidden=m.status==="paused",Et.style.left=L+"%",I&&I.update(m);let N=m.nextObstacle,Y=m.status==="running"||m.status==="countdown";v.forEach((_t,Bt)=>{let At=Ut.get(_t.id),Jt=m.results.has(_t.id),Z=m.results.get(_t.id),et=Jt?Z?"clear":"miss":N&&N.id===_t.id&&Y?"next":"pending";if(At.dataset.state===et)return;let $=Jt&&At.dataset.state!=="";At.dataset.state=et,At.textContent=Jt?Z?"\u2713":"\u2212":String(Bt+1),At.setAttribute("aria-label",`\u3057\u3087\u3046\u304C\u3044\u3076\u3064 ${Bt+1}\uFF08${pc[_t.type]||""}\uFF09${Jt?Z?"\u30AF\u30EA\u30A2":"\u30DF\u30B9":"\u307E\u3060"}`),At.classList.toggle("pop",$)}),k("stop").hidden=!(m.stopped&&m.status==="running"&&!m.activeSeesaw),wt();let xt=m.status==="countdown"?String(Math.ceil(m.countdown)):"";xt!==ht&&(ht=xt,k("count").textContent=xt,k("count").classList.toggle("show",!!xt))}function wt(){let L=m.status==="running"?m.nextObstacle:null,N=k("cue");if(N.hidden=!L,t.classList.toggle("turn-visible",!!L),!L){yt="";return}let Y=m.player,xt=Gx[L.lane+1]||"\u307E\u3093\u306A\u304B",_t=Math.abs(Y.x-L.lane*2)<(L.type==="seesaw"?.48:L.type==="a-frame"?Pe.entryTolerance:.72),Bt=(L.type==="slalom"?In(L,0):L.type==="a-frame"?L.s-Pe.run:L.s)-Y.s<8,At=m.activeSeesaw,Jt=m.activeSlalom,Z=_t?L.type==="tunnel"?"\u2229":["seesaw","slalom","a-frame"].includes(L.type)?"\u25C7":Bt?"\u2191":"\u25C7":L.lane*2<Y.x?"\u2190":"\u2192",et=pc[L.type]||"",$=`${L.id+1} / ${M}\u30FB${xt}`,ot=Bt?"active":"ahead";if(!_t&&Bt&&!At&&!Jt&&!m.rampPass?et=`${xt}\u3078`:_t&&Bt&&(L.type==="hurdle"||L.type==="hoop")&&(et=`${et}\u3092 \u30B8\u30E3\u30F3\u30D7`),L.type==="a-frame"&&(m.rampPass?(Z="\u25C7",et=m.rampPass.onBoard?"\u3055\u304B\u3092 \u304B\u3051\u306C\u3051\u3088\u3046":"\u3055\u304B\u306E \u3088\u3053\u3092 \u3068\u304A\u3063\u3066\u3044\u308B\u3088"):Bt&&_t&&(Z="\u25C7",et="\u304D\u3044\u308D\u3044 \u3044\u308A\u3050\u3061\u3078")),At){let ut=At.state.phase,It=Y.s-L.s>=_e.stopFrom;et=ut==="hold"||ut==="tipping"?"\u3044\u305F\u304C \u3055\u304C\u308B\u307E\u3067 \u307E\u3063\u3066\u306D":ut==="ready"||m.stopped?"\u30BF\u30C3\u30D7\u3067 \u3059\u3059\u3080":ut==="exit"?"\u305D\u306E\u307E\u307E \u3059\u3059\u3082\u3046":It?"\u3057\u305F\u306B \u30B9\u30EF\u30A4\u30D7\u3067 \u3068\u307E\u308B":"\u307E\u3093\u306A\u304B\u3078 \u3059\u3059\u3082\u3046",Z=ut==="hold"||ut==="tipping"?"\u2026":ut==="ready"||m.stopped?"\u25CF":ut==="exit"?"\u2713":It?"\u2193":"\u25C7",(ut==="ready"||m.stopped&&ut!=="hold"&&ut!=="tipping"||ut==="approach"&&It)&&(ot="waiting")}if(Jt){let ut=Jt.state.index,It=ut>=Le.count,Kt=Us(L,ut)>0;Z=It?"\u2713":Kt?"\u2192":"\u2190",et=It?"\u3067\u3050\u3061\u3078":Kt?"\u307F\u304E\u3092 \u3068\u304A\u308B":"\u3072\u3060\u308A\u3092 \u3068\u304A\u308B",$=`${L.id+1} / ${M}\u30FB\u30DD\u30FC\u30EB ${Math.min(ut+1,Le.count)} / ${Le.count}`}let ct=`${L.id}:${Z}:${et}:${$}:${ot}`;ct!==yt&&(yt=ct,N.dataset.state=ot,N.innerHTML=`<strong aria-hidden="true">${Z}</strong><span><small>${$}</small><b>${et}</b></span>`)}function ee(L){if(lt)return;D=requestAnimationFrame(ee);let N=z?Math.max(0,Math.min(.2,(L-z)/1e3)):0;z=L;let Y=Math.max(1,Math.ceil(N/.05));for(let ct=0;ct<Y;ct++)m.step(N/Y);I.animate(m);for(let ct of m.drainEvents())ct.type==="finish"&&at(!0);if(!(m.status==="running"||m.status==="countdown")&&q&&L-q<100)return;q=L||1;let _t=m.player;if(m.status!=="paused"){let ct=Pa(m,!0),ut=m.status==="running"&&_t.finishTime===null&&!m.stopped,It=p(_t.s,_t.x);nt.position.set(It.x,_t.y+(ut&&!y&&!_t.surfaceY?Math.abs(Math.cos(_t.phase*1.85))*.025:0),It.z),nt.rotation.order="YXZ",nt.rotation.x=_t.pitch||0,nt.rotation.y=Math.PI-It.heading,nt.rotation.z=ut&&!y?(m.targetX-_t.x)*.07:0,La(nt,_t.phase,ut,_t.jumpElapsed!==null,ct),Is(nt,L/1e3,ut,{legs:!1,phase:_t.phase,airborne:_t.jumpElapsed!==null,reduced:y}),ft.position.set(It.x,.035,It.z),ft.scale.setScalar(_t.jumpElapsed!==null?.7:1),ft.visible=!_t.surfaceY}let Bt=v.some(ct=>ct.type==="tunnel"&&ct.s-_t.s<9&&ct.s-_t.s>-6&&Math.abs(_t.x-ct.lane*2)<.8),At=_t.surfaceY||0,Jt=!!(m.rampPass&&m.rampPass.onBoard),Z=Jt?iu(At):At,et=At?2.8+Z:x.position.y+((Bt?1.15:2.8+(y?0:_t.y*.18))-x.position.y)*(1-Math.exp(-N*6));it+=((Bt?4:6)-it)*(1-Math.exp(-N*5));let $=p(_t.s,_t.x),ot=pi($,{distance:it,height:et,lookHeight:Bt?.65:1+Z*(Jt?.65:1)});x.position.set(ot.position.x,ot.position.y,ot.position.z),x.lookAt(ot.target.x,ot.target.y,ot.target.z),b.getObjectByName("park-sky").position.copy(x.position),w.position.set($.x-7,12,$.z+6),w.target.position.set($.x,0,$.z),G+=N,(G>.08||m.status==="countdown")&&(bt(),G=0),T.render(b,x),pt++}let gt=u==="hill-field";function Pt(L){if(!(!L.isPrimary||m.status!=="running"||O)){O={id:L.pointerId,x:L.clientX,y:L.clientY,time:performance.now(),used:!1,tap:!0};try{st.setPointerCapture(L.pointerId)}catch{}}}function Nt(L,N){if(!O||O.id!==L.pointerId||O.used)return;let Y=L.clientX-O.x,xt=L.clientY-O.y;Math.hypot(Y,xt)>=12&&(O.tap=!1);let _t=Fa(Y,xt,performance.now()-O.time,gt);!_t||_t==="dash"&&(!N||!O.tap)||(O.used=!0,m.input(_t))}let Yt=L=>Nt(L,!1),Rt=L=>{O&&O.id===L.pointerId&&(O=null)},se=L=>{Nt(L,!0),Rt(L)};function Qt(L){if(L.target&&L.target.closest&&L.target.closest("button,summary"))return;let N={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"jump",ArrowDown:"brake"," ":"dash"};N[L.key]&&(L.preventDefault(),L.repeat||m.input(N[L.key]))}let ce=()=>{document.hidden&&X()},B=L=>{lt||(L.preventDefault(),Dt("3D\u306E \u304C\u3081\u3093\u304C \u3068\u307E\u3063\u305F\u3088","\u3044\u3061\u3069 \u3068\u3058\u3066\u3001<br>\u3082\u3046\u3044\u3061\u3069 \u3072\u3089\u3044\u3066\u306D"))};st.addEventListener("pointerdown",Pt),st.addEventListener("pointermove",Yt),st.addEventListener("pointerup",se),st.addEventListener("pointercancel",Rt),st.addEventListener("lostpointercapture",Rt),st.addEventListener("webglcontextlost",B),t.addEventListener("keydown",Qt),tt("x").addEventListener("click",()=>{m.status==="running"||m.status==="countdown"?X():l()}),tt("pause").addEventListener("click",X),tt("help").addEventListener("click",()=>{if(Q)return;let L=m.status;Gt(L==="paused"?X:L==="finished"?()=>at(!1):le)}),document.addEventListener("visibilitychange",ce),addEventListener("blur",X),addEventListener("pagehide",X),addEventListener("resize",U);let vt=typeof ResizeObserver=="function"?new ResizeObserver(U):null;vt&&vt.observe(t);let j=!0;try{St(),le(),D=requestAnimationFrame(ee)}catch(L){j=!1,console.error("run: 3D unavailable",L),Dt("3D\u306E \u304C\u3081\u3093\u3092 \u3072\u3089\u3051\u307E\u305B\u3093\u3067\u3057\u305F","\u3053\u306E\u7AEF\u672B\u3067\u306F \u3042\u305D\u3079\u306A\u3044\u307F\u305F\u3044")}return{ok:j,mode:"agility",get sim(){return m},get renderer(){return T},get frames(){return pt},get status(){return W?"lost":m.status},course:u,pause:X,escape(){return W?!1:Q?(R(),!0):m.status==="running"||m.status==="countdown"?(X(),!0):!1},dispose(){if(lt)return;lt=!0,cancelAnimationFrame(D),st.removeEventListener("webglcontextlost",B),vt&&vt.disconnect(),t.removeEventListener("keydown",Qt),document.removeEventListener("visibilitychange",ce),removeEventListener("blur",X),removeEventListener("pagehide",X),removeEventListener("resize",U),nt&&Ps(nt);let L=new Set,N=new Set;b&&b.traverse(Y=>{Y.geometry&&L.add(Y.geometry),Y.material&&[].concat(Y.material).forEach(xt=>N.add(xt)),Y.isInstancedMesh&&Y.dispose()}),L.forEach(Y=>Y.dispose()),N.forEach(Y=>Y.dispose()),w&&w.dispose(),T&&(T.dispose(),T.forceContextLoss()),t.innerHTML=""}}}var Wx="p6";return ku(Xx);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
