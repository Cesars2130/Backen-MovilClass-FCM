import express from "express";
import { Signale } from "signale";
import dotenv from 'dotenv';
import cors from "cors";
// import { userRouter } from "./product/infrastructure/UserRouter";
dotenv.config()

import { userRouter } from "./src/user/infrestucture/UserRouter";
import { classRouter } from "./src/class/infrestructure/ClassRouter";
import enrollmentRouter from "./src/enrollment/infrestructure/EnrollmentRouter";
import activityRouter from "./src/activity/infrestructure/ActivityRouter";

const app = express();
const corsOptions: cors.CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
};
app.use(cors(corsOptions));

const signale = new Signale();
app.disable("x-powered-by");

app.use(express.json());
app.use("/users", userRouter);
app.use("/classes", classRouter);
app.use("/enrollment",enrollmentRouter);
app.use("/activities", activityRouter);

app.listen(3000, () => {
  signale.success("Server online in port 3000");
});
