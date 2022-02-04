import { TransformSoA } from "../src/types/TransformSoA"

const n = 100
export const Transform: TransformSoA = {
  position: {
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
  },
  rotation: {
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
    order: new Uint8Array(n),
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
