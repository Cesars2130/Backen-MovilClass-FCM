"use strict";

const admin = require("firebase-admin");

// Inicializa Firebase Admin con variables de entorno
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

// Exporta para usar en otros archivos
module.exports.firebaseAdmin = admin;
