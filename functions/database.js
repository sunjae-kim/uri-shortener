const admin = require('firebase-admin');
const serviceAccount = require('/Users/jason/.gcloud/jason-serverless-shortener-firebase-adminsdk-p5wmj-4ae3528976.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://jason-serverless-shortener.firebaseio.com/"
});

const db = admin.database();
const shortsRef = db.ref('/shorts');

const getPath = (path, callback) => {
    return shortsRef.child(path).once('value', snapshot => {
        callback(snapshot.val());
    }, error => {
        console.error(error);
        return res.status(500).send('Oh no! Error: ' + error);
    });
};

module.exports = {
    shortsRef, getPath
};