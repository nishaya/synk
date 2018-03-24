import App from 'App'
import 'index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'Redux/store'
import { anonAuth, initFirebase } from 'Utils/firebase'

initFirebase()
anonAuth((user: firebase.User) => {
  console.log('anonAuth success', user)
})

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
)
