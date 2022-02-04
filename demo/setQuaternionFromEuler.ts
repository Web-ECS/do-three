import { TransformComponent } from "./Transform"

const { sin, cos } = Math

export const setQuaternionFromEuler = (Transform: TransformComponent, eid: number) => {
  const x = Transform.rotation.x[eid]
  const y = Transform.rotation.y[eid]
  const z = Transform.rotation.z[eid]

  const c1 = cos( x / 2 )
  const c2 = cos( y / 2 )
  const c3 = cos( z / 2 )

  const s1 = sin( x / 2 )
  const s2 = sin( y / 2 )
  const s3 = sin( z / 2 )

  Transform.quaternion.x[eid] = s1 * c2 * c3 + c1 * s2 * s3
  Transform.quaternion.y[eid] = c1 * s2 * c3 - s1 * c2 * s3
  Transform.quaternion.z[eid] = c1 * c2 * s3 + s1 * s2 * c3
  Transform.quaternion.w[eid] = c1 * c2 * c3 - s1 * s2 * s3
}