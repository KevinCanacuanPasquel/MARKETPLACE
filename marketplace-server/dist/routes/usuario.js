"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
// Escribir en el URL ciertas direcciones - tipos de peticiones REST
const userRotes = express_1.Router();
//USUARIO - Login
userRotes.post('/login', (req, res) => {
    usuario_model_1.Usuario.findOne({ correo: req.body.correo }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contrasena no son correctos'
            });
        }
        //Token
        if (userDB.compararContrasena(req.body.contrasena)) {
            const tokenUsuario = token_1.default.getJwtToken({
                _id: userDB._id,
                nombres: userDB.nombres,
                apellidos: userDB.apellidos,
                correo: userDB.correo,
                fecha_nacimiento: userDB.fecha_nacimiento,
                contrasena: userDB.contrasena,
                estado: userDB.estado,
            });
            res.json({
                ok: true,
                token: tokenUsuario
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contrasena no son correctos ***'
            });
        }
    });
});
//USUARIO - Crear
userRotes.post('/crearUsuario', (req, res) => {
    const usuario = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        fecha_nacimiento: req.body.fecha_nacimiento,
        contrasena: bcrypt_1.default.hashSync(req.body.contrasena, 10),
        foto: req.body.foto
    };
    //Crear usuario en BDD
    usuario_model_1.Usuario.create(usuario).then(userDB => {
        //Token
        const tokenUsuario = token_1.default.getJwtToken({
            __id: userDB._id,
            nombres: userDB.nombres,
            apellidos: userDB.apellidos,
            correo: userDB.correo,
            fecha_nacimiento: userDB.fecha_nacimiento,
            contrasena: userDB.contrasena,
            estado: userDB.estado,
        });
        res.json({
            ok: true,
            token: tokenUsuario
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//get image
userRotes.get('/getUsuarioById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("el query", req.query.userId);
    console.log("lo que reetorna ", yield usuario_model_1.Usuario.findById(req.query.userId)
        .exec());
    const usuario = yield usuario_model_1.Usuario.findById(req.query.userId)
        .exec();
    res.json({
        ok: true,
        usuario
    });
}));
//USUARIO - Actualizar
userRotes.post('/actualizarUsuario', [autenticacion_1.verificaToken], (req, res) => {
    const user = {
        nombres: req.body.nombres || req.usuario.nombres,
        apellidos: req.body.apellidos || req.usuario.apellidos,
        correo: req.body.correo || req.usuario.correo,
        fecha_nacimiento: req.body.fecha_nacimiento || req.usuario.fecha_nacimiento,
        contrasena: bcrypt_1.default.hashSync(req.body.contrasena, 10) || req.usuario.contrasena,
        estado: req.body.estado || req.usuario.estado,
        foto: req.body.foto
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        //Token
        const tokenUsuario = token_1.default.getJwtToken({
            _id: userDB._id,
            nombres: userDB.nombres,
            apellidos: userDB.apellidos,
            correo: userDB.correo,
            fecha_nacimiento: userDB.fecha_nacimiento,
            contrasena: userDB.contrasena,
            estado: userDB.estado,
        });
        res.json({
            ok: true,
            token: tokenUsuario
        });
    });
});
//USUARIO - Eliminar
/*
userRotes.delete('/eliminarUsuario', [verificaToken], async (req: any, res: Response) => {

    //console.log(req.usuario._id);
    if (!req.usuario._id) {
        res.json({
            ok: false,
            mensaje: 'No existe el usuario'
        });
    } else {
        await Usuario.findByIdAndRemove({ _id: req.usuario._id });
        res.json({
            ok: true,
            mensaje: 'Usuario eliminado.'
        });
    }
    
    
   

});*/
userRotes.delete('/eliminarUsuario', (req, res) => {
    usuario_model_1.Usuario.deleteOne({ _id: req.query.id }).then(result => {
        if (result.deletedCount === 0) {
            return res.json('No se encontro el usuario');
        }
        res.json("Se elmino el servicio");
    })
        .catch(error => console.error(error));
});
//Mostrar Token Usuario
userRotes.get('/', autenticacion_1.verificaToken, (req, res) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
});
userRotes.get('/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const usuarios = yield usuario_model_1.Usuario.find({}, { projection: { correos: 0, nombres: 0, apellidos: 0 } }).exec();
    res.json({
        ok: true,
        usuarios
    });
}));
exports.default = userRotes;
