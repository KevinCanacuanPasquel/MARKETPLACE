import { Server } from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import userRotes from './routes/usuario';
import agrupacionRoutes from './routes/agrupacion';

const server = new Server();

//Middleware para utilizar JS - bodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

//File Upload - Toma los archivos que se sube
server.app.use( fileUpload() ) ;


// Configuracion CORS - front
server.app.use( cors({ origin: true, credentials: true }) );


// routes/usuario.ts - Definir una ruta en particula "middleware"
// Rutas de las APP
server.app.use('/user', userRotes);
server.app.use('/agrupacion', agrupacionRoutes);

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




