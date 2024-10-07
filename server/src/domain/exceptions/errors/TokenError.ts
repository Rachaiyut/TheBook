import BaseError from "../BaseError";

class TokenError extends BaseError {
    public readonly statusCode: number = 400;

    constructor(message: string = "Token") {
        super(message, true);
        this.statusCode = 400;

        Object.setPrototypeOf(this, TokenError.prototype);
    }
}

export default TokenError;