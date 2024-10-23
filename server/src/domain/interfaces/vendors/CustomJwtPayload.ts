import { JwtPayload } from "jsonwebtoken"

interface CustomJwtPayload extends JwtPayload {
    data: string;
}

export default CustomJwtPayload