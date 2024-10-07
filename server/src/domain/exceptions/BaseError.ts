abstract class BaseError extends Error {
    public abstract readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, isOperational: boolean = true) {
        super(message);
        this.isOperational = isOperational;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

export default BaseError