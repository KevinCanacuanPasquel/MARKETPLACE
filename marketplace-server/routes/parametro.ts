import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';
import { Parametro } from '../models/parametro.model';



const parametroRoutes = Router();


//AGRUPACION - Obtener agrupaciones paginadas
parametroRoutes.get('/getparametro',  async (req:any, res:Response) => {

    const actividades = await Parametro.find()                                        
                                        .exec();

    res.json({
        ok: true,
        actividades
    });
});

//AGRUPACIONES - Obtener agrupaciones por usuario
///
parametroRoutes.get('/getParametroByNombre',  async (req:any, res:Response) => {
    console.log(req.query.arte)
    var query = {nombre : req.query.nombre, estado:"ACTIVO"};
    
    const actividades = await Parametro.find(query)                      
                                        .exec();

    res.json({
        ok: true,
        actividades
    });
});




//AGRUPACION - Crear
parametroRoutes.post('/crearParametro',  (req:any, res:Response) => {

    const parametro = req.body

   // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;

    Parametro.create(parametro).then(result => {
        res.json(parametro);
    })
    .catch(error => console.error(error))
})
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

export default parametroRoutes;