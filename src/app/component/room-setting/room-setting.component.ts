import { Component, OnDestroy, OnInit } from '@angular/core'

import { PeerContext } from '@udonarium/core/system/network/peer-context'
import { EventSystem, Network } from '@udonarium/core/system'
import { PeerCursor } from '@udonarium/peer-cursor'

import { ModalService } from 'service/modal.service'
import { PanelService } from 'service/panel.service'

@Component({
  selector: 'room-setting',
  templateUrl: './room-setting.component.html',
  styleUrls: ['./room-setting.component.scss'],
})
export class RoomSettingComponent implements OnInit, OnDestroy {
  peers: PeerContext[] = []

  isReloading = false

  roomName = 'ふつうの部屋'

  password = ''

  isPrivate = false

  get peerId(): string {
    return Network.peerId
  }

  get isConnected(): boolean {
    return !(Network.peerIds.length <= 1)
  }

  validateLength = false

  constructor(private panelService: PanelService, private modalService: ModalService) {}

  ngOnInit() {
    Promise.resolve().then(() => (this.modalService.title = this.panelService.title = 'ルーム作成'))
    EventSystem.register(this)
    this.calcPeerId(this.roomName, this.password)
  }

  ngOnDestroy() {
    EventSystem.unregister(this)
  }

  calcPeerId(roomName: string, password: string) {
    const peerId = Network.peerContext ? Network.peerContext.id : PeerContext.generateId()
    const context = PeerContext.create(peerId, PeerContext.generateId('***'), roomName, password)
    this.validateLength = context.fullstring.length < 64
  }

  createRoom() {
    const peerId = Network.peerContext ? Network.peerContext.id : PeerContext.generateId()
    Network.open(peerId, PeerContext.generateId('***'), this.roomName, this.password)
    PeerCursor.myCursor.peerId = Network.peerId

    this.modalService.resolve()
  }
}
