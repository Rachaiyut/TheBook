import ErrorFactory from "@domain/exceptions/ErrorFactory";
import { IAuthenticatedUser } from "@domain/interfaces/vendors";
import { Request, Response, NextFunction } from "express";

const RolesMiddleware = (requiredRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IAuthenticatedUser | undefined; // Type assertion for safety

        if (!user) {
            return next(ErrorFactory.createError("Login", "You are not logged in! Please log in to get access."));
        }

        if (!user.roles) {
            return next(ErrorFactory.createError("Permission", "User roles not defined"));
        }

        const isRuleRequire = user.roles.some((role) => requiredRoles.includes(role));

        if (!isRuleRequire) {
            return next(ErrorFactory.createError("Permission", "You do not have permission to perform this action"));
        }

        next();
    };
};

export default RolesMiddleware;
