import { createMeshEntity } from "./createMeshEntity";
import * as THREE from 'three'
import { Transform } from "./Transform";
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


const mesh = createMeshEntity()

Transform.position.x[mesh.eid] = -50
Transform.position.y[mesh.eid] = -50
Transform.position.z[mesh.eid] = -50

scene.add(mesh)

let t = 0
let then = 0
let delta = 0
const update = () => {
  requestAnimationFrame(update)
  
  delta = (performance.now() - then) / 1000
  t+=delta

  Transform.position.x[mesh.eid] += Math.cos(t) * delta * 100
  Transform.position.y[mesh.eid] += Math.sin(t) * delta * 100
  Transform.position.z[mesh.eid] += Math.sin(t) * delta * 100

  Transform.scale.x[mesh.eid] += Math.sin(t) * delta
  Transform.scale.y[mesh.eid] += Math.sin(t) * delta
  Transform.scale.z[mesh.eid] += Math.sin(t) * delta

  Transform.rotation.x[mesh.eid] += 0.005
  Transform.rotation.y[mesh.eid] += 0.005
  Transform.rotation.z[mesh.eid] += 0.005

  setQuaternionFromEulerSoA(Transform.quaternion, Transform.rotation, mesh.eid)

  renderer.render(scene,camera)

  then = performance.now()
}

update()