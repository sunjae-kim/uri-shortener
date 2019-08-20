require('dotenv').config();
const admin = require('firebase-admin');

const serviceAccount = require(process.env.FIREBASE_KEY_PATH);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database();
const shortsRef = db.ref('/shorts');

const getShort = (path, callback) => {
    return shortsRef.child(path).once('value', snapshot => {
        callback(snapshot.val());
    }, error => {
        console.error(error);
        return res.status(500).send('Oh no! Error: ' + error);
    });
};

module.exports = {
    shortsRef, getShort
};
