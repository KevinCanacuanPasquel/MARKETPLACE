import { Schema, Document, model } from 'mongoose';

//Modelo BDD
const agrupacionSchema = new Schema({

    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    numintegrantes: { 
        type: Number
    },
    tiempoexistente: {
        type: String
    },
    estasuscrito: { 
        type: Number
    },
    fotos: [{
        type: String
    }],

    //Relacion con Usuario
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe existir una relacion a un Usuario' ]
    }

});


// Tipado de datos
interface Iagrupacion extends Document {
    nombre: string;
    descripcion: string;
    numintegrantes: number;
    tiempoexistente: string;
    estasuscrito: number;
    fotos: string[];
    usuario:string;
}

// model -> Ayuda con la interaccion con la Base de Datos
export const Agrupacion = model<Iagrupacion>('Agrupacion', agrupacionSchema);
