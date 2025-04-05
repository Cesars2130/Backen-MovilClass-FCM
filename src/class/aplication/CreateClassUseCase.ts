import { UserRepository } from "../../user/domain/userRepository/UserRepository";
import { ClassRepository } from "../domain/classRepository/ClassRepository";
import { Class } from "../domain/Class";

export class CreateClassUseCase {
  constructor(
    private readonly classRepository: ClassRepository
  ) {}

  async run(
    id_user: number,
    class_name: string,
    class_code: number
  ): Promise<Class | null> {

    try {

     
      const class2 = await this.classRepository.createClass(
        id_user,
        class_name,
        class_code
      );
      return class2
    } catch (error) {
      return null
    }
   
  }
}
