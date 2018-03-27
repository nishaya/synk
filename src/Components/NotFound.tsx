import * as React from 'react'
import styled from 'styled-components'

const Splash = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    color: #f67280;
    font-size: 64px;
    letter-spacing: 0.1em;
    font-family: 'Montserrat', sans-serif;
    font-weight: 100;
    line-height: 160px;
  }
`

const NotFoundComponent = () => (
  <Splash>
    <div className="head">
      <div className="text">Not Found</div>
    </div>
  </Splash>
)

export default NotFoundComponent
