import { GetClassByIdUseCase } from "../aplication/GetClassByIdUseCase";
import { CreateClassUseCase } from "../aplication/CreateClassUseCase";

import { MysqlClassRepository } from "./MysqlClassRepository";
import { MysqlUserRepository } from "../../user/infrestucture/MysqlUserRepository";

import { GetClassByIdController } from "./controllers/GetClassByCodeController";
import { CreateClassController } from "./controllers/CreateClassController";

export const mysqlClassRepository = new MysqlClassRepository();
export const mysqlUserRepository = new MysqlUserRepository();

export const getClassByIdUseCase = new GetClassByIdUseCase(mysqlClassRepository);
export const createClassUseCase = new CreateClassUseCase(mysqlClassRepository);

export const getClassByIdController = new GetClassByIdController(getClassByIdUseCase);
export const createClassController = new CreateClassController(createClassUseCase);