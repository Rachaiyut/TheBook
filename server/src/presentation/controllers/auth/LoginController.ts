import { Request, Response } from "express";

//Inversfiy
import { inject } from "inversify";
import { TYPES } from "@inversify/types";
import { controller, httpPost, httpGet } from "inversify-express-utils";

// Passport
import passport from 'passport';

//DTO
import ILoginDTO from "@application/dtos/auth/ILoginDTO";

//Use-Case
import { Login as LoginUsecase } from "@application/use-cases/auth";
import ErrorFactory from "@domain/exceptions/ErrorFactory";


@controller('/auth')
class LoginController {


    private readonly _loginUsecase: LoginUsecase


    constructor(
        @inject(TYPES.Login) loginUsecase: LoginUsecase
    ) {
        this._loginUsecase = loginUsecase
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

        res.cookie("jwt", result.token);

        res.status(200).json({
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
            failureRedirect: "http://localhost:5173", // Redirect on failure
            session: false
        })
    )
    public googleCallback(req: Request, res: Response) {
        console.log("From Login controller", req.user)

        res.redirect("http://localhost:5173");

    }

}

export default LoginController;