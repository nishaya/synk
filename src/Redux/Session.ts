import { Action } from 'redux'
import { Block, Note, Pattern, Session } from 'types'
import { isType } from 'typescript-fsa'
import { session } from 'Utils/fixtures'

import * as firebase from 'firebase'
require('firebase/firestore')

import actionCreatorFactory from 'typescript-fsa'

// action
const actionCreator = actionCreatorFactory()

export const addNote = actionCreator<{
  blockId: string
  patternId: string
  note: Note
}>('SESSION_ADD_NOTE')

export const changeTrackLevel = actionCreator<{
  trackIndex: number
  level: number
}>('SESSION_CHANGE_TRACK_LEVEL')

export const setUserId = actionCreator<{
  userId: string
}>('SESSION_SET_USER_ID')

export const initSession = actionCreator<{
  session: Session
}>('SESSION_INIT_SESSION')

// reducer
export interface SessionState {
  readonly session: Session
  readonly userId: string | null
}

const initialState: SessionState = { session, userId: null }

interface FoundPattern {
  pattern: Pattern
  blockIndex: number
  patternIndex: number
}

const findPattern = (
  session: Session,
  blockId: string,
  patternId: string
): FoundPattern | undefined => {
  let found: FoundPattern | undefined = undefined
  session.blocks.forEach((b: Block, bIndex: number) => {
    if (b.id === blockId) {
      b.patterns.forEach((p: Pattern, pIndex: number) => {
        if (p.id === patternId) {
          found = { pattern: p, blockIndex: bIndex, patternIndex: pIndex }
        }
      })
    }
  })
  return found
}

export const sessionReducers = (
  state: SessionState = initialState,
  action: Action
): SessionState => {
  if (isType(action, addNote)) {
    const { blockId, patternId, note } = action.payload
    console.log('Action - addNote', action.payload, note)
    const found = findPattern(state.session, blockId, patternId)
    if (found) {
      const { pattern } = found
      console.log('pattern', pattern)
      pattern.notes.push(note)

      const doc = firebase.firestore().doc(`/sessions/${state.session.id}`)
      doc.set(state.session)
    }
    return state
  }
  if (isType(action, changeTrackLevel)) {
    const { trackIndex, level } = action.payload
    console.log('Action - changeTrackLevel', action.payload)
    const track = state.session.tracks[trackIndex]
    if (track) {
      track.level = level
    }
    return state
  }
  if (isType(action, setUserId)) {
    const { userId } = action.payload
    return { ...state, userId }
  }
  if (isType(action, initSession)) {
    const { session } = action.payload
    return { ...state, session }
  }
  return state
}
