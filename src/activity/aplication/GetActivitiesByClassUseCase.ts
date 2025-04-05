import { ActivityRepository } from "../domain/activityRespository/ActivityRepository";
import { Activity } from "../domain/Activity";

export class GetActivitiesByClassUseCase {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async execute(id_class: number): Promise<Activity[]> {
    return await this.activityRepository.getActivitiesByClass(id_class);
  }
}
