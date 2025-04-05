"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Use case get by id, email
class LoginService {
    constructor(userRepository, iEncryptService) {
        this.userRepository = userRepository;
        this.iEncryptService = iEncryptService;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(email, password);
                const user = yield this.userRepository.getbyEmail(email);
                console.log(user);
                if (user) {
                    let passVerified = false;
                    if (user) {
                        passVerified = yield this.iEncryptService.authPassword(password, user.password);
                    }
                    if (!passVerified) {
                        return null; // Usuario o contraseña incorrectos
                    }
                    let wordsecret = process.env.JWT_SECRET;
                    if (!wordsecret) {
                        throw new Error("JWT_SECRET no está definido en las variables de entorno");
                    }
                    const token = jsonwebtoken_1.default.sign({ id_user: user.id_user, email: user.email }, wordsecret, {
                        expiresIn: "24h", // Expira en 24 horas
                    });
                    // Retornamos el token y los datos del usuario
                    return {
                        token,
                        user: {
                            id_user: user.id_user,
                            name: user.name,
                            surname: user.surname,
                            last_name: user.last_name,
                            email: user.email,
                            id_role: user.id_role, // Se puede usar para verificar roles en frontend
                        },
                    };
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error("Error en login:", error);
                return null;
            }
        });
    }
}
exports.LoginService = LoginService;
