import { XmlUtil } from '../system/util/xml-util'
import { Attributes } from './attributes'
// eslint-disable-next-line import/no-cycle
import { GameObject, ObjectContext } from './game-object'
// eslint-disable-next-line import/no-cycle
import { ObjectFactory } from './object-factory'

export interface XmlAttributes extends GameObject {
  toAttributes(): Attributes
  parseAttributes(attributes: NamedNodeMap)
}

export interface InnerXml extends GameObject {
  innerXml(): string
  parseInnerXml(element: Element)
}

export class ObjectSerializer {
  private static _instance: ObjectSerializer

  static toAttributes(syncData: Object): Attributes {
    const attributes = {}
    Object.keys(syncData).forEach((syncVar) => {
      const item = syncData[syncVar]
      const key = syncVar
      const childAttr = ObjectSerializer.make2Attributes(item, key)
      Object.keys(childAttr).forEach((name) => {
        attributes[name] = childAttr[name]
      })
    })
    return attributes
  }

  private static make2Attributes(item: any, key: string): Attributes {
    const attributes = {}
    if (Array.isArray(item)) {
      const arrayAttributes = ObjectSerializer.array2attributes(item, key)
      Object.keys(arrayAttributes).forEach((name) => {
        attributes[name] = arrayAttributes[name]
      })
    } else if (typeof item === 'object') {
      const objAttributes = ObjectSerializer.object2attributes(item, key)
      Object.keys(objAttributes).forEach((name) => {
        attributes[name] = objAttributes[name]
      })
    } else {
      attributes[key] = item
    }
    return attributes
  }

  private static object2attributes(obj: any, rootKey: string): Attributes {
    const attributes = {}
    Object.keys(obj).forEach((objKey) => {
      const item = obj[objKey]
      const key = `${rootKey}.${objKey}`
      const childAttr = ObjectSerializer.make2Attributes(item, key)
      Object.keys(childAttr).forEach((name) => {
        attributes[name] = childAttr[name]
      })
    })
    return attributes
  }

  private static array2attributes(array: Array<any>, rootKey: string): Attributes {
    const attributes = {}
    const { length } = array
    for (let i = 0; i < length; i += 1) {
      const item = array[i]
      const key = `${rootKey}.${i}`
      const childAttr = ObjectSerializer.make2Attributes(item, key)
      Object.keys(childAttr).forEach((name) => {
        attributes[name] = childAttr[name]
      })
    }
    return attributes
  }

  static parseAttributes(syncData: Object, attributes: NamedNodeMap): Object {
    const { length } = attributes
    for (let i = 0; i < length; i += 1) {
      let { value } = attributes[i]
      value = XmlUtil.decodeEntityReference(value)

      const split: string[] = attributes[i].name.split('.')
      let key: string | number = split[0]
      let obj: Object | Array<any> = syncData

      if (split.length > 1) {
        ;({ obj, key } = ObjectSerializer.attributes2object(split, obj, key))
      }

      const type = typeof obj[key]
      if (type !== 'string' && obj[key] != null) {
        value = JSON.parse(value)
      }
      obj[key] = value
    }
    return syncData
  }

  private static attributes2object(split: string[], obj: Object | any[], key: string | number) {
    // 階層構造の解析 foo.bar.0="abc" 等
    // 処理として実装こそしているが、xmlの仕様としては良くないので使用するべきではない.
    let parentObj: Object | Array<any> = null
    const { length } = split
    for (let i = 0; i < length; i += 1) {
      const index = parseInt(split[i], 10)
      if (
        parentObj &&
        !Number.isNaN(index) &&
        !Array.isArray(obj) &&
        Object.keys(parentObj).length
      ) {
        parentObj[key] = []
        // eslint-disable-next-line no-param-reassign
        obj = parentObj[key]
      }
      // eslint-disable-next-line no-param-reassign
      key = Number.isNaN(index) ? split[i] : index
      if (i + 1 < length) {
        if (obj[key] === undefined) obj[key] = typeof key === 'number' ? [] : {}
        parentObj = obj
        // eslint-disable-next-line no-param-reassign
        obj = obj[key]
      }
    }
    return { obj, key }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static parseInnerXml(element: Element): GameObject {
    return null
  }

  static get instance(): ObjectSerializer {
    if (!ObjectSerializer._instance) ObjectSerializer._instance = new ObjectSerializer()
    return ObjectSerializer._instance
  }

  private constructor() {
    console.log('ObjectSerializer ready...')
  }

  toXml(gameObject: GameObject): string {
    let xml = ''
    const attributes =
      'toAttributes' in gameObject
        ? (<XmlAttributes>gameObject).toAttributes()
        : ObjectSerializer.toAttributes(gameObject.toContext().syncData)
    const tagName = gameObject.aliasName

    let attrStr = ''
    Object.keys(attributes).forEach((name) => {
      const attribute = XmlUtil.encodeEntityReference(`${attributes[name]}`)
      if (attribute !== null) {
        attrStr += ` ${name}="${attribute}"`
      }
    })
    xml += `<${tagName + attrStr}>`
    xml += 'innerXml' in gameObject ? (<InnerXml>gameObject).innerXml() : ''
    xml += `</${tagName}>`
    return xml
  }

  parseXml(xml: string | Element): GameObject {
    let xmlElement: Element = null
    if (typeof xml === 'string') {
      xmlElement = XmlUtil.xml2element(xml)
    } else {
      xmlElement = xml
    }
    if (!xmlElement) {
      console.error('xmlElementが空です')
      return null
    }

    const gameObject: GameObject = ObjectFactory.instance.create(xmlElement.tagName)
    if (!gameObject) return null

    if ('parseAttributes' in gameObject) {
      ;(<XmlAttributes>gameObject).parseAttributes(xmlElement.attributes)
    } else {
      const context: ObjectContext = gameObject.toContext()
      ObjectSerializer.parseAttributes(context.syncData, xmlElement.attributes)
      gameObject.apply(context)
    }

    gameObject.initialize()
    if ('parseInnerXml' in gameObject) {
      ;(<InnerXml>gameObject).parseInnerXml(xmlElement)
    }
    return gameObject
  }
}
