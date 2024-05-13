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
        return new NextResponse(
            JSON.stringify({ message: "All Fields Are Required" }),
            { status: 400 }
        );
    }

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return new NextResponse(
                JSON.stringify({ message: "User Not Found" }),
                { status: 404 }
            );
        }

        if (!existingUser.isVerified) {
            return new NextResponse(
                JSON.stringify({ message: "User is not verified" }),
                { status: 401 }
            );
        }

        const passwordMatched = await compare(password, existingUser.password);

        if (!passwordMatched) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid User" }),
                { status: 401 }
            );
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
        JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 }
    }
}
