import RaisedButton from 'material-ui/RaisedButton'
import * as Icons from 'material-ui/svg-icons'
import * as React from 'react'

export default () => (
  <div>
    <RaisedButton icon={<Icons.ImageLens color="red" />} label="Rec" />
    <RaisedButton icon={<Icons.AvStop />} label="Stop" />
    <RaisedButton icon={<Icons.AvPlayArrow />} label="Play" />
  </div>
)
