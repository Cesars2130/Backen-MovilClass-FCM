import { query } from "../../db/mysql";
import { EnrollmentRepository } from "../domain/enrollmentRepository/EnrollmentRepository";

export class MysqlEnrollmentRepository implements EnrollmentRepository {
  async getClassesByUser(id_user: number): Promise<{ id_class: number, class_name: string, class_code: string }[]> {
    const sql = `
      SELECT c.id_class, c.class_name, c.class_code
      FROM Enrollments e
      INNER JOIN Classes c ON e.id_class = c.id_class
      WHERE e.id_user = ?`;
      
    try {
      const [result]: any = await query(sql, [id_user]);
      return result;
    } catch (error) {
      console.error("Error en getClassesByUser:", error);
      return [];
    }
  }

  async joinClass(id_user: number, class_code: string): Promise<boolean> {
    try {
      // Obtener ID de la clase por código
      const classResult: any = await query("SELECT id_class FROM Classes WHERE class_code = ?", [class_code]);
      console.log(classResult,"sql")
      if (classResult.length === 0) {
        return false; // Clase no encontrada
      }

      const id_class:number = parseInt(classResult[0][0].id_class)
      console.log(id_user,id_class)
      
      // Insertar inscripción
      const sql = "INSERT INTO enrollments (id_user, id_class) VALUES (?, ?)";
      const params: any[] = [id_user, id_class];

      const [result]: any = await query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error en joinClass:", error);
      return false;
    }
  }
}
