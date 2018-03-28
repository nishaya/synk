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
        value={preset.oscillator}
        onChange={(e: any, i: number, v: string) => {
          onChange(merge(preset, { oscillator: v }))
        }}
      >
        <MenuItem value="sawtooth" primaryText="SAWTOOTH" />
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
          onChange(merge(preset, { aeg: { attack: v } }))
        }}
      />
      <SliderControl
        min={0}
        max={127}
        value={preset.aeg.decay}
        label="decay"
        onChange={(v: number) => {
          onChange(merge(preset, { aeg: { decay: v } }))
        }}
      />
      <SliderControl
        min={0}
        max={127}
        value={preset.aeg.sustain}
        label="sustain"
        onChange={(v: number) => {
          onChange(merge(preset, { aeg: { sustain: v } }))
        }}
      />
      <SliderControl
        min={0}
        max={127}
        value={preset.aeg.release}
        label="release"
        onChange={(v: number) => {
          onChange(merge(preset, { aeg: { release: v } }))
        }}
      />
    </div>
  )
}

export default OscPreset
