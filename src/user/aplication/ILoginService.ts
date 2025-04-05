import { UserRepository } from "../domain/userRepository/UserRepository";
import { IEncryptService } from "../../shared/bcrypt/aplication/IEncryptService";
import { AuthService } from "./service/LoginService";
import jwt from "jsonwebtoken";

// Use case get by id, email
export class LoginService implements AuthService {
  constructor(
    readonly userRepository: UserRepository,
    readonly iEncryptService: IEncryptService
  ) {}

  async login(email: string, password: string): Promise<{ token: string; user: any } | null> {
    try {
      console.log(email, password);
      const user = await this.userRepository.getbyEmail(email);
      console.log(user);

      if (user) {
        let passVerified = false;
        if (user) {
          passVerified = await this.iEncryptService.authPassword(password, user.password);
        }
        if (!passVerified) {
          return null; // Usuario o contraseña incorrectos
        }
  
        let wordsecret = process.env.JWT_SECRET;
        if (!wordsecret) {
          throw new Error("JWT_SECRET no está definido en las variables de entorno");
        }
  
        const token = jwt.sign({ id_user: user.id_user, email: user.email }, wordsecret, {
          expiresIn: "24h", // Expira en 24 horas
        });
  
        // Retornamos el token y los datos del usuario
        return {
          token,
          user: {
            id_user: user.id_user,
            name: user.name,
            surname: user.surname,
            last_name: user.last_name,
            email: user.email,
            id_role: user.id_role, // Se puede usar para verificar roles en frontend
          },
        };
      }else{
        return null
      }
     
    } catch (error) {
      console.error("Error en login:", error);
      return null;
    }
  }
}
