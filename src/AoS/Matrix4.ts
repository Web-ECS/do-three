import { Matrix4 } from 'three'

const { defineProperties } = Object

export const proxifyMatrix4 = (store: Float32Array[], entity: number, matrix4: Matrix4): Matrix4 =>
  defineProperties(matrix4, {
    _eid: { value: entity },
    _store: { value: store[entity] },
    elements: { value: store[entity] },
  })

export const createMatrix4Proxy = (store: Float32Array[], entity: number) => proxifyMatrix4(store, entity, new Matrix4())
