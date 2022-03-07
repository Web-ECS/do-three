import { EulerSoA } from "../proxy/math/Euler";
import { QuaternionSoA } from "../proxy/math/Quaternion";
import { Vector3SoA } from "../proxy/math/Vector3";

export type TransformSoA = {
  position: Vector3SoA
  rotation: EulerSoA
  scale: Vector3SoA
  quaternion: QuaternionSoA
  up: Vector3SoA,
}

export type TransformSoAoA = {
  position: Float32Array[]
  rotation: Float32Array[]
  scale: Float32Array[]
  quaternion: Float32Array[]
  up: Float32Array[]
}