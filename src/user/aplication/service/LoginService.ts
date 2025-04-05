export interface AuthService {
  login(username: string, password: string): Promise<{ token: string; user: any } | null>;
}
