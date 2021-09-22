import { Router, Request, Response } from "express";
import { Usuario, IUsuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';

const userRoutes = Router();


//login
userRoutes.post('/login', (req: Request, res: Response) => {

    const body: IUsuario = req.body;


    Usuario.findOne({ email: body.email }, (err: any, userBD: IUsuario) => {
        if (err) throw err

        if (!userBD) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

        if (userBD.compararPassword(body.password)) {
            res.json({
                ok: true,
                token: 'token'
            });
        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario//contraseña no son correctos'
            });
        }


    });

});




//crear un usuario
userRoutes.post('/crear', (req: Request, res: Response) => {

    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar

    }

    Usuario.create(user).then(userDB => {
        res.json({
            ok: true,
            user: userDB
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        });
    });


});



export default userRoutes;
