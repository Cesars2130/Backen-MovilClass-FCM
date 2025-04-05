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
exports.UserController = void 0;
class UserController {
    constructor(updateUserTokenUseCase) {
        this.updateUserTokenUseCase = updateUserTokenUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_user, id_token } = req.body;
                if (!id_user || !id_token) {
                    return res.status(400).json({ message: "id_user y id_token son requeridos" });
                }
                const updatedUser = yield this.updateUserTokenUseCase.run(id_user, id_token);
                if (!updatedUser) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
                return res.status(200).json(updatedUser);
            }
            catch (error) {
                return res.status(500).json({ message: "Error interno del servidor" });
            }
        });
    }
}
exports.UserController = UserController;
