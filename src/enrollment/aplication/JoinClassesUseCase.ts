import { EnrollmentRepository } from "../domain/enrollmentRepository/EnrollmentRepository";
import { messaging1 } from "../../fcm/fcm.config";

export class JoinClassUseCase {
  constructor(private readonly enrollmentRepository: EnrollmentRepository) {}

  async execute(id_user: number, class_code: string): Promise<boolean> {
    let boolean = false
    console.log(id_user,class_code)
    const res = await this.enrollmentRepository.joinClass(id_user, class_code);
    
    if (res) {
      boolean = true
    }
    
    return boolean
  }
}
