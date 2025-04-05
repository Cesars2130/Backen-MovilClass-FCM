import { User } from "../domain/User";
import { UserRepository } from "../domain/userRepository/UserRepository";

export class GetUserByEmailUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async run(email: string): Promise<User | null> {
    try {
      console.log(email);
      const user = this.userRepository.getbyEmail(email);
      console.log(user,email);
      return user;
    } catch (error) {
      return null;
    }
  }
}
