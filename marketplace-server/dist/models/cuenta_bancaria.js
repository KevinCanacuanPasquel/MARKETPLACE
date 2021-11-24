"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuentaBancaria = void 0;
const mongoose_1 = require("mongoose");
//Modelo BDD
const cuentaBancariaSchema = new mongoose_1.Schema({
    banco: {
        type: String
    },
    tipoCuenta: {
        type: String
    },
    cuentaBancaria: {
        type: String
    },
    CIBancaria: {
        type: String
    },
    //Relacion con Usuario
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una relacion a un Usuario']
    },
    estado: {
        type: String
    }
});
// model -> Ayuda con la interaccion con la Base de Datos
exports.CuentaBancaria = (0, mongoose_1.model)('CuentaBancaria', cuentaBancariaSchema);
