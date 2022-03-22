import { Schema, Document, model } from 'mongoose';


//Modelo BDD
const servicioSchema = new Schema({

    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    valorEstimado: {
        type: String
    },
  
    fotos: [{
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
        },      
    
        }],

    //Relacion con Usuario
    agrupacion: {
        type: Schema.Types.ObjectId,
        ref: 'Agrupacion',
        required: [ true, 'Debe existir una relacion a un Agrupacion' ]
    },
    actividad: {
        type: Schema.Types.ObjectId,
        ref: 'Actividad',
        required: [ true, 'Debe existir una relacion a un Actividad' ]
    },
    estado:{
        type: String
    }

});


// Tipado de datos
interface Iservicio extends Document {
    promedio: Number ;
    nombre: string;
    descripcion: string;
    valorEstimado: number;
    fotos: string[];
    agrupacion:string;
    actividad: string;
    estado: string;
    

}

// model -> Ayuda con la interaccion con la Base de Datos
export const Servicio = model<Iservicio>('Servicio', servicioSchema);
