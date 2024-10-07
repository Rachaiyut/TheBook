import { Request, Response, NextFunction } from "express";

//Inversify
import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";
import { BaseMiddleware } from "inversify-express-utils";


//Services
import { JWTService } from "@application/services/auth";
import ErrorFactory from "@domain/exceptions/ErrorFactory";

@injectable()
class JwtMiddleware extends BaseMiddleware {


    private _jwtService: JWTService;


    constructor(
        @inject(TYPES.JWTService) jwtService: JWTService
    ) {
        super();
        this._jwtService = jwtService;
    }


    public handler(req: Request, res: Response, next: NextFunction): void {
        this.verifyToken(req, res, next);
    }


    public async verifyToken(req: Request, res: Response, next: NextFunction) {

        const token = await this.getToken(req, res, next);

        const decoded = await this._jwtService.verify(token)

        if (!decoded) {
            next(ErrorFactory.createError("Token", "Token is invalid or expired"))
        }

        req.token = decoded!;

        next();
    }


    public getToken(req: Request, res: Response, next: NextFunction) {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            next(ErrorFactory.createError("Login", "You are not logged in!"))
        }

        return token;

    }


}

export default JwtMiddleware;