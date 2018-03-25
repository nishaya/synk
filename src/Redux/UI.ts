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

export const setBlockCursor = actionCreator<{
  cursor: number
}>('UI_SET_BLOCK_CURSOR')

export const setCurrentBlockIndex = actionCreator<{
  currentBlockIndex: number
}>('UI_SET_CURRENT_BLOCK_INDEX')

// reducer
export interface PatternUIState {
  quantize: number
  duration: number
}

export interface BlockUIState {
  currentBlockIndex: number
  cursor: number
}
export interface TrackUIState {
  trackColors: string[]
  currentTrack: number
}

export interface ArrangementState {
  cursor: number
}

export interface UIState {
  readonly pattern: PatternUIState
  readonly block: BlockUIState
  readonly track: TrackUIState
  readonly arrangement: ArrangementState
}

const defaultTrackColors = [
  '#F67280',
  '#C06C84',
  '#6C5B7B',
  '#355C7D',
  '#F8B195'
]

const initialState: UIState = {
  block: {
    currentBlockIndex: 0,
    cursor: 0
  },
  pattern: { quantize: 120, duration: 120 },
  track: {
    currentTrack: 0,
    trackColors: defaultTrackColors
  },
  arrangement: {
    cursor: 0
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
  if (isType(action, setBlockCursor)) {
    const { cursor } = action.payload
    return { ...merge(state, { block: { cursor } }) }
  }
  if (isType(action, setCurrentBlockIndex)) {
    const { currentBlockIndex } = action.payload
    return { ...merge(state, { block: { currentBlockIndex } }) }
  }
  return state
}
