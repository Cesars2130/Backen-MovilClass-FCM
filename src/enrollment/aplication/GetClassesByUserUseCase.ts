import { EnrollmentRepository } from "../domain/enrollmentRepository/EnrollmentRepository";

export class GetClassesByUserUseCase {
  constructor(private readonly enrollmentRepository: EnrollmentRepository) {}

  async execute(id_user: number) {
    return await this.enrollmentRepository.getClassesByUser(id_user);
  }
}
