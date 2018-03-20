import SessionComponent from 'Components/Session'
import * as React from 'react'
import { Session } from 'types'

const session: Session = {
  id: 'dummy',
  tracks: [
    {
      preset: {
        type: 'osc'
      },
      level: 100,
      pan: 0
    }
  ],
  blocks: [
    {
      id: 'dummy1',
      name: 'A',
      patterns: [
        {
          id: 'dummy',
          notes: []
        }
      ]
    },
    {
      id: 'dummy2',
      name: 'B',
      patterns: [
        {
          id: 'dummy',
          notes: []
        }
      ]
    }
  ],
  arrangement: {
    blocks: []
  }
}

export default () => (
  <div>
    <SessionComponent session={session} />
  </div>
)
