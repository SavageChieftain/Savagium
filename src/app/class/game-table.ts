import { SyncObject, SyncVar } from './core/synchronize-object/decorator'
import { ObjectNode } from './core/synchronize-object/object-node'
import { EventSystem } from './core/system'
import { GameTableMask } from './game-table-mask'
import { Terrain } from './terrain'

export enum GridType {
  NONE = -1,
  SQUARE = 0,
  HEX_VERTICAL = 1,
  HEX_HORIZONTAL = 2,
}

export enum FilterType {
  NONE = '',
  WHITE = 'white',
  BLACK = 'black',
}

@SyncObject('game-table')
export class GameTable extends ObjectNode {
  @SyncVar() name = 'テーブル'

  @SyncVar() width = 20

  @SyncVar() height = 20

  @SyncVar() gridSize = 50

  @SyncVar() imageIdentifier = 'imageIdentifier'

  @SyncVar() backgroundImageIdentifier = 'imageIdentifier'

  @SyncVar() backgroundFilterType: FilterType = FilterType.NONE

  @SyncVar() selected = false

  @SyncVar() gridType: GridType = GridType.SQUARE

  @SyncVar() gridColor = '#000000e6'

  get terrains(): Terrain[] {
    const terrains: Terrain[] = []
    this.children.forEach((object) => {
      if (object instanceof Terrain) terrains.push(object)
    })
    return terrains
  }

  get masks(): GameTableMask[] {
    const masks: GameTableMask[] = []
    this.children.forEach((object) => {
      if (object instanceof GameTableMask) masks.push(object)
    })
    return masks
  }

  // GameObject Lifecycle
  onStoreAdded() {
    super.onStoreAdded()
    if (this.selected) EventSystem.trigger('SELECT_GAME_TABLE', { identifier: this.identifier })
  }
}
