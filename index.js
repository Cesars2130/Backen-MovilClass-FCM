"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signale_1 = require("signale");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import { userRouter } from "./product/infrastructure/UserRouter";
dotenv_1.default.config();
const UserRouter_1 = require("./src/user/infrestucture/UserRouter");
const ClassRouter_1 = require("./src/class/infrestructure/ClassRouter");
const EnrollmentRouter_1 = __importDefault(require("./src/enrollment/infrestructure/EnrollmentRouter"));
const ActivityRouter_1 = __importDefault(require("./src/activity/infrestructure/ActivityRouter"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use((0, cors_1.default)(corsOptions));
const signale = new signale_1.Signale();
app.disable("x-powered-by");
app.use(express_1.default.json());
app.use("/users", UserRouter_1.userRouter);
app.use("/classes", ClassRouter_1.classRouter);
app.use("/enrollment", EnrollmentRouter_1.default);
app.use("/activities", ActivityRouter_1.default);
app.listen(3000, () => {
    signale.success("Server online in port 3000");
});
