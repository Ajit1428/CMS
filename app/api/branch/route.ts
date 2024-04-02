import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import branchModel from "@/model/branch/branch-model";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    const branch = new branchModel({data: {userId,body}}).save()

    if (branch === body.branchName) {
      return new NextResponse("The branch already exists", { status: 400 });
    }

    return NextResponse.json(branch);
  } catch (error) {
    console.log(`[BRANCH ERROR]`, error);
    return new NextResponse("Branch API error", { status: 500 });
  }
}
