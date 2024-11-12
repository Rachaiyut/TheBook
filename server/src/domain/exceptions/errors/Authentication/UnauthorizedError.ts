import BaseError from "../../BaseError"

class UnauthorizedError extends BaseError {
    public readonly statusCode: number = 401;

    constructor(message: string = 'Unauthorized') {
        super(message, true);
        this.statusCode = 401

        Object.setPrototypeOf(this, UnauthorizedError.prototype);

    }

}

export default UnauthorizedError