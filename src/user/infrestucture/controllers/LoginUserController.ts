import { Request, Response } from "express";
import { LoginService } from "../../aplication/ILoginService";

export class LoginUserController {
  private readonly loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const response = await this.loginService.login(email, password);

      if (!response) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }

      return res.status(200).json(response);
    } catch (error) {
      console.error("Error en el controlador de login:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
