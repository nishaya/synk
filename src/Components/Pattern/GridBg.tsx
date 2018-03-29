import * as React from 'react'

interface Props {
  barWidth: number
  noteHeight: number
  beatWidth: number
  startNote: number
}

const gridBgColor = '#fff'

const GridBg = ({ beatWidth, barWidth, noteHeight }: Props) => {
  const patternHeight = noteHeight * 12
  return (
    <pattern
      id="Grid"
      x="0"
      y="0"
      width={barWidth}
      height={patternHeight}
      patternUnits="userSpaceOnUse"
    >
      <rect
        x="0"
        y="0"
        width={barWidth}
        height={noteHeight}
        fill={gridBgColor}
      />
      <line stroke="#aaa" x1="0" y1="0" x2={barWidth} y2="0" />
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
