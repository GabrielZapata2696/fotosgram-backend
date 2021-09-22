import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt';



const usuarioShema: Schema<IUsuario> = new Schema({
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


usuarioShema.method('compararPassword', function (password: string = ''): boolean {
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }
});



export interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;

    compararPassword(password: string): boolean;
}

export const Usuario = model<IUsuario>('Usuario', usuarioShema);