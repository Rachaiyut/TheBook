import { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            token?: JwtPayload | string,
            user?: User
        }
    }
}

declare module "jsonwebtoken" {
    export interface JwtPayload {
        data: string;
    }
}