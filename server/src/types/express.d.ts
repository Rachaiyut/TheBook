import { IAuthenticatedUser } from "@domain/interfaces/vendors"
import { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            token?: | JwtPayload,
            user?: IAuthenticatedUser
        }
    }
}