import * as Color from 'color'
import SliderControl from 'Components/Common/SliderControl'
import { TrackActions } from 'Containers/Session'
import Paper from 'material-ui/Paper'
// import Slider from 'material-ui/Slider'
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

  const transparent = Color(color)
    .fade(0.2)
    .toString()

  const background = `linear-gradient(to right, ${color} 50%, ${transparent} 100%)`

  return (
    <div style={{ padding: 4 }}>
      <Paper zDepth={current ? 2 : 1}>
        <div style={{ background, padding: 8 }}>
          <span style={{ fontWeight: 400, color: '#fff', fontSize: 16 }}>
            #{track.index}
          </span>
        </div>
        {current ? (
          <div style={{ padding: 8 }}>
            <SliderControl
              label="level"
              value={track.level}
              min={0}
              max={127}
              onChange={(v: number) => {
                actions.changeTrackLevel(track.index, v)
              }}
            />
          </div>
        ) : null}
      </Paper>
    </div>
  )
}

export default TrackDetail
