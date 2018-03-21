import SessionComponent from 'Components/Session'
import * as React from 'react'
import { Session } from 'types'

const session: Session = {
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
      patterns: [
        {
          id: 'dummy1-1',
          notes: []
        },
        {
          id: 'dummy1-2',
          notes: []
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
      patterns: [
        {
          id: 'dummy2-1',
          notes: []
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

export default () => (
  <div>
    <SessionComponent session={session} />
  </div>
)
