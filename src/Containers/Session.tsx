import SessionComponent from 'Components/Session'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { addNote } from 'Redux/Session'
import { RootState } from 'Redux/store'
import { Note } from 'types'

export interface PatternActions {
  addNote: (blockId: string, patternId: string, note: Note) => void
}

export interface BlockActions {
  pattern: PatternActions
}

export interface SessionActions {
  block: BlockActions
}

const mapStateToProps = (state: RootState) => ({
  session: state.Session.session,
  settings: state.UI
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: {
    block: {
      pattern: {
        addNote: (blockId: string, patternId: string, note: Note) => {
          dispatch(addNote({ blockId, patternId, note }))
        }
      }
    }
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(SessionComponent)
