import { Vector3 } from 'three'

const { defineProperties } = Object

export type Vector3SoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
}

export class Vector3ProxySoA extends Vector3 {
	store
	eid
	constructor(store: Vector3SoA, eid: number, x = 0, y = 0, z = 0 ) {

		super(x,y,z)

		this.eid = eid
		this.store = store

		this.store.x[this.eid] = x
		this.store.y[this.eid] = y
		this.store.z[this.eid] = z

	}
	//@ts-ignore
	get x() {
		if(this.store)
	  return this.store.x[this.eid]
	}
	set x(v: number) {
		if(this.store)
		this.store.x[this.eid] = v
	}
	//@ts-ignore
	get y() {
		if(this.store)
		return this.store.y[this.eid]
	}
	set y(v: number) {
		if(this.store)
		this.store.y[this.eid] = v
	}
	//@ts-ignore
	get z() {
		if(this.store)
		return this.store.z[this.eid]
	}
	set z(v: number) {
		if(this.store)
		this.store.z[this.eid] = v
	}
}

export class Vector3ProxyAoA extends Vector3 {
	store
	constructor(store: Float32Array, x = 0, y = 0, z = 0 ) {

		super(x,y,z)

		this.store = store

		this.x = x;
		this.y = y;
		this.z = z;

	}
	//@ts-ignore
	get x() {
		if(this.store)
	  return this.store[0]
	}
	set x(v: number) {
		if(this.store)
		this.store[0] = v
	}
	//@ts-ignore
	get y() {
		if(this.store)
		return this.store[1]
	}
	set y(v: number) {
		if(this.store)
		this.store[1] = v
	}
	//@ts-ignore
	get z() {
		if(this.store)
		return this.store[2]
	}
	set z(v: number) {
		if(this.store)
		this.store[2] = v
	}

}

export function proxifyVector3 (vector3: Vector3, store: Vector3SoA, entity: number): Vector3
export function proxifyVector3 (vector3: Vector3, store: Float32Array): Vector3
export function proxifyVector3 (vector3: Vector3, store: Float32Array | Vector3SoA, entity?: number): Vector3 {
  if (ArrayBuffer.isView(store)) {
    store[0] = vector3.x
    store[1] = vector3.y
    store[2] = vector3.z
    return defineProperties(vector3, {
      eid: { value: entity },
      store: { value: store },
      x: {
        get() {
          return this.store[0]
        },
        set(n) {
          return (this.store[0] = n)
        }
      },
      y: {
        get() {
          return this.store[1]
        },
        set(n) {
          return (this.store[1] = n)
        }
      },
      z: {
        get() {
          return this.store[2]
        },
        set(n) {
          return (this.store[2] = n)
        }
      },
    })
  } else {
    if (entity === undefined) throw new Error('entity is undefined, must be defined when passing SoA object')
    store.x[entity] = vector3.x
    store.y[entity] = vector3.y
    store.z[entity] = vector3.z
    return defineProperties(vector3, {
      eid: { value: entity },
      store: { value: store },
      x: {
        get() {
          return this.store.x[this.eid]
        },
        set(n) {
          return (this.store.x[this.eid] = n)
        }
      },
      y: {
        get() {
          return this.store.y[this.eid]
        },
        set(n) {
          return (this.store.y[this.eid] = n)
        }
      },
      z: {
        get() {
          return this.store.z[this.eid]
        },
        set(n) {
          return (this.store.z[this.eid] = n)
        }
      },
    })
  }
}

export function createVector3Proxy (store: Float32Array): Vector3
export function createVector3Proxy (store: Vector3SoA, entity: number): Vector3
export function createVector3Proxy (store: Float32Array | Vector3SoA, entity?: number): Vector3 {
  if (ArrayBuffer.isView(store)) {
    return proxifyVector3(new Vector3(), store as Float32Array)
  } else {
    if (entity === undefined) throw new Error('entity is undefined, must be defined when passing SoA object')
    return proxifyVector3(new Vector3(), store as Vector3SoA, entity)
  }
}
