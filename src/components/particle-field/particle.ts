import { Vector2 } from './vector2';

export interface IParticleProps {
  pos: Vector2;
  dir: Vector2;
  spd: number;
}

export interface IParticle extends IParticleProps {
  

  update(dt: number): void;
}


export class Particle implements IParticle {
  pos: Vector2;
  dir: Vector2;
  spd: number;

  constructor(params: IParticleProps) {
    const {pos, dir, spd} = params;
    this.pos = pos;
    this.dir = dir;
    this.spd = spd;
  }

  update(dt: number) {
    this.pos.add(this.dir.clone().mul(this.spd * dt));
  }
}
