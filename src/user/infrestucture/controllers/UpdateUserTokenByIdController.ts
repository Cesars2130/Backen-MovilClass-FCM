import { Request, Response } from "express";
import { updateUserTokenByIdUseCase } from "../../aplication/updateUserTokenByIdUseCase";

export class UserController {
  constructor(private readonly updateUserTokenUseCase: updateUserTokenByIdUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const { id_user, id_token } = req.body;

      if (!id_user || !id_token) {
        return res.status(400).json({ message: "id_user y id_token son requeridos" });
      }

      const updatedUser = await this.updateUserTokenUseCase.run(id_user, id_token);

      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
