import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { EventSystem } from '@udonarium/core/system'
import { DataElement } from '@udonarium/data-element'

@Component({
  selector: 'game-data-element, [game-data-element]',
  templateUrl: './game-data-element.component.html',
  styleUrls: ['./game-data-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDataElementComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() gameDataElement: DataElement = null

  @Input() isEdit = false

  @Input() isTagLocked = false

  @Input() isValueLocked = false

  private _name = ''

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name
    this.setUpdateTimer()
  }

  private _value: number | string = 0

  get value(): number | string {
    return this._value
  }

  set value(value: number | string) {
    this._value = value
    this.setUpdateTimer()
  }

  private _currentValue: number | string = 0

  get currentValue(): number | string {
    return this._currentValue
  }

  set currentValue(currentValue: number | string) {
    this._currentValue = currentValue
    this.setUpdateTimer()
  }

  private updateTimer: NodeJS.Timer = null

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.gameDataElement) this.setValues(this.gameDataElement)

    EventSystem.register(this)
      .on('UPDATE_GAME_OBJECT', -1000, (event) => {
        if (this.gameDataElement && event.data.identifier === this.gameDataElement.identifier) {
          this.setValues(this.gameDataElement)
          this.changeDetector.markForCheck()
        }
      })
      .on('DELETE_GAME_OBJECT', -1000, (event) => {
        if (this.gameDataElement && this.gameDataElement.identifier === event.data.identifier) {
          this.changeDetector.markForCheck()
        }
      })
  }

  ngOnDestroy() {
    EventSystem.unregister(this)
  }

  ngAfterViewInit() {}

  addElement() {
    this.gameDataElement.appendChild(DataElement.create('タグ', '', {}))
  }

  deleteElement() {
    this.gameDataElement.destroy()
  }

  upElement() {
    const parentElement = this.gameDataElement.parent
    const index: number = parentElement.children.indexOf(this.gameDataElement)
    if (index > 0) {
      const prevElement = parentElement.children[index - 1]
      parentElement.insertBefore(this.gameDataElement, prevElement)
    }
  }

  downElement() {
    const parentElement = this.gameDataElement.parent
    const index: number = parentElement.children.indexOf(this.gameDataElement)
    if (index < parentElement.children.length - 1) {
      const nextElement = parentElement.children[index + 1]
      parentElement.insertBefore(nextElement, this.gameDataElement)
    }
  }

  setElementType(type: string) {
    this.gameDataElement.setAttribute('type', type)
  }

  private setValues(object: DataElement) {
    this._name = object.name
    this._currentValue = object.currentValue
    this._value = object.value
  }

  private setUpdateTimer() {
    clearTimeout(this.updateTimer)
    this.updateTimer = setTimeout(() => {
      if (this.gameDataElement.name !== this.name) this.gameDataElement.name = this.name
      if (this.gameDataElement.currentValue !== this.currentValue)
        this.gameDataElement.currentValue = this.currentValue
      if (this.gameDataElement.value !== this.value) this.gameDataElement.value = this.value
      this.updateTimer = null
    }, 66)
  }
}
