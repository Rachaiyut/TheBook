import { Request, Response } from "express";

import { inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost
} from "inversify-express-utils";

import { TYPES } from "@inversify/types";

// Usecase
import { Register as RegisterUsecase, UserVerify } from "@application/use-cases/auth/index";

// Error Utilities
import ErrorFactory from "@domain/exceptions/ErrorFactory";

// Config
import Local from "@shared/Local";
import { IVerifyDTO } from "@application/dtos/auth";

@controller("/auth")
class RegisterController {

    private readonly _registerUsecase: RegisterUsecase;
    private readonly _userVerify: UserVerify;

    constructor(
        @inject(TYPES.Register) registerUsecase: RegisterUsecase,
        @inject(TYPES.UserVerify) userVerify: UserVerify,
    ) {
        this._registerUsecase = registerUsecase;
        this._userVerify = userVerify;
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

    @httpGet('/verify/:encrypted/:token')
    public async verify(req: Request<{ encrypted: string, token: string }>, res: Response) {
        const { encrypted, token } = req.params;

        const decrypted = this._userVerify.execute({ encrypted, token })

        res.status(200).json({
            data: {
                success: true,
                data: {
                    decrypted
                }
            }
        })

    }

}

export default RegisterController; 