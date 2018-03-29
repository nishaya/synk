import { Mutations } from 'Containers/Session'
import Slider from 'material-ui/Slider'
import * as React from 'react'
import styled from 'styled-components'

const sliderStyle = {
  marginTop: 8,
  marginBottom: 8
}

interface Props {
  bpm: number
  mutations: Mutations
}

const Bpm = styled.div`
  display: inline-block;
  margin-right: 16px;
  font-size: 16px;
  color: #355c7d;
  font-weight: 700;
  font-family: 'Roboto Mono', monospace;
  letter-spacing: 0.1em;
`

const BpmComponent = ({ bpm, mutations }: Props) => {
  return (
    <div style={{ width: 300 }}>
      <Bpm>BPM: {bpm}</Bpm>
      <Slider
        sliderStyle={sliderStyle}
        value={bpm}
        max={240}
        min={40}
        step={1}
        style={{ width: 120 }}
        onChange={(e: any, v: number) => {
          console.log('bpm changed', v)
          mutations.changeBpm(v)
        }}
      />
    </div>
  )
}

export default BpmComponent
