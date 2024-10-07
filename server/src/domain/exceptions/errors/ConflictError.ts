import BaseError from "../BaseError";

class ConflictError extends BaseError {
    public readonly statusCode: number = 409;

    constructor(message: string = "Conflict") {
        super(message, true);
        this.statusCode = 409;

        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}

export default ConflictError;