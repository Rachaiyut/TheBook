import { Request, Response } from "express";

//Inversfiy
import { inject } from "inversify";
import { TYPES } from "@inversify/types";
import { controller, httpPost, httpGet } from "inversify-express-utils";

// Passport
import passport from 'passport';

// DTO
import ILoginDTO from "@application/dtos/auth/ILoginDTO";


//Use-Case
import {
    Login as LoginUsecase,
    RefreshToken as RefreshTokenUsecase
} from "@application/use-cases/auth";

// Error handling
import ErrorFactory from "@domain/exceptions/ErrorFactory";


@controller('/auth')
class LoginController {


    private readonly _loginUsecase: LoginUsecase;
    private readonly _refreshTokenUsecase: RefreshTokenUsecase;


    constructor(
        @inject(TYPES.Login) loginUsecase: LoginUsecase,
        @inject(TYPES.RefreshToken) refreshTokenUsecase: RefreshTokenUsecase
    ) {
        this._loginUsecase = loginUsecase
        this._refreshTokenUsecase = refreshTokenUsecase
    }


    @httpPost("/login")
    public async login(req: Request<unknown, unknown, ILoginDTO>, res: Response) {
        const body = req.body;

        if (!body.email || !body.password) {
            throw ErrorFactory.createError(
                "NotFound",
                "Please provide email and password"
            )
        }

        const result = await this._loginUsecase.execute(body);

        res.cookie("accessToken", result.accessToken, {
            httpOnly: true,
            sameSite: "strict",
            // expires: new Date(
            //     Date.now() + +Local.config().jwtCookieExpire * 24 * 60 * 60 * 1000
            // )
            maxAge: 10 * 1000
        })
        .cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            // expires: new Date(
            //     Date.now() + +Local.config().jwtCookieExpire * 24 * 60 * 60 * 1000
            // )
            maxAge: 10 * 1000
        })
        .status(200)
        .json({
            success: true,
            data: result
        })
    }


    @httpPost('/refresh')
    public async refreshToken(req: Request<unknown, unknown, { refreshToken: string }>, res: Response) {
        const refreshToken = req.body.refreshToken;

        const result = await this._refreshTokenUsecase.execute(refreshToken)

        console.log(result)

        res.cookie("accessToken", result.accessToken, {
            httpOnly: true,
            sameSite: "strict",
            // expires: new Date(
            //     Date.now() + +Local.config().jwtCookieExpire * 24 * 60 * 60 * 1000
            // )
            maxAge: 10 * 1000
        })
        .cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            // expires: new Date(
            //     Date.now() + +Local.config().jwtCookieExpire * 24 * 60 * 60 * 1000
            // )
            maxAge: 10 * 1000
        })
        .status(200)
        .json({
            success: true,
            data: result
        })

    }


    @httpGet("/login/google")
    public googleLogin(req: Request, res: Response) {
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })(req, res);
    }


    @httpGet(
        "/google/callback",
        passport.authenticate('google', {
            failureRedirect: "http://localhost:5173",
            session: false
        })
    )
    public googleCallback(req: Request, res: Response) {
        console.log("From Login controller", req.user)

        res.redirect("http://localhost:5173");

    }

}

export default LoginController;