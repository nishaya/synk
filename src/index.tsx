import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'App';
import registerServiceWorker from 'registerServiceWorker';
import 'index.css';
import * as firebase from 'firebase';

const { REACT_APP_FIREBASE_API_KEY: apiKey, REACT_APP_FIREBASE_SENDER_ID: messagingSenderId } = process.env;
console.log(apiKey, messagingSenderId);

firebase.initializeApp(
  {
    apiKey, messagingSenderId
  }
);

const messaging = firebase.messaging();
console.log(messaging);

(messaging.requestPermission() as Promise<any>)
.then(function() {
  console.log('Notification permission granted.');
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
})
.catch(function(err: any) {
  console.log('Unable to get permission to notify.', err);
});

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
