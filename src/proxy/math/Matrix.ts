import { Matrix3, Matrix4 } from 'three'

const { defineProperties } = Object

export const proxifyMatrix3 = (matrix: Matrix3, store: Float32Array): Matrix3 => {
  store.set(matrix.elements)
  return defineProperties(matrix, {
    elements: { value: store },
  })
}
export const proxifyMatrix4 = (matrix: Matrix4, store: Float32Array): Matrix4 => {
  store.set(matrix.elements)
  return defineProperties(matrix, {
    elements: { value: store },
  })
}

export const createMatrix3Proxy = (store: Float32Array): Matrix3 => proxifyMatrix3(new Matrix3(), store)
export const createMatrix4Proxy = (store: Float32Array): Matrix4 => proxifyMatrix4(new Matrix4(), store)
