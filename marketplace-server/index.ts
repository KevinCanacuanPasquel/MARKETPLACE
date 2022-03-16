import { Server } from './classes/server';
import * as multer from 'multer'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import express from 'express';
import userRotes from './routes/usuario';
import agrupacionRoutes from './routes/agrupacion';
import actividadRoutes from './routes/actividad';
import cuentaBancariaRoutes from './routes/cuenta_bancaria';
import servicioRoutes from './routes/servicio';
import parametroRoutes from './routes/parametro';
import suscripcionRoutes from './routes/suscripcion';
import agendaRoutes from './routes/agenda';
import calificacionRoutes from './routes/calificacion';
import promedioRoutes from './routes/promedio';

const server = new Server();
export let UPLOAD_PATH = 'uploads'

//Middleware para utilizar JS - bodyParser


server.app.use(express.json({limit: '50mb'}));
server.app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
//File Upload - Toma los archivos que se sube
server.app.use( fileUpload() ) ;



// Configuracion CORS - front
server.app.use( cors({ origin: true, credentials: true }) );


// routes/usuario.ts - Definir una ruta en particula "middleware"
// Rutas de las APP
server.app.use('/user', userRotes);
server.app.use('/agrupacion', agrupacionRoutes);
server.app.use('/actividad', actividadRoutes);
server.app.use('/cuenta_bancaria', cuentaBancariaRoutes);
server.app.use('/servicio', servicioRoutes);
server.app.use('/parametro', parametroRoutes);
server.app.use('/suscripcion', suscripcionRoutes);
server.app.use('/agenda', agendaRoutes);
server.app.use('/calificacion', calificacionRoutes);
server.app.use('/promedio', promedioRoutes);
//Conectar BD
mongoose.connect('mongodb://localhost:27017/marketplace',
                 { useNewUrlParser: true, useCreateIndex: true}, (error => {    //Poder trabajar con los indices
                     
                    if( error ) throw error;
                    console.log('Base de datos online !!')
                 }));  



//Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});




