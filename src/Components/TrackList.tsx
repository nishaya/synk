import * as React from 'react'
import { Track } from 'types'

interface Props {
  tracks: Track[]
}

class TrackListComponent extends React.Component<Props> {
  render() {
    const { tracks } = this.props
    return (
      <div>
        <h3>Tracks</h3>
        {tracks.map(({ level }: Track, i: number) => (
          <div key={i}>{level}</div>
        ))}
      </div>
    )
  }
}

export default TrackListComponent
