import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
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

    if (method === "add_paper") {
      // Create the paper
      const new_paper = await prisma.paper.create({
        data: {
          paper_name: data.paper_name,
          description: data.description,
          userId: data.userId,
          timeLimit: data.timeLimit,
        },
      });

      // Prepare assignment objects
      const assignments = data.assignments.map((userId) => ({
        paperId: new_paper.id,
        userId: userId,
      }));

      // Insert assignments
      await prisma.assignPaper.createMany({
        data: assignments,
      });

      return NextResponse.json(
        { message: "Paper created successfully", data: new_paper },
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
