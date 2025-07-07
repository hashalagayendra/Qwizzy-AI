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
    //add_paper
    if (method === "Start_Paper") {
      console.log("Data received:", data);
      // Create the paper
      const changing_assign_paper_details = await prisma.assignPaper.update({
        where: {
          userId_paperId: {
            userId: data.userID,
            paperId: data.paperID,
          },
        },
        data: {
          status: true,
        },
      });

      return NextResponse.json(
        {
          message: "Paper created successfully",
          data: changing_assign_paper_details,
        },
        { status: 200 }
      );
    }

    if (method === "get_paper_with_assigning_data") {
      console.log("Data received:", data);
      // Create the paper
      const paper_with_assigning_data = await prisma.assignPaper.findUnique({
        where: {
          userId_paperId: {
            userId: data.userID,
            paperId: data.paperID,
          },
        },
        include: {
          paper: true,
        },
      });

      return NextResponse.json(
        {
          message: "Paper created successfully",
          data: paper_with_assigning_data,
        },
        { status: 200 }
      );
    }

    if (method === "uploadPaper") {
      console.log("Data received:", data);
      // Create the paper
      const paper_with_assigning_data = await prisma.assignPaper.update({
        where: {
          userId_paperId: {
            userId: data.userID,
            paperId: data.paperID,
          },
        },

        data: {
          questions: data.questions,
        },
      });

      return NextResponse.json(
        {
          message: "Paper created successfully",
          data: paper_with_assigning_data,
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

export async function GET() {
  try {
    const papers = await prisma.paper.findMany();
    return NextResponse.json({ data: papers }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
