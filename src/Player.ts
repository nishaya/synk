import { getAudioCtx } from 'Synth/audio'
import { sec2pos } from 'Utils/time'

// const UNIT = 480
const LOOP_TIME = 40

interface PlayerUpdateInfo {
  cursor: number
}

class Player {
  cursor: number
  bpm: number = 130
  ctx: AudioContext
  intervalId: NodeJS.Timer

  startTime: number
  prevTime: number

  onUpdate: (info: PlayerUpdateInfo) => void = (info: PlayerUpdateInfo) => {}

  constructor() {
    this.cursor = 0
    this.ctx = getAudioCtx()
  }

  play(cursor: number) {
    this.cursor = cursor
    // this.bpm = bpm
    this.startTime = this.ctx.currentTime
    this.prevTime = this.startTime
    this.intervalId = setInterval(this.loop, LOOP_TIME)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  loop() {
    console.log('player loop')

    const now = this.ctx.currentTime
    const diff = this.prevTime - now
    const move = sec2pos(diff, this.bpm)
    this.cursor += move

    this.onUpdate({ cursor: this.cursor })
  }
}

export default Player
