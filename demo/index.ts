import { createObject3DEntity } from "./createObject3DEntity";
import * as THREE from 'three'
import { object3DStore } from "./Object3DStore";
import { setQuaternionFromEulerSoA } from "./../src";

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


const obj3d = createObject3DEntity()

object3DStore.position.x[obj3d.eid] = -50
object3DStore.position.y[obj3d.eid] = -50
object3DStore.position.z[obj3d.eid] = -50

scene.add(obj3d)

let t = 0
let then = 0
let delta = 0
const update = () => {
  requestAnimationFrame(update)
  
  delta = (performance.now() - then) / 1000
  t+=delta

  object3DStore.position.x[obj3d.eid] += Math.cos(t) * delta * 100
  object3DStore.position.y[obj3d.eid] += Math.sin(t) * delta * 100
  object3DStore.position.z[obj3d.eid] += Math.sin(t) * delta * 100

  object3DStore.scale.x[obj3d.eid] += Math.sin(t) * delta
  object3DStore.scale.y[obj3d.eid] += Math.sin(t) * delta
  object3DStore.scale.z[obj3d.eid] += Math.sin(t) * delta

  object3DStore.rotation.x[obj3d.eid] += 0.005
  object3DStore.rotation.y[obj3d.eid] += 0.005
  object3DStore.rotation.z[obj3d.eid] += 0.005

  setQuaternionFromEulerSoA(object3DStore.quaternion, object3DStore.rotation, obj3d.eid)

  renderer.render(scene,camera)

  then = performance.now()
}

update()