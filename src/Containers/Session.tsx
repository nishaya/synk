import SessionComponent from 'Components/Session'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { RootState } from 'Redux/store'

const mapStateToProps = (state: RootState) => ({
  session: state.Session.session
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(SessionComponent)
