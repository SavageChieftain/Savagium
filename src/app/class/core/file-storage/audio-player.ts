import { AudioFile, AudioState } from './audio-file'
import { FileReaderUtil } from './file-reader-util'

export enum VolumeType {
  MASTER,
  AUDITION,
}

declare global {
  interface Window {
    AudioContext: typeof AudioContext
    webkitAudioContext: typeof AudioContext
  }
}

type AudioCache = { url: string; blob: Blob }

export class AudioPlayer {
  private static cacheMap: Map<string, AudioCache> = new Map()

  private static _volume = 0.5

  private static _auditionVolume = 0.5

  private static _audioContext: AudioContext

  private static _masterGainNode: GainNode

  private static _auditionGainNode: GainNode

  private _audioElm: HTMLAudioElement

  private _mediaElementSource: MediaElementAudioSourceNode

  audio: AudioFile

  volumeType: VolumeType = VolumeType.MASTER

  private static async playBufferAsync(audio: AudioFile, volume: number = 1.0) {
    const source = await AudioPlayer.createBufferSourceAsync(audio)
    if (!source) return

    const gain = AudioPlayer.audioContext.createGain()
    gain.gain.setValueAtTime(volume, AudioPlayer.audioContext.currentTime)

    gain.connect(AudioPlayer.rootNode)
    source.connect(gain)

    source.onended = () => {
      source.stop()
      source.disconnect()
      gain.disconnect()
      source.buffer = null
    }

    source.start()
  }

  private static async createBufferSourceAsync(audio: AudioFile): Promise<AudioBufferSourceNode> {
    if (!audio) return null
    try {
      let { blob } = audio
      if (audio.state === AudioState.URL) {
        if (AudioPlayer.cacheMap.has(audio.identifier)) {
          blob = AudioPlayer.cacheMap.get(audio.identifier).blob
        } else {
          const cache = await AudioPlayer.createCacheAsync(audio)
          blob = cache && cache.blob ? cache.blob : null
        }
      }
      if (!blob) return null
      const decodedData = await this.decodeAudioDataAsync(blob)
      const source = AudioPlayer.audioContext.createBufferSource()
      source.buffer = decodedData
      return source
    } catch (reason) {
      console.warn(reason)
      return null
    }
  }

  private static async decodeAudioDataAsync(blob: Blob): Promise<AudioBuffer> {
    const arrayBufferResult = await FileReaderUtil.readAsArrayBufferAsync(blob)
    return new Promise((resolve, reject) => {
      AudioPlayer.audioContext.decodeAudioData(
        arrayBufferResult,
        (decodedData) => resolve(decodedData),
        (error) => reject(error),
      )
    })
  }

  private static async getBlobAsync(audio: AudioFile): Promise<Blob> {
    if (audio.blob) return audio.blob
    if (audio.url.length < 1) throw new Error('えっ なにそれ怖い')

    try {
      const response = await fetch(audio.url)
      if (!response.ok) throw new Error('Network response was not ok.')
      const blob = await response.blob()
      return blob
    } catch (error) {
      console.warn('There has been a problem with your fetch operation: ', error.message)
      throw error
    }
  }

  private static async createCacheAsync(audio: AudioFile): Promise<AudioCache> {
    const cache = { url: audio.url, blob: null }
    try {
      cache.blob = await AudioPlayer.getBlobAsync(audio)
    } catch (e) {
      console.error(e)
      return cache
    }

    if (AudioPlayer.cacheMap.has(audio.identifier)) {
      return AudioPlayer.cacheMap.get(audio.identifier)
    }

    cache.url = URL.createObjectURL(cache.blob)
    AudioPlayer.cacheMap.set(audio.identifier, cache)
    return cache
  }

  static resumeAudioContext() {
    AudioPlayer.audioContext.resume()
    const callback = () => {
      AudioPlayer.audioContext.resume()
      document.removeEventListener('touchstart', callback, true)
      document.removeEventListener('mousedown', callback, true)
      console.log('resumeAudioContext')
    }
    document.addEventListener('touchstart', callback, true)
    document.addEventListener('mousedown', callback, true)
  }

  static get audioContext(): AudioContext {
    if (!AudioPlayer._audioContext)
      AudioPlayer._audioContext = new (window.AudioContext || window.webkitAudioContext)()
    return AudioPlayer._audioContext
  }

  static get volume(): number {
    return AudioPlayer._volume
  }

  static set volume(volume: number) {
    AudioPlayer._volume = volume
    AudioPlayer.masterGainNode.gain.setTargetAtTime(
      AudioPlayer._volume,
      AudioPlayer.audioContext.currentTime,
      0.01,
    )
  }

  static get auditionVolume(): number {
    return AudioPlayer._auditionVolume
  }

  static set auditionVolume(auditionVolume: number) {
    AudioPlayer._auditionVolume = auditionVolume
    AudioPlayer.auditionGainNode.gain.setTargetAtTime(
      AudioPlayer._auditionVolume,
      AudioPlayer.audioContext.currentTime,
      0.01,
    )
  }

  private static get masterGainNode(): GainNode {
    if (!AudioPlayer._masterGainNode) {
      const masterGain = AudioPlayer.audioContext.createGain()
      masterGain.gain.setValueAtTime(AudioPlayer._volume, AudioPlayer.audioContext.currentTime)
      masterGain.connect(AudioPlayer.audioContext.destination)
      AudioPlayer._masterGainNode = masterGain
    }
    return AudioPlayer._masterGainNode
  }

  private static get auditionGainNode(): GainNode {
    if (!AudioPlayer._auditionGainNode) {
      const auditionGain = AudioPlayer.audioContext.createGain()
      auditionGain.gain.setValueAtTime(
        AudioPlayer._auditionVolume,
        AudioPlayer.audioContext.currentTime,
      )
      auditionGain.connect(AudioPlayer.audioContext.destination)
      AudioPlayer._auditionGainNode = auditionGain
    }
    return AudioPlayer._auditionGainNode
  }

  static get rootNode(): AudioNode {
    return AudioPlayer.masterGainNode
  }

  static get auditionNode(): AudioNode {
    return AudioPlayer.auditionGainNode
  }

  private get audioElm(): HTMLAudioElement {
    if (!this._audioElm) {
      this._audioElm = new Audio()
      this._audioElm.onplay = () => {}
      this._audioElm.onpause = () => {
        this.mediaElementSource.disconnect()
      }
      this._audioElm.onended = () => {
        this.mediaElementSource.disconnect()
      }
    }
    return this._audioElm
  }

  private get mediaElementSource(): MediaElementAudioSourceNode {
    if (!this._mediaElementSource)
      this._mediaElementSource = AudioPlayer.audioContext.createMediaElementSource(this.audioElm)
    return this._mediaElementSource
  }

  get volume(): number {
    return this.audioElm.volume
  }

  set volume(volume) {
    this.audioElm.volume = volume
  }

  get loop(): boolean {
    return this.audioElm.loop
  }

  set loop(loop) {
    this.audioElm.loop = loop
  }

  get paused(): boolean {
    return this.audioElm.paused
  }

  constructor(audio?: AudioFile) {
    this.audio = audio
  }

  static play(audio: AudioFile, volume: number = 1.0) {
    this.playBufferAsync(audio, volume)
  }

  play(audio: AudioFile = this.audio) {
    this.stop()
    this.audio = audio
    if (!this.audio) return

    let { url } = this.audio

    if (audio.state === AudioState.URL) {
      if (AudioPlayer.cacheMap.has(audio.identifier)) {
        url = AudioPlayer.cacheMap.get(audio.identifier).url
      } else {
        AudioPlayer.createCacheAsync(audio)
      }
    }

    this.mediaElementSource.connect(this.getConnectingAudioNode())
    this.audioElm.src = url
    this.audioElm.load()
    this.audioElm.play().catch((reason) => {
      console.warn(reason)
    })
  }

  pause() {
    this.audioElm.pause()
  }

  stop() {
    if (!this.audioElm) return
    this.pause()
    this.audioElm.currentTime = 0
    this.audioElm.src = ''
    this.audioElm.load()
    this.mediaElementSource.disconnect()
  }

  private getConnectingAudioNode() {
    switch (this.volumeType) {
      case VolumeType.AUDITION:
        return AudioPlayer.auditionNode
      default:
        return AudioPlayer.rootNode
    }
  }
}
