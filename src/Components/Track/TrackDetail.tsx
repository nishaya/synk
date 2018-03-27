import * as Color from 'color'
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

  const transparent = Color(color)
    .fade(0.2)
    .toString()

  const background = `linear-gradient(to right, ${color} 50%, ${transparent} 100%)`

  return (
    <div style={{ padding: 4 }}>
      <Paper zDepth={current ? 2 : 1}>
        <div style={{ background, padding: 8 }}>track #{track.index}</div>
        {current ? (
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
        ) : null}
      </Paper>
    </div>
  )
}

export default TrackDetail
