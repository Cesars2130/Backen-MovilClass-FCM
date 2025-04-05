import { Request, Response } from "express";
import { GetUSerByIdUseCase } from "../../aplication/GetUserByIdUseCase";

export class GetUserByIdController {
  constructor(readonly getUserByIdUseCase: GetUSerByIdUseCase) {}

  async run(req: Request, res: Response) {
    const id_user: number = parseInt(req.params.id_user);
    try {
      const user = await this.getUserByIdUseCase.run(id_user);
      if (user) {
        res.status(200).send({
          status: "success",
          data: {
            id_user: user.id_user,
            name: user.name,
            email: user.email,
            password: user.password,
            last_name: user.last_name,
            surname: user.surname,
            id_token: user.id_token,
            id_role: user.id_role
          },
        });
      } else {
        res.status(400).send({
          status: "error",
          msn: "Ocurrio algún problema",
        });
      }
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
