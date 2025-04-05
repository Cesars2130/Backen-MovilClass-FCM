import { Request, Response } from "express";
import { GetClassByIdUseCase } from "../../aplication/GetClassByIdUseCase";

export class GetClassByIdController {
  constructor(readonly getClassByIdUseCase: GetClassByIdUseCase) {}

  async run(req: Request, res: Response) {
    const id_class: number = parseInt(req.params.id_class);
    try {
      const class2 = await this.getClassByIdUseCase.run(id_class);
      if (class2) {
        res.status(200).send({
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
          data: "No fue posible obtener la clase",
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
