import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  databaseURL: 'https://jason-serverless-shortener.firebaseio.com/',
  authDomain: 'tisha.me',
  projectId: 'jason-serverless-shortener',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();

export default firebase;
