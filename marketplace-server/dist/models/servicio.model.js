"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servicio = void 0;
const mongoose_1 = require("mongoose");
//Modelo BDD
const servicioSchema = new mongoose_1.Schema({
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    valorEstimado: {
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
    agrupacion: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Agrupacion',
        required: [true, 'Debe existir una relacion a un Agrupacion']
    },
    actividad: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Actividad',
        required: [true, 'Debe existir una relacion a un Actividad']
    }
});
// model -> Ayuda con la interaccion con la Base de Datos
exports.Servicio = (0, mongoose_1.model)('Servicio', servicioSchema);
