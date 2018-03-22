import * as React from 'react'
import { Note, Pattern } from 'types'

interface Props {
  pattern: Pattern
  bars: number
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

const noteHeight = 8
const displayNotes = 48
const beatWidth = 32
const durationWidth = beatWidth / 480

const noteStyle = { fill: 'red', stroke: '#666', strokeWidth: 1 }

class PatternComponent extends React.Component<Props, State> {
  divElement: HTMLDivElement
  svgElement: SVGSVGElement

  state: State = {
    stageWidth: 0,
    stageHeight: 0
  }

  componentDidMount() {
    const stageHeight = this.divElement.clientHeight
    const stageWidth = this.divElement.clientWidth
    this.setState({ stageHeight, stageWidth })

    this.svgElement.addEventListener('click', (e: MouseEvent) => {
      console.log('onckick', e)
      const pt = this.svgElement.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      const svgPoint = pt.matrixTransform(
        this.svgElement.getScreenCTM().inverse()
      )
      console.log('svgPoint', svgPoint)

      const ns = this.svgElement.getAttribute('xmlns') as string
      const rect = document.createElementNS(ns, 'rect')
      rect.setAttributeNS(ns, 'x', `${svgPoint.x}`)
      rect.setAttributeNS(ns, 'y', `${svgPoint.y}`)
      rect.setAttributeNS(ns, 'width', '32')
      rect.setAttributeNS(ns, 'height', '8')
      this.svgElement.appendChild(rect)
    })
  }

  render() {
    const { pattern, bars } = this.props
    const { stageHeight, stageWidth } = this.state
    const avg = avgNotes(pattern.notes)
    const maxNote = avg + displayNotes / 2
    const minNote = maxNote - displayNotes
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
          <svg
            style={{ height: displayNotes * noteHeight }}
            ref={(svg: SVGSVGElement) => (this.svgElement = svg)}
            id="grid"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${beatWidth * 4 * bars} ${displayNotes * noteHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {pattern.notes.map((note: Note, index: number) => {
              if (note.note < minNote || maxNote < note.note) {
                return null
              }
              return (
                <rect
                  key={`note_${index}`}
                  x={note.position * durationWidth}
                  y={(maxNote - note.note) * noteHeight}
                  width={durationWidth * note.duration}
                  height={noteHeight}
                  style={noteStyle}
                />
              )
            })}
          </svg>
          <pre>{JSON.stringify(pattern.notes, null, 4)}</pre>
        </div>
      </div>
    )
  }
}

export default PatternComponent
