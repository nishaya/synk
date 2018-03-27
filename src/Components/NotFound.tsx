import * as React from 'react'
import styled from 'styled-components'

const MainLogo = styled.div`
  color: #f67280;
  font-size: 64px;
  letter-spacing: 0.1em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 100;
  line-height: 160px;
`

/*
const TagLine = styled.div`
  color: #c06c84;
  font-size: 23px;
  letter-spacing: 0.1em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 100;
`
*/

const Splash = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`

const NotFoundComponent = () => (
  <Splash>
    <div className="head">
      <MainLogo>Not Found</MainLogo>
    </div>
  </Splash>
)

export default NotFoundComponent
