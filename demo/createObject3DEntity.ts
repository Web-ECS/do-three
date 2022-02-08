import { createObject3DProxy } from '../src/index'
import * as THREE from 'three'
import { Object3DProxy } from '../src/type/Object3D'
import { object3DStore } from './Object3DStore'

let eidCount = 0

export const createObject3DEntity = (
  geometry = new THREE.BoxGeometry(100,100,100),
  material = new THREE.MeshBasicMaterial({wireframe:true})
): Object3DProxy => {
  const obj3d = createObject3DProxy(object3DStore, eidCount++)
  const mesh = new THREE.Mesh(geometry,material)
  obj3d.add(mesh)
  return obj3d
}