import * as React from 'react'
import styled from 'styled-components'

const MIN_DEFAULT = 30
const MAX_DEFAULT = 100

interface Props {
  min?: number
  max?: number
  onKey?: (keyNumber: number) => void
}

const Frame = styled.div`
  border: 1px solid #333;
`

const Key = styled.div`
  background-color: #fff;
  border: 1px solid #333;
  width: 24px;
  height: 80px;
  display: inline-block;
`

const blackKeyStyle = {
  color: '#ccc',
  backgroundColor: '#333'
}

const isBlackKey = (note: number) => [1, 3, 6, 8, 10].includes(note)
const KEY_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B'
]

export const Keyboard = ({
  min = MIN_DEFAULT,
  max = MAX_DEFAULT,
  onKey = (keyNumber: number) => console.log('onKey', keyNumber)
}: Props) => {
  return (
    <div>
      <h2>Keyboard</h2>
      <Frame>
        {new Array(max - min).fill(null).map((_: number, i: number) => {
          const keyNumber = i + min
          const note = keyNumber % 12
          // const oct = ~~(keyNumber / 12)
          return (
            <Key
              style={isBlackKey(note) ? blackKeyStyle : {}}
              key={keyNumber}
              onClick={() => onKey(keyNumber)}
            >
              {KEY_NAMES[note]}
              <br />
              {keyNumber}
            </Key>
          )
        })}
      </Frame>
    </div>
  )
}
