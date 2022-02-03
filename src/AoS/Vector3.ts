import { Vector3 } from 'three'

const { defineProperties } = Object

export const proxifyVector3 = (store: Float32Array[], entity: number, vector3: Vector3): Vector3 =>
  defineProperties(vector3, {
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
    }
  })

export const createVector3Proxy = (store: Float32Array[], entity: number) => proxifyVector3(store, entity, new Vector3())
