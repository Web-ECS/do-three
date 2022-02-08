import assert from "assert"
import { Vector3 } from "three"
import { createVector3Proxy, proxifyVector3 } from "../../src/index"

const createVector3SoA = (n=10) => ({
  x: new Float32Array(n),
  y: new Float32Array(n),
  z: new Float32Array(n),
})

const stride = 3
const createVector3AoA = (n=10) => Array(n)
  .fill(new Float32Array(n*stride))
  .map((store, i) => store.subarray(i*stride, i*stride+stride))

describe('Vector3', () => {

  describe('SoA', () => {
    it('should proxify existing Vector3 object to Vector3 SoA', () => {
      const id = 1
      const vector3SoA = createVector3SoA()
      const vector3 = new Vector3(1,2,3)
  
      proxifyVector3(vector3, vector3SoA, id)
  
      // inherits initial values
      assert(vector3SoA.x[id] === 1)
      assert(vector3SoA.y[id] === 2)
      assert(vector3SoA.z[id] === 3)
  
      // persists changes from object to SoA
      vector3.x = 4
      vector3.y = 5
      vector3.z = 6
      assert(vector3SoA.x[id] === 4)
      assert(vector3SoA.y[id] === 5)
      assert(vector3SoA.z[id] === 6)
  
      // persists changes from SoA to object
      vector3SoA.x[id] = 1
      vector3SoA.y[id] = 2
      vector3SoA.z[id] = 3
      assert(vector3.x === 1)
      assert(vector3.y === 2)
      assert(vector3.z === 3)
    })
  
    it('should create a new proxified Vector3', () => {
      const id = 1
      const vector3SoA = createVector3SoA()
      const vector3 = createVector3Proxy(vector3SoA, id).set(1,2,3)
  
      // inherits initial values
      assert(vector3SoA.x[id] === 1)
      assert(vector3SoA.y[id] === 2)
      assert(vector3SoA.z[id] === 3)
  
      // persists changes from object to SoA
      vector3.x = 4
      vector3.y = 5
      vector3.z = 6
      assert(vector3SoA.x[id] === 4)
      assert(vector3SoA.y[id] === 5)
      assert(vector3SoA.z[id] === 6)
  
      // persists changes from SoA to object
      vector3SoA.x[id] = 1
      vector3SoA.y[id] = 2
      vector3SoA.z[id] = 3
      assert(vector3.x === 1)
      assert(vector3.y === 2)
      assert(vector3.z === 3)
    })
  })

  describe('AoA', () => {
    it('should proxify existing Vector3 object to Vector3 AoA', () => {
      const id = 1
      const vector3AoA = createVector3AoA()
      const vector3 = new Vector3(1,2,3)

      proxifyVector3(vector3, vector3AoA[id])

      // inherits initial values
      assert(vector3AoA[id][0] === 1)
      assert(vector3AoA[id][1] === 2)
      assert(vector3AoA[id][2] === 3)

      // persists changes from object to AoA
      vector3.x = 4
      vector3.y = 5
      vector3.z = 6
      assert(vector3AoA[id][0] === 4)
      assert(vector3AoA[id][1] === 5)
      assert(vector3AoA[id][2] === 6)

      // persists changes from AoA to object
      vector3AoA[id][0] = 1
      vector3AoA[id][1] = 2
      vector3AoA[id][2] = 3
      assert(vector3.x === 1)
      assert(vector3.y === 2)
      assert(vector3.z === 3)
    })

    it('should create a new proxified Vector3', () => {
      const id = 1
      const vector3AoA = createVector3AoA()
      const vector3 = createVector3Proxy(vector3AoA[id]).set(1,2,3)

      // inherits initial values
      assert(vector3AoA[id][0] === 1)
      assert(vector3AoA[id][1] === 2)
      assert(vector3AoA[id][2] === 3)

      // persists changes from object to AoA
      vector3.x = 4
      vector3.y = 5
      vector3.z = 6
      assert(vector3AoA[id][0] === 4)
      assert(vector3AoA[id][1] === 5)
      assert(vector3AoA[id][2] === 6)

      // persists changes from AoA to object
      vector3AoA[id][0] = 1
      vector3AoA[id][1] = 2
      vector3AoA[id][2] = 3
      assert(vector3.x === 1)
      assert(vector3.y === 2)
      assert(vector3.z === 3)
    })
  })

})