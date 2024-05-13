import { NextResponse } from "next/server";
import jwt, { Secret } from "jsonwebtoken";

type RequestBody = {
    refreshToken: string;

}
export async function POST(req: Request, res: NextResponse) {

    const body = await req.json();
    const { refreshToken } = body as RequestBody;

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY as Secret) as jwt.JwtPayload;
        console.log({ decoded })
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET_KEY as Secret, {
            expiresIn: "12h",
        });

        return new NextResponse(
            JSON.stringify({ accessToken }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Invalid or expired refresh token" }),
            { status: 401 }
        );
    }

}