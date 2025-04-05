import { Class } from "../domain/Class";
import { ClassRepository } from "../domain/classRepository/ClassRepository";

export class GetClassByIdUseCase{
    constructor(readonly classRepoistory: ClassRepository){}

    async run (class_code: number):Promise<Class|null>{
        try {
            console.log(class_code)
            const class2 = this.classRepoistory.getClassByCode(class_code)
            return class2
        } catch (error) {
            return null
        }
    }
}