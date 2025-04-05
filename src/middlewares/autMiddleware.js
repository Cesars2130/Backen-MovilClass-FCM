"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader;
        if (!token) {
            return res.sendStatus(401);
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            console.log(req.body, "datdata");
            console.log(user);
            if (err) {
                return res.sendStatus(403); // Si el token no es válido, se devuelve un error 403 (Prohibido)
            }
            next();
        });
    }
    catch (error) { }
}
exports.verifyToken = verifyToken;
