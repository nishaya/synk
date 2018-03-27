import { Action } from 'redux'
import { Note, Session } from 'types'
import { isType } from 'typescript-fsa'
import { session as dummySession } from 'Utils/fixtures'

import actionCreatorFactory from 'typescript-fsa'

// action
const actionCreator = actionCreatorFactory()

export const addNote = actionCreator<{
  blockId: string
  patternId: string
  note: Note
}>('SESSION_ADD_NOTE')

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

const initialState: SessionState = { session: dummySession, userId: null }

export const sessionReducers = (
  state: SessionState = initialState,
  action: Action
): SessionState => {
  if (isType(action, setUserId)) {
    const { userId } = action.payload
    return { ...state, userId }
  }
  if (isType(action, initSession)) {
    const { session } = action.payload
    // console.log('initSession', session)
    return { ...state, session }
  }
  return state
}
