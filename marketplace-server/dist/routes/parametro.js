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
const parametro_model_1 = require("../models/parametro.model");
const parametroRoutes = (0, express_1.Router)();
//AGRUPACION - Obtener agrupaciones paginadas
parametroRoutes.get('/getparametro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actividades = yield parametro_model_1.Parametro.find()
        .exec();
    res.json({
        ok: true,
        actividades
    });
}));
//AGRUPACIONES - Obtener agrupaciones por usuario
///
parametroRoutes.get('/getParametroByNombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.arte);
    var query = { nombre: req.query.nombre, estado: "ACTIVO" };
    const actividades = yield parametro_model_1.Parametro.find(query)
        .exec();
    res.json({
        ok: true,
        actividades
    });
}));
//AGRUPACION - Crear
parametroRoutes.post('/crearParametro', (req, res) => {
    const parametro = req.body;
    // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;
    parametro_model_1.Parametro.create(parametro).then(result => {
        res.json(parametro);
    })
        .catch(error => console.error(error));
});
/*
//   BUSQUEDA -por parameetros
actividadRoutes.get('/actividadPorParametros', async (req:any, res:Response)=>{
    console.log("pruebas")
    const nombre = req.query.nombre;
    const arte = req.query.arte;
    const estado = req.query.estado
    console.log(arte)
    if(arte && nombre) {
        const actividades = await Actividad.find(
            {nombre: { $regex: nombre }, arte: { $regex: arte } , estado:estado}).exec();
            
        res.json({
            ok: true,
            actividades
        });
    }else if(nombre){
        const actividades = await Actividad.find(
            {nombre: { $regex: nombre },  estado:estado}).exec();
    
        res.json({
            ok: true,
            actividades
        });
    }else if(arte) {
        const actividades = await Actividad.find(
            {arte:  { $regex: arte } ,  estado:estado}).exec();
    
        res.json({
            ok: true,
            actividades
        });
    } else {
        const actividades = await Actividad.find(
            { estado:estado }).exec();
    
        res.json({
            ok: true,
            actividades
        });
    }
    


})



///ACTUALIZAR
//Actividad - Actualizar
actividadRoutes.put('/actualizarActividad',   (req: any, res: Response) => {

    const actividad = {
        _id: req.body._id,
        nombre: req.body.nombre ,
        arte: req.body.arte ,
        estado: req.body.estado
     //   estado: req.body.estado || req.usuario.estado
    }
    
    Actividad.findByIdAndUpdate( actividad._id, actividad, { new: true }, ( err, actividadDB ) => {

        if ( err ) throw err;

        if ( !actividadDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un actividad con ese ID'
            });
        }

        //Token
     
            
            res.json({
                ok: true,
                actividad: actividadDB
            });

    });

});

*/
exports.default = parametroRoutes;
