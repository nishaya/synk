import AuthComponent from 'Components/Auth'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { setUserId } from 'Redux/Session'
import { RootState } from 'Redux/store'

export interface AuthActions {
  setUserId: (userId: string) => void
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: {
    setUserId: (userId: string) => {
      dispatch(setUserId({ userId }))
    }
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent)
