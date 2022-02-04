export type Vector3Component = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
}
export type QuaternionComponent = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  w: Float32Array
}

export type TransformComponent = {
  position: Vector3Component
  rotation: Vector3Component
  scale: Vector3Component
  quaternion: QuaternionComponent
}

const n = 100
export const Transform: TransformComponent = {
  position: {
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
  },
  rotation: {
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
  },
  scale: {
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
  },
  quaternion: {
    x: new Float32Array(n),
    y: new Float32Array(n),
    w: new Float32Array(n),
    z: new Float32Array(n),
  },
}
