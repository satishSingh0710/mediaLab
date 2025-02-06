import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(videos);
  } catch (error: any) {
    console.error("Error fetching videos:", error);

    let errorMessage = "Something went wrong in fetching videos";

    // 🔹 Check if it's a Prisma error
    if (error instanceof Error) {
      errorMessage = error.message; // Gets the actual error message
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
