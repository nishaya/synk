import Slider from 'material-ui/Slider'
import * as React from 'react'
import styled from 'styled-components'

const sliderStyle = {
  marginTop: 8,
  marginBottom: 8
}

interface Props {
  min: number
  max: number
  value: number
  label: string
  onChange: (v: number) => void
}

const Container = styled.div`
  display: flex;
  width: 100%;
`

const SliderControl = ({ min, max, value, label, onChange }: Props) => (
  <Container>
    <div
      style={{
        minHeight: '100%',
        width: '20%',
        paddingTop: 8
      }}
    >
      {label}
    </div>
    <div style={{ width: '80%' }}>
      <Slider
        sliderStyle={sliderStyle}
        value={value}
        min={min}
        max={max}
        step={1}
        onChange={(_: any, v: number) => {
          console.log('onChange', v)
          onChange(v)
        }}
      />
    </div>
  </Container>
)

export default SliderControl
