import { Request, Response, NextFunction } from "express";

//Inversify
import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";
import { BaseMiddleware } from "inversify-express-utils";

// Interface
import { CustomJwtPayload, IAuthenticatedUser } from "@domain/interfaces/vendors";

// Services
import { UserService } from "@application/services/api/index";

// Error handling
import ErrorFactory from "@domain/exceptions/ErrorFactory";

// Uitls
import asyncHandler from "@shared/utils/asyncHandler";


@injectable()
class ProtectMiddleware extends BaseMiddleware {


    private readonly _userService: UserService;


    constructor(
        @inject(TYPES.UserService) userService: UserService
    ) {
        super();
        this._userService = userService;
    }


    public async handler(req: Request, res: Response, next: NextFunction) {
        await this.protect(req, res, next);
    }


    public protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const decoded = req.token as CustomJwtPayload;

        const currentUser = await this._userService.getUser(decoded.data);

        if (!currentUser) {
            throw ErrorFactory.createError("NotFound", "This user is not found.");
        }


        req.user = currentUser as IAuthenticatedUser;

        next();
    });

}

export default ProtectMiddleware;