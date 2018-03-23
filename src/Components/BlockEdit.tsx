import PatternComponent from 'Components/Pattern'
import { SessionActions } from 'Containers/Session'
import { Card, CardText } from 'material-ui/Card'
import * as React from 'react'
import { UIState } from 'Redux/UI'
import { Block } from 'types'

interface Props {
  block: Block
  actions: SessionActions
  settings: UIState
}

export default ({ block, actions, settings }: Props) => {
  return (
    <div style={{ padding: '4px' }}>
      <Card>
        <CardText>
          <div style={{ height: '400px' }}>
            <PatternComponent
              settings={settings}
              block={block}
              actions={actions}
            />
          </div>
        </CardText>
      </Card>
    </div>
  )
}
