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
class RegisterConfirmationEmail extends EmailService {


    private readonly _encryptionService: EncryptionService;


    constructor(
        @inject(TYPES.EncryptionService) encryptionService: EncryptionService
    ) {
        super();
        this._encryptionService = encryptionService;
    }


    public async sendEmail(to: string, userId: string) {

        const { encryptedData } = this._encryptionService.encrypt(
            Local.config().jwtAccessSecret,
            Local.config().jwtAccessSecret,
        );

        const subject = "Email Verify";
        const verification_link = `localhost:8000/api/v1/auth/verify/${userId}/${encryptedData}`
        const html = pug.renderFile(path.join(__dirname, '../../../../../../presentation/views/email/register.pug'), { verification_link })

        return await this.send(to, subject, html)

    }

}

export default RegisterConfirmationEmail
