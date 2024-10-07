import BaseError from '../BaseError';

export class RegisterError extends BaseError {
    public readonly statusCode: number = 404;

    constructor(message: string = 'Register Error') {
        super(message, true);
        this.statusCode = 404

        Object.setPrototypeOf(this, RegisterError.prototype);
    }
}