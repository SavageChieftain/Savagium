import { Card } from './card'
import { ImageFile } from './core/file-storage/image-file'
import { SyncObject, SyncVar } from './core/synchronize-object/decorator'
import { ObjectNode } from './core/synchronize-object/object-node'
import { EventSystem } from './core/system'
import { DataElement } from './data-element'
import { PeerCursor } from './peer-cursor'
import { TabletopObject } from './tabletop-object'
import { moveToTopmost } from './tabletop-object-util'

@SyncObject('card-stack')
export class CardStack extends TabletopObject {
  @SyncVar() rotate = 0

  @SyncVar() zindex = 0

  @SyncVar() owner = ''

  @SyncVar() isShowTotal = true

  static create(name: string, identifier?: string): CardStack {
    let object: CardStack = null

    if (identifier) {
      object = new CardStack(identifier)
    } else {
      object = new CardStack()
    }
    object.createDataElements()
    object.commonDataElement.appendChild(
      DataElement.create('name', name, {}, `name_${object.identifier}`),
    )
    const cardRoot = new ObjectNode(`cardRoot_${object.identifier}`)
    cardRoot.setAttribute('name', 'cardRoot')
    cardRoot.initialize()
    object.appendChild(cardRoot)
    object.initialize()

    return object
  }

  get name(): string {
    return this.getCommonValue('name', '')
  }

  get ownerName(): string {
    const object = PeerCursor.find(this.owner)
    return object ? object.name : ''
  }

  get hasOwner(): boolean {
    return PeerCursor.find(this.owner) != null
  }

  private get cardRoot(): ObjectNode {
    return this.children.find((node) => {
      return node.getAttribute('name') === 'cardRoot'
    })
  }

  get cards(): Card[] {
    return this.cardRoot ? <Card[]>this.cardRoot.children : []
  }

  get topCard(): Card {
    return this.isEmpty ? null : this.cards[0]
  }

  get isEmpty(): boolean {
    return this.cards.length < 1
  }

  get imageFile(): ImageFile {
    return this.topCard ? this.topCard.imageFile : null
  }

  // ObjectNode Lifecycle
  onChildRemoved(child: ObjectNode) {
    super.onChildRemoved(child)
    if (child instanceof Card) {
      EventSystem.trigger('CARD_STACK_DECREASED', {
        cardStackIdentifier: this.identifier,
        cardIdentifier: child.identifier,
      })
    }
  }

  shuffle(): Card[] {
    if (!this.cardRoot) return undefined
    const { length } = this.cardRoot.children
    this.cards.forEach((card) => {
      card.index = Math.random() * length
      card.rotate = Math.floor(Math.random() * 2) * 180
      this.setSamePositionFor(card)
    })
    return this.cards
  }

  drawCard(): Card {
    const card = this.topCard ? <Card>this.cardRoot.removeChild(this.topCard) : null
    if (card) {
      card.rotate += this.rotate
      if (card.rotate > 360) card.rotate -= 360
      this.setSamePositionFor(card)
      card.toTopmost()
    }
    return card
  }

  drawCardAll(): Card[] {
    const { cards } = this
    cards.forEach((card) => {
      this.cardRoot.removeChild(card)
      card.rotate += this.rotate
      this.setSamePositionFor(card)
      if (card.rotate > 360) card.rotate -= 360
    })
    return cards
  }

  faceUp() {
    if (this.topCard) {
      this.topCard.faceUp()
      this.setSamePositionFor(this.topCard)
    }
  }

  faceDown() {
    if (this.topCard) {
      this.topCard.faceDown()
      this.setSamePositionFor(this.topCard)
    }
  }

  faceUpAll() {
    this.cards.forEach((card) => {
      card.faceUp()
      this.setSamePositionFor(card)
    })
  }

  faceDownAll() {
    this.cards.forEach((card) => {
      card.faceDown()
      this.setSamePositionFor(card)
    })
  }

  uprightAll() {
    this.cards.forEach((card) => {
      card.rotate = 0
      this.setSamePositionFor(card)
    })
  }

  unifyCardsSize(size: number): void {
    this.cards.forEach((card) => {
      if (card.size !== size) card.size = size
    })
  }

  putOnTop(card: Card): Card {
    if (!this.cardRoot) return null
    if (!this.topCard) return this.putOnBottom(card)
    card.owner = ''
    card.zindex = 0
    let delta = Math.abs(card.rotate - this.rotate)
    if (delta > 180) delta = 360 - delta
    card.rotate = delta <= 90 ? 0 : 180
    this.setSamePositionFor(card)
    return <Card>this.cardRoot.insertBefore(card, this.topCard)
  }

  putOnBottom(card: Card): Card {
    if (!this.cardRoot) return null
    card.owner = ''
    card.zindex = 0
    let delta = Math.abs(card.rotate - this.rotate)
    if (delta > 180) delta = 360 - delta
    card.rotate = delta <= 90 ? 0 : 180
    this.setSamePositionFor(card)
    return <Card>this.cardRoot.appendChild(card)
  }

  toTopmost() {
    moveToTopmost(this, ['card'])
  }

  // override
  setLocation(location: string) {
    super.setLocation(location)
    const { cards } = this
    cards.forEach((card) => {
      card.setLocation(location)
    })
  }

  private setSamePositionFor(card: Card) {
    card.location.name = this.location.name
    card.location.x = this.location.x
    card.location.y = this.location.y
    card.posZ = this.posZ
  }
}
