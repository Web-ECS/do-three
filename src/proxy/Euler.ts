import { Euler } from 'three'

const { defineProperties } = Object

export type EulerSoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  order: Uint8Array
}

const EulerOrder = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ]

export function proxifyEuler (euler: Euler, store: EulerSoA, entity: number): Euler
export function proxifyEuler (euler: Euler, store: Float32Array): Euler
export function proxifyEuler (euler: Euler, store: Float32Array | EulerSoA, entity?: number): Euler {
  if (ArrayBuffer.isView(store)) {
    store[0] = euler.x
    store[1] = euler.y
    store[2] = euler.z
    store[3] = EulerOrder.indexOf(euler.order)
    return defineProperties(euler, {
      _eid: { value: entity },
      _store: { value: store },
      x: {
        get() {
          return this._store[0]
        },
        set(n) {
          (euler as any)._x = n
          euler._onChangeCallback()
          return (this._store[0] = n)
        }
      },
      y: {
        get() {
          return this._store[1]
        },
        set(n) {
          (euler as any)._y = n
          euler._onChangeCallback()
          return (this._store[1] = n)
        }
      },
      z: {
        get() {
          return this._store[2]
        },
        set(n) {
          (euler as any)._z = n
          euler._onChangeCallback()
          return (this._store[2] = n)
        }
      },
      order: {
        get() {
          return this._store[3]
        },
        set(n) {
          (euler as any)._order = EulerOrder[n]
          euler._onChangeCallback()
          return (this._store[3] = n)
        }
      },
    })
  } else {
    if (entity === undefined) throw new Error('entity is undefined, must be defined when passing SoA object')
    store.x[entity] = euler.x
    store.y[entity] = euler.y
    store.z[entity] = euler.z
    store.order[entity] = EulerOrder.indexOf(euler.order)
    return defineProperties(euler, {
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
      order: {
        get() {
          return this._store.order[this._eid]
        },
        set(n) {
          return (this._store.order[this._eid] = n)
        }
      },
    })
  }
}

export function createEulerProxy (store: Float32Array): Euler
export function createEulerProxy (store: EulerSoA, entity: number): Euler
export function createEulerProxy (store: Float32Array | EulerSoA, entity?: number): Euler {
  if (ArrayBuffer.isView(store)) {
    return proxifyEuler(new Euler(), store as Float32Array)
  } else {
    if (entity === undefined) throw new Error('entity is undefined, must be defined when passing SoA object')
    return proxifyEuler(new Euler(), store as EulerSoA, entity)
  }
}
