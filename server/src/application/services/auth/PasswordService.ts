import { injectable } from 'inversify';

import bcrypt from 'bcrypt';

// Error Factory
import ErrorFactory from '@domain/exceptions/ErrorFactory';

@injectable()
export class PasswordService {
    private readonly saltRounds = 10;

    public async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    public async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const passwordCorrect = bcrypt.compare(password, hashedPassword);

        if (!passwordCorrect) {
            throw ErrorFactory.createError("Login", "Password is not correct");
        } 

        return passwordCorrect;
    }
}

export default PasswordService