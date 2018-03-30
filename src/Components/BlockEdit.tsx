import PatternComponent from 'Components/Pattern'
import { Mutations, SessionActions } from 'Containers/Session'
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
  mutations: Mutations
  setBlockCursor: (pos: number) => void
}

export default ({
  block,
  actions,
  settings,
  synth,
  mutations,
  setBlockCursor
}: Props) => {
  return (
    <div style={{ padding: '4px' }}>
      <Card>
        <CardText>
          <div style={{ height: '600px' }}>
            <PatternComponent
              mutations={mutations}
              settings={settings}
              block={block}
              actions={actions}
              synth={synth}
              setBlockCursor={setBlockCursor}
            />
          </div>
        </CardText>
      </Card>
    </div>
  )
}
