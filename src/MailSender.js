const nodemailer = require('nodemailer');

class MailSender {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    sendEmail(targetEmail, content) {
        const message = {
            from: process.env.MAIL_ADDRESS,
            to: targetEmail,
            subject: 'Ekspor Payload',
            text: 'Terlampir hasil dari ekspor payload',
            attachments: [
                {
                    filename: 'payloads.json',
                    content,
                },
            ],
        };

        return this._transporter.sendMail(message);
    }
}

module.exports = MailSender;
