import BaseError from "../../BaseError"

class InvalidSignature extends BaseError {
    public readonly statusCode: number = 400;

    constructor(message: string = 'InvalidSignature') {
        super(message, true);
        this.statusCode = 400

        Object.setPrototypeOf(this, InvalidSignature.prototype);

    }

}

export default InvalidSignature