import App from 'App'
// import * as firebase from 'firebase'
import 'index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'Redux/store'

/*
const {
  REACT_APP_FIREBASE_API_KEY: apiKey,
  REACT_APP_FIREBASE_SENDER_ID: messagingSenderId
} = process.env
console.log(apiKey, messagingSenderId)

firebase.initializeApp({
  apiKey,
  messagingSenderId
})
*/

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
)
