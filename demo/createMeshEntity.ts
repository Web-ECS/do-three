import { proxifyQuaternion, proxifyVector3 } from '../src/index'
import * as THREE from 'three'

let idCount = 0

const n = 100
const Transform = {
  position: {
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
  },
  scale: {
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
  },
  quaternion: {
    x: new Float32Array(n),
    y: new Float32Array(n),
    w: new Float32Array(n),
    z: new Float32Array(n),
  },
}

export const createMeshEntity = (
  geometry = new THREE.BoxGeometry(100,100,100),
  material = new THREE.MeshBasicMaterial({wireframe:true})
): THREE.Mesh => {
  const mesh = new THREE.Mesh(geometry,material)
  const id = idCount++

  proxifyVector3(Transform.position, id, mesh.position)
  proxifyVector3(Transform.scale, id, mesh.scale)
  proxifyQuaternion(Transform.quaternion, id, mesh.quaternion)

  return mesh
}