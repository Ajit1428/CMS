import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import TMSUserModel from "@/model/admin/tms-user/tms-user-create-model";

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

    const existClient = await TMSUserModel.findOne({clientCode: data?.clientCode });

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
