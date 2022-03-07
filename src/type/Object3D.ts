import { TransformSoA, TransformSoAoA } from "./Transform";
import { MeshProxy } from "../proxy/objects/Mesh";
import { Object3DProxy } from "../proxy/core/Object3D";

export type Object3DBase = {
  id: Uint32Array | Int32Array,
  parent: Uint32Array | Int32Array,
  firstChild: Uint32Array | Int32Array,
  prevSibling: Uint32Array | Int32Array,
  nextSibling: Uint32Array | Int32Array,
  modelViewMatrix: Float32Array[],
  normalMatrix: Float32Array[],
  matrix: Float32Array[],
  matrixWorld: Float32Array[],
  matrixAutoUpdate: Uint8Array,
  matrixWorldNeedsUpdate: Uint8Array,
  layers: Uint32Array | Int32Array,
  visible: Uint8Array,
  castShadow: Uint8Array,
  receiveShadow: Uint8Array,
  frustumCulled: Uint8Array,
  renderOrder: Float32Array,
}

export type Object3DSoA = TransformSoA & Object3DBase

export type Object3DSoAoA = TransformSoAoA & Object3DBase

export type Object3DEntity = Object3DProxy | MeshProxy