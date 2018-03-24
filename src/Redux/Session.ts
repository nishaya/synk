import { Action } from 'redux'
import { Block, Note, Pattern, Session } from 'types'
import { isType } from 'typescript-fsa'
import { session } from 'Utils/fixtures'

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

// reducer
export interface SessionState {
  readonly session: Session
  readonly userId: string | null
}

const initialState: SessionState = { session, userId: null }

const findPattern = (
  session: Session,
  blockId: string,
  patternId: string
): Pattern | undefined => {
  const block = session.blocks.find((b: Block) => b.id === blockId)
  if (!block) {
    return undefined
  }
  return block.patterns.find((p: Pattern) => p.id === patternId)
}

export const sessionReducers = (
  state: SessionState = initialState,
  action: Action
): SessionState => {
  if (isType(action, addNote)) {
    const { blockId, patternId, note } = action.payload
    console.log('Action - addNote', action.payload, note)
    const pattern = findPattern(state.session, blockId, patternId)
    if (pattern) {
      console.log('pattern', pattern)
      pattern.notes.push(note)
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
  return state
}
