import ErrorFactory from "@domain/exceptions/ErrorFactory";
import { Request, Response, NextFunction } from "express";

const RolesMiddleware = (requiredRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return next(ErrorFactory.createError("Login", "You are not logged in! Please log in to get access."))
        }

        const isRuleRequire = user.roles.some((role) => requiredRoles.includes(role))

        if (!isRuleRequire) {
            return next(ErrorFactory.createError("Permission", "You do not have permission to perform this action"))
        }

        next();
    };
};

export default RolesMiddleware;