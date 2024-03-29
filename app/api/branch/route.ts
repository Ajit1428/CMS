import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import branchModel from "@/models/branch-model";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    if(body.branchName){
      return new NextResponse("This branch already exists", {status: 400})
    }

    const branch = branchModel.create(body)

    return NextResponse.json(branch)

  } catch (error) {
    console.log(`[BRANCH ERROR]`, error);
    return new NextResponse("Branch API error", { status: 500 });
  }
}
