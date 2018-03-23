import { TrackActions } from 'Containers/Session'
import * as React from 'react'
import { UIState } from 'Redux/UI'
import TrackDetail from 'Track/TrackDetail'
import { Track } from 'types'

interface Props {
  tracks: Track[]
  settings: UIState
  actions: TrackActions
  onTrackChange: (index: number) => void
}

class TrackListComponent extends React.Component<Props> {
  render() {
    const { tracks, onTrackChange, settings, actions } = this.props
    return (
      <div>
        <h3>Tracks</h3>
        {tracks.map((track: Track, i: number) => {
          return (
            <div key={track.index} onClick={() => onTrackChange(i)}>
              <TrackDetail
                actions={actions}
                track={track}
                settings={settings}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default TrackListComponent
