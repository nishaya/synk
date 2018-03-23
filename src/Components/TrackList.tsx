import * as React from 'react'
import { UIState } from 'Redux/UI'
import TrackDetail from 'Track/TrackDetail'
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
        {tracks.map((track: Track, i: number) => {
          return (
            <div key={track.index} onClick={() => onTrackChange(i)}>
              <TrackDetail track={track} settings={settings} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default TrackListComponent
