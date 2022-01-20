"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametro = void 0;
const mongoose_1 = require("mongoose");
//Modelo de la BDD
const parametroSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Los nombres son necesarios']
    },
    valor: {
        type: String,
        required: [true]
    },
    tipo: {
        type: String,
        required: [true]
    },
    estado: {
        type: String,
        required: [true]
    }
});
// model -> Ayuda con la interaccion con la Base de Datos
exports.Parametro = mongoose_1.model('Parametro', parametroSchema);
