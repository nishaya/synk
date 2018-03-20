import PatternComponent from 'Components/Pattern'
import * as React from 'react'
import { Block } from 'types'

interface Props {
  block: Block
  patternIndex: number
}

export default ({ block, patternIndex }: Props) => {
  const pattern = block.patterns[patternIndex]
  return (
    <div>
      <h3>
        Block{block.id} - {patternIndex}
      </h3>
      {pattern ? (
        <div key={pattern.id}>
          <PatternComponent pattern={pattern} />
        </div>
      ) : null}
    </div>
  )
}
