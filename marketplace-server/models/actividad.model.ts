
import { Schema, model, Document } from 'mongoose';


//Modelo de la BDD
const actividadSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'Los nombres son necesarios']
    },
    arte:{
        type: String,
        required: [ true]
    }
   

});


//Metodo para contrasena



// Tipado de datos
interface Iactividad extends Document {
    nombre: string;
    arte: string;
}


// model -> Ayuda con la interaccion con la Base de Datos
export const Actividad = model<Iactividad>('Actividad', actividadSchema);