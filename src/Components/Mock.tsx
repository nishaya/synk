import * as React from 'react'
import SessionComponent from 'Components/Session'

const session = {
  id: 'dummy',
  numTracks: 3,
  presets: [],
  blocks: []
}

export default () => (
  <div>
    Mock<SessionComponent session={session} />
  </div>
)
