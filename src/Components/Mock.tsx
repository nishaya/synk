import SessionComponent from 'Components/Session'
import * as React from 'react'
import { Session } from 'types'

const session: Session = {
  id: 'dummy',
  numTracks: 3,
  presets: [
    {
      oscillator: 'sine'
    }
  ],
  blocks: [
    {
      id: 'dummy',
      name: 'A',
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
    Mock<SessionComponent session={session} />
  </div>
)
