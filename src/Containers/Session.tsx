import SessionComponent from 'Components/Session'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { addNote } from 'Redux/Session'
import { RootState } from 'Redux/store'
import { setCurrentTrack } from 'Redux/UI'
import { Note } from 'types'

export interface PatternActions {
  addNote: (blockId: string, patternId: string, note: Note) => void
}

export interface BlockActions {}
export interface TrackActions {
  setCurrentTrack: (trackIndex: number) => void
}

export interface SessionActions {
  pattern: PatternActions
  block: BlockActions
  track: TrackActions
}

const mapStateToProps = (state: RootState) => ({
  session: state.Session.session,
  settings: state.UI
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: {
    block: {},
    track: {
      setCurrentTrack: (trackIndex: number) => {
        dispatch(setCurrentTrack({ trackIndex }))
      }
    },
    pattern: {
      addNote: (blockId: string, patternId: string, note: Note) => {
        dispatch(addNote({ blockId, patternId, note }))
      }
    }
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(SessionComponent)
