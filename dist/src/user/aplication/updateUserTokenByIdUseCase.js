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
exports.updateUserTokenByIdUseCase = void 0;
class updateUserTokenByIdUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    run(id_user, id_token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id_user || !id_token) {
                throw new Error("id_user y id_token son requeridos");
            }
            console.log(id_user, id_token);
            const user = yield this.userRepository.getById(id_user);
            if (user) {
                const updatedUser = yield this.userRepository.updateUserToken(id_user, id_token);
                return updatedUser;
            }
            else {
                return null;
            }
        });
    }
}
exports.updateUserTokenByIdUseCase = updateUserTokenByIdUseCase;
