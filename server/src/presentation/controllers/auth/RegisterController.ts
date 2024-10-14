import { Request, Response } from "express";

import { inject } from "inversify";
import {
    controller,
    httpPost
} from "inversify-express-utils";

import { TYPES } from "@inversify/types";

//Usecase
import { Register as RegisterUsecase } from "@application/use-cases/auth/index";

//Error Utilities
import ErrorFactory from "@domain/exceptions/ErrorFactory";


@controller("/auth")
class RegisterController {

    private _registerUsecase: RegisterUsecase


    constructor(
        @inject(TYPES.Register) registerUsecase: RegisterUsecase
    ) {
        this._registerUsecase = registerUsecase
    }


    @httpPost('/signup')
    public async register(req: Request, res: Response) {
        const body = req.body

        if (!body.email || !body.password) {
            throw ErrorFactory.createError(
                "NotFound",
                "Please provide email and password"
            )
        }

        const result = await this._registerUsecase.execute(req.body);

        res.cookie("jwt", result.token)

        res.status(201).json({
            success: true,
            data: result
        })
    }

}

export default RegisterController; 