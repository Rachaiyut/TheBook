import { IUserDTO } from "@application/dtos";
import { UserService } from "@application/services/api";
import { TYPES } from "@inversify/types";
import { inject, injectable } from "inversify";

@injectable()
class UpdateUser {

    private _userService: UserService;

    constructor(
        @inject(TYPES.UserService) userService: UserService
    ) {
        this._userService = userService;
    }


    public async execute(userId: string, userDTO: IUserDTO): Promise<IUserDTO> {
        const user = await this._userService.updateUser(userId, userDTO);

        return user;
    }

}

export default UpdateUser