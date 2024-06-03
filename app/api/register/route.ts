import User from "@/models/User";
import connect from "@/utils/db";
import { sendEmail } from "@/utils/email-utils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import fs from 'fs';
import handlebars from 'handlebars'
import path from "path";

type RequestBody = {
  userName: string;
  email: string;
  password: string;
  country?: string;
  city?: string;
  university?: string;
  department?: string;
  subscription?: string;
  verificationToken: string;
};


export const POST = async (request: any) => {
  try {
    await connect();

    const body = await request.json();
    const { userName, email, password, country, city, university, department, subscription, verificationToken } = body as RequestBody;
    const existingUser = await User.findOne({ email });


    const templatePath = path.resolve(process.cwd(), process.env.EMAIL_TEMPLATE_PATH!);
    const source = fs.readFileSync(templatePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
      email: email,
      link: `${process.env.NEXTAUTH_URL}verify-email?token=${verificationToken}`
    }

    const htmlToSend = template(replacements);
    if (existingUser) {
      return new NextResponse(JSON.stringify({ error_code: 'account_exists', message: "Account with this email already exist" }), { status: 400 });
    }

    if (!userName || !email || !password) {
      return new NextResponse(JSON.stringify({ error_code: 'field_missing', message: "All fields are required" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      country: country || '',
      city: city || '',
      university: university || '',
      department: department || '',
      subscription: subscription || '',
      isVerified: false,
      verificationToken: verificationToken,
      OTP: null,
      imageUrl: "https://gravatar.com/avatar/2f138e608281f56869f4aad34b3e7e7d?s=400&d=robohash&r=x"
    });

    const emailSent = await sendEmail(email, "Welcome to Our App", htmlToSend);

    if (!emailSent) {
      return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
    }

    await newUser.save();
    return NextResponse.json({ message: 'Success! Please Check Your Email' }, { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error_code: 'internal_server_error', message: "Something went wrong" }), { status: 500 });
  }
};