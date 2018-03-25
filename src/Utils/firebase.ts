import * as firebase from 'firebase'

const {
  REACT_APP_FIREBASE_API_KEY: apiKey,
  REACT_APP_FIREBASE_DB_URL: databaseURL,
  REACT_APP_FIREBASE_AUTH_DOMAIN: authDomain,
  REACT_APP_FIREBASE_PROJECT_ID: projectId
} = process.env

export const initFirebase = () => {
  firebase.initializeApp({
    apiKey,
    databaseURL,
    projectId,
    authDomain
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

export const getDbRef = (path: string): firebase.database.Reference => {
  return firebase.database().ref(path)
}

export const watchDb = (
  path: string,
  onData: (snapshot: firebase.database.DataSnapshot) => void
): firebase.database.Reference => {
  const ref = getDbRef(path)
  ref.on('value', (snapshot: firebase.database.DataSnapshot) => {
    console.log('db updated', snapshot)
  })
  return ref
}

export const writeDb = (
  path: string,
  data: any,
  onData?: (snapshot: firebase.database.DataSnapshot) => void
): firebase.database.Reference => {
  const ref = getDbRef(path)
  ref.set(data, (res: any) => {
    console.log('writeDb completed')
  })
  if (onData) {
    return watchDb(path, onData)
  }
  return ref
}
