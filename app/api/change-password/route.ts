import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";

type ResetPassBody = {
    email: string;
    oldPassword: string;
    newPassword: string;
}

export async function POST(req: Request, res: NextResponse) {

    try {
        const body = await req.json();
        const { email, oldPassword, newPassword } = body as ResetPassBody

        if (!oldPassword || !newPassword) {
            return new NextResponse(JSON.stringify({ error_code: 'field_missing', message: "Old password and new password are required" }), { status: 401 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return new NextResponse(JSON.stringify({ error_code: 'account_not_exists', message: "Account with this email does not exist" }), { status: 400 });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return new NextResponse(JSON.stringify({ error_code: 'invalid_credentials', message: "Invalid Credential" }), { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        return NextResponse.json({ message: 'Success! Password Changed Successfully!' }, { status: 200 })

    } catch (error) {
        return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
    }

}