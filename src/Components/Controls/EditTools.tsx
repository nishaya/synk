import RaisedButton from 'material-ui/RaisedButton'
import * as Icons from 'material-ui/svg-icons'
import * as React from 'react'

interface Props {}

export default ({  }: Props) => (
  <div>
    <RaisedButton icon={<Icons.ContentCreate />} label="Edit" />
    <RaisedButton icon={<Icons.ActionReorder />} label="Quantize" />
    <RaisedButton icon={<Icons.AvLibraryMusic />} label="Resolution" />
  </div>
)
