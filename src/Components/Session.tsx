import ArrangementComponent from 'Components/Arrangement'
import BlockEditComponent from 'Components/BlockEdit'
import EditTools from 'Components/Controls/EditTools'
import Transport from 'Components/Controls/Transport'
import BlockSelect from 'Components/Session/BlockSelect'
import TrackListComponent from 'Components/TrackList'
import { SessionActions } from 'Containers/Session'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Player, { PlayerUpdateInfo } from 'Player'
import * as React from 'react'
import { SynthState } from 'Redux/Synth'
import { UIState } from 'Redux/UI'
import styled from 'styled-components'
import { Block, Session } from 'types'
import { BEAT_LENGTH } from 'Utils/time'

const blockPlayer = new Player()

interface Props {
  session: Session
  actions: SessionActions
  settings: UIState
  synth: SynthState
}

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

  componentDidMount() {
    this.playBlockPlayer()
  }

  componentWillMount() {
    const { session: { blocks } } = this.props
    if (blocks.length > 0) {
      this.setState({ currentBlock: blocks[0] })
    }
  }

  playBlockPlayer() {
    const { currentBlock } = this.state
    if (currentBlock) {
      const { actions } = this.props
      blockPlayer.endPosition = currentBlock.bars * BEAT_LENGTH * 4
      blockPlayer.loop = true
      blockPlayer.onUpdate = (info: PlayerUpdateInfo) => {
        console.log('player updated', info)
        actions.block.setBlockCursor(info.cursor)
      }
      blockPlayer.play(this.props.settings.block.cursor)
    }
  }

  render() {
    const { session, actions, settings, synth } = this.props
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
                    cursor={settings.block.cursor}
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
                      synth={synth}
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
          settings={settings}
        />
      </div>
    )
  }
}

export default SessionComponent
