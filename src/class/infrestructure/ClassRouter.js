"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.classRouter = express_1.default.Router();
exports.classRouter.post("/", dependencies_1.createClassController.run.bind(dependencies_1.createClassController));
exports.classRouter.get("/:id_class", dependencies_1.getClassByIdController.run.bind(dependencies_1.getClassByIdController));
