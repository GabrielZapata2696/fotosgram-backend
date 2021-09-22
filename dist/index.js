"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const server = new server_1.default;
//rutas de la aplicación
server.app.use('/user', usuarioRoutes_1.default);
//levantar servidor express
server.start(() => {
    console.log(`Servidor levantado en puerto: ${server.port}`);
});
