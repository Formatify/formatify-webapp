import User from '@/models/User';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

interface RequestBody {
    email: string;
    otp: string;
}

export async function POST(req: any) {
    connect()

    const body = await req.json();
    const { email, otp } = body as RequestBody;

    try {
        const user= await User.findOne({ email });

        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "User Not Found" }),
                { status: 404 }
            );
        }

        if (user.OTP !== otp) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid OTP" }),
                { status: 400 }
            );
        }

        user.isActive = true;
        user.OTP = '';
        await user.save();

        return new NextResponse(
            JSON.stringify({ message: "User Activated Successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error confirming OTP:', error);
        return new NextResponse(
            JSON.stringify({ message: "Intenal Server Error" }),
            { status: 500 }
        );
    }
}

