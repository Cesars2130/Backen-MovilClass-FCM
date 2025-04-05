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
exports.JoinClassUseCase = void 0;
class JoinClassUseCase {
    constructor(enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }
    execute(id_user, class_code) {
        return __awaiter(this, void 0, void 0, function* () {
            let boolean = false;
            console.log(id_user, class_code);
            const res = yield this.enrollmentRepository.joinClass(id_user, class_code);
            if (res) {
                boolean = true;
            }
            return boolean;
        });
    }
}
exports.JoinClassUseCase = JoinClassUseCase;
