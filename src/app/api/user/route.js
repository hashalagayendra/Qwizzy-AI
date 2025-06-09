import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

// add user
export async function POST(req) {
  try {
    const body = await req.json();

    const { method, data } = body;

    if (!method) {
      return NextResponse.json(
        { message: "Method not provided" },
        { status: 400 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: "Data not provided" },
        { status: 400 }
      );
    }

    // ✅ Add user logic
    if (method === "add_user") {
      const { name, email, password } = data;

      if (!name || !email || !password) {
        return NextResponse.json(
          { message: "Missing fields" },
          { status: 400 }
        );
      }

      const hashed_password = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashed_password,
        },
      });

      return NextResponse.json(
        { message: "User created successfully", data: user },
        { status: 200 }
      );
    }

    // ✅ Check if user exists
    if (method === "check_user_by_email") {
      const { email } = data;

      if (!email) {
        return NextResponse.json(
          { message: "Email not provided" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      return NextResponse.json(
        {
          message: user ? "User found" : "User not found",
          userExists: !!user,
          data: user || null,
        },
        { status: 200 }
      );
    }

    // ✅ Unknown method
    return NextResponse.json({ message: "Unknown method" }, { status: 400 });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ messege: err.message }, { status: 500 });
  }
}
