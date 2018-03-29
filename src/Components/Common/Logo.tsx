import * as React from 'react'
import styled from 'styled-components'

/*
const defaultTrackColors = [
  '#F67280',
  '#C06C84',
  '#6C5B7B',
  '#355C7D',
  '#F8B195'
]
*/

const MainLogo = styled.div`
  color: #f67280;
  font-size: 128px;
  letter-spacing: 0.2em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 100;
  line-height: 160px;
`

const MLC = styled.span`
  color: #f67280;
  font-size: 32px;
  letter-spacing: 0.2em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 100;
`

const TagLine = styled.div`
  color: #c06c84;
  font-size: 22px;
  letter-spacing: 0.1em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
`

export const MiniLogo = () => (
  <div>
    <MLC>SYNK</MLC>
  </div>
)

export default () => (
  <div style={{ textAlign: 'center' }}>
    <MainLogo>SYNK</MainLogo>
    <TagLine>Online Collaborative Sequencer&nbsp;&nbsp;</TagLine>
  </div>
)
