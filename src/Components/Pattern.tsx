import { NoteInfo } from 'Components/Edit/NoteInfo'
import { Mutations, SessionActions } from 'Containers/Session'
import IconButton from 'material-ui/IconButton'
import * as Icons from 'material-ui/svg-icons'
import * as React from 'react'
import { SynthState } from 'Redux/Synth'
import { UIState } from 'Redux/UI'
import { Block, Note, Pattern, SynthPlayHandler, SynthStopHandler } from 'types'

interface Props {
  block: Block
  actions: SessionActions
  settings: UIState
  synth: SynthState
  mutations: Mutations
}

interface State {
  stageWidth: number
  stageHeight: number
  editNote: Note | null
  previewNote: Note | null
  stopHandler: SynthStopHandler | null
}

const avgNotes = (notes: Note[]): number => {
  if (notes.length === 0) return 64
  return ~~(
    notes.reduce<number>((sum: number, note: Note) => {
      return sum + note.note
    }, 0) / notes.length
  )
}

const noteDefaults: Note = {
  note: 0,
  velocity: 100,
  duration: 480,
  position: 0
}

const noteHeight = 8
const displayNotes = 72
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
    previewNote: null,
    stopHandler: null
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

  deleteMode(): boolean {
    const { settings } = this.props
    return settings.keys.get('Meta') ? true : false
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
    const editNote = {
      ...noteDefaults,
      note,
      position,
      duration: this.getDuration()
    }

    if (this.deleteMode()) {
      console.log('remove note', editNote)
      const { block: { id: blockId }, mutations: { removeNote } } = this.props
      const pattern = this.getPattern()
      if (pattern) removeNote(blockId, pattern.id, editNote)
      return
    }

    const stopHandler = this.triggerSynthPlay(editNote)
    this.setState({ editNote, stopHandler })
  }

  triggerSynthPlay(note: Note): SynthStopHandler | null {
    const handler = this.getSynthHandler()
    if (handler) {
      return handler({
        note: note.note,
        velocity: note.velocity
      })
    }
    return null
  }

  triggerSynthStop(): boolean {
    const { stopHandler } = this.state
    if (stopHandler) {
      stopHandler()
      return true
    }
    return false
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
      if (editNote.note !== note || editNote.position !== position) {
        const newNote = { ...editNote, note, position }
        if (editNote.note !== note) {
          this.triggerSynthStop()
          const stopHandler = this.triggerSynthPlay(newNote)
          if (stopHandler) {
            this.setState({ stopHandler })
          }
        }
        this.setState({
          editNote: newNote
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
    const { block: { id: blockId }, mutations: { addNote } } = this.props
    const pattern = this.getPattern()
    if (pattern) {
      const { editNote } = this.state
      console.log('handleMouseup', e)
      if (editNote) {
        addNote(blockId, pattern.id, { ...editNote })
      }
    }
    this.triggerSynthStop()

    this.setState({ editNote: null, previewNote: null })
  }

  handleMouseleave(e: MouseEvent) {
    console.log('handleMouseleave')
    this.triggerSynthStop()
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
    const {
      block: { bars },
      settings,
      mutations: { changeBlockLength }
    } = this.props
    const { stageHeight, stageWidth, editNote, previewNote } = this.state
    const { maxNote, minNote } = this.noteRange(pattern)
    const trackColor = this.getTrackColor()
    const noteStyle: React.CSSProperties = {
      ...defaultNoteStyle,
      fill: trackColor
    }
    let editingNote = null
    const barWidth = beatWidth * 4
    const cursorX = settings.block.cursor / 480 * beatWidth
    const svgHeight = displayNotes * noteHeight
    const svgWidth = barWidth * bars
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
          <div style={{ display: 'flex' }}>
            <svg
              style={{
                height: svgHeight,
                width: svgWidth,
                backgroundColor: '#ddd'
              }}
              ref={(svg: SVGSVGElement) => (this.svgElement = svg)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
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
                height={svgHeight}
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
              <line
                stroke="#ff0"
                x1={cursorX}
                y1="0"
                x2={cursorX}
                y2={svgHeight}
                style={{ pointerEvents: 'none', mixBlendMode: 'difference' }}
              />
              {editingNote}
            </svg>
            <div
              style={{
                minHeight: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div>
                <div>
                  <IconButton
                    onClick={() => changeBlockLength(1)}
                    tooltip="Add a bar"
                    tooltipPosition="top-center"
                  >
                    <Icons.ImageExposurePlus1 />
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    onClick={() => changeBlockLength(-1)}
                    tooltip="Remove a bar"
                    tooltipPosition="top-center"
                  >
                    <Icons.ImageExposureNeg1 />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PatternComponent
