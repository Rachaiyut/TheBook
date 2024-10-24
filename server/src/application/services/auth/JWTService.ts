import { injectable } from "inversify";

//JWT
import jwt, { JwtPayload } from "jsonwebtoken";

// Config
import Local from "@shared/Local";

import ErrorFactory from "@domain/exceptions/ErrorFactory";


@injectable()
class JWTService {


    private getJWTConfig() {
        const accessTokenSecret = Local.config().jwtAccessSecret;
        const refreshTokenSecret = Local.config().jwtRefreshSecret;
        const expire = Local.config().jwtExpire;
        const cookieExpire = Local.config().jwtCookieExpire;

        return { accessTokenSecret, refreshTokenSecret, expire, cookieExpire };
    }


    public generateAccessToken(id: string) {
        const { accessTokenSecret } = this.getJWTConfig();

        return jwt.sign({ data: id }, accessTokenSecret, { expiresIn: "10s" })

    }


    public genrerefreshToken(id: string) {
        const { refreshTokenSecret } = this.getJWTConfig();

        return jwt.sign({ data: id }, refreshTokenSecret, { expiresIn: "30s" })
    }


    public async verifyAccessToken(token: string): Promise<JwtPayload | undefined> {
        const { accessTokenSecret } = this.getJWTConfig();

        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret, (err, decoded) => {
                if (err) {
                    return reject(ErrorFactory.createError("Token", err.message));
                }

                resolve(decoded as JwtPayload);
            });
        });
    }


    public async verifyRefreshToken(token: string): Promise<JwtPayload | undefined> {
        const { refreshTokenSecret } = this.getJWTConfig();

        return new Promise((resolve, reject) => {
            jwt.verify(token, refreshTokenSecret, (err, decoded) => {
                if (err) {
                    return reject(ErrorFactory.createError("Token", err.message));
                }

                resolve(decoded as JwtPayload);
            });
        });
    }

}


export default JWTService;