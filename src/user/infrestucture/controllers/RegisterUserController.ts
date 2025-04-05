import { RegisterUserUseCase } from "../../aplication/RegisterUserUseCase";
import { Request, Response } from "express";

export class RegisterUserController {
  constructor(readonly registerUserUseCase: RegisterUserUseCase) {}

  async run(req: Request, res: Response) {
    let data = req.body;
    data.id_token = null
   

    try {
      const user = await this.registerUserUseCase.run(
        data.name,
        data.email,
        data.password,
        data.surname,
        data.last_name,
        data.id_role,
        data.id_token,
      );
      if (user) {
        res.status(201).send({
          status: "succes",
          data: {
            id_user: user?.id_user,
            name: user?.name,
            email: user?.email,
            password: user?.password,
            surname: user?.surname,
            last_name: user?.last_name,
            id_role: user?.id_role,
            id_token: user?.id_token
          },
        });
      } else
        res.status(204).send({
          status: "error",
          data: "No fue posible realizar el registro",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
