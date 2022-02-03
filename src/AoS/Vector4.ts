import { Vector4 } from 'three'

const { defineProperties } = Object

export const proxifyVector4 = (store: Float32Array[], entity: number, vector4: Vector4): Vector4 =>
  defineProperties(vector4, {
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
    }
  })

export const createVector4Proxy = (store: Float32Array[], entity: number): Vector4 =>
  proxifyVector4(store, entity, new Vector4())
