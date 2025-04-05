import { Request, Response } from "express";
import { GetUserByEmailUseCase } from "../../aplication/getUserByEmailUseCase";

export class GetUserByEmailController {
  constructor(readonly getUserByEmailUseCase: GetUserByEmailUseCase) {}

  async run(req: Request, res: Response) {
    const email: string = req.params.email;

    try {
      console.log(email);
      const user = await this.getUserByEmailUseCase.run(email);
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
          msn: "Ocurrio algún problema correo",email
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
