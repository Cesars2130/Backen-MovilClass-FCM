import express from "express";

import { getClassByIdController, createClassController } from "./dependencies";
import { verifyToken } from "../../middlewares/autMiddleware";

export const classRouter = express.Router();

classRouter.post(
    "/",
    createClassController.run.bind(createClassController)
)

classRouter.get(
    "/:id_class",
    getClassByIdController.run.bind(getClassByIdController)
)
