import { Activity } from "../Activity";

export interface ActivityRepository {
  createActivity(
    activity_name: string,
    activity_description: string,
    id_class: number
  ): Promise<Activity | null>;
  getActivitiesByClass(id_class: number): Promise<Activity[]>;
}

