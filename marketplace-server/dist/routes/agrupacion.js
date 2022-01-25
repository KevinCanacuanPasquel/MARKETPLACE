"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const agrupacion_model_1 = require("../models/agrupacion.model");
const file_system_1 = __importDefault(require("../classes/file-system"));
const agrupacionRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
//AGRUPACION - Obtener agrupaciones paginadas
agrupacionRoutes.get('/agrupaciones', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const agrupaciones = yield agrupacion_model_1.Agrupacion.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-contrasena')
        .exec();
    res.json({
        ok: true,
        pagina,
        agrupaciones
    });
}));
//AGRUPACIONES - Obtener agrupaciones por usuario
///
agrupacionRoutes.get('/agrupacionesByUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    console.log(req.query.userId);
    var query = { usuario: userId };
    const agrupaciones = yield agrupacion_model_1.Agrupacion.find(query)
        .exec();
    res.json({
        ok: true,
        agrupaciones
    });
}));
//AGRUPACION - Crear
agrupacionRoutes.post('/crearAgrupacion', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;
    agrupacion_model_1.Agrupacion.create(body).then((agrupacionDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield agrupacionDB.populate('usuario', '-contrasena').execPopulate();
        res.json({
            ok: true,
            agrupacion: agrupacionDB
        });
    })).catch(err => {
        res.json(err);
    });
});
///ACTUALIZAR
//USUARIO - Actualizar
agrupacionRoutes.put('/actualizarAgrupacion', [autenticacion_1.verificaToken], (req, res) => {
    const agrup = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        numintegrantes: req.body.numintegrantes,
        tiempoexistente: req.body.tiempoexistente,
        estasuscrito: req.body.estasuscrito,
        _id: req.body.id
        //   estado: req.body.estado || req.usuario.estado
    };
    console.log(agrup);
    agrupacion_model_1.Agrupacion.findByIdAndUpdate(agrup._id, agrup, { new: true }, (err, agrupacionDB) => {
        if (err)
            throw err;
        if (!agrupacionDB) {
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
exports.default = agrupacionRoutes;
