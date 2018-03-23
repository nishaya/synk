import * as React from 'react'
import { UIState } from 'Redux/UI'
import { Track } from 'types'

interface Props {
  tracks: Track[]
  settings: UIState
  onTrackChange: (index: number) => void
}

class TrackListComponent extends React.Component<Props> {
  render() {
    const { tracks, onTrackChange, settings } = this.props
    return (
      <div>
        <h3>Tracks</h3>
        {tracks.map(({ level }: Track, i: number) => {
          const color = settings.track.trackColors[i] || '#fff'
          return (
            <div key={i} onClick={() => onTrackChange(i)} style={{ color }}>
              track #{i}
            </div>
          )
        })}
      </div>
    )
  }
}

export default TrackListComponent
