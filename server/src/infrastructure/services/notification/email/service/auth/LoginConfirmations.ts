import * as path from 'path';

import { injectable } from 'inversify';

import pug from "pug";

import { EmailService } from '@application/services/api/index';

@injectable()
class LoginConfirmationEmail extends EmailService {


    public async sendEmail(to: string, userId: string) {

        const accessToken = "sdafdsf"

        const subject = "Email Verify";
        const verification_link = `localhost:8000/api/v1/auth/verify/${userId}/${accessToken}`
        const html = pug.renderFile(path.join(__dirname, '../../../../../../presentation/views/email/login.pug'), { verification_link })

        return await this.send(to, subject, html)

    }

}

export default LoginConfirmationEmail
