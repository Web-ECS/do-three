import { 
  Object3DEntity, MeshProxy
} from '../src/index'
import * as THREE from 'three'
import { Object3DStore } from './Object3DStore'
import { Mesh } from 'three'

// start eid at 1, eid 0 acts as noop entity
let eidCount = 1

export const createObject3DEntity = (
  geometry = new THREE.BoxGeometry(100,100,100),
  material = new THREE.MeshBasicMaterial({wireframe:true})
): Object3DEntity => {
  const mesh = new MeshProxy(Object3DStore, eidCount++, geometry, material)

  // const mesh = new Mesh(geometry,material) as any
  // mesh.eid = eidCount++

  mesh.matrixAutoUpdate = false

  return mesh
}