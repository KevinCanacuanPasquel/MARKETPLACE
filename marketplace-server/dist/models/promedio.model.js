"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promedio = void 0;
const mongoose_1 = require("mongoose");
//Modelo de la BDD
const promedioSchema = new mongoose_1.Schema({
    numEstrellas: {
        type: Number,
        required: [true, 'la calificacion es necesaria']
    },
    servicio: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Servicio',
        required: [true, 'Debe existir una relacion a un Agrupacion']
    },
    estado: {
        type: String
    },
    fechaCreacion: {
        type: Date
    },
});
// model -> Ayuda con la interaccion con la Base de Datos
exports.Promedio = (0, mongoose_1.model)('Promedio', promedioSchema);
