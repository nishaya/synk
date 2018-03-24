import { AuthActions } from 'Containers/Auth'
import * as React from 'react'
import { anonAuth } from 'Utils/firebase'

interface Props {
  actions: AuthActions
}
interface State {
  user: firebase.User | null
}

class AuthComponent extends React.Component<Props, State> {
  state: State = {
    user: null
  }
  componentDidMount() {
    const { actions: { setUserId } } = this.props
    anonAuth((user: firebase.User) => {
      console.log('AuthComponent', user)
      this.setState({ user })
      setUserId(user.uid)
    })
  }
  render() {
    const { children } = this.props
    const { user } = this.state
    if (user && children) {
      return children
    }
    return null
  }
}

export default AuthComponent
