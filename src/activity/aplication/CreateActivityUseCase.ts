import { ActivityRepository } from "../domain/activityRespository/ActivityRepository";
import { UserRepository } from "../../user/domain/userRepository/UserRepository";
import { Activity } from "../domain/Activity";

export class CreateActivityUseCase {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(
    id_user: number,
    activity_name: string,
    activity_description: string,
    id_class: number
  ): Promise<Activity | null> {
    const user = await this.userRepository.getById(id_user);
    console.log(user)
    if (!user || user.id_role !== 2) {
      throw new Error("No tienes permisos para crear una actividad");
    }

    return await this.activityRepository.createActivity(
      activity_name,
      activity_description,
      id_class
    );
  }
}
