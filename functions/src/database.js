require('dotenv').config();
const admin = require('firebase-admin');

const serviceAccount = require('../service_account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database();
const shortListRef = db.ref('/shortList');

module.exports = {
  shortListRef,
};
