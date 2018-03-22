import * as React from 'react'
import { Note, Pattern } from 'types'

interface Props {
  pattern: Pattern
  bars: number
  quantize?: number
}

interface DefaultProps {
  quantize: number
}

interface EditNote {
  note: number
  duration: number
  position: number
}

interface State {
  stageWidth: number
  stageHeight: number
  editNote: EditNote | null
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
const beatWidth = 64
const durationWidth = beatWidth / 480

const noteStyle = { fill: 'red', stroke: '#666', strokeWidth: 1 }

class PatternComponent extends React.Component<Props, State> {
  divElement: HTMLDivElement
  svgElement: SVGSVGElement

  state: State = {
    stageWidth: 0,
    stageHeight: 0,
    editNote: null
  }

  static defaultProps: DefaultProps = {
    quantize: 120
  }

  componentDidMount() {
    const stageHeight = this.divElement.clientHeight
    const stageWidth = this.divElement.clientWidth
    this.setState({ stageHeight, stageWidth })

    this.svgElement.addEventListener(
      'mousedown',
      this.handleMousedown.bind(this)
    )

    this.svgElement.addEventListener('mouseup', this.handleMouseup.bind(this))
    this.svgElement.addEventListener('mouseout', this.handleMouseout.bind(this))
    this.svgElement.addEventListener(
      'mousemove',
      this.handleMousemove.bind(this)
    )
  }

  mouse2svgPoint(e: MouseEvent): SVGPoint {
    const pt = this.svgElement.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const svgPoint = pt.matrixTransform(
      this.svgElement.getScreenCTM().inverse()
    )
    console.log('mouse2svgPoint', e, svgPoint)
    return svgPoint
  }

  handleMousedown(e: MouseEvent) {
    console.log('mousedown', e)

    const svgPoint = this.mouse2svgPoint(e)

    const ns = this.svgElement.getAttribute('xmlns') as string
    const rect = document.createElementNS(ns, 'rect')
    rect.setAttributeNS(ns, 'x', `${svgPoint.x}`)
    rect.setAttributeNS(ns, 'y', `${svgPoint.y}`)
    rect.setAttributeNS(ns, 'width', '32')
    rect.setAttributeNS(ns, 'height', '8')
    this.svgElement.appendChild(rect)

    const { note, position } = this.svgPoint2NoteInfo(svgPoint)
    this.setState({ editNote: { note, duration: 480, position } })
  }

  handleMousemove(e: MouseEvent) {
    e.preventDefault() // prevent drag
    const { editNote } = this.state
    if (editNote) {
      const { quantize } = this.props
      console.log('handleMousemove', e)
      const svgPoint = this.mouse2svgPoint(e)
      const { note, position } = this.svgPoint2NoteInfo(svgPoint)
      let { duration } = editNote
      if (position < editNote.position) {
        duration = quantize || 0
      } else {
        duration = quantize
          ? ~~((position - editNote.position) / quantize + 1) * quantize
          : position - editNote.position
      }

      this.setState({
        editNote: { ...editNote, note, duration }
      })
    }
  }

  handleMouseup(e: MouseEvent) {
    console.log('handleMouseup', e)
    const svgPoint = this.mouse2svgPoint(e)
    console.log(svgPoint)
    this.setState({ editNote: null })
  }

  handleMouseout(e: MouseEvent) {
    console.log('handleMouseout', e)
    this.setState({ editNote: null })
  }

  svgPoint2NoteInfo(pt: SVGPoint): { note: number; position: number } {
    const { quantize } = this.props
    const { maxNote } = this.noteRange()
    let position = pt.x / durationWidth

    // quantize
    if (typeof quantize === 'number') {
      position = ~~(position / quantize) * quantize
    }

    const note = ~~(maxNote - pt.y / noteHeight) + 1
    return { note, position }
  }

  noteRange(): { avg: number; minNote: number; maxNote: number } {
    const { pattern } = this.props
    const avg = avgNotes(pattern.notes)
    const maxNote = avg + displayNotes / 2
    const minNote = maxNote - displayNotes
    return { avg, maxNote, minNote }
  }

  render() {
    const { pattern, bars } = this.props
    const { stageHeight, stageWidth, editNote } = this.state
    const { maxNote, minNote } = this.noteRange()
    let editingNote = null
    if (editNote) {
      console.log('editing', editNote)
      editingNote = (
        <rect
          key="note_editing"
          x={editNote.position * durationWidth}
          y={(maxNote - editNote.note) * noteHeight}
          width={durationWidth * editNote.duration}
          height={noteHeight}
          style={{ ...noteStyle, pointerEvents: 'none' }}
        />
      )
    }
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
            style={{
              height: displayNotes * noteHeight,
              backgroundColor: '#ddd'
            }}
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
            {editingNote}
          </svg>
          <pre>{JSON.stringify(pattern.notes, null, 4)}</pre>
        </div>
      </div>
    )
  }
}

export default PatternComponent
