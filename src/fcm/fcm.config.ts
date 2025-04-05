var admin = require("firebase-admin");

var serviceAccount = require("../shared/firebase.json")

admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});

export const messaging1 = admin.messaging()
