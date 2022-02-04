import { Vector3 } from 'three'

const { defineProperties } = Object

export type Vector3SoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
}

export function proxifyVector3 (vector3: Vector3, store: Vector3SoA, entity: number): Vector3
export function proxifyVector3 (vector3: Vector3, store: Float32Array): Vector3
export function proxifyVector3 (vector3: Vector3, store: Float32Array | Vector3SoA, entity?: number): Vector3 {
  if (ArrayBuffer.isView(store)) {
    store[0] = vector3.x
    store[1] = vector3.y
    store[2] = vector3.z
    return defineProperties(vector3, {
      _eid: { value: entity },
      _store: { value: store },
      x: {
        get() {
          return this._store[0]
        },
        set(n) {
          return (this._store[0] = n)
        }
      },
      y: {
        get() {
          return this._store[1]
        },
        set(n) {
          return (this._store[1] = n)
        }
      },
      z: {
        get() {
          return this._store[2]
        },
        set(n) {
          return (this._store[2] = n)
        }
      },
    })
  } else {
    if (entity === undefined) throw new Error('entity is undefined, must be defined when passing SoA object')
    store.x[entity] = vector3.x
    store.y[entity] = vector3.y
    store.z[entity] = vector3.z
    return defineProperties(vector3, {
      _eid: { value: entity },
      _store: { value: store },
      x: {
        get() {
          return this._store.x[this._eid]
        },
        set(n) {
          return (this._store.x[this._eid] = n)
        }
      },
      y: {
        get() {
          return this._store.y[this._eid]
        },
        set(n) {
          return (this._store.y[this._eid] = n)
        }
      },
      z: {
        get() {
          return this._store.z[this._eid]
        },
        set(n) {
          return (this._store.z[this._eid] = n)
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
