export interface IEncryptService {
  encodePassword(password: string): string;
  authPassword(word: string, passwordEncode: string): boolean;
}
