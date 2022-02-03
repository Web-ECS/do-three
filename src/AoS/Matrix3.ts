import { Matrix3 } from 'three'

const { defineProperties } = Object

export const proxifyMatrix3 = (store: Float32Array[], entity: number, matrix3: Matrix3): Matrix3 =>
  defineProperties(matrix3, {
    _eid: { value: entity },
    _store: { value: store[entity] },
    elements: { value: store[entity] },
  })

export const createMatrix3Proxy = (store: Float32Array[], entity: number) => proxifyMatrix3(store, entity, new Matrix3())
