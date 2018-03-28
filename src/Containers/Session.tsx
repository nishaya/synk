import SessionComponent from 'Components/Session'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { initSession } from 'Redux/Session'
import { RootState } from 'Redux/store'
import { initSynth } from 'Redux/Synth'
import {
  setBlockCursor,
  setCurrentBlockIndex,
  setCurrentTrack,
  setNoteDuration,
  setQuantize
} from 'Redux/UI'
import { Note, Session, SynthPlayHandler } from 'types'
import { findPattern } from 'Utils/session'

import * as firebase from 'firebase'
require('firebase/firestore')
import { initFirebase } from 'Utils/firebase'

initFirebase()

export interface PatternActions {
  setQuantize: (quantize: number) => void
  setNoteDuration: (duration: number) => void
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
  removeNote: (blockId: string, patternId: string, note: Note) => void
  clearPattern: (blockIndex: number, patternIndex: number) => void
  changeBlockLength: (num: number) => void
  changeTrackLevel: (trackIndex: number, level: number) => void
}

let pendingUpdate: Session | null = null
let lastCommit = Date.now()

const mapStateToProps = (state: RootState) => ({
  session: state.Session.session,
  settings: state.UI,
  synth: state.Synth,
  mutations: {
    changeTrackLevel: (trackIndex: number, level: number) => {
      console.log('changeTrackLevel', trackIndex, level)
      const newSession = state.Session.session
      if (newSession.tracks[trackIndex]) {
        newSession.tracks[trackIndex].level = level
      }
      pendingUpdate = newSession
      setTimeout(() => {
        const now = Date.now()
        if (now - lastCommit > 1000 && pendingUpdate) {
          const doc = firebase.firestore().doc(`/sessions/${newSession.id}`)
          doc.set({ tracks: pendingUpdate.tracks }, { merge: true })
          lastCommit = now
          pendingUpdate = null
        }
      }, 1000)
    },
    changeBlockLength: (num: number) => {
      const { UI: { block: { currentBlockIndex } } } = state
      console.log('changeBlockLength', num)
      const newSession = state.Session.session
      let bars = 0
      if (newSession.blocks[currentBlockIndex]) {
        bars = newSession.blocks[currentBlockIndex].bars
        bars += num
      }
      if (bars <= 4 && bars >= 1) {
        newSession.blocks[currentBlockIndex].bars = bars
        const doc = firebase.firestore().doc(`/sessions/${newSession.id}`)
        doc.set(newSession)
      }
    },
    addNote: (blockId: string, patternId: string, note: Note) => {
      console.log('Mutation - addNote', blockId, patternId, note)
      const newSession = state.Session.session
      const found = findPattern(newSession, blockId, patternId)
      if (found) {
        const { pattern } = found
        if (
          pattern.notes.find(
            (n: Note) => n.note === note.note && n.position === note.position
          )
        ) {
          console.log('same note')
          return
        }
        pattern.notes.push(note)

        const doc = firebase.firestore().doc(`/sessions/${newSession.id}`)
        doc.set(newSession)
      }
    },
    removeNote: (blockId: string, patternId: string, note: Note) => {
      console.log('Mutation - removeNote', blockId, patternId, note)
      const newSession = state.Session.session
      const found = findPattern(newSession, blockId, patternId)
      if (found) {
        const { pattern } = found
        pattern.notes = pattern.notes.filter(
          (n: Note) => !(n.note === note.note && n.position === note.position)
        )

        const doc = firebase.firestore().doc(`/sessions/${newSession.id}`)
        doc.set(newSession)
      }
    },
    clearPattern: (blockIndex: number, patternIndex: number) => {
      console.log('Mutation - clearPattern', blockIndex, patternIndex)
      const newSession = state.Session.session
      if (
        newSession.blocks[blockIndex] &&
        newSession.blocks[blockIndex].patterns[patternIndex]
      ) {
        newSession.blocks[blockIndex].patterns[patternIndex].notes = []

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
      }
    },
    pattern: {
      setQuantize: (quantize: number) => {
        dispatch(setQuantize({ quantize }))
      },
      setNoteDuration: (duration: number) => {
        dispatch(setNoteDuration({ duration }))
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
