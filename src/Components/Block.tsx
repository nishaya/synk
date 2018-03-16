import * as React from 'react'
import { Block, Pattern } from 'types'
import PatternComponent from 'Components/Pattern'

interface Props {
  block: Block
}

export default ({ block }: Props) => (
  <div>
    <h3>Block</h3>
    {block.patterns.map((pattern: Pattern) => (
      <div key={pattern.id}>
        <PatternComponent pattern={pattern} />
      </div>
    ))}
  </div>
)
