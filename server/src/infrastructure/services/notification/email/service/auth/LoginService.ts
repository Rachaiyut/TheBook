import * as path from 'path';

// Inversify
import { inject, injectable } from 'inversify';
import { TYPES } from '@inversify/types';

// Views
import pug from "pug";

// Service
import { EmailService } from '@application/services/api/index';
import { EncryptionService } from '@infrastructure/services/crypto';
import Local from '@shared/Local';

@injectable()
class LoginConfirmationEmail extends EmailService {


    private readonly _encryptionService: EncryptionService;


    constructor (
        @inject(TYPES.EncryptionService) encryptionService: EncryptionService
    ) {
        super();
        this._encryptionService = encryptionService;
    }


    public async sendEmail(to: string, userId: string) {

    
        const subject = "Email Verify";
        const verification_link = `localhost:8000/api/v1/auth/verify/${userId}`
        const html = pug.renderFile(path.join(__dirname, '../../../../../../presentation/views/email/login.pug'), { verification_link })

        return await this.send(to, subject, html)

    }

}

export default LoginConfirmationEmail
