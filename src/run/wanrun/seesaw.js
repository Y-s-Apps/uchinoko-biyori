// Rendering and contact physics share these rigid-board dimensions.
export const SEESAW=Object.freeze({length:8,width:1.2,thickness:.12,pivotHeight:.95,angle:Math.asin(.235),speed:4.2,stopFrom:-.7,stopTo:1,hold:.35,tipDuration:.85});
export const seesawHalfSpan=()=>SEESAW.length/2*Math.cos(SEESAW.angle);
export function seesawSurface(offset,angle){return Math.max(0,SEESAW.pivotHeight+offset*Math.tan(angle)+SEESAW.thickness/(2*Math.cos(angle)))}
export function seesawAngle(progress){const t=Math.max(0,Math.min(1,progress));return SEESAW.angle*(1-2*t*t*(3-2*t))}
