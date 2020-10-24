import { NgZone } from '@angular/core'

type OnGestureCallback = (srcEvent: TouchEvent | MouseEvent | PointerEvent) => void
type OnTransformCallback = (
  transformX: number,
  transformY: number,
  transformZ: number,
  rotateX: number,
  rotateY: number,
  rotateZ: number,
  event: string,
  srcEvent: TouchEvent | MouseEvent | PointerEvent,
) => void

export enum TableTouchGestureEvent {
  PAN = 'pan',
  TAP_PINCH = 'tappinch',
  PINCH = 'pinch',
  ROTATE = 'rotate',
}

export class TableTouchGesture {
  private hammer: HammerManager = null

  private deltaHammerDeltaX = 0

  private deltaHammerDeltaY = 1.0

  private deltaHammerScale = 1.0

  private deltaHammerRotation = 0

  private prevHammerDeltaX = 0

  private prevHammerDeltaY = 0

  private prevHammerScale = 0

  private prevHammerRotation = 0

  private tappedPanTimer: NodeJS.Timer = null

  private tappedPanCenter: HammerPoint = { x: 0, y: 0 }

  ongesture: OnGestureCallback = null

  ontransform: OnTransformCallback = null

  constructor(readonly targetElement: Element, private readonly ngZone: NgZone) {
    this.initializeHammer()
  }

  destroy() {
    this.clearTappedPanTimer()
    this.hammer.destroy()
  }

  private initializeHammer() {
    this.hammer = new Hammer.Manager(this.targetElement, {
      inputClass: Hammer.TouchInput,
    })

    const tap = new Hammer.Tap()
    const pan1p = new Hammer.Pan({ event: 'pan1p', pointers: 1, threshold: 0 })
    const pan2p = new Hammer.Pan({ event: 'pan2p', pointers: 2, threshold: 0 })
    const pinch = new Hammer.Pinch()
    const rotate = new Hammer.Rotate()

    pan1p.recognizeWith(pan2p)
    pan1p.recognizeWith(rotate)
    pan1p.recognizeWith(pinch)

    pan2p.recognizeWith(pinch)
    pan2p.recognizeWith(rotate)
    pinch.recognizeWith(rotate)

    this.hammer.add([tap, pan1p, pan2p, pinch, rotate])

    this.hammer.on('hammer.input', this.onHammer.bind(this))
    this.hammer.on('tap', this.onTap.bind(this))
    this.hammer.on('pan1pstart', this.onTappedPanStart.bind(this))
    this.hammer.on('pan1pmove', this.onTappedPanMove.bind(this))
    this.hammer.on('pan1pend', this.onTappedPanEnd.bind(this))
    this.hammer.on('pan1pcancel', this.onTappedPanEnd.bind(this))
    this.hammer.on('pan2pmove', this.onPanMove.bind(this))
    this.hammer.on('pinchmove', this.onPinchMove.bind(this))
    this.hammer.on('rotatemove', this.onRotateMove.bind(this))

    // iOS で contextmenu が発火しない問題へのworkaround.
    const ua = window.navigator.userAgent.toLowerCase()
    const isiOS =
      ua.indexOf('iphone') > -1 ||
      ua.indexOf('ipad') > -1 ||
      (ua.indexOf('macintosh') > -1 && 'ontouchend' in document)
    if (!isiOS) return
    this.hammer.add(new Hammer.Press({ time: 251 }))
    this.hammer.on('press', (ev) => {
      const event = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: ev.center.x,
        clientY: ev.center.y,
      })
      this.ngZone.run(() => ev.srcEvent.target.dispatchEvent(event))
    })
  }

  private onHammer(ev: HammerInput) {
    if (ev.isFirst) {
      this.deltaHammerScale = ev.scale
      this.deltaHammerRotation = ev.rotation
      this.deltaHammerDeltaX = ev.deltaX
      this.deltaHammerDeltaY = ev.deltaY
    } else {
      this.deltaHammerScale = ev.scale - this.prevHammerScale
      this.deltaHammerRotation = ev.rotation - this.prevHammerRotation
      this.deltaHammerDeltaX = ev.deltaX - this.prevHammerDeltaX
      this.deltaHammerDeltaY = ev.deltaY - this.prevHammerDeltaY
    }
    this.prevHammerScale = ev.scale
    this.prevHammerRotation = ev.rotation
    this.prevHammerDeltaX = ev.deltaX
    this.prevHammerDeltaY = ev.deltaY

    if (this.tappedPanTimer == null || ev.eventType != Hammer.INPUT_START) return
    const distance =
      (this.tappedPanCenter.x - ev.center.x) ** 2 + (this.tappedPanCenter.y - ev.center.y) ** 2
    if (50 ** 2 < distance) {
      this.clearTappedPanTimer()
    }
  }

  private onTap(ev: HammerInput) {
    this.tappedPanCenter = ev.center
    this.tappedPanTimer = setTimeout(() => {
      this.tappedPanTimer = null
    }, 400)
    if (this.ongesture) this.ongesture(ev.srcEvent)
  }

  private onTappedPanStart(ev: HammerInput) {
    if (this.tappedPanTimer == null) return
    this.clearTappedPanTimer(false)
    if (this.ongesture) this.ongesture(ev.srcEvent)
  }

  private onTappedPanEnd(ev: HammerInput) {
    this.clearTappedPanTimer()
  }

  private onTappedPanMove(ev: HammerInput) {
    if (this.tappedPanTimer == null) {
      const transformX = this.deltaHammerDeltaX
      const transformY = this.deltaHammerDeltaY
      const transformZ = 0
      if (this.ontransform)
        this.ontransform(
          transformX,
          transformY,
          transformZ,
          0,
          0,
          0,
          TableTouchGestureEvent.PAN,
          ev.srcEvent,
        )
    } else {
      this.clearTappedPanTimer(false)
      const scale = this.deltaHammerDeltaY
      const transformZ = scale * 7.5
      if (this.ongesture) this.ongesture(ev.srcEvent)
      if (this.ontransform)
        this.ontransform(0, 0, transformZ, 0, 0, 0, TableTouchGestureEvent.TAP_PINCH, ev.srcEvent)
    }
  }

  private onPanMove(ev: HammerInput) {
    this.clearTappedPanTimer()
    const rotateX = (-this.deltaHammerDeltaY / window.innerHeight) * 100
    if (this.ongesture) this.ongesture(ev.srcEvent)
    if (this.ontransform)
      this.ontransform(0, 0, 0, rotateX, 0, 0, TableTouchGestureEvent.ROTATE, ev.srcEvent)
  }

  private onPinchMove(ev: HammerInput) {
    this.clearTappedPanTimer()
    const transformZ = this.deltaHammerScale * 500
    if (this.ongesture) this.ongesture(ev.srcEvent)
    if (this.ontransform)
      this.ontransform(0, 0, transformZ, 0, 0, 0, TableTouchGestureEvent.PINCH, ev.srcEvent)
  }

  private onRotateMove(ev: HammerInput) {
    this.clearTappedPanTimer()
    const rotateZ = this.deltaHammerRotation
    if (this.ongesture) this.ongesture(ev.srcEvent)
    if (this.ontransform)
      this.ontransform(0, 0, 0, 0, 0, rotateZ, TableTouchGestureEvent.ROTATE, ev.srcEvent)
  }

  private clearTappedPanTimer(needsSetNull: boolean = true) {
    clearTimeout(this.tappedPanTimer)
    if (needsSetNull) this.tappedPanTimer = null
  }
}
