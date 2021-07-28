import express from 'express';

export class Server {

    public app : express.Application;
    public port : number = 3000;

    constructor () {

        // Iniciar al APP
        this.app = express();
    }

    start ( callback: VoidFunction ) {
        
        this.app.listen( this.port, callback );
    }  


}