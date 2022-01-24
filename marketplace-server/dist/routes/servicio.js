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
const autenticacion_1 = require("../middlewares/autenticacion");
const file_system_1 = __importDefault(require("../classes/file-system"));
const servicio_model_1 = require("../models/servicio.model");
const actividad_model_1 = require("../models/actividad.model");
const suscripcion_model_1 = require("../models/suscripcion.model");
const servicioRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
//AGRUPACION - Obtener agrupaciones paginadas
servicioRoutes.get('/servicios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const servicios = yield servicio_model_1.Servicio.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .exec();
    res.json({
        ok: true,
        pagina,
        servicios
    });
}));
//AGRUPACIONES - Obtener servicio by id
///
servicioRoutes.get('/servicioById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    console.log(req.query.agrupId);
    const servicios = yield servicio_model_1.Servicio.findById(id).populate('actividad').populate('agrupacion')
        .exec();
    res.json({
        ok: true,
        servicios
    });
}));
//AGRUPACIONES - Obtener agrupaciones por usuario
///
servicioRoutes.get('/serviciosByAgupacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agrupId = req.query.agrupId;
    console.log(req.query.agrupId);
    var query = { agrupacion: agrupId };
    const servicios = yield servicio_model_1.Servicio.find(query).populate('actividad').populate('servicio')
        .exec();
    res.json({
        ok: true,
        servicios
    });
}));
//AGRUPACION - Crear
servicioRoutes.post('/crearServicio', [autenticacion_1.verificaToken], (req, res) => {
    let body = req.body;
    body.agrupacion = req.body.agrupacion;
    body.actividad = req.body.actividad;
    console.log("el body", body);
    // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;
    servicio_model_1.Servicio.create(body).then((servicioDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield servicioDB.populate('agrupacion').populate('actividad').execPopulate();
        res.json({
            ok: true,
            servicio: servicioDB
        });
    })).catch(err => {
        res.json(err);
    });
});
///ACTUALIZAR
//USUARIO - Actualizar
servicioRoutes.put('/actualizarServicio', (req, res) => {
    console.log("llega el servicio desde arriba", req.body);
    const servicio = req.body;
    servicio._id = req.body._id;
    console.log("llega el servicio", servicio);
    servicio_model_1.Servicio.findByIdAndUpdate(servicio._id, servicio, { new: true }, (err, servicioDB) => {
        if (err)
            throw err;
        if (!servicioDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un servicio con ese ID'
            });
        }
        //Token
        res.json({
            ok: true,
            servicio: servicioDB
        });
    });
});
servicioRoutes.delete('/eliminarServicio', (req, res) => {
    servicio_model_1.Servicio.deleteOne({ _id: req.query.id }).then(result => {
        if (result.deletedCount === 0) {
            return res.json('No se encontro el servicio');
        }
        res.json("Se elmino el servicio");
    })
        .catch(error => console.error(error));
});
//   BUSQUEDA -por parameetros
servicioRoutes.get('/servicioByParametros', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("pruebas");
    const nombre = req.query.actividad;
    const arte = req.query.arte;
    const estado = req.query.estado;
    console.log(arte, nombre);
    let actividades;
    let listIdActividad;
    let listIdAgrupaciones;
    let fechaActual = new Date().toISOString();
    let query = { $and: [{ fechaFin: { $gte: fechaActual } }, { fechaInicio: { $lt: fechaActual } }] };
    const agrupaciones = yield suscripcion_model_1.Suscripcion.find(query).select('agrupacion')
        .exec();
    console.log("agrupaciones", agrupaciones);
    listIdAgrupaciones = agrupaciones.map(x => { return x.agrupacion; });
    console.log("agrupaciones lista id", listIdAgrupaciones);
    if (arte && nombre) {
        actividades = yield actividad_model_1.Actividad.find({ nombre: { $regex: nombre }, arte: { $regex: arte }, estado: estado }).select('_id').exec();
        listIdActividad = actividades.map(x => { return x._id; });
        const servicios = yield servicio_model_1.Servicio.find({ $and: [{ actividad: { $in: listIdActividad } }, { agrupacion: { $in: listIdAgrupaciones } }] });
        //const servicios =  await Servicio.find(  {agrupacion: {$in: listIdAgrupaciones}})
        //      console.log("servicios", servicios)
        res.json({
            ok: true,
            servicios
        });
    }
    else if (nombre) {
        actividades = yield actividad_model_1.Actividad.find({ nombre: { $regex: nombre }, estado: estado }).select('_id').exec();
        listIdActividad = actividades.map(x => { return x._id; });
        const servicios = yield servicio_model_1.Servicio.find({ $and: [{ actividad: { $in: listIdActividad } }, { agrupacion: { $in: listIdAgrupaciones } }] });
        res.json({
            ok: true,
            servicios
        });
    }
    else if (arte) {
        actividades = yield actividad_model_1.Actividad.find({ arte: { $regex: arte }, estado: estado }).select('_id').exec();
        listIdActividad = actividades.map(x => { return x._id; });
        const servicios = yield servicio_model_1.Servicio.find({ $and: [{ actividad: { $in: listIdActividad } }, { agrupacion: { $in: listIdAgrupaciones } }] });
        res.json({
            ok: true,
            servicios
        });
    }
    else {
        actividades = yield actividad_model_1.Actividad.find({ estado: estado }).select('_id').exec();
        listIdActividad = actividades.map(x => { return x._id; });
        const servicios = yield servicio_model_1.Servicio.find({ $and: [{ actividad: { $in: listIdActividad } }, { agrupacion: { $in: listIdAgrupaciones } }] });
        res.json({
            ok: true,
            servicios
        });
    }
}));
exports.default = servicioRoutes;
