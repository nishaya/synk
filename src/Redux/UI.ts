import { merge } from 'lodash'
import { Action } from 'redux'
import { isType } from 'typescript-fsa'

import actionCreatorFactory from 'typescript-fsa'

// action
const actionCreator = actionCreatorFactory()

export const setQuantize = actionCreator<{
  quantize: number
}>('UI_SET_QUANTIZE')

// reducer
export interface PatternUIState {
  quantize: number
}

export interface BlockUIState {
  pattern: PatternUIState
}

export interface UIState {
  readonly block: BlockUIState
}

const initialState: UIState = { block: { pattern: { quantize: 120 } } }

export const uiReducers = (
  state: UIState = initialState,
  action: Action
): UIState => {
  if (isType(action, setQuantize)) {
    const { quantize } = action.payload
    console.log('Action - setQuantize', action.payload)
    return merge(state, { block: { pattern: { quantize } } })
  }
  return state
}
