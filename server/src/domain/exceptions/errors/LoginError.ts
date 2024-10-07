import BaseError from '../BaseError';

export class LoginError extends BaseError {
    public readonly statusCode: number = 404;

    constructor(message: string = 'Login') {
        super(message, true);
        this.statusCode = 404

        Object.setPrototypeOf(this, LoginError.prototype);
    }
}