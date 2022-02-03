import { Vector2 } from 'three'

const { defineProperties } = Object

export const proxifyVector2 = (store: Float32Array[], entity: number, vector2: Vector2): Vector2 =>
  defineProperties(vector2, {
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
    }
  })

export const createVector2Proxy = (store: Float32Array[], entity: number) => proxifyVector2(store, entity, new Vector2())
