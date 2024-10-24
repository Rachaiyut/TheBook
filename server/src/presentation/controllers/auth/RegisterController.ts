import { Request, Response } from "express";

import { inject } from "inversify";
import {
    controller,
    httpPost
} from "inversify-express-utils";

import { TYPES } from "@inversify/types";

// Usecase
import { Register as RegisterUsecase } from "@application/use-cases/auth/index";

// Error Utilities
import ErrorFactory from "@domain/exceptions/ErrorFactory";

// Config
import Local from "@shared/Local";

@controller("/auth")
class RegisterController {

    private readonly _registerUsecase: RegisterUsecase


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

        res.cookie("accessToken", result.accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(
                Date.now() + +Local.config().jwtCookieExpire * 24 * 60 * 60 * 1000
            )
        })

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(
                Date.now() + +Local.config().jwtCookieExpire * 24 * 60 * 60 * 1000
            )
        })

        res.status(201).json({
            success: true,
            data: result
        })
    }

}

export default RegisterController; 