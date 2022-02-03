import { Vector4 } from 'three'

const { defineProperties } = Object

type Vector4SoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  w: Float32Array
}

export const proxifyVector4 = (store: Float32Array[] | Vector4SoA, entity: number, vector4: Vector4): Vector4 => {
  if (Array.isArray(store)) {
    store[entity][0] = vector4.x
    store[entity][1] = vector4.y
    store[entity][2] = vector4.z
    store[entity][3] = vector4.w
    return defineProperties(vector4, {
      _eid: { value: entity },
      _store: { value: store[entity] },
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

export const createVector4Proxy = (store: Float32Array[] | Vector4SoA, entity: number): Vector4 =>
  proxifyVector4(store, entity, new Vector4())
