import { Schema, Document, model } from 'mongoose';


//Modelo BDD
const servicioSchema = new Schema({

    horaInicio: {
        type: String
    },
    horaFin:{
        type: String
    },
    fechaAgenda: {
        type: String
    },
    location: {
        type : String,
        coordinates : [
        ]
        },
   

    //Relacion con Usuario
    servicio: {
        type: Schema.Types.ObjectId,
        ref: 'Servicio',
        required: [ true, 'Debe existir una relacion a un Agrupacion' ]
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe existir una relacion a un Usuario' ]
    },
    estado:{
        type: String
    },
    fechaCreacion: {
        type: Date
    },
    descripcion: {
        type : String
    }

});


// Tipado de datos
interface IAgenda extends Document {
    horaInicio: string;
    horaFin: string;
    fechaAgenda: string;
    location: any;
    servicio: string;
    cliente:string;
    estado: string;
    fechaCreacion: string; 
    descripcion: string; 


}

// model -> Ayuda con la interaccion con la Base de Datos
export const Agenda = model<IAgenda>('Agenda', servicioSchema);
