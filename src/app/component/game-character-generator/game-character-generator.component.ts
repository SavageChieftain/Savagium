import { AfterViewInit, Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core'

import { ImageFile } from '@udonarium/core/file-storage/image-file'
import { ImageStorage } from '@udonarium/core/file-storage/image-storage'
import { ObjectSerializer } from '@udonarium/core/synchronize-object/object-serializer'
import { ObjectStore } from '@udonarium/core/synchronize-object/object-store'
import { EventSystem } from '@udonarium/core/system'
import { GameCharacter } from '@udonarium/game-character'
import { GameTableMask } from '@udonarium/game-table-mask'
import { TableSelecter } from '@udonarium/table-selecter'

import { FileSelecterComponent } from 'component/file-selecter/file-selecter.component'
import { ModalService } from 'service/modal.service'
import { PanelService } from 'service/panel.service'

@Component({
  selector: 'game-character-generator',
  templateUrl: './game-character-generator.component.html',
  styleUrls: ['./game-character-generator.component.scss'],
})
export class GameCharacterGeneratorComponent implements OnInit, OnDestroy, AfterViewInit {
  name = 'ゲームキャラクター'

  size = 1

  xml = ''

  minSize = 1

  maxSize = 20

  tableBackgroundImage: ImageFile = ImageFile.createEmpty('null')

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService,
    private panelService: PanelService,
  ) {}

  ngOnInit() {
    Promise.resolve().then(() => (this.panelService.title = 'キャラクタージェネレーター'))
    EventSystem.register(this).on('SELECT_FILE', (event) => {
      console.log(`SELECT_FILE GameCharacterGeneratorComponent ${event.data.fileIdentifier}`)

      const { fileIdentifier } = event.data

      const file: ImageFile = ImageStorage.instance.get(fileIdentifier)
      if (file) this.tableBackgroundImage = file
    })
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    EventSystem.unregister(this)
  }

  createGameCharacter() {
    GameCharacter.create(this.name, this.size, this.tableBackgroundImage.identifier)
  }

  createGameTableMask() {
    const { viewTable } = ObjectStore.instance.get<TableSelecter>('tableSelecter')
    if (!viewTable) return
    const tableMask = GameTableMask.create('マップマスク', 5, 5, 100)
    viewTable.appendChild(tableMask)
  }

  createGameCharacterForXML(xml: string) {
    ObjectSerializer.instance.parseXml(xml)
  }

  openModal() {
    this.modalService.open(FileSelecterComponent)
  }
}
