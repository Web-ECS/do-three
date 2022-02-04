import { proxifyQuaternion, proxifyVector3 } from '../src/index'
import * as THREE from 'three'
import { Transform } from './Transform'

let idCount = 0

type MeshEntity = THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial> & { eid: number }

export const createMeshEntity = (
  geometry = new THREE.BoxGeometry(100,100,100),
  material = new THREE.MeshBasicMaterial({wireframe:true})
): MeshEntity => {
  const mesh = new THREE.Mesh(geometry,material) as MeshEntity
  mesh.eid = idCount++

  proxifyVector3(Transform.position, mesh.eid, mesh.position)
  proxifyVector3(Transform.scale, mesh.eid, mesh.scale)
  proxifyQuaternion(Transform.quaternion, mesh.eid, mesh.quaternion)

  return mesh
}