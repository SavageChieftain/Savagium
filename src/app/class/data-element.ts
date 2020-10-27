import { Attributes } from './core/synchronize-object/attributes'
import { SyncObject, SyncVar } from './core/synchronize-object/decorator'
import { ObjectNode } from './core/synchronize-object/object-node'

@SyncObject('data')
export class DataElement extends ObjectNode {
  @SyncVar() name: string

  @SyncVar() type: string

  @SyncVar() currentValue: number | string

  get isNumberResource(): boolean {
    return this.type != null && this.type === 'numberResource'
  }

  get isNote(): boolean {
    return this.type != null && this.type === 'note'
  }

  public static create(
    name: string,
    value: number | string = '',
    attributes: Attributes = {},
    identifier: string = '',
  ): DataElement {
    let dataElement: DataElement
    if (identifier && identifier.length > 0) {
      dataElement = new DataElement(identifier)
    } else {
      dataElement = new DataElement()
    }
    dataElement.attributes = attributes
    dataElement.name = name
    dataElement.value = value
    dataElement.initialize()

    return dataElement
  }

  getElementsByName(name: string): DataElement[] {
    const children: DataElement[] = []
    this.children.forEach((child) => {
      if (child instanceof DataElement) {
        if (child.getAttribute('name') === name) {
          children.push(child)
        }
        Array.prototype.push.apply(children, child.getElementsByName(name))
      }
    })
    return children
  }

  getElementsByType(type: string): DataElement[] {
    const children: DataElement[] = []
    this.children.forEach((child) => {
      if (child instanceof DataElement) {
        if (child.getAttribute('type') === type) children.push(child)
        Array.prototype.push.apply(children, child.getElementsByType(type))
      }
    })
    return children
  }

  getFirstElementByName(name: string): DataElement {
    let result = this.children.find((child) => {
      if (child instanceof DataElement) {
        return child.getAttribute('name') === name
      }
      return false
    }) as DataElement
    if (!result) {
      result = this.children.find((child) => {
        if (child instanceof DataElement) {
          return child.getFirstElementByName(name)
        }
        return false
      }) as DataElement
    }
    return result
  }
}
