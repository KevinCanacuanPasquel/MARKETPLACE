import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';
import { Agrupacion } from '../models/agrupacion.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from "../classes/file-system";


const servicioRoutes = Router();
const fileSystem = new FileSystem();


//AGRUPACION - Obtener agrupaciones paginadas
servicioRoutes.get('/servicios',  async (req:any, res:Response) => {

    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const servicios = await Agrupacion.find()
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

//AGRUPACIONES - Obtener agrupaciones por usuario
///
servicioRoutes.get('/agrupacionesByUsuario',  async (req:any, res:Response) => {
    const userId = req.query.userId;
    console.log(req.query.userId)
    var query = {usuario : userId};
    
    const servicios = await Agrupacion.find(query)                      
                                        .exec();

    res.json({
        ok: true,
        servicios
    });
});




//AGRUPACION - Crear
servicioRoutes.post('/crearServicio', [verificaToken],  (req:any, res:Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

   // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;

    Servicio.create(body).then ( async agrupacionDB => {

        await agrupacionDB.populate('usuario').execPopulate();

        res.json({
            ok: true,
            agrupacion: agrupacionDB
        });

    }).catch( err => {
        res.json(err)
    });


});
/*
///ACTUALIZAR
//USUARIO - Actualizar
agrupacionRoutes.put('/actualizarAgrupacion', [verificaToken],  (req: any, res: Response) => {

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


export default servicioRoutes;