"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.enrollmentRouter = express_1.default.Router();
// Dependencias
// Rutas
exports.enrollmentRouter.get("/:id_user", (req, res) => dependencies_1.enrollmentController.getClassesByUser(req, res));
exports.enrollmentRouter.post("/joinClass", (req, res) => dependencies_1.enrollmentController.joinClass(req, res));
exports.default = exports.enrollmentRouter;
