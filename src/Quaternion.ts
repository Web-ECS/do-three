import { Quaternion } from 'three'

const { defineProperties } = Object

type QuaternionSoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  w: Float32Array
}

export const proxifyQuaternion = (store: Float32Array[] | QuaternionSoA, entity: number, quaternion: Quaternion): Quaternion => {
  if (Array.isArray(store)) {
    store[entity][0] = quaternion.x
    store[entity][1] = quaternion.y
    store[entity][2] = quaternion.z
    store[entity][3] = quaternion.w
    return defineProperties(quaternion, {
      _eid: { value: entity },
      _store: { value: store[entity] },
      _x: {
        get() {
          return this._store[0]
        },
        set(n) {
          return (this._store[0] = n)
        }
      },
      _y: {
        get() {
          return this._store[1]
        },
        set(n) {
          return (this._store[1] = n)
        }
      },
      _z: {
        get() {
          return this._store[2]
        },
        set(n) {
          return (this._store[2] = n)
        }
      },
      _w: {
        get() {
          return this._store[3]
        },
        set(n) {
          return (this._store[3] = n)
        }
      }
    })
  } else {
    store.x[entity] = quaternion.x
    store.y[entity] = quaternion.y
    store.z[entity] = quaternion.z
    store.w[entity] = quaternion.w
    return defineProperties(quaternion, {
      _eid: { value: entity },
      _store: { value: store },
      _x: {
        get() {
          return this._store.x[this._eid]
        },
        set(n) {
          return (this._store.x[this._eid] = n)
        }
      },
      _y: {
        get() {
          return this._store.y[this._eid]
        },
        set(n) {
          return (this._store.y[this._eid] = n)
        }
      },
      _z: {
        get() {
          return this._store.z[this._eid]
        },
        set(n) {
          return (this._store.z[this._eid] = n)
        }
      },
      _w: {
        get() {
          return this._store.w[this._eid]
        },
        set(n) {
          return (this._store.w[this._eid] = n)
        }
      }
    })
  }
}

export const createQuaternionProxy = (store: Float32Array[] | QuaternionSoA, entity: number): Quaternion =>
  proxifyQuaternion(store, entity, new Quaternion())
