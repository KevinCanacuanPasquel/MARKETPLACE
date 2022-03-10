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
const file_system_1 = __importDefault(require("../classes/file-system"));
const agenda_model_1 = require("../models/agenda.model");
const calificacion_model_1 = require("../models/calificacion.model");
const promedio_model_1 = require("../models/promedio.model");
const calificacionRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//AGRUPACION - Obtener agrupaciones paginadas
calificacionRoutes.get('/calificacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const calificacion = yield calificacion_model_1.Calificacion.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .exec();
    res.json({
        ok: true,
        pagina,
        calificacion
    });
}));
//AGRUPACIONES - Obtener servicio by id
///
calificacionRoutes.get('/calificacionById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const calificacion = yield calificacion_model_1.Calificacion.findById(id).populate('servicio').populate('usuario')
        .exec();
    res.json({
        ok: true,
        calificacion
    });
}));
//AGRUPACIONES - Obtener agrupaciones por usuario
///
calificacionRoutes.get('/calificacionByCliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clienteId = req.query.clienteId;
    console.log(req.query.clienteId);
    var query = { cliente: clienteId };
    const calificaciones = yield calificacion_model_1.Calificacion.find(query).populate('servicio').populate('usuario')
        .exec();
    res.json({
        ok: true,
        calificaciones
    });
}));
//AGRUPACIONES - Obtener agrupaciones por usuario
///
calificacionRoutes.get('/agendaByServicio', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const servicioId = req.query.servicioId;
    console.log(req.query.servicioId);
    var query = { servicio: servicioId };
    const calificaciones = yield calificacion_model_1.Calificacion.find(query).populate('servicio').populate('usuario')
        .exec();
    res.json({
        ok: true,
        calificaciones
    });
}));
/*
agendaRoutes.get('/agendaByAgrupacion',  async (req:any, res:Response) => {
    const agrupacionId = req.query.agrupacionId;
    console.log(req.query.agrupacionId)
    var query = {agrupacion : agrupacionId};

    
    const servicios = await Servicio.find(query).populate('agrupacion')
    .exec();
    const listIdServicios =  servicios.map(x=>  { return x._id} )
    const agenda =  await Agenda.find({servicio: {$in: listIdServicios}}).populate('servicio').populate('usuario')
    .exec();

   
    res.json({
        ok: true,
        agenda
    });
});*/
function average(accumulator, item) {
    return accumulator + item.numEstrellas;
}
//AGRUPACION - Crear 
//incluye el registro o actualizacion del promedio 
calificacionRoutes.post('/crearCalificacion', (req, res) => {
    let calificacion = req.body.calificacion;
    let agenda = req.body.agenda;
    let respuestaPromedio;
    let respuestaAgenda;
    // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;
    calificacion_model_1.Calificacion.create(calificacion).then((calificacionDB) => __awaiter(void 0, void 0, void 0, function* () {
        const calificaciones = yield calificacion_model_1.Calificacion.find({ servicio: calificacionDB.servicio })
            .exec();
        const divisor = calificaciones.length;
        //  console.log("calificaciones ", calificaciones)
        const sumatoria = calificaciones.reduce(average, 0);
        const valorPromedio = (sumatoria / divisor).toFixed(2);
        console.log(valorPromedio);
        const promedio = yield promedio_model_1.Promedio.find({ servicio: calificacionDB.servicio }).exec();
        console.log("xd afa", promedio);
        if (promedio.length == 0) {
            console.log("entro aca");
            let promedioNew = {
                numEstrellas: valorPromedio,
                servicio: calificacionDB.servicio,
                estado: "ACTIVO",
                fechaCreacion: new Date()
            };
            promedio_model_1.Promedio.create(promedioNew).then((promedioDB) => __awaiter(void 0, void 0, void 0, function* () {
                respuestaPromedio = promedioDB;
            })).catch(err => {
                res.json(err);
            });
        }
        else {
            promedio[0].numEstrellas = Number(valorPromedio);
            console.log(promedio[0]);
            promedio_model_1.Promedio.findByIdAndUpdate(promedio[0]._id, promedio[0], { new: true }, (err, promedioDB) => {
                if (err)
                    throw err;
                if (!promedioDB) {
                    return res.json({
                        ok: false,
                        mensaje: 'No existe un servicio con ese ID'
                    });
                }
                //Token
                respuestaPromedio = promedioDB;
            });
        }
        agenda.estado = "CALIFICADO";
        agenda_model_1.Agenda.findByIdAndUpdate(agenda._id, agenda, { new: true }, (err, AgendaDB) => {
            if (err)
                throw err;
            if (!AgendaDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe una agenda con ese ID'
                });
            }
            //Token
            respuestaAgenda = AgendaDB;
        });
        yield calificacionDB.populate('servicio').populate('usuario').execPopulate();
        res.json({
            ok: true,
            calificacion: calificacionDB,
            promedio: respuestaPromedio
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
exports.default = calificacionRoutes;
