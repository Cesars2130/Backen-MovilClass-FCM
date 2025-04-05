import { read } from "fs";
import { User } from "../domain/User";
import { UserRepository } from "../domain/userRepository/UserRepository";

export class updateUserTokenByIdUseCase {
  constructor(readonly userRepository: UserRepository) {}
  async run(id_user: number, id_token: string): Promise<User | null> {
    if (!id_user || !id_token) {
      throw new Error("id_user y id_token son requeridos");
    }
    console.log(id_user,id_token)
    const user = await this.userRepository.getById(id_user);
    if (user) {
        const updatedUser = await this.userRepository.updateUserToken(
            id_user,
            id_token
          );
          return updatedUser; 
    }else{
        return null
    }
   
  }
}
