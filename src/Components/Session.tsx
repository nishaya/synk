import ArrangementComponent from 'Components/Arrangement'
import BlockEditComponent from 'Components/BlockEdit'
import BlocksComponent from 'Components/Blocks'
import EditTools from 'Components/Controls/EditTools'
import Transport from 'Components/Controls/Transport'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import * as React from 'react'
import styled from 'styled-components'
import { Block, Session } from 'types'

interface Props {
  session: Session
}

const BlockSelect = ({
  blocks,
  onChange
}: {
  blocks: Block[]
  onChange: (v: string) => void
}) => (
  <SelectField
    onChange={(
      e: React.SyntheticEvent<HTMLSelectElement>,
      i: number,
      v: string
    ) => onChange(v)}
  >
    {blocks.map((block: Block) => (
      <MenuItem key={block.id} value={block.id} primaryText={block.name} />
    ))}
  </SelectField>
)

const Tools = styled.div`
  display: flex;

  div:first-child {
    margin-right: auto;
  }
`

interface State {
  currentBlock: Block | undefined
}

class SessionComponent extends React.Component<Props, State> {
  state = {
    currentBlock: undefined
  }
  render() {
    const { session } = this.props
    const { currentBlock } = this.state
    return (
      <div style={{ padding: '4px' }}>
        <h2>Session</h2>
        <div>numTracks: {session.tracks.length}</div>
        <div style={{ padding: '4px' }}>
          <Card>
            <CardHeader title="blocks" />
            <CardActions>
              <Tools>
                <div>
                  <Transport
                    handleRec={() => console.log('rec button pushed')}
                  />
                </div>
                <div>
                  <EditTools />
                </div>
              </Tools>
            </CardActions>
            <CardText>
              <BlockSelect
                blocks={session.blocks}
                onChange={(v: string) => {
                  this.setState({
                    currentBlock: session.blocks.find((b: Block) => b.id === v)
                  })
                  console.log('select edit', v)
                }}
              />
              {currentBlock ? (
                <BlockEditComponent block={currentBlock} />
              ) : (
                'no current block'
              )}
              <BlocksComponent blocks={session.blocks} />
            </CardText>
          </Card>
        </div>

        <ArrangementComponent arrangement={session.arrangement} />
      </div>
    )
  }
}

export default SessionComponent
