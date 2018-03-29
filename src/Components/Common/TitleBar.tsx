import { MiniLogo } from 'Components/Common/Logo'
import AppBar from 'material-ui/AppBar'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

const TitleBar = ({ history }: RouteComponentProps<any>) => (
  <AppBar
    iconStyleLeft={{ visibility: 'hidden' }}
    title={<MiniLogo />}
    style={{ background: 'rgba(255, 255, 255, 0.3)' }}
    onTitleClick={() => history.push('/')}
  />
)

export default withRouter(TitleBar)
