import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { use } from "react";
const prisma = new PrismaClient();

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

    if (method === "cheack_Resetable") {
      console.log("Data received:", data);
      // Create the paper
      const creator_ID = await prisma.assignPaper.findUnique({
        where: {
          userId_paperId: {
            userId: data.userID,
            paperId: data.paperID,
          },
        },
        select: {
          paper: {
            select: {
              userId: true,
            },
          },
        },
      });

      return NextResponse.json(
        {
          message: "Paper created successfully",
          data: creator_ID,
        },
        { status: 200 }
      );
    }

    if (method === "cheack_Resetable") {
      console.log("Data received:", data);
      // Create the paper
      const creator_ID = await prisma.assignPaper.findUnique({
        where: {
          userId_paperId: {
            userId: data.userID,
            paperId: data.paperID,
          },
        },
        select: {
          paper: {
            select: {
              userId: true,
            },
          },
        },
      });

      return NextResponse.json(
        {
          message: "Paper created successfully",
          data: creator_ID,
        },
        { status: 200 }
      );
    }

    if (method === "reset_answers_and_marks_status") {
      console.log("Data received:", data);
      // Create the paper
      const creator_ID = await prisma.assignPaper.update({
        where: {
          userId_paperId: {
            userId: data.userID,
            paperId: data.paperID,
          },
        },
        data: {
          marks: null,
          status: null,
          questions: [],
        },
      });

      return NextResponse.json(
        {
          message: "Paper created successfully",
          data: creator_ID,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: `Unknown method: ${method}` },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
