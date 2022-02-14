import { 
  // createObject3DProxy, 
  proxifyObject3D, proxifyVector3 
} from '../src/index'
import * as THREE from 'three'
import { Object3DProxy } from '../src/type/Object3D'
import { Object3DStore } from './Object3DStore'

// start eid at 1, eid 0 acts as noop entity
let eidCount = 1

export const createObject3DEntity = (
  geometry = new THREE.BoxGeometry(100,100,100),
  material = new THREE.MeshBasicMaterial({wireframe:true})
): Object3DProxy => {
  // const obj3d = createObject3DProxy(Object3DStore, eidCount++)
  // obj3d.matrixAutoUpdate = false
  const mesh = new THREE.Mesh(geometry,material)
  // @ts-ignore
  mesh.eid = eidCount++
  // @ts-ignore
  // proxifyObject3D(mesh, Object3DStore)
  // proxifyVector3(mesh.position, Object3DStore.position, mesh.eid)
  // mesh.matrixAutoUpdate = false
  // obj3d.add(mesh)
  // return obj3d
  return (mesh as unknown as Object3DProxy)
}