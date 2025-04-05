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
exports.CreateActivityUseCase = void 0;
class CreateActivityUseCase {
    constructor(activityRepository, userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }
    execute(id_user, activity_name, activity_description, id_class) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getById(id_user);
            console.log(user);
            if (!user || user.id_role !== 2) {
                throw new Error("No tienes permisos para crear una actividad");
            }
            return yield this.activityRepository.createActivity(activity_name, activity_description, id_class);
        });
    }
}
exports.CreateActivityUseCase = CreateActivityUseCase;
