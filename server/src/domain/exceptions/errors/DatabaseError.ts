import BaseError from "../BaseError";

class DatabaseError extends BaseError {
    public readonly statusCode: number = 409;

    constructor(message: string = "Database") {
        super(message, true);
        this.statusCode = 409;

        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
}

export default DatabaseError