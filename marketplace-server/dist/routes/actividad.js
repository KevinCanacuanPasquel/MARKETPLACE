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
const actividad_model_1 = require("../models/actividad.model");
const actividadRoutes = (0, express_1.Router)();
//AGRUPACION - Obtener agrupaciones paginadas
actividadRoutes.get('/getActividad', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actividades = yield actividad_model_1.Actividad.find()
        .exec();
    res.json({
        ok: true,
        actividades
    });
}));
//AGRUPACIONES - Obtener agrupaciones por usuario
///
actividadRoutes.get('/actividadPorPadre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.arte);
    var query = { arte: req.query.arte };
    const actividades = yield actividad_model_1.Actividad.find(query)
        .exec();
    res.json({
        ok: true,
        actividades
    });
}));
//AGRUPACION - Crear
actividadRoutes.post('/crearActividad', (req, res) => {
    const actividad = {
        nombre: req.body.nombre,
        arte: req.body.arte
    };
    // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;
    actividad_model_1.Actividad.create(actividad).then(result => {
        res.json(actividad);
    })
        .catch(error => console.error(error));
});
//   BUSQUEDA -por parameetros
actividadRoutes.get('/actividadPorParametros', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("pruebas");
    const nombre = req.query.nombre;
    const arte = req.query.arte;
    console.log(arte);
    if (arte && nombre) {
        const actividades = yield actividad_model_1.Actividad.find({ nombre: nombre, arte: arte }).exec();
        res.json({
            ok: true,
            actividades
        });
    }
    else if (nombre) {
        const actividades = yield actividad_model_1.Actividad.find({ nombre: nombre }).exec();
        res.json({
            ok: true,
            actividades
        });
    }
    else if (arte) {
        const actividades = yield actividad_model_1.Actividad.find({ arte: arte }).exec();
        res.json({
            ok: true,
            actividades
        });
    }
    else {
        const actividades = yield actividad_model_1.Actividad.find({}).exec();
        res.json({
            ok: true,
            actividades
        });
    }
}));
///ACTUALIZAR
//USUARIO - Actualizar
/*agrupacionRoutes.put('/actualizarAgrupacion', [verificaToken],  (req: any, res: Response) => {

    const agrup = {
        nombre: req.body.nombre ,
        descripcion: req.body.descripcion ,
        numintegrantes: req.body.numintegrantes ,
        tiempoexistente: req.body.tiempoexistente ,
        estasuscrito: req.body.estasuscrito ,
        _id: req.body.id
     //   estado: req.body.estado || req.usuario.estado
    }
    console.log(agrup)
    Agrupacion.findByIdAndUpdate( agrup._id, agrup, { new: true }, ( err, agrupacionDB ) => {

        if ( err ) throw err;

        if ( !agrupacionDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un agrupacion con ese ID'
            });
        }

        //Token
     
            
            res.json({
                ok: true,
                agrupacion: agrupacionDB
            });

    });

});
*/
exports.default = actividadRoutes;
