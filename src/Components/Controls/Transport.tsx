import RaisedButton from 'material-ui/RaisedButton'
import * as Icons from 'material-ui/svg-icons'
import * as React from 'react'
import styled from 'styled-components'
import { position2time } from 'Utils/time'

interface Props {
  handleRec?: () => void
  cursor: number
  onStop: () => void
  onPlay: () => void
}

const Time = styled.span`
  margin-left: 16px;
  margin-right: 16px;
  font-size: 32px;
  color: #355c7d;
  font-weight: 700;
  font-family: 'Roboto Mono', monospace;
  letter-spacing: 0.1em;
`

export default ({ handleRec, cursor, onStop, onPlay }: Props) => (
  <div>
    {handleRec ? (
      <RaisedButton
        icon={<Icons.ImageLens color="red" />}
        label="Rec"
        onClick={() => handleRec()}
      />
    ) : null}
    <RaisedButton
      icon={<Icons.AvStop />}
      onClick={() => onStop()}
      label="Stop"
    />
    <RaisedButton
      icon={<Icons.AvPlayArrow />}
      onClick={() => onPlay()}
      label="Play"
    />
    <Time>{position2time(cursor)}</Time>
  </div>
)
