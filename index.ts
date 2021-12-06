import Server from './classes/server';
import userRoutes from './routes/usuarioRoutes';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';
import postRoutes from './routes/postRoutes';

import fileUpload from 'express-fileupload'

const server = new Server;

//middleware Body parser
server.app.use(express.urlencoded({ extended: true }));
server.app.use(express.json());


//File Upload
server.app.use(fileUpload({ useTempFiles: true }));


//rutas de la aplicación
server.app.use('/user', userRoutes);
server.app.use('/post', postRoutes);

//conexion a la base de datos mongodb
mongoose.connect('mongodb://localhost:27017/fotosgram',
    (err) => {
        if (err) throw err;

        console.log('BD online');
    });



//levantar servidor express
server.start(() => {
    console.log(`Servidor levantado en puerto: ${server.port}`)
});