"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const server = new server_1.default;
//middleware Body parser
server.app.use(express_1.default.urlencoded({ extended: true }));
server.app.use(express_1.default.json());
//File Upload
server.app.use(express_fileupload_1.default({ useTempFiles: true }));
//configurar CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
//rutas de la aplicación
server.app.use('/user', usuarioRoutes_1.default);
server.app.use('/post', postRoutes_1.default);
//conexion a la base de datos mongodb
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', (err) => {
    if (err)
        throw err;
    console.log('BD online');
});
//levantar servidor express
server.start(() => {
    console.log(`Servidor levantado en puerto: ${server.port}`);
});
