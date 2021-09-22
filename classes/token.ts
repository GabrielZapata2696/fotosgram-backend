import jwt from 'jsonwebtoken'

export default class Token {

    private static seed: string = 'pg&B0GT8V9$#k#KjgXSnR';
    private static caducidad: string = '30d';

    constructor() { }

    static obtenerJwtToken(payload: any): string {
        return jwt.sign({
            usuario: payload
        },
            this.seed,
            {
                expiresIn: this.caducidad
            }
        );
    }

    static validarToken(userToken: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decodedToken) => {
                if (err) {
                    reject();
                } else {
                    resolve(decodedToken);
                }
            });
        });

    }

}