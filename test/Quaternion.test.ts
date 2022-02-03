import assert from "assert"
import { Quaternion } from "three"
import { createQuaternionProxy, proxifyQuaternion } from "../src/Quaternion"

const createQuaternionSoA = (n=10) => ({
  x: new Float32Array(n),
  y: new Float32Array(n),
  z: new Float32Array(n),
  w: new Float32Array(n),
})

const stride = 4
const createQuaternionAoS = (n=10) => Array(n)
  .fill(new Float32Array(n*stride))
  .map((store, i) => store.subarray(i*stride, i*stride+stride))

describe('Quaternion', () => {

  describe('SoA', () => {
    it('should proxify existing Quaternion object to Quaternion SoA', () => {
      const id = 1
      const quaternionSoA = createQuaternionSoA()
      const quaternion = new Quaternion(1,2,3,4)
  
      proxifyQuaternion(quaternionSoA, id, quaternion)
  
      // inherits initial values
      assert(quaternionSoA.x[id] === 1)
      assert(quaternionSoA.y[id] === 2)
      assert(quaternionSoA.z[id] === 3)
      assert(quaternionSoA.w[id] === 4)
  
      // persists changes from object to SoA
      quaternion.x = 4
      quaternion.y = 5
      quaternion.z = 6
      quaternion.w = 7
      assert(quaternionSoA.x[id] === 4)
      assert(quaternionSoA.y[id] === 5)
      assert(quaternionSoA.z[id] === 6)
      assert(quaternionSoA.w[id] === 7)
  
      // persists changes from SoA to object
      quaternionSoA.x[id] = 1
      quaternionSoA.y[id] = 2
      quaternionSoA.z[id] = 3
      quaternionSoA.w[id] = 4
      assert(quaternion.x === 1)
      assert(quaternion.y === 2)
      assert(quaternion.z === 3)
      assert(quaternion.w === 4)
    })
  
    it('should create a new proxified Quaternion', () => {
      const id = 1
      const quaternionSoA = createQuaternionSoA()
      const quaternion = createQuaternionProxy(quaternionSoA, id).set(1,2,3,4)
  
      // inherits initial values
      assert(quaternionSoA.x[id] === 1)
      assert(quaternionSoA.y[id] === 2)
      assert(quaternionSoA.z[id] === 3)
      assert(quaternionSoA.w[id] === 4)
  
      // persists changes from object to SoA
      quaternion.x = 4
      quaternion.y = 5
      quaternion.z = 6
      quaternion.w = 7
      assert(quaternionSoA.x[id] === 4)
      assert(quaternionSoA.y[id] === 5)
      assert(quaternionSoA.z[id] === 6)
      assert(quaternionSoA.w[id] === 7)
  
      // persists changes from SoA to object
      quaternionSoA.x[id] = 1
      quaternionSoA.y[id] = 2
      quaternionSoA.z[id] = 3
      quaternionSoA.w[id] = 4
      assert(quaternion.x === 1)
      assert(quaternion.y === 2)
      assert(quaternion.z === 3)
      assert(quaternion.w === 4)
    })
  })

  describe('AoS', () => {
    it('should proxify existing Quaternion object to Quaternion AoS', () => {
      const id = 1
      const quaternionAoS = createQuaternionAoS()
      const quaternion = new Quaternion(1,2,3,4)

      proxifyQuaternion(quaternionAoS, id, quaternion)

      // inherits initial values
      assert(quaternionAoS[id][0] === 1)
      assert(quaternionAoS[id][1] === 2)
      assert(quaternionAoS[id][2] === 3)
      assert(quaternionAoS[id][3] === 4)

      // persists changes from object to AoS
      quaternion.x = 4
      quaternion.y = 5
      quaternion.z = 6
      quaternion.w = 7
      assert(quaternionAoS[id][0] === 4)
      assert(quaternionAoS[id][1] === 5)
      assert(quaternionAoS[id][2] === 6)
      assert(quaternionAoS[id][3] === 7)

      // persists changes from AoS to object
      quaternionAoS[id][0] = 1
      quaternionAoS[id][1] = 2
      quaternionAoS[id][2] = 3
      quaternionAoS[id][3] = 4
      assert(quaternion.x === 1)
      assert(quaternion.y === 2)
      assert(quaternion.z === 3)
      assert(quaternion.w === 4)
    })

    it('should create a new proxified Quaternion', () => {
      const id = 1
      const quaternionAoS = createQuaternionAoS()
      const quaternion = createQuaternionProxy(quaternionAoS, id).set(1,2,3,4)

      // inherits initial values
      assert(quaternionAoS[id][0] === 1)
      assert(quaternionAoS[id][1] === 2)
      assert(quaternionAoS[id][2] === 3)
      assert(quaternionAoS[id][3] === 4)

      // persists changes from object to AoS
      quaternion.x = 4
      quaternion.y = 5
      quaternion.z = 6
      quaternion.w = 7
      assert(quaternionAoS[id][0] === 4)
      assert(quaternionAoS[id][1] === 5)
      assert(quaternionAoS[id][2] === 6)
      assert(quaternionAoS[id][3] === 7)

      // persists changes from AoS to object
      quaternionAoS[id][0] = 1
      quaternionAoS[id][1] = 2
      quaternionAoS[id][2] = 3
      quaternionAoS[id][3] = 4
      assert(quaternion.x === 1)
      assert(quaternion.y === 2)
      assert(quaternion.z === 3)
      assert(quaternion.w === 4)
    })
  })

})