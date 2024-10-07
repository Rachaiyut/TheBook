import { injectable } from 'inversify';

import bcrypt from 'bcrypt';

@injectable()
export class PasswordService {
    private readonly saltRounds = 10;

    public async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    public async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}

export default PasswordService