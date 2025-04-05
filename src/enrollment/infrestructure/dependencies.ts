import { EnrollmentController } from "./controllers/EnrollmentController";
import { MysqlEnrollmentRepository } from "./MysqlEnrollmentRepository";
import { GetClassesByUserUseCase } from "../aplication/GetClassesByUserUseCase";
import { JoinClassUseCase } from "../aplication/JoinClassesUseCase";

export const enrollmentRepository = new MysqlEnrollmentRepository();
export const getClassesByUserUseCase = new GetClassesByUserUseCase(enrollmentRepository);
export const joinClassUseCase = new JoinClassUseCase(enrollmentRepository);
export const enrollmentController = new EnrollmentController(getClassesByUserUseCase, joinClassUseCase);