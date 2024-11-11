import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// Mail Service
import { LoginConfirmationEmail, RegisterConfirmationEmail } from "../service/auth/index";

@injectable()
class EmailFactory {

    private readonly _loginComfirmation: LoginConfirmationEmail;
    private readonly _registerConfirmation: RegisterConfirmationEmail;

    constructor(
        @inject(TYPES.LoginConfirmationEmail) loginConfirmationEmail: LoginConfirmationEmail,
        @inject(TYPES.RegisterConfirmationEmail) registerConfirmation: RegisterConfirmationEmail
    ) {
        this._loginComfirmation = loginConfirmationEmail;
        this._registerConfirmation = registerConfirmation;
    }

    public createEmailStrategy(type: string) {
        switch (type) { 
            case "login":
                return this._loginComfirmation;
            case "register":
                return this._registerConfirmation;
            default:
                throw new Error("Invalid email type"); 
        }
    }
}

export default EmailFactory
