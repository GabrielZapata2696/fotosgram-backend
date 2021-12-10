"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = express_1.Router();
//login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userBD) => {
        if (err)
            throw err;
        if (!userBD) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }
        if (userBD.compararPassword(body.password)) {
            const tokenUser = token_1.default.obtenerJwtToken({
                _id: userBD._id,
                nombre: userBD.nombre,
                email: userBD.email,
                avatar: userBD.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario//contraseña no son correctos'
            });
        }
    });
});
//crear un usuario
userRoutes.post('/crear', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(userBD => {
        const tokenUser = token_1.default.obtenerJwtToken({
            _id: userBD._id,
            nombre: userBD.nombre,
            email: userBD.email,
            avatar: userBD.avatar
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        });
    });
});
//Actualizar usuario 
userRoutes.put('/actualizar', autenticacion_1.validaToken, (req, res) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    usuario_model_1.Usuario.findOne({ email: req.usuario.email }, (err, userEmailDB) => {
        if (err) {
            return res.json({
                ok: false,
                mensaje: `Error: ${err.codeName}`
            });
        }
        if (userEmailDB) {
            if (userEmailDB._id.toString() !== req.body._id.toString()) {
                return res.json({
                    ok: false,
                    mensaje: `Ya se encuentra registrado el email: ${req.usuario.email}`
                });
            }
        }
        usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userBD) => {
            if (err) {
                return res.json({
                    ok: false,
                    mensaje: `Error al actualizar: ${err.codeName}`
                });
            }
            if (!userBD) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe un usuario con el ID especificado'
                });
            }
            const tokenUser = token_1.default.obtenerJwtToken({
                _id: userBD._id,
                nombre: userBD.nombre,
                email: userBD.email,
                avatar: userBD.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        });
    });
});
userRoutes.get('/informacion', autenticacion_1.validaToken, (req, res) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
});
exports.default = userRoutes;
