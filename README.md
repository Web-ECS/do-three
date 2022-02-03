# Structure of Array + Three.js Integrations

A library to help integrate Three.js with SoA data.

## SoA Example

```typescript
import assert from 'assert'
import { proxifyVector3 } from 'SoA-three'

const n = 100
const PositionSoA = {
  x: Float32Array(n),
  y: Float32Array(n),
  z: Float32Array(n),
}


const id = 0
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry( 200, 200, 200 ),
  new THREE.MeshBasicMaterial( { wireframe: true } )
)

proxifyVector3(PositionSoA, id, mesh.position)

mesh.position.x = 1
mesh.position.y = 2
mesh.position.z = 3

assert(PositionSoA.x[id] === 1) // true
assert(PositionSoA.y[id] === 2) // true
assert(PositionSoA.z[id] === 3) // true

PositionSoA.x[id] = 4
PositionSoA.y[id] = 5
PositionSoA.z[id] = 6

assert(mesh.position.x === 4) // true
assert(mesh.position.y === 5) // true
assert(mesh.position.z === 6) // true

```

## AoS Example

```typescript
import assert from 'assert'
import { proxifyVector3 } from 'SoA-three'

const n = 100
const stride = 3
const PositionAoS = Array(n)
  .fill(new Float32Array(n*stride))
  .map((store,i) => store.subarray(i*stride, i*stride+stride))

const id = 0
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry( 200, 200, 200 ),
  new THREE.MeshBasicMaterial( { wireframe: true } )
)

proxifyVector3(PositionAoS, id, mesh.position)

mesh.position.x = 1
mesh.position.y = 2
mesh.position.z = 3

assert(PositionAoS[id][0] === 1) // true
assert(PositionAoS[id][1] === 2) // true
assert(PositionAoS[id][2] === 3) // true

PositionAoS[id][0] = 4
PositionAoS[id][1] = 5
PositionAoS[id][2] = 6

assert(mesh.position.x === 4) // true
assert(mesh.position.y === 5) // true
assert(mesh.position.z === 6) // true

```