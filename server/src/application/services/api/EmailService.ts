import nodemailer from "nodemailer";

import { injectable } from "inversify";

import Local from "@shared/Local";


@injectable()
class EmailService {


    private getMailConfig() {

        const { host, mailService, emailPort, GmailUsername, GooglePassword } = Local.config();

        return {
            host,
            mailService,
            emailPort,
            GmailUsername,
            GooglePassword
        }

    }

    private newTransport() {

        const { host, emailPort, mailService, GooglePassword } = this.getMailConfig();

        return nodemailer.createTransport({
            host,
            service: mailService,
            auth: {
                user: 'rachaiyut.hayeebeelang@gmail.com',
                pass: GooglePassword
            }
        });
    }

    public async send(to: string, subject: string, html: string) {

        const { GmailUsername } = Local.config();

        const mailOptions = {
            from: `"TheBook" ${GmailUsername}`,
            to,
            subject,
            html
        }

        await this.newTransport().sendMail(mailOptions);
    }

}

export default EmailService 