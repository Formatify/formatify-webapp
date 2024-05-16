import bcrypt from 'bcryptjs';
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

type ResetPassBody = {
    email: string;
    OTP: string;
    password: string;
}

export async function POST(req: Request, res: NextResponse) {

    try {
        await connect();

        const body = await req.json();
        const { email, OTP, password } = body as ResetPassBody

        const user = await User.findOne({ email });

        if (!user || user.OTP !== OTP) {
            return new NextResponse(JSON.stringify({ error_code: 'invalid_otp', message: "Oops!, Invalid OTP" }), { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.OTP = null;
        await user.save();

        return new NextResponse(
            JSON.stringify({ success: true, message: "Password has been changed successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.log("Error:", error);
        return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
    }
}