import { ChatPalette } from './chat-palette'
import { SyncObject, SyncVar } from './core/synchronize-object/decorator'
import { DataElement } from './data-element'
import { TabletopObject } from './tabletop-object'

@SyncObject('character')
export class GameCharacter extends TabletopObject {
  @SyncVar() rotate = 0

  @SyncVar() roll = 0

  get name(): string {
    return this.getCommonValue('name', '')
  }

  get size(): number {
    return this.getCommonValue('size', 1)
  }

  get chatPalette(): ChatPalette {
    for (const child of this.children) {
      if (child instanceof ChatPalette) return child
    }
    return null
  }

  static create(name: string, size: number, imageIdentifier: string): GameCharacter {
    const gameCharacter: GameCharacter = new GameCharacter()
    gameCharacter.createDataElements()
    gameCharacter.initialize()
    gameCharacter.createTestGameDataElement(name, size, imageIdentifier)

    return gameCharacter
  }

  createTestGameDataElement(name: string, size: number, imageIdentifier: string) {
    this.createDataElements()

    const nameElement: DataElement = DataElement.create('name', name, {}, `name_${this.identifier}`)
    const sizeElement: DataElement = DataElement.create('size', size, {}, `size_${this.identifier}`)

    if (this.imageDataElement.getFirstElementByName('imageIdentifier')) {
      this.imageDataElement.getFirstElementByName('imageIdentifier').value = imageIdentifier
    }

    const resourceElement: DataElement = DataElement.create(
      'リソース',
      '',
      {},
      `リソース${this.identifier}`,
    )
    const hpElement: DataElement = DataElement.create(
      'HP',
      200,
      { type: 'numberResource', currentValue: '200' },
      `HP_${this.identifier}`,
    )
    const mpElement: DataElement = DataElement.create(
      'MP',
      100,
      { type: 'numberResource', currentValue: '100' },
      `MP_${this.identifier}`,
    )

    this.commonDataElement.appendChild(nameElement)
    this.commonDataElement.appendChild(sizeElement)

    this.detailDataElement.appendChild(resourceElement)
    resourceElement.appendChild(hpElement)
    resourceElement.appendChild(mpElement)

    // TEST
    let testElement: DataElement = DataElement.create('情報', '', {}, `情報${this.identifier}`)
    this.detailDataElement.appendChild(testElement)
    testElement.appendChild(
      DataElement.create(
        '説明',
        'ここに説明を書く\nあいうえお',
        { type: 'note' },
        `説明${this.identifier}`,
      ),
    )
    testElement.appendChild(
      DataElement.create(
        'メモ',
        '任意の文字列\n１\n２\n３\n４\n５',
        { type: 'note' },
        `メモ${this.identifier}`,
      ),
    )

    // TEST
    testElement = DataElement.create('能力', '', {}, `能力${this.identifier}`)
    this.detailDataElement.appendChild(testElement)
    testElement.appendChild(DataElement.create('器用度', 24, {}, `器用度${this.identifier}`))
    testElement.appendChild(DataElement.create('敏捷度', 24, {}, `敏捷度${this.identifier}`))
    testElement.appendChild(DataElement.create('筋力', 24, {}, `筋力${this.identifier}`))
    testElement.appendChild(DataElement.create('生命力', 24, {}, `生命力${this.identifier}`))
    testElement.appendChild(DataElement.create('知力', 24, {}, `知力${this.identifier}`))
    testElement.appendChild(DataElement.create('精神力', 24, {}, `精神力${this.identifier}`))

    // TEST
    testElement = DataElement.create('戦闘特技', '', {}, `戦闘特技${this.identifier}`)
    this.detailDataElement.appendChild(testElement)
    testElement.appendChild(DataElement.create('Lv1', '全力攻撃', {}, `Lv1${this.identifier}`))
    testElement.appendChild(
      DataElement.create('Lv3', '武器習熟/ソード', {}, `Lv3${this.identifier}`),
    )
    testElement.appendChild(
      DataElement.create('Lv5', '武器習熟/ソードⅡ', {}, `Lv5${this.identifier}`),
    )
    testElement.appendChild(DataElement.create('Lv7', '頑強', {}, `Lv7${this.identifier}`))
    testElement.appendChild(DataElement.create('Lv9', '薙ぎ払い', {}, `Lv9${this.identifier}`))
    testElement.appendChild(DataElement.create('自動', '治癒適正', {}, `自動${this.identifier}`))

    const domParser: DOMParser = new DOMParser()
    const gameCharacterXMLDocument: Document = domParser.parseFromString(
      this.rootDataElement.toXml(),
      'application/xml',
    )

    const palette: ChatPalette = new ChatPalette(`ChatPalette_${this.identifier}`)
    palette.setPalette(`チャットパレット入力例：
2d6+1 ダイスロール
１ｄ２０＋{敏捷}＋｛格闘｝　{name}の格闘！
//敏捷=10+{敏捷A}
//敏捷A=10
//格闘＝１`)
    palette.initialize()
    this.appendChild(palette)
  }
}
