import { injectable } from "inversify";

//JWT
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

// Config
import Local from "@shared/Local";

import ErrorFactory from "@domain/exceptions/ErrorFactory";


@injectable()
class JWTService {


    private getJWTConfig() {
        const secret = Local.config().jwtSecret;
        const expire = Local.config().jwtExpire;
        const cookieExpire = Local.config().jwtCookieExpire;

        return { secret, expire, cookieExpire };
    }


    public sign(id: string) {
        const { secret } = this.getJWTConfig();

        return jwt.sign({ data: id }, secret, { expiresIn: "10s" })

    }


    // public verify(token: string) {
    //     const { secret } = this.getJWTConfig();

    //     const decoded = jwt.verify(token, secret);

    //     if (!decoded) {
    //         throw ErrorFactory.createError("Token", "Token is invalid or expired");
    //     }

    //     return decoded;
    // }


    public async verify(token: string) {
        const { secret } = this.getJWTConfig();

        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    return reject(ErrorFactory.createError("Token", err.message));
                }

                resolve(decoded);
            });
        });
    }


    // public async verify(token: string) {
    //     const { secret } = this.getJWTConfig();

    //     const decoded = await new Promise<JwtPayload | null>((resolve, reject) => {
    //         jwt.verify(token, secret, (err: VerifyErrors | unknown, decoded: JwtPayload | unknown) => {
    //             if (err) {
    //                 reject(E);
    //             }

    //             resolve(decoded as JwtPayload);
    //         });
    //     });

    //     if (!decoded) {
    //         throw ErrorFactory.createError("Token", "Token is invalid or expired");

    //     }

    //     return decoded;

    // };


}


export default JWTService;