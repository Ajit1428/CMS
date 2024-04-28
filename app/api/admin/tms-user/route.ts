import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import TMSUserModel from "@/model/admin/tms-user/tms-user-create-model";
import UserModel from "@/model/user/user-model";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const data = await req.json();

    const userDetails = {
      clientName: data?.clientName,
      clientCode: data?.clientCode,
      status: data?.status,
      sentBy: data?.sentBy,
      branchName: data?.branchName,
      remarks: data?.remarks,
      courier: data?.courier,
    };

    if (!userId) {
      return new NextResponse("unauthorized user", { status: 401 });
    }

    const existClient = await TMSUserModel.findOne({
      clientCode: data?.clientCode,
    });

    if (existClient?.clientCode === data?.clientCode) {
      return new NextResponse("The client code already exists", {
        status: 400,
      });
    } else {
      var details = await new TMSUserModel(userDetails).save();
    }

    return NextResponse.json(details);
  } catch (error) {
    return new NextResponse(`Branch POST error ${error}`, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    const data = await req.json();

    console.log(userId);

    const userDetails = {
      _id: data?._id,
      clientName: data?.clientName,
      clientCode: data?.clientCode,
      status: data?.status,
      sentBy: data?.sentBy,
      branchName: data?.branchName,
      courier: data?.courier,
      remarks: data?.remarks,
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

    const updatedUserDetails = await TMSUserModel.findOneAndUpdate(
      { _id: userDetails._id },
      userDetails,
    );

    return NextResponse.json(updatedUserDetails);
  } catch (error) {
    console.log("[Manager-user-update Error]", error);
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const { _id } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    const deleteUser = await TMSUserModel.findByIdAndDelete(_id);

    return NextResponse.json(deleteUser);
  } catch (error) {
    return new NextResponse(`Branch DELETE error ${error}`, { status: 400 });
  }
}
