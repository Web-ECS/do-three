import { Object3DProxy, _addedEvent, _removedEvent } from './Object3D'
import { proxifyVector3, Vector3SoA } from './Vector3'
import { Object3DEntity } from '../type/Object3D'
import { EulerSoA, proxifyEuler } from './Euler'
import { proxifyQuaternion, QuaternionSoA } from './Quaternion'
import * as THREE from 'three'

export class MeshProxy extends THREE.Mesh {
    store: any
    eid: number
    //@ts-ignore
    children: (Object3DProxy | MeshProxy)[]
    constructor(store: any, eid: number, geometry: THREE.BufferGeometry, material: THREE.Material) {
        super(geometry, material)
        
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
        if (store.matrixAutoUpdate) store.matrixAutoUpdate[this.eid] = this.matrixAutoUpdate
        if (store.visible) store.visible[this.eid] = this.visible
        if (store.frustumCulled) store.frustumCulled[this.eid] = this.frustumCulled

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