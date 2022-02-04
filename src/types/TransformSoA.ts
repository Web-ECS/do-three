import { EulerSoA } from "../proxy/Euler";
import { QuaternionSoA } from "../proxy/Quaternion";
import { Vector3SoA } from "../proxy/Vector3";

export type TransformSoA = {
  position: Vector3SoA
  rotation: EulerSoA
  scale: Vector3SoA
  quaternion: QuaternionSoA
}