import { ImageFile } from './core/file-storage/image-file'
import { ImageStorage } from './core/file-storage/image-storage'
import { SyncObject, SyncVar } from './core/synchronize-object/decorator'
import { ObjectNode } from './core/synchronize-object/object-node'
import { Network } from './core/system'

export interface ChatMessageContext {
  identifier?: string
  tabIdentifier?: string
  originFrom?: string
  from?: string
  to?: string
  name?: string
  text?: string
  timestamp?: number
  tag?: string
  dicebot?: string
  imageIdentifier?: string
}

@SyncObject('chat')
export class ChatMessage extends ObjectNode implements ChatMessageContext {
  @SyncVar() originFrom: string

  @SyncVar() from: string

  @SyncVar() to: string

  @SyncVar() name: string

  @SyncVar() tag: string

  @SyncVar() dicebot: string

  @SyncVar() imageIdentifier: string

  get tabIdentifier(): string {
    return this.parent.identifier
  }

  get text(): string {
    return <string>this.value
  }

  get timestamp(): number {
    const timestamp = this.getAttribute('timestamp')
    const num = timestamp ? +timestamp : 0
    return Number.isNaN(num) ? 1 : num
  }

  private _to: string

  private _sendTo: string[] = []

  get sendTo(): string[] {
    if (this._to !== this.to) {
      this._to = this.to
      this._sendTo = this.to != null && this.to.trim().length > 0 ? this.to.trim().split(/\s+/) : []
    }
    return this._sendTo
  }

  private _tag: string

  private _tags: string[] = []

  get tags(): string[] {
    if (this._tag !== this.tag) {
      this._tag = this.tag
      this._tags =
        this.tag != null && this.tag.trim().length > 0 ? this.tag.trim().split(/\s+/) : []
    }
    return this._tags
  }

  get image(): ImageFile {
    return ImageStorage.instance.get(this.imageIdentifier)
  }

  get index(): number {
    return this.minorIndex + this.timestamp
  }

  get isDirect(): boolean {
    return this.sendTo.length > 0
  }

  get isSendFromSelf(): boolean {
    return this.from === Network.peerContext.id || this.originFrom === Network.peerContext.id
  }

  get isRelatedToMe(): boolean {
    return !!(this.sendTo.indexOf(Network.peerContext.id) > -1 || this.isSendFromSelf)
  }

  get isDisplayable(): boolean {
    return this.isDirect ? this.isRelatedToMe : true
  }

  get isSystem(): boolean {
    return this.tags.indexOf('system') > -1
  }

  get isDicebot(): boolean {
    return !!(this.isSystem && this.from === 'System-BCDice')
  }

  get isSecret(): boolean {
    return this.tags.indexOf('secret') > -1
  }
}
