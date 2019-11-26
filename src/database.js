import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};

const db = firebase
  .initializeApp(firebaseConfig)
  .database();
export const shortsRef = db.ref('/shorts');
export const { database: { ServerValue: { TIMESTAMP } } } = firebase;
export default firebase;
