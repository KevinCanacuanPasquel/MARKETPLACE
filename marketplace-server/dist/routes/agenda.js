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
const agenda_model_1 = require("../models/agenda.model");
const agendaRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//AGRUPACION - Obtener agrupaciones paginadas
agendaRoutes.get('/agencia', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const agenda = yield agenda_model_1.Agenda.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .exec();
    res.json({
        ok: true,
        pagina,
        agenda
    });
}));
//AGRUPACIONES - Obtener servicio by id
///
agendaRoutes.get('/agendaById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    console.log(req.query.agrupId);
    const servicios = yield agenda_model_1.Agenda.findById(id).populate('').populate('agrupacion')
        .exec();
    res.json({
        ok: true,
        servicios
    });
}));
//AGRUPACIONES - Obtener agrupaciones por usuario
///
agendaRoutes.get('/serviciosByCliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clienteId = req.query.clienteId;
    console.log(req.query.agrupId);
    var query = { cliente: clienteId };
    const servicios = yield servicio_model_1.Servicio.find(query).populate('servicio').populate('usuario')
        .exec();
    res.json({
        ok: true,
        servicios
    });
}));
//AGRUPACION - Crear
agendaRoutes.post('/crearServicio', [autenticacion_1.verificaToken], (req, res) => {
    let body = req.body;
    body.servicio = req.body.servicio;
    body.cliente = req.body.cliente;
    console.log("el body", body);
    // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;
    agenda_model_1.Agenda.create(body).then((agendaDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield agendaDB.populate('servicio').populate('usuario').execPopulate();
        res.json({
            ok: true,
            agenda: agendaDB
        });
    })).catch(err => {
        res.json(err);
    });
});
/*
///ACTUALIZAR
//USUARIO - Actualizar
servicioRoutes.put('/actualizarServicio',   (req: any, res: Response) => {
    console.log("llega el servicio desde arriba" ,  req.body)
    const servicio =  req.body
    servicio._id = req.body._id
    console.log("llega el servicio" , servicio)
    Servicio.findByIdAndUpdate( servicio._id, servicio, { new: true }, ( err, servicioDB ) => {

        if ( err ) throw err;

        if ( !servicioDB ) {
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

servicioRoutes.delete('/eliminarServicio', (req: any, res: Response) => {
    
    Servicio.deleteOne(
      { _id: req.query.id }
      
    ).then(result => {
        if (result.deletedCount === 0) {
          return res.json('No se encontro el servicio')
        }
        res.json( "Se elmino el servicio")
      })
      .catch(error => console.error(error))

  })




//   BUSQUEDA -por parameetros
servicioRoutes.get('/servicioByParametros', async (req:any, res:Response)=>{
    console.log("pruebas")
    const nombre = req.query.actividad;
    const arte = req.query.arte;
    const estado = req.query.estado
    console.log(arte, nombre)
    let actividades
    let listIdActividad
    let listIdAgrupaciones
    let fechaActual = new Date().toISOString();
    let query =  { $and: [ { fechaFin: {$gte: fechaActual} }, {fechaInicio :{$lt: fechaActual } }]}
    const agrupaciones = await Suscripcion.find(query).select('agrupacion')
    .exec();
    console.log("agrupaciones", agrupaciones)
    listIdAgrupaciones = agrupaciones.map(x=>{ return x.agrupacion})
    console.log("agrupaciones lista id", listIdAgrupaciones)
    if(arte && nombre) {
     
        actividades = await Actividad.find(
            {nombre: { $regex: nombre }, arte: { $regex: arte } , estado:estado}).select('_id').exec();
            listIdActividad =  actividades.map(x=>  { return x._id} )
            const servicios =  await Servicio.find({$and:[{actividad: {$in: listIdActividad}},  {agrupacion: {$in: listIdAgrupaciones}}]})
           //const servicios =  await Servicio.find(  {agrupacion: {$in: listIdAgrupaciones}})
      //      console.log("servicios", servicios)
        res.json({
            ok: true,
            servicios
        });
    }else if(nombre){
        actividades = await Actividad.find(
            {nombre: { $regex: nombre },  estado:estado}).select('_id').exec();
            listIdActividad =  actividades.map(x=>  { return x._id} )
            const servicios =  await Servicio.find({$and:[{actividad: {$in: listIdActividad}},  {agrupacion: {$in: listIdAgrupaciones}}]})
        res.json({
            ok: true,
            servicios
        });
    }else if(arte) {
        actividades = await Actividad.find(
            {arte:  { $regex: arte } ,  estado:estado}).select('_id').exec();
            listIdActividad =  actividades.map(x=>  { return x._id} )
            const servicios =  await Servicio.find({$and:[{actividad: {$in: listIdActividad}},  {agrupacion: {$in: listIdAgrupaciones}}]})
    
        res.json({
            ok: true,
            servicios
        });
    } else {
        actividades = await Actividad.find(
            { estado:estado }).select('_id').exec();
            listIdActividad =  actividades.map(x=>  { return x._id} )
            const servicios =  await Servicio.find({$and:[{actividad: {$in: listIdActividad}},  {agrupacion: {$in: listIdAgrupaciones}}]})
        res.json({
            ok: true,
            servicios
        });
    }
    
    


})


*/
exports.default = agendaRoutes;
