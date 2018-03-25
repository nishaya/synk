import * as firebase from 'firebase'

const {
  REACT_APP_FIREBASE_API_KEY: apiKey,
  REACT_APP_FIREBASE_DB_URL: databaseURL
} = process.env

export const initFirebase = () => {
  firebase.initializeApp({
    apiKey,
    databaseURL
  })
}

export const anonAuth = (onAuth: (user: firebase.User) => void): void => {
  firebase.auth().onAuthStateChanged((user: firebase.User) => {
    console.log('onAuthStateChanged', user)
    if (user) {
      onAuth(user)
    }
  })
  firebase
    .auth()
    .signInAnonymously()
    .then((value: any) => {
      console.log('signInAnonymously', value)
    })
    .catch((error: firebase.FirebaseError) => {
      console.log('anonAuth error', error)
    })
}
