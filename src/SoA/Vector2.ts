import { Vector2 } from 'three'

const { defineProperties } = Object

type Vector2SoA = {
  x: Float32Array
  y: Float32Array
}

export const proxifyVector2 = (store: Vector2SoA, entity: number, vector2: Vector2): Vector2 =>
  defineProperties(vector2, {
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
    }
  })

export const createVector2Proxy = (store: Vector2SoA, entity: number) => proxifyVector2(store, entity, new Vector2())
