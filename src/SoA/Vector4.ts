import { Vector4 } from 'three'

const { defineProperties } = Object

type Vector4SoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  w: Float32Array
}

export const proxifyVector4 = (store: Vector4SoA, entity: number, vector4: Vector4): Vector4 =>
  defineProperties(vector4, {
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
    }
  })

export const createVector4Proxy = (store: Vector4SoA, entity: number): Vector4 =>
  proxifyVector4(store, entity, new Vector4())
