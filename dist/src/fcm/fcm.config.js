"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messaging1 = void 0;
var admin = require("firebase-admin");
var serviceAccount = require("../shared/firebase.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
exports.messaging1 = admin.messaging();
