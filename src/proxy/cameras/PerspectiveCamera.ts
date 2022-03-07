import { PerspectiveCamera } from 'three'
import { Object3DSoA, Object3DSoAoA } from '../../type/Object3D'
import { Object3DProxyMixin } from '../Object3DMixin'

export class PerspectiveCameraProxy extends Object3DProxyMixin(PerspectiveCamera) {
  constructor(store: Object3DSoA | Object3DSoAoA, eid: number, fov?: number, aspect?: number, near?: number, far?: number) {
    //@ts-ignore
    super(store, eid, fov, aspect, near, far)
  }
}