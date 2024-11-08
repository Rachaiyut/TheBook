import * as path from 'path';

import { injectable } from 'inversify';

import pug from "pug";

import EmailStrategy from '@domain/interfaces/services/IEmailStrategy';

@injectable()
class RegisterConfirmationEmail implements EmailStrategy {

    public sendEmail() {

        const subject = "Email Verify";
        // const verification_link = `localhost:8000/api/v1/auth/verify/${userId}:${accessToekn}`
        const html = pug.renderFile(path.join(__dirname, '../../../../../presentation/views/email/register.pug'))

        return { subject, html }

    }

}

export default RegisterConfirmationEmail
