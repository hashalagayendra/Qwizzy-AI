import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

// add user
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.method) {
      return NextResponse.json(
        { message: "add custom method" },
        { status: 400 }
      );
    }

    if (body.method === "add_user") {
      const hashed_password = await bcrypt.hash(body.data.password, 10);
      const user = await prisma.user.create({
        data: {
          name: body.data.name,
          email: body.data.email,
          password: hashed_password,
        },
      });

      return NextResponse.json(
        { message: "Data received!", data: user },
        { status: 201 }
      );
    }

    // check user

    if (body.method === "check_user_by_email") {
      const user = await prisma.user.findMany({
        where: { email: body.data.email },
      });
      if (user) {
        return NextResponse.json(
          { message: "user Find ", data: user },
          { status: 200 }
        );
      }
    }
  } catch (err) {
    return NextResponse.json({ messege: err.message }, { status: 500 });
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
