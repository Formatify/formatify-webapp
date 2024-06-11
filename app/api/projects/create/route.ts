import Project from "@/models/Project";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const POST = async (request: Request) => {
  try {
    await connect();

    const body = await request.json();
    const { name, type } = body;

    const token = request.headers.get("Authorization");
    if (!token || !token.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error_code: "invalid_token",
          message: "Authorization token missing or invalid",
        },
        { status: 401 }
      );
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json(
        { error_code: "invalid_token", message: "Invalid token" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json(
        { error_code: "user_not_found", message: "User not found" },
        { status: 404 }
      );
    }

    const newProject = new Project({
      name,
      type,
      createdBy: user._id,
      authors: [{ userEmail: user.email, status: "approved" }],
    });

    await newProject.save();

    return NextResponse.json(
      { message: "Project created successfully", data: newProject },
      { status: 201 }
    );
  } catch (e: any) {
    if (e.name === "ValidationError") {
      const errors = Object.values(e.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error_code: "validation_error", message: errors.join(", ") },
        { status: 400 }
      );
    }

    console.error(e);
    return NextResponse.json(
      { error_code: "internal_server_error", message: "Something went wrong" },
      { status: 500 }
    );
  }
};

function getUserIdFromToken(token: string): string | null {
  const tokenWithoutBearer = token.split("Bearer ")[1];
  if (!tokenWithoutBearer) {
    console.log("Token does not have the Bearer prefix");
    return null;
  }

  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY environment variable is not defined.");
  }

  try {
    const decodedToken = jwt.verify(
      tokenWithoutBearer,
      process.env.JWT_SECRET_KEY
    ) as JwtPayload;
    return decodedToken.userId as string;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
