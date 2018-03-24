import { getAudioCtx } from 'Synth/audio'
import { Block, Note, Pattern } from 'types'
import { sec2pos } from 'Utils/time'

// const UNIT = 480
const LOOP_TIME = 500

export interface PlayerUpdateInfo {
  cursor: number
}

interface ScheduledNote {
  patternIndex: number
  note: Note
}

class Player {
  cursor: number
  bpm: number = 130
  ctx: AudioContext
  intervalId: number

  startTime: number
  prevTime: number

  endPosition: number
  loop: boolean = true

  block: Block

  onUpdate: (info: PlayerUpdateInfo) => void = (info: PlayerUpdateInfo) => {}

  constructor() {
    this.cursor = 0
    this.ctx = getAudioCtx()
  }

  playBlock(cursor: number, block: Block) {
    this.block = block
    this.play(cursor)
  }

  play(cursor: number) {
    this.cursor = cursor
    // this.bpm = bpm
    this.startTime = this.ctx.currentTime
    this.prevTime = this.startTime
    this.intervalId = setInterval(this.mainLoop.bind(this), LOOP_TIME)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  mainLoop() {
    const startPos = this.cursor
    const now = this.ctx.currentTime
    const diff = now - this.prevTime
    const move = sec2pos(diff, this.bpm)
    console.log('player loop', this.cursor, diff, move)
    this.cursor = ~~(this.cursor + move)
    this.scheduleBlock(now, startPos, this.cursor)

    if (this.cursor > this.endPosition) {
      if (this.loop) {
        // TODO: schedule 0 to cursor
        this.cursor = this.cursor % this.endPosition
      } else {
        this.cursor = this.endPosition
        this.stop()
      }
    }

    this.onUpdate({ cursor: this.cursor })

    this.prevTime = now
  }

  scheduleBlock(now: number, start: number, end: number) {
    console.log('cheduleBlock', now, start, end)
    const notes: ScheduledNote[] = []
    if (this.block) {
      this.block.patterns.map((pattern: Pattern, patternIndex: number) => {
        pattern.notes.reduce<ScheduledNote[]>(
          (list: ScheduledNote[], note: Note) => {
            if (note.position >= start && note.position < end) {
              list.push({
                patternIndex,
                note
              })
            }
            return list
          },
          notes
        )
      })
    }
    console.log('notes', notes)
  }
}

export default Player
