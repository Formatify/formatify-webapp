import connect from '@/utils/db';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    try {
        await connect();

        const token = request.nextUrl.searchParams.get('token');

        if (!token) {
            return new NextResponse("Token is missing", { status: 400 });
        }

        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return new NextResponse("Invalid token", { status: 400 });
        }

        user.isVerified = true;
        await user.save();

        return new NextResponse("Email verified successfully", { status: 200 });
    } catch (error) {
        console.error("Error verifying email:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
