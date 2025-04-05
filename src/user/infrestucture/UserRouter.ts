import express from "express";

import { registerUserController, getUserByEmailController, getUserByIdController, getUsersController, loginUserController,updateUserTokenByidController, deleteUserTokenController } from "./dependencies";
import { verifyToken } from "../../middlewares/autMiddleware";

export const userRouter = express.Router();

userRouter.post(
    "/",
    registerUserController.run.bind(registerUserController)
);

userRouter.post(
     "/login",
     loginUserController.login.bind(loginUserController)
);

userRouter.get(
    "/",
    getUsersController.run.bind(getUsersController)
)

userRouter.get(
    "/email/:email",
    getUserByEmailController.run.bind(getUserByEmailController)
)

userRouter.get(
    "/:id_user",
    getUserByIdController.run.bind(getUserByIdController)
)

userRouter.put(
    "/",
    updateUserTokenByidController.run.bind(updateUserTokenByidController)
)

userRouter.delete(
    "/:id_user",
    deleteUserTokenController.run.bind(deleteUserTokenController)
)