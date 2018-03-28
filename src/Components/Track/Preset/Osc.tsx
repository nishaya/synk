import SliderControl from 'Components/Common/SliderControl'
import { merge } from 'lodash'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import * as React from 'react'
import { OscSynthPreset } from 'types'

interface Props {
  preset: OscSynthPreset
  onChange: (preset: OscSynthPreset) => void
}

const OscPreset = ({ preset, onChange }: Props) => {
  return (
    <div>
      <DropDownMenu
        onChange={(e: any, i: number, v: string) => {
          onChange(merge({ oscillator: v }, preset))
        }}
      >
        <MenuItem value="sawtooth" primaryText="SAW" />
        <MenuItem value="square" primaryText="SQUARE" />
        <MenuItem value="sine" primaryText="SINE" />
        <MenuItem value="triangle" primaryText="TRIANGLE" />
      </DropDownMenu>
      <SliderControl
        min={0}
        max={127}
        value={preset.aeg.attack}
        label="attack"
        onChange={(v: number) => {
          onChange(merge({ aeg: { attack: v } }, preset))
        }}
      />
      <SliderControl
        min={0}
        max={127}
        value={preset.aeg.decay}
        label="attack"
        onChange={(v: number) => {
          onChange(merge({ aeg: { decay: v } }, preset))
        }}
      />
      <SliderControl
        min={0}
        max={127}
        value={preset.aeg.sustain}
        label="attack"
        onChange={(v: number) => {
          onChange(merge({ aeg: { sustain: v } }, preset))
        }}
      />
      <SliderControl
        min={0}
        max={127}
        value={preset.aeg.release}
        label="attack"
        onChange={(v: number) => {
          onChange(merge({ aeg: { release: v } }, preset))
        }}
      />
    </div>
  )
}

export default OscPreset
