"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserTokenController = exports.updateUserTokenByidController = exports.loginUserController = exports.getUsersController = exports.getUserByIdController = exports.getUserByEmailController = exports.registerUserController = exports.deleteUserTokenUseCase = exports.uupdateUserTokenByIdUseCase = exports.getUsersUseCase = exports.getUserByIdUseCase = exports.getUserByEmailUseCase = exports.registerUserUseCase = exports.loginService = exports.mysqlUserRepository = exports.encryptService = void 0;
const GetUserByIdUseCase_1 = require("../aplication/GetUserByIdUseCase");
const getUserByEmailUseCase_1 = require("../aplication/getUserByEmailUseCase");
const getUsersUseCase_1 = require("../aplication/getUsersUseCase");
const RegisterUserUseCase_1 = require("../aplication/RegisterUserUseCase");
const ILoginService_1 = require("../aplication/ILoginService");
const updateUserTokenByIdUseCase_1 = require("../aplication/updateUserTokenByIdUseCase");
const DeleteUserTokenByIdUseCase_1 = require("../aplication/DeleteUserTokenByIdUseCase");
//services
const EncryptService_1 = require("../../shared/bcrypt/infrestructure/EncryptService");
// mqpp
const MysqlUserRepository_1 = require("./MysqlUserRepository");
const GetUserByEmailController_1 = require("./controllers/GetUserByEmailController");
const RegisterUserController_1 = require("./controllers/RegisterUserController");
const GetUsersController_1 = require("./controllers/GetUsersController");
const GetUserByIdController_1 = require("./controllers/GetUserByIdController");
const LoginUserController_1 = require("./controllers/LoginUserController");
const UpdateUserTokenByIdController_1 = require("./controllers/UpdateUserTokenByIdController");
const DeleteUserTokenByIdController_1 = require("./controllers/DeleteUserTokenByIdController");
//services
exports.encryptService = new EncryptService_1.EncryptService();
exports.mysqlUserRepository = new MysqlUserRepository_1.MysqlUserRepository();
exports.loginService = new ILoginService_1.LoginService(exports.mysqlUserRepository, exports.encryptService);
exports.registerUserUseCase = new RegisterUserUseCase_1.RegisterUserUseCase(exports.mysqlUserRepository, exports.encryptService);
exports.getUserByEmailUseCase = new getUserByEmailUseCase_1.GetUserByEmailUseCase(exports.mysqlUserRepository);
exports.getUserByIdUseCase = new GetUserByIdUseCase_1.GetUSerByIdUseCase(exports.mysqlUserRepository);
exports.getUsersUseCase = new getUsersUseCase_1.GetUsersUseCase(exports.mysqlUserRepository);
exports.uupdateUserTokenByIdUseCase = new updateUserTokenByIdUseCase_1.updateUserTokenByIdUseCase(exports.mysqlUserRepository);
exports.deleteUserTokenUseCase = new DeleteUserTokenByIdUseCase_1.DeleteUserTokenUseCase(exports.mysqlUserRepository);
exports.registerUserController = new RegisterUserController_1.RegisterUserController(exports.registerUserUseCase);
exports.getUserByEmailController = new GetUserByEmailController_1.GetUserByEmailController(exports.getUserByEmailUseCase);
exports.getUserByIdController = new GetUserByIdController_1.GetUserByIdController(exports.getUserByIdUseCase);
exports.getUsersController = new GetUsersController_1.GetUsersController(exports.getUsersUseCase);
exports.loginUserController = new LoginUserController_1.LoginUserController(exports.loginService);
exports.updateUserTokenByidController = new UpdateUserTokenByIdController_1.UserController(exports.uupdateUserTokenByIdUseCase);
exports.deleteUserTokenController = new DeleteUserTokenByIdController_1.DeleteUserTokenController(exports.deleteUserTokenUseCase);
