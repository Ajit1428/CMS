import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import UserModel from "@/model/user/user-model";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const data = await req.json();

    const userDetails = {
      userId,
      name: data?.name,
      role: data?.role,
      email: data?.email,
      branchName: data?.branchName,
      contact: data?.contact,
    };

    if (!userId) {
      return new NextResponse("unauthorized user", { status: 401 });
    }

    const existUser = await UserModel.findOne({ userId });

    if (
      existUser?.email === data?.email ||
      existUser?.branchName === data.branchName
    ) {
      return new NextResponse(
        "You  already have an account and belong to a certain branch",
        { status: 400 },
      );
    } else {
      var details = await new UserModel(userDetails).save();
    }

    return NextResponse.json(details);
  } catch (error) {
    return new NextResponse(`Branch POST error ${error}`, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const { _id } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    const deleteUser = await UserModel.findByIdAndDelete(_id);

    return NextResponse.json(deleteUser);
  } catch (error) {
    return new NextResponse(`Branch DELETE error ${error}`, { status: 400 });
  }
}
