import { Request, Response, NextFunction } from "express";

//Inversify
import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";
import { BaseMiddleware } from "inversify-express-utils";


import { IAuthenticatedUser } from "@domain/interfaces/vendors";

//Services
import { UserService } from "@application/services/api/index";
import ErrorFactory from "@domain/exceptions/ErrorFactory";


@injectable()
class ProtectMiddleware extends BaseMiddleware {


    private _userService: UserService;

    constructor(
        @inject(TYPES.UserService) userService: UserService
    ) {
        super();
        this._userService = userService;
    }


    public handler(req: Request, res: Response, next: NextFunction): void {
        this.protect(req, res, next);
    }

    public async protect(req: Request, res: Response, next: NextFunction) {
        const decode = req.token!;

        const currentUser = await this._userService.getUser(decode as string);

        if (!currentUser) {
            next(ErrorFactory.createError("NotFound", "This user is not found."));
        }

        req.user = currentUser as IAuthenticatedUser


        next();
    }

}

export default ProtectMiddleware;