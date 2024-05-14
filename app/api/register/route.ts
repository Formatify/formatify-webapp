import User from "@/models/User";
import connect from "@/utils/db";
import { sendEmail } from "@/utils/email-utils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

type RequestBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  city: string;
  university: string;
  department: string;
  subscription: string;
  verificationToken: string;
};


export const POST = async (request: any) => {
  try {

    await connect();

    const body = await request.json();
    const { firstName, lastName, email, password, country, city, university, department, subscription, verificationToken } = body as RequestBody;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User Already Exists' }, { status: 400 })
    }

    if (!firstName || !lastName || !email || !password || !country || !city || !university || !department || !subscription) {
      return new NextResponse("Please fill all fields", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);


    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      country,
      city,
      university,
      department,
      subscription,
      isVerified: false,
      verificationToken,
    });

    const emailSent = await sendEmail(email, "Welcome to Our App", `Thank you for signing up! Please click the following link to verify your email: ${process.env.NEXTAUTH_URL}verify-email?token=${verificationToken}`);

    if (!emailSent) {
      console.error("Failed to send verification email");
      return new NextResponse("Failed to send verification email", { status: 500 });
    }

    await newUser.save();
    return NextResponse.json({ message: 'Success! Please Check Your Email' }, { status: 201 })
  }

  catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};