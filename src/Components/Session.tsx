import * as React from 'react'
import { Session } from 'types'

interface Props {
  session: Session
}

export default ({ session }: Props) => (
  <div>
    <h2>Session</h2>
    <div>numTracks: {session.numTracks}</div>
  </div>
)
