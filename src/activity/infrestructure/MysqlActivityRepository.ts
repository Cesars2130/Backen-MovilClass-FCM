import { query } from "../../db/mysql";
import { Activity } from "../domain/Activity";
import { ActivityRepository } from "../domain/activityRespository/ActivityRepository"

export class MysqlActivityRepository implements ActivityRepository {
  async createActivity(activity_name: string, activity_description: string, id_class: number ): Promise<Activity | null> {
    const sql = "INSERT INTO activities  (activity_name, activity_description, id_class) VALUES (?, ?, ?)";
    const params: any[] = [activity_name, activity_description,id_class, ];

    try {
      const [result]: any = await query(sql, params);

      if (result.affectedRows > 0) {
        return new Activity(result.insertId, activity_name, activity_description, id_class);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error en createActivity:", error);
      return null;
    }
  }

  async getActivitiesByClass(id_class: number): Promise<Activity[] > {
    const sql = "SELECT * FROM Activities WHERE id_class = ?";
    const params: any[] = [id_class];

    try {
      const [result]: any = await query(sql, params);

      return result.map(
        (row: any) => new Activity(row.id_activity,row.activity_name, row.activity_description,row.id_class)
      );
    } catch (error) {
      console.error("Error en getActivitiesByClass:", error);
      return [];
    }
  }
}
