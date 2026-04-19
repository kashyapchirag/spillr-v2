import { dbConnecttion } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await dbConnecttion();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  const res = NextResponse.json(
    { message: "Log in successful!" },
    { status: 200 },
  );

  res.cookies.set("token", token, {
    sameSite: "strict",
    httpOnly: true,
    path: "/",
  });

  return res;
}
