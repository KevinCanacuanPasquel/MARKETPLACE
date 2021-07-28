
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

//Modelo de la BDD
const usuarioSchema = new Schema({

    nombres: {
        type: String,
        required: [ true, 'Los nombres son necesarios']
    },
    apellidos: {
        type: String,
        required: [ true, 'Los apellidos son necesarios']
    },
    correo: {
        type: String,
        unique: true,
        required: [ true, 'El correo electronico es necesario']
    },
    fecha_nacimiento: {
        type: String,
        required: [ true, 'La fecha de nacimiento es necesaria']
    },
    contrasena: {
        type: String,
        required: [ true, 'La contrasena es necesaria']
    },
    estado: {
        type: Number,
        default: 1
    }

});


//Metodo para contrasena
usuarioSchema.method('compararContrasena', function( contrasena: string = ''): boolean {
   if(bcrypt.compareSync( contrasena, this.contrasena )) {
       return true;
   } else {
       return false;
   }
});


// Tipado de datos
interface Iusuario extends Document {
    nombres: string;
    apellidos: string;
    correo: string;
    fecha_nacimiento: string;
    contrasena: string;
    estado: number;

    compararContrasena( contrasena: string): boolean;
}


// model -> Ayuda con la interaccion con la Base de Datos
export const Usuario = model<Iusuario>('Usuario', usuarioSchema);