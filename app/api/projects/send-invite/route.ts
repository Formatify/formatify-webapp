import Invitation from "@/models/Invitation";
import User from "@/models/User";
import Project from "@/models/Project";
import connect from "@/utils/db";
import { sendEmail } from "@/utils/email-utils";
import { NextResponse } from "next/server";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import jwt, { JwtPayload } from "jsonwebtoken";

export const POST = async (request: Request) => {
  try {
    await connect();

    const body = await request.json();

    const { projectId, toEmail } = body;

    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return new NextResponse(
        JSON.stringify({
          error_code: "token_missing",
          message: "Authorization token is required",
        }),
        { status: 401 }
      );
    }

    let fromUserId;
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY!
      ) as JwtPayload;
      fromUserId = decodedToken.userId;
    } catch (err) {
      return new NextResponse(
        JSON.stringify({
          error_code: "invalid_token",
          message: "Invalid or expired token",
        }),
        { status: 401 }
      );
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return new NextResponse(
        JSON.stringify({
          error_code: "project_not_found",
          message: "Project not found",
        }),
        { status: 400 }
      );
    }

    const user = await User.findById(fromUserId);
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          error_code: "user_not_found",
          message: "User not found",
        }),
        { status: 400 }
      );
    }

    const userIsAlreadyAuthor = project.authors.some(
      (author) => author.userEmail === toEmail
    );

    if (userIsAlreadyAuthor) {
      return new NextResponse(
        JSON.stringify({
          error_code: "author_exists",
          message: "This User is already a author of this project",
        }),
        { status: 400 }
      );
    }

    const existingInvitation = await Invitation.findOne({ toEmail });
    if (existingInvitation) {
      return new NextResponse(
        JSON.stringify({
          error_code: "invitation_exists",
          message: "Invitation already sent to this email for this project",
        }),
        { status: 400 }
      );
    }

    const newInvitation = new Invitation({
      projectId,
      fromUserId: user._id,
      toEmail,
    });

    await newInvitation.save();

    const templatePath = path.resolve(
      process.cwd(),
      process.env.SEND_INVITE_TEMPLATE_PATH!
    );
    const source = fs.readFileSync(templatePath, "utf-8").toString();
    const template = handlebars.compile(source);

    const replacements = {
      email: toEmail,
      link: `${process.env.NEXTAUTH_URL}/api/invitations/respond?token=${newInvitation._id}`,
    };

    const htmlToSend = template(replacements);

    const emailSent = await sendEmail(
      toEmail,
      "Project Invitation",
      htmlToSend
    );

    if (!emailSent) {
      return new NextResponse(
        JSON.stringify({
          error_code: "email_not_sent",
          message: "Email could not be sent",
        }),
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Invitation sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        error_code: "internal_server_error",
        message: "Something went wrong",
      }),
      { status: 500 }
    );
  }
};
