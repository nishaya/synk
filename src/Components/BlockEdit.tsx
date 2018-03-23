import PatternComponent from 'Components/Pattern'
import { SessionActions } from 'Containers/Session'
import { Card, CardText } from 'material-ui/Card'
import * as React from 'react'
import { SynthState } from 'Redux/Synth'
import { UIState } from 'Redux/UI'
import { Block } from 'types'

interface Props {
  block: Block
  actions: SessionActions
  settings: UIState
  synth: SynthState
}

export default ({ block, actions, settings, synth }: Props) => {
  return (
    <div style={{ padding: '4px' }}>
      <Card>
        <CardText>
          <div style={{ height: '400px' }}>
            <PatternComponent
              settings={settings}
              block={block}
              actions={actions}
              synth={synth}
            />
          </div>
        </CardText>
      </Card>
    </div>
  )
}
