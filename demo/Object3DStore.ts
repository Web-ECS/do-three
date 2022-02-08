const createMatrix4AoA = (n=10) => {
  const stride = 16
  return Array(n)
    .fill(new Float32Array(n*stride))
    .map((store, i) => store.subarray(i*stride, i*stride+stride))
}

const createEulerSoA = (n=10) => ({
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

const createObject3DStore = (n=10) => ({

  position: createVector3SoA(n),
  rotation: createEulerSoA(n),
  scale: createVector3SoA(n),
  quaternion: createQuaternionSoA(n),

  id: new Int32Array(n),
  parent: new Int32Array(n),
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

export const object3DStore = createObject3DStore(1000)