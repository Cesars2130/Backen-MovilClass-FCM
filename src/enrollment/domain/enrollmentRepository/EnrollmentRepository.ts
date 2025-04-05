export interface EnrollmentRepository {
    getClassesByUser(id_user: number): Promise<{ id_class: number, class_name: string, class_code: string }[]>;
    joinClass(id_user: number, class_code: string): Promise<boolean>;
  }
  