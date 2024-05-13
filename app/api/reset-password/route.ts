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
            return new NextResponse(
                JSON.stringify({ success: false, message: "Invalid OTP" }),
                { status: 400 }
            );
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
        console.error("Error:", error);
        return new NextResponse(
            JSON.stringify({ success: false, error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}