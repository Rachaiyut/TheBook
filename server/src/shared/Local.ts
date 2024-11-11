import path from "path"

import dotenv from "dotenv"

class Local {

    public static config() {
        dotenv.config({ path: path.join(__dirname, "../../.env") })

        const port = process.env.PORT!;
        const postgresUrl = process.env.POSTGRES_URL!;

        const jwtAccessSecret = process.env.JWT_ACCESS_SECRET!;
        const jwtRefreshSecret = process.env.JWT_ACCESS_REFRESH!;
        const jwtAccessExpire = process.env.JWT_ACCESS_EXPIRE!
        const jwtRefreshExpire = process.env.JWT_REFRESH_EXPIRE!;
        const jwtCookieExpire = process.env.JWT_COOKIE_EXPIRES!;

        const userVerifyCode = process.env.USER_VERIFICATION_CODE!;

        const googleId = process.env.GOOGLE_ID!;
        const googleSecret = process.env.GOOGLE_SECRET!;
        const googleCallback = process.env.GOOGLE_CALLBACK!;

        const host = process.env.HOST!;
        const mailService = process.env.MAIL_SERVICE!;
        const emailPort = process.env.EMAIL_PORT!;
        const GmailUsername = process.env.GMAIL_USERNAME!;
        const GooglePassword = process.env.GOOGLE_PASSWORD!;

        const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;
        const stripeWebhook = process.env.STRIPE_WEB_HOOK!

        const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT!
        const maxParameterLimit = parseInt(process.env.APP_MAX_PARAMETER_LIMIT!)

        const url = process.env.FRONT_END_URL!

        const isCORSEnabled = process.env.CORS_ENABLED!

        return {
            port,
            postgresUrl,
            jwtAccessSecret,
            jwtRefreshSecret,
            jwtAccessExpire,
            jwtRefreshExpire,
            jwtCookieExpire,
            userVerifyCode,
            googleId,
            googleSecret,
            googleCallback,
            host,
            mailService,
            emailPort,
            GmailUsername,
            GooglePassword,
            stripeSecretKey,
            stripeWebhook,
            maxUploadLimit,
            maxParameterLimit,
            url,
            isCORSEnabled,
        }
    }


}

export default Local; 