import BaseError from "../../BaseError"

class UnsupportedEvent extends BaseError {
    public readonly statusCode: number = 400;

    constructor(message: string = 'UnsupportedEvent') {
        super(message, true);
        this.statusCode = 400

        Object.setPrototypeOf(this, UnsupportedEvent.prototype);

    }

}

export default UnsupportedEvent