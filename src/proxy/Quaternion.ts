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
      eid: { value: entity },
      store: { value: store },
      _x: {
        get() {
          return this.store[0]
        },
        set(n) {
          return (this.store[0] = n)
        }
      },
      _y: {
        get() {
          return this.store[1]
        },
        set(n) {
          return (this.store[1] = n)
        }
      },
      _z: {
        get() {
          return this.store[2]
        },
        set(n) {
          return (this.store[2] = n)
        }
      },
      _w: {
        get() {
          return this.store[3]
        },
        set(n) {
          return (this.store[3] = n)
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
      eid: { value: entity },
      store: { value: store },
      _x: {
        get() {
          return this.store.x[this.eid]
        },
        set(n) {
          return (this.store.x[this.eid] = n)
        }
      },
      _y: {
        get() {
          return this.store.y[this.eid]
        },
        set(n) {
          return (this.store.y[this.eid] = n)
        }
      },
      _z: {
        get() {
          return this.store.z[this.eid]
        },
        set(n) {
          return (this.store.z[this.eid] = n)
        }
      },
      _w: {
        get() {
          return this.store.w[this.eid]
        },
        set(n) {
          return (this.store.w[this.eid] = n)
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
