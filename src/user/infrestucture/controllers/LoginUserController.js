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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserController = void 0;
class LoginUserController {
    constructor(loginService) {
        this.loginService = loginService;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const response = yield this.loginService.login(email, password);
                if (!response) {
                    return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
                }
                return res.status(200).json(response);
            }
            catch (error) {
                console.error("Error en el controlador de login:", error);
                return res.status(500).json({ message: "Error interno del servidor" });
            }
        });
    }
}
exports.LoginUserController = LoginUserController;
