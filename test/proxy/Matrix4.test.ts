import assert from "assert"
import { Matrix4 } from "three"
import { createMatrix4Proxy, proxifyMatrix4 } from "../../src/index"

const stride = 16
const createMatrix4AoA = (n=10) => Array(n)
  .fill(new Float32Array(n*stride))
  .map((store, i) => store.subarray(i*stride, i*stride+stride))

describe('Matrix4', () => {

  describe('AoA', () => {
    it('should proxify existing Matrix4 object to Matrix4 AoA', () => {
      const id = 1
      const matrix4AoA = createMatrix4AoA()
      const matrix4 = new Matrix4().set(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16,
      )

      proxifyMatrix4(matrix4, matrix4AoA[id])

      // inherits initial values
      assert(matrix4AoA[id][0] === 1)
      assert(matrix4AoA[id][1] === 5)
      assert(matrix4AoA[id][2] === 9)
      assert(matrix4AoA[id][3] === 13)
      assert(matrix4AoA[id][4] === 2)
      assert(matrix4AoA[id][5] === 6)
      assert(matrix4AoA[id][6] === 10)
      assert(matrix4AoA[id][7] === 14)
      assert(matrix4AoA[id][8] === 3)
      assert(matrix4AoA[id][9] === 7)
      assert(matrix4AoA[id][10] === 11)
      assert(matrix4AoA[id][11] === 15)
      assert(matrix4AoA[id][12] === 4)
      assert(matrix4AoA[id][13] === 8)
      assert(matrix4AoA[id][14] === 12)
      assert(matrix4AoA[id][15] === 16)

      // persists changes from object to AoA
      matrix4.set(
        11, 55, 99, 133,
        22, 66, 100, 144,
        33, 77, 111, 155,
        44, 88, 122, 166,
      )
      assert(matrix4AoA[id][0] === 11)
      assert(matrix4AoA[id][1] === 22)
      assert(matrix4AoA[id][2] === 33)
      assert(matrix4AoA[id][3] === 44)
      assert(matrix4AoA[id][4] === 55)
      assert(matrix4AoA[id][5] === 66)
      assert(matrix4AoA[id][6] === 77)
      assert(matrix4AoA[id][7] === 88)
      assert(matrix4AoA[id][8] === 99)
      assert(matrix4AoA[id][9] === 100)
      assert(matrix4AoA[id][10] === 111)
      assert(matrix4AoA[id][11] === 122)
      assert(matrix4AoA[id][12] === 133)
      assert(matrix4AoA[id][13] === 144)
      assert(matrix4AoA[id][14] === 155)
      assert(matrix4AoA[id][15] === 166)

      // persists changes from AoA to object
      matrix4AoA[id].set([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
      ])
      assert(matrix4.elements[0] === 1)
      assert(matrix4.elements[1] === 2)
      assert(matrix4.elements[2] === 3)
      assert(matrix4.elements[3] === 4)
      assert(matrix4.elements[4] === 5)
      assert(matrix4.elements[5] === 6)
      assert(matrix4.elements[6] === 7)
      assert(matrix4.elements[7] === 8)
      assert(matrix4.elements[8] === 9)
    })

    it('should create a new proxified Matrix4', () => {
      const id = 1
      const matrix4AoA = createMatrix4AoA()
      const matrix4 = createMatrix4Proxy(matrix4AoA[id]).set(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16,
      )

      proxifyMatrix4(matrix4, matrix4AoA[id])

      // inherits initial values
      assert(matrix4AoA[id][0] === 1)
      assert(matrix4AoA[id][1] === 5)
      assert(matrix4AoA[id][2] === 9)
      assert(matrix4AoA[id][3] === 13)
      assert(matrix4AoA[id][4] === 2)
      assert(matrix4AoA[id][5] === 6)
      assert(matrix4AoA[id][6] === 10)
      assert(matrix4AoA[id][7] === 14)
      assert(matrix4AoA[id][8] === 3)
      assert(matrix4AoA[id][9] === 7)
      assert(matrix4AoA[id][10] === 11)
      assert(matrix4AoA[id][11] === 15)
      assert(matrix4AoA[id][12] === 4)
      assert(matrix4AoA[id][13] === 8)
      assert(matrix4AoA[id][14] === 12)
      assert(matrix4AoA[id][15] === 16)

      // persists changes from object to AoA
      matrix4.set(
        11, 55, 99, 133,
        22, 66, 100, 144,
        33, 77, 111, 155,
        44, 88, 122, 166,
      )
      assert(matrix4AoA[id][0] === 11)
      assert(matrix4AoA[id][1] === 22)
      assert(matrix4AoA[id][2] === 33)
      assert(matrix4AoA[id][3] === 44)
      assert(matrix4AoA[id][4] === 55)
      assert(matrix4AoA[id][5] === 66)
      assert(matrix4AoA[id][6] === 77)
      assert(matrix4AoA[id][7] === 88)
      assert(matrix4AoA[id][8] === 99)
      assert(matrix4AoA[id][9] === 100)
      assert(matrix4AoA[id][10] === 111)
      assert(matrix4AoA[id][11] === 122)
      assert(matrix4AoA[id][12] === 133)
      assert(matrix4AoA[id][13] === 144)
      assert(matrix4AoA[id][14] === 155)
      assert(matrix4AoA[id][15] === 166)

      // persists changes from AoA to object
      matrix4AoA[id].set([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
      ])
      assert(matrix4.elements[0] === 1)
      assert(matrix4.elements[1] === 2)
      assert(matrix4.elements[2] === 3)
      assert(matrix4.elements[3] === 4)
      assert(matrix4.elements[4] === 5)
      assert(matrix4.elements[5] === 6)
      assert(matrix4.elements[6] === 7)
      assert(matrix4.elements[7] === 8)
      assert(matrix4.elements[8] === 9)
    })
  })

})