import { Mutations } from 'Containers/Session'
import Slider from 'material-ui/Slider'
import * as React from 'react'

const sliderStyle = {
  marginTop: 8,
  marginBottom: 8
}

interface Props {
  bpm: number
  mutations: Mutations
}

const BpmComponent = ({ bpm, mutations }: Props) => {
  return (
    <div style={{ width: 120 }}>
      <div>BPM: {bpm}</div>
      <Slider
        sliderStyle={sliderStyle}
        value={bpm}
        max={240}
        min={40}
        step={1}
        onChange={(e: any, v: number) => {
          console.log('bpm changed', v)
          mutations.changeBpm(v)
        }}
      />
    </div>
  )
}

export default BpmComponent
