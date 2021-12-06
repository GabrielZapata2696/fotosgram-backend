"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    ;
    guardarImagenTemporal(file, userID) {
        return new Promise((resolve, reject) => {
            //crear carpetas
            const path = this.crearCarpetaUsuario(userID);
            //crear nombre unico para archivo
            const nombre = this.generarNombreUnico(file.name.toString());
            //mover el archivo Temp a la carpeta del usuario
            file.mv(`${path}/${nombre}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    generarNombreUnico(nombreOriginal) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaUsuario(userID) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userID);
        const pathUserTmp = pathUser + '/temp';
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTmp);
        }
        return pathUserTmp;
    }
    imagenesTempAPost(userID) {
        const pathUserTemp = path_1.default.resolve(__dirname, '../uploads/', userID, 'temp');
        const pathUserPost = path_1.default.resolve(__dirname, '../uploads/', userID, 'posts');
        //const pathUserTemp = path.resolve(__dirname, '../uploads/', `${userID}/temp`);
        //const pathUserPost = path.resolve(__dirname, '../uploads/', `${userID}/posts`);
        if (!fs_1.default.existsSync(pathUserTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathUserPost)) {
            fs_1.default.mkdirSync(pathUserPost);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp(userID);
        imagenesTemp.forEach(imagen => {
            fs_1.default.renameSync(`${pathUserTemp}/${imagen}`, `${pathUserPost}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTemp(userID) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userID, 'temp');
        return fs_1.default.readdirSync(pathUser) || [];
    }
    getFotoUrl(userId, img) {
        const pathFoto = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts', img);
        if (!fs_1.default.existsSync(pathFoto)) { //no Existe
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg');
        }
        else {
            return pathFoto;
        }
    }
}
exports.default = FileSystem;
