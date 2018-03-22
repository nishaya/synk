import { Note, Session } from 'types'

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

export const session: Session = {
  id: 'dummy',
  tracks: [
    {
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
          notes: []
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
