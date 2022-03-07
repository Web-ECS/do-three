import assert from 'assert'
import { EulerSoA } from '../../src/proxy/Euler'
import { createObject3DProxy } from '../../src/proxy/core/Object3D'
import { Object3DSoA } from '../../src/type/Object3D'

const createMatrix4AoA = (n=10) => {
  const stride = 16
  return Array(n)
    .fill(new Float32Array(n*stride))
    .map((store, i) => store.subarray(i*stride, i*stride+stride))
}

const createEulerSoA = (n=10): EulerSoA => ({
  x: new Float32Array(n),
  y: new Float32Array(n),
  z: new Float32Array(n),
  order: new Uint8Array(n),
})

const createQuaternionSoA = (n=10) => ({
  x: new Float32Array(n),
  y: new Float32Array(n),
  z: new Float32Array(n),
  w: new Float32Array(n),
})

const createVector3SoA = (n=10) => ({
  x: new Float32Array(n),
  y: new Float32Array(n),
  z: new Float32Array(n),
})

const createObject3DSoA = (n=10): Object3DSoA => ({

  position: createVector3SoA(n),
  rotation: createEulerSoA(n),
  scale: createVector3SoA(n),
  quaternion: createQuaternionSoA(n),

  id: new Int32Array(n),
  parent: new Int32Array(n),
  firstChild: new Int32Array(n),
  prevSibling: new Int32Array(n),
  nextSibling: new Int32Array(n),
  up: createVector3SoA(n),
  modelViewMatrix: createMatrix4AoA(n),
  normalMatrix: createMatrix4AoA(n),
  matrix: createMatrix4AoA(n),
  matrixWorld: createMatrix4AoA(n),
  matrixAutoUpdate: new Uint8Array(n),
  matrixWorldNeedsUpdate: new Uint8Array(n),
  layers: new Uint32Array(n),
  visible: new Uint8Array(n),
  castShadow: new Uint8Array(n),
  receiveShadow: new Uint8Array(n),
  frustumCulled: new Uint8Array(n),
  renderOrder: new Float32Array(n),
})

describe('Object3D', () => {

  describe('SoA', () => {

    it('should create proxified Object3D and properly add/remove children', () => {
      let eidCount = 1
      const objSoA = createObject3DSoA()
      const objA = createObject3DProxy(objSoA, eidCount++)
      const objB = createObject3DProxy(objSoA, eidCount++)
      const objC = createObject3DProxy(objSoA, eidCount++)
      const objD = createObject3DProxy(objSoA, eidCount++)

      objSoA.position.x[objA.eid] = 1
      assert(objA.position.x === 1)

      assert(objSoA.matrixAutoUpdate[objA.eid] === 1)
      objA.matrixAutoUpdate = false
      assert(objSoA.matrixAutoUpdate[objA.eid] === 0)

      objA.add(objB)
      assert(objA.children.includes(objB))
      assert(objSoA.parent[objB.eid] === objA.eid)
      assert(objSoA.prevSibling[objB.eid] === 0)
      assert(objSoA.nextSibling[objB.eid] === 0)

      objA.add(objC)
      assert(objA.children.includes(objC))
      assert(objSoA.parent[objC.eid] === objA.eid)
      assert(objSoA.prevSibling[objC.eid] === objB.eid)
      assert(objSoA.nextSibling[objC.eid] === 0)
      assert(objSoA.nextSibling[objB.eid] === objC.eid)

      objA.add(objD)
      assert(objA.children.includes(objD))
      assert(objSoA.parent[objD.eid] === objA.eid)
      assert(objSoA.prevSibling[objD.eid] === objC.eid)
      assert(objSoA.nextSibling[objD.eid] === 0)
      assert(objSoA.nextSibling[objC.eid] === objD.eid)

      objA.remove(objC)
      assert(objSoA.parent[objC.eid] === 0)
      assert(objSoA.prevSibling[objC.eid] === 0)
      assert(objSoA.nextSibling[objC.eid] === 0)
      assert(objSoA.nextSibling[objB.eid] === objD.eid)
      assert(objSoA.prevSibling[objD.eid] === objB.eid)
    })

  })

})