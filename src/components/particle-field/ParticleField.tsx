import * as React from 'react';
import { useRef, useState, useEffect } from 'react';

import { ParticleWorld2d } from './world';
import { simulate } from './simulation';
import { Particle } from './particle';
import { Vector2 } from './vector2';

import { width, height, minSpeedScale, maxSpeedScale, lerp, pCount } from './constants';
import { create3DRenderFunction } from './render3d';

function generateParticles() {
  const rand = () => new Particle({
    pos: new Vector2(Math.random() * width - (width * 0.5), Math.random() * height - (height * 0.5)),
    dir: new Vector2(Math.random() * 2 - 1, Math.random() * 2 -1).normalize(),
    spd: lerp(minSpeedScale, maxSpeedScale, Math.random()) * width
  });

  const collection = [];
  const count = pCount;
  for(let i = 0; i < count; i++) {
    collection.push(rand());
  }

  return collection;
}

export const ParticleField: React.FC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [world] = useState(new ParticleWorld2d(width, height, generateParticles()));

  useEffect(() => {
    let renderWorld = () => {console.log('null');};
    const canvasEl = canvasRef.current;
    if (canvasEl) {
      const ctx = canvasEl.getContext('webgl');
      if (ctx) {
        renderWorld = create3DRenderFunction(ctx, world);
      }
    }

    const stopSimulationFn = simulate(world, renderWorld);
    return () => stopSimulationFn();
  }, [canvasRef])

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </>
  )
}