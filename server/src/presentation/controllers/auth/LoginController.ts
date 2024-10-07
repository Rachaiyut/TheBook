import { Request, Response } from "express";

//Inversfiy
import { inject } from "inversify";
import { TYPES } from "@inversify/types";
import { controller, httpPost } from "inversify-express-utils";

//DTO
import ILoginDTO from "@application/dtos/auth/ILoginDTO";

//Use-Case
import { Login as LoginUsecase } from "@application/use-cases/auth";
import ErrorFactory from "@domain/exceptions/ErrorFactory";


@controller('/auth')
class LoginController {

    private _loginUsecase: LoginUsecase

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

}

export default LoginController;