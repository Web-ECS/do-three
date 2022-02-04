import { Vector2 } from 'three'

const { defineProperties } = Object

type Vector2SoA = {
  x: Float32Array
  y: Float32Array
}

export const proxifyVector2 = (store: Float32Array[] | Vector2SoA, entity: number, vector2: Vector2): Vector2 => {
  if (Array.isArray(store)) {
    store[entity][0] = vector2.x
    store[entity][1] = vector2.y
    return defineProperties(vector2, {
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
    })
  } else {
    store.x[entity] = vector2.x
    store.y[entity] = vector2.y
    return defineProperties(vector2, {
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
    })
  }
}

export const createVector2Proxy = (store: Float32Array[] | Vector2SoA, entity: number): Vector2 =>
  proxifyVector2(store, entity, new Vector2())
