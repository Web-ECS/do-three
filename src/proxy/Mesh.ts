import { Object3DProxy, _addedEvent, _removedEvent } from './Object3D'
// import { proxifyVector3, Vector3SoA } from './Vector3'
import { Object3DEntity } from '../type/Object3D'
// import { EulerSoA, proxifyEuler } from './Euler'
// import { proxifyQuaternion, QuaternionSoA } from './Quaternion'
import * as THREE from 'three'
import { Vector3ProxySoA, Vector3ProxyAoA } from '..'
import { EulerProxySoA, EulerProxyAoA } from '..'
import { QuaternionProxySoA, QuaternionProxyAoA } from '..'

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

        const rotation = Array.isArray(this.store.rotation) 
            ? new EulerProxyAoA(this.store.rotation[eid]) 
            : new EulerProxySoA(this.store.rotation, eid) 

        const quaternion = Array.isArray(this.store.quaternion) 
            ? new QuaternionProxyAoA(this.store.quaternion[eid]) 
            : new QuaternionProxySoA(this.store.quaternion, eid)

		function onRotationChange() {
			quaternion.setFromEuler( rotation, false );
		}

		function onQuaternionChange() {
			rotation.setFromQuaternion( quaternion, undefined, false );
		}

		rotation._onChange( onRotationChange );
		quaternion._onChange( onQuaternionChange );

        //@ts-ignore
        if (Array.isArray(this.store.position)) Object.defineProperty(this, 'position', { value: new Vector3ProxyAoA(this.store.position[eid]) } )
        //@ts-ignore
        else if (this.store.position) Object.defineProperty(this, 'position', { value: new Vector3ProxySoA(this.store.position, eid) } )

        Object.defineProperty(this, 'rotation', { value: rotation })
        Object.defineProperty(this, 'quaternion', { value: quaternion })
        
		this.visible = true;

		this.castShadow = false;
		this.receiveShadow = false;

		this.frustumCulled = true;
		this.renderOrder = 0;

        // set defaults to the store
        if (store.id) store.id[this.eid] = this.id
        if (store.matrixAutoUpdate) store.matrixAutoUpdate[this.eid] = this.matrixAutoUpdate
        if (store.visible) store.visible[this.eid] = this.visible
        if (store.frustumCulled) store.frustumCulled[this.eid] = this.frustumCulled

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

    
    //@ts-ignore
    get matrixAutoUpdate() {
        if (this.store !== undefined)
        return !!this.store.matrixAutoUpdate[this.eid]
    }
    //@ts-ignore
    set matrixAutoUpdate(v) {
        if (this.store !== undefined)
        this.store.matrixAutoUpdate[this.eid] = v ? 1 : 0
    }
    //@ts-ignore
    get matrixWorldNeedsUpdate() {
        if (this.store !== undefined)
        return !!this.store.matrixWorldNeedsUpdate[this.eid]
    }
    //@ts-ignore
    set matrixWorldNeedsUpdate(v) {
        if (this.store !== undefined)
        this.store.matrixWorldNeedsUpdate[this.eid] = v ? 1 : 0
    }
    //@ts-ignore
    get visible() {
        if (this.store !== undefined)
        return !!this.store.visible[this.eid]
    }
    //@ts-ignore
    set visible(v) {
        if (this.store !== undefined)
        this.store.visible[this.eid] = v ? 1 : 0
    }
    //@ts-ignore
    get castShadow () {
        if (this.store !== undefined)
        return !!this.store.castShadow[this.eid]
    }
    //@ts-ignore
    set castShadow (v) {
        if (this.store !== undefined)
        this.store.castShadow[this.eid] = v ? 1 : 0
    }
    //@ts-ignore
    get receiveShadow () {
        if (this.store !== undefined)
        return !!this.store.receiveShadow[this.eid]
    }
    //@ts-ignore
    set receiveShadow (v) {
        if (this.store !== undefined)
        this.store.receiveShadow[this.eid] = v ? 1 : 0
    }
    //@ts-ignore
    get frustumCulled () {
        if (this.store !== undefined)
        return !!this.store.frustumCulled[this.eid]
    }
    //@ts-ignore
    set frustumCulled (v) {
        if (this.store !== undefined)
        this.store.frustumCulled[this.eid] = v ? 1 : 0
    }
    //@ts-ignore
    get renderOrder () {
        if (this.store !== undefined)
        return this.store.renderOrder[this.eid]
    }
    //@ts-ignore
    set renderOrder (v: number) {
        if (this.store !== undefined)
        this.store.renderOrder[this.eid] = v
    }
}