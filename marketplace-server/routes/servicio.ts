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
import { Promedio } from "../models/promedio.model";


const servicioRoutes = Router();
const fileSystem = new FileSystem();


//AGRUPACION - Obtener agrupaciones paginadas
servicioRoutes.get('/servicios',  async (req:any, res:Response) => {

    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const servicios = await Servicio.find()
                                        
                                        .exec();

    res.json({
        ok: true,
        pagina,
        servicios
    });
});



//AGRUPACIONES - Obtener servicio by id
///
servicioRoutes.get('/servicioById',  async (req:any, res:Response) => {
    const id = req.query.id;
    console.log(req.query.id)
    
    const servicio = await Servicio.findById(id).populate('actividad').populate('agrupacion')                    
                                        .exec();

    res.json({
        ok: true,
        servicio
    });
});

//AGRUPACIONES - Obtener agrupaciones por usuario
///
servicioRoutes.get('/serviciosByAgupacion',  async (req:any, res:Response) => {
    const agrupId = req.query.agrupId;
    console.log(req.query.agrupId)
    var query = {agrupacion : agrupId};
    
    const servicios = await Servicio.find(query).populate('actividad').populate('servicio')                      
                                        .exec();

    res.json({
        ok: true,
        servicios
    });
});




//AGRUPACION - Crear
servicioRoutes.post('/crearServicio', [verificaToken],  (req:any, res:Response) => {

    let body = req.body;
    body.agrupacion = req.body.agrupacion;
    body.actividad =req.body.actividad;
    console.log("el body", body)
   // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;

    Servicio.create(body).then ( async servicioDB => {

        await servicioDB.populate('agrupacion').populate('actividad').execPopulate();

        res.json({
            ok: true,
            servicio: servicioDB
        });

    }).catch( err => {
        res.json(err)
    });


});

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
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    console.log(arte, nombre)
    let wrapperEnvio = {
        servicio: Servicio,
        promedio: 0

        
    }
    let actividades
    let listIdActividad
    let listIdServicios
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
            const servicios =  await Servicio.find({$and:[{actividad: {$in: listIdActividad}},  {agrupacion: {$in: listIdAgrupaciones}}]}).populate("agrupacion").sort({ _id: -1 })
            .skip( skip )
            .limit(10)
            listIdServicios = servicios.map(x=>  { return x._id} )
            const promedios = await Promedio.find({servicio: {$in:listIdServicios}})
            servicios.map(x=> {
                console.log(promedios.filter(prom=> prom.servicio === x._id))
             //   if( )
            })
        res.json({
            ok: true,
            servicios
        });
    }else if(nombre){
        actividades = await Actividad.find( 
            {nombre: { $regex: nombre },  estado:estado}).select('_id').exec();
            listIdActividad =  actividades.map(x=>  { return x._id} )
            const servicios =  await Servicio.find({$and:[{actividad: {$in: listIdActividad}},  {agrupacion: {$in: listIdAgrupaciones}}]}).populate("agrupacion").sort({ _id: -1 })
            .skip( skip )
            .limit(10)
        res.json({
            ok: true,
            servicios
        });
    }else if(arte) {
        actividades = await Actividad.find( 
            {arte:  { $regex: arte } ,  estado:estado}).select('_id').exec();
            listIdActividad =  actividades.map(x=>  { return x._id} )
            const servicios =  await Servicio.find({$and:[{actividad: {$in: listIdActividad}},  {agrupacion: {$in: listIdAgrupaciones}}]}).populate("agrupacion").sort({ _id: -1 })
            .skip( skip )
            .limit(10)
    
        res.json({
            ok: true,
            servicios
        });
    } else {
        actividades = await Actividad.find( 
            { estado:estado }).select('_id').exec();
            listIdActividad =  actividades.map(x=>  { return x._id} )
           
            var servicios  =  await Servicio.find({$and:[{actividad: {$in: listIdActividad}},  {agrupacion: {$in: listIdAgrupaciones}}]}).populate("agrupacion").sort({ _id: -1 })
            .skip( skip )
            .limit(10)
            
        res.json({
            ok: true,
            servicios
        });
    }
    
    


})



export default servicioRoutes;

