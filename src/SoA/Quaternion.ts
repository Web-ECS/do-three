import { Quaternion } from 'three'

const { defineProperties } = Object

type QuaternionSoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  w: Float32Array
}

export const proxifyQuaternion = (store: QuaternionSoA, entity: number, quaternion: Quaternion): Quaternion =>
  defineProperties(quaternion, {
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

export const createQuaternionProxy = (store: QuaternionSoA, entity: number): Quaternion =>
  proxifyQuaternion(store, entity, new Quaternion())
