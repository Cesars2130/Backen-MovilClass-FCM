"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id_user, name, email, password, surname, last_name, id_role, id_token) {
        this.id_user = id_user;
        this.name = name;
        this.email = email;
        this.password = password;
        this.surname = surname;
        this.last_name = last_name;
        this.id_role = id_role;
        this.id_token = id_token;
    }
}
exports.User = User;
