import { Mutations, SessionActions } from 'Containers/Session'
import { isEqual } from 'lodash'
import * as React from 'react'
import { UIState } from 'Redux/UI'
import { isOscSynthPreset, Session } from 'types'
import { genBlock } from 'Utils/gen'

interface Props {
  session: Session
  settings: UIState
  actions: SessionActions
  mutations: Mutations
  playBlock: () => void
}

const konami = [
  'a',
  'b',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowDown',
  'ArrowUp',
  'ArrowUp'
]

const konamiPattern = {
  id: 'konami',
  notes: [
    { duration: 120, note: 83, position: 0, velocity: 100 },
    { duration: 480, note: 91, position: 480, velocity: 100 },
    { duration: 120, note: 86, position: 120, velocity: 100 },
    { duration: 120, note: 91, position: 240, velocity: 100 },
    { duration: 120, note: 95, position: 360, velocity: 100 },
    { duration: 120, note: 74, position: 0, velocity: 100 },
    { duration: 120, note: 79, position: 120, velocity: 100 },
    { duration: 120, note: 83, position: 240, velocity: 100 },
    { duration: 120, note: 86, position: 360, velocity: 100 },
    { duration: 480, note: 83, position: 480, velocity: 100 },
    { duration: 480, note: 71, position: 480, velocity: 100 },
    { duration: 120, note: 62, position: 0, velocity: 100 },
    { duration: 120, note: 67, position: 120, velocity: 100 },
    { duration: 120, note: 71, position: 240, velocity: 100 },
    { duration: 120, note: 74, position: 360, velocity: 100 }
  ]
}

let executed = false

class CommandsComponent extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (
      !executed &&
      isEqual(nextProps.settings.keyHistory.slice(0, konami.length), konami)
    ) {
      executed = true
      const { session, mutations, actions, playBlock } = nextProps
      actions.ui.clearKeyHistory()
      console.log('detect konami', konamiPattern)
      const newBlock = genBlock(session)
      newBlock.name = 'Konami'
      newBlock.patterns[0] = konamiPattern
      const newIndex = session.blocks.length
      const newPreset = session.tracks[0].preset
      if (newPreset && isOscSynthPreset(newPreset)) {
        newPreset.oscillator = 'square'
        newPreset.aeg = {
          attack: 0,
          decay: 19,
          release: 15,
          sustain: 56
        }
        mutations.changePreset(0, newPreset)
      }
      mutations.addNewBlock(newBlock)
      actions.block.setBlockCursor(0)
      mutations.changeBpm(130)
      setTimeout(() => {
        actions.block.setCurrentBlockIndex(newIndex)
        setTimeout(() => {
          playBlock()
        }, 500)
      }, 500)
    }
  }
  render() {
    /*
    const { settings } = this.props
    return <div>commands{JSON.stringify(settings.keyHistory)}</div>
    */
    return null
  }
}

export default CommandsComponent
