import PatternComponent from 'Components/Pattern'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import * as React from 'react'
import { Block } from 'types'

interface Props {
  block: Block
  patternIndex: number
}

export default ({ block, patternIndex }: Props) => {
  const pattern = block.patterns[patternIndex]
  return (
    <div style={{ padding: '4px' }}>
      <Card>
        <CardHeader title={`Block${block.id} - ${patternIndex}`} />
        <CardText>
          {pattern ? (
            <div key={pattern.id}>
              <PatternComponent pattern={pattern} />
            </div>
          ) : null}
        </CardText>
      </Card>
    </div>
  )
}
