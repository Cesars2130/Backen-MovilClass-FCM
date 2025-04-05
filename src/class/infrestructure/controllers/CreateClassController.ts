import { CreateClassUseCase } from "../../aplication/CreateClassUseCase";
import { Request, Response } from "express";

export class CreateClassController {
  constructor(readonly createClassUseCase: CreateClassUseCase) {}

  async run(req: Request, res: Response) {
    let data = req.body;
    try {
      const class2 = await this.createClassUseCase.run(
        data.id_user,
        data.class_name,
        data.class_code
      );
      if (class2) {
        res.status(201).send({
          status: "succes",
          data: {
            id_class: class2?.id_class,
            clas_name: class2?.class_name,
            class_code: class2?.class_code,
          },
        });
      } else
        res.status(204).send({
          status: "error",
          data: "No fue posible realizar el registro de la clase",
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
