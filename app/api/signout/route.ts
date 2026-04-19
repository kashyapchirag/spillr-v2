import { dbConnecttion } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnecttion();

    const res = NextResponse.json({ message: "Signout successful!" });

    res.cookies.set("token", "", {
      sameSite: "strict",
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Error while signout" },
      { status: 500 },
    );
  }
}
