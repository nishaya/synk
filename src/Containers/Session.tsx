import SessionComponent from 'Components/Session'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { addNote } from 'Redux/Session'
import { RootState } from 'Redux/store'
import { Note } from 'types'

export interface PatternActions {
  addNote: (sessionId: string, blockId: string, note: Note) => void
}

export interface BlockActions {
  pattern: PatternActions
}

export interface SessionActions {
  block: BlockActions
}

const mapStateToProps = (state: RootState) => ({
  session: state.Session.session
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: {
    block: {
      pattern: {
        addNote: (sessionId: string, blockId: string, note: Note) => {
          dispatch(addNote({ sessionId, blockId, note }))
        }
      }
    }
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(SessionComponent)
