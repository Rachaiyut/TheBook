import { NotFoundError } from './errors/NotFoundError';
import { RegisterError } from './errors/RegisterError';
import ConflictError from './errors/ConflictError';
import DatabaseError from './errors/DatabaseError';
import TokenError from './errors/TokenError';
import { LoginError } from './errors/LoginError';
import AuthorizationError from './errors/AuthorizationError';

class ErrorFactory {
	static createError(type: string, message: string): Error {
		switch (type) {
			case 'NotFound':
				return new NotFoundError(message);
			case 'Register':
				return new RegisterError(message);
			case "Login":
				return new LoginError(message);
			case 'Conflict':
				return new ConflictError(message);
			case 'Database':
				return new DatabaseError(message);
			case 'Token':
				return new TokenError(message);
			case 'Permission':
				return new AuthorizationError(message);
			default:
				return new Error(message);
		}
	}
}

export default ErrorFactory;