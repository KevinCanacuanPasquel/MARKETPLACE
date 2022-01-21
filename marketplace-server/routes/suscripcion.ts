import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';
import FileSystem from "../classes/file-system";
import { Suscripcion } from "../models/suscripcion.model";


const suscripcionRoutes = Router();
const fileSystem = new FileSystem();


//AGRUPACION - Obtener agrupaciones paginadas
suscripcionRoutes.get('/suscripcion',  async (req:any, res:Response) => {

    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const suscripcion = await Suscripcion.find()
                                        .sort({ _id: -1 })
                                        .skip( skip )
                                        .limit(10)
                                        .exec();

    res.json({
        ok: true,
        pagina,
        suscripcion
    });
});



//AGRUPACIONES - Obtener servicio by id
///
suscripcionRoutes.get('/suscripcionById',  async (req:any, res:Response) => {
    const id = req.query.id;
    console.log(req.query.suscripcionId)
 
    const suscripcion = await Suscripcion.findById(id)                    
                                        .exec();

    res.json({
        ok: true,
        suscripcion
    });
});

//AGRUPACIONES - Obtener agrupaciones por usuario
///
suscripcionRoutes.get('/validarSuscripcion',  async (req:any, res:Response) => {
    //const agrupId = req.query.agrupId;
    console.log(req.query.agrupId)
    let fechaActual = new Date().toISOString();
    console.log(fechaActual)
  
   let query =  { $and: [ { fechaFin: {$gte: fechaActual} }, {fechaInicio :{$lt: fechaActual } }]}
   // let query = {agrupacion: agrupId}
  //  let query = {fechaInicio :{$lte: fechaActual}}
    const agrupaciones = await Suscripcion.find(query).select('agrupacion._id')         
                                        .exec();

    res.json({
        ok: true,
        agrupaciones
    });
});




//AGRUPACION - Crear
suscripcionRoutes.post('/crearSuscripcion',  (req:any, res:Response) => {

    let body = req.body;
    body.agrupacion = req.body.agrupacion;
   
    console.log("el body", body)
   // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;

    Suscripcion.create(body).then ( async suscripcionDB => {

        await suscripcionDB.populate('agrupacion').execPopulate();

        res.json({
            ok: true,
            sucripcion: suscripcionDB
        });

    }).catch( err => {
        res.json(err)
    });


});

///ACTUALIZAR
//USUARIO - Actualizar
suscripcionRoutes.put('/actualizarSusripcion',   (req: any, res: Response) => {
    console.log("llega el servicio desde arriba" ,  req.body)
    const suscripcion =  req.body
    suscripcion._id = req.body.id
    console.log("llega el servicio" , suscripcion)
    Suscripcion.findByIdAndUpdate( suscripcion._id, suscripcion, { new: true }, ( err, servicioDB ) => {

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
/*
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
*/
//Servicio para subir archivos
/*
agrupacionRoutes.post('/cargarImagenesAgrupacion', [verificaToken],  async (req: Request, res: Response) => {

    if ( !req.files ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }

    const file: FileUpload = req.files.imagen;

    if ( !file ){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo - imagen'
        });
    }

    if ( !file.mimetype.includes('image') ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que cargo no es una imagen'
        });
    }

    await fileSystem.guardarImagenTemporal( file, req.usuario._id );
    

    res.json({
        ok: true,
        file: file.mimetype
    });

})


//Mostrar Imagenes
agrupacionRoutes.get('/imagen/:userid/:img', ( req: any, res: Response) => {

    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFotoUrl( userId, img);

    res.sendFile(pathFoto);
});
*/


export default suscripcionRoutes;