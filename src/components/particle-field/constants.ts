export const height = 600;
export const width = 600;
export const pCount = 100
export const minSpeedScale = 0.025;
export const maxSpeedScale = 0.055;
export const threshold = 70;
export const threshold_sq = threshold * threshold;


export function lerp(a: number, b: number, t: number) {
  return a * (1-t) + b * t;
}