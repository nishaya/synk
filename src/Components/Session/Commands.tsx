import { Mutations, SessionActions } from 'Containers/Session'
import { isEqual } from 'lodash'
import * as React from 'react'
import { UIState } from 'Redux/UI'
import { Session } from 'types'
import { genBlock } from 'Utils/gen'

interface Props {
  session: Session
  settings: UIState
  actions: SessionActions
  mutations: Mutations
}

const konami = [
  'a',
  'b',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowUp',
  'ArrowDown',
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

class CommandsComponent extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (
      isEqual(nextProps.settings.keyHistory.slice(0, konami.length), konami)
    ) {
      const { session, mutations, actions } = nextProps
      console.log('detect konami', konamiPattern)
      const newBlock = genBlock(session)
      const newIndex = session.blocks.length
      mutations.addNewBlock(newBlock)
      setTimeout(() => {
        actions.block.setCurrentBlockIndex(newIndex)
      }, 500)
    }
  }
  render() {
    const { settings } = this.props
    return <div>commands{JSON.stringify(settings.keyHistory)}</div>
  }
}

export default CommandsComponent
