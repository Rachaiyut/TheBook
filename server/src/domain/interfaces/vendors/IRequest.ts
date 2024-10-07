import { JwtPayload } from "jsonwebtoken";

interface IRequest {
    token: string | JwtPayload
}

export default IRequest;
