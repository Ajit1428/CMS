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

    const branch = await branchModel.create({ userId, branchName });
    return NextResponse.json(branch);
  } catch (error) {
    console.log(`[BRANCH POST ERROR]`, error);
    return new NextResponse("Branch POST error", { status: 500 });
  }
}
