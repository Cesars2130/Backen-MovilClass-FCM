import { Class } from "../Class";

export interface ClassRepository {
    createClass(
        id_user:number,
        class_name:string,
        class_code:number
    ):Promise <Class | null>;
    getClassByCode(class_code:number):Promise<Class |null>

}