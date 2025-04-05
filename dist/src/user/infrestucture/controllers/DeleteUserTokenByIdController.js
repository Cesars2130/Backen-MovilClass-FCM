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
exports.DeleteUserTokenController = void 0;
class DeleteUserTokenController {
    constructor(deleteUserTokenUseCase) {
        this.deleteUserTokenUseCase = deleteUserTokenUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_user = parseInt(req.params.id_user);
                if (!id_user) {
                    return res.status(400).json({ message: "id_user es requerido" });
                }
                const updatedUser = yield this.deleteUserTokenUseCase.run(id_user);
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
exports.DeleteUserTokenController = DeleteUserTokenController;
