import Logo from 'Components/Common/Logo'
// import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import * as React from 'react'
import styled from 'styled-components'

// const Button = RaisedButton
const Splash = styled.div`
  height: 100%;

  .head {
    height: 50%;
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

const SplashComponent = () => (
  <Splash>
    <div className="head">
      <Logo />
    </div>
    <div className="menu">
      <FlatButton
        backgroundColor="rgba(255, 255, 255, 0.1)"
        label="Create New"
      />
    </div>
  </Splash>
)

export default SplashComponent
