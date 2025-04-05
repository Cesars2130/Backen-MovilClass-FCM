import  express  from "express";

import { activityController } from "./dependencies";

const activityRouter = express.Router();

activityRouter.post("/", (req, res) => activityController.createActivity(req, res));
activityRouter.get("/:id_class", (req, res) => activityController.getActivitiesByClass(req, res));

export default activityRouter;