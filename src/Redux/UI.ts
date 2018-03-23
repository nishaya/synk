import { merge } from 'lodash'
import { Action } from 'redux'
import { isType } from 'typescript-fsa'

import actionCreatorFactory from 'typescript-fsa'

// action
const actionCreator = actionCreatorFactory()

export const setQuantize = actionCreator<{
  quantize: number
}>('UI_SET_QUANTIZE')

export const setCurrentTrack = actionCreator<{
  trackIndex: number
}>('UI_SET_CURRENT_TRACK')

// reducer
export interface PatternUIState {
  quantize: number
  duration: number
}

export interface BlockUIState {}
export interface TrackUIState {
  trackColors: string[]
  currentTrack: number
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
    currentTrack: 0,
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
    return { ...merge(state, { pattern: { quantize } }) }
  }
  if (isType(action, setCurrentTrack)) {
    const { trackIndex: currentTrack } = action.payload
    console.log('Action - setCurrentTrack', action.payload)
    return { ...merge(state, { track: { currentTrack } }) }
  }
  return state
}
