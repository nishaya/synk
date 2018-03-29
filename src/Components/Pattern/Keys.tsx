import * as React from 'react'
import { isBlackKey } from 'Utils/music'

interface Props {
  offsetX: number
  offsetY: number
  min: number
  max: number
  noteHeight: number
  width: number
}

const KeysComponent = ({
  min,
  max,
  noteHeight,
  offsetX,
  offsetY,
  width
}: Props) => {
  const notes = Array(max - min)
    .fill(null)
    .map((_: any, i: number) => max - i)

  return (
    <g>
      {notes.map((note: number, i: number) => (
        <rect
          key={`k_${note}`}
          x={offsetX}
          y={offsetY + noteHeight * i}
          width={width}
          height={noteHeight}
          fill={isBlackKey(note) ? '#666' : '#fff'}
        />
      ))}
    </g>
  )
}

export default KeysComponent
