import * as React from 'react'
import { Track } from 'types'

interface Props {
  tracks: Track[]
}

class TrackListComponent extends React.Component<Props> {
  render() {
    return <div>Tracks</div>
  }
}

export default TrackListComponent
