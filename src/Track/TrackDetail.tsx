import { TrackActions } from 'Containers/Session'
import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'
import * as React from 'react'
import { UIState } from 'Redux/UI'
import { Track } from 'types'

interface Props {
  track: Track
  settings: UIState
  actions: TrackActions
}

const TrackDetail = ({ track, settings, actions }: Props) => {
  const color = settings.track.trackColors[track.index] || '#fff'
  const currentTrack = settings.track.currentTrack
  const current = track.index === currentTrack

  return (
    <div style={{ padding: 4 }}>
      <Paper zDepth={current ? 3 : 1}>
        <div style={{ backgroundColor: color, padding: 8 }}>
          track #{track.index}
        </div>
        <div style={{ padding: 8 }}>
          <Slider
            value={track.level}
            min={0}
            max={127}
            onChange={(_: any, v: number) => {
              actions.changeTrackLevel(track.index, v)
            }}
          />
        </div>
        {current ? <div>CURRENT TRACK</div> : null}
      </Paper>
    </div>
  )
}

export default TrackDetail
