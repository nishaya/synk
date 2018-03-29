import * as React from 'react'

interface Props {
  xOffset: number
  yOffset: number
  barWidth: number
  noteHeight: number
  beatWidth: number
  startNote: number
}

const gridBgColor = '#fff'
const blackKeyColor = '#eee'

const blackKeys = [
  false,
  true,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  false,
  true,
  false
]

const isBlackKey = (note: number) => {
  return blackKeys[note % 12]
}

// objectBoundingBox, userSpaceOnUse
const GridBg = ({
  xOffset = 0,
  yOffset = 0,
  beatWidth,
  barWidth,
  noteHeight,
  startNote
}: Props) => {
  const patternHeight = noteHeight * 12
  return (
    <pattern
      id="Grid"
      x={xOffset}
      y={yOffset}
      width={barWidth}
      height={patternHeight}
      patternUnits="userSpaceOnUse"
    >
      {Array(12)
        .fill(null)
        .map((_: number, i: number) => {
          const note = startNote - i
          const y = noteHeight * i
          return (
            <g key={`k_${i}`}>
              <rect
                x="0"
                y={y}
                width={barWidth}
                height={noteHeight}
                fill={isBlackKey(note) ? blackKeyColor : gridBgColor}
              />
              <line stroke="#eee" x1="0" y1={y} x2={barWidth} y2={y} />
            </g>
          )
        })}
      <line
        stroke="#aaa"
        strokeWidth="3"
        x1="0"
        y1="0"
        x2="0"
        y2={patternHeight}
      />
      <line
        stroke="#bbb"
        strokeDasharray="5 3"
        x1={beatWidth * 1}
        y1="0"
        x2={beatWidth * 1}
        y2={patternHeight}
      />
      <line
        stroke="#bbb"
        strokeDasharray="5 3"
        x1={beatWidth * 2}
        y1="0"
        x2={beatWidth * 2}
        y2={patternHeight}
      />
      <line
        stroke="#bbb"
        strokeDasharray="5 3"
        x1={beatWidth * 3}
        y1="0"
        x2={beatWidth * 3}
        y2={patternHeight}
      />
    </pattern>
  )
}

export default GridBg
