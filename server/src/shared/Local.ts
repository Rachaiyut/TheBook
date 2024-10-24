import path from "path"

import dotenv from "dotenv"

class Local {

    public static config() {
        dotenv.config({ path: path.join(__dirname, "../../.env") })

        const port = process.env.PORT!;
        const postgresUrl = process.env.POSTGRES_URL;

        const jwtAccessSecret = process.env.JWT_ACCESS_SECRET!;
        const jwtRefreshSecret = process.env.JWT_EXPIRE!;
        const jwtExpire = process.env.JWT_REFRESH_EXPIRE!;
        const jwtCookieExpire = process.env.JWT_COOKIE_EXPIRES!;

        const googleId = process.env.GOOGLE_ID!;
        const googleSecret = process.env.GOOGLE_SECRET!;
        const googleCallback = process.env.GOOGLE_CALLBACK!;

        const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT!
        const maxParameterLimit = parseInt(process.env.APP_MAX_PARAMETER_LIMIT!)

        const url = process.env.FRONT_END_URL!

        const isCORSEnabled = process.env.CORS_ENABLED!

        return {
            port,
            postgresUrl,
            jwtAccessSecret,
            jwtRefreshSecret,
            jwtExpire,
            jwtCookieExpire,
            googleId,
            googleSecret,
            googleCallback,
            maxUploadLimit,
            maxParameterLimit,
            url,
            isCORSEnabled,
        }
    }


}

export default Local; 