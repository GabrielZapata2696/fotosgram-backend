import Server from './classes/server';
import userRoutes from './routes/usuarioRoutes';

const server = new Server;

//rutas de la aplicación
server.app.use('/user', userRoutes);


//levantar servidor express
server.start(() => {
    console.log(`Servidor levantado en puerto: ${server.port}`)
});