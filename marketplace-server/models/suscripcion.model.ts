
import { Schema, model, Document } from 'mongoose';


//Modelo de la BDD
const suscripcionSchema = new Schema({



    fechaInicio: {
        type: Date,
        required: [ true, 'La fecha de nacimiento es necesaria']
    },
    fechaFin: {
        type: Date,
        required: [ true, 'La fecha de nacimiento es necesaria']
    },
    estado:{
        type: String,
        required: [ true]
    },
    valor: {
        type: Number,
        required: [true]
    },
    agrupacion: {
        type: Schema.Types.ObjectId,
        ref: 'Agrupacion',
        required: [ true, 'Debe existir una relacion a un Agrupacion' ]
    },
    documento:{
        name: {
            type: String
        },
        ext: {
            type: String
        },
        fecha: { 
            type: Date 
        },
        fileBase64:{
            type: String
        }    
      }

});


//Metodo para contrasena



// Tipado de datos
interface Isuscripcion extends Document {
   
    fechaInicio: string;
    fechaFin: string;
    valor: number;
    estado: string;
    agrupacion: string;
    documento: string[];

}


// model -> Ayuda con la interaccion con la Base de Datos
export const Suscripcion = model<Isuscripcion>('Actividad', suscripcionSchema);