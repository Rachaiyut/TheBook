import { Request, Response, NextFunction } from "express";

//Inversify
import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";
import { BaseMiddleware } from "inversify-express-utils";


//Services
import { JWTService } from "@application/services/auth";
import ErrorFactory from "@domain/exceptions/ErrorFactory";

// Utils
import asyncHandler from "@shared/utils/asyncHandler";

@injectable()
class JwtMiddleware extends BaseMiddleware {


    private readonly _jwtService: JWTService;


    constructor(
        @inject(TYPES.JWTService) jwtService: JWTService
    ) {
        super();
        this._jwtService = jwtService;
    }


    public async handler(req: Request, res: Response, next: NextFunction) {
        await this.verifyToken(req, res, next);
    }


    public getToken(req: Request) {
        let accessToken = '';
        let refreshToken = '';

        if (req.headers.authorization?.startsWith('Bearer')) {
            accessToken = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.accessToken) {
            accessToken = req.cookies.accessToken;
        }

        if (req.cookies.refreshToken || req.body.refreshToken) {
            refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        }

        if (!accessToken && !refreshToken) {
            throw ErrorFactory.createError("Login", "You are not logged in!");
        }

        return { accessToken, refreshToken };
    }


    public async verifyToken(req: Request, res: Response, next: NextFunction) {
        if (req.body.refreshToken) {
            await this.verifyRefreshToken(req, res, next);
        } else {
            await this.verifyAccessToken(req, res, next);
        }
    }


    public verifyAccessToken = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const { accessToken } = this.getToken(req);

            const decodedAccessToken = await this._jwtService.verifyAccessToken(accessToken);

            req.token = decodedAccessToken;

            next();
        }
    );


    public verifyRefreshToken = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const { refreshToken } = this.getToken(req);

            const decodedRefreshToken = await this._jwtService.verifyRefreshToken(refreshToken);
 
            req.token = decodedRefreshToken;

            next();
        }
    );
}

export default JwtMiddleware;