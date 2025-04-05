import { User } from "../domain/User";
import { UserRepository } from "../domain/userRepository/UserRepository";

export class GetUsersUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async run(): Promise<User[] | null> {
    try {  
      const users = this.userRepository.getUsers(); 
      return users;
    } catch (error) {
      return null;
    }
  }
}
