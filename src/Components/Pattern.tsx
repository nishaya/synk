import { NoteInfo } from 'Components/Edit/NoteInfo'
import { SessionActions } from 'Containers/Session'
import * as React from 'react'
import { SynthState } from 'Redux/Synth'
import { UIState } from 'Redux/UI'
import { Block, Note, Pattern, SynthPlayHandler } from 'types'

interface Props {
  block: Block
  actions: SessionActions
  settings: UIState
  synth: SynthState
}

interface State {
  stageWidth: number
  stageHeight: number
  editNote: Note | null
  previewNote: Note | null
}

const avgNotes = (notes: Note[]): number => {
  if (notes.length === 0) return 0
  return ~~(
    notes.reduce<number>((sum: number, note: Note) => {
      return sum + note.note
    }, 0) / notes.length
  )
}

const noteDefaults: Note = {
  note: 0,
  velocity: 0,
  duration: 480,
  position: 0
}

const noteHeight = 8
const displayNotes = 60
const beatWidth = 64
const durationWidth = beatWidth / 480

const defaultNoteStyle = { fill: 'red', stroke: '#666', strokeWidth: 0 }
const noteRound = 4
const noteOffset = 1
const gridBgColor = '#fff'

/*
const defaultNoteStyle = { fill: 'red', stroke: '#666', strokeWidth: 1 }
const noteRound = 0
const noteOffset = 0
const gridBgColor = '#eee'
*/

class PatternComponent extends React.Component<Props, State> {
  divElement: HTMLDivElement
  svgElement: SVGSVGElement

  state: State = {
    stageWidth: 0,
    stageHeight: 0,
    editNote: null,
    previewNote: null
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
    this.svgElement.addEventListener(
      'mouseleave',
      this.handleMouseleave.bind(this)
    )
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
    return svgPoint
  }

  handleMousedown(e: MouseEvent) {
    console.log('mousedown', e)

    const svgPoint = this.mouse2svgPoint(e)
    const { note, position } = this.svgPoint2NoteInfo(svgPoint)
    this.setState({
      editNote: {
        ...noteDefaults,
        note,
        position,
        duration: this.getDuration()
      }
    })
  }

  getTrackColor(): string {
    const { currentTrack: patternIndex } = this.props.settings.track
    return this.props.settings.track.trackColors[patternIndex] || '#f00'
  }

  getQuantize(): number {
    return this.props.settings.pattern.quantize
  }

  getDuration(): number {
    return this.props.settings.pattern.duration
  }

  getSynthHandler(): SynthPlayHandler | undefined {
    const { synth: { handlers } } = this.props
    const { currentTrack } = this.props.settings.track
    return handlers[currentTrack]
  }

  handleMousemove(e: MouseEvent) {
    e.preventDefault() // prevent drag
    const { editNote } = this.state
    const svgPoint = this.mouse2svgPoint(e)
    const { note, position } = this.svgPoint2NoteInfo(svgPoint)
    if (editNote) {
      const quantize = this.getQuantize()
      let { duration } = editNote
      if (position < editNote.position) {
        duration = quantize || 0
      } else {
        duration = quantize
          ? ~~((position - editNote.position) / quantize + 1) * quantize
          : position - editNote.position
      }

      if (editNote.note !== note || editNote.duration !== duration) {
        console.log('state updated')
        this.setState({
          editNote: { ...editNote, note, duration }
        })
      }
    } else {
      this.setState({ previewNote: { ...noteDefaults, note, position } })
    }
  }

  getPattern(): Pattern | undefined {
    const {
      block,
      settings: { track: { currentTrack: patternIndex } }
    } = this.props
    return block.patterns[patternIndex]
  }

  handleMouseup(e: MouseEvent) {
    const {
      block: { id: blockId },
      actions: { pattern: { addNote } }
    } = this.props
    const pattern = this.getPattern()
    if (pattern) {
      const { editNote } = this.state
      console.log('handleMouseup', e)
      if (editNote) {
        addNote(blockId, pattern.id, { ...editNote })
      }
    }

    this.setState({ editNote: null, previewNote: null })
  }

  handleMouseleave(e: MouseEvent) {
    console.log('handleMouseleave')
    this.setState({ editNote: null, previewNote: null })
  }

  svgPoint2NoteInfo(pt: SVGPoint): { note: number; position: number } {
    const quantize = this.getQuantize()
    const pattern = this.getPattern()
    if (!pattern) {
      return { note: 0, position: 0 }
    }
    const { maxNote } = this.noteRange(pattern)
    let position = pt.x / durationWidth

    // quantize
    if (typeof quantize === 'number') {
      position = ~~(position / quantize) * quantize
    }

    const note = ~~(maxNote - pt.y / noteHeight) + 1
    return { note, position }
  }

  noteRange(
    pattern: Pattern
  ): { avg: number; minNote: number; maxNote: number } {
    const avg = avgNotes(pattern.notes)
    const maxNote = avg + displayNotes / 2
    const minNote = maxNote - displayNotes
    return { avg, maxNote, minNote }
  }

  render() {
    const pattern = this.getPattern()
    if (!pattern) return null
    const { block: { bars } } = this.props
    const { stageHeight, stageWidth, editNote, previewNote } = this.state
    const { maxNote, minNote } = this.noteRange(pattern)
    const trackColor = this.getTrackColor()
    const noteStyle: React.CSSProperties = {
      ...defaultNoteStyle,
      fill: trackColor
    }
    let editingNote = null
    const barWidth = beatWidth * 4
    if (editNote) {
      console.log('editing', editNote)
      noteStyle.pointerEvents = 'none'
      editingNote = (
        <rect
          key="note_editing"
          rx={noteRound}
          ry={noteRound}
          x={editNote.position * durationWidth}
          y={(maxNote - editNote.note) * noteHeight}
          width={durationWidth * editNote.duration - noteOffset}
          height={noteHeight}
          style={noteStyle}
        />
      )
    }
    return (
      <div
        style={{ minHeight: '100%' }}
        ref={(div: HTMLDivElement) => (this.divElement = div)}
      >
        <NoteInfo editNote={editNote} previewNote={previewNote} />
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
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${beatWidth * 4 * bars} ${displayNotes * noteHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <pattern
                id="Grid"
                x="0"
                y="0"
                width={barWidth}
                height={noteHeight}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width={barWidth}
                  height={noteHeight}
                  fill={gridBgColor}
                />
                <line stroke="#aaa" x1="0" y1="0" x2={barWidth} y2="0" />
                <line
                  stroke="#aaa"
                  strokeWidth="3"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={noteHeight}
                />
                <line
                  stroke="#bbb"
                  strokeDasharray="5 3"
                  x1={beatWidth * 1}
                  y1="0"
                  x2={beatWidth * 1}
                  y2={noteHeight}
                />
                <line
                  stroke="#bbb"
                  strokeDasharray="5 3"
                  x1={beatWidth * 2}
                  y1="0"
                  x2={beatWidth * 2}
                  y2={noteHeight}
                />
                <line
                  stroke="#bbb"
                  strokeDasharray="5 3"
                  x1={beatWidth * 3}
                  y1="0"
                  x2={beatWidth * 3}
                  y2={noteHeight}
                />
              </pattern>
            </defs>
            <rect
              fill="url(#Grid)"
              x="0"
              y="0"
              width={beatWidth * 4 * bars}
              height={displayNotes * noteHeight}
              style={{ pointerEvents: 'none' }}
            />
            {pattern.notes.map((note: Note, index: number) => {
              if (note.note < minNote || maxNote < note.note) {
                return null
              }
              return (
                <rect
                  key={`note_${index}`}
                  rx={noteRound}
                  ry={noteRound}
                  x={note.position * durationWidth}
                  y={(maxNote - note.note) * noteHeight}
                  width={durationWidth * note.duration - noteOffset}
                  height={noteHeight}
                  style={noteStyle}
                />
              )
            })}
            {editingNote}
          </svg>
        </div>
      </div>
    )
  }
}

export default PatternComponent
