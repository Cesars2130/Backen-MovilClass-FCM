export class User {
    constructor (
        readonly id_user: number,
        readonly name: string,
        readonly email: string,
        readonly password: string,
        readonly surname: string,
        readonly last_name: string,
        readonly id_role: number,
        readonly id_token: string
    ){}
}