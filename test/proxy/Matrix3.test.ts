import assert from "assert"
import { Matrix3 } from "three"
import { createMatrix3Proxy, proxifyMatrix3 } from "../../src/index"

const stride = 9
const createMatrix3AoA = (n=10) => Array(n)
  .fill(new Float32Array(n*stride))
  .map((store, i) => store.subarray(i*stride, i*stride+stride))

describe('Matrix3', () => {

  describe('AoA', () => {
    it('should proxify existing Matrix3 object to Matrix3 AoA', () => {
      const id = 1
      const matrix3AoA = createMatrix3AoA()
      const matrix3 = new Matrix3().set(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
      )

      proxifyMatrix3(matrix3, matrix3AoA[id])

      // inherits initial values
      assert(matrix3AoA[id][0] === 1)
      assert(matrix3AoA[id][1] === 4)
      assert(matrix3AoA[id][2] === 7)
      assert(matrix3AoA[id][3] === 2)
      assert(matrix3AoA[id][4] === 5)
      assert(matrix3AoA[id][5] === 8)
      assert(matrix3AoA[id][6] === 3)
      assert(matrix3AoA[id][7] === 6)
      assert(matrix3AoA[id][8] === 9)

      // persists changes from object to AoA
      matrix3.set(
        11, 44, 77,
        22, 55, 88,
        33, 66, 99,
      )
      assert(matrix3AoA[id][0] === 11)
      assert(matrix3AoA[id][1] === 22)
      assert(matrix3AoA[id][2] === 33)
      assert(matrix3AoA[id][3] === 44)
      assert(matrix3AoA[id][4] === 55)
      assert(matrix3AoA[id][5] === 66)
      assert(matrix3AoA[id][6] === 77)
      assert(matrix3AoA[id][7] === 88)
      assert(matrix3AoA[id][8] === 99)

      // persists changes from AoA to object
      matrix3AoA[id].set([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
      ])
      assert(matrix3.elements[0] === 1)
      assert(matrix3.elements[1] === 2)
      assert(matrix3.elements[2] === 3)
      assert(matrix3.elements[3] === 4)
      assert(matrix3.elements[4] === 5)
      assert(matrix3.elements[5] === 6)
      assert(matrix3.elements[6] === 7)
      assert(matrix3.elements[7] === 8)
      assert(matrix3.elements[8] === 9)
    })

    it('should create a new proxified Matrix3', () => {
      const id = 1
      const matrix3AoA = createMatrix3AoA()
      const matrix3 = createMatrix3Proxy(matrix3AoA[id]).set(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
      )

      // inherits initial values
      assert(matrix3AoA[id][0] === 1)
      assert(matrix3AoA[id][1] === 4)
      assert(matrix3AoA[id][2] === 7)
      assert(matrix3AoA[id][3] === 2)
      assert(matrix3AoA[id][4] === 5)
      assert(matrix3AoA[id][5] === 8)
      assert(matrix3AoA[id][6] === 3)
      assert(matrix3AoA[id][7] === 6)
      assert(matrix3AoA[id][8] === 9)

      // persists changes from object to AoA
      matrix3.set(
        11, 44, 77,
        22, 55, 88,
        33, 66, 99,
      )
      assert(matrix3AoA[id][0] === 11)
      assert(matrix3AoA[id][1] === 22)
      assert(matrix3AoA[id][2] === 33)
      assert(matrix3AoA[id][3] === 44)
      assert(matrix3AoA[id][4] === 55)
      assert(matrix3AoA[id][5] === 66)
      assert(matrix3AoA[id][6] === 77)
      assert(matrix3AoA[id][7] === 88)
      assert(matrix3AoA[id][8] === 99)

      // persists changes from AoA to object
      matrix3AoA[id].set([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
      ])
      assert(matrix3.elements[0] === 1)
      assert(matrix3.elements[1] === 2)
      assert(matrix3.elements[2] === 3)
      assert(matrix3.elements[3] === 4)
      assert(matrix3.elements[4] === 5)
      assert(matrix3.elements[5] === 6)
      assert(matrix3.elements[6] === 7)
      assert(matrix3.elements[7] === 8)
      assert(matrix3.elements[8] === 9)
    })
  })

})