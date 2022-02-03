import assert from "assert"
import { Vector2 } from "three"
import { createVector2Proxy, proxifyVector2 } from "../src/Vector2"

const createVector2SoA = (n=10) => ({
  x: new Float32Array(n),
  y: new Float32Array(n),
})

const stride = 2
const createVector2AoS = (n=10) => Array(n)
  .fill(new Float32Array(n*stride))
  .map((store, i) => store.subarray(i*stride, i*stride+stride))

describe('Vector2', () => {

  describe('SoA', () => {
    it('should proxify existing Vector2 object to Vector2 SoA', () => {
      const id = 1
      const vector2SoA = createVector2SoA()
      const vector2 = new Vector2(1,2)

      proxifyVector2(vector2SoA, id, vector2)

      // inherits initial values
      assert(vector2SoA.x[id] === 1)
      assert(vector2SoA.y[id] === 2)

      // persists changes from object to SoA
      vector2.x = 3
      vector2.y = 4
      assert(vector2SoA.x[id] === 3)
      assert(vector2SoA.y[id] === 4)

      // persists changes from SoA to object
      vector2SoA.x[id] = 1
      vector2SoA.y[id] = 2
      assert(vector2.x === 1)
      assert(vector2.y === 2)
    })

    it('should create a new proxified Vector2', () => {
      const id = 1
      const vector2SoA = createVector2SoA()
      const vector2 = createVector2Proxy(vector2SoA, id).set(1,2)

      // inherits initial values
      assert(vector2SoA.x[id] === 1)
      assert(vector2SoA.y[id] === 2)

      // persists changes from object to SoA
      vector2.x = 3
      vector2.y = 4
      assert(vector2SoA.x[id] === 3)
      assert(vector2SoA.y[id] === 4)

      // persists changes from SoA to object
      vector2SoA.x[id] = 1
      vector2SoA.y[id] = 2
      assert(vector2.x === 1)
      assert(vector2.y === 2)
    })
  })

  describe('AoS', () => {
    it('should proxify existing Vector2 object to Vector2 AoS', () => {
      const id = 1
      const vector2AoS = createVector2AoS()
      const vector2 = new Vector2(1,2)

      proxifyVector2(vector2AoS, id, vector2)

      // inherits initial values
      assert(vector2AoS[id][0] === 1)
      assert(vector2AoS[id][1] === 2)

      // persists changes from object to AoS
      vector2.x = 3
      vector2.y = 4
      assert(vector2AoS[id][0] === 3)
      assert(vector2AoS[id][1] === 4)

      // persists changes from AoS to object
      vector2AoS[id][0] = 1
      vector2AoS[id][1] = 2
      assert(vector2.x === 1)
      assert(vector2.y === 2)
    })

    it('should create a new proxified Vector2', () => {
      const id = 1
      const vector2AoS = createVector2AoS()
      const vector2 = createVector2Proxy(vector2AoS, id).set(1,2)

      // inherits initial values
      assert(vector2AoS[id][0] === 1)
      assert(vector2AoS[id][1] === 2)

      // persists changes from object to AoS
      vector2.x = 3
      vector2.y = 4
      assert(vector2AoS[id][0] === 3)
      assert(vector2AoS[id][1] === 4)

      // persists changes from AoS to object
      vector2AoS[id][0] = 1
      vector2AoS[id][1] = 2
      assert(vector2.x === 1)
      assert(vector2.y === 2)
    })
  })

})