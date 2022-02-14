import { Object3DSoA, Object3DSoAoA } from "..";

export const traverseChildren = (store: Object3DSoA | Object3DSoAoA, eid: number, cb: Function) => {
  let nextChild = store.firstChild[eid]
  while (nextChild) {
    cb(store, nextChild)
    nextChild = store.nextSibling[nextChild]
  }
}