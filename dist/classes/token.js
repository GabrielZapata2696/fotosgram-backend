"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() { }
    static obtenerJwtToken(payload) {
        return jsonwebtoken_1.default.sign({
            usuario: payload
        }, this.seed, {
            expiresIn: this.caducidad
        });
    }
    static validarToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.seed, (err, decodedToken) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(decodedToken);
                }
            });
        });
    }
}
exports.default = Token;
Token.seed = 'pg&B0GT8V9$#k#KjgXSnR';
Token.caducidad = '30d';
