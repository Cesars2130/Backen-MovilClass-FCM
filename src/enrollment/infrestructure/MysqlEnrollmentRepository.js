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
exports.MysqlEnrollmentRepository = void 0;
const mysql_1 = require("../../db/mysql");
class MysqlEnrollmentRepository {
    getClassesByUser(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      SELECT c.id_class, c.class_name, c.class_code
      FROM Enrollments e
      INNER JOIN Classes c ON e.id_class = c.id_class
      WHERE e.id_user = ?`;
            try {
                const [result] = yield (0, mysql_1.query)(sql, [id_user]);
                return result;
            }
            catch (error) {
                console.error("Error en getClassesByUser:", error);
                return [];
            }
        });
    }
    joinClass(id_user, class_code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener ID de la clase por código
                const classResult = yield (0, mysql_1.query)("SELECT id_class FROM Classes WHERE class_code = ?", [class_code]);
                console.log(classResult, "sql");
                if (classResult.length === 0) {
                    return false; // Clase no encontrada
                }
                const id_class = parseInt(classResult[0][0].id_class);
                console.log(id_user, id_class);
                // Insertar inscripción
                const sql = "INSERT INTO enrollments (id_user, id_class) VALUES (?, ?)";
                const params = [id_user, id_class];
                const [result] = yield (0, mysql_1.query)(sql, params);
                return result.affectedRows > 0;
            }
            catch (error) {
                console.error("Error en joinClass:", error);
                return false;
            }
        });
    }
}
exports.MysqlEnrollmentRepository = MysqlEnrollmentRepository;
