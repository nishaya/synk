import { TrackActions } from 'Containers/Session'
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

  return (
    <div>
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
      {track.index === currentTrack ? <div>CURRENT TRACK</div> : null}
    </div>
  )
}

export default TrackDetail
