import * as firebase from 'firebase'

const { REACT_APP_FIREBASE_API_KEY: apiKey } = process.env

export const initFirebase = () => {
  firebase.initializeApp({
    apiKey
  })
}
