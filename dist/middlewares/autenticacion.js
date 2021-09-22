"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaToken = void 0;
const token_1 = __importDefault(require("../classes/token"));
const validaToken = (req, res, next) => {
    const userToken = req.get('z-token') || '';
    token_1.default.validarToken(userToken)
        .then((decoded) => {
        req.usuario = decoded.usuario;
        next();
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token invalido!'
        });
    });
};
exports.validaToken = validaToken;
