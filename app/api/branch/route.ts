import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    return NextResponse.json(userId);
  } catch (error) {
    console.log(`[BRANCH ERROR]`, error);
    return new NextResponse("Branch API error", { status: 400 });
  }
}
