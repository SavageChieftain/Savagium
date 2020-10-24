import { Injectable } from '@angular/core'

import { ChatMessage, ChatMessageContext } from '@udonarium/chat-message'
import { ChatTab } from '@udonarium/chat-tab'
import { ChatTabList } from '@udonarium/chat-tab-list'
import { ObjectStore } from '@udonarium/core/synchronize-object/object-store'
import { Network } from '@udonarium/core/system'
import { PeerContext } from '@udonarium/core/system/network/peer-context'
import { GameCharacter } from '@udonarium/game-character'
import { PeerCursor } from '@udonarium/peer-cursor'

const HOURS = 60 * 60 * 1000

@Injectable()
export class ChatMessageService {
  private intervalTimer: NodeJS.Timer = null

  private timeOffset: number = Date.now()

  private performanceOffset: number = performance.now()

  private ntpApiUrls: string[] = [
    'https://ntp-a1.nict.go.jp/cgi-bin/json',
    'https://ntp-b1.nict.go.jp/cgi-bin/json',
  ]

  gameType = 'DiceBot'

  constructor() {}

  get chatTabs(): ChatTab[] {
    return ChatTabList.instance.chatTabs
  }

  calibrateTimeOffset() {
    if (this.intervalTimer != null) {
      console.log('calibrateTimeOffset was canceled.')
      return
    }
    const index = Math.floor(Math.random() * this.ntpApiUrls.length)
    const ntpApiUrl = this.ntpApiUrls[index]
    const sendTime = performance.now()
    fetch(ntpApiUrl)
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then((jsonObj) => {
        const endTime = performance.now()
        const latency = (endTime - sendTime) / 2
        const timeobj = jsonObj
        const st: number = timeobj.st * 1000
        const fixedTime = st + latency
        this.timeOffset = fixedTime
        this.performanceOffset = endTime
        console.log(`latency: ${latency}ms`)
        console.log(`st: ${st}`)
        console.log(`timeOffset: ${this.timeOffset}`)
        console.log(`performanceOffset: ${this.performanceOffset}`)
        this.setIntervalTimer()
      })
      .catch((error) => {
        console.warn('There has been a problem with your fetch operation: ', error.message)
        this.setIntervalTimer()
      })
    this.setIntervalTimer()
  }

  private setIntervalTimer() {
    this.intervalTimer = setTimeout(() => {
      this.intervalTimer = null
      this.calibrateTimeOffset()
    }, 6 * HOURS)
  }

  getTime(): number {
    return Math.floor(this.timeOffset + (performance.now() - this.performanceOffset))
  }

  sendMessage(
    chatTab: ChatTab,
    text: string,
    gameType: string,
    sendFrom: string,
    sendTo?: string,
  ): ChatMessage {
    const chatMessage: ChatMessageContext = {
      from: Network.peerContext.id,
      to: this.findId(sendTo),
      name: this.makeMessageName(sendFrom, sendTo),
      imageIdentifier: this.findImageIdentifier(sendFrom),
      timestamp: this.calcTimeStamp(chatTab),
      tag: gameType,
      text,
    }

    return chatTab.addMessage(chatMessage)
  }

  private findId(identifier: string): string {
    const object = ObjectStore.instance.get(identifier)
    if (object instanceof GameCharacter) {
      return object.identifier
    }
    if (object instanceof PeerCursor) {
      return PeerContext.create(object.peerId).id
    }
    return null
  }

  private findObjectName(identifier: string): string {
    const object = ObjectStore.instance.get(identifier)
    if (object instanceof GameCharacter) {
      return object.name
    }
    if (object instanceof PeerCursor) {
      return object.name
    }
    return identifier
  }

  private makeMessageName(sendFrom: string, sendTo?: string): string {
    const sendFromName = this.findObjectName(sendFrom)
    if (sendTo == null || sendTo.length < 1) return sendFromName

    const sendToName = this.findObjectName(sendTo)
    return `${sendFromName} > ${sendToName}`
  }

  private findImageIdentifier(identifier: string): string {
    const object = ObjectStore.instance.get(identifier)
    if (object instanceof GameCharacter) {
      return object.imageFile ? object.imageFile.identifier : ''
    }
    if (object instanceof PeerCursor) {
      return object.imageIdentifier
    }
    return identifier
  }

  private calcTimeStamp(chatTab: ChatTab): number {
    const now = this.getTime()
    const latest = chatTab.latestTimeStamp
    return now <= latest ? latest + 1 : now
  }
}
