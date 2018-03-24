import App from 'App'
import AuthContainer from 'Containers/Auth'
import 'index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'Redux/store'
import { initFirebase } from 'Utils/firebase'

initFirebase()

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <AuthContainer>
        <App />
      </AuthContainer>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
)
