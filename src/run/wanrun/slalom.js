// One row of poles; each gate must be passed on the alternating side.
export const SLALOM=Object.freeze({count:6,spacing:3.6,offset:.9,speed:8,approach:4,exit:1.6,minOffset:.48,maxOffset:1.35});
export const slalomPoleS=(obstacle,index)=>obstacle.s+(index-(SLALOM.count-1)/2)*SLALOM.spacing;
export const slalomSide=(obstacle,index)=>(obstacle.startSide??-1)*(index%2?-1:1);
export const slalomStart=obstacle=>slalomPoleS(obstacle,0)-SLALOM.approach;
export const slalomEnd=obstacle=>slalomPoleS(obstacle,SLALOM.count-1)+SLALOM.exit;
