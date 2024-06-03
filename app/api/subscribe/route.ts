import connect from "@/utils/db";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs/promises'; // Using fs promises for asynchronous file reading
import handlebars from 'handlebars';
import { sendEmail } from "@/utils/email-utils";
import SubscribedUser from "@/models/SubscribedUser";

type RequestBody = {
    email: string;
};

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const loadTemplate = async (templatePath: string): Promise<string> => {
    try {
        return await fs.readFile(templatePath, 'utf-8');
    } catch (error) {
        throw new Error("Failed to load template: " + (error as Error).message);
    }
};

const sendThankYouEmail = async (email: string, html: string): Promise<boolean> => {
    try {
        await sendEmail(email, "Thank You For Subscribing", html);
        return true;
    } catch (error) {
        console.error("Failed to send email:", error);
        return false;
    }
};

export const POST = async (request: any) => {
    try {
        await connect();
        const body = await request.json();
        const { email } = body as RequestBody;

        if (!email) {
            return new NextResponse(JSON.stringify({ error_code: 'field_missing', message: "Email is required" }), { status: 400 });
        }

        if (!validateEmail(email)) {
            return new NextResponse(JSON.stringify({ error_code: 'invalid_email', message: "Invalid email format" }), { status: 400 });
        }

        const existingUser = await SubscribedUser.findOne({ email });

        if (existingUser) {
            return new NextResponse(JSON.stringify({ error_code: 'account_exists', message: "Oops! This email has already subscribed!" }), { status: 400 });
        }

        const templatePath = path.resolve(process.cwd(), process.env.THANK_YOU_TEMPLATE_PATH!);
        const source = await loadTemplate(templatePath);
        const template = handlebars.compile(source);
        const replacements = {
            image_url: "https://img.freepik.com/free-vector/thank-you-concept-illustration_114360-18049.jpg?t=st=1717442259~exp=1717445859~hmac=9b9a8a4d862e608481dfd48b1057a1d64ca09340b838b1fd25a7b04939da354d&w=2000",
        };
        const htmlToSend = template(replacements);

        const emailSent = await sendThankYouEmail(email, htmlToSend);

        if (!emailSent) {
            return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
        }

        const subscribed = new SubscribedUser({ email });
        await subscribed.save();

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error("Error occurred:", error);
        return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
    }
};
