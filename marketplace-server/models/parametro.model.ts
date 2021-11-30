
import { Schema, model, Document } from 'mongoose';


//Modelo de la BDD
const parametroSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'Los nombres son necesarios']
    },
    valor:{
        type: String,
        required: [ true]
    },
    tipo:{
        type: String,
        required: [ true]
    },
    estado:{
        type: String,
        required: [ true]
    }

});


//Metodo para contrasena



// Tipado de datos
interface Iparametro extends Document {
    nombre: string;
    valor: string;
    tipo: string;
    estado: string;
}


// model -> Ayuda con la interaccion con la Base de Datos
export const Parametro = model<Iparametro>('Parametro', parametroSchema);