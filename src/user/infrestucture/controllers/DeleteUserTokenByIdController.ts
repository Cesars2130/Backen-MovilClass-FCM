import { Request, Response } from "express";
import { DeleteUserTokenUseCase } from "../../aplication/DeleteUserTokenByIdUseCase";

export class DeleteUserTokenController {
  constructor(private readonly deleteUserTokenUseCase: DeleteUserTokenUseCase) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const id_user: number = parseInt(req.params.id_user);

      if (!id_user) {
        return res.status(400).json({ message: "id_user es requerido" });
      }

      const updatedUser = await this.deleteUserTokenUseCase.run(id_user);

      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor"});
    }
  }
}
