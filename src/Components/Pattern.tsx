import * as React from 'react'
import { Pattern } from 'types'

interface Props {
  pattern: Pattern
}

interface State {
  stageWidth: number
  stageHeight: number
}

class PatternComponent extends React.Component<Props, State> {
  divElement: HTMLDivElement

  componentDidMount() {
    const stageHeight = this.divElement.clientHeight
    const stageWidth = this.divElement.clientWidth
    this.setState({ stageHeight, stageWidth })
  }

  render() {
    const { pattern } = this.props
    console.log(this.state)
    return (
      <div
        style={{ minHeight: '100%' }}
        ref={(div: HTMLDivElement) => (this.divElement = div)}
      >
        <pre>{JSON.stringify(pattern.notes, null, 4)}</pre>
      </div>
    )
  }
}

export default PatternComponent
