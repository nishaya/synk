import ArrangementComponent from 'Components/Arrangement'
import BlockEditComponent from 'Components/BlockEdit'
import EditTools from 'Components/Controls/EditTools'
import Transport from 'Components/Controls/Transport'
import TrackListComponent from 'Components/TrackList'
import { SessionActions } from 'Containers/Session'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import * as React from 'react'
import { SynthState } from 'Redux/Synth'
import { UIState } from 'Redux/UI'
import styled from 'styled-components'
import { Block, Session } from 'types'

interface Props {
  session: Session
  actions: SessionActions
  settings: UIState
  synth: SynthState
}

const BlockSelect = ({
  value,
  blocks,
  onChange
}: {
  value: string | null
  blocks: Block[]
  onChange: (v: string) => void
}) => (
  <SelectField
    value={value}
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

const EditArea = styled.div`
  display: flex;
`

interface State {
  currentBlock: Block | undefined
}

class SessionComponent extends React.Component<Props, State> {
  state: State = {
    currentBlock: undefined
  }

  componentWillMount() {
    const { session: { blocks } } = this.props
    if (blocks.length > 0) {
      this.setState({ currentBlock: blocks[0] })
    }
  }

  render() {
    const { session, actions, settings } = this.props
    const { currentBlock } = this.state
    return (
      <div style={{ padding: '4px' }}>
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
            <CardText style={{ padding: 4 }}>
              <EditArea>
                <div style={{ width: '300px' }}>
                  <div style={{ padding: 8 }}>
                    <BlockSelect
                      value={currentBlock ? currentBlock.id : null}
                      blocks={session.blocks}
                      onChange={(v: string) => {
                        this.setState({
                          currentBlock: session.blocks.find(
                            (b: Block) => b.id === v
                          )
                        })
                        console.log('select edit', v)
                      }}
                    />
                  </div>
                  <TrackListComponent
                    tracks={session.tracks}
                    settings={settings}
                    actions={actions.track}
                    synthActions={actions.synth}
                    onTrackChange={(index: number) =>
                      actions.track.setCurrentTrack(index)
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  {currentBlock ? (
                    <BlockEditComponent
                      actions={actions}
                      block={currentBlock}
                      settings={settings}
                    />
                  ) : (
                    'no current block'
                  )}
                </div>
              </EditArea>
            </CardText>
          </Card>
        </div>

        <ArrangementComponent
          arrangement={session.arrangement}
          blocks={session.blocks}
        />
      </div>
    )
  }
}

export default SessionComponent
