import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

type MailOptions = {
    from: string;
    to: string;
    subject: string;
    text: string;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
} as SMTPTransport.Options);

export const sendEmail = async (to: string, subject: string, text: string): Promise<boolean> => {
    const mailOptions: MailOptions = {
        from: "mbabarwaseem@gmail.com",
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};
