import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
import { GoogleGenerativeAI } from "@google/generative-ai";
const prisma = new PrismaClient();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

    if (method === "text_only") {
      try {
        console.log(data.prompt);
        const prompt = data.prompt;
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json(
          {
            message: "succsess",

            data: text,
          },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          {
            message: error.message,

            data: null,
          },
          { status: 500 }
        );
      }
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

// export async function GET() {
//   try {
//     const users = await prisma.user.findMany();
//     return NextResponse.json({ data: users }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ messege: err.message }, { status: 500 });
//   }
// }
