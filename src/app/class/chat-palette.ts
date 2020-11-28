import { SyncObject, SyncVar } from './core/synchronize-object/decorator'
import { ObjectContext } from './core/synchronize-object/game-object'
import { ObjectNode } from './core/synchronize-object/object-node'
import { StringUtil } from './core/system/util/string-util'
import { DataElement } from './data-element'

export interface PaletteLine {
  palette: string
}

export interface PaletteVariable {
  name: string
  value: string
}

@SyncObject('chat-palette')
export class ChatPalette extends ObjectNode {
  @SyncVar() dicebot = 'DiceBot'
  // TODO: キャラシ項目のコピー

  get paletteLines(): PaletteLine[] {
    if (!this.isAnalized) this.parse(<string>this.value)
    return this._paletteLines
  }

  get paletteVariables(): PaletteVariable[] {
    if (!this.isAnalized) this.parse(<string>this.value)
    return this._paletteVariables
  }

  private _palettes: string[] = []

  private _paletteLines: PaletteLine[] = []

  private _paletteVariables: PaletteVariable[] = []

  private isAnalized = false

  getPalette(): string[] {
    if (!this.isAnalized) this.parse(<string>this.value)
    return this._palettes
  }

  setPalette(paletteSource: string) {
    this.value = paletteSource
    this.isAnalized = false
  }

  evaluate(line: PaletteLine, extendVariables?: DataElement): string
  evaluate(line: string, extendVariables?: DataElement): string
  evaluate(line: any, extendVariables?: DataElement): string {
    let evaluate = ''
    if (typeof line === 'string') {
      evaluate = line
    } else {
      evaluate = line.palette
    }

    console.log(evaluate)
    const limit = 128
    let loop = 0
    let isContinue = true
    const callback = (match, name) => {
      const localName = StringUtil.toHalfWidth(name)
      console.log(localName)
      isContinue = true
      const result = this.paletteVariables.find((variable) => {
        return variable.name === localName
      })
      if (result) {
        return result.value
      }
      if (extendVariables) {
        const element = extendVariables.getFirstElementByName(name)
        if (element)
          return element.isNumberResource ? `${element.currentValue}` : `${element.value}`
      }
      return ''
    }
    while (isContinue) {
      loop += 1
      isContinue = false
      evaluate = evaluate.replace(/[{｛]\s*([^{}｛｝]+)\s*[}｝]/g, callback)
      if (limit < loop) isContinue = false
    }
    return evaluate
  }

  private parse(paletteSource: string) {
    this._palettes = paletteSource.split('\n')

    this._paletteLines = []
    this._paletteVariables = []
    this._palettes.forEach((palette) => {
      const variable = this.parseVariable(palette)
      if (variable) {
        this._paletteVariables.push(variable)
        return
      }
      const line: PaletteLine = { palette }
      this._paletteLines.push(line)
    })
    this.isAnalized = true
  }

  private parseVariable(palette: string): PaletteVariable {
    const array = /^\s*[/／]{2}([^=＝{}｛｝\s]+)\s*[=＝]\s*(.+)\s*/gi.exec(palette)
    if (!array) return null
    const variable: PaletteVariable = {
      name: StringUtil.toHalfWidth(array[1]),
      value: array[2],
    }
    return variable
  }

  // override
  apply(context: ObjectContext) {
    super.apply(context)
    this.isAnalized = false
  }
}
