import { BufferGeometry, Material, Mesh } from 'three'
import { Object3DSoA, Object3DSoAoA } from '../../type/Object3D'
import { Object3DProxyMixin } from '../Object3DMixin'

export class MeshProxy extends Object3DProxyMixin(Mesh) {
  constructor(store: Object3DSoA | Object3DSoAoA, eid: number, geometry: BufferGeometry, material: Material | Material[]) {
    //@ts-ignore
    super(store, eid, geometry, material)
  }
}