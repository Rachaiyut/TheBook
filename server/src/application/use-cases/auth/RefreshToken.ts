import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

//Service
import { AuthService } from "@application/services/auth/index";


@injectable()
class RefreshToken {

    private _authService: AuthService

    constructor(@inject(TYPES.AuthService) authService: AuthService) {
        this._authService = authService;
    }

    public async execute(refreshToken: string) {
        const result = await this._authService.refreshToken(refreshToken)

        return result;
    }

}

export default RefreshToken;