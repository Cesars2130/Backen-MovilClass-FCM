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
exports.RegisterUserController = void 0;
class RegisterUserController {
    constructor(registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            data.id_token = null;
            try {
                const user = yield this.registerUserUseCase.run(data.name, data.email, data.password, data.surname, data.last_name, data.id_role, data.id_token);
                if (user) {
                    res.status(201).send({
                        status: "succes",
                        data: {
                            id_user: user === null || user === void 0 ? void 0 : user.id_user,
                            name: user === null || user === void 0 ? void 0 : user.name,
                            email: user === null || user === void 0 ? void 0 : user.email,
                            password: user === null || user === void 0 ? void 0 : user.password,
                            surname: user === null || user === void 0 ? void 0 : user.surname,
                            last_name: user === null || user === void 0 ? void 0 : user.last_name,
                            id_role: user === null || user === void 0 ? void 0 : user.id_role,
                            id_token: user === null || user === void 0 ? void 0 : user.id_token
                        },
                    });
                }
                else
                    res.status(204).send({
                        status: "error",
                        data: "No fue posible realizar el registro",
                    });
            }
            catch (error) {
                res.status(204).send({
                    status: "error",
                    data: "Ocurrio un error",
                    msn: error,
                });
            }
        });
    }
}
exports.RegisterUserController = RegisterUserController;
