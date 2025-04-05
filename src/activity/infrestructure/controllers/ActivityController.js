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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityController = void 0;
// Importa tu helper para queries y firebase-admin
const mysql_1 = require("../../../db/mysql");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
class ActivityController {
    constructor(createActivityUseCase, getActivitiesByClassUseCase) {
        this.createActivityUseCase = createActivityUseCase;
        this.getActivitiesByClassUseCase = getActivitiesByClassUseCase;
    }
    createActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { activity_name, activity_description } = req.body;
                let id_user = parseInt(req.body.id_user);
                let id_class = parseInt(req.body.id_class);
                console.log(activity_description, activity_name, id_class, id_user);
                // 1. Crear la actividad con el UseCase
                const newActivity = yield this.createActivityUseCase.execute(id_user, activity_name, activity_description, id_class);
                // 🔹 NOTIFICAR A TODOS LOS ALUMNOS
                // 2. Obtener los tokens de los alumnos que estén en esa clase
                const sqlAlumnos = `
        SELECT u.id_token
        FROM enrollments e
        JOIN users u ON e.id_user = u.id_user
        WHERE e.id_class = ?
          AND u.id_role = 1
      `;
                const [rowsAlumnos] = yield (0, mysql_1.query)(sqlAlumnos, [id_class]);
                // 3. Enviar la notificación a cada alumno
                for (const alumno of rowsAlumnos) {
                    if (alumno.id_token) {
                        yield firebase_admin_1.default.messaging().send({
                            token: alumno.id_token,
                            notification: {
                                title: "Nueva actividad",
                                body: `Se creó la actividad '${activity_name}'. ¡Revisa la app para más detalles!`
                            }
                        });
                    }
                }
                return res.status(201).json(newActivity);
            }
            catch (error) {
                console.error("Error en createActivity:", error);
                return res.status(400).json({ message: "error" });
            }
        });
    }
    getActivitiesByClass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_class } = req.params;
                const activities = yield this.getActivitiesByClassUseCase.execute(Number(id_class));
                console.log(activities);
                return res.status(200).json(activities);
            }
            catch (error) {
                return res.status(500).json({ message: "Error al obtener actividades" });
            }
        });
    }
}
exports.ActivityController = ActivityController;
