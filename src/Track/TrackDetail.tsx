import * as React from 'react'
import { UIState } from 'Redux/UI'
import { Track } from 'types'

interface Props {
  track: Track
  settings: UIState
}

const TrackDetail = ({ track, settings }: Props) => {
  const color = settings.track.trackColors[track.index] || '#fff'

  return <div style={{ backgroundColor: color }}>track #{track.index}</div>
}

export default TrackDetail
