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
exports.CreateClassUseCase = void 0;
class CreateClassUseCase {
    constructor(classRepository) {
        this.classRepository = classRepository;
    }
    run(id_user, class_name, class_code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const class2 = yield this.classRepository.createClass(id_user, class_name, class_code);
                return class2;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateClassUseCase = CreateClassUseCase;
