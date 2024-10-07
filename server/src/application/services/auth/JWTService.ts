import { injectable } from "inversify";

//JWT
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

// Config
import Local from "@shared/Local";

//Error Handling
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
        const { secret, expire } = this.getJWTConfig();

        return jwt.sign({ data: id }, secret, { expiresIn: expire })

    }

    public async verify(token: string) {
        const { secret } = this.getJWTConfig();

        const decoded = await new Promise<JwtPayload | null>((resolve, reject) => {
            jwt.verify(token, secret, (err: VerifyErrors | unknown, decoded: JwtPayload | unknown) => {
                if (err) {
                    console.log(err)
                    return reject(ErrorFactory.createError("Token", "error"));
                }

                resolve(decoded!);
            });
        });


        return decoded;

    };


}


export default JWTService;