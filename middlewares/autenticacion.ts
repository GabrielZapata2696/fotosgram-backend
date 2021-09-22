import { NextFunction, Request, Response } from "express";
import Token from '../classes/token';


export const validaToken = (req: any, res: Response, next: NextFunction) => {

    const userToken = req.get('z-token') || '';

    Token.validarToken(userToken)
        .then((decoded: any) => {
            req.usuario = decoded.usuario;
            next();
        })
        .catch(err => {
            res.json({
                ok: false,
                mensaje: 'Token invalido!'
            });
        });

}