"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
//Modelo de la BDD
const usuarioSchema = new mongoose_1.Schema({
    nombres: {
        type: String,
        required: [true, 'Los nombres son necesarios']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son necesarios']
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'El correo electronico es necesario']
    },
    fecha_nacimiento: {
        type: String,
        required: [true, 'La fecha de nacimiento es necesaria']
    },
    contrasena: {
        type: String,
        required: [true, 'La contrasena es necesaria']
    },
    estado: {
        type: Number,
        default: 1
    }
});
//Metodo para contrasena
usuarioSchema.method('compararContrasena', function (contrasena = '') {
    if (bcrypt_1.default.compareSync(contrasena, this.contrasena)) {
        return true;
    }
    else {
        return false;
    }
});
// model -> Ayuda con la interaccion con la Base de Datos
exports.Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
