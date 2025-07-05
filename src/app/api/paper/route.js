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
    //add_paper
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

    // add question into exsiting paper
    if (method === "add_questions") {
      console.log("Adding questions to paper:", data.paperId, data.questions);
      const paper_with_Questions = await prisma.paper.update({
        where: {
          id: data.paperId,
        },
        data: {
          questions: data.questions,
        },
      });

      console.log("Adding questions to paper:", data.paperId, data.questions);

      return NextResponse.json(
        { message: "added questions successfully", data: data.questions },
        { status: 200 }
      );
    }

    //ensure users have selected papers
    if (method === "get_papers_IDs_by_userId") {
      const papers = await prisma.paper.findMany({
        where: {
          userId: data.userID, // or any userId
        },
        select: {
          id: true,
        },
      });

      const paperIds = papers.map((paper) => paper.id);

      return NextResponse.json(
        { message: "added questions successfully", data: paperIds },
        { status: 200 }
      );
    }
    // fech paper questions with paper id
    if (method === "Get_Paper_Questions") {
      const questionjson = await prisma.paper.findUnique({
        where: {
          id: data.paperID, // or any userId
        },
        select: {
          questions: true,
        },
      });

      return NextResponse.json(
        { message: "added questions successfully", data: questionjson },
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
