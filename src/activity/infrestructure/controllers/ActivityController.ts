import { Request, Response } from "express";
import { CreateActivityUseCase } from "../../aplication/CreateActivityUseCase"
import { GetActivitiesByClassUseCase } from "../../aplication/GetActivitiesByClassUseCase";

// Importa tu helper para queries y firebase-admin
import { query } from "../../../db/mysql";
import admin from "firebase-admin";

export class ActivityController {
  constructor(
    private readonly createActivityUseCase: CreateActivityUseCase,
    private readonly getActivitiesByClassUseCase: GetActivitiesByClassUseCase
  ) {}

  async createActivity(req: Request, res: Response): Promise<Response> {
    try {
      const { activity_name, activity_description } = req.body;
      let id_user = parseInt(req.body.id_user);
      let id_class = parseInt(req.body.id_class);

      console.log(activity_description, activity_name, id_class, id_user);

      // 1. Crear la actividad con el UseCase
      const newActivity = await this.createActivityUseCase.execute(
        id_user, activity_name, activity_description, id_class
      );

      // 🔹 NOTIFICAR A TODOS LOS ALUMNOS
      // 2. Obtener los tokens de los alumnos que estén en esa clase
      const sqlAlumnos = `
        SELECT u.id_token
        FROM enrollments e
        JOIN users u ON e.id_user = u.id_user
        WHERE e.id_class = ?
          AND u.id_role = 1
      `;
      const [rowsAlumnos]: any = await query(sqlAlumnos, [id_class]);

      // 3. Enviar la notificación a cada alumno
      for (const alumno of rowsAlumnos) {
        if (alumno.id_token) {
          await admin.messaging().send({
            token: alumno.id_token,
            notification: {
              title: "Nueva actividad",
              body: `Se creó la actividad '${activity_name}'. ¡Revisa la app para más detalles!`
            }
          });
        }
      }

      return res.status(201).json(newActivity);
    } catch (error) {
      console.error("Error en createActivity:", error);
      return res.status(400).json({ message: "error" });
    }
  }

  async getActivitiesByClass(req: Request, res: Response): Promise<Response> {
    try {
      const { id_class } = req.params;
      const activities = await this.getActivitiesByClassUseCase.execute(
        Number(id_class)
      );
      console.log(activities);
      return res.status(200).json(activities);
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener actividades" });
    }
  }
}
