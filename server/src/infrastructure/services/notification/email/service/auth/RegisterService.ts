import * as path from 'path';

// Inversify
import { inject, injectable } from 'inversify';
import { TYPES } from '@inversify/types';

// Views
import pug from "pug";

// Service
import { EmailService } from '@application/services/api/index';

@injectable()
class RegisterConfirmationEmail extends EmailService {

    public async sendEmail(to: string, userId: string) {

        const subject = "Email Verify";
        const verification_link = `localhost:8000/api/v1/auth/verify`
        const html = pug.renderFile(path.join(__dirname, '../../../../../../presentation/views/email/register.pug'), { verification_link })

        return await this.send(to, subject, html)

    }

}

export default RegisterConfirmationEmail
