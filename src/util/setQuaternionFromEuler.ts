// http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m

import { QuaternionSoA } from "../proxy/Quaternion"
import { Vector3SoA } from "../proxy/Vector3"

const { sin, cos } = Math

export const setQuaternionFromEulerSoA = (quaternion: QuaternionSoA, rotation: Vector3SoA, eid: number, order: string = 'XYZ') => {

  const x = rotation.x[eid]
  const y = rotation.y[eid]
  const z = rotation.z[eid]

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

export const setQuaternionFromEulerAoS = (quaternion: Float32Array, rotation: Float32Array, order: string = 'XYZ' ) => {

  const [x, y, z] = rotation

  const c1 = cos( x / 2 )
  const c2 = cos( y / 2 )
  const c3 = cos( z / 2 )

  const s1 = sin( x / 2 )
  const s2 = sin( y / 2 )
  const s3 = sin( z / 2 )

  switch ( order ) {

    case 'XYZ':
      quaternion[0] = s1 * c2 * c3 + c1 * s2 * s3
      quaternion[1] = c1 * s2 * c3 - s1 * c2 * s3
      quaternion[2] = c1 * c2 * s3 + s1 * s2 * c3
      quaternion[3] = c1 * c2 * c3 - s1 * s2 * s3
      break

    case 'YXZ':
      quaternion[0] = s1 * c2 * c3 + c1 * s2 * s3
      quaternion[1] = c1 * s2 * c3 - s1 * c2 * s3
      quaternion[2] = c1 * c2 * s3 - s1 * s2 * c3
      quaternion[3] = c1 * c2 * c3 + s1 * s2 * s3
      break

    case 'ZXY':
      quaternion[0] = s1 * c2 * c3 - c1 * s2 * s3
      quaternion[1] = c1 * s2 * c3 + s1 * c2 * s3
      quaternion[2] = c1 * c2 * s3 + s1 * s2 * c3
      quaternion[3] = c1 * c2 * c3 - s1 * s2 * s3
      break

    case 'ZYX':
      quaternion[0] = s1 * c2 * c3 - c1 * s2 * s3
      quaternion[1] = c1 * s2 * c3 + s1 * c2 * s3
      quaternion[2] = c1 * c2 * s3 - s1 * s2 * c3
      quaternion[3] = c1 * c2 * c3 + s1 * s2 * s3
      break

    case 'YZX':
      quaternion[0] = s1 * c2 * c3 + c1 * s2 * s3
      quaternion[1] = c1 * s2 * c3 + s1 * c2 * s3
      quaternion[2] = c1 * c2 * s3 - s1 * s2 * c3
      quaternion[3] = c1 * c2 * c3 - s1 * s2 * s3
      break

    case 'XZY':
      quaternion[0] = s1 * c2 * c3 - c1 * s2 * s3
      quaternion[1] = c1 * s2 * c3 - s1 * c2 * s3
      quaternion[2] = c1 * c2 * s3 + s1 * s2 * c3
      quaternion[3] = c1 * c2 * c3 + s1 * s2 * s3
      break

  }
}