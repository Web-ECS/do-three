import { proxifyVector3, Vector3SoA } from './Vector3'
import { Object3DEntity, Object3DSoA, Object3DSoAoA } from '../type/Object3D'
import { EulerSoA, proxifyEuler } from './Euler'
import { proxifyMatrix4 } from './Matrix'
import { proxifyQuaternion, QuaternionSoA } from './Quaternion'
import { MeshProxy } from './Mesh'
import * as THREE from 'three'

const { defineProperties } = Object

export function proxifyObject3D (obj: Object3DEntity, store: Object3DSoA | Object3DSoAoA): Object3DEntity {
  
  store.id[obj.eid] = obj.id
  store.matrixAutoUpdate[obj.eid] = obj.matrixAutoUpdate ? 1 : 0
  store.matrixWorldNeedsUpdate[obj.eid] = obj.matrixWorldNeedsUpdate ? 1 : 0
  store.layers[obj.eid] = obj.layers.mask
  store.visible[obj.eid] = obj.visible ? 1 : 0
  store.castShadow[obj.eid] = obj.castShadow ? 1 : 0
  store.receiveShadow[obj.eid] = obj.receiveShadow ? 1 : 0
  store.frustumCulled[obj.eid] = obj.frustumCulled ? 1 : 0
  store.renderOrder[obj.eid] = obj.renderOrder
  
  if (Array.isArray(store.position)) proxifyVector3(obj.position, store.position[obj.eid])
  else proxifyVector3(obj.position, store.position as Vector3SoA, obj.eid)
  
  if (Array.isArray(store.scale)) proxifyVector3(obj.scale, store.scale[obj.eid])
  else proxifyVector3(obj.scale, store.scale as Vector3SoA, obj.eid)
  
  if (Array.isArray(store.rotation)) proxifyEuler(obj.rotation, store.rotation[obj.eid])
  else proxifyEuler(obj.rotation, store.rotation as EulerSoA, obj.eid)
  
  if (Array.isArray(store.quaternion)) proxifyQuaternion(obj.quaternion, store.quaternion[obj.eid])
  else proxifyQuaternion(obj.quaternion, store.quaternion as QuaternionSoA, obj.eid)
  
  proxifyMatrix4(obj.matrix, store.matrix[obj.eid])
  
  obj._add = obj.add
  obj.add = function (child: Object3DEntity) {
    this._add(child)
    this.store.parent[child.eid] = this.eid
    const lastChild = this.children[this.children.length-2] as Object3DEntity
    if (lastChild !== undefined) {
      this.store.prevSibling[child.eid] = lastChild.eid
      this.store.nextSibling[lastChild.eid] = child.eid
    }
    const firstChild = (this.children[0] as Object3DEntity)
    if (firstChild) this.store.firstChild[this.eid] = firstChild.eid
    return this
  }
  
  obj._remove = obj.remove
  obj.remove = function (child: Object3DEntity) {
    const childIndex = this.children.indexOf(child)
    const prevChild = this.children[childIndex-1] as Object3DEntity
    const nextChild = this.children[childIndex+1] as Object3DEntity
    if (prevChild !== undefined) 
    this.store.nextSibling[prevChild.eid] = nextChild.eid
    if (nextChild !== undefined)
    this.store.prevSibling[nextChild.eid] = prevChild.eid
    this.store.parent[child.eid] = 0
    this.store.nextSibling[child.eid] = 0
    this.store.prevSibling[child.eid] = 0
    this._remove(child)
    const firstChild = (this.children[0] as Object3DEntity)
    if (firstChild) this.store.firstChild[this.eid] = firstChild.eid
    return this
  }
  
  obj._removeFromParent = obj.removeFromParent
  obj.removeFromParent = function () {
    this._removeFromParent()
    this.store.parent[this.eid] = 0
    return this
  }
  
  obj.clear = function() {
    for ( let i = 0; i < this.children.length; i ++ ) {
      // original logic
      const object = this.children[i] as Object3DEntity
      object.parent = null
      object.dispatchEvent({type: 'removed'})
      // clear linked list in proxy stores
      this.store.parent[object.eid] = 0
      this.store.prevSibling[object.eid] = 0
      this.store.nextSibling[object.eid] = 0
    }
    this.children.length = 0
    return this
  }
  
  defineProperties(obj.layers, {
    eid: { value: obj.eid },
    store: { value: store.layers },
    mask: {
      get() {
        return this.store[this.eid]
      },
      set(value: number) {
        this.store[this.eid] = value
      },
    },
  })
  
  return defineProperties(obj, {
    store: { value: store },
    matrixAutoUpdate: {
      get() {
        return !!this.store.matrixAutoUpdate[this.eid]
      },
      set(v) {
        this.store.matrixAutoUpdate[this.eid] = v ? 1 : 0
      },
    },
    matrixWorldNeedsUpdate: {
      get() {
        return !!this.store.matrixWorldNeedsUpdate[this.eid]
      },
      set(v) {
        this.store.matrixWorldNeedsUpdate[this.eid] = v ? 1 : 0
      },
    },
    visible: {
      get() {
        return !!this.store.visible[this.eid]
      },
      set(v) {
        this.store.visible[this.eid] = v ? 1 : 0
      },
    },
    castShadow: {
      get() {
        return !!this.store.castShadow[this.eid]
      },
      set(v) {
        this.store.castShadow[this.eid] = v ? 1 : 0
      },
    },
    receiveShadow: {
      get() {
        return !!this.store.receiveShadow[this.eid]
      },
      set(v) {
        this.store.receiveShadow[this.eid] = v ? 1 : 0
      },
    },
    frustumCulled: {
      get() {
        return !!this.store.frustumCulled[this.eid]
      },
      set(v) {
        this.store.frustumCulled[this.eid] = v ? 1 : 0
      },
    },
    renderOrder: {
      get() {
        return this.store.renderOrder[this.eid]
      },
      set(v) {
        this.store.renderOrder[this.eid] = v
      },
    },
  })
}

export const _addedEvent = { type: 'added' }
export const _removedEvent = { type: 'removed' }

export class Object3DProxy extends THREE.Object3D {
  store: any
  eid: number
  //@ts-ignore
  children: (Object3DProxy | MeshProxy)[]
  constructor(store: any, eid: number) {
    super()
    
    this.store = store
    this.eid = eid
    
    //@ts-ignore
    this.matrix.elements = this.store.matrix[eid]
    
    if (Array.isArray(this.store.position)) proxifyVector3(this.position, this.store.position[this.eid])
    else if (this.store.position) proxifyVector3(this.position, this.store.position as Vector3SoA, this.eid)
    
    if (Array.isArray(this.store.scale)) proxifyVector3(this.scale, this.store.scale[this.eid])
    else if (this.store.scale) proxifyVector3(this.scale, this.store.scale as Vector3SoA, this.eid)
    
    if (Array.isArray(this.store.rotation)) proxifyEuler(this.rotation, this.store.rotation[this.eid])
    else if (this.store.rotation) proxifyEuler(this.rotation, this.store.rotation as EulerSoA, this.eid)
    
    if (Array.isArray(this.store.quaternion)) proxifyQuaternion(this.quaternion, this.store.quaternion[this.eid])
    else if (this.store.quaternion) proxifyQuaternion(this.quaternion, this.store.quaternion as QuaternionSoA, this.eid)
    
    // set defaults to the store
    if (store.id) store.id[this.eid] = this.id
    if (store.matrixAutoUpdate) store.matrixAutoUpdate[this.eid] = 1
    if (store.visible) store.visible[this.eid] = 1
    if (store.frustumCulled) store.frustumCulled[this.eid] = 1

    if (store.matrixAutoUpdate) this.matrixAutoUpdate = {
      get () { return !!store.matrixAutoUpdate[eid] },
      set (v: boolean) { store.matrixAutoUpdate[eid] = v ? 1 : 0 }
    } as unknown as boolean
    
    if (store.matrixWorldNeedsUpdate) this.matrixWorldNeedsUpdate = {
      get () { return !!store.matrixWorldNeedsUpdate[eid] },
      set (v: boolean) { store.matrixWorldNeedsUpdate[eid] = v ? 1 : 0 }
    } as unknown as boolean
    
    if (store.visible) this.visible = {
      get () { return !!store.visible[eid] },
      set (v: boolean) { store.visible[eid] = v ? 1 : 0 }
    } as unknown as boolean
    
    if (store.castShadow) this.castShadow = {
      get () { return !!store.castShadow[eid] },
      set (v: boolean) { store.castShadow[eid] = v ? 1 : 0 }
    } as unknown as boolean
    
    if (store.receiveShadow) this.receiveShadow = {
      get () { return !!store.receiveShadow[eid] },
      set (v: boolean) { store.receiveShadow[eid] = v ? 1 : 0 }
    } as unknown as boolean
    
    if (store.frustumCulled) this.frustumCulled = {
      get () { return !!store.frustumCulled[eid] },
      set (v: boolean) { store.frustumCulled[eid] = v ? 1 : 0 }
    } as unknown as boolean
    
    if (store.renderOrder) this.renderOrder = {
      get () { return store.renderOrder[eid] },
      set (v: number) { store.renderOrder[eid] = v }
    } as unknown as number
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
  
  //@ts-ignore
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
  
  //@ts-ignore
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
      object.dispatchEvent(_removedEvent)
      // new logic: clear linked list in proxy stores
      this.store.parent[object.eid] = 0
      this.store.prevSibling[object.eid] = 0
      this.store.nextSibling[object.eid] = 0
    }
    this.children.length = 0
    return this
  }
  
}