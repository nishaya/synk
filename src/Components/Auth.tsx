import { AuthActions } from 'Containers/Auth'
import * as React from 'react'
import { SessionState } from 'Redux/Session'
import { anonAuth } from 'Utils/firebase'

interface Props {
  actions: AuthActions
  session: SessionState
}

class AuthComponent extends React.Component<Props> {
  componentDidMount() {
    const { actions: { setUserId } } = this.props
    anonAuth((user: firebase.User) => {
      console.log('AuthComponent', user)
      setUserId(user.uid)
    })
  }
  render() {
    const { children } = this.props
    const { session: { userId } } = this.props
    if (userId && children) {
      return children
    }
    return null
  }
}

export default AuthComponent
