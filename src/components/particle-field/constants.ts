export const pCount = 100
export const minSpeedScale = 0.015;
export const maxSpeedScale = 0.035;
export const threshold = 60;
export const threshold_sq = threshold * threshold;


export function lerp(a: number, b: number, t: number) {
  return a * (1-t) + b * t;
}