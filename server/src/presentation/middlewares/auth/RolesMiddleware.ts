import ErrorFactory from "@domain/exceptions/ErrorFactory";
import { IAuthenticatedUser } from "@domain/interfaces/vendors";
import asyncHandler from "@shared/utils/asyncHandler";
import { Request, Response, NextFunction } from "express";

const RolesMiddleware = (requiredRoles: string[]) => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IAuthenticatedUser | undefined

        if (!user) {
            return next(ErrorFactory.createError("Login", "You are not logged in! Please log in to get access."));
        }

        const hasRequiredRole = user.roles.some((role) => requiredRoles.includes(role));

        if (!hasRequiredRole) {
            return next(ErrorFactory.createError("Permission", "You do not have permission to perform this action"));
        }

        next();
    });
};

export default RolesMiddleware;
