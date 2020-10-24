import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

import { EventSystem, Network } from '@udonarium/core/system'
import { ResettableTimeout } from '@udonarium/core/system/util/resettable-timeout'
import { PeerCursor } from '@udonarium/peer-cursor'

import { PointerCoordinate, PointerDeviceService } from 'service/pointer-device.service'
import { TabletopService } from 'service/tabletop.service'

@Component({
  selector: 'peer-cursor, [peer-cursor]',
  templateUrl: './peer-cursor.component.html',
  styleUrls: ['./peer-cursor.component.scss'],
})
export class PeerCursorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cursor') cursorElementRef: ElementRef

  @ViewChild('opacity') opacityElementRef: ElementRef

  @Input() cursor: PeerCursor = PeerCursor.myCursor

  get iconUrl(): string {
    return this.cursor.image.url
  }

  get name(): string {
    return this.cursor.name
  }

  get isMine(): boolean {
    return this.cursor.isMine
  }

  private cursorElement: HTMLElement = null

  private opacityElement: HTMLElement = null

  private fadeOutTimer: ResettableTimeout = null

  private updateInterval: NodeJS.Timer = null

  private callcack: any = (e) => this.onMouseMove(e)

  private _x = 0

  private _y = 0

  private _target: HTMLElement

  get delayMs(): number {
    const maxDelay = Network.peerIds.length * 16.6
    return maxDelay < 100 ? 100 : maxDelay
  }

  constructor(private tabletopService: TabletopService, private ngZone: NgZone) {}

  ngOnInit() {
    if (!this.isMine) {
      EventSystem.register(this).on('CURSOR_MOVE', (event) => {
        if (event.sendFrom !== this.cursor.peerId) return
        this.tabletopService.addBatch(() => {
          this.stopTransition()
          this.setAnimatedTransition()
          this.setPosition(event.data[0], event.data[1], event.data[2])
          this.resetFadeOut()
        }, this)
      })
    }
  }

  ngAfterViewInit() {
    if (this.isMine) {
      this.ngZone.runOutsideAngular(() => {
        document.body.addEventListener('mousemove', this.callcack)
        document.body.addEventListener('touchmove', this.callcack)
      })
    } else {
      this.cursorElement = this.cursorElementRef.nativeElement
      this.opacityElement = this.opacityElementRef.nativeElement
      this.setAnimatedTransition()
      this.setPosition(0, 0, 0)
      this.resetFadeOut()
    }
  }

  ngOnDestroy() {
    document.body.removeEventListener('mousemove', this.callcack)
    document.body.removeEventListener('touchmove', this.callcack)
    EventSystem.unregister(this)
    this.tabletopService.removeBatch(this)
    if (this.fadeOutTimer) this.fadeOutTimer.clear()
  }

  private onMouseMove(e: any) {
    const x = e.touches ? e.changedTouches[0].pageX : e.pageX
    const y = e.touches ? e.changedTouches[0].pageY : e.pageY
    if (x === this._x && y === this._y) return
    this._x = x
    this._y = y
    this._target = e.target
    if (!this.updateInterval) {
      this.updateInterval = setTimeout(() => {
        this.updateInterval = null
        this.calcLocalCoordinate(this._x, this._y, this._target)
      }, this.delayMs)
    }
  }

  private calcLocalCoordinate(x: number, y: number, target: HTMLElement) {
    if (!document.getElementById('app-table-layer').contains(target)) return

    const dragArea = document.getElementById('app-game-table')
    let coordinate: PointerCoordinate = { x, y, z: 0 }
    if (target.contains(dragArea)) {
      coordinate = PointerDeviceService.convertToLocal(coordinate, dragArea)
      coordinate.z = 0
    } else {
      coordinate = PointerDeviceService.convertLocalToLocal(coordinate, target, dragArea)
    }

    EventSystem.call('CURSOR_MOVE', [coordinate.x, coordinate.y, coordinate.z])
  }

  private resetFadeOut() {
    this.opacityElement.style.opacity = '1.0'
    if (this.fadeOutTimer == null) {
      this.fadeOutTimer = new ResettableTimeout(() => {
        this.opacityElement.style.opacity = '0.0'
      }, 3000)
    }
    this.fadeOutTimer.reset()
  }

  private stopTransition() {
    this.cursorElement.style.transform = window.getComputedStyle(this.cursorElement).transform
  }

  private setAnimatedTransition() {
    this.cursorElement.style.transition = `transform ${
      this.delayMs + 33
    }ms linear, opacity 0.5s ease-out`
  }

  private setPosition(x: number, y: number, z: number) {
    this.cursorElement.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px)`
  }
}
