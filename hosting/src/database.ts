import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref } from 'firebase/database'

const app = firebase.initializeApp({
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
})

const db = getDatabase(app)
export const shortListRef = ref(db, '/shortList')
export const auth = getAuth(app)
export default firebase
