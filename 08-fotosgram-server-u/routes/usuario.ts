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


//USUARIO - Actualizar
userRotes.post('/actualizarUsuario', [verificaToken],  (req: any, res: Response) => {

    const user = {
        nombres: req.body.nombres || req.usuario.nombres,
        apellidos: req.body.apellidos || req.usuario.apellidos,
        correo: req.body.correo || req.usuario.correo,
        fecha_nacimiento: req.body.fecha_nacimiento || req.usuario.fecha_nacimiento,
        contrasena: bcrypt.hashSync(req.body.contrasena, 10) || req.usuario.contrasena, 
        estado: req.body.estado || req.usuario.estado
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
    
    
   

});


//Mostrar Token Usuario
userRotes.get('/', verificaToken, (req: any, res: Response) => {

    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });

});

export default userRotes;


