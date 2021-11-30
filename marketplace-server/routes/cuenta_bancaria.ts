import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';

import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';
import { CuentaBancaria } from '../models/cuenta_bancaria';



const cuentaBancariaRoutes = Router();


//AGRUPACION - Obtener agrupaciones paginadas
cuentaBancariaRoutes.get('/getCuentaBancaria',  async (req:any, res:Response) => {

    const actividades = await CuentaBancaria.find()                                        
                                        .exec();

    res.json({
        ok: true,
        actividades
    });
});






//AGRUPACION - Crear
//CUENTA BANCARIA - Crear
cuentaBancariaRoutes.post('/crearCuentaBancaria', [verificaToken],  (req:any, res:Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;
    body.estado ="ACTIVO"; 
   // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;

    CuentaBancaria.create(body).then ( async cuentaBancariaDB => {

        await cuentaBancariaDB.populate('usuario').execPopulate();

        res.json({
            ok: true,
            cuentaBancaria: cuentaBancariaDB
        });

    }).catch( err => {
        res.json(err)
    });


});

//CUENTA BANCARIA - Obtener cuenta_bancaria por usuario
///
cuentaBancariaRoutes.get('/cuentaBancariaByUsuario',  async (req:any, res:Response) => {
    const userId = req.query.userId;
    console.log(req.query.userId)
    var query = {usuario : userId};
    
    const cuentaBancaria = await CuentaBancaria.find(query).sort({estado: 1})                     
                                        .exec();

    res.json({
        ok: true,
        cuentaBancaria
    });
});





///ACTUALIZAR
//Actividad - Actualizar
cuentaBancariaRoutes.put('/actualizarCuentaBancaria',   (req: any, res: Response) => {

    const cuentaBancaria = req.body
    
    CuentaBancaria.findByIdAndUpdate( cuentaBancaria._id, cuentaBancaria, { new: true }, ( err, cuentaBancariaDB ) => {

        if ( err ) throw err;

        if ( !cuentaBancariaDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un cuenta bancaria con ese ID'
            });
        }

        //Token
     
            
            res.json({
                ok: true,
                actividad: cuentaBancariaDB
            });

    });

});



export default cuentaBancariaRoutes;