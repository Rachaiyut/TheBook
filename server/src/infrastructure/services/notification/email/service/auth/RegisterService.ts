import * as path from 'path';

// DTO
import { IVerificationTokenDTO } from '@application/dtos';

// Inversify
import { inject, injectable } from 'inversify';
import { TYPES } from '@inversify/types';

// Views
import pug from "pug";

// Service
import { EmailService } from '@application/services/api/index';

@injectable()
class RegisterConfirmationEmail extends EmailService {

    public async sendEmail(to: string, userId: string, token: string) {

        const subject = "Email Verify";
        const verification_link = `localhost:8000/api/v1/auth/verify/${userId}/${token}`;
        const html = pug.renderFile(path.join(__dirname, '../../../../../../presentation/views/email/register.pug'), { verification_link })

        return await this.send(to, subject, html)

    }

}

export default RegisterConfirmationEmail
