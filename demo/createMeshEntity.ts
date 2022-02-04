import { proxifyQuaternion, proxifyVector3 } from '../src/index'
import * as THREE from 'three'
import { Transform } from './Transform'

export const createMeshEntity = (
  geometry = new THREE.BoxGeometry(100,100,100),
  material = new THREE.MeshBasicMaterial({wireframe:true})
): THREE.Mesh => {
  const mesh = new THREE.Mesh(geometry,material)

  proxifyVector3(mesh.position, Transform.position, mesh.id)
  proxifyVector3(mesh.scale, Transform.scale, mesh.id)
  proxifyQuaternion(mesh.quaternion, Transform.quaternion, mesh.id)

  return mesh
}