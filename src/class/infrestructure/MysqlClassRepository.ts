import { query } from "../../db/mysql";
import { Class } from "../domain/Class";
import { ClassRepository } from "../domain/classRepository/ClassRepository";

export class MysqlClassRepository implements ClassRepository {

  async createClass(
    id_user:number,
    class_name: string,
    class_code: number
  ): Promise<Class | null> {
    
    const sql = "INSERT INTO classes (class_name, class_code) VALUES (?, ?)";
    const params: any[] = [class_name, class_code];
    try {
      const [result]: any = await query(sql, params);
      if (result.affectedRows > 0) {
        return new Class(result.insertId, class_name, class_code);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error en createClass:", error);
      return null;
    }
  }

  async getClassByCode(class_code: number): Promise<Class | null> {
    const sql = "SELECT * FROM classes WHERE class_code = ?";
    const params: any[] = [class_code];
    console.log(params)
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      
      if (result.length === 0) {
        return null;
      }
      return new Class(
        result[0].id_class,
        result[0].class_name,
        result[0].class_code
      );
    } catch (error) {
      console.error("Error en getByCode:", error);
      return null;
    }
  }
}
