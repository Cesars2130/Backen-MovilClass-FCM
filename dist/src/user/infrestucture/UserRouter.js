"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/", dependencies_1.registerUserController.run.bind(dependencies_1.registerUserController));
exports.userRouter.post("/login", dependencies_1.loginUserController.login.bind(dependencies_1.loginUserController));
exports.userRouter.get("/", dependencies_1.getUsersController.run.bind(dependencies_1.getUsersController));
exports.userRouter.get("/email/:email", dependencies_1.getUserByEmailController.run.bind(dependencies_1.getUserByEmailController));
exports.userRouter.get("/:id_user", dependencies_1.getUserByIdController.run.bind(dependencies_1.getUserByIdController));
exports.userRouter.put("/", dependencies_1.updateUserTokenByidController.run.bind(dependencies_1.updateUserTokenByidController));
exports.userRouter.delete("/:id_user", dependencies_1.deleteUserTokenController.run.bind(dependencies_1.deleteUserTokenController));
