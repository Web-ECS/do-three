import { Vector3 } from 'three'

const { defineProperties } = Object

type Vector3SoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
}

export const proxifyVector3 = (store: Float32Array[] | Vector3SoA, entity: number, vector3: Vector3): Vector3 => {
  if (Array.isArray(store)) {
    store[entity][0] = vector3.x
    store[entity][1] = vector3.y
    store[entity][2] = vector3.z
    return defineProperties(vector3, {
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
    })
  } else {
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

export const createVector3Proxy = (store: Float32Array[] | Vector3SoA, entity: number): Vector3 =>
  proxifyVector3(store, entity, new Vector3())
