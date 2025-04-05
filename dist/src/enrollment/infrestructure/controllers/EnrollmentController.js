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
exports.EnrollmentController = void 0;
const mysql_1 = require("../../../db/mysql"); // Cambia la ruta a tu helper query
const firebaseAdmin_1 = require("../../../shared/firebaseAdmin"); // Ajusta la ruta
class EnrollmentController {
    constructor(getClassesByUserUseCase, joinClassUseCase) {
        this.getClassesByUserUseCase = getClassesByUserUseCase;
        this.joinClassUseCase = joinClassUseCase;
    }
    getClassesByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_user = parseInt(req.params.id_user);
                const classes = yield this.getClassesByUserUseCase.execute(id_user);
                return res.status(200).json(classes);
            }
            catch (error) {
                return res.status(500).json({ message: "Error al obtener clases" });
            }
        });
    }
    joinClass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { class_code } = req.body;
                const id_user = parseInt(req.body.id_user);
                const joined = yield this.joinClassUseCase.execute(id_user, class_code);
                if (!joined) {
                    return res
                        .status(400)
                        .json({ message: "Clase no encontrada o ya estás inscrito" });
                }
                // 🔹 NOTIFICAR AL PROFESOR
                // 1. Obtener el id_class a partir del class_code
                const sqlClass = `
        SELECT c.id_class
        FROM classes c
        WHERE c.class_code = ?
        LIMIT 1
      `;
                const [rowsClass] = yield (0, mysql_1.query)(sqlClass, [class_code]);
                if (rowsClass.length === 0) {
                    return res.status(404).json({ message: "Clase no encontrada" });
                }
                const id_class = rowsClass[0].id_class;
                // 2. Buscar al profesor inscrito en esa clase
                //    con rol = 2 en la tabla users
                const sqlProfesor = `
        SELECT u.id_user, u.id_token
        FROM enrollments e
        JOIN users u ON e.id_user = u.id_user
        WHERE e.id_class = ?
          AND u.id_role = 2
        LIMIT 1
      `;
                const [rowsProfesor] = yield (0, mysql_1.query)(sqlProfesor, [id_class]);
                if (rowsProfesor.length > 0 && rowsProfesor[0].id_token) {
                    const teacherToken = rowsProfesor[0].id_token;
                    console.log(teacherToken);
                    // 3. Enviar notificación FCM
                    yield firebaseAdmin_1.firebaseAdmin.messaging().send({
                        token: teacherToken,
                        notification: {
                            title: "Nuevo alumno en tu clase",
                            body: `El alumno con ID ${id_user} se ha unido a tu clase (id_class=${id_class}).`
                        }
                    });
                }
                return res
                    .status(200)
                    .json({ message: "Te has unido a la clase correctamente" });
            }
            catch (error) {
                console.error("Error en joinClass:", error);
                return res.status(500).json({ message: "Error al unirse a la clase" });
            }
        });
    }
}
exports.EnrollmentController = EnrollmentController;
