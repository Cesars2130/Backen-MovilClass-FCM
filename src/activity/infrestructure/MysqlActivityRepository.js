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
exports.MysqlActivityRepository = void 0;
const mysql_1 = require("../../db/mysql");
const Activity_1 = require("../domain/Activity");
class MysqlActivityRepository {
    createActivity(activity_name, activity_description, id_class) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO activities  (activity_name, activity_description, id_class) VALUES (?, ?, ?)";
            const params = [activity_name, activity_description, id_class,];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                if (result.affectedRows > 0) {
                    return new Activity_1.Activity(result.insertId, activity_name, activity_description, id_class);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error("Error en createActivity:", error);
                return null;
            }
        });
    }
    getActivitiesByClass(id_class) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM Activities WHERE id_class = ?";
            const params = [id_class];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                return result.map((row) => new Activity_1.Activity(row.id_activity, row.activity_name, row.activity_description, row.id_class));
            }
            catch (error) {
                console.error("Error en getActivitiesByClass:", error);
                return [];
            }
        });
    }
}
exports.MysqlActivityRepository = MysqlActivityRepository;
