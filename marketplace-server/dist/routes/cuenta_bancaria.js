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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const cuenta_bancaria_1 = require("../models/cuenta_bancaria");
const cuentaBancariaRoutes = (0, express_1.Router)();
//AGRUPACION - Obtener agrupaciones paginadas
cuentaBancariaRoutes.get('/getCuentaBancaria', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actividades = yield cuenta_bancaria_1.CuentaBancaria.find()
        .exec();
    res.json({
        ok: true,
        actividades
    });
}));
//AGRUPACION - Crear
//CUENTA BANCARIA - Crear
cuentaBancariaRoutes.post('/crearCuentaBancaria', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    body.estado = "ACTIVO";
    // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;
    cuenta_bancaria_1.CuentaBancaria.create(body).then((cuentaBancariaDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield cuentaBancariaDB.populate('usuario').execPopulate();
        res.json({
            ok: true,
            cuentaBancaria: cuentaBancariaDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//CUENTA BANCARIA - Obtener cuenta_bancaria por usuario
///
cuentaBancariaRoutes.get('/cuentaBancariaByUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    console.log(req.query.userId);
    var query = { usuario: userId };
    const cuentaBancaria = yield cuenta_bancaria_1.CuentaBancaria.find(query)
        .exec();
    res.json({
        ok: true,
        cuentaBancaria
    });
}));
///ACTUALIZAR
//Actividad - Actualizar
cuentaBancariaRoutes.put('/actualizarCuentaBancaria', (req, res) => {
    const cuentaBancaria = req.body;
    cuenta_bancaria_1.CuentaBancaria.findByIdAndUpdate(cuentaBancaria._id, cuentaBancaria, { new: true }, (err, cuentaBancariaDB) => {
        if (err)
            throw err;
        if (!cuentaBancariaDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un cuenta bancaria con ese ID'
            });
        }
        //Token
        res.json({
            ok: true,
            actividad: cuentaBancariaDB
        });
    });
});
exports.default = cuentaBancariaRoutes;
