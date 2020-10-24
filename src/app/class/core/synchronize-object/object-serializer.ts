import { XmlUtil } from '../system/util/xml-util'
import { Attributes } from './attributes'
import { GameObject, ObjectContext } from './game-object'
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
    for (const name in attributes) {
      const attribute = XmlUtil.encodeEntityReference(`${attributes[name]}`)
      if (attribute == null) continue
      attrStr += ` ${name}="${attribute}"`
    }
    xml += `<${tagName + attrStr}>`
    xml += 'innerXml' in gameObject ? (<InnerXml>gameObject).innerXml() : ''
    xml += `</${tagName}>`
    return xml
  }

  static toAttributes(syncData: Object): Attributes {
    const attributes = {}
    for (const syncVar in syncData) {
      const item = syncData[syncVar]
      const key = syncVar
      const childAttr = ObjectSerializer.make2Attributes(item, key)
      for (const name in childAttr) {
        attributes[name] = childAttr[name]
      }
    }
    return attributes
  }

  private static make2Attributes(item: any, key: string): Attributes {
    const attributes = {}
    if (Array.isArray(item)) {
      const arrayAttributes = ObjectSerializer.array2attributes(item, key)
      for (const name in arrayAttributes) {
        attributes[name] = arrayAttributes[name]
      }
    } else if (typeof item === 'object') {
      const objAttributes = ObjectSerializer.object2attributes(item, key)
      for (const name in objAttributes) {
        attributes[name] = objAttributes[name]
      }
    } else {
      attributes[key] = item
    }
    return attributes
  }

  private static object2attributes(obj: any, rootKey: string): Attributes {
    const attributes = {}
    for (const objKey in obj) {
      const item = obj[objKey]
      const key = `${rootKey}.${objKey}`
      const childAttr = ObjectSerializer.make2Attributes(item, key)
      for (const name in childAttr) {
        attributes[name] = childAttr[name]
      }
    }
    return attributes
  }

  private static array2attributes(array: Array<any>, rootKey: string): Attributes {
    const attributes = {}
    const { length } = array
    for (let i = 0; i < length; i++) {
      const item = array[i]
      const key = `${rootKey}.${i}`
      const childAttr = ObjectSerializer.make2Attributes(item, key)
      for (const name in childAttr) {
        attributes[name] = childAttr[name]
      }
    }
    return attributes
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

  static parseAttributes(syncData: Object, attributes: NamedNodeMap): Object {
    const { length } = attributes
    for (let i = 0; i < length; i++) {
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
    for (let i = 0; i < length; i++) {
      const index = parseInt(split[i])
      if (
        parentObj &&
        !Number.isNaN(index) &&
        !Array.isArray(obj) &&
        Object.keys(parentObj).length
      ) {
        parentObj[key] = []
        obj = parentObj[key]
      }
      key = Number.isNaN(index) ? split[i] : index
      if (i + 1 < length) {
        if (obj[key] === undefined) obj[key] = typeof key === 'number' ? [] : {}
        parentObj = obj
        obj = obj[key]
      }
    }
    return { obj, key }
  }

  private static parseInnerXml(element: Element): GameObject {
    return null
  }
}
