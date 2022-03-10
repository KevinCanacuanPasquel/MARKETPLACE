
import { Schema, model, Document } from 'mongoose';


//Modelo de la BDD
const calificacionSchema = new Schema({

    numEstrellas: {
        type: Number,
        required: [ true, 'la calificacion es necesaria']
    },
    comentario: {
        type: String
        
    },

    servicio: {
        type: Schema.Types.ObjectId,
        ref: 'Servicio',
        required: [ true, 'Debe existir una relacion a un Agrupacion' ]
    },
    usuario: {
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

});


//Metodo para contrasena



// Tipado de datos
interface ICalificacion extends Document {
    numEstrellas: Number;
    comentario: string;
    servicio: string;
    usuario: string;
    estado: string; 
    fechaCreacion: string; 


}


// model -> Ayuda con la interaccion con la Base de Datos
export const Calificacion = model<ICalificacion>('Calificacion', calificacionSchema);