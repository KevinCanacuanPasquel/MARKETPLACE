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


const servicioRoutes = Router();
const fileSystem = new FileSystem();


//AGRUPACION - Obtener agrupaciones paginadas
servicioRoutes.get('/servicios',  async (req:any, res:Response) => {

    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const servicios = await Servicio.find()
                                        .sort({ _id: -1 })
                                        .skip( skip )
                                        .limit(10)
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
    console.log(req.query.agrupId)
    
    const servicios = await Servicio.findById(id).populate('actividad').populate('agrupacion')                    
                                        .exec();

    res.json({
        ok: true,
        servicios
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
    console.log(arte, nombre)
    let actividades
    let listId
    if(arte && nombre) {
     
        actividades = await Actividad.find( 
            {nombre: { $regex: nombre }, arte: { $regex: arte } , estado:estado}).select('_id').exec();
            listId =  actividades.map(x=>  { return x._id} )
           console.log("lista Id", listId )
            const servicios =  await Servicio.find({actividad: {$in: listId}})
      //      console.log("servicios", servicios)
        res.json({
            ok: true,
            servicios
        });
    }else if(nombre){
        actividades = await Actividad.find( 
            {nombre: { $regex: nombre },  estado:estado}).exec();
    
        res.json({
            ok: true,
            actividades
        });
    }else if(arte) {
        actividades = await Actividad.find( 
            {arte:  { $regex: arte } ,  estado:estado}).exec();
    
        res.json({
            ok: true,
            actividades
        });
    } else {
        actividades = await Actividad.find( 
            { estado:estado }).exec();
    
        res.json({
            ok: true,
            actividades
        });
    }
    
    


})



export default servicioRoutes;

