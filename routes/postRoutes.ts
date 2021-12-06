import { Request, Response, Router } from 'express';
import FileSystem from '../classes/file-system';
import { FIleUpload } from '../interfaces/file-upload';
import { validaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';


const postRoutes = Router();
const fileSystem = new FileSystem();

//obtener POST paginado
postRoutes.get('/', async (req: any, res: Response) => {

    let pagina = +req.query.pagina || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const post = await Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();


    res.json({
        ok: true,
        pagina,
        post
    });



});

postRoutes.post('/', [validaToken], (req: any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

    const imagenes = fileSystem.imagenesTempAPost(req.usuario._id);
    body.imgs = imagenes;

    Post.create(body).then(async postDB => {

        await postDB.populate('usuario', '-password');

        res.json({
            ok: true,
            post: postDB
        });
    }).catch(err => {
        res.json(err);
    });


});

//Servicio para subir archivos
postRoutes.post('/subir', [validaToken], async (req: any, res: Response) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo'
        });
    }

    const file: FIleUpload = req.files.imagen;

    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de archivo invalido / Debe subir solo imagenes'
        });
    }


    await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    res.json({
        ok: true,
        file: file.mimetype
    });


});


postRoutes.get('/imagen/:userid/:img', async (req: any, res: Response) => {

    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto: any = fileSystem.getFotoUrl(userId, img);

    res.sendFile(pathFoto);

});













export default postRoutes;
