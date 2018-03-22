import PatternComponent from 'Components/Pattern'
import { BlockActions } from 'Containers/Session'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import * as React from 'react'
import { Block } from 'types'

interface Props {
  block: Block
  patternIndex: number
  actions: BlockActions
}

export default ({
  block,
  patternIndex,
  actions: { pattern: patternActions }
}: Props) => {
  const pattern = block.patterns[patternIndex]
  return (
    <div style={{ padding: '4px' }}>
      <Card>
        <CardHeader title={`Block${block.id} - ${patternIndex}`} />
        <CardText>
          {pattern ? (
            <div style={{ height: '400px' }} key={pattern.id}>
              <PatternComponent
                pattern={pattern}
                block={block}
                actions={patternActions}
              />
            </div>
          ) : null}
        </CardText>
      </Card>
    </div>
  )
}
