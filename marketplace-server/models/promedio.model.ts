
import { Schema, model, Document } from 'mongoose';


//Modelo de la BDD
const promedioSchema = new Schema({

    numEstrellas: {
        type: Number,
        required: [ true, 'la calificacion es necesaria']
    },
    servicio: {
        type: Schema.Types.ObjectId,
        ref: 'Servicio',
        required: [ true, 'Debe existir una relacion a un Agrupacion' ]
    },
   
    estado:{
        type: String
    },
    fechaCreacion: {
        type: Date
    },

});


//Metodo para contrasena



// Tipado de datos
interface IPromedio extends Document {
    numEstrellas: Number;
    servicio: string;
    estado: string; 
    fechaCreacion: string; 


}


// model -> Ayuda con la interaccion con la Base de Datos
export const Promedio = model<IPromedio>('Promedio', promedioSchema);