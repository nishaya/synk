import { Mutations } from 'Containers/Session'
import RaisedButton from 'material-ui/RaisedButton'
import * as Icons from 'material-ui/svg-icons'
import * as React from 'react'
import { UIState } from 'Redux/UI'

interface Props {
  mutations: Mutations
  settings: UIState
}

export default ({ mutations, settings }: Props) => (
  <div>
    {settings.keys.get('Meta') ? (
      <RaisedButton icon={<Icons.ActionDelete />} label="Remove" />
    ) : (
      <RaisedButton icon={<Icons.ContentCreate />} label="Edit" />
    )}
    <RaisedButton icon={<Icons.ActionReorder />} label="Quantize" />
    <RaisedButton icon={<Icons.AvLibraryMusic />} label="Resolution" />
    <RaisedButton
      onClick={() =>
        mutations.clearPattern(
          settings.block.currentBlockIndex,
          settings.track.currentTrack
        )
      }
      icon={<Icons.ContentClear color="#f00" />}
      label="Clear Pattern"
    />
  </div>
)
