import { Request, Response } from "express";

import { inject } from "inversify";
import { TYPES } from "@inversify/types";

//Controllers
import { controller, httpDelete, httpGet, httpPatch } from "inversify-express-utils";

//USE-CASES
import { DeleteUser, GetAllUsers, UpdateUser } from "@application/use-cases/user/index";
import { RolesMiddleware } from "@presentation/middlewares/index";

@controller('/users')
class UserController {


    private readonly _getAllUser: GetAllUsers;
    private readonly _updateUser: UpdateUser;
    private readonly _deleteUser: DeleteUser;


    constructor(
        @inject(TYPES.GetAllUsers) getAllUsers: GetAllUsers,
        @inject(TYPES.UpdateUser) updateUser: UpdateUser,
        @inject(TYPES.DeleteUser) deleteUser: DeleteUser
    ) {
        this._getAllUser = getAllUsers;
        this._updateUser = updateUser;
        this._deleteUser = deleteUser;
    }


    @httpGet(
        '/',
        TYPES.JwtMiddleware,
        TYPES.ProtectMiddleware,
        RolesMiddleware(["admin", "user"])
    )
    public async getAllUsers(req: Request, res: Response) {
        const result = await this._getAllUser.execute();

        res.status(200).json({
            success: true,
            data: result
        })
    }


    @httpPatch('/:userId')
    public async updateUser(req: Request<{ userId: string }>, res: Response) {
        const userId = req.params.userId;
        const body = req.body

        const user = await this._updateUser.execute(userId, body);

        res.status(200).json({
            success: true,
            message: "Update successfully",
            data: user
        })
    }


    @httpDelete('/:userId')
    public async DeleteUser(req: Request<{ userId: string }>, res: Response) {
        const userId = req.params.userId;

        const isSuccess = await this._deleteUser.execute(userId);

        res.status(200).json({
            success: isSuccess,
            message: "User deleted successfully"
        })
    }

    // @httpGet('/:userId/deactive')
    // public async DeactiveUser(req: Request<{ userId: string }>, res: Response) {
    //     //     const userId = req.params.userId;

    //     //     const isSuccess = await this._deleteUser.execute(userId);

    //     //     res.status(200).json({
    //     //         success: isSuccess,
    //     //         message: "User deleted successfully"
    //     //     })
    // }

}

export default UserController