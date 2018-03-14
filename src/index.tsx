import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from 'App'
// import registerServiceWorker from 'registerServiceWorker'
import 'index.css'
import * as firebase from 'firebase'

const {
  REACT_APP_FIREBASE_API_KEY: apiKey,
  REACT_APP_FIREBASE_SENDER_ID: messagingSenderId
} = process.env
console.log(apiKey, messagingSenderId)

firebase.initializeApp({
  apiKey,
  messagingSenderId
})

const messaging = firebase.messaging()
console.log(messaging)

{
  const req = messaging.requestPermission() as Promise<any>
  req
    .then(function() {
      console.log('Notification permission granted.')
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
      const getToken = messaging.getToken() as Promise<any>
      getToken
        .then(function(currentToken: string) {
          if (currentToken) {
            console.log(currentToken)
            messaging.onMessage(function(payload: any) {
              console.log('Message received. ', payload)
              // ...
            })
            // sendTokenToServer(currentToken);
            // updateUIForPushEnabled(currentToken);
          } else {
            // Show permission request.
            console.log(
              'No Instance ID token available. Request permission to generate one.'
            )
            // Show permission UI.
            // updateUIForPushPermissionRequired();
            // setTokenSentToServer(false);
          }
        })
        .catch(function(err: any) {
          console.log('An error occurred while retrieving token. ', err)
          // showToken('Error retrieving Instance ID token. ', err);
          // setTokenSentToServer(false);
        })
    })
    .catch(function(err: any) {
      console.log('Unable to get permission to notify.', err)
    })
}
ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
// registerServiceWorker()
