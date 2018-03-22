import { Action } from 'redux'
import { Note, Session } from 'types'
import { isType } from 'typescript-fsa'
import { session } from 'Utils/fixtures'

import actionCreatorFactory from 'typescript-fsa'

// action
const actionCreator = actionCreatorFactory()

export const addNote = actionCreator<{
  blockId: string
  note: Note
}>('SESSION_ADD_NOTE')

// reducer
export interface SessionState {
  readonly session: Session
}

const initialState: SessionState = { session }

export const sessionReducers = (
  state: SessionState = initialState,
  action: Action
): SessionState => {
  if (isType(action, addNote)) {
    console.log('Action - addNote', action.payload)
    return { ...state }
  }
  return state
}
