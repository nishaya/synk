import { Action } from 'redux'
import { Session } from 'types'
import { isType } from 'typescript-fsa'
import { session } from 'Utils/fixtures'

import actionCreatorFactory from 'typescript-fsa'

// action
const actionCreator = actionCreatorFactory()

export const updateMessage = actionCreator<string>(
  'NOTIFICATION_UPDATE_MESSAGE'
)

// reducer
export interface SessionState {
  readonly session: Session
}

const initialState: SessionState = { session }

export const sessionReducers = (
  state: SessionState = initialState,
  action: Action
): SessionState => {
  if (isType(action, updateMessage)) {
    return { ...state }
  }
  return state
}
