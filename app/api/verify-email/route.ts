import connect from '@/utils/db';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    try {
        await connect();

        const token = request.nextUrl.searchParams.get('token');

        if (!token) {
            return new NextResponse(JSON.stringify({ error_code: 'token_not_found', message: "Token is missing" }), { status: 400 });
        }

        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return new NextResponse(JSON.stringify({ error_code: 'invalid_token', message: "Invalid Token" }), { status: 400 });
        }

        user.isVerified = true;
        await user.save();

        return new NextResponse("Email verified successfully", { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
    }
}
