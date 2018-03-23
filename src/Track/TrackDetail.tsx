import Slider from 'material-ui/Slider'
import * as React from 'react'
import { UIState } from 'Redux/UI'
import { Track } from 'types'

interface Props {
  track: Track
  settings: UIState
}

const TrackDetail = ({ track, settings }: Props) => {
  const color = settings.track.trackColors[track.index] || '#fff'
  const currentTrack = settings.track.currentTrack

  return (
    <div>
      <div style={{ backgroundColor: color, padding: 8 }}>
        track #{track.index}
      </div>
      <div style={{ padding: 8 }}>
        <Slider value={track.level} min={0} max={127} />
      </div>
      {track.index === currentTrack ? <div>CURRENT TRACK</div> : null}
    </div>
  )
}

export default TrackDetail
