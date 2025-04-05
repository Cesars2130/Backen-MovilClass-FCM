"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAdmin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require("../shared/firebase.json");
// Inicializa la app de Firebase Admin
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
// Exporta el módulo que vas a usar
exports.firebaseAdmin = firebase_admin_1.default;
