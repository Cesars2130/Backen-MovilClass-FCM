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
exports.GetUserByEmailController = void 0;
class GetUserByEmailController {
    constructor(getUserByEmailUseCase) {
        this.getUserByEmailUseCase = getUserByEmailUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.params.email;
            try {
                console.log(email);
                const user = yield this.getUserByEmailUseCase.run(email);
                if (user) {
                    res.status(200).send({
                        status: "success",
                        data: {
                            id_user: user.id_user,
                            name: user.name,
                            email: user.email,
                            password: user.password,
                            last_name: user.last_name,
                            surname: user.surname,
                            id_token: user.id_token,
                            id_role: user.id_role
                        },
                    });
                }
                else {
                    res.status(400).send({
                        status: "error",
                        msn: "Ocurrio algún problema correo", email
                    });
                }
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
exports.GetUserByEmailController = GetUserByEmailController;
