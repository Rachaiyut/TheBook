import BaseError from "../../BaseError"

class InvalidEvent extends BaseError {
    public readonly statusCode: number = 400;

    constructor(message: string = 'Invalidevent') {
        super(message, true);
        this.statusCode = 400

        Object.setPrototypeOf(this, InvalidEvent.prototype);

    }

}

export default InvalidEvent