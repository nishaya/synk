import { Action } from 'redux'
import { isType } from 'typescript-fsa'

import actionCreatorFactory from 'typescript-fsa'

// action
const actionCreator = actionCreatorFactory()

export const setQuantize = actionCreator<{
  quantize: number
}>('UI_SET_QUANTIZE')

// reducer
export interface UIState {
  readonly pattern: { quantize: number }
}

const initialState: UIState = { pattern: { quantize: 120 } }

export const uiReducers = (
  state: UIState = initialState,
  action: Action
): UIState => {
  if (isType(action, setQuantize)) {
    const { quantize } = action.payload
    console.log('Action - setQuantize', action.payload)
    return { ...state, pattern: { ...state.pattern, quantize } }
  }
  return state
}
