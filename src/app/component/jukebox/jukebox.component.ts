import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core'

import { AudioFile } from '@udonarium/core/file-storage/audio-file'
import {
  AudioPlayer,
  VolumeType,
} from '@udonarium/core/file-storage/audio-player'
import { AudioStorage } from '@udonarium/core/file-storage/audio-storage'
import { FileArchiver } from '@udonarium/core/file-storage/file-archiver'
import { ObjectStore } from '@udonarium/core/synchronize-object/object-store'
import { EventSystem } from '@udonarium/core/system'
import { Jukebox } from '@udonarium/Jukebox'

import { ModalService } from 'service/modal.service'
import { PanelService } from 'service/panel.service'

@Component({
  selector: 'app-jukebox',
  templateUrl: './jukebox.component.html',
  styleUrls: ['./jukebox.component.scss'],
})
export class JukeboxComponent implements OnInit, OnDestroy {
  get volume(): number {
    return AudioPlayer.volume
  }
  set volume(volume: number) {
    AudioPlayer.volume = volume
  }

  get auditionVolume(): number {
    return AudioPlayer.auditionVolume
  }
  set auditionVolume(auditionVolume: number) {
    AudioPlayer.auditionVolume = auditionVolume
  }

  get audios(): AudioFile[] {
    return AudioStorage.instance.audios.filter((audio) => !audio.isHidden)
  }
  get jukebox(): Jukebox {
    return ObjectStore.instance.get<Jukebox>('Jukebox')
  }

  readonly auditionPlayer: AudioPlayer = new AudioPlayer()
  private lazyUpdateTimer: NodeJS.Timer = null

  public selectedAudio: AudioFile | null = null

  public broadCast: boolean = false

  constructor(
    private modalService: ModalService,
    private panelService: PanelService,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    Promise.resolve().then(
      () =>
        (this.modalService.title = this.panelService.title =
          'ジュークボックス'),
    )
    this.auditionPlayer.volumeType = VolumeType.AUDITION
    EventSystem.register(this).on('*', (event) => {
      if (event.eventName.startsWith('FILE_')) this.lazyNgZoneUpdate()
    })
    if (!this.jukebox?.audio && this.auditionPlayer?.audio) {
      this.broadCastOff()
      this.select(this.auditionPlayer?.audio)
    } else {
      this.broadCastOn()
      this.select(this.jukebox?.audio)
    }
  }

  ngOnDestroy() {
    EventSystem.unregister(this)
    this.broadCastOff()
    this.stop(null)
  }

  broadCastOn() {
    this.broadCast = true
    this.auditionPlayer.stop()
  }

  broadCastOff() {
    this.broadCast = false
  }

  select(audio: AudioFile) {
    this.selectedAudio = audio
  }

  play(audio: AudioFile) {
    if (this.broadCast) {
      this.auditionPlayer.stop()
      this.jukebox.play(audio.identifier, true)
    } else {
      this.auditionPlayer.play(audio)
    }
  }

  stop(audio: AudioFile | null = null) {
    if (this.broadCast) {
      if (this.jukebox.audio === audio) this.jukebox.stop()
    } else {
      this.auditionPlayer.stop()
    }
  }

  handleFileSelect(event: Event) {
    let files = (<HTMLInputElement>event.target).files
    if (files.length) FileArchiver.instance.load(files)
  }

  isDisableAudio(audio: AudioFile | null): boolean {
    if (this.selectedAudio && this.selectedAudio?.isReady) {
      return false
    }
    return true
  }

  isNowPlaying(audio: AudioFile): String {
    if (audio === this.jukebox?.audio && this.jukebox?.isPlaying) {
      return 'Now Playing...'
    }
    if (audio === this.auditionPlayer?.audio && !this.auditionPlayer?.paused) {
      return 'Now Audition...'
    }
  }

  private lazyNgZoneUpdate() {
    if (this.lazyUpdateTimer !== null) return
    this.lazyUpdateTimer = setTimeout(() => {
      this.lazyUpdateTimer = null
      this.ngZone.run(() => {})
    }, 100)
  }
}
