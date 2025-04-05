import { User } from "../domain/User";
import { UserRepository } from "../domain/userRepository/UserRepository";
import { IEncryptService } from "../../shared/bcrypt/aplication/IEncryptService";

export class RegisterUserUseCase {
  constructor(readonly userRepository: UserRepository,
  readonly iEncryptedService: IEncryptService

  ) {}

  async run(
    name: string,
    email: string,
    password: string,
    surname: string,
    last_name: string,
    id_role : number,
    id_token: string,
  ): Promise<User | null> {
    const encode = await this.iEncryptedService.encodePassword(password);
    try {
      const user = await this.userRepository.registerUser(
        name,
        email,
        encode,
        surname,
        last_name,
        id_role,
        id_token,
      );
      console.log(user)
      return user;
    } catch (error) {
      return null;
    }
  }
}
