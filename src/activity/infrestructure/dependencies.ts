import { ActivityController } from "./controllers/ActivityController";
import { GetActivitiesByClassUseCase } from "../aplication/GetActivitiesByClassUseCase";
import { CreateActivityUseCase } from "../aplication/CreateActivityUseCase";
import { MysqlActivityRepository } from "./MysqlActivityRepository";
import { MysqlUserRepository } from "../../user/infrestucture/MysqlUserRepository";

export const activityRepository = new MysqlActivityRepository();
export const userRepository = new MysqlUserRepository();
export const createActivityUseCase = new CreateActivityUseCase(activityRepository, userRepository);
export const getActivitiesByClassUseCase = new GetActivitiesByClassUseCase(activityRepository);
export const activityController = new ActivityController(createActivityUseCase, getActivitiesByClassUseCase);