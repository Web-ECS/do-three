import { createObject3DEntity } from "./createObject3DEntity";
import * as THREE from 'three'
import { Object3DStore } from "./Object3DStore";
import { 
  updateMatrixSoA, 
  setQuaternionFromEulerSoA,
  Object3DEntity, 
} from "./../src";

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 )
camera.position.z = 1000

const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
})

const objects: Object3DEntity[] = []
const entities: number[] = []

const n = 10000
for (let i = 0; i < n; i++) {
  const obj3d = createObject3DEntity()

  objects.push(obj3d)
  entities.push(obj3d.eid)
  
  Object3DStore.position.x[obj3d.eid] = -50 + Math.random() * 50
  Object3DStore.position.y[obj3d.eid] = -50 + Math.random() * 50
  Object3DStore.position.z[obj3d.eid] = -50 + Math.random() * 50
  
  scene.add(obj3d)
}

const systemSoA = () => {
  for (let i = 0; i < entities.length; i++) {
    const eid = entities[i]

    const rnd = Math.random()
    
    Object3DStore.position.x[eid] += Math.cos(rnd + t) * delta * 100
    Object3DStore.position.y[eid] += Math.sin(rnd + t) * delta * 100
    Object3DStore.position.z[eid] += Math.sin(rnd + t) * delta * 100
    
    Object3DStore.scale.x[eid] += Math.sin(rnd + t) * delta
    Object3DStore.scale.y[eid] += Math.sin(rnd + t) * delta
    Object3DStore.scale.z[eid] += Math.sin(rnd + t) * delta
    
    Object3DStore.rotation.x[eid] += rnd + 0.005
    Object3DStore.rotation.y[eid] += rnd + 0.005
    Object3DStore.rotation.z[eid] += rnd + 0.005
    
    setQuaternionFromEulerSoA(Object3DStore.quaternion, Object3DStore.rotation, eid)
    
    updateMatrixSoA(Object3DStore, eid)
  }
}

const systemBrute = () => {
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]
    const eid = obj.eid

    obj.position.x = Object3DStore.position.x[eid]
    obj.position.y = Object3DStore.position.y[eid]
    obj.position.z = Object3DStore.position.z[eid]
    
    obj.scale.x = Object3DStore.scale.x[eid]
    obj.scale.y = Object3DStore.scale.y[eid]
    obj.scale.z = Object3DStore.scale.z[eid]
    
    obj.rotation.x = Object3DStore.rotation.x[eid]
    obj.rotation.y = Object3DStore.rotation.y[eid]
    obj.rotation.z = Object3DStore.rotation.z[eid]

    Object3DStore.matrix[eid].set(obj.matrix.elements)
    obj.updateMatrix()
  }
}

const systemObj = () => {
  for (let i = 0; i < entities.length; i++) {
    const obj = objects[i]

    const rnd = Math.random()
    
    obj.position.x += Math.cos(rnd + t) * delta * 100
    obj.position.y += Math.sin(rnd + t) * delta * 100
    obj.position.z += Math.sin(rnd + t) * delta * 100
    
    obj.scale.x += Math.sin(rnd + t) * delta
    obj.scale.y += Math.sin(rnd + t) * delta
    obj.scale.z += Math.sin(rnd + t) * delta
    
    obj.rotation.x += rnd + 0.005
    obj.rotation.y += rnd + 0.005
    obj.rotation.z += rnd + 0.005
    
    obj.updateMatrix()
  }
}

let t = 0
let then = 0
let delta = 0
const update = () => {
  requestAnimationFrame(update)
  
  delta = (performance.now() - then) / 1000
  t+=delta
  then = performance.now()

  console.time()
  systemSoA()
  // systemBrute()

  // systemObj()
  
  renderer.render(scene,camera)
  console.timeEnd()
}

update()