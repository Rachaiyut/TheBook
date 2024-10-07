import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

//DTO
import ILoginDTO from "@application/dtos/auth/ILoginDTO";

//Service
import { AuthService } from "@application/services/auth/index";


@injectable()
class Login {

    private _authService: AuthService

    constructor(@inject(TYPES.AuthService) authService: AuthService) {
        this._authService = authService;
    }

    public async execute(loginDTO: ILoginDTO) {
        const result = await this._authService.login(loginDTO)

        return result;
    }

}

export default Login;