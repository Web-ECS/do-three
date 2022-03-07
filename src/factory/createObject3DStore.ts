const defaultMax = 1000

export const createMatrix4AoA = (n=defaultMax) => {
  const stride = 16
  return Array(n)
    .fill(new Float32Array(n*stride))
    .map((store, i) => store.subarray(i*stride, i*stride+stride))
}

export const createVector3AoA = (n=defaultMax) => {
  const stride = 3
  return Array(n)
    .fill(new Float32Array(n*stride))
    .map((store, i) => store.subarray(i*stride, i*stride+stride))
}

export const createVector4AoA = (n=defaultMax) => {
  const stride = 4
  return Array(n)
    .fill(new Float32Array(n*stride))
    .map((store, i) => store.subarray(i*stride, i*stride+stride))
}

export const createEulerSoA = (n=defaultMax) => ({
  x: new Float32Array(n),
  y: new Float32Array(n),
  z: new Float32Array(n),
  order: new Uint8Array(n),
})

export const createQuaternionSoA = (n=defaultMax) => ({
  x: new Float32Array(n),
  y: new Float32Array(n),
  z: new Float32Array(n),
  w: new Float32Array(n),
})

export const createVector3SoA = (n=defaultMax) => ({
  x: new Float32Array(n),
  y: new Float32Array(n),
  z: new Float32Array(n),
})

export const createObject3DSoA = (n=defaultMax) => ({

  position: createVector3SoA(n),
  rotation: createEulerSoA(n),
  scale: createVector3SoA(n),
  quaternion: createQuaternionSoA(n),

  id: new Uint32Array(n),
  parent: new Uint32Array(n),
  firstChild: new Uint32Array(n),
  prevSibling: new Uint32Array(n),
  nextSibling: new Uint32Array(n),
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

export const createObject3DSoAoA = (n=defaultMax) => ({

  position: createVector3AoA(n),
  rotation: createVector4AoA(n),
  scale: createVector3AoA(n),
  quaternion: createVector4AoA(n),

  id: new Uint32Array(n),
  parent: new Uint32Array(n),
  firstChild: new Uint32Array(n),
  prevSibling: new Uint32Array(n),
  nextSibling: new Uint32Array(n),
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
