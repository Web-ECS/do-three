import { createObject3DProxy } from '../src/index'
import * as THREE from 'three'
import { Object3DProxy } from '../src/type/Object3D'
import { Object3DStore } from './Object3DStore'

// start eid at 1, eid 0 acts as noop entity
let eidCount = 1

export const createObject3DEntity = (
  geometry = new THREE.BoxGeometry(100,100,100),
  material = new THREE.MeshBasicMaterial({wireframe:true})
): Object3DProxy => {
  const obj3d = createObject3DProxy(Object3DStore, eidCount++)
  const mesh = new THREE.Mesh(geometry,material)
  obj3d.add(mesh)
  return obj3d
}