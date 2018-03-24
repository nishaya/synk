import * as React from 'react'
import { anonAuth } from 'Utils/firebase'

interface Props {}
interface State {
  user: firebase.User | null
}

class AuthComponent extends React.Component<Props, State> {
  state: State = {
    user: null
  }
  componentDidMount() {
    anonAuth((user: firebase.User) => {
      console.log('AuthComponent', user)
      this.setState({ user })
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
