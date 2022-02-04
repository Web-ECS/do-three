import { QuaternionSoA, RotationSoA } from "../types"
const { sin, cos } = Math

const EulerOrder = [
  'XYZ',
  'YXZ',
  'ZXY',
  'ZYX',
  'YZX',
  'XZY' 
]

// http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m
export const setQuaternionFromEuler = (quaternion: QuaternionSoA, rotation: RotationSoA, eid: number) => {
  const x = rotation.x[eid]
  const y = rotation.y[eid]
  const z = rotation.z[eid]
  const order = EulerOrder[rotation.order[eid]]

  const c1 = cos( x / 2 )
  const c2 = cos( y / 2 )
  const c3 = cos( z / 2 )

  const s1 = sin( x / 2 )
  const s2 = sin( y / 2 )
  const s3 = sin( z / 2 )

  switch ( order ) {

    case 'XYZ':
      quaternion.x[eid] = s1 * c2 * c3 + c1 * s2 * s3
      quaternion.y[eid] = c1 * s2 * c3 - s1 * c2 * s3
      quaternion.z[eid] = c1 * c2 * s3 + s1 * s2 * c3
      quaternion.w[eid] = c1 * c2 * c3 - s1 * s2 * s3
      break

    case 'YXZ':
      quaternion.x[eid] = s1 * c2 * c3 + c1 * s2 * s3
      quaternion.y[eid] = c1 * s2 * c3 - s1 * c2 * s3
      quaternion.z[eid] = c1 * c2 * s3 - s1 * s2 * c3
      quaternion.w[eid] = c1 * c2 * c3 + s1 * s2 * s3
      break

    case 'ZXY':
      quaternion.x[eid] = s1 * c2 * c3 - c1 * s2 * s3
      quaternion.y[eid] = c1 * s2 * c3 + s1 * c2 * s3
      quaternion.z[eid] = c1 * c2 * s3 + s1 * s2 * c3
      quaternion.w[eid] = c1 * c2 * c3 - s1 * s2 * s3
      break

    case 'ZYX':
      quaternion.x[eid] = s1 * c2 * c3 - c1 * s2 * s3
      quaternion.y[eid] = c1 * s2 * c3 + s1 * c2 * s3
      quaternion.z[eid] = c1 * c2 * s3 - s1 * s2 * c3
      quaternion.w[eid] = c1 * c2 * c3 + s1 * s2 * s3
      break

    case 'YZX':
      quaternion.x[eid] = s1 * c2 * c3 + c1 * s2 * s3
      quaternion.y[eid] = c1 * s2 * c3 + s1 * c2 * s3
      quaternion.z[eid] = c1 * c2 * s3 - s1 * s2 * c3
      quaternion.w[eid] = c1 * c2 * c3 - s1 * s2 * s3
      break

    case 'XZY':
      quaternion.x[eid] = s1 * c2 * c3 - c1 * s2 * s3
      quaternion.y[eid] = c1 * s2 * c3 - s1 * c2 * s3
      quaternion.z[eid] = c1 * c2 * s3 + s1 * s2 * c3
      quaternion.w[eid] = c1 * c2 * c3 + s1 * s2 * s3
      break

  }
}