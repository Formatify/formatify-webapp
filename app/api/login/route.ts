import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt, { Secret } from "jsonwebtoken";
import connect from "@/utils/db";

interface RequestBody {
    email: string;
    password: string;
}

export async function POST(req: Request, res: NextResponse) {
    await connect();

    const body = await req.json();
    const { email, password } = body as RequestBody;

    if (!email || !password) {
        return new NextResponse(JSON.stringify({ error_code: 'field_missing', message: "All fields are required" }), { status: 400 });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return new NextResponse(JSON.stringify({ error_code: 'account_not_exists', message: "Account with this email does not exist" }), { status: 400 });
        }

        if (!existingUser.isVerified) {
            return new NextResponse(JSON.stringify({ error_code: 'user_not_verified', message: "User is not verified for login" }), { status: 400 });
        }

        const passwordMatched = await compare(password, existingUser.password);

        if (!passwordMatched) {
            return new NextResponse(JSON.stringify({ error_code: 'invalid_user', message: "Email or Password is invalid" }), { status: 400 });
        }

        const accessToken = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY as Secret, {
            expiresIn: "12h",
        });

        const refreshToken = jwt.sign({ userId: existingUser._id }, process.env.JWT_REFRESH_SECRET_KEY as Secret, {
            expiresIn: "7d",
        });

        return new NextResponse(
            JSON.stringify({ message: "User Logged In Successfully", accessToken, refreshToken }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
    }
}
