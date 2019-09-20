export class Vector2 {
  constructor(public x = 0, public y = 0) {}

  clone() {
    return new Vector2(this.x, this.y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  add(o: Vector2) {
    this.x += o.x;
    this.y += o.y;
    return this;
  }

  sub(o: Vector2) {
    this.x -= o.x;
    this.y -= o.y;
    return this;
  }

  mul(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  div(s: number) {
    this.x /= s;
    this.y /= s;
    return this;
  }

  dot(o: Vector2) {
    return this.x * o.x + this.y * o.y;
  }

  normalize() {
    const len = Math.sqrt(this.dot(this));
    this.div(len);
    return this;
  }

  abs() {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
  }

  len() {
    return Math.sqrt(this.dot(this));
  }

  len_sq() {
    return this.dot(this);
  }

  reflect(n: Vector2) {
    // r = d - 2 * (d dot n) * n
    return this.sub(n.clone().mul(this.dot(n) * 2))
  }

  rotate(rad: number) {
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    const {x, y} = this;

    this.x = cos * x - sin * y;
    this.y = sin * x + cos * y;

    return this;
  }
}

export const PI = Math.PI; // 180 deg
export const TwoPI = PI * 2; // 360 deg
export const PIOver2 = PI / 2; // 90 deg
export const PIOver4 = PI / 4; // 45 deg

export function intersect(p0: Vector2, v0: Vector2, p1: Vector2, v1: Vector2) {
  // y = ax + c
  // y = bx + d
  // intersect = [((d - c) / (a - b)), ((ad - bc) / (a - b))]

  const a = v0.y / v0.x;
  const b = v1.y / v1.x;
  const c = p0.y - a * p0.x;
  const d = p1.y - b * p1.x;

  const a_sub_b = a - b;
  const x = (d - c) / a_sub_b;
  const y = (a*d - b*c) / a_sub_b;

  return new Vector2(x, y);
}

export function distToLine(p: Vector2, lp: Vector2, lv: Vector2) {
  const v = p.clone().sub(lp);
  return Math.abs(v.x*lv.y - v.y*lv.x);
}

export function closestPointOnLine(p: Vector2, lp: Vector2, lv: Vector2) {
  return lp.clone().add(lv.clone().mul(p.clone().sub(lp).dot(lv)));
}

export function insideLine(p: Vector2, lp: Vector2, ln: Vector2) {
  return p.clone().sub(lp).dot(ln) < 0 ? false : true;
}
