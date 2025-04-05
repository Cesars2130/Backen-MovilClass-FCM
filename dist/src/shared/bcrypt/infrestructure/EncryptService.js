"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class EncryptService {
    encodePassword(password) {
        const pass = bcrypt_1.default.hashSync(password, 15);
        return pass;
    }
    authPassword(word, passwordEncode) {
        const result = bcrypt_1.default.compareSync(word, passwordEncode);
        return result;
    }
}
exports.EncryptService = EncryptService;
