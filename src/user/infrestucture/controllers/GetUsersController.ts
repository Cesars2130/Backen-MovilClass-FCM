import { GetUsersUseCase } from "../../aplication/getUsersUseCase";
import { Request, Response } from "express";

export class GetUsersController {
  constructor(readonly getUsersUseCase: GetUsersUseCase) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getUsersUseCase.run();
    
      
      if (users) {
        res.status(200).send({
          status: "succes",
          data: users.map((user: any) => {
            return {
              id_user: user.id_user,
              name: user.name,
              email: user.email,
              password: user.password,
              last_name: user.last_name,
              surname: user.surname,
              id_token: user.id_token,
              id_role: user.id_role,
            };
          }),
        });
      } else {
        res.status(400).send({
          status: "error",
          msn: "Ocurrio algún problema ",
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
