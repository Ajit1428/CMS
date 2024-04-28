import { NextResponse } from "next/server";

import UserModel from "@/model/user/user-model";
import { auth } from "@clerk/nextjs";

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    const data = await req.json();

    const userDetails = {
      _id: data?._id,
      name: data?.name,
      role: data?.role,
      email: data?.email,
      branchName: data?.branchName,
      contact: data?.contact,
    };

    if (!userId) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const adminUser = await UserModel.findOne({ userId });

    if (adminUser?.role !== "admin") {
      return new NextResponse("Only admin can update the user details", {
        status: 401,
      });
    }

    const updatedUserDetails = await UserModel.findOneAndUpdate(
      { _id: userDetails._id },
      userDetails,
    );

    return NextResponse.json(updatedUserDetails);
  } catch (error) {
    console.log("[Manager-user-update Error]", error);
  }
}
