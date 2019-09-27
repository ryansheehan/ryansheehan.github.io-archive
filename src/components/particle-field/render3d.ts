import * as THREE from 'three';
import { ParticleWorld2d } from "./world";
import {width, height, threshold_sq, lerp} from './constants';
import { IParticle } from './particle';

const vertexShader = `
  attribute vec3 color;
  attribute float alpha;

  varying vec4 vColor;

  void main() {
    vColor = vec4(color, alpha);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const fragmentShader = `
  varying vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;

function updatePoints(starField: THREE.Points, world: ParticleWorld2d) {
  const geometry = starField.geometry as THREE.BufferGeometry;
  const positionAttribute = geometry.attributes['position'] as THREE.BufferAttribute;

  const worldParticles = world.particles;
  for(let i = 0; i < worldParticles.length; ++i) {
    const {x,y} = worldParticles[i].pos;
    positionAttribute.setXY(i, x, y);
  }
  positionAttribute.needsUpdate = true;

  return positionAttribute;
}

function updateLines(constellationLines: THREE.LineSegments, positionAttribute: THREE.BufferAttribute, world: ParticleWorld2d) {
  const linesGeometry = constellationLines.geometry as THREE.BufferGeometry; 
  const linePosAttr = linesGeometry.attributes['position'] as THREE.BufferAttribute;
  linePosAttr.array = positionAttribute.array;
  
  // const lineColAttr = linesGeometry.attributes['color'] as THREE.BufferAttribute;
  const alphaAttr = linesGeometry.attributes['alpha'] as THREE.BufferAttribute;

  const indicies = [];
  for(let i = 0; i < world.particles.length; ++i) {
    const p = world.particles[i];
    const {pos: ppos} = p;

    for(let j = i + 1; j < world.particles.length; ++j) {
      
      const q = world.particles[j];
      const {pos: qpos} = q;
      const dist_v = ppos.clone().sub(qpos);
      const dist_sq = dist_v.len_sq();
      
      if (dist_sq < threshold_sq) {
        indicies.push(i, j);

        const fulldist_sq = threshold_sq * 0.8;
        const percent = Math.min(dist_sq / fulldist_sq, 1.0);
        
        // const color = lerp(200/255, 10/255, percent);
        // lineColAttr.setXYZ(i, color, color, color);
        // lineColAttr.setXYZ(j, color, color, color);

        const alpha = 1 - percent;
        alphaAttr.setX(i, alpha);
        alphaAttr.setX(j, alpha);
      }
    }
  }
  linesGeometry.setIndex(indicies);
  linePosAttr.needsUpdate = true;
  // lineColAttr.needsUpdate = true;
  alphaAttr.needsUpdate = true;
}

export function create3DRenderFunction(ctx: WebGLRenderingContext, world: ParticleWorld2d) {
  const scene = new THREE.Scene();

  // const camera = new THREE.OrthographicCamera(0, width, height, 0);
  // camera.translateZ(1)

  const fov = 75;
  const fov_rad = fov*Math.PI/180;
  const depth = (width / 2) / Math.tan(fov_rad/2);
  const near = 0.1;
  const far = 400;
  const camera = new THREE.PerspectiveCamera(fov, width/height, near, far);
  camera.translateX(width/2)
  camera.translateY(height/2)
  camera.translateZ(depth);
  
  const renderer = new THREE.WebGLRenderer({context: ctx});
  // renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);

  const customMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
  })

  const {particles} = world;
  const numParticles = particles.length;

  
  const particlePositions = new Float32Array( numParticles * 3 );
  const colors = new Float32Array(numParticles * 3);
  const alpha = new Float32Array(numParticles);

  for ( let i = 0, j=0; i < numParticles; ++i, j+=3 ) {
    const p = particles[i];
    
    particlePositions[j] = p.pos.x;
    particlePositions[j+1] = p.pos.y;
    particlePositions[j+2] = 0;

    colors[j] = 1.0;
    colors[j+1] = 1.0;
    colors[j+2] = 1.0;

    alpha[i] = 1.0;
  }

  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  starsGeometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
  starsGeometry.addAttribute('alpha', new THREE.BufferAttribute(alpha, 1));

  const starsMaterial = new THREE.PointsMaterial( { color: 0xffffff, size: 2 } );

  const starField = new THREE.Points( starsGeometry, starsMaterial );

  scene.add(starField);

  const linesGeometry = new THREE.BufferGeometry();
  linesGeometry.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  linesGeometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
  linesGeometry.addAttribute('alpha', new THREE.BufferAttribute(alpha, 1));
  linesGeometry.setIndex([0, 1, 2, 3]);
  // const linesMaterial = new THREE.LineBasicMaterial({linewidth: 1, color: 0xffffff});
  const constellationLines = new THREE.LineSegments (linesGeometry, customMaterial);

  scene.add(constellationLines);

  return function() {
    const updatedPositionAttrib = updatePoints(starField, world);
    updateLines(constellationLines, updatedPositionAttrib, world);

    // const geometry = starField.geometry as THREE.BufferGeometry;
    // const positionAttribute = geometry.attributes['position'] as THREE.BufferAttribute;

    // const worldParticles = world.particles;
    // for(let i = 0; i < worldParticles.length; ++i) {
    //   const {x,y} = worldParticles[i].pos;
    //   positionAttribute.setXY(i, x, y);
    // }
    // positionAttribute.needsUpdate = true;

    // const linesGeometry = constellationLines.geometry as THREE.BufferGeometry; 
    // const linePosAttr = linesGeometry.attributes['position'] as THREE.BufferAttribute;
    // const lineColAttr = linesGeometry.attributes['color'] as THREE.BufferAttribute;
    // linePosAttr.array = positionAttribute.array;

    // const indicies = [];
    // for(let i = 0; i < world.particles.length; ++i) {
    //   const p = world.particles[i];
    //   const {pos: ppos} = p;

    //   for(let j = i + 1; j < world.particles.length; ++j) {
        
    //     const q = world.particles[j];
    //     const {pos: qpos} = q;
    //     const dist_v = ppos.clone().sub(qpos);
    //     const dist_sq = dist_v.len_sq();
        
    //     if (dist_sq < threshold_sq) {
    //       indicies.push(i, j);
    //       const percent = dist_sq / threshold_sq;
          
    //       const color = lerp(200/255, 10/255, percent);
    //       lineColAttr.setXYZ(i, color, color, color);
    //       lineColAttr.setXYZ(j, color, color, color);
    //     }
    //   }
    // }
    // linesGeometry.setIndex(indicies);
    // linePosAttr.needsUpdate = true;
    // lineColAttr.needsUpdate = true;

    renderer.render(scene, camera);
  }
}