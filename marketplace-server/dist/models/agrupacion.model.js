"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agrupacion = void 0;
const mongoose_1 = require("mongoose");
//Modelo BDD
const agrupacionSchema = new mongoose_1.Schema({
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    numintegrantes: {
        type: Number
    },
    tiempoexistente: {
        type: String
    },
    estasuscrito: {
        type: Number
    },
    estado: {
        type: String
    },
    fotos: [{
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
            },
        }],
    //Relacion con Usuario
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una relacion a un Usuario']
    }
});
// model -> Ayuda con la interaccion con la Base de Datos
exports.Agrupacion = mongoose_1.model('Agrupacion', agrupacionSchema);
