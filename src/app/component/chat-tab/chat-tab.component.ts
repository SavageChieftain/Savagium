import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'

import { ChatMessage, ChatMessageContext } from '@udonarium/chat-message'
import { ChatTab } from '@udonarium/chat-tab'
import { ObjectStore } from '@udonarium/core/synchronize-object/object-store'
import { EventSystem } from '@udonarium/core/system'
import { ResettableTimeout } from '@udonarium/core/system/util/resettable-timeout'
import { setZeroTimeout } from '@udonarium/core/system/util/zero-timeout'

import { PanelService } from 'service/panel.service'

type ScrollPosition = { top: number; bottom: number; clientHeight: number; scrollHeight: number }

const ua = window.navigator.userAgent.toLowerCase()
const isiOS =
  ua.indexOf('iphone') > -1 ||
  ua.indexOf('ipad') > -1 ||
  (ua.indexOf('macintosh') > -1 && 'ontouchend' in document)

@Component({
  selector: 'chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTabComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges, AfterViewChecked {
  sampleMessages: ChatMessageContext[] = [
    {
      from: 'System',
      timestamp: 0,
      imageIdentifier: '',
      tag: '',
      name: 'チュートリアル',
      text:
        'サーバーを使用しないTRPGオンセツールです。参加者同士で接続し、コマや画像ファイルなどを同期します。',
    },
    {
      from: 'System',
      timestamp: 0,
      imageIdentifier: '',
      tag: '',
      name: 'チュートリアル',
      text:
        '全てのデータが各参加者のブラウザ内にあるため、ルームの状態を次回に持ち越したい場合は、必ず「保存」を実行してセーブデータ（zip）を生成してください。保存したzipの読み込みはブラウザ画面へのファイルドロップで行えます。',
    },
    {
      from: 'System',
      to: '???',
      timestamp: 0,
      imageIdentifier: '',
      tag: '',
      name: 'チュートリアル > プレイヤー',
      text: 'ダイレクトメッセージ（秘密会話）はセーブデータに記録されません。',
    },
    {
      from: 'System',
      to: '???',
      timestamp: 0,
      imageIdentifier: '',
      tag: '',
      name: 'チュートリアル > プレイヤー',
      text:
        'また、過去のダイレクトメッセージはあなたのIDが更新されると同じルーム内であっても見えなくなります。注意してください。',
    },
    {
      from: 'System',
      timestamp: 0,
      imageIdentifier: '',
      tag: '',
      name: 'チュートリアル',
      text:
        '動作推奨環境はデスクトップChromeです。今のところ、スマホからだと上手く操作できません。',
    },
    {
      from: 'System',
      timestamp: 0,
      imageIdentifier: '',
      tag: '',
      name: 'チュートリアル',
      text:
        'チュートリアルは以上です。このチュートリアルは最初のチャットを入力すると非表示になります。',
    },
  ]

  private topTimestamp = 0

  private botomTimestamp = 0

  private needUpdate = true

  @ViewChild('logContainer', { static: true }) logContainerRef: ElementRef<HTMLDivElement>

  @ViewChild('messageContainer', { static: true }) messageContainerRef: ElementRef<HTMLDivElement>

  private topElm: HTMLElement = null

  private bottomElm: HTMLElement = null

  private topElmBox: ClientRect = null

  private bottomElmBox: ClientRect = null

  private topIndex = 0

  private bottomIndex = 0

  private minMessageHeight = 61

  private preScrollTop = 0

  private scrollSpeed = 0

  private _chatMessages: ChatMessage[] = []

  get chatMessages(): ChatMessage[] {
    if (!this.chatTab) return []
    if (this.needUpdate) {
      this.needUpdate = false
      const chatMessages = this.chatTab ? this.chatTab.chatMessages : []
      this.adjustIndex()

      this._chatMessages = chatMessages.slice(this.topIndex, this.bottomIndex + 1)
      this.topTimestamp = this._chatMessages.length > 0 ? this._chatMessages[0].timestamp : 0
      this.botomTimestamp =
        this._chatMessages.length > 0
          ? this._chatMessages[this._chatMessages.length - 1].timestamp
          : 0
    }
    return this._chatMessages
  }

  get minScrollHeight(): number {
    const length = this.chatTab ? this.chatTab.chatMessages.length : this.sampleMessages.length
    return (length < 10000 ? length : 10000) * this.minMessageHeight
  }

  get topSpace(): number {
    return this.minScrollHeight - this.bottomSpace
  }

  get bottomSpace(): number {
    return this.chatMessages.length > 0
      ? (this.chatTab.chatMessages.length - this.bottomIndex - 1) * this.minMessageHeight
      : 0
  }

  private scrollEventShortTimer: ResettableTimeout = null

  private scrollEventLongTimer: ResettableTimeout = null

  private addMessageEventTimer: NodeJS.Timer = null

  private callbackOnScroll: any = () => this.onScroll()

  private callbackOnScrollToBottom: any = () => this.resetMessages()

  @Input() chatTab: ChatTab

  @Output() onAddMessage: EventEmitter<null> = new EventEmitter()

  constructor(
    private ngZone: NgZone,
    private changeDetector: ChangeDetectorRef,
    private panelService: PanelService,
  ) {}

  ngOnInit() {
    const messages: ChatMessage[] = []
    for (const context of this.sampleMessages) {
      const message = new ChatMessage()
      for (const key in context) {
        if (key === 'identifier') continue
        if (key === 'tabIdentifier') continue
        if (key === 'text') {
          message.value = context[key]
          continue
        }
        if (context[key] == null || context[key] === '') continue
        message.setAttribute(key, context[key])
      }
      messages.push(message)
    }
    this.sampleMessages = messages

    EventSystem.register(this)
      .on('MESSAGE_ADDED', (event) => {
        const message = ObjectStore.instance.get<ChatMessage>(event.data.messageIdentifier)
        if (!message || !this.chatTab.contains(message)) return

        if (this.topTimestamp < message.timestamp) {
          this.changeDetector.markForCheck()
          this.needUpdate = true
          this.onMessageInit()
        }
      })
      .on('UPDATE_GAME_OBJECT', (event) => {
        const message = ObjectStore.instance.get(event.data.identifier)
        if (
          message &&
          message instanceof ChatMessage &&
          this.topTimestamp <= message.timestamp &&
          message.timestamp < this.botomTimestamp &&
          this.chatTab.contains(message)
        ) {
          this.changeDetector.markForCheck()
        }
      })
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.scrollEventShortTimer = new ResettableTimeout(() => this.lazyScrollUpdate(), 33)
      this.scrollEventLongTimer = new ResettableTimeout(() => this.lazyScrollUpdate(false), 66)
      this.onScroll()
      this.panelService.scrollablePanel.addEventListener('scroll', this.callbackOnScroll, false)
      this.panelService.scrollablePanel.addEventListener(
        'scrolltobottom',
        this.callbackOnScrollToBottom,
        false,
      )
    })
  }

  ngOnDestroy() {
    EventSystem.unregister(this)
    this.panelService.scrollablePanel.removeEventListener('scroll', this.callbackOnScroll, false)
    this.panelService.scrollablePanel.removeEventListener(
      'scrolltobottom',
      this.callbackOnScrollToBottom,
      false,
    )
    this.scrollEventShortTimer.clear()
    this.scrollEventLongTimer.clear()
    if (this.addMessageEventTimer) clearTimeout(this.addMessageEventTimer)
    this.addMessageEventTimer = null
  }

  ngOnChanges() {
    Promise.resolve().then(() => this.resetMessages())
  }

  ngAfterViewChecked() {
    if (!this.topElm || !this.bottomElm) return
    this.ngZone.runOutsideAngular(() => {
      Promise.resolve().then(() => this.adjustScrollPosition())
    })
  }

  onMessageInit() {
    if (this.addMessageEventTimer != null) return
    this.ngZone.runOutsideAngular(() => {
      this.addMessageEventTimer = setTimeout(() => {
        this.addMessageEventTimer = null
        this.ngZone.run(() => this.onAddMessage.emit())
      }, 66)
    })
  }

  resetMessages() {
    const lastIndex = this.chatTab.chatMessages.length - 1
    this.topIndex =
      lastIndex - Math.floor(this.panelService.scrollablePanel.clientHeight / this.minMessageHeight)
    this.bottomIndex = lastIndex
    this.needUpdate = true
    this.preScrollTop = -1
    this.scrollSpeed = 0
    this.topElm = this.bottomElm = null
    this.adjustIndex()
    this.changeDetector.markForCheck()
  }

  trackByChatMessage(index: number, message: ChatMessage) {
    return message.identifier
  }

  private adjustIndex() {
    const chatMessages = this.chatTab ? this.chatTab.chatMessages : []
    const lastIndex = chatMessages.length > 0 ? chatMessages.length - 1 : 0

    if (this.topIndex < 0) {
      this.topIndex = 0
    }
    if (lastIndex < this.bottomIndex) {
      this.bottomIndex = lastIndex
    }

    if (this.topIndex < 0) this.topIndex = 0
    if (this.bottomIndex < 0) this.bottomIndex = 0
    if (lastIndex < this.topIndex) this.topIndex = lastIndex
    if (lastIndex < this.bottomIndex) this.bottomIndex = lastIndex
  }

  private getScrollPosition(): ScrollPosition {
    let top = this.panelService.scrollablePanel.scrollTop
    const { clientHeight } = this.panelService.scrollablePanel
    const { scrollHeight } = this.panelService.scrollablePanel
    if (top < 0) top = 0
    if (scrollHeight - clientHeight < top) top = scrollHeight - clientHeight
    const bottom = top + clientHeight
    return { top, bottom, clientHeight, scrollHeight }
  }

  private adjustScrollPosition() {
    if (!this.topElm || !this.bottomElm) return

    const hasTopElm = this.logContainerRef.nativeElement.contains(this.topElm)
    const hasBotomElm = this.logContainerRef.nativeElement.contains(this.bottomElm)

    const { hasTopBlank, hasBotomBlank } = this.checkBlank(hasTopElm, hasBotomElm)

    this.topElm = this.bottomElm = null

    if (hasTopBlank || hasBotomBlank || (!hasTopElm && !hasBotomElm)) {
      setZeroTimeout(() => this.lazyScrollUpdate())
    }
  }

  private checkBlank(hasTopElm: boolean, hasBotomElm: boolean) {
    let hasTopBlank = !hasTopElm
    let hasBotomBlank = !hasBotomElm

    if (!hasTopElm && !hasBotomElm) return { hasTopBlank, hasBotomBlank }

    let elm: HTMLElement = null
    let prevBox: ClientRect = null
    let currentBox: ClientRect = null
    let diff = 0
    if (hasBotomElm) {
      elm = this.bottomElm
      prevBox = this.bottomElmBox
    } else if (hasTopElm) {
      elm = this.topElm
      prevBox = this.topElmBox
    }
    currentBox = elm.getBoundingClientRect()
    diff = Math.floor(prevBox.top - currentBox.top - this.scrollSpeed)
    if ((!hasTopBlank || !hasBotomBlank) && 3 ** 2 < diff ** 2) {
      this.panelService.scrollablePanel.scrollTop -= diff
    }

    const logBox: ClientRect = this.logContainerRef.nativeElement.getBoundingClientRect()
    const messageBox: ClientRect = this.messageContainerRef.nativeElement.getBoundingClientRect()

    const messageBoxTop = messageBox.top - logBox.top
    const messageBoxBottom = messageBoxTop + messageBox.height

    const scrollPosition = this.getScrollPosition()

    hasTopBlank = scrollPosition.top < messageBoxTop
    hasBotomBlank =
      messageBoxBottom < scrollPosition.bottom &&
      scrollPosition.bottom < scrollPosition.scrollHeight

    return { hasTopBlank, hasBotomBlank }
  }

  private markForReadIfNeeded() {
    if (!this.chatTab.hasUnread) return

    const scrollPosition = this.getScrollPosition()
    if (scrollPosition.scrollHeight <= scrollPosition.bottom + 100) {
      setZeroTimeout(() => {
        this.chatTab.markForRead()
        this.changeDetector.markForCheck()
        this.ngZone.run(() => {})
      })
    }
  }

  private onScroll() {
    this.scrollEventShortTimer.reset()
    if (!this.scrollEventLongTimer.isActive) {
      this.scrollEventLongTimer.reset()
    }
  }

  private lazyScrollUpdate(isNormalUpdate: boolean = true) {
    this.scrollEventShortTimer.stop()
    this.scrollEventLongTimer.stop()

    const chatMessageElements = this.messageContainerRef.nativeElement.querySelectorAll<
      HTMLElement
    >('chat-message')

    const messageBoxTop = this.messageContainerRef.nativeElement.offsetTop
    const messageBoxBottom = messageBoxTop + this.messageContainerRef.nativeElement.clientHeight

    const preTopIndex = this.topIndex
    const preBottomIndex = this.bottomIndex

    const scrollPosition = this.getScrollPosition()
    this.scrollSpeed = scrollPosition.top - this.preScrollTop
    this.preScrollTop = scrollPosition.top

    const hasTopBlank = scrollPosition.top < messageBoxTop
    const hasBotomBlank =
      messageBoxBottom < scrollPosition.bottom &&
      scrollPosition.bottom < scrollPosition.scrollHeight

    if (!isNormalUpdate) {
      this.scrollEventShortTimer.reset()
    }

    if (!isNormalUpdate && !hasTopBlank && !hasBotomBlank) {
      return
    }

    const scrollWideTop = scrollPosition.top - (!isNormalUpdate && hasTopBlank ? 100 : 1200)
    const scrollWideBottom = scrollPosition.bottom + (!isNormalUpdate && hasBotomBlank ? 100 : 1200)

    this.markForReadIfNeeded()
    this.calcItemIndexRange(
      messageBoxTop,
      messageBoxBottom,
      scrollWideTop,
      scrollWideBottom,
      scrollPosition,
      chatMessageElements,
    )

    const isChangedIndex = this.topIndex != preTopIndex || this.bottomIndex != preBottomIndex
    if (!isChangedIndex) return

    this.needUpdate = true

    this.topElm = chatMessageElements[0]
    this.bottomElm = chatMessageElements[chatMessageElements.length - 1]
    this.topElmBox = this.topElm.getBoundingClientRect()
    this.bottomElmBox = this.bottomElm.getBoundingClientRect()

    setZeroTimeout(() => {
      const scrollPosition = this.getScrollPosition()
      this.scrollSpeed = scrollPosition.top - this.preScrollTop
      this.preScrollTop = scrollPosition.top
      this.changeDetector.markForCheck()
      this.ngZone.run(() => {})
    })
  }

  private calcElementMaxHeight(chatMessageElements: NodeListOf<HTMLElement>): number {
    let maxHeight = this.minMessageHeight
    for (let i = chatMessageElements.length - 1; i >= 0; i--) {
      const height = chatMessageElements[i].clientHeight
      if (maxHeight < height) maxHeight = height
    }
    return maxHeight
  }

  private calcItemIndexRange(
    messageBoxTop: number,
    messageBoxBottom: number,
    scrollWideTop: number,
    scrollWideBottom: number,
    scrollPosition: ScrollPosition,
    chatMessageElements: NodeListOf<HTMLElement>,
  ) {
    if (scrollWideTop >= messageBoxBottom || messageBoxTop >= scrollWideBottom) {
      const lastIndex = this.chatTab.chatMessages.length - 1
      const scrollBottomHeight =
        scrollPosition.scrollHeight - scrollPosition.top - scrollPosition.clientHeight

      this.bottomIndex = lastIndex - Math.floor(scrollBottomHeight / this.minMessageHeight)
      this.topIndex =
        this.bottomIndex - Math.floor(scrollPosition.clientHeight / this.minMessageHeight)

      this.bottomIndex += 1
      this.topIndex -= 1
    } else {
      const maxHeight = this.calcElementMaxHeight(chatMessageElements)
      if (scrollWideTop < messageBoxTop) {
        this.topIndex -= Math.floor((messageBoxTop - scrollWideTop) / maxHeight) + 1
      } else if (scrollWideTop > messageBoxTop) {
        if (!isiOS) this.topIndex += Math.floor((scrollWideTop - messageBoxTop) / maxHeight)
      }

      if (messageBoxBottom > scrollWideBottom) {
        if (!isiOS)
          this.bottomIndex -= Math.floor((messageBoxBottom - scrollWideBottom) / maxHeight)
      } else if (messageBoxBottom < scrollWideBottom) {
        this.bottomIndex += Math.floor((scrollWideBottom - messageBoxBottom) / maxHeight) + 1
      }
    }
    this.adjustIndex()
  }
}
