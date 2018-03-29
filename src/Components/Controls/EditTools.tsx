import { Mutations, PatternActions } from 'Containers/Session'
// import DropDownMenu from 'material-ui/DropDownMenu'
import IconMenu from 'material-ui/IconMenu'
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

const dur2note = (dur: number): string => {
  return `1/${1920 / dur}`
}

export default ({ mutations, settings, actions }: Props) => {
  const { pattern: { quantize, duration } } = settings
  const bQuantize = (
    <RaisedButton
      icon={<Icons.ActionReorder />}
      label={`Quantize: ${dur2note(quantize)}`}
    />
  )
  const bDuration = (
    <RaisedButton
      icon={<Icons.AvLibraryMusic />}
      label={`Duration ${dur2note(duration)}`}
    />
  )
  return (
    <div>
      {settings.keys.get('Meta') ? (
        <RaisedButton icon={<Icons.ActionDelete />} label="Remove" />
      ) : (
        <RaisedButton icon={<Icons.ContentCreate />} label="Edit" />
      )}
      <IconMenu
        iconButtonElement={bQuantize}
        onChange={(_: any, v: number) => actions.setQuantize(v)}
        value={quantize}
      >
        {resolutions.map((r: number) => (
          <MenuItem key={`r_${r}`} value={r} primaryText={dur2note(r)} />
        ))}
      </IconMenu>
      <IconMenu
        iconButtonElement={bDuration}
        onChange={(_: any, v: number) => actions.setNoteDuration(v)}
        value={duration}
      >
        {resolutions.map((r: number) => (
          <MenuItem key={`r_${r}`} value={r} primaryText={dur2note(r)} />
        ))}
      </IconMenu>
      <RaisedButton
        onClick={() =>
          mutations.clearPattern(
            settings.block.currentBlockIndex,
            settings.track.currentTrack
          )
        }
        icon={<Icons.ContentClear color="#f00" />}
        label="Clear"
      />
    </div>
  )
}
