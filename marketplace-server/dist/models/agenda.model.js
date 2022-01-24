"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agenda = void 0;
const mongoose_1 = require("mongoose");
//Modelo BDD
const servicioSchema = new mongoose_1.Schema({
    hora: {
        type: String
    },
    fechaAgenda: {
        type: String
    },
    location: {
        type: String,
        coordinates: []
    },
    //Relacion con Usuario
    servicio: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Servicio',
        required: [true, 'Debe existir una relacion a un Agrupacion']
    },
    cliente: {
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
    descripcion: {
        type: String
    }
});
// model -> Ayuda con la interaccion con la Base de Datos
exports.Agenda = (0, mongoose_1.model)('Agenda', servicioSchema);
