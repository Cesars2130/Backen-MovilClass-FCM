import { User } from "../User";

export interface UserRepository{
    registerUser(
        name : string,
        email: string,
        password : string ,
        surname: string,
        last_name: string,
        id_role: number,
        id_token :string
    ): Promise <User | null>;
    getUsers(): Promise <User[]| null>;
    getById(id_user: number): Promise<User | null>;
    getbyEmail(email:string): Promise<User | null>;
    deleteUserToken(id_user:number): Promise <User | null >;
    updateUserToken(id_user:number,id_token:string): Promise<User | null>;
}