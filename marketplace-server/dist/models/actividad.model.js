"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actividad = void 0;
const mongoose_1 = require("mongoose");
//Modelo de la BDD
const actividadSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Los nombres son necesarios']
    },
    arte: {
        type: String,
        required: [true]
    },
    estado: {
        type: String,
        required: [true]
    }
});
// model -> Ayuda con la interaccion con la Base de Datos
exports.Actividad = (0, mongoose_1.model)('Actividad', actividadSchema);
