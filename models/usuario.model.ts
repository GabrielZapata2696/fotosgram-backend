import { Schema, model, Document } from 'mongoose'



const usuarioShema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es requerido']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El campo correo es requerido']
    },
    password: {
        type: String,
        require: [true, 'El campo contraseña es requerido']
    }
});

interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;
}

export const Usuario = model<IUsuario>('Usuario', usuarioShema);