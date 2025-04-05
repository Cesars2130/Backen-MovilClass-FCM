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
exports.MysqlClassRepository = void 0;
const mysql_1 = require("../../db/mysql");
const Class_1 = require("../domain/Class");
class MysqlClassRepository {
    createClass(id_user, class_name, class_code) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO classes (class_name, class_code) VALUES (?, ?)";
            const params = [class_name, class_code];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                if (result.affectedRows > 0) {
                    return new Class_1.Class(result.insertId, class_name, class_code);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error("Error en createClass:", error);
                return null;
            }
        });
    }
    getClassByCode(class_code) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM classes WHERE class_code = ?";
            const params = [class_code];
            console.log(params);
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                console.log(result);
                if (result.length === 0) {
                    return null;
                }
                return new Class_1.Class(result[0].id_class, result[0].class_name, result[0].class_code);
            }
            catch (error) {
                console.error("Error en getByCode:", error);
                return null;
            }
        });
    }
}
exports.MysqlClassRepository = MysqlClassRepository;
