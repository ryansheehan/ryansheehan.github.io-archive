import * as THREE from 'three';
import { ParticleWorld2d } from "./world";
import {width, height, threshold_sq} from './constants';
import { IParticle } from './particle';


function createLines(world: ParticleWorld2d) {
  const {particles} = world;
  const count = particles.length;

  const group = new THREE.Group();

  const [p,q] = particles;
  const v = q.pos.clone().sub(p.pos);
  const l = v.len();
  const a = Math.atan2(v.y, v.x);

  const material = new THREE.LineBasicMaterial( { color: 0x00ffff } );
  const geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( 1, 0, 0) );
  const line = new THREE.Line( geometry, material );
  line.scale.set(l, 1, 1);
  line.translateX(p.pos.x);
  line.translateY(p.pos.y);
  line.rotateZ(a);
  group.add(line);

  // for(let i = 0; i < count; ++i) {
  //   const p = particles[i];
  //   for(let j = i + 1; j < count; ++j) {
  //     const q = particles[j];
  //     const v = p.pos.clone().sub(q.pos);
  //     const dist_sq = v.len_sq();

  //     if (dist_sq < threshold_sq) {
        
  //     }
  //   }
  // }

  
  // geometry.vertices.push(new THREE.Vector3( 20, 10, 0) );
  
  // line.scale.set(10,10,10);
  

  

  return group;
}

export function create3DRenderFunction(ctx: WebGLRenderingContext, world: ParticleWorld2d) {
  const scene = new THREE.Scene();

  // const camera = new THREE.OrthographicCamera(0, width, height, 0);
  // camera.translateZ(1)

  const fov = 75;
  const fov_rad = fov*Math.PI/180;
  const camera = new THREE.PerspectiveCamera(fov, width/height, 0.1, 400);
  camera.translateX(width/2)
  camera.translateY(height/2)
  camera.translateZ((width / 2) / Math.tan(fov_rad/2));
  
  const renderer = new THREE.WebGLRenderer({context: ctx});
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);

  const particleRadius = 2;
  const particleShape = new THREE.Shape();
  particleShape.moveTo(0, particleRadius);
  particleShape.quadraticCurveTo( particleRadius, particleRadius, particleRadius, 0 );
  particleShape.quadraticCurveTo( particleRadius, - particleRadius, 0, - particleRadius );
  particleShape.quadraticCurveTo( - particleRadius, - particleRadius, - particleRadius, 0 );
  particleShape.quadraticCurveTo( - particleRadius, particleRadius, 0, particleRadius );
  
  const particleGeometry = new THREE.ShapeBufferGeometry(particleShape);
  
  const particleGroup = new THREE.Group();

  const meshes = world.particles.map(particle => {
    const geometry = particleGeometry;
    // const material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});
    const material = new THREE.MeshBasicMaterial({color: 0xa0a0a0});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(particle.pos.x, particle.pos.y, 0);
    particleGroup.add(mesh);
    return mesh;
  });

  scene.add(particleGroup);

  let lineGroup = createLines(world);
  scene.add(lineGroup);

  return function() {
    for(let i = 0; i < meshes.length; ++i) {
      const mesh = meshes[i];
      const particle = world.particles[i];
      mesh.position.set(particle.pos.x, particle.pos.y, 0);
    }
    scene.remove(lineGroup);
    lineGroup = createLines(world);
    scene.add(lineGroup);
    renderer.render(scene, camera);
  }
}