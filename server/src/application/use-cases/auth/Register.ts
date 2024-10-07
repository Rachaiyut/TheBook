import { injectable, inject } from "inversify"
import { TYPES } from "@inversify/types"

//Inteface DTO
import { IRegisterDTO } from "@application/dtos";

//Service
import { AuthService } from "@application/services/auth";


@injectable()
class Register {

    private _authService: AuthService

    constructor(@inject(TYPES.AuthService) authService: AuthService) {
        this._authService = authService;
    }

    public async execute(registerDTO: IRegisterDTO) {
        const result = await this._authService.register(registerDTO);

        return result

    }

}

export default Register