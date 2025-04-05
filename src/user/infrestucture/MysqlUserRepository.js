"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlUserRepository = void 0;
const mysql_1 = require("../../db/mysql");
const User_1 = require("../domain/User");
class MysqlUserRepository {
    updateUserToken(id_user, id_token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "UPDATE users SET id_token = ? WHERE id_user = ?";
                const params = [id_token, id_user]; // Corregido el orden de los parámetros
                const [result] = yield (0, mysql_1.query)(sql, params);
                if (result.affectedRows > 0) {
                    return this.getById(id_user);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error("Error en updateUserToken:", error);
                throw new Error("Error actualizando el token del usuario");
            }
        });
    }
    deleteUserToken(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(id_user, "holahola2");
                const sql = "UPDATE users SET id_token = NULL WHERE id_user = ?";
                const params = [id_user];
                const [result] = yield (0, mysql_1.query)(sql, params);
                if (result.affectedRows > 0) {
                    return this.getById(id_user);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error("Error en deleteUserToken:", error);
                throw new Error("Error eliminando el token del usuario");
            }
        });
    }
    registerUser(name, email, password, surname, last_name, id_role, id_token) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id_role);
            let user = null;
            const sql = "INSERT INTO users (name, email, password, surname, last_name ,id_role, id_token  ) VALUES (?,?,?,?,?,?,?)";
            const params = [
                name,
                email,
                password,
                surname,
                last_name,
                id_role,
                id_token
            ];
            try {
                const [userR] = yield (0, mysql_1.query)(sql, params);
                user = new User_1.User(userR.id, name, email, password, last_name, surname, id_role, id_token);
            }
            catch (error) {
                user = null;
            }
            finally {
                return user;
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users";
            try {
                const [data] = yield (0, mysql_1.query)(sql, []);
                const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));
                return dataUsers.map((user) => new User_1.User(user.id_user, user.name, user.email, user.password, user.last_name, user.surname, user.id_role, user.id_token));
            }
            catch (error) {
                return null;
            }
        });
    }
    getById(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users WHERE id_user=?";
            const params = [id_user];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                return new User_1.User(result[0].id_user, result[0].name, result[0].email, result[0].password, result[0].last_name, result[0].surname, result[0].id_role, result[0].id_token);
            }
            catch (error) {
                return null;
            }
        });
    }
    getbyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users WHERE email=?";
            const params = [email];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                return new User_1.User(result[0].id_user, result[0].name, result[0].email, result[0].password, result[0].last_name, result[0].surname, result[0].id_role, result[0].id_token);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.MysqlUserRepository = MysqlUserRepository;
