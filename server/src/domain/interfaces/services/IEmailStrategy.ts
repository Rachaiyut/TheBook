interface EmailStrategy {
    sendEmail(subject: string, to: string): { subject: string, html: string } ;
}

export default EmailStrategy;