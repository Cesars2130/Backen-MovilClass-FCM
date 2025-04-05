"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
const activityRouter = express_1.default.Router();
activityRouter.post("/", (req, res) => dependencies_1.activityController.createActivity(req, res));
activityRouter.get("/:id_class", (req, res) => dependencies_1.activityController.getActivitiesByClass(req, res));
exports.default = activityRouter;
