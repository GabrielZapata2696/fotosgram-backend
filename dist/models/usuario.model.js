"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const usuarioShema = new mongoose_1.Schema({
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
exports.Usuario = mongoose_1.model('Usuario', usuarioShema);
