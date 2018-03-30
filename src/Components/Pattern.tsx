import { NoteInfo } from 'Components/Edit/NoteInfo'
import GridBg from 'Components/Pattern/GridBg'
import KeysComponent from 'Components/Pattern/Keys'
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
  setBlockCursor: (pos: number) => void
}

interface State {
  stageWidth: number
  stageHeight: number
  editNote: Note | null
  previewNote: Note | null
  stopHandler: SynthStopHandler | null
  avgNote: number
}

const noteDefaults: Note = {
  note: 0,
  velocity: 100,
  duration: 480,
  position: 0
}

const gridXOffset = 64
const gridYOffset = 24
const noteHeight = 12
const displayNotes = 72
const beatWidth = 48
const durationWidth = beatWidth / 480

const defaultNoteStyle = { fill: 'red', stroke: '#666', strokeWidth: 0 }
const noteRound = 4
const noteOffset = 1

const noteDefaultProps = {
  rx: noteRound,
  ry: noteRound,
  height: noteHeight
}

class PatternComponent extends React.Component<Props, State> {
  divElement: HTMLDivElement
  svgElement: SVGSVGElement

  state: State = {
    stageWidth: 0,
    stageHeight: 0,
    editNote: null,
    previewNote: null,
    stopHandler: null,
    avgNote: 64
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

  findNote(
    noteNumber: number,
    position: number
  ): { note: Note | undefined; index: number; diff: number } {
    console.log('findNote', noteNumber, position)
    let foundNote: { note: Note | undefined; index: number; diff: number } = {
      note: undefined,
      index: -1,
      diff: 0
    }
    const pattern = this.getPattern()
    if (pattern) {
      pattern.notes.forEach((n: Note, index: number) => {
        console.log(n.position, n.position + n.duration, position)
        if (
          n.note === noteNumber &&
          (n.position <= position && n.position + n.duration >= position)
        ) {
          foundNote = {
            note: n,
            index,
            diff: n.position + n.duration - position
          }
        }
      })
    }

    return foundNote
  }

  handleMousedown(e: MouseEvent) {
    console.log('mousedown', e)

    const svgPoint = this.mouse2svgPoint(e)
    const { note, position, rawPosition } = this.svgPoint2NoteInfo(svgPoint)
    if (svgPoint.y <= gridYOffset) {
      console.log('move position')
      const { setBlockCursor } = this.props
      setBlockCursor(position)
      return
    } else if (svgPoint.x <= gridXOffset) {
      console.log('preview note', note)
      return
    }
    const editNote = {
      ...noteDefaults,
      note,
      position,
      duration: this.getDuration()
    }

    const found = this.findNote(note, rawPosition)
    console.log('foundNote', found)

    if (this.deleteMode()) {
      const { block: { id: blockId }, mutations: { removeNote } } = this.props
      const pattern = this.getPattern()
      if (pattern)
        removeNote(blockId, pattern.id, { ...editNote, position: rawPosition })
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
    if (svgPoint.x < gridXOffset || svgPoint.y < gridYOffset) {
      this.setState({ previewNote: null, editNote: null })
      return
    }
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

  svgPoint2NoteInfo(
    pt: SVGPoint
  ): { note: number; position: number; rawPosition: number } {
    const quantize = this.getQuantize()
    const pattern = this.getPattern()
    if (!pattern) {
      return { note: 0, position: 0, rawPosition: 0 }
    }
    const { maxNote } = this.noteRange(pattern)
    let position = (pt.x - gridXOffset) / durationWidth
    const rawPosition = position

    // quantize
    if (typeof quantize === 'number') {
      position = ~~(position / quantize) * quantize
    }

    const note = ~~(
      maxNote -
      (pt.y - gridYOffset - noteHeight / 2) / noteHeight
    )
    return { note, position, rawPosition }
  }

  noteRange(
    pattern: Pattern
  ): { avg: number; minNote: number; maxNote: number } {
    // const avg = avgNotes(pattern.notes)
    const { avgNote: avg } = this.state
    let maxNote = avg + displayNotes / 2
    let minNote = maxNote - displayNotes
    if (maxNote >= 127) {
      maxNote = 127
      minNote = maxNote - displayNotes + 1
    } else if (minNote <= 0) {
      minNote = 0
      maxNote = minNote + displayNotes - 1
    }
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
    // let editingNote = null
    const barWidth = beatWidth * 4
    const cursorX = settings.block.cursor / 480 * beatWidth
    const gridHeight = displayNotes * noteHeight
    const svgHeight = gridHeight + gridYOffset
    const gridWidth = barWidth * bars
    const svgWidth = gridWidth + gridXOffset

    const notes = pattern.notes.map((note: Note, index: number) => {
      if (note.note < minNote || maxNote < note.note) {
        return null
      }
      return (
        <rect
          {...noteDefaultProps}
          key={`note_${index}`}
          x={gridXOffset + note.position * durationWidth}
          y={gridYOffset + (maxNote - note.note) * noteHeight}
          width={durationWidth * note.duration - noteOffset}
          style={noteStyle}
        />
      )
    })

    if (editNote) {
      console.log('editing', editNote)
      noteStyle.pointerEvents = 'none'
      notes.push(
        <rect
          {...noteDefaultProps}
          key="note_editing"
          x={gridXOffset + editNote.position * durationWidth}
          y={gridYOffset + (maxNote - editNote.note) * noteHeight}
          width={durationWidth * editNote.duration - noteOffset}
          style={noteStyle}
        />
      )
      const preview = {
        ...defaultNoteStyle,
        key: 'note_editing',
        x: gridXOffset + editNote.position * durationWidth,
        y: gridYOffset + (maxNote - editNote.note) * noteHeight,
        width: durationWidth * editNote.duration - noteOffset,
        style: noteStyle
      }
      console.log(preview)
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
                <GridBg
                  xOffset={gridXOffset}
                  yOffset={gridYOffset}
                  barWidth={barWidth}
                  noteHeight={noteHeight}
                  beatWidth={beatWidth}
                  startNote={maxNote}
                />
              </defs>
              {Array(bars)
                .fill(null)
                .map((_: any, bar: number) => {
                  const props = {
                    fill: '#999',
                    y: gridYOffset - 6,
                    style: { pointerEvents: 'none' }
                  }
                  const xo = gridXOffset + bar * barWidth - 10
                  return (
                    <g key={`bi_${bar}`}>
                      <text {...props} fill="#666" x={xo}>
                        {sprintf('%d-%d', bar + 1, 1)}
                      </text>
                      <text {...props} x={xo + beatWidth}>
                        {sprintf('%d-%d', bar + 1, 2)}
                      </text>
                      <text {...props} x={xo + beatWidth * 2}>
                        {sprintf('%d-%d', bar + 1, 3)}
                      </text>
                      <text {...props} x={xo + beatWidth * 3}>
                        {sprintf('%d-%d', bar + 1, 4)}
                      </text>
                    </g>
                  )
                })}
              <KeysComponent
                max={maxNote}
                min={minNote}
                offsetX={0}
                offsetY={gridYOffset}
                width={gridXOffset}
                noteHeight={noteHeight}
              />
              <g>
                <rect
                  fill="url(#Grid)"
                  x={gridXOffset}
                  y={gridYOffset}
                  width={gridWidth}
                  height={gridHeight}
                  style={{ pointerEvents: 'none' }}
                />
                {notes}
                <line
                  stroke="#ff0"
                  x1={gridXOffset + cursorX}
                  y1="0"
                  x2={gridXOffset + cursorX}
                  y2={svgHeight}
                  style={{ pointerEvents: 'none', mixBlendMode: 'difference' }}
                />
              </g>
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
        {/*JSON.stringify(pattern)*/}
      </div>
    )
  }
}

export default PatternComponent
