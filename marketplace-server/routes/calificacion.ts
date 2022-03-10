import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';
import { Agrupacion } from '../models/agrupacion.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from "../classes/file-system";
import { Servicio } from "../models/servicio.model";
import { Actividad } from "../models/actividad.model";
import { Suscripcion } from "../models/suscripcion.model";
import { Agenda } from "../models/agenda.model";
import { Calificacion } from "../models/calificacion.model";
import { Promedio } from "../models/promedio.model";


const calificacionRoutes = Router();
const fileSystem = new FileSystem();


//AGRUPACION - Obtener agrupaciones paginadas
calificacionRoutes.get('/calificacion',  async (req:any, res:Response) => {

    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const calificacion = await Calificacion.find()
                                        .sort({ _id: -1 })
                                        .skip( skip )
                                        .limit(10)
                                        .exec();

    res.json({
        ok: true,
        pagina,
        calificacion
    });
});



//AGRUPACIONES - Obtener servicio by id
///
calificacionRoutes.get('/calificacionById',  async (req:any, res:Response) => {
    const id = req.query.id;
 
    
    const calificacion = await Calificacion.findById(id).populate('servicio').populate('usuario')                    
                                        .exec();

    res.json({
        ok: true,
        calificacion
    });
});

//AGRUPACIONES - Obtener agrupaciones por usuario
///
calificacionRoutes.get('/calificacionByCliente',  async (req:any, res:Response) => {
    const clienteId = req.query.clienteId;
    console.log(req.query.clienteId)
    var query = {cliente : clienteId};
    
    const calificaciones = await Calificacion.find(query).populate('servicio').populate('usuario')                      
                                        .exec();

    res.json({
        ok: true,
        calificaciones
    });
});


//AGRUPACIONES - Obtener agrupaciones por usuario
///
calificacionRoutes.get('/agendaByServicio',  async (req:any, res:Response) => {
    const servicioId = req.query.servicioId;
    console.log(req.query.servicioId)
    var query = {servicio : servicioId};
    
    const calificaciones = await Calificacion.find(query).populate('servicio').populate('usuario')                      
                                        .exec();

    
   
    res.json({
        ok: true,
        calificaciones
    });
});
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


function  average(accumulator: number, item: any ) {
    return accumulator + item.numEstrellas;
  }
//AGRUPACION - Crear 
//incluye el registro o actualizacion del promedio 
calificacionRoutes.post('/crearCalificacion',   (req:any, res:Response) => {

    let calificacion = req.body.calificacion;
    let agenda = req.body.agenda;
    let respuestaPromedio :any;
    let respuestaAgenda: any ;

   // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;

    
    Calificacion.create(calificacion).then ( async calificacionDB => {
        const calificaciones = await Calificacion.find({servicio: calificacionDB.servicio})                 
        .exec();
        const divisor = calificaciones.length

      //  console.log("calificaciones ", calificaciones)
        const sumatoria = calificaciones.reduce(average, 0)
        const valorPromedio = (sumatoria / divisor).toFixed(2)
        console.log (valorPromedio)

         const promedio = await Promedio.find({servicio:  calificacionDB.servicio}).exec()
        console.log("xd afa", promedio)
        if(promedio.length == 0){
            console.log("entro aca")
            let promedioNew = {
                numEstrellas : valorPromedio,
                servicio : calificacionDB.servicio,
                estado : "ACTIVO",
                fechaCreacion: new Date()
            }

            Promedio.create(promedioNew).then (async promedioDB =>{
                respuestaPromedio = promedioDB
            }).catch( err=> {
                res.json(err)
            })
        }else{
          
            promedio[0].numEstrellas = Number(valorPromedio);
            console.log(promedio[0])
            Promedio.findByIdAndUpdate( promedio[0]._id, promedio[0] ,{ new: true }, ( err, promedioDB ) => {
                if ( err ) throw err;

                if ( !promedioDB ) {
                    return res.json({
                        ok: false,
                        mensaje: 'No existe un servicio con ese ID'
                    });
                }
        
                //Token
              
                respuestaPromedio=  promedioDB
        
            });

        }
        agenda.estado = "CALIFICADO"
        Agenda.findByIdAndUpdate( agenda._id, agenda ,{ new: true }, ( err, AgendaDB ) => {
            if ( err ) throw err;

            if ( !AgendaDB ) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe una agenda con ese ID'
                });
            }
    
            //Token
          
            respuestaAgenda=  AgendaDB
    
        });            
        
       
        await calificacionDB.populate('servicio').populate('usuario').execPopulate();

        res.json({
            ok: true,
            calificacion: calificacionDB,
            promedio: respuestaPromedio
        });

    }).catch( err => {
        res.json(err)
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
export default calificacionRoutes;

