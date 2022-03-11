"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calificacion = void 0;
const mongoose_1 = require("mongoose");
//Modelo de la BDD
const calificacionSchema = new mongoose_1.Schema({
    numEstrellas: {
        type: Number,
        required: [true, 'la calificacion es necesaria']
    },
    comentario: {
        type: String
    },
    servicio: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Servicio',
        required: [true, 'Debe existir una relacion a un Agrupacion']
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una relacion a un Usuario']
    },
    estado: {
        type: String
    },
    fechaCreacion: {
        type: Date
    },
});
// model -> Ayuda con la interaccion con la Base de Datos
exports.Calificacion = mongoose_1.model('Calificacion', calificacionSchema);
