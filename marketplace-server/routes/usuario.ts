import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';


// Escribir en el URL ciertas direcciones - tipos de peticiones REST
const userRotes = Router();


//USUARIO - Login
userRotes.post('/login', (req: Request, res: Response) => {

    Usuario.findOne( { correo: req.body.correo }, ( err: any, userDB: any ) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contrasena no son correctos'
            });
        }

        //Token
        if ( userDB.compararContrasena( req.body.contrasena ) ) {
            const tokenUsuario = Token.getJwtToken({
                _id: userDB._id,
                nombres: userDB.nombres,
                apellidos: userDB.apellidos,
                correo: userDB.correo,
                fecha_nacimiento: userDB.fecha_nacimiento,
                contrasena: userDB.contrasena,
                estado: userDB.estado,
           
            });
            res.json({
                ok: true,
                token: tokenUsuario 
            });
        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contrasena no son correctos ***'
            });
        }


    })

});




//USUARIO - Crear
userRotes.post('/crearUsuario', (req: Request, res: Response) => {

    const usuario = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        fecha_nacimiento: req.body.fecha_nacimiento,
        contrasena: bcrypt.hashSync(req.body.contrasena, 10),   //Encriptar la contrasena
        foto: req.body.foto
    };

    
    //Crear usuario en BDD
    Usuario.create( usuario ).then( userDB => {

        //Token
        const tokenUsuario = Token.getJwtToken({
        __id: userDB._id,
        nombres: userDB.nombres,
        apellidos: userDB.apellidos,
        correo: userDB.correo,
        fecha_nacimiento: userDB.fecha_nacimiento,
        contrasena: userDB.contrasena,
        estado: userDB.estado,

        });
        
        res.json({
            ok: true,
            token: tokenUsuario 
        });

       
    }).catch ( err => {
        res.json({
            ok: false,
            err
        });
    });

});

//get image
userRotes.get('/getUsuarioById', async (req:any, res:Response)=>
{
    console.log("el query", req.query.userId)
    console.log("lo que reetorna ", await Usuario.findById(req.query.userId)                      
    .exec())
    const usuario = await Usuario.findById(req.query.userId)                      
    .exec();
    

    res.json({
    ok: true,
    usuario
})
});


    
    
    


//USUARIO - Actualizar
userRotes.post('/actualizarUsuario', [verificaToken],  (req: any, res: Response) => {

    const user = {
        nombres: req.body.nombres || req.usuario.nombres,
        apellidos: req.body.apellidos || req.usuario.apellidos,
        correo: req.body.correo || req.usuario.correo,
        fecha_nacimiento: req.body.fecha_nacimiento || req.usuario.fecha_nacimiento,
        contrasena: bcrypt.hashSync(req.body.contrasena, 10) || req.usuario.contrasena, 
        estado: req.body.estado || req.usuario.estado,
        foto: req.body.foto
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, ( err, userDB ) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        //Token
        const tokenUsuario = Token.getJwtToken({
            _id: userDB._id,
            nombres: userDB.nombres,
            apellidos: userDB.apellidos,
            correo: userDB.correo,
            fecha_nacimiento: userDB.fecha_nacimiento,
            contrasena: userDB.contrasena,
            estado: userDB.estado,
            });
            
            res.json({
                ok: true,
                token: tokenUsuario 
            });

    });

});


//USUARIO - Eliminar
/*
userRotes.delete('/eliminarUsuario', [verificaToken], async (req: any, res: Response) => {

    //console.log(req.usuario._id);
    if (!req.usuario._id) {
        res.json({
            ok: false,
            mensaje: 'No existe el usuario'
        });
    } else {
        await Usuario.findByIdAndRemove({ _id: req.usuario._id });
        res.json({
            ok: true,
            mensaje: 'Usuario eliminado.'
        });
    }
    
    
   

});*/


userRotes.delete('/eliminarUsuario', (req: any, res: Response) => {
    
    Usuario.deleteOne(
      { _id: req.query.id }
      
    ).then(result => {
        if (result.deletedCount === 0) {
          return res.json('No se encontro el usuario')
        }
        res.json( "Se elmino el servicio")
      })
      .catch(error => console.error(error))

  })


//Mostrar Token Usuario
userRotes.get('/', verificaToken, (req: any, res: Response) => {

    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });

});



userRotes.get('/usuarios',  async (req:any, res:Response) => {

    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const usuarios = await Usuario.find({}, {projection: {correos:0, nombres:0, apellidos:0}} ).exec();

    res.json({
        ok: true,
        usuarios
    });
});



export default userRotes;


