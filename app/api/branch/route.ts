import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import branchModel from "@/model/branch/branch-model";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { branchName } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    const existBranch = await branchModel.findOne({branchName})

    if(existBranch?.branchName !== branchName){
    var branch = await branchModel.create({ userId, branchName });
    }
    else{
     return new NextResponse('Branch Exists', {status: 400})
    }

    return NextResponse.json(branch);
  } catch (error) {
    return new NextResponse(`Branch POST error ${error}`, { status: 400 });
  }
}
