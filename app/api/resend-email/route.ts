import User from "@/models/User";
import connect from "@/utils/db";
import { sendEmail } from "@/utils/email-utils";
import { NextResponse } from "next/server";
import fs from 'fs';
import handlebars from 'handlebars';
import path from "path";
import crypto from 'crypto';

type RequestBody = {
    email: string;
};

export const POST = async (request: any) => {
    try {
        await connect();

        const body = await request.json();
        const { email } = body as RequestBody;

        console.log({ email })


        if (!email) {
            return new NextResponse(JSON.stringify({ error_code: 'field_missing', message: "Email is required" }), { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return new NextResponse(JSON.stringify({ error_code: 'user_not_found', message: "User not found" }), { status: 404 });
        }

        if (user.isVerified) {
            return new NextResponse(JSON.stringify({ error_code: 'already_verified', message: "Email is already verified" }), { status: 400 });
        }

        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.verificationToken = verificationToken;

        const templatePath = path.resolve(process.cwd(), process.env.EMAIL_TEMPLATE_PATH!);
        const source = fs.readFileSync(templatePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            email: email,
            link: `${process.env.NEXTAUTH_URL}verify-email?token=${verificationToken}`
        };
        const htmlToSend = template(replacements);

        const emailSent = await sendEmail(email, "Resend Verification Email", htmlToSend);

        if (!emailSent) {
            console.error("Failed to send verification email");
            return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
        }

        await user.save();

        return NextResponse.json({ message: 'Verification email resent successfully' }, { status: 200 });

    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
    }
};