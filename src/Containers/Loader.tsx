import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { initSession } from 'Redux/Session'
import { RootState } from 'Redux/store'
import { Session } from 'types'
import { session } from 'Utils/fixtures'

interface Params {
  sessionId?: string
}

interface Props {
  history: any
  actions: LoaderActions
}

class LoaderComponent extends React.Component<
  Props & RouteComponentProps<Params>
> {
  componentDidMount() {
    const { actions, match, history } = this.props

    console.log('loader params', match)
    const sessionId =
      match && match.params && match.params.sessionId
        ? match.params.sessionId
        : 'new'

    if (!sessionId || sessionId == 'new') {
      console.log('create new')
      const newSession = session
      actions.initSession(newSession)
      history.push(`/session/${sessionId}`)
    } else {
      console.log('load session')
      history.push(`/session/${sessionId}`)
    }
    console.log('history', history)
  }
  render() {
    return <div>loading...</div>
  }
}
const LoaderWithRouter = withRouter(LoaderComponent)

export interface LoaderActions {
  initSession: (session: Session) => void
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: {
    initSession: (session: Session) => {
      dispatch(initSession({ session }))
    }
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(LoaderWithRouter)
