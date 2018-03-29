import ArrangementComponent from 'Components/Arrangement'
import BlockEditComponent from 'Components/BlockEdit'
import BpmComponent from 'Components/Controls/Bpm'
import EditTools from 'Components/Controls/EditTools'
import Transport from 'Components/Controls/Transport'
import BlockSelect from 'Components/Session/BlockSelect'
import TrackListComponent from 'Components/TrackList'
import { Mutations, SessionActions } from 'Containers/Session'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Player, { PlayerUpdateInfo } from 'Player'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { SynthState } from 'Redux/Synth'
import { UIState } from 'Redux/UI'
import styled from 'styled-components'
import { Block, Session } from 'types'
import { BEAT_LENGTH } from 'Utils/time'

import * as firebase from 'firebase'
require('firebase/firestore')

const blockPlayer = new Player()

interface Props {
  session: Session
  actions: SessionActions
  settings: UIState
  synth: SynthState
  mutations: Mutations
}

const Tools = styled.div`
  display: flex;

  div:first-child {
    xmargin-right: auto;
  }
  .eol {
    margin-right: auto;
  }
`

const EditArea = styled.div`
  display: flex;
`

interface State {}

interface RouteParams {
  sessionId?: string
}

class SessionComponent extends React.Component<
  Props & RouteComponentProps<RouteParams>,
  State
> {
  componentDidMount() {
    const { match, session, history, actions } = this.props
    if (match.params && match.params.sessionId) {
      const { sessionId } = match.params
      if (session.id !== sessionId) {
        console.log('not loaded')
        history.push(`/loader/${sessionId}`)
      } else {
        console.log('watch db')
        const doc = firebase.firestore().doc(`/sessions/${sessionId}`)
        doc.onSnapshot((changed: firebase.firestore.DocumentSnapshot) => {
          const data = changed.data() as Session
          console.log(
            'onSnapshot',
            data.blocks[0].patterns[0].notes.length,
            changed,
            changed.data()
          )
          actions.updateSession(data)
        })
      }
    } else {
      console.log('no sessionId')
      history.push('/loader/new')
    }
  }

  componentWillMount() {
    const { session: { blocks } } = this.props
    if (blocks.length > 0) {
      this.setState({ currentBlock: blocks[0] })
    }
  }

  playBlockPlayer() {
    const currentBlock = this.getCurrentBlock()
    if (currentBlock) {
      const { actions, synth, session } = this.props
      blockPlayer.endPosition = currentBlock.bars * BEAT_LENGTH * 4
      blockPlayer.loop = true
      blockPlayer.synthPlayHandlers = synth.handlers
      blockPlayer.onUpdate = (info: PlayerUpdateInfo) => {
        actions.block.setBlockCursor(info.cursor)
      }
      blockPlayer.bpm = session.bpm
      blockPlayer.playBlock(this.props.settings.block.cursor, currentBlock)
    }
  }

  blockChanged(block: Block) {
    if (blockPlayer.playing) {
      blockPlayer.endPosition = block.bars * BEAT_LENGTH * 4
      blockPlayer.block = block
      blockPlayer.cursor = 0
    }
  }

  getCurrentBlock(props: Props = this.props): Block {
    const { session, settings } = props
    return session.blocks[settings.block.currentBlockIndex]
  }

  componentWillReceiveProps(nextProps: Props) {
    const currentBlock = this.getCurrentBlock()
    const nextBlock = this.getCurrentBlock(nextProps)
    if (currentBlock !== nextBlock) {
      console.log('block updated')
      if (blockPlayer.playing) {
        blockPlayer.block = nextBlock
        blockPlayer.endPosition = nextBlock.bars * BEAT_LENGTH * 4
      }
    }
    const { bpm } = this.props.session
    const { bpm: nextBpm } = nextProps.session
    if (bpm !== nextBpm) {
      console.log('bpm changed', bpm, nextBpm)
      blockPlayer.bpm = bpm
    }
  }

  render() {
    const { session, actions, settings, synth, mutations } = this.props
    const currentBlock = session.blocks[settings.block.currentBlockIndex]
    return (
      <div style={{ padding: '4px' }}>
        <div style={{ padding: '4px' }}>
          <Card>
            <CardHeader title="blocks" />
            <CardActions>
              <Tools>
                <div>
                  <Transport
                    onStop={() => {
                      if (blockPlayer.playing) {
                        blockPlayer.stop()
                      } else {
                        actions.block.setBlockCursor(0)
                      }
                    }}
                    onPlay={() => {
                      this.playBlockPlayer()
                    }}
                    cursor={settings.block.cursor}
                  />
                </div>
                <div className="eol">
                  <BpmComponent bpm={session.bpm} mutations={mutations} />
                </div>
                <div>
                  <EditTools
                    actions={actions.pattern}
                    mutations={mutations}
                    settings={settings}
                  />
                </div>
              </Tools>
            </CardActions>
            <CardText style={{ padding: 4 }}>
              <EditArea>
                <div style={{ width: '300px' }}>
                  <div style={{ padding: 8 }}>
                    <BlockSelect
                      value={settings.block.currentBlockIndex}
                      blocks={session.blocks}
                      onChange={(blockIndex: number) => {
                        const block = session.blocks[blockIndex]
                        if (block) {
                          this.blockChanged(block)
                        }
                        actions.block.setCurrentBlockIndex(blockIndex)
                      }}
                    />
                  </div>
                  <TrackListComponent
                    tracks={session.tracks}
                    settings={settings}
                    mutations={mutations}
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
                      mutations={mutations}
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

        <ArrangementComponent session={session} settings={settings} />
      </div>
    )
  }
}

export default withRouter(SessionComponent)
