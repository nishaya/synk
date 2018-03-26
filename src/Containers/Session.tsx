import SessionComponent from 'Components/Session'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { addNote, changeTrackLevel, initSession } from 'Redux/Session'
import { RootState } from 'Redux/store'
import { initSynth } from 'Redux/Synth'
import { setBlockCursor, setCurrentBlockIndex, setCurrentTrack } from 'Redux/UI'
import { Note, Session, SynthPlayHandler } from 'types'
import { findPattern } from 'Utils/session'

import * as firebase from 'firebase'
require('firebase/firestore')

export interface PatternActions {
  addNote: (blockId: string, patternId: string, note: Note) => void
}

export interface SynthActions {
  initSynth: (trackIndex: number, handler: SynthPlayHandler) => void
}

export interface BlockActions {
  setBlockCursor: (cursor: number) => void
  setCurrentBlockIndex: (blockIndex: number) => void
}
export interface TrackActions {
  setCurrentTrack: (trackIndex: number) => void
  changeTrackLevel: (trackIndex: number, level: number) => void
}

export interface SessionActions {
  updateSession: (session: Session) => void
  pattern: PatternActions
  block: BlockActions
  track: TrackActions
  synth: SynthActions
}

export interface Mutations {
  addNote: (blockId: string, patternId: string, note: Note) => void
}

const mapStateToProps = (state: RootState) => ({
  session: state.Session.session,
  settings: state.UI,
  synth: state.Synth,
  mutations: {
    addNote: (blockId: string, patternId: string, note: Note) => {
      console.log('Mutation - addNote', blockId, patternId, note)
      const newSession = state.Session.session
      const found = findPattern(newSession, blockId, patternId)
      if (found) {
        const { pattern } = found
        pattern.notes.push(note)

        const doc = firebase.firestore().doc(`/sessions/${newSession.id}`)
        doc.set(newSession)
      }
    }
  }
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: {
    updateSession: (session: Session) => {
      dispatch(initSession({ session }))
    },
    block: {
      setBlockCursor: (cursor: number) => {
        dispatch(setBlockCursor({ cursor }))
      },
      setCurrentBlockIndex: (currentBlockIndex: number) => {
        dispatch(setCurrentBlockIndex({ currentBlockIndex }))
      }
    },
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
