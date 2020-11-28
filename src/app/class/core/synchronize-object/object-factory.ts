// eslint-disable-next-line import/no-cycle
import { GameObject } from './game-object'

export interface Type<T> extends Function {
  new (...args: any[]): T
}

export class ObjectFactory {
  private static _instance: ObjectFactory

  static get instance(): ObjectFactory {
    if (!ObjectFactory._instance) ObjectFactory._instance = new ObjectFactory()
    return ObjectFactory._instance
  }

  private constructorMap: Map<string, Type<GameObject>> = new Map()

  private aliasMap: Map<Type<GameObject>, string> = new Map()

  private constructor() {
    console.log('ObjectFactory ready...')
  }

  register<T extends GameObject>(constructor: Type<T>, alias?: string) {
    let localAlias = alias
    if (!localAlias)
      localAlias = constructor.name || constructor.toString().match(/function\s*([^(]*)\(/)[1]
    if (this.constructorMap.has(localAlias)) {
      console.error(`その alias<${localAlias}> はすでに割り当て済みじゃねー？`)
      return
    }
    if (this.aliasMap.has(constructor)) {
      console.error('その constructor はすでに登録済みじゃねー？', constructor)
      return
    }
    console.log(`addGameObjectFactory -> ${localAlias}`)
    this.constructorMap.set(alias, constructor)
    this.aliasMap.set(constructor, alias)
  }

  create<T extends GameObject>(alias: string, identifer?: string): T {
    const ClassConstructor = this.constructorMap.get(alias)
    if (!ClassConstructor) {
      console.error(`${alias}という名のＧameObjectクラスは定義されていません`)
      return null
    }
    const gameObject: GameObject = new ClassConstructor(identifer)
    return <T>gameObject
  }

  getAlias<T extends GameObject>(constructor: Type<T>): string {
    return this.aliasMap.get(constructor)
  }
}
