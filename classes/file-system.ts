import { FIleUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {
    constructor() { };

    guardarImagenTemporal(file: FIleUpload, userID: string) {
        return new Promise((resolve: any, reject: any) => {
            //crear carpetas
            const path = this.crearCarpetaUsuario(userID);

            //crear nombre unico para archivo
            const nombre = this.generarNombreUnico(file.name.toString());

            //mover el archivo Temp a la carpeta del usuario
            file.mv(`${path}/${nombre}`, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });



    }

    private generarNombreUnico(nombreOriginal: string) {

        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];

        const idUnico = uniqid();
        return `${idUnico}.${extension}`;

    }

    private crearCarpetaUsuario(userID: string) {
        const pathUser = path.resolve(__dirname, '../uploads/', userID);
        const pathUserTmp = pathUser + '/temp';

        const existe = fs.existsSync(pathUser);

        if (!existe) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTmp);
        }




        return pathUserTmp;

    }

    imagenesTempAPost(userID: string) {

        const pathUserTemp = path.resolve(__dirname, '../uploads/', userID, 'temp');
        const pathUserPost = path.resolve(__dirname, '../uploads/', userID, 'posts');

        //const pathUserTemp = path.resolve(__dirname, '../uploads/', `${userID}/temp`);
        //const pathUserPost = path.resolve(__dirname, '../uploads/', `${userID}/posts`);

        if (!fs.existsSync(pathUserTemp)) {
            return [];
        }



        if (!fs.existsSync(pathUserPost)) {
            fs.mkdirSync(pathUserPost);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp(userID);

        imagenesTemp.forEach(imagen => {
            fs.renameSync(`${pathUserTemp}/${imagen}`, `${pathUserPost}/${imagen}`)
        });

        return imagenesTemp;


    }

    private obtenerImagenesEnTemp(userID: string) {
        const pathUser = path.resolve(__dirname, '../uploads/', userID, 'temp');
        return fs.readdirSync(pathUser) || [];
    }


    getFotoUrl(userId: string, img: string) {
        const pathFoto = path.resolve(__dirname, '../uploads/', userId, 'posts', img);

        if (!fs.existsSync(pathFoto)) { //no Existe
            return path.resolve(__dirname, '../assets/400x250.jpg');
        } else {
            return pathFoto;
        }

    }
}
