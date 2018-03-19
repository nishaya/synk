import RaisedButton from 'material-ui/RaisedButton'
import * as Icons from 'material-ui/svg-icons'
import * as React from 'react'

interface Props {
  handleRec?: () => void
}

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
  </div>
)
