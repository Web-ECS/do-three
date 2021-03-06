import { Vector2 } from 'three'

const { defineProperties } = Object

export type Vector2SoA = {
  x: Float32Array
  y: Float32Array
}

export function proxifyVector2 (vector2: Vector2, store: Vector2SoA, entity: number): Vector2
export function proxifyVector2 (vector2: Vector2, store: Float32Array): Vector2
export function proxifyVector2 (vector2: Vector2, store: Float32Array | Vector2SoA, entity?: number): Vector2 {
  if (ArrayBuffer.isView(store)) {
    store[0] = vector2.x
    store[1] = vector2.y
    return defineProperties(vector2, {
      eid: { value: entity },
      store: { value: store },
      x: {
        get() {
          return this.store[0]
        },
        set(n) {
          return (this.store[0] = n)
        }
      },
      y: {
        get() {
          return this.store[1]
        },
        set(n) {
          return (this.store[1] = n)
        }
      },
    })
  } else {
    if (entity === undefined) throw new Error('entity is undefined, must be defined when passing SoA object')
    store.x[entity] = vector2.x
    store.y[entity] = vector2.y
    return defineProperties(vector2, {
      eid: { value: entity },
      store: { value: store },
      x: {
        get() {
          return this.store.x[this.eid]
        },
        set(n) {
          return (this.store.x[this.eid] = n)
        }
      },
      y: {
        get() {
          return this.store.y[this.eid]
        },
        set(n) {
          return (this.store.y[this.eid] = n)
        }
      },
    })
  }
}

export function createVector2Proxy (store: Float32Array): Vector2
export function createVector2Proxy (store: Vector2SoA, entity: number): Vector2
export function createVector2Proxy (store: Float32Array | Vector2SoA, entity?: number): Vector2 {
  if (ArrayBuffer.isView(store)) {
    return proxifyVector2(new Vector2(), store as Float32Array)
  } else {
    if (entity === undefined) throw new Error('entity is undefined, must be defined when passing SoA object')
    return proxifyVector2(new Vector2(), store as Vector2SoA, entity)
  }
}
