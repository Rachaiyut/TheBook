import BaseError from "../BaseError";

class TokenError extends BaseError {
    public readonly statusCode: number = 401;

    constructor(message: string = "Token") {
        super(message, true);
        this.statusCode = 401;

        Object.setPrototypeOf(this, TokenError.prototype);
    }
}

export default TokenError;