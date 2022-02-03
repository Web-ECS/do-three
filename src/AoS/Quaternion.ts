import { Quaternion } from 'three'

const { defineProperties } = Object

export const proxifyQuaternion = (store: Float32Array[], entity: number, quaternion: Quaternion): Quaternion =>
  defineProperties(quaternion, {
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

export const createQuaternionProxy = (store: Float32Array[], entity: number): Quaternion =>
  proxifyQuaternion(store, entity, new Quaternion())
