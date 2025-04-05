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
exports.GetClassByIdController = void 0;
class GetClassByIdController {
    constructor(getClassByIdUseCase) {
        this.getClassByIdUseCase = getClassByIdUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_class = parseInt(req.params.id_class);
            try {
                const class2 = yield this.getClassByIdUseCase.run(id_class);
                if (class2) {
                    res.status(200).send({
                        status: "succes",
                        data: {
                            id_class: class2 === null || class2 === void 0 ? void 0 : class2.id_class,
                            clas_name: class2 === null || class2 === void 0 ? void 0 : class2.class_name,
                            class_code: class2 === null || class2 === void 0 ? void 0 : class2.class_code,
                        },
                    });
                }
                else
                    res.status(204).send({
                        status: "error",
                        data: "No fue posible obtener la clase",
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
exports.GetClassByIdController = GetClassByIdController;
