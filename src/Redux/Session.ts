import { Action } from 'redux'
import { Block, Note, Pattern, Session } from 'types'
import { isType } from 'typescript-fsa'
import { session } from 'Utils/fixtures'

import actionCreatorFactory from 'typescript-fsa'

// action
const actionCreator = actionCreatorFactory()

export const addNote = actionCreator<{
  blockId: string
  patternId: string
  note: Note
}>('SESSION_ADD_NOTE')

// reducer
export interface SessionState {
  readonly session: Session
}

const initialState: SessionState = { session }

const findPattern = (
  session: Session,
  blockId: string,
  patternId: string
): Pattern | undefined => {
  const block = session.blocks.find((b: Block) => b.id === blockId)
  if (!block) {
    return undefined
  }
  return block.patterns.find((p: Pattern) => p.id === patternId)
}

export const sessionReducers = (
  state: SessionState = initialState,
  action: Action
): SessionState => {
  if (isType(action, addNote)) {
    const { blockId, patternId, note } = action.payload
    console.log('Action - addNote', action.payload, note)
    const pattern = findPattern(state.session, blockId, patternId)
    if (pattern) {
      console.log('pattern', pattern)
      pattern.notes.push(note)
    }
    return state
  }
  return state
}
