import { dbConnecttion } from "@/lib/db";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnecttion();
    const { name, email, password } = await req.json();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          message: "Account already exists",
        },
        { status: 409 },
      );
    }

    //   password hashing using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json(
      {
        message: "Account created successfully ",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error while creating account",
      },
      { status: 500 },
    );
  }
}
