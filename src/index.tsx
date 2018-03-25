import App from 'App'
import SplashComponent from 'Components/Splash'
import AuthContainer from 'Containers/Auth'
import 'index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import store from 'Redux/store'
import { initFirebase } from 'Utils/firebase'

initFirebase()

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <AuthContainer>
        <BrowserRouter>
          <div>
            <Route path="/session" component={App} />
            <Route component={SplashComponent} />
          </div>
        </BrowserRouter>
      </AuthContainer>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
)
