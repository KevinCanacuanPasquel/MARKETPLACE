"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./classes/server");
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const agrupacion_1 = __importDefault(require("./routes/agrupacion"));
const server = new server_1.Server();
//Middleware para utilizar JS - bodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//File Upload - Toma los archivos que se sube
server.app.use((0, express_fileupload_1.default)());
// Configuracion CORS - front
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
// routes/usuario.ts - Definir una ruta en particula "middleware"
// Rutas de las APP
server.app.use('/user', usuario_1.default);
server.app.use('/agrupacion', agrupacion_1.default);
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
