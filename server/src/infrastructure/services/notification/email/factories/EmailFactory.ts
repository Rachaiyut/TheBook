import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// Stragies 
import { LoginConfirmationEmail } from "../service/auth/index";

@injectable()
class EmailFactory {

    private readonly _loginComfirmation: LoginConfirmationEmail

    constructor(
        @inject(TYPES.LoginConfirmationEmail) loginConfirmationEmail: LoginConfirmationEmail
    ) {
        this._loginComfirmation = loginConfirmationEmail;
    }

    public createEmailStrategy(type: string) {
        switch (type) {
            case "login":
                return this._loginComfirmation;
            case 'register':
            default:
                throw new Error("Invalid email type");
        }
    }
}

export default EmailFactory
