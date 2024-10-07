import { IUserDTO } from "@application/dtos";
import { UserService } from "@application/services/api";
import { TYPES } from "@inversify/types";
import { inject, injectable } from "inversify";

@injectable()
class GetAllUsers {

    private _userService: UserService;

    constructor(
        @inject(TYPES.UserService) userService: UserService
    ) {
        this._userService = userService;
    }


    public async execute(): Promise<IUserDTO[]> {
        return this._userService.getAllUsers()
    }

}

export default GetAllUsers; 