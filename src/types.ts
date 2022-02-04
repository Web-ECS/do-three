export type Vector3SoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
}

export type Vector4SoA = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  w: Float32Array
}

export type QuaternionSoA = Vector4SoA

export type TransformSoA = {
  position: Vector3SoA
  rotation: Vector3SoA
  scale: Vector3SoA
  quaternion: QuaternionSoA
}