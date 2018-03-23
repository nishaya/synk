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
  duration: number
}

export interface BlockUIState {}
export interface TrackUIState {
  trackColors: string[]
}

export interface UIState {
  readonly pattern: PatternUIState
  readonly block: BlockUIState
  readonly track: TrackUIState
}

const initialState: UIState = {
  block: {},
  pattern: { quantize: 120, duration: 120 },
  track: {
    trackColors: ['#0ff', '#f00', '#f0f']
  }
}

export const uiReducers = (
  state: UIState = initialState,
  action: Action
): UIState => {
  if (isType(action, setQuantize)) {
    const { quantize } = action.payload
    console.log('Action - setQuantize', action.payload)
    return merge(state, { pattern: { quantize } })
  }
  return state
}
