import path from "path"

import dotenv from "dotenv"

class Local {

    public static config() {
        dotenv.config({ path: path.join(__dirname, "../../.env") })

        const port = process.env.PORT!;
        const postgresUrl = process.env.POSTGRES_URL;

        const jwtSecret = process.env.JWT_SECRET!;
        const jwtExpire = process.env.JWT_EXPIRE!;
        const jwtCookieExpire = process.env.JWT_COOKIE_EXPIRES!;

        const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT!
        const maxParameterLimit = parseInt(process.env.APP_MAX_PARAMETER_LIMIT!)

        const url = process.env.FRONT_END_URL!

        const isCORSEnabled = process.env.CORS_ENABLED!

        return {
            port,
            postgresUrl,
            jwtSecret,
            jwtExpire,
            jwtCookieExpire,
            maxUploadLimit,
            maxParameterLimit,
            url,
            isCORSEnabled,
        }
    }


}

export default Local; 