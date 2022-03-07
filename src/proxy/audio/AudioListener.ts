import { AudioListener } from 'three'
import { Object3DSoA, Object3DSoAoA } from '../../type/Object3D'
import { Object3DProxyMixin } from '../Object3DMixin'

export class AudioListenerProxy extends Object3DProxyMixin(AudioListener) {
  constructor(store: Object3DSoA | Object3DSoAoA, eid: number) {
    //@ts-ignore
    super(store, eid)
  }
}