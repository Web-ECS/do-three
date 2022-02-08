import assert from "assert"
import { Vector2 } from "three"
import { createVector2Proxy, proxifyVector2 } from "../../src/index"

const createVector2SoA = (n=10) => ({
  x: new Float32Array(n),
  y: new Float32Array(n),
})

const stride = 2
const createVector2AoA = (n=10) => Array(n)
  .fill(new Float32Array(n*stride))
  .map((store, i) => store.subarray(i*stride, i*stride+stride))

describe('Vector2', () => {

  describe('SoA', () => {
    it('should proxify existing Vector2 object to Vector2 SoA', () => {
      const id = 1
      const vector2SoA = createVector2SoA()
      const vector2 = new Vector2(1,2)

      proxifyVector2(vector2, vector2SoA, id)

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

  describe('AoA', () => {
    it('should proxify existing Vector2 object to Vector2 AoA', () => {
      const id = 1
      const vector2AoA = createVector2AoA()
      const vector2 = new Vector2(1,2)

      proxifyVector2(vector2, vector2AoA[id])

      // inherits initial values
      assert(vector2AoA[id][0] === 1)
      assert(vector2AoA[id][1] === 2)

      // persists changes from object to AoA
      vector2.x = 3
      vector2.y = 4
      assert(vector2AoA[id][0] === 3)
      assert(vector2AoA[id][1] === 4)

      // persists changes from AoA to object
      vector2AoA[id][0] = 1
      vector2AoA[id][1] = 2
      assert(vector2.x === 1)
      assert(vector2.y === 2)
    })

    it('should create a new proxified Vector2', () => {
      const id = 1
      const vector2AoA = createVector2AoA()
      const vector2 = createVector2Proxy(vector2AoA[id]).set(1,2)

      // inherits initial values
      assert(vector2AoA[id][0] === 1)
      assert(vector2AoA[id][1] === 2)

      // persists changes from object to AoA
      vector2.x = 3
      vector2.y = 4
      assert(vector2AoA[id][0] === 3)
      assert(vector2AoA[id][1] === 4)

      // persists changes from AoA to object
      vector2AoA[id][0] = 1
      vector2AoA[id][1] = 2
      assert(vector2.x === 1)
      assert(vector2.y === 2)
    })
  })

})