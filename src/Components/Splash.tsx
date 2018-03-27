import Logo from 'Components/Common/Logo'
import * as React from 'react'
import styled from 'styled-components'

const Splash = styled.div`
  height: 100%;
  background-color: #ccc;

  .head {
    height: 50%;
    background-color: #ddd;
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
  </Splash>
)

export default SplashComponent
