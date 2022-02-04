import { Vector4 } from 'three'

const { defineProperties } = Object

export type Vector4SoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  w: Float32Array
}

export function proxifyVector4 (vector4: Vector4, store: Vector4SoA, entity: number): Vector4
export function proxifyVector4 (vector4: Vector4, store: Float32Array): Vector4
export function proxifyVector4 (vector4: Vector4, store: Float32Array | Vector4SoA, entity?: number): Vector4 {
  if (ArrayBuffer.isView(store)) {
    store[0] = vector4.x
    store[1] = vector4.y
    store[2] = vector4.z
    store[3] = vector4.w
    return defineProperties(vector4, {
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
      w: {
        get() {
          return this._store[3]
        },
        set(n) {
          return (this._store[3] = n)
        }
      },
    })
  } else {
    if (entity === undefined) throw new Error('entity is undefined, must be defined when passing SoA object')
    store.x[entity] = vector4.x
    store.y[entity] = vector4.y
    store.z[entity] = vector4.z
    store.w[entity] = vector4.w
    return defineProperties(vector4, {
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
      w: {
        get() {
          return this._store.w[this._eid]
        },
        set(n) {
          return (this._store.w[this._eid] = n)
        }
      },
    })
  }
}

export function createVector4Proxy (store: Float32Array): Vector4
export function createVector4Proxy (store: Vector4SoA, entity: number): Vector4
export function createVector4Proxy (store: Float32Array | Vector4SoA, entity?: number): Vector4 {
  if (ArrayBuffer.isView(store)) {
    return proxifyVector4(new Vector4(), store as Float32Array)
  } else {
    if (entity === undefined) throw new Error('entity is undefined, must be defined when passing SoA object')
    return proxifyVector4(new Vector4(), store as Vector4SoA, entity)
  }
}
