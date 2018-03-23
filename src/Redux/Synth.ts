import { merge } from 'lodash'
import { Action } from 'redux'
import { SynthPlayInfo, SynthStopHandler } from 'types'
import { isType } from 'typescript-fsa'

import actionCreatorFactory from 'typescript-fsa'

// action
const actionCreator = actionCreatorFactory()

export type SynthPlayHandler = (info: SynthPlayInfo) => SynthStopHandler

export const initSynth = actionCreator<{
  trackIndex: number
  handler: SynthPlayHandler
}>('UI_SET_QUANTIZE')

export interface SynthState {
  handlers: SynthPlayHandler[]
}

const initialState: SynthState = {
  handlers: []
}

export const synthReducers = (
  state: SynthState = initialState,
  action: Action
): SynthState => {
  if (isType(action, initSynth)) {
    const { trackIndex, handler } = action.payload
    const { handlers } = state
    handlers[trackIndex] = handler
    return { ...merge(state, { handlers }) }
  }
  return state
}
