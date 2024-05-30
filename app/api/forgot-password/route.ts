import User from '@/models/User';
import connect from '@/utils/db';
import { sendEmail } from '@/utils/email-utils';
import cryptoRandomString from 'crypto-random-string';
import { NextResponse } from 'next/server';
import fs from 'fs';
import handlebars from 'handlebars'
import path from "path";

interface RequestBody {
    email: string;
}

export async function POST(req: Request, res: NextResponse) {

    try {
        await connect();

        const generateRandomString = cryptoRandomString({ length: 15 });
        const OTP = generateRandomString;

        const body = await req.json();
        const { email } = body as RequestBody;

        await User.findOneAndUpdate(
            { email },
            { OTP },
            { new: true }
        );

        const user = await User.findOne({ email });

        if (!user) {
            return new NextResponse(JSON.stringify({ error_code: 'user_not_found', message: "User not found" }), { status: 404 });
        }

        let setOTP = user?.OTP;

        const templatePath = path.resolve(process.cwd(), process.env.FORGETPASS_TEMPLATE_PATH!);
        const source = fs.readFileSync(templatePath, 'utf-8').toString();
        const template = handlebars.compile(source);

        const replacements = {
            email: email,
            link: `${process.env.NEXTAUTH_URL}forget-password/setup-password?otp=${setOTP}`
        }

        const htmlToSend = template(replacements);

        try {
            const emailSent = await sendEmail(email, "Forgot Password", htmlToSend);
        } catch (error) {
            return new NextResponse(JSON.stringify({ error_code: 'error_sending_email', message: "Something went wrong while sending email" }), { status: 500 });
        }

        return new NextResponse(
            JSON.stringify({ success: true }),
            { status: 200 }
        );

    } catch (error) {
        return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
    }
}
