import App from 'App'
import SplashComponent from 'Components/Splash'
import AuthContainer from 'Containers/Auth'
import Loader from 'Containers/Loader'
import 'index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import store from 'Redux/store'
import { initFirebase } from 'Utils/firebase'

initFirebase()

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <AuthContainer>
        <BrowserRouter>
          <Switch>
            <Route path="/session" component={App} />
            <Route path="/loader/:sessionId" component={Loader} />
            <Route component={SplashComponent} />
          </Switch>
        </BrowserRouter>
      </AuthContainer>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
)
