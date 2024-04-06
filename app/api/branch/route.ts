import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import BranchModel from "@/model/branch/branch-model";
import { mongoDB } from "@/config/db/mongodb";

export async function POST(req: Request) {
  mongoDB();
  try {
    const { userId } = auth();
    const { branchName } = await req.json();

    const branchD = {
      userId,
      branchName,
    };

    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    const existBranch = await BranchModel.findOne({ branchName });

    if (existBranch?.branchName !== branchName) {
      var branch = await new BranchModel(branchD).save();
    } else {
      return new NextResponse("Branch Exists", { status: 400 });
    }

    return NextResponse.json(branch);
  } catch (error) {
    return new NextResponse(`Branch POST error ${error}`, { status: 400 });
  }
}
