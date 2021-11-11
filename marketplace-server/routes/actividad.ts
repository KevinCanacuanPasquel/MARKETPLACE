import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';
import { Actividad } from '../models/actividad.model';



const actividadRoutes = Router();


//AGRUPACION - Obtener agrupaciones paginadas
actividadRoutes.get('/getActividad',  async (req:any, res:Response) => {

    const actividades = await Actividad.find()                                        
                                        .exec();

    res.json({
        ok: true,
        actividades
    });
});

//AGRUPACIONES - Obtener agrupaciones por usuario
///
actividadRoutes.get('/actividadPorPadre',  async (req:any, res:Response) => {
    console.log(req.query.arte)
    var query = {arte : req.query.arte};
    
    const actividades = await Actividad.find(query)                      
                                        .exec();

    res.json({
        ok: true,
        actividades
    });
});




//AGRUPACION - Crear
actividadRoutes.post('/crearActividad',  (req:any, res:Response) => {

    const actividad = {
        nombre: req.body.nombre,
        arte: req.body.arte
    }

   // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;

    Actividad.create(actividad).then(result => {
        res.json(actividad);
    })
    .catch(error => console.error(error))
})

//   BUSQUEDA -por parameetros
actividadRoutes.get('/actividadPorParametros', async (req:any, res:Response)=>{
    console.log("pruebas")
    const nombre = req.query.nombre;
    const arte = req.query.arte;
    
    console.log(arte)
    if(arte && nombre) {
        const actividades = await Actividad.find( 
            {nombre: nombre, arte: arte }).exec();
            
        res.json({
            ok: true,
            actividades
        });
    }else if(nombre){
        const actividades = await Actividad.find( 
            {nombre: nombre}).exec();
    
        res.json({
            ok: true,
            actividades
        });
    }else if(arte) {
        const actividades = await Actividad.find( 
            {arte: arte }).exec();
    
        res.json({
            ok: true,
            actividades
        });
    } else {
        const actividades = await Actividad.find( 
            { }).exec();
    
        res.json({
            ok: true,
            actividades
        });
    }
    


})



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


export default actividadRoutes;