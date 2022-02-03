import { Vector3 } from 'three'

const { defineProperties } = Object

type Vector3SoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
}

export const proxifyVector3 = (store: Vector3SoA, entity: number, vector3: Vector3): Vector3 =>
  defineProperties(vector3, {
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
    }
  })

export const createVector3Proxy = (store: Vector3SoA, entity: number) => proxifyVector3(store, entity, new Vector3())
