import * as React from 'react'
import { Block, Pattern } from 'types'
import PatternComponent from 'Components/Pattern'

interface Props {
  block: Block
}

export default ({ block: moge }: Props) => (
  <div>
    <h3>Block</h3>
    {moge.patterns.map((pattern: Pattern) => (
      <div key={pattern.id}>
        <PatternComponent pattern={pattern} />
      </div>
    ))}
  </div>
)
