import { GetUSerByIdUseCase } from "../aplication/GetUserByIdUseCase";
import { GetUserByEmailUseCase } from "../aplication/getUserByEmailUseCase";
import { GetUsersUseCase } from "../aplication/getUsersUseCase";
import { RegisterUserUseCase } from "../aplication/RegisterUserUseCase";
import { LoginService } from "../aplication/ILoginService";
import { updateUserTokenByIdUseCase } from "../aplication/updateUserTokenByIdUseCase";
import { DeleteUserTokenUseCase } from "../aplication/DeleteUserTokenByIdUseCase";

//services
import { EncryptService } from "../../shared/bcrypt/infrestructure/EncryptService";
// mqpp

import { MysqlUserRepository } from "./MysqlUserRepository";


import { GetUserByEmailController } from "./controllers/GetUserByEmailController";
import { RegisterUserController } from "./controllers/RegisterUserController";
import { GetUsersController } from "./controllers/GetUsersController";
import { GetUserByIdController } from "./controllers/GetUserByIdController";
import { LoginUserController } from "./controllers/LoginUserController";
import { UserController } from "./controllers/UpdateUserTokenByIdController";
import { DeleteUserTokenController } from "./controllers/DeleteUserTokenByIdController";
import { constants } from "buffer";

//services
export const encryptService = new EncryptService();
export const mysqlUserRepository = new MysqlUserRepository ();

export const loginService = new LoginService(mysqlUserRepository, encryptService);
export const registerUserUseCase = new RegisterUserUseCase(mysqlUserRepository, encryptService);
export const getUserByEmailUseCase = new GetUserByEmailUseCase(mysqlUserRepository);
export const getUserByIdUseCase = new GetUSerByIdUseCase(mysqlUserRepository);
export const getUsersUseCase = new GetUsersUseCase ( mysqlUserRepository);
export const uupdateUserTokenByIdUseCase = new updateUserTokenByIdUseCase(mysqlUserRepository);
export const deleteUserTokenUseCase = new DeleteUserTokenUseCase (mysqlUserRepository);

export const registerUserController = new RegisterUserController(registerUserUseCase);
export const getUserByEmailController = new GetUserByEmailController(getUserByEmailUseCase);
export const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
export const getUsersController = new GetUsersController(getUsersUseCase);
export const loginUserController = new LoginUserController(loginService);
export const updateUserTokenByidController = new UserController(uupdateUserTokenByIdUseCase);
export const deleteUserTokenController = new DeleteUserTokenController(deleteUserTokenUseCase);