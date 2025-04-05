import express from "express";
import { enrollmentController } from "./dependencies";

export const enrollmentRouter = express.Router();


// Dependencias


// Rutas
enrollmentRouter.get("/:id_user", (req, res) => enrollmentController.getClassesByUser(req, res));
enrollmentRouter.post("/joinClass", (req, res) => enrollmentController.joinClass(req, res));

export default enrollmentRouter;
