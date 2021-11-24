import { Schema, Document, model } from 'mongoose';


//Modelo BDD
const cuentaBancariaSchema = new Schema({

    banco: {
        type: String
    },
    tipoCuenta: {
        type: String
    },
    cuentaBancaria: { 
        type: String
    },
    CIBancaria: {
        type: String
    },
    //Relacion con Usuario
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe existir una relacion a un Usuario' ]
    },
    estado:{
        type: String 
    }

});


// Tipado de datos
interface IcuentaBancaria extends Document {
    banco: string;
    tipoCuenta: string;
    cuentaBancaria: string;
    CIBancaria: String;
    usuario:string;

}

// model -> Ayuda con la interaccion con la Base de Datos
export const CuentaBancaria = model<IcuentaBancaria>('CuentaBancaria', cuentaBancariaSchema);
