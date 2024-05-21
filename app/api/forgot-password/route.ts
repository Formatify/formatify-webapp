import User from '@/models/User';
import connect from '@/utils/db';
import { sendEmail } from '@/utils/email-utils';
import cryptoRandomString from 'crypto-random-string';
import { NextResponse } from 'next/server';

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

            const emailContent = `
                We have sent you this email in response to your request to reset your password on This Project.

                To reset your password, please follow the link below:

                <a href="http://localhost:3000/client/ForgotPass?otp=${setOTP}">Click Here To Reset Your Password</a>

                <br/><br/>

                We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised,
                you can change it by going to your My Account Page and Change your Password.`;

            try {
                const emailSent = await sendEmail(email, "Forgot Password", emailContent);

            console.log('Email sent Successfully', emailSent);

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
