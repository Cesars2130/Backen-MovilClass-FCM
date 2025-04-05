import admin from "firebase-admin";
var serviceAccount = require("../shared/firebase.json")

// Inicializa la app de Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

// Exporta el módulo que vas a usar
export const firebaseAdmin = admin;
