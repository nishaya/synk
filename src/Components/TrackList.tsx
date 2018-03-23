import SynthComponent from 'Components/Track/Synth'
import TrackDetail from 'Components/Track/TrackDetail'
import { SynthActions, TrackActions } from 'Containers/Session'
import * as React from 'react'
import { UIState } from 'Redux/UI'
import { Track } from 'types'

interface Props {
  tracks: Track[]
  settings: UIState
  actions: TrackActions
  synthActions: SynthActions
  onTrackChange: (index: number) => void
}

class TrackListComponent extends React.Component<Props> {
  render() {
    const {
      tracks,
      onTrackChange,
      settings,
      actions,
      synthActions
    } = this.props
    return (
      <div>
        {tracks.map((track: Track, i: number) => {
          return (
            <div key={track.index} onClick={() => onTrackChange(i)}>
              <TrackDetail
                actions={actions}
                track={track}
                settings={settings}
              />
              <SynthComponent track={track} actions={synthActions} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default TrackListComponent
