import * as React from 'react';
import { useRef, useState, useEffect } from 'react';

import { ParticleWorld2d } from './world';
import { simulate } from './simulation';
import { Particle } from './particle';
import { Vector2 } from './vector2';

import { width, height, minSpeedScale, maxSpeedScale, lerp, pCount } from './constants';
import { create2DRenderFunction } from './render2d';
import { create3DRenderFunction } from './render3d';


function generateParticles() {
  const rand = () => new Particle({
    pos: new Vector2(Math.random() * width * 0.8, Math.random() * height * 0.8),
    dir: new Vector2(Math.random() * 2 - 1, Math.random() * 2 -1).normalize(),
    spd: lerp(minSpeedScale, maxSpeedScale, Math.random()) * width
  });

  const collection = [];
  for(let i = 0; i < pCount; i++) {
    collection.push(rand());
  }

  return collection;
}

export const ParticleField: React.FC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [world] = useState(new ParticleWorld2d(width, height, generateParticles()))


  useEffect(() => {
    let renderWorld = () => {console.log('null');};
    const canvasEl = canvasRef.current;
    if (canvasEl) {
      // const ctx = canvasEl.getContext('2d');
      const ctx = canvasEl.getContext('webgl');
      if (ctx) {
        // renderWorld = create2DRenderFunction(ctx, world);
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