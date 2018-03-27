import { Mutations, PatternActions } from 'Containers/Session'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import * as Icons from 'material-ui/svg-icons'
import * as React from 'react'
import { UIState } from 'Redux/UI'

interface Props {
  mutations: Mutations
  settings: UIState
  actions: PatternActions
}

const resolutions = [60, 120, 240, 480, 960, 1920]

export default ({ mutations, settings, actions }: Props) => (
  <div>
    {settings.keys.get('Meta') ? (
      <RaisedButton icon={<Icons.ActionDelete />} label="Remove" />
    ) : (
      <RaisedButton icon={<Icons.ContentCreate />} label="Edit" />
    )}
    <RaisedButton icon={<Icons.ActionReorder />} label="Quantize" />
    <DropDownMenu
      onChange={(_: any, i: number, v: number) => actions.setQuantize(v)}
      value={settings.pattern.quantize}
    >
      {resolutions.map((r: number) => (
        <MenuItem value={r} primaryText={`${r}`} />
      ))}
    </DropDownMenu>
    <RaisedButton icon={<Icons.AvLibraryMusic />} label="Duration" />
    <DropDownMenu
      onChange={(_: any, i: number, v: number) => actions.setNoteDuration(v)}
      value={settings.pattern.duration}
    >
      {resolutions.map((r: number) => (
        <MenuItem value={r} primaryText={`${r}`} />
      ))}
    </DropDownMenu>
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
