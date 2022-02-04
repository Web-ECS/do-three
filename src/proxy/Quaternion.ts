import { Quaternion } from 'three'

const { defineProperties } = Object

export type QuaternionSoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  w: Float32Array
}

export function proxifyQuaternion (quaternion: Quaternion, store: QuaternionSoA, entity: number): Quaternion
export function proxifyQuaternion (quaternion: Quaternion, store: Float32Array): Quaternion
export function proxifyQuaternion (quaternion: Quaternion, store: Float32Array | QuaternionSoA, entity?: number): Quaternion {
  if (ArrayBuffer.isView(store)) {
    store[0] = quaternion.x
    store[1] = quaternion.y
    store[2] = quaternion.z
    store[3] = quaternion.w
    return defineProperties(quaternion, {
      _eid: { value: entity },
      _store: { value: store },
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
      },
    })
  } else {
    if (entity === undefined) throw new Error('entity is undefined, must be defined when passing SoA object')
    store.x[entity] = quaternion.x
    store.y[entity] = quaternion.y
    store.z[entity] = quaternion.z
    store.w[entity] = quaternion.w
    quaternion
    return defineProperties(quaternion, {
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
      },
    })
  }
}

export function createQuaternionProxy (store: Float32Array): Quaternion
export function createQuaternionProxy (store: QuaternionSoA, entity: number): Quaternion
export function createQuaternionProxy (store: Float32Array | QuaternionSoA, entity?: number): Quaternion {
  if (ArrayBuffer.isView(store)) {
    return proxifyQuaternion(new Quaternion(), store as Float32Array)
  } else {
    if (entity === undefined) throw new Error('entity is undefined, must be defined when passing SoA object')
    return proxifyQuaternion(new Quaternion(), store as QuaternionSoA, entity)
  }
}
