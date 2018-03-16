import * as React from 'react'
import styled from 'styled-components'

const MIN_DEFAULT = 30
const MAX_DEFAULT = 100

interface Props {
  min?: number
  max?: number
}

const Frame = styled.div`
  border: 1px solid #333;
`

export const Keyboard = ({ min = MIN_DEFAULT, max = MAX_DEFAULT }: Props) => {
  return (
    <div>
      <h2>Keyboard</h2>
      <Frame>
        {new Array(max - min)
          .fill(null)
          .map((_: number, i: number) => <div key={i}>{i}</div>)}
      </Frame>
    </div>
  )
}
