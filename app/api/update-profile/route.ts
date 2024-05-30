import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

type RequestBody = {
    userName?: string;
    email?: string;
    country?: string;
    city?: string;
    university?: string;
    department?: string;
    subscription?: string;
    imageUrl?: string;
};

export const PUT = async (request: any) => {
    const userId = request.nextUrl.searchParams.get('id');
    try {
        await connect();

        const body = await request.json();
        const { ...updates } = body as RequestBody;

        const user = await User.findById(userId);

        if (!user) {
            return new NextResponse(JSON.stringify({ error_code: 'account_not_exists', message: "Account Does not exist" }), { status: 404 });
        }

        if (updates.userName) user.userName = updates.userName;
        if (updates.email) user.email = updates.email;
        if (updates.country) user.country = updates.country;
        if (updates.city) user.city = updates.city;
        if (updates.university) user.university = updates.university;
        if (updates.department) user.department = updates.department;
        if (updates.subscription) user.subscription = updates.subscription;
        if (updates.imageUrl) user.imageUrl = updates.imageUrl;

        await user.save();

        return new NextResponse("Profile updated successfully", { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
    }
};
