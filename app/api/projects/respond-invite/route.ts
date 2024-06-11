import Invitation from "@/models/Invitation";
import Project from "@/models/Project";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await connect();

    const body = await request.json();
    const { invitationId, response } = body;

    if (!["accepted", "rejected"].includes(response)) {
      return new NextResponse(
        JSON.stringify({
          error_code: "invalid_response",
          message: "Invalid response value",
        }),
        { status: 400 }
      );
    }

    const invitation = await Invitation.findById(invitationId);
    if (!invitation) {
      return new NextResponse(
        JSON.stringify({
          error_code: "invitation_not_found",
          message: "Invitation not found",
        }),
        { status: 404 }
      );
    }

    invitation.status = response === "accepted" ? "approved" : "rejected";
    await invitation.save();

    if (response === "accepted") {
      let user = await User.findOne({ email: invitation.toEmail });

      if (!user) {
        return new NextResponse(
          JSON.stringify({
            error_code: "user_not_found",
            message: "User not found",
          }),
          { status: 404 }
        );
      }

      const project = await Project.findById(invitation.projectId);
      if (!project) {
        return new NextResponse(
          JSON.stringify({
            error_code: "project_not_found",
            message: "Project not found",
          }),
          { status: 404 }
        );
      }

      project.authors.push({
        userEmail: invitation.toEmail,
        status: "approved",
      });
      await project.save();
    }

    await Invitation.findByIdAndDelete(invitationId);

    return new NextResponse(
      JSON.stringify({ message: `Invitation ${response}` }),
      { status: 200 }
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
