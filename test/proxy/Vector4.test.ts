import assert from "assert"
import { Vector4 } from "three"
import { createVector4Proxy, proxifyVector4 } from "../../src/index"

const createVector4SoA = (n=10) => ({
  x: new Float32Array(n),
  y: new Float32Array(n),
  z: new Float32Array(n),
  w: new Float32Array(n),
})

const stride = 4
const createVector4AoA = (n=10) => Array(n)
  .fill(new Float32Array(n*stride))
  .map((store, i) => store.subarray(i*stride, i*stride+stride))

describe('Vector4', () => {

  describe('SoA', () => {
    it('should proxify existing Vector4 object to Vector4 SoA', () => {
      const id = 1
      const vector4SoA = createVector4SoA()
      const vector4 = new Vector4(1,2,3,4)
  
      proxifyVector4(vector4, vector4SoA, id)
  
      // inherits initial values
      assert(vector4SoA.x[id] === 1)
      assert(vector4SoA.y[id] === 2)
      assert(vector4SoA.z[id] === 3)
      assert(vector4SoA.w[id] === 4)
  
      // persists changes from object to SoA
      vector4.x = 4
      vector4.y = 5
      vector4.z = 6
      vector4.w = 7
      assert(vector4SoA.x[id] === 4)
      assert(vector4SoA.y[id] === 5)
      assert(vector4SoA.z[id] === 6)
      assert(vector4SoA.w[id] === 7)
  
      // persists changes from SoA to object
      vector4SoA.x[id] = 1
      vector4SoA.y[id] = 2
      vector4SoA.z[id] = 3
      vector4SoA.w[id] = 4
      assert(vector4.x === 1)
      assert(vector4.y === 2)
      assert(vector4.z === 3)
      assert(vector4.w === 4)
    })
  
    it('should create a new proxified Vector4', () => {
      const id = 1
      const vector4SoA = createVector4SoA()
      const vector4 = createVector4Proxy(vector4SoA, id).set(1,2,3,4)
  
      // inherits initial values
      assert(vector4SoA.x[id] === 1)
      assert(vector4SoA.y[id] === 2)
      assert(vector4SoA.z[id] === 3)
      assert(vector4SoA.w[id] === 4)
  
      // persists changes from object to SoA
      vector4.x = 4
      vector4.y = 5
      vector4.z = 6
      vector4.w = 7
      assert(vector4SoA.x[id] === 4)
      assert(vector4SoA.y[id] === 5)
      assert(vector4SoA.z[id] === 6)
      assert(vector4SoA.w[id] === 7)
  
      // persists changes from SoA to object
      vector4SoA.x[id] = 1
      vector4SoA.y[id] = 2
      vector4SoA.z[id] = 3
      vector4SoA.w[id] = 4
      assert(vector4.x === 1)
      assert(vector4.y === 2)
      assert(vector4.z === 3)
      assert(vector4.w === 4)
    })
  })

  describe('AoA', () => {
    it('should proxify existing Vector4 object to Vector4 AoA', () => {
      const id = 1
      const vector4AoA = createVector4AoA()
      const vector4 = new Vector4(1,2,3,4)

      proxifyVector4(vector4, vector4AoA[id])

      // inherits initial values
      assert(vector4AoA[id][0] === 1)
      assert(vector4AoA[id][1] === 2)
      assert(vector4AoA[id][2] === 3)
      assert(vector4AoA[id][3] === 4)

      // persists changes from object to AoA
      vector4.x = 4
      vector4.y = 5
      vector4.z = 6
      vector4.w = 7
      assert(vector4AoA[id][0] === 4)
      assert(vector4AoA[id][1] === 5)
      assert(vector4AoA[id][2] === 6)
      assert(vector4AoA[id][3] === 7)

      // persists changes from AoA to object
      vector4AoA[id][0] = 1
      vector4AoA[id][1] = 2
      vector4AoA[id][2] = 3
      vector4AoA[id][3] = 4
      assert(vector4.x === 1)
      assert(vector4.y === 2)
      assert(vector4.z === 3)
      assert(vector4.w === 4)
    })

    it('should create a new proxified Vector4', () => {
      const id = 1
      const vector4AoA = createVector4AoA()
      const vector4 = createVector4Proxy(vector4AoA[id]).set(1,2,3,4)

      // inherits initial values
      assert(vector4AoA[id][0] === 1)
      assert(vector4AoA[id][1] === 2)
      assert(vector4AoA[id][2] === 3)
      assert(vector4AoA[id][3] === 4)

      // persists changes from object to AoA
      vector4.x = 4
      vector4.y = 5
      vector4.z = 6
      vector4.w = 7
      assert(vector4AoA[id][0] === 4)
      assert(vector4AoA[id][1] === 5)
      assert(vector4AoA[id][2] === 6)
      assert(vector4AoA[id][3] === 7)

      // persists changes from AoA to object
      vector4AoA[id][0] = 1
      vector4AoA[id][1] = 2
      vector4AoA[id][2] = 3
      vector4AoA[id][3] = 4
      assert(vector4.x === 1)
      assert(vector4.y === 2)
      assert(vector4.z === 3)
      assert(vector4.w === 4)
    })
  })

})