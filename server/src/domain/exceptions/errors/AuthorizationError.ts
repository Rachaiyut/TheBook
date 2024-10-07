import BaseError from "../BaseError"

class AuthorizationError extends BaseError {
    public readonly statusCode: number = 403;

    constructor(message: string = 'Permission') {
        super(message, true);
        this.statusCode = 403

        Object.setPrototypeOf(this, AuthorizationError.prototype);

    }

}

export default AuthorizationError