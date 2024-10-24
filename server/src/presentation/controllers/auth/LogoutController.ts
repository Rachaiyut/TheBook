import { Request, Response } from "express";

import { controller, httpPost } from "inversify-express-utils";

@controller("/auth")
class LogoutController {


    @httpPost("/logout")
    public logout(req: Request, res: Response) {

        res.clearCookie("jwt")

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    }


}

export default LogoutController 