import { 
  Object3DEntity, MeshProxy
} from '../src/index'
import * as THREE from 'three'
import { Object3DStore } from './Object3DStore'


// start eid at 1, eid 0 acts as noop entity
let eidCount = 1

export const createObject3DEntity = (
  geometry = new THREE.BoxGeometry(100,100,100),
  material = new THREE.MeshBasicMaterial({wireframe:true})
): Object3DEntity => {
  const mesh = new MeshProxy(Object3DStore, eidCount++, geometry, material)

  mesh.visible = true
  mesh.matrixAutoUpdate = false

  return mesh
}