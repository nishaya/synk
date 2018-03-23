import { Note, Session } from 'types'
import { BEAT_LENGTH } from 'Utils/time'

const BARS = 4

const genNotes = (): Note[] => {
  const notes: Note[] = []

  for (let i = 0; i < 4; i++) {
    notes.push({
      note: ~~(Math.random() * 10 + 50),
      position: i * 480,
      duration: 480,
      velocity: 100
    })
  }

  return notes
}

const genDrums = (barlength: number = 4): Note[] => {
  const notes: Note[] = []
  for (let i = 0; i < BARS; i++) {
    for (let j = 0; j < 4; j++) {
      notes.push(
        {
          note: 24,
          position: i * 4 * BEAT_LENGTH + BEAT_LENGTH * j,
          duration: 120,
          velocity: 100
        },
        {
          note: 31,
          position: i * 4 * BEAT_LENGTH + BEAT_LENGTH * j + 240,
          duration: 120,
          velocity: 100
        }
      )
    }
  }

  return notes
}

export const session: Session = {
  id: 'dummy',
  tracks: [
    {
      index: 0,
      preset: {
        type: 'osc',
        oscillator: 'sawtooth'
      },
      level: 100,
      pan: 0,
      mute: false,
      solo: false
    },
    {
      index: 1,
      preset: {
        type: 'osc',
        oscillator: 'triangle'
      },
      level: 100,
      pan: 0,
      mute: false,
      solo: false
    },
    {
      index: 2,
      preset: {
        type: 'drums',
        kick: {
          level: 100
        },
        snare: {
          level: 100
        }
      },
      level: 100,
      pan: 0,
      mute: false,
      solo: false
    }
  ],
  blocks: [
    {
      id: 'b1',
      name: 'A',
      bars: 4,
      patterns: [
        {
          id: 'dummy1-1',
          notes: genNotes()
        },
        {
          id: 'dummy1-2',
          notes: genNotes()
        },
        {
          id: 'dummy1-3',
          notes: genDrums()
        }
      ]
    },
    {
      id: 'b2',
      name: 'B',
      bars: 4,
      patterns: [
        {
          id: 'dummy2-1',
          notes: genNotes()
        },
        {
          id: 'dummy2-2',
          notes: []
        },
        {
          id: 'dummy2-3',
          notes: []
        }
      ]
    }
  ],
  arrangement: {
    blocks: [
      {
        blockId: 'b1',
        repeat: 1
      },
      {
        blockId: 'b2',
        repeat: 2
      }
    ]
  }
}
