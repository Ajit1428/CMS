import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }


  } catch (error) {
    console.log(`[BRANCH ERROR]`, error);
    return new NextResponse("Branch API error", { status: 500 });
  }
}
