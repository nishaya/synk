import * as React from 'react'
import { Track } from 'types'

interface Props {
  tracks: Track[]
  onTrackChange: (index: number) => void
}

class TrackListComponent extends React.Component<Props> {
  render() {
    const { tracks, onTrackChange } = this.props
    return (
      <div>
        <h3>Tracks</h3>
        {tracks.map(({ level }: Track, i: number) => (
          <div key={i} onClick={() => onTrackChange(i)}>
            track #{i}
          </div>
        ))}
      </div>
    )
  }
}

export default TrackListComponent
