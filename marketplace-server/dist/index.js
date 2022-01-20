"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD_PATH = void 0;
const server_1 = require("./classes/server");
const mongoose_1 = __importDefault(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const agrupacion_1 = __importDefault(require("./routes/agrupacion"));
const actividad_1 = __importDefault(require("./routes/actividad"));
const cuenta_bancaria_1 = __importDefault(require("./routes/cuenta_bancaria"));
const servicio_1 = __importDefault(require("./routes/servicio"));
const parametro_1 = __importDefault(require("./routes/parametro"));
const suscripcion_1 = __importDefault(require("./routes/suscripcion"));
const server = new server_1.Server();
exports.UPLOAD_PATH = 'uploads';
//Middleware para utilizar JS - bodyParser
server.app.use(express_1.default.json({ limit: '50mb' }));
server.app.use(express_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
//File Upload - Toma los archivos que se sube
server.app.use(express_fileupload_1.default());
// Configuracion CORS - front
server.app.use(cors_1.default({ origin: true, credentials: true }));
// routes/usuario.ts - Definir una ruta en particula "middleware"
// Rutas de las APP
server.app.use('/user', usuario_1.default);
server.app.use('/agrupacion', agrupacion_1.default);
server.app.use('/actividad', actividad_1.default);
server.app.use('/cuenta_bancaria', cuenta_bancaria_1.default);
server.app.use('/servicio', servicio_1.default);
server.app.use('/parametro', parametro_1.default);
server.app.use('/suscripcion', suscripcion_1.default);
//Conectar BD
mongoose_1.default.connect('mongodb://localhost:27017/marketplace', { useNewUrlParser: true, useCreateIndex: true }, (error => {
    if (error)
        throw error;
    console.log('Base de datos online !!');
}));
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
