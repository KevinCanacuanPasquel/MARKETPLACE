"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suscripcion = void 0;
const mongoose_1 = require("mongoose");
//Modelo de la BDD
const suscripcionSchema = new mongoose_1.Schema({
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de nacimiento es necesaria']
    },
    fechaFin: {
        type: Date,
        required: [true, 'La fecha de nacimiento es necesaria']
    },
    estado: {
        type: String,
        required: [true]
    },
    valor: {
        type: Number,
        required: [true]
    },
    agrupacion: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Agrupacion',
        required: [true, 'Debe existir una relacion a un Agrupacion']
    },
    foto: {
        name: {
            type: String
        },
        ext: {
            type: String
        },
        fecha: {
            type: Date
        },
        fileBase64: {
            type: String
        }
    }
});
// model -> Ayuda con la interaccion con la Base de Datos
exports.Suscripcion = (0, mongoose_1.model)('Actividad', suscripcionSchema);
