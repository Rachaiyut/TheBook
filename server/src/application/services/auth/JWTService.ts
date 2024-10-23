import { injectable } from "inversify";

//JWT
import jwt, { JwtPayload } from "jsonwebtoken";

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


    public async verify(token: string): Promise<string | JwtPayload | undefined> {
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


}


export default JWTService;