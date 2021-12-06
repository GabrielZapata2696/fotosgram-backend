import { Router, Request, Response } from "express";
import { Usuario, IUsuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { validaToken } from "../middlewares/autenticacion";

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
            const tokenUser = Token.obtenerJwtToken({
                _id: userBD._id,
                nombre: userBD.nombre,
                email: userBD.email,
                avatar: userBD.avatar
            });

            res.json({
                ok: true,
                token: tokenUser
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

    Usuario.create(user).then(userBD => {

        const tokenUser = Token.obtenerJwtToken({
            _id: userBD._id,
            nombre: userBD.nombre,
            email: userBD.email,
            avatar: userBD.avatar
        });

        res.json({
            ok: true,
            token: tokenUser
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        });
    });


});


//Actualizar usuario 
userRoutes.put('/actualizar', validaToken, (req: any, res: Response) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    }


    Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userBD) => {

        if (err) throw err;

        if (!userBD) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con el ID especificado'
            });
        }
        const tokenUser = Token.obtenerJwtToken({
            _id: userBD._id,
            nombre: userBD.nombre,
            email: userBD.email,
            avatar: userBD.avatar
        });

        res.json({
            ok: true,
            token: tokenUser
        });

    });



});

userRoutes.get('/informacion', validaToken, (req: any, res: Response) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
});


export default userRoutes;
