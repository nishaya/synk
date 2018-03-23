import SessionComponent from 'Components/Session'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { addNote, changeTrackLevel } from 'Redux/Session'
import { RootState } from 'Redux/store'
import { initSynth } from 'Redux/Synth'
import { setCurrentTrack } from 'Redux/UI'
import { Note, SynthPlayHandler } from 'types'

export interface PatternActions {
  addNote: (blockId: string, patternId: string, note: Note) => void
}

export interface SynthActions {
  initSynth: (trackIndex: number, handler: SynthPlayHandler) => void
}

export interface BlockActions {}
export interface TrackActions {
  setCurrentTrack: (trackIndex: number) => void
  changeTrackLevel: (trackIndex: number, level: number) => void
}

export interface SessionActions {
  pattern: PatternActions
  block: BlockActions
  track: TrackActions
  synth: SynthActions
}

const mapStateToProps = (state: RootState) => ({
  session: state.Session.session,
  settings: state.UI
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: {
    block: {},
    track: {
      setCurrentTrack: (trackIndex: number) => {
        dispatch(setCurrentTrack({ trackIndex }))
      },
      changeTrackLevel: (trackIndex: number, level: number) => {
        dispatch(changeTrackLevel({ trackIndex, level }))
      }
    },
    pattern: {
      addNote: (blockId: string, patternId: string, note: Note) => {
        dispatch(addNote({ blockId, patternId, note }))
      }
    },
    synth: {
      initSynth: (trackIndex: number, handler: SynthPlayHandler) => {
        dispatch(initSynth({ trackIndex, handler }))
      }
    }
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(SessionComponent)
