import BaseError from '../BaseError';

export class NotFoundError extends BaseError {
	public readonly statusCode: number = 404;

	constructor(message: string = 'Resource not found') {
		super(message, true);
		this.statusCode = 404

		Object.setPrototypeOf(this, NotFoundError.prototype);

	}
}
