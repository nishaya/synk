import * as firebase from 'firebase'
import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { initSession } from 'Redux/Session'
import { RootState } from 'Redux/store'
import { Session } from 'types'
import { session } from 'Utils/fixtures'
require('firebase/firestore')

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
      const db = firebase.firestore()
      db
        .collection('sessions')
        .add(newSession)
        .then((docRef: firebase.firestore.DocumentReference) => {
          console.log('firestore added', docRef)
          newSession.id = docRef.id
          actions.initSession(newSession)
          history.push(`/session/${docRef.id}`)
        })
        .catch((error: firebase.firestore.FirestoreError) => {
          console.log('firestore error', error)
        })
    } else {
      const db = firebase.firestore()
      const doc = db.doc(`/sessions/${sessionId}`)
      doc.get().then((snapshot: firebase.firestore.DocumentSnapshot) => {
        console.log('loaded', snapshot.data())
        // TODO: check loaded data
        const loadedSession = snapshot.data() as Session
        doc.onSnapshot((changed: firebase.firestore.DocumentSnapshot) => {
          console.log('onSnapshot', changed, changed.data())
        })
        actions.initSession(loadedSession)
        history.push(`/session/${sessionId}`)
      })
      console.log('load session')
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
