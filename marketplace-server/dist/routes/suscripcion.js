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
const file_system_1 = __importDefault(require("../classes/file-system"));
const suscripcion_model_1 = require("../models/suscripcion.model");
const suscripcionRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
//AGRUPACION - Obtener agrupaciones paginadas
suscripcionRoutes.get('/suscripcion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscar por paginas
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const suscripcion = yield suscripcion_model_1.Suscripcion.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .exec();
    res.json({
        ok: true,
        pagina,
        suscripcion
    });
}));
//AGRUPACIONES - Obtener servicio by id
///
suscripcionRoutes.get('/suscripcionById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    console.log(req.query.suscripcionId);
    const suscripcion = yield suscripcion_model_1.Suscripcion.findById(id)
        .exec();
    res.json({
        ok: true,
        suscripcion
    });
}));
//AGRUPACIONES - Obtener agrupaciones por usuario
///
suscripcionRoutes.get('/validarSuscripcion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const agrupId = req.query.agrupId;
    console.log(req.query.agrupId);
    let fechaActual = new Date().toISOString();
    console.log(fechaActual);
    let query = { $and: [{ fechaFin: { $gte: fechaActual } }, { fechaInicio: { $lt: fechaActual } }] };
    // let query = {agrupacion: agrupId}
    //  let query = {fechaInicio :{$lte: fechaActual}}
    const agrupaciones = yield suscripcion_model_1.Suscripcion.find(query).select('agrupacion._id')
        .exec();
    res.json({
        ok: true,
        agrupaciones
    });
}));
//AGRUPACION - Crear
suscripcionRoutes.post('/crearSuscripcion', (req, res) => {
    let body = req.body;
    body.agrupacion = req.body.agrupacion;
    console.log("el body", body);
    // const imagenes = fileSystem.imagenesDeTempHaciaAgrupaciones( req.usuario._id );
    //body.fotos = imagenes;
    suscripcion_model_1.Suscripcion.create(body).then((suscripcionDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield suscripcionDB.populate('agrupacion').execPopulate();
        res.json({
            ok: true,
            sucripcion: suscripcionDB
        });
    })).catch(err => {
        res.json(err);
    });
});
///ACTUALIZAR
//USUARIO - Actualizar
suscripcionRoutes.put('/actualizarSusripcion', (req, res) => {
    console.log("llega el servicio desde arriba", req.body);
    const suscripcion = req.body;
    suscripcion._id = req.body.id;
    console.log("llega el servicio", suscripcion);
    suscripcion_model_1.Suscripcion.findByIdAndUpdate(suscripcion._id, suscripcion, { new: true }, (err, servicioDB) => {
        if (err)
            throw err;
        if (!servicioDB) {
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
exports.default = suscripcionRoutes;
