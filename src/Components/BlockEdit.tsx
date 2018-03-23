import PatternComponent from 'Components/Pattern'
import { SessionActions } from 'Containers/Session'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import * as React from 'react'
import { UIState } from 'Redux/UI'
import { Block } from 'types'

interface Props {
  block: Block
  patternIndex: number
  actions: SessionActions
  settings: UIState
}

export default ({ block, patternIndex, actions, settings }: Props) => {
  return (
    <div style={{ padding: '4px' }}>
      <Card>
        <CardHeader title={`Block${block.id} - ${patternIndex}`} />
        <CardText>
          <div style={{ height: '400px' }}>
            <PatternComponent
              settings={settings}
              block={block}
              patternIndex={patternIndex}
              actions={actions}
            />
          </div>
        </CardText>
      </Card>
    </div>
  )
}
