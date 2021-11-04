"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imagen = void 0;
const mongoose_1 = require("mongoose");
const imagenSchema = new mongoose_1.Schema({
    nombre: {
        type: String
    },
    extension: {
        type: String
    },
    fecha: {
        type: Date
    },
    tipo: {
        type: String
    },
    idReferencia: {
        type: String
    },
    archivo: {
        type: String
    }
});
// model -> Ayuda con la interaccion con la Base de Datos
exports.Imagen = (0, mongoose_1.model)('Imagen', imagenSchema);
