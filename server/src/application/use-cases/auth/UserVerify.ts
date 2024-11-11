import { injectable, inject } from "inversify"
import { TYPES } from "@inversify/types"

//Inteface DTO
import { IVerifyDTO } from "@application/dtos/auth";

//Service
import { AuthService } from "@application/services/auth";


@injectable()
class UserVerify {

    private _authService: AuthService

    constructor(@inject(TYPES.AuthService) authService: AuthService) {
        this._authService = authService;
    }

    public execute(verifyDTO: IVerifyDTO) {
        const result = this._authService.userVerify(verifyDTO);

        return result

    }

}

export default UserVerify;