import { isEqual } from 'lodash'
import * as React from 'react'
import { UIState } from 'Redux/UI'

interface Props {
  settings: UIState
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

class CommandsComponent extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (
      isEqual(nextProps.settings.keyHistory.slice(0, konami.length), konami)
    ) {
      console.log('detect konami')
    }
  }
  render() {
    const { settings } = this.props
    return <div>commands{JSON.stringify(settings.keyHistory)}</div>
  }
}

export default CommandsComponent
