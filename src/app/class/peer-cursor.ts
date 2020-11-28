import { ImageFile } from './core/file-storage/image-file'
import { ImageStorage } from './core/file-storage/image-storage'
import { SyncObject, SyncVar } from './core/synchronize-object/decorator'
import { GameObject, ObjectContext } from './core/synchronize-object/game-object'
import { ObjectStore } from './core/synchronize-object/object-store'
import { EventSystem, Network } from './core/system'

@SyncObject('PeerCursor')
export class PeerCursor extends GameObject {
  static myCursor: PeerCursor = null

  private static hash: { [peerId: string]: string } = {}

  @SyncVar() peerId = ''

  @SyncVar() name = ''

  @SyncVar() imageIdentifier = ''

  static find(peerId): PeerCursor {
    const identifier = PeerCursor.hash[peerId]
    if (identifier != null && ObjectStore.instance.get(identifier))
      return ObjectStore.instance.get<PeerCursor>(identifier)
    const cursors = ObjectStore.instance.getObjects<PeerCursor>(PeerCursor)
    const result = cursors.find((cursor) => {
      if (cursor.peerId === peerId) {
        PeerCursor.hash[peerId] = cursor.identifier
        return cursor
      }
      return null
    })
    return result
  }

  static createMyCursor(): PeerCursor {
    if (PeerCursor.myCursor) {
      console.warn('It is already created.')
      return PeerCursor.myCursor
    }
    PeerCursor.myCursor = new PeerCursor()
    PeerCursor.myCursor.peerId = Network.peerId
    PeerCursor.myCursor.initialize()
    return PeerCursor.myCursor
  }

  get isMine(): boolean {
    return PeerCursor.myCursor && PeerCursor.myCursor === this
  }

  get image(): ImageFile {
    return ImageStorage.instance.get(this.imageIdentifier)
  }

  // GameObject Lifecycle
  onStoreAdded() {
    super.onStoreAdded()
    if (!this.isMine) {
      EventSystem.register(this).on('DISCONNECT_PEER', -1000, (event) => {
        if (event.data.peer !== this.peerId) return
        delete PeerCursor.hash[this.peerId]
        ObjectStore.instance.remove(this)
      })
    }
  }

  // GameObject Lifecycle
  onStoreRemoved() {
    super.onStoreRemoved()
    EventSystem.unregister(this)
    delete PeerCursor.hash[this.peerId]
  }

  // override
  apply(context: ObjectContext) {
    if (context.syncData.peerId !== this.peerId) {
      PeerCursor.hash[context.syncData.peerId] = PeerCursor.hash[this.peerId]
      delete PeerCursor.hash[this.peerId]
    }
    super.apply(context)
  }

  isPeerAUdon() {
    return /u.*d.*o.*n/gi.exec(this.peerId) != null
  }
}
