import { merge } from 'lodash'
import { Action } from 'redux'
import { SynthPlayHandler } from 'types'
import { isType } from 'typescript-fsa'

import actionCreatorFactory from 'typescript-fsa'

// action
const actionCreator = actionCreatorFactory()

export const initSynth = actionCreator<{
  trackIndex: number
  handler: SynthPlayHandler
}>('SYNTH_INIT_SYNTH')

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
    console.log('Action:ininSynth', action)
    const { trackIndex, handler } = action.payload
    const { handlers } = state
    handlers[trackIndex] = handler
    return { ...merge(state, { handlers }) }
  }
  return state
}
