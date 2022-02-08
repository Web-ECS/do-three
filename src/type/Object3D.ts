import { TransformSoA, TransformSoAoA } from "./Transform";
import { Object3D } from 'three'

export type Object3DBase = {
  id: Int32Array,
  parent: Int32Array,
  prevSibling: Int32Array,
  nextSibling: Int32Array,
  modelViewMatrix: Float32Array[],
  normalMatrix: Float32Array[],
  matrix: Float32Array[],
  matrixWorld: Float32Array[],
  matrixAutoUpdate: Uint8Array,
  matrixWorldNeedsUpdate: Uint8Array,
  layers: Uint32Array,
  visible: Uint8Array,
  castShadow: Uint8Array,
  receiveShadow: Uint8Array,
  frustumCulled: Uint8Array,
  renderOrder: Float32Array,
}

export type Object3DSoA = TransformSoA & Object3DBase

export type Object3DSoAoA = TransformSoAoA & Object3DBase


export type Object3DProxy = Object3D & { 
  eid: number
  store: Object3DSoA | Object3DSoAoA
  _add: Function
  _remove: Function
  _removeFromParent: Function
  _clear: Function
}