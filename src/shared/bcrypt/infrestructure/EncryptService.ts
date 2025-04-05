import bcrypt from "bcrypt";

import { IEncryptService } from "../aplication/IEncryptService";

export class EncryptService implements IEncryptService {
  encodePassword(password: string): string {
    const pass = bcrypt.hashSync(password, 15);
    return pass;
  }
  authPassword(word: string, passwordEncode: string): boolean {
    const result = bcrypt.compareSync(word, passwordEncode);
    return result;
  }
}
