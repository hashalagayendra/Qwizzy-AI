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
    if (method === "Delete_Created_Paper") {
      console.log("Data received:", data);

      // Create the paper
      const Delete_Paper_in_assign_table = await prisma.assignPaper.deleteMany({
        where: {
          paperId: data.paperID,
        },
      });

      const Delete_Paper = await prisma.paper.delete({
        where: {
          id: data.paperID,
        },
      });

      return NextResponse.json(
        {
          message: "Paper created successfully",
          data: { Delete_Paper_in_assign_table, Delete_Paper },
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
