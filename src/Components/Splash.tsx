import Logo from 'Components/Common/Logo'
// import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import styled from 'styled-components'

// const Button = RaisedButton
const Splash = styled.div`
  height: 100%;

  .head {
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const SplashComponent = ({ history }: RouteComponentProps<any>) => (
  <Splash>
    <div className="head">
      <Logo />
    </div>
    <div className="menu">
      <FlatButton
        backgroundColor="rgba(255, 255, 255, 0.1)"
        label="Create New"
        onClick={() => history.push('/loader/new')}
      />
    </div>
  </Splash>
)

export default withRouter(SplashComponent)
