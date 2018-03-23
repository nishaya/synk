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
    <div style={{ backgroundColor: color }}>
      track #{track.index}
      {track.index === currentTrack ? <div>CURRENT TRACK</div> : null}
    </div>
  )
}

export default TrackDetail
