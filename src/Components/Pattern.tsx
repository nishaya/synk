import * as React from 'react'
import { Note, Pattern } from 'types'

interface Props {
  pattern: Pattern
}

interface State {
  stageWidth: number
  stageHeight: number
}

const avgNotes = (notes: Note[]): number => {
  if (notes.length === 0) return 0
  return ~~(
    notes.reduce<number>((sum: number, note: Note) => {
      return sum + note.note
    }, 0) / notes.length
  )
}

class PatternComponent extends React.Component<Props, State> {
  divElement: HTMLDivElement

  state: State = {
    stageWidth: 0,
    stageHeight: 0
  }

  componentDidMount() {
    const stageHeight = this.divElement.clientHeight
    const stageWidth = this.divElement.clientWidth
    this.setState({ stageHeight, stageWidth })
  }

  render() {
    const { pattern } = this.props
    const { stageHeight, stageWidth } = this.state
    console.log(this.state)
    console.log('average', avgNotes(pattern.notes))
    return (
      <div
        style={{ minHeight: '100%' }}
        ref={(div: HTMLDivElement) => (this.divElement = div)}
      >
        <div
          style={{
            overflow: 'auto',
            width: `${stageWidth}px`,
            height: `${stageHeight}px`
          }}
        >
          <pre>{JSON.stringify(pattern.notes, null, 4)}</pre>
        </div>
      </div>
    )
  }
}

export default PatternComponent
