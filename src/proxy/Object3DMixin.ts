import { Vector3ProxySoA, Vector3ProxyAoA } from './math/Vector3'
import { Object3DEntity, Object3DSoA, Object3DSoAoA } from '../type/Object3D'
import { EulerProxyAoA, EulerProxySoA } from './math/Euler'
import { QuaternionProxyAoA, QuaternionProxySoA } from './math/Quaternion'
import * as THREE from 'three'
import { Object3D } from 'three'

export const _addedEvent = { type: 'added' }
export const _removedEvent = { type: 'removed' }

type Constructor = new (...args: any[]) => {};

export const Object3DProxyMixin = <TBase extends Constructor>(Base: TBase) => 
class extends Base {
  store: Object3DSoA | Object3DSoAoA
  eid: number
  //@ts-ignore
  parent: (Object3DProxy | MeshProxy) | null
  //@ts-ignore
  children: Object3DEntity[]
  isObject3DEntity: true;
  constructor(...args: any[]) {
    super(...args.slice(2))

    const store = args[0] as Object3DSoA | Object3DSoAoA
    const eid = args[1] as number

    this.store = store
    this.eid = eid

    this.parent = null
    this.children = []
    
    //@ts-ignore
    this.matrix.elements = this.store.matrix[eid]
    
    const position = Array.isArray(this.store.position) 
      ? new Vector3ProxyAoA(this.store.position[eid])
      : new Vector3ProxySoA(this.store.position, eid)

    const scale = Array.isArray(this.store.scale) 
      ? new Vector3ProxyAoA(this.store.scale[eid])
      : new Vector3ProxySoA(this.store.scale, eid)

    scale.set(1,1,1)
    
    const rotation = Array.isArray(this.store.rotation) 
      ? new EulerProxyAoA(this.store.rotation[eid])
      : new EulerProxySoA(this.store.rotation, eid)
    
    const quaternion = Array.isArray(this.store.quaternion) 
      ? new QuaternionProxyAoA(this.store.quaternion[eid])
      : new QuaternionProxySoA(this.store.quaternion, eid)
    
    function onRotationChange() {
      quaternion.setFromEuler( rotation, false )
    }
    
    function onQuaternionChange() {
      rotation.setFromQuaternion( quaternion, undefined, false )
    }
    
    rotation._onChange( onRotationChange )
    quaternion._onChange( onQuaternionChange )

    Object.defineProperties(this, {
      position: { value: position },
      scale: { value: scale },
      rotation: { value: rotation },
      quaternion: { value: quaternion },
    })
    
    this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate
    this.visible = true
    
    this.castShadow = false
    this.receiveShadow = false
    
    this.frustumCulled = true
    this.renderOrder = 0

    this.isObject3DEntity = true;
  }
  
  _add( object: any ) {
    THREE.Object3D.prototype.add.call(this, object)
  }
  
  _remove( object: any ) {
    THREE.Object3D.prototype.remove.call(this, object)
  }
  
  _removeFromParent() {
    THREE.Object3D.prototype.removeFromParent.call(this)
  }
  
  add (child: Object3DEntity) {
    this._add(child)
    this.store.parent[child.eid] = this.eid
    const lastChild = this.children[this.children.length-2]
    if (lastChild !== undefined) {
      this.store.prevSibling[child.eid] = lastChild.eid
      this.store.nextSibling[lastChild.eid] = child.eid
    }
    const firstChild = this.children[0]
    if (firstChild) this.store.firstChild[this.eid] = firstChild.eid
    return this
  }
  
  remove (child: Object3DEntity) {
    const childIndex = this.children.indexOf(child)
    const prevChild = this.children[childIndex-1]
    const nextChild = this.children[childIndex+1]
    if (prevChild !== undefined) 
    this.store.nextSibling[prevChild.eid] = nextChild.eid
    if (nextChild !== undefined)
    this.store.prevSibling[nextChild.eid] = prevChild.eid
    this.store.parent[child.eid] = 0
    this.store.nextSibling[child.eid] = 0
    this.store.prevSibling[child.eid] = 0
    this._remove(child)
    const firstChild = this.children[0]
    if (firstChild) this.store.firstChild[this.eid] = firstChild.eid
    return this
  }
  
  removeFromParent () {
    this._removeFromParent()
    this.store.parent[this.eid] = 0
    return this
  }
  
  clear () {
    for ( let i = 0; i < this.children.length; i ++ ) {
      // original logic
      const object = this.children[i]
      object.parent = null
      Object3D.prototype.dispatchEvent.call(this, _removedEvent)
      // new logic: clear linked list in proxy stores
      this.store.parent[object.eid] = 0
      this.store.prevSibling[object.eid] = 0
      this.store.nextSibling[object.eid] = 0
    }
    this.children.length = 0
    return this
  }

  traverse(callback: (object: Object3DEntity) => any): void {
    //@ts-ignore
    Object3D.prototype.traverse.call(this, callback)
  }

  get matrixAutoUpdate() {
    if (this.store !== undefined)
      return !!this.store.matrixAutoUpdate[this.eid]
    return false
  }
  set matrixAutoUpdate(v) {
    if (this.store !== undefined)
    this.store.matrixAutoUpdate[this.eid] = v ? 1 : 0
  }
  get matrixWorldNeedsUpdate() {
    if (this.store !== undefined)
      return !!this.store.matrixWorldNeedsUpdate[this.eid]
    return false
  }
  set matrixWorldNeedsUpdate(v) {
    if (this.store !== undefined)
    this.store.matrixWorldNeedsUpdate[this.eid] = v ? 1 : 0
  }
  get visible() {
    if (this.store !== undefined)
      return !!this.store.visible[this.eid]
    return true
  }
  set visible(v) {
    if (this.store !== undefined)
    this.store.visible[this.eid] = v ? 1 : 0
  }
  get castShadow () {
    if (this.store !== undefined)
      return !!this.store.castShadow[this.eid]
    return false
  }
  set castShadow (v) {
    if (this.store !== undefined)
    this.store.castShadow[this.eid] = v ? 1 : 0
  }
  get receiveShadow () {
    if (this.store !== undefined)
      return !!this.store.receiveShadow[this.eid]
    return false
  }
  set receiveShadow (v) {
    if (this.store !== undefined)
    this.store.receiveShadow[this.eid] = v ? 1 : 0
  }
  get frustumCulled () {
    if (this.store !== undefined)
      return !!this.store.frustumCulled[this.eid]
    return false
  }
  set frustumCulled (v) {
    if (this.store !== undefined)
    this.store.frustumCulled[this.eid] = v ? 1 : 0
  }
  get renderOrder () {
    if (this.store !== undefined)
      return this.store.renderOrder[this.eid]
    return 0
  }
  set renderOrder (v: number) {
    if (this.store !== undefined)
    this.store.renderOrder[this.eid] = v
  }
}