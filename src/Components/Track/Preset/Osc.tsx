import SliderControl from 'Components/Common/SliderControl'
import * as React from 'react'
import { OscSynthPreset } from 'types'

interface Props {
  preset: OscSynthPreset
}

const OscPreset = ({ preset }: Props) => {
  return (
    <div>
      <SliderControl
        min={0}
        max={127}
        value={0}
        label="attack"
        onChange={(v: number) => {
          console.log('chnage', v)
        }}
      />
    </div>
  )
}

export default OscPreset
