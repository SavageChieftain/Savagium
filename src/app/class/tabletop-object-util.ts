import { ObjectStore } from './core/synchronize-object/object-store'
import { TabletopObject } from './tabletop-object'

type AliasName = string

export interface Stackable extends TabletopObject {
  zindex: number
}

export function moveToTopmost(topmost: Stackable, otherRelatives: AliasName[] = []) {
  let objects: Stackable[] = ObjectStore.instance.getObjects(topmost.aliasName)
  otherRelatives.forEach((aliasName) => {
    objects = objects.concat(ObjectStore.instance.getObjects(aliasName))
  })
  objects = objects.filter((obj) => obj.isVisibleOnTable)

  let maxZindex = -1
  let hasConflict = false
  for (let i = 0; i < objects.length; i += 1) {
    if (maxZindex === objects[i].zindex) {
      hasConflict = true
    } else if (maxZindex < objects[i].zindex) {
      maxZindex = objects[i].zindex
      hasConflict = false
    }
  }

  if (maxZindex === topmost.zindex && !hasConflict) return
  topmost.zindex = maxZindex + 1

  if (topmost.zindex < objects.length + 256) return
  objects.sort((a, b) => a.zindex - b.zindex)

  for (let i = 0; i < objects.length; i += 1) {
    objects[i].zindex = i
  }
}
