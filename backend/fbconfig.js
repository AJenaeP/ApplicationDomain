var admin = require("firebase-admin");

const serviceAccount = require('./fbServiceKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://compass-cu-data-default-rtdb.firebaseio.com"
});

module.exports = admin