import { EventSystem, Network } from '../system'
import { AudioFile, AudioFileContext, AudioState } from './audio-file'
import { AudioStorage, CatalogItem } from './audio-storage'
import { BufferSharingTask } from './buffer-sharing-task'
import { FileReaderUtil } from './file-reader-util'

export class AudioSharingSystem {
  private static _instance: AudioSharingSystem

  static get instance(): AudioSharingSystem {
    if (!AudioSharingSystem._instance) AudioSharingSystem._instance = new AudioSharingSystem()
    return AudioSharingSystem._instance
  }

  private sendTaskMap: Map<string, BufferSharingTask<AudioFileContext>> = new Map()

  private receiveTaskMap: Map<string, BufferSharingTask<AudioFileContext>> = new Map()

  private maxSendTask = 2

  private maxReceiveTask = 4

  initialize() {
    console.log('AudioSharingSystem ready...')
    this.destroy()
    EventSystem.register(this)
      .on('CONNECT_PEER', -1, (event) => {
        if (!event.isSendFromSelf) return
        console.log('CONNECT_PEER AudioStorageService !!!', event.data.peer)
        AudioStorage.instance.synchronize()
      })
      .on('SYNCHRONIZE_AUDIO_LIST', (event) => {
        if (event.isSendFromSelf) return
        console.log(`SYNCHRONIZE_AUDIO_LIST ${event.sendFrom}`)

        const otherCatalog: CatalogItem[] = event.data
        const request: CatalogItem[] = []

        console.log(
          'SYNCHRONIZE_AUDIO_LIST active tasks ',
          this.sendTaskMap.size + this.receiveTaskMap.size,
        )
        otherCatalog.forEach((item) => {
          let audio: AudioFile = AudioStorage.instance.get(item.identifier)
          if (audio === null) {
            audio = AudioFile.createEmpty(item.identifier)
            AudioStorage.instance.add(audio)
          }
          if (audio.state < AudioState.COMPLETE && !this.receiveTaskMap.has(item.identifier)) {
            request.push({ identifier: item.identifier, state: audio.state })
          }
        })

        // Peer切断時などのエッジケースに対応する
        if (
          request.length < 1 &&
          !this.hasActiveTask() &&
          otherCatalog.length < AudioStorage.instance.getCatalog().length
        ) {
          AudioStorage.instance.synchronize(event.sendFrom)
        }

        if (request.length < 1 || this.isLimitReceiveTask()) {
          return
        }
        const index = Math.floor(Math.random() * request.length)
        this.request([request[index]], event.sendFrom)
      })
      .on('REQUEST_AUDIO_RESOURE', (event) => {
        if (event.isSendFromSelf) return

        const request: CatalogItem[] = event.data.identifiers
        const randomRequest: CatalogItem[] = []
        request.forEach((item) => {
          const audio: AudioFile = AudioStorage.instance.get(item.identifier)
          if (audio && item.state < audio.state) {
            randomRequest.push({
              identifier: item.identifier,
              state: item.state,
            })
          }
        })

        if (
          this.isLimitSendTask() === false &&
          randomRequest.length > 0 &&
          !this.existsSendTask(event.data.receiver)
        ) {
          // 送信
          console.log(`REQUEST_AUDIO_RESOURE Send!!! ${event.data.receiver} -> ${randomRequest}`)
          const index = Math.floor(Math.random() * randomRequest.length)
          const item: { identifier: string; state: number } = randomRequest[index]
          const audio: AudioFile = AudioStorage.instance.get(item.identifier)
          this.startSendTask(audio, event.data.receiver)
        } else {
          // 中継
          const { candidatePeers } = event.data
          const index = candidatePeers.indexOf(Network.peerId)
          if (index > -1) candidatePeers.splice(index, 1)
          candidatePeers.forEach((peer) => {
            console.log(
              `REQUEST_AUDIO_RESOURE AudioStorageService Relay!!! ${peer} -> ${event.data.identifiers}`,
            )
            EventSystem.call(event, peer)
          })
          console.log(
            `REQUEST_FILE_RESOURE AudioStorageService あぶれた...${event.data.receiver}`,
            randomRequest.length,
          )
        }
      })
      .on('UPDATE_AUDIO_RESOURE', (event) => {
        const updateAudios: AudioFileContext[] = event.data
        console.log(`UPDATE_AUDIO_RESOURE AudioStorageService ${event.sendFrom} -> `, updateAudios)
        updateAudios.forEach((context) => {
          if (context.blob) context.blob = new Blob([context.blob], { type: context.type })
          AudioStorage.instance.add(context)
        })
      })
      .on('START_AUDIO_TRANSMISSION', (event) => {
        console.log(`START_AUDIO_TRANSMISSION ${event.data.fileIdentifier}`)
        const identifier: string = event.data.fileIdentifier
        const audio: AudioFile = AudioStorage.instance.get(identifier)
        if (this.receiveTaskMap.has(identifier) || (audio && AudioState.COMPLETE <= audio.state)) {
          console.warn(`CANCEL_TASK_ ${identifier}`)
          EventSystem.call(`CANCEL_TASK_${identifier}`, null, event.sendFrom)
        } else {
          this.startReceiveTask(identifier)
        }
      })
  }

  private destroy() {
    EventSystem.unregister(this)
  }

  private async startSendTask(audio: AudioFile, sendTo: string) {
    const task = BufferSharingTask.createSendTask<AudioFileContext>(audio.identifier, sendTo)
    this.sendTaskMap.set(audio.identifier, task)

    EventSystem.call('START_AUDIO_TRANSMISSION', { fileIdentifier: audio.identifier }, sendTo)

    const context: AudioFileContext = {
      identifier: audio.identifier,
      name: audio.name,
      blob: null,
      type: '',
      url: null,
    }

    if (audio.state === AudioState.URL) {
      context.url = audio.url
    } else {
      context.blob = <any>await FileReaderUtil.readAsArrayBufferAsync(audio.blob)
      context.type = audio.blob.type
    }

    task.onfinish = () => {
      this.stopSendTask(task.identifier)
      AudioStorage.instance.synchronize()
    }

    task.start(context)
  }

  private startReceiveTask(identifier: string) {
    const audio: AudioFile = AudioStorage.instance.get(identifier)
    const task = BufferSharingTask.createReceiveTask<AudioFileContext>(identifier)
    this.receiveTaskMap.set(identifier, task)

    task.onprogress = (localTask, loded, total) => {
      const context = audio.toContext()
      context.name = `${((loded * 100) / total).toFixed(1)}%`
      audio.apply(context)
    }
    task.onfinish = (localTask, data) => {
      this.stopReceiveTask(localTask.identifier)
      if (data) EventSystem.trigger('UPDATE_AUDIO_RESOURE', [data])
      AudioStorage.instance.synchronize()
    }

    task.start()
    console.log('startReceiveTask => ', this.receiveTaskMap.size)
  }

  private stopSendTask(identifier: string) {
    const task = this.sendTaskMap.get(identifier)
    if (task) {
      task.cancel()
    }
    this.sendTaskMap.delete(identifier)

    console.log('stopSendTask => ', this.sendTaskMap.size)
  }

  private stopReceiveTask(identifier: string) {
    const task = this.receiveTaskMap.get(identifier)
    if (task) {
      task.cancel()
    }
    this.receiveTaskMap.delete(identifier)

    console.log('stopReceiveTask => ', this.receiveTaskMap.size)
  }

  private request(request: CatalogItem[], peer: string) {
    console.log(`requestFile() ${peer}`)
    const peers = Network.peerIds
    peers.splice(peers.indexOf(Network.peerId), 1)
    EventSystem.call(
      'REQUEST_AUDIO_RESOURE',
      { identifiers: request, receiver: Network.peerId, candidatePeers: peers },
      peer,
    )
  }

  private hasActiveTask(): boolean {
    return this.sendTaskMap.size > 0 || this.receiveTaskMap.size > 0
  }

  private isLimitSendTask(): boolean {
    return this.maxSendTask <= this.sendTaskMap.size
  }

  private isLimitReceiveTask(): boolean {
    return this.maxReceiveTask <= this.receiveTaskMap.size
  }

  private existsSendTask(peer: string): boolean {
    const result = [...this.sendTaskMap.values()].find((task) => {
      return task && task.sendTo === peer
    })
    return Boolean(result)
  }
}
