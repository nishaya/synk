import * as React from 'react'

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
          y={offsetY + noteHeight * 0}
          width={width}
          height={noteHeight}
          fill={i % 2 === 0 ? '#00f' : '#f00'}
        />
      ))}
    </g>
  )
}

export default KeysComponent
