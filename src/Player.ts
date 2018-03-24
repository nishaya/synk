import { getAudioCtx } from 'Synth/audio'
import { Block, Note, Pattern, SynthPlayHandler } from 'types'
import { BEAT_LENGTH, sec2pos } from 'Utils/time'

// const UNIT = 480
const LOOP_TIME = 300

export interface PlayerUpdateInfo {
  cursor: number
}

interface ScheduledNote {
  patternIndex: number
  note: Note
}

class Player {
  cursor: number
  bpm: number = 120
  ctx: AudioContext
  intervalId: number

  startTime: number
  prevTime: number

  endPosition: number
  loop: boolean = true

  block: Block
  synthPlayHandlers: SynthPlayHandler[] = []

  playing: boolean = false

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
    if (this.playing) {
      console.log('already playing')
      return
    }
    this.cursor = cursor
    // this.bpm = bpm
    this.startTime = this.ctx.currentTime
    this.prevTime = this.startTime
    this.intervalId = setInterval(this.mainLoop.bind(this), LOOP_TIME)
    this.playing = true
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    this.playing = false
  }

  mainLoop() {
    const startPos = this.cursor
    const now = this.ctx.currentTime
    const diff = now - this.prevTime
    const move = sec2pos(diff, this.bpm)
    console.log('player loop', this.cursor, diff, move)
    this.cursor = ~~(this.cursor + move)
    this.scheduleNotes(now, startPos, this.cursor)

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

  scheduleNotes(now: number, start: number, end: number) {
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
    notes.map((scheduledNote: ScheduledNote) => {
      const handler = this.synthPlayHandlers[scheduledNote.patternIndex]
      if (handler) {
        const { note: { note, velocity, position, duration } } = scheduledNote

        const diff = position - start
        handler({
          note,
          velocity,
          duration: this.pos2sec(duration),
          time: now + this.pos2sec(diff)
        })
      }
    })
  }

  pos2sec(pos: number): number {
    return pos / BEAT_LENGTH * (60 / this.bpm)
  }
}

export default Player
