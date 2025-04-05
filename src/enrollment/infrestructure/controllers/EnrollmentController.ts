import { Request, Response } from "express";
import { GetClassesByUserUseCase } from "../../aplication/GetClassesByUserUseCase";
import { JoinClassUseCase } from "../../aplication/JoinClassesUseCase";
import { query } from "../../../db/mysql"; // Cambia la ruta a tu helper query
import { firebaseAdmin } from "../../../shared/firebaseAdmin"; // Ajusta la ruta

export class EnrollmentController {
  constructor(
    private readonly getClassesByUserUseCase: GetClassesByUserUseCase,
    private readonly joinClassUseCase: JoinClassUseCase
  ) {}

  async getClassesByUser(req: Request, res: Response): Promise<Response> {
    try {
      const id_user: number = parseInt(req.params.id_user);
      const classes = await this.getClassesByUserUseCase.execute(id_user);
      return res.status(200).json(classes);
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener clases" });
    }
  }

  async joinClass(req: Request, res: Response): Promise<Response> {
    try {
      const { class_code } = req.body;
      const id_user: number = parseInt(req.body.id_user);
      const joined = await this.joinClassUseCase.execute(id_user, class_code);

      if (!joined) {
        return res
          .status(400)
          .json({ message: "Clase no encontrada o ya estás inscrito" });
      }

      // 🔹 NOTIFICAR AL PROFESOR
      // 1. Obtener el id_class a partir del class_code
      const sqlClass = `
        SELECT c.id_class
        FROM classes c
        WHERE c.class_code = ?
        LIMIT 1
      `;
      const [rowsClass]: any = await query(sqlClass, [class_code]);
      if (rowsClass.length === 0) {
        return res.status(404).json({ message: "Clase no encontrada" });
      }

      const id_class = rowsClass[0].id_class;

      // 2. Buscar al profesor inscrito en esa clase
      //    con rol = 2 en la tabla users
      const sqlProfesor = `
        SELECT u.id_user, u.id_token
        FROM enrollments e
        JOIN users u ON e.id_user = u.id_user
        WHERE e.id_class = ?
          AND u.id_role = 2
        LIMIT 1
      `;
      const [rowsProfesor]: any = await query(sqlProfesor, [id_class]);
      if (rowsProfesor.length > 0 && rowsProfesor[0].id_token) {
        const teacherToken = rowsProfesor[0].id_token;
        console.log(teacherToken) 

        // 3. Enviar notificación FCM
        await firebaseAdmin.messaging().send({
          token: teacherToken,
          notification: {
            title: "Nuevo alumno en tu clase",
            body: `El alumno con ID ${id_user} se ha unido a tu clase (id_class=${id_class}).`
          }
        });
      }

      return res
        .status(200)
        .json({ message: "Te has unido a la clase correctamente" });
    } catch (error) {
      console.error("Error en joinClass:", error);
      return res.status(500).json({ message: "Error al unirse a la clase" });
    }
  }
}
