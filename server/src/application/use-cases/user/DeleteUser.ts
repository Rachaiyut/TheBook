import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

// Service
import { UserService } from "@application/services/api";

@injectable()
class DeleteUser {

    private _userService: UserService

    constructor(
        @inject(TYPES.UserService) userService: UserService
    ) {
        this._userService = userService;
    }

    public async execute(userId: string): Promise<number> {
        return this._userService.deleteUser(userId);
    }

}

export default DeleteUser;