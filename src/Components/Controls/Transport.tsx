import RaisedButton from 'material-ui/RaisedButton'
import * as Icons from 'material-ui/svg-icons'
import * as React from 'react'
import styled from 'styled-components'
import { position2time } from 'Utils/time'

interface Props {
  handleRec?: () => void
}

const Time = styled.span`
  margin-left: 16px;
  margin-right: 16px;
  font-size: 32px;
  font-weight: 600;
  font-family: 'Monotype Corsiva';
  letter-spacing: 0.1em;
`

export default ({ handleRec }: Props) => (
  <div>
    {handleRec ? (
      <RaisedButton
        icon={<Icons.ImageLens color="red" />}
        label="Rec"
        onClick={() => handleRec()}
      />
    ) : null}
    <RaisedButton icon={<Icons.AvStop />} label="Stop" />
    <RaisedButton icon={<Icons.AvPlayArrow />} label="Play" />
    <Time>{position2time(0)}</Time>
  </div>
)
