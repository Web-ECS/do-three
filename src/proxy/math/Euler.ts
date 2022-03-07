import { Euler } from 'three'

const { defineProperties } = Object

export type EulerSoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  order: Uint8Array
}

const EulerOrder = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ]

export class EulerProxySoA extends Euler {
  store: EulerSoA
  eid: number
  _x: number
  _y: number
  _z: number
  constructor(store: EulerSoA, eid: number, x = 0, y = 0, z = 0 ) {
    super(x,y,z)

    this.store = store
    this.eid = eid

    this._x = x
    this._y = y
    this._z = z
		this.store.x[this.eid] = x
		this.store.y[this.eid] = y
		this.store.z[this.eid] = z

  }
  //@ts-ignore
  get x() {
    if (this.store)
    return this.store.x[this.eid]
  }
  set x(v: number) {
    this._x = v
    this._onChangeCallback()
    if (this.store)
    this.store.x[this.eid] = v
  }
  //@ts-ignore
  get y() {
    if (this.store)
    return this.store.y[this.eid]
  }
  set y(v: number) {
    this._y = v
    this._onChangeCallback()
    if (this.store)
    this.store.y[this.eid] = v
  }
  //@ts-ignore
  get z() {
    if (this.store)
    return this.store.z[this.eid]
  }
  set z(v: number) {
    this._z = v
    this._onChangeCallback()
    if (this.store)
    this.store.z[this.eid] = v
  }
  //@ts-ignore
  get order() {
    if (this.store)
    return EulerOrder[this.store.order[this.eid]]
  }
  //@ts-ignore
  set order(v: string) {
    this.store.order[this.eid] = EulerOrder.indexOf(v)
  }
}

export class EulerProxyAoA extends Euler {
  store: Float32Array
  _x: number
  _y: number
  _z: number
  constructor(store: Float32Array, x = 0, y = 0, z = 0 ) {
    super(x,y,z)

    this.store = store
    
    this._x = x
    this._y = y
    this._z = z
		this.store[0] = x
		this.store[1] = y
		this.store[2] = z
  }
  //@ts-ignore
  get x() {
    if (this.store)
    return this.store[0]
  }
  set x(v: number) {
    this._x = v
    this._onChangeCallback()
    if (this.store)
    this.store[0] = v
  }
  //@ts-ignore
  get y() {
    if (this.store)
    return this.store[1]
  }
  set y(v: number) {
    this._y = v
    this._onChangeCallback()
    if (this.store)
    this.store[1] = v
  }
  //@ts-ignore
  get z() {
    if (this.store)
    return this.store[2]
  }
  set z(v: number) {
    this._z = v
    this._onChangeCallback()
    if (this.store)
    this.store[2] = v
  }
  //@ts-ignore
  get order() {
    if (this.store)
    return EulerOrder[this.store[3]]
  }
  //@ts-ignore
  set order(v: string) {
    this.store[3] = EulerOrder.indexOf(v)
  }
}

export function proxifyEuler (euler: Euler, store: EulerSoA, entity: number): Euler
export function proxifyEuler (euler: Euler, store: Float32Array): Euler
export function proxifyEuler (euler: Euler, store: Float32Array | EulerSoA, entity?: number): Euler {
  if (ArrayBuffer.isView(store)) {
    store[0] = euler.x
    store[1] = euler.y
    store[2] = euler.z
    store[3] = EulerOrder.indexOf(euler.order)
    return defineProperties(euler, {
      eid: { value: entity },
      store: { value: store },
      x: {
        get() {
          return this.store[0]
        },
        set(n) {
          (euler as any)._x = n
          euler._onChangeCallback()
          return (this.store[0] = n)
        }
      },
      y: {
        get() {
          return this.store[1]
        },
        set(n) {
          (euler as any)._y = n
          euler._onChangeCallback()
          return (this.store[1] = n)
        }
      },
      z: {
        get() {
          return this.store[2]
        },
        set(n) {
          (euler as any)._z = n
          euler._onChangeCallback()
          return (this.store[2] = n)
        }
      },
      order: {
        get() {
          return this.store[3]
        },
        set(n) {
          (euler as any)._order = EulerOrder[n]
          euler._onChangeCallback()
          return (this.store[3] = n)
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
      eid: { value: entity },
      store: { value: store },
      x: {
        get() {
          return this.store.x[this.eid]
        },
        set(n) {
          (euler as any)._x = n
          euler._onChangeCallback()
          return (this.store.x[this.eid] = n)
        }
      },
      y: {
        get() {
          return this.store.y[this.eid]
        },
        set(n) {
          (euler as any)._y = n
          euler._onChangeCallback()
          return (this.store.y[this.eid] = n)
        }
      },
      z: {
        get() {
          return this.store.z[this.eid]
        },
        set(n) {
          (euler as any)._z = n
          euler._onChangeCallback()
          return (this.store.z[this.eid] = n)
        }
      },
      order: {
        get() {
          return this.store.order[this.eid]
        },
        set(n) {
          return (this.store.order[this.eid] = n)
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
