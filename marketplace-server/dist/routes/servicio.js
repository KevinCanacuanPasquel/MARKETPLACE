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
const servicio_model_1 = require("../models/servicio.model");
const servicioRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//AGRUPACION - Obtener agrupaciones paginadas
servicioRoutes.get('/servicios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const servicios = yield agrupacion_model_1.Agrupacion.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .exec();
    res.json({
        ok: true,
        pagina,
        servicios
    });
}));
//AGRUPACIONES - Obtener servicio by id
///
servicioRoutes.get('/servicioById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    console.log(req.query.agrupId);
    const servicios = yield servicio_model_1.Servicio.findById(id).populate('actividad').populate('agrupacion')
        .exec();
    res.json({
        ok: true,
        servicios
    });
}));
//AGRUPACIONES - Obtener agrupaciones por usuario
///
servicioRoutes.get('/serviciosByAgupacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agrupId = req.query.agrupId;
    console.log(req.query.agrupId);
    var query = { agrupacion: agrupId };
    const servicios = yield servicio_model_1.Servicio.find(query).populate('actividad').populate('servicio')
        .exec();
    res.json({
        ok: true,
        servicios
    });
}));
//AGRUPACION - Crear
servicioRoutes.post('/crearServicio', [autenticacion_1.verificaToken], (req, res) => {
    let body = req.body;
    body.agrupacion = req.body.agrupacion;
    body.actividad = req.body.actividad;
    console.log("el body", body);
    // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;
    servicio_model_1.Servicio.create(body).then((servicioDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield servicioDB.populate('agrupacion').populate('actividad').execPopulate();
        res.json({
            ok: true,
            servicio: servicioDB
        });
    })).catch(err => {
        res.json(err);
    });
});
///ACTUALIZAR
//USUARIO - Actualizar
servicioRoutes.put('/actualizarServicio', [autenticacion_1.verificaToken], (req, res) => {
    const servicio = req.body;
    console.log(servicio);
    agrupacion_model_1.Agrupacion.findByIdAndUpdate(servicio._id, servicio, { new: true }, (err, agrupacionDB) => {
        if (err)
            throw err;
        if (!agrupacionDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un servicio con ese ID'
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
exports.default = servicioRoutes;
