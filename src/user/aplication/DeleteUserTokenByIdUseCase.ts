import { UserRepository } from "../domain/userRepository/UserRepository";
import { User } from "../domain/User";

export class DeleteUserTokenUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id_user: number): Promise<User | null> {
    console.log(id_user,"usecase")
    if (!id_user) {
      throw new Error("id_user es requerido");
    }

    const user = await this.userRepository.getById(id_user);
    if (!user) {
      return null; // Retorna null si el usuario no existe
    }

    return this.userRepository.deleteUserToken(id_user);
  }
}
